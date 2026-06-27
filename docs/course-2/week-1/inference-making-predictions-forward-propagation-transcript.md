# Inference: Making Predictions (Forward Propagation) — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](inference-making-predictions-forward-propagation.md)

---

[00:00:01] Let's take what we've learned and put it together into an algorithm to let your neural network make inferences or make predictions.  
[00:00:09] This will be an algorithm called forward propagation. Let's take a look.  
[00:00:14] I'm going to use as a multi-example handwritten digit recognition.  
[00:00:19] And for simplicity, we're just going to distinguish between the handwritten digits 0 and 1.  
[00:00:26] So it's just a binary classification problem where we're going to input an image and classify is this the digit 0 or the digit 1.  
[00:00:34] And you get to play with this yourself later this week in the practice lab as well.  
[00:00:38] For the example of this line, I'm going to use an 8 by 8 image.  
[00:00:43] And so this image of a 1 is this grid or matrix of 8 by 8 or 64 pixel intensity values where 255 denotes a bright white pixel and 0 would denote a black pixel.  
[00:00:58] And different numbers are different shades of gray in between the shades of black and white.  
[00:01:05] Given these 64 input features, we're going to use a neural network with two hidden layers where the first hidden layer has 25 neurons or 25 units.  
[00:01:17] Second hidden layer has 15 neurons or 15 units.  
[00:01:21] And then finally, the output layer outputs what's the chance of this being 1 versus 0.  
[00:01:27] So let's step through the sequence of computations that the neural network would need to make to go from the input x, this 8 by 8 or 64 numbers to the predicted probability a3.  
[00:01:41] The first computation is to go from x to a1.  
[00:01:45] And that's what the first layer or the first hidden layer does.  
[00:01:49] It carries out a computation of a superscript square bracket 1 equals this formula on the right.  
[00:01:56] Notice that a1 has 25 numbers because this hidden layer has 25 units, which is why the parameters go from w1 through w25 as well as b1 through b25.  
[00:02:11] And I've written x here, but I could also have written a0 here because by convention, the activation of layer 0, that is a0, is equal to the input feature value x.  
[00:02:23] So that lets us compute a1.  
[00:02:26] The next step is to compute a2.  
[00:02:29] Looking at the second hidden layer, it then carries out this computation where a2 is a function of a1 and is computed as the safe-void activation function applied to w dot product a1 plus the corresponding value of b.  
[00:02:48] Notice that layer 2 has 15 neurons or 15 units, which is why the parameters here run from w1 through w15 and b1 through b15.  
[00:03:01] Now we've computed a2.  
[00:03:03] The final step is then to compute a3.  
[00:03:07] And we do so using a very similar computation, only now this third layer, the output layer, has just one unit, which is why there's just one output here.  
[00:03:19] So a3 is just a scalar.  
[00:03:22] And finally, you can optionally take a3, subscript 1, and threshold it at 0.5 to come up with a binary classification label.  
[00:03:32] Is this the digit 1? Yes or no.  
[00:03:34] So the sequence of computations first takes x and then computes a1 and then computes a2 and then computes a3, which is also the output of the neural network.  
[00:03:45] So you can also write that as f of x.  
[00:03:48] So remember when we learned about linear regression and logistic regression, we used f of x to denote the output of linear regression or logistic regression.  
[00:03:58] So we can also use f of x to denote the function computed by the neural network as a function of x.  
[00:04:05] Because this computation goes from left to right, you start from x, then compute a1, then a2, then a3.  
[00:04:12] This algorithm is also called forward propagation because you're propagating the activations of the neurons.  
[00:04:20] So you're making these computations in the forward direction from left to right.  
[00:04:26] And this is in contrast to a different algorithm called backward propagation or backpropagation, which is used for learning.  
[00:04:33] And that's something you learn about next week.  
[00:04:35] And by the way, this type of neural network architecture, where you have more hidden units initially and then the number of hidden units decreases as you get closer to the output layer,  
[00:04:46] that's also a pretty typical choice when choosing neural network architectures.  
[00:04:50] And you see more examples of this in the practice lab as well.  
[00:04:53] So that's neural network inference using the forward propagation algorithm.  
[00:04:59] And with this, you'd be able to download the parameters of a neural network that someone else had trained and posted on the Internet.  
[00:05:07] And you'd be able to carry out inference on your new data using their neural network.  
[00:05:13] Now that you've seen the math and the algorithm, let's take a look at how you can actually implement this in TensorFlow.  
[00:05:20] Specifically, let's take a look at this in the next video.
