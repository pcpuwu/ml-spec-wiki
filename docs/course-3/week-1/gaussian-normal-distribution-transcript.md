# Gaussian (Normal) Distribution — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](gaussian-normal-distribution.md)

---

[00:00:02] In order to apply anomaly detection, we're going to need to use the Gaussian distribution, which is also called the normal distribution.  
[00:00:11] So when you hear me say either Gaussian distribution or normal distribution, they mean exactly the same thing.  
[00:00:18] And if you've heard of the bell-shaped distribution, that also refers to the same thing.  
[00:00:24] But if you haven't heard of the bell-shaped distribution, that's fine too.  
[00:00:28] But let's take a look at what is the Gaussian or the normal distribution.  
[00:00:33] Say X is a number, and if X is a random number, sometimes called a random variable, but if X can take on random values,  
[00:00:42] and if the probability of X is given by a Gaussian or normal distribution with mean parameter mu and with variance sigma squared,  
[00:00:55] what that means is that the probability of X looks like a curve that goes like this.  
[00:01:04] The center or the middle of the curve is given by the mean, mu, and the standard deviation or the width of this curve is given by that variance parameter, sigma.  
[00:01:20] Technically, sigma is called the standard deviation, and the square of sigma or sigma squared is called the variance of the distribution.  
[00:01:29] And this curve here shows what is P of X or the probability of X.  
[00:01:35] If you've heard of the bell-shaped curve, this is that bell-shaped curve because a lot of classic bells, say in towers, were kind of shaped like this, with the bell clapper hanging down here.  
[00:01:50] And so the shape of this curve is vaguely reminiscent of the shape of the large bells that you will still find in some old buildings today.  
[00:02:00] Better looking than my hand-drawn one, there's a picture of the Liberty Bell, and indeed the Liberty Bell's shape on top is a vaguely bell-shaped curve.  
[00:02:12] If you're wondering what this P of X really means, here's one way to interpret it.  
[00:02:19] It means that if you were to get, say, 100 numbers drawn from this probability distribution, and you were to plot a histogram of these 100 numbers drawn from this distribution,  
[00:02:32] you might get a histogram that looks like this, and so it looks vaguely bell-shaped.  
[00:02:37] And what this curve on the left indicates is not if you have just 100 examples, or 1,000, or 1,000,000, or 1,000,000, but if you had a practically infinite number of examples,  
[00:02:51] and you were to draw a histogram of this practically infinite number of examples with a very, very fine histogram bin, then you end up with, essentially, this bell-shaped curve here on the left.  
[00:03:05] The formula for P of X is given by this expression, P of X equals 1 over square root 2 pi.  
[00:03:15] Pi here is that 3.14159, which is about 22 over 7, the ratio of a circle's diameter to circumference, times sigma, times e to the negative X minus mu, the mean parameter squared, divided by 2 sigma squared.  
[00:03:36] And for any given value of mu and sigma, if you were to plot this function as a function of X, you get this type of bell-shaped curve that is centered at mu, and with the width of this bell-shaped curve being determined by the parameter sigma.  
[00:03:56] Now, let's look at a few examples of how changing mu and sigma will affect the Gaussian distribution.  
[00:04:04] First, let me set mu equals to 0 and sigma equals 1.  
[00:04:09] Here's my plot of a Gaussian distribution with mean 0, mu equals 0, and standard deviation sigma equals 1.  
[00:04:19] You notice that this distribution is centered at 0, and that is the standard deviation sigma is equal to 1.  
[00:04:28] Now, let's reduce the standard deviation sigma to 0.5.  
[00:04:34] If you plot the Gaussian distribution with mu equals 0 and sigma equals 0.5, it now looks like this.  
[00:04:43] Notice that it's still centered at 0 because mu is 0, but it's become a much thinner curve because sigma is now 1.5.  
[00:04:54] And you might recall that sigma, the standard deviation, is 0.5, whereas sigma squared is also called a variance, and so that's equal to 0.5 squared or 0.25.  
[00:05:08] You may have heard that probabilities always have to sum up to 1, so that's why the area under the curve is always equal to 1,  
[00:05:16] which is why when the Gaussian distribution becomes skinnier, it has to become taller as well.  
[00:05:23] Let's look at another value of mu and sigma.  
[00:05:26] Now I'm going to increase sigma to 2, so the standard deviation is 2, and the variance is 4.  
[00:05:35] This now creates a much wider distribution because sigma here is now much larger,  
[00:05:43] and because it's now a wider distribution, it's become shorter as well because the area under the curve is still equal to 1.  
[00:05:51] And finally, let's try changing the mean parameter mu, and I'll leave sigma equals 0.5.  
[00:06:00] In this case, the center of the distribution, mu, moves over here to the right,  
[00:06:07] but the width of the distribution is the same as the one on top because the standard deviation is 0.5 in both of these cases on the right.  
[00:06:17] So this is how different choices of mu and sigma affect the Gaussian distribution.  
[00:06:24] When you're applying this to anomaly detection, here's what you have to do.  
[00:06:29] You're given a data set of m examples, and here x is just a number, and here are parts of the training set with 11 examples.  
[00:06:41] And what we have to do is try to estimate what are good choices for the mean parameter, mu,  
[00:06:48] as well as for the variance parameter, sigma squared.  
[00:06:53] And given a data set like this, it would seem that a Gaussian distribution may be looking like that,  
[00:07:01] with a center here and a standard deviation kind of like that.  
[00:07:06] This might be a pretty good fit to the data.  
[00:07:09] The way you would compute mu and sigma squared mathematically is,  
[00:07:14] our estimate for mu will be just the average of all the returning examples.  
[00:07:19] So 1 over m times sum from i equals 1 through m of the values of the returning examples.  
[00:07:26] And the value we would use to estimate sigma squared will be the average of the squared difference between the examples  
[00:07:34] and that mu that you just estimated here on the left.  
[00:07:39] It turns out that if you implement these two formulas in code with this value for mu and this value for sigma squared,  
[00:07:47] then you pretty much get the Gaussian distribution that I hand drew on top.  
[00:07:51] And this will give you a choice of mu and sigma for a Gaussian distribution,  
[00:07:56] so that it kind of looks like the 11 training examples might have been drawn from this Gaussian distribution.  
[00:08:03] If you've taken an advanced statistics class, you may have heard that these formulas for mu and sigma squared  
[00:08:10] are technically called the maximum likelihood estimates for mu and sigma.  
[00:08:15] And some statistics classes will tell you to use the formula 1 over m minus 1 instead of 1 over m.  
[00:08:23] In practice, using 1 over m or 1 over m minus 1 makes very little difference.  
[00:08:29] I always use 1 over m, but there are some other properties of dividing by m minus 1 that some statisticians prefer.  
[00:08:39] But if you don't understand what I just said, don't worry about it.  
[00:08:43] All you need to know is that if you set mu according to this formula and sigma squared according to this formula,  
[00:08:51] you get a pretty good estimate of mu and sigma.  
[00:08:55] And in particular, you get a Gaussian distribution that will be a plausible probability distribution  
[00:09:01] in terms of what's the probability distribution that the training examples had come from.  
[00:09:07] You can probably guess what comes next.  
[00:09:10] If you were to get an example over here, then p of x is pretty high.  
[00:09:19] Whereas if you were to get an example way out here, then p of x is pretty low,  
[00:09:25] which is why we would consider this example okay, not really anomalous, not a lot like the other ones.  
[00:09:32] Whereas an example way out here to be pretty unusual compared to the examples we've seen and therefore more anomalous.  
[00:09:40] Because p of x, which is the height of this curve, is much lower over here on the left compared to this point over here closer to the middle.  
[00:09:49] Now, we've done this only for when x is a number, as if you had only a single feature for your anomaly detection problem.  
[00:09:59] For practical anomaly detection applications, you usually have a lot of different features.  
[00:10:05] So you've now seen how the Gaussian distribution works if x is a single number.  
[00:10:12] This corresponds to if, say, you had just one feature for your anomaly detection problem.  
[00:10:18] But for practical anomaly detection applications, you will have many features, two or three or some even larger number n of features.  
[00:10:28] Let's take what you saw for a single Gaussian and use it to build a more sophisticated anomaly detection algorithm that can handle multiple features.  
[00:10:37] Let's go do that in the next video.
