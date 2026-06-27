---
summary: "How does PCA actually pick the new axis z? It chooses the direction that, when you project the data onto it, preserves the most variance (spread) — and therefore the most information."
---
# PCA Algorithm

> **Course 3 · Week 2** · _AI-generated study aid — not authoritative; trust the lecture & cited sources._

<div class="ep-nav" markdown>

[← Reducing the Number of Features (PCA)](../../course-3/week-2/reducing-the-number-of-features.md){ .md-button }

[PCA in Code →](../../course-3/week-2/pca-in-code.md){ .md-button }

</div>

<div class="video-wrap"><video controls preload="none" playsinline src="https://dyckms5inbsqq.cloudfront.net/dlai/unsupervised-learning-recommenders-reinforcement-learning/W2/L14-MLS-C3W2L4S02-PCA-algorithm-L14/lc-unsupervised-learning-recommenders-reinforcement-learning-W2-L14-MLS-C3W2L4S02-PCA-algorithm-L14-master_360p.mp4?v=1752487439">Your browser can't play this video — <a href="https://dyckms5inbsqq.cloudfront.net/dlai/unsupervised-learning-recommenders-reinforcement-learning/W2/L14-MLS-C3W2L4S02-PCA-algorithm-L14/lc-unsupervised-learning-recommenders-reinforcement-learning-W2-L14-MLS-C3W2L4S02-PCA-algorithm-L14-master_360p.mp4?v=1752487439">download the lecture</a>.</video></div>

> 📄 **[Read the full lecture transcript](pca-algorithm-transcript.md)**

How does PCA actually pick the new axis $z$? It chooses the direction that, when you
**project** the data onto it, **preserves the most variance** (spread) — and therefore the
most information. `[00:02]`

!!! info "Optional topic — transcript-only (no lecture deck)"
    Like the other PCA videos, this is an optional lesson with no slide PDF in the course
    materials; the figures are described and the math reconstructed from the transcript.

## Preprocessing

Before PCA, **normalize features to zero mean** (subtract each feature's mean). If features
are on very different scales (e.g. house size in sq ft vs. number of bedrooms), also apply
**feature scaling** first. `[01:14]`

## Projection and the principal component

"Projecting" example $\vec{x}$ onto axis $z$ means dropping a perpendicular (90°) from the
point onto the axis and recording where it lands. Different candidate axes preserve different
amounts of spread: `[03:24]`

- A poorly chosen axis **squishes** the projected points together → low variance → little
  information retained.
- The **principal component** is the axis on which the projected points are **most spread
  out** → maximum variance retained. That's what PCA picks to reduce data to one dimension. `[06:13]`

## Computing a projection

The chosen axis is represented by a **length-1 vector**. If PCA's axis is the unit vector
$\vec{u} = [0.71, 0.71]$ and an example sits at $\vec{x} = [2, 3]$, project it by the **dot
product**: `[08:21]`

$$z = \vec{x}\cdot\vec{u} = 2(0.71) + 3(0.71) = 3.55.$$

So this 2-D example is captured by the single number $3.55$ (its distance along $z$). `[09:55]`

## More components are orthogonal

A second principal component is always at **90° (perpendicular)** to the first; a third is
perpendicular to both, and so on. To go from 50 features to 3, PCA finds three mutually
perpendicular axes. `[10:13]`

## PCA is NOT linear regression

A common confusion — they're completely different: `[11:45]`

- **Linear regression** is *supervised*: it has a special label $y$ and minimizes the
  **vertical** distances between the line and $y$ (predicting $y$ from $x$).
- **PCA** is *unsupervised*: there's no $y$; it treats all features **equally** and minimizes
  the **perpendicular** distances of points to the axis $z$ (equivalently, maximizes the
  projected variance). With more than two features the two algorithms diverge enormously and
  serve totally different purposes. `[14:11]`

## Reconstruction

You can approximately **invert** the projection: from $z = 3.55$, reconstruct
$\hat{\vec{x}} = z\,\vec{u} = 3.55 \times [0.71, 0.71] = [2.52, 2.52]$ — close to the original
$[2, 3]$. You can't recover $\vec{x}$ exactly (information was dropped), but it's a reasonable
approximation. `[15:19]`

Next: running PCA in code with scikit-learn. `[17:40]`


<div class="ep-nav" markdown>

[← Reducing the Number of Features (PCA)](../../course-3/week-2/reducing-the-number-of-features.md){ .md-button }

[PCA in Code →](../../course-3/week-2/pca-in-code.md){ .md-button }

</div>
