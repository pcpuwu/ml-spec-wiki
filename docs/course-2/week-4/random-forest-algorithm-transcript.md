# Random Forest Algorithm — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](random-forest-algorithm.md)

---

[00:00:02] Now that we have a way to use sampling with replacement to create new training sets that  
[00:00:07] are a bit similar to but also quite different from the original training set, we're ready  
[00:00:12] to build our first tree ensemble algorithm.  
[00:00:15] In particular, in this video, we'll talk about the random forest algorithm, which is  
[00:00:20] one powerful tree ensemble algorithm that works much better than using a single decision  
[00:00:25] tree.  
[00:00:26] Here's how we can generate an ensemble of trees.  
[00:00:29] If you are given a training set of size m, then for b equals 1 to capital B, so we do  
[00:00:37] this capital B times, you can use sampling with replacement to create a new training  
[00:00:43] set of size m.  
[00:00:45] So if you had 10 training examples, you will put the 10 training examples in that virtual  
[00:00:50] bag and sample with replacement 10 times to generate a new training set with also 10 examples.  
[00:00:58] And then you would train a decision tree on this data set.  
[00:01:02] So here's the data set I've generated using sampling with replacement.  
[00:01:06] If you look carefully, you may notice that some of the training examples are repeated,  
[00:01:10] and that's okay.  
[00:01:11] And if you train the decision tree algorithm on this data set, you end up with this decision  
[00:01:16] tree.  
[00:01:18] And having done this once, we would then go and repeat this a second time.  
[00:01:22] If you use sampling with replacement to generate another training set of m or 10 training examples,  
[00:01:29] this again looks a bit like the original training set, but it's also a little bit different.  
[00:01:34] You then train a decision tree on this new data set, and you end up with a somewhat different  
[00:01:39] decision tree, and so on.  
[00:01:42] And you may do this a total of capital B times.  
[00:01:46] Typical choice of capital B, the number of such trees you build might be around 100.  
[00:01:52] People recommend any value from, say, 64 to 128.  
[00:01:57] And having built an ensemble of, say, 100 different trees, you would then, when you  
[00:02:03] are trying to make a prediction, get these trees to all vote on the correct final prediction.  
[00:02:08] It turns out that setting capital B to be larger never hurts performance, but beyond  
[00:02:15] a certain point, you end up with diminishing returns, and it doesn't actually get that  
[00:02:19] much better when B is much larger than, say, 100 or so.  
[00:02:24] And that's why I never use, say, 1,000 trees.  
[00:02:27] That just slows down the computation significantly without meaningfully increasing the performance  
[00:02:33] of the overall algorithm.  
[00:02:36] Just to give this particular algorithm a name, this specific instantiation of tree ensemble  
[00:02:42] is sometimes also called a bagged decision tree, and that refers to putting your training  
[00:02:47] examples in that virtual bag.  
[00:02:50] And that's why also we use the letters lowercase b and uppercase b here, because that stands  
[00:02:56] for bag.  
[00:02:57] There's one modification to this algorithm that will actually make it work even much  
[00:03:01] better, and that changes this algorithm, the bagged decision tree, into the random forest  
[00:03:06] algorithm.  
[00:03:07] The key idea is that even with this sampling with replacement procedure, sometimes you  
[00:03:13] end up with always using the same split at the root node and very similar splits near  
[00:03:19] the root node.  
[00:03:20] That didn't happen in this particular example, where a small change to the training set resulted  
[00:03:25] in a different split at the root node, but for other training sets, it's not uncommon  
[00:03:31] that for many or even all capital B training sets, you end up with the same choice of feature  
[00:03:38] at the root node and at a few of the nodes near the root node.  
[00:03:42] So there's one modification to the algorithm to further try to randomize the feature choice  
[00:03:48] at each node that can cause the set of trees you learn to become more different from each  
[00:03:54] other, so that when you vote them, you end up with an even more accurate prediction.  
[00:03:59] The way this is typically done is, at every node, when choosing a feature to use the split,  
[00:04:07] if n features are available, so in our example, we had three features available, rather than  
[00:04:14] picking from all n features, we would instead pick a random subset of k less than n features  
[00:04:21] and allow the algorithm to choose only from that subset of k features.  
[00:04:27] So in other words, you would pick k features as the allowed features, and then out of those  
[00:04:32] k features, choose the one with the highest information gain as the choice of feature  
[00:04:38] to use the split.  
[00:04:39] When n is large, say n is dozens or tens or even hundreds, a typical choice for the value  
[00:04:47] of k would be to choose it to be square root of n.  
[00:04:51] In our example, we had only three features, and this technique tends to be used more for  
[00:04:56] larger problems with a larger number of features.  
[00:05:00] With this further change to the algorithm, you end up with the random forest algorithm,  
[00:05:05] which will work typically much better and becomes much more robust than just a single  
[00:05:10] decision tree.  
[00:05:12] One way to think about why this is more robust than a single decision tree is the sampling  
[00:05:17] with replacement procedure causes the algorithm to explore a lot of small changes in the data  
[00:05:23] already and is training different decision trees and is averaging over all of those changes  
[00:05:29] to the data that the sampling with replacement procedure causes.  
[00:05:33] And so this means that any little change further to the training set makes it less likely to  
[00:05:38] have a huge impact on the overall output of the overall random forest algorithm, because  
[00:05:44] it's already explored and is averaging over a lot of small changes to the training set.  
[00:05:50] Before wrapping up this video, there's just one more thought I want to share with you,  
[00:05:53] which is, where does a machine learning engineer go camping?  
[00:05:58] In a random forest.  
[00:06:00] Alright, go and tell that joke to your friends, I hope you enjoy it.  
[00:06:04] The random forest is an effective algorithm and I hope you will use it in your work.  
[00:06:08] Beyond the random forest, it turns out there's one other algorithm that works even better,  
[00:06:13] which is a boosted decision tree.  
[00:06:16] In the next video, let's talk about a boosted decision tree algorithm called XGBoost.
