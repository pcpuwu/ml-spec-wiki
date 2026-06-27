# Week 3 — Practice Assignment: Logistic Regression

The graded lab for Week 3, in **two parts**: plain logistic regression, then the
regularized version.

!!! tip "How to do this assignment"
    These functions run **locally** with instant ✓/✗ feedback. In Claude Code, run
    **`/practice C1W3`** — write each function yourself (and get told *why* a test fails)
    or describe the logic and have Claude write the NumPy. A ✓ means "passes the public
    test asserts," not the full server-side autograder.

## Part 1 — Logistic regression

**Problem:** You're a university admissions administrator predicting whether an applicant
is admitted from their **scores on two exams**, using historical applicant data.

| # | Function | What it does | Reading |
|---|----------|--------------|---------|
| 1 | `sigmoid(z)` | The logistic function $g(z) = \frac{1}{1+e^{-z}}$ | [Logistic regression](logistic-regression.md) |
| 2 | `compute_cost(X, y, w, b)` | Logistic (log) loss averaged over the data | [Cost function for logistic regression](cost-function-for-logistic-regression.md) · [Simplified](simplified-cost-function.md) |
| 3 | `compute_gradient(X, y, w, b)` | Gradients $\frac{\partial J}{\partial w}$, $\frac{\partial J}{\partial b}$ | [Gradient descent implementation](gradient-descent-implementation.md) |
| 4 | `predict(X, w, b)` | Turn probabilities into 0/1 labels using a 0.5 threshold | [Decision boundary](decision-boundary.md) |

## Part 2 — Regularized logistic regression

**Problem:** You're a factory product manager deciding whether **microchips pass QA**
from their results on two tests. The data isn't linearly separable, so you map the two
features to higher-order polynomial terms — which makes regularization necessary to avoid
overfitting.

| # | Function | What it does | Reading |
|---|----------|--------------|---------|
| 5 | `compute_cost_reg(X, y, w, b, lambda_)` | Logistic cost **plus** the $\frac{\lambda}{2m}\sum w_j^2$ penalty | [Cost function with regularization](cost-function-with-regularization.md) |
| 6 | `compute_gradient_reg(X, y, w, b, lambda_)` | Gradients with the extra $\frac{\lambda}{m}w_j$ term (b not regularized) | [Regularized logistic regression](regularized-logistic-regression.md) |

Once these pass, the notebook trains the model and **plots the decision boundary** — a
straight line in Part 1, a curved one in Part 2.

## Warm-ups first

The inline browser exercises on [Logistic regression](logistic-regression.md) (sigmoid)
and [Simplified cost function](simplified-cost-function.md) (logistic cost) are the same
core pieces, with no setup.
