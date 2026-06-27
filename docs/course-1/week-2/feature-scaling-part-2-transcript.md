# Feature Scaling, Part 2 — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](feature-scaling-part-2.md)

---

[00:00:01] Let's look at how you can implement feature scaling to take features that take on very different ranges of values and scale them to have comparable ranges of value to each other.  
[00:00:11] So how do you actually scale features?  
[00:00:14] Well, if x1 ranges from 3 to 2,000, one way to get the scale version of x1 is to take each original x1 value and divide by 2,000 the maximum of the range.  
[00:00:28] So the scale of x1 will range from 0.15 up to 1.  
[00:00:34] Similarly, since x2 ranges from 0 to 5,  
[00:00:38] you can calculate a scale version of x2 by taking each original x2 and dividing by 5,  
[00:00:44] which is again the maximum, so the scale x2 will now range from 0 to 1.  
[00:00:52] So if you plot the scaled x1 and x2 on a graph, it might look like this.  
[00:00:58] In addition to divide,  
[00:01:00] by the maximum, you can also do what's called mean normalization.  
[00:01:05] So what does this look like is, you started the original features, and then you rescale them  
[00:01:10] so that both of them are centered around 0.  
[00:01:13] So whereas before, they only had values greater than 0, now they have both negative  
[00:01:18] and positive values, but maybe usually between negative 1 and plus 1.  
[00:01:25] So to calculate the mean normalization of x1, first find the average, also called  
[00:01:30] the mean of x1 on your training set, and let's call this mean mu 1, with this being the  
[00:01:37] Greek alphabet mu. For example, you may find that the average of feature 1, mu1, is 600 square  
[00:01:45] feet. So let's take each x1, subtract the mean mu 1, and then let's divide by the difference,  
[00:01:54] 2,000 minus 300, where 2,000 is the maximum, and 300, the minimum, the minimum, the minimum, the  
[00:02:00] and if you do this, you get the normalized x1 to range from negative 0.18 to 0.82.  
[00:02:09] Similarly, to mean normalized x2, you can calculate the average of feature 2,  
[00:02:16] and for instance, mu2 may be 2.3.  
[00:02:20] Then you can take each x2, subtract mu2, and divide by 5 minus 0,  
[00:02:27] again, the max 5 minus the min, which is 0,  
[00:02:31] the mean normalized x2 now ranges from negative 0.46 to 0.54.  
[00:02:40] So if you plot the training data using the mean normalized x1 and x2, it might look like this.  
[00:02:48] There's one last common rescaling method called z-score normalization.  
[00:02:53] To implement z score normalization, you need to calculate something called the standard deviation of each feature.  
[00:03:00] If you don't know what the standard deviation  
[00:03:02] is, don't worry about it, you won't need to know it for this clause.  
[00:03:06] Or if you've heard of the normal distribution or the bell shape curve, sometimes also called the  
[00:03:11] Gaussian distribution, this is what the standard deviation for the normal distribution looks like.  
[00:03:17] But if you haven't heard of this, you don't need to worry about that either.  
[00:03:21] But if you do know what is the standard deviation, then to implement a z-score normalization,  
[00:03:26] you first calculate the mean, mu, as well as the standard deviation, which is also  
[00:03:32] is often denoted by the lowercase Greek alphabet sigma of each feature.  
[00:03:38] So for instance, maybe feature 1 has a standard deviation of 450 and mean 600, then to  
[00:03:47] Z score normalize x1, take each x1, subtract mu 1, and then divide by the standard  
[00:03:55] deviation, which I'm going to denote as sigma 1.  
[00:04:00] And what you might find is that the z score  
[00:04:02] normalized x1 now ranges from negative 0.67 to 3.1.  
[00:04:10] Similarly, if you calculate the second feature's standard deviation to be 1.4 and mean to be 2.3,  
[00:04:20] then you can compute x2 minus mu2 divided by sigma 2, and in this case, the z score normalized by x2  
[00:04:29] might now range from negative 1.6 to 1.  
[00:04:33] So if you plot the training data on the normalized x1 and x2 on a graph, it might look like this.  
[00:04:43] As a rule of thumb, when performing features scaling, you might want to aim for getting the features  
[00:04:49] to range from maybe anywhere around negative 1 to somewhere around plus 1 for each feature x.  
[00:04:57] But these values, negative 1 and plus 1, can be a little bit loose. So if the features range from negative 3 to  
[00:05:05] plus 3 or negative 0.3 to plus 0.3. All of these are completely okay. So if you  
[00:05:13] have a feature x1 that winds up being between 0 and 3, that's not a problem. And you can rescale it  
[00:05:20] if you want, but if you don't rescale it, it should work okay too. Or if you have a different feature,  
[00:05:26] x2, whose values are between negative 2 and plus 0.5. Again, that's okay. No harm rescaling it,  
[00:05:34] but it might be okay if you leave it alone as well.  
[00:05:38] But if another feature like x3 here ranges from negative 100 to plus 100,  
[00:05:45] then this takes on a very different range of values than something from around negative 1 to plus 1.  
[00:05:51] So you're probably better off rescaling this feature x3 so that it ranges from something  
[00:05:57] closer to negative 1 to plus 1. Similarly, if you have a feature x4 that takes on really  
[00:06:06] small values, say between negative 0.01 and plus 0.01, then these values are so small.  
[00:06:14] That means you may want to rescale it as well. Finally, what of your feature, x5, such as  
[00:06:22] measurements of a hospital patient's body temperature, ranges from 98.6 to 105 degrees Fahrenheit?  
[00:06:32] In this case, these values are around 100, which is  
[00:06:36] actually pretty large compared to other scale features, and this will actually cause  
[00:06:41] gradient descent to run more slowly. So in this case, feature rescaling will likely help.  
[00:06:47] There's almost never any harm to carrying out feature rescaling, so when in doubt,  
[00:06:53] I encourage you to just carry it out. And that's it for feature scaling. With this little technique,  
[00:07:00] you'll often be able to get gradient descent to run much faster. So that's feature scaling.  
[00:07:07] And with or without feature scaling, when you run gradient descent, how can you know,  
[00:07:12] how can you check if gradient descent is really working, if it is finding you the global minimum or  
[00:07:18] something close to it? In the next video, let's take a look at how to recognize if gradient descent  
[00:07:24] is converging, and then in the video after that, this will lead to discussion of how to  
[00:07:30] choose a good learning rate for gradient descent.
