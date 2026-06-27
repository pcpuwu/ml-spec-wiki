# Gradient Descent — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](gradient-descent.md)

---

[00:00:01] Welcome back.  
[00:00:02] In the last video, we saw visualizations of the cost function J  
[00:00:07] and how you can try different choices of the parameters W and B,  
[00:00:11] and see what cost value that gets you.  
[00:00:14] It would be nice if we had a more systematic way to find the values of W&B  
[00:00:19] that result in the smallest possible cost, J of WB.  
[00:00:24] It turns out there's an algorithm called gradient descent that you can use to do that.  
[00:00:29] Gradient descent is used all over the place in machine learning,  
[00:00:33] not just for linear regression, but for training, for example,  
[00:00:37] some of the most advanced neural network models,  
[00:00:40] also called deep learning models.  
[00:00:43] Deep learning models are something you learn about in the second course.  
[00:00:47] So learning this tool of gradient descent will set you up  
[00:00:51] with one of the most important building blocks in machine learning.  
[00:00:55] Here's an overview of what we'll do with gradient descent.  
[00:00:58] You have the cost function J of WB right here that you want to minimize.  
[00:01:04] In the example we've seen so far,  
[00:01:07] this is a cost function for linear regression,  
[00:01:10] but it turns out that gradient descent is an algorithm that you can use  
[00:01:14] to try to minimize any function,  
[00:01:17] not just a cost function for linear regression.  
[00:01:22] Just to make this discussion on gradient descent more general,  
[00:01:26] it turns out that gradient descent applies to more general  
[00:01:28] to more general functions,  
[00:01:30] including other cost functions  
[00:01:32] that work with models that have more than two parameters.  
[00:01:36] So, for instance,  
[00:01:38] if you have a cost function J  
[00:01:41] as a function of W1,  
[00:01:43] W2, up to WN, and B,  
[00:01:47] your objective is to minimize J  
[00:01:50] over the parameters W1 to WN and B.  
[00:01:55] In other words, you want to pick values for  
[00:01:58] W1 through WN and B that gives you the smallest possible value of J.  
[00:02:05] It turns out that gradient descent is an algorithm that you can apply  
[00:02:09] to try to minimize this cost function J as well.  
[00:02:13] What you're going to do is just start off  
[00:02:17] with some initial guesses for W and B.  
[00:02:21] In linear regression, it won't matter too much what the initial values are,  
[00:02:26] so a common choice is to set them both to Z  
[00:02:29] So, for example, you can set W to 0 and B to 0 as the initial guess.  
[00:02:35] With the gradient descent algorithm, what you're going to do is  
[00:02:39] you'll keep on changing the parameters W and B a bit every time  
[00:02:43] to try to reduce the cost J of WB  
[00:02:47] until hopefully J settles at or near a minimum.  
[00:02:53] One thing I should note is that for some functions J,  
[00:02:56] that may not be a bow shape or a hammock shape,  
[00:02:59] or hammock shape, it is possible for there to be more than one possible minimum.  
[00:03:04] Let's take a look at an example of a more complex surface plot J to see what gradient descent is doing.  
[00:03:13] This function is not a squared error cost function.  
[00:03:17] For linear regression with the squared error cost function,  
[00:03:20] you always end up with a bow shape or a hammock shape.  
[00:03:24] But this is a type of cost function you might get if you're training a neural network model.  
[00:03:30] Notice the axes, that is W and B on the bottom axis.  
[00:03:38] For different values of W and B, you get different points on this surface J of WB,  
[00:03:46] where the height of the surface at some point is the value of the cost function.  
[00:03:51] Now, let's imagine that this surface plot is actually a view of a slightly hilly outdoor park or a golf course,  
[00:04:00] where the high points are hills and the low points are valleys like so.  
[00:04:04] And I'd like you to imagine, if you will, that you're physically standing at this point on the hill.  
[00:04:11] And if it helps you to relax, imagine that there's lots of really nice green grass and butterflies is a really nice hill.  
[00:04:20] And you go is to start up here and get to the bottom of one of these valleys as efficiently as possible.  
[00:04:29] So what the gradient descent algorithm does is you're going to spin around 360 degrees  
[00:04:37] and look around and ask yourself,  
[00:04:40] if I were to take a tiny little baby step in one direction  
[00:04:44] and I want to go downhill as quickly as possible toward one of these valleys,  
[00:04:49] what direction do I choose to take that baby step?  
[00:04:53] Well, if you want to walk down this hill as efficiently as possible,  
[00:04:57] it turns out that if you're standing at this point  
[00:04:59] you're standing at this point in the hill and you look around, you may notice that the best direction to take your next step downhill is roughly that direction.  
[00:05:08] Mathematically, this is the direction of steepest descent.  
[00:05:12] And it means that when you take a tiny baby little step, this takes you downhill faster than a tiny little baby step you could have taken in any other direction.  
[00:05:22] So after taking this first step, you're now at this point on the hill over here.  
[00:05:28] Now,  
[00:05:30] Let's repeat the process.  
[00:05:32] Standing at this new point, you're going to again spin around 360 degrees and ask yourself,  
[00:05:38] in what direction would I take the next little baby step in order to move downhill?  
[00:05:44] And if you do that and take another step, you end up moving a bit in that direction,  
[00:05:50] and you can keep going.  
[00:05:52] From this new point, you can again look around and decide what direction would take you downhill most quickly.  
[00:05:59] Take another step.  
[00:06:00] another step, and so on, until you find yourself at the bottom of this valley at this local minimum right here.  
[00:06:09] What you just did was go through multiple steps of gradient descent.  
[00:06:13] It turns out gradient descent has an interesting property.  
[00:06:18] Remember that you can choose a starting point at the surface by choosing starting values for the parameters W and B.  
[00:06:26] When you perform gradient descent a moment ago, you had started at  
[00:06:31] this point over here, right?  
[00:06:33] Now, imagine if you try gradient descent again,  
[00:06:37] but this time you choose a different starting point  
[00:06:40] by choosing parameters that place your starting point  
[00:06:43] just a couple steps to the right over here.  
[00:06:46] If you then repeat the gradient descent process,  
[00:06:50] which means you look around, take a little step in the direction of the steepest descent,  
[00:06:54] so you end up here,  
[00:06:56] then you again look around, take another step, and so on.  
[00:07:00] And if you were to run,  
[00:07:02] gradient descent the second time, starting just a couple steps to the right of where we did it the first time,  
[00:07:09] then you will end up in a totally different valley, this different minimum over here on the right.  
[00:07:17] The bottoms of both the first and the second valleys are called local minima,  
[00:07:23] because if you start going down the first valley, gradient descent won't lead you to the second valley,  
[00:07:29] and the same is true.  
[00:07:31] if you started going down the second valley,  
[00:07:34] you would stay in that second minimum and not find your way into the first local minimum.  
[00:07:41] So this is an interesting property of the gradient descent algorithm,  
[00:07:45] and you'll see more about this later.  
[00:07:47] So in this video, you saw how gradient descent helps you go downhill.  
[00:07:53] In the next video, let's look at the mathematical expressions that you can implement  
[00:07:58] to make gradient descent work.  
[00:08:00] Let's go on to the next video.  
[00:08:01] on to the next video.
