---
summary: "The final back-prop intuition video: the same computation graph on a network with a hidden layer."
---
# Larger Neural Network Example (Optional)

> **Course 2 · Week 2** · _AI-generated study aid — not authoritative; trust the lecture & cited sources._

<div class="ep-nav" markdown>

[← Computation Graph (Optional)](../../course-2/week-2/computation-graph.md){ .md-button }

[Deciding What to Try Next →](../../course-2/week-3/deciding-what-to-try-next.md){ .md-button }

</div>

<div class="video-wrap"><video controls preload="none" playsinline src="https://dyckms5inbsqq.cloudfront.net/dlai/advanced-learning-algorithms/W2/L15-C2W2L5S03-larger-neural-network-/lc-advanced-learning-algorithms-W2-L15-C2W2L5S03-larger-neural-network--master_360p.mp4?v=1752484665">Your browser can't play this video — <a href="https://dyckms5inbsqq.cloudfront.net/dlai/advanced-learning-algorithms/W2/L15-C2W2L5S03-larger-neural-network-/lc-advanced-learning-algorithms-W2-L15-C2W2L5S03-larger-neural-network--master_360p.mp4?v=1752484665">download the lecture</a>.</video></div>

> 📄 **[Read the full lecture transcript](larger-neural-network-example-transcript.md)**

The final back-prop intuition video: the same computation graph on a network with a hidden
layer. `[00:00]`

## The network

Input → one hidden unit ($a^{[1]}$) → output unit ($a^{[2]}$), **ReLU** activation
$g(z)=\max(0,z)$. One example: $x=1,\ y=5$, parameters $w_1=2,\ b_1=0,\ w_2=3,\ b_2=1$. `[00:11]`

Forward prop (both units land in the positive part of ReLU, so $g(z)=z$):

$$a^{[1]} = g(w_1 x + b_1) = 2,\qquad
a^{[2]} = g(w_2 a^{[1]} + b_2) = 3\cdot 2 + 1 = 7,$$
$$J = \tfrac12\big(a^{[2]} - y\big)^2 = \tfrac12(7-5)^2 = 2.$$

## As a computation graph

Break it into nodes: $t_1 = w_1 x \to z_1 = t_1 + b_1 \to a^{[1]} = g(z_1) \to
t_2 = w_2 a^{[1]} \to z_2 = t_2 + b_2 \to a^{[2]} = g(z_2) \to J = \tfrac12(a^{[2]}-y)^2$. `[02:35]`

Back-prop then sweeps **right-to-left**, filling in $\frac{\partial J}{\partial a^{[2]}}=2$,
$\frac{\partial J}{\partial z_2}=2$, … all the way to the four parameter derivatives
$\frac{\partial J}{\partial w_1}, \frac{\partial J}{\partial b_1},
\frac{\partial J}{\partial w_2}, \frac{\partial J}{\partial b_2}$. `[04:33]`

Check $\frac{\partial J}{\partial w_1}=6$: with $w_1 = 2.001$, forward prop gives $a^{[1]}=2.001$,
$a^{[2]}=7.003$, and $J = \tfrac12(2.003)^2 \approx 2.006$ — up $\approx 6\epsilon$. Confirmed. `[06:15]`

## The payoff: automatic differentiation

Doing this one parameter at a time (bump each, re-run forward prop) costs $N\times P$ steps —
hopelessly slow for real networks. Back-prop on the computation graph gets **all** the
derivatives in $\approx N+P$ steps. `[07:24]`

Years ago, researchers derived network derivatives **by hand** with calculus and coded them
up. Modern frameworks do this for you via **automatic differentiation** ("autodiff", usually
built on the computation graph): you specify forward prop, and the framework handles
back-prop. The bar of calculus you need to train a network has actually **dropped** because
of it. `[09:12]`

That wraps up Week 2 — you can now train neural networks, choose activations, do multiclass
and multi-label classification, use Adam, and you know what's happening under the hood. `[09:42]`


<div class="ep-nav" markdown>

[← Computation Graph (Optional)](../../course-2/week-2/computation-graph.md){ .md-button }

[Deciding What to Try Next →](../../course-2/week-3/deciding-what-to-try-next.md){ .md-button }

</div>
