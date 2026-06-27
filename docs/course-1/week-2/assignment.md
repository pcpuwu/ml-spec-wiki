# Week 2 — Practice Assignment: Linear Regression

The graded lab for Week 2. You implement linear regression from scratch and run it on a
real dataset.

!!! tip "How to do this assignment"
    These functions run **locally** (not in the browser), with instant ✓/✗ feedback.
    In Claude Code, run **`/practice C1W2`** — it opens the loop where you either write
    each function yourself (and get told *why* a test fails) or describe the logic in
    words and have Claude write the NumPy. The grader checks your code against the
    assignment's own test cases.

    A ✓ means **"passes the public test asserts"** — the same ones in the Coursera
    notebook — not the full server-side autograder.

## Problem statement

You're the CEO of a restaurant franchise considering new cities for an outlet. You have
historical data of **city population → restaurant profit**, and you want to predict
profit for candidate cities. You'll fit a single-feature linear regression
($f_{w,b}(x) = wx + b$) to that data.

## What you implement

| # | Function | What it does | Reading |
|---|----------|--------------|---------|
| 1 | `compute_cost(x, y, w, b)` | Squared-error cost $J(w,b) = \frac{1}{2m}\sum (f_{w,b}(x^{(i)}) - y^{(i)})^2$ | [Cost function](../week-1/cost-function.md) |
| 2 | `compute_gradient(x, y, w, b)` | The partial derivatives $\frac{\partial J}{\partial w}$ and $\frac{\partial J}{\partial b}$ that drive each gradient-descent step | [Gradient descent for linear regression](../week-1/gradient-descent-for-linear-regression.md) |

Once both pass, the notebook uses them to **run batch gradient descent** and fit the
model — you'll see the learned line and use it to predict profits.

## Warm-ups first

If you haven't already, do the inline browser exercises on the
[Cost function](../week-1/cost-function.md) and
[Vectorization, Part 1](vectorization-part-1.md) pages — they're the same ideas in
miniature, with no setup.
