# --- PMT:env --- #
import numpy as np

# tiny training set: house size (1000s sqft) -> price (1000s $)
x_train = np.array([1.0, 2.0])
y_train = np.array([300.0, 500.0])


# --- PMT:code --- #
def compute_cost(x, y, w, b):
    """Squared-error cost for linear regression.

    J(w, b) = (1 / 2m) * sum_i ( f_wb(x_i) - y_i )^2,  where f_wb(x) = w*x + b.
    Return the cost as a float.
    """
    # Your code here. Tips: m = x.shape[0]; numpy lets you work on whole
    # arrays at once (w * x + b), and np.sum adds them up.
    ...


# --- PMT:corr --- #
def compute_cost(x, y, w, b):
    m = x.shape[0]
    f_wb = w * x + b
    return float(np.sum((f_wb - y) ** 2) / (2 * m))


# --- PMT:tests --- #
# w=200, b=100 puts the line exactly through both points -> cost is 0.
assert abs(compute_cost(x_train, y_train, 200.0, 100.0)) < 1e-9
# any worse fit costs something positive.
assert compute_cost(x_train, y_train, 0.0, 0.0) > 0


# --- PMT:secrets --- #
@auto_run
def tests():
    def ref(x, y, w, b):
        m = x.shape[0]
        return float(np.sum((w * x + b - y) ** 2) / (2 * m))

    xs = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
    ys = np.array([300.0, 500.0, 700.0, 900.0, 1100.0])
    for w, b in [(200.0, 100.0), (0.0, 0.0), (100.0, 200.0), (150.0, 50.0), (-50.0, 400.0)]:
        got = compute_cost(xs, ys, w, b)
        exp = ref(xs, ys, w, b)
        assert abs(got - exp) < 1e-6, f"compute_cost(x, y, {w}, {b}) returned {got}, expected {exp}"
