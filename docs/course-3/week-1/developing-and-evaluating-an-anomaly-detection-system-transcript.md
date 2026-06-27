# Developing and Evaluating an Anomaly Detection System — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](developing-and-evaluating-an-anomaly-detection-system.md)

---

[00:00:01] I'd like to share with you some practical tips for developing an anomaly detection system.  
[00:00:07] One of the key ideas will be that if you can have a way to evaluate a system, even as it's being developed,  
[00:00:14] you'll be able to make decisions and change a system and improve it much more quickly.  
[00:00:19] Let's take a look at what that means.  
[00:00:21] When you're developing a learning algorithm, say choosing different features or trying different values of the parameters like epsilon,  
[00:00:29] making decisions about whether or not to change a feature in a certain way or to increase or decrease epsilon or other parameters,  
[00:00:37] making those decisions is much easier if you have a way of evaluating the learning algorithm.  
[00:00:43] This is sometimes called row number evaluation, meaning that if you can quickly change the algorithm in some way,  
[00:00:51] such as change a feature or change a parameter, and have a way of computing a number that tells you if the algorithm got better or worse,  
[00:01:00] then it makes it much easier to decide whether or not to stick with that change to the algorithm.  
[00:01:06] This is how it's often done in anomaly detection, which is, even though we've mainly been talking about unlabeled data,  
[00:01:15] I'm going to change that assumption a bit and assume that we have some labeled data, including just a small number usually of previously observed anomalies.  
[00:01:27] So maybe after making airplane engines for a few years, you've just seen a few airplane engines that were anomalous.  
[00:01:36] For examples that you know are anomalous, I'm going to associate a label y equals 1 to indicate it's anomalous.  
[00:01:46] For examples that we think are normal, I'm going to associate a label y equals 0.  
[00:01:53] The training set that the anomaly detection algorithm will learn from is still this unlabeled training set of x1 through xm.  
[00:02:04] And I'm going to think of all of these examples as ones that we'll just assume are normal and not anomalous.  
[00:02:14] So y is equal to 0.  
[00:02:16] In practice, if a few anomalous examples were to slip into this training set, your algorithm will still usually do okay.  
[00:02:24] To evaluate your algorithm, to come up with a way for you to have a real number evaluation, it turns out to be very useful if you have a small number of anomalous examples  
[00:02:40] so that you can create a cross-validation set, which I'm going to denote xcv1, ycv1 through xcvmcv and ycvmcv.  
[00:02:50] This is similar notation as you had seen in the second course of the specialization and similarly have a test set of some number of examples  
[00:03:02] where both the cross-validation and the test sets hopefully include a few anomalous examples.  
[00:03:12] In other words, the cross-validation and test sets will have a few examples with y equals 1 but also a lot of examples where y is equal to 0.  
[00:03:22] And again, in practice, the anomaly detection algorithm will work okay if there are some examples that are actually anomalous but that were accidentally labeled with y equals 0.  
[00:03:34] Let's illustrate this with the aircraft engine example.  
[00:03:38] Let's say you have been manufacturing aircraft engines for years and so you've collected data from 10,000 goods or normal engines.  
[00:03:48] But over the years, you have also collected data from 20 flawed or anomalous engines.  
[00:03:56] Usually, the number of anomalous engines, that is y equals 1, will be much smaller.  
[00:04:02] And so it would not be atypical to apply this type of algorithm with anywhere from, say, 2 to 50 known anomalies.  
[00:04:14] We're going to take this data set and break it up into a training set, a cross-validation set, and a test set.  
[00:04:20] Here's one example. I'm going to put 6,000 good engines into the training set.  
[00:04:26] And again, if there are a couple anomalous engines that got slipped into this set, it's actually okay. I wouldn't worry too much about that.  
[00:04:36] And then let's put 2,000 good engines and 10 of the known anomalies into the cross-validation set.  
[00:04:44] And a separate 2,000 good and 10 anomalous engines into the test set.  
[00:04:50] What you can do then is train the algorithm on the training set, fit the Gaussian distributions to these 6,000 examples.  
[00:05:01] And then on the cross-validation set, you can see how many of the anomalous engines it correctly flags.  
[00:05:11] And so, for example, you could use the cross-validation set to tune the parameter epsilon and set it higher or lower,  
[00:05:21] depending on whether the algorithm seems to be reliably detecting these 10 anomalies without taking too many of these 2,000 good engines and flagging them as anomalies.  
[00:05:33] And after you have tuned the parameter epsilon and maybe also added or subtracted or tuned the features xj,  
[00:05:42] you can then take the algorithm and evaluate it on your test set to see how many of these 10 anomalous engines it finds,  
[00:05:51] as well as how many mistakes it makes by flagging the good engines as anomalous ones.  
[00:05:57] Notice that this is still primarily an unsupervised learning algorithm because the training set really has no labels,  
[00:06:07] or they all have labels that we're assuming to be y equals 0.  
[00:06:11] And so we learn from the training set by fitting the Gaussian distributions as you saw in the previous video.  
[00:06:18] But it turns out, if you're building a practical anomaly detection system,  
[00:06:22] having a small number of anomalies to use to evaluate the algorithm in your cross-validation and test sets is very helpful for tuning the algorithm.  
[00:06:33] Because the number of flawed engines is so small, there's one other alternative that I often see people use for anomaly detection,  
[00:06:43] which is to not use a test set, but to have just a training set and a cross-validation set.  
[00:06:50] So in this example, you would still train on 6,000 good engines, but take the remainder of the data,  
[00:06:56] the 4,000 remaining good engines, as well as all the anomalies, and put them in the cross-validation set.  
[00:07:02] And you would then tune the parameters epsilon and add or subtract features xj to try to get it to do as well as possible as evaluated on the cross-validation set.  
[00:07:13] If you have very, very few flawed engines, so if you had only two flawed engines,  
[00:07:20] then this really makes sense to put all of that in the cross-validation set.  
[00:07:25] And you just don't have enough data to create a totally separate test set that is distinct from your cross-validation set.  
[00:07:32] The downside of this alternative here is that after you've tuned your algorithm,  
[00:07:37] you don't have a fair way to tell how well this will actually do on future examples because you don't have a test set.  
[00:07:46] But when your data set is small, especially when the number of anomalies you have in your data set is small,  
[00:07:52] this might be the best alternative you have.  
[00:07:54] And so I see this done quite often as well when you just don't have enough data to create a separate test set.  
[00:08:01] And if this is the case, just be aware that there's a higher risk that you would have over-fit some of your decisions around epsilon  
[00:08:10] and choice of features and so on to the cross-validation set.  
[00:08:13] And so its performance on real data in the future may not be as good as you were expecting.  
[00:08:21] Now, let's take a closer look at how to actually evaluate the algorithm on your cross-validation sets or on the test set.  
[00:08:29] Here's what you do. You would first fit the model P of X on the training set.  
[00:08:35] So this is the 6,000 examples of good engines.  
[00:08:38] Then on any cross-validation or tested example X, you would compute P of X and you would predict Y equals 1,  
[00:08:49] that is, anomalous, if P of X is less than epsilon.  
[00:08:52] And you predict Y is zero if P of X is greater than or equal to epsilon.  
[00:08:59] And so based on this, you can now look at how accurately this algorithm's predictions on the cross-validation or test set  
[00:09:09] matches the labels Y you have in the cross-validation or the test sets.  
[00:09:15] In the third week of the second course, we had had a couple of optional videos on how to handle highly skewed data distributions  
[00:09:25] where the number of positive examples, Y equals 1, can be much smaller than the number of negative examples where Y equals zero.  
[00:09:34] And this is the case as well for many anomaly detection applications where the number of anomalies in your cross-validation set is much smaller.  
[00:09:44] In our previous example, we had maybe 10 positive examples and 2,000 negative examples  
[00:09:51] because we had 10 anomalies and 2,000 normal examples.  
[00:09:55] If you saw those optional videos, you may recall that we saw it can be useful to compute things like the true positive,  
[00:10:02] false positive, false negative, and true negative rates or to compute precision recall or F1 score  
[00:10:08] and that these are alternative metrics to classification accuracy that could work better when your data distribution is very skewed.  
[00:10:17] So if you saw that video, you might consider applying those types of evaluation metrics as well  
[00:10:23] to tell how well your learning algorithm is doing at finding that small handful of anomalies or positive examples  
[00:10:31] amidst this much larger set of negative examples of normal plane engines.  
[00:10:37] If you didn't watch that video, don't worry about it. It's okay.  
[00:10:41] The intuition I hope you get is to use the cross-validation set to just look at how many anomalies it's finding  
[00:10:48] and also how many normal engines it is incorrectly flagging as an anomaly  
[00:10:53] and then to just use that to try to choose a good choice for the parameter epsilon.  
[00:10:59] So you find that the practical process of building an anomaly detection system is much easier  
[00:11:07] if you actually have just a small number of labeled examples of known anomalies.  
[00:11:13] Now, this does raise a question. If you have a few labeled examples, should you still be using an unsupervised learning algorithm?  
[00:11:21] Why not take those labeled examples and use a supervised learning algorithm instead?  
[00:11:26] In the next video, let's take a look at a comparison between anomaly detection and supervised learning  
[00:11:33] and when you might prefer one over the other. Let's go on to the next video.
