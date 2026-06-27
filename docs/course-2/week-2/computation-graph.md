---
summary: '<p>The computation graph is the key idea behind how frameworks like TensorFlow automatically compute the derivatives of a neural network.</p><span class="toc-summary__sub">Key ideas</span><p class="toc-summary__chips">computation graph · Forward prop · right-to-left · chain rule</p><span class="toc-summary__sub">Key formula</span><div class="toc-summary__math"><span class="arithmatex">\(c = wx = -4,\qquad a = c + b = 4,\qquad d = a - y = 2,\qquad J = \tfrac12 d^2 = 2\)</span></div>'
---
# Computation Graph (Optional)

> **Course 2 · Week 2** · _AI-generated study aid — not authoritative; trust the lecture & cited sources._

<div class="ep-nav" markdown>

[← What is a Derivative? (Optional)](../../course-2/week-2/what-is-a-derivative.md){ .md-button }

[Larger Neural Network Example (Optional) →](../../course-2/week-2/larger-neural-network-example.md){ .md-button }

</div>

<div class="video-wrap"><video controls preload="none" playsinline src="https://dyckms5inbsqq.cloudfront.net/dlai/advanced-learning-algorithms/W2/L14-C2W2L5S02-computation-graph-L14/lc-advanced-learning-algorithms-W2-L14-C2W2L5S02-computation-graph-L14-master_360p.mp4?v=1752484665">Your browser can't play this video — <a href="https://dyckms5inbsqq.cloudfront.net/dlai/advanced-learning-algorithms/W2/L14-C2W2L5S02-computation-graph-L14/lc-advanced-learning-algorithms-W2-L14-C2W2L5S02-computation-graph-L14-master_360p.mp4?v=1752484665">download the lecture</a>.</video></div>

> 📄 **[Read the full lecture transcript](computation-graph-transcript.md)**

The **computation graph** is the key idea behind how frameworks like TensorFlow
automatically compute the derivatives of a neural network. `[00:00]`

## A tiny network, broken into steps

One linear unit: $a = wx + b$ (linear regression as a one-unit network), with squared-error
cost $J = \tfrac12(a - y)^2$. One training example: $x=-2,\ y=2$, parameters $w=2,\ b=8$. `[01:04]`

**Forward prop** (left → right), introducing intermediate nodes:

$$c = wx = -4,\qquad a = c + b = 4,\qquad d = a - y = 2,\qquad J = \tfrac12 d^2 = 2.$$

## Back-prop = right → left

Forward prop went left-to-right; computing derivatives goes **right-to-left** — hence
"back-prop." Each step uses the same nudge-by-$\epsilon$ idea from the last lesson. `[04:27]`

- **$d$:** $J=\tfrac12 d^2$, so if $d$ rises by $\epsilon$, $J$ rises $2\epsilon$ →
  $\frac{\partial J}{\partial d}=2$.
- **$a$:** $d = a-y$, so a bump in $a$ passes straight to $d$ → $\frac{\partial J}{\partial a}=2$.
- **$c$ and $b$:** $a = c+b$, so each passes straight to $a$ →
  $\frac{\partial J}{\partial c}=2,\ \frac{\partial J}{\partial b}=2$.
- **$w$:** $c = wx$ with $x=-2$, so bumping $w$ by $\epsilon$ moves $c$ by $-2\epsilon$, and
  since $J$ moves $2\times$ $c$, $J$ moves $-4\epsilon$ → $\frac{\partial J}{\partial w}=-4$. `[12:13]`

(If you know the **chain rule**, each step is exactly $\frac{\partial J}{\partial(\text{node})}
= \frac{\partial(\text{next})}{\partial(\text{node})}\cdot\frac{\partial J}{\partial(\text{next})}$
— but you don't need it to follow the logic.) `[07:38]`

Sanity check: recomputing $J$ with $w=2.001$ gives $1.996002$ — down $\approx 4\epsilon$,
confirming $\frac{\partial J}{\partial w}=-4$. `[14:33]`

## Why right-to-left, and why it's efficient

Going backwards, $\frac{\partial J}{\partial a}$ is computed **once** and reused for *both*
$\frac{\partial J}{\partial w}$ and $\frac{\partial J}{\partial b}$. For a graph with $N$
nodes and $P$ parameters, back-prop finds **all** derivatives in roughly $N+P$ steps instead
of $N\times P$. For a network with 10,000 nodes and 100,000 parameters that's ~110,000 steps
versus ~1,000,000,000 — which is exactly why back-prop is foundational to deep learning. `[18:37]`

Next: the same procedure on a larger network. `[19:16]`


<div class="ep-nav" markdown>

[← What is a Derivative? (Optional)](../../course-2/week-2/what-is-a-derivative.md){ .md-button }

[Larger Neural Network Example (Optional) →](../../course-2/week-2/larger-neural-network-example.md){ .md-button }

</div>
