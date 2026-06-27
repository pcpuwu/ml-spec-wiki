# Week 2 — Test Yourself

Answer, then hit **Validate** for instant feedback. (Questions shuffle on retry.)

{{ multi_qcm(
    [
        "In the recommender notation, what do r(i,j) and y(i,j) mean?",
        [
            "r(i,j) is the rating; y(i,j) is whether it was rated",
            "r(i,j) = 1 if user j rated movie i (else 0); y(i,j) = the rating user j gave movie i, defined only when r(i,j)=1",
            "Both are the predicted rating",
            "r is the number of users; y is the number of movies",
        ],
        [2],
        "r(i,j) is the 0/1 indicator of whether a rating exists; y(i,j) is the actual rating, which is only defined where r(i,j)=1.",
    ],
    [
        "What makes collaborative filtering 'collaborative'?",
        [
            "Many engineers collaborate to label the data",
            "It learns BOTH the user parameters (w, b) and the item features (x) at once, so the ratings of many users collaborate to learn each item's features",
            "Users manually tag each movie's genre",
            "It only works with two users",
        ],
        [2],
        "You can learn w,b from features and features from w,b — so you minimize one cost over all of them together. Many users' ratings jointly determine each item's features, which then improve everyone's predictions.",
    ],
    [
        "How does collaborative filtering change for BINARY labels (like/click) instead of star ratings?",
        [
            "Nothing changes",
            "Predict P(y=1) = g(w·x + b) with the logistic function, and replace squared error with the binary cross-entropy loss",
            "You switch to K-means",
            "You drop the features x",
        ],
        [2],
        "It's the same linear→logistic move as Course 1: pass w·x+b through a sigmoid to get a probability, and train with binary cross-entropy instead of squared error.",
    ],
    [
        "What problem does MEAN NORMALIZATION solve, and how?",
        [
            "It speeds up matrix inversion by reordering rows",
            "A brand-new user gets predicted 0 on everything; subtracting each movie's average μ_i and predicting w·x+b+μ_i makes a new user default to each movie's average rating",
            "It removes outlier movies from the dataset",
            "It converts ratings to binary labels",
        ],
        [2],
        "Regularization drives a no-rating user's w,b to 0, so they'd be predicted 0 stars. Mean-centering ratings and adding μ_i back means a new user is predicted the crowd average — far more reasonable.",
    ],
    [
        "Why is TensorFlow's Gradient Tape useful for collaborative filtering?",
        [
            "It stores the movie ratings in a database",
            "AutoDiff: you implement only the cost function J, and TensorFlow automatically computes the derivatives needed for gradient descent",
            "It draws the recommendation UI",
            "It guarantees a convex cost",
        ],
        [2],
        "The collaborative-filtering cost is non-standard, so hand-deriving gradients is painful. Wrapping the cost in tf.GradientTape lets TensorFlow record the ops and return ∂J/∂w automatically.",
    ],
    [
        "Given learned item features, how do you find items RELATED to item i?",
        [
            "Pick items with the highest rating",
            "Find items k whose feature vector x⁽ᵏ⁾ minimizes the squared distance ‖x⁽ᵏ⁾ − x⁽ⁱ⁾‖² to x⁽ⁱ⁾",
            "Find the user who rated the most movies",
            "Re-run K-means on the ratings",
        ],
        [2],
        "The learned features capture what an item is like, so the items closest in feature space (smallest squared distance) are the most similar — take the 5–10 nearest.",
    ],
    [
        "What is the key DIFFERENCE between collaborative and content-based filtering?",
        [
            "Content-based needs more users",
            "Collaborative recommends from ratings of similar users (and learns item features); content-based uses known FEATURES of users and items to find good matches",
            "They are identical",
            "Collaborative cannot handle binary labels",
        ],
        [2],
        "Collaborative filtering only needs the ratings matrix and learns features from scratch. Content-based filtering brings explicit user features (age, country…) and item features (genre, year…) and learns to match them.",
    ],
    [
        "In the deep-learning content-based model, how is the rating predicted, and what must match?",
        [
            "Concatenate the two feature vectors; the networks must be identical",
            "A user network outputs v_u and a movie network outputs v_m; predict v_u · v_m. The two networks can differ in depth/width, but their OUTPUT layers must be the same size",
            "Sum all the features; nothing needs to match",
            "Multiply the raw feature vectors directly",
        ],
        [2],
        "Two separate towers compute v_u and v_m from each side's features; the prediction is their dot product, so only the output dimensions (e.g. 32) must agree. Both towers are trained jointly with one cost.",
    ],
    [
        "Why do large-catalogue recommenders split into RETRIEVAL then RANKING?",
        [
            "To use two different datasets",
            "Running the network over millions of items per visit is infeasible; retrieval cheaply assembles a broad candidate list (pre-computed similar items, top genres/country), then ranking scores just those few hundred accurately",
            "Retrieval trains the model and ranking tests it",
            "Ranking happens before retrieval",
        ],
        [2],
        "Retrieval prunes millions down to ~hundreds of plausible candidates (mostly table lookups), so the expensive per-pair scoring only runs on that short list — fast AND accurate.",
    ],
    [
        "Which is a genuine ETHICAL concern Ng raises about recommender systems?",
        [
            "They always use too much memory",
            "Maximizing engagement can amplify conspiracy theories/hate; ad systems can amplify exploitative businesses (e.g. payday loans) because profit lets them bid higher — so be transparent and only build things that leave society better off",
            "They can only recommend movies",
            "They cannot be regularized",
        ],
        [2],
        "The objective you optimize is itself an ethical choice. Engagement-maximization and profit-driven ad auctions can create harmful feedback loops; Ng urges transparency, content filtering, and inviting diverse perspectives.",
    ],
    [
        "In the TensorFlow content-based code, what do the Dot layer and L2-normalization do?",
        [
            "Dot adds the vectors; L2-normalize squares them",
            "tf.keras.layers.Dot computes v_u · v_m; tf.linalg.l2_normalize rescales each v to length 1 (turning the dot product into a cosine similarity), which makes the algorithm work a bit better",
            "Dot trains the model; L2-normalize evaluates it",
            "They are only used at inference time",
        ],
        [2],
        "The two towers are Sequential models; a Dot layer joins their 32-number outputs, and L2-normalizing each output to unit length (cosine similarity) is a small step that improves results. Trained end-to-end with MSE.",
    ],
    [
        "What is PCA used for, and what axis does it choose?",
        [
            "To predict a label y from features x",
            "Dimensionality reduction (mainly visualization): it picks new axes (principal components) that maximize the variance of the projected data, so a few numbers retain most of the information",
            "To cluster data into K groups",
            "To detect anomalies via p(x)",
        ],
        [2],
        "PCA is unsupervised: it finds the direction onto which projecting the data preserves the most spread (variance), letting you reduce 50+ features to 2–3 numbers you can plot.",
    ],
    [
        "How is PCA DIFFERENT from linear regression?",
        [
            "PCA is supervised; linear regression is unsupervised",
            "Linear regression has a special label y and minimizes VERTICAL distances to predict y; PCA has no y, treats all features equally, and minimizes PERPENDICULAR distances to the new axis (maximizing projected variance)",
            "They are the same with different names",
            "PCA can only handle one feature",
        ],
        [2],
        "Linear regression singles out y and measures error along the y-axis. PCA has no target — it treats every feature equally and minimizes the perpendicular projection distance, which equals maximizing variance.",
    ],
    [
        "How do you project an example onto a PCA axis, and how do you reconstruct it?",
        [
            "Project = add the features; reconstruct = subtract the mean",
            "Project z = x · u (dot product with the unit axis vector u); reconstruct ≈ z · u — a good approximation, though some information is lost",
            "Project = multiply by the label; reconstruct = divide by it",
            "There is no way to reconstruct",
        ],
        [2],
        "The coordinate on axis u is the dot product x·u. To approximately invert it, multiply that single number back by u: z·u. You can't recover x exactly, but it's a reasonable approximation.",
    ],
    [
        "In scikit-learn PCA, what does explained_variance_ratio_ tell you, and does fit mean-normalize?",
        [
            "It returns the labels; fit does not normalize",
            "It gives the fraction of total variance each principal component captures (e.g. [0.992] = 99.2% kept by one axis); and yes, fit() automatically mean-normalizes the data for you",
            "It is the learning rate; you must normalize manually",
            "It counts the number of components only",
        ],
        [2],
        "explained_variance_ratio_ reports how much information each component retains, so you can judge whether 2–3 axes suffice. PCA.fit subtracts each feature's mean automatically, so you don't normalize separately.",
    ],
    multi = False,
    qcm_title = "Course 3 · Week 2 check — recommender systems and PCA",
    shuffle = True,
) }}
