# Alternatives to the Sigmoid Activation — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](alternatives-to-the-sigmoid-activation.md)

---

[00:00:02] So far, we've been using the sigmoid activation function in all the nodes, in the hidden layers, and in the output layer.  
[00:00:10] And we had started that way because we were building up neural networks by taking logistic regression,  
[00:00:17] and creating a lot of logistic regression units and stringing them together.  
[00:00:22] But if you use other activation functions, your neural network can become much more powerful.  
[00:00:28] Let's take a look at how to do that.  
[00:00:30] Recall the demand prediction example from last week, where given price, shipping cost, marketing, and material,  
[00:00:36] you would try to predict if something is highly affordable, if there's good awareness, and high perceived quality,  
[00:00:43] and based on that, try to predict if it's a top seller.  
[00:00:46] But this assumes that awareness is maybe binary, as either people are aware or they are not.  
[00:00:54] But it seems like the degree to which possible buyers are aware of the t-shirt you're selling may not be binary.  
[00:01:02] They can be a little bit aware, somewhat aware, extremely aware, or it could have gone completely viral.  
[00:01:08] So rather than modeling awareness as a binary number, 0, 1, that you try to estimate the probability of awareness,  
[00:01:16] or rather than modeling awareness as just a number between 0 and 1,  
[00:01:20] maybe awareness should be any non-negative number, because there can be any non-negative value of awareness,  
[00:01:27] going from 0 up to very, very large numbers.  
[00:01:31] So whereas previously we had used this equation to calculate the activation of that second hidden unit,  
[00:01:40] estimating awareness, where g was the sigmoid function and thus goes between 0 and 1,  
[00:01:47] if you want to allow A12 to potentially take on much larger positive values,  
[00:01:54] we can instead swap in a different activation function.  
[00:01:58] It turns out that a very common choice of activation function in neural networks is this function.  
[00:02:05] It looks like this. It goes, if z is this, then g of z is 0 to the left,  
[00:02:14] and then it's this straight line, 45 degrees to the right of 0.  
[00:02:19] And so when z is greater than or equal to 0, g of z is just equal to z.  
[00:02:27] That is to the right half of this diagram.  
[00:02:31] And the mathematical equation for this is g of z equals max of 0, z.  
[00:02:38] Feel free to verify for yourself that max of 0, z results in this curve that I've drawn over here.  
[00:02:49] And if A12 is g of z for this value of z,  
[00:02:54] then A, the activation value, can now take on 0 or any non-negative value.  
[00:03:01] This activation function has a name. It goes by the name ReLU with this funny capitalization.  
[00:03:09] And ReLU stands for, again, a somewhat arcane term, but it stands for rectified linear unit.  
[00:03:16] Don't worry too much about what rectified means or what linear unit means.  
[00:03:20] This was just a name that the authors had given to this particular activation function when they came up with it.  
[00:03:26] But most people in deep learning just say ReLU to refer to this g of z.  
[00:03:32] More generally, you have a choice of what to use for g of z,  
[00:03:38] and sometimes we'll use a different choice than the sigmoid activation function.  
[00:03:42] Here are the most commonly used activation functions.  
[00:03:47] You saw the sigmoid activation function, g of z, equals the sigmoid function.  
[00:03:52] On the last slide, we just looked at the ReLU, or rectified linear unit, g of z equals max of 0, z.  
[00:04:00] There's one other activation function which is worth mentioning, which is called the linear activation function,  
[00:04:06] which is just g of z equals to z.  
[00:04:09] Sometimes if you use the linear activation function, people will say,  
[00:04:13] we're not using any activation function because if a is g of z, where g of z equals z,  
[00:04:21] then a is just equal to this, w dot x plus b, say.  
[00:04:26] And so it's as if there was no g in there at all.  
[00:04:29] So when you are using this linear activation function, g of z,  
[00:04:34] sometimes people will say, well, we're not using any activation function.  
[00:04:38] Although in this class, I will refer to using the linear activation function rather than no activation function.  
[00:04:45] But if you hear someone else use that terminology, that's what they mean.  
[00:04:48] It just refers to the linear activation function.  
[00:04:51] And these three are probably by far the most commonly used activation functions in neural networks.  
[00:04:59] Later this week, we'll touch on the fourth one called the softmax activation function.  
[00:05:05] But with these activation functions, you'll be able to build a rich variety of powerful neural networks.  
[00:05:12] So when building a neural network, for each neuron, do you want to use the sigmoid activation function  
[00:05:19] or the regular activation function or a linear activation function?  
[00:05:23] How do you choose between these different activation functions?  
[00:05:27] Let's take a look at that in the next video.
