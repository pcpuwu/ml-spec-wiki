# Feature Engineering — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](feature-engineering.md)

---

[00:00:01] The choice of features can have a huge impact on your learning algorithm's performance.  
[00:00:06] In fact, for many practical applications,  
[00:00:08] choosing or engineering the right features is a critical step to making the algorithm work well.  
[00:00:14] In this video, let's take a look at how you can choose or engineer the most appropriate features for your learning algorithm.  
[00:00:21] Let's take a look at feature engineering by revisiting the example of predicting the price of a house.  
[00:00:27] Say you have two features for each house.  
[00:00:31] X1 is the width of the lot size, of the plot of land that the house is built on.  
[00:00:37] This in real estate is also called the frontage of the lot.  
[00:00:42] And the second feature, X2 is the depth of the lot size,  
[00:00:47] of, let's assume, the rectangular plot of land that the hulls was built on.  
[00:00:51] Given these two features, X1 and X2, you might build a model like this,  
[00:00:56] where F of X is W1X1 plus W2x2, plus  
[00:01:01] plus B, where X1 is the frontage or width, and X2 is the death.  
[00:01:08] And this model might work okay.  
[00:01:10] But here's another option for how you might choose a different way to use these features in the model that could be even more effective.  
[00:01:17] You might notice that the area of the land can be calculated as the frontage or width times the death.  
[00:01:24] And you may have an intuition that the area of the land is more predictive of the price than the  
[00:01:30] frontage and depth as separate features.  
[00:01:34] So you might define a new feature X3 as X1 times X2, so this new feature X3 is equal to the area of the plot of land.  
[00:01:45] With this feature, you can then have a model FWB of X equals W1X1 plus W2x2 plus W3 plus B,  
[00:01:56] so that the model can now choose parameters W1, W2, and W3  
[00:02:01] depending on whether the data shows that the frontage or the depth or the area X3 of the lot  
[00:02:07] turns out to be the most important thing for predicting the price of the house.  
[00:02:12] What we just did, creating a new feature, is an example of what's called feature engineering,  
[00:02:19] in which you might use your knowledge or intuition about the problem to design new features,  
[00:02:24] usually by transforming or combining the original features of the problem  
[00:02:28] in order to make it easier for the learning algorithm to make accurate predictions.  
[00:02:33] So depending on what insights you may have into the application,  
[00:02:37] rather than just taking the features that you happen to have started off with,  
[00:02:41] sometimes by defining new features, you might be able to get a much better model.  
[00:02:47] So that's feature engineering.  
[00:02:50] And it turns out that there's one flavor of feature engineering that  
[00:02:54] allow you to fit not just straight lines, but curves, non-learning functions,  
[00:02:58] to your data. Let's take a look in the next video at how you can do that.
