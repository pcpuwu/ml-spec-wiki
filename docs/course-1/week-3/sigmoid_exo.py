# --- PMT:env --- #
import numpy as np


# --- PMT:code --- #
def sigmoid(z):
    """Logistic sigmoid g(z) = 1 / (1 + e^{-z}).

    Must work element-wise on a NumPy array (use np.exp, not math.exp).
    Returns an array the same shape as z, with every value in (0, 1).
    """
    ...


# --- PMT:corr --- #
def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-z))


# --- PMT:tests --- #
import numpy as np

# g(0) = 0.5, and the function is symmetric: g(z) + g(-z) = 1
assert abs(sigmoid(0.0) - 0.5) < 1e-9
assert sigmoid(100.0) > 0.999
assert sigmoid(-100.0) < 0.001
z = np.array([-1.0, 0.0, 1.0])
assert np.allclose(sigmoid(z) + sigmoid(-z), 1.0)


# --- PMT:secrets --- #
@auto_run
def tests():
    def ref(z):
        return 1.0 / (1.0 + np.exp(-z))

    cases = [
        np.array([0.0]),
        np.array([-3.0, -1.0, 0.0, 1.0, 3.0]),
        np.array([[-2.0, 2.0], [10.0, -10.0]]),
        np.linspace(-5, 5, 11),
    ]
    for z in cases:
        got = sigmoid(z)
        exp = ref(z)
        assert np.allclose(got, exp), f"sigmoid({z.tolist()}) wrong"
        assert np.all((got > 0) & (got < 1)), "outputs must be strictly between 0 and 1"
