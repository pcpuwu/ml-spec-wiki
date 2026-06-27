# Using Multiple Decision Trees — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](using-multiple-decision-trees.md)

---

[00:00:01] One of the weaknesses of using a single decision tree is that that decision tree can be highly  
[00:00:07] sensitive to small changes in the data.  
[00:00:11] And one solution to make the algorithm less sensitive or more robust is to build not one  
[00:00:16] decision tree, but to build a lot of decision trees, and we call that a tree ensemble.  
[00:00:22] Let's take a look.  
[00:00:23] With the example that we've been using, the best feature to split on at the root node  
[00:00:28] turned out to be the ear shape, resulting in these two subsets of the data, and then  
[00:00:33] building further subtrees on these two subsets of the data.  
[00:00:38] But it turns out that if you were to take just one of the 10 examples and change it  
[00:00:42] to a different cat, so that instead of having pointy ears, round face, whiskers absent,  
[00:00:48] this new cat has floppy ears, round face, whiskers present, with just changing a single  
[00:00:55] training example, the highest information gain feature to split on becomes the whiskers  
[00:01:00] feature instead of the ear shape feature.  
[00:01:04] As a result of that, the subsets of data you get in the left and right subtrees become  
[00:01:10] totally different, and as you continue to run the decision tree learning algorithm recursively,  
[00:01:17] you build out totally different subtrees on the left and right.  
[00:01:21] So the fact that changing just one training example causes the algorithm to come up with  
[00:01:27] a different split at the root, and therefore a totally different tree, that makes this  
[00:01:32] algorithm just not that robust.  
[00:01:36] That's why when you're using decision trees, you often get a much better result, that is,  
[00:01:41] you get more accurate predictions, if you train not just a single decision tree, but  
[00:01:46] a whole bunch of different decision trees.  
[00:01:49] This is what we call a tree ensemble, which just means a collection of multiple trees.  
[00:01:55] We'll see in the next few videos how to construct this ensemble of trees, but if you had this  
[00:02:01] ensemble of three trees, each one of these is maybe a plausible way to classify cat versus  
[00:02:08] not cat.  
[00:02:09] If you had a new test example that you wanted to classify, then what you would do is run  
[00:02:15] all three of these trees on your new example, and get them to vote on what is the final  
[00:02:21] prediction.  
[00:02:22] So this test example has pointy ears, a not round face shape, and whiskers are present,  
[00:02:28] and so the first tree would carry an inference like this, and predict that it is a cat.  
[00:02:35] The second tree's inference would follow this path through the tree, and therefore predict  
[00:02:41] that it is not a cat, and the third tree would follow this path, and therefore predict  
[00:02:48] that it is a cat.  
[00:02:51] These three trees have made different predictions, and so what we'll do is actually get them  
[00:02:55] to vote, and the majority vote of the predictions among these three trees is cat.  
[00:03:01] So the final prediction of this ensemble of trees is that this is a cat, which happens  
[00:03:06] to be the correct prediction.  
[00:03:08] So the reason we use an ensemble of trees is by having lots of decision trees and having  
[00:03:14] them vote, it makes your overall algorithm less sensitive to what any single tree may  
[00:03:20] be doing, because it gets only one vote out of three, or one vote out of many, many different  
[00:03:25] votes, and it makes your overall algorithm more robust.  
[00:03:29] But how do you come up with all of these different plausible, but maybe slightly different decision  
[00:03:35] trees in order to get them to vote?  
[00:03:37] In the next video, we'll talk about a technique from statistics called sampling with replacement,  
[00:03:44] and this will turn out to be a key technique that we'll use in the video after that in  
[00:03:48] order to build this ensemble of trees.  
[00:03:51] So let's go on to the next video to talk about sampling with replacement.
