# --- PMT:env --- #
import numpy as np

# 4 houses, 2 features: [size sqft, bedrooms]
X = np.array(
    [
        [2104.0, 5.0],
        [1416.0, 3.0],
        [1534.0, 3.0],
        [852.0, 2.0],
    ]
)


# --- PMT:code --- #
def zscore_normalize(X):
    """Z-score normalise each COLUMN (feature) of X.

    For every column j: subtract that column's mean mu_j, divide by its
    standard deviation sigma_j.  Use np.mean / np.std with axis=0 so you get
    one value per feature.

    Return (X_norm, mu, sigma) where mu and sigma are length-n arrays.
    """
    ...


# --- PMT:corr --- #
def zscore_normalize(X):
    mu = np.mean(X, axis=0)
    sigma = np.std(X, axis=0)
    X_norm = (X - mu) / sigma
    return X_norm, mu, sigma


# --- PMT:tests --- #
X_norm, mu, sigma = zscore_normalize(X)
# each normalised column has mean ~0 and std ~1
assert np.allclose(np.mean(X_norm, axis=0), 0.0, atol=1e-9)
assert np.allclose(np.std(X_norm, axis=0), 1.0, atol=1e-9)
assert mu.shape == (2,) and sigma.shape == (2,)


# --- PMT:secrets --- #
@auto_run
def tests():
    def ref(X):
        mu = np.mean(X, axis=0)
        sigma = np.std(X, axis=0)
        return (X - mu) / sigma, mu, sigma

    cases = [
        np.array([[1.0, 10.0], [3.0, 30.0], [5.0, 50.0]]),
        np.array([[2104.0, 5.0], [1416.0, 3.0], [852.0, 2.0]]),
        np.array([[0.0, -1.0, 100.0], [2.0, 1.0, 200.0], [4.0, 3.0, 300.0]]),
    ]
    for Xi in cases:
        gn, gmu, gsig = zscore_normalize(Xi)
        en, emu, esig = ref(Xi)
        assert np.allclose(gn, en), f"X_norm wrong for {Xi.tolist()}"
        assert np.allclose(gmu, emu), f"mu wrong for {Xi.tolist()}"
        assert np.allclose(gsig, esig), f"sigma wrong for {Xi.tolist()}"
