# Example: Recognizing Images — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](example-recognizing-images.md)

---

[00:00:01] In the last video, you saw how a neural network works in a demand prediction example.  
[00:00:06] Let's take a look at how you can apply a similar type of idea to a computer vision application.  
[00:00:12] Let's dive in.  
[00:00:13] If you're building a face recognition application, you might want to train, say, a neural network  
[00:00:18] that takes as input a picture like this and outputs the identity of the person in the picture.  
[00:00:25] This image is 1,000 by 1,000 pixels, and so its representation in the computer is actually  
[00:00:33] as a 1,000 by 1,000 grid, or also called a 1,000 by 1,000 matrix of pixel intensity values.  
[00:00:42] In this example, my pixel intensity values, or pixel brightness values, goes from 0 to 255.  
[00:00:50] 197 here would be the brightness of the pixel in the very upper left of the image.  
[00:00:56] 185 is the brightness of the pixel, 1 pixel over, and so on, down to 214 would be the lower right corner of this image.  
[00:01:06] If you were to take these pixel intensity values and unroll them into a vector,  
[00:01:13] you end up with a list or a vector of a million pixel intensity values.  
[00:01:19] One million because 1,000 by 1,000 squared gives you a million numbers.  
[00:01:24] The face recognition problem is, can you train a neural network that takes as input a feature vector  
[00:01:32] with a million pixel brightness values and outputs the identity of the person in the picture?  
[00:01:40] This is how you might build a neural network to carry out this task.  
[00:01:45] The input image x is fed to this layer of neurons.  
[00:01:50] This is the first hidden layer, which then extracts some features,  
[00:01:55] and the output of this first hidden layer is fed to a second hidden layer,  
[00:02:00] and that output is fed to a third hidden layer, and then finally to the output layer,  
[00:02:05] which then estimates, say, the probability of this being a particular person.  
[00:02:11] One interesting thing would be if you look at a neural network that's been trained on a lot of images of faces  
[00:02:18] and to try to visualize what are these hidden layers trying to compute.  
[00:02:23] It turns out that when you train a system like this on a lot of pictures of faces  
[00:02:28] and you peer at the different neurons in the hidden layers to figure out what they may be computing,  
[00:02:35] this is what you might find.  
[00:02:37] In the first hidden layer, you might find one neuron that is looking for a little vertical line or a vertical edge like that,  
[00:02:46] and a second neuron looking for a oriented line or oriented edge like that,  
[00:02:52] and a third neuron looking for a line at that orientation, and so on.  
[00:02:57] In the earliest layers of a neural network, you might find that the neurons are looking for very short lines  
[00:03:04] or very short edges in the image.  
[00:03:08] If you look at the next hidden layer, you find that these neurons might learn to group together lots of little short lines  
[00:03:18] and little short edge segments in order to look for parts of faces.  
[00:03:22] For example, each of these little square boxes is a visualization of what that neuron is trying to detect.  
[00:03:30] This first neuron looks like it's trying to detect the presence or absence of an eye in a certain position of the image,  
[00:03:38] and the second neuron looks like it's trying to detect the horn of a nose,  
[00:03:43] and maybe this neuron over here is trying to detect the bottom of an ear.  
[00:03:50] Then as you look at the next hidden layer, in this example, the neural network is aggregating different parts of faces  
[00:03:58] to then try to detect presence or absence of larger, coarser face shapes,  
[00:04:04] and then finally, detecting how much the face corresponds to different face shapes  
[00:04:10] creates a rich set of features that then helps the output layer try to determine the identity of the person pictured.  
[00:04:18] And a remarkable thing about the neural network is it can learn these feature detectors at the different hidden layers all by itself.  
[00:04:26] In this example, no one ever told it to look for short little edges in the first layer,  
[00:04:32] and eyes and noses and face parts in the second layer, and then more complete face shapes at the third hidden layer.  
[00:04:39] The neural network is able to figure out these things all by itself from data.  
[00:04:44] Just one note, in this visualization, the neurons in the first hidden layer are shown looking at relatively small windows to look for these edges,  
[00:04:54] and then the second hidden layer is looking at a bigger window, and the third hidden layer is looking at an even bigger window.  
[00:05:01] So these little neurons' visualizations actually correspond to differently sized regions in the image.  
[00:05:08] Just for fun, let's see what happens if you were to train this neural network on a different dataset,  
[00:05:15] say on lots of pictures of cars pictured on the side.  
[00:05:20] The same learning algorithm, if it's asked to detect cars, will then learn edges in the first layer, so pretty similar,  
[00:05:30] but then they'll learn to detect parts of cars in the second hidden layer, and then more complete car shapes in the third hidden layer.  
[00:05:38] So just by feeding it different data, the neural network automatically learns to detect very different features,  
[00:05:47] so as to try to make the predictions of car detection or person recognition or whatever is a particular given task that it's trained on.  
[00:05:58] So that's how a neural network works for a computer vision application.  
[00:06:02] And in fact, later this week, you'll see how you can build a neural network yourself and apply it to a handwritten digit recognition application.  
[00:06:11] So far, we've been going over the description of intuitions of neural networks to give you a feel for how they work.  
[00:06:18] In the next video, let's look more deeply into the concrete mathematics and the concrete implementational details of how you actually build one or more layers of a neural network,  
[00:06:30] and therefore how you can implement one of these things yourself.  
[00:06:33] Let's go on to the next video.
