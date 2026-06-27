# --- PMT:env --- #
import numpy as np

X = np.array([[1., 2.], [2., 3.], [3., 1.], [2., 2.], [1.5, 2.5]])


# --- PMT:code --- #
def estimate_gaussian(X):
    """Fit one Gaussian per feature for anomaly detection. Return (mu, var):
      mu[j]  = mean of column j
      var[j] = variance of column j (population variance, divide by m)
    Both are length-n arrays (n = number of features).
    Tip: np.mean(X, axis=0) and np.var(X, axis=0).
    """
    ...


# --- PMT:corr --- #
def estimate_gaussian(X):
    return np.mean(X, axis=0), np.var(X, axis=0)


# --- PMT:tests --- #
mu, var = estimate_gaussian(X)
assert mu.shape == (2,) and var.shape == (2,)
assert np.isclose(mu[0], np.mean(X[:, 0]))
assert np.isclose(var[1], np.var(X[:, 1]))


# --- PMT:secrets --- #
@auto_run
def tests():
    mu, var = estimate_gaussian(X)
    assert np.allclose(mu, X.mean(0)) and np.allclose(var, X.var(0))
