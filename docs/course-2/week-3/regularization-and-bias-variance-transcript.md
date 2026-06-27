# Regularization and Bias/Variance — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](regularization-and-bias-variance.md)

---

[00:00:02] You saw in the last video how different choices of the degree of polynomial d affects the  
[00:00:08] bias and variance of your learning algorithm, and therefore its overall performance.  
[00:00:13] In this video, let's take a look at how regularization, specifically the choice of  
[00:00:18] the regularization parameter lambda, affects the bias and variance, and therefore the overall  
[00:00:23] performance of the algorithm.  
[00:00:25] This it turns out will be helpful for when you want to choose a good value of lambda  
[00:00:29] of the regularization parameter for your algorithm.  
[00:00:33] Let's take a look.  
[00:00:34] In this example, I'm going to use a fourth-order polynomial, but we're going to fit this model  
[00:00:40] using regularization, where here the value of lambda is the regularization parameter  
[00:00:48] that controls how much you trade off keeping the parameters w small versus fitting the  
[00:00:54] trading data well.  
[00:00:57] Let's start with the example of setting lambda to be a very large value.  
[00:01:03] Say lambda is equal to 10,000.  
[00:01:07] If you were to do so, you would end up fitting a model that looks roughly like this.  
[00:01:14] Because if lambda were very, very large, then the algorithm is highly motivated to keep  
[00:01:20] these parameters w very small, and so you end up with w1, w2, really all of these parameters  
[00:01:27] would be very close to zero.  
[00:01:30] The model ends up being f of x is just approximately b, a constant value, which is why you end  
[00:01:37] up with a model like this.  
[00:01:40] This model clearly has high bias, and it underfits the trading data because it doesn't even do  
[00:01:48] well on the trading set, and jtrain is large.  
[00:01:53] Let's take a look at the other extreme.  
[00:01:57] Let's say you set lambda to be a very small value.  
[00:02:02] So with a small value of lambda, in fact, let's go to the extreme of setting lambda  
[00:02:07] equals zero.  
[00:02:09] With that choice of lambda, there is no regularization, and so we're just fitting a fourth-order polynomial  
[00:02:15] with no regularization, and you end up with that curve that you saw previously that overfits  
[00:02:23] the data.  
[00:02:25] What we saw previously was when you have a model like this, jtrain is small, but jcv  
[00:02:31] is much larger than jtrain, or jcv is large, and so this indicates we have high variance,  
[00:02:38] and it overfits this data.  
[00:02:42] It would be if you have some intermediate value of lambda, not really large to 10,000,  
[00:02:47] but not so small as zero, that hopefully you get a model that looks like this, that is  
[00:02:53] just right and fits the data well with small jtrain and small jcv.  
[00:03:00] So if you are trying to decide what is a good value of lambda to use for the regularization  
[00:03:06] parameter, cross-validation gives you a way to do so as well.  
[00:03:12] Let's take a look at how we could do so, and just as a reminder, the problem we're addressing  
[00:03:17] is if you're fitting a fourth-order polynomial, so that's the model, and you're using regularization,  
[00:03:23] how can you choose a good value of lambda?  
[00:03:26] This would be a procedure similar to what you have seen for choosing the degree of polynomial  
[00:03:31] d using cross-validation.  
[00:03:34] Specifically, let's say we try to fit a model using lambda equals zero, and so we would  
[00:03:41] minimize the cross-function using lambda equals zero, and end up with some parameters w1,  
[00:03:49] b1, and you can then compute the cross-validation error, jcv of w1, b1.  
[00:03:57] And now let's try a different value of lambda, let's say you try lambda equals 0.01, then  
[00:04:02] again, minimizing the cross-function gives you a second set of parameters, w2, b2, and  
[00:04:09] you can also see how well that does on the cross-validation set, and so on.  
[00:04:14] And let's keep trying other values of lambda, and in this example, I'm going to try doubling  
[00:04:20] it to lambda equals 0.02, and so that would give you jcv of w3, b3, and so on.  
[00:04:28] And let's double it again and double it again, after doubling a number of times, you end  
[00:04:32] up with lambda approximately equal to 10, and that would give you parameters w12, b12,  
[00:04:40] and jcv w12, b12.  
[00:04:44] And by trying out a large range of possible values for lambda, fitting parameters using  
[00:04:49] those different regularization parameters, and then evaluating the performance on the  
[00:04:54] cross-validation set, you can then try to pick what is the best value for the regularization  
[00:04:59] parameter.  
[00:05:00] Now quickly, if in this example, you find that jcv of w5, b5, has the lowest value of  
[00:05:10] all of these different cross-validation errors, you might then decide to pick this value for  
[00:05:16] lambda, and so use w5, b5 as the chosen parameters.  
[00:05:22] And finally, if you want to report out an estimate of the generalization error, you  
[00:05:27] would then report out the test set error, jtest of w5, b5.  
[00:05:34] To further hone intuition about what this algorithm is doing, let's take a look at how  
[00:05:38] training error and cross-validation error vary as a function of the parameter lambda.  
[00:05:45] So in this figure, I've changed the x-axis again.  
[00:05:48] Notice that the x-axis here is annotated with the value of the regularization parameter  
[00:05:54] lambda.  
[00:05:57] And if we look at the extreme of lambda equals 0, here on the left, that corresponds to not  
[00:06:05] using any regularization.  
[00:06:07] And so that's where we wind up with this very wiggly curve, if lambda was small or it was  
[00:06:12] even 0.  
[00:06:14] And in that case, we have a high variance model, and so jtrain is going to be small,  
[00:06:22] and jcv is going to be large, because it does great on the training data, but does much  
[00:06:27] worse on the cross-validation data.  
[00:06:31] This extreme on the right, with very large values of lambda, say lambda equals 10,000,  
[00:06:37] ends up with fitting a model that looks like that.  
[00:06:40] So this has high bias, it underfits the data, and it turns out jtrain will be high and jcv  
[00:06:48] will be high as well.  
[00:06:50] And in fact, if you were to look at how jtrain varies as a function of lambda, you find that  
[00:06:57] jtrain will go up like this.  
[00:07:01] Because in the optimization cost function, the larger lambda is, the more the algorithm  
[00:07:06] is trying to keep w squared small, that is, the more weight it's giving to this regularization  
[00:07:11] term, and thus the less attention it's paying to actually doing well on the training set.  
[00:07:17] Remember, this term on the left is jtrain, so the more it's trying to keep the parameters  
[00:07:21] small, the less good a job it does on minimizing the training error.  
[00:07:26] So that's why as lambda increases, the training error jtrain will tend to increase like so.  
[00:07:33] Now how about the cross-validation error?  
[00:07:36] Turns out the cross-validation error will look like this.  
[00:07:41] Because we've seen that if lambda is too small or too large, then it doesn't do well on the  
[00:07:46] cross-validation set.  
[00:07:48] It either overfits here on the left or underfits here on the right, and there'll be some intermediate  
[00:07:55] value of lambda that causes the algorithm to perform best.  
[00:08:01] And what cross-validation is doing is trying out a lot of different values of lambda.  
[00:08:07] This is what we saw on the last slide.  
[00:08:09] Try out lambda equals zero, lambda equals 0.01, lambda equals 0.02.  
[00:08:13] Try a lot of different values of lambda and evaluate the cross-validation error at a lot  
[00:08:18] of these different points, and then hopefully pick a value that has low cross-validation  
[00:08:25] error, and this will hopefully correspond to a good model for your application.  
[00:08:32] If you compare this diagram to the one that we had in the previous video, where the horizontal  
[00:08:38] axis was the degree of polynomial, these two diagrams look a little bit, not mathematically  
[00:08:44] and not in any formal way, but they look a little bit like mirror images of each other.  
[00:08:50] And that's because when you're fitting a degree of polynomial, the left part of this  
[00:08:56] curve corresponded to underfitting and high bias, the right part corresponded to overfitting  
[00:09:02] and high variance, whereas in this one, high variance was on the left and high bias was  
[00:09:09] on the right.  
[00:09:10] But that's why these two images are a little bit like mirror images of each other.  
[00:09:14] But in both cases, cross-validation, evaluating different values, can help you choose a good  
[00:09:20] value of T or a good value of lambda.  
[00:09:23] So that's how the choice of regularization parameter lambda affects the bias and variance  
[00:09:28] and overall performance of your algorithm.  
[00:09:31] And you've also seen how you can use cross-validation to make a good choice for the regularization  
[00:09:36] parameter lambda.  
[00:09:38] Now so far, we've talked about how having a high training set error, high J train, is  
[00:09:44] indicative of high bias, and how having a high cross-validation error, J cv, specifically  
[00:09:51] if it's much higher than J train, how that's indicative of a variance problem.  
[00:09:57] But what do these words high or much higher actually mean?  
[00:10:01] Let's take a look at that in the next video, where we'll look at how you can look at the  
[00:10:05] numbers J train and J cv and judge if it's high or low.  
[00:10:10] And it turns out that one further refinement of these ideas, that is establishing a baseline  
[00:10:15] level performance through a learning algorithm, will make it much easier for you to look at  
[00:10:18] these numbers, J train, J cv, and judge if they're high or low.  
[00:10:23] Let's take a look at what all this means in the next video.
