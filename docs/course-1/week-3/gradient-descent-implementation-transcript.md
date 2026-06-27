# Gradient Descent Implementation — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](gradient-descent-implementation.md)

---

[00:00:01] To fit the parameters of a logistic regression model,  
[00:00:05] we're going to try to find the values of the parameters W&B  
[00:00:08] that minimize the cost function J of W&B.  
[00:00:12] And we're getting applied gradient descent to do this.  
[00:00:15] Let's take a look at how.  
[00:00:18] In this video, we'll focus on how to find a good choice of the parameters W&B.  
[00:00:24] After you've done so, if you give the model a new input,  
[00:00:28] say a new patient at the hospital with a certain tumor size and age,  
[00:00:34] then it's a diagnosis.  
[00:00:36] The model can then make a prediction,  
[00:00:39] or it can try to estimate the probability that the label Y is 1.  
[00:00:46] The algorithm you can use to minimize the cost function is gradient descent.  
[00:00:51] Here again is the cost function,  
[00:00:54] and so if you want to minimize the cost J as a function of W  
[00:00:58] and B, well, here's the usual gradient descent algorithm,  
[00:01:03] where you repeatedly update each parameter as the O value minus alpha, the learning rate,  
[00:01:10] times this derivative term.  
[00:01:15] Let's take a look at the derivative of J with respect to WJ, this term up on top here,  
[00:01:22] where as usual, j goes from 1 through n, where n is the number of features. If someone were to  
[00:01:29] apply the rules of calculus, you can show that the derivative, for respect to WJ,  
[00:01:35] of the cost function capital J, is equal to this expression over here.  
[00:01:40] It's 1 over m times the sum from 1 through m of this error term, that is f minus the label Y,  
[00:01:52] times xj. Here, this xI.J is the j feature of the j feature of  
[00:02:00] of training example i. Now, let's also look at the derivative of j with respect to the  
[00:02:07] parameters of b. It turns out to be this expression over here, and it's quite similar  
[00:02:13] to the expression above, except that it is not multiplied by this x-superstrip i-subscript j  
[00:02:20] at the end. So, just as a reminder, similar to what you saw for linear regression, the way to carry  
[00:02:27] out these updates is to use simultaneous updates, meaning that  
[00:02:31] you would first compute the right-hand sign for all of these updates,  
[00:02:35] and then simultaneously overwrite all the values on the left at the same time.  
[00:02:41] So let me take these derivative expressions here and plug them into these terms here.  
[00:02:50] This gives you gradient descent for logistic regression.  
[00:02:55] Now, one funny thing you might be wondering is, huh?  
[00:03:00] That's weird.  
[00:03:01] These two equations look exactly.  
[00:03:03] like the algorithm we had come up with previously for linear regression.  
[00:03:07] So you might be wondering, is linear regression actually secretly the same as logistic regression?  
[00:03:13] Well, even though these equations look the same, the reason that this is not linear regression  
[00:03:21] is because the definition for the function f of x has changed.  
[00:03:25] In linear regression, f of x is this is wx plus b, but in logistic regression,  
[00:03:33] f of x is defined to be the sigmoid function applied to wx plus b.  
[00:03:39] So although the algorithm written looked the same for both linear regression and logistic regression,  
[00:03:45] actually there are two very different algorithms because the definition for f of x is not the same.  
[00:03:53] When we talked about gradient descent for linear regression previously,  
[00:03:57] you saw how you can monitor gradient descent to make sure it converges.  
[00:04:02] You can just apply the same.  
[00:04:03] apply the same method for logistic regression to make sure it also converges.  
[00:04:08] I've written out these updates as if you're updating the parameters WJ1 parameter at the time.  
[00:04:17] Similar to the discussion on vectorized implementations of linear regression,  
[00:04:26] you can also use vectorization to make gradient descent run faster for logistic regression.  
[00:04:33] I won't dive into the details of the vectorized implementation.  
[00:04:35] the vectorized implementation in this video,  
[00:04:38] but you can also learn more about it and see the code in the optional labs.  
[00:04:42] So now, you know, how to implement gradient descent for logistic regression.  
[00:04:47] You might also remember feature scaling when we were using linear regression,  
[00:04:54] where you saw how feature scaling that is scaling all the features to take on similar ranges of values,  
[00:05:00] say between negative 1 and plus 1, how that can help gradient descent to converge faster.  
[00:05:05] faster. Feature scaling applied the same way to scale the different features to take on similar ranges of values, can also speed up gradient descent for logistic regression.  
[00:05:15] In the upcoming optional lab, you also see how the gradient for logistic regression can be calculated in code.  
[00:05:25] This would be useful to look at because you also implement this in the practice lab at the end of this week.  
[00:05:31] After you run gradient descent in this lab, the  
[00:05:35] be a nice set of animated plots that show gradient descent in action.  
[00:05:39] You see the sigmoid function, the contour plot of the cost, the 3D surface plot of the cost,  
[00:05:45] and the learning curve all evolve as gradient descent runs.  
[00:05:49] There will be another optional lab after that, which is short and sweet, but also very useful,  
[00:05:55] because they'll show you how to use the popular Psycho Learn library  
[00:05:59] to train the logistic regression model for classification.  
[00:06:03] Many machine learning practitioners in many companies today use Psycote Learn regularly as part of their job.  
[00:06:11] And so I hope you check out the PsyCat Learn function as well and take a look at how that is used.  
[00:06:17] So that's it. You now know how to implement logistic regression.  
[00:06:22] This is a very powerful, very widely used learning algorithm and you now know how to get it to work yourself.  
[00:06:28] Congratulations.
