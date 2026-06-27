# Binary Labels: Favs, Likes and Clicks — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](binary-labels-favs-likes-and-clicks.md)

---

[00:00:02] Many important applications of recommended systems or of collateral filtering algorithms  
[00:00:08] involve binary labels, where instead of a user giving you a 1-5 star or 0-5 star rating,  
[00:00:15] they just somehow give you a sense of if they like this item or they did not like this item.  
[00:00:21] Let's take a look at how to generalize the algorithm we've seen to this setting.  
[00:00:25] The process we'll use to generalize the algorithm will be very much reminiscent to how we had gone from  
[00:00:31] linear regression to logistic regression, to predicting numbers, to predicting a binary label back in course 1.  
[00:00:39] Let's take a look.  
[00:00:40] Here's an example of a collaborative filtering dataset with binary labels.  
[00:00:45] A 1 denotes that the user liked or engaged with a particular movie.  
[00:00:52] Label 1 could mean that Alice watched the movie Love at Last all the way to the end,  
[00:00:57] and watched Romance Forever all the way to the end, but after playing a few minutes of non-stop car chases,  
[00:01:03] decided to stop the video and move on.  
[00:01:06] Or it could mean that she explicitly hit Like or Favorite on an app to indicate that she liked these movies,  
[00:01:14] but after checking out non-stop car chases and Souls vs. Karate, did not hit Like.  
[00:01:19] And a question mark usually means the user has not yet seen the item,  
[00:01:23] and so they weren't in a position to decide whether or not to hit Like or Favorite on that particular item.  
[00:01:30] So the question is, how can we take the collaborative filtering algorithm that you saw in the last video  
[00:01:35] and get it to work on this dataset?  
[00:01:37] And by predicting how likely Alice, Bob, Carol, and Dave are to like the items that they have not yet rated,  
[00:01:46] we can then decide how much we should recommend these items to them.  
[00:01:51] There are many ways of defining what is a label 1, and what is a label 0, and what is a label question mark  
[00:01:58] in collaborative filtering with binary labels.  
[00:02:01] Let's take a look at a few examples.  
[00:02:03] In an online shopping website, the label could denote whether or not user J chose to purchase an item  
[00:02:12] after they were exposed to it, after they were shown the item.  
[00:02:16] So 1 would denote that they purchased it, 0 would denote that they did not purchase it,  
[00:02:20] and a question mark would denote that they were not even shown, were not even exposed to the item.  
[00:02:25] Or in a social media setting, the labels 1 or 0 could denote did the user favorite or like an item  
[00:02:33] after they were shown it, and question mark would be if they've not yet been shown the item.  
[00:02:38] Or many sites, instead of asking for explicit user rating, will use the user behavior to try to guess if the user liked the item.  
[00:02:48] So for example, you can measure if a user spends at least 30 seconds with an item,  
[00:02:55] and if they did, then assign that a label 1 because the user found the item engaging.  
[00:03:00] Or if a user was shown an item but did not spend at least 30 seconds with it,  
[00:03:05] then assign that a label 0, or if the user was not shown the item yet, then assign it a question mark.  
[00:03:12] Another way to generate a rating implicitly as a function of the user behavior will be to see did the user click on an item.  
[00:03:21] This is often done in online advertising, where if the user has been shown an ad,  
[00:03:26] if they clicked on it, assign it a label 1, if they did not click, assign it a label 0,  
[00:03:32] and a question mark will refer to if the user has not even been shown that ad in the first place.  
[00:03:37] So often, these binary labels will have a rough meaning as follows.  
[00:03:42] A label of 1 means that the user engaged after being shown an item,  
[00:03:47] and engaged could mean that they clicked or spent 30 seconds or explicitly favored or liked or purchased the item.  
[00:03:53] A 0 will reflect the user not engaging after being shown the item,  
[00:03:58] and a question mark will reflect the item not yet having been shown to the user.  
[00:04:03] So given these binary labels, let's look at how we can generalize our algorithm,  
[00:04:09] which is a lot like linear regression from the previous couple of videos to predicting these binary outputs.  
[00:04:16] Previously, we were predicting label yij as wj dot product xi plus b.  
[00:04:23] So this was a lot like a linear regression model.  
[00:04:26] For binary labels, we're going to predict that the probability of yij being equal to 1  
[00:04:34] is given by not wj dot xi plus b, but instead by g of this formula,  
[00:04:43] where now g of z is 1 over 1 plus e to the negative z.  
[00:04:48] So this is the logistic function just like we saw in logistic regression.  
[00:04:52] And what we would do is take what was a lot like a linear regression model  
[00:04:58] and turn it into something that would be a lot like a logistic regression model,  
[00:05:03] where we'll now predict the probability of yij being 1,  
[00:05:09] that is, of the user having engaged with or liked the item using this model.  
[00:05:16] In order to build this algorithm, we'll also have to modify the cost function  
[00:05:21] from the squared error cost function to a cost function that is more appropriate for binary labels,  
[00:05:31] for a logistic regression-like model.  
[00:05:34] So previously, this was the cost function that we had,  
[00:05:38] where this term played a role similar to f of x, the prediction of the algorithm.  
[00:05:44] When you now have binary labels yij, when the labels are 1 or 0 or a question mark,  
[00:05:51] then the prediction f of x becomes, instead of wj dot xi plus bj,  
[00:06:01] it becomes g of this, where g is the logistic function.  
[00:06:06] And similar to when we had derived logistic regression,  
[00:06:10] we had written out the following loss function for a single example,  
[00:06:15] which was that the loss, if the algorithm predicts f of x and the true label was y,  
[00:06:21] the loss was this. It was negative y log f minus 1 minus y log 1 minus f.  
[00:06:31] This is also sometimes called the binary cross-entropy cost function,  
[00:06:36] but this is the standard cost function that we had used for logistic regression,  
[00:06:40] as well as for the binary classification problems when we were training neural networks.  
[00:06:45] And so, to adapt this to the collaborative filtering setting,  
[00:06:49] let me write out the cost function, which is now a function of all the parameters w and b,  
[00:06:56] as well as all the parameters x, which are the features of the individual movies or items.  
[00:07:04] We now need to sum over all the pairs, ij, where rij is equal to 1.  
[00:07:12] Notice this is just similar to the summation up on top.  
[00:07:16] And now, instead of this squared error cost function,  
[00:07:20] we're going to use that loss function as a function of f of x comma yij,  
[00:07:28] where f of x here, that's my abbreviation, my shorthand for g of w, j dot xi plus vj.  
[00:07:38] And if you plug this into here, then this gives you the cost function  
[00:07:44] they could use for collaborative filtering on binary labels.  
[00:07:48] So, that's it. That's how you can take the linear regression-like collaborative filtering algorithm  
[00:07:54] and generalize it to work with binary labels.  
[00:07:57] And this actually very significantly opens up the set of applications you can address with this algorithm.  
[00:08:04] Now, even though you've seen the key structure and cost function of the algorithm,  
[00:08:10] there are also some implementational tips that will make your algorithm work much better.  
[00:08:15] Let's go on to the next video to take a look at some details of how you would implement this  
[00:08:21] and some little modifications that will make the algorithm run much faster.  
[00:08:25] Let's go on to the next video.
