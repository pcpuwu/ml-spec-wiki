# Decision Tree Model — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](decision-tree-model.md)

---

[00:00:02] Welcome to the final week of this course on advanced learning algorithms.  
[00:00:06] One of the learning algorithms that's very powerful, widely used in many applications,  
[00:00:11] also used by many to win machine learning competitions, is decision trees and tree ensembles.  
[00:00:18] Despite all the successes of decision trees, they somehow haven't received that much attention in academia,  
[00:00:25] and so you may not hear about decision trees nearly that much.  
[00:00:28] But it is a tool well worth having in your toolbox.  
[00:00:31] So in this week, we'll learn about decision trees and you'll see how to get them to work for yourself.  
[00:00:36] Let's dive in.  
[00:00:37] To explain how decision trees work, I'm going to use as a running example this week a cat classification example.  
[00:00:43] You're running a cat adoption center, and given a few features,  
[00:00:48] you want to train a classifier to quickly tell you if an animal is a cat or not.  
[00:00:55] I have here 10 training examples, and associated with each of these 10 examples,  
[00:01:02] we're going to have features regarding the animal's ear shape, face shape, whether it has whiskers,  
[00:01:09] and then the ground truth label that you want to predict is, is this animal a cat?  
[00:01:13] So the first example has pointy ears, a round face, whiskers are present, and it is a cat.  
[00:01:20] The second example has floppy ears, the face shape is not round, whiskers are present, and yes, that is a cat.  
[00:01:27] And so on for the rest of the examples.  
[00:01:30] This data set has five cats and five dogs in it.  
[00:01:34] And the input features, X, are these three columns,  
[00:01:40] and the target output that you want to predict, Y, is this final column of is this a cat or not.  
[00:01:47] In this example, the features X take on categorical values.  
[00:01:52] In other words, the features take on just a few discrete values.  
[00:01:57] Ear shapes are either pointy or floppy, the face shape is either round or not round,  
[00:02:03] and whiskers are either present or absent.  
[00:02:07] And this is a binary classification task, because the labels are also 1 or 0.  
[00:02:14] For now, each of the features, X1, X2, and X3, take on only two possible values.  
[00:02:22] We'll talk about features that can take on more than two possible values,  
[00:02:27] as well as continuous value features later in this week.  
[00:02:32] So what is a decision tree?  
[00:02:35] Here's an example of a model that you might get after training a decision tree learning algorithm  
[00:02:42] on the data set that you just saw.  
[00:02:45] The model that is output by the learning algorithm looks like a tree,  
[00:02:50] and a picture like this is what computer scientists call a tree.  
[00:02:54] If it looks nothing like the biological trees that you see out there to you, it's okay, don't worry about it.  
[00:03:01] We'll go through an example to make sure that this computer science definition of a tree makes sense to you as well.  
[00:03:08] Every one of these ovals or rectangles is called a node in the tree.  
[00:03:15] And the way this model works is if you have a new test example.  
[00:03:20] Here's a cat where the ear shape is pointy, face shape is round, and whiskers are present.  
[00:03:25] The way this model will look at this example and make a classification decision is,  
[00:03:32] we'll start with this example at this topmost node of the tree.  
[00:03:38] This is called the root node of the tree.  
[00:03:42] And we will look at the feature written inside, which is ear shape.  
[00:03:47] Based on the value of the ear shape of this example, we'll either go left or go right.  
[00:03:55] The value of the ear shape of this example is pointy, and so we'll go down the left branch of the tree like so,  
[00:04:05] and end up at this oval node over here.  
[00:04:09] We then look at the face shape of this example, which turns out to be round.  
[00:04:14] And so we will follow this arrow down over here, and the algorithm will make an inference that it thinks this is a cat.  
[00:04:25] And so you get to this node, and the algorithm will make a prediction that this is the cat.  
[00:04:30] What I've shown on this slide is one specific decision tree model.  
[00:04:36] To introduce a bit more terminology, this topmost node in the tree is called the root node.  
[00:04:46] And all of these nodes, that is, all of these oval shapes, but excluding the boxes at the bottom,  
[00:04:52] all of these are called decision nodes.  
[00:04:56] And decision nodes, because they look at a particular feature, and then based on the value of the feature,  
[00:05:02] causes you to decide whether to go left or right down the tree.  
[00:05:07] Finally, these nodes at the bottom, these rectangular boxes, are called leaf nodes, and they make a prediction.  
[00:05:16] If you haven't seen computer scientists' definitions of trees before,  
[00:05:21] it may seem non-intuitive that the root of the tree is at the top, and the leaves of the tree are down at the bottom.  
[00:05:29] Maybe one way to think about this is this is more akin to an indoor hanging plant,  
[00:05:35] which is why the roots are up top, and then the leaves tend to fall down to the bottom of the tree.  
[00:05:41] In this slide, I've shown just one example of a decision tree.  
[00:05:45] Here are a few others.  
[00:05:47] This is a different decision tree for trying to classify cat versus not cat.  
[00:05:54] In this tree, to make a classification decision, you would again start at this topmost root node,  
[00:06:00] and depending on the ear shape of an example, you go either left or right.  
[00:06:05] If the ear shape is pointy, then you look at the whiskers feature,  
[00:06:08] and depending on whether whiskers are present or absent, you go left or right again and classify cat versus not cat.  
[00:06:15] And just for fun, here's a second example of a decision tree, here's a third one, and here's a fourth one.  
[00:06:22] And among these different decision trees, some will do better and some will do worse on the training set  
[00:06:28] or on the cross-validation and the test sets.  
[00:06:31] So the job of the decision tree learning algorithm is, out of all possible decision trees,  
[00:06:36] to try to pick one that hopefully does well on the training set,  
[00:06:40] and that also ideally generalizes well to new data, such as your cross-validation and test sets as well.  
[00:06:48] So it seems like there are a lot of different decision trees one could build for a given application.  
[00:06:54] How do you get an algorithm to learn a specific decision tree based on a training set?  
[00:06:59] Let's take a look at that in the next video.
