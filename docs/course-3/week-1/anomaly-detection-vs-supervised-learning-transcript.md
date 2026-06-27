# Anomaly Detection vs. Supervised Learning — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](anomaly-detection-vs-supervised-learning.md)

---

[00:00:02] When you have a few positive examples with y equals 1 and a large number of negative  
[00:00:08] examples, say y equals 0, when should you use anomaly detection and when should you  
[00:00:13] use supervised learning?  
[00:00:15] The decision is actually quite subtle in some applications, so let me share with you some  
[00:00:20] thoughts and some suggestions for how to pick between these two types of algorithms.  
[00:00:26] An anomaly detection algorithm will typically be the more appropriate choice when you have  
[00:00:31] a very small number of positive examples, 0 to 20 positive examples is not uncommon,  
[00:00:40] and a relatively large number of negative examples with which to try to build a model  
[00:00:47] for p of x, where you recall that the parameters for p of x are learned only from the negative  
[00:00:54] examples, and this much smaller set of positive examples is only used in your cross-validation  
[00:01:00] set and test sets for parameter tuning and for evaluation.  
[00:01:04] In contrast, if you have a larger number of positive and negative examples, then supervised  
[00:01:10] learning might be more applicable.  
[00:01:13] Now, even if you have only 20 positive training examples, it might be okay to apply a supervised  
[00:01:22] learning algorithm, but it turns out that the way anomaly detection looks at the dataset  
[00:01:27] versus the way supervised learning looks at the dataset are quite different.  
[00:01:32] Here's the main difference, which is that if you think there are many different types  
[00:01:38] of anomalies or many different types of positive examples, then anomaly detection might be  
[00:01:45] more appropriate.  
[00:01:47] When there are many different ways for an aircraft engine to go wrong, and if tomorrow  
[00:01:52] there may be a brand new way for an aircraft engine to have something wrong with it, then  
[00:01:58] your 20, say, positive examples may not cover all of the ways that an aircraft engine could  
[00:02:05] go wrong.  
[00:02:06] That makes it hard for any algorithm to learn from the small set of positive examples what  
[00:02:11] the anomalies, what the positive examples look like, and future anomalies may look nothing  
[00:02:17] like any of the anomalous examples we've seen so far.  
[00:02:21] If you believe this to be true for your problem, then I would gravitate toward using an anomaly  
[00:02:27] detection algorithm, because what anomaly detection does is it looks at the normal examples,  
[00:02:33] that is, the y equals zero negative examples, and just tries to model what they look like.  
[00:02:39] And anything that deviates a lot from normal, it flags as an anomaly, including if there's  
[00:02:44] a brand new way for an aircraft engine to fail that had never been seen before in your  
[00:02:49] dataset.  
[00:02:50] In contrast, supervised learning has a different way of looking at the problem.  
[00:02:55] When you apply supervised learning, ideally, you would hope to have enough positive examples  
[00:03:00] for the algorithm to get a sense of what the positive examples are like.  
[00:03:04] And with supervised learning, we tend to assume that future positive examples are likely to  
[00:03:10] be similar to the ones in the training set.  
[00:03:14] Let me illustrate this with one example.  
[00:03:17] If you are using a system to find, say, financial fraud, there are many different ways, unfortunately,  
[00:03:25] that some individuals are trying to commit financial fraud.  
[00:03:29] And unfortunately, there are new types of financial fraud attempts every few months  
[00:03:35] or every year.  
[00:03:36] And what that means is that because they keep on popping up completely new and unique forms  
[00:03:42] of financial fraud, anomaly detection is often used to just look for anything that's  
[00:03:48] different than transactions we've seen in the past.  
[00:03:52] In contrast, if you look at the problem of email spam detection, well, there are many  
[00:03:58] different types of spam email, but even over many years, spam emails keep on trying to  
[00:04:04] sell similar things or get you to go to similar websites and so on.  
[00:04:10] Spam email that you will get in the next few days is much more likely to be similar  
[00:04:15] to spam emails that you have seen in the past.  
[00:04:18] So that's why supervised learning works well for spam because it's trying to detect more  
[00:04:25] of the types of spam emails that you have probably seen in the past in your training  
[00:04:30] set.  
[00:04:31] Whereas, if you're trying to detect brand new types of fraud that have never been seen  
[00:04:35] before, then anomaly detection may be more applicable.  
[00:04:39] So let's go through a few more examples.  
[00:04:42] We have already seen fraud detection being one use case of anomaly detection, although  
[00:04:48] supervised learning is used to define previously observed forms of fraud, and we've seen email  
[00:04:55] spam classification typically being addressed using supervised learning.  
[00:05:00] You've also seen the example of manufacturing, where you may want to find new previously  
[00:05:07] unseen defects, such as if there are brand new ways for an aircraft engine to fail in  
[00:05:13] the future that you still want to detect, even if you don't have any positive example  
[00:05:17] like that in your training set.  
[00:05:20] It turns out that in manufacturing, supervised learning is also used to find defects, more  
[00:05:25] for finding known and previously seen defects.  
[00:05:29] For example, if you are a smartphone maker, you're making cell phones, and you know that  
[00:05:35] occasionally your machine for making the case of the smartphone will accidentally scratch  
[00:05:40] the cover.  
[00:05:41] So scratches are a common defect on smartphones, and so you can get enough training examples  
[00:05:49] of scratched smartphones corresponding to a label y equals one, and just train the system  
[00:05:55] to decide if a new smartphone that you just manufactured has any scratches in it.  
[00:06:00] And the difference is, if you just see scratched smartphones over and over, and you want to  
[00:06:05] check if your phones are scratched, then supervised learning works well.  
[00:06:10] Whereas if you suspect that there are going to be brand new ways for something to go wrong  
[00:06:13] in the future, then anomaly detection will work well.  
[00:06:17] Some other examples, you've heard me talk about monitoring machines in the data center,  
[00:06:23] especially the machines in the hack.  
[00:06:24] It can behave differently in a brand new way, unlike any previous way it has behaved.  
[00:06:29] So that would feel more like an anomaly detection application.  
[00:06:34] In fact, one theme is that many security-related applications, because hackers are often finding  
[00:06:40] brand new ways to hack into systems, many security-related applications will use anomaly  
[00:06:45] detection.  
[00:06:47] Whereas returning to supervised learning, if you want to learn to predict the weather,  
[00:06:52] well, there's only a handful types of weather that you typically see.  
[00:06:57] Is it sunny, rainy, is it going to snow?  
[00:06:59] And so because you see the same upper labels over and over, weather prediction would tend  
[00:07:05] to be a supervised learning task.  
[00:07:07] Or if you want to use the symptoms of the patient to see if the patient has a specific  
[00:07:12] disease that you've seen before, then that would also tend to be a supervised learning  
[00:07:16] application.  
[00:07:18] So I hope that gives you a framework for deciding when you have a small set of positive examples,  
[00:07:23] as well as maybe a large set of negative examples, whether to use anomaly detection or supervised  
[00:07:29] learning.  
[00:07:30] Anomaly detection tries to find brand new positive examples that may be unlike anything  
[00:07:35] you've seen before.  
[00:07:37] Whereas supervised learning looks at your positive examples and tries to decide if a  
[00:07:41] future example is similar to the positive examples that you've already seen.  
[00:07:46] Now it turns out that when building an anomaly detection algorithm, the choice of features  
[00:07:52] is very important.  
[00:07:54] And when building anomaly detection systems, I often spend a bit of time trying to tune  
[00:07:59] the features I use for the system.  
[00:08:01] In the next video, let me share some practical tips on how to tune the features you feed  
[00:08:06] to your anomaly detection algorithm.
