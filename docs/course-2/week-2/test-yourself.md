# Week 2 — Test Yourself

Answer, then hit **Validate** for instant feedback. (Questions shuffle on retry.)

{{ multi_qcm(
    [
        "In the three-step TensorFlow recipe, what does `model.compile(loss=...)` do?",
        [
            "Trains the network on the data",
            "Specifies the loss function (and hence the cost) the network will minimize",
            "Runs forward propagation to make predictions",
            "Defines the number of layers and units",
        ],
        [2],
        "Step 1 `Sequential([...])` specifies the architecture; step 2 `compile` specifies the **loss**; step 3 `fit` trains. `epochs` controls how many gradient-descent-like steps `fit` runs.",
    ],
    [
        "Which loss do you compile with for a **binary** classification network vs. a **regression** network?",
        [
            "MeanSquaredError for both",
            "BinaryCrossentropy for classification; MeanSquaredError for regression",
            "BinaryCrossentropy for both",
            "SparseCategoricalCrossentropy for classification; BinaryCrossentropy for regression",
        ],
        [2],
        "Binary classification uses the (binary) cross-entropy loss — the same loss as logistic regression; regression uses mean squared error.",
    ],
    [
        "For the **hidden layers** of a modern neural network, the recommended default activation is…",
        [
            "Sigmoid everywhere",
            "ReLU",
            "Linear (no activation)",
            "Softmax",
        ],
        [2],
        "ReLU is the default for hidden layers: cheaper to compute and flat in only one region, so gradient descent doesn't stall the way it does with sigmoid (flat on both ends).",
    ],
    [
        "Why can't you use a **linear** activation function in every layer of a neural network?",
        [
            "It would be too slow to compute",
            "A linear function of a linear function is still linear — the whole network collapses to linear (or logistic) regression",
            "TensorFlow doesn't support it",
            "The cost function would become non-convex",
        ],
        [2],
        "Stacking linear layers can't represent anything more complex than a single linear map. Non-linear activations (ReLU, sigmoid) are what make a deep network more expressive than linear regression.",
    ],
    [
        "What does the softmax activation compute, and how is it unusual?",
        [
            "$a_j = \\max(0, z_j)$, applied element-wise",
            "$a_j = e^{z_j} / \\sum_k e^{z_k}$ — each output depends on ALL the $z$'s and they sum to 1",
            "$a_j = 1/(1+e^{-z_j})$, applied to each $z_j$ independently",
            "It returns the largest $z_j$",
        ],
        [2],
        "Softmax turns the $z$'s into a probability distribution (sums to 1). Unlike sigmoid/ReLU/linear, every output $a_j$ depends on every $z$ because of the shared denominator.",
    ],
    [
        "Why is the recommended softmax code `Dense(..., activation='linear')` + `SparseCategoricalCrossentropy(from_logits=True)`?",
        [
            "It runs faster on a GPU",
            "It is more numerically accurate — folding the softmax into the loss lets TensorFlow avoid extreme intermediate values",
            "It uses fewer parameters",
            "It is the only version that works at all",
        ],
        [2],
        "`from_logits=True` lets TensorFlow keep $z$ (the logits) and rearrange terms, reducing floating-point round-off. The trade-off: the output layer now emits logits, so you map them through softmax yourself to get probabilities.",
    ],
    [
        "What's the difference between **multiclass** and **multi-label** classification?",
        [
            "They are the same thing",
            "Multiclass: one label with many possible values (softmax). Multi-label: several independent yes/no labels per input (a sigmoid per output)",
            "Multiclass uses sigmoid; multi-label uses softmax",
            "Multi-label only works with two classes",
        ],
        [2],
        "Digit recognition is multiclass (one label, 10 values → softmax). 'Is there a car / bus / pedestrian?' is multi-label (three independent labels → three sigmoid outputs).",
    ],
    [
        "What does the **Adam** optimizer do that plain gradient descent doesn't?",
        [
            "It guarantees finding the global minimum",
            "It automatically adapts a separate learning rate for each parameter — speeding up steady directions, damping oscillating ones",
            "It removes the need for a loss function",
            "It computes derivatives without back-propagation",
        ],
        [2],
        "Adam ('Adaptive Moment estimation') keeps a per-parameter learning rate: increase it when a parameter moves steadily one way, decrease it when it oscillates. It's faster and more robust than gradient descent — the de facto default.",
    ],
    [
        "Why is **back-propagation** (a right-to-left computation graph pass) used to get derivatives?",
        [
            "It's the only mathematically valid way to differentiate",
            "It's efficient: it computes ALL derivatives in ~N+P steps instead of N×P, reusing shared intermediate derivatives",
            "It avoids using calculus entirely",
            "It makes the network train without a cost function",
        ],
        [2],
        "Going right-to-left, each intermediate derivative (e.g. ∂J/∂a) is computed once and reused. For N nodes and P parameters that's ~N+P steps vs. N×P — the reason autodiff/back-prop is foundational to deep learning.",
    ],
    multi = False,
    qcm_title = "Course 2 · Week 2 check — training, activations, softmax, multi-label, Adam, back-prop",
    shuffle = True,
) }}
