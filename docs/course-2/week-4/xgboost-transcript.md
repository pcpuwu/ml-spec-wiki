# XGBoost — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](xgboost.md)

---

[00:00:01] Over the years, machine learning researchers have come up with a lot of different ways to build decision trees and decision tree ensembles.  
[00:00:09] Today, by far the most commonly used way or implementation of decision tree ensembles or decision trees is an algorithm called XGBoost.  
[00:00:18] It runs quickly, the open source implementations are easily used.  
[00:00:22] It has also been used very successfully to win many machine learning competitions, as well as in many commercial applications.  
[00:00:29] Let's take a look at how XGBoost works.  
[00:00:32] There's a modification to the bagged decision tree algorithm that we saw in the last video that can make it work much better.  
[00:00:39] Here again is the algorithm that we had written down previously.  
[00:00:43] Given a training set of size m, you repeat capital B times use sampling replacement to create a new training set of size m and then train a decision tree on the new data set.  
[00:00:54] And so the first time through this loop, we may create a training set like that and train a decision tree like that.  
[00:01:02] But here's where we're going to change the algorithm, which is every time through this loop, other than the first time, there's a second time, third time, and so on.  
[00:01:11] When sampling, instead of picking from all m examples with equal probability, with 1 over m probability, let's make it more likely that we'll pick misclassified examples that the previously trained trees do poorly on.  
[00:01:26] In training and education, there's an idea called deliberate practice.  
[00:01:30] For example, if you're learning to play the piano and you're trying to master a piece on the piano, rather than practicing the entire, say, 5-minute piece over and over, which is quite time-consuming,  
[00:01:43] if you instead play the piece and then focus your attention on just the parts of the piece that you aren't yet playing that well and practice those smaller parts over and over,  
[00:01:52] then that turns out to be a more efficient way for you to learn to play the piano well.  
[00:01:56] And so this idea of boosting is similar.  
[00:01:59] We're going to look at the decision trees we've trained so far and look at what we're still not yet doing well on.  
[00:02:05] And then when building the next decision tree, we're going to focus more attention on the examples that we're not yet doing well.  
[00:02:11] So rather than looking at all the training examples, we focus more attention on the subset of examples that we're not yet doing well on  
[00:02:19] and get the new decision tree, the next decision tree, without the ensemble, to try to do well on them.  
[00:02:25] And this is the idea behind boosting, and it turns out to help the learning algorithm learn to do better more quickly.  
[00:02:32] So in detail, we will look at this tree that we have just built and go back to the original training set.  
[00:02:41] Notice that this is the original training set, not one generated through something or replacement.  
[00:02:47] And we'll go through all 10 examples and look at what this learned decision tree predicts on all 10 examples.  
[00:02:54] So this fourth most column are their predictions.  
[00:02:58] And I put a checkmark across next to each example, depending on whether the tree's classification was correct or incorrect.  
[00:03:09] So what we'll do in the second time through this loop is we will sort of use something with replacement to generate another training set of 10 examples.  
[00:03:20] But every time we pick an example from these 10, we'll give a higher chance of picking from one of these three examples that we're still misclassifying.  
[00:03:30] And so this focuses the second decision tree's attention via a process like deliberate practice on the examples that the algorithm is still not yet doing that well on.  
[00:03:42] And the boosting procedure will do this for a total of B times, where on each iteration, you'll look at what the ensemble of trees for trees 1, 2 up through B-1 are not yet doing that well on.  
[00:04:02] And when you're building tree number B, you will then have a higher probability of picking examples that the ensemble of the previously built trees is still not yet doing well on.  
[00:04:14] The mathematical details of exactly how much to increase the probability of picking this versus that example are quite complex, but you don't have to worry about them in order to use boosted tree implementations.  
[00:04:28] And of different ways of implementing boosting, the most widely used one today is XGBoost, which stands for Extreme Gradient Boosting, which is an open source implementation of boosted trees that is very fast and efficient.  
[00:04:44] XGBoost also has a good choice of the default splitting criteria and criteria for when to stop splitting.  
[00:04:50] And one of the innovations in XGBoost is that it also has built-in regularization to prevent overfitting.  
[00:04:57] And in machine learning competitions, such as a widely used competition site called Kaggle, XGBoost is often a highly competitive algorithm.  
[00:05:07] In fact, XGBoost and deep learning algorithms seem to be the two types of algorithms that win a lot of these competitions.  
[00:05:15] Oh, and one technical note, rather than doing sampling with replacements, XGBoost actually assigns different weights to different training examples, so it doesn't actually need to generate a lot of randomly chosen training sets.  
[00:05:29] And this makes it even a little bit more efficient than using a sampling with replacement procedure.  
[00:05:34] But the intuition that you saw on the previous slide is still correct in terms of how XGBoost is choosing examples to focus on.  
[00:05:42] The details of XGBoost are quite complex to implement, which is why many practitioners will use the open source libraries that implement XGBoost.  
[00:05:54] This is all you need to do in order to use XGBoost.  
[00:05:59] You would import the XGBoost library as follows and initialize a model as an XGBoost classifier for the model.  
[00:06:09] And then finally, this allows you to make predictions using this boosted decision trees algorithm.  
[00:06:16] I hope that you find this algorithm useful for many applications that you may build in the future.  
[00:06:21] Alternatively, if you want to use XGBoost for regression rather than for classification, then this line here just becomes XGBRegressor.  
[00:06:32] And the rest of the code works similarly.  
[00:06:35] So that's it for the XGBoost algorithm.  
[00:06:38] We have just one last video for this week and for this course, where we'll wrap up and also talk about when should you use a decision tree versus maybe use a neural network.  
[00:06:48] Let's go on to the last and final video of this week.
