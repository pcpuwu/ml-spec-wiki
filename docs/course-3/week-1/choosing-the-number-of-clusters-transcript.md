# Choosing the Number of Clusters — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](choosing-the-number-of-clusters.md)

---

[00:00:02] The k-means algorithm requires as one of its inputs, k, the number of clusters you want  
[00:00:07] it to find.  
[00:00:08] But how do you decide how many clusters to use?  
[00:00:11] Do you want 2 clusters, or 3 clusters, or 5 clusters, or 10 clusters?  
[00:00:15] Let's take a look.  
[00:00:17] For a lot of clustering problems, the right value of k is truly ambiguous.  
[00:00:24] If I were to show different people the same dataset and ask, how many clusters do you  
[00:00:29] see?  
[00:00:30] There will definitely be people that will say, it looks like there are 2 distinct clusters,  
[00:00:37] and they would be right.  
[00:00:39] And there would also be others that will see actually 4 distinct clusters, and they would  
[00:00:48] also be right.  
[00:00:50] Because clustering is an unsupervised learning algorithm, you're not given the quote right  
[00:00:56] answers in the form of specific labels to try to replicate.  
[00:01:01] And so there are a lot of applications where the data itself does not give a clear indicator  
[00:01:08] for how many clusters there are in it.  
[00:01:10] And I think it truly is ambiguous if this data has 2, or 4, or maybe 3 clusters.  
[00:01:18] If you take, say, the red one here and the 2 blue ones here, say.  
[00:01:23] If you look at the academic literature on k-means, there are a few techniques to try  
[00:01:28] to automatically choose the number of clusters to use for a certain application.  
[00:01:34] I'll briefly mention one here that you may see others refer to, although I have to say  
[00:01:40] I personally do not use this method myself.  
[00:01:45] But one way to try to choose the value of k is called the ELBO method.  
[00:01:52] And what that does is you would run k-means with a variety of values of k and plot the  
[00:02:00] cost function or the distortion function j as a function of the number of clusters.  
[00:02:06] What you find is that when you have very few clusters, say 1 cluster, the distortion function  
[00:02:12] of the cost function j will be high.  
[00:02:15] And as you increase the number of clusters, it will go down, maybe as follows.  
[00:02:22] And if the curve looks like this, you say, well, it looks like the cost function is decreasing  
[00:02:28] rapidly until we get to 3 clusters, but it decreases more slowly after that.  
[00:02:33] So let's choose k equals 3.  
[00:02:36] And this is called an ELBO, by the way, because think of it as analogous to that's your  
[00:02:42] hand and that's your elbow over here.  
[00:02:47] So plotting the cost function as a function of k, it could help you gain some insight.  
[00:02:53] I personally hardly ever use the ELBO method myself to choose the right number of clusters  
[00:03:00] because I think for a lot of applications, the right number of clusters is truly ambiguous.  
[00:03:06] And you find that a lot of cost functions look like this, where it just decreases smoothly  
[00:03:12] and it doesn't have a clear ELBO by which you could use to pick the value of k.  
[00:03:19] By the way, one technique that does not work is to choose k so as to minimize the cost  
[00:03:25] function j, because doing so will cause you to almost always just choose the largest possible  
[00:03:31] value of k, because having more clusters will pretty much always reduce the cost function j.  
[00:03:38] So choosing k to minimize the cost function j is not a good technique.  
[00:03:43] So how do you choose the value of k in practice?  
[00:03:48] Often you're running k-means in order to get clusters to use for some later or some downstream purpose.  
[00:03:55] That is, you're going to take the clusters and do something with those clusters.  
[00:04:00] So what I usually do and what I recommend you do is to evaluate k-means based on how  
[00:04:05] well it performs for that later downstream purpose.  
[00:04:11] Let me illustrate to the example of t-shirt sizing.  
[00:04:15] One thing you could do is run k-means on this dataset to find three clusters, in which case  
[00:04:22] you may find clusters like that.  
[00:04:25] And this would be how you size your small, medium, and large t-shirts.  
[00:04:29] But how many t-shirt sizes should there be?  
[00:04:32] Well, it's ambiguous.  
[00:04:34] If you were to also run k-means with five clusters, you might get clusters that look  
[00:04:42] like this, and this would let you size t-shirts according to extra small, small, medium, large,  
[00:04:49] and extra large.  
[00:04:51] And so both of these are completely valid and completely fine groupings of the data  
[00:04:56] into clusters.  
[00:04:58] But whether you want to use three clusters or five clusters can now be decided based  
[00:05:04] on what makes sense for your t-shirt business.  
[00:05:08] There's a trade-off between how well the t-shirts will fit, depending on whether you have three  
[00:05:13] sizes or five sizes, but there will be extra costs as well associated with manufacturing  
[00:05:20] and shipping five types of t-shirts instead of three different types of t-shirts.  
[00:05:25] So what I would do in this case is to run k-means with k equals three and k equals five,  
[00:05:31] and then look at these two solutions to see, based on the trade-off between fit of t-shirts,  
[00:05:39] where more sizes results in better fit, versus the extra costs of making more t-shirts, where  
[00:05:46] making fewer t-shirts is simpler and less expensive, to try to decide what makes sense  
[00:05:51] for the t-shirt business.  
[00:05:53] When you get to the programming exercise, you also see there an application of k-means  
[00:05:58] to image compression.  
[00:06:00] This is actually one of the most fun visual examples of k-means.  
[00:06:06] And there you see that there will be a trade-off between the quality of the compressed image,  
[00:06:10] that is, how good the image looks, versus how much you can compress the image to save  
[00:06:16] the space.  
[00:06:18] And in that programming exercise, you see that you can use that trade-off to maybe manually  
[00:06:24] decide what's the best value of k, based on how good you want the image to look, versus  
[00:06:30] how large you want the compressed image size to be.  
[00:06:34] So that's it for the k-means clustering algorithm.  
[00:06:38] Congrats on learning your first unsupervised learning algorithm.  
[00:06:42] You now know not just how to do supervised learning, but also unsupervised learning.  
[00:06:47] And I hope you also have fun with the practice lab.  
[00:06:50] It's actually one of the most fun exercises I know of for k-means.  
[00:06:55] And with that, we're ready to move on to our second unsupervised learning algorithm, which  
[00:07:01] is anomaly detection.  
[00:07:03] How do you look at a dataset and find unusual or anomalous things in it?  
[00:07:08] This turns out to be another one of the most commercially important applications of unsupervised  
[00:07:14] learning.  
[00:07:15] I've used this myself many times in many different applications.  
[00:07:18] Let's go on to the next video to talk about anomaly detection.
