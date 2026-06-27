# Simplified Cost Function for Logistic Regression — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](simplified-cost-function.md)

---

[00:00:01] In the last video, you saw the loss function and the cost function for logistic regression.  
[00:00:07] In this video, you see a slightly simpler way to write out the loss and cost functions  
[00:00:13] so that the implementation can be a bit simpler when we get to gradient descent  
[00:00:18] for fitting the parameters of a logistic regression model.  
[00:00:22] Let's take a look.  
[00:00:23] As a reminder, here's the loss function that we had defined in the previous video for logistic regression.  
[00:00:30] Now, because we're still working on a binary classification problem,  
[00:00:35] y is either 0 or 1.  
[00:00:37] Because y is either 0 or 1 and cannot take on any value other than 0 or 1,  
[00:00:45] will be able to come up with a simpler way to write this loss function.  
[00:00:50] You can write the loss function as follows.  
[00:00:53] Given the prediction f of x and the target label y,  
[00:00:57] the loss equals negative y,  
[00:01:00] times log of f minus 1 minus y times log of 1 minus f.  
[00:01:10] And it turns out this equation, which we just rolled in one line,  
[00:01:15] is completely equivalent to this more complex formula up here.  
[00:01:20] Let's see why this is the case.  
[00:01:22] Now remember, y can only take on the values of either 1 or 0.  
[00:01:30] In the first case,  
[00:01:33] Let's say y equals 1.  
[00:01:35] This first y over here is 1,  
[00:01:39] and this 1 minus y is 1 minus 1,  
[00:01:43] which is therefore equal to 0.  
[00:01:46] And so the loss becomes negative 1 times log of f of x  
[00:01:52] minus 0 times a bunch of stuff that becomes 0 and goes away.  
[00:01:57] And so when y is equal to 1, the loss is indeed the first term on top,  
[00:02:04] negative log of f of x.  
[00:02:08] Let's look at the second case,  
[00:02:10] when y is equal to 0.  
[00:02:13] In this case, this y here is equal to 0,  
[00:02:17] so this first term goes away,  
[00:02:20] and the second term is 1 minus 0  
[00:02:25] times that logarithmic term.  
[00:02:27] So the loss becomes this negative 1  
[00:02:34] times log of 1 minus f of 1  
[00:02:37] of x, and that's just equal to this second term up here.  
[00:02:43] And so in the case of y equals 0,  
[00:02:46] we also get back the original loss function as defined above.  
[00:02:51] So what you see is that whether y is 1 or 0,  
[00:02:56] the single expression here is equivalent  
[00:02:59] to the more complex expression up here,  
[00:03:02] which is why this gives us a simpler way to write the loss with just one equation  
[00:03:07] without separating out these two cases,  
[00:03:10] like we did on top.  
[00:03:13] Using this simplified loss function,  
[00:03:15] let's go back and write out the cost function for  
[00:03:18] log regression.  
[00:03:19] So here again is the simplified loss function.  
[00:03:25] And recall that the cost J is just the average loss,  
[00:03:30] average across the entire training set of M examples.  
[00:03:35] So is 1 over m times the sum of the loss from i equals  
[00:03:40] 1 to m.  
[00:03:43] Now, if you plug in the definition for the simplified loss from above,  
[00:03:46] then it looks like this, 1 over m times the sum of this term above.  
[00:03:52] And if you bring the negative signs and move them outside,  
[00:03:56] then you end up with this expression over here,  
[00:04:00] and this is the cost function.  
[00:04:02] The cost function that pretty much everyone uses to train logistic regression.  
[00:04:07] Now, you might be wondering, why do we choose this  
[00:04:12] function when there could be tons of other cost functions we could have chosen.  
[00:04:18] Although we won't have time to go into great detail on this in this class,  
[00:04:22] I'd just like to mention that this particular cost function is derived from statistics  
[00:04:28] using a statistical principle called maximum likelihood estimation,  
[00:04:33] which is an idea from statistics on how to efficiently find parameters for different models.  
[00:04:39] And this cost function,  
[00:04:42] has the nice property that it is convex.  
[00:04:45] But don't worry about learning the details of maximum likelihood.  
[00:04:50] It's just a deeper rationale and justification behind this particular cost function.  
[00:04:56] The upcoming optional lab will show you how the logistic cost function is implemented in code.  
[00:05:04] I recommend taking a look at it, because you implement this later in the practice lab at the end of the week.  
[00:05:12] This upcoming optional lab,  
[00:05:15] also shows you how two different choices of the parameters will lead to different cost calculations.  
[00:05:22] So you can see in the plot that the better-fitting blue decision boundary has a lower cost relative to the magenta decision boundary.  
[00:05:34] So with the simplified cost function, we're now ready to jump into applying gradient descent to logistics regression.  
[00:05:41] Let's go see that in the next video.
