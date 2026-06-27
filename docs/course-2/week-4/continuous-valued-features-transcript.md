# Continuous-Valued Features — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](continuous-valued-features.md)

---

[00:00:01] Let's look at how you can modify Decision Tree to work with features that aren't just discrete value,  
[00:00:06] but continuous value, that is, features that can be any number. Let's start with an example.  
[00:00:12] I have modified the Cat Adoption Center dataset to add one more feature,  
[00:00:17] which is the weight of the animal in pounds. On average, between cats and dogs, cats are  
[00:00:26] a little bit lighter than dogs, although there are some cats that are heavier than some dogs,  
[00:00:30] but so the weight of an animal is a useful feature for deciding if it is a cat or not.  
[00:00:38] So how do you get a Decision Tree to use a feature like this? The Decision Tree learning  
[00:00:43] algorithm will proceed similarly as before, except that rather than considering splitting  
[00:00:49] just on ear shape, face shape, and whiskers, you have to consider splitting on ear shape,  
[00:00:53] face shape, whiskers, or weight. If splitting on the weight feature gives better information  
[00:01:00] gain than the other options, then you will split on the weight feature.  
[00:01:04] But how do you decide how to split on the weight feature? Let's take a look.  
[00:01:10] Here's a plot of the data at the root node. I've plotted on the horizontal axis the weight of the  
[00:01:17] animal, and the vertical axis is cat on top and not cat below. So the vertical axis indicates the  
[00:01:24] label Y being 1 or 0. The way we would split on the weight feature would be if we were to split  
[00:01:32] the data based on whether or not the weight is less than or equal to some value, let's say 8 or  
[00:01:39] some other number. That will be the job of the learning algorithm to choose. And what we should  
[00:01:46] do when considering splitting on the weight feature is to consider many different values of  
[00:01:53] this threshold and then to pick the one that is the best. And by the best, I mean the one that  
[00:01:59] results in the best information gain. So in particular, if you were considering splitting  
[00:02:06] the examples based on whether the weight is less than or equal to 8, then you would be splitting  
[00:02:13] this data set into two subsets, where the subset on the left has two cats, and the subset on the  
[00:02:20] right has three cats and five dogs. So if you were to calculate our usual information gain calculation,  
[00:02:30] you'd be computing the entropy at the root node, entropy of 0.5, minus now two-tenths  
[00:02:39] times entropy of the left split has two out of two cats, so entropy of two out of two,  
[00:02:46] plus the right split has eight out of ten examples, and the entropy of the eight examples on the right  
[00:02:56] three are cats, so entropy of three-eighths, and this turns out to be 0.24. So this would be  
[00:03:03] information gain if you were to split on whether the weight is less than or equal to 8.  
[00:03:09] But we should try other values as well. So what if you were to split on whether or not the weight  
[00:03:15] is less than or equal to 9? And that corresponds to this new line over here, and the information  
[00:03:25] gain calculation becomes h of 0.5 minus, so now we have four examples in the left split, all cats,  
[00:03:33] so that's 4 to 10 times entropy of 4 to 4, plus six examples on the right of which you have one  
[00:03:41] cat, so that's six-tenths times h of 1.6, which is equal to, it turns out, 0.61. So the information  
[00:03:50] gain here looks much better, this 0.61 information gain, which is much higher than 0.24. Or we could  
[00:03:59] try another value, say 13, and the calculation turns out to look like this, which is 0.40.  
[00:04:09] In the more general case, we'll actually try not just three values, but multiple values along the  
[00:04:15] x-axis, and one convention would be to sort all of the examples according to the weight or according  
[00:04:23] to the value on this feature, and take all the values that are the midpoints between the sorted  
[00:04:30] list of training examples as the values for consideration for this threshold over here.  
[00:04:36] This way, if you have 10 training examples, you will test nine different possible values for this  
[00:04:42] threshold, and then try to pick the one that gives you the highest information gain. And finally,  
[00:04:48] if the information gain from splitting on a given value of this threshold is better than the  
[00:04:55] information gain from splitting on any other feature, then you will decide to split that node  
[00:05:01] at that feature. And in this example, an information gain of 0.61 turns out to be higher than that of  
[00:05:08] any other feature. It turns out there are actually two thresholds, and so assuming the algorithm  
[00:05:15] chooses this feature to split on, you would end up splitting the dataset according to whether or  
[00:05:23] not the weight of the animal is less than or equal to nine pounds. And so you end up with two subsets  
[00:05:31] of the data like this, and you can then build recursively additional decision trees using  
[00:05:37] these two subsets of the data to build out the rest of the tree. So to summarize, to get a decision  
[00:05:43] tree to work on continuous value features at every node when considering splits, you would just  
[00:05:49] consider different values to split on, carry out the usual information gain calculation, and decide  
[00:05:54] to split on that continuous value feature if it gives the highest possible information gain.  
[00:06:01] So that's how you get a decision tree to work with continuous value features.  
[00:06:06] Try different thresholds, do the usual information gain calculation, and split on the continuous  
[00:06:12] value feature with the selected threshold if it gives you the best possible information gain out  
[00:06:17] of all possible features to split on. And that's it for the required videos on the core decision tree  
[00:06:25] algorithm. After this, there is an optional video that you can watch or not that generalizes the  
[00:06:31] decision tree learning algorithm to regression trees. So far, we've only talked about using  
[00:06:37] decision trees to make predictions that are classifications, predicting a discrete category  
[00:06:42] such as cat or not cat. But what if you have a regression problem where you want to  
[00:06:47] predict a number? In the next video, I'll talk about a generalization of decision trees to handle that.
