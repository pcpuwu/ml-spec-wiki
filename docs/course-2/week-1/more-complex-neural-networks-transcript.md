# More Complex Neural Networks — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](more-complex-neural-networks.md)

---

[00:00:01] In the last video, you learned about the neural network layer and how that takes as input a vector of numbers and in turn outputs another vector of numbers.  
[00:00:12] In this video, let's use that layer to build a more complex neural network.  
[00:00:17] And through this, I hope that the notation that we're using for neural networks will become clearer and more concrete as well.  
[00:00:25] Let's take a look.  
[00:00:26] This is the running example that I'm going to use throughout this video as an example of a more complex neural network.  
[00:00:33] This network has four layers, not counting the input layer, which is also called layer 0, where layers 1, 2, and 3 are hidden layers, and layer 4 is the output layer, and layer 0, as usual, is the input layer.  
[00:00:50] By convention, when we say that a neural network has four layers, that includes all the hidden layers and the output layer, but we don't count the input layer.  
[00:01:00] So, this is a neural network with four layers in the conventional way of counting layers in the network.  
[00:01:06] Let's zoom in to layer 3, which is the third and final hidden layer, to look at the computations of that layer.  
[00:01:17] Layer 3 inputs a vector, a superscript square bracket 2 that was computed by the previous layer, and it outputs a 3, which is another vector.  
[00:01:31] So, what is the computation that layer 3 does in order to go from a 2 to a 3?  
[00:01:40] If it has three neurons, or we call it three hidden units, then it has parameters w1, b1, w2, b2, and w3, b3, and it computes a1 equals sigmoid of w1 dot product with this input to the layer plus b1,  
[00:02:02] and it computes a2 equals sigmoid of w2 dot product with, again, a2, the input to the layer, plus b2, and so on, to get a3, and then the output of this layer is a vector comprising a1, a2, and a3.  
[00:02:22] And again, by convention, if we want to more explicitly denote that all of these are quantities associated with layer 3, then we add in all of these superscript square brackets 3 here,  
[00:02:36] to denote that these parameters w and b are the parameters associated with neurons in layer 3, and that these activations are activations of layer 3.  
[00:02:48] Notice that this term here is w1 superscript square bracket 3, meaning the parameters associated with layer 3, dot product with a superscript square bracket 2, which was the output of layer 2, which became the input to layer 3.  
[00:03:04] So, that's why there's a 3 here, because it's a parameter associated with layer 3, dot product with, and there's a 2 there, because it's the output of layer 2.  
[00:03:14] Now, let's just do a quick double-check of our understanding of this.  
[00:03:18] I'm going to hide the superscripts and subscripts associated with the second neuron, and without rewinding this video, go ahead and rewind if you want, but I prefer you not,  
[00:03:32] but without rewinding this video, are you able to think through what are the missing superscripts and subscripts in this equation and fill them in yourself?  
[00:03:41] Why don't you take a look at the end video quiz and see if you can figure out what are the appropriate superscripts and subscripts for this equation over here.  
[00:03:50] If you chose the first option, then you got it right.  
[00:03:54] The activation of the second neuron at layer 3 is denoted by a32.  
[00:04:01] To apply the activation function g, let's use the parameters of this same neuron.  
[00:04:07] So, W and B will have the same subscript 2 and superscript square bracket 3.  
[00:04:15] The input features will be the output vector from the previous layer, which is layer 2.  
[00:04:22] So, that will be the vector A superscript 2.  
[00:04:27] The second option is using vector A3, which is not the output vector from the previous layer.  
[00:04:35] The input to this layer is A2.  
[00:04:39] And the third option has A22 as input, which is just a single number rather than the vector.  
[00:04:48] Because recall that the correct input is a vector, A2 with the little arrow on top and not just a single number.  
[00:04:58] So, to recap, A3 is activation associated with layer 3 for the second neuron, hence it's a 2.  
[00:05:06] It's a parameter associated with the third layer.  
[00:05:10] For the second neuron, this is A2, same as above.  
[00:05:14] And then plus B32.  
[00:05:17] So, hopefully that makes sense.  
[00:05:19] Here's the more general form of this equation for an arbitrary layer L and for an arbitrary unit J.  
[00:05:26] Which is that A, the activation output of layer L, unit J, like A32, that's going to be the sigmoid function  
[00:05:38] applied to this term, which is the weight vector of layer L, such as layer 3, for the J unit.  
[00:05:45] So, there's 2 again in the example above.  
[00:05:48] And so that's dot producted with A, the activation value of, and notice this is not L, this is L-1, like the 2 above here.  
[00:05:58] Because you're dot producting with the output from the previous layer.  
[00:06:03] And then plus B, the parameter for this layer, for that unit J.  
[00:06:09] And so this gives you the activation of layer L's unit J.  
[00:06:14] Where the superscript in square brackets, L, denotes layer L, and the subscript J denotes unit J.  
[00:06:21] And when building neural networks, unit J refers to the Jth neuron.  
[00:06:26] So, use those terms a little bit interchangeably, where each unit is a single neuron in the layer.  
[00:06:31] G here is the sigmoid function.  
[00:06:34] In the context of a neural network, G has another name, which is also called the activation function,  
[00:06:41] because G outputs this activation value.  
[00:06:44] So, when I say activation function, I mean this function G here.  
[00:06:49] And so far, the only activation function you've seen is the sigmoid function.  
[00:06:54] But next week, we'll look at when other functions than the sigmoid function can be plugged in in place of G as well.  
[00:07:01] So, the activation function is just that function that outputs these activation values.  
[00:07:07] And just one last piece of notation.  
[00:07:10] In order to make all this notation consistent, I'm also going to give the input vector X another name, which is A0.  
[00:07:21] So, this way, this same equation also works for the first layer, where when L is equal to 1,  
[00:07:27] the activations of the first layer, that is A1, will be sigmoid times the weights dot product with A0,  
[00:07:36] which is just this input feature vector X.  
[00:07:39] So, with this notation, you now know how to compute the activation values of any layer in a neural network  
[00:07:46] as a function of the parameters as well as the activations of the previous layer.  
[00:07:51] So, you now know how to compute the activations of any layer given the activations of the previous layer.  
[00:07:58] Let's put this into an inference algorithm for a neural network.  
[00:08:02] In other words, how to get a neural network to make predictions.  
[00:08:06] Let's go see that in the next video.
