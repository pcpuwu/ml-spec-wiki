# Feature Scaling, Part 1 — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](feature-scaling-part-1.md)

---

[00:00:02] So, welcome back.  
[00:00:04] Let's take a look at some techniques that will make gradient descent work much better.  
[00:00:08] In this video, you see a technique called feature scaling that will enable gradient descent to run much faster.  
[00:00:15] Let's start by taking a look at the relationship between the size of a feature  
[00:00:20] that is how big are the numbers for that feature and the size of its associated parameter.  
[00:00:26] As a concrete example, let's predict the price of a hulls using two features,  
[00:00:32] the size of the hulls, and x2 the number of bedrooms.  
[00:00:36] Let's say that x1 typically ranges from 300 to 2,000 square feet,  
[00:00:42] and x2 in the dataset ranges from 0 to 5 bedrooms.  
[00:00:47] So for this example, x1 takes on a relatively large range of values,  
[00:00:53] and x2 takes on a relatively small range of values.  
[00:00:57] Now, let's take an example of a hulls that has a size of 2,000,  
[00:01:01] of 2,000 square feet, has 5 bedrooms, and a price of 500k or $500,000.  
[00:01:12] For this one trading example, what do you think are reasonable values for the size of parameters  
[00:01:17] W1 and W2? Well, let's look at one possible set of parameters. Say, W1 is 50, and W2 is 0.1,  
[00:01:29] and B is 50 for the purposes of discussion.  
[00:01:32] So in this case, the estimated price in thousands of dollars is 100,000k here plus 0.5k plus 50K, which is slightly over $100 million.  
[00:01:49] So that's clearly very far from the actual price of $500,000.  
[00:01:56] And so this is not a very good set of parameter choices for W1 and W2.  
[00:02:02] Now, let's take a look at another possibility.  
[00:02:06] Say W1 and W2 were the other way around.  
[00:02:11] W1 is 0.1, and W2 is 50, and B is still also 50.  
[00:02:17] In this choice of W1 and W2, W1 is relatively small, and W2 is relatively large.  
[00:02:25] 50 is much bigger than 0.1.  
[00:02:28] So here, the predicted price is 0.1 times 2,000.  
[00:02:33] plus 50 times 5 plus 50.  
[00:02:37] The first term becomes 200K, the second term becomes 250K, and then plus 50.  
[00:02:44] So this version of the model predicts a price of $500,000, which is a much more reasonable estimate,  
[00:02:52] and it happens to be the same price as the true price of the house.  
[00:02:56] So hopefully you might notice that when a possible range of values of a feature is large,  
[00:03:02] like the size in square feet, which goes all the way up to 2000,  
[00:03:06] it's more likely that a good model will learn to choose a relatively small parameter value,  
[00:03:12] like 0.1. Likewise, when the possible values of a feature are small,  
[00:03:18] like the number of bedrooms, then a reasonable value for its parameters will be relatively large,  
[00:03:24] like 50. So how does this relate to gradient descent? Well, let's take a look at a scale  
[00:03:32] scatter plot of the features, where the size in square feet is the horizontal axis,  
[00:03:39] X1, and the number of bedrooms, X2, is on the vertical axis.  
[00:03:44] If you plot the training data, you notice that the horizontal axis is on a much larger scale  
[00:03:50] or much larger range of values compared to the vertical axis.  
[00:03:55] Next, let's look at how the cost function might look in a contour plot.  
[00:04:00] You might see a contour plot where the  
[00:04:03] horizontal axis has a much narrower range, say between 0 and 1, whereas the vertical  
[00:04:10] axis takes on much larger values, say between 10 and 100. So the contours form ovals or ellipses  
[00:04:19] and they're shorter on one side and longer on the other. And this is because a very small  
[00:04:25] change to w1 can have a very large impact on the estimated price and thus a very large impact on the  
[00:04:33] cost J because W1 tends to be multiplied by a very large number, the size and square feet.  
[00:04:41] In contrast, it takes a much larger change in W2 in order to change the predictions much,  
[00:04:47] and thus small changes to W2 don't change the cost function nearly as much. So where does this  
[00:04:55] leave us? This is what might end up happening if you were to run gradient descent, if you were to use  
[00:05:02] your training data as is. Because the contours are so tall and skinny, gradient descent  
[00:05:09] may end up bouncing back and forth for a long time before it can finally find its way to the global  
[00:05:16] minimum. In situations like this, a useful thing to do is to scale the features. This means  
[00:05:22] performing some transformation of your training data so that x1, say, might now range from  
[00:05:29] 0 to 1 and x2 might also range from 0 to 1. So the data points now look more like this,  
[00:05:38] and you might notice that the scale of the plot on the bottom is now quite different than the  
[00:05:43] one on top. The key point is that the re-scaled x1 and x2 are both now taking comparable ranges  
[00:05:51] of values to each other. And if you run gradient descent on a cost function defined on this re-scaled x1 and  
[00:06:00] using this transformed data, then the contours will look more like this, more like circles and  
[00:06:07] less tall and skinny, and gradient descends can find a much more direct path to the global minimum.  
[00:06:14] So to recap, when you have different features that take on very different ranges of values,  
[00:06:19] it can cause gradient descent to run slowly. But rescaling the different features so they all  
[00:06:25] take on comparable range of values can speed up gradient descent significantly. How do you actually  
[00:06:31] do this, let's take a look at that in the next video.
