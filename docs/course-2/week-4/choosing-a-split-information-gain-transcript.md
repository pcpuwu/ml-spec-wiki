# Choosing a Split: Information Gain — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](choosing-a-split-information-gain.md)

---

[00:00:01] When building a decision tree, the way we'll decide what feature to split on at a node  
[00:00:07] will be based on what choice of feature reduces entropy the most.  
[00:00:12] Reduces entropy, or reduces impurity, or maximizes purity.  
[00:00:17] In decision tree learning, the reduction of entropy is called information gain.  
[00:00:22] Let's take a look in this video at how to compute information gain, and therefore choose  
[00:00:28] what feature to use to split on at each node in your decision tree.  
[00:00:32] Let's use the example of deciding what feature to use at the root node of the decision tree  
[00:00:38] we're building just now, or recognizing cats versus not cats.  
[00:00:43] If we had split using the ear shape feature at the root node, this is what we would have  
[00:00:49] gotten.  
[00:00:51] Five examples on the left, and five on the right.  
[00:00:54] And on the left, we would have four out of five cats, so P1 would be equal to four-fifths,  
[00:01:03] or 0.8.  
[00:01:04] And on the right, one out of five are cats, so P1 is equal to one-fifth, or 0.2.  
[00:01:10] If you apply the entropy formula from the last video to this left subset of data and  
[00:01:16] this right subset of data, we find that the degree of impurity on the left is entropy  
[00:01:22] of 0.8, which is about 0.72, and on the right, the entropy of 0.2 turns out also to be 0.72.  
[00:01:35] So this would be the entropy at the left and right sub-branches if we were to split on  
[00:01:42] the ear shape feature.  
[00:01:44] One other option would be to split on the face shape feature.  
[00:01:49] If we've done so, then on the left, for the seven examples, would be cats, so P1 is four-sevenths,  
[00:01:57] and on the right, one-third are cats.  
[00:02:00] So P1 on the right is one-third, and the entropy of four-sevenths and the entropy of one-third  
[00:02:07] are 0.99 and 0.92.  
[00:02:10] So the degree of impurity in the left and right node seems much higher, 0.99 and 0.92,  
[00:02:17] compared to 0.72 and 0.72.  
[00:02:20] Finally, the third possible choice of feature to use at the root node would be the whiskers  
[00:02:25] feature, in which case you split based on whether whiskers are present or absent.  
[00:02:30] In this case, P1 on the left is three-quarters, P1 on the right is two-sixths, and the entropy  
[00:02:36] values are as follows.  
[00:02:39] So the key question we need to answer is, given these three options of a feature to  
[00:02:44] use at the root node, which one do we think works best?  
[00:02:50] It turns out that rather than looking at these entropy numbers and comparing them, it would  
[00:02:59] be useful to take a weighted average of them, and here's what I mean.  
[00:03:05] If there's a node with a lot of examples in it, with high entropy, that seems worse than  
[00:03:11] if there was a node with just a few examples in it with high entropy, because entropy as  
[00:03:16] a measure of impurity is worse if you have a very large and impure dataset, compared  
[00:03:22] to just a few examples in a branch of the tree that is very impure.  
[00:03:28] So the key decision is, of these three possible choices of features to use at the root node,  
[00:03:34] which one do we want to use?  
[00:03:37] What we're going to do with each of these splits is two numbers, the entropy on the  
[00:03:41] left sub-branch and the entropy on the right sub-branch, and in order to pick from these,  
[00:03:47] we'd like to actually combine these two numbers into a single number, so we can just pick  
[00:03:52] of these three choices which one works best.  
[00:03:55] And the way we're going to combine these two numbers is by taking a weighted average, because  
[00:04:02] how important it is to have low entropy in, say, the left or right sub-branch also depends  
[00:04:08] on how many examples went into the left or right sub-branch, because if there are a lot  
[00:04:13] of examples in, say, the left sub-branch, then it seems more important to make sure  
[00:04:18] that that left sub-branch's entropy value is low.  
[00:04:23] So in this example, we have 5 of the 10 examples went to the left sub-branch, so we can compute  
[00:04:31] the weighted average as 5 of the 10 times the entropy of 0.8, and then add to that 5  
[00:04:37] of the 10 examples also went to the right sub-branch, plus 5 tenths times the entropy  
[00:04:42] of 0.2.  
[00:04:46] Now for this example in the middle, the left sub-branch had received 7 out of 10 examples,  
[00:04:54] and so we're going to compute 7 tenths times the entropy of 0.57, plus the right sub-branch  
[00:05:04] had 3 out of 10 examples, so plus 3 tenths times the entropy of 0.33 of 1 third.  
[00:05:12] And finally, on the right, we'll compute 4 tenths times the entropy of 0.75, plus 6 tenths  
[00:05:20] times the entropy of 0.33.  
[00:05:24] And so the way we will choose a split is by computing these 3 numbers and picking whichever  
[00:05:31] one is lowest, because that gives us the left and right sub-branches with the lowest average  
[00:05:38] weighted entropy.  
[00:05:40] In the way that decision trees are built, we're actually going to make one more change  
[00:05:44] to these formulas to stick to the convention in decision tree building, but it won't  
[00:05:50] actually change the outcome, which is rather than computing this weighted average entropy,  
[00:05:56] we're going to compute the reduction in entropy compared to if we hadn't split at all.  
[00:06:02] So if we go to the root note, remember that at the root note we had started off with all  
[00:06:07] 10 examples of the root note, with 5 cats and 5 dogs, and so at the root note we had  
[00:06:14] p1 equals 5 tenths, or 0.5, and so the entropy of the root note, entropy of 0.5, was actually  
[00:06:24] equal to 1.  
[00:06:25] This was maximum impurity because it was 5 cats and 5 dogs.  
[00:06:30] So the formula that we're actually going to use for choosing a split is not this weighted  
[00:06:35] entropy at the left and right sub-branches, instead it's going to be the entropy at the  
[00:06:41] root note, which is entropy of 0.5, then minus this formula.  
[00:06:48] And in this example, if you work out the math, it turns out to be 0.28.  
[00:06:53] For the face shape example, we again compute entropy at the root note, entropy of 0.5,  
[00:06:58] minus this, which turns out to be 0.03, and for whiskers, compute that, which turns out  
[00:07:07] to be 0.12.  
[00:07:10] These numbers that we just calculated, 0.28, 0.03, and 0.12, these are called the information  
[00:07:16] gain, and what it measures is the reduction in entropy that you get in your tree, resulting  
[00:07:23] from making a split.  
[00:07:25] Because the entropy was originally 1 at the root note, and by making the split, you end  
[00:07:33] up with a lower value of entropy, and the difference between those two values is the  
[00:07:37] reduction in entropy, and that's 0.28 in the case of splitting on the ear shape.  
[00:07:44] So why do we bother to compute reduction in entropy rather than just entropy at the left  
[00:07:50] and right sub-branches?  
[00:07:52] It turns out that one of the stopping criteria for deciding when to not bother to split any  
[00:07:57] further is if the reduction in entropy is too small, in which case you could decide  
[00:08:02] you're just increasing the size of the tree unnecessarily and risking overfitting by splitting  
[00:08:07] and just decide to not bother if the reduction in entropy is too small below a threshold.  
[00:08:13] In this example, splitting on ear shape results in the biggest reduction in entropy, 0.28,  
[00:08:20] is bigger than 0.03 or 0.12, and so we would choose to split on the ear shape feature at  
[00:08:27] the root note.  
[00:08:29] On the next slide, let's give a more formal definition of information gain.  
[00:08:34] And by the way, one additional piece of notation that we'll introduce also in the next slide  
[00:08:39] is these numbers, 5 tenths and 5 tenths, I'm going to call this w left because that's the  
[00:08:45] fraction of examples that went to the left branch, and I'm going to call this w right  
[00:08:51] because that's the fraction of examples that went to the right branch, whereas for this  
[00:08:55] another example, w left would be 7 tenths and w right would be 3 tenths.  
[00:09:00] So let's now write down the general formula for how to compute information gain.  
[00:09:08] Using the example of splitting on the ear shape feature, let me define p1 left to be  
[00:09:14] equal to the fraction of examples in the left subtree that have a positive label, that are cats.  
[00:09:22] And so in this example, p1 left would be equal to 4 fifths, and also let me define w left  
[00:09:30] to be the fraction of examples out of all the examples at the root note that went to  
[00:09:35] the left sub branch, and so in this example, w left would be 5 tenths.  
[00:09:41] Similarly, let's define p1 right to be, of all the examples in the right branch, the  
[00:09:49] fraction that are positive examples, and so if one out of five of these examples being  
[00:09:53] cats, that would be 1 fifth, and similarly w right is 5 tenths.  
[00:09:59] The fraction of examples that went to the right sub branch.  
[00:10:03] And let's also define p1 root to be the fraction of examples that are positive in the root  
[00:10:11] note.  
[00:10:12] So in this case, this would be 5 tenths, or 0.5.  
[00:10:19] Information gain is then defined as the entropy of p1 root, so what's the entropy at the root  
[00:10:26] note, minus that weighted entropy calculation that we had on the previous slide, minus  
[00:10:33] w left, this would be 5 tenths in the example, times the entropy applied to p1 left, that's  
[00:10:39] entropy on the left sub branch, plus w right, the fraction of examples that went to the  
[00:10:45] right branch, times entropy of p1 right.  
[00:10:51] And so with this definition of entropy, you can calculate the information gain associated  
[00:10:57] with choosing any particular feature to split on in the note, and then out of all the possible  
[00:11:04] features you could choose to split on, you can then pick the one that gives you the highest  
[00:11:08] information gain, and that will result in hopefully increasing the purity of your subset  
[00:11:16] of data that you get on the left and right sub branches of your decision tree.  
[00:11:21] And that will result in choosing a feature to split on that increases the purity of your  
[00:11:28] subset of data in both the left and right sub branches of your decision tree.  
[00:11:33] Now that you know how to calculate information gain, or reduction in entropy, you know how  
[00:11:38] to pick a feature to split on at a note.  
[00:11:41] Let's put all the things we've talked about together into the overall algorithm for building  
[00:11:47] a decision tree, given a training set.  
[00:11:49] Let's go see that in the next video.
