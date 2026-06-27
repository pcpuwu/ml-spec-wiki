# Putting It Together — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](putting-it-together.md)

---

[00:00:02] The information gain criteria lets you decide how to choose one feature to split at one node.  
[00:00:07] Let's take that and use that in multiple places through a decision tree in order to figure out how to build a large decision tree with multiple nodes.  
[00:00:16] Here's the overall process of building a decision tree.  
[00:00:19] Start with all training examples at the root node of the tree and calculate the information gain for all possible features and pick the feature to split on that gives the highest information gain.  
[00:00:33] Having chosen this feature, you would then split the dataset into two subsets according to the selected feature and create left and right branches of the tree  
[00:00:44] and send the training examples to either the left or the right branch depending on the value of that feature for that example.  
[00:00:53] And this allows you to have made a split at the root node.  
[00:00:58] After that, you would then keep on repeating the splitting process on the left branch of the tree, on the right branch of the tree, and so on, and keep on doing that until the stopping criteria is met.  
[00:01:12] Where the stopping criteria can be when a node is 100% a single class, so when it has reached entropy of zero,  
[00:01:21] or when further splitting a node will cause a tree to exceed the maximum depth that you have set.  
[00:01:27] Or if the information gain from an additional split is less than a threshold, or if the number of examples in a node is below a threshold.  
[00:01:38] And so you would keep on repeating the splitting process until the stopping criteria that you've chosen, which could be one or more of these criteria, is met.  
[00:01:50] Let's look at an illustration of how this process will work.  
[00:01:54] We started all of the examples at the root node, and based on computing information gain for all three features, decide that ear shape is the best feature to split on.  
[00:02:07] Based on that, we create left and right sub-branches and send the subset of the data with pointy vs. floppy ears to the left and right sub-branches.  
[00:02:18] So let me cover up the root node and the right sub-branch and just focus on the left sub-branch, where we have these five examples.  
[00:02:26] Let's say our splitting criteria is to keep splitting until everything in the node belongs to a single class, so either all cats or all dogs.  
[00:02:35] We would look at this node and see if it meets the splitting criteria, and it does not, because there is a mix of cats and dogs here.  
[00:02:43] The next step is to then pick a feature to split on.  
[00:02:47] We then go through the features one at a time and compute the information gain of each of those features as if this node were the new root node of a decision tree that was trained using just five training examples shown here.  
[00:03:06] So we would compute the information gain for splitting on the whiskers feature, the information gain on splitting on the face shape feature,  
[00:03:14] and it turns out that the information gain for splitting on ear shape will be zero because all of these have the same pointy ear shape.  
[00:03:22] Between whiskers and face shape, face shape turns out to have the highest information gain, so we're going to split on face shape, and that allows us to build left and right sub-branches as follows.  
[00:03:36] For the left sub-branch, we'll check for the criteria for whether or not we should stop splitting, and we have all cats here.  
[00:03:44] The stopping criteria is met, and we create a leaf node that makes a prediction of cat.  
[00:03:50] And for the right sub-branch, we find that it is all dogs, and so we will also stop splitting since we've met the splitting criteria and put a leaf node there that predicts not cat.  
[00:04:03] So having built out this left sub-tree, we can now turn our attention to building the right sub-tree.  
[00:04:10] Let me now again cover up the roots node and the entire left sub-tree.  
[00:04:15] To build out the right sub-tree, we have these five examples here, and again, the first thing we do is check if the criteria to stop splitting has been met.  
[00:04:25] The criteria being whether or not all the examples are single class, we've not met the criteria, and so we'll decide to keep splitting in this right sub-branch as well.  
[00:04:37] And in fact, the procedure for building the right sub-branch will be a lot like as if you were training a decision tree learning algorithm from scratch, where the data set you have comprises just these five training examples.  
[00:04:52] And so, again, computing information gain for all of the possible features to split on, you find that the whiskers feature gives the highest information gain.  
[00:05:03] Split this set of five examples according to whether whiskers are present or absent, check if the criteria to stop splitting are met in the left and right sub-branches here, and decide that they are, and so you end up with leaf nodes that predict cat and not cat.  
[00:05:19] And so this is the overall process for building the decision tree.  
[00:05:25] Notice that there's an interesting aspect of what we've done, which is after we decided what to split on at the root node, the way we built the left sub-tree was by building a decision tree on a subset of five examples.  
[00:05:43] And the way we built the right sub-tree was by, again, building a decision tree on a subset of five examples.  
[00:05:51] In computer science, this is an example of a recursive algorithm.  
[00:05:57] And all that means is the way you build a decision tree at the root is by building other smaller decision trees in the left and the right sub-branches.  
[00:06:08] So recursion in computer science refers to writing code that calls itself.  
[00:06:14] And the way this comes up in building a decision tree is you build the overall decision tree by building smaller sub-decision trees and then putting them all together.  
[00:06:25] So that's why if you look at software implementations of decision trees, you see sometimes references to a recursive algorithm.  
[00:06:34] But if you don't feel like you fully understood this concept of recursive algorithms, don't worry about it.  
[00:06:40] You'll still be able to fully complete this week's assignments as well as use libraries to get decision trees to work for yourself.  
[00:06:48] But if you're implementing a decision tree algorithm from scratch, then a recursive algorithm turns out to be one of the steps you have to implement.  
[00:06:59] And by the way, you may be wondering how to choose the maximum depth parameter.  
[00:07:04] There are many different possible choices, but some of the open source libraries will have good default choices that you can use.  
[00:07:12] One intuition is the larger the maximum depth, the bigger the decision tree you're willing to build.  
[00:07:19] And this is a bit like fitting a higher degree polynomial or training a larger neural network.  
[00:07:25] It lets the decision tree learn a more complex model, but it also increases the risk of overfitting if it's fitting a very complex function to your data.  
[00:07:35] In theory, you could use cross-validation to pick parameters like the maximum depth, where you try out different values of the maximum depth and pick what works best on the cross-validation set.  
[00:07:46] Although in practice, the open source libraries have even somewhat better ways to choose this parameter for you.  
[00:07:52] Or another criteria that you can use to decide when to start splitting is if the information gain from an additional split is less than a certain threshold.  
[00:08:03] So if any feature you split on achieves only a small reduction in entropy or a very small information gain, then you might also decide to not bother.  
[00:08:13] And finally, you can also decide to start splitting when the number of examples in the node is below a certain threshold.  
[00:08:21] So that's the process of building a decision tree.  
[00:08:24] Now that you've learned the decision tree, if you want to make a prediction, you can then follow the procedure that you saw in the very first video of this week,  
[00:08:32] where you take a new example, say a test example, and start at the root and keep on following the decisions down until you get to the leaf node, which then makes the prediction.  
[00:08:44] Now that you know the basic decision tree learning algorithm, in the next few videos, I'd like to go into some further refinements of this algorithm.  
[00:08:52] So far, we've only used features that take on two possible values, but sometimes you have a feature that takes on categorical or discrete values, but maybe more than two values.  
[00:09:03] Let's take a look in the next video at how to handle that case.
