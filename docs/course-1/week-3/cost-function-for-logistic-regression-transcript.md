# Cost Function for Logistic Regression — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](cost-function-for-logistic-regression.md)

---

[00:00:01] Remember that the cost function gives you a way to measure how well a specific set of parameters  
[00:00:07] fits the training data, and it thereby gives you a way to try to choose better parameters.  
[00:00:14] In this video, we'll look at how the squared error cost function is not an ideal cost function  
[00:00:20] for logistics regression, and we'll take a look at a different cost function that can help  
[00:00:25] us choose better parameters for logistic regression. Here's what the training set for a  
[00:00:31] logistic regression model might look like, where here each row might respond to a  
[00:00:37] patient that was paying a visit to the doctor and wound up with some sort of diagnosis.  
[00:00:44] As before, we'll use M to denote the number of training examples. Each training example has one  
[00:00:53] or more features, such as the tumor size, the patient's age, and so on, for a total of  
[00:00:59] N features. And so let's call the features X1 through XN. And since this is a binary classification  
[00:01:09] task, the target label Y takes on only two values, either 0 or 1. And finally, the logistics  
[00:01:17] regression model is defined by this equation. Okay, so the question you want to answer is,  
[00:01:24] given this training set, how can you choose parameters W and B? Recall, for the  
[00:01:30] linear regression, this is the squared error cost function. The only thing I've changed  
[00:01:36] is that I put the one-half inside the summation instead of outside the summation. And you might remember  
[00:01:43] that in the case of linear regression, where f-fx is the linear function w.w. The cost function  
[00:01:51] looks like this is a convex function, or a bow shape or a hammock shape. And so gradient descent  
[00:01:57] will look like this, where you take one step, one step, one step, and so on to converge at the  
[00:02:03] global minimum. Now, you could try to use the same cost function for logistic regression,  
[00:02:10] but it turns out the divide we to write f-fx equals 1 over 1 plus e to the negative WX plus B,  
[00:02:18] and plot the cost function using this value of f-f-fx, then the cost will look like this.  
[00:02:26] This becomes what's called a non-convex  
[00:02:28] cost function is not convex. And what this means is that if you were to try to use gradient descent,  
[00:02:37] there are lots of local minima that you can get stuck in. So it turns out that for logistic  
[00:02:43] regression, this squared error cost function is not a good choice. Instead, there will be a  
[00:02:50] different cost function that can make the cost function convex again so that grade and descent  
[00:02:56] can be guaranteed to converge to the global minimum.  
[00:03:00] The only thing I've changed is that I put the one-half inside the summation instead of outside the  
[00:03:05] summation. This will make the math you see later on the slide a little bit simpler.  
[00:03:11] In order to build a new cost function, one that will use for logistic regression, I'm going to change  
[00:03:17] a little bit the definition of the cost function J of W&B. In particular, if you look inside this  
[00:03:25] summation. Let's call this term inside the loss on a single training example.  
[00:03:32] And I'm going to denote the loss via this capital L and is a function of the prediction of the learning  
[00:03:41] algorithm, f of x, as well as of the true label Y. And so the loss, given the predicted F of X and  
[00:03:52] and the true label Y is equal, in this case, to one-half of the squared difference.  
[00:03:59] We'll see shortly that by choosing a different form for this loss function, we'll be able to keep  
[00:04:04] the overall cost function, which is 1 over m times the sum of these loss functions, to be a convex  
[00:04:11] function. Now, the loss function inputs F of x and the true label Y and tells us how well we're  
[00:04:21] doing on that example. I'm going to just write down here the definition of the loss  
[00:04:28] function we'll use for logistic regression. If the label Y is equal to 1, then the loss is negative  
[00:04:36] log of f of x. And if the label y is equal to 0, then the loss is negative log of 1 minus  
[00:04:46] f of x. Let's take a look at why this loss function  
[00:04:52] hopefully makes sense. Let's first consider the case of y equals 1 and plot what this function  
[00:05:01] looks like to gain some intuition about what this loss function is doing. And remember, the loss  
[00:05:08] function measures how well you're doing on one training example and is by summing up the losses on  
[00:05:14] all of the training examples that you then get the cost function, which measures how well  
[00:05:18] you're doing on the entire training set. So if you plot log of f, it looks like this curve  
[00:05:27] here, where f here is on the horizontal axis. And so a plot of negative of the log of f looks like  
[00:05:36] this, where we just flip the curve along the horizontal axis. Notice that it intersects the  
[00:05:43] horizontal axis at f equals 1 and continues downward from there.  
[00:05:50] Now f is the output of logistic regression. Thus, f is always between 0 and 1,  
[00:05:57] because the output of logistic regression is always between 0 and 1.  
[00:06:03] The only part of the function that's relevant is therefore this part over here,  
[00:06:09] corresponding to f between 0 and 1. So let's zoom in and take a closer look at this part of the graph.  
[00:06:18] If the algorithm predicts a probability close to 1,  
[00:06:22] and the true label is 1, then the loss is very small. It's pretty much 0 because you're  
[00:06:30] very close to the right answer. Now, continuing with the example of the true label Y being 1,  
[00:06:38] so say it really is a malignant tumor, if the algorithm predicts 0.5, then the loss is at this  
[00:06:47] point here, which is a bit higher but not that high. Whereas in contrast, if the algorithm  
[00:06:53] were to have output 0.1 if it thinks that there's only a 10% chance of the tumor being  
[00:07:00] malignant. But Y really is 1, it really is malignant, then the loss is this much higher value over  
[00:07:08] here. So when Y is equal to 1, the loss function incentivizes, or it nudges, or it helps push  
[00:07:16] the algorithm to make more accurate predictions, because the loss is lowest when it predicts values close to  
[00:07:23] 1. Now, on this slide, we've been looking at what the loss is when Y is equal to 1.  
[00:07:30] On this slide, let's look at the second part of the loss function corresponding to when Y is  
[00:07:35] equal to 0. In this case, the loss is negative log of 1 minus f of x. When this function is plotted,  
[00:07:45] it actually looks like this. The range of f is limited to 0 to 1 because logistic regression only  
[00:07:53] outputs values between 0 and 1. And if we zoom in, this is what it looks like.  
[00:08:00] So in this plot, corresponding to y equals 0, the vertical axis shows the value of the loss  
[00:08:09] for different values of f of x. So when f is 0 or very close to 0, the loss is also going to be very  
[00:08:19] very small, which means that if the true label is 0 and the model's prediction is very close to 0,  
[00:08:25] well, you nearly got it right. So the loss is appropriately very close to zero.  
[00:08:31] And the larger the value of ffx gets, the bigger the loss, because the prediction is further from  
[00:08:37] the true label zero. And in fact, as that prediction approaches 1, the loss actually approaches  
[00:08:45] infinity. Going back to the tumor prediction example, this says that if a model  
[00:08:51] predicts that the patient's tumor is almost certain to be malignant, say, 9, 9, 9,000,  
[00:08:55] a 99.9% chance of malignancy.  
[00:08:58] But it turns out to actually not be malignant, so y equals 0, then we penalize the model  
[00:09:04] with a very high loss. So in this case of y equals 0, similar to the case of y equals 1  
[00:09:11] on the previous slide, the further the prediction f of x is away from the true value of y,  
[00:09:16] the higher the loss. And in fact, if f of x approaches 0, the loss here actually goes really,  
[00:09:26] really large and in fact approaches infinity. So when the true label is 1, the algorithm is  
[00:09:33] strongly incentivized not to predict something too close to zero. So in this video, you saw why  
[00:09:40] the squared error cost function doesn't work well for logistic regression. We also defined the loss  
[00:09:47] for a single training example and came up with a new definition for the loss function for  
[00:09:55] logistic regression. It turns out that with this choice of lost function, the overall  
[00:10:01] cost function will be convex, and thus you can reliably use gradient descent to take you to the global  
[00:10:08] minimum. Proving that this function is convex is beyond the scope of this course. You may remember  
[00:10:16] that the cost function is a function of the entire training set, and is therefore the average, or  
[00:10:23] 1 over m times the sum of the loss function on the individual training examples.  
[00:10:30] So the cost on a certain set of parameters W&B is equal to 1 over m times the sum over all the  
[00:10:39] training examples of the loss on the training examples. And if you can find the value of the  
[00:10:46] parameters W and B that minimizes this, then you'd have a pretty good set of values for the parameters  
[00:10:53] W&B for logistic regression. In the upcoming optional lab, you get to take a look at how  
[00:11:00] the squared error cost function doesn't work very well for classification, because you see that  
[00:11:05] the surface plot results in a very wiggly cost surface with many local minima. Then you take a look  
[00:11:13] at the new logistic loss function, and as you can see here, this produces a nice and smooth convex  
[00:11:22] surface plot that does not have all those local minimum.  
[00:11:26] So please take a look at the code and the plots after this video.  
[00:11:31] All right, so we're seeing a lot in this video.  
[00:11:35] In the next video, let's go back and take the loss function for a single training example  
[00:11:40] and use that to define the overall cost function for the entire training set.  
[00:11:45] And we'll also figure out a simpler way to write out the cost function,  
[00:11:50] which will then later allow us to run gradient descent to find  
[00:11:53] to find good parameters for logistics regression. Let's go on to the next video.
