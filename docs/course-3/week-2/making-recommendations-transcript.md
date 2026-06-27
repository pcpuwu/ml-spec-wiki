# Making Recommendations — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](making-recommendations.md)

---

[00:00:02] Welcome to this second-to-last week of the machine learning specialization.  
[00:00:07] I'm really happy that together we're almost all the way to the finish line.  
[00:00:11] What we'll do this week is discuss recommender systems.  
[00:00:15] This is one of the topics that has received quite a bit of attention in academia,  
[00:00:19] but the commercial impact and the actual number of practical use cases of recommender systems  
[00:00:25] seems to me to be even vastly greater than the amount of attention it has received in academia.  
[00:00:32] Every time you go to an online shopping website like Amazon, or a movie streaming site like Netflix,  
[00:00:39] or go to one of the apps or sites that do food delivery,  
[00:00:44] many of these sites will recommend things to you that they think you may want to buy,  
[00:00:49] or movies they think you may want to watch, or restaurants that they think you may want to try out.  
[00:00:54] For many companies, a large fraction of sales is driven by their recommender systems.  
[00:00:59] So today, for many companies, the economics or the value driven by recommender systems is very large.  
[00:01:07] And so what we'll do in this week is take a look at how they work.  
[00:01:11] So with that, let's dive in and take a look at what is a recommender system.  
[00:01:15] I'm going to use as a running example the application of predicting movie ratings.  
[00:01:21] So say you run a large movie streaming website, and your users have rated movies using one to five stars.  
[00:01:29] And so in a typical recommender system, you have a set of users here.  
[00:01:34] We have four users, Alice, Bob, Carol, and Dave, which I've numbered users one through four,  
[00:01:40] as well as a set of movies, Love at Last, Romance Forever, Cheap Puppies of Love,  
[00:01:44] and then Nonstop Car Chasers and Swords vs. Karate.  
[00:01:48] And what the users have done is rated these movies one to five stars.  
[00:01:53] Or in fact, to make some of these examples a little bit easier, I'm actually going to let them rate the movies from zero to five stars.  
[00:02:01] So say Alice has rated Love at Last five stars, Romance Forever five stars.  
[00:02:06] Maybe she has not yet watched Cheap Puppies of Love, so you don't have a rating for that.  
[00:02:10] And I'm going to denote that by a question mark, and she thinks Nonstop Car Chasers and Swords vs. Karate deserve zero stars.  
[00:02:18] Bob rates that five stars, has not watched that, so you don't have a rating, rates that four stars, zero, zero.  
[00:02:26] Carol, on the other hand, thinks that deserves zero stars, has not watched that, zero stars,  
[00:02:32] and she loves Nonstop Car Chasers and Swords vs. Karate.  
[00:02:36] And Dave rates the movies as follows.  
[00:02:40] In a typical recommender system, you will have some number of users as well as some number of items.  
[00:02:49] In this case, the items are movies that you want to recommend to the users.  
[00:02:55] And even though I'm using movies in this example, the same logic or the same framework works for recommending anything  
[00:03:02] from products or websites myself, to restaurants, to even which media articles or social media articles to show to a user that may be more interesting to them.  
[00:03:11] The notation I'm going to use is, I'm going to use NU to denote the number of users.  
[00:03:18] So in this example, NU is equal to four because we have four users, and NM to denote the number of movies or really the number of items.  
[00:03:28] So in this example, NM is equal to five because we have five movies.  
[00:03:33] I'm going to set Rij to be equal to one if user j has rated movie i.  
[00:03:42] So for example, user one, that is Alice, has rated movie one but has not rated movie three.  
[00:03:51] And so R11 would be equal to one because she has rated movie one, but R31 would be equal to zero because she has not rated movie number three.  
[00:04:04] Then finally, I'm going to use Yij to denote the rating given by user j to movie i.  
[00:04:11] So for example, this rating here would be that movie three was rated by user two to be equal to four.  
[00:04:19] Notice that not every user rates every movie, and it's important for the system to know which users have rated which movies.  
[00:04:27] That's why we're going to define Rij to be equal to one if user j has rated movie i, and it would be equal to zero if user j has not rated movie i.  
[00:04:38] So with this framework for recommended systems, one possible way to approach the problem is to look at the movies that users have not rated  
[00:04:47] and to try to predict how users would rate those movies, because then we can try to recommend to users things that they are more likely to rate as five stars.  
[00:04:58] And in the next video, we'll start to develop an algorithm for doing exactly that, but making one very special assumption,  
[00:05:05] which is we're going to assume temporarily that we have access to features or extra information about the movies,  
[00:05:12] such as which movies are romance movies, which movies are action movies.  
[00:05:17] And using that, we'll start to develop an algorithm.  
[00:05:20] But later this week, we'll actually come back and ask, what if we don't have these features?  
[00:05:25] How can we still get the algorithm to work then?  
[00:05:28] But let's go on to the next video to start building up this algorithm.
