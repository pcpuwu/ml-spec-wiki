# Improved Implementation of Softmax — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](improved-implementation-of-softmax.md)

---

[00:00:03] The implementation that you saw in the last video of a neural network with a softmax layer will work okay, but there's an even better way to implement it.  
[00:00:13] Let's take a look at what can go wrong with that implementation and also how to make it better.  
[00:00:18] Let me show you two different ways of computing the same quantity in a computer.  
[00:00:24] Option 1, we can set x equals to 2 over 10,000.  
[00:00:29] Option 2, we can set x equals 1 plus 1 over 10,000 minus 1 minus 1 over 10,000.  
[00:00:40] In which you first compute this, and then compute this, and then you take the difference.  
[00:00:44] And if you simplify this expression, this turns out to be equal to 2 over 10,000.  
[00:00:51] Let me illustrate this in this notebook.  
[00:00:53] So first, let's set x equals 2 over 10,000 and print the result to a lot of decimal points of accuracy.  
[00:01:01] Okay, that looks pretty good.  
[00:01:03] Second, let me set x equals, I'm going to insist on computing 1 over 1 plus 10,000, and then subtract from that 1 minus 1 over 10,000, and let's print that out.  
[00:01:14] And, oh, okay, it just looks a little bit off, as if there's some round-off error.  
[00:01:20] Because the computer has only a finite amount of memory to store each number, called a floating-point number in this case,  
[00:01:28] depending on how you decide to compute the value 2 over 10,000, the result can have more or less numerical round-off error.  
[00:01:38] And it turns out that while the way we have been computing the cost function for Softmax is correct,  
[00:01:47] there's a different way of formulating it that reduces these numerical round-off errors, leading to more accurate computations within TensorFlow.  
[00:01:57] Let me first explain this in a little bit more detail using logistic regression, and then we will show how these ideas apply to improving our implementation of Softmax.  
[00:02:08] So, first let me illustrate these ideas using logistic regression, and then we'll move on to show how to improve your implementation of Softmax as well.  
[00:02:18] Recall that for logistic regression, if you want to compute the loss function, for a given example, you would first compute this output activation A,  
[00:02:28] which is g of z, or 1 over 1 plus e to the negative z, and then you compute the loss using this expression over here.  
[00:02:38] And in fact, this is what the code would look like for a logistic output layer with this binary cross-entropy loss.  
[00:02:50] And for logistic regression, this works okay, and usually the numerical round-off errors aren't that bad.  
[00:02:56] But it turns out that if you allow TensorFlow to not have to compute A as an intermediate term,  
[00:03:05] but instead if you tell TensorFlow that the loss is this expression down here, and all I've done is I've taken A and expanded it into this expression down here,  
[00:03:17] then TensorFlow can rearrange terms in this expression and come up with a more numerically accurate way to compute this loss function.  
[00:03:28] And so, whereas the original procedure was like insisting on computing as an intermediate value 1 plus 1 over 10,000,  
[00:03:39] and another intermediate value 1 minus 1 over 10,000, and then manipulating these two to get 2 over 10,000,  
[00:03:47] this original implementation was insisting on explicitly computing A as an intermediate quantity.  
[00:03:55] But instead, by specifying this expression at the bottom directly as a loss function, it gives TensorFlow more flexibility in terms of how to compute this,  
[00:04:05] and whether or not it wants to compute A explicitly.  
[00:04:08] And so, the code you can use to do this is shown here.  
[00:04:14] And what this does is it sets the output layer to just use a linear activation function,  
[00:04:21] and it puts both the activation function, 1 over 1 plus e to the negative z, as well as this cross-entropy loss into the specification of the loss function over here.  
[00:04:34] And that's what this from logits equals true argument causes TensorFlow to do.  
[00:04:41] And in case you're wondering what the logits are, it's basically this number z.  
[00:04:46] So, TensorFlow will compute z as an intermediate value, but it can rearrange terms to make this become computed more accurately.  
[00:04:55] One downside of this code is it becomes a little bit less legible, but this causes TensorFlow to have a little bit less numerical round-off error.  
[00:05:05] Now, in the case of logistic regression, either of these implementations actually works okay.  
[00:05:11] But the numerical round-off errors can get worse when it comes to softmax.  
[00:05:16] Now, let's take this idea and apply it to softmax regression.  
[00:05:20] Recall what you saw in the last video was you compute deactivations as follows.  
[00:05:26] Deactivations is g of z1 through z10, where a1, for example, is e to the z1 divided by the sum of the e to the zj's.  
[00:05:38] And then the loss was this, depending on what is the actual value of y is negative log of aj for one of the aj's.  
[00:05:46] And so, this was the code that we had to do this computation in two separate steps.  
[00:05:53] But once again, if you instead specify that the loss is, if y is equal to 1, is negative log of this formula, and so on.  
[00:06:05] If y is equal to 10, is this formula, then this gives TensorFlow the ability to rearrange terms and compute this in a more numerically accurate way.  
[00:06:20] Just to give you some intuition for why TensorFlow might want to do this.  
[00:06:25] It turns out if one of the z's is really small, then e to the negative small number becomes very, very small.  
[00:06:32] Or if one of the z's is a very large number, then e to the z can become a very, very large number.  
[00:06:37] And by rearranging terms, TensorFlow can avoid some of these very small or very large numbers,  
[00:06:43] and therefore come up with a more accurate computation for the loss function.  
[00:06:48] So the code for doing this is shown here.  
[00:06:51] In the output layer, we're now just using a linear activation function.  
[00:06:55] So the output layer just computes z1 through z10.  
[00:07:00] And this whole computation of the loss is then captured in the loss function over here,  
[00:07:09] where again, we have the from logist equals true parameter.  
[00:07:13] So once again, these two pieces of code do pretty much the same thing,  
[00:07:18] except that the version that is recommended is more numerically accurate,  
[00:07:23] although unfortunately it is a little bit harder to read as well.  
[00:07:27] So if you're reading someone else's code and you see this and you wonder what's going on,  
[00:07:31] it's actually equivalent to the original implementation, at least in concept, except that it's more numerically accurate.  
[00:07:38] The numerical round-off errors for logistic regression aren't that bad,  
[00:07:44] but it is recommended that you use this implementation down at the bottom instead.  
[00:07:50] And conceptually, this code does the same thing as the first version that you had previously,  
[00:07:56] except that it is a little bit more numerically accurate,  
[00:08:01] although the downside is it's maybe just a little bit harder to interpret as well.  
[00:08:05] Now, there's just one more detail,  
[00:08:08] which is that we've now changed the neural network to use a linear activation function  
[00:08:13] rather than a softmax activation function.  
[00:08:16] And so the neural network's final layer no longer outputs these probabilities, a1 through a10.  
[00:08:24] It is instead outputting z1 through z10.  
[00:08:28] And I didn't talk about it in the case of logistic regression,  
[00:08:32] but if you were combining the output logistic function with the loss function,  
[00:08:38] then for logistic regression, you also have to change the code this way  
[00:08:42] to take the output value and map it through the logistic function in order to actually get the probability.  
[00:08:49] So you now know how to do multicost classification with a softmax output layer  
[00:08:55] and also how to do it in a numerically stable way.  
[00:08:59] Before wrapping up multicost classification,  
[00:09:02] I want to share with you one other type of classification problem  
[00:09:06] called a multilabel classification problem.  
[00:09:09] Let's talk about that in the next video.
