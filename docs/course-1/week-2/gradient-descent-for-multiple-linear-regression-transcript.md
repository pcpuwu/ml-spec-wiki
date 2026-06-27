# Gradient Descent for Multiple Linear Regression — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](gradient-descent-for-multiple-linear-regression.md)

---

[00:00:02] So you've learned about gradient descent,  
[00:00:04] about multiple linear regression,  
[00:00:06] and also vectorization.  
[00:00:08] Let's put it all together to implement gradient descent  
[00:00:11] for multiple linear regression with vectorization.  
[00:00:14] This would be cool.  
[00:00:15] Let's quickly review what multiple linear regression looks like.  
[00:00:19] Using our previous notation,  
[00:00:20] let's see how you can write it more succinctly using vector notation.  
[00:00:24] We have parameters W1 to WN as well as B,  
[00:00:29] but instead of thinking of W1 to WN to WV  
[00:00:32] and as separate numbers, that is separate parameters,  
[00:00:35] let's instead collect all of the Ws into a vector W,  
[00:00:40] so that now W is a vector of length N.  
[00:00:44] So we're just going to think of the parameters of this model  
[00:00:47] as a vector W, as well as B, where B is still a number,  
[00:00:52] same as before.  
[00:00:54] Whereas before, we had defined multiple linear regression like this.  
[00:00:58] Now, using vector notation, we can write the model,  
[00:01:02] the model as f sub wb of x equals the vector W dot product with the vector X plus B.  
[00:01:11] And remember that this dot here means dot product.  
[00:01:15] Our cost function can be defined as J of W1 through WN comma B,  
[00:01:21] but instead of just thinking of J as a function of these N different parameters,  
[00:01:27] WJ as well as B, we're going to write J as a function of  
[00:01:32] parameter vector W and the number B.  
[00:01:36] So this W1 through WN is replaced by this vector W.  
[00:01:42] And J now takes us input, a vector W and the number B, and returns the number B.  
[00:01:48] And returns a number. Here's what gradient descent looks like.  
[00:01:52] We're going to repeatedly update each parameter WJ to be WJ minus alpha  
[00:01:58] times the derivative of the cost J, where J has  
[00:02:02] parameters W1 through WN and B.  
[00:02:06] And once again, we just write this as J of a vector W and number B.  
[00:02:13] Let's see what this will look like when you implement gradient descent.  
[00:02:16] And in particular, let's take a look at the derivative term.  
[00:02:21] We'll see that gradient descent becomes just a little bit different with multiple  
[00:02:25] features compared to just one feature. Here's what we had when we had gradient descent  
[00:02:31] with one feature.  
[00:02:32] we had an update rule for W and a separate update rule for B.  
[00:02:38] So hopefully these look familiar to you.  
[00:02:41] And this term here is the derivative of the cost function J with respect to the parameter W.  
[00:02:49] And similarly, we have an update rule for parameter B.  
[00:02:53] With univari regression, we had only one feature.  
[00:02:57] We call that feature XI without any subscript.  
[00:03:02] Now, here  
[00:03:03] Here's the new notation for when we have N features, where N is 2 or more.  
[00:03:09] We get this update rule for gradient descent.  
[00:03:12] Update W1 to be W1 minus alpha times this expression here.  
[00:03:19] And this formula is actually the derivative of the cost J with respect to W1.  
[00:03:27] The formula for the derivative of J with respect to W1 on the right looks very similar to the  
[00:03:33] case of one feature on the left. The error term still takes a prediction, F of X minus the target Y.  
[00:03:41] One difference is that W and X are now vectors, and just as W on the left has now become W1 here on the right,  
[00:03:52] XI here on the left, is now instead XI subscript 1 here on the right, and this is just for J equals 1.  
[00:04:04] For multiple linear regression, we have J ranging from 1 through N,  
[00:04:10] and so we'll update the parameters W1, W2 all the way up to WN, and then as before, we'll update B.  
[00:04:23] And if you implement this, you get gradient descent for multiple regression.  
[00:04:29] So that's it for gradient descent for multiple regression.  
[00:04:34] Before moving on from the gradient descent for multiple regression.  
[00:04:35] from this video, I want to make a quick aside or a quick side note on an alternative  
[00:04:42] way for finding W and B for linear regression. And this method is called the normal equation. Whereas  
[00:04:51] it turns out gradient descent is a great method for minimizing the cost function J to find W and B. There  
[00:04:59] is one other algorithm that works only for linear regression and pretty much none of the other algorithms  
[00:05:05] you see in this specialization for solving for W&B. And this other method does not need  
[00:05:11] an iterative gradient descent algorithm. Called the normal equation method, it turns out to be possible  
[00:05:19] to use an advanced linear algebra library to just solve for W&B all in one go without iterations.  
[00:05:27] Some disadvantages of the normal equation method are, first, unlike gradient descent,  
[00:05:32] this does not generalize to other learning algorithms, such as  
[00:05:35] the logistic regression algorithm that you learn about next week or the neural networks  
[00:05:40] or other algorithms you see later in this specialization. The normal equation method is also  
[00:05:46] quite slow if the number of features end is large. Almost no machine learning  
[00:05:52] practitioners should implement the normal equation method themselves, but if you're  
[00:05:57] using a mature machine learning library and call linear regression, there is a chance  
[00:06:03] that on the back end, it will be using this to solve for W&B.  
[00:06:08] So if you're ever in a job interview and hear the term normal equation, that's what this refers  
[00:06:13] to. Don't worry about the details of how the normal equation works. Just be aware that some  
[00:06:20] machine learning libraries may use this complicated method in the back end to solve for W&B. But for  
[00:06:27] most learning algorithms, including how you implement linear regression yourself,  
[00:06:32] grade in the sense often a better way to get the way to get the way.  
[00:06:34] the job done. In the optional lab that follows this video, you see how to define a multiple  
[00:06:41] regression model in code and also how to calculate the prediction f of x. You also see how to calculate  
[00:06:49] the cost and implement gradient descent for a multiple linear regression model. This will be using  
[00:06:56] Python's NumPy library, so if any of the code looks very new, that's okay. But you should feel  
[00:07:03] free also to take a look at the previous optional lab that introduces NUMPI and  
[00:07:09] vectorization for a refresher of NUMPI functions and how to implement those in code.  
[00:07:15] So that's it. You now know multiple linear regression. This is probably the single most widely  
[00:07:21] used learning algorithm in the world today. But there's more. With just a few tricks,  
[00:07:27] such as picking and scaling and scaling features appropriately, and also choosing the learning  
[00:07:31] rate out appropriately, you'll be able to make this work much better.  
[00:07:35] So just a few more videos to go for this week. Let's go on to the next video to see those little  
[00:07:40] tricks that'll help you make multiple linear regression work much better.
