# Collaborative Filtering vs. Content-Based Filtering — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](collaborative-filtering-vs-content-based-filtering.md)

---

[00:00:02] In this video, we'll start to develop a second type of recommended system called a content-based  
[00:00:07] filtering algorithm.  
[00:00:08] To get started, let's compare and contrast the collaborative filtering approach that  
[00:00:13] we've been looking at so far with this new content-based filtering approach.  
[00:00:17] Let's take a look.  
[00:00:19] With collaborative filtering, the general approach is that we would recommend items  
[00:00:25] to you based on ratings of users who gave similar ratings as you.  
[00:00:31] So we have some number of users give some ratings for some items, and the algorithm  
[00:00:36] figures out how to use that to recommend new items to you.  
[00:00:40] In contrast, content-based filtering takes a different approach to deciding what to recommend  
[00:00:48] to you.  
[00:00:49] A content-based filtering algorithm will recommend items to you based on the features of users  
[00:00:55] and features of the items to find a good match.  
[00:00:58] In other words, it requires having some features of each user as well as some features of each  
[00:01:05] item, and it uses those features to try to decide which items and users might be a good  
[00:01:12] match for each other.  
[00:01:13] With a content-based filtering algorithm, you still have data where users have rated  
[00:01:19] some items.  
[00:01:20] So with content-based filtering, we'll continue to use Rij to denote whether or not user j  
[00:01:28] has rated item i, and we'll continue to use Yij to denote the rating that user j has given  
[00:01:37] item i, if it's defined.  
[00:01:39] But the key to content-based filtering is that we'll be able to make good use of features  
[00:01:46] of the user and of the items to find better matches than potentially a pure collaborative  
[00:01:53] filtering approach might be able to.  
[00:01:55] Let's take a look at how this works.  
[00:01:57] In the case of movie recommendations, here are some examples of features.  
[00:02:02] You may know the age of the user, or you may have the gender of the user.  
[00:02:08] So this could be a one-hot feature, similar to what you saw when we were talking about  
[00:02:14] decision trees, where you could have a one-hot feature with three values based on whether  
[00:02:20] the user's self-identified gender is male or female or unknown.  
[00:02:26] And you may know the country of the user.  
[00:02:29] So if there are about 200 countries in the world, then this would be a one-hot feature  
[00:02:35] with about 200 possible values.  
[00:02:38] You can also look at past behaviors of the user to construct this feature vector.  
[00:02:43] For example, if you look at the top 1,000 movies in your catalog, you might construct  
[00:02:48] 1,000 features that tell you of the 1,000 most popular movies in the world, which of  
[00:02:54] these has the user watched.  
[00:02:57] And in fact, you can also take ratings the user might have already given in order to  
[00:03:02] construct new features.  
[00:03:04] So it turns out that if you have a set of movies, and if you know what genre each movie  
[00:03:10] is in, then the average rating per genre that the user has given.  
[00:03:16] So of all the romance movies that the user has rated, what was the average rating?  
[00:03:22] Of all the action movies that the user has rated, what was the average rating?  
[00:03:27] And so on for all the other genres.  
[00:03:30] This too can be a powerful feature to describe the user.  
[00:03:35] One interesting thing about this feature is that it actually depends on the ratings  
[00:03:41] that the user has given, but there's nothing wrong with that.  
[00:03:44] Constructing a feature vector that depends on the user's ratings is a completely fine  
[00:03:49] way to develop a feature vector to describe that user.  
[00:03:53] So with such features like these, you can then come up with a feature vector x subscript  
[00:04:00] u, u stands for user, superscript j for user j.  
[00:04:04] Similarly, you can also come up with a set of features for each movie or for each item,  
[00:04:10] such as what was the year of the movie, what's the genre or genres of the movie of now.  
[00:04:16] If there are critic reviews of the movie, you can construct one or multiple features  
[00:04:22] to capture something about what the critics are saying about the movie.  
[00:04:27] Or once again, you can actually take user ratings of the movie to construct a feature  
[00:04:32] of, say, the average rating of this movie.  
[00:04:36] This feature, again, depends on the ratings that users had given, but again, there's nothing  
[00:04:43] wrong with that.  
[00:04:44] You can construct a feature for a given movie that depends on the ratings the movie had  
[00:04:49] received, such as the average rating of the movie.  
[00:04:52] Or if you wish, you can also have average rating per country or average rating per user  
[00:04:58] demographic and so on to construct other types of features of the movies as well.  
[00:05:03] And so with this, for each movie, you can then construct a feature vector, which I'm  
[00:05:08] going to denote x subscript m, m stands for movie, and superscript i for movie i.  
[00:05:15] Given features like this, the task is to try to figure out whether a given movie i is going  
[00:05:23] to be a good match for user j.  
[00:05:27] Notice that the user features and the movie features can be very different in size.  
[00:05:33] For example, maybe the user features could be 1,500 numbers and the movie features could  
[00:05:41] be just 50 numbers, and that's okay too.  
[00:05:44] In content-based filtering, we're going to develop an algorithm that learns to match  
[00:05:49] users and movies.  
[00:05:51] Previously, we were predicting the rating of user j on movie i as wj dot product of  
[00:05:59] xi plus bj.  
[00:06:02] In order to develop content-based filtering, I'm going to get rid of bj.  
[00:06:09] It turns out this won't hurt the performance of the content-based filtering at all.  
[00:06:13] Instead of writing wj for a user j and xi for a movie i, I'm instead going to just  
[00:06:21] replace this notation with vj, u.  
[00:06:26] This v here stands for a vector, it'll be a list of numbers computed for user j, and  
[00:06:33] the u subscript here stands for user.  
[00:06:37] Instead of xi, I'm going to compute a separate vector, subscript m, this stands for movie,  
[00:06:44] and for movie i, it's what the superscript stands for.  
[00:06:49] vj, u is a vector, it's a list of numbers computed from the features of user j, and  
[00:06:58] vim is a list of numbers computed from the features, like the ones you saw in the previous  
[00:07:05] slide of movie i.  
[00:07:08] And if we're able to come up with an appropriate choice of these vectors, vj, u and vim, then  
[00:07:17] hopefully the dot product between these two vectors will be a good prediction of the rating  
[00:07:23] that user j gives movie i.  
[00:07:25] Just to illustrate what a learning algorithm could come up with, if v, u, that is a user  
[00:07:33] vector, turns out to capture the user's preferences, say it's 4.9, 0.1, and so on, a list of numbers  
[00:07:43] like that.  
[00:07:44] And the first number captures how much do they like romance movies, and then the second  
[00:07:49] number captures how much do they like action movies, and so on.  
[00:07:55] And at vm, the movie vector is 4.5, 0.2, and so on and so forth.  
[00:08:03] With these numbers capturing how much is this a romance movie, how much is this an action  
[00:08:08] movie, and so on.  
[00:08:10] Then the dot product, which multiplies these lists of numbers element-wise and then takes  
[00:08:16] a sum, hopefully will give a sense of how much this particular user will like this particular  
[00:08:22] movie.  
[00:08:24] So the challenge is, given features of a user, say xju, how can we compute this vector vju  
[00:08:32] that represents succinctly or compactly the user's preferences, and similarly, given features  
[00:08:38] of the movie, how can we compute vim?  
[00:08:43] Notice that whereas xu and xm could be different in size, one could be a very long list of  
[00:08:50] numbers, one could be much shorter list, v here have to be the same size, because if  
[00:08:57] you want to take a dot product between vu and vm, then both of them have to have the  
[00:09:02] same dimension, such as maybe both of these are, say, 32 numbers.  
[00:09:08] So to summarize, in collaborative filtering, we had number of users give ratings of different  
[00:09:15] items.  
[00:09:17] In contrast, in content-based filtering, we have features of users and features of  
[00:09:22] items, and we want to find a way to find good matches between the users and the items.  
[00:09:28] And the way we're going to do so is to compute these vectors, vu for the users and vm for  
[00:09:35] the items of the movies, and then take dot products between them to try to find good  
[00:09:39] matches.  
[00:09:40] How do we compute vu and vm?  
[00:09:43] Let's take a look at that in the next video.
