# Inference in Code (TensorFlow) — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](inference-in-code.md)

---

[00:00:01] TensorFlow is one of the leading frameworks for implementing deep learning algorithms.  
[00:00:06] When I'm building projects, TensorFlow is actually the tool that I use the most often,  
[00:00:11] and the other popular tool is PyTorch.  
[00:00:14] But we're going to focus in this specialization on TensorFlow.  
[00:00:18] In this video, let's take a look at how you can implement inference in code using TensorFlow.  
[00:00:24] Let's dive in.  
[00:00:25] One of the remarkable things about neural networks is the same algorithm can be applied to so many different applications.  
[00:00:33] So in order, both for this video and in some of the labs, for you to see what a neural network is doing,  
[00:00:40] I'm going to use another example to illustrate inference.  
[00:00:46] So sometimes I do like to roast coffee beans myself at home.  
[00:00:50] My favorite is actually Colombian coffee beans.  
[00:00:54] So can the learning algorithm help optimize the quality of the beans you get from a roasting process like this?  
[00:01:01] When you're roasting coffee, two parameters you get to control are the temperature at which you're heating up the raw coffee beans  
[00:01:09] to turn them into nicely roasted coffee beans, as well as the duration or how long you're going to roast the beans.  
[00:01:16] And in this slightly simplified example, we've created the data sets of different temperatures and different durations,  
[00:01:25] as well as labels showing whether the coffee you roasted is good-tasting coffee,  
[00:01:32] where cross here, the positive class, y equals 1, corresponds to good coffee,  
[00:01:37] and O, the negative class, corresponds to bad coffee.  
[00:01:42] So it looks like a reasonable way to think of this data set is if you cook it at too low a temperature,  
[00:01:50] it doesn't get roasted and ends up undercooked.  
[00:01:54] If you cook it not for long enough, the duration is too short.  
[00:01:58] It's also not a nicely roasted set of beans.  
[00:02:01] And finally, if you were to cook it either for too long or for too high a temperature,  
[00:02:06] then you end up with overcooked beans.  
[00:02:09] They're a little bit burnt beans, and so there's not good coffee either.  
[00:02:12] And there's only points within this little triangle here that corresponds to good coffee.  
[00:02:19] This example is simplified a bit from actual coffee roasting.  
[00:02:23] Even though this example is a simplified one for the purpose of illustration,  
[00:02:29] there have actually been serious projects using machine learning to optimize coffee roasting as well.  
[00:02:35] So the task is, given a feature vector x with both temperature and duration,  
[00:02:41] say 200 degrees Celsius for 17 minutes,  
[00:02:45] how can we do inference in a neural network to get it to tell us whether or not  
[00:02:51] this temperature and duration setting will result in good coffee or not?  
[00:02:56] It looks like this.  
[00:02:59] We're going to set x to be an array of two numbers,  
[00:03:06] the input features 200 degrees Celsius and 17 minutes.  
[00:03:11] Then you create layer 1 as this first hidden layer of the neural network as dense.  
[00:03:19] Open parens units 3, that means 3 units or 3 hidden units in this layer,  
[00:03:25] using as the activation function the sigmoid function.  
[00:03:29] And dense is another name for the layers of a neural network that we've learned about so far.  
[00:03:35] And as you learn more about neural networks, you learn about other types of layers as well.  
[00:03:41] But for now, we'll just use the dense layer,  
[00:03:43] which is the layer type you've learned about in the last few videos for all of our examples.  
[00:03:48] So next, you compute A1 by taking layer 1,  
[00:03:53] which is actually a function and applying this function layer 1 to the values of x.  
[00:03:59] So that's how you get A1,  
[00:04:01] which is going to be a list of three numbers because layer 1 had three units.  
[00:04:06] And so A1 here may, just for the sake of illustration, be 0.2, 0.7, 0.3.  
[00:04:13] Next, for the second hidden layer, layer 2 would be dense of,  
[00:04:18] now this time it has one unit, and again, the sigmoid activation function.  
[00:04:23] And you can then compute A2 by applying this layer 2 function to the activation values from layer 1 to A1.  
[00:04:31] And that will give you the value of A2, which, for the sake of illustration, is maybe 0.8.  
[00:04:37] Finally, if you wish the threshold is at 0.5,  
[00:04:41] then you can just test if A2 is greater than or equal to 0.5  
[00:04:45] and set y hat equals to 1 or 0, positive or negative plus, accordingly.  
[00:04:51] So that's how you do inference in the neural network using TensorFlow.  
[00:04:55] There are some additional details that I didn't go over here,  
[00:04:58] such as how to load the TensorFlow library  
[00:05:01] and how to also load the parameters W and B of the neural network.  
[00:05:07] But we'll go over that in the lab, so please be sure to take a look at the lab.  
[00:05:11] But these are the key steps for propagation and how you compute A1 and A2 and optionally threshold A2.  
[00:05:20] Let's look at one more example, and we're going to go back to the handwritten digit classification problem.  
[00:05:28] In this example, x is a list of the pixel intensity values.  
[00:05:32] So x is equal to a NumPy array of this list of pixel intensity values.  
[00:05:37] And then to initialize and carry out one step before propagation,  
[00:05:42] layer 1 is a dense layer with 25 units and a sigmoid activation function.  
[00:05:49] And you then compute A1 equals the layer 1 function applied to x.  
[00:05:54] To build and carry out inference through the second layer,  
[00:05:59] similarly, you set up layer 2 as follows and then compute A2 as layer 2 applied to A1.  
[00:06:07] And then finally, layer 3 is the third and final dense layer.  
[00:06:13] And then finally, you can optionally threshold A3 to come up with a binary prediction for y hat.  
[00:06:20] So that's the syntax for carrying out inference in TensorFlow.  
[00:06:25] One thing I briefly alluded to is the structure of the NumPy arrays.  
[00:06:30] TensorFlow treats data in a certain way that is important to get right.  
[00:06:35] So in the next video, let's take a look at how TensorFlow handles data.
