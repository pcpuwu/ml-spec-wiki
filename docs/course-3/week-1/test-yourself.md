# Week 1 — Test Yourself

Answer, then hit **Validate** for instant feedback. (Questions shuffle on retry.)

{{ multi_qcm(
    [
        "How does clustering (unsupervised) differ from classification (supervised)?",
        [
            "Clustering needs more data",
            "Supervised learning has labeled data (x AND y) to predict; clustering has only x and finds groups of similar points without labels",
            "They are the same algorithm",
            "Clustering predicts continuous numbers",
        ],
        [2],
        "Unsupervised learning gets only x — no target y — so it looks for structure (here, clusters of similar points) rather than predicting a known label.",
    ],
    [
        "What two steps does K-means repeat until convergence?",
        [
            "Forward and backward propagation",
            "Assign each point to its nearest centroid, then move each centroid to the mean of its assigned points",
            "Split on the best feature, then prune",
            "Compute precision, then recall",
        ],
        [2],
        "K-means alternates: (1) assign each point to the closest cluster centroid, (2) recompute each centroid as the average of its points. It converges when assignments and centroids stop changing.",
    ],
    [
        "What cost function (distortion) does K-means minimize?",
        [
            "Cross-entropy of the labels",
            "The average squared distance from each point to the centroid of the cluster it's assigned to",
            "The number of clusters",
            "The variance of the centroids",
        ],
        [2],
        "J = (1/m) Σ ‖x⁽ⁱ⁾ − μ_{c⁽ⁱ⁾}‖². The assign step minimizes it over assignments; the move step minimizes it over centroid locations — so J should decrease every iteration.",
    ],
    [
        "Why run K-means multiple times with different random initializations?",
        [
            "To use more clusters",
            "Random initialization can land K-means in a poor local optimum; running it 50–1000 times and keeping the result with the lowest distortion J avoids that",
            "To make it train faster",
            "Because one run never converges",
        ],
        [2],
        "Initialize by picking K random training examples as centroids. Different inits give different local optima, so run many times and keep the clustering with the lowest cost J.",
    ],
    [
        "How should you choose K (the number of clusters)?",
        [
            "Pick K that minimizes the cost J",
            "Usually by the downstream purpose (e.g. how many t-shirt sizes make business sense); the elbow method is sometimes used but K is often genuinely ambiguous",
            "Always use K = 3",
            "Use the largest K your computer can handle",
        ],
        [2],
        "Minimizing J just picks the largest K (more clusters always lower J). Instead evaluate K by how well the clusters serve their later use; the elbow method often shows no clear elbow.",
    ],
    [
        "What is the core idea of anomaly detection via density estimation?",
        [
            "Train a classifier on labeled anomalies",
            "Model p(x) from normal examples; for a new x, flag it as an anomaly if p(x) < ε (a small threshold)",
            "Cluster the data with K-means",
            "Compute the average of all features",
        ],
        [2],
        "Build p(x) so normal regions have high probability. A new example with p(x) below ε sits in a low-probability region and is flagged for inspection.",
    ],
    [
        "How are the Gaussian parameters fit, and how is p(x) modeled over n features?",
        [
            "μ and σ² are chosen randomly; p(x) is their sum",
            "μ_j = average of feature j, σ²_j = average squared deviation; p(x) = product over j of p(x_j; μ_j, σ²_j)",
            "μ = 0 and σ = 1 always; p(x) = max of the features",
            "They are learned by gradient descent on labels",
        ],
        [2],
        "Fit each feature's Gaussian by its mean and variance, then multiply the per-feature probabilities. The product makes an example anomalous if it's unusual on ANY feature.",
    ],
    [
        "When should you prefer ANOMALY DETECTION over SUPERVISED LEARNING?",
        [
            "When you have thousands of labeled positives",
            "When you have very few positives (0–20) and many types of anomalies — including brand-new ones future anomalies may look nothing like past ones",
            "When future positives resemble past positives",
            "When the data is perfectly balanced",
        ],
        [2],
        "Anomaly detection models 'normal' and flags anything different, so it catches novel anomalies (e.g. new fraud). Supervised learning fits when you have many positives that resemble future ones (e.g. spam).",
    ],
    [
        "Why transform a feature with log(x+c) or x^p before anomaly detection?",
        [
            "To make the algorithm train faster",
            "To make the feature's distribution more Gaussian, since the model fits a Gaussian to each feature",
            "To convert it to a categorical feature",
            "It has no effect",
        ],
        [2],
        "Anomaly detection models each feature with a Gaussian, so a skewed feature should be transformed (log, sqrt, power) to look bell-shaped. Apply the same transform to train/CV/test.",
    ],
    [
        "Why does anomaly detection use a few LABELED examples in the CV/test sets even though it's unsupervised?",
        [
            "To train p(x) on the anomalies",
            "To get a real-number evaluation — tune ε and the features by seeing how many known anomalies it catches vs. normal examples it wrongly flags (using precision/recall/F1 on skewed data)",
            "Because it's actually supervised learning",
            "To increase the training set size",
        ],
        [2],
        "p(x) is still fit only on (assumed-normal) training data. A handful of labeled anomalies in CV/test lets you evaluate and tune ε/features; since anomalies are rare, use precision/recall/F1, not accuracy.",
    ],
    multi = False,
    qcm_title = "Course 3 · Week 1 check — clustering (K-means) and anomaly detection",
    shuffle = True,
) }}
