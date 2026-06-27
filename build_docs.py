#!/usr/bin/env python3
"""Assemble the ML-Spec notes into a MkDocs (pyodide-mkdocs-theme) docs/ tree + nav.

Source of truth stays in poopie/random/ml-spec (topics.yml + notes/); this only
ever reads it. Re-run any time topics.yml or the notes change, then `mkdocs serve`.

Forked from blowback-wiki/build_docs.py: same docs/-reset → emit → nav → prev/next
spine, generalised from season→episode to course→week→topic and driven by the
authoritative ordering in topics.yml.
"""
import json
import shutil
from pathlib import Path

import yaml

SRC = Path("/home/purubuntu/projects/poopie/random/ml-spec")
NOTES = SRC / "notes"
EXERCISES = SRC / "exercises"
IMAGES = SRC / "images"
TRANSCRIPTS = SRC / "transcripts"
TOPICS_YML = SRC / "topics.yml"
MEDIA_JSON = SRC / "media.json"
OUT = Path(__file__).parent / "docs"

# direct-MP4 lecture URLs for C2/C3, keyed "C{c}/W{w}/{slug}"
MEDIA = json.loads(MEDIA_JSON.read_text(encoding="utf-8")) if MEDIA_JSON.exists() else {}


def h1_title(md_path, default):
    """First markdown H1 in the note, else the topics.yml title."""
    if md_path.exists():
        for line in md_path.read_text(encoding="utf-8").splitlines():
            if line.startswith("# "):
                return line[2:].strip()
    return default


def page_summary(body):
    """A one-line 'nutshell' summary for the right-panel, from the note's lead
    paragraph (or an explicit `summary:` if the note carries front-matter).

    Strips the `[mm:ss]` timestamps, markdown emphasis/code/links and inline
    LaTeX, collapses whitespace, and keeps the first ~2 sentences (≤240 chars).
    """
    import re

    text = body
    # explicit override: a leading YAML front-matter block with `summary:`
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            fm = text[3:end]
            m = re.search(r"(?m)^summary:\s*(.+)$", fm)
            if m:
                return m.group(1).strip().strip("\"'")
            text = text[end + 4 :]

    # drop the H1, then take the first non-empty paragraph
    lines = text.splitlines()
    lines = [ln for ln in lines if not ln.startswith("# ")]
    para = ""
    for ln in lines:
        if ln.strip() == "":
            if para:
                break
            continue
        if ln.lstrip().startswith(("#", "!", "$$", "```", ">", "|", "{", "_", "-")):
            if para:
                break
            continue
        para += " " + ln.strip()

    s = para.strip()
    s = re.sub(r"`\[[0-9:]+\]`", "", s)          # `[mm:ss]` timestamps
    s = re.sub(r"`([^`]*)`", r"\1", s)            # inline code
    s = re.sub(r"\*\*([^*]+)\*\*", r"\1", s)      # bold
    s = re.sub(r"\*([^*]+)\*", r"\1", s)          # italic
    s = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", s)  # links -> text
    s = re.sub(r"\$([^$]*)\$", r"\1", s)          # inline math -> raw
    s = re.sub(r"[\\${}]", "", s)                 # stray tex chars
    s = re.sub(r"\s+", " ", s).strip()
    if len(s) > 240:                              # trim to a sentence boundary
        cut = s.rfind(". ", 0, 240)
        s = (s[: cut + 1] if cut > 120 else s[:237].rstrip() + "…")
    return s.replace('"', "'")


def youtube_embed(vid, start=None):
    src = f"https://www.youtube-nocookie.com/embed/{vid}"
    if start:
        src += f"?start={start}"
    return (
        '<div class="video-wrap">'
        f'<iframe src="{src}" title="Lecture video" loading="lazy" '
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; '
        'gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    )


def video_embed(url):
    """HTML5 player for the official DeepLearning.AI lecture MP4 (C2/C3)."""
    return (
        '<div class="video-wrap">'
        f'<video controls preload="none" playsinline src="{url}">'
        "Your browser can't play this video — "
        f'<a href="{url}">download the lecture</a>.</video></div>'
    )


def note_path(c, w, slug):
    return NOTES / f"C{c}" / f"W{w}" / f"{slug}.md"


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    spec = yaml.safe_load(TOPICS_YML.read_text(encoding="utf-8"))

    # flat ordered list of every topic, for the prev/next chain
    flat = [
        (course, week, topic)
        for course in spec["courses"]
        for week in course["weeks"]
        for topic in week["topics"]
    ]

    def link_to(course, week, topic):
        # uniform path relative to a page at course-c/week-w/slug.md (depth 2)
        return f"../../course-{course['id']}/week-{week['id']}/{topic['slug']}.md"

    def nav_bar(i):
        if i > 0:
            pc, pw, pt = flat[i - 1]
            left = f"[← {h1_title(note_path(pc['id'], pw['id'], pt['slug']), pt['title'])}]({link_to(pc, pw, pt)}){{ .md-button }}"
        else:
            left = "<span></span>"
        if i < len(flat) - 1:
            nc, nw, nt = flat[i + 1]
            right = f"[{h1_title(note_path(nc['id'], nw['id'], nt['slug']), nt['title'])} →]({link_to(nc, nw, nt)}){{ .md-button }}"
        else:
            right = "<span></span>"
        return f'<div class="ep-nav" markdown>\n\n{left}\n\n{right}\n\n</div>'

    index = {(c["id"], w["id"], t["slug"]): i for i, (c, w, t) in enumerate(flat)}

    nav = ["  - Home: index.md", "  - About: about.md"]

    for course in spec["courses"]:
        c = course["id"]
        course_nav = []
        for week in course["weeks"]:
            w = week["id"]
            week_nav = []
            week_dir = OUT / f"course-{c}" / f"week-{w}"
            week_dir.mkdir(parents=True, exist_ok=True)

            # copy this week's PMT exercise files (so {{ IDE('x') }} resolves)
            # and its slide images (so ![](slide.png) resolves)
            for asset_dir in (EXERCISES / f"C{c}W{w}", IMAGES / f"C{c}W{w}"):
                if asset_dir.is_dir():
                    for f in asset_dir.iterdir():
                        if f.is_file():
                            shutil.copy(f, week_dir / f.name)

            for topic in week["topics"]:
                slug = topic["slug"]
                note = note_path(c, w, slug)
                title = h1_title(note, topic["title"])
                body = note.read_text(encoding="utf-8") if note.exists() else f"# {title}\n\n_(notes pending)_\n"

                bar = nav_bar(index[(c, w, slug)])
                vid = topic.get("youtube_id")
                media_url = MEDIA.get(f"C{c}/W{w}/{slug}")
                if vid:
                    embed = youtube_embed(vid, topic.get("start"))
                elif media_url:
                    # C2/C3: the official DeepLearning.AI lecture, embedded inline.
                    embed = video_embed(media_url)
                else:
                    # No lecture video available — author from the official slide
                    # decks instead; point the learner to Coursera.
                    embed = (
                        '<div class="coursera-note" markdown>\n\n'
                        "🎓 **Watch this lecture on Coursera** — these notes are built "
                        "from the official lecture slides; open the matching video in "
                        "the [Machine Learning Specialization]"
                        "(https://www.coursera.org/specializations/machine-learning-introduction).\n\n"
                        "</div>"
                    )

                # verbatim Whisper transcript page (linked, not in nav)
                transcript = TRANSCRIPTS / f"C{c}" / f"W{w}" / f"{slug}.txt"
                tlink = ""
                if transcript.exists():
                    raw = transcript.read_text(encoding="utf-8").strip().replace("\n", "  \n")
                    disclaimer = (
                        "> Machine-generated (Whisper `distil-large-v3`). Timestamps are "
                        "approximate and it may contain errors — trust the audio."
                        if c == 1 else
                        "> Official DeepLearning.AI lecture captions. Timestamps mark "
                        "the start of each caption line."
                    )
                    (week_dir / f"{slug}-transcript.md").write_text(
                        f"# {title} — Transcript\n\n"
                        f"{disclaimer}\n\n"
                        f"[← Back to the notes]({slug}.md)\n\n---\n\n{raw}\n",
                        encoding="utf-8",
                    )
                    tlink = f"> 📄 **[Read the full lecture transcript]({slug}-transcript.md)**\n\n"

                header = (
                    f"> **Course {c} · Week {w}** · "
                    "_AI-generated study aid — not authoritative; trust the lecture & cited sources._\n\n"
                    f"{bar}\n\n{embed}\n\n{tlink}"
                )
                summary = page_summary(body)
                fm = f'---\nsummary: "{summary}"\n---\n' if summary else ""
                first, _, rest = body.partition("\n")  # first == "# Title"
                page = f"{fm}{first}\n\n{header}{rest.lstrip(chr(10))}\n\n{bar}\n"

                (week_dir / f"{slug}.md").write_text(page, encoding="utf-8")
                week_nav.append(f'        - "{title}": course-{c}/week-{w}/{slug}.md')

            # per-week Practice Assignment overview (not part of the prev/next chain)
            asg = NOTES / f"C{c}" / f"W{w}" / "assignment.md"
            if asg.exists():
                dst = OUT / f"course-{c}" / f"week-{w}" / "assignment.md"
                dst.write_text(asg.read_text(encoding="utf-8"), encoding="utf-8")
                week_nav.append(f'        - "Practice Assignment": course-{c}/week-{w}/assignment.md')

            # per-week Test Yourself page (not part of the prev/next chain)
            ty = NOTES / f"C{c}" / f"W{w}" / "test-yourself.md"
            if ty.exists():
                dst = OUT / f"course-{c}" / f"week-{w}" / "test-yourself.md"
                dst.write_text(ty.read_text(encoding="utf-8"), encoding="utf-8")
                week_nav.append(f'        - "Test Yourself": course-{c}/week-{w}/test-yourself.md')

            course_nav.append(f'      - "Week {w}: {week["title"]}":')
            course_nav.extend(week_nav)

        nav.append(f'  - "Course {c}: {course["title"]}":')
        nav.extend(course_nav)

    write_index(spec)
    write_about()
    write_extra_css()
    write_config(spec, "\n".join(nav))
    print(f"Built {sum(1 for _ in OUT.rglob('*.md'))} pages into {OUT}")


def write_index(spec):
    lines = [
        f"# {spec['title']} — Study Companion\n",
        "Read-along notes, embedded lectures, in-browser code practice, and "
        "per-week self-checks for Andrew Ng's **Machine Learning Specialization**.\n",
        "## How to use this\n",
        "- Pick a course → week → topic in the left sidebar.\n"
        "- Watch the embedded lecture, read the transcript-woven notes, then run "
        "the practice cell right on the page.\n"
        "- Use **prev/next** to move lecture-to-lecture across the whole course.\n",
        "## Courses\n",
    ]
    for course in spec["courses"]:
        lines.append(f"{course['id']}. **{course['title']}**")
    lines.append(
        "\n---\n\n*Unofficial personal study aid. All teaching credit belongs to "
        "Andrew Ng & DeepLearning.AI — take the course at "
        "[coursera.org](https://www.coursera.org/specializations/machine-learning-introduction).*"
    )
    (OUT / "index.md").write_text("\n".join(lines), encoding="utf-8")


def write_about():
    (OUT / "about.md").write_text(
        "# About & Methodology\n\n"
        "An **unofficial personal study companion** to Andrew Ng's Machine "
        "Learning Specialization — transparency-first.\n\n"
        '!!! warning "Read this first"\n'
        "    Notes are woven from **machine transcripts** of the lectures and are "
        "an AI-written study aid — not an authoritative record. When something "
        "matters, trust the lecture and the cited sources.\n\n"
        "## Code checks\n\n"
        "In-browser exercises run real Python (numpy/sklearn) via Pyodide. A green "
        "**Validate** means *your code passed the public + hidden test asserts on "
        "this page* — **not** that it would pass Coursera's official grader.\n\n"
        "## Supplements\n\n"
        "On the neural-network topics, deeper callouts cite Michael Nielsen's "
        "*Neural Networks and Deep Learning* and Simon Prince's *Understanding Deep "
        "Learning* — used only as enrichment where the lecture is thin.\n",
        encoding="utf-8",
    )


def write_extra_css():
    (OUT / "extra.css").write_text(
        ".ep-nav { display:flex; justify-content:space-between; gap:1rem;\n"
        "          align-items:center; margin:1rem 0; }\n"
        ".ep-nav .md-button { margin:0; }\n"
        ".video-wrap { position:relative; padding-bottom:56.25%; height:0;\n"
        "              margin:1rem 0; }\n"
        ".video-wrap iframe, .video-wrap video { position:absolute; top:0;\n"
        "                     left:0; width:100%; height:100%; border:0;\n"
        "                     background:#000; border-radius:6px; }\n"
        ".slide { display:block; margin:1.2rem auto; max-width:100%;\n"
        "         border:1px solid var(--md-default-fg-color--lightest);\n"
        "         border-radius:6px; }\n"
        ".slide-cap { display:block; text-align:center; font-size:.8em;\n"
        "             opacity:.7; margin-top:-.6rem; }\n"
        # "In a nutshell" page summary, shown below the section outline in the right panel
        ".toc-summary { margin:1.2rem 0 0; padding:.7rem .8rem;\n"
        "               border-left:3px solid var(--md-accent-fg-color);\n"
        "               background:var(--md-code-bg-color); border-radius:4px; }\n"
        ".toc-summary__label { display:block; font-size:.62rem;\n"
        "               text-transform:uppercase; letter-spacing:.08em;\n"
        "               font-weight:700; opacity:.6; margin-bottom:.25rem; }\n"
        ".toc-summary p { margin:0; font-size:.72rem; line-height:1.45;\n"
        "               opacity:.85; }\n",
        encoding="utf-8",
    )


def write_config(spec, nav):
    cfg = (
        f'site_name: "{spec["title"]} — Study Companion"\n'
        'site_url: "http://127.0.0.1:8000/"\n'
        "docs_dir: docs\n"
        "use_directory_urls: true\n\n"
        "# exercise sources + REM files are not standalone pages\n"
        "exclude_docs: |\n"
        "  **/*.py\n"
        "  **/*_REM.md\n"
        "# transcript pages are linked from their topic, not shown in the nav\n"
        "not_in_nav: |\n"
        "  **/*-transcript.md\n\n"
        "theme:\n"
        "  name: pyodide-mkdocs-theme\n"
        "  custom_dir: overrides\n"
        "  language: en\n"
        "  palette:\n"
        "    - scheme: slate\n"
        "      primary: indigo\n"
        "      accent: indigo\n"
        "      toggle: { icon: material/weather-night, name: Light mode }\n"
        "    - scheme: default\n"
        "      primary: indigo\n"
        "      accent: indigo\n"
        "      toggle: { icon: material/weather-sunny, name: Dark mode }\n"
        "  features:\n"
        "    - navigation.tracking\n"
        "    - navigation.top\n"
        "    - navigation.indexes\n"
        "    - toc.follow\n"
        "    - search.highlight\n"
        "    - search.suggest\n"
        "    - content.code.copy\n\n"
        "extra_css:\n"
        "  - extra.css\n\n"
        "plugins:\n"
        "  - search\n"
        "  - pyodide_macros:\n"
        "      on_error_fail: true\n"
        "      build:\n"
        "        ides_id_hash_mode: relative\n"
        "      project:\n"
        "        id: ml-spec\n"
        "      # suppress PMT's auto-injected demo 'Playground' page (ships in French)\n"
        "      playground:\n"
        "        include: none\n\n"
        "markdown_extensions:\n"
        "  - md_in_html\n"
        "  - admonition\n"
        "  - attr_list\n"
        "  - pymdownx.details\n"
        "  - pymdownx.highlight\n"
        "  - pymdownx.inlinehilite\n"
        "  - pymdownx.snippets\n"
        "  - pymdownx.emoji:\n"
        "      emoji_index: !!python/name:material.extensions.emoji.twemoji\n"
        "      emoji_generator: !!python/name:material.extensions.emoji.to_svg\n"
        "  - pymdownx.superfences:\n"
        "      custom_fences:\n"
        "        - name: mermaid\n"
        "          class: mermaid\n"
        "          format: !!python/name:pymdownx.superfences.fence_code_format\n"
        "  - pymdownx.arithmatex:\n"
        "      generic: true\n"
        "  - pymdownx.striphtml:\n"
        "      strip_js_on_attributes: false\n"
        "      strip_attributes: \"\"\n"
        "  - toc:\n"
        "      permalink: true\n\n"
        "nav:\n" + nav + "\n"
    )
    (Path(__file__).parent / "mkdocs.yml").write_text(cfg, encoding="utf-8")


if __name__ == "__main__":
    main()
