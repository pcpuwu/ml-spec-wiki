# Recommending from a Large Catalogue — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](recommending-from-a-large-catalogue.md)

---

[00:00:00] Today's recommended systems will sometimes need to pick a handful of items to recommend  
[00:00:06] from a catalog of thousands or millions or tens of millions or even more items.  
[00:00:11] How do you do this efficiently computationally? Let's take a look.  
[00:00:15] Here's a neural network we've been using to make predictions about how a user might rate an item.  
[00:00:22] Today, a large movie streaming site may have thousands of movies,  
[00:00:29] or a system that is trying to decide what ad to show may have a catalog of millions of ads  
[00:00:37] to choose from, or a music streaming site may have tens of millions of songs to choose from,  
[00:00:46] and large online shopping sites can have millions or even tens of millions of products to choose  
[00:00:51] from. When a user shows up on your website, they have some feature XU, but if you need to take  
[00:00:59] thousands or millions of items to feed through this neural network in order to compute the  
[00:01:06] inner product to figure out which products you should recommend, then having to run neural  
[00:01:11] network inference thousands or millions of times every time a user shows up on your website becomes  
[00:01:17] computationally infeasible. Many large-scale recommender systems are implemented as  
[00:01:23] two steps, which are called the retrieval and the ranking steps. The idea is during the retrieval  
[00:01:31] step will generate a large list of plausible item candidates that tries to cover a lot of possible  
[00:01:40] things you might recommend to the user, and it's okay during the retrieval step if you include a  
[00:01:46] lot of items that the user is not likely to like, and then during the ranking step we'll fine-tune  
[00:01:53] and pick the best items to recommend to the user. So here's an example. During the retrieval step,  
[00:02:00] we might do something like for each of the last 10 movies that the user has watched, find the 10  
[00:02:07] most similar movies. So this means, for example, if a user has watched the movie i with vector vim,  
[00:02:17] you can find the movies k with vector vkm that is similar to that, and as you saw in the last video,  
[00:02:27] finding the similar movies to a given movie can be pre-computed. So having pre-computed the most  
[00:02:33] similar movies to a given movie, you can just pull up the results using a lookup table. This would give  
[00:02:39] you an initial set of maybe somewhat plausible movies to recommend to a user that just showed up  
[00:02:44] on your website. Additionally, you might decide to add to it for whatever are the most viewed three genres  
[00:02:52] of the user. Say there's a user that's watched a lot of romance movies and a lot of comedy movies  
[00:02:59] and a lot of historical dramas. Then we would add to the list of plausible item candidates the top  
[00:03:05] 10 movies in each of these three genres. And then maybe we would also add to this list the top 20  
[00:03:12] movies in the country of the user. So this retrieval step can be done very quickly, and you may end up  
[00:03:20] with a list of a hundred or maybe hundreds of plausible movies to recommend to the user.  
[00:03:27] And hopefully this list will recommend some good options, but it's also okay if it includes some  
[00:03:34] options that the user won't like at all. The goal of the retrieval step is to ensure broad  
[00:03:40] coverage, to have enough movies to at least have many good ones in there. Finally, we would then  
[00:03:48] take all the items we retrieve during the retrieval step and combine them into a list,  
[00:03:53] removing duplicates and removing items that the user has already watched or that the user has  
[00:03:58] already purchased and that you may not want to recommend to them again. The second step of this  
[00:04:04] is then the ranking step. During the ranking step, you would take the list retrieved during the  
[00:04:10] retrieval step. So this may be just hundreds of possible movies and rank them using the learned  
[00:04:17] model. And what that means is you will feed the user feature vector and the movie feature vector  
[00:04:25] into this neural network, and for each of the user movie pairs compute the predicted rating.  
[00:04:33] And based on this, you now have all of the, say, hundred plus movies, the ones that the user is  
[00:04:40] most likely to give a high rating to. And then you can just display the rank list of items to  
[00:04:46] the user depending on what you think the user will give the highest rating to. One additional  
[00:04:51] optimization is that if you have computed VM for all the movies in advance, then all you need to do  
[00:04:59] is to do inference on this part of the neural network a single time to compute a VU and then  
[00:05:06] take that VU that you just computed for the user on your website right now and take the inner product  
[00:05:12] between VU and VM for the movies that you have retrieved during the retrieval step. So this  
[00:05:19] computation can be done relatively quickly if the retrieval step just brings up, say, hundreds of  
[00:05:25] movies. One of the decisions you need to make for this algorithm is how many items do you want to  
[00:05:31] retrieve during the retrieval step to feed into the more accurate ranking step. During the retrieval  
[00:05:39] step, retrieving more items will tend to result in better performance, but the algorithm will end  
[00:05:47] up being slower. To analyze or to optimize the trade-off between how many items to retrieve,  
[00:05:54] do you retrieve a hundred or five hundred or a thousand items, I would recommend carrying out  
[00:06:00] offline experiments to see how much retrieving additional items results in more relevant  
[00:06:05] recommendations. And in particular, if the estimated probability that yij is equal to one,  
[00:06:13] according to your neural network model, or if the estimated rating of y being high of the retrieved  
[00:06:20] items, according to your model's prediction, ends up being much higher. If only you were to retrieve,  
[00:06:28] say, 500 items instead of only 100 items, then that would argue for maybe retrieving more items,  
[00:06:36] even if it slows down the algorithm a bit. But with the separate retrieval step and the ranking step,  
[00:06:43] this allows many recommended systems today to give both fast as well as accurate results,  
[00:06:49] because the retrieval step tries to prune out a lot of items that are just not worth  
[00:06:56] doing the more detailed inference and inner product on, and then the ranking step makes  
[00:07:01] a more careful prediction for what are the items that the user is actually likely to enjoy. So  
[00:07:08] that's it. This is how you would make your recommended system work efficiently, even on  
[00:07:13] very large catalogs of movies or products or what have you. Now, it turns out that as commercially  
[00:07:22] important as our recommended systems, there are some significant ethical issues associated with  
[00:07:28] them as well. And unfortunately, there have been recommended systems that have created harm. So as  
[00:07:35] you build your own recommended system, I hope you take an ethical approach and use it to serve your  
[00:07:41] users and society at large, as well as yourself and the company that you might be working for.  
[00:07:47] Let's take a look at the ethical issues associated with recommended systems in the next video.
