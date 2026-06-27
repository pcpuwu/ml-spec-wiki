# Week 1 — Test Yourself

Answer, then hit **Validate** for instant feedback. (Questions shuffle on retry.)

{{ multi_qcm(
    [
        "Which pair of problems is **supervised** learning?",
        [
            "Grouping news articles by topic, and market segmentation",
            "Spam filtering (emails labelled spam/not-spam), and predicting house prices",
            "Finding clusters in unlabelled customer data",
            "Compressing a dataset with dimensionality reduction",
        ],
        [2],
        "Supervised learning trains on examples with the **right answers** (labels). Spam (labelled) and house prices (known prices) both qualify; clustering and dimensionality reduction are unsupervised.",
    ],
    [
        "What distinguishes **regression** from **classification**?",
        [
            "Regression needs labels; classification doesn't",
            "Regression predicts a number from infinitely many; classification predicts one of a small, finite set of categories",
            "Regression is unsupervised; classification is supervised",
            "There is no real difference",
        ],
        [2],
        "Both are supervised. Regression outputs a continuous number (e.g. price); classification outputs a category from a limited set (e.g. benign/malignant).",
    ],
    [
        "In linear regression, what are the **parameters** of $f_{w,b}(x) = wx + b$?",
        [
            "The features $x$ and targets $y$",
            "$w$ and $b$ — adjusted during training",
            "The number of examples $m$",
            "The predictions $\\hat{y}$",
        ],
        [2],
        "$w$ (slope/weight) and $b$ (intercept) are the parameters the algorithm tunes.",
    ],
    [
        "Why divide by $m$ in the cost $J(w,b) = \\frac{1}{2m}\\sum_{i=1}^{m}(f_{w,b}(x^{(i)}) - y^{(i)})^2$?",
        [
            "To make the cost negative",
            "So the cost doesn't grow just because there are more training examples",
            "Because $m$ is always 2",
            "To convert slope into intercept",
        ],
        [2],
        "Dividing by $m$ makes it an **average** squared error, so dataset size alone doesn't inflate the cost. The extra $2$ just makes the derivative neater.",
    ],
    [
        "What does the **derivative term** in the gradient descent update do?",
        [
            "It sets the learning rate",
            "It points in the direction (and, with $\\alpha$, the size) of the downhill step",
            "It guarantees a global minimum",
            "It counts the training examples",
        ],
        [2],
        "The derivative is the slope; its sign moves $w$ toward the minimum, and its magnitude (times $\\alpha$) sets the step size — which automatically shrinks near a minimum.",
    ],
    [
        "If the learning rate $\\alpha$ is **too large**, gradient descent may…",
        [
            "Converge faster with no downside",
            "Overshoot the minimum and even diverge",
            "Always converge to a global minimum",
            "Leave the parameters unchanged",
        ],
        [2],
        "Too-large steps can overshoot and move further from the minimum each step (diverge). Too-small $\\alpha$ converges but very slowly.",
    ],
    [
        "Why does gradient descent on linear regression's squared-error cost always reach the **global** minimum?",
        [
            "Because the cost is convex — a single bowl with no other local minima",
            "Because $\\alpha$ is always small",
            "Because we initialise at $w=0, b=0$",
            "It doesn't — it usually gets stuck",
        ],
        [1],
        "The squared-error cost is **convex** (bowl-shaped), so its only minimum is the global one; with a reasonable $\\alpha$, gradient descent converges there.",
    ],
    multi = False,
    qcm_title = "Week 1 check — supervised learning, linear regression, gradient descent",
    shuffle = True,
) }}
