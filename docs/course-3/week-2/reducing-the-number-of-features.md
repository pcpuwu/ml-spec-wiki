---
summary: "The rest of this week is a set of optional videos on Principal Components Analysis (PCA) — an unsupervised algorithm that takes data with many features (50, 1000, more) and reduces it to 2 or 3 so you can plot and visualize it."
---
# Reducing the Number of Features (PCA)

> **Course 3 · Week 2** · _AI-generated study aid — not authoritative; trust the lecture & cited sources._

<div class="ep-nav" markdown>

[← TensorFlow Implementation of Content-Based Filtering](../../course-3/week-2/tensorflow-implementation-of-content-based-filtering.md){ .md-button }

[PCA Algorithm →](../../course-3/week-2/pca-algorithm.md){ .md-button }

</div>

<div class="video-wrap"><video controls preload="none" playsinline src="https://dyckms5inbsqq.cloudfront.net/dlai/unsupervised-learning-recommenders-reinforcement-learning/W2/L13-MLS-C3W2L4S01-reducing-the-numbe/lc-unsupervised-learning-recommenders-reinforcement-learning-W2-L13-MLS-C3W2L4S01-reducing-the-numbe-master_360p.mp4?v=1752487439">Your browser can't play this video — <a href="https://dyckms5inbsqq.cloudfront.net/dlai/unsupervised-learning-recommenders-reinforcement-learning/W2/L13-MLS-C3W2L4S01-reducing-the-numbe/lc-unsupervised-learning-recommenders-reinforcement-learning-W2-L13-MLS-C3W2L4S01-reducing-the-numbe-master_360p.mp4?v=1752487439">download the lecture</a>.</video></div>

> 📄 **[Read the full lecture transcript](reducing-the-number-of-features-transcript.md)**

The rest of this week is a set of **optional** videos on **Principal Components Analysis
(PCA)** — an unsupervised algorithm that takes data with many features (50, 1000, more) and
**reduces it to 2 or 3** so you can plot and visualize it. `[00:01]`

!!! info "These PCA lessons are optional — and slide-free"
    Ng presents PCA as a bonus topic with no accompanying lecture deck in the course's slide
    PDFs, so (as with the Course 2 backprop trio) these notes are woven purely from the
    official transcript. The math is reconstructed below in LaTeX.

## The idea, by example

Take passenger cars with features like length $x_1$, width $x_2$, wheel diameter, height: `[00:59]`

- **$x_1$ length vs. $x_2$ width:** road-lane limits mean width barely varies while length
  varies a lot — so PCA essentially **keeps $x_1$ and drops $x_2$**.
- **$x_1$ length vs. $x_2$ height:** *both* vary meaningfully (bigger cars are longer **and**
  taller). Picking just $x_1$ or just $x_2$ loses information. Instead, PCA invents a **new
  axis $z$** — a *combination* of $x_1$ and $x_2$ that lies within the plane — roughly
  capturing the car's overall **size**. One number on $z$ then summarizes both. `[03:55]`

## Why it's useful

You can't plot 50-dimensional data. PCA compresses 50 features down to $z_1, z_2$
(2 numbers) so each example becomes a point you can actually see. For example, with country
data (GDP, per-capita GDP, HDI, life expectancy, … — 50 features), PCA might surface
$z_1 \approx$ "size of the economy" and $z_2 \approx$ "per-person economic activity," letting
you scatter-plot every country. `[08:37]`

A 3-D dataset that actually lies on a thin "pancake" can likewise be flattened to 2-D with
almost no loss. Visualizing data this way often reveals something unexpected going on. `[07:31]`

Next: **how** PCA chooses that new axis. `[12:17]`


<div class="ep-nav" markdown>

[← TensorFlow Implementation of Content-Based Filtering](../../course-3/week-2/tensorflow-implementation-of-content-based-filtering.md){ .md-button }

[PCA Algorithm →](../../course-3/week-2/pca-algorithm.md){ .md-button }

</div>
