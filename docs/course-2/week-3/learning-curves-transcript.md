# Learning Curves — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](learning-curves.md)

---

[00:00:01] Learning curves are a way to help understand how your learning algorithm is doing as a function of the amount of experience it has,  
[00:00:09] where by experience I mean, for example, the number of training examples it has.  
[00:00:14] Let's take a look.  
[00:00:15] Let me plot learning curves for a model that fits a second-order polynomial quadratic function like so,  
[00:00:22] and I'm going to plot both Jcv, the cross-validation error, as well as Jtrain, the training error.  
[00:00:29] So on this figure, the horizontal axis is going to be m, train, that is, the training set size,  
[00:00:38] or the number of examples that the algorithm can learn from, and on the vertical axis I'm going to plot the error,  
[00:00:44] and by error I mean either Jcv or Jtrain.  
[00:00:47] So let's start by plotting the cross-validation error.  
[00:00:51] It will look something like this.  
[00:00:53] So that's what Jcv of WB will look like.  
[00:00:58] And it's maybe no surprise that as m, train, the training set size gets bigger,  
[00:01:03] then you learn a better model, and so the cross-validation error goes down.  
[00:01:08] Now let's plot Jtrain of WB, of what the training error looks like as the training set size gets bigger.  
[00:01:17] It turns out that the training error will actually look like this,  
[00:01:22] that as the training set size gets bigger, the training set error actually increases.  
[00:01:28] Let's take a look at why this is the case.  
[00:01:30] We'll start with an example of when you have just a single training example.  
[00:01:35] Well, if you were to fit a quadratic model to this, you can fit easily a straight line or a curve,  
[00:01:41] and your training error will be zero.  
[00:01:43] How about if you have two training examples like this?  
[00:01:46] Well, you can again fit a straight line and achieve zero training error.  
[00:01:51] In fact, if you have three training examples,  
[00:01:54] the quadratic function can still fit this very well and get pretty much zero training error.  
[00:01:59] But now, if your training set gets a little bit bigger, say you have four training examples,  
[00:02:04] then it gets a little bit harder to fit all four examples perfectly,  
[00:02:09] and you may get a curve that looks like this, fits it pretty well,  
[00:02:12] but a little bit off in a few places here and there.  
[00:02:15] And so when you have increased the training set size to four,  
[00:02:20] the training error has actually gone up a little bit.  
[00:02:24] How about when you have five training examples?  
[00:02:26] Well, again, you can fit it pretty well, but it gets even a little bit harder to fit all of them perfectly,  
[00:02:32] and when you have an even larger training set,  
[00:02:34] it just gets harder and harder to fit every single one of your training examples perfectly.  
[00:02:40] So to recap, when you have a very small number of training examples,  
[00:02:43] like one or two or even three, it's relatively easy to get zero or very small training error.  
[00:02:51] But when you have a larger training set,  
[00:02:54] it's harder for a quadratic function to fit all the training examples perfectly,  
[00:02:59] which is why as the training set gets bigger, the training error increases,  
[00:03:05] because it's harder to fit all of the training examples perfectly.  
[00:03:09] Notice one other thing about these curves,  
[00:03:11] which is the cross-validation error will be typically higher than the training error,  
[00:03:18] because you fit the parameters to the training set,  
[00:03:21] and so you expect to do at least a little bit better, or when m is small,  
[00:03:25] maybe even a lot better on the training set than on the cross-validation set.  
[00:03:31] Let's now take a look at what the learning curves will look like for an algorithm with high bias  
[00:03:37] versus one with high variance.  
[00:03:39] Let's start with the high bias or the underfitting case.  
[00:03:43] Recall that an example of high bias would be if you're fitting a linear function to a curve that looks like this.  
[00:03:50] If you were to plot the training error, then the training error will go up like so, as you'd expect.  
[00:03:58] And in fact, this curve of training error may start to flatten out,  
[00:04:03] or we call it plateau, meaning flatten out after a while.  
[00:04:08] And that's because as you get more and more training examples,  
[00:04:12] when you're fitting this simple linear function, your model doesn't actually change that much more.  
[00:04:18] It's fitting a straight line, and even as you get more and more and more examples,  
[00:04:22] there's just not that much more to change, which is why the average training error flattens out after a while.  
[00:04:29] And similarly, your cross-validation error will come down and also flatten out after a while,  
[00:04:36] which is why JCV, again, is higher than J-train, but JCV will tend to look like that.  
[00:04:43] And it's because beyond a certain point, even as you get more and more and more examples,  
[00:04:48] not much is going to change about the straight line you're fitting.  
[00:04:51] It's just too simple a model to be fitting to this much data,  
[00:04:56] which is why both of these curves, JCV and J-train, tend to flatten out after a while.  
[00:05:01] And if you have a measure of that baseline level of performance, such as human-level performance,  
[00:05:09] then it'll tend to be a value that is lower than your J-train and your JCV.  
[00:05:15] So human-level performance may look like this,  
[00:05:18] and there's a big gap between the baseline level of performance and J-train,  
[00:05:23] which was our indicator for this algorithm having high bias.  
[00:05:28] That is, one could hope to be doing much better  
[00:05:32] if only we could fit a more complex function than just a straight line.  
[00:05:37] Now, one interesting thing about this plot is you can ask,  
[00:05:43] what do you think will happen if you could have a much bigger training set?  
[00:05:49] So what would it look like if we could increase M even further than the right of this plot,  
[00:05:55] and go further to the right, as follows?  
[00:05:58] Well, you can imagine, if you were to extend both of these curves to the right,  
[00:06:02] they'd both sort of flatten out, and both of them will probably just continue to be flat like that.  
[00:06:08] And no matter how far you extend to the right of this plot,  
[00:06:11] these two curves, they will never somehow find a way to dip down to this human-level performance  
[00:06:17] or just keep on being kind of flat like this pretty much forever,  
[00:06:22] no matter how large the training set gets.  
[00:06:25] So that gives this conclusion, maybe a little bit surprising,  
[00:06:29] that if a learning algorithm has high bias, getting more training data will not, by itself, help that much.  
[00:06:37] And I know that we're used to thinking that having more data is good,  
[00:06:42] but if your algorithm has high bias, then if the only thing you do is throw more training data at it,  
[00:06:49] that, by itself, will not ever let you bring down the error rate that much.  
[00:06:53] And it's because of this, really.  
[00:06:55] No matter how many more examples you add to this figure,  
[00:06:57] the straight linear fitting just isn't going to get that much better.  
[00:07:02] And that's why, before investing a lot of effort into collecting more training data,  
[00:07:07] it's worth checking if your learning algorithm has high bias,  
[00:07:10] because if it does, then you probably need to do some other things,  
[00:07:14] other than just throw more training data at it.  
[00:07:17] Let's now take a look at what the learning curve looks like for a learning algorithm with high variance.  
[00:07:23] You might remember that if you were to fit a 4-fold polynomial with small lambda,  
[00:07:29] say, or even lambda equals zero, then you get a curve that looks like this.  
[00:07:33] And even though it fits the training data very well, it doesn't generalize.  
[00:07:39] Let's now look at what a learning curve might look like in this high variance scenario.  
[00:07:45] J-train will be going up as the training set size increases, so you get a curve that looks like this.  
[00:07:53] And J-CV will be much higher.  
[00:07:56] So your cross-validation error is much higher than your training error.  
[00:08:00] And the fact that there's a huge gap here is what can tell you that there's high variance.  
[00:08:06] It's doing much better on the training set than it's doing on your cross-validation set.  
[00:08:11] If you were to plot a baseline level of performance, such as human-level performance,  
[00:08:16] you may find that it turns out to be here, that J-train can sometimes be even lower than the human-level performance,  
[00:08:24] or maybe human-level performance is a little bit lower than this.  
[00:08:27] But when you're overfitting the training set, you may be able to fit the training set so well  
[00:08:33] to have an unrealistically low error, such as zero error in this example over here,  
[00:08:38] which is actually better than how well humans would actually be able to predict housing prices  
[00:08:44] or whatever the application you're working on.  
[00:08:46] But again, the signal for high variance is whether J-CV is much higher than J-train.  
[00:08:52] And when you have high variance, then increasing the training set size could help a lot.  
[00:08:59] And in particular, if we could extrapolate these curves to the right, increase M-train,  
[00:09:04] then the training error will continue to go up, but then the cross-validation error hopefully will come down  
[00:09:13] and approach J-train.  
[00:09:15] And so in this scenario, it might be possible just by increasing the training set size  
[00:09:22] to lower the cross-validation error and to get your algorithm to perform better and better.  
[00:09:28] And this is unlike the high bias case where if the only thing you do is get more training data,  
[00:09:34] that won't actually help your learning algorithm's performance much.  
[00:09:37] So to summarize, if a learning algorithm suffers from high variance,  
[00:09:42] then getting more training data is indeed likely to help.  
[00:09:47] Because extrapolating to the right of this curve, you see that you can expect J-CV to keep on coming down.  
[00:09:53] And in this example, just by getting more training data allows the algorithm to go from this relatively high cross-validation error  
[00:10:00] to get much closer to human-level performance.  
[00:10:04] You can see that if you were to add a lot more training examples and continue to fit a 4-fold polynomial,  
[00:10:10] then you can just get a better 4-fold polynomial fit to this data than this very weakly curve up on top.  
[00:10:18] So if you're building a machine learning application, you could plot the learning curve if you want.  
[00:10:24] That is, you can take different subsets of your training set.  
[00:10:27] And even if you have, say, 1,000 training examples, you could train a model on just 100 training examples  
[00:10:33] and look at the training error and the cross-validation error.  
[00:10:36] Then train a model on 200 examples, holding out 800 examples and just not using them for now,  
[00:10:42] and plot J-train and J-CV and so on and repeat and plot out what the learning curve looks like.  
[00:10:49] And if you were to visualize it that way, then that could be another way for you to see  
[00:10:54] if your learning curve looks more like a high-bias or high-variance one.  
[00:10:58] One downside of plotting learning curves like this is something I've done,  
[00:11:01] but one downside is it is computationally quite expensive to train so many different models  
[00:11:07] using different size subsets of your training set.  
[00:11:10] So in practice, it isn't done that often.  
[00:11:13] But nonetheless, I find that having this mental visual picture in my head of what the training set looks like,  
[00:11:19] sometimes that helps me to think through what I think my learning algorithm is doing  
[00:11:24] and whether it has high-bias or high-variance.  
[00:11:27] So I know we've gone through a lot about bias and variance.  
[00:11:31] Let's go back to our earlier example of if you've trained a model for housing price prediction,  
[00:11:37] how does bias and variance help you decide what to do next?  
[00:11:41] Let's go back to that earlier example, which I hope will now make a lot more sense to you.  
[00:11:45] Let's do that in the next video.
