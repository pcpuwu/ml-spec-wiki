---
summary: '<p>TensorFlow trains a network by using back-propagation to compute the derivatives of the cost with respect to every parameter, then feeding them to gradient descent or…</p><span class="toc-summary__sub">Key ideas</span><p class="toc-summary__chips">back-propagation · Informal definition · small · slope · computation graph</p><span class="toc-summary__sub">Key formulas</span><div class="toc-summary__math"><span class="arithmatex">\(J(3.001) = 3.001^2 = 9.006001\)</span><span class="arithmatex">\(\frac{\partial}{\partial w}J(w) \Big|_{w=3} = 6\)</span></div>'
---
# What is a Derivative? (Optional)

> **Course 2 · Week 2** · _AI-generated study aid — not authoritative; trust the lecture & cited sources._

<div class="ep-nav" markdown>

[← Additional Layer Types](../../course-2/week-2/additional-layer-types.md){ .md-button }

[Computation Graph (Optional) →](../../course-2/week-2/computation-graph.md){ .md-button }

</div>

<div class="video-wrap"><video controls preload="none" playsinline src="https://dyckms5inbsqq.cloudfront.net/dlai/advanced-learning-algorithms/W2/L13-C2W2L5S01-what-is-a-derivative-L/lc-advanced-learning-algorithms-W2-L13-C2W2L5S01-what-is-a-derivative-L-master_360p.mp4?v=1752484665">Your browser can't play this video — <a href="https://dyckms5inbsqq.cloudfront.net/dlai/advanced-learning-algorithms/W2/L13-C2W2L5S01-what-is-a-derivative-L/lc-advanced-learning-algorithms-W2-L13-C2W2L5S01-what-is-a-derivative-L-master_360p.mp4?v=1752484665">download the lecture</a>.</video></div>

> 📄 **[Read the full lecture transcript](what-is-a-derivative-transcript.md)**

TensorFlow trains a network by using **back-propagation** to compute the derivatives of the
cost with respect to every parameter, then feeding them to gradient descent or Adam. These
optional videos open up how back-prop works — starting from the very basics of calculus.
(Skippable; a little calculus, but built up from scratch.) `[00:37]`

## The idea: nudge $w$, watch $J$

Use a toy cost $J(w) = w^2$, at $w=3$ so $J=9$. Bump $w$ up by a tiny
$\epsilon = 0.001$: `[01:33]`

$$J(3.001) = 3.001^2 = 9.006001.$$

$J$ went up by about $0.006 = 6\epsilon$. So **when $w$ rises by $\epsilon$, $J$ rises about
$6\times$ as much.** That ratio is the derivative:

$$\frac{\partial}{\partial w}J(w) \Big|_{w=3} = 6.$$

The smaller $\epsilon$ is, the more exact the $6{:}1$ ratio becomes. **Informal definition:**
if bumping $w$ by $\epsilon$ changes $J$ by $k\epsilon$, then the derivative is $k$. `[05:17]`

## Why gradient descent uses it

The update $w_j := w_j - \alpha\,\frac{\partial}{\partial w_j}J$ makes a **small** step when
the derivative is small (changing $w$ barely moves $J$ — don't bother) and a **big** step
when it's large (a tiny change in $w$ moves $J$ a lot — worth it). `[06:48]`

## The derivative depends on $w$

For the *same* function $J=w^2$: at $w=3$ the derivative is $6$; at $w=2$ it's $4$; at
$w=-3$ it's $-6$ (here a bump *up* in $w$ makes $J$ go *down*). Calculus gives the rule
$\frac{\partial}{\partial w}w^2 = 2w$, matching all three. Geometrically, the derivative is
the **slope** of the line tangent to $J(w)$ at that point. `[11:54]`

## Computing derivatives with SymPy

```python
import sympy
J, w = sympy.symbols('J, w')

J = w**2
dJ_dw = sympy.diff(J, w)        # -> 2*w
dJ_dw.subs(w, 2)               # -> 4
```

A few more from SymPy / calculus:

| $J(w)$ | $\dfrac{\partial J}{\partial w}$ | at $w=2$ |
|---|---|---|
| $w^2$ | $2w$ | $4$ |
| $w^3$ | $3w^2$ | $12$ |
| $w$ | $1$ | $1$ |
| $1/w$ | $-1/w^2$ | $-0.25$ |

## A note on notation

Texts write $\frac{d}{dw}J(w)$ when $J$ has a single variable and $\frac{\partial}{\partial
w_i}J$ (the "partial derivative") when it has several. Since our $J$ almost always has many
parameters, Ng just uses the $\partial$ form everywhere — it's the one you've already been
seeing. `[20:02]`

Next: how to chain these derivatives through a network with a **computation graph**. `[22:48]`


<div class="ep-nav" markdown>

[← Additional Layer Types](../../course-2/week-2/additional-layer-types.md){ .md-button }

[Computation Graph (Optional) →](../../course-2/week-2/computation-graph.md){ .md-button }

</div>
