# --- PMT:env --- #
import numpy as np


# --- PMT:code --- #
def entropy(p1):
    """Binary entropy of a node that is a fraction p1 positive (the rest negative):

        H(p1) = -p1*log2(p1) - (1-p1)*log2(1-p1)

    Define H = 0 when p1 is 0 or 1 (a pure node has no impurity). Return a float.
    Tip: np.log2; guard the p1 == 0 / p1 == 1 cases first.
    """
    ...


# --- PMT:corr --- #
def entropy(p1):
    if p1 == 0 or p1 == 1:
        return 0.0
    return float(-p1 * np.log2(p1) - (1 - p1) * np.log2(1 - p1))


# --- PMT:tests --- #
assert np.isclose(entropy(0.5), 1.0), "a 50/50 node has entropy 1"
assert entropy(0) == 0.0 and entropy(1) == 0.0, "pure nodes have entropy 0"
assert np.isclose(entropy(0.5), entropy(0.5))


# --- PMT:secrets --- #
@auto_run
def tests():
    import math
    def ref(p):
        if p in (0, 1): return 0.0
        return -p*math.log2(p) - (1-p)*math.log2(1-p)
    for p in [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1]:
        assert np.isclose(entropy(p), ref(p)), f"wrong at p1={p}"
