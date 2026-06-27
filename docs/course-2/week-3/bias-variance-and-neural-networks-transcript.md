# Bias, Variance, and Neural Networks — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](bias-variance-and-neural-networks.md)

---

[00:00:01] We're seeing that high bias or high variance are both bad,  
[00:00:05] in the sense that they hurt the performance of your algorithm.  
[00:00:08] One of the reasons that neural networks have been so successful  
[00:00:12] is because neural networks, together with the idea of big data,  
[00:00:16] or hopefully having large data sets,  
[00:00:18] has given us new ways to address both high bias and high variance.  
[00:00:24] Let's take a look.  
[00:00:25] You saw that if you're fitting different order polynomials to a data set,  
[00:00:31] then if you were to fit a linear model like this on the left,  
[00:00:36] you have a pretty simple model that can have high bias,  
[00:00:39] whereas if you were to fit a complex model,  
[00:00:42] then you might suffer from high variance,  
[00:00:45] and there's this trade-off between bias and variance.  
[00:00:50] In our example, it was choosing a second-order polynomial  
[00:00:54] that helps you make a trade-off and pick a model  
[00:00:58] with the lowest possible cross-validation error.  
[00:01:02] Before the days of neural networks,  
[00:01:05] machine learning engineers talked a lot about this bias-variance trade-off,  
[00:01:10] in which you had to balance the complexity,  
[00:01:13] that is, the degree of polynomial or the regularization parameter lambda,  
[00:01:18] to make bias and variance both not be too high.  
[00:01:23] If you hear machine learning engineers talk about the bias-variance trade-off,  
[00:01:28] this is what they're referring to,  
[00:01:30] where if you have too simple a model, you have high bias,  
[00:01:33] too complex a model, high variance,  
[00:01:35] and you have to find a trade-off between these two bad things  
[00:01:38] to find hopefully the best possible outcome.  
[00:01:42] But it turns out that neural networks offer us a way out of this dilemma  
[00:01:47] of having a trade-off bias and variance, with some caveats.  
[00:01:51] It turns out that large neural networks,  
[00:01:55] when trained on small-to-moderate-sized datasets,  
[00:01:59] are low-bias machines.  
[00:02:01] What I mean by that is if you make your neural network large enough,  
[00:02:07] you can almost always fit your training set well,  
[00:02:11] so long as your training set is not enormous.  
[00:02:13] What this means is this gives us a new recipe  
[00:02:16] to try to reduce bias or reduce variance as needed,  
[00:02:21] without needing to really trade-off between the two of them.  
[00:02:24] Let me share with you a simple recipe that isn't always applicable,  
[00:02:28] but if it applies, can be very powerful  
[00:02:31] for getting an accurate model using a neural network,  
[00:02:36] which is first train your algorithm on your training set,  
[00:02:41] and then ask, does it do well on the training set?  
[00:02:44] You measure J-train and see if it is high.  
[00:02:48] By high, I mean, for example, relative to human-level performance  
[00:02:53] or some baseline-level performance.  
[00:02:56] If it is not doing well, then you have a high-bias problem,  
[00:03:01] high training set error.  
[00:03:03] One way to reduce bias is to just use a bigger neural network.  
[00:03:08] By bigger neural network, I mean either more hidden layers  
[00:03:12] or more hidden units per layer,  
[00:03:14] and you can then keep on going through this loop  
[00:03:17] and make your neural network bigger and bigger  
[00:03:20] until it does well on the training set,  
[00:03:22] meaning it achieves a level of error on your training set  
[00:03:25] that is roughly comparable to the target level of error you hope to get to,  
[00:03:31] which could be human-level performance.  
[00:03:34] After it does well on the training set,  
[00:03:36] so the answer to that question is yes,  
[00:03:38] you would then ask, does it do well on the cross-validation set?  
[00:03:42] In other words, does it have high variance?  
[00:03:46] If the answer is no,  
[00:03:48] then you can conclude that the algorithm has high variance  
[00:03:51] because it does well on the training set,  
[00:03:53] does not do well on the cross-validation set,  
[00:03:55] so that big gap in J-CV and J-train  
[00:03:59] indicates you probably have a high-variance problem.  
[00:04:02] If you have a high-variance problem,  
[00:04:05] then one way to try to fix it is to get more data.  
[00:04:08] So you get more data and go back and retrain the model  
[00:04:12] and just double-check, does it do well on the training set?  
[00:04:14] If not, have a bigger network, or if it does,  
[00:04:17] see if it does well on the cross-validation set,  
[00:04:19] and if not, get more data.  
[00:04:21] If you can keep on going round and round and round this loop  
[00:04:24] until eventually it does well on the cross-validation set,  
[00:04:28] then you're probably done  
[00:04:30] because now you have a model that does well on the cross-validation set  
[00:04:34] and hopefully will also generalize to new examples as well.  
[00:04:38] Now, of course, there are limitations to the application of this recipe.  
[00:04:43] Training a bigger neural network does reduce bias,  
[00:04:46] but at some point it does get computationally expensive.  
[00:04:49] That's why the rise of neural networks has been really assisted  
[00:04:53] by the rise of very fast computers,  
[00:04:56] including especially GPUs or graphics processor units,  
[00:05:01] hardware traditionally used to speed up computer graphics,  
[00:05:04] but that turns out has been very useful for speeding up neural networks as well.  
[00:05:08] But even with hardware accelerators, beyond a certain point,  
[00:05:12] the neural networks are so large and take so long to train,  
[00:05:14] it becomes infeasible.  
[00:05:16] And then, of course, the other limitation is more data.  
[00:05:20] Sometimes you can only get so much data,  
[00:05:23] and beyond a certain point, it's hard to get much more data.  
[00:05:27] But I think this recipe explains a lot of the rise of deep learning  
[00:05:31] in the last several years,  
[00:05:34] which is for applications where you do have access to a lot of data,  
[00:05:38] then being able to train large neural networks  
[00:05:41] allows you to eventually get pretty good performance on a lot of applications.  
[00:05:47] One thing that was implicit in this slide that may not have been obvious  
[00:05:52] is that as you're developing a learning algorithm,  
[00:05:55] sometimes you find that you have high bias,  
[00:05:58] in which case you do things like increase the neural network.  
[00:06:01] But then after you increase the neural network,  
[00:06:03] you may find that you have high variance,  
[00:06:05] in which case you might do other things like collect more data.  
[00:06:09] And during the hours or days or weeks you're developing a machine learning algorithm,  
[00:06:15] at different points you may have high bias or high variance, and it can change.  
[00:06:19] But it's depending on whether your algorithm has high bias or high variance at that time  
[00:06:24] that that can help give guidance for what you should be trying next.  
[00:06:28] When you're training a neural network,  
[00:06:31] one thing that people have asked me before is,  
[00:06:34] hey, Andrew, what if my neural network is too big?  
[00:06:37] Will that create a high variance problem?  
[00:06:41] It turns out that a large neural network with well-chosen regularization  
[00:06:47] will usually do as well or better than a smaller one.  
[00:06:52] For example, if you have a small neural network like this,  
[00:06:57] and you were to switch to a much larger neural network like this,  
[00:07:02] you would think that the risk of overfitting goes up significantly.  
[00:07:06] But it turns out that if you were to regularize this larger neural network appropriately,  
[00:07:12] then this larger neural network usually will do at least as well or better than the smaller one,  
[00:07:19] so long as the regularization is chosen appropriately.  
[00:07:22] Another way of saying this is that it almost never hurts to go to a larger neural network  
[00:07:28] so long as you regularize appropriately.  
[00:07:31] We have one caveat, which is that when you train a larger neural network,  
[00:07:35] it does become more computationally expensive.  
[00:07:38] The main way it hurts is it will slow down your training and your inference process.  
[00:07:43] Very briefly, to regularize a neural network, this is what you do.  
[00:07:49] If the cost function for your neural network is the average loss,  
[00:07:54] and so the loss here could be squared error or logistic loss,  
[00:07:59] then the regularization term for a neural network looks like pretty much what you expect,  
[00:08:04] which is lambda over 2m times the sum of w squared,  
[00:08:09] where this is the sum over all weights w in the neural network.  
[00:08:14] Similar to regularization for linear regression and logistic regression,  
[00:08:18] we usually don't regularize the parenthesis b in a neural network,  
[00:08:22] although in practice it makes very little difference whether you do so or not.  
[00:08:26] The way you would implement regularization in TensorFlow is,  
[00:08:31] recall that this was the code for implementing  
[00:08:34] an unregularized handwritten digit classification model.  
[00:08:38] We create three layers like so with number of hidden units, activation,  
[00:08:43] and then create a sequential model with the three layers.  
[00:08:47] If you want to add regularization, then you would just add this extra term,  
[00:08:53] kernel regularizer equals L2 and then 0.01,  
[00:08:57] where that's the value of lambda.  
[00:09:00] TensorFlow actually lets you choose different values of lambda for different layers,  
[00:09:05] although for simplicity, you can choose the same value of lambda  
[00:09:09] for all the weights in all of the different layers as follows,  
[00:09:12] and then this will allow you to implement regularization in your neural network.  
[00:09:17] To summarize, two takeaways I hope you have from this video are,  
[00:09:22] one, it hardly ever hurts to have a larger neural network  
[00:09:26] so long as you regularize appropriately.  
[00:09:29] One caveat being that having a larger neural network can slow down your algorithm,  
[00:09:34] so maybe that's the one way it hurts,  
[00:09:36] but it shouldn't hurt your algorithm's performance for the most part.  
[00:09:39] In fact, it could even help it significantly.  
[00:09:42] Second, so long as your training set isn't too large,  
[00:09:47] then a neural network, especially a large neural network,  
[00:09:50] is often a low-bias machine.  
[00:09:52] It just fits very complicated functions very well,  
[00:09:55] which is why when I'm training neural networks,  
[00:09:58] I find that I'm often fighting variance problems rather than bias problems,  
[00:10:02] at least if the neural network is large enough.  
[00:10:05] So the rise of deep learning has really changed the way that  
[00:10:08] machine learning practitioners think about bias and variance.  
[00:10:11] Having said that, even when you're training a neural network,  
[00:10:14] measuring bias and variance and using that to guide what you do next  
[00:10:19] is often a very helpful thing to do.  
[00:10:22] So that's it for bias and variance.  
[00:10:25] Let's go on to the next video where we'll take all the ideas we've learned  
[00:10:29] and see how they fit in to the development process of machine learning systems.  
[00:10:34] I hope that will tie a lot of these pieces together  
[00:10:37] to give you practical advice on how to quickly move forward  
[00:10:41] into development of your machine learning systems.
