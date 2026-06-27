# --- PMT:env --- #
import numpy as np

# predicted probabilities (already through the sigmoid) and true 0/1 labels
f = np.array([0.9, 0.2, 0.7, 0.1])
y = np.array([1.0, 0.0, 1.0, 0.0])


# --- PMT:code --- #
def logistic_cost(f, y):
    """Average logistic (binary cross-entropy) cost.

        J = -(1/m) * sum[ y*log(f) + (1-y)*log(1-f) ]

    f and y are NumPy arrays of length m. Use np.log and np.mean.
    Return a float.
    """
    ...


# --- PMT:corr --- #
def logistic_cost(f, y):
    return float(-np.mean(y * np.log(f) + (1 - y) * np.log(1 - f)))


# --- PMT:tests --- #
# a confident, mostly-correct set of predictions => small cost
assert abs(logistic_cost(f, y) - 0.19763) < 1e-4
# perfect predictions => ~0 cost
assert logistic_cost(np.array([0.9999, 0.0001]), np.array([1.0, 0.0])) < 1e-3


# --- PMT:secrets --- #
@auto_run
def tests():
    def ref(f, y):
        return float(-np.mean(y * np.log(f) + (1 - y) * np.log(1 - f)))

    cases = [
        (np.array([0.5, 0.5]), np.array([1.0, 0.0])),
        (np.array([0.9, 0.2, 0.7, 0.1]), np.array([1.0, 0.0, 1.0, 0.0])),
        (np.array([0.3, 0.8, 0.6]), np.array([0.0, 1.0, 1.0])),
    ]
    for fi, yi in cases:
        got = logistic_cost(fi, yi)
        exp = ref(fi, yi)
        assert abs(got - exp) < 1e-9, f"logistic_cost({fi.tolist()}, {yi.tolist()}) = {got}, expected {exp}"
