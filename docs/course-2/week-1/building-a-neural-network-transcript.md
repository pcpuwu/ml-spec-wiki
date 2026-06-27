# Building a Neural Network — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](building-a-neural-network.md)

---

[00:00:01] So you've seen a bunch of TensorFlow code by now, learned about how to build a layer  
[00:00:05] in TensorFlow, how to do forward prop through a single layer in TensorFlow, and also learned  
[00:00:11] about data in TensorFlow.  
[00:00:13] Let's put it all together and talk about how to build a neural network in TensorFlow.  
[00:00:19] This is also the last video on TensorFlow for this week, and in this video, you'll also  
[00:00:24] learn about a different way of building a neural network that will be even a little  
[00:00:28] bit simpler than what you've seen so far.  
[00:00:31] So let's dive in.  
[00:00:32] What you saw previously was, if you want to do forward prop, you initialize the data X,  
[00:00:40] create layer 1 like so, then compute A1, then create layer 2, and compute A2.  
[00:00:46] So this was an explicit way of carrying out forward prop one layer of computation at a  
[00:00:52] time.  
[00:00:55] It turns out that TensorFlow has a different way of implementing forward prop as well  
[00:01:03] as learning.  
[00:01:04] Let me show you a different way of building a neural network in TensorFlow, which is that,  
[00:01:10] same as before, you're going to create layer 1 and create layer 2, but now, instead of  
[00:01:17] you manually taking the data and passing it to layer 1 and then taking the activations  
[00:01:22] from layer 1 and passing it to layer 2, we can instead tell TensorFlow that we would  
[00:01:29] like it to take layer 1 and layer 2 and string them together to form a neural network.  
[00:01:35] That's what the sequential function in TensorFlow does, which is it says, Dear TensorFlow, please  
[00:01:42] create a neural network for me by sequentially stringing together these two layers that I  
[00:01:48] just created.  
[00:01:50] It turns out that with the sequential framework, TensorFlow can do a lot of work for you.  
[00:01:58] Let's say you have a training set like this on the left.  
[00:02:00] This is for the coffee example.  
[00:02:03] You can then take the training data's inputs X and put them into a NumPy array.  
[00:02:11] This here is a 4 by 2 matrix, and the target labels Y can then be written as follows.  
[00:02:21] This is just a one-dimensional array of length 4.  
[00:02:26] Y, this set of targets, can then be stored as a 1D array like this, 1 0 0 1, corresponding  
[00:02:34] to the four training examples.  
[00:02:36] It turns out that given the data X and Y stored in this matrix X and this array Y,  
[00:02:45] if you want to train this neural network, all you need to do is call two functions.  
[00:02:51] You need to call model.compile with some parameters.  
[00:02:55] We'll talk more about this next week, so don't worry about it for now.  
[00:02:59] Then you need to call model.fitXY, which tells TensorFlow to take this neural network  
[00:03:07] that it created by sequentially string together layers 1 and 2, and to train it on the data  
[00:03:15] X and Y.  
[00:03:16] But we'll learn the details of how to do this next week.  
[00:03:22] Then finally, how do you do inference on this neural network?  
[00:03:26] How do you do forward prop?  
[00:03:27] If you have a new example, say X new, which is NP array with these two features, then  
[00:03:34] to carry out forward prop, instead of having to do it one layer at a time yourself, you  
[00:03:40] just have to call model.predict on X new, and this will output the corresponding value  
[00:03:48] of A2 for you, given this input value of X.  
[00:03:55] Model.predict carries out forward propagation, or carries out inference for you using this  
[00:04:00] neural network that you compiled using the sequential function.  
[00:04:05] Now I want to take these three lines of code on top and just simplify it a little bit further,  
[00:04:13] which is when coding TensorFlow, by convention, we don't explicitly assign the two layers  
[00:04:20] to two variables, layer 1 and layer 2, as follows.  
[00:04:24] But by convention, I would usually just write the code like this.  
[00:04:28] What we say the model is a sequential model of a few layers strung together sequentially,  
[00:04:34] where the first layer, layer 1, is a dense layer with three units and activation of sigmoid,  
[00:04:41] and the second layer is a dense layer with one unit and again a sigmoid activation function.  
[00:04:47] So if you look at others' TensorFlow code, you often see it look more like this, rather  
[00:04:52] than having an explicit assignment to these layer 1 and layer 2 variables.  
[00:04:59] And so that's it.  
[00:05:01] This is pretty much the code you need in order to train, as well as do inference on, a neural  
[00:05:09] network in TensorFlow, where again, we'll talk more about the training bits of this,  
[00:05:13] the compile and the fit function, next week.  
[00:05:18] Let's redo this for the digit classification example, as well.  
[00:05:23] So previously, we had x is this input, layer 1 is the layer, a1 equals layer 1 applied  
[00:05:30] to x, and so on, through layer 2 and layer 3, in order to try to classify a digit.  
[00:05:36] With this new coding convention, with using TensorFlow's sequential function, you can  
[00:05:42] instead specify what are layer 1, layer 2, layer 3, and tell TensorFlow to string the  
[00:05:49] layers together for you into a neural network.  
[00:05:53] And same as before, you can then store the data in a matrix and run the compile function  
[00:06:01] and fit the model as follows.  
[00:06:03] Again, more on this next week.  
[00:06:06] And finally, to do inference or to make predictions, you can use model predict on x new.  
[00:06:15] And similar to what you saw before, with the coffee classification network, by convention,  
[00:06:21] instead of assigning layer 1, layer 2, layer 3, explicitly like this, we would more commonly  
[00:06:26] just take these layers and put them directly into the sequential function, so you end up  
[00:06:31] with this more compact code, where you just tell TensorFlow, create a model for me that  
[00:06:36] sequentially strings together these three layers, and then the rest of the code works  
[00:06:40] same as before.  
[00:06:41] So that's how you would build a neural network in TensorFlow.  
[00:06:46] Now I know that when you're learning about these techniques, sometimes someone may ask  
[00:06:49] you to, hey, implement these five lines of code, and then you type five lines of code,  
[00:06:54] and then someone says, congratulations, with just five lines of code, you've built this  
[00:06:58] crazy complicated, state-of-the-art neural network.  
[00:07:01] And sometimes that makes you wonder, what exactly did I do with just these five lines  
[00:07:05] of code?  
[00:07:07] One thing I want you to take away from the machine learning specialization is the ability  
[00:07:11] to use cutting-edge libraries like TensorFlow to do your work efficiently.  
[00:07:17] But I don't really want you to just call five lines of code and not really also know what  
[00:07:22] the code is actually doing underneath the hood.  
[00:07:26] So in the next video, I'd like to go back and share with you how you can implement from  
[00:07:30] scratch by yourself, forward propagation in Python, so that you can understand the  
[00:07:35] whole thing for yourself.  
[00:07:37] In practice, most machine learning engineers don't actually implement forward propagation  
[00:07:42] in Python that often.  
[00:07:44] We just use libraries like TensorFlow and PyTorch.  
[00:07:47] But because I want you to understand how these algorithms work yourself, so that if something  
[00:07:52] goes wrong, you can think through for yourself what you might need to change, what's likely  
[00:07:56] to work, what's less likely to work.  
[00:07:59] Let's also go through what it would take for you to implement forward propagation from  
[00:08:03] scratch.  
[00:08:04] Because that way, even when you're calling a library and having it run efficiently and  
[00:08:09] do great things in your application, I want you in the back of your mind to also have  
[00:08:14] that deeper understanding of what your code is actually doing.  
[00:08:19] So with that, let's go on to the next video.
