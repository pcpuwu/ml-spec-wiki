# Additional Layer Types — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](additional-layer-types.md)

---

[00:00:03] All the neural network layers we've used so far have been the dense layer type,  
[00:00:05] in which every neuron in a layer gets as its inputs all the activations from the previous layer.  
[00:00:12] And it turns out that just using the dense layer type, you can actually build some pretty powerful learning algorithms.  
[00:00:19] And to help you build further intuition about what neural networks can do,  
[00:00:24] it turns out that there are some other types of layers as well.  
[00:00:27] In this video, I'd like to briefly touch on this and give you an example of a different type of neural network layer.  
[00:00:34] Let's take a look.  
[00:00:35] To recap, in the dense layer that we've been using, the activation of a neuron in, say, the second hidden layer,  
[00:00:45] is a function of every single activation value from the previous layer of a neural network.  
[00:00:52] It's a function of every single activation value from the previous layer of A1.  
[00:00:58] But it turns out that for some applications, someone designing a neural network may choose to use a different type of layer.  
[00:01:07] One other layer type that you may see in some work is called a convolutional layer.  
[00:01:14] Let me illustrate this with an example.  
[00:01:16] So what I'm showing on the left is the input x, which is a handwritten digit 9.  
[00:01:22] And what I'm going to do is construct a hidden layer, which will compute different activations as functions of this input image x.  
[00:01:31] But here's something I can do.  
[00:01:33] For the first hidden unit, which I've drawn in blue, rather than saying this neuron can look at all the pixels in this image,  
[00:01:42] I might say this neuron can only look at the pixels in this little rectangular region.  
[00:01:48] Second neuron, which I'm going to illustrate in magenta, is also not going to look at the entire input image x.  
[00:01:55] Instead, it's only going to look at the pixels in a limited region of the image.  
[00:02:00] And so on for the third neuron, and the fourth neuron, and so on and so forth,  
[00:02:07] down to the last neuron, which maybe looks only at that region of the image.  
[00:02:13] So why might you want to do this?  
[00:02:16] Why won't you let every neuron look at all the pixels, but instead look at only some of the pixels?  
[00:02:22] Well, some of the benefits are, first, it speeds up computation.  
[00:02:29] Second advantage is that a neural network that uses this type of layer, called a convolutional layer, can need less training data.  
[00:02:37] Alternatively, it can also be less prone to overfitting.  
[00:02:42] You've heard me talk a bit about overfitting in the previous course, but this is something that we'll dive into greater detail on next week as well,  
[00:02:50] when we talk about practical tips for using learning algorithms.  
[00:02:55] And this preferred type of layer, where each neuron only looks at a region of the input image, is called a convolutional layer.  
[00:03:06] It was a researcher, Yann LeCun, who had figured out a lot of the details of how to get convolutional layers to work and popularize their use.  
[00:03:15] Let me illustrate in more detail a convolutional layer.  
[00:03:21] And if you have multiple convolutional layers in a neural network, sometimes that's called a convolutional neural network.  
[00:03:29] To illustrate the convolutional layer or convolutional neural network, on this slide I'm going to use, instead of a 2D image input, I'm going to use a one-dimensional input.  
[00:03:41] And the motivating example I'm going to use is classification of EKG signals, or electrocardiograms.  
[00:03:49] So if you put two electrodes on your chest, you will record the voltages that look like this, that correspond to your heartbeat.  
[00:03:57] This is actually something that my Stanford research group did research on.  
[00:04:02] We're actually reading EKG signals that actually look like this, to try to diagnose if a patient may have a heart issue.  
[00:04:10] So an EKG signal, an electrocardiogram, ECG in some places, EKG in some places, is just a list of numbers corresponding to the height of this surface at different points in time.  
[00:04:23] So you may have, say, 100 numbers corresponding to the height of this curve at 100 different points of time.  
[00:04:32] And the learning task is, given this time series, given this EKG signal, to classify, say, whether this patient has a heart disease or some diagnosable heart condition.  
[00:04:46] Here's what a convolutional neural network might do.  
[00:04:49] So I'm going to take the EKG signal and rotate it 90 degrees to lay it on the side, and so we have here 100 inputs, X1, X2, all the way through X100, like so.  
[00:05:00] And when I construct the first hidden layer, instead of having the first hidden unit take as input all 100 numbers, let me have the first hidden unit look at only X1 through X20.  
[00:05:16] So that corresponds to looking at just a small window of this EKG signal.  
[00:05:22] The second hidden unit, shown in a different color here, will look at X11 through X30, so it looks at a different window in this EKG signal.  
[00:05:32] And the third hidden layer looks at another window, X21 through X40, and so on.  
[00:05:37] And the final hidden unit, in this example, will look at X81 through X100, so it looks at a small window toward the end of this EKG time series.  
[00:05:49] So this is a convolutional layer, because each unit in this layer looks at only a limited window of the input.  
[00:05:57] Now, this layer of the neural network has nine units.  
[00:06:03] The next layer can also be a convolutional layer.  
[00:06:08] So, in the second hidden layer, let me architect my first unit not to look at all nine activations from the previous layer, but to look at, say, just the first five activations from the previous layer.  
[00:06:25] And then my second unit in this second hidden layer may look at just another five numbers, say, A3 to A7.  
[00:06:34] And the third and final hidden unit in this layer will only look at A5 through A9.  
[00:06:41] And then maybe, finally, these activations A2 get inputs to a sigmoid unit that does look at all three of these values of A2 in order to make a binary classification regarding presence or absence of heart disease.  
[00:06:59] So this is an example of a neural network with the first hidden layer being a convolutional layer, the second hidden layer also being a convolutional layer, and then the output layer being a sigmoid layer.  
[00:07:12] And it turns out that with convolutional layers, you have many architectural choices, such as how big is the window of inputs that a single neuron should look at, and how many neurons should each layer have.  
[00:07:25] And by choosing those architectural parameters effectively, you can build new versions of neural networks that can be even more effective than the dense layer for some applications.  
[00:07:36] To recap, that's it for the convolutional layer and convolutional neural networks.  
[00:07:41] I'm not going to go deeper into convolutional networks in this class, and you don't need to know anything about them to do the homeworks and finish this class successfully.  
[00:07:52] But I hope that you find this additional intuition that neural networks can have other types of layers as well to be useful.  
[00:07:59] And in fact, if you sometimes hear about the latest cutting-edge architectures like a transformer model or an LSTM or an attention model,  
[00:08:09] a lot of this research in neural networks, even today, pertains to researchers trying to invent new types of layers for neural networks,  
[00:08:18] and plugging these different types of layers together as building blocks to form even more complex and hopefully more powerful neural networks.  
[00:08:27] So that's it for the required videos for this week. Thank you, and congrats on sticking with me all the way through this.  
[00:08:34] And I look forward to seeing you next week also, where we'll start to talk about practical advice for how you can build machine learning systems.  
[00:08:44] I hope that the tips you learn next week will help you become much more effective at building useful machine learning systems.  
[00:08:52] So I look forward also to seeing you next week.
