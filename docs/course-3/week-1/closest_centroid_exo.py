# --- PMT:env --- #
import numpy as np

X = np.array([[1., 1.], [1.5, 2.], [3., 4.], [5., 7.], [3.5, 5.], [4.5, 5.], [3.5, 4.5]])
centroids = np.array([[3., 3.], [6., 2.], [8., 5.]])


# --- PMT:code --- #
def find_closest_centroids(X, centroids):
    """K-means assignment step: for each row of X, return the INDEX of the nearest
    centroid (by Euclidean distance). Return a 1-D int array of length len(X).
    Tip: loop over examples; np.linalg.norm(X[i] - centroids[j]); np.argmin.
    """
    ...


# --- PMT:corr --- #
def find_closest_centroids(X, centroids):
    idx = np.zeros(X.shape[0], dtype=int)
    for i in range(X.shape[0]):
        d = [np.linalg.norm(X[i] - c) for c in centroids]
        idx[i] = np.argmin(d)
    return idx


# --- PMT:tests --- #
idx = find_closest_centroids(X, centroids)
assert idx.shape == (7,)
assert idx[0] == 0, "first point is closest to centroid 0"


# --- PMT:secrets --- #
@auto_run
def tests():
    def ref(X, c):
        return np.array([int(np.argmin([np.linalg.norm(x - cc) for cc in c])) for x in X])
    assert np.array_equal(find_closest_centroids(X, centroids), ref(X, centroids))
