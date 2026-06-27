# Choosing Activation Functions — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](choosing-activation-functions.md)

---

[00:00:01] Let's take a look at how you can choose the activation function for different neurons in your neural network.  
[00:00:08] We'll start with some guidance for how to choose it for the output layer.  
[00:00:12] It turns out that depending on what the target label or the ground truth label Y is,  
[00:00:17] there will be one fairly natural choice for the activation function for the output layer.  
[00:00:23] And we'll then go and look at the choice of the activation function also for the hidden layers of your neural network.  
[00:00:30] Let's take a look.  
[00:00:31] You can choose different activation functions for different neurons in your neural network.  
[00:00:37] And when considering the activation function for the output layer,  
[00:00:42] it turns out that there'll often be one fairly natural choice depending on what is the target or the ground truth label Y.  
[00:00:52] Specifically, if you are working on a classification problem where Y is either 0 or 1,  
[00:00:59] so a binary classification problem,  
[00:01:01] then the sigmoid activation function will almost always be the most natural choice  
[00:01:07] because then the neural network learns to predict the probability that Y is equal to 1,  
[00:01:13] just like we had for logistic regression.  
[00:01:16] So my recommendation is if you're working on a binary classification problem,  
[00:01:20] use sigmoid at the output layer.  
[00:01:23] Alternatively, if you're solving a regression problem,  
[00:01:27] then you might choose a different activation function.  
[00:01:30] For example, if you're trying to predict how tomorrow's stock price will change compared to today's stock price,  
[00:01:38] well, it can go up or down.  
[00:01:40] And so in this case, Y would be a number that can be either positive or negative.  
[00:01:45] And in that case, I would recommend you use the linear activation function.  
[00:01:50] Why is that?  
[00:01:51] Well, that's because then the output of your neural network, f of X,  
[00:01:55] which is equal to A3 in the example above,  
[00:01:58] would be G applied to Z3.  
[00:02:01] And with the linear activation function, G of Z can take on either positive or negative values.  
[00:02:08] So Y can be positive or negative.  
[00:02:10] Use the linear activation function.  
[00:02:12] And finally, if Y can only take on non-negative values,  
[00:02:17] such as if you're predicting the price of a house,  
[00:02:20] that can never be negative,  
[00:02:22] then the most natural choice would be the ReLU activation function,  
[00:02:26] because as you see here, this activation function only takes on non-negative values,  
[00:02:31] either zero or positive values.  
[00:02:33] So when choosing the activation function to use for your output layer,  
[00:02:38] usually, depending on what is the label Y you're trying to predict,  
[00:02:42] there'll be one fairly natural choice.  
[00:02:45] And in fact, the guidance on this slide is how I pretty much always choose my activation function as well  
[00:02:52] for the output layer of a neural network.  
[00:02:54] How about the hidden layers of a neural network?  
[00:02:58] It turns out that the ReLU activation function is by far the most common choice  
[00:03:04] in how neural networks are trained by many, many practitioners today.  
[00:03:10] Even though we had initially described neural networks using the sigmoid activation function,  
[00:03:16] and in fact, in the early history of the development of neural networks,  
[00:03:20] people use sigmoid activation functions in many places,  
[00:03:24] the field has evolved to use ReLU much more often and sigmoids hardly ever.  
[00:03:31] With the one exception that you do use a sigmoid activation function in the output layer  
[00:03:36] if you have a binary classification problem.  
[00:03:38] So why is that? Well, there are a few reasons.  
[00:03:41] First, if you compare the ReLU and the sigmoid activation functions,  
[00:03:46] the ReLU is a bit faster to compute because it just requires computing max of 0, z,  
[00:03:53] whereas the sigmoid requires taking an exponentiation and an inverse and so on,  
[00:03:58] so it's a little bit less efficient.  
[00:04:00] But the second reason, which turns out to be even more important,  
[00:04:04] is that the ReLU function kind of goes flat.  
[00:04:08] Only in one part of the graph, here on the left, is completely flat.  
[00:04:13] Whereas the sigmoid activation function, it kind of goes flat in two places.  
[00:04:18] It goes flat to the left of the graph and it goes flat to the right of the graph.  
[00:04:26] And if you're using gradient descent to train a neural network,  
[00:04:29] then when you have a function that is flat in a lot of places,  
[00:04:34] gradient descent will be really slow.  
[00:04:38] I know that gradient descent optimizes the cost function J of WB  
[00:04:43] rather than optimizes the activation function,  
[00:04:46] but the activation function is a piece of what goes into computing.  
[00:04:51] And that results in more places in the cost function J of WB  
[00:04:55] that are flat as well and with a smaller gradient and it slows down learning.  
[00:05:01] I know that that was just an intuitive explanation,  
[00:05:04] but researchers have found that using the ReLU activation function  
[00:05:08] can cause your neural network to learn a bit faster as well,  
[00:05:12] which is why for most practitioners, if you're trying to decide  
[00:05:15] what activation function to use for the hidden layer,  
[00:05:18] the ReLU activation function has become now by far the most common choice.  
[00:05:23] And in fact, if I'm building a neural network,  
[00:05:25] this is how I choose activation functions for the hidden layers as well.  
[00:05:30] So to summarize, here's what I recommend  
[00:05:33] in terms of how you choose the activation functions for your neural network.  
[00:05:38] For the output layer, use a sigmoid if you have a binary classification problem,  
[00:05:44] linear if Y is a number that can take on positive or negative values,  
[00:05:49] or use ReLU if Y can take on only positive values  
[00:05:53] or zero positive values or non-negative values.  
[00:05:56] Then for the hidden layers, I would recommend just using ReLU  
[00:06:01] as the default activation function.  
[00:06:04] And in TensorFlow, this is how you would implement it.  
[00:06:08] Rather than saying activation equals sigmoid as we had previously,  
[00:06:13] you can then for the hidden layers, that's the first hidden layer,  
[00:06:17] the second hidden layer, ask TensorFlow to use the ReLU activation function.  
[00:06:22] And then for the output layer, in this example,  
[00:06:26] I've asked it to use the sigmoid activation function,  
[00:06:29] but if you wanted to use the linear activation function instead,  
[00:06:34] that's the syntax for it.  
[00:06:36] Or if you wanted to use the ReLU activation function,  
[00:06:39] that shows the syntax for it.  
[00:06:42] With this richer set of activation functions,  
[00:06:45] you'd be well-positioned to build much more powerful neural networks  
[00:06:49] than just once using only the sigmoid activation function.  
[00:06:53] By the way, if you look at the research literature,  
[00:06:56] you sometimes hear of authors using even other activation functions,  
[00:07:01] such as the tanh activation function or the leaky ReLU activation function  
[00:07:06] or the swish activation function.  
[00:07:09] Every few years, researchers sometimes come up with another interesting  
[00:07:13] activation function, and sometimes they do work a little bit better.  
[00:07:17] For example, I've used the leaky ReLU activation function a few times in my work,  
[00:07:22] and sometimes it works a little bit better than the ReLU activation function  
[00:07:26] you've learned about in this video.  
[00:07:28] But I think for the most part, and for the vast majority of applications,  
[00:07:33] what you learned about in this video would be good enough.  
[00:07:36] Of course, if you want to learn more about other activation functions,  
[00:07:41] feel free to look on the Internet.  
[00:07:43] And there are just a small handful of cases where these other activation functions  
[00:07:47] could be even more powerful as well.  
[00:07:51] With that, I hope you also enjoy practicing these ideas,  
[00:07:56] these activation functions in the optional labs and in the practice labs.  
[00:08:00] But this raises yet another question.  
[00:08:03] Why do we even need activation functions at all?  
[00:08:06] Why don't we just use the linear activation function  
[00:08:09] or use no activation function anywhere?  
[00:08:12] It turns out this does not work at all.  
[00:08:15] And in the next video, let's take a look at why that's the case  
[00:08:19] and why activation functions are so important for getting your neural networks to work.
