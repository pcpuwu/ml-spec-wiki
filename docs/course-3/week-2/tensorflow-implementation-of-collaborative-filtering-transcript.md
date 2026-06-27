# TensorFlow Implementation of Collaborative Filtering — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](tensorflow-implementation-of-collaborative-filtering.md)

---

[00:00:02] In this video, we'll take a look at how you can use TensorFlow to implement the collaborative  
[00:00:07] filtering algorithm.  
[00:00:09] You might be used to thinking of TensorFlow as a tool for building neural networks, and  
[00:00:14] it is.  
[00:00:15] It's a great tool for building neural networks.  
[00:00:17] And it turns out that TensorFlow can also be very helpful for building other types of  
[00:00:22] learning algorithms as well, like the collaborative filtering algorithm.  
[00:00:27] One of the reasons I like using TensorFlow for tasks like these is that for many applications,  
[00:00:33] in order to implement gradient descent, say, you need to find the derivatives of the cost  
[00:00:38] function.  
[00:00:39] But TensorFlow can automatically figure out for you what are the derivatives of a cost  
[00:00:46] function.  
[00:00:47] All you have to do is implement the cost function, and without needing to know any calculus,  
[00:00:52] without needing to take derivatives yourself, you can get TensorFlow with just a few lines  
[00:00:57] of code to compute that derivative term that can then be used to optimize the cost function.  
[00:01:02] Let's take a look at how all this works.  
[00:01:05] You might remember this diagram here on the right from course one.  
[00:01:10] This is exactly the diagram that we had looked at when we talked about optimizing W when  
[00:01:16] we were working through our first linear regression example.  
[00:01:21] And at that time, we had set B equals to zero.  
[00:01:25] And so the model was just predicting f of x equals W dot x, and we wanted to find the  
[00:01:30] value of W that minimizes the cost function J.  
[00:01:34] So the way we were doing that was via a gradient descent update, which looks like this, where  
[00:01:41] W gets repeatedly updated as W minus the learning rate alpha times the derivative term.  
[00:01:47] If you were updating B as well, this is the expression you would use.  
[00:01:51] But if you set B equals zero, you just forego the second update, and you keep on performing  
[00:01:58] this gradient descent update until convergence.  
[00:02:02] Sometimes computing this derivative or partial derivative term can be difficult, and it turns  
[00:02:09] out that TensorFlow can help with that.  
[00:02:12] Let's see how.  
[00:02:13] I'm going to use a very simple cost function, J equals Wx minus one squared.  
[00:02:23] So Wx is our simplified fW of x, and y is equal to one, and so this would be the cost  
[00:02:32] function if we had f of x equals Wx, y equals one for the one training example that we have.  
[00:02:42] What if we were not optimizing this with respect to B?  
[00:02:45] So the gradient descent algorithm would repeat until convergence this update over here.  
[00:02:51] It turns out that if you implement the cost function J over here, TensorFlow can automatically  
[00:02:57] compute for you this derivative term, and thereby get gradient descent to work.  
[00:03:02] I'll give you a high-level overview of what this code does.  
[00:03:07] W equals tf.variable three takes the parameter W and initializes it to the value of three.  
[00:03:16] Telling TensorFlow that W is a variable is how we tell it that W is a parameter that  
[00:03:23] we want to optimize.  
[00:03:24] I'm going to set x equals one, y equals one, and the learning rate alpha to be equal to  
[00:03:29] 0.01, and let's run gradient descent for 30 iterations.  
[00:03:35] So in this code, we'll do for error in range iterations, so for 30 iterations, and this  
[00:03:40] is the syntax to get TensorFlow to automatically compute derivatives for you.  
[00:03:45] TensorFlow has a feature called a gradient tape, and if you write this with tfr.gradienttape  
[00:03:53] as tape f, this is compute f of x as W times x, and compute J as f of x minus y squared,  
[00:04:05] then by telling TensorFlow how to compute the cost J, and by doing it with a gradient  
[00:04:11] tape syntax as follows, TensorFlow will automatically record the sequence of steps, the sequence  
[00:04:17] of operations needed to compute the cost J.  
[00:04:21] And this is needed to enable automatic differentiation.  
[00:04:25] Next, TensorFlow will have saved the sequence of operations in tape, in the gradient tape.  
[00:04:33] And with this syntax, TensorFlow will automatically compute this derivative term, which I'm going  
[00:04:39] to call djdw, and TensorFlow knows you want to take the derivative with respect to W,  
[00:04:47] and W is the parameter you want to optimize because you had told it so up here, and because  
[00:04:53] we're also specifying it down here.  
[00:04:55] So now that you've computed derivatives, finally you can carry out this update by taking W  
[00:05:03] and subtracting from it the learning rate alpha times that derivative term that we just  
[00:05:08] got from up above.  
[00:05:11] TensorFlow variables, tier variables, require special handling, which is why instead of  
[00:05:16] setting W to be W minus alpha times the derivative in the usual way, we use this assign add function.  
[00:05:23] But when you get to the practice lab, don't worry about it, we'll give you all the syntax  
[00:05:27] you need in order to implement the collaborative filtering algorithm correctly.  
[00:05:31] So notice that with the gradient tape feature of TensorFlow, the main work you need to do  
[00:05:38] is to tell it how to compute the cost function J, and the rest of the syntax causes TensorFlow  
[00:05:44] to automatically figure out for you what is that derivative.  
[00:05:50] And with this, TensorFlow will start with finding the slope of this at 3, shown by this  
[00:05:56] dashed line, take a gradient step, and update W, and compute the derivative again, and update  
[00:06:04] W over and over until eventually it gets to the optimal value of W, which is at W equals 1.  
[00:06:13] So this procedure allows you to implement gradient descent without ever having to figure  
[00:06:18] out yourself how to compute this derivative term.  
[00:06:22] This is a very powerful feature of TensorFlow called AutoDiff, and some other machine learning  
[00:06:29] packages like PyTorch also support AutoDiff.  
[00:06:34] Sometimes you hear people call this AutoGrad, the technically correct term is AutoDiff,  
[00:06:39] and AutoGrad is actually the name of a specific software package for doing automatic differentiation,  
[00:06:45] for taking derivatives automatically.  
[00:06:47] But sometimes if you hear someone refer to AutoGrad, they're just referring to this same  
[00:06:51] concept of automatically taking derivatives.  
[00:06:54] So let's take this and look at how you can implement the collaborative filtering algorithm  
[00:06:59] using AutoDiff.  
[00:07:01] And in fact, once you can compute derivatives automatically, you're not limited to just gradient descent.  
[00:07:07] You can also use a more powerful optimization algorithm like the Adam optimization algorithm.  
[00:07:14] In order to implement the collaborative filtering algorithm in TensorFlow, this is the syntax  
[00:07:19] you can use.  
[00:07:20] We'll start with specifying that the optimizer is Keras optimizer's Adam with learning rate  
[00:07:27] specified here, and then for, say, 200 iterations, here's the syntax as before, with tf.gradientate  
[00:07:37] acetate.  
[00:07:38] You need to provide code to compute the value of the cost function J.  
[00:07:43] So recall that in collaborative filtering, the cost function J takes as input parentheses  
[00:07:50] X, W, and B, as well as the ratings we normalize, so that's why I'm writing Y norm, rij specifying  
[00:07:59] which values have a rating, number of users, or nu in annotation, number of movies, or  
[00:08:05] an M in annotation just now, as well as the regularization parameter lambda.  
[00:08:10] And if you can implement this cost function J, then this syntax will cause TensorFlow  
[00:08:15] to figure out the derivatives for you.  
[00:08:18] Then this syntax will cause TensorFlow to record the sequence of operations used to compute  
[00:08:22] the cost, and then by asking it to give you grads equals tf.gradient, this will give you  
[00:08:29] the derivative of the cost function with respect to X, W, and B, and finally, with  
[00:08:38] the optimizer that we have specified up on top as the Adam optimizer, you can use the  
[00:08:43] optimizer with the gradients that we just computed.  
[00:08:48] And the zip function in Python is just a function that rearranges the numbers into an appropriate  
[00:08:53] ordering for the applied gradients function.  
[00:08:55] If you are using gradient descent for Kaggle filtering, recall that the cost function J  
[00:09:01] would be a function of W, B, as well as X, and if you're applying gradient descent, you  
[00:09:07] take the partial derivative with respect to W, and then update W as follows, and you'd  
[00:09:13] also take the partial derivative of this with respect to B, and update B as follows, and  
[00:09:19] similarly update the features X as follows, and you repeat until convergence.  
[00:09:25] But as I mentioned earlier, with TensorFlow and AutoDiff, you're not limited to just gradient  
[00:09:31] descent.  
[00:09:32] You can also use a more powerful optimization algorithm like the Adam optimizer.  
[00:09:37] The dataset you use in the practice lab is a real dataset comprising actual movies rated  
[00:09:43] by actual people.  
[00:09:45] This is the MovieLens dataset, and it's due to Harper and Konstan, and I hope you enjoy  
[00:09:51] running this algorithm on a real dataset of movies and ratings, and see for yourself  
[00:09:56] the results that this algorithm can get.  
[00:09:59] So that's it.  
[00:10:00] That's how you can implement the collaborative filtering algorithm in TensorFlow.  
[00:10:04] If you're wondering why do we have to do it this way, why couldn't we use a dense layer  
[00:10:09] and then model compile and model fit, the reason we couldn't use that old recipe is  
[00:10:14] the collaborative filtering algorithm and cost function, it doesn't neatly fit into  
[00:10:19] the dense layer or the other standard neural network layer types of TensorFlow.  
[00:10:24] That's why we had to implement it this other way, where we would implement the cost function  
[00:10:28] ourselves, but then use TensorFlow's tools for automatic differentiation, also called  
[00:10:34] AutoDiff, and use TensorFlow's implementation of the Adam optimization algorithm to let  
[00:10:39] it do a lot of the work for us of optimizing the cost function.  
[00:10:44] If the model you have is a sequence of dense neural network layers or other types of layers  
[00:10:50] supported by TensorFlow, then the old implementation recipe of model compile, model fit works.  
[00:10:57] But even when it isn't, these tools in TensorFlow give you a very effective way to implement  
[00:11:03] other learning algorithms as well.  
[00:11:05] And so I hope you enjoy playing more with the collaborative filtering exercise in this  
[00:11:10] week's practice lab, and if it looks like there's a lot of code and a lot of syntax,  
[00:11:14] don't worry about it, make sure you have what you need to complete that exercise successfully.  
[00:11:20] And in the next video, I'd like to also move on to discuss more of the nuances of collaborative  
[00:11:27] filtering, and specifically, the question of how do you find related items, given one  
[00:11:33] movie, what are other movies similar to this one?  
[00:11:36] Let's go on to the next video.
