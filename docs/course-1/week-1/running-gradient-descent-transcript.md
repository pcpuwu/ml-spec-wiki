# Running Gradient Descent — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](running-gradient-descent.md)

---

[00:00:01] Let's see what happens when you run gradient descent for linear regression.  
[00:00:06] Let's go see the algorithm in action.  
[00:00:08] Here's a plot of the model and data on the upper left,  
[00:00:12] and a contour plot of the cost function on the upper right,  
[00:00:17] and at the bottom is the surface plot of the same cost function.  
[00:00:23] Often, W and B will both be initialized to 0,  
[00:00:26] but for this demonstration,  
[00:00:28] let's initialize W to be equal to negative 0.1.  
[00:00:32] and B to be 900, so this corresponds to F of x equals negative 0.1x plus 900.  
[00:00:43] Now, if we take one step using gradient descent,  
[00:00:47] we end up going from this point of the cost function out here  
[00:00:51] to this point, just down and to the right.  
[00:00:56] And notice that the straight line fit is also changed the bit.  
[00:01:01] the bit. Let's take another step. The cost function has now moved to this third point,  
[00:01:09] and again, the function F of X has also changed the bit. As you take more of these steps,  
[00:01:18] the cost is decreasing at each update. So the parameters W&B are following this trajectory.  
[00:01:26] And if you look on the left, you get this corresponding straight line fit that, you know, fits the data,  
[00:01:35] better and better until we've reached the global minimum. The global minimum corresponds to this  
[00:01:42] straight line fit, which is a relatively good fit to the data. I mean, isn't that cool? And so that's  
[00:01:51] gradient descent. And we're going to use this to fit a model to the housing data. And you can now use this  
[00:01:59] this F of X model to predict the price of your client's house or anyone else's  
[00:02:05] hulls. For instance, if your friend's hull size is 1,250 square feet, you can now read off the value and  
[00:02:14] predict that maybe they could get, I don't know, $250,000 for the house. To be more precise,  
[00:02:22] this gradient descent process is called batch gradient descent. The term batch gradient descent refers to the  
[00:02:30] fact that on every step of gradient descent, we're looking at all of the training examples,  
[00:02:36] instead of just a subset of the training data. So in computing gradient descent,  
[00:02:43] when computing derivatives, we're computing the sum from i equals 1 to m,  
[00:02:50] and bash gradient descent is looking at the entire batch of training examples at each update.  
[00:02:58] I know that bash gradient descent may not be the most intuitive name,  
[00:03:02] but this is what people in the machine learning community call it. If you've heard the  
[00:03:07] heard of the newsletter the badge that's published by deeplearning.aI.  
[00:03:12] The newsletter, the batch, was also named for this concept in machine learning.  
[00:03:18] And then it turns out that there are other versions of gradient descent that do not look at the  
[00:03:23] entire training set, but instead looks at the smallest subsets of the training data at each  
[00:03:28] update step. But we'll use batch gradient descent for linear regression.  
[00:03:34] So that's it for linear regression. Congratulations on giving through  
[00:03:38] your first machine learning model. I hope you go and celebrate, or I don't know, maybe take a nap  
[00:03:44] in your hammock. In the optional lab that follows this video, you see a review of the gradient  
[00:03:50] descent algorithm as well as how to implement it in code. You also see a plot that shows how the cost  
[00:03:57] decreases as you continue training more iterations. And you also see a contour plot, seeing how  
[00:04:04] the cost gets closer to the global minimum, as gradient descent finds better  
[00:04:08] better and better values for the parameters W&B.  
[00:04:12] So remember that to do the optional lab,  
[00:04:15] you just need to read and run this code.  
[00:04:18] You won't need to write any code yourself.  
[00:04:21] And I hope you take a few moments to do that  
[00:04:24] and also become familiar with the gradient descent code,  
[00:04:27] because this will help you  
[00:04:30] to implement this and similar algorithms in the future yourself.  
[00:04:34] Thanks for sticking with me through the end of this last video for the  
[00:04:38] last video for the first week and congratulations for making it all the way here.  
[00:04:43] You're on your way to becoming a machine learning person.  
[00:04:46] In addition to the optional labs, if you haven't done so yet,  
[00:04:50] I hope you also check out the practice quizzes,  
[00:04:53] which are a nice way that you can double-check your own understanding of the concepts.  
[00:04:57] It's also totally fine if you don't get them all right the first time,  
[00:05:01] and you can also take the quizzes multiple times until you get the score that you want.  
[00:05:07] You now know,  
[00:05:08] how to implement linear regression with one variable,  
[00:05:11] and that brings us to the close of this week.  
[00:05:15] Next week, we'll learn to make linear regression much more powerful.  
[00:05:19] Instead of one feature, like size of a house,  
[00:05:22] you learn how to get it to work with lots of features.  
[00:05:25] You also learn how to get it to fit non-linear curves.  
[00:05:29] These improvements will make the algorithm much more useful and valuable.  
[00:05:34] Lastly, we'll also go over some practical tips that will really hope.  
[00:05:37] that would really hope for getting linear regression to work on practical applications.  
[00:05:42] I'm really happy to have you here with me in this class, and I look forward to see you next week.
