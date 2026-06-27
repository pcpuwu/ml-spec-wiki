# Logistic Regression — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](logistic-regression.md)

---

[00:00:00] Let's talk about logistic repression, which is probably the single most widely used classification algorithm in the world.  
[00:00:07] This is something that I use all the time in my work.  
[00:00:10] Let's continue with the example of classifying whether a tumor is malignant,  
[00:00:16] where, as before, we're going to use the label 1 or yes, the positive class to represent malignant tumors,  
[00:00:22] and 0 or no or negative examples to represent benign tumors.  
[00:00:27] Here's a graph of the dataset, where the horizontal axis,  
[00:00:31] is the tumor size, and the vertical axis takes on only values of 0 and 1,  
[00:00:37] because it's a classification problem.  
[00:00:41] You saw in the last video that linear regression is not a good algorithm for this problem.  
[00:00:46] In contrast, what logistic regression will end up doing is fit a curve that looks like this,  
[00:00:54] a sort of S-shaped curve to this dataset.  
[00:00:59] And so, for this example, if a patient comes  
[00:01:02] in with a tumor of this size, which I'm showing on the x-axis, then the algorithm will output  
[00:01:09] 0.7, suggesting that it's closer or maybe more likely to be malignant than benign.  
[00:01:17] We'll say more later what 0.7 actually means in this context, but the output label Y is never  
[00:01:24] 0.7, is only ever 0 or 1. To build up to the logistic regression algorithm,  
[00:01:32] There's an important mathematical function I'd like to describe,  
[00:01:36] which is called the sigmoid function, sometimes also referred to as the logistic function.  
[00:01:43] The sigmoid function looks like this.  
[00:01:46] Notice that the x-axis of the graphs on the left and right are different.  
[00:01:51] In the graph to the left, on the x-axis is the tumor size, so it's all positive numbers.  
[00:01:58] Whereas in the graph on the right, you have zero down here,  
[00:02:02] and the horizontal axis takes on both negative and positive values,  
[00:02:09] and I've labeled the horizontal axis Z.  
[00:02:12] And I'm showing here just a range of negative 3 to plus 3.  
[00:02:18] So the sigma function outputs values between 0 and 1.  
[00:02:22] And if I use G of Z to denote this function,  
[00:02:26] then the formula of G of Z is equal to 1 over 1 plus e to the negative z  
[00:02:33] Where here, E is a mathematical constant that takes on the value of about 2.7,  
[00:02:39] and so E to the negative Z is that mathematical constant to the power of negative Z.  
[00:02:46] Notice if Z were really big, say 100.  
[00:02:50] E to the negative Z is E to the negative 100, which is a tiny, tiny number.  
[00:02:58] So this ends up being 1 over 1 plus a tiny little number.  
[00:03:03] And so the denominator,  
[00:03:05] will be basically very, very close to 1, which is why, when Z is large, G of Z, that  
[00:03:12] is a sigma function of Z, is going to be very close to 1.  
[00:03:18] And conversely, you can also check for yourself that when Z is a very large negative number,  
[00:03:26] then G of Z becomes 1 over a giant number, which is why G of Z is very close to 0.  
[00:03:35] So that's why the sigmoid function has this shape, where it starts very close to 0 and slowly builds up or grows to the value of 1.  
[00:03:46] Also, in the sigmoid function, when z is equal to 0, then e to negative z is e to negative 0, which is equal to 1.  
[00:03:56] And so G of z is equal to 1 over 1 plus 1, which is 0.5.  
[00:04:05] So that's why it pauses the vertical axis at 0.5.  
[00:04:11] Now let's use this to build up to the logistic regression algorithm.  
[00:04:15] We're going to do this in two steps.  
[00:04:18] In the first step, I hope you remember that a straight line function, like a linear regression function,  
[00:04:25] can be defined as w.  
[00:04:27] .product of x plus b.  
[00:04:30] So let's store this value in a variable, which I'm going to call,  
[00:04:35] which I'm going to call z.  
[00:04:37] And this will turn out to be the same z as the one you saw on the previous slide,  
[00:04:41] but we'll get to that in a minute.  
[00:04:44] The next step then is to take this value of z  
[00:04:48] and pass it to the sigmoid function, also called the logistic function,  
[00:04:54] G.  
[00:04:55] So now, g of z, then outputs the value computed by this formula,  
[00:05:01] 1 over 1 plus e to negative z,  
[00:05:04] that's going to be between 0 and 1.  
[00:05:06] When you take these two equations and put them together,  
[00:05:11] they then give you the logistic regression model  
[00:05:15] f of x, which is equal to  
[00:05:19] g of wx plus b, or  
[00:05:23] equivalently g of z,  
[00:05:26] which is equal to this formula over here.  
[00:05:31] So this is the logistic regression model.  
[00:05:35] And what it does is it inputs  
[00:05:38] a feature or set of features x, and it outputs a number between 0 and 1.  
[00:05:45] Next, let's take a look at how to interpret the output of logistic regression.  
[00:05:50] We'll return to the tumor classification example.  
[00:05:55] The way I'd encourage you to think of logistic regression's output  
[00:05:59] is to think of it as outputting the probability that the class or the label Y  
[00:06:05] will be equal to 1 given a certain input x.  
[00:06:09] So, for example, in this application where x is the tumor size and y is either 01,  
[00:06:17] if you have a patient come in and she has a tumor of a certain size x,  
[00:06:22] and if, based on this input x, the model outputs 0.7,  
[00:06:28] then what that means is that the model is predicting or the model thinks  
[00:06:34] there's a 70% chance that the true label y will be equal to 1 for this patient.  
[00:06:39] one for this patient. In other words, the model is telling us that it thinks the patient  
[00:06:45] has a 70% chance of their tumor turning out to be malignant. Now, let me ask you a question.  
[00:06:53] See if you can get this right. We know that Y has to be either 0 or 1. So if Y has a 70% chance  
[00:07:03] of being 1, what is the chance that it is 0? So why has got to be either 0 or 1?  
[00:07:11] and thus the probability of it being 0 or 1,  
[00:07:15] these two numbers have to add up to 1 or to 100% chance.  
[00:07:20] So that's why if the chance of Y being 1 is 0.7 or 70% chance,  
[00:07:25] then the chance of it being 0 has got to be 0.3 or 30% chance.  
[00:07:32] If someday you read research papers or blog polls about  
[00:07:35] legislation regression, sometimes you see this notation that f of x is equal,  
[00:07:41] to p of y equals 1 given the input features x and with parameters W and B.  
[00:07:51] What the semicolon here is used to denote is just that  
[00:07:55] W and B are parameters that affect this computation of what is the probability of  
[00:08:01] y be equal to 1 given the input feature x. For the purpose of this clause,  
[00:08:07] don't worry too much about what this vertical line and what the semicolon mean. You  
[00:08:12] You don't need to remember or follow any of this mathematical notation for this class.  
[00:08:17] I'm mentioning this only because you may see this in other places.  
[00:08:21] In the optional lab that follows this video, you also get to see how the sigmoid function is implemented  
[00:08:27] in code.  
[00:08:28] You can see a plot that uses the sigmoid function so as to do better on the classification  
[00:08:34] tasks that you saw in the previous optional lab.  
[00:08:37] Remember that the code will be provided to you, so you just have to run it.  
[00:08:41] I hope you take a look and get familiar with the code.  
[00:08:45] So, congrats on getting here.  
[00:08:47] You now know what is the Logistic Regression model,  
[00:08:51] as was the mathematical formula that defines logistic regression.  
[00:08:56] For a long time, a lot of internet advertising  
[00:08:59] was actually driven by basically a slight variation of logistic regression.  
[00:09:04] This was very lucrative for some large companies,  
[00:09:07] and this was basically the algorithm that decided what ad was shown to you and  
[00:09:10] many others on some large websites.  
[00:09:12] websites.  
[00:09:13] Now, there's even more to learn about this algorithm.  
[00:09:17] In the next video, we'll take a look at the details of  
[00:09:20] logistic regression.  
[00:09:22] We'll look at some visualizations and also examine something called the  
[00:09:26] decision boundary.  
[00:09:28] This would give you a few different ways to map the numbers that this model outputs,  
[00:09:33] such as 0.3 or 0.7 or 0.65, to a prediction of whether Y is actually 0 or 1 or 1.  
[00:09:41] So let's go on to the next video to learn more about logistic regression.
