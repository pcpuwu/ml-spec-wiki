# Regression Trees (Optional) — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](regression-trees.md)

---

[00:00:01] So far, we've only been talking about decision trees as classification algorithms.  
[00:00:07] In this optional video, we'll generalize decision trees to be regression algorithms,  
[00:00:12] so that we can predict a number.  
[00:00:14] Let's take a look.  
[00:00:15] The example I'm going to use for this video would be to use the discrete value features that we had previously,  
[00:00:22] that is these features x, in order to predict the weight of the animal y.  
[00:00:28] So just to be clear, the weight here, unlike the previous video, is no longer an input feature.  
[00:00:34] Instead, this is the target output y that we want to predict,  
[00:00:39] rather than trying to predict whether or not an animal is or is not a cat.  
[00:00:45] This is a regression problem because we want to predict a number, y.  
[00:00:49] Let's look at what a regression tree will look like.  
[00:00:54] Here, I've already constructed a tree for this regression problem,  
[00:00:58] where the root node splits on inner shape, and then the left and right subtrees split on face shape,  
[00:01:04] and also face shape here on the right.  
[00:01:07] And there's nothing wrong with a decision tree that chooses to split on the same feature  
[00:01:12] in both the left and right subbranches.  
[00:01:15] It's perfectly fine if the splitting algorithm chooses to do that.  
[00:01:20] If during training you had decided on these splits,  
[00:01:24] then this node down here would have these four animals with weights 7.2, 8.4, 7.6, and 10.2.  
[00:01:33] This node would have this one animal with weight 9.2, and so on for these remaining two nodes.  
[00:01:43] So the last thing we need to fill in for this decision tree is,  
[00:01:48] if there's a test example that comes down to this node,  
[00:01:53] what is the weight that we should predict for an animal with pointy ears and a round face shape?  
[00:02:02] The decision tree is going to make a prediction based on taking the average of the weights in the training examples down here,  
[00:02:08] and by averaging these four numbers, it turns out you get 8.35.  
[00:02:14] If, on the other hand, an animal has pointy ears and a not round face shape,  
[00:02:19] then it will predict 9.2, or 9.20 pounds, because that's the weight of this one animal down here.  
[00:02:28] And similarly, this would be 17.70 and 9.90.  
[00:02:34] So what this model will do is, given a new test example,  
[00:02:39] follow the decision nodes down as usual until it gets to a leaf node, and then predict that value at the leaf node,  
[00:02:46] which I had just computed by taking an average of the weights of the animals  
[00:02:52] that during training had gotten down to that same leaf node.  
[00:02:56] So if you were constructing a decision tree from scratch using this data set in order to predict the weight,  
[00:03:04] the key decision, as you've seen earlier this week, will be how do you choose which feature to split on.  
[00:03:11] Let me illustrate how to make that decision with an example.  
[00:03:16] At the root node, one thing you could do is split on the ear shape,  
[00:03:22] and if you do that, you end up with left and right branches of the tree,  
[00:03:27] with five animals on the left and right with the following weights.  
[00:03:32] If you were to choose to split on the face shape, you end up with these animals on the left and right  
[00:03:38] with the corresponding weights that are written below.  
[00:03:41] And if you were to choose to split on whiskers being present or absent, you end up with this.  
[00:03:47] So the question is, given these three possible features to split on at the root node,  
[00:03:55] which one do you want to pick that gives the best predictions for the weight of the animal?  
[00:04:01] When building a regression tree, rather than trying to reduce entropy,  
[00:04:06] which was that measure of impurity that we had for a classification problem,  
[00:04:10] we instead try to reduce the variance of the weight of the values y at each of these subsets of the data.  
[00:04:21] If you've seen the notion of variance in other contexts, that's great.  
[00:04:27] This is the statistical and mathematical notion of variance that we'll use in a minute.  
[00:04:32] But if you've not seen how to compute the variance of a set of numbers before, don't worry about it.  
[00:04:39] All you need to know for this slide is that variance informally computes how widely a set of numbers varies.  
[00:04:47] So for this set of numbers, 7.2, 9.2, and so on up to 10.2, it turns out the variance is 1.47,  
[00:04:56] so it doesn't vary that much.  
[00:04:58] Whereas here, 8.8, 15, 11, 18, and 20, these numbers go all the way from 8.8 all the way up to 20,  
[00:05:07] and so the variance is much larger.  
[00:05:09] It turns out to be a variance of 21.87.  
[00:05:12] And so the way we'll evaluate the quality of this split is we'll compute, same as before,  
[00:05:19] w left and w right as the fraction of examples that went to the left and right branches.  
[00:05:25] And the average variance after the split is going to be 5.10, which is w left, times 1.47,  
[00:05:34] which is the variance on the left, and then plus 5.10 times the variance on the right, which is 21.87.  
[00:05:42] So this weighted average variance plays a very similar role to the weighted average entropy  
[00:05:49] that we had used when deciding what split to use for a classification problem.  
[00:05:54] And we can then repeat this calculation for the other possible choices of features to split on.  
[00:06:01] Here in the tree in the middle, the variance of these numbers here turns out to be 27.80.  
[00:06:09] The variance here is 1.37, and so with w left equals 7.10, and w right is 3.10.  
[00:06:18] And so with these values, you can compute the weighted variance as follows.  
[00:06:25] Finally, for the last example, if you were to split on the whiskers feature,  
[00:06:29] this is the variance on the left and right, there's w left and w right, and so the weighted variance is this.  
[00:06:37] A good way to choose a split would be to just choose the value of the weighted variance that is lowest.  
[00:06:44] Similar to when we're computing information gain, I'm going to make just one more modification to this equation.  
[00:06:51] Just as for the classification problem, we didn't just measure the average weighted entropy,  
[00:06:57] we measured the reduction in entropy, and that was information gain.  
[00:07:01] For a regression tree, we'll also similarly measure the reduction in variance.  
[00:07:07] Turns out if you look at all of the examples in the training set, all 10 examples,  
[00:07:12] and compute the variance of all of them, the variance of all the examples turns out to be 20.51.  
[00:07:20] And that's the same value for the roots node in all of these, of course,  
[00:07:24] because it's the same 10 examples at the roots node.  
[00:07:28] And so what we'll actually compute is the variance of the roots node, which is 20.51,  
[00:07:34] minus this expression down here, which turns out to be equal to 8.84.  
[00:07:41] And so at the roots node, the variance was 20.51, and after splitting on ear shape,  
[00:07:47] the average weighted variance at these two nodes is 8.84 lower.  
[00:07:54] So the reduction in variance is 8.84.  
[00:07:58] And similarly, if you compute the expression for reduction in variance for this example in the middle,  
[00:08:05] it's 20.51 minus this expression that we had before, which turns out to be equal to 0.64.  
[00:08:12] So this is a very small reduction in variance.  
[00:08:15] And for the whiskers feature, you end up with this, which is 6.22.  
[00:08:22] So between all three of these examples, 8.84 gives you the largest reduction in variance.  
[00:08:29] So just as previously, we would choose the feature that gives you the largest information gain,  
[00:08:35] for a regression tree, you would choose the feature that gives you the largest reduction in variance,  
[00:08:41] which is why you choose ear shape as the feature to split on.  
[00:08:46] Having chosen the ear shape feature to split on, you now have two subsets of five examples  
[00:08:55] in the left and right sub-branches.  
[00:08:58] And you would then, again, we say recursively, but you take these five examples  
[00:09:03] and build a new decision tree focusing on just these five examples.  
[00:09:08] Again, evaluating different options of features to split on  
[00:09:12] and picking the one that gives you the biggest variance reduction.  
[00:09:16] And similarly, on the right, and you keep on splitting until you meet the criteria  
[00:09:22] for not splitting any further.  
[00:09:25] And so that's it. With this technique, you can get your decision tree  
[00:09:29] to not just carry out classification problems, but also regression problems.  
[00:09:34] So far, we've talked about how to train a single decision tree.  
[00:09:39] It turns out if you train a lot of decision trees, we call this an ensemble of decision trees,  
[00:09:44] you can get a much better result.  
[00:09:47] Let's take a look at why and how to do so in the next video.
