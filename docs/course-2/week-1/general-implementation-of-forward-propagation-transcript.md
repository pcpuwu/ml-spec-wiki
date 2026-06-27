# General Implementation of Forward Propagation — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](general-implementation-of-forward-propagation.md)

---

[00:00:02] In the last video, you saw how to implement forward prop in Python, but by hard-coding  
[00:00:07] lines of code for every single neuron.  
[00:00:10] Let's now take a look at the more general implementation of forward prop in Python.  
[00:00:15] Similar to the previous video, my goal in this video is to show you the code so that  
[00:00:20] when you see it again in the practice lab and the optional labs, you know how to interpret  
[00:00:25] it.  
[00:00:26] So as we walk through this example, don't worry about taking notes on every single line  
[00:00:30] of code.  
[00:00:31] If you can read through the code and understand it, that's definitely enough.  
[00:00:36] So what you can do is write a function to implement a dense layer that is a single layer  
[00:00:42] of a neural network.  
[00:00:45] So I'm going to define the dense function, which takes as input the activation from the  
[00:00:50] previous layer, as well as the parameters w and b for the neurons in a given layer.  
[00:00:59] Using the example from the previous video, if layer 1 has 3 neurons, and if w1 and w2  
[00:01:11] and w3 are these, then what we'll do is stack all of these weight vectors into a matrix.  
[00:01:19] This is going to be a 2 by 3 matrix, where the first column is the parameter w11, the  
[00:01:29] second column is the parameter w12, and the third column is the parameter w13.  
[00:01:36] And then in a similar way, if you have parameters b, b11 equals negative 1, b12 equals 1, and  
[00:01:45] so on, then we're going to stack these three numbers into one D-array, b, as follows, negative  
[00:01:53] 1, 1, 2.  
[00:01:54] So what the dense function will do is take as input the activation from the previous  
[00:01:59] layer, and a here could be a0, which is equal to x, or the activation from a later layer,  
[00:02:07] as well as the w parameters stacked in columns like shown on the right, as well as the b  
[00:02:15] parameters also stacked into a one D-array like shown to the left, over there.  
[00:02:23] And what this function will do is input a, the activation from the previous layer, and  
[00:02:30] will output the activations from the current layer.  
[00:02:34] So let's step through the code for doing this.  
[00:02:37] Here's the code.  
[00:02:39] First, units equals w dot shape 1, so w here is a 2 by 3 matrix, and so the number of columns  
[00:02:49] is 3, that's equal to the number of units in this layer.  
[00:02:53] So here, units would be equal to 3, and looking at the shape of w, it's just a way of pulling  
[00:03:00] out the number of hidden units, or the number of units in this layer.  
[00:03:05] Next, we set a to be an array of zeros with as many elements as there are units.  
[00:03:12] So in this example, we need to output three activation values, so this just initializes  
[00:03:17] a to be 0, 0, 0, an array of three zeros.  
[00:03:22] Next, we go through a for loop to compute the first, second, and third elements of a.  
[00:03:28] So for j in range units, so j goes from 0 to units minus 1, so it goes from 0, 1, 2,  
[00:03:35] indexing from 0 in Python as usual.  
[00:03:38] This command, w equals capital W colon comma j, this is how you pull out the jth column  
[00:03:47] of a matrix in Python.  
[00:03:50] So the first time through this loop, this will pull out the first column of w, and so  
[00:03:55] it will pull out w11.  
[00:03:59] The second time through this loop, when you're computing the activation of the second unit,  
[00:04:03] it will pull out the second column corresponding to w12, and so on for the third time through  
[00:04:09] this loop.  
[00:04:11] And then you compute z using the usual formula as a dot product between that parameter w  
[00:04:17] and the activation that you had received, plus bj.  
[00:04:23] And then you compute the activation, aj equals g, sigmoid function applied to z.  
[00:04:29] So three times through this loop, and you've computed the values for all three values of  
[00:04:33] this vector of activations a, and then finally you return a.  
[00:04:39] So what the dense function does is it inputs the activations from the previous layer, and  
[00:04:44] given the parameters for the current layer, it returns the activations for the next layer.  
[00:04:50] So given the dense function, here's how you can string together a few dense layers sequentially  
[00:04:56] in order to implement forward prop in the neural network.  
[00:05:00] Given the input features x, you can then compute the activations a1 to be a1 equals dense of  
[00:05:10] x, w1, b1, where here w1, b1 are the parameters, sometimes also called the weights, of the  
[00:05:19] first hidden layer.  
[00:05:21] Then you can compute a2 as dense of a1, which you just computed above, and w2, b2, which  
[00:05:30] are the parameters or weights of this second hidden layer, and then compute a3 and a4.  
[00:05:38] And if this is a neural network with four layers, then the final output, f of x, is  
[00:05:44] just equal to a4, and so you return f of x.  
[00:05:49] Notice that here I'm using a capital W because one of the notational conventions from linear  
[00:05:55] algebra is to use uppercase or capital alphabets when it's referring to a matrix, and lowercase  
[00:06:02] to refer to vectors and scalars.  
[00:06:05] So because this is a matrix, this is capital W.  
[00:06:08] So that's it.  
[00:06:09] You now know how to implement forward prop yourself from scratch.  
[00:06:13] And you get to see all this code and run it and practice it yourself in the practice  
[00:06:17] lab coming after this as well.  
[00:06:20] I think that even when you're using powerful libraries like TensorFlow, it's helpful to  
[00:06:25] know how it works under the hood.  
[00:06:27] Because in case something goes wrong, in case something runs really slowly, or you have  
[00:06:31] a strange result, or it looks like there's a bug, your ability to understand what's actually  
[00:06:37] going on will make you much more effective when debugging your code.  
[00:06:41] When I run machine learning algorithms a lot of the time, frankly, it doesn't work, certainly  
[00:06:46] not the first time.  
[00:06:47] And so I find that my ability to debug my code, be it TensorFlow code or something else,  
[00:06:53] is really important to being an effective machine learning engineer.  
[00:06:57] So even when you're using TensorFlow or some other framework, I hope that you find this  
[00:07:03] deeper understanding useful for your own applications and for debugging your own machine learning  
[00:07:09] algorithms as well.  
[00:07:11] So that's it.  
[00:07:13] That's the last required video of this week with code in it.  
[00:07:17] In the next video, I'd like to dive into what I think is a fun and fascinating topic, which  
[00:07:21] is what is the relationship between neural networks and AI or AGI, artificial general  
[00:07:28] intelligence?  
[00:07:29] This is a controversial topic, but because it's been so widely discussed, I want to share  
[00:07:34] with you some thoughts on this.  
[00:07:36] So when you are asked, are neural networks at all on the path to human level intelligence,  
[00:07:43] you have a framework for thinking about that question.  
[00:07:47] Let's go take a look at that fun topic, I think, in the next video.
