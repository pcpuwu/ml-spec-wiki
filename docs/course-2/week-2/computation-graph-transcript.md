# Computation Graph (Optional) — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](computation-graph.md)

---

[00:00:00] The computation graph is a key idea in deep learning, and it is also how programming frameworks like TensorFlow automatically compute derivatives of your neural networks.  
[00:00:12] Let's take a look at how it works.  
[00:00:15] Let me illustrate the concept of a computation graph with a small neural network example.  
[00:00:21] This neural network has just one layer, which is also the output layer, and just one unit in the output layer.  
[00:00:30] It takes as input X, applies a linear activation function, and outputs the activation A.  
[00:00:37] More specifically, its output is A equals WX plus B.  
[00:00:43] So, this is basically linear regression, but expressed as a neural network with one output unit.  
[00:00:52] Given the output, the cost function is then one-half A, that is the predicted value, minus the actual observed value Y squared.  
[00:01:04] And for this small example, we're only going to have a single training example, where the training example is the input X equals negative 2,  
[00:01:12] the ground truth output value Y equals 2, and the parameters of this network are W equals 2 and B equals 8.  
[00:01:23] So, what I'd like to do is show how the computation of the cost function J can be computed step-by-step using a computation graph.  
[00:01:36] And just as a reminder, when learning, we like to view the cost function J as a function of the parameters W and B.  
[00:01:46] Let's take the computation of J and break it down into individual steps.  
[00:01:53] First, you have the parameter W, that is an input to the cost function J.  
[00:02:00] And then we first need to compute W times X.  
[00:02:04] And let me just call that C as follows.  
[00:02:08] W is equal to 2, X is equal to negative 2, and so C would be negative 4.  
[00:02:14] And I'm just going to write the value here on top of this line, on top of this arrow to show the value that is your output on this arrow.  
[00:02:23] The next step is then to compute A, which is WX plus B.  
[00:02:27] So, let me create another node here.  
[00:02:30] And this needs to input B, the other parameter, that is input to the cost function J.  
[00:02:37] And A equals WX plus B, so it's equal to C plus B.  
[00:02:42] And if you add these up, that turns out to be 4.  
[00:02:47] And so this is starting to build up a computation graph in which the steps we need to compute the cost function J are broken down into smaller steps.  
[00:02:57] The next step is to then compute A minus Y, which I'm going to call D.  
[00:03:04] So, let me have that node D, which computes A minus Y.  
[00:03:09] Y is equal to 2, so 4 minus 2 is 2.  
[00:03:13] And then finally, J is the cost.  
[00:03:17] It's one half of A minus Y squared, or one half of D squared, which is just equal to 2.  
[00:03:25] What we've just done is build up a computation graph.  
[00:03:30] And this is a graph, not in the sense of plots with X and Y axes,  
[00:03:35] but this is the other sense of the word graph used in computer science,  
[00:03:38] which is that this is a set of nodes that is connected by edges, or connected by arrows in this case.  
[00:03:45] So, this computation graph shows the forward prop step of how we compute the output A of the neural network,  
[00:03:56] but then also go further than that to also compute the value of the cost function J.  
[00:04:02] The question now is, how do we find the derivative of J with respect to the parameters W and B?  
[00:04:10] Let's take a look at that next.  
[00:04:12] So, here's the computation graph from the previous slide,  
[00:04:16] and we've completed forward prop where we've computed that J, the cost function, is equal to 2  
[00:04:22] through all these steps going from left to right forward prop in the computation graph.  
[00:04:27] What we'd like to do now is compute the derivative of J with respect to W,  
[00:04:33] and the derivative of J with respect to B.  
[00:04:36] And it turns out that whereas forward prop was a left to right calculation,  
[00:04:43] computing the derivatives would be a right to left calculation,  
[00:04:47] which is why it's called back prop, was going backwards from right to left.  
[00:04:53] The final computation node of this graph is this one over here, which computes J equals one half of D squared.  
[00:05:02] The first step of back prop will ask if the value of D, which was the input to this node, were to change a little bit,  
[00:05:10] how much does the value of J change?  
[00:05:13] Specifically, we'll ask if D were to go up by a little bit, say 0.001, and that would be our value of epsilon in this case,  
[00:05:22] how would the value of J change?  
[00:05:25] It turns out in this case, if D goes from 2 to 2.001, then J goes from 2 to 2.002.  
[00:05:37] And so if D goes up by epsilon, J goes up by roughly 2 times epsilon.  
[00:05:45] And so we conclude that the derivative of J with respect to D, to this value D that is input to this final node, is equal to 2.  
[00:05:54] And so the first step of back prop would be to fill in this value 2 over here,  
[00:06:02] where this value is the derivative of J with respect to this input value D.  
[00:06:08] And we know if D changes a little bit, J changes by twice as much, because this derivative is equal to 2.  
[00:06:14] The next step is to look at the node before that and ask, what is the derivative of J with respect to A?  
[00:06:23] And to answer that, we have to ask, well if A goes up by 0.001, how does that change J?  
[00:06:30] Well, we know that if A goes up by 0.001, D is just A minus Y.  
[00:06:37] So if A becomes 4.001, D, which is A minus Y, becomes 4.001 minus Y equals 2, so it becomes 2.001.  
[00:06:50] So if A goes up by 0.001, D also goes up by 0.001.  
[00:06:56] But we'd already concluded previously that if D goes up by 0.001, J goes up by twice as much.  
[00:07:03] So now we know if A goes up by 0.001, D goes up by 0.001, then J goes up roughly by 2 times 0.001.  
[00:07:13] And this tells us that the derivative of J with respect to A is also equal to 2.  
[00:07:22] So I'm going to fill in that value over here, that this is the derivative of J with respect to A,  
[00:07:29] just as this was the derivative of J with respect to D.  
[00:07:33] If you've taken a calculus class before and if you've heard of the chain rule,  
[00:07:38] you might recognize that this step of computation that I just did is actually relying on the chain rule for calculus.  
[00:07:47] If you're not familiar with the chain rule, don't worry about it.  
[00:07:50] You won't need to know it for the rest of these videos.  
[00:07:52] But if you have seen the chain rule, you might recognize that the derivative of J with respect to A is asking,  
[00:08:00] how much does D change with respect to A, which is derivative of D with respect to A times the derivative of J with respect to D.  
[00:08:11] And this little calculation on top showed that the partial of D with respect to A is 1.  
[00:08:16] And we show pleasingly that the derivative of J with respect to D is equal to 2,  
[00:08:21] which is why the derivative of J with respect to A is 1 times 2, which is equal to 2.  
[00:08:26] And that's the value we got.  
[00:08:28] But again, if you're not familiar with the chain rule, don't worry about it.  
[00:08:31] The logic that we just went through here is why we know J goes up by twice as much as A does.  
[00:08:38] And that's why this derivative term is equal to 2.  
[00:08:41] The next step then is to keep on going right to left as we do in backprop.  
[00:08:46] And we'll ask, how much does a little change in C cause J to change?  
[00:08:51] And how much does a little change in B cause J to change?  
[00:08:56] And the way we figure that out is to ask, well, if C goes up by epsilon, 0.01, how much does A change?  
[00:09:04] Well, A is equal to C plus B.  
[00:09:07] So it turns out that if C ends up being negative 3.999, then A, which is negative 3.999 plus 8, becomes 4.01.  
[00:09:20] And so if C goes up by epsilon, A goes up by epsilon.  
[00:09:25] And we know if A goes up by epsilon, then because the derivative of J with respect to A is 2,  
[00:09:32] we know that this in turn causes J to go up by 2 times epsilon.  
[00:09:38] So we can conclude that if C goes up by a little bit, J goes up by twice as much.  
[00:09:44] And we know this because we know the derivative of J with respect to A is 2.  
[00:09:49] So this allows us to conclude that the derivative of J with respect to C is also equal to 2.  
[00:09:58] And so I'm going to fill in that value over here.  
[00:10:01] And again, only if you're familiar with chain rule, another way to write this is the derivative of J with respect to C  
[00:10:08] is the derivative of A with respect to C.  
[00:10:13] This turns out to be 1 times the derivative of J with respect to A, which we had previously figured out was equal to 2.  
[00:10:21] So that's why this ends up being equal to 2.  
[00:10:24] And by a similar calculation, if B goes up by 0.001, then A also goes up by 0.001, and J goes up by 2 times 0.001,  
[00:10:36] which is why this derivative is also equal to 2.  
[00:10:42] We'll fill in here the derivative of J with respect to B, and here the derivative of J with respect to C.  
[00:10:49] Now, one final step, which is what is the derivative of J with respect to W?  
[00:10:56] So if W goes up by 0.001, what happens?  
[00:11:01] C, which is W times X, if W were 2.001, C, which is W times X, becomes negative 2 times 2.001, so it becomes negative 4.002.  
[00:11:17] And so if W goes up by epsilon, C goes down by 2 times 0.001, or equivalently, C goes up by negative 2 times 0.001.  
[00:11:31] And we know that if C goes up by negative 2 times 0.001, because the derivative of J with respect to C is 2,  
[00:11:39] this means that J will go up by negative 4 times 0.001.  
[00:11:47] Right?  
[00:11:48] Because if C goes up by a certain amount, J changes by 2 times as much.  
[00:11:54] So 2 times, you know, negative 2 times this is negative 4 times this.  
[00:11:59] This allows us to conclude that if W goes up by 0.001, J goes up by negative 4 times 0.001.  
[00:12:06] And so the derivative of J with respect to W is negative 4.  
[00:12:13] And so I'm going to write negative 4 over here because that's the derivative of J with respect to W.  
[00:12:20] And once again, the chain rule calculation, if you're familiar with it, is this.  
[00:12:27] It's the derivative of C with respect to W times the derivative of J with respect to C.  
[00:12:33] This is 2 and this is negative 2, which is why we end up with negative 4.  
[00:12:40] But again, don't worry about it if you're not familiar with the chain rule.  
[00:12:44] So to wrap up, what we've just done is manually carry out backprop in this computation graph.  
[00:12:50] Whereas FOILPROP was a left to right computation where we had W equals 2 that allowed us to compute C,  
[00:12:58] then we had B and that allowed us to compute A, and then D, and then J.  
[00:13:03] Backprop went from right to left, and we would first compute the derivative of J with respect to D,  
[00:13:09] and then go back to compute the derivative of J with respect to A,  
[00:13:13] then the derivative of J with respect to B, derivative of J with respect to C,  
[00:13:17] and finally the derivative of J with respect to W.  
[00:13:20] So that's why backprop is a right to left computation, whereas FOILPROP was a left to right computation.  
[00:13:27] In fact, let's double check the computation that we just did.  
[00:13:32] So J with these values of W, B, X, and Y  
[00:13:37] is equal to one half times WX plus B minus Y squared,  
[00:13:45] which is one half times 2 times negative 2 plus 8 minus 2 squared, which is equal to 2.  
[00:13:55] And now if W were to go up by 0.001, then J becomes one half times,  
[00:14:02] W is now 2.001 times X, which is negative 2, plus B, which is 8, minus Y squared,  
[00:14:14] and if you calculate this out, this turns out to be 1.996002.  
[00:14:21] And so roughly, J has gone from 2 down to 1.996, and then an extra 0.002,  
[00:14:29] and J has therefore gone down by 4 times epsilon.  
[00:14:33] So this shows that if W goes up by epsilon, J goes down by 4 times epsilon,  
[00:14:39] or equivalently, J goes up by negative 4 times epsilon,  
[00:14:43] which is why the derivative of J with respect to W is negative 4,  
[00:14:48] which is what we have worked out over here.  
[00:14:51] And if you want, feel free to pause the video  
[00:14:53] and double check this math yourself as well for what happens if B,  
[00:14:58] the other parameter, goes up by epsilon,  
[00:15:01] and hopefully you find that the derivative of J with respect to B is indeed 2,  
[00:15:08] that if B goes up by epsilon, J goes up by 2 times epsilon,  
[00:15:14] as predicted by this derivative calculation.  
[00:15:17] So why do we use the backprop algorithm to compute derivatives?  
[00:15:22] It turns out that backprop is an efficient way to compute derivatives,  
[00:15:28] and the reason we sequence this as a right-to-left calculation is  
[00:15:33] if you were to start off and ask what is the derivative of J with respect to W,  
[00:15:39] then to know how much changing W affects changing J, right?  
[00:15:45] If W were to go up by epsilon, how much does J go up by epsilon?  
[00:15:49] Well, the first thing we want to know is what is the derivative of J with respect to C,  
[00:15:56] because changing W will change C, this first quantity here.  
[00:16:00] So to know how much changing W affects J,  
[00:16:04] we want to know how much this changing C affects J.  
[00:16:07] But to know how much changing C affects J,  
[00:16:11] the most useful thing to know to compute this would be  
[00:16:14] changing C changes A, so you want to know how much does changing A affect J, and so on.  
[00:16:20] And that's why backprop is sequenced as a right-to-left calculation,  
[00:16:25] because if you do the calculation from right to left,  
[00:16:28] you can find out how does changing D affect changing J,  
[00:16:33] then you can find out how much does changing A affect J, and so on,  
[00:16:39] until you find the derivatives of each of these intermediate quantities, C, A, and D,  
[00:16:46] as well as the parameters W and B,  
[00:16:49] so that you can find out with one right-to-left calculation  
[00:16:53] how much changing any of these intermediate quantities, C, A, or D,  
[00:16:59] as well as the input parameters W and B,  
[00:17:02] how much changing any of these things will affect the final output value J.  
[00:17:07] One thing that makes backprop efficient is,  
[00:17:10] you notice that when we do the right-to-left calculation,  
[00:17:14] we had to compute this term,  
[00:17:17] the derivative of J with respect to A just once,  
[00:17:20] and this quantity is then used to compute both the derivative of J with respect to W  
[00:17:27] and the derivative of J with respect to B.  
[00:17:30] And it turns out that if a computation graph has N nodes,  
[00:17:36] meaning N of these boxes, and P parameters,  
[00:17:40] so we have two parameters in this case,  
[00:17:43] this procedure allows us to compute all the derivatives of J  
[00:17:47] with respect to all the parameters in roughly N plus P steps,  
[00:17:51] rather than N times P steps.  
[00:17:54] And if you have a neural network with, say, 10,000 nodes,  
[00:17:59] and maybe 100,000 parameters,  
[00:18:03] this would not be considered even a very large neural network by modern standards.  
[00:18:08] Being able to compute the derivatives in 10,000 plus 100,000 steps,  
[00:18:13] which is 110,000,  
[00:18:16] is much, much better than needing 10,000 times 100,000 steps,  
[00:18:21] which would be a billion steps.  
[00:18:24] And so the backpropagation algorithm, done using the computation graph,  
[00:18:28] gives you a very efficient way to compute all the derivatives,  
[00:18:31] and that's why it is such a key idea  
[00:18:33] in how deep learning algorithms are implemented today.  
[00:18:37] In this video, you saw how the computation graph  
[00:18:40] takes all the steps of the calculation needed  
[00:18:42] to compute the output of a neural network, A,  
[00:18:45] as well as the cost function, J,  
[00:18:47] and takes the step-by-step computations  
[00:18:49] and breaks them into the different nodes of the computation graph,  
[00:18:53] and then uses a left-to-right computation for a prop  
[00:18:57] to compute the cost function, J,  
[00:18:59] and then a right-to-left or backpropagation calculation  
[00:19:02] to compute all the derivatives.  
[00:19:05] In this video, you saw these ideas applied to a small neural network example.  
[00:19:11] In the next video, let's take these ideas  
[00:19:13] and apply them to a larger neural network.  
[00:19:16] Let's go on to the next video.
