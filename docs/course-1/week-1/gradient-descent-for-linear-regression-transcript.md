# Gradient Descent for Linear Regression — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](gradient-descent-for-linear-regression.md)

---

[00:00:01] So previously, you took a look at the linear regression model,  
[00:00:05] and then the cost function, and then the gradient descent algorithm.  
[00:00:10] In this video, we're going to put it all together  
[00:00:13] and use the squared error cost function for the linear regression model with gradient descent.  
[00:00:19] This will allow us to train the linear regression model to fit a straight line to our training data.  
[00:00:25] Let's get to it.  
[00:00:27] Here's the linear regression model, and to the right,  
[00:00:31] is the squared error cost function, and below is the gradient descent algorithm.  
[00:00:38] It turns out if you calculate these derivatives, these are the terms you would get.  
[00:00:45] The derivative with respect to W is this 1 over m, sum from i equals 1 through m,  
[00:00:54] then the error term, that is, the difference between the predicted and the actual values,  
[00:00:59] times the input feature xI,  
[00:01:03] and the derivative respect to b is this formula over here,  
[00:01:08] which looks the same as the equation above,  
[00:01:10] except that it doesn't have that xI term at the end.  
[00:01:15] And if you use these formulas to compute these two derivatives  
[00:01:20] and implement gradient descent this way, it will work.  
[00:01:24] Now, you may be wondering,  
[00:01:26] where did I get these formulas from?  
[00:01:28] They're derived using,  
[00:01:30] calculus. If you want to see the full derivation, I'll quickly run through the  
[00:01:34] derivation on the next slide. But if you don't remember or aren't interested in the calculus,  
[00:01:40] don't worry about it. You can skip the materials on the next slide entirely and still be able  
[00:01:45] to implement gradient descent and finish this class and everything will work just fine.  
[00:01:50] So in this slide, which is one of the most mathematical slides of the entire specialization,  
[00:01:55] and again, is completely optional, will show you how to calculate the  
[00:01:59] the derivative terms. Let's start with the first term. The derivative of the cost function  
[00:02:06] j with respect to w. We'll start by plugging in the definition of the cost function  
[00:02:13] j, so j of wb is this. So 1 over 2m times this sum of the squared error terms. And now remember also that  
[00:02:28] F of WB of XI is equal to this term over here, which is WXI plus B.  
[00:02:41] And so what we would like to do is compute the derivative, also called the partial derivative,  
[00:02:48] with respect to W of this equation right here on the right.  
[00:02:54] If you've taken a calculus class before, and again, it's totally fine if you have  
[00:02:59] haven't. You may know that by the rules of calculus, the derivative is equal to this term  
[00:03:05] over here, which is why the two here and the two here cancel out, leaving us with this equation that  
[00:03:15] you saw on the previous slide. So this, by the way, is why we had defined the cost function  
[00:03:22] with the one-half earlier this week, is because it makes the partial derivative neater. It cancels  
[00:03:29] out the two that appears from computing the derivative. For the other derivative  
[00:03:36] with respect to B, this is quite similar. I can write it out like this, and once again,  
[00:03:43] plug in the definition of f of xI, giving this equation, and by the rules of calculus, this is  
[00:03:52] equal to this, where there's no xI anymore at the end, and so the twos cancel once more.  
[00:04:00] and you end up with this expression for the derivative with respect to B.  
[00:04:07] And so now you have these two expressions for the derivatives,  
[00:04:11] and you can plug them into the gradient descent algorithm.  
[00:04:15] So here's the gradient descent algorithm for linear regression.  
[00:04:19] You repeatedly carry out these updates to W and B until convergence.  
[00:04:25] Remember that this F of X is a linear regression model, so is equal to  
[00:04:31] to w times x plus B. This expression here is the derivative of the cost function  
[00:04:39] with respect to W, and this expression is the derivative of the cost function with respect to B.  
[00:04:47] And just as a reminder, you want to update W and B simultaneously on each step.  
[00:04:54] Now, let's get familiar with how gradient descent works. One issue we saw with gradient descent  
[00:05:00] is that it can lead to a local minimum instead of a global minimum,  
[00:05:05] where the global minimum means the point that has the lowest possible value for the cost  
[00:05:10] function J out of all possible points. You may recall this surface plot that looks like an outdoor  
[00:05:17] park with a few hills with the grass and the birds is a relaxing outdoor hill. This function  
[00:05:22] has more than one local minimum. Remember, depending on where you initialize the parameters  
[00:05:28] this W and B, you can end up at different local minima.  
[00:05:32] You can end up here or you can end up here.  
[00:05:36] But it turns out when you're using a squared error cost function with linear regression,  
[00:05:42] the cost function does not and will never have multiple local minima.  
[00:05:47] It has a single global minimum because of this bow shape.  
[00:05:52] The technical term for this is that this cost function is a convex function.  
[00:05:58] Informally, a convex function is a bow-shaped function,  
[00:06:03] and it cannot have any local minimum other than the single global minimum.  
[00:06:09] So, when you implement gradient descent on a convex function,  
[00:06:13] one nice property is that so long as your learning rate is chosen appropriately,  
[00:06:19] it will always converge to the global minimum.  
[00:06:22] Congratulations! You now know how to implement gradient descent for linear regression.  
[00:06:28] We have just one lost video for this week. In that video, we'll see this album in action.  
[00:06:33] Let's go to that last video.
