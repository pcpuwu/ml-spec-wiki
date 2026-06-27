# When to Use Decision Trees — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](when-to-use-decision-trees.md)

---

[00:00:02] Both decision trees, including tree ensembles, as well as neural networks, are very powerful,  
[00:00:08] very effective learning algorithms.  
[00:00:10] When should you pick one or the other?  
[00:00:12] Let's look at some of the pros and cons of each.  
[00:00:15] Decision trees and tree ensembles will often work well on tabular data, also called structured  
[00:00:21] data.  
[00:00:22] And what that means is, if your dataset looks like a giant spreadsheet, then decision trees  
[00:00:28] would be worth considering.  
[00:00:30] So for example, in the housing price prediction application, we had a dataset with features  
[00:00:36] corresponding to the size of the house, the number of bedrooms, the number of floors,  
[00:00:41] and the age of the home.  
[00:00:42] And that type of data is stored in a spreadsheet with either categorical or continuous value  
[00:00:49] features, and both for classification or for regression tasks, where you're trying to predict  
[00:00:53] a discrete category or predict a number.  
[00:00:57] All of these problems are ones that decision trees can do well on.  
[00:01:03] In contrast, I would not recommend using decision trees and tree ensembles on unstructured data,  
[00:01:09] and that's data such as images, video, audio, and text that you're less likely to store  
[00:01:15] in a spreadsheet format.  
[00:01:17] Neural networks, as we'll see in a second, will tend to work better for unstructured  
[00:01:21] data tasks.  
[00:01:23] One huge advantage of decision trees and tree ensembles is that they can be very fast to  
[00:01:28] train.  
[00:01:30] You might remember this diagram from the previous week, in which we talked about the iterative  
[00:01:36] loop of machine learning development.  
[00:01:38] If your model takes many hours to train, then that limits how quickly you can go through  
[00:01:44] this loop and improve the performance of your algorithm.  
[00:01:48] Because decision trees, including tree ensembles, tend to be pretty fast to train, that allows  
[00:01:53] you to go through this loop more quickly and maybe more efficiently improve the performance  
[00:01:58] of your learning algorithm.  
[00:02:00] Finally, small decision trees may be human interpretable.  
[00:02:05] If you are training just a single decision tree, and if that decision tree has only,  
[00:02:10] say a few dozen nodes, you may be able to print out the decision tree to understand  
[00:02:16] exactly how it's making decisions.  
[00:02:19] I think that the interpretability of decision trees is sometimes a bit overstated, because  
[00:02:24] when you build an ensemble of a hundred trees, and if each of those trees has hundreds of  
[00:02:29] nodes, then looking at that ensemble to figure out what it's doing does become difficult  
[00:02:35] and may need some separate visualization techniques.  
[00:02:38] But if you have a small decision tree, you can actually look at it and see, oh, it's  
[00:02:42] classifying whether something is a cat by looking at certain features in certain ways.  
[00:02:49] If you've decided to use a decision tree or tree ensemble, I would probably use XGBoost  
[00:02:56] for most of the applications I would work on.  
[00:02:59] One slight downside of a tree ensemble is that it is a bit more expensive than a single  
[00:03:04] decision tree, and so if you had a very, very constrained computational budget, you might  
[00:03:10] use a single decision tree.  
[00:03:12] But other than that setting, I would almost always use a tree ensemble and use XGBoost  
[00:03:17] in particular.  
[00:03:18] How about neural networks?  
[00:03:21] In contrast to decision trees and tree ensembles, it works well on all types of data, including  
[00:03:26] tabular or structured data, as well as unstructured data, as well as mixed data that includes  
[00:03:32] both structured and unstructured components.  
[00:03:36] Whereas on tabular structured data, neural networks and decision trees are often both  
[00:03:42] competitive, on unstructured data, such as images, video, audio, and text, a neural network  
[00:03:48] will really be the preferred algorithm and not a decision tree or tree ensemble.  
[00:03:54] On the downside, though, neural networks may be slower than a decision tree.  
[00:04:00] A large neural network can just take a long time to train.  
[00:04:05] One of the benefits of neural networks includes that it works with transfer learning, and  
[00:04:10] this is really important because for many applications where you have only a small dataset,  
[00:04:15] being able to use transfer learning and carry out pre-training on a much larger dataset,  
[00:04:22] that is critical to getting competitive performance.  
[00:04:26] Finally, if you're building a system of multiple machine learning models working together,  
[00:04:32] it might be easier to string together and train multiple neural networks than multiple decision trees.  
[00:04:38] The reasons for this are quite technical, and you don't need to worry about it for the  
[00:04:42] purpose of this course, but it relates to that even when you string together multiple  
[00:04:46] neural networks, you can train them all together using gradient descent, whereas for decision  
[00:04:53] trees, you can only train one decision tree at a time.  
[00:04:57] So that's it.  
[00:04:58] You've reached the end of the videos for this course on advanced learning algorithms.  
[00:05:03] Thank you for sticking with me all this way, and congratulations on getting to the end  
[00:05:07] of the videos on advanced learning algorithms.  
[00:05:10] You've now learned how to build and use both neural networks and decision trees, and also  
[00:05:15] heard about a variety of tips, practical advice, on how to get these algorithms to work well  
[00:05:21] for you.  
[00:05:22] But even with all that you've seen on supervised learning, that's just part of what learning  
[00:05:28] algorithms can do.  
[00:05:30] Supervised learnings need label datasets with the labels Y on your training set.  
[00:05:35] There's another set of very powerful algorithms called unsupervised learning algorithms, where  
[00:05:40] you don't even need labels Y for the algorithm to figure out very interesting patterns and  
[00:05:45] to do things with the data that you have.  
[00:05:48] So I look forward to seeing you also in the third and final course of this specialization,  
[00:05:53] which will be on unsupervised learning.  
[00:05:57] Now, before you finish up this course, I hope you also enjoy practicing the ideas of decision  
[00:06:02] trees in their practice quizzes and in their practice labs.  
[00:06:06] I'd like to wish you the best of luck in their practice labs, or for those of you that may  
[00:06:11] be Star Wars fans, let me say, may the forest be with you.
