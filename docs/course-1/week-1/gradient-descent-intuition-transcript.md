# Gradient Descent Intuition — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](gradient-descent-intuition.md)

---

[00:00:02] Now let's dive more deeply into gradient descent to gain better intuition about what it's doing and why it might make sense.  
[00:00:10] Here's the gradient descent algorithm that you saw in the previous video.  
[00:00:15] And as a reminder, this variable, this Greek symbol alpha is the learning rate.  
[00:00:21] And the learning rate controls how big of a step you take when updating the model's parameters W and B.  
[00:00:28] So this term here, this D over DW  
[00:00:32] this is a derivative term, and by convention in math, this D is written with this funny font here.  
[00:00:40] And in case anyone watching this as a PhD in math or as an expert in multivari calculus,  
[00:00:45] they may be wondering, that's not the derivative, that's the partial derivative, and yes, they'll be right.  
[00:00:50] But for the purposes of implementing a machine learning algorithm, I'm just going to call it derivative,  
[00:00:56] and don't worry about these little distinctions.  
[00:00:59] So what we're going to focus on now is,  
[00:01:02] more intuition about what this learning rate and what this derivative are doing and why,  
[00:01:09] when multiplied together like this, it results in updates to parameters W and B, that makes sense.  
[00:01:16] In order to do this, let's use a slightly simpler example where we work on minimizing just one parameter.  
[00:01:25] So let's say that you have a cost function J of just one parameter W, where W is a number.  
[00:01:32] a number. This means that gradient descends now looks like this.  
[00:01:36] W is updated to W minus the learning rate alpha times D over DW of J of W.  
[00:01:45] And you're trying to minimize the cost by adjusting the parameter W.  
[00:01:52] So this is like our previous example, where we had temporarily set B equal to 0.  
[00:01:58] With one parameter W instead of 2, you can look at two-dimensional  
[00:02:03] graph, so the cost function J, instead of three-dimensional graphs.  
[00:02:07] Let's look at what gradient descent does on this function J of W.  
[00:02:13] Here on the horizontal axis is parameter W, and on the vertical axis is the cost J of W.  
[00:02:22] Now, let's initialize gradient descent with some starting value for W.  
[00:02:27] Let's initialize it at this location.  
[00:02:30] So imagine that you start off at this point right here,  
[00:02:34] on the function J. What gradient descends will do is it will update W to be W minus  
[00:02:42] learning rate alpha times D over DW of J of W. Let's look at what this derivative term here means.  
[00:02:51] A way to think about the derivative at this point on the line is to draw a tangent line,  
[00:02:59] which is a straight line that touches this curve at that point. In math, the  
[00:03:05] slope of this line is the derivative of the function J at this point, and to get the slope,  
[00:03:11] you can draw a little triangle like this, and if you compute the height divided by the width  
[00:03:17] of this triangle, that is the slope.  
[00:03:21] So, for example, the slope might be, you know, 2 over 1, for instance, and when the tangent line  
[00:03:28] is pointing up into the right, the slope is positive, which means that this derivative is a positive,  
[00:03:35] number, so it's greater than 0. And so the updated W is going to be W minus the learning rate  
[00:03:43] times some positive number. The learning rate is always a positive number. So if you take  
[00:03:51] w minus a positive number, you end up with a new value for W that is smaller. So on the graph,  
[00:04:00] you are moving to the left, you're decreasing the value of W.  
[00:04:05] And you may notice that this is the right thing to do if you go is to decrease the cost J,  
[00:04:10] because when we move toward the left on this curve, the cost J decreases,  
[00:04:15] and you're getting closer to the minimum for J, which is over here.  
[00:04:20] So, so far, gradient descent seems to be doing the right thing.  
[00:04:25] Now, let's look at another example. Let's take the same function J of W as above,  
[00:04:31] and now let's say that you initialize gradient descent at a different location. Say, by  
[00:04:37] by choosing a starting value for W, that's over here on the left. So that's this point on the function J.  
[00:04:45] Now, the derivative term, remember, is D over DW of J of W. And when we look at the tangent line at this point over here,  
[00:04:57] the slope of this line is the derivative of J at this point. But this tangent line is sloping down into the right. And so this line, sloping down into the right, and so this line,  
[00:05:07] has a negative slope. In other words, the derivative J at this point is a negative number.  
[00:05:14] For instance, if you draw a triangle, then the height like this is negative 2 and the width is 1.  
[00:05:21] So the slope is negative 2 divided by 1, which is negative 2, which is a negative number.  
[00:05:29] So when you update W, you get W minus the learning rate times a negative number.  
[00:05:35] And so this means you subtract  
[00:05:38] from W, a negative number, but subtracting a negative number means adding a positive number,  
[00:05:47] and so you end up increasing W. Because subtracting a negative number is the same as adding a positive  
[00:05:55] number to W. So this step of gradient descent causes W to increase, which means you're moving  
[00:06:03] to the right of the graph, and your cost J has decreased down to here.  
[00:06:08] And again, it looks like gradient descent is doing something reasonable.  
[00:06:14] It's getting you closer to the minimum.  
[00:06:17] So hopefully, these last two examples show some of the intuition behind what the derivative term is doing  
[00:06:24] and why this helps gradient descent change W to get you closer to the minimum.  
[00:06:31] I hope this video gave you some sense for why the derivative term in gradient descent makes sense.  
[00:06:38] One other key quantity is a gradient descent makes sense.  
[00:06:39] in the gradient algorithm is the learning rate alpha.  
[00:06:43] How do you choose alpha? What happens if it's too small or what happens if it's too big?  
[00:06:47] In the next video, let's take a deeper look at the parameter alpha to help build intuitions  
[00:06:53] about what it does, as well as how to make a good choice for a good value of alpha for your  
[00:06:58] implementation of gradient descent.
