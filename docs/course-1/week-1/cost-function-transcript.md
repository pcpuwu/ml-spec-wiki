# The Cost Function — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](cost-function.md)

---

[00:00:01] In order to implement linear regression, the first key step is for us to define something called a cost function.  
[00:00:08] This is something we'll build in this video, and the cost function will tell us how well the model is doing  
[00:00:14] so that we can try to get it to do better.  
[00:00:17] Let's look at what this means.  
[00:00:19] Recall that you have a training set that contains input features X and output targets Y.  
[00:00:26] And the model you're going to use to fit this training set is this linear function,  
[00:00:31] F, WB of X equals W times X plus B.  
[00:00:36] To introduce a little bit more terminology, the W and B are called the parameters of the model.  
[00:00:44] In machine learning, parameters of a model are the variables you can adjust during training  
[00:00:50] in order to improve the model.  
[00:00:53] Sometimes you also hear the parameters W and B referred to as coefficients or as weights.  
[00:01:02] Now, let's take a look at what these parameters W and B do.  
[00:01:08] Depending on the values you've chosen for W and B, you get a different function, F of X,  
[00:01:14] which generates a different line on the draw.  
[00:01:17] And remember that we can write F of X as a shorthand for FWB of X.  
[00:01:24] We're going to take a look at some plots of F of X on a chart.  
[00:01:29] Maybe you're already familiar with drawing lines on chart.  
[00:01:32] but even if this is a review for you,  
[00:01:34] I hope this will help you build intuition on how W and B, the parameters, determine F.  
[00:01:41] When w is equal to 0 and B is equal to 1.5,  
[00:01:46] then f looks like this horizontal line.  
[00:01:49] In this case, the function f of x is 0 times x plus 1.5,  
[00:01:56] so f is always a constant value.  
[00:01:59] It always predicts 1.5.  
[00:02:01] 0.5 for the estimated value of y.  
[00:02:05] So y hat is always equal to B.  
[00:02:08] And here, B is also called the Y intersect,  
[00:02:12] because that's where it crosses the vertical axis or the y-axis on this graph.  
[00:02:18] As a second example, if w is 0.5 and b is equal to 0,  
[00:02:25] then f of x is 0.5 times x.  
[00:02:28] When x is 0, the prediction is also 0.  
[00:02:32] And when x is 2, then the prediction is 0.5 times 2, which is 1.  
[00:02:38] So you get a line that looks like this.  
[00:02:40] And notice that the slope is 0.5 divided by 1.  
[00:02:46] So the value of w gives you the slope of the line, which is 0.5.  
[00:02:53] And finally, if w equals 0.5 and b equals 1,  
[00:02:59] then f of x is 0.5 times x plus 0.5,  
[00:03:02] 1. And when x is 0, then f of x equals b, which is 1, so the line intersects the vertical  
[00:03:11] axis at b, the y intercept. Also, when x is 2, then f of x is 2. So the line looks like this.  
[00:03:21] Again, the slope is 0.5 divided by 1, so the value of w gives you the slope, which is 0.5.  
[00:03:29] Recall that you have a training set, like the one shown here, which the 1, which is 0.5. Recall that you have a training set,  
[00:03:33] With linear regression, what you want to do is to choose values for the parameters W and B,  
[00:03:39] so that the straight line you get from the function F somehow fits the data well, like maybe this line  
[00:03:45] shown here.  
[00:03:47] And when I say that the line fits the data, visually, you can think of this to mean that the line  
[00:03:53] defined by F is roughly passing through or somewhat close to the trading examples  
[00:03:59] as compared to other possible lines that are not as close to these points.  
[00:04:03] And just to remind you of some notation, a training example like this point here is defined by X super strip i,  
[00:04:14] y super strip i, where y is the target.  
[00:04:19] For a given input x i, the function f also makes a predictive value for y,  
[00:04:29] and the value that it predicts for y is y hat i, shown here.  
[00:04:34] For our choice of a model, f of xI is w times xI plus b.  
[00:04:41] Stated differently, the prediction Y hat i is f of wb of xI,  
[00:04:48] where for the model we're using,  
[00:04:51] f of xI is equal to WXI plus b.  
[00:04:57] So now the question is,  
[00:05:01] how do you find values for w and b so that the prediction  
[00:05:05] y-hat i is close to the true target yi for many or maybe all training examples x-I-y-i.  
[00:05:16] To answer that question, let's first take a look at how to measure how well-aligned fits the training data.  
[00:05:23] To do that, we're going to construct our cost function.  
[00:05:27] The cost function takes the prediction y-hat and compares it to the target y-hat  
[00:05:34] y by taking y-hat minus y.  
[00:05:38] This difference is called the error.  
[00:05:42] We're measuring how far off the prediction is from the target.  
[00:05:47] Next, let's compute the square of this error.  
[00:05:52] Also, we're going to want to compute this term for different training examples,  
[00:05:56] I in the training set.  
[00:05:58] So, when measuring the error, for example, I will compute this squared error term.  
[00:06:04] Finally, we want to measure the error across the entire training set.  
[00:06:09] In particular, there's sum up to squared errors like this.  
[00:06:13] We'll sum from i equals 1, 2, 3, all the way up to M.  
[00:06:19] And remember that m is the number of training examples, which is 47 for this dataset.  
[00:06:25] Notice that we have more training examples,  
[00:06:27] m is larger, and your cost function will calculate a bigger number,  
[00:06:32] since it's summing over more examples.  
[00:06:33] more examples.  
[00:06:35] So to build a cost function that doesn't automatically get bigger  
[00:06:39] as the training set size gets larger,  
[00:06:42] by convention, we will compute the average squared error  
[00:06:47] instead of the total squared error,  
[00:06:49] and we do that by dividing by m like this.  
[00:06:53] Okay, we're nearly there.  
[00:06:56] Just one last thing.  
[00:06:58] By convention, the cost function that machine learning people use  
[00:07:02] actually devised by  
[00:07:04] 2 times m.  
[00:07:06] The extra division by 2 is just meant to make some of our later calculations a little bit neater,  
[00:07:12] but the cost function still works whether you include this division by 2 or not.  
[00:07:17] So this expression right here is the cost function,  
[00:07:20] and we're going to write J of WB to refer to the cost function.  
[00:07:28] This is also called the squared error cost function,  
[00:07:31] and it's called this because you're taking the square of the square of these.  
[00:07:35] error terms. In machine learning, different people will use different cost functions  
[00:07:41] for different applications, but the squared error cost function is by far the most commonly used  
[00:07:47] one for linear regression, and for that matter, for all regression problems, where it seems to give  
[00:07:53] good results for many applications. So just as a reminder, the prediction y hat is equal to the  
[00:08:01] output of the model, f, at x,  
[00:08:05] So we can rewrite the cost function j of wb as 1 over 2m times the sum from i equals 1 to m of  
[00:08:15] of f of x i minus y i the quantity squared.  
[00:08:23] Eventually we're going to want to find values of w and b that make the cost function small.  
[00:08:29] But before going there, let's first gain more intuition about what j of wb  
[00:08:36] is really computing. At this point, you might be thinking we've done a whole lot of  
[00:08:41] NAF to define the cost function, but what exactly is it doing? Let's go on to the next video  
[00:08:47] where we'll step through one example of what the cost function is really computing,  
[00:08:52] that I hope will help you build intuition about what it means if j of wb is large,  
[00:08:58] versus if the cost j is small. Let's go on to the next video.
