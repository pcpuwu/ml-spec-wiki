# Choosing What Features to Use — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](choosing-what-features-to-use.md)

---

[00:00:02] When building an anomaly detection algorithm, I found that choosing a good choice of features  
[00:00:08] turns out to be really important.  
[00:00:11] In supervised learning, if you don't have the features quite right, or if you have a  
[00:00:15] few extra features that are not relevant to the problem, that often turns out to be okay  
[00:00:20] because the algorithm has the supervised signal, that is, enough labels Y for the algorithm  
[00:00:26] to figure out what features to ignore, or how to rescale a feature, and to take the  
[00:00:31] best advantage of the features you do give it.  
[00:00:35] But for anomaly detection, which runs or learns just from unlabeled data, it's harder for  
[00:00:41] the algorithm to figure out what features to ignore.  
[00:00:44] So I've found that carefully choosing the features is even more important for anomaly  
[00:00:49] detection than for supervised learning approaches.  
[00:00:53] Let's take a look in this video at some practical tips for how to tune the features for anomaly  
[00:00:58] detection to try to get you the best possible performance.  
[00:01:01] One step that can help your anomaly detection algorithm is to try to make sure the features  
[00:01:07] you give it are more or less Gaussian.  
[00:01:11] And if your features are not Gaussian, sometimes you can change it to make it a little bit  
[00:01:17] more Gaussian.  
[00:01:18] Let me show you what I mean.  
[00:01:21] If you have a feature X, I will often plot a histogram of the feature, which you can  
[00:01:29] do using the Python command plt.his.  
[00:01:34] You see this in the practice lab as well, in order to look at the histogram of the data.  
[00:01:41] This distribution here looks pretty Gaussian, so this would be a good candidate feature  
[00:01:46] if you think this is a feature that helps distinguish between anomalies and normal  
[00:01:51] examples.  
[00:01:52] But quite often, when you plot a histogram of your features, you may find that a feature  
[00:01:59] has a distribution like this.  
[00:02:01] This does not at all look like that symmetric bell-shaped curve.  
[00:02:07] When that is the case, I would consider if you can take this feature X and transform  
[00:02:16] it in order to make it more Gaussian.  
[00:02:19] For example, maybe if you were to compute the log of X and plot a histogram of log of  
[00:02:26] X, it would look like this, and this looks much more Gaussian.  
[00:02:32] If this feature was feature X1, then instead of using the original feature X1, which looks  
[00:02:39] like this on the left, you might instead replace that feature with log of X1 to get this distribution  
[00:02:47] over here.  
[00:02:48] Because when X1 is made more Gaussian, when anomaly detection models p of X1 using a Gaussian  
[00:02:57] distribution like that is more likely to be a good fit to the data.  
[00:03:02] Other than the log function, other things you might do is, given a different feature  
[00:03:07] X2, you may replace it with X2 log of X2 plus 1.  
[00:03:13] This would be a different way of transforming X2.  
[00:03:17] And more generally, log of X2 plus C would be one example of a formula you can use to  
[00:03:24] change X2 to try to make it more Gaussian.  
[00:03:29] Or for a different feature, you might try taking the square root, or really, the square  
[00:03:33] root of X cubed is X3 to the power of 1 half, and you may change that exponentiation term.  
[00:03:41] So for a different feature X4, you might use X4 to the power of 1 third, for example.  
[00:03:47] So when I'm building an anomaly detection system, I'll sometimes take a look at my features  
[00:03:52] and if I see any that are highly non-Gaussian by plotting a histogram, I might choose transformations  
[00:03:59] like these or others in order to try to make it more Gaussian.  
[00:04:03] It turns out a larger value of C will end up transforming this distribution less.  
[00:04:11] But in practice, I just try a bunch of different values of C and then try to pick one that  
[00:04:17] looks better in terms of making the distribution more Gaussian.  
[00:04:22] Now let me illustrate how I actually do this in a Jupyter Notebook.  
[00:04:27] So this is what the process of exploring different transformations in the features might look like.  
[00:04:33] When you have a feature X, you can plot a histogram of it as follows.  
[00:04:39] It actually looks like this is a pretty coarse histogram.  
[00:04:44] Let me increase the number of bins in my histogram to 50, so bins equals 50.  
[00:04:51] There's more histogram bins.  
[00:04:53] Oh, and by the way, if you want to change the color, you can also do so as follows.  
[00:05:00] And if you want to try a different transformation, you can try, for example, to plot X square  
[00:05:08] root of X, so X to the power of 0.5 with, again, 50 histogram bins, in which case it  
[00:05:16] might look like this.  
[00:05:18] And this actually looks somewhat more Gaussian, but not perfectly.  
[00:05:23] And let's try a different parameter.  
[00:05:25] So let me try to the power of 0.25.  
[00:05:31] Maybe I adjusted a little bit too far to the 0.4.  
[00:05:34] That looks pretty Gaussian.  
[00:05:36] So one thing you could do is replace X with X to the power of 0.4.  
[00:05:42] So you would set X to be equal to X to the power of 0.4 and just use the value of X in  
[00:05:51] your training process instead.  
[00:05:53] Well, let me show you another transformation.  
[00:05:56] Here I'm going to try taking the log of X.  
[00:05:59] So log of X, let's plot it with 50 bins, but I'm going to use the numpy log function as  
[00:06:09] follows.  
[00:06:10] It turns out you get an error because it turns out that X in this example has some values  
[00:06:17] that are equal to 0 and, well, log of 0 is negative infinity, it's not defined.  
[00:06:23] So common trick is to add just a very tiny number there.  
[00:06:29] So X plus 0.001 becomes non-negative.  
[00:06:33] And so you get a histogram that looks like this.  
[00:06:36] And if you want the distribution to look more Gaussian, you can also play around with  
[00:06:40] this parameter to try to see if there's a value that causes the data to look more symmetric  
[00:06:48] and maybe look more Gaussian as follows.  
[00:06:52] And just as I'm doing right now in real time, you can see that you can very quickly change  
[00:06:58] these parameters and plot the histogram in order to try to take a look and try to get  
[00:07:04] something a bit more Gaussian than was the original data X that you saw in this histogram  
[00:07:13] up above.  
[00:07:14] If you read the machine learning literature, there are some ways to automatically measure  
[00:07:19] how close these distributions are to Gaussians, but I've found that in practice, it doesn't  
[00:07:24] make a big difference.  
[00:07:25] If you just try a few values and pick something that looks right to you, that will work well  
[00:07:30] for our practical purposes.  
[00:07:32] So by trying things out in a Jupyter notebook, you can try to pick a transformation that  
[00:07:39] makes your data more Gaussian.  
[00:07:41] And just as a reminder, whatever transformation you apply to the training set, please remember  
[00:07:48] to apply the same transformation to your cross-validation and test set data as well.  
[00:07:53] Other than making sure that your data is approximately Gaussian, after you've trained your anomaly  
[00:08:00] detection algorithm, if it doesn't work that well on your cross-validation set, you can  
[00:08:07] also carry out an error analysis process for anomaly detection.  
[00:08:13] In other words, you can try to look at where the algorithm is not yet doing well, where  
[00:08:17] it's making errors, and then use that to try to come up with improvements.  
[00:08:24] So as a reminder, what we want is for p of x to be large for normal examples x, so greater  
[00:08:32] than or equal to epsilon, and p of x to be small, or less than epsilon, for the anomalous  
[00:08:39] examples x.  
[00:08:40] When you've learned the model p of x from your unlabeled data, the most common problem  
[00:08:46] that you may run into is that p of x is comparable in value, say is large for both normal and  
[00:08:53] for anomalous examples.  
[00:08:55] As a concrete example, if this is your data set, you might fit that Gaussian to it, and  
[00:09:03] if you have an example in your cross-validation set or test set that is over here, that is  
[00:09:09] anomalous, then this has a pretty high probability, and in fact it looks quite similar to the  
[00:09:14] other examples in your training set.  
[00:09:17] And so even though this is an anomaly, p of x is actually pretty large, and so the  
[00:09:24] algorithm will fail to flag this particular example as an anomaly.  
[00:09:28] In that case, what I would normally do is try to look at that example and try to figure  
[00:09:36] out what is it that made me think it's an anomaly, even if this feature, x1, took on  
[00:09:43] values similar to other training examples.  
[00:09:47] And if I can identify some new feature, say x2, that helps distinguish this example from  
[00:09:57] the normal examples, then adding that feature can help improve the performance of the algorithm.  
[00:10:03] Here's a picture showing what I mean.  
[00:10:05] If I can come up with a new feature, x2, say I'm trying to detect fraudulent behavior,  
[00:10:12] and if x1 is the number of transactions they make, maybe this user looks like they're  
[00:10:19] making similar transactions as everyone else.  
[00:10:23] But if I discover that this user has some insanely fast typing speed, and if I were  
[00:10:29] to add a new feature, x2, that is the typing speed of this user.  
[00:10:35] And if it turns out that when I plot this data using the old feature, x1, and this new  
[00:10:40] feature, x2, causes x2 to stand out over here, then it becomes much easier for the  
[00:10:47] anomaly detection algorithm to recognize that x2 is an anomalous user.  
[00:10:52] Because when you have this new feature, x2, the learning algorithm may fit a Gaussian  
[00:10:58] distribution that assigns high probability to points in this region, a bit lower in this  
[00:11:03] region, and a bit lower in this region.  
[00:11:07] And so this example, because of the very anomalous value of x2, becomes easier to  
[00:11:13] detect as an anomaly.  
[00:11:16] So just to summarize, the development process I'll often go through is to train a model  
[00:11:22] and then to see what anomalies in the cross-validation set the algorithm is failing to detect, and  
[00:11:29] then to look at those examples to see if that can inspire the creation of new features that  
[00:11:35] would allow the algorithm to spot that that example takes on unusually large or unusually  
[00:11:42] small values on the new features, so that it can now successfully flag those examples  
[00:11:47] as anomalies.  
[00:11:49] Just as one more example, let's say you're building an anomaly detection system to monitor  
[00:11:54] computers in a data center to try to figure out if a computer may be behaving strangely  
[00:12:00] and deserves a closer look, maybe because of a hardware failure or because it's been  
[00:12:05] hacked into or something.  
[00:12:07] So what you like to do is to choose features that might take on unusually large or small  
[00:12:11] values in the event of an anomaly.  
[00:12:15] You might start off with features like x1 is the memory use, x2 is number of disk accesses  
[00:12:20] per second, then the CPU load, and the volume of network traffic.  
[00:12:25] And if you train the algorithm, you may find that it detects some anomalies but fails to  
[00:12:33] detect some other anomalies.  
[00:12:35] In that case, it's not unusual to create new features by combining old features.  
[00:12:42] So for example, if you find that there's a computer that is behaving very strangely,  
[00:12:49] but neither is CPU load nor network traffic, is that unusual?  
[00:12:54] But what is unusual is it has a really high CPU load while having a very low network traffic  
[00:13:00] volume.  
[00:13:02] If you're running a data center that streams videos, then computers may have high CPU load  
[00:13:08] and high network traffic or low CPU load and no network traffic.  
[00:13:12] But what's unusual about this one machine is it has very high CPU load despite a very  
[00:13:16] low traffic volume.  
[00:13:17] In that case, you might create a new feature, x5, which is a ratio of CPU load to network  
[00:13:23] traffic, and this new feature would help the anomaly detection algorithm flag future examples  
[00:13:29] like the specific machine you may be seeing as anomalous.  
[00:13:34] Or you can also consider other features like the square of the CPU load divided by the  
[00:13:42] network traffic volume, and you can play around with different choices of these features in  
[00:13:48] order to try to get it so that p of x is still large for the normal examples, but it becomes  
[00:13:55] small in the anomalies in your cross-validation set.  
[00:14:00] So that's it.  
[00:14:01] Thanks for sticking with me to the end of this week.  
[00:14:03] I hope you enjoyed hearing about both clustering algorithms and anomaly detection algorithms,  
[00:14:10] and that you also enjoy playing with these ideas in the practice labs.  
[00:14:16] Next week, we'll go on to talk about recommender systems.  
[00:14:20] When you go to a website and it recommends products or movies or other things to you,  
[00:14:25] how does that algorithm actually work?  
[00:14:28] This is one of the most commercially important algorithms in machine learning that gets talked  
[00:14:34] about surprisingly little, but next week, we'll take a look at how these algorithms  
[00:14:39] work so that you understand the next time you go to a website and it recommends something  
[00:14:43] to you, maybe how that came about, as well as you'll be able to build other algorithms  
[00:14:48] like that for yourself as well.  
[00:14:50] So have fun with the labs, and I look forward to seeing you next week.
