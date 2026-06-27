# --- PMT:env --- #
import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

# one example with 2 features, a layer of 3 units
A_in = np.array([[0.7, -0.3]])
W = np.array([[1.0, -3.0, 5.0],
              [-2.0, 4.0, -6.0]])
b = np.array([-1.0, 1.0, 2.0])


# --- PMT:code --- #
def dense(A_in, W, b):
    """One dense layer, vectorized. With A_in shape (1, n), W shape (n, units),
    b shape (units,):  Z = A_in @ W + b, then A_out = sigmoid(Z).
    Return A_out of shape (1, units). Tip: the @ operator does matrix multiply.
    """
    ...


# --- PMT:corr --- #
def dense(A_in, W, b):
    return sigmoid(A_in @ W + b)


# --- PMT:tests --- #
A = dense(A_in, W, b)
assert A.shape == (1, 3)
assert np.all((A >= 0) & (A <= 1)), "sigmoid outputs lie in [0, 1]"


# --- PMT:secrets --- #
@auto_run
def tests():
    def ref(a, w, bb): return 1 / (1 + np.exp(-(a @ w + bb)))
    assert np.allclose(dense(A_in, W, b), ref(A_in, W, b))
