# Week 4 — Test Yourself

Answer, then hit **Validate** for instant feedback. (Questions shuffle on retry.)

{{ multi_qcm(
    [
        "How does a decision tree classify a new example?",
        [
            "It averages the predictions of every node",
            "Start at the root node, follow the branch matching the example's feature value, repeat until a leaf node, which gives the prediction",
            "It picks the feature with the highest weight",
            "It runs gradient descent on the example",
        ],
        [2],
        "Root node (top) → decision nodes test a feature and send you left/right → leaf node (bottom) makes the prediction. Training picks which feature each node tests.",
    ],
    [
        "When building a tree, how is the feature to split on at each node chosen?",
        [
            "Randomly",
            "The feature that maximizes purity — i.e. the highest INFORMATION GAIN (largest reduction in entropy)",
            "The feature with the most values",
            "The first feature in the dataset",
        ],
        [2],
        "Information gain = H(root) − (w_left·H(left) + w_right·H(right)). Compute it for every feature and split on the largest. Entropy H is 0 for a pure node and 1 for a 50/50 mix.",
    ],
    [
        "What is entropy H(p1) as a measure of impurity?",
        [
            "It is 1 when the set is pure and 0 at a 50/50 mix",
            "H(p1) = -p1·log2(p1) - (1-p1)·log2(1-p1): it is 0 when pure (all one class) and peaks at 1 for a 50/50 mix",
            "It is the average of the feature values",
            "It equals the number of examples in the node",
        ],
        [2],
        "Entropy is 0 at p1=0 or p1=1 (pure) and 1 at p1=0.5 (most impure). By convention 0·log0 = 0. Some libraries use the similar Gini criterion instead.",
    ],
    [
        "How do you handle a categorical feature with MORE THAN two values (e.g. ear shape = pointy/floppy/oval)?",
        [
            "Drop the feature",
            "One-hot encoding: replace a k-valued feature with k binary (0/1) features, exactly one of which is 1 per example",
            "Split into k separate trees",
            "Convert it to a continuous number",
        ],
        [2],
        "One-hot encoding turns a k-valued categorical feature into k binary features, so every feature is binary again and the standard algorithm applies. It also lets categorical features feed neural networks.",
    ],
    [
        "How does a tree split on a CONTINUOUS feature (e.g. weight)?",
        [
            "It can't — continuous features must be removed",
            "Try several thresholds (e.g. weight ≤ t), compute information gain for each, and split at the threshold with the highest gain",
            "It always splits at the mean",
            "It rounds the values to integers first",
        ],
        [2],
        "A continuous split has the form 'feature ≤ threshold'. Sort the values, test the midpoints between consecutive examples, and pick the threshold (and feature) with the best information gain.",
    ],
    [
        "How does a REGRESSION tree differ from a classification tree?",
        [
            "It uses entropy instead of variance",
            "Leaves predict the AVERAGE of the training targets that reach them, and splits are chosen to maximize the REDUCTION IN VARIANCE (instead of information gain)",
            "It can only use continuous features",
            "It predicts probabilities",
        ],
        [2],
        "A regression tree predicts a number: each leaf outputs the mean of its examples' targets, and splits are chosen by largest variance reduction = Var(root) − weighted-average branch variance.",
    ],
    [
        "Why use a tree ENSEMBLE instead of a single decision tree?",
        [
            "Ensembles train faster",
            "A single tree is highly sensitive to small data changes; many trees that VOTE are far more robust and accurate",
            "Ensembles use less memory",
            "A single tree can't make predictions",
        ],
        [2],
        "Changing one training example can flip a single tree's root split and thus the whole tree. Many trees voting means no single tree dominates, so the ensemble is robust.",
    ],
    [
        "In the RANDOM FOREST algorithm, what two sources of randomness are used?",
        [
            "Random learning rate and random epochs",
            "Sampling with replacement to build each tree's training set, AND choosing each split from a random subset of k (≈√n) features",
            "Random initialization of weights and random dropout",
            "Random labels and random features",
        ],
        [2],
        "Bagging (sampling with replacement) gives each tree a different training set; restricting each node to a random subset of k features forces the trees to differ further, so voting is more accurate.",
    ],
    [
        "What is the key idea behind boosting / XGBoost?",
        [
            "Train all trees on the exact same data",
            "Each new tree focuses MORE on the examples the previous trees got wrong (like deliberate practice)",
            "Use a single very deep tree",
            "Average the trees' weights",
        ],
        [2],
        "Boosting up-weights the still-misclassified examples for each new tree. XGBoost is the dominant fast, regularized implementation — `XGBClassifier` / `XGBRegressor` — and a frequent competition winner.",
    ],
    [
        "When should you prefer decision trees/ensembles vs. neural networks?",
        [
            "Always use decision trees",
            "Trees/ensembles: great on tabular/structured data, fast, small ones interpretable. Neural networks: better on unstructured data (images/audio/text), support transfer learning",
            "Neural networks only work on tabular data",
            "They are interchangeable in every situation",
        ],
        [2],
        "Use XGBoost for structured/tabular data and fast iteration; use neural networks for unstructured or mixed data, when transfer learning helps, or when chaining multiple models.",
    ],
    multi = False,
    qcm_title = "Course 2 · Week 4 check — decision trees, entropy, ensembles, random forest, XGBoost",
    shuffle = True,
) }}
