# Diagnosing Bias and Variance — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](diagnosing-bias-and-variance.md)

---

[00:00:02] The typical workflow of developing a machine learning system is that you have an idea and  
[00:00:08] you train a model, and you almost always find that it doesn't work as well as you wish yet.  
[00:00:14] When I'm training a machine learning model, it pretty much never works that well the first  
[00:00:17] time.  
[00:00:18] And so key to the process of building a machine learning system is how to decide what to do  
[00:00:23] next in order to improve its performance.  
[00:00:26] I've found across many different applications that looking at the bias and variance of a  
[00:00:31] learning algorithm gives you very good guidance on what to try next.  
[00:00:35] Let's take a look at what this means.  
[00:00:38] You might remember this example from the first course on linear regression, where given this  
[00:00:45] data set, if you were to fit a straight line to it, it doesn't do that well.  
[00:00:49] And we said that this algorithm has high bias, or that it underfits this data set.  
[00:00:56] Or if you were to fit a 4-fold polynomial, then it has high variance, or it overfits.  
[00:01:04] And in the middle, if you fit a quadratic polynomial, then it looks pretty good, and  
[00:01:08] we said that was just right.  
[00:01:11] Because this is a problem with just a single feature x, we could plot the function f and  
[00:01:16] look at it like this, but if you had more features, you can't plot f and visualize whether  
[00:01:22] it's doing well as easily.  
[00:01:24] So instead of trying to look at plots like this, a more systematic way to diagnose or  
[00:01:31] to find out if your algorithm has high bias or high variance will be to look at the performance  
[00:01:37] of your algorithm on the training set and on the cross-validation set.  
[00:01:42] In particular, let's look at the example on the left.  
[00:01:45] If you were to compute J-train, how well does the algorithm do on the training set?  
[00:01:52] Not that well.  
[00:01:53] So I'd say J-train here would be high, because there are actually pretty large errors between  
[00:01:58] the examples and the actual predictions of the model.  
[00:02:02] And how about J-CV?  
[00:02:04] So J-CV would be if you had a few new examples, maybe examples like that, that the algorithm  
[00:02:12] had not previously seen, and here the algorithm also doesn't do that well on examples that  
[00:02:20] it had not previously seen, so J-CV would also be high.  
[00:02:25] And one characteristic of an algorithm with high bias, something that is underfitting,  
[00:02:30] is that it's not even doing that well on the training set.  
[00:02:33] And so when J-train is high, that gives you a strong indicator that this algorithm has  
[00:02:38] high bias.  
[00:02:39] Let's now look at the example on the right.  
[00:02:42] If you were to compute J-train, how well is this doing on the training set?  
[00:02:47] Well, it's actually doing great on the training set, because the training data is really well.  
[00:02:51] So J-train here would be low, but if you were to evaluate this model on other houses not  
[00:02:59] in the training set, then you find that J-CV, the cross-validation error, would be quite high.  
[00:03:07] And so a characteristic signature, or a characteristic cue, that your algorithm has high variance  
[00:03:13] would be if J-CV is much higher than J-train.  
[00:03:18] In other words, it does much better on data it has seen than on data it has not seen,  
[00:03:23] and this turns out to be a strong indicator that your algorithm has high variance.  
[00:03:28] And again, the point of what we're doing is that by computing J-train and J-CV, and seeing  
[00:03:35] if J-train is high, or if J-CV is much higher than J-train, this gives you a sense, even  
[00:03:41] if you can't plot to function f, of whether your algorithm has high bias or high variance.  
[00:03:49] And finally, the case in the middle.  
[00:03:51] If you look at J-train, it's pretty low, since it's doing quite well on the training set.  
[00:03:59] But if you were to look at a few new examples, like those, from, say, your cross-validation  
[00:04:05] set, you find that J-CV is also pretty low.  
[00:04:09] And so J-train not being too high indicates this doesn't have a high bias problem, and  
[00:04:16] J-CV not being much worse than J-train, this indicates that it doesn't have a high variance  
[00:04:22] problem either, which is why this model, the quadratic model, seems to be a pretty good  
[00:04:27] one for this application.  
[00:04:30] So to summarize, when D equals 1, for a linear polynomial, J-train was high and J-CV was  
[00:04:36] high.  
[00:04:38] When D equals 4, J-train was low, but J-CV is high, and when D equals 2, both were pretty  
[00:04:45] low.  
[00:04:46] Let's now take a different view on bias and variance, and in particular, on the next slide,  
[00:04:51] I'd like to show you how J-train and J-CV vary as a function of the degree of the polynomial  
[00:04:59] you're fitting.  
[00:05:00] So let me draw a figure where the horizontal axis of this figure will be the degree of  
[00:05:05] polynomial that we're fitting to the data.  
[00:05:09] Over on the left will correspond to a small value of D, like D equals 1, which corresponds  
[00:05:15] to a fitting straight line, and over to the right will correspond to, say, D equals 4,  
[00:05:21] or even higher values of D, where we're fitting this high-order polynomial.  
[00:05:27] So if you were to plot J-train for WB as a function of the degree of polynomial, what  
[00:05:36] you find is that as you fit a higher and higher degree polynomial, here I'm assuming we're  
[00:05:42] not using regularization, but as you fit a higher and higher-order polynomial, the training  
[00:05:48] error will tend to go down, because when you have a very simple linear function, it doesn't  
[00:05:53] fit the training data that well.  
[00:05:55] When you fit a quadratic function, or a third-order polynomial, or a fourth-order polynomial,  
[00:06:01] it fits the training data better and better.  
[00:06:04] So as the degree of polynomial increases, J-train will typically go down.  
[00:06:10] Next, let's look at J-CV, which is how well does it do on data that it did not get to fit to.  
[00:06:21] What we saw was when D equals 1, when the degree of polynomial was very low, J-CV was  
[00:06:28] pretty high, because it underfit, so it didn't do well on the cross-validation set.  
[00:06:33] And here on the right as well, when the degree of polynomial is very large, say 4, it does  
[00:06:40] not do well on the cross-validation set either, and so is also high.  
[00:06:46] But if D was in between, say a second-order polynomial, then it actually did much better.  
[00:06:51] And so, if you were to vary the degree of polynomial, you'd actually get a curve that  
[00:06:56] looks like this, which comes down and then goes back up, where if the degree of polynomial  
[00:07:03] is too low, it underfits, and so doesn't do well on the cross-validation set.  
[00:07:08] If it is too high, it overfits, and also doesn't do well on the cross-validation set.  
[00:07:14] And it's only if it's somewhere in the middle that is just right, which is why the second-order  
[00:07:19] polynomial in our example ends up with a lower cross-validation error, and neither high bias  
[00:07:25] nor high variance.  
[00:07:28] So to summarize, how do you diagnose bias and variance in your learning algorithm?  
[00:07:34] If your learning algorithm has high bias or has underfitted data, the key indicator will  
[00:07:39] be if J-train is high, and so that corresponds to this leftmost portion of the curve, which  
[00:07:46] is where J-train is high.  
[00:07:48] And usually, you have J-train and J-CV will be close to each other.  
[00:07:53] And how do you diagnose if you have high variance?  
[00:07:55] Well, the key indicator for high variance will be if J-CV is much greater than J-train.  
[00:08:02] This double greater-than sign in math refers to much greater than, so this is greater and  
[00:08:08] this means much greater.  
[00:08:10] And this rightmost portion of the plot is where J-CV is much greater than J-train, and  
[00:08:17] usually J-train will be pretty low.  
[00:08:20] But the key indicator is whether J-CV is much greater than J-train.  
[00:08:25] And that's what happened when we had fit a very high-order polynomial to this small dataset.  
[00:08:31] And even though we've just seen bias and variance, it turns out in some cases it's  
[00:08:36] possible to simultaneously have high bias and have high variance.  
[00:08:42] You won't see this happen that much for linear regression, but it turns out that if you're  
[00:08:46] training a neural network, there are some applications where unfortunately you have  
[00:08:50] high bias and high variance.  
[00:08:53] And one way to recognize that situation will be if J-train is high, so you're not doing  
[00:08:59] that well in the training set, but even worse, the cross-validation error is, again, even  
[00:09:04] much larger than the training set.  
[00:09:07] The notion of high bias and high variance doesn't really happen for linear models applied  
[00:09:13] to 1D, but to give intuition about what it looks like, it would be as if for part of  
[00:09:20] the input, you had a very complicated model that overfit.  
[00:09:25] So it overfits the part of the input, but then for some reason, for other parts of the  
[00:09:31] input, it doesn't even fit the training data well, and so it underfits for part of the  
[00:09:36] input.  
[00:09:37] In this example, which looks artificial because it's a single-feature input, we fit the training  
[00:09:43] set really well, and we overfit in part of the input, and we don't even fit the training  
[00:09:48] data well, and we underfit in part of the input.  
[00:09:51] That's how, in some applications, you can unfortunately end up with both high bias and  
[00:09:56] high variance, and the indicator for that will be if Diagram does poorly on the training  
[00:10:02] set and it even does much worse than on the training set.  
[00:10:05] For most learning applications, you probably have primarily a high bias or a high variance  
[00:10:11] problem rather than both at the same time, but it is possible sometimes to have both  
[00:10:15] at the same time.  
[00:10:17] So I know that there's a lot to process, there are a lot of concepts on the slides, but the  
[00:10:21] key takeaways are high bias means it's not even doing well on the training set, and high  
[00:10:28] variance means it does much worse on the cross-validation set than the training set.  
[00:10:34] Whenever I'm training a machine learning algorithm, I will almost always try to figure out to  
[00:10:39] what extent the algorithm has a high bias or underfitting versus a high variance or  
[00:10:45] overfitting problem, and this will give good guidance, as we'll see later this week, on  
[00:10:49] how you can improve the performance of your algorithm.  
[00:10:53] But first, let's take a look at how regularization affects the bias and variance of a learning  
[00:10:58] algorithm, because that will help you better understand when you should use regularization.  
[00:11:03] Let's take a look at that in the next video.
