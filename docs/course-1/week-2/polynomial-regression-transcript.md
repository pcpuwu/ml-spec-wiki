# Polynomial Regression — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](polynomial-regression.md)

---

[00:00:03] So far, we've just been fitting straight lines to our data.  
[00:00:06] Let's take the ideas of multiple linear regression  
[00:00:09] and feature engineering to come up with a new algorithm called polynomial regression,  
[00:00:15] which will let you fit curves, nonlinear functions, to your data.  
[00:00:18] Let's say you have a housing dataset that looks like this,  
[00:00:22] where feature X is the size in square feet.  
[00:00:25] It doesn't look like a straight line fits this dataset very well.  
[00:00:29] So maybe you want to fit a curve,  
[00:00:32] maybe a quadratic function to the data like this,  
[00:00:36] which includes a size X and also X squared,  
[00:00:41] which the size raised to the power of 2.  
[00:00:44] And maybe that will give you a better fit to the data.  
[00:00:47] But then you may decide that your quadratic model doesn't really make sense,  
[00:00:51] because the quadratic function eventually comes back down,  
[00:00:54] and well, we wouldn't really expect housing prices to go down when the size increases, right?  
[00:01:00] Big houses seem like they should  
[00:01:02] it should usually cost more.  
[00:01:04] So then, you may choose a cubic function,  
[00:01:07] where we now have not only x squared, but x cubed.  
[00:01:12] So maybe this model produces this curve here,  
[00:01:16] which is a somewhat better fit to the data  
[00:01:18] because the size does eventually come back up as the size increases.  
[00:01:23] These are both examples of polynomial regression,  
[00:01:26] because you took your optional feature X  
[00:01:29] and raised it to the power of 2 or 3 or any other  
[00:01:33] the power. And in the case of the cubic function, the first feature is the size, the second  
[00:01:39] feature is the size squared, and the third feature is the size cubed.  
[00:01:44] I just want to point out one more thing, which is that if you create features that are these powers  
[00:01:50] like the square of the original features like this, then feature scaling becomes increasingly  
[00:01:56] important. So if the size of the house ranges from, say, 1 to 1,000 square feet, then the second  
[00:02:03] feature, which is a size squared, would range from 1 to a million, and the third feature,  
[00:02:10] which is size cubed, ranges from 1 to a billion.  
[00:02:14] So these two features, x squared and x cubed, take on very different ranges of values compared  
[00:02:21] to the original feature X, and if you're using gradient descent, it's important to apply  
[00:02:26] feature scaling to get your features into comparable ranges of values.  
[00:02:32] Finally, here's one last example of how you really have a wide range of choices of features to use.  
[00:02:39] Another reasonable alternative to taking the size squared and size cubed is to, say, use the square root of x.  
[00:02:46] So your model may look like w1 times x plus w2 times the square root of x plus b.  
[00:02:55] The square root function looks like this and it becomes a bit less steep as x increases, but it doesn't  
[00:03:02] ever completely flattened out and it certainly never ever comes back down.  
[00:03:07] So this would be another choice of features that might work well for this dataset as well.  
[00:03:12] So you may ask yourself, how do I decide what features to use?  
[00:03:17] Later, in the second course in the specialization, you see how you can choose different  
[00:03:22] features and different models that include or don't include these features,  
[00:03:26] and you have a process for measuring how well these different models perform to help you decide,  
[00:03:32] which features include or not include.  
[00:03:35] For now, I just want you to be aware that you have a choice in what features you use,  
[00:03:40] and by using feature engineering and polynomial functions,  
[00:03:43] you can potentially get a much better model for your data.  
[00:03:47] In the optional lab that follows this video,  
[00:03:51] you will see some code that implements polynomial regression using features like x, x squared, and x cubed.  
[00:03:58] So please take a look and run the code and see how it works.  
[00:04:02] There's also a look.  
[00:04:04] There's also another optional lab after that one that shows how to use a popular open source toolkit that implements linear regression.  
[00:04:13] PsychoidLearn is a very widely used open source machine learning library that is used by many practitioners in many of the top AI, internet, machine learning companies in the world.  
[00:04:26] So if either now or in the future you're using machine learning in your job,  
[00:04:30] there's a very good chance you'll be using tools like psyched learn to train your models.  
[00:04:35] And so working through that  
[00:04:38] optional lab will give you a chance to not only better understand linear regression,  
[00:04:43] but also see how this can be done in just a few lines of code using a library like psyched learn.  
[00:04:49] For you to have a solid understanding of these algorithms and be able to apply them,  
[00:04:55] I do think it's important that you know how to implement linear regression yourself  
[00:05:00] and not just call some psyched learn function that is a black box.  
[00:05:04] But psychlearn also has an important role in the way machine learning is done in  
[00:05:09] practice today. So we're just about at the end of this week. Congratulations on  
[00:05:15] finishing all of this week's videos. Please do take a look at the practice quizzes and  
[00:05:20] also the practice lab, which I hope will let you try out and practice ideas that we've  
[00:05:26] discussed. In this week's practice lab, you implement linear regression. I hope you have a lot  
[00:05:32] of fun getting this learning algorithm to work for yourself. Best of luck with that, and I also  
[00:05:38] look forward to seeing you in next week's videos where we'll go beyond regression,  
[00:05:43] that is predicting numbers, to talk about our first classification algorithm which can predict  
[00:05:48] categories. I'll see you next week.
