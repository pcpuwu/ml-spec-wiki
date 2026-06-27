# Week 3 — Test Yourself

Answer, then hit **Validate** for instant feedback. (Questions shuffle on retry.)

{{ multi_qcm(
    [
        "Why is plain **linear regression** a poor choice for binary classification?",
        [
            "It can't be trained with gradient descent",
            "Adding one far-off example can tilt the best-fit line and shift the 0.5 threshold, misclassifying points",
            "It only works with exactly two features",
            "It always outputs exactly 0 or 1",
        ],
        [2],
        "A single outlier drags the straight-line fit, moving where it crosses 0.5 — so previously-correct points flip. Logistic regression, bounded to (0,1), avoids this.",
    ],
    [
        "The **sigmoid** $g(z) = \\frac{1}{1+e^{-z}}$ outputs…",
        [
            "Any real number",
            "A value strictly between 0 and 1, equal to 0.5 at $z=0$",
            "Either 0 or 1 only",
            "A value between -1 and 1",
        ],
        [2],
        "Sigmoid squashes any $z$ into (0,1): near 1 for large positive $z$, near 0 for large negative $z$, and exactly 0.5 at $z=0$.",
    ],
    [
        "Logistic regression outputs $f(\\vec{x}) = 0.3$. How do you interpret it?",
        [
            "The prediction is definitely $y=0$",
            "A 30% estimated probability that $y=1$ (and 70% that $y=0$)",
            "The cost is 0.3",
            "The 30th training example",
        ],
        [2],
        "$f(\\vec{x})$ is the estimated $P(y=1\\mid\\vec{x})$. So 0.3 means a 30% chance of $y=1$ and, since the two must sum to 1, a 70% chance of $y=0$.",
    ],
    [
        "With a 0.5 threshold, logistic regression predicts $\\hat{y}=1$ exactly when…",
        [
            "$\\vec{w}\\cdot\\vec{x} + b \\ge 0$",
            "$\\vec{w}\\cdot\\vec{x} + b < 0$",
            "$f(\\vec{x}) < 0.5$",
            "$b \\ge 0$",
        ],
        [1],
        "$f \\ge 0.5 \\iff g(z) \\ge 0.5 \\iff z \\ge 0 \\iff \\vec{w}\\cdot\\vec{x}+b \\ge 0$. The boundary $z=0$ is the decision boundary.",
    ],
    [
        "Why **not** use squared-error cost for logistic regression?",
        [
            "It would be too easy to minimize",
            "Plugging in the sigmoid makes that cost non-convex — gradient descent can get stuck in local minima",
            "It can't handle two features",
            "It requires feature scaling",
        ],
        [2],
        "Squared error with the sigmoid inside gives a wiggly, non-convex surface. The logistic (log) loss restores convexity, so gradient descent reliably finds the global minimum.",
    ],
    [
        "In the logistic loss, if the true label is $y=1$ but the model predicts $f$ close to **0**, the loss…",
        [
            "Is close to 0",
            "Is negative",
            "Becomes very large (approaches infinity)",
            "Equals exactly 0.5",
        ],
        [3],
        "For $y=1$ the loss is $-\\log(f)$, which blows up toward infinity as $f\\to 0$ — confidently-wrong predictions are penalized heavily.",
    ],
    [
        "A model fits the **training set almost perfectly** but predicts badly on new data. This is…",
        [
            "Underfitting / high bias",
            "Overfitting / high variance",
            "Convergence",
            "Feature scaling",
        ],
        [2],
        "Fitting the training data too well (every wiggle) but failing to generalize is overfitting, a.k.a. high variance. The opposite — too simple to even fit the training data — is underfitting / high bias.",
    ],
    [
        "Which is **NOT** one of the three ways to address overfitting covered this week?",
        [
            "Collect more training data",
            "Use fewer / more relevant features (feature selection)",
            "Regularization (shrink the parameters)",
            "Increase the learning rate $\\alpha$ until the cost rises",
        ],
        [4],
        "The three tools are: more data, fewer features, and regularization. The learning rate controls gradient-descent step size, not overfitting.",
    ],
    [
        "In the regularized cost $\\dots + \\frac{\\lambda}{2m}\\sum_j w_j^2$, what happens as $\\lambda \\to \\infty$?",
        [
            "The model overfits more",
            "All weights $w_j$ are driven toward 0, so the model underfits (≈ a flat line)",
            "The bias $b$ is forced to 0",
            "Nothing — $\\lambda$ has no effect",
        ],
        [2],
        "A huge $\\lambda$ makes the penalty dominate, crushing the weights to ~0 so $f(\\vec{x})\\approx b$ — underfitting. $\\lambda=0$ removes regularization (overfit). A middle $\\lambda$ balances the two.",
    ],
    [
        "Comparing the gradient-descent updates for regularized **linear** vs **logistic** regression, the equations are…",
        [
            "Completely different",
            "Identical in form (both add $\\frac{\\lambda}{m}w_j$ to the $w_j$ gradient); only the definition of $f$ differs",
            "The same only if $\\lambda = 0$",
            "Different because logistic regression doesn't use $b$",
        ],
        [2],
        "Both add $\\frac{\\lambda}{m}w_j$ to the weight gradient and leave $b$ unregularized. The sole difference is $f$: linear $\\vec{w}\\cdot\\vec{x}+b$ vs sigmoid $g(\\vec{w}\\cdot\\vec{x}+b)$.",
    ],
    multi = False,
    qcm_title = "Week 3 check — classification, logistic regression, overfitting, regularization",
    shuffle = True,
) }}
