# Neural Network with Softmax Output — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](neural-network-with-softmax-output.md)

---

[00:00:02] In order to build a neural network that can carry out multiclass classification,  
[00:00:06] we're going to take the softmax regression model and put it into essentially the output layer of a neural network.  
[00:00:14] Let's take a look at how to do that.  
[00:00:16] Previously, when we were doing handwritten digit recognition with just two classes,  
[00:00:22] we used a neural network with this architecture.  
[00:00:26] If you now want to do handwritten digit classification with 10 classes, all the digits from 0 to 9,  
[00:00:35] then we're going to change this neural network to have 10 output units, like so.  
[00:00:42] And this new output layer will be a softmax output layer.  
[00:00:47] So sometimes we'll say this neural network has a softmax output or that this output layer is a softmax layer.  
[00:00:54] And the way forward propagation works in this neural network is, given an input x, a1 gets computed exactly the same as before,  
[00:01:04] and then a2, deactivations for the second hidden layer, also get computed exactly the same as before.  
[00:01:12] And we now have to compute deactivations for this output layer, that is, a3.  
[00:01:19] This is how it works.  
[00:01:21] If you have 10 output classes, we will compute z1, z2, through z10 using these expressions.  
[00:01:29] So this is actually very similar to what we had previously for the formula you used to compute z.  
[00:01:35] z1 is w1 dot product with a2, deactivations from the previous layer, plus v1, and so on for z1 through z10.  
[00:01:46] Then a1 is equal to e to the z1 divided by e to the z1 plus dot dot dot plus up to e to the z10,  
[00:01:57] and that's our estimate of the chance that y is equal to 1.  
[00:02:02] And similarly for a2, and similarly all the way up to a10.  
[00:02:09] And so this gives you your estimates of the chance of y being equal to 1, 2, and so on up through the 10th possible label for y.  
[00:02:19] And just for completeness, if you want to indicate that these are the quantities associated with layer 3,  
[00:02:26] technically I should add these superscript 3s there.  
[00:02:31] It does make the notation a little bit more cluttered,  
[00:02:34] but this makes explicit that this is, for example, the z31 value,  
[00:02:39] and this is the parameters associated with the first unit of layer 3 of this neural network.  
[00:02:48] And with this, your softmax output layer now gives you estimates of the chance of y being any of these 10 possible output labels.  
[00:03:00] I do want to mention that the softmax layer, or sometimes also called the softmax activation function,  
[00:03:06] it is a little bit unusual in one respect compared to the other activation functions we've seen so far,  
[00:03:12] like sigmoid, ReLU, and linear,  
[00:03:14] which is that when we're looking at sigmoid or ReLU or linear activation functions,  
[00:03:19] a1 was a function of z1, and a2 was a function of z2 and only z2.  
[00:03:30] In other words, to obtain the activation values, we could apply the activation function g,  
[00:03:35] be it sigmoid or ReLU or something else, element-wise, to z1 and z2 and so on to get a1 and a2 and a3 and a4.  
[00:03:44] But with the softmax activation function, notice that a1 is a function of z1 and z2 and z3 all the way up to z10.  
[00:03:55] So each of these activation values depends on all of the values of z,  
[00:04:01] and this is a property that's a bit unique to the softmax output or the softmax activation function.  
[00:04:07] Or stated differently, if you want to compute a1 through a10,  
[00:04:12] that is a function of z1 all the way up to z10 simultaneously,  
[00:04:20] and this is unlike the other activation functions we've seen so far.  
[00:04:24] Finally, let's look at how you would implement this in TensorFlow.  
[00:04:30] If you want to implement the neural network that I've shown here on this slide, this is the code to do so.  
[00:04:38] Similar as before, there are three steps to specifying and training a model.  
[00:04:42] The first step is to tell TensorFlow to sequentially string together three layers.  
[00:04:48] First layer is this 25 units of a ReLU activation function.  
[00:04:52] Second layer, 15 units of a ReLU activation function.  
[00:04:55] And then the third layer, because there are now 10 output units, you want to output a1 through a10,  
[00:05:01] so there are now 10 output units, and we'll tell TensorFlow to use the softmax activation function.  
[00:05:08] And the cost function that you saw in the last video,  
[00:05:13] TensorFlow calls that the sparse categorical cross-entropy function.  
[00:05:19] So I know this name is a bit of a mouthful,  
[00:05:23] whereas for logistic regression, we had the binary cross-entropy function.  
[00:05:28] Here, we're using the sparse categorical cross-entropy function.  
[00:05:33] And what sparse categorical refers to is that you're still classifying y into categories,  
[00:05:40] so it's categorical, it takes on values from 1 to 10,  
[00:05:45] and sparse refers to that y can only take on one of these 10 values.  
[00:05:50] So each image is either 0 or 1 or 2 or so on up to 9,  
[00:05:53] you're not going to see a picture that is simultaneously the number 2 and the number 7.  
[00:05:58] So sparse refers to that each digit is only one of these categories.  
[00:06:03] So that's why the loss function that you saw in the last video is called in TensorFlow,  
[00:06:09] the sparse categorical cross-entropy loss function.  
[00:06:13] And then the code for training the model is just the same as before.  
[00:06:17] And if you use this code, you can train a neural network on a multiclass classification problem.  
[00:06:23] Just one important note.  
[00:06:26] If you use this code exactly as I've written here, it will work,  
[00:06:30] but don't actually use this code because it turns out that in TensorFlow,  
[00:06:35] there's a better version of the code that makes TensorFlow work better.  
[00:06:40] So even though the code shown in this slide works,  
[00:06:44] don't use this code the way I've written it here,  
[00:06:47] because in a later video this week, you'll see a different version.  
[00:06:51] There's actually a recommended version of implementing this that will work better.  
[00:06:55] But we'll take a look at that in a later video.  
[00:06:58] So now you know how to train a neural network with a softmax output layer with one caveat.  
[00:07:05] There's a different version of the code that will make TensorFlow able to compute these probabilities much more accurately.  
[00:07:13] Let's take a look at that in the next video,  
[00:07:16] which will also show you the actual code that I recommend you use if you're training a softmax neural network.  
[00:07:22] Let's go on to the next video.
