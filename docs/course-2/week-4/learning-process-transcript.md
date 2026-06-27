# The Learning Process — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](learning-process.md)

---

[00:00:01] The process of building a decision tree, given a training set, has a few steps.  
[00:00:06] In this video, let's take a look at the overall process of what you need to do to build a decision tree.  
[00:00:12] Given a training set of 10 examples of cats and dogs like you saw in the last video,  
[00:00:19] the first step of decision tree learning is we have to decide what feature to use at the root node,  
[00:00:28] that is, the first node at the very top of the decision tree.  
[00:00:32] Via an algorithm that we'll talk about in the next few videos,  
[00:00:35] let's say that we decide to pick as the feature in the root node the ear shape feature.  
[00:00:42] What that means is we will decide to look at all of our training examples,  
[00:00:47] all 10 training examples shown here, and split them according to the value of the ear shape feature.  
[00:00:54] In particular, let's pick out the five examples with pointy ears and move them over down to the left,  
[00:01:03] and let's pick the five examples with floppy ears and move them down to the right.  
[00:01:09] The second step is focusing just on the left part, or sometimes called the left branch of the decision tree,  
[00:01:16] to decide what node to put over there, and in particular, what feature do we want to split on,  
[00:01:26] or what feature do we want to use next.  
[00:01:29] Via an algorithm that, again, we'll talk about later this week,  
[00:01:32] let's say you decide to use the face shape feature there.  
[00:01:36] What we'll do now is take these five examples and split these five examples into two subsets  
[00:01:43] based on their value of the face shape.  
[00:01:46] We'll take the four examples out of these five with a round face shape and move them down to the left,  
[00:01:54] and the one example with a not round face shape and move it down to the right.  
[00:02:00] Finally, we notice that these four examples are all cats.  
[00:02:04] All four of them are cats.  
[00:02:07] Rather than splitting further, we create a leaf node that makes a prediction that things that get down to that node are cats.  
[00:02:15] Over here, we notice that none of the examples, zero of the one examples, are cats,  
[00:02:21] or alternatively, 100% of the examples here are dogs.  
[00:02:26] We can create a leaf node here that makes a prediction of not cat.  
[00:02:31] Having done this on the left part, or the left branch of this decision tree,  
[00:02:35] we now repeat a similar process on the right part, or the right branch of this decision tree  
[00:02:40] and focus attention on just these five examples, which contains one cat and four dogs.  
[00:02:46] We would have to pick some feature over here to use to split these five examples further.  
[00:02:53] If we end up choosing the whiskers feature, we would then split these five examples  
[00:03:00] based on whether whiskers are present or absent, like so.  
[00:03:05] You notice that one of the one examples on the left are cats, and zero of the four are cats.  
[00:03:12] Each of these nodes is completely pure, meaning that it's all cats or all not cats,  
[00:03:20] and there's no longer a mix of cats and dogs.  
[00:03:23] We can create these leaf nodes, making a cat prediction on the left and a not cat prediction here on the right.  
[00:03:31] This is the process of building a decision tree.  
[00:03:35] Through this process, there were a couple of key decisions that we had to make at various steps during the algorithm.  
[00:03:43] Let's talk through what those key decisions were,  
[00:03:46] and we'll keep on fleshing out the details of how to make these decisions in the next few videos.  
[00:03:51] The first key decision was, how do you choose what feature to use to split on at each node?  
[00:03:58] At the root node, as well as on the left branch and the right branch of the decision tree,  
[00:04:05] we had to decide if there were a few examples at that node comprising a mix of cats and dogs,  
[00:04:12] do you want to split on the ear shape feature, or the face shape feature, or the whiskers feature?  
[00:04:17] We'll see in the next video that decision trees will choose what feature to split on in order to try to maximize purity.  
[00:04:25] By purity, I mean you want to get to what subsets, which are as close as possible to all cats or all dogs.  
[00:04:33] For example, if we had a feature that said, does this animal have cat DNA?  
[00:04:39] We don't actually have this feature, but if we did, we could have split on this feature at the root node,  
[00:04:44] which would have resulted in 5 out of 5 cats in the left branch and 0 out of 5 cats in the right branch,  
[00:04:51] and both these left and right subsets of the data are completely pure,  
[00:04:56] meaning that there's only one class, either cats only or not cats only, in both of these left and right sub-branches,  
[00:05:05] which is why the cat DNA feature, if we had this feature, would have been a great feature to use.  
[00:05:11] But with the features that we actually have, we had to decide whether to split on ear shape,  
[00:05:18] which resulted in 4 out of 5 examples on the left being cats, and 1 out of 5 examples on the right being cats,  
[00:05:26] or face shape, where it resulted in 4 out of 7 on the left and 1 out of 3 on the right,  
[00:05:32] or whiskers, which resulted in 3 out of 4 examples being cats on the left and 2 out of 6 being not cats on the right.  
[00:05:40] And so the decision tree learning algorithm has to choose between ear shape, face shape, and whiskers,  
[00:05:48] which of these features results in the greatest purity of the labels on the left and right sub-branches.  
[00:05:58] Because if you can get to a highly pure subset of examples,  
[00:06:04] then you can either predict cat or predict not cat and get it mostly right.  
[00:06:10] So the next video on entropy will talk about how to estimate impurity and how to minimize impurity.  
[00:06:19] So the first decision we have to make when learning a decision tree is how to choose which feature to split on in each node.  
[00:06:28] The second key decision you need to make when building a decision tree is to decide when do you stop splitting.  
[00:06:35] The criteria that we used just now was until a node is either 100% all cats or 100% all dogs and not cats.  
[00:06:44] Because at that point, it seems natural to build a leaf node that just makes a classification prediction.  
[00:06:52] Alternatively, you might also decide to stop splitting when splitting a node further will result in the tree exceeding a maximum depth,  
[00:07:01] where the maximum depth that you allow the tree to grow to is a parameter that you could decide.  
[00:07:07] In a decision tree, the depth of a node is defined as the number of hops that it takes to get from the root node,  
[00:07:16] that is the node at the very top, to that particular node.  
[00:07:20] So the root node takes 0 hops to get to itself and is at depth 0.  
[00:07:25] The nodes below it are at depth 1 and the nodes below it would be at depth 2.  
[00:07:32] And so if you had decided that the maximum depth of the decision tree is, say, 2,  
[00:07:39] then you would decide not to split any nodes below this level so that the tree never gets to depth 3.  
[00:07:51] And one reason you might want to limit the depth of the decision tree is to make sure, first, the tree doesn't get too big and unwieldy,  
[00:08:00] and second, by keeping the tree small, it makes it less prone to overfitting.  
[00:08:06] Another criteria you might use to decide to stop splitting might be if the improvements in the purity score,  
[00:08:12] which you'll see in a later video, are below a certain threshold.  
[00:08:16] So if splitting a node results in minimum improvements to purity, or you'll see later, it actually decreases in impurity.  
[00:08:27] But if the gains are too small, then you might not bother.  
[00:08:30] Again, both to keep the tree smaller and to reduce the risk of overfitting.  
[00:08:35] And finally, if the number of examples at a node is below a certain threshold, then you might also decide to stop splitting.  
[00:08:45] So, for example, if at the root node we had split on the face shape feature,  
[00:08:51] then the right branch would have had just three training examples with one cat and two dogs.  
[00:08:59] And rather than splitting this into even smaller subsets,  
[00:09:03] if you decided not to split further sets of examples with just three or fewer examples,  
[00:09:09] then you would just create a decision node.  
[00:09:12] And because there are mainly dogs, two out of three are dogs here,  
[00:09:17] this would be a node that makes a prediction of not cat.  
[00:09:21] And again, one reason you might decide this is not worth splitting on is to keep the tree smaller and to avoid overfitting.  
[00:09:28] When I look at decision tree learning algorithms myself,  
[00:09:31] sometimes I feel like, boy, there are a lot of different pieces, a lot of different things going on in this algorithm.  
[00:09:37] Part of the reason it might feel like that is in the evolution of decision trees,  
[00:09:42] there was one researcher that proposed a basic version of decision trees,  
[00:09:47] and then a different researcher said, oh, we can modify this thing this way,  
[00:09:51] such as here's a new criteria for splitting.  
[00:09:54] Then a different researcher comes up with a different thing,  
[00:09:56] like, oh, maybe we should stop splitting when it reaches a certain maximum depth.  
[00:10:00] And over the years, different researchers came up with different refinements to the algorithm.  
[00:10:05] As a result of that, it does work really well.  
[00:10:08] But when you look at all the details of how to implement a decision tree,  
[00:10:11] it feels like a lot of different pieces, such as why there's so many different ways to decide when to stop splitting.  
[00:10:17] So if it feels like a somewhat complicated, messy algorithm to you, it does to me too.  
[00:10:23] But these different pieces, they do fit together into a very effective learning algorithm.  
[00:10:28] And what you learn in this course is the key, most important ideas on how to make it work well.  
[00:10:34] And then at the end of this week, I'll also share with you some guidance,  
[00:10:39] some suggestions for how to use open source packages so that you don't have to have too complicated a procedure for making all these decisions,  
[00:10:47] like how do I decide to stop splitting so that you really get these algorithms to work well for yourself.  
[00:10:52] But I want to reassure you that this algorithm seems complicated and messy.  
[00:10:56] It frankly does to me too, but it does work well.  
[00:11:00] Now, the next key decision that I want to dive more deeply into is how do you decide how to split at a node?  
[00:11:08] So in the next video, let's take a look at this definition of entropy,  
[00:11:12] which would be a way for us to measure purity or more precisely impurity in a node.  
[00:11:18] Let's go on to the next video.
