# Coding Labs

A hands-on, code-first companion track that runs **parallel to the course**. For each
week of Andrew Ng's specialization, the matching lab here shows you how to actually
*implement* the ideas — first from scratch so you see the machinery, then the fast,
idiomatic library way you'd really use on the job.

The theory pages teach you *what* a model is and *why* it works. These labs teach you
*how to build one*.

## How to use these

- Read the matching **theory lesson first** (each lab links back to it), then work the lab.
- Every code block has a **copy button** — paste it into a Python file, a Jupyter/Colab
  notebook, or the terminal and run it as you read. Nothing here is magic; run everything.
- Labs build in one direction: **from scratch → then the library**. Don't skip the from-scratch
  part — it's where the intuition lives.

## What you'll need

```bash
pip install numpy scikit-learn matplotlib     # the classical-ML labs
pip install torch                             # only for the neural-network labs
```

## A note on frameworks

- **Classical ML** (regression, logistic regression, trees, k-means, PCA, anomaly
  detection — most of the course) is **NumPy + scikit-learn**. No deep-learning framework
  involved, and nothing here depends on which one you pick.
- **Neural networks / deep learning** use **PyTorch**, which is today's industry standard.
  Ng's lectures demonstrate these in TensorFlow/Keras; where that happens, the lab adds a
  short bridge note — the *concepts* are identical, only the library syntax differs.

## Sources

These labs are grounded in two standard references (rewritten in our own words, not copied):

- **Aurélien Géron — _Hands-On Machine Learning with Scikit-Learn and PyTorch_ (2025).**
  The beginner-friendly narrator; our primary tutorial voice.
- **Sebastian Raschka et al. — _Machine Learning with PyTorch and Scikit-Learn_ (2022).**
  The from-scratch engineer; our reference for building algorithms up from the math.

Plus Andrew Ng's own optional DeepLearning.AI labs, which pair with each lesson.
