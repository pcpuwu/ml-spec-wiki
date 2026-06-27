# Training Details — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](training-details.md)

---

[00:00:02] Let's take a look at the details of what the TensorFlow code for training a neural network is actually doing.  
[00:00:08] Let's dive in.  
[00:00:09] Before looking at the details of training a neural network, let's recall how you had trained a logistic regression model in the previous course.  
[00:00:19] Step 1 of building a logistic regression model was, you would specify how to compute the output given the input vgelec and the parameters w and b.  
[00:00:30] In the first course, we said the logistic regression function predicts f of x is equal to g, the sigmoid function applied to w dot product x plus b, which was the sigmoid function applied to w dot x plus b.  
[00:00:46] So, if z is the dot product of w of x plus b, then f of x is 1 over 1 plus e to the negative z.  
[00:01:00] So that was the first step, where to specify what is the input-to-output function of logistic regression, and that depends on both the input x and the parameters of the model.  
[00:01:12] The second step we had to do to train the logistic regression model was to specify the loss function and also the cost function.  
[00:01:21] So you may recall that the loss function said if logistic regression outputs f of x and the ground truth label, the actual label in the training set was y, then the loss on that single training example was negative y log f of x minus 1 minus y times log of 1 minus f of x.  
[00:01:44] So, this was a measure of how well is logistic regression doing on a single training example x comma y.  
[00:01:54] Given this definition of a loss function, we then define the cost function, and the cost function was a function of the parameters w and b.  
[00:02:05] And that was just the average, that is taking an average over all m training examples of the loss function computed on the m training examples x1, y1 through xm, ym.  
[00:02:19] And remember that in the convention we're using, the loss function is a function of the output of the learning algorithm and the ground truth label as computed over a single training example, whereas the cost function j is an average of the loss function computed over your entire training set.  
[00:02:40] So that was step two of what we did when building up logistic regression.  
[00:02:46] And then the third and final step to train logistic regression model was to use an algorithm, specifically gradient descent, to minimize that cost function j of w, b, to minimize it as a function of the parameters w and b.  
[00:03:03] And we minimize the cost j as a function of the parameters using gradient descent, where w is updated as w minus the learning rate alpha times the derivative of j with respect to w, and b similarly is updated as b minus the learning rate alpha times the derivative of j with respect to b.  
[00:03:29] So with these three steps, step one, specify how to compute the outputs given the input x and parameters, step two, specify the loss and cost, and step three, minimize the cost function, we trained logistic regression.  
[00:03:41] The same three steps is how we can train a neural network in TensorFlow.  
[00:03:47] Now let's look at how these three steps map to training a neural network.  
[00:03:52] We'll go over this in greater detail on the next three slides, but really briefly.  
[00:03:58] Step one of specifying how to compute the output given the input x and parameters w and b, that's done with this code snippet, which should be familiar from last week of specifying the neural network.  
[00:04:10] And this was actually enough to specify the computations needed in forward propagation or for the inference algorithm, for example.  
[00:04:17] The second step is to compile the model and to tell it what loss you want to use.  
[00:04:23] And here's the code that you use to specify this loss function, which is the binary cross-entropy loss function.  
[00:04:32] And once you specify this loss, taking an average over the entire training set also gives you the cost function for the neural network.  
[00:04:40] And then step three is to call a function to try to minimize the cost as a function of the parameters of the neural network.  
[00:04:48] Let's look in greater detail in these three steps in the context of training a neural network.  
[00:04:55] The first step, specify how to compute the output given the input x and parameters w and b.  
[00:05:00] This code snippet specifies the entire architecture of the neural network.  
[00:05:04] It tells you that there are 25 hidden units in the first hidden layer, then 15 in the next one, and then one output unit, and that we're using the sigmoid activation value.  
[00:05:14] And so based on this code snippet, we know also what are the parameters, w1, b1 of the first layer, parameters of the second layer, and parameters of the third layer.  
[00:05:24] So this code snippet specifies the entire architecture of the neural network and therefore tells TensorFlow everything it needs in order to compute the output.  
[00:05:34] The output a3 or f of x as a function of the input x and the parameters.  
[00:05:41] Here we have written wl and bl.  
[00:05:45] Let's go on to step two.  
[00:05:47] In the second step, you have to specify what is the loss function, and that will also define the cost function we use to train the neural network.  
[00:05:55] So for the handwritten digit classification problem where images are either of a 0 or a 1.  
[00:06:04] And the most common by far loss function to use is this one.  
[00:06:09] It's actually the same loss function as what we had for logistic regression.  
[00:06:14] It's negative y log f of x minus 1 minus y times log 1 minus f of x.  
[00:06:21] Where y is the ground truth label, sometimes also called the target label y, and f of x is now the output of the neural network.  
[00:06:29] And in TensorFlow, this is called the binary cross-entropy loss function.  
[00:06:35] Where does that name come from?  
[00:06:37] Well, it turns out in statistics, this function on top is called the cross-entropy loss function.  
[00:06:42] So that's what cross-entropy means.  
[00:06:44] And the word binary just re-emphasizes or points out that this is a binary classification problem because each image is either a 0 or a 1.  
[00:06:54] And the syntax is to ask TensorFlow to compile the neural network using this loss function.  
[00:07:01] And another historical note, Keras was originally a library that had developed independently of TensorFlow.  
[00:07:08] It was actually a totally separate project from TensorFlow.  
[00:07:10] But eventually it got merged into TensorFlow, which is why we have tf.keraslibrary.losses.the name of this loss function.  
[00:07:20] And by the way, I don't always remember the names of all the loss functions in TensorFlow.  
[00:07:26] But I just do a quick web search myself to find the right name, and then I plug that into my code.  
[00:07:31] Having specified the loss with respect to a single training example,  
[00:07:36] TensorFlow knows that the cost you want to minimize is then the average,  
[00:07:41] taking the average over all m training examples, of the loss on all of the training examples.  
[00:07:47] And optimizing this cost function will result in fitting the neural network to your binary classification data.  
[00:07:55] In case you want to solve a regression problem rather than a classification problem,  
[00:08:01] you can also tell TensorFlow to compile your model using a different loss function.  
[00:08:08] For example, if you have a regression problem, and if you want to minimize the squared error loss,  
[00:08:16] so here is the squared error loss, the loss with respect to if your learning algorithm outputs f of x,  
[00:08:22] with a target or ground truth label of y, that's one half of the squared error,  
[00:08:26] then you can use this loss function in TensorFlow,  
[00:08:31] which is to use the maybe more intuitively named mean squared error loss function.  
[00:08:37] And then TensorFlow will try to minimize the mean squared error.  
[00:08:41] In this expression, I'm using J of capital W comma capital B to denote the cost function.  
[00:08:48] The cost function is a function of all of the parameters in the neural network.  
[00:08:53] So you can think of capital W as including W1, W2, W3,  
[00:09:00] so all the W parameters in the entire neural network, and B as including B1, B2, and B3.  
[00:09:08] So if you are optimizing the cost function with respect to W and B,  
[00:09:15] you'd be trying to optimize it with respect to all of the parameters in the neural network.  
[00:09:20] And up on top as well, I have written f of x as the output of the neural network,  
[00:09:26] but if you want, you can also write f of WB if you want to emphasize that  
[00:09:31] the output of the neural network as a function of x depends on all the parameters  
[00:09:35] and all the layers of the neural network.  
[00:09:38] So that's the loss function and the cost function.  
[00:09:41] Finally, you will ask TensorFlow to minimize the cost function.  
[00:09:46] You might remember the gradient descent algorithm from the first course.  
[00:09:51] If you are using gradient descent to train the parameters of a neural network,  
[00:09:55] then you will repeatedly, for every layer L and for every unit J,  
[00:10:01] update WLJ according to WLJ minus the learning rate alpha  
[00:10:08] times the partial derivative with respect to that parameter of the cost function,  
[00:10:13] J of WB, and similarly for the parameters B as well.  
[00:10:20] And after doing, say, 100 iterations of gradient descent,  
[00:10:25] hopefully you get to a good value of the parameters.  
[00:10:29] So in order to use gradient descent,  
[00:10:32] the key thing you need to compute is these partial derivative terms.  
[00:10:37] And what TensorFlow does, and in fact what is standard in neural network training,  
[00:10:41] is to use an algorithm called backpropagation  
[00:10:45] in order to compute these partial derivative terms.  
[00:10:49] TensorFlow can do all of these things for you.  
[00:10:52] It implements backpropagation all within this function called fit.  
[00:10:57] So all you have to do is call model.fit x, y as your training set  
[00:11:02] and tell it to do so for 100 iterations or 100 epochs.  
[00:11:07] In fact, what you see later is that TensorFlow can use an algorithm  
[00:11:12] that is even a little bit faster than gradient descent.  
[00:11:15] And you see more about that later this week as well.  
[00:11:18] Now, I know that we're relying heavily on the TensorFlow library  
[00:11:22] in order to implement a neural network.  
[00:11:25] One pattern I've seen across multiple ideas is,  
[00:11:29] as the technology evolves, libraries become more mature  
[00:11:32] and most engineers will use libraries rather than implement code from scratch.  
[00:11:37] And there have been many other examples of this in the history of computing.  
[00:11:42] Once, many, many decades ago,  
[00:11:45] programmers had to implement their own sorting function from scratch.  
[00:11:49] But now, sorting libraries are quite mature,  
[00:11:52] that you probably call someone else's sorting function  
[00:11:55] rather than implement it yourself,  
[00:11:57] unless you're taking a computing class that asks you to do it as an exercise.  
[00:12:01] And today, if you want to compute the square root of a number,  
[00:12:05] like, what is the square root of 7?  
[00:12:08] Well, once, programmers had to write their own code to compute this,  
[00:12:12] but now pretty much everyone just calls a library to take square roots  
[00:12:17] or matrix operations, such as multiplying two matrices together.  
[00:12:22] So when deep learning was younger and less mature,  
[00:12:26] many developers, including me,  
[00:12:27] were implementing things from scratch,  
[00:12:30] using Python or C++ or some other library.  
[00:12:33] But today, deep learning libraries have matured enough  
[00:12:37] that most developers will use these libraries.  
[00:12:40] And in fact, most commercial implementations of neural networks today  
[00:12:44] use a library like TensorFlow or PyTorch.  
[00:12:47] But as I've mentioned,  
[00:12:49] it's still useful to understand how they work under the hood  
[00:12:52] so that if something unexpected happens,  
[00:12:54] which still does with today's libraries,  
[00:12:55] you have a better chance of knowing how to fix it.  
[00:12:58] Now that you know how to train a basic neural network,  
[00:13:02] also called a multilayer perceptron,  
[00:13:05] there are some things you can change about the neural network  
[00:13:08] that will make it even more powerful.  
[00:13:10] In the next video, let's take a look  
[00:13:13] at how you can swap in different activation functions  
[00:13:16] as an alternative to the sigmoid activation function we've been using.  
[00:13:21] This will make your neural networks work even much better.  
[00:13:23] So let's go take a look at that in the next video.
