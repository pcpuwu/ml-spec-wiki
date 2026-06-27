# Neural Network Layer — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](neural-network-layer.md)

---

[00:00:02] The fundamental building block of most modern neural networks is a layer of neurons.  
[00:00:08] In this video, you'll learn how to construct a layer of neurons, and once you have that  
[00:00:13] down, you'll be able to take those building blocks and put them together to form a large  
[00:00:18] neural network.  
[00:00:19] Let's take a look at how a layer of neurons works.  
[00:00:22] Here's the example we had from the demand prediction example, where we had four input  
[00:00:28] features that were fed to this layer of three neurons in this hidden layer that then sends  
[00:00:35] its output to this output layer with just one neuron.  
[00:00:40] Let's zoom in to the hidden layer to look at its computations.  
[00:00:47] This hidden layer inputs four numbers, and these four numbers are inputs to each of three  
[00:00:52] neurons, and each of these three neurons is just implementing a little logistic regression  
[00:01:01] unit or a little logistic regression function.  
[00:01:04] So take this first neuron.  
[00:01:06] It has two parameters, w and b, and in fact, to denote that this is the first hidden unit,  
[00:01:15] I'm going to subscript this as w1, b1, and what it does is it'll output some activation  
[00:01:23] value a, which is g of w1 in a product with x plus b1, where this is the familiar z value  
[00:01:35] that you had learned about in logistic regression in the previous course, and g of z is the  
[00:01:44] familiar logistic function, 1 over 1 plus e to the negative z, and so maybe this ends  
[00:01:51] up being a number 0.3, and that's the activation value a of the first neuron.  
[00:01:59] To denote that this is the first neuron, I'm also going to add a subscript a1 over here,  
[00:02:04] and so a1 may be a number like 0.3, just a 0.3 chance of this being highly affordable  
[00:02:11] based on the input features.  
[00:02:14] Now let's look at the second neuron.  
[00:02:16] The second neuron has parameters w2 and b2, and this wb or w2, b2 are the parameters of  
[00:02:27] the second logistic unit.  
[00:02:29] So it computes a2 equals the logistic function g applied to w2 dot product x plus b2, and  
[00:02:40] this may be some other number, say 0.7, because in this example, there's a 0.7 chance that  
[00:02:47] we think the potential buyers will be aware of this t-shirt.  
[00:02:52] And similarly, the third neuron has a third set of parameters, w3, b3, and similarly computes  
[00:02:58] an activation value a3 equals g of w3 dot product x plus b3, and that may be, say, 0.2.  
[00:03:06] So in this example, these three neurons output 0.3, 0.7, and 0.2, and this vector of three  
[00:03:14] numbers becomes the vector of activation values a that is then passed to the final output  
[00:03:25] layer of this neural network.  
[00:03:28] Now when you build neural networks with multiple layers, it will be useful to give the layers  
[00:03:34] different numbers.  
[00:03:35] So by convention, this layer is called layer one of the neural network, and this layer  
[00:03:43] is called layer two of the neural network, and the input layer is also sometimes called  
[00:03:50] layer zero.  
[00:03:52] And today, there are neural networks that can have dozens or even hundreds of layers.  
[00:03:57] But in order to introduce notation to help us distinguish between the different layers,  
[00:04:03] I'm going to use superscript square bracket one to index into different layers.  
[00:04:12] So in particular, a superscript in square brackets one, I'm going to use as a notation  
[00:04:18] to denote the output of layer one of this hidden layer of this neural network.  
[00:04:24] And similarly, w1, b1 here are the parameters of the first unit in layer one of the neural  
[00:04:33] network, so I'm also going to add the superscript in square brackets one here.  
[00:04:37] And w2, b2 are the parameters of the second hidden unit, or the second hidden neuron in  
[00:04:47] layer one, and so those parameters are also denoted here, w superscript square bracket  
[00:04:52] one, like so.  
[00:04:54] And similarly, I can add superscript square brackets, like so, to denote that these are  
[00:05:00] the activation values of the hidden units of layer one of this neural network.  
[00:05:08] I know maybe this notation is getting a little bit cluttered, but the thing to remember is  
[00:05:15] whenever you see this superscript square bracket one, that just refers to a quantity that is  
[00:05:22] associated with layer one of the neural network.  
[00:05:26] And if you see superscript square bracket two, that refers to a quantity associated  
[00:05:32] with layer two of the neural network, and similarly for other layers as well, including  
[00:05:37] layer three, layer four, and so on for neural networks with more layers.  
[00:05:42] So that's the computation of layer one of this neural network.  
[00:05:47] Its output is this activation vector, a superscript square bracket one, and I'm going to copy  
[00:05:55] this over here because this output, a1, becomes the input to layer two.  
[00:06:04] So now let's zoom into the computation of layer two of this neural network, which is  
[00:06:09] also the output layer.  
[00:06:12] So the input to layer two is the output of layer one, so a1 is this vector, 0.3, 0.7,  
[00:06:23] 0.2, that we just computed on the previous part of this slide.  
[00:06:31] And so because the output layer has just a single neuron, all it does is it computes  
[00:06:37] a subscript one that is the output of this first and only neuron as g, the sigmoid function,  
[00:06:45] applied to w subscript one in a product with a superscript square bracket one.  
[00:06:51] So this is the input into this layer, and then plus b1.  
[00:06:58] Here this is the quantity z that you're familiar with, and g, as before, is the sigmoid function  
[00:07:05] that you apply to this.  
[00:07:08] And if this results in a number, say 0.84, then that becomes the output of this output  
[00:07:15] layer of the neural network.  
[00:07:18] And in this example, because the output layer has just a single neuron, this output is just  
[00:07:24] a scalar, it's a single number rather than a vector of numbers.  
[00:07:28] Sticking with our notational convention from before, we're going to use a superscript in  
[00:07:34] square brackets two to denote the quantities associated with layer two of this neural network.  
[00:07:40] So a superscript square bracket two is the output of this layer, and so I'm going to  
[00:07:47] also copy this here as the final output of the neural network.  
[00:07:53] And to make the notation consistent, you can also add these superscript square bracket  
[00:07:59] twos to denote that these are the parameters and activation values associated with layer  
[00:08:06] two of the neural network.  
[00:08:09] Once the neural network has computed A2, there's one final optional step that you can  
[00:08:14] choose to implement or not, which is if you want a binary prediction, one or zero, is  
[00:08:22] this a top seller, yes or no, is you can take the number, a superscript square bracket two  
[00:08:28] subscript one, and this is the number 0.84 that we computed, and threshold this at 0.5.  
[00:08:38] So if it's greater than 0.5, you can predict y-hat equals one, and if it's less than 0.5,  
[00:08:43] then predict y-hat equals zero, and we saw this thresholding as well when you learned  
[00:08:48] about logistic regression in the first course of the specialization.  
[00:08:53] So if you wish, this then gives you the final prediction y-hat as either one or zero if  
[00:08:58] you don't want just a probability of it being a top seller.  
[00:09:02] So that's how a neural network works.  
[00:09:04] Every layer inputs a vector of numbers and applies a bunch of logistic regression units  
[00:09:09] to it, and then computes another vector of numbers that then gets passed from layer to  
[00:09:15] layer until you get the final output layer's computation, which is a prediction of the  
[00:09:20] neural network.  
[00:09:21] Then you can either threshold at 0.5 or not to come up with the final prediction.  
[00:09:27] And with that, let's go on to use this foundation we've built now to look at some even more  
[00:09:33] complex, even larger neural network models.  
[00:09:37] And I hope that by seeing more examples, this concept of layers and how to put them together  
[00:09:43] to build a neural network will become even clearer.  
[00:09:46] So let's go on to the next video.
