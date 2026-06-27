# TensorFlow Implementation — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](tensorflow-implementation.md)

---

[00:00:02] Welcome back to the second week of this course on advanced learning algorithms.  
[00:00:07] Last week, you learned how to carry out inference in a neural network.  
[00:00:11] This week, we're going to go over training of a neural network.  
[00:00:15] I think being able to take your own data and train your own neural network on it is really fun.  
[00:00:21] This week, we'll look at how you could do that. Let's dive in.  
[00:00:25] Let's continue with our running example of handwritten digit recognition, recognizing this image as 0 or a 1.  
[00:00:34] Here, we're using the neural network architecture that you saw last week, where you have an input x, that is the image,  
[00:00:43] and then a first hidden layer with 25 units, second hidden layer with 15 units, and then one output unit.  
[00:00:50] If you're given a training set of examples comprising images x, as well as the ground truth label y,  
[00:00:58] how would you train the parameters of this neural network?  
[00:01:01] Let me go ahead and show you the code that you can use in TensorFlow to train this network.  
[00:01:07] And then in the next few videos after this, we'll dive into details to explain what the code is actually doing.  
[00:01:13] So this is the code you write.  
[00:01:15] This first part may look familiar from the previous week, where you are asking TensorFlow to sequentially string together these three layers of a neural network.  
[00:01:26] The first hidden layer with 25 units and sig1 activation, the second hidden layer, and then finally the output layer.  
[00:01:34] So nothing new here relative to what you saw last week.  
[00:01:38] Second step is you have to ask TensorFlow to compile the model.  
[00:01:42] And the key step in asking TensorFlow to compile the model is to specify what is the loss function you want to use.  
[00:01:50] In this case, we'll use something that goes by the binary cross-entropy loss function.  
[00:01:56] We'll say more in the next video what this really is.  
[00:01:59] And then having specified the loss function, the first step is to call the fit function, which tells TensorFlow to fit the model that you specified in step one,  
[00:02:10] using the loss of the cost function that you specified in step two to the data set x, y.  
[00:02:17] And back in the first course, when we talked about gradient descent, we had to decide how many steps to run gradient descent or how long to run gradient descent.  
[00:02:26] So epochs is a technical term for how many steps of a learning algorithm like gradient descent you may want to run.  
[00:02:34] And that's it. Step one is to specify the model, which tells TensorFlow how to compute for the inference.  
[00:02:42] Step two compiles the model using a specific loss function. And step three is to train the model.  
[00:02:49] So that's how you can train a neural network in TensorFlow.  
[00:02:53] As usual, I hope that you'll be able to not just call these lines of code to train the model,  
[00:02:59] but that you also understand what's actually going on behind these lines of code.  
[00:03:03] So you don't just call it without really understanding what's going on.  
[00:03:08] And I think this is important because when you're running a learning algorithm, if it doesn't work initially,  
[00:03:15] having that conceptual mental framework of what's really going on will help you debug whenever things don't work the way you expect.  
[00:03:24] So with that, let's go on to the next video, where we'll dive more deeply into what these steps in the TensorFlow implementation are actually doing.  
[00:03:33] I'll see you in the next video.
