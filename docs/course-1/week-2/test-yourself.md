# Week 2 — Test Yourself

Answer, then hit **Validate** for instant feedback. (Questions shuffle on retry.)

{{ multi_qcm(
    [
        "In multiple linear regression, what does the model $f_{\\vec{w},b}(\\vec{x}) = \\vec{w}\\cdot\\vec{x} + b$ compute?",
        [
            "It multiplies every feature by the same single weight $w$",
            "The dot product $w_1x_1 + w_2x_2 + \\dots + w_nx_n$, plus $b$",
            "The sum of the features, plus $b$",
            "$b$ raised to the power of each feature",
        ],
        [2],
        "$\\vec{w}\\cdot\\vec{x}$ is the dot product: multiply each weight by its matching feature and add them, then add the single number $b$.",
    ],
    [
        "Why is the **vectorized** `np.dot(w, x)` faster than a Python `for` loop over the same products?",
        [
            "It skips some of the multiplications to save time",
            "It uses the computer's parallel hardware (CPU/GPU) to do the work at once, instead of one step at a time",
            "It rounds the numbers so there's less to compute",
            "It only works on small vectors, which are always fast",
        ],
        [2],
        "NumPy hands the operation to parallel hardware that multiplies all pairs simultaneously and adds them efficiently — a `for` loop does them sequentially. The gap grows with data size.",
    ],
    [
        "Compared with one feature, the gradient-descent update for $n$ features is…",
        [
            "Completely different — a new formula must be derived",
            "Almost identical: the same error term, now multiplied by $x_j^{(i)}$, applied to each $w_j$",
            "No longer needed, because you use the normal equation",
            "Only valid when all features have the same range",
        ],
        [2],
        "Each $w_j := w_j - \\alpha\\frac{1}{m}\\sum_i (f(\\vec{x}^{(i)})-y^{(i)})x_j^{(i)}$ — the one-feature rule with a subscript $j$; $b$ updates exactly as before.",
    ],
    [
        "Features on very different scales (e.g. size 300–2000 vs. bedrooms 0–5) tend to make gradient descent…",
        [
            "Converge faster, because big numbers carry more information",
            "Slow down — the cost contours become tall, skinny ovals it bounces across",
            "Produce negative cost values",
            "Ignore the smaller feature entirely",
        ],
        [2],
        "Mismatched scales give skinny elliptical contours; gradient descent bounces back and forth. Rescaling to comparable ranges makes the contours rounder and the path direct.",
    ],
    [
        "**Z-score normalization** of a feature uses which formula?",
        [
            "$x / \\max$",
            "$(x - \\mu)/(\\max - \\min)$",
            "$(x - \\mu)/\\sigma$, subtract the mean and divide by the standard deviation",
            "$x \\cdot \\sigma + \\mu$",
        ],
        [3],
        "Z-score: subtract the feature's mean $\\mu$ and divide by its standard deviation $\\sigma$. (Divide-by-max and mean normalization are the other two methods shown.)",
    ],
    [
        "On a **learning curve** (cost $J$ vs. number of iterations), a healthy run looks like…",
        [
            "$J$ going up and down each iteration",
            "$J$ decreasing every iteration, then flattening as it converges",
            "$J$ staying perfectly constant from iteration 1",
            "$J$ increasing steadily to a maximum",
        ],
        [2],
        "Working gradient descent decreases $J$ on every iteration and the curve flattens at convergence. If $J$ rises, $\\alpha$ is likely too large or there's a bug.",
    ],
    [
        "If the cost **increases or oscillates** across iterations, the most common cause is…",
        [
            "The learning rate $\\alpha$ is too large (or there's a bug, e.g. a `+` instead of `-`)",
            "The learning rate $\\alpha$ is too small",
            "Too few training examples",
            "The features are already scaled",
        ],
        [1],
        "A too-large $\\alpha$ overshoots the minimum, so the cost rises. Debugging tip: a tiny $\\alpha$ should make $J$ fall every iteration — if not, suspect a bug.",
    ],
    [
        "You add a feature $x_3 = x_1 \\times x_2$ (lot area from width × depth). This is an example of…",
        [
            "Feature scaling",
            "Feature engineering — combining features using domain intuition",
            "Vectorization",
            "Z-score normalization",
        ],
        [2],
        "Creating a new feature by transforming or combining existing ones, using knowledge of the problem, is feature engineering. It lets the model weigh area directly.",
    ],
    [
        "When you fit a **polynomial** like $w_1x + w_2x^2 + w_3x^3 + b$, why does feature scaling become especially important?",
        [
            "Because polynomials can't be vectorized",
            "Because the powers ($x$, $x^2$, $x^3$) span wildly different ranges (e.g. 1–1000 vs 1–10⁹)",
            "Because $b$ must equal zero",
            "Because gradient descent no longer applies to curves",
        ],
        [2],
        "Powers of a feature blow up the ranges (size 1–1000 → $x^3$ 1–billion), so without scaling the contours become extremely skewed and gradient descent struggles.",
    ],
    multi = False,
    qcm_title = "Week 2 check — multiple regression, vectorization, scaling, learning rate, feature engineering",
    shuffle = True,
) }}
