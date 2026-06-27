# Error Analysis — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](error-analysis.md)

---

[00:00:02] In terms of the most important ways to help you run diagnostics, to choose what to try  
[00:00:07] next to improve your learning algorithm performance, I would say bias and variance is probably  
[00:00:12] the most important idea, and error analysis would probably be second on my list.  
[00:00:17] So let's take a look at what this means.  
[00:00:19] Concretely, let's say you have MCV equals 500 cross-validation examples, and your algorithm  
[00:00:28] misclassifies 100 of these 500 cross-validating examples.  
[00:00:33] The error analysis process just refers to manually looking through these 100 examples  
[00:00:40] and trying to gain insights into where the algorithm is going wrong.  
[00:00:45] Specifically, what I would often do is find a set of examples that the algorithm has misclassified  
[00:00:53] examples from the cross-validation set, and try to group them into common themes or common  
[00:01:00] properties or common traits.  
[00:01:03] So for example, if you notice that quite a lot of the misclassified spam emails are pharmaceutical  
[00:01:10] sales trying to sell medicines or drugs, then I would actually go through these examples  
[00:01:15] and count up by hand how many emails it misclassified are pharmaceutical spam, and say there are  
[00:01:22] 21 emails that are pharmaceutical spam.  
[00:01:25] Or, if you suspect that deliberate misspellings may be tripping up your spam classifier, then  
[00:01:33] I would also go through and just count up how many of these examples that it misclassified  
[00:01:39] had a deliberate misspelling.  
[00:01:40] Let's say I find 3 out of 100.  
[00:01:43] Or, looking through the email routing info, I find 7 has unusual email routing, and 18  
[00:01:53] are emails trying to steal passwords or phishing emails.  
[00:01:57] Spammers sometimes also, instead of writing the spam message in the email body, they instead  
[00:02:04] create an image and then write the spammy message inside an image that appears in the  
[00:02:10] email.  
[00:02:11] This makes it a little bit harder for a learning algorithm to figure out what's going on.  
[00:02:14] And so, maybe some of those emails are these embedded image spam.  
[00:02:19] If you end up with these counts, then that tells you that pharmaceutical spam and emails  
[00:02:28] trying to steal passwords or phishing emails seem to be huge problems, whereas deliberate  
[00:02:35] misspellings, while it is a problem, it is a smaller one.  
[00:02:39] In particular, what this analysis tells you is that even if you were to build really sophisticated  
[00:02:45] algorithms to find deliberate misspellings, it would only solve 3 out of 100 of your  
[00:02:52] misclassified examples.  
[00:02:54] So the net impact seems like it may not be that large.  
[00:02:58] It doesn't mean it's not worth doing, but when you're prioritizing what to do, you  
[00:03:03] might therefore decide not to prioritize this as highly.  
[00:03:06] And by the way, I'm telling the story because I once actually spent a lot of time building  
[00:03:11] algorithms to find deliberate misspellings and spam emails, only much later to realize  
[00:03:17] that the net impact was actually quite small.  
[00:03:19] So this is one example where I wish I had done more careful error analysis before spending  
[00:03:24] a lot of time myself trying to find these deliberate misspellings.  
[00:03:29] Just a couple of notes on this process.  
[00:03:32] These categories can be overlapping, or in other words, they're not mutually exclusive.  
[00:03:38] So for example, there can be a pharmaceutical spam email that also has unusual routing,  
[00:03:44] or a password that has deliberate misspellings and is also trying to carry out a phishing  
[00:03:51] attack.  
[00:03:52] So one email can be counted in multiple categories.  
[00:03:56] And in this example, I had said that the algorithm misclassifies 100 examples and will look at  
[00:04:03] all 100 examples manually.  
[00:04:05] If you have a larger cross-validation set, say if you had 5,000 cross-validation examples,  
[00:04:12] and if the algorithm misclassified, say, 1,000 of them, then you may not have the time, depending  
[00:04:19] on the team size and how much time you have to work on this project, you may not have  
[00:04:25] the time to manually look at all 1,000 examples that the algorithm misclassifies.  
[00:04:30] In that case, I will often sample randomly a subset of usually around 100, maybe a couple  
[00:04:36] hundred examples, because that's the amount that you can look through in a reasonable  
[00:04:40] amount of time.  
[00:04:42] And hopefully, looking through maybe around 100 examples will give you enough statistics  
[00:04:47] about what are the most common types of errors, and therefore where may be most fruitful to  
[00:04:52] focus your attention.  
[00:04:54] And so after this analysis, if you find that a lot of errors are pharmaceutical spam emails,  
[00:05:02] then this might give you some ideas or inspiration for things to do next.  
[00:05:08] For example, you may decide to collect more data, but not more data of everything, but  
[00:05:16] just try to find more data of pharmaceutical spam emails so that the learning algorithm  
[00:05:21] can do a better job recognizing these pharmaceutical spams.  
[00:05:25] Or you may decide to come up with some new features that are related to, say, specific  
[00:05:30] names of drugs or specific names of pharmaceutical products that the spammers are trying to sell  
[00:05:36] in order to help your learning algorithm become better at recognizing this type of pharma  
[00:05:41] spam.  
[00:05:43] Then again, this might inspire you to make specific changes to the algorithm relating  
[00:05:48] to detecting phishing emails.  
[00:05:50] For example, you might look at the URLs in the email and write special code to come up  
[00:05:55] with extra features to see if it's linking to suspicious URLs.  
[00:05:58] Or again, you might decide to get more data of phishing emails specifically in order to  
[00:06:04] help your learning algorithm do a better job at recognizing them.  
[00:06:07] So the point of this error analysis is by manually examining a set of examples that  
[00:06:14] your algorithm is misclassifying or mislabeling.  
[00:06:17] Often this will create inspiration for what might be useful to try next.  
[00:06:23] And sometimes it can also tell you that certain types of errors are sufficiently rare that  
[00:06:30] they aren't worth as much of your time to try to fix.  
[00:06:33] And so returning to this list, a bias-variance analysis should tell you if collecting more  
[00:06:40] data is helpful or not.  
[00:06:42] Based on our error analysis in the example we just went through, it looks like more sophisticated  
[00:06:47] email features could help, but only a bit.  
[00:06:50] Whereas more sophisticated features to detect pharma spam or phishing emails could help  
[00:06:55] a lot.  
[00:06:55] And this detecting misspellings would not help nearly as much.  
[00:07:00] So in general, I found both the bias-variance diagnostic as well as carrying out this form  
[00:07:05] of error analysis to be really helpful to screening or to deciding which changes to  
[00:07:11] the model are more promising to try out next.  
[00:07:14] Now, one limitation of error analysis is that it's much easier to do for problems  
[00:07:19] that humans aren't good at.  
[00:07:21] So you can look at an email and say, you think it's a spam email, why did the algorithm  
[00:07:25] get it wrong?  
[00:07:26] Error analysis can be a bit harder for tasks that even humans aren't good at.  
[00:07:31] For example, if you're trying to predict what ads someone will click on on a website,  
[00:07:35] well, I can't predict what someone will click on, so error analysis there actually  
[00:07:39] tends to be more difficult.  
[00:07:41] But when you apply error analysis to problems that you can, it can be extremely helpful  
[00:07:46] for focusing attention on the more promising things to try.  
[00:07:50] And that in turn can easily save you months of otherwise fruitless work.  
[00:07:55] In the next video, I'd like to dive deeper into the problem of adding data.  
[00:08:01] When you train a learning algorithm, sometimes you decide there's high variance and you  
[00:08:06] want to get more data for it.  
[00:08:08] And there's some techniques that can make how you add data much more efficient.  
[00:08:13] So let's take a look at that so that hopefully you'll be armed with some good ways to get  
[00:08:18] more data for your learning application.
