# Linear Regression Model, Part 2 — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](linear-regression-model-part-2.md)

---

[00:00:01] Let's look in this video at the process of how supervised learning works.  
[00:00:06] Supervised learning algorithm will input the data set, and then what exactly does it do and what does it output?  
[00:00:12] Let's find out in this video.  
[00:00:14] Recall that a training set in supervised learning includes both the input features, such as the size of the hulls,  
[00:00:21] and also the output targets such as the price of the hulls.  
[00:00:25] The output targets are the right answers that the model will learn from.  
[00:00:29] To train the model, you feed the training set, both the input features and the output targets to your learning algorithm.  
[00:00:39] Then, your supervised learning algorithm will produce some function.  
[00:00:44] We'll write this function as lowercase F, where F stands for function.  
[00:00:50] Historically, this function used to be called a hypothesis, but I'm just going to call it a function F in this class.  
[00:00:57] And the job of F is to  
[00:01:00] take a new input x and output an estimate or prediction, which I'm going to call y hat.  
[00:01:10] And it's written like the variable y with this little hat symbol on top.  
[00:01:18] In machine learning, the convention is that y hat is the estimate or the prediction for y-hat.  
[00:01:26] The function f is called the model.  
[00:01:31] X is called the input or the input feature, and the output of the model is the prediction Y hat.  
[00:01:40] The model's prediction is the estimated value of Y.  
[00:01:45] When the symbol is just a letter Y, then that refers to the target, which is the actual true value in the training set.  
[00:01:55] In contrast, Y hat is an estimate. It may or may not be the actual true value.  
[00:02:02] Well, if you have a high hat is an estimate, it may not be the actual true value. Well,  
[00:02:02] helping your client to sell the hulls, well, the true price of the hulls is unknown until they sell it.  
[00:02:09] So your model F, given the size, all puts the price, which is the estimated, that is the prediction of what  
[00:02:16] the true price will be. Now, when we design a learning algorithm, a key question is, how are we going  
[00:02:25] to represent the function F? Or, in other words, what is the math formula we're going to use to compute  
[00:02:33] F. For now, let's stick with F being a straight line. So your function can be written as  
[00:02:41] F-subscript W-coma-B of x equals, I'm going to use W times x plus b. I'll define W and B soon,  
[00:02:54] but for now, just know that W and B are numbers, and the values chosen for W and B will determine  
[00:03:02] in the prediction Y hat based on the input feature X.  
[00:03:08] So this FWB of X means F is a function that takes X's input input, and depending on the values of W and B,  
[00:03:17] F will output some value of a prediction Y hat.  
[00:03:23] As an alternative to writing this FW comma B of X, I'll sometimes just write FW, F of X, I'll sometimes  
[00:03:30] just write F of X without explicitly  
[00:03:33] including W and B in the substrate. It's just a simple notation, but means exactly the same thing  
[00:03:39] as FWB of X. Let's plot the trading set on the draft where the input feature X is on the horizontal  
[00:03:47] axis and the output target Y is on the vertical axis. Remember, the algorithm learns from this  
[00:03:56] data and generates a best fit line, like maybe this one here. This straight line is  
[00:04:04] the linear function f wb of x equals w times x plus b or more simply we can drop w and b and just  
[00:04:16] write f of x equals w x plus b. Here's what this function is doing is making predictions for the  
[00:04:24] value of y using a straight line function of x. So you may ask why are we choosing a linear function,  
[00:04:32] where linear function is just a fancy term for a straight line instead of some nonlinear  
[00:04:37] function like a curve for a parabola. Well, sometimes you want to fit more complex nonlinear functions  
[00:04:44] as well, like a curve like this, but since this linear function is relatively simple and easy to  
[00:04:50] work with, let's use a line as a foundation that will eventually help you to get to more complex  
[00:04:57] models that are nonlinear. This particular model as a name is a name,  
[00:05:02] is called linear regression. More specifically, this is linear regression with one variable,  
[00:05:08] where the phrase one variable means that there's a single input variable or feature x, namely  
[00:05:14] the size of the hulls. Another name for a linear model with one input variable is univariate linear  
[00:05:22] regression, where uni means one in Latin, and where variate means variable. So univariates is just a  
[00:05:31] a fancy way of saying one variable. In a later video, you also see a variation of regression  
[00:05:37] where you want to make a prediction based not just on the size of a hulls, but on a bunch of other  
[00:05:43] things that you may know about the hulls, such as a number of bedrooms and other features.  
[00:05:48] And by the way, when you're done with this video, there is another optional app. You don't need  
[00:05:54] to write any code. Just review it, run the code and see what it does that will show you how to define in  
[00:06:00] Python a straight line function. And the lab will let you choose the values of W&B to try to fit  
[00:06:08] the training data. You don't have to do the lab if you don't want to, but I hope you play of it  
[00:06:14] when you're done watching this video. So that's linear regression. In order for you to make this work,  
[00:06:20] one of the most important things you have to do is construct a cost function. The idea of a cost  
[00:06:26] function is one of the most universal and important ideas in machine learning.  
[00:06:30] and is used in both linear regression and in training many of the most advanced AI models in the world.  
[00:06:37] So let's go on to the next video and take a look at how you can construct a cost function.
