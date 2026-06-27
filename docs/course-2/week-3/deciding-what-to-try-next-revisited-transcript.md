# Deciding What to Try Next (Revisited) — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](deciding-what-to-try-next-revisited.md)

---

[00:00:02] You've seen how by looking at Jtrain and Jcv, that is the training error and the cross-validation  
[00:00:08] error, or maybe even plotting a learning curve, you can try to get a sense of whether your  
[00:00:14] learning algorithm has high bias or high variance.  
[00:00:17] This is a procedure I routinely do when I'm training a learning algorithm.  
[00:00:21] I'll often look at the training error and the cross-validation error to try to decide  
[00:00:25] if my algorithm has high bias or high variance.  
[00:00:28] It turns out this will help you make better decisions about what to try next in order  
[00:00:32] to improve the performance of your learning algorithm.  
[00:00:35] Let's look at an example.  
[00:00:38] This is actually the example that you had seen earlier.  
[00:00:41] If you've implemented regularized linear regression on predicting housing prices, but your algorithm  
[00:00:48] makes unacceptably large errors in its predictions, what do you try next?  
[00:00:53] And these are the six ideas that we had when we had looked over this slide earlier.  
[00:00:57] We looked at more training examples, tried a smaller set of features, additional features,  
[00:01:01] and so on.  
[00:01:02] It turns out that each of these six items either helps fix a high variance or a high  
[00:01:09] bias problem.  
[00:01:11] And in particular, if your learning algorithm has high bias, three of these techniques will  
[00:01:17] be useful.  
[00:01:18] If your learning algorithm has high variance, then a different three of these techniques  
[00:01:23] will be useful.  
[00:01:24] Let's see if we can figure out which is which.  
[00:01:27] First, one is get more training examples.  
[00:01:31] We saw in the last video that if your algorithm has high bias, then if the only thing we do  
[00:01:37] is get more training data, that by itself probably won't help that much.  
[00:01:43] But in contrast, if your algorithm had high variance, say it was overfitting to a very  
[00:01:49] small training set, then getting more training examples will help a lot.  
[00:01:55] So this first option of getting more training examples helps to fix a high variance problem.  
[00:02:02] How about the other five?  
[00:02:04] Do you think you can figure out which of the remaining five fix high bias or high variance  
[00:02:09] problems?  
[00:02:10] I'm going to go through the rest of them in this video in a minute, but if you want,  
[00:02:13] feel free to pause the video and see if you can think through these five other things  
[00:02:18] by yourself.  
[00:02:18] So feel free to pause the video.  
[00:02:22] Just kidding, that was me pausing, not your video pausing.  
[00:02:25] But seriously, if you want, go ahead and pause the video and think through it if you want  
[00:02:29] or not, and we'll go over these with you in a minute.  
[00:02:32] How about trying a smaller set of features?  
[00:02:36] Sometimes if your learning algorithm has too many features, then it gives the algorithm  
[00:02:42] too much flexibility to fit very complicated models.  
[00:02:46] This is a little bit like if you had x, x squared, x cubed, x to the fourth, x to the  
[00:02:52] fifth, and so on.  
[00:02:54] And if only you were to eliminate a few of these, then your model won't be so complex  
[00:03:00] and won't have such high variance.  
[00:03:03] So if you suspect that your algorithm has a lot of features that are not actually relevant  
[00:03:09] or helpful to predicting a housing price, or if you suspect that you had even somewhat  
[00:03:15] redundant features, then eliminating or reducing the number of features will help reduce the  
[00:03:22] flexibility of your algorithm to overfit the data.  
[00:03:26] And so this is a tactic that will help you to fix high variance.  
[00:03:30] Conversely, getting additional features, that's just adding additional features, is kind of  
[00:03:34] the opposite of going to a smaller set of features.  
[00:03:38] This will help you to fix a high bias problem.  
[00:03:42] As a concrete example, if you were trying to predict the price of a house just based  
[00:03:46] on the size, but it turns out that the price of a house also really depends on the number  
[00:03:52] of bedrooms and on the number of floors and on the age of a house, then the algorithm  
[00:03:58] will never do that well unless you add in those additional features.  
[00:04:01] So that's a high bias problem because you just can't do that well on the training set  
[00:04:07] when you know only the size.  
[00:04:09] It's only when you tell the algorithm how many bedrooms are there, how many floors are  
[00:04:14] there, what's the age of the house, that it finally has enough information to even do  
[00:04:17] better on the training set.  
[00:04:20] And so adding additional features is a way to fix a high bias problem.  
[00:04:26] Adding polynomial features is a little bit like adding additional features.  
[00:04:30] So if your linear function, straight line, can't fit the training set that well, then  
[00:04:36] adding additional polynomial features could help you do better on the training set.  
[00:04:40] And helping you do better on the training set is a way to fix a high bias problem.  
[00:04:46] And then decreasing lambda means to use a lower value for the regularization parameter.  
[00:04:54] And that means we're going to pay less attention to this term and pay more attention to this  
[00:04:58] term to try to do better on the training set.  
[00:05:01] And again, that helps you to fix a high bias problem.  
[00:05:05] And finally, increasing lambda, well, that's the opposite of this.  
[00:05:09] But that says you're overfitting the data.  
[00:05:12] And so increasing lambda would make sense if it's overfitting the training set, just  
[00:05:17] putting too much attention to fitting the training set, but at the expense of generalizing  
[00:05:22] to new examples.  
[00:05:24] And so increasing lambda would force the algorithm to fit a smoother function, maybe a less wiggly  
[00:05:30] function, and use this to fix a high variance problem.  
[00:05:35] So I realize that this was a lot of stuff on this slide, but the takeaways I hope you  
[00:05:41] have are, if you find that your algorithm has high variance, then the two main ways  
[00:05:46] to fix that are either get more training data or simplify your model.  
[00:05:53] And by simplify model, I mean either get a smaller set of features or increase the  
[00:06:00] regularization parameter lambda so your algorithm has less flexibility to fit very complex,  
[00:06:05] very wiggly curves.  
[00:06:08] Conversely, if your algorithm has high bias, then that means it's not doing well, even  
[00:06:14] on the training set.  
[00:06:16] So if that's the case, the main fixes are to make your model more powerful, to give  
[00:06:21] it more flexibility, to fit more complex or more wiggly functions.  
[00:06:26] And so some ways to do that are to give it additional features or add these polynomial  
[00:06:31] features or to decrease the regularization parameter lambda.  
[00:06:36] By the way, in case you're wondering if you should fix high bias by reducing the training  
[00:06:42] set size, that doesn't actually help.  
[00:06:44] If you reduce the training set size, you will fit the training set better, but that tends  
[00:06:48] to worsen your cross-validation error and the performance of your learning algorithm.  
[00:06:52] So don't randomly throw away training examples.  
[00:06:55] Just to try to fix a high bias problem.  
[00:06:57] One of my PhD students from Stanford, many years after he'd already graduated from Stanford,  
[00:07:02] once said to me that while he was studying at Stanford, he learned about bias-invariance  
[00:07:08] and felt like he got it, he understood it.  
[00:07:11] But that subsequently, after many years of work experience in a few different companies,  
[00:07:16] he realized that bias-invariance is one of those concepts that takes a short time to  
[00:07:21] learn but takes a lifetime to master.  
[00:07:24] Those were his exact words.  
[00:07:26] And I think bias-invariance, it is one of those very powerful ideas.  
[00:07:31] When I'm training learning algorithms, I almost always try to figure out if it is  
[00:07:36] high bias or high variance.  
[00:07:38] But the way you go about addressing it systematically is something that I think you will keep on  
[00:07:44] getting better at through repeated practice.  
[00:07:48] But you'll find, I think, that understanding these ideas will help you be much more effective  
[00:07:53] at how you decide what to try next when developing a learning algorithm.  
[00:07:59] Now, I know that we did go through a lot in this video.  
[00:08:03] And if you feel like, boy, there's just a lot of stuff here, it's okay, don't worry  
[00:08:06] about it.  
[00:08:07] Later this week, in the practice labs and practice quizzes, we'll have also additional  
[00:08:12] opportunities to go over these ideas so you can get additional practice with thinking  
[00:08:17] about bias-invariance of different learning algorithms.  
[00:08:21] So if it seems like a lot right now, it's okay.  
[00:08:24] You get to practice these ideas later this week and hopefully deepen your understanding  
[00:08:28] of them at that time.  
[00:08:31] Before moving on, bias-invariance also are very useful when thinking about how to train  
[00:08:37] a neural network.  
[00:08:39] So in the next video, let's take a look at these concepts applied to neural network  
[00:08:43] training.  
[00:08:44] Let's go on to the next video.
