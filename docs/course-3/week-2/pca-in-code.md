---
summary: '<p>PCA is a few lines with scikit-learn: optionally scale, fit to find the principal components, check how much variance they explain, then transform (project).</p><span class="toc-summary__sub">Key ideas</span><p class="toc-summary__chips">scikit-learn · 99.2% · n_components=2 · exact · projection · reconstruction</p>'
---
# PCA in Code

> **Course 3 · Week 2** · _AI-generated study aid — not authoritative; trust the lecture & cited sources._

<div class="ep-nav" markdown>

[← PCA Algorithm](../../course-3/week-2/pca-algorithm.md){ .md-button }

[What is Reinforcement Learning? →](../../course-3/week-3/what-is-reinforcement-learning.md){ .md-button }

</div>

<div class="video-wrap"><video controls preload="none" playsinline src="https://dyckms5inbsqq.cloudfront.net/dlai/unsupervised-learning-recommenders-reinforcement-learning/W2/L15-MLS-C3W2L4S03-PCA-in-code-L15/lc-unsupervised-learning-recommenders-reinforcement-learning-W2-L15-MLS-C3W2L4S03-PCA-in-code-L15-master_360p.mp4?v=1752487439">Your browser can't play this video — <a href="https://dyckms5inbsqq.cloudfront.net/dlai/unsupervised-learning-recommenders-reinforcement-learning/W2/L15-MLS-C3W2L4S03-PCA-in-code-L15/lc-unsupervised-learning-recommenders-reinforcement-learning-W2-L15-MLS-C3W2L4S03-PCA-in-code-L15-master_360p.mp4?v=1752487439">download the lecture</a>.</video></div>

> 📄 **[Read the full lecture transcript](pca-in-code-transcript.md)**

PCA is a few lines with **scikit-learn**: optionally scale, `fit` to find the principal
components, check how much variance they explain, then `transform` (project). `[00:02]`

!!! info "Optional topic — transcript-only (no lecture deck)"
    The final optional PCA video; notes woven from the official transcript, with a runnable
    cell below so you can try it yourself.

## The four steps

1. **Feature scaling** (optional) — if features have very different ranges (GDP in trillions
   vs. counts under 100), scale them so PCA finds good axes. `[00:11]`
2. **`fit`** — runs PCA to obtain the new axes $z_1, z_2, (z_3)$. `fit` **automatically
   mean-normalizes** for you, so you don't do that separately. `[00:45]`
3. **`explained_variance_ratio_`** — tells you what fraction of the data's variance each
   principal component captures (i.e. how much information you kept). `[01:56]`
4. **`transform`** — projects each example onto the components, giving the 2–3 numbers to
   plot. `[02:28]`

## Example

```python
from sklearn.decomposition import PCA
import numpy as np

X = np.array([[1, 1], [2, 1], [3, 2], [-1, -1], [-2, -1], [-3, -2]])

pca_1 = PCA(n_components=1)      # reduce 2 features -> 1
pca_1.fit(X)                     # fit also mean-normalizes
print(pca_1.explained_variance_ratio_)   # [0.992]  -> 99.2% of variance kept
print(pca_1.transform(X))        # each example -> 1 number, e.g. first row -> 1.383
```

With **one** component, the single axis explains **99.2%** of the variance — so collapsing
this 2-D data to one number loses almost nothing. `[03:40]`

If you instead ask for **`n_components=2`** on 2-D data, the ratios are `[0.992, 0.008]`,
summing to 1.0 — two axes explain 100% of the variance, and reconstruction is **exact**
(no information lost when output dimension = input dimension). `[05:35]`

Try it yourself — implement PCA's **projection** (dot product) and **reconstruction**
($z\,\vec{u}$) from the lecture, then hit **Validate**:

{{ IDE('pca_explore_exo') }}

## Ng's advice: what PCA is (and isn't) for today

- **Visualization** — the main use: reduce to 2–3 numbers and plot. Still very useful. `[07:45]`
- **Data compression** — store/transmit fewer numbers. Used to matter; **rarely worth it now**
  given cheap storage and bandwidth. `[08:10]`
- **Speeding up supervised training** — reduce features so the model runs faster. Helped older
  algorithms (e.g. SVMs) but, with modern **deep learning**, usually **doesn't help** — just
  feed the high-dimensional data straight into the network. `[09:13]`

That closes Course 3, Week 2. Next week: **reinforcement learning**. `[10:30]`


<div class="ep-nav" markdown>

[← PCA Algorithm](../../course-3/week-2/pca-algorithm.md){ .md-button }

[What is Reinforcement Learning? →](../../course-3/week-3/what-is-reinforcement-learning.md){ .md-button }

</div>
