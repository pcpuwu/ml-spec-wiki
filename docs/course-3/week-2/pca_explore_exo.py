# --- PMT:env --- #
import numpy as np

# 6 examples, 2 features (already zero-mean, as PCA expects).
X = np.array(
    [
        [1.0, 1.0],
        [2.0, 1.0],
        [3.0, 2.0],
        [-1.0, -1.0],
        [-2.0, -1.0],
        [-3.0, -2.0],
    ]
)

# A length-1 vector pointing along the principal-component (z) axis.
u = np.array([0.707, 0.707])


# --- PMT:code --- #
def project(X, u):
    """Project each row of X onto the unit axis u (PCA's 1-D projection).

    From the lecture: the coordinate of an example x on axis z is the DOT
    PRODUCT  x · u.  Do this for every row of X at once and return a 1-D array
    of length len(X) — one z-number per example.  (Hint: X @ u.)
    """
    ...


def reconstruct(z, u):
    """Approximately invert the projection: map each z-number back to 2-D.

    From the lecture: the reconstruction of a point is  z * u.  Given a 1-D
    array z of length m, return an (m, 2) array whose i-th row is z[i] * u.
    (Hint: np.outer(z, u).)
    """
    ...


# --- PMT:corr --- #
def project(X, u):
    return X @ u


def reconstruct(z, u):
    return np.outer(z, u)


# --- PMT:tests --- #
z = project(X, u)
assert z.shape == (6,), "project must return one number per example"
# first example [1,1] -> 1*0.707 + 1*0.707 = 1.414
assert np.isclose(z[0], 1.414, atol=1e-3)

Xr = reconstruct(z, u)
assert Xr.shape == (6, 2), "reconstruct must return an (m, 2) array"
# reconstruction of example 0 ~ [1, 1]
assert np.allclose(Xr[0], [1.0, 1.0], atol=1e-2)


# --- PMT:secrets --- #
@auto_run
def tests():
    def ref_proj(X, u):
        return X @ u

    def ref_recon(z, u):
        return np.outer(z, u)

    rng_cases = [
        (np.array([[2.0, 3.0]]), np.array([0.6, 0.8])),
        (np.array([[1.0, 0.0], [0.0, 1.0], [-2.0, -2.0]]), np.array([0.707, 0.707])),
        (np.array([[5.0, -1.0, 2.0]]), np.array([0.0, 1.0, 0.0])),
    ]
    for Xi, ui in rng_cases:
        gz = project(Xi, ui)
        ez = ref_proj(Xi, ui)
        assert np.allclose(gz, ez), f"project wrong for {Xi.tolist()}"
        gr = reconstruct(gz, ui)
        er = ref_recon(ez, ui)
        assert np.allclose(gr, er), f"reconstruct wrong for {Xi.tolist()}"
