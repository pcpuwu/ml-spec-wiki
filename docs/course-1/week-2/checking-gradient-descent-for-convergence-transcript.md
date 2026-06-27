# Checking Gradient Descent for Convergence — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](checking-gradient-descent-for-convergence.md)

---

[00:00:01] When running gradient descent, how can you tell if it is converging?  
[00:00:05] That is, whether it's helping you to find parameters close to the global minimum of the cost function.  
[00:00:11] By learning to recognize what a well-running implementation of gradient descent looks like,  
[00:00:16] we will also, in a later video, be better able to choose a good learning rate alpha.  
[00:00:22] Let's take a look.  
[00:00:23] As a reminder, here's the gradient descent rule,  
[00:00:26] and one of the key choices is the choice of the learning rate alpha.  
[00:00:30] alpha. Here's something that I often do to make sure that gradient descent is working well.  
[00:00:37] Recall that the job of gradient descent is to find parameters W and B that hopefully  
[00:00:43] minimize the cost function J. So what I'll often do is plot the cost function J,  
[00:00:49] which is calculated on the training set, and I'll plot the value of J at each iteration  
[00:00:56] of gradient descent. Remember that each iteration means  
[00:01:01] after each simultaneous update of the parameters W and B.  
[00:01:07] So in this plot, the horizontal axis is the number of iterations of gradient descent that you've run so far.  
[00:01:16] And so you may get a curve that looks like this.  
[00:01:19] Notice that the horizontal axis is the number of iterations of gradient descent  
[00:01:25] and not the parameter like a W or B.  
[00:01:29] This differs from previous.  
[00:01:31] graphs you've seen, where the vertical axis was cost J, and the horizontal axis  
[00:01:37] was a single parameter, like W or B.  
[00:01:43] This curve is also called a learning curve.  
[00:01:46] Note that there are a few different types of learning curves used in machine learning, and  
[00:01:52] you'll see some other types later in this course as well.  
[00:01:56] Concretely, if you look at this point on the curve, this means that after you've run gradient  
[00:02:02] for 100 iterations, meaning 100 simultaneous updates of the parameters.  
[00:02:08] You have some learned values for W and B.  
[00:02:13] And if you compute the cost, JWB, for those values of W and B, the ones you got after 100  
[00:02:21] iterations, you get this value for the cost J, that is, this point, on the vertical axis.  
[00:02:30] And this point here corresponds to the value.  
[00:02:32] of J for the parameters that you got after 200 iterations of gradient descent.  
[00:02:40] So looking at this graph helps you to see how your cost J changes after each iteration  
[00:02:46] of gradient descent.  
[00:02:48] If gradient descent is working properly, then the cost J should decrease after every single  
[00:02:53] iteration.  
[00:02:55] If J ever increases after one iteration, that means either alpha is chosen poorly and it usually  
[00:03:03] means alpha is too large, or there could be a bug in the code.  
[00:03:08] Another useful thing that this plot can tell you is that if you look at this curve, by the time you  
[00:03:14] reach maybe 300 iterations or so, the cost J is leveling off and is no longer decreasing much.  
[00:03:23] And by 400 iterations, it looks like the curve has flattened out.  
[00:03:28] So this means that gradient descent has more or less converged.  
[00:03:32] because the curve is no longer decreasing.  
[00:03:36] So looking at this learning curve, you can try to spot whether or not gradient descent is converging.  
[00:03:44] By the way, the number of iterations that gradient descent takes to converge can vary a lot between  
[00:03:50] different applications.  
[00:03:52] In one application, it may converge after just 30 iterations.  
[00:03:56] For a different application, it could take 1,000 or 100,000 iterations.  
[00:04:02] It turns out to be a number of.  
[00:04:03] very difficult to tell in advance how many iterations creating descent needs to converge,  
[00:04:10] which is why you can create a graph like this, a learning curve, to try to find out when  
[00:04:16] you can stop training your particular model. Another way to decide when your model is done training  
[00:04:23] is with an automatic convergence test. So let's let epsilon. This here is the Greek alphabet  
[00:04:32] Let's let epsilon be a variable representing a small number, such as 0.001 or tens  
[00:04:41] the power of negative 3.  
[00:04:43] If the cost J decreases by less than this number epsilon on one iteration, then you're  
[00:04:49] likely on this flattened part of the curve that you see on the left and you can declare convergence.  
[00:04:56] Remember, convergence hopefully indicates that you found parameters W and B that are close to the  
[00:05:02] the minimum possible value of J. I usually find that choosing the right threshold  
[00:05:08] epsilon is pretty difficult, so I actually tend to look at graphs like this one on the left,  
[00:05:13] rather than rely on automatic convergence tests. Looking at this solid figure can tell you,  
[00:05:19] I'll give you some advanced warning if maybe gradient descent is not working correctly as well.  
[00:05:26] So you've now seen what the learning curve should look like when gradient descent is running well.  
[00:05:32] Let's take these insights and in the next video, take a look at how to choose an appropriate learning rate.
