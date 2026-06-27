# Using Per-Item Features — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](using-per-item-features.md)

---

[00:00:02] So let's take a look at how we can develop a recommended system if we had features of  
[00:00:07] each item or features of each movie.  
[00:00:10] So here's the same data set that we had previously with the four users having rated some but  
[00:00:16] not all of the five movies.  
[00:00:19] What if we additionally have features of the movies?  
[00:00:22] So here I've added two features, X1 and X2, that tell us how much each of these is a romance  
[00:00:29] movie and how much each of these is an action movie.  
[00:00:34] So for example, Love at Last is a very romantic movie, so this feature takes on 0.9, but it's  
[00:00:41] not a non-action movie, so this feature takes on 0.  
[00:00:44] But it turns out Non-Stop Car Chases has just a little bit of romance in it, so it's 0.1,  
[00:00:52] but it has a ton of action, so that feature takes on the value of 1.0.  
[00:00:58] So you recall that I had used the notation NU to denote the number of users, which is  
[00:01:05] 4, and M to denote the number of movies, which is 5.  
[00:01:09] I'm going to also introduce N to denote the number of features we have here, and so N  
[00:01:14] is equal to 2, because we have two features, X1 and X2, for each movie.  
[00:01:20] With these features, we have, for example, that the features for movie 1, that is the  
[00:01:26] movie Love at Last, would be 0.90, and the features for the third movie, Cute Puppies  
[00:01:34] of Love, would be 0.99 and 0.  
[00:01:41] And let's start by taking a look at how we might make predictions for Alice's movie ratings.  
[00:01:48] So for user 1, that is Alice, let's say we predict the rating for movie i as W dot X,  
[00:01:58] a feature i, plus B. So this is just a lot like linear regression.  
[00:02:05] For example, if we end up choosing the parameter W1 equal 5, 0, and say B1 is equal to 0, then  
[00:02:16] the prediction for movie 3, where the features are 0.99 and 0, which is just copied from  
[00:02:24] here, first feature is 0.99, second feature is 0, our prediction would be W dot X3 plus  
[00:02:34] B equals 0.99 times 5 plus 0 times 0, which turns out to be equal to 4.95.  
[00:02:44] And this rating seems pretty plausible.  
[00:02:46] It looks like Alice has given high ratings to Love at Last and Romance Forever, to two  
[00:02:52] highly romantic movies, but given low ratings to the action movies Non-Stop Conch Chases  
[00:02:58] and Souls vs. Karate.  
[00:03:00] So if we look at Cute Puppies of Love, while predicting that she might rate that 4.95 seems  
[00:03:06] quite plausible.  
[00:03:08] And so these parameters W and B for Alice seems like a reasonable model for predicting  
[00:03:14] her movie ratings.  
[00:03:17] Just to add a little bit of notation, because we have not just one user, but multiple users,  
[00:03:22] or really NU equals four users, I'm going to add a superscript 1 here to denote that  
[00:03:28] this is the parameter W1 for user 1, and add a superscript 1 there as well.  
[00:03:35] And similarly here, and here as well, so that we would actually have different parameters  
[00:03:43] for each of the four users on our dataset.  
[00:03:46] And more generally, in this model, we can, for user J, not just user 1 now, we can predict  
[00:03:54] user J's rating for movie I as WJ dot product XI plus BJ.  
[00:04:02] So here, the parameters W, J, and BJ are the parameters used to predict user J's rating  
[00:04:11] for movie I, which is a function of XI, which is the features of movie I.  
[00:04:16] And this is a lot like linear regression, except that we're fitting a different linear  
[00:04:21] regression model for each of the four users in the dataset.  
[00:04:25] So let's take a look at how we can formulate the cost function for this algorithm.  
[00:04:32] As a reminder, our notation is that Rij is equal to 1 if user J has rated movie I, or  
[00:04:39] 0 otherwise, and Yij is the rating given by user J on movie I.  
[00:04:46] And on the previous slide, we defined WJ, BJ as the parameters for user J, and XI as  
[00:04:53] the feature vector for movie I.  
[00:04:57] So the model we have is for user J and movie I, predict the rating to be WJ dot product  
[00:05:03] XI plus BJ.  
[00:05:07] I'm going to introduce just one new piece of notation, which is I'm going to use MJ  
[00:05:12] to denote the number of movies rated by user J.  
[00:05:16] So if a user has rated 4 movies, then MJ would be equal to 4.  
[00:05:21] And if a user has rated 3 movies, then MJ would be equal to 3.  
[00:05:26] So what we'd like to do is to learn the parameters WJ and BJ given the data that we have, that  
[00:05:35] is given the ratings a user has given of a set of movies.  
[00:05:41] So the algorithm we're going to use is very similar to linear regression.  
[00:05:47] So let's write out the cost function for learning the parameters WJ and BJ for a given user  
[00:05:52] J.  
[00:05:53] So let's focus on one user, on user J for now.  
[00:05:56] I'm going to use the mean squared error criteria.  
[00:06:01] So the cost will be the prediction, which is WJ dot XI plus BJ minus the actual rating  
[00:06:11] that the user had given, so minus YIJ squared.  
[00:06:18] And we'll try to choose parameters W and B to minimize the squared error between their  
[00:06:24] predicted rating and the actual rating that was observed.  
[00:06:30] But the user hasn't rated all the movies, so if we're going to sum over this, we're  
[00:06:36] going to sum over only over the values of I, where RIJ is equal to 1.  
[00:06:46] So we're going to sum only over the movies I that user J has actually rated.  
[00:06:54] So that's what this denotes, sum over all values of I, where RIJ is equal to 1, meaning  
[00:07:00] that user J has rated that movie I.  
[00:07:03] And then finally, we can take the usual normalization, 1 over 2 MJ, and this is very much like the  
[00:07:14] cost function we had for linear regression with M, or really MJ training examples, where  
[00:07:20] you're summing over the MJ movies for which you have a rating, taking a squared error,  
[00:07:25] and then normalizing by this 1 over 2 MJ.  
[00:07:28] And this is going to be a cost function J of WJ, BJ.  
[00:07:38] And if we minimize this as a function of WJ and BJ, then you should come up with a  
[00:07:46] pretty good choice of parameters, WJ and BJ, for making predictions for user J's ratings.  
[00:07:51] Let me add just one more term to this cost function, which is the regularization term,  
[00:07:56] to prevent overfitting.  
[00:07:58] And so here's our usual regularization parameter, lambda, divided by 2 MJ, and then times the  
[00:08:05] sum of the squared values of the parameters W, and so N is the number of features, XI,  
[00:08:16] and that's the same as the number of numbers in WJ.  
[00:08:19] If you were to minimize this cost function J as a function of W and B, you should get  
[00:08:25] a pretty good set of parameters for predicting user J's ratings for other movies.  
[00:08:32] Now before moving on, it turns out that for recommended systems, it would be convenient  
[00:08:38] to actually eliminate this division by MJ term.  
[00:08:44] MJ is just a constant in this expression, and so even if you take it out, you should  
[00:08:49] end up with the same value of W and B.  
[00:08:52] Now let me take this cost function down here at the bottom and copy it to the next slide.  
[00:08:59] So we have that.  
[00:09:00] To learn the parameters WJ, BJ for user J, we would minimize this cost function as a  
[00:09:06] function of WJ and BJ.  
[00:09:10] But instead of focusing on a single user, let's look at how we learn the parameters  
[00:09:15] for all of the users.  
[00:09:18] To learn the parameters W1, B1, W2, B2 through WNU, BNU, we would take this cost function  
[00:09:26] on top and sum it over all the NU users.  
[00:09:30] So we would have sum from J equals 1 to NU of the same cost function that we had written  
[00:09:41] up above, and this becomes the cost for learning all the parameters for all of the users.  
[00:09:53] And if we use gradient descent or any other optimization algorithm to minimize this as  
[00:09:59] a function of W1, B1, all the way through WNU, BNU, then you have a pretty good set  
[00:10:06] of parameters for predicting movie ratings for all the users.  
[00:10:11] And you may notice that this algorithm is a lot like linear regression, where that plays  
[00:10:16] a role similar to the output F of X of linear regression, only now we're training a different  
[00:10:24] linear regression model for each of the N subscript U users.  
[00:10:30] So that's how you can learn parameters and predict movie ratings if you had access to  
[00:10:36] these features X1 and X2 that tell you how much is each of the movies a romance movie  
[00:10:42] and how much is each of the movies an action movie.  
[00:10:46] But where do these features come from and what if you don't have access to such features  
[00:10:51] that give you enough detail about the movies with which to make these predictions?  
[00:10:56] In the next video, we'll look at a modification of this algorithm that will let you make predictions,  
[00:11:02] let you make recommendations, even if you don't have in advance features that describe  
[00:11:08] the items of the movies in sufficient detail to run the algorithm that we just saw.  
[00:11:13] So let's go on and take a look at that in the next video.
