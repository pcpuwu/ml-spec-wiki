# Establishing a Baseline Level of Performance — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](establishing-a-baseline-level-of-performance.md)

---

[00:00:02] Let's look at some concrete numbers for what JTRAIN and JCV might be and see how you  
[00:00:07] can judge if a learning algorithm has high bias or high variance.  
[00:00:12] And for the examples in this video, I'm going to use as a running example the application  
[00:00:17] of speech recognition, which is something I've worked on multiple times over the years.  
[00:00:21] Let's take a look.  
[00:00:23] A lot of users doing web search on a mobile phone will use speech recognition rather than  
[00:00:29] type on the tiny keyboards on our phones, because speaking to our phone is often faster  
[00:00:34] than typing.  
[00:00:36] And so typical audio that a web search engine would get would be like this.  
[00:00:42] What is today's weather?  
[00:00:44] Or like this.  
[00:00:45] Coffee shops near me.  
[00:00:47] And it's the job of the speech recognition algorithm to output the transcripts, what  
[00:00:51] is today's weather or coffee shops near me.  
[00:00:54] Now, if you were to train a speech recognition system and measure the training error, and  
[00:01:01] the training error means what's the percentage of audio clips in your training set that the  
[00:01:06] algorithm does not transcribe correctly in its entirety.  
[00:01:10] Let's say the training error for this data set is 10.8%, meaning that it transcribes  
[00:01:17] it perfectly for 89.2% of your training set, but makes some mistake in 10.8% of your training  
[00:01:25] set.  
[00:01:26] And if you were to also measure your speech recognition algorithm's performance on a separate  
[00:01:31] cross-validation set, let's say it gets 14.8% error.  
[00:01:37] So if you were to look at these numbers, it looks like the training error is really high,  
[00:01:43] you got 10% wrong, and then the cross-validation error is higher, but getting 10% of even your  
[00:01:49] training set wrong, that seems pretty high.  
[00:01:52] And it seems like that 10% error would lead you to conclude it has to have high bias,  
[00:01:57] because it's not doing well on your training set.  
[00:01:59] But it turns out that when analyzing speech recognition, it's useful to also measure one  
[00:02:05] other thing, which is what is the human level of performance.  
[00:02:10] In other words, how well can even humans transcribe speech accurately from these audio  
[00:02:15] clips.  
[00:02:16] And concretely, let's say that you measure how well fluent speakers can transcribe audio  
[00:02:24] clips, and you find that human level performance achieves 10.6% error.  
[00:02:30] Why is human level error so high?  
[00:02:34] It turns out that for web search, there are a lot of audio clips that sound like this.  
[00:02:39] I'm going to navigate to somewhere on the...  
[00:02:43] And there's a lot of noisy audio where really no one can accurately transcribe what was  
[00:02:48] said because of the noise in the audio.  
[00:02:51] And if even a human makes 10.6% error, then it seems difficult to expect a learning algorithm  
[00:02:59] to do much better.  
[00:03:00] And so in order to judge if the training error is high, it turns out to be more useful to  
[00:03:06] see if the training error is much higher than a human level of performance.  
[00:03:12] And in this example, it does just 0.2% worse than humans.  
[00:03:17] Given that humans are actually really good at recognizing speech, I think if I can build  
[00:03:20] a speech recognition system that achieves 10.6% error matching human performance, I'd  
[00:03:25] be pretty happy.  
[00:03:26] So it's just doing a little bit worse than humans.  
[00:03:29] But in contrast, the gap or the difference between JCV and JTrain is much larger.  
[00:03:36] There's actually a 4% gap there.  
[00:03:39] So whereas previously we had said maybe 10.8% error means this is high bias, when we benchmark  
[00:03:47] it to human level performance, we see that the algorithm is actually doing quite well  
[00:03:52] in the training set.  
[00:03:53] But the bigger problem is the cross-validation error is much higher than the training error,  
[00:04:00] which is why I would conclude that this algorithm actually has more of a variance problem than  
[00:04:05] a bias problem.  
[00:04:07] So it turns out when judging if the training error is high, it's often useful to establish  
[00:04:16] a baseline level of performance.  
[00:04:18] And by baseline level of performance, I mean, what is the level of error you can reasonably  
[00:04:23] hope your learning algorithm to eventually get to?  
[00:04:28] And one common way to establish a baseline level of performance is to measure how well  
[00:04:33] humans can do on this task.  
[00:04:36] Because humans are really good at understanding speech data or processing images or understanding  
[00:04:41] text.  
[00:04:42] Human level performance is often a good benchmark when you are using unstructured data such  
[00:04:48] as audio, images, or text.  
[00:04:51] Another way to estimate a baseline level of performance is if there's some competing algorithm,  
[00:04:56] maybe a previous implementation that someone else implemented, or even a competitor's algorithm  
[00:05:03] to establish a baseline level of performance, if you can measure that.  
[00:05:08] Or sometimes you might guess based on prior experience.  
[00:05:12] And if you have access to this baseline level of performance, that is, what is the level  
[00:05:18] of error you can reasonably hope to get to, or what is the design level of performance  
[00:05:22] that you want your algorithm to get to, then when judging if an algorithm has high bias  
[00:05:28] or variance, you would look at the baseline level of performance, and the training error,  
[00:05:34] and the cross-validation error.  
[00:05:36] And the two key quantities to measure are then, what is the difference between training  
[00:05:42] error and the baseline level that you hope to get to?  
[00:05:46] So this is 0.2, and if this is large, then you would say you have a high bias problem,  
[00:05:52] and you would then also look at this gap between your training error and your cross-validation  
[00:05:58] error.  
[00:05:59] And if this is high, then you would conclude you have a high variance problem.  
[00:06:03] And that's why in this example, we concluded we have a high variance problem.  
[00:06:08] Whereas, let's look at the second example.  
[00:06:12] If the baseline level of performance, that is human level performance, and training error  
[00:06:16] and cross-validation error look like this, then this first gap is 4.4%, and so there's  
[00:06:24] actually a big gap.  
[00:06:25] The training error is much higher than what humans can do and what we hope to get to,  
[00:06:30] whereas the cross-validation error is just a little bit bigger than the training error.  
[00:06:34] And so if your training error and cross-validation error look like this, I would say this algorithm  
[00:06:39] has high bias.  
[00:06:42] And so by looking at these numbers, training error and cross-validation error, you can  
[00:06:47] get a sense, intuitively or informally, of the degree to which your algorithm has a high  
[00:06:52] bias or high variance problem.  
[00:06:55] And so just to summarize, this gap between these first two numbers gives you a sense  
[00:07:01] of whether you have a high bias problem, and the gap between these two numbers gives you  
[00:07:07] a sense of whether you have a high variance problem.  
[00:07:11] And sometimes the baseline level of performance could be 0%.  
[00:07:14] If your goal is to achieve perfect performance, then the baseline level of performance could  
[00:07:18] be 0%.  
[00:07:20] But for some applications, like the speech recognition application, where some audio  
[00:07:24] is just noisy, then the baseline level of performance could be much higher than 0%.  
[00:07:28] And the method described on this slide will give you a better read in terms of whether  
[00:07:33] your algorithm suffers from bias or variance.  
[00:07:36] And by the way, it is possible for your algorithm to have high bias and high variance.  
[00:07:41] So concretely, if you get numbers like these, then the gap between the baseline and the  
[00:07:48] training error is large, that would be a 4.4%.  
[00:07:53] And the gap between training error and cross-validation error is also large.  
[00:07:57] This is 4.7%.  
[00:07:58] If it looks like this, you would conclude that your algorithm has high bias and high  
[00:08:03] variance, although hopefully this won't happen that often for your learning applications.  
[00:08:09] So to summarize, we're seeing that looking at whether your training error is large is  
[00:08:13] a way to tell if your algorithm has high bias.  
[00:08:17] But on applications where the data is sometimes just noisy and it's infeasible or unrealistic  
[00:08:23] to ever expect to get to zero error, then it's useful to establish this baseline level  
[00:08:28] of performance so that rather than just asking, is my training error large?  
[00:08:32] You can ask, is my training error large relative to what I hope I can get to eventually, such  
[00:08:38] as is my training error large relative to what humans can do on a task?  
[00:08:42] And that gives you a more accurate read on how far away you are in terms of the training  
[00:08:47] error from where you hope to get to.  
[00:08:50] And then similarly, looking at whether your cross-validation error is much larger than  
[00:08:53] your training error gives you a sense of whether or not your algorithm may have a high variance  
[00:08:58] problem as well.  
[00:09:00] And in practice, this is how I often will look at these numbers to judge if my learning  
[00:09:04] algorithm has a high bias or high variance problem.  
[00:09:08] Now to further hone our intuition about how a learning algorithm is doing, there's one  
[00:09:13] other thing that I found useful to think about, which is the learning curve.  
[00:09:19] Let's take a look at what that means in the next video.
