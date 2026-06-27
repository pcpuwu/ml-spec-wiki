# The Iterative Loop of ML Development — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](iterative-loop-of-ml-development.md)

---

[00:00:02] In the next few videos, I'd like to share with you what it's like to go through the  
[00:00:06] process of developing a machine learning system, so that when you are doing so yourself, hopefully  
[00:00:12] you'll be in a position to make great decisions at many stages of the machine learning development  
[00:00:18] process.  
[00:00:19] Let's take a look first at the iterative loop of machine learning development.  
[00:00:24] This is what developing a machine learning model will often feel like.  
[00:00:28] First, you decide on what is the overall architecture of your system, and that means choosing your  
[00:00:34] machine learning model as well as deciding what data to use, maybe picking the hyperparameters  
[00:00:40] and so on.  
[00:00:42] Then, given those decisions, you would implement and train a model.  
[00:00:48] And as I've mentioned before, when you train a model for the first time, it will almost  
[00:00:52] never work as well as you want it to.  
[00:00:56] The next step that I recommend is to implement or to look at a few diagnostics, such as looking  
[00:01:02] at the bias and variance of your algorithm, as well as something we'll see in the next  
[00:01:07] video called error analysis.  
[00:01:10] And based on the insights from the diagnostics, you can then make decisions like, do you want  
[00:01:15] to make your neural network bigger or change the lambda regularization parameter, or maybe  
[00:01:22] add more data or add more features or subtract features.  
[00:01:26] And then you go around this loop again with your new choice of architecture.  
[00:01:31] And it will often take multiple iterations through this loop until you get to the performance  
[00:01:36] that you want.  
[00:01:37] Let's look at an example of building an email spam classifier.  
[00:01:42] I think many of us passionately hate email spam, and this is a problem that I worked  
[00:01:48] on years ago and also was involved in starting an anti-spam conference once years ago.  
[00:01:55] The example on the left is what a highly spammy email might look like.  
[00:01:59] Dear Louis, buy now Rolex watches.  
[00:02:02] And spammers will sometimes deliberately misspell words like these, watches, medicine, and mortgages  
[00:02:10] in order to try to trip up a spam recognizer.  
[00:02:13] And in contrast, this email on the right is an actual email I once got from my younger  
[00:02:18] brother Alfred about getting together for Christmas.  
[00:02:21] So how do you build a classifier to recognize spam versus non-spam emails?  
[00:02:30] One way to do so would be to train a supervised learning algorithm where the input features  
[00:02:37] x would be the features of an email, and the output label y will be 1 or 0 depending  
[00:02:44] on whether it's spam or non-spam.  
[00:02:47] So one way, this application is an example of text classification because you're taking  
[00:02:54] a text document that is an email and trying to classify it as either spam or non-spam.  
[00:03:00] One way to construct the features of an email would be to, say, take the top 10,000 words  
[00:03:06] in the English language or in some other dictionary and use them to define features  
[00:03:11] x1, x2, through x10,000.  
[00:03:16] So for example, given this email on the right, if the list of words we have is a, Andrew,  
[00:03:23] buy, deal, discount, and so on, then given the email on the right, we would set these  
[00:03:34] features to be, say, 0 or 1 depending on whether or not that word appears.  
[00:03:39] So the word a does not appear, the word Andrew does appear, the word buy does appear, deal  
[00:03:47] does, discount does not, and so on.  
[00:03:50] And so you can construct 10,000 features of this email.  
[00:03:54] And there are many ways to construct the feature vector.  
[00:03:58] Another way would be to let these numbers not just be 1 or 0, but actually count the  
[00:04:03] number of times a given word appears in the email.  
[00:04:06] So if buy appears twice, maybe you want to set this to 2, but setting it to just 1 or  
[00:04:12] 0 actually works decently well.  
[00:04:15] Given these features, you can then train a classification algorithm such as a logistic  
[00:04:21] regression model or a neural network to predict y given these features x.  
[00:04:29] After you've trained your initial model, if it doesn't work as well as you wish, you  
[00:04:34] will quite likely have multiple ideas for improving the learning algorithm's performance.  
[00:04:39] For example, it's always tempting to collect more data.  
[00:04:43] In fact, I have friends that have worked on very large-scale honeypot projects.  
[00:04:48] And these are projects that create a large number of fake email addresses and tries deliberately  
[00:04:54] to get these fake email addresses into the hands of spammers so that when they send spam  
[00:04:59] email to these fake emails, well, we know these are spammy messages.  
[00:05:03] And so this is a way to get a lot of spam data.  
[00:05:06] Or you might decide to work on developing more sophisticated features based on the email  
[00:05:12] routing.  
[00:05:13] Email routing refers to the sequence of compute servers, sometimes around the world, that  
[00:05:20] the email has gone through on its way to reach you.  
[00:05:24] And emails actually have what's called email header information.  
[00:05:28] That is information that keeps track of how the email has traveled across different servers,  
[00:05:33] across different networks, to find its way to you.  
[00:05:37] And sometimes the path that the email has traveled can help tell you if it was sent  
[00:05:42] by a spammer or not.  
[00:05:45] Or you might work on coming up with more sophisticated features from the email body  
[00:05:50] that is the text of the email.  
[00:05:52] So in the features I talked about last time, discounting and discount might be treated  
[00:05:58] as different words, but maybe they should be treated as the same words.  
[00:06:04] Or you might decide to come up with algorithms to detect misspellings or deliberate misspellings  
[00:06:09] like watches, medicine, and mortgage.  
[00:06:12] And this too could help you decide if an email is spammy.  
[00:06:16] So given all of these and possibly even more ideas, how can you decide which of these ideas  
[00:06:22] are more promising to work on?  
[00:06:24] Because choosing the more promising path forward can speed up your project easily 10 times  
[00:06:30] compared to if you were to somehow choose some of the less promising directions.  
[00:06:35] For example, we've already seen that if your algorithm has high bias rather than high variance,  
[00:06:41] then spending months and months on a honeypot project may not be the most fruitful direction.  
[00:06:46] But if your algorithm has high variance, then collecting more data could help a lot.  
[00:06:50] So during the iterative loop of machine learning development, you may have many ideas for how  
[00:06:55] to modify the model or the data, and it'll be coming up with different diagnostics that  
[00:07:01] can give you a lot of guidance on what choices for the model or data or other parts of the  
[00:07:07] architecture could be most promising to try.  
[00:07:11] In the last several videos, we've already talked about bias and variance.  
[00:07:15] In the next video, I'd like to start describing to you the error analysis process, which is  
[00:07:22] a second key set of ideas for gaining insight about what architecture choices might be fruitful.  
[00:07:30] So that's the iterative loop of machine learning development.  
[00:07:34] And using the example of building a spam classifier, let's take a look at what error analysis looks  
[00:07:39] like.  
[00:07:40] Let's do that in the next video.
