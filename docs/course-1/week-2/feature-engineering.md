---
summary: '<p>The choice of features can have a huge impact on how well a learning algorithm performs. For many real applications, designing the right features is a critical step.</p><span class="toc-summary__sub">Key ideas</span><p class="toc-summary__chips">choice of features · frontage · depth · intuition · new feature · Feature engineering</p><span class="toc-summary__sub">Key formula</span><div class="toc-summary__math"><span class="arithmatex">\(x_3 = x_1 \times x_2 \quad(\text{area})\)</span></div>'
---
# Feature Engineering

> **Course 1 · Week 2** · _AI-generated study aid — not authoritative; trust the lecture & cited sources._

<div class="ep-nav" markdown>

[← Choosing the Learning Rate](../../course-1/week-2/choosing-the-learning-rate.md){ .md-button }

[Polynomial Regression →](../../course-1/week-2/polynomial-regression.md){ .md-button }

</div>

<div class="video-wrap"><iframe src="https://www.youtube-nocookie.com/embed/ecOdZlY9jsQ" title="Lecture video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

> 📄 **[Read the full lecture transcript](feature-engineering-transcript.md)**

The **choice of features** can have a huge impact on how well a learning algorithm
performs. For many real applications, designing the right features is a critical step.
`[00:01]`

## A worked example `[00:21]`

Predict a house's price from two features of its plot of land:

- $x_1$ = **frontage** (the width of the lot),
- $x_2$ = **depth** of the lot.

The obvious model is $f_{\vec{w},b}(\vec{x}) = w_1 x_1 + w_2 x_2 + b$, and it works okay.
But you might have an **intuition** that the **area** of the land predicts price better
than width and depth separately. `[01:17]`

So define a **new feature**

$$x_3 = x_1 \times x_2 \quad(\text{area}),$$

and use $f_{\vec{w},b}(\vec{x}) = w_1 x_1 + w_2 x_2 + w_3 x_3 + b$. Now the model can
decide — via $w_1, w_2, w_3$ — whether frontage, depth, or **area** matters most for
price. `[02:12]`


![Feature engineering: from frontage and depth, create a new 'area = frontage × depth' feature the model can use](feature-engineering-area.png){ .slide }
_Andrew Ng's engineering a new feature slide (Stanford / DeepLearning.AI)._
{ .slide-cap }
## What feature engineering is `[02:12]`

> **Feature engineering:** using your knowledge or intuition about the problem to design
> new features — usually by **transforming or combining** the original ones — to make it
> easier for the algorithm to predict accurately.

Rather than only using the features you happened to start with, defining new ones can
yield a much better model. `[02:47]`

One especially powerful flavour of feature engineering lets you fit **curves**, not just
straight lines — that's **polynomial regression**, next. `[02:58]`


<div class="ep-nav" markdown>

[← Choosing the Learning Rate](../../course-1/week-2/choosing-the-learning-rate.md){ .md-button }

[Polynomial Regression →](../../course-1/week-2/polynomial-regression.md){ .md-button }

</div>
