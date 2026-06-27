# Week 3 — Test Yourself

Answer, then hit **Validate** for instant feedback. (Questions shuffle on retry.)

{{ multi_qcm(
    [
        "Why split data into training / cross-validation / test sets instead of just training / test?",
        [
            "To have more data to train on",
            "So you choose the model (degree, λ, architecture) on the CV set and get an UNBIASED generalization estimate from the untouched test set",
            "Because the test set must be the largest",
            "Cross-validation makes training faster",
        ],
        [2],
        "If you pick a model using the test set, J_test becomes optimistic. The CV set is for choosing; the test set is touched only at the end to report generalization fairly.",
    ],
    [
        "How do you tell high bias from high variance using J_train and J_cv?",
        [
            "High bias: J_cv >> J_train. High variance: J_train high.",
            "High bias: J_train is high (and J_cv close to it). High variance: J_cv is much greater than J_train.",
            "They look identical — you can't tell",
            "High bias means J_test is low",
        ],
        [2],
        "High bias = doesn't even fit the training set (J_train high). High variance = does much worse on unseen data (J_cv >> J_train). It's possible, occasionally, to have both.",
    ],
    [
        "Why establish a baseline (e.g. human-level performance) before judging bias/variance?",
        [
            "To make the model train faster",
            "Because 'is J_train high?' should be measured RELATIVE to what's achievable — a 10.8% train error is fine if even humans get 10.6%",
            "Baselines are only needed for regression",
            "To replace the cross-validation set",
        ],
        [2],
        "On noisy tasks, perfect performance is impossible. Compare the baseline→J_train gap (bias) and the J_train→J_cv gap (variance) rather than asking if J_train is 'high' in absolute terms.",
    ],
    [
        "A learning curve shows your algorithm has HIGH BIAS (curves plateaued well above baseline). Will collecting more data help?",
        [
            "Yes, more data always helps",
            "No — high-bias curves have already plateaued, so more data won't close the gap; make the model more powerful instead",
            "Yes, but only if you also increase λ",
            "It's impossible to tell from a learning curve",
        ],
        [2],
        "More data helps HIGH VARIANCE (it closes the train–CV gap). For high bias, the curves have flattened, so add features / polynomial terms / decrease λ / use a bigger network.",
    ],
    [
        "Which set of fixes addresses HIGH VARIANCE (overfitting)?",
        [
            "Add features, add polynomial features, decrease λ",
            "Get more training data, use fewer features, increase λ",
            "Get a bigger neural network and decrease λ",
            "Reduce the training set size",
        ],
        [2],
        "High variance → get more data or SIMPLIFY (fewer features, larger λ). High bias → make the model MORE powerful (more/polynomial features, smaller λ, bigger network). Never shrink the training set to fix bias.",
    ],
    [
        "What is the neural-network recipe for bias/variance?",
        [
            "Always collect more data first",
            "Does it do well on the training set? If no, use a BIGGER network. Then: does it do well on CV? If no, get MORE DATA. Repeat.",
            "Increase λ until J_train is zero",
            "Shrink the network until J_cv drops",
        ],
        [2],
        "Large networks are low-bias machines. Grow the network until train error is acceptable (fixes bias), then add data until CV error is acceptable (fixes variance). A large well-regularized net rarely hurts.",
    ],
    [
        "What is error analysis, and why is it useful?",
        [
            "Automatically retraining the model on its errors",
            "Manually grouping misclassified CV examples into themes and counting them, to prioritize the fixes with the biggest payoff",
            "Computing J_train and J_cv",
            "Measuring the test-set accuracy",
        ],
        [2],
        "Reading ~100 misclassified examples and tallying categories shows which problems are big (worth fixing) and which are rare (not worth it) — saving you from optimizing something with tiny impact.",
    ],
    [
        "What is the key rule for data augmentation (e.g. distorting images or adding noise to audio)?",
        [
            "Add as much random noise as possible",
            "The distortions should be REPRESENTATIVE of the noise/variation in the test set; purely random meaningless noise usually doesn't help",
            "Only mirror images are allowed",
            "Augmentation only works for tabular data",
        ],
        [2],
        "Warping a letter or adding crowd/car noise mimics real test-set variation, so it helps. Adding per-pixel random noise that never appears in the test set does not.",
    ],
    [
        "In transfer learning, why can parameters trained on cats/dogs/cars help recognize handwritten digits?",
        [
            "Because digits are a kind of animal",
            "Early layers learn generic features (edges → corners → shapes) useful across many vision tasks; you reuse them and just retrain the output layer",
            "Because the output layers are identical",
            "It only works if the two datasets are the same size",
        ],
        [2],
        "Supervised pre-training on a big dataset teaches generic early-layer features. You keep those, swap in a new output layer, and fine-tune — so a small dataset can still reach good performance. Input type (image/audio/text) must match.",
    ],
    [
        "On a skewed dataset (rare positive class), why use precision/recall and the F1 score instead of accuracy?",
        [
            "Accuracy is harder to compute",
            "A trivial 'always predict negative' model can have very high accuracy but zero recall; precision/recall (combined by F1 = 2PR/(P+R)) expose that and reward catching real positives",
            "Precision and recall are the same as accuracy",
            "F1 is only for regression",
        ],
        [2],
        "With 0.5% positives, 'predict negative always' scores 99.5% accuracy but recall 0. Precision = TP/(TP+FP), recall = TP/(TP+FN); F1's harmonic mean is high only when BOTH are high. Raising the decision threshold trades recall for precision.",
    ],
    multi = False,
    qcm_title = "Course 2 · Week 3 check — diagnostics, bias/variance, dev process, skewed data",
    shuffle = True,
) }}
