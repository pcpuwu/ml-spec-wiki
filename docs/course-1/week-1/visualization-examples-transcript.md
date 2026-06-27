# Visualization Examples — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](visualization-examples.md)

---

[00:00:03] Let's look at some more visualizations of W and B.  
[00:00:06] Here's one example.  
[00:00:09] Over here, you have a particular point on the graph J.  
[00:00:14] For this point, W equals about negative 0.15,  
[00:00:19] and B equals about 800.  
[00:00:22] So this point corresponds to one pair of values for W and B  
[00:00:27] that yields a particular cost J.  
[00:00:30] And in fact, this particular pair of values for W&B  
[00:00:33] corresponds to this function, F of X,  
[00:00:37] which is this line that you can see on the left.  
[00:00:40] This line intersects the vertical axis at 800,  
[00:00:45] because B equals 800,  
[00:00:47] and the slope of the line is negative .15,  
[00:00:50] because W equals negative .15.  
[00:00:54] Now, if you look at the data points in the training set,  
[00:00:57] you may notice that this line is not a good fit to the data.  
[00:01:01] For this function F of X,  
[00:01:04] With these values of W and B,  
[00:01:07] many of the predictions for the value of Y are quite far  
[00:01:11] from the actual target value of Y that is in the training data.  
[00:01:16] Because this line is not a good fit,  
[00:01:18] if you look at the graph of J,  
[00:01:20] the cost of this line is out here,  
[00:01:24] which is pretty far from the minimum.  
[00:01:27] It's a pretty high cost because this choice of W&B is just not that good a fit to the  
[00:01:32] trading set.  
[00:01:35] Now, let's just not that good a fit to the training set.  
[00:01:35] Now,  
[00:01:35] Let's look at another example with a different choice of W and B.  
[00:01:42] Now, here is another function that is, you know,  
[00:01:44] still not a great fit for the data, but maybe slightly less bad.  
[00:01:48] So this point here represents the cost for this particular pair of  
[00:01:53] W and B that creates that line.  
[00:01:57] The value of W is equal to 0, and the value of B is about 360.  
[00:02:04] This pair of parameters corresponds to this function, which  
[00:02:07] a flat line because f of x equals 0 times x plus 360.  
[00:02:13] I hope that makes sense.  
[00:02:16] Let's look at yet another example.  
[00:02:18] Here's one more choice for W and B,  
[00:02:21] and with these values, you end up with this line,  
[00:02:24] f of x. Again, not a great fit to the data.  
[00:02:27] It is actually further away from the minimum compared to the previous example.  
[00:02:32] And remember that the minimum is at the center of that smallest ellipse.  
[00:02:38] Last example, if you look at f of x on the left,  
[00:02:43] this looks like a pretty good fit to the training set.  
[00:02:46] You can see on the right, this point,  
[00:02:50] representing the cost is very close to the center of the small ellipse.  
[00:02:56] It's not quite exactly the minimum, but it's pretty close.  
[00:03:00] For this value of W and B, you get this line, F of X.  
[00:03:06] You can see that if you measure the very  
[00:03:08] the vertical distances between the data points and the predicted values on the straight line.  
[00:03:14] You get the error for each data point.  
[00:03:18] The sum of squared errors for all of these data points is pretty close  
[00:03:23] to the minimum possible sum of squared errors among all possible straight line fits.  
[00:03:30] I hope that by looking at these figures, you can get a better sense of how different choices  
[00:03:35] of the parameters affect the line F-1.  
[00:03:38] of x and how this corresponds to different values for the cost j.  
[00:03:45] And hopefully you can see how the better fit lines correspond to points on the graph of j that are closer  
[00:03:54] to the minimum possible cost for this cost function j of w and b.  
[00:04:01] In the optional lab that follows this video, you get to run some code.  
[00:04:07] And remember, all of the code is given, so you just need to  
[00:04:10] to hit Shift Enter to run it and take a look at it.  
[00:04:13] And the lab will show you how the cost function is implemented in code.  
[00:04:18] And given a small trading set and different choices for the parameters, you'll be able to  
[00:04:24] see how the cost varies depending on how well the model fits the data.  
[00:04:29] In the optional lab, you also can play with an interactive contour plot.  
[00:04:34] Check this out.  
[00:04:35] You can use your mouse cursor to click anywhere on the contour plot, and you'll be able to see  
[00:04:40] the straight line defined by the values you chose for the parameters W&B.  
[00:04:45] You see a dot appear also on the 3D surface plot showing the cost.  
[00:04:51] Finally, the Optional Lab also has a 3D surface plot that you can manually rotate and spin around  
[00:04:59] using your mouse cursor to take a better look at what the cost function looks like.  
[00:05:03] I hope you enjoy playing with the Optional Lab.  
[00:05:07] Now, in linear regression, rather than having to map,  
[00:05:11] manually try to read a contour plot for the best value for W&B,  
[00:05:15] which isn't really a good procedure and also won't work once we get to more complex machine learning models.  
[00:05:21] What you really want is an efficient algorithm that you can write in code for automatically  
[00:05:26] finding the values of parameters W&B that gives you the best fit line that minimizes the cost function J.  
[00:05:35] There is an algorithm for doing this called gradient descent. This algorithm is one of the most important  
[00:05:41] algorithms in machine learning.  
[00:05:43] Gradient descent and variations on gradient descent are used to train not just linear regression,  
[00:05:49] but some of the biggest and most complex models in all of AI.  
[00:05:53] So let's go to the next video to dive into this really important algorithm called gradient descent.
