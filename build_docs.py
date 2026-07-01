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
    """A glance 'nutshell' for the right panel: a short descriptor + the page's
    key concepts (its bolded terms) + its major display formula(s).

    Returns an HTML fragment (one line). Formulas are wrapped in
    <span class="arithmatex">\\(…\\)</span> so MathJax typesets them in the
    sidebar. An explicit front-matter `summary:` overrides the descriptor only.
    """
    import re, html

    def clean(s):
        s = re.sub(r"`\[[0-9:]+\]`", "", s)              # `[mm:ss]` timestamps
        s = re.sub(r"`([^`]*)`", r"\1", s)               # inline code
        s = re.sub(r"\*\*([^*]+)\*\*", r"\1", s)         # bold
        s = re.sub(r"\*([^*]+)\*", r"\1", s)             # italic
        s = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", s)  # links -> text
        s = re.sub(r"\$([^$]*)\$", r"\1", s)             # inline math -> raw
        s = re.sub(r"[\\${}]", "", s)                     # stray tex chars
        return re.sub(r"\s+", " ", s).strip()

    text = body
    override = None
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            fm = text[3:end]
            m = re.search(r"(?m)^summary:\s*(.+)$", fm)
            if m:
                override = m.group(1).strip().strip("\"'")
            text = text[end + 4 :]

    # 1) descriptor — explicit override, else the first real paragraph (≤170 chars)
    if override is not None:
        desc = override
    else:
        lines = [ln for ln in text.splitlines() if not ln.startswith("# ")]
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
        desc = clean(para)
        if len(desc) > 170:
            cut = desc.rfind(". ", 0, 170)
            desc = desc[: cut + 1] if cut > 90 else desc[:167].rstrip() + "…"

    # 2) key concepts — deliberately bolded terms, minus list-step labels
    #    (the bold that *opens* a "1. **Square it.**"-style list item) & emphasis words
    seen, concepts = set(), []
    for line in body.splitlines():
        lab = re.match(r"\s*(?:\d+\.|[-*])\s+\*\*(.+?)\*\*", line)
        skip = lab.group(1) if lab else None
        for raw in re.findall(r"\*\*(.+?)\*\*", line):
            if raw == skip or "$" in raw:
                continue
            t = clean(raw).rstrip(" .,:;")
            k = t.lower()
            if t and (len(t) >= 5 or " " in t) and len(t) <= 34 and k not in seen:
                seen.add(k)
                concepts.append(t)
    concepts = concepts[:6]

    # 3) major formulae — display $$…$$ blocks. Rank by substance (length is a fair
    #    proxy for "the central result"), keep up to 2, show in document order.
    all_disp = [re.sub(r"\s+", " ", f).strip().rstrip(" .,") for f in re.findall(r"\$\$(.+?)\$\$", body, re.S)]
    ranked = sorted(all_disp, key=len, reverse=True)[:2]
    formulas = [f for f in all_disp if f in ranked]

    parts = []
    if desc:
        parts.append("<p>" + html.escape(desc) + "</p>")
    if concepts:
        chips = " · ".join(html.escape(c) for c in concepts)
        parts.append('<span class="toc-summary__sub">Key ideas</span>'
                     '<p class="toc-summary__chips">' + chips + "</p>")
    if formulas:
        spans = "".join('<span class="arithmatex">\\(' + html.escape(f) + '\\)</span>'
                        for f in formulas)
        label = "Key formula" + ("s" if len(formulas) > 1 else "")
        parts.append('<span class="toc-summary__sub">' + label + "</span>"
                     '<div class="toc-summary__math">' + spans + "</div>")
    return "".join(parts)


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


def check_slides():
    # QA gate: deck section-divider/title pages have a saturated colored left sidebar
    # (blue in C1, red in C2-C3); content whiteboards have a near-white left margin.
    # Warn (non-fatal) so a future slide swap can't silently reintroduce a divider.
    from PIL import Image

    for png in sorted(IMAGES.glob("C*/*.png")):
        im = Image.open(png).convert("RGB")
        w, h = im.size
        band = im.crop((0, 0, int(w * 0.18), h)).resize((16, 32))
        raw = band.tobytes()  # flat RGB
        n = len(raw) // 3
        r = sum(raw[0::3]) / n
        g = sum(raw[1::3]) / n
        b = sum(raw[2::3]) / n
        near_white = r > 195 and g > 195 and b > 195
        saturated = (max(r, g, b) - min(r, g, b)) > 40
        if (not near_white) and saturated:
            print(f"  WARNING: divider-like slide (colored sidebar): {png.parent.name}/{png.name}")


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    check_slides()

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
                # single-quoted YAML scalar: preserves the formulas' backslashes
                # (\\( … \\)) literally; only '' needs escaping.
                fm = f"---\nsummary: '{summary.replace(chr(39), chr(39) * 2)}'\n---\n" if summary else ""
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

    # ---- standalone Coding Labs track (a parallel top-level section) ----
    # Source labs are self-contained tutorials (their own back-links); copied verbatim,
    # no header injection. index.md is the section landing via navigation.indexes.
    labs_src = SRC / "coding-labs"
    lab_files = sorted(labs_src.glob("C*W*.md")) if labs_src.is_dir() else []
    if lab_files:
        (OUT / "coding-labs").mkdir(parents=True, exist_ok=True)
        nav.append('  - "Coding Labs":')
        idx = labs_src / "index.md"
        if idx.exists():
            (OUT / "coding-labs" / "index.md").write_text(idx.read_text(encoding="utf-8"), encoding="utf-8")
            nav.append("      - coding-labs/index.md")
        for lf in lab_files:
            (OUT / "coding-labs" / lf.name).write_text(lf.read_text(encoding="utf-8"), encoding="utf-8")
            nav.append(f'      - "{h1_title(lf, lf.stem)}": coding-labs/{lf.name}')

    write_index(spec)
    write_about()
    write_extra_css()
    write_mathjax()
    write_widgets_js()
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


# ---- inline interactive visualizations (notes: <div class="ml-widget" data-widget="…">) ----
# The harness hydrates every placeholder in place; instant-nav safe via document$.subscribe
# (mirrors write_mathjax()). Each widget is its own file SRC/widgets/<name>.js calling
# MLW.register(name, fn) (+ optional SRC/widgets/<name>.css); write_widgets_js() concatenates
# the harness first, then every widget module.
HARNESS_JS = r"""/* ml-widgets harness — hydrates every <div class="ml-widget" data-widget="…"> in place.
 * Instant-nav safe (document$.subscribe). Widget modules (concatenated after this) call
 * MLW.register(name, function (root) { ... }). */
(function () {
  "use strict";
  var MLW = window.MLW = { _reg: {}, register: function (name, fn) { this._reg[name] = fn; } };
  function hydrate() {
    var nodes = document.querySelectorAll(".ml-widget"), i, root, fn;
    for (i = 0; i < nodes.length; i++) {
      root = nodes[i];
      if (root.dataset.mlwReady) continue;
      root.dataset.mlwReady = "1";
      fn = MLW._reg[root.dataset.widget];
      if (!fn) { root.textContent = "Unknown widget: " + root.dataset.widget; continue; }
      try { fn(root); } catch (e) { root.textContent = "Widget failed to load."; }
    }
  }
  MLW.hydrate = hydrate;
  if (typeof document$ !== "undefined" && document$.subscribe) document$.subscribe(hydrate);
  else document.addEventListener("DOMContentLoaded", hydrate);
})();
"""

WIDGET_CSS = (
    "\n/* ---- inline interactive widgets (ml-widgets.js) ---- */\n"
    ".ml-widget { --mlw-line:#f5b301; --mlw-drag:#ff5c7c; --mlw-resid:#ff5c7c; margin:1.2rem 0; }\n"
    ".mlw-stage { display:flex; gap:1.2rem; flex-wrap:wrap; align-items:flex-start; }\n"
    ".mlw-plot { flex:1 1 340px; min-width:280px; max-width:560px; height:auto;\n"
    "            background:var(--md-code-bg-color);\n"
    "            border:1px solid var(--md-default-fg-color--lightest);\n"
    "            border-radius:8px; touch-action:none; }\n"
    ".mlw-side { flex:1 1 200px; min-width:200px; }\n"
    ".mlw-eq { font-size:1.25rem; font-family:var(--md-code-font-family,monospace); margin-bottom:.6rem; }\n"
    ".mlw-eq b { color:var(--mlw-line); }\n"
    ".mlw-stats { border:1px solid var(--md-default-fg-color--lightest); border-radius:6px;\n"
    "             padding:.2rem .6rem; margin-bottom:.6rem; }\n"
    ".mlw-stats > div { display:flex; justify-content:space-between; gap:1rem; padding:.28rem 0; font-size:.8rem; }\n"
    ".mlw-stats > div + div { border-top:1px solid var(--md-default-fg-color--lightest); }\n"
    ".mlw-stats span:last-child { font-family:var(--md-code-font-family,monospace); }\n"
    ".mlw-tog { display:flex; align-items:center; gap:.4rem; font-size:.8rem; opacity:.85;\n"
    "           margin-bottom:.6rem; cursor:pointer; }\n"
    ".mlw-btns { display:flex; flex-wrap:wrap; gap:.4rem; }\n"
    ".mlw-btns button { font-size:.75rem; padding:.35rem .6rem; cursor:pointer;\n"
    "                   border:1px solid var(--md-default-fg-color--lightest); border-radius:6px;\n"
    "                   background:var(--md-code-bg-color); color:var(--md-default-fg-color); }\n"
    ".mlw-btns button:hover { border-color:var(--md-accent-fg-color); }\n"
    ".mlw-tip { font-size:.75rem; opacity:.7; margin:.6rem 0 0; line-height:1.45; }\n"
    ".mlw-grid { stroke:var(--md-default-fg-color--lightest); stroke-width:1; }\n"
    ".mlw-axis { stroke:var(--md-default-fg-color--light); stroke-width:1.5; }\n"
    ".mlw-line { stroke:var(--mlw-line); stroke-width:3; }\n"
    ".mlw-resid-line { stroke:var(--mlw-resid); stroke-width:1.5; stroke-dasharray:3 3; opacity:.8; }\n"
    ".mlw-dot { fill:var(--md-accent-fg-color); stroke:var(--md-default-bg-color); stroke-width:1.5; cursor:grab; }\n"
    ".mlw-dot--drag { fill:var(--mlw-drag); }\n"
    ".mlw-dot--out { fill:var(--mlw-drag); stroke:var(--md-default-bg-color); stroke-width:2; }\n"
    ".mlw-outlabel { fill:var(--mlw-drag); font-size:13px; font-weight:700;\n"
    "                font-family:var(--md-text-font-family,sans-serif); }\n"
    ".mlw-ghost { stroke:var(--md-default-fg-color--light); stroke-width:2;\n"
    "             stroke-dasharray:6 5; opacity:.55; }\n"
    ".mlw-ghost-note { font-size:.75rem; opacity:.9; margin:0 0 .6rem; line-height:1.45;\n"
    "                  border-left:3px solid var(--mlw-drag); padding-left:.55rem; }\n"
    ".mlw-ghost-note b { color:var(--mlw-drag); }\n"
    ".md-typeset .mlw-caption { font-size:.78rem; opacity:.75; line-height:1.5;\n"
    "                           margin:.4rem 0 1.2rem; max-width:640px; }\n"
    ".md-typeset .mlw-caption code { font-size:.9em; }\n"
)


def write_widgets_js():
    # harness first, then every widget module (SRC/widgets/*.js), concatenated into one file
    js_dir = OUT / "javascripts"
    js_dir.mkdir(parents=True, exist_ok=True)
    parts = [HARNESS_JS]
    widgets_src = SRC / "widgets"
    if widgets_src.is_dir():
        for wj in sorted(widgets_src.glob("*.js")):
            parts.append("/* ===== widget: " + wj.name + " ===== */\n" + wj.read_text(encoding="utf-8"))
    (js_dir / "ml-widgets.js").write_text("\n".join(parts), encoding="utf-8")


def write_extra_css():
    css = (
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
        ".toc-summary p { margin:0 0 .5rem; font-size:.72rem; line-height:1.45;\n"
        "               opacity:.85; }\n"
        ".toc-summary p:last-child { margin-bottom:0; }\n"
        ".toc-summary__sub { display:block; font-size:.6rem; font-weight:700;\n"
        "               text-transform:uppercase; letter-spacing:.06em; opacity:.55;\n"
        "               margin:.2rem 0 .15rem; }\n"
        ".toc-summary__chips { opacity:.95 !important; }\n"
        ".toc-summary__math { font-size:.78rem; overflow-x:auto; margin-bottom:.1rem; }\n"
        ".toc-summary__math .arithmatex { display:block; margin:.15rem 0; }\n"
        # PMT leaves static fenced code blocks transparent (no box). Give them a clear\n
        # boundary; keep --md-code-bg-color dark in slate (PMT left it the light default).\n
        '[data-md-color-scheme="slate"] { --md-code-bg-color: hsla(232,12%,16%,1); }\n'
        ".md-typeset .highlight { background:var(--md-code-bg-color);\n"
        "         border:1px solid var(--md-default-fg-color--lightest);\n"
        "         border-radius:6px; margin:1rem 0; }\n"
        ".md-typeset .highlight > pre { margin:0; }\n"
        ".md-typeset .highlight > pre > code { background:transparent; }\n"
        + WIDGET_CSS
    )
    # append each widget's own CSS (SRC/widgets/*.css), so widgets stay self-contained
    widgets_src = SRC / "widgets"
    if widgets_src.is_dir():
        for wc in sorted(widgets_src.glob("*.css")):
            css += "\n/* widget: " + wc.name + " */\n" + wc.read_text(encoding="utf-8")
    (OUT / "extra.css").write_text(css, encoding="utf-8")


def write_mathjax():
    # arithmatex(generic) only emits <span class="arithmatex">\(...\)</span>; we must load
    # + configure MathJax ourselves. document$.subscribe re-typesets after instant-nav.
    js = (
        "window.MathJax = {\n"
        '  tex: { inlineMath: [["\\\\(", "\\\\)"]], displayMath: [["\\\\[", "\\\\]"]],\n'
        "         processEscapes: true, processEnvironments: true },\n"
        '  options: { ignoreHtmlClass: ".*|", processHtmlClass: "arithmatex" }\n'
        "};\n"
        "document$.subscribe(() => {\n"
        "  MathJax.startup.output.clearCache(); MathJax.typesetClear();\n"
        "  MathJax.texReset(); MathJax.typesetPromise();\n"
        "});\n"
    )
    js_dir = OUT / "javascripts"
    js_dir.mkdir(parents=True, exist_ok=True)
    (js_dir / "mathjax.js").write_text(js, encoding="utf-8")


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
        "extra_javascript:\n"
        "  - javascripts/mathjax.js\n"
        "  - https://unpkg.com/mathjax@3/es5/tex-mml-chtml.js\n"
        "  - javascripts/ml-widgets.js\n\n"
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
