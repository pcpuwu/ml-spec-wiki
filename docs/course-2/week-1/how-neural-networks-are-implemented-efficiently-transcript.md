# How Neural Networks are Implemented Efficiently — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](how-neural-networks-are-implemented-efficiently.md)

---

[00:00:01] One of the reasons that deep learning researchers have been able to scale up neural networks  
[00:00:07] and build really large neural networks over the last decade is because neural networks can be vectorized.  
[00:00:14] They can be implemented very efficiently using matrix multiplications.  
[00:00:19] And it turns out that parallel computing hardware, including GPUs, but also some CPU functions,  
[00:00:26] are very good at doing very large matrix multiplications.  
[00:00:30] In this video, we'll take a look at how these vectorized implementations of neural networks work.  
[00:00:36] Without these ideas, I don't think deep learning would be anywhere near success and scale today.  
[00:00:42] Here on the left is the code that you had seen previously of how you would implement forward prop  
[00:00:50] or forward propagation in a single layer.  
[00:00:55] X here is the input.  
[00:00:58] W, the weights of the first, second, and third neurons, say.  
[00:01:03] Parameters B, and then this is the same code as what you saw before.  
[00:01:08] And this will output three numbers, say, like that.  
[00:01:12] And if you actually implement this computation, you get 101.  
[00:01:17] It turns out you can develop a vectorized implementation of this function as follows.  
[00:01:26] Set X to be equal to this.  
[00:01:29] Notice the double square brackets.  
[00:01:31] So this is now a 2D array, like in TensorFlow.  
[00:01:36] W is the same as before.  
[00:01:38] And B, I'm now using capital B, is also a 1 by 3 2D array.  
[00:01:47] And then it turns out that all of these steps, this for loop inside, can be replaced with just a couple lines of code.  
[00:01:56] Z equals np.matmul.  
[00:02:00] Matmul is how NumPy carries out matrix multiplication.  
[00:02:04] Where now X and W are both matrices, and so you just multiply them together.  
[00:02:11] And it turns out that this for loop, all of these lines of code, can be replaced with just a couple lines of code,  
[00:02:18] which gives a vectorized implementation of this function.  
[00:02:23] So you compute Z, which is now a matrix again, as np.matmul between A-in and W.  
[00:02:32] Where here A-in and W are both matrices.  
[00:02:36] And matmul is how NumPy carries out a matrix-matrix multiplication.  
[00:02:41] It multiplies two matrices together, and then adds the matrix B to it.  
[00:02:45] And then A here, or A out, is equal to deactivation function G, that is a sigmoid function,  
[00:02:53] applied element-wise to this matrix Z, and then you finally return A out.  
[00:03:00] So this is what the code looks like.  
[00:03:04] Notice that in the vectorized implementation, all of these quantities, X, which is fed into the value of A-in,  
[00:03:11] as well as W, B, as well as Z, and A out, all of these are now 2D arrays.  
[00:03:17] All of these are matrices, and this turns out to be a very efficient implementation  
[00:03:24] of one step before propagation through a dense layer in the neural network.  
[00:03:29] So this is code for a vectorized implementation of forward prop in a neural network.  
[00:03:35] But what is this code doing, and how does it actually work?  
[00:03:39] And what is this matmul actually doing?  
[00:03:42] In the next two videos, both also optional, we'll go over matrix multiplication and how that works.  
[00:03:50] If you're familiar with linear algebra, if you're familiar with vectors, matrices, transposes,  
[00:03:57] and matrix-matrix multiplications, you can safely just quickly skim over these two videos  
[00:04:03] and jump to the last video of this week.  
[00:04:06] And then in the last video of this week, also optional, we'll dive into more detail  
[00:04:11] to explain how matmul gives you this vectorized implementation.  
[00:04:15] And so with that, let's go on to the next video, where we'll take a look at what matrix multiplication is.
