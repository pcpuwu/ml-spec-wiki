# Regularized Linear Regression — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](regularized-linear-regression.md)

---

[00:00:01] In this video, we'll figure out how to get gradient descent to work with regularized linear regression.  
[00:00:07] Let's jump in.  
[00:00:08] Here's the cost function we've come up with in the last video for regularized linear regression.  
[00:00:14] The first part is the usual squared error cost function,  
[00:00:18] and now you have this additional regularization term,  
[00:00:21] where lambda is the regularization parameter,  
[00:00:25] and you'd like to find parameters W and B that minimize the regularized cost function.  
[00:00:31] Previously, we were using gradient descent for the original cost function,  
[00:00:38] just the first term, before we added that second regularization term.  
[00:00:42] And previously, we had the following gradient descent algorithm,  
[00:00:47] which is that we repeatedly update the parameters WJ and B for J equals 1 through N according to this formula,  
[00:00:55] and B is also updated similarly.  
[00:00:58] Again, alpha is a very small positive number called the learning.  
[00:01:01] called the learning rate.  
[00:01:03] In fact, the updates for regularized linear regression look exactly the same,  
[00:01:08] except that now the cost J is defined a bit differently.  
[00:01:12] Previously, the derivative of J for respect to WJ was given by this expression over here,  
[00:01:20] and the derivative, respect to B, was given by this expression over here.  
[00:01:27] Now that we've added this additional regularization term, the only thing that changes is that  
[00:01:32] the expression for the derivative from respect to WJ ends up with one additional term.  
[00:01:39] This plus lambda over m times WJ.  
[00:01:43] And in particular, for the new definition of the cost function J,  
[00:01:47] these two expressions over here,  
[00:01:50] these are the new derivatives of J with respect to WJ,  
[00:01:55] and the derivative of J for respect to B.  
[00:01:59] Recall that we don't regularize B, so we're not trying to  
[00:02:03] to shrink B. That's why the update to B remains the same as before, whereas the updated  
[00:02:08] W changes because the regularization term causes us to try to shrink WJ. So let's take these  
[00:02:17] definitions for the derivatives and put them back into the expression on the left to write out  
[00:02:23] the gradient descent algorithm for regularized linear regression. So to implement gradient  
[00:02:30] descent for a regularized linear regression, this is a gradient descent for a regularized linear regression. This is a  
[00:02:34] what you would have your code do.  
[00:02:37] Here's the update for WJ for j equals 1 through n,  
[00:02:40] and here's the update for B.  
[00:02:42] And as usual, please remember to carry out simultaneous updates  
[00:02:47] for all of these parameters.  
[00:02:50] Now, in order for you to get this album to work,  
[00:02:53] this is all you need to know.  
[00:02:55] But what I'd like to do in the remainder of this video  
[00:02:58] is to go over some optional material  
[00:03:00] to convey a slightly deeper intuition about what this formula is actually doing,  
[00:03:05] as well as chat briefly about how these derivatives are derived.  
[00:03:09] The rest of this video is completely optional.  
[00:03:12] It's completely okay if you skip the rest of this video.  
[00:03:16] But if you have a strong interest in math, then stick with me.  
[00:03:19] It's always nice to hang out with you here.  
[00:03:22] And through these equations, perhaps you can build a deeper intuition  
[00:03:26] about what the math and what the durators are doing as well.  
[00:03:29] So let's take a look.  
[00:03:31] Let's look at the update rule for WJ and rewrite it in  
[00:03:35] another way. We're updating WJ as 1 times WJ minus alpha times  
[00:03:45] lambda over m times WJ. So I've moved the term from the end to the front here,  
[00:03:52] and then minus alpha times 1 over m and then the rest of that term over there.  
[00:03:59] So we just rearrange the terms a little bit. And if we simplify, then we're saying that  
[00:04:07] WJ is updated as WJ times 1 minus alpha times lambda over m, minus alpha times this other term over here.  
[00:04:19] And you might recognize this second term as the usual gradient descent update for unregularized linear regression.  
[00:04:27] This is the update for linear regression before we had regularization, and this is the term we saw in week two of this course.  
[00:04:36] And so the only change when you add regularization is that instead of WJ being set to be equal to,  
[00:04:44] wJ minus alpha times this term, is now w times this number minus the usual update.  
[00:04:52] So this is what we had in week one of this course.  
[00:04:55] So what is this first term over here?  
[00:04:59] Well, alpha is a very small positive number, say 0.01.01.  
[00:05:04] lambda is usually a small number, say 1 or maybe 10.  
[00:05:11] Let's say lambda is 1 for this example, and m is the training set size, say 50.  
[00:05:17] And so when you multiply alpha lambda over m, say 0.01 times 1 divided by 50,  
[00:05:27] this term ends up being a small positive number, say 0.002, and thus,  
[00:05:35] 1 minus alpha lambda over m is going to be a number just slightly less than 1.  
[00:05:40] In this case, 0.9998.  
[00:05:43] And so the effect of this term is that on every single iteration of gradient descent,  
[00:05:49] you're taking WJ and multiplying it by .9998,  
[00:05:54] that is by some numbers slightly less than 1 before carrying out the usual update.  
[00:05:59] So what regularization is doing on every single iteration is,  
[00:06:03] you're multiplying W by a number slightly less than 1,  
[00:06:07] and that has the effect of shrinking the value of WJ just a little bit.  
[00:06:12] So this gives us another view on why regularization  
[00:06:16] has the effect of shrinking the parameters WJ a little bit on every iteration,  
[00:06:21] and so that's how regularization works.  
[00:06:24] If you're curious about how these derivative terms were computed,  
[00:06:29] I have just one last optional slide that goes through just a little bit of the calculation,  
[00:06:34] of the derivative term.  
[00:06:36] Again, this slide and the rest of this video are completely optional,  
[00:06:40] meaning you won't need any of this to do the practice labs and the quizzes.  
[00:06:44] So let's step through quickly the derivative calculation.  
[00:06:48] The derivative of J for respect to WJ looks like this.  
[00:07:06] Recall that f of x for linear regression is defined as  
[00:07:10] w.x plus b, or w. product x plus b.  
[00:07:15] And  
[00:07:16] And it turns out that by the rules of calculus,  
[00:07:19] the derivatives look like this,  
[00:07:21] is 1 over 2m times the sum i equals 1 through m  
[00:07:27] of w.x plus b minus y times 2xj  
[00:07:36] plus the derivative of the regularization term,  
[00:07:39] which is lambda over 2m times 2 wj.  
[00:07:44] Notice that the second term,  
[00:07:47] the second term does not have the summation term from j equals 1 through n anymore.  
[00:07:53] The 2s cancel out here and here, and also here and here.  
[00:07:58] And so it simplifies to this expression over here.  
[00:08:03] And finally, remember that Wx plus b is f of x,  
[00:08:11] and so you can rewrite it as this expression down here.  
[00:08:16] So this is why this expression is used to compute the gradient.  
[00:08:21] the gradient in regularized linear regression.  
[00:08:24] So you now know how to implement regularize linear regression.  
[00:08:29] Using this, you really reduce overfitting when you have a lot of features and a relatively small training set.  
[00:08:35] And this should let you get linear regression to work much better on many problems.  
[00:08:40] In the next video, we'll take this regularization idea and apply to logistic regression  
[00:08:46] to avoid overfitting for logistic regression as well.  
[00:08:49] Let's take a look at that in the next video.
