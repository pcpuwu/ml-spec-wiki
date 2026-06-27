# --- PMT:env --- #
import numpy as np

z = np.array([1.0, 2.0, 3.0, 4.0])


# --- PMT:code --- #
def softmax(z):
    """Softmax: a_j = e^{z_j} / (e^{z_1}+...+e^{z_n}).

    Return an array the same length as z whose entries are positive and sum to 1.
    Tip: np.exp(z) then divide by np.sum(...).
    """
    ...


# --- PMT:corr --- #
def softmax(z):
    ez = np.exp(z - np.max(z))      # subtract max for numerical stability
    return ez / np.sum(ez)


# --- PMT:tests --- #
a = softmax(z)
assert a.shape == z.shape
assert np.isclose(np.sum(a), 1.0), "softmax outputs must sum to 1"
assert np.all(a > 0)
assert np.argmax(a) == np.argmax(z), "largest z should give largest probability"


# --- PMT:secrets --- #
@auto_run
def tests():
    def ref(z):
        ez = np.exp(z - np.max(z)); return ez / np.sum(ez)
    for zz in [np.array([0.,0.,0.]), np.array([1.,2.,3.]), np.array([-5.,5.]), np.array([2.,2.,2.,2.])]:
        assert np.allclose(softmax(zz), ref(zz)), f"wrong for {zz.tolist()}"
