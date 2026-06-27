# Mean Normalization — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](mean-normalization.md)

---

[00:00:02] Back in the first course, you had seen how for linear regression, feature normalization  
[00:00:07] can help the algorithm run faster.  
[00:00:09] In the case of building a recommended system with numbers Y, such as movie ratings from  
[00:00:15] 1 to 5 or 0 to 5 stars, it turns out your algorithm will run more efficiently and also  
[00:00:20] perform a bit better if you first carry out mean normalization, that is, if you normalize  
[00:00:27] the movie ratings to have a consistent average value.  
[00:00:31] Let's take a look at what that means.  
[00:00:34] So here's the dataset that we've been using, and down below is the cost function you would  
[00:00:39] use to learn the parameters for the model.  
[00:00:42] In order to explain mean normalization, I'm actually going to add a fifth user, Eve, who  
[00:00:51] has not yet rated any movies.  
[00:00:53] And you see in a little bit that adding mean normalization will help the algorithm make  
[00:00:59] better predictions on the user, Eve.  
[00:01:02] In fact, if you were to train a collaborative filtering algorithm on this data, then because  
[00:01:10] we are trying to make the parameters W small because of this regularization term, if you  
[00:01:16] were to run the algorithm on this dataset, you actually end up with the parameters W  
[00:01:23] for the fifth user, for the user Eve, to be equal to 0, 0, as well as quite likely B5  
[00:01:32] equals 0.  
[00:01:33] Because Eve hasn't rated any movies yet, the parameters W and B don't affect this first  
[00:01:40] term in the cost function because none of Eve's movies rating play a role in this squared  
[00:01:47] error cost function.  
[00:01:49] And so, minimizing this means making the parameters W as small as possible.  
[00:01:56] We didn't really regularize B, but if you initialize B to 0 as a default, you end up  
[00:02:01] with B5 equals 0 as well.  
[00:02:04] But if these are the parameters for user 5, that is for Eve, then what the algorithm will  
[00:02:10] end up doing is predict that all of Eve's movies ratings would be W5.x for movie i plus  
[00:02:22] B5, and this is equal to 0 if W and B above equal 0.  
[00:02:27] And so this algorithm will predict that if you have a new user that has not yet rated  
[00:02:31] anything, we think they'll rate all movies with 0 stars, and that's not particularly  
[00:02:36] hopeful.  
[00:02:38] So in this video, we'll see that mean normalization will help this algorithm come up with better  
[00:02:44] predictions of the movie ratings for a new user that has not yet rated any movies.  
[00:02:50] In order to describe mean normalization, let me take all of the values here, including  
[00:02:57] all the question marks for Eve, and put them in a two-dimensional matrix like this just  
[00:03:03] to write out all the ratings, including the question marks, in a more succinct and more  
[00:03:08] compact way.  
[00:03:10] To carry out mean normalization, what we're going to do is take all of these ratings and  
[00:03:16] for each movie, compute the average rating that was given.  
[00:03:21] So movie 1 had two 5s and two 0s, and so the average rating is 2.5.  
[00:03:27] Movie 2 had a 5 and a 0, so that averages out to 2.5.  
[00:03:31] Movie 3, 4 and 0 averages out to 2.  
[00:03:34] Movie 4 averages out to 2.25 rating, and movie 5, not that popular, has an average 1.25 rating.  
[00:03:45] So I'm going to take all of these five numbers and gather them into a vector, which I'm going  
[00:03:49] to call mu, because this is the vector of the average ratings that each of the movies  
[00:03:55] had, averaging over just the users that did rate that particular movie.  
[00:04:00] Instead of using these original 0 to 5 star ratings over here, I'm going to take this  
[00:04:05] and subtract from every rating the mean rating that it was given.  
[00:04:11] So for example, this movie rating was 5, I'm going to subtract 2.5 giving me 2.5 over here.  
[00:04:21] This movie had a 0 star rating, I'm going to subtract 2.25 giving me a negative 2.25  
[00:04:28] rating and so on for all of the now five users, including the new user Eve, as well as for  
[00:04:34] all five movies.  
[00:04:35] Then these new values on the right become your new values of yij.  
[00:04:39] We're going to pretend that user 1 had given a 2.5 rating to movie 1 and a negative 2.25  
[00:04:46] rating to movie 4.  
[00:04:49] Using this, you can then learn wj, vj, and xi.  
[00:04:54] Same as before, for user j on movie i, you would predict wj dot xi plus vj, but because  
[00:05:05] we had subtracted off mu i for movie i during this mean normalization step, in order to  
[00:05:13] predict not a negative star rating, which isn't possible if a user rates from 0 to 5  
[00:05:19] stars, we have to add back this mu i, which is just the value we had subtracted out.  
[00:05:26] So as a concrete example, if we look at what happens with user 5, with the new user Eve,  
[00:05:33] because she had not yet rated any movies, the algorithm might learn parameters w5 equals  
[00:05:38] 0 and say b5 equals 0.  
[00:05:43] And so if we look at the predicted rating for movie 1, we will predict that Eve would  
[00:05:49] rate it w5 dot x1 plus b5, but this is 0, and then plus mu 1, which is equal to 2.5.  
[00:06:05] So this seems more reasonable to think Eve is likely to rate this movie 2.5 rather than  
[00:06:11] think Eve will rate all movies 0 stars, just because she hasn't rated any movies yet.  
[00:06:17] And in fact, the effect of this algorithm is it will cause the initial guesses for the  
[00:06:23] new user Eve to be just equal to the mean of whatever other users have rated these five  
[00:06:30] movies.  
[00:06:31] And that seems more reasonable to take the average rating of the movies rather than to  
[00:06:35] guess that all the ratings by Eve will be 0.  
[00:06:40] It turns out that by normalizing the mean of the different movies' ratings to be 0,  
[00:06:46] the optimization algorithm for the recommender system will also run just a little bit faster.  
[00:06:52] But it does make the algorithm behave much better for users that have rated no movies  
[00:06:57] or very small numbers of movies, and the predictions will become more reasonable.  
[00:07:04] In this example, what we did was normalize each of the rows of this matrix to have 0  
[00:07:09] mean, and we saw this helps when there's a new user that hasn't rated a lot of movies  
[00:07:13] yet.  
[00:07:14] There's one other alternative that you could use, which is to instead normalize the columns  
[00:07:21] of this matrix to have 0 mean, and that would be a reasonable thing to do too, but I think  
[00:07:27] in this application, normalizing the rows so that you can give reasonable ratings for  
[00:07:33] a new user seems more important than normalizing the columns.  
[00:07:40] Normalizing the columns would help if there was a brand new movie that no one has rated  
[00:07:44] yet, but if there's a brand new movie that no one has rated yet, you probably shouldn't  
[00:07:49] show that movie to too many users initially because you don't know that much about that  
[00:07:54] movie.  
[00:07:55] So, normalizing columns to help with the case of a movie with no ratings seems less important  
[00:08:02] to me than normalizing the rows to help with the case of a new user that's hardly rated  
[00:08:07] any movies yet.  
[00:08:09] And when you are building your own recommender system, in this week's practice lab, normalizing  
[00:08:15] just the rows should work fine.  
[00:08:17] So that's mean normalization.  
[00:08:19] It makes the algorithm run a little bit faster, but even more important, it makes the algorithm  
[00:08:24] give much better, much more reasonable predictions when there are users that have rated very  
[00:08:30] few movies or even no movies at all.  
[00:08:33] This implementational detail of mean normalization will make your recommender system work much  
[00:08:38] better.  
[00:08:39] Next, let's go on to the next video to talk about how you can implement this for yourself  
[00:08:44] in TensorFlow.
