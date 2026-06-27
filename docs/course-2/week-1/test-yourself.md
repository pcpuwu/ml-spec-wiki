# Week 1 — Test Yourself

Answer, then hit **Validate** for instant feedback. (Questions shuffle on retry.)

{{ multi_qcm(
    [
        "What does a single neuron in a neural-network layer compute?",
        [
            "The mean of its inputs",
            "A little logistic-regression unit: $a = g(\\vec{w}\\cdot\\vec{x} + b)$",
            "A random number",
            "The largest of its inputs",
        ],
        [2],
        "Each neuron applies $g(\\vec{w}\\cdot\\vec{x}+b)$ with its own $\\vec{w}, b$ — exactly logistic regression. A layer is just several of these in parallel.",
    ],
    [
        "In the notation $a_j^{[\\ell]}$, what do the superscript and subscript mean?",
        [
            "Layer $\\ell$, unit (neuron) $j$",
            "Example $\\ell$, feature $j$",
            "Iteration $\\ell$, parameter $j$",
            "Nothing — they're interchangeable",
        ],
        [1],
        "Square-bracket superscript $[\\ell]$ = 'of layer $\\ell$'; subscript $j$ = 'unit $j$'. So $a_2^{[3]}$ is the activation of neuron 2 in layer 3.",
    ],
    [
        "When **counting the layers** of a neural network, you include…",
        [
            "All layers including the input layer",
            "The hidden layers and the output layer, but NOT the input layer",
            "Only the hidden layers",
            "Only the output layer",
        ],
        [2],
        "By convention the input is 'layer 0' and isn't counted. A network with 3 hidden layers + 1 output is called a 4-layer network.",
    ],
    [
        "**Forward propagation** refers to…",
        [
            "Updating the weights during training",
            "Computing activations left-to-right, $\\vec{x} \\to \\vec{a}^{[1]} \\to \\dots \\to$ output, to make a prediction",
            "Randomly initializing the parameters",
            "Removing layers from the network",
        ],
        [2],
        "Forward prop propagates activations forward (input → output) to compute the prediction $f(\\vec{x})$. Back-propagation (next week) is for learning.",
    ],
    [
        "What does `Dense(units=3, activation='sigmoid')` create in TensorFlow?",
        [
            "Three separate neural networks",
            "A layer of 3 sigmoid neurons",
            "A dataset with 3 columns",
            "A single neuron with 3 inputs",
        ],
        [2],
        "`Dense` is the standard fully-connected layer; `units=3` gives it 3 neurons, each using the sigmoid activation.",
    ],
    [
        "Why does TensorFlow use `np.array([[200, 17]])` (double brackets) rather than `np.array([200, 17])`?",
        [
            "It's a typo with no effect",
            "TensorFlow represents data as 2-D matrices (here a 1×2 matrix), not 1-D arrays, for efficiency on large datasets",
            "Double brackets make the numbers larger",
            "It converts the data to integers",
        ],
        [2],
        "Double brackets make a 2-D matrix (1 row, 2 columns). TensorFlow works with matrices/tensors; Course 1 used 1-D vectors.",
    ],
    [
        "In the vectorized dense layer `Z = np.matmul(A_in, W) + B`, what kind of objects are `A_in`, `W`, `Z`?",
        [
            "All Python lists",
            "All 2-D arrays (matrices)",
            "All single numbers",
            "All strings",
        ],
        [2],
        "The vectorized implementation makes everything a matrix, so one `matmul` replaces the per-unit `for` loop — and runs fast on parallel hardware (GPUs).",
    ],
    [
        "To multiply matrices $A^T W$, which dimensions must match?",
        [
            "The number of columns of $A^T$ must equal the number of rows of $W$",
            "Both matrices must be square",
            "They must have the same number of rows",
            "No requirement — any two matrices multiply",
        ],
        [1],
        "Each output entry is a dot product of a row of $A^T$ with a column of $W$, so those vectors must be the same length — i.e. cols of $A^T$ = rows of $W$. The result has (rows of $A^T$)×(cols of $W$).",
    ],
    multi = False,
    qcm_title = "Course 2 · Week 1 check — neural networks, forward prop, TensorFlow, vectorization",
    shuffle = True,
) }}
