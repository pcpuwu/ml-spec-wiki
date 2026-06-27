# Cost Function Intuition — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](cost-function-intuition.md)

---

[00:00:01] We've seen the mathematical definition of the cost function.  
[00:00:05] Now, let's build some intuition about what the cost function is really doing.  
[00:00:09] In this video, we'll walk through one example to see how the cost function can be used  
[00:00:14] to find the best parameters for your model.  
[00:00:17] I know this video is a little bit longer than the others, but bear with me, I think it'll be worth it.  
[00:00:22] To recap, here's what we've seen about the cost function so far.  
[00:00:26] You want to fit a straight line to the training data,  
[00:00:30] so you have this model f wb of x is w times x plus b and here the model's parameters are w and b.  
[00:00:39] Now depending on the values chosen for these parameters, you get different straight lines like this.  
[00:00:46] And you want to find values for w and b so that the straight line fits the training data well.  
[00:00:53] To measure how well a choice of w and b fits the training data,  
[00:00:59] you have a cost function j,  
[00:01:02] and what the cost function j does is,  
[00:01:05] it measures the difference between the model's predictions  
[00:01:08] and the actual true values for y.  
[00:01:13] What you see later is that linear regression would try to find values for w and b  
[00:01:18] that make j of wb as small as possible.  
[00:01:22] In math, we write it like this.  
[00:01:25] We want to minimize j as a function of  
[00:01:30] w and b. So now, in order for us to better visualize the cost function j,  
[00:01:37] let's work of a simplified version of the linear regression model.  
[00:01:41] We're going to use the model  
[00:01:43] f w of x is w times x.  
[00:01:48] You can think of this as taking the original model on the left  
[00:01:51] and getting rid of the parameter b, or setting the parameter b  
[00:01:55] equal to 0, so it just goes away from the equation.  
[00:02:00] So f is f is a way from the equation.  
[00:02:01] now just w times x. So you now have just one parameter w and your cost function j  
[00:02:10] looks similar to what it was before, taking the difference and squaring it,  
[00:02:15] except that now f is equal to w times x i and j is now a function of just w. And the goal  
[00:02:26] becomes a little bit different as well, because you have just one parameter w, not w and b.  
[00:02:32] So with this simplified model, the goal is to find the value for w that minimizes j of w.  
[00:02:41] To see this visually, what this means is that if b is set to 0,  
[00:02:46] then f defines a line that looks like this,  
[00:02:49] and you see that the line passes through the origin here,  
[00:02:53] because when x is 0, well, f of x is 0.  
[00:02:57] Now, using this simplified model, let's see how the cost function changes is  
[00:03:02] you choose different values for the parameter w.  
[00:03:05] In particular, let's look at graphs of the model f of x and the cost function j.  
[00:03:15] I'm going to plot these side by side, and you'll be able to see how the two are related.  
[00:03:21] First notice that for f subscript w, when the parameter w is fixed, that is always a constant value,  
[00:03:31] then f w is only a function.  
[00:03:33] only a function of x,  
[00:03:35] which means that the estimated value of y depends on the value of the input x.  
[00:03:42] In contrast, looking to the right,  
[00:03:45] the cost function j is a function of w,  
[00:03:49] where w controls the slope of the line defined by f w.  
[00:03:54] So the cost defined by j depends on a parameter,  
[00:03:59] in this case, the parameter w.  
[00:04:02] So let's see  
[00:04:04] go ahead and plot these functions f w of x and j of w side by side, so you can see how they are related.  
[00:04:14] We'll start to the model, that is the function f w of x on the left.  
[00:04:22] Here, the input feature x is on the horizontal axis, and the output value y is on the vertical axis.  
[00:04:30] Here's the plot of three points representing the training set at the output value y is on the vertical axis.  
[00:04:34] set at positions 1122 and 33.  
[00:04:40] Let's pick a value for w, say w is 1.  
[00:04:44] So for this choice of w, the function fw looks like this straight-lined with a slope of 1.  
[00:04:54] Now, what you can do next is calculate the cost j when w equals 1.  
[00:05:03] So you may recall that the cost of 1.  
[00:05:04] So you may recall that the cost of 1.  
[00:05:05] function is defined as follows.  
[00:05:07] It's the squared error cost function.  
[00:05:09] So if you substitute f w of xI with w times xI,  
[00:05:16] the cost function looks like this,  
[00:05:19] where this expression is now w times xI minus yi.  
[00:05:24] So for this value of w, it turns out that the error term inside the cost function,  
[00:05:30] this w times xI minus yi is equal to 0.  
[00:05:35] for each of the three data points.  
[00:05:37] Because for this data set,  
[00:05:39] when x is 1, then y is 1,  
[00:05:42] when w is also 1, then f of x equals 1.  
[00:05:46] So f of x equals y for this first training example,  
[00:05:50] and the difference is 0.  
[00:05:52] Plugging this into the cost function J,  
[00:05:55] you get 0 squared.  
[00:05:57] Similarly, when x is 2, then y is 2,  
[00:06:01] and f of x is also 2.  
[00:06:04] So again,  
[00:06:05] f of x equals y for the second training example,  
[00:06:08] in the cost function,  
[00:06:10] the squared error for the second example is also 0 squared.  
[00:06:14] Finally, when x is 3, then y is 3,  
[00:06:18] and f of 3 is also 3.  
[00:06:22] In the cost function, the third squared error term is also 0 squared.  
[00:06:26] So for all three examples in this training set,  
[00:06:30] f of x i equals yi, for each training example,  
[00:06:34] trading example i.  
[00:06:36] So f of x i minus y i is 0.  
[00:06:41] So for this particular data set,  
[00:06:45] when w is 1, then the cost j is equal to 0.  
[00:06:51] Now, what you can do on the right  
[00:06:55] is plot the cost function j.  
[00:06:58] And notice that because the cost function  
[00:07:01] is a function of the parameter w,  
[00:07:03] the horizontal axis is now  
[00:07:06] labeled w and not x, and the vertical axis is now j and not y.  
[00:07:14] So you have j of 1 equals to 0.  
[00:07:19] In other words, when w equals 1,  
[00:07:23] j of w is 0.  
[00:07:26] So let me go ahead and plot that.  
[00:07:30] Now let's look at how f and j change for different values of w.  
[00:07:35] W can take on the range of  
[00:07:37] values, right? So w can take on negative values,  
[00:07:40] w can be 0, and it can take on positive values too.  
[00:07:44] So what if w is equal to 0.5 instead of 1?  
[00:07:50] What will these graphs look like then?  
[00:07:52] Let's go ahead and plot that.  
[00:07:54] So let's set w to be equal to 0.5,  
[00:07:58] and in this case, the function f of x now looks like this  
[00:08:03] is aligned with a slope equal to 0.5.  
[00:08:07] And less also computes the cost j when w is 0.5.  
[00:08:16] Recall that the cost function is measuring the squared error or difference  
[00:08:20] between the estimated value that is y hat i,  
[00:08:24] which is f of x i,  
[00:08:27] and the true value that is yi for each example i.  
[00:08:33] So visually, you can see that the error or difference is equal to the  
[00:08:38] the height of this vertical line here when x is equal to 1,  
[00:08:44] because this little line is the gap between the actual value of y  
[00:08:48] and the value that the function f predicted,  
[00:08:51] which is a bit further down here.  
[00:08:54] So for this first example,  
[00:08:56] when x is 1, f of x is 0.5,  
[00:09:03] so the squared error on the first example is 0.5 minus 1,  
[00:09:09] squared. Remember, the cost function will sum over all the training examples in the training set.  
[00:09:15] So let's go on to the second training example.  
[00:09:18] When x is 2, the model is predicting F of x is 1,  
[00:09:24] and the actual value of y is 2.  
[00:09:29] So the error for the second example is equal to the height of this  
[00:09:33] lower line segment here,  
[00:09:36] and the squared error is the square of the length of this line segment.  
[00:09:40] of this line segment, so you get 1 minus 2 squared.  
[00:09:45] Let's do the third example.  
[00:09:47] Repeating this process, the error here,  
[00:09:52] also shown by this line segment, is 1.5 minus 3 squared.  
[00:09:59] Next, we sum up all of these terms,  
[00:10:01] which turns out to be equal to 3.5.  
[00:10:05] Then we multiply this term by 1 over 2M,  
[00:10:10] where m  
[00:10:11] is the number of training examples. Since there are three training examples,  
[00:10:17] m equals 3, so this is equal to 1 over 2 times 3, where this m here is 3.  
[00:10:29] If we work on the math, this turns out to be 3.5 divided by 6.  
[00:10:35] So the cost J is about 0.58.  
[00:10:40] Let's go ahead and plot that over there.  
[00:10:42] on the right, okay?  
[00:10:44] Now, let's try one more value for w.  
[00:10:47] How about if w equals 0?  
[00:10:50] What do the grasp for f and j look like when w is equal to 0?  
[00:10:57] It turns out that if w is equal to 0,  
[00:11:00] then f of x is just this horizontal line that is exactly on the x-axis.  
[00:11:06] And so the error for each example is a line that goes from each point  
[00:11:11] down to the horizontal line  
[00:11:13] that represents f of x equals 0.  
[00:11:17] So the cost j when w equals 0 is 1 over 2m times the quantity 1 squared plus 2 squared plus 3 squared  
[00:11:28] and that's equal to 1 over 6 times 14, which is about 2.33.  
[00:11:36] So let's plot this point where w is 0 and j of 0 is 2.3 is 2.3.  
[00:11:43] over here. And you can keep doing this for other values of w.  
[00:11:48] Since w can be any number, it can also be a negative value.  
[00:11:53] So if w is negative 0.5, then the line f is a downward sloping line like this.  
[00:12:02] It turns out that when w is negative 0.5, then you end up with an even higher cost  
[00:12:09] around 5.25, which is this point up up here.  
[00:12:13] And you can continue computing the cost function for different values of w and so on, and plot these, right?  
[00:12:21] So it turns out that by computing a range of values, you can slowly trace out what the cost function J looks like.  
[00:12:29] And that's what j is.  
[00:12:32] To recap, each value of parameter w corresponds to a different straight line fit, F of x on the graph to the left.  
[00:12:43] And for the given.  
[00:12:44] trading set, that choice for a value of w corresponds to a single point, a single point on the  
[00:12:52] graph on the right, because for each value of w, you can calculate the cost j of w. For example,  
[00:13:00] when w equals 1, this corresponds to this straight line fit through the data, and it also corresponds  
[00:13:09] to this point on the graph of j, where w equals 1, where w equals 1, this is a straight line fit through the data, and it also corresponds to this  
[00:13:14] 1 and the cost j of 1 equals 0. Whereas when w equals 0.5, this gives you this line,  
[00:13:23] which has a smaller slope, and this line in combination with the training set, corresponds to this point  
[00:13:31] on the cost function graph at w equals 0.5. So for each value of w, you wind up with a different  
[00:13:40] line, and this corresponding cost j of w, w, and it's corresponding cost j of w, and  
[00:13:45] and you can use these points to trace out this plot on the right.  
[00:13:49] Given this, how can you choose the value of w that results in the function f, fitting the data well?  
[00:13:57] Well, as you can imagine, choosing a value of w that causes j of w to be as small as possible,  
[00:14:04] seems like a good bet.  
[00:14:06] J is the cost function that measures how big the squared errors are.  
[00:14:11] So choosing w that minimizes these squared errors makes them a set  
[00:14:15] as small as possible would give us a good model. In this example, if you were to choose the value  
[00:14:21] of w that results in the smallest possible value of j of w, you'd end up picking w equals 1.  
[00:14:29] And as you can see, that's actually a pretty good choice. This results in a line that fits the training  
[00:14:34] data very well. So that's how in linear regression, you use the cost function to find the value of  
[00:14:42] w that minimizes j. Or in the more general case, when we had parameters  
[00:14:49] w and b rather than just w, you find the values of w and b that minimize j. So to summarize,  
[00:14:58] so to summarize, you saw plots of both f and j and work through how the two are related. As you  
[00:15:06] vary w or vary w and b, you end up with different straight lines. And when that straight line passes  
[00:15:12] close to data, the cost J is small. So the goal of linear regression is to find the  
[00:15:18] parameters W or W and B that results in the smallest possible value for the cost function  
[00:15:25] J. Now in this video, we work through our example with a simplified problem using only W. In the next  
[00:15:33] video, let's visualize what the cost function looks like for the full version of  
[00:15:38] linear regression using both W and B. And you see, you see,  
[00:15:42] some cool 3D plots. Let's go to the next video.
