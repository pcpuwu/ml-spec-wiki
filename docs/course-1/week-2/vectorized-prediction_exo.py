# --- PMT:env --- #
import numpy as np

# a house: [size sqft, bedrooms, floors, age yrs]
x = np.array([1416.0, 3.0, 2.0, 40.0])
w = np.array([0.1, 4.0, 10.0, -2.0])
b = 80.0


# --- PMT:code --- #
def predict(x, w, b):
    """Multiple-linear-regression prediction f(x) = w·x + b.

    Use a VECTORIZED dot product (np.dot), not a Python loop.
    Return a float.
    """
    ...


# --- PMT:corr --- #
def predict(x, w, b):
    return float(np.dot(w, x) + b)


# --- PMT:tests --- #
# 0.1*1416 + 4*3 + 10*2 - 2*40 + 80 = 173.6
assert abs(predict(x, w, b) - 173.6) < 1e-6


# --- PMT:secrets --- #
@auto_run
def tests():
    def ref(x, w, b):
        return float(np.dot(w, x) + b)

    cases = [
        (np.array([1.0, 2.0, 3.0]), np.array([4.0, 5.0, 6.0]), 1.0),
        (np.array([2104.0, 5.0, 1.0, 45.0]), np.array([0.1, 4.0, 10.0, -2.0]), 80.0),
        (np.array([0.0, 0.0]), np.array([3.0, 7.0]), -2.5),
        (np.array([10.0]), np.array([2.5]), 0.0),
    ]
    for xi, wi, bi in cases:
        got = predict(xi, wi, bi)
        exp = ref(xi, wi, bi)
        assert abs(got - exp) < 1e-6, f"predict({xi.tolist()}, {wi.tolist()}, {bi}) = {got}, expected {exp}"
