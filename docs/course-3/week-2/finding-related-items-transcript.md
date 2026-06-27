# Finding Related Items — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](finding-related-items.md)

---

[00:00:02] If you go to an online shopping website and are looking at a specific item, say maybe  
[00:00:08] a specific book, the website may show you things like, here are some other books similar  
[00:00:13] to this one.  
[00:00:14] Or if you're browsing a specific movie, it may say, here are some other movies similar  
[00:00:19] to this one.  
[00:00:20] How do the websites do that, so that when you're looking at one item, it gives you  
[00:00:24] other similar related items to consider?  
[00:00:27] It turns out the collaborative filtering algorithm that we've been talking about gives  
[00:00:31] you a nice way to find related items.  
[00:00:33] Let's take a look.  
[00:00:35] As part of the collaborative filtering we've discussed, you learn features Xi for every  
[00:00:42] item i, for every movie i or other type of item that you're recommending to users.  
[00:00:47] Whereas earlier this week, I had used a hypothetical example of the features representing how much  
[00:00:54] a movie is a romance movie versus an action movie.  
[00:00:57] In practice, when you use this algorithm to learn the features Xi automatically, looking  
[00:01:03] at the individual features like X1, X2, X3, you find them to be quite hard to interpret.  
[00:01:10] It's quite hard to look at the features and say, oh, X1 is an action movie and X2 is a  
[00:01:17] foreign film and so on.  
[00:01:20] Nonetheless, these learned features collectively, X1 and X2 or X1, X2, X3, however many features  
[00:01:28] and you have, collectively these features do convey something about what that movie  
[00:01:35] is like.  
[00:01:37] It turns out that given features Xi of item i, if you want to find other items, say other  
[00:01:44] movies related to movie i, then what you can do is try to find the item k with features  
[00:01:52] Xk that is similar to Xi and in particular, given a feature vector Xk, the way we determine  
[00:02:04] whether or not it's similar to the feature Xi is as follows, is the sum from l equals  
[00:02:10] one through n with n features of Xkl minus Xil squared.  
[00:02:16] This turns out to be the square distance between Xk and Xi and in math, this square distance  
[00:02:25] between these two vectors, Xk and Xi, is sometimes written as follows as well.  
[00:02:32] And if you find not just the one movie with the smallest distance between Xk and Xi but  
[00:02:40] find, say, the five or ten items with the most similar feature vectors, then you end  
[00:02:46] up finding five or ten related items to the item Xi.  
[00:02:51] So if you're building a website and want to help users find related products to a specific  
[00:02:56] product they're looking at, this would be a nice way to do so.  
[00:03:01] Because the features Xi give a sense of what item i is about, other items Xk with similar  
[00:03:09] features will turn out to be similar to item i.  
[00:03:13] It turns out later this week, this idea of finding related items will be a small building  
[00:03:18] block that we'll use to get to an even more powerful recommender system as well.  
[00:03:25] Before wrapping up this section, I want to mention a few limitations of collaborative  
[00:03:30] filtering.  
[00:03:31] In collaborative filtering, you have a set of items and a set of users and the users  
[00:03:36] have rated some subset of items.  
[00:03:39] One of its weaknesses is that it's not very good at the cold start problem.  
[00:03:44] For example, if there's a new item in your catalog, say someone's just published a new  
[00:03:49] movie and hardly anyone has rated that movie yet, how do you rank the new item if very  
[00:03:56] few users have rated it before?  
[00:03:59] Similarly, for new users that rated only a few items, how can we make sure we show them  
[00:04:06] something reasonable?  
[00:04:08] We did see in an earlier video how mean normalization can help with this and it does help a lot.  
[00:04:15] But perhaps there are even better ways to show users that rated very few items things  
[00:04:21] that are likely to interest them.  
[00:04:23] This is called the cold start problem because when you have a new item that few users have  
[00:04:29] rated or when you have a new user that's rated very few items, the results of collaborative  
[00:04:36] filtering for that item or for that user may not be very accurate.  
[00:04:41] A second limitation of collaborative filtering is it doesn't give you a natural way to use  
[00:04:46] side information or additional information about items or users.  
[00:04:50] For example, for a given movie in your catalog, you might know what is the genre of the movie,  
[00:04:56] who are the movie stars, what is the studio, what is the budget, and so on.  
[00:05:01] You may have a lot of features about a given movie or for a single user, you may know something  
[00:05:07] about their demographics such as their age, gender, location, they express preferences  
[00:05:14] such as if they tell you they like certain movie genres but not other movie genres or  
[00:05:19] it turns out if you know the user's IP address, that can tell you a lot about the user's location  
[00:05:26] and knowing the user's location might also help you guess what might the user be interested  
[00:05:31] in or if you know whether the user is accessing your sites on a mobile or on a desktop or  
[00:05:39] if you know what web browser they're using.  
[00:05:41] It turns out all of these are little cues you can get that can be surprisingly correlated  
[00:05:46] with the preferences of a user.  
[00:05:48] It turns out, by the way, that it's known that users that use the Chrome versus Firefox  
[00:05:53] versus the Safari versus the Microsoft Edge browser, they actually behave in very different  
[00:05:58] ways.  
[00:05:59] So even knowing the user web browser can give you a hint when you have collected enough  
[00:06:03] data of what this particular user might like.  
[00:06:06] So even though collective filtering where you have multiple users give you ratings of  
[00:06:11] multiple items is a very powerful set of algorithms, it also has some limitations.  
[00:06:17] In the next video, let's go on to develop content-based filtering algorithms which can  
[00:06:22] address a lot of these limitations.  
[00:06:25] Content-based filtering algorithms are a state-of-the-art technique used in many commercial applications  
[00:06:30] today.  
[00:06:31] Let's go take a look at how they work.
