# Larger Neural Network Example (Optional) — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](larger-neural-network-example.md)

---

[00:00:00] In this final video on intuition for backprop, let's take a look at how the computation graph works on a larger neural network example.  
[00:00:11] Here's the network we will use with a single hidden layer, with a single hidden unit that outputs A1,  
[00:00:20] that feeds into the output layer that outputs the final prediction, A2.  
[00:00:25] To make the math more tractable, I'm going to continue to use just a single training example with inputs x equals 1, y equals 5,  
[00:00:34] and these will be the parameters of the network.  
[00:00:37] And throughout, we're going to use the regular activation function, so g of z equals max of 0 comma z.  
[00:00:44] So for a prop in the neural network looks like this, as usual, A1 equals g of w1 times x plus b1.  
[00:00:53] And so it turns out w1 x plus b will be positive, so we're in the max 0 z equals z part of this activation function,  
[00:01:06] so that's just equal to this, which is 2 times 1, that's w1 is 2, times x is 1, plus 0, that's b1, which is equal to 2.  
[00:01:16] And then similarly, A2 equals this, g of w2, A1 plus b2, which is w2 times A1 plus b,  
[00:01:24] again, because we're in the positive part of the regular activation function, which is 3 times 2 plus 1, which is equal to 7.  
[00:01:32] Finally, we'll use the squared error cost function,  
[00:01:36] so j of wb is 1 half A2 minus y squared, which is 1 half 7 minus 5 squared, which is 1 half of 2 squared, which is just equal to 2.  
[00:01:49] So let's take this calculation that we just did and write it down in the form of a computation graph.  
[00:01:55] To carry out the computation step by step, first thing we need to do is take w1 and multiply that by x.  
[00:02:04] So we'll have w1 that feeds into the computation node to compute w1 times x.  
[00:02:10] And I'm going to call this a temporary variable, t1.  
[00:02:15] Next, we compute z1, which is this term here, which is t1 plus b1, so we also have this input b1 over here.  
[00:02:25] And finally, A1 equals g of z1. We apply the activation function, and so we end up with, again, this value here, 2.  
[00:02:35] And then next, we have to compute t2, which is w2 times A1.  
[00:02:42] And so with w2, that gives us this value, which is 6.  
[00:02:47] Then z2, which is this quantity, we add b to it, and that gives us 7.  
[00:02:54] And finally, apply the activation function, g, we still end up with 7.  
[00:02:59] And lastly, j is 1 half A2 minus y squared, and that gives us 2, which is this cost function here.  
[00:03:08] So this is how you take the step by step computations for a larger neural network and write it in a computation graph.  
[00:03:16] You've already seen in the last video the mechanics of how to carry out backprop.  
[00:03:21] I'm not going to go through the step by step calculations here, but if you were to carry out backprop,  
[00:03:27] the first thing you do is ask, what is the derivative of the cost function j with respect to A2?  
[00:03:35] And it turns out, if you calculate that, it turns out to be 2.  
[00:03:39] So we'll fill that in here.  
[00:03:41] And the next step would be to ask, what's the derivative of the cost j with respect to z2?  
[00:03:47] And using this derivative that we computed previously, you can figure out that this turns out to be 2.  
[00:03:54] Because if z goes up by epsilon, you can show that for the current setting of all the parameters,  
[00:04:02] A2 will go up by epsilon, and therefore j will go up by 2 times epsilon.  
[00:04:07] So this derivative is equal to 2, and so on, step by step.  
[00:04:12] We can then find out that the derivative of j with respect to b2 is also equal to 2.  
[00:04:17] The derivative with respect to t2 is equal to 2, and so on, and so forth.  
[00:04:24] Until eventually, you've computed the derivative of j with respect to all the parameters w1, b1, w2, and b2.  
[00:04:33] And so that's backprop.  
[00:04:35] And again, I didn't go through the mechanical steps of every single step of backprop,  
[00:04:39] but it's basically the process that you saw in the previous video.  
[00:04:43] Let me just double check one of these examples.  
[00:04:48] So we saw here that the derivative of j with respect to w1 is equal to 6.  
[00:04:54] So what this is predicting is that if w1 goes up by epsilon, j should go up by roughly 6 times epsilon.  
[00:05:04] Let's step through the math and see if that really is true.  
[00:05:08] These are the calculations that we did again.  
[00:05:12] And so if w, which was 2, were to be 2.001, goes up by epsilon,  
[00:05:19] then a1 becomes, let's see, instead of 2, this is 2.001 as well.  
[00:05:26] So a1 instead of 2 is now 2.001.  
[00:05:30] So 3 times 2.001 plus 1 just gives us 7.003.  
[00:05:37] And if a2 is 7.003, then this becomes 7.003 minus 5 squared.  
[00:05:46] And so this becomes 2.003 squared over 2, which turns out to be equal to 2.00605.  
[00:05:58] So ignoring some of the extra digits,  
[00:06:01] you see from this little calculation that if w1 goes up by 0.001,  
[00:06:08] j of w has gone up from 2 to 2.006 roughly, so 6 times as much.  
[00:06:15] And so the derivative of j with respect to w1 is indeed equal to 6.  
[00:06:22] And so the backprop procedure gives you a very efficient way to compute all of these derivatives,  
[00:06:28] which you can then feed into the gradient descent algorithm or the atom optimization algorithm  
[00:06:33] to then train the parameters of your neural network.  
[00:06:37] And again, the reason we use backprop for this is it's a very efficient way to compute all of the derivatives  
[00:06:43] of j with respect to w1, j with respect to b1, j with respect to w2, and j with respect to b2.  
[00:06:53] I did just illustrate how we could bump up w1 by a little bit and see how much j changes,  
[00:07:00] but that was a left to right calculation.  
[00:07:03] And if we had to do this procedure for each parameter, one parameter at a time,  
[00:07:08] if we had to increase w by 0.01 to see how that changes j,  
[00:07:12] increase b1 by a little bit to see how that changes j,  
[00:07:16] and increase every parameter one at a time by a little bit to see how that changes j,  
[00:07:21] then this becomes a very inefficient calculation.  
[00:07:24] And if you had n nodes in your computation graph and p parameters,  
[00:07:28] this procedure would end up taking n times p steps, which is very inefficient,  
[00:07:34] whereas we got all four of these derivatives n plus p rather than n times p steps.  
[00:07:40] And this makes a huge difference in practical neural networks  
[00:07:44] where the number of nodes and the number of parameters can be really large.  
[00:07:49] So that's the end of the video for this week.  
[00:07:52] Thanks for sticking with me through the end of these optional videos,  
[00:07:55] and I hope that you now have an intuition for when you use a programming framework  
[00:08:00] like TensorFlow to train a neural network, what's actually happening under the hood  
[00:08:05] and how it's using the computation graph to efficiently compute derivatives for you.  
[00:08:11] Many years ago, before the rise of frameworks like TensorFlow and PyTorch,  
[00:08:18] researchers used to have to manually use calculus  
[00:08:22] to compute the derivatives of the neural networks that they wanted to train.  
[00:08:27] And so in modern programming frameworks, you can specify a forward prop  
[00:08:31] and have it take care of back prop for you.  
[00:08:34] Many years ago, researchers used to write down the neural network by hand,  
[00:08:38] manually use calculus to compute the derivatives,  
[00:08:41] and then implement a bunch of equations that they had laboriously derived on paper  
[00:08:46] to implement back prop.  
[00:08:48] Thanks to the computation graph and these techniques for automatically  
[00:08:53] carrying out derivative calculations,  
[00:08:56] it's sometimes called auto-div for automatic differentiation.  
[00:09:00] This process of researchers manually using calculus to take derivatives  
[00:09:05] is no longer really done.  
[00:09:07] At least, I've not had to do this for many years now myself because of auto-div.  
[00:09:12] So many years ago, to use neural networks,  
[00:09:15] the bar for the amount of calculus you had to know actually used to be higher.  
[00:09:20] But because of automatic differentiation algorithms,  
[00:09:23] usually based on the computation graph,  
[00:09:25] you can now implement a neural network and get derivatives computed for you  
[00:09:30] easier than before.  
[00:09:31] So maybe with the maturing of neural networks,  
[00:09:34] the amount of calculus you need to know in order to get these algorithms to work  
[00:09:38] has actually gone down,  
[00:09:39] and that's been encouraging for a lot of people.  
[00:09:42] And so that's it for the videos for this week.  
[00:09:47] I hope you enjoyed the labs,  
[00:09:49] and I look forward to seeing you next week.
