# Decision Boundary — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](decision-boundary.md)

---

[00:00:01] In the last video, you learned about the Logistic Regression model.  
[00:00:05] Now, let's take a look at the decision boundary to get a better sense of how  
[00:00:10] logistic regression is computing its predictions. To recap, here's how the Logistic Regression  
[00:00:16] models outputs are computed in two steps. In the first step, you compute Z as w.  
[00:00:24] dot x plus b, then you apply the sigmoid function g to this value z, and here again is the formula for  
[00:00:33] the sigmoid function. Another way to write this is we can say f of x is equal to g, the sigmoid function,  
[00:00:42] also called the logistic function, apply to w.x plus b, where this is of course the value of  
[00:00:51] z. And if you take the definition of the sigmoi function and plug in the definition of z,  
[00:00:59] then you find that f of x is equal to this formula over here, 1 over 1 plus e to the negative  
[00:01:08] z, where z is wx plus b. And you may remember we say in the previous video that we interpret this  
[00:01:15] as the probability that y is equal to 1, given x, and with parameters wx,  
[00:01:21] w and b, and so this is going to be a number, like maybe 0.7 or 0.3.  
[00:01:27] Now, what if you want the learning algorithm to predict? Is the value of y going to be 0 or 1?  
[00:01:35] Well, one thing you might do is set a threshold above which you predict  
[00:01:40] why is 1, or you set y hat to prediction to be equal to 1,  
[00:01:45] and below which you might say y hat, my prediction, is going to be equal to 0.  
[00:01:51] So a common choice would be to pick a threshold of 0.5,  
[00:01:56] so that if f of x is greater than or equal to 0.5, then predict y is 1.  
[00:02:03] and we write that prediction as y hat equals 1.  
[00:02:06] Or if f of x is less than 0.5, then predict y is 0.  
[00:02:11] Or in other words, the prediction, y hat is equal to 0.  
[00:02:15] So now let's dive deeper into when the model would predict 1.  
[00:02:19] In other words, when is f of x greater than  
[00:02:22] than or equal to 0.5.  
[00:02:25] We'll recall that f of x is just equal to g of z.  
[00:02:30] And so f is greater than or equal to 0.5,  
[00:02:34] whenever g of z is greater than or equal to 0.5.  
[00:02:38] But when is g of z greater than equal to 0.5?  
[00:02:43] Well, here's the sigmoid function over here.  
[00:02:47] And so g of z is greater than or equal to 0.5.  
[00:02:52] whenever z is greater than or equals to 0, right?  
[00:02:57] That is, whenever z is on the right half of this axis.  
[00:03:03] And finally, when is z greater than or equal to 0?  
[00:03:06] Well, z is equal to w.  
[00:03:09] .x plus b.  
[00:03:11] And so z is greater than equal to 0  
[00:03:15] whenever w.x plus b is greater than or equal to 0.  
[00:03:20] So to recap, what you've seen here  
[00:03:23] is that the model predicts 1 whenever w.  
[00:03:28] .x plus b is greater than or equal to 0.  
[00:03:33] And conversely, when w.  
[00:03:36] .x plus b is less than 0, the algorithm predicts y is 0.  
[00:03:43] So given this, let's now visualize how the model makes predictions.  
[00:03:49] I'm going to take an example of a classification problem,  
[00:03:53] where you have two features.  
[00:03:54] x1 and x2 instead of just one feature.  
[00:03:59] Here's a training set where the little red crosses denote the positive examples,  
[00:04:04] and the little blue circles denote negative examples.  
[00:04:08] So the red crosses corresponds to y equals 1,  
[00:04:13] and the blue circles correspond to y equals 0.  
[00:04:18] So the logistic regression model will make predictions using this function.  
[00:04:24] F of x equals G.  
[00:04:25] of z where z is now this expression over here w1 x1 plus w2 x2 plus b because we have two features x1 and x2.  
[00:04:37] And let's just say for this example that the value of the parameters are w1 equals 1,  
[00:04:45] w2 equals 1, and b equals negative 3. And let's not take a look at how logistic regression makes predictions.  
[00:04:55] In particular, let's figure out when wx plus b is greater than equal to 0,  
[00:05:00] and when wx plus b is less than 0.  
[00:05:04] To figure that out, there's a very interesting line to look at,  
[00:05:08] which is when wx plus b is exactly equal to 0.  
[00:05:13] It turns out that this line is also called the decision boundary,  
[00:05:20] because that's the line where you're just almost neutral about whether y is 0 or y is 1.  
[00:05:26] Now, for the values of the parameters w1, 2, and b that we had written down above,  
[00:05:35] this decision boundary is just x1 plus x2 minus 3.  
[00:05:43] And so when is x1 plus x2 minus 3 equal to 0?  
[00:05:49] Well, that will correspond to the line x1 plus x2 equals 3.  
[00:05:56] And that is this line.  
[00:05:58] line shown over here. And so this line turns out to be the decision boundary, where if the  
[00:06:07] features x are to the right of this line,  
[00:06:10] logistic regression would predict 1, and to the left of this line,  
[00:06:15] logistic repression would predict 0. In other words, what we have just  
[00:06:22] visualize is the decision boundary for logistic regression when the parameters W1, w2, and  
[00:06:30] are 1-1 and negative 3. Of course, if you had a different choice of the parameters,  
[00:06:36] the decision boundary would be a different line. Now, let's look at a more complex example  
[00:06:42] where the decision boundary is no longer a straight line. As before, crosses denote the class  
[00:06:49] y equals 1, and the little circles denote the class y equals 0. Earlier last week, you saw  
[00:06:59] how to use polynomials in linear regression.  
[00:07:03] And you can do the same in logistic regression.  
[00:07:07] So let's set z to be W1 x1 squared plus w2 x2 squared plus b,  
[00:07:16] with this choice of features, polynomial features, into logistic regression.  
[00:07:21] So f of x, which equals g of z, is now g of this expression over here.  
[00:07:27] And let's say that we end up choosing w1 and w2  
[00:07:30] to be 1, and b to be negative 1.  
[00:07:34] So z is equal to 1 times x1 squared plus 1 times x2 squared minus 1.  
[00:07:42] And the decision boundary, as before, will correspond to when z is equal to 0,  
[00:07:49] and so this expression will be equal to 0 when x1 squared plus x2 squared is equal to 1.  
[00:07:56] And if you plot on the diagram on the left, the curve corresponds,  
[00:08:01] to x1 squared plus x2 squared equals 1,  
[00:08:05] this turns out to be this circle.  
[00:08:07] When x1 squared plus x2 squared is greater than equal to 1,  
[00:08:12] that's this area outside the circle,  
[00:08:15] and that's when you predict y to be 1.  
[00:08:18] Conversely, when x1 squared plus x2 squared is less than 1,  
[00:08:23] that's this area inside the circle,  
[00:08:27] and that's when you would predict y to be 0.  
[00:08:30] So, can we come on with  
[00:08:32] even more complex decision boundaries than these.  
[00:08:35] Yes, you can.  
[00:08:38] You can do so by having even higher all the polynomial terms.  
[00:08:42] Say, z is w1x1 plus w2x2 plus w3x1 squared,  
[00:08:48] plus w4 x1x2 plus w5 x2 squared.  
[00:08:53] Then it's possible that you can get even more complex decision boundaries.  
[00:08:58] The model can define decision boundaries, such as this example,  
[00:09:02] example, an ellipse that's like this,  
[00:09:05] or with a different choice of the parameters,  
[00:09:09] you can even get more complex decision boundaries,  
[00:09:12] which can look like functions that maybe looks like that.  
[00:09:15] So this is an example of an even more complex decision boundary  
[00:09:19] than the ones we've seen previously,  
[00:09:22] and this implementation of legislature regression  
[00:09:25] will predict y equals 1 inside this shape,  
[00:09:29] and outside the shape will predict  
[00:09:32] y equals 0. So with these polynomial features,  
[00:09:36] you can get very complex decision boundaries.  
[00:09:39] In other words, logistic regression can learn to fit pretty complex data.  
[00:09:44] Although if you were to not include any of these higher order polynomials,  
[00:09:49] so if the only features you use are x1, x2, xb, and so on,  
[00:09:54] then the decision boundary for logistics regression will always be linear,  
[00:09:58] will always be a straight line.  
[00:10:00] In the upcoming optional lab,  
[00:10:03] you also get to see the code implementation of the decision boundary.  
[00:10:08] In the example in the lab, there will be two features,  
[00:10:11] so you can see the decision boundary as a line.  
[00:10:15] So with this visualization,  
[00:10:17] I hope that you now have a sense of the range of possible models you can get  
[00:10:21] with logistic regression.  
[00:10:23] Now that you've seen what F of X can potentially compute,  
[00:10:27] let's take a look at how you can actually train a logistic regression model.  
[00:10:32] We'll start by the data.  
[00:10:33] looking at the cost function for logistics regression,  
[00:10:36] and after that, figure out how to apply gradient descent to it.  
[00:10:40] Let's go on to the next video.
