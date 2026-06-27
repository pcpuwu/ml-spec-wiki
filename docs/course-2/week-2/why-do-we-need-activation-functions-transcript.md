# Why Do We Need Activation Functions? — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](why-do-we-need-activation-functions.md)

---

[00:00:02] Let's take a look at why neural networks need activation functions, and why they just  
[00:00:08] don't work if we were to use the linear activation function in every neuron in the  
[00:00:14] neural network.  
[00:00:15] Recall this demand prediction example.  
[00:00:19] What would happen if we were to use a linear activation function for all of the nodes in  
[00:00:24] this neural network?  
[00:00:26] It turns out that this big neural network will become no different than just linear  
[00:00:31] regression, and so this would defeat the entire purpose of using a neural network, because  
[00:00:37] it would then just not be able to fit anything more complex than the linear regression model  
[00:00:43] that we learned about in the first course.  
[00:00:46] Let's illustrate this with a simpler example.  
[00:00:51] Let's look at the example of a neural network where the input x is just a number, and we  
[00:00:57] have one hidden unit with parameters w1 and b1 that outputs a1, which is here just a number,  
[00:01:08] and then the second layer is the output layer, and it has also just one output unit with  
[00:01:14] parameters w2 and b2, and that outputs a2, which is also just a number, just a scalar,  
[00:01:21] which is the output of the neural network f of x.  
[00:01:25] Let's see what this neural network would do if we were to use the linear activation function  
[00:01:30] g of z equals z everywhere.  
[00:01:35] To compute a1 as a function of x, the neural network would use a1 equals g of w1 times  
[00:01:44] x plus b1, but g of z is equal to z, so this is just w1 times x plus b1.  
[00:01:55] Then a2 is equal to w2 times a1 plus b2 because g of z equals z, and let me take this expression  
[00:02:06] for a1 and substitute it in there, so that becomes w2 times w1 x plus b1 plus b2, and  
[00:02:20] if we simplify, this becomes w2 w1 times x plus w2 b1 plus b2, and it turns out that  
[00:02:34] if I were to set w equals w2 times w1 and set b equals this quantity over here, then  
[00:02:42] what we've just shown is that a2 is equal to wx plus b.  
[00:02:48] So a2 is just a linear function of the input x, and rather than using a neural network  
[00:02:55] with one hidden layer and one output layer, we might as well have just used a linear regression  
[00:02:59] model.  
[00:03:01] If you're familiar with linear algebra, this result comes from the fact that the linear  
[00:03:06] function of a linear function is itself a linear function, and this is why having multiple  
[00:03:11] layers in a neural network doesn't let the neural network compute any more complex features  
[00:03:16] or learn anything more complex than just a linear function.  
[00:03:21] So in the general case, if you had a neural network with multiple layers like this, and  
[00:03:29] say you were to use a linear activation function for all of the hidden layers, and also use  
[00:03:33] a linear activation function for the output layer, then it turns out this model will compute  
[00:03:40] an output that is completely equivalent to linear regression.  
[00:03:44] The output a4 can be expressed as a linear function of the input features x plus b.  
[00:03:52] Alternatively, if we were to still use a linear activation function for all the hidden layers,  
[00:03:59] for these three hidden layers here, but we were to use a logistic activation function  
[00:04:04] for the output layer, then it turns out you can show that this model becomes equivalent  
[00:04:10] to logistic regression, and a4, in this case, can be expressed as 1 over 1 plus e to the  
[00:04:18] negative wx plus b for some values of w and b.  
[00:04:22] And so this big neural network doesn't do anything that you can't also do with logistic  
[00:04:28] regression.  
[00:04:29] That's why a common rule of thumb is don't use the linear activation function in the  
[00:04:32] hidden layers of your neural network, and in fact I recommend typically using the Rayleigh  
[00:04:38] activation function should do just fine.  
[00:04:41] So that's why a neural network needs activation functions other than just the linear activation  
[00:04:47] function everywhere.  
[00:04:50] So far, you've learned to build neural networks for binary classification problems, where  
[00:04:55] y is either 0 or 1, as well as for regression problems, where y can take negative or positive  
[00:05:02] values, or maybe just positive and non-negative values.  
[00:05:06] In the next video, I'd like to share with you a generalization of what you've seen  
[00:05:11] so far for classification, in particular, when y doesn't just take on two values, but  
[00:05:19] may take on 3 or 4 or 10 or even more categorical values.  
[00:05:25] Let's take a look at how you can build a neural network for that type of classification problem.
