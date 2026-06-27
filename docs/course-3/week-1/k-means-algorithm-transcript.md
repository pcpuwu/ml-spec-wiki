# K-means Algorithm — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](k-means-algorithm.md)

---

[00:00:02] In the last video, you saw an illustration of the k-means algorithm running.  
[00:00:07] Now let's write out the k-means algorithm in detail so that you'd be able to implement  
[00:00:11] it for yourself.  
[00:00:12] Here's the k-means algorithm.  
[00:00:15] The first step is to randomly initialize k cluster centroids, mu1, mu2, through mu k.  
[00:00:24] In the example that we had, this corresponded to when we randomly chose a location for the  
[00:00:31] red cross and for the blue cross corresponding to the two cluster centroids.  
[00:00:39] In our example, k was equal to 2, so if the red cross was cluster centroid 1 and the blue  
[00:00:46] cross was cluster centroid 2, these are just two indices to denote the first and the second  
[00:00:53] cluster, then the red cross would be the location of mu1, and the blue cross would  
[00:01:01] be the location of mu2.  
[00:01:05] Just to be clear, mu1 and mu2 are vectors which have the same dimension as your training  
[00:01:12] examples x1 through, say, x30 in our example.  
[00:01:17] All of these are lists of two numbers, or they are two-dimensional vectors, or whatever  
[00:01:23] dimension the training data had.  
[00:01:26] So if we had n equals 2 features for each of the training examples, then mu1 and mu2  
[00:01:33] will also be two-dimensional vectors, meaning vectors with two numbers in them.  
[00:01:39] Having randomly initialized the k cluster centroids, k-means will then repeatedly carry  
[00:01:45] out the two steps that you saw in the last video.  
[00:01:49] The first step is to assign points to cluster centroids, meaning color each of the points  
[00:01:54] either red or blue, corresponding to assigning them to cluster centroids 1 or 2 when k is  
[00:02:04] equal to 2.  
[00:02:06] Rinse it out in math.  
[00:02:08] That means that we're going to, for i equals 1 through m, for all m training examples,  
[00:02:14] we're going to set c i to be equal to the index, which can be anything from 1 to k,  
[00:02:20] of the cluster centroid closest to the training example x i.  
[00:02:26] Mathematically, you can write this out as computing the distance between x i and mu  
[00:02:31] k, and in math, the distance between two points is often written like this.  
[00:02:38] It is also called the L2 norm, and what you want to find is the value of k that minimizes  
[00:02:46] this, because that corresponds to the cluster centroid mu k that is closest to the training  
[00:02:56] example x i, and then the value of k that minimizes this is what gets set to c i.  
[00:03:07] When you implement this algorithm, you find that it's actually a little bit more convenient  
[00:03:12] to minimize the squared distance, because the cluster centroid with the smallest squared  
[00:03:18] distance should be the same as the cluster centroid with the smallest distance, and when  
[00:03:26] you look at this week's optional labs and practice labs, you see how to implement this  
[00:03:31] in code for yourself.  
[00:03:34] As a concrete example, this point up here is closer to the red or to cluster centroid  
[00:03:40] 1, so if this was training example x 1, we will set c 1 to be equal to 1, whereas this  
[00:03:50] point over here, if this was the 12 training example, this is closer to the second cluster  
[00:03:55] centroid, the blue one, and so we will set this, the corresponding cluster assignment  
[00:04:01] variable to 2, because it's closer to cluster centroid 2.  
[00:04:06] So that's the first step of the k-means algorithm, assign points to cluster centroids.  
[00:04:12] The second step is to move the cluster centroids, and what that means is for lowercase k equals  
[00:04:21] 1 to capital K, the number of clusters, we're going to set the cluster centroid location  
[00:04:29] to be updated to be the average or the mean of the points assigned to that cluster K.  
[00:04:35] Concretely, what that means is we'll look at all of these red points, say, and look  
[00:04:40] at their position on the horizontal axis, look at the value of the first feature x 1,  
[00:04:46] and average that out, and compute the average value on the vertical axis as well, and after  
[00:04:52] computing those two averages, you find that the mean is here, which is why mu 1, that  
[00:05:00] is the location of the red cluster centroid, gets updated as follows.  
[00:05:06] Similarly, we will look at all of the points that were colored blue, that is, with C i  
[00:05:13] equals 2, and compute the average of the value on the horizontal axis, the average of their  
[00:05:20] feature x 1, compute the average of their feature x 2, and those two averages give you  
[00:05:27] the new location of the blue cluster centroid, which therefore moves over here.  
[00:05:33] Just to write those out in math, if the first cluster had assigned to it training examples  
[00:05:41] 1, 5, 6, and 10, just as an example, then what that means is you would compute the average  
[00:05:53] this way.  
[00:05:54] Notice that x 1, x 5, x 6, and x 10 are training examples, four training examples, so we divide  
[00:06:03] by 4, and this gives you the new location of mu 1, the new cluster centroid 4, cluster  
[00:06:11] 1.  
[00:06:12] To be clear, each of these x values are vectors with two numbers in them, or n numbers in  
[00:06:19] them if you have n features, and so mu will also have two numbers in it, or n numbers  
[00:06:26] in it if you have n features instead of 2.  
[00:06:29] Now there is one corner case to this algorithm, which is what happens if a cluster has zero  
[00:06:37] training examples assigned to it?  
[00:06:38] In that case, the second step, mu k, would be trying to compute the average of zero points,  
[00:06:45] and that's not well defined.  
[00:06:47] If that ever happens, the most common thing to do is to just eliminate that cluster so  
[00:06:52] you end up with k minus 1 clusters, or if you really, really need k clusters, an alternative  
[00:06:59] would be to just randomly reinitialize that cluster centroid and hope that it gets assigned  
[00:07:04] at least some points next time around, but it's actually more common when running k-means  
[00:07:09] to just eliminate a cluster if no points are assigned to it.  
[00:07:14] Even though I've mainly been describing k-means for clusters that are well separated, so clusters  
[00:07:19] that may look like this, where if you ask it to find three clusters, hopefully it will  
[00:07:26] find these three distinct clusters, it turns out that k-means is also frequently applied  
[00:07:32] to datasets where the clusters are not that well separated.  
[00:07:36] For example, if you are a designer and manufacturer of cool t-shirts, and you want to decide how  
[00:07:44] do I size my small, medium, and large t-shirts, how small should a small be, how large should  
[00:07:51] a large be, and what should a medium-sized t-shirt really be?  
[00:07:56] One thing you might do is collect data of people likely to buy your t-shirts based on  
[00:08:01] their heights and weights, and you find that the height and weight of people tend to vary  
[00:08:08] continuously on the spectrum without very clear clusters.  
[00:08:12] Nonetheless, if you were to run k-means with, say, three cluster centroids, you might find  
[00:08:20] that k-means would group these points into one cluster, these points into a second cluster,  
[00:08:26] and these points into a third cluster.  
[00:08:29] So if you're trying to decide exactly how to size your small, medium, and large t-shirts,  
[00:08:37] you might then choose the dimensions of your small t-shirt to try to make it fit these  
[00:08:43] individuals well, the medium-sized t-shirt to try to fit these individuals well, and  
[00:08:48] the large t-shirt to try to fit these individuals well, with potentially the cluster centroids  
[00:08:55] giving you a sense of what is the most representative height and weight that you want your three  
[00:09:00] t-shirt sizes to fit.  
[00:09:03] So this is an example of k-means working just fine and giving a useful result, even if the  
[00:09:10] data does not lie in well-separated groups or clusters.  
[00:09:15] So that was the k-means clustering algorithm.  
[00:09:18] Assign cluster centroids randomly, and then repeatedly assign points to cluster centroids  
[00:09:23] and move the cluster centroids.  
[00:09:25] But what is this algorithm really doing, and do we think this algorithm will converge or  
[00:09:30] might it just keep on running forever and never converge?  
[00:09:33] To gain deeper intuition about the k-means algorithm and also see why we might hope this  
[00:09:38] algorithm does converge, let's go on to the next video where you see that k-means is actually  
[00:09:44] trying to optimize a specific cost function.  
[00:09:47] Let's take a look at that in the next video.
