# Regularized Logistic Regression — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](regularized-logistic-regression.md)

---

[00:00:01] In this video, you see how to implement regularized logistic regression.  
[00:00:06] Just as the gradient update for logistic regression has seemed surprisingly similar  
[00:00:11] to the gradient update for linear regression, you find that the gradient descent update  
[00:00:15] for regularized logistic regression will also look similar to the update for  
[00:00:19] regularized linear regression. Let's take a look. Here's the idea. We saw earlier  
[00:00:24] that logistic regression can be prone to overfitting if you fit it with very high-order  
[00:00:29] polynomial features like this. Here, Z is a high-order polynomial that gets passed into the  
[00:00:37] sigmoid function like so to compute F. And in particular, you can end up with a decision  
[00:00:44] boundary that is overly complex and overfits this training set. More generally,  
[00:00:51] when you train logistic regression with a lot of features, whether polynomial features or  
[00:00:56] some other features, there can be a higher risk of overfitting.  
[00:01:00] This was the cost function for logistic regression.  
[00:01:05] If you want to modify it, to use regularization, all you need to do is add to it the following term.  
[00:01:13] Let's add lambda the regularization parameter over 2m times the sum from j equals 1 through n,  
[00:01:21] where n is the number of features as usual, of wj squared.  
[00:01:26] So when you minimize this cost function as a function of w and b,  
[00:01:31] it has the effect of penalizing parameters W1, W2 through WN,  
[00:01:36] and preventing them from being too large.  
[00:01:39] And if you do this, then even though you're fitting a high-order polynomial with a lot of parameters,  
[00:01:45] you still get a decision boundary that looks like this,  
[00:01:49] something that looks more reasonable for  
[00:01:52] separating positive and negative examples while also generalizing,  
[00:01:55] hopefully, to new examples, not in the training set.  
[00:02:00] So when using regular  
[00:02:01] even when you have a lot of features, how can you actually implement this?  
[00:02:07] How can you actually minimize this cost function J of WB that includes the regularization term?  
[00:02:12] Well, let's use gradient descent as before.  
[00:02:17] So here's the cost function that you want to minimize, and to implement gradient descent,  
[00:02:23] as before, will carry out the following simultaneous updates over WJ and B.  
[00:02:30] These are the usual update  
[00:02:32] rules for gradient descent, and just like regularized linear regression, when you compute  
[00:02:39] what are these derivative terms? The only thing that changes now is that the derivative  
[00:02:44] from respect to WJ gets this additional term. Lambda over M times WJ added here at the end.  
[00:02:54] And again, it looks a lot like the update for regularized linear regression. In fact,  
[00:03:00] is the exact same equation, except for the fact.  
[00:03:02] that the definition of F is now no longer the linear function,  
[00:03:07] it is the logistic function applied to Z.  
[00:03:11] And similar to linear regression, we will regularize only the parameters WJ,  
[00:03:16] but not the parameter B, which is why there's no change the update you will make for B.  
[00:03:24] In the final optional lab of this week, you revisit overfitting,  
[00:03:29] and in the interactive plot in the optional lab, you can now choose  
[00:03:34] to regularize your models, both regression and classification, by enabling regularization  
[00:03:40] during gradient descent, by selecting a value for Lambda. Please take a look at the code for  
[00:03:46] implementing regularized logistic regression in particular, because you implement this in a practice  
[00:03:52] lab yourself at the end of this week. So, now you know how to implement regularize  
[00:03:59] logistic regression. When I walk around Silicon Valley, there are many engineers using machine learning  
[00:04:05] to create a ton of value, sometimes making a lot of money for the companies.  
[00:04:09] And I know you've only been studying this stuff for a few weeks,  
[00:04:13] but if you understand and can apply linear regression and logistic regression,  
[00:04:18] that's actually all you need to create some very valuable applications.  
[00:04:23] While the specific learning algorithms you use are important,  
[00:04:27] knowing things like when and how to reduce overfitting,  
[00:04:30] turns out to be one of the very valuable skills in the real world as well.  
[00:04:34] So I want to say congratulations on how far you've come.  
[00:04:38] And I want to say great job for getting through all the way to the end of this video.  
[00:04:44] I hope you also work through the practice labs and quizzes.  
[00:04:48] Having said that, there's still many more exciting things to learn.  
[00:04:53] In the second course of this specialization, you learn about neural networks,  
[00:04:57] also called deep learning algorithms.  
[00:05:00] Neuronetworks are responsible for many of the latest breakthroughs in AI today,  
[00:05:04] from practical speech recognition to computers accurately recognizing objects and images  
[00:05:10] to self-driving calls. The way a neural network gets built actually uses a lot of what you've already  
[00:05:16] learned, like cost functions and gradient descent and sigmoid functions. So again,  
[00:05:21] congratulations on reaching the end of this third and final week of Force One. I hope you have  
[00:05:27] fun in the labs and I will see you in next week's material on neural networks.
