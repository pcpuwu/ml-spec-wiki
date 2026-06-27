# Collaborative Filtering Algorithm — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](collaborative-filtering-algorithm.md)

---

[00:00:02] In the last video, you saw how if you have features for each movie, such as features  
[00:00:07] X1 and X2, that tell you how much is this a romance movie and how much is this an action  
[00:00:12] movie, then you can use basically linear regression to learn to predict movie ratings.  
[00:00:18] But what if you don't have those features, X1 and X2?  
[00:00:22] Let's take a look at how you can learn or come up with those features, X1 and X2, from  
[00:00:27] the data.  
[00:00:28] So here's the data that we had before, but what if instead of having these numbers for  
[00:00:35] X1 and X2, we didn't know in advance what the values of the features X1 and X2 are?  
[00:00:41] So I'm going to replace them with question marks over here.  
[00:00:44] Now, just for the purposes of illustration, let's say we had somehow already learned parameters  
[00:00:52] for the four users.  
[00:00:53] So let's say that we learned parameters w1 equals 5 and 0 and b1 equals 0 for user 1,  
[00:01:00] w2 is also 5, 0, b2 is 0, w3 is 0, 5, b3 is 0, and for user 4, w4 is also 0, 5, and b4  
[00:01:17] is equal to 0.  
[00:01:18] We'll worry later about how we might have come up with these parameters w and b, but  
[00:01:23] let's say we have them already.  
[00:01:26] And as a reminder, to predict user j's rating on movie i, we're going to use wj.product  
[00:01:36] the features of Xi plus bj.  
[00:01:42] So to simplify this example, all the values of b are actually equal to 0, so just to reduce  
[00:01:47] a little bit of writing, I'm going to ignore b for the rest of this example.  
[00:01:52] Let's take a look at how we can try to guess what might be reasonable features for movie  
[00:01:58] 1.  
[00:01:59] If these are the parameters you have on the left, then given that Alice rated movie 1  
[00:02:05] 5, we should have that w1.x1 should be about equal to 5, and w2.x2 should also be about  
[00:02:16] equal to 5, because Bob rated it 5, w3.x1 should be close to 0, and w4.x1 should be  
[00:02:27] close to 0 as well.  
[00:02:29] So the question is, given these values for w that we have up here, what choice for x1  
[00:02:38] would cause these values to be right?  
[00:02:44] Well, one possible choice would be if the features for that first movie were 1,0, in  
[00:02:50] which case w1.x1 would equal to 5, w2.x1 would equal to 5, and similarly w3 or w4.product  
[00:03:04] with this feature vector x1 would be equal to 0.  
[00:03:08] So what we have is that if you have the parameters for all four users here, and if you have four  
[00:03:14] ratings in this example that you want to try to match, you can take a reasonable guess  
[00:03:20] at what is the feature vector x1 for movie 1 that would make good predictions for these  
[00:03:27] four ratings up on top.  
[00:03:30] And similarly, if you have these parameter vectors, you can also try to come up with  
[00:03:37] a feature vector x2 for the second movie, a feature vector x3 for the third movie, and  
[00:03:43] so on, to try to make the algorithm's predictions on these additional movies close to what was  
[00:03:53] actually the ratings given by the users.  
[00:03:57] Let's come up with a cost function for actually learning the values of x1 and x2.  
[00:04:04] And by the way, notice that this works only because we have parameters for four users.  
[00:04:11] That's what allows us to try to guess appropriate features x1.  
[00:04:17] This is why in a typical linear regression application, if you have just a single user,  
[00:04:22] you don't actually have enough information to figure out what would be the features x1  
[00:04:26] and x2, which is why in the linear regression context that you saw in course 1, you can't  
[00:04:33] come up with features x1 and x2 from scratch.  
[00:04:37] But in collateral filtering, it is because you have ratings for multiple users of the  
[00:04:42] same item, of the same movie, that's what makes it possible to try to guess what the  
[00:04:47] plausible value is for these features.  
[00:04:50] So given w1, b1, w2, b2, and so on, through w, n, u, b, n, u for the n subscript u users,  
[00:04:59] if you want to learn the features xi for a specific movie i, here's a cost function  
[00:05:06] we could use, which is that I'm going to want to minimize squared error as usual.  
[00:05:14] So if the predicted rating by user j on movie i is given by this, let's take the squared  
[00:05:24] difference from the actual movie rating yij, and as before, let's sum over all the users  
[00:05:33] j, but this will be a sum over all values of j where rij is equal to 1, and I'll add  
[00:05:42] a 1 half there as usual.  
[00:05:44] And so if I define this as a cost function for xi, then if we minimize this as a function  
[00:05:52] of xi, you'd be choosing the features xi for movie i, so that for all the users j that  
[00:06:01] had rated movie i, we would try to minimize the squared difference between what your choice  
[00:06:08] of features xi results in, in terms of the predicted movie rating, minus the actual movie  
[00:06:14] rating that the user had given it.  
[00:06:17] And finally, if we want to add a regularization term, we add the usual plus lambda over 2,  
[00:06:23] k equals 1 through n, where n as usual is the number of features of xik squared.  
[00:06:31] Lastly, to learn all the features x1 through xnm, because we have nm movies, we can take  
[00:06:40] this cost function on top and sum it over all the movies, so sum from i equals 1 through  
[00:06:47] the number of movies, and then just take this term from above, and this becomes a cost function  
[00:06:56] for learning the features for all of the movies in the dataset.  
[00:07:02] And so, if you have parameters w and b for all the users, then minimizing this cost function  
[00:07:11] as a function of x1 through xnm using gradient descent or some other algorithm, this will  
[00:07:17] actually allow you to take a pretty good guess at learning good features for the movies.  
[00:07:22] And this is pretty remarkable.  
[00:07:25] For most machine learning applications, the features have to be externally given, but  
[00:07:30] in this algorithm, we can actually learn the features for a given movie.  
[00:07:35] But in what we've done so far in this video, we assume you had those parameters w and b  
[00:07:40] for the different users.  
[00:07:42] Where do you get those parameters from?  
[00:07:45] Well, let's put together the algorithm from the last video for learning w and b, and what  
[00:07:49] we just talked about in this video for learning x, and that will give us our collaborative  
[00:07:55] filtering algorithm.  
[00:07:57] Here's the cost function for learning the features.  
[00:08:01] This is what we had derived on the last slide.  
[00:08:04] Now, it turns out that if we put these two together, this term here is exactly the same  
[00:08:13] as this term here.  
[00:08:15] Notice that sum over j of all values of i, that rij equals 1, is the same as summing  
[00:08:22] over all values of i with all j where rij is equal to 1.  
[00:08:28] This summation is just summing over all user movie pairs where there is a rating.  
[00:08:34] And so what I'm going to do is put these two cost functions together and have this,  
[00:08:42] where I'm just writing out the summation more explicitly as summing over all pairs  
[00:08:48] i and j where we do have a rating of the usual squared cost function, and then let  
[00:08:55] me take the regularization term from learning the parameters w and b and put that here,  
[00:09:04] and take the regularization term from learning the features x and put them here, and this  
[00:09:11] ends up being our overall cost function for learning w, b, and x.  
[00:09:19] And it turns out that if you minimize this cost function as a function of w and b as  
[00:09:24] well as x, then this algorithm actually works.  
[00:09:28] Here's what I mean.  
[00:09:29] If we had three users and two movies, and if you have ratings for these four movies  
[00:09:37] but not those two, what it does is it sums over all the users, and for user 1 it has  
[00:09:44] a term in the cost function for this, for user 2 it has a term in the cost function  
[00:09:48] for these, for user 3 it has a term in the cost function for this.  
[00:09:51] So we're summing over users first and then having one term for each movie where there  
[00:09:59] is a rating.  
[00:10:00] But an alternative way to carry out this summation is to first look at movie 1, that's what this  
[00:10:06] summation here does, and then to include all the users that rated movie 1, and then  
[00:10:12] look at movie 2 and have a term for all the users that had rated movie 2.  
[00:10:19] And you see that in both cases we're just summing over these four pairs where the user  
[00:10:26] had rated the corresponding movie.  
[00:10:28] So that's why this summation on top and this summation here, they're two ways of summing  
[00:10:33] over all of the pairs where the user had rated the movie.  
[00:10:38] So how do you minimize this cost function as a function of W, B, and X?  
[00:10:43] One thing you could do is to use gradient descent.  
[00:10:47] So in course 1 when we learned about linear regression, this is the gradient descent algorithm  
[00:10:55] you had seen, where we had a cost function J which is a function of the parameters W  
[00:11:00] and B, and we'd apply gradient descent as follows.  
[00:11:03] With collateral filtering, the cost function isn't a function of just W and B, it's now  
[00:11:09] a function of W, B, and X.  
[00:11:13] And I'm using W and B here to denote the parameters for all of the users, and X here just informally  
[00:11:19] to denote the features for all of the movies.  
[00:11:22] But if you're able to take partial derivatives with respect to the different parameters,  
[00:11:27] you can then continue to update the parameters as follows.  
[00:11:32] But now we need to optimize this with respect to X as well, so we also will want to update  
[00:11:38] each of these parameters X using gradient descent as follows.  
[00:11:44] And it turns out that if you do this, then you actually find pretty good values of W  
[00:11:51] and B as well as X.  
[00:11:54] And in this formulation of the problem, the parameters are W and B, and X is also a parameter.  
[00:12:04] And then finally, to learn the values of X, we also will update X as X minus the partial  
[00:12:13] derivative with respect to X of the cost W, B, X.  
[00:12:19] I'm using the notation here a little bit informally and not keeping very careful track of the  
[00:12:24] superscripts and subscripts, but the key takeaway I hope you have from this is that  
[00:12:30] the parameters of this model are W and B, and X now is also a parameter.  
[00:12:37] Which is why we minimize the cost function as a function of all three of these sets of  
[00:12:41] parameters W and B as well as X.  
[00:12:45] So the algorithm we just derived is called collaborative filtering.  
[00:12:50] And the name collaborative filtering refers to the sense that because multiple users have  
[00:12:56] rated the same movie kind of collaboratively, giving you a sense of what this movie may  
[00:13:01] be like, that allows you to guess what are appropriate features for that movie.  
[00:13:07] And this in turn allows you to predict how other users that haven't yet rated that same  
[00:13:12] movie may decide to rate it in the future.  
[00:13:16] So this collaborative filtering is this gathering of data from multiple users, this collaboration  
[00:13:22] between users to help you predict ratings for even other users in the future.  
[00:13:29] So far, our problem formulation has used movie ratings from 1 to 5 stars or from 0 to 5 stars.  
[00:13:37] A very common use case of recommended systems is when you have binary labels, such as did  
[00:13:42] the user favorite or like or interact with an item.  
[00:13:47] In the next video, let's take a look at the generalization of the model you've seen so  
[00:13:51] far to binary labels.  
[00:13:53] Let's go see that in the next video.
