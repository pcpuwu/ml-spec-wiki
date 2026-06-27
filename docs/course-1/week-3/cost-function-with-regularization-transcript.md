# Cost Function with Regularization — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](cost-function-with-regularization.md)

---

[00:00:01] In the last video, we saw that regularization tries to make the parameter values W1 through WN small to reduce overfitting.  
[00:00:10] In this video, we'll build on that intuition and develop a modified cost function for your learning algorithm  
[00:00:16] they can use to actually apply regularization. Let's jump in.  
[00:00:21] Recall this example from the previous video in which we saw that if you fit a quadratic function to this data, it gives a pretty good fit  
[00:00:31] but if you fit a very high order polynomial, you end up with a curve that overfits the data.  
[00:00:37] But now, consider the following.  
[00:00:41] Suppose that you had a way to make the parameters W3 and W4 really, really small.  
[00:00:48] Say close to zero.  
[00:00:50] Here's what I mean.  
[00:00:52] Let's say instead of minimizing this objective function, this is a cost function for linear regression,  
[00:00:59] let's say you were to modify the cost function,  
[00:01:02] and add to it 1,000 times W3 squared plus 1,000 times W4 squared.  
[00:01:10] And here I'm just choosing 1,000 because it's a big number, but any other really large number would be okay.  
[00:01:17] So with this modified cost function, you'd, in fact, be penalizing the model if W3 and W4 are large.  
[00:01:25] Because if you want to minimize this function, the only way to make this new cost function small is if W3,  
[00:01:32] W3 and W4 are both small, right?  
[00:01:35] Because otherwise, this 1,000 times W3 squared and 1,000 times W4 square terms are going to be really,  
[00:01:42] really big.  
[00:01:45] So when you minimize this function, you're going to end up with W3 close to zero and W4 close to zero.  
[00:01:53] So we're effectively nearly canceling out the effect of the features X cubed and X the X to power of 4  
[00:02:01] and getting rid of these two terms.  
[00:02:03] terms over here. And if we do that, then we end up with a fit to the data that's much closer  
[00:02:09] to the quadratic function, including maybe just tiny contributions from the features x cubed  
[00:02:15] and x to 4th. And this is good because it's a much better fit to the data compared to if all the  
[00:02:22] parameters could be large and you end up with this wiggly quadratic function.  
[00:02:27] More generally, here's the idea behind regularization. The idea is that if there are smaller values  
[00:02:33] for the parameters, then that's a bit like having a simpler model, maybe one with fewer  
[00:02:39] features, which is therefore less prone to overfitting. On the last slide, we penalize,  
[00:02:46] or we say we regularized, only W3 and W4. But more generally, the way that regularization tends to  
[00:02:55] be implemented is, if you have a lot of features, say 100 features, you may not know which are the  
[00:03:01] most important features and which ones to penalize. So the  
[00:03:05] The way regularization is typically implemented is to penalize all of the features, or more  
[00:03:10] precisely, you penalize all the WJ parameters. And it's possible to show that this will usually  
[00:03:17] result in fitting a smoother, simpler, less wiggly function that's less prone to overfitting.  
[00:03:22] So for this example, if you have data with 100 features for each hulls, it may be hard to pick  
[00:03:28] in advance which features to include and which ones to exclude. So let's build a model that uses  
[00:03:34] all 100 features. So you have these 100 parameters, W1 through W100, as well as the  
[00:03:44] 1001st parameter B. Because we don't know which of these parameters are going to be the important  
[00:03:50] ones, let's penalize all of them a bit and shrink all of them by adding this new term  
[00:03:58] lambda times the sum from j equals 1 through n, where n is 100, the number of features,  
[00:04:04] of WJ squared. This value, lambda here, is the Greek alphabet lambda, and it's also called  
[00:04:15] a regularization parameter. So similar to picking a learning rate alpha, you now also have to choose  
[00:04:23] a number for lambda. A couple things I would like to point out. By convention, instead of using  
[00:04:31] lambda times the sum of wj squared, we also divide lambda  
[00:04:36] by 2M, so that both the first and second terms here are scaled by 1 over 2m. It turns out that  
[00:04:45] by scaling both terms the same way, it becomes a little bit easier to choose a good value for  
[00:04:51] Lambda. And in particular, you find that even if your training set size grows, say you find more  
[00:04:58] training examples, so M, the training set size is now bigger. The same value of Lambda that you had picked  
[00:05:04] previously, is now also more likely to continue to work if you have this extra scaling  
[00:05:11] by 2M. Also, by the way, by convention, we're not going to penalize the parameter B for being  
[00:05:18] large. In practice, it makes very little difference whether you do or not, and some machine learning  
[00:05:23] engineers, and actually some learning other implementations, will also include  
[00:05:29] Lambda over 2M times the B squared term, but this makes very low  
[00:05:34] little difference in practice, and the more common convention which we're use in this course  
[00:05:40] is to regularize only the parameters W rather than the parameter B. So to summarize,  
[00:05:47] in this modified cost function, we want to minimize the original cost, which is a mean  
[00:05:53] square error cost, plus additionally the second term, which is called the regularization term.  
[00:06:00] And so this new cost function trades off two goals that you might have. Trying to minimize  
[00:06:05] Trying to minimize this first term encourages the algorithm to fit the training data well  
[00:06:10] by minimizing the squared differences of the predictions and the actual values.  
[00:06:15] And trying to minimize the second term, the algorithm also tries to keep the parameters WJ small,  
[00:06:22] which will tend to reduce overfitting.  
[00:06:26] The value of Lambda that you choose specifies the relative importance  
[00:06:30] or the relative trade-off or how you balance between these two goals.  
[00:06:36] Let's take a look at what different values of Lambda will cause your learning algorithm to do.  
[00:06:42] Let's use the housing price prediction example using linear regression.  
[00:06:46] So F of X is the linear regression model.  
[00:06:50] If Lambda was set to be zero, then you're not using the regularization term at all,  
[00:06:56] because the regularization term is multiplied by zero.  
[00:07:00] And so if Lambda was zero, you end up fitting this overly wiggly,  
[00:07:04] overly complex curve and it overfits.  
[00:07:08] So that was one extreme of if lambda was zero.  
[00:07:11] Let's not look at the other extreme.  
[00:07:14] If you set lambda to be a really, really, really, really large number,  
[00:07:17] say lambda equals 10 to the power of 10.  
[00:07:21] Then you're placing a very heavy weight on this  
[00:07:23] regularization term on the right,  
[00:07:25] and the only way to minimize this is to be sure that all the values of  
[00:07:29] W are pretty much very close to zero.  
[00:07:34] So if lambda is very, very, very,  
[00:07:35] very large, the learning algorithm will choose W1, W2, W3, and W4 to be extremely close to 0.  
[00:07:44] And thus, F of X is basically equal to B, and so the learning algorithm fits a horizontal straight line  
[00:07:53] and underfits. To recap, if Lambda is zero, this model will overfit.  
[00:08:00] If Lambda is enormous, like 10 to the power of 10, this model will underfit.  
[00:08:05] And so what you want is some value of lambda that is in between,  
[00:08:09] that more appropriately balances these first and second terms of trading off,  
[00:08:16] minimizing the mean squared error, and keeping the parameters small.  
[00:08:21] And when the value of lambda is not too small and not too large, but just right,  
[00:08:27] then hopefully you end up able to fit a fourth-order polynomial,  
[00:08:31] keeping all of these features, but with a function that looks like this.  
[00:08:36] So that's how I really.  
[00:08:37] regulation works. When we talk about model selection later into specialization, we'll  
[00:08:43] also see a variety of ways to choose good values for Lambda. In the next two videos, we'll flesh out  
[00:08:50] how to apply regularization to linear regression and logistic regression, and how to train these  
[00:08:55] models with gradient descent. With that, you'll be able to avoid overfitting with both of these algorithms.
