# Learning Rate — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](learning-rate.md)

---

[00:00:01] The choice of the learning rate alpha will have a huge impact on the efficiency of your implementation of gradient descent.  
[00:00:09] And if alpha, the learning rate, is chosen poorly, grade and descent may not even work at all.  
[00:00:15] In this video, let's take a deeper look at the learning rate.  
[00:00:19] This will also help you choose better learning rates for your implementations of gradient descent.  
[00:00:25] So here again is the gradient descent rule.  
[00:00:29] W is updated to be W minus the learning rate alpha times the derivative term.  
[00:00:35] To learn more about what the learning rate alpha is doing, let's see what could happen if the learning rate alpha is either too small or if it is too large.  
[00:00:46] For the case where the learning rate is too small, here's a graph where the horizontal axis is W and the vertical axis is the cost J.  
[00:00:56] And here's a graph of the function J of  
[00:01:00] Let's start gradient descent at this point here.  
[00:01:04] If the learning rate is too small, then what happens is that you multiply your derivative term by some really, really, really small number.  
[00:01:14] So you're going to be multiplying by a number alpha that's really small, like 0.00001.  
[00:01:22] And so you end up taking a very small baby step like that.  
[00:01:27] Then from this point, you're going to take another,  
[00:01:30] you know, tiny, tiny little baby step. But because the learning rate is so small,  
[00:01:36] the second step is also just minuscue. The outcome of this process is that you do end up decreasing  
[00:01:43] the cost J, but incredibly slowly. So here's another step, and another step, another tiny step,  
[00:01:51] until you finally approach the minimum. But as you may notice, you're going to need a lot of steps  
[00:01:57] to get to the minimum. So to summarize, if the learning rate is too small, then gradient  
[00:02:04] descent will work, but it will be slow. It will take a very long time because it's going to take  
[00:02:10] these tiny, tiny baby steps, and it's going to need a lot of steps before it gets anywhere close  
[00:02:15] to the minimum. Now, let's look at a different case. What happens if the learning rate is too  
[00:02:23] large? Here's another graph of the cost function. And let's say we start gradient  
[00:02:28] descent with W at this value here. So it's actually already pretty close to the minimum.  
[00:02:37] So the derivative points to the right, but if the learning rate is too large, then you update  
[00:02:45] via a giant step to be all the way over here, and that's this point here on the function J.  
[00:02:55] So you move from this point on the left all the way to this point on the right, and now  
[00:03:02] the cost has actually gotten worse. It has increased because it has started out at this value  
[00:03:07] here, and after one step, it actually increased to this value here. Now, the derivative at this new  
[00:03:15] point says to decrease W. But when the learning rate is too big, then you may take a huge step  
[00:03:24] going from here all the way out here. So now you've gotten to this point here. And again,  
[00:03:31] if the learning rate is too big, then you take another huge step at an acceleration and way  
[00:03:36] overshoot the minimum again. So now you're at this point on the right, and one more time,  
[00:03:42] you do another update and end up all the way here. And so you're now at this point here.  
[00:03:51] So as you may notice, you're actually getting further and further away from  
[00:03:55] the minimum. So if the learning rate is too large, then gradient descent may overshoot and may  
[00:04:02] never reach the minimum. And another way to say that is that gradient descent may fail to  
[00:04:09] converge and may even diverge. So here's another question you may be wondering. One of your parameter  
[00:04:20] W is already at this point here, so that your cost J is already at a  
[00:04:26] a local minimum. What do you think one step of gradient descent will do if you've already  
[00:04:33] reached a minimum? So this is a tricky one. When I was first learning this stuff, it actually  
[00:04:41] took me a long time to figure it out. But let's work through this together. Let's suppose you have  
[00:04:47] some cost function J, and the one you see here isn't a squared error cost function. And this  
[00:04:55] cost function has two local minimum corresponding.  
[00:04:58] to the two values that you see here. Now, let's suppose that after some number of steps of gradient  
[00:05:06] descent, your parameter W is over here, say equal to 5. And so this is the current value of W. This means  
[00:05:17] that you're at this point on the cost function J, and that happens to be a local minimum. Turns  
[00:05:23] out if you draw a tangent to the function at this point, the slope of this line is zero,  
[00:05:29] And thus, the derivative term here is equal to 0 for the current value of W.  
[00:05:37] And so your gradient descent update becomes W is updated to W minus the learning rate times 0.  
[00:05:45] We're here, that's because the derivative term is equal to 0.  
[00:05:50] And this is the same as saying, let's set W to be equal to W.  
[00:05:56] So this means that if you're already at the local  
[00:06:00] minimum, gradient descent leaves W unchanged because it just updates the new value of W to be the  
[00:06:06] the exact same old value of W. So concretely, let's say if the current value of W is 5, and Alpha is 0.1,  
[00:06:18] after one iteration, you update to W as W minus alpha times 0, and it is still equal to 5. So if your  
[00:06:30] parameters have already brought you to a local minimum, then further gradient descent  
[00:06:35] steps do absolutely nothing. It doesn't change the parameters, which is what you want,  
[00:06:40] because it keeps the solution at that local minimum. This also explains why gradient descent can reach  
[00:06:46] a local minimum, even with a fixed learning rate alpha. Here's what I mean. To illustrate this,  
[00:06:54] let's look at another example. Here's the cost function J of W  
[00:06:59] that we want to minimize. Let's initialize gradient descent up here at this point.  
[00:07:07] If we take one update step, maybe it'll take us to that point. And because this derivative  
[00:07:15] is pretty large, gradient descent takes a relatively big step, right? Now, we're at this second  
[00:07:23] point, where we take another step. And you may notice that the slope is not as steep as it was at the  
[00:07:30] first point, so the derivative isn't as large. And so the next update step will not be  
[00:07:36] as large as that first step. Now, we're at this third point here, and the derivative is smaller  
[00:07:45] than it was at the previous step, and we'll take an even smaller step. As we approach the  
[00:07:51] minimum, the derivative gets closer and closer to zero, so as we run gradient descent,  
[00:07:58] Eventually, we're taking very small steps until you finally reach a local minimum.  
[00:08:05] So just to recap, as we get nearer a local minimum, gradient descent will automatically take smaller steps.  
[00:08:13] And that's because as we approach the local minimum, the derivative automatically gets smaller,  
[00:08:19] and that means the update steps also automatically get smaller,  
[00:08:24] even if the learning rate alpha is kept at some fixed value.  
[00:08:27] So that's the gradient descent algorithm. You can use it to try to minimize any cost function J,  
[00:08:35] not just the mean squared error cost function that we're using for linear regression.  
[00:08:41] In the next video, we're going to take the function J and set that back to be exactly  
[00:08:47] the linear regression model's cost function, the mean squared error cost function that we  
[00:08:52] we've come up with earlier. And putting together gradient descent with this cost function,  
[00:08:58] that will give you your first learning algorithm, the linear regression algorithm.
