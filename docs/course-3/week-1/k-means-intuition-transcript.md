# K-means Intuition — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](k-means-intuition.md)

---

[00:00:01] Let's take a look at what the k-means clustering algorithm does.  
[00:00:05] Let me start with an example.  
[00:00:08] Here I've plotted a dataset with 30 unlabeled training examples.  
[00:00:13] So there are 30 points,  
[00:00:15] and what we'd like to do is run k-means on this dataset.  
[00:00:19] The first thing that the k-means algorithm does is it will take  
[00:00:23] a random guess at where might be the centers  
[00:00:27] of the two clusters that you might ask it to find.  
[00:00:31] In this example, I'm going to ask it to try to find two clusters.  
[00:00:36] Later in this week,  
[00:00:37] we'll talk about how you might decide how many clusters to find.  
[00:00:41] But the very first step is it will randomly pick two points,  
[00:00:45] which I've shown here as a red cross and a blue cross,  
[00:00:51] at where might be the centers of two different clusters.  
[00:00:56] This is just a random initial guess and they're not  
[00:00:58] particularly good guesses, but it's a start.  
[00:01:02] One thing I hope you take away from this video is that  
[00:01:05] k-means will repeatedly do two different things.  
[00:01:09] The first is assign points to cluster centroids,  
[00:01:13] and the second is move cluster centroids.  
[00:01:16] Let's take a look at what this means.  
[00:01:17] The first of the two steps is it will go through each of  
[00:01:21] these points and look at whether it is closer to  
[00:01:26] the red cross or to the blue cross.  
[00:01:31] The very first thing that k-means does is it will take  
[00:01:34] a random guess at where are the centers of the cluster.  
[00:01:39] The centers of the cluster are called cluster centroids.  
[00:01:45] After it's made an initial guess at where the cluster centroids,  
[00:01:49] it will go through all of these examples,  
[00:01:51] x1 through x30, my 30 data points.  
[00:01:57] For each of them, it will check if it is  
[00:01:59] closer to the red cluster centroid shown by the red cross,  
[00:02:03] or if it's closer to  
[00:02:04] the blue cluster centroid shown by the blue cross.  
[00:02:08] It will assign each of these points to  
[00:02:11] whichever of the cluster centroids it is closer to.  
[00:02:14] I'm going to illustrate that by  
[00:02:17] painting each of these examples,  
[00:02:19] each of these little round dots,  
[00:02:21] either red or blue,  
[00:02:23] depending on whether that example is  
[00:02:26] closer to the red or to the blue cluster centroid.  
[00:02:30] This point up here is closer to the red centroid,  
[00:02:33] which is why it's painted red,  
[00:02:34] whereas this point down there is  
[00:02:36] closer to the blue cluster centroid,  
[00:02:38] which is why I've now painted it blue.  
[00:02:41] That was the first of the two things  
[00:02:45] that k-means does over and over,  
[00:02:47] which is assign points to cluster centroids.  
[00:02:50] All that means is it will associate,  
[00:02:53] which I'm illustrating with the color,  
[00:02:55] every point of one of the cluster centroids.  
[00:02:58] The second of the two steps that k-means does is,  
[00:03:02] it will look at all of the red points and take an average of  
[00:03:07] them and it will move the red cross to whatever is  
[00:03:12] the average location of the red dots,  
[00:03:16] which turns out to be here.  
[00:03:18] So the red cross,  
[00:03:20] that is the red cluster centroid will move here.  
[00:03:23] Then we do the same thing for all the blue dots.  
[00:03:25] Look at all the blue dots and take an average of  
[00:03:28] them and move the blue cross over there,  
[00:03:32] so you now have a new location  
[00:03:34] for the blue cluster centroid as well.  
[00:03:37] In the next video, we'll look at  
[00:03:39] the mathematical formulas for how to do both of these steps.  
[00:03:43] But now that you have these new and hopefully slightly improved  
[00:03:47] guesses for the locations of the two cluster centroids,  
[00:03:51] we'll look through all of the 30 training examples  
[00:03:54] again and check for every one of them,  
[00:03:57] whether it's closer to the red or  
[00:03:59] the blue cluster centroid for the new locations.  
[00:04:02] Then we will associate them,  
[00:04:05] which I indicate by the color again,  
[00:04:07] every point to the closer cluster centroid.  
[00:04:11] If you do that, you see that a few of the points change color.  
[00:04:15] So for example, this point is colored red because it  
[00:04:19] was closer to the red cluster centroid previously.  
[00:04:22] But if we now look again,  
[00:04:24] it's now actually closer to the blue cluster centroid  
[00:04:26] because the blue and red cluster centroids have moved.  
[00:04:30] So if we go through and associate  
[00:04:33] each point with the closer cluster centroid,  
[00:04:36] you end up with this.  
[00:04:38] Then we just repeat the second part of k-means again,  
[00:04:42] which is look at all of the red dots and compute the average,  
[00:04:48] and also look at all of the blue dots and  
[00:04:51] compute the average location of all of the blue dots.  
[00:04:55] It turns out that you end up moving  
[00:04:58] the red cross over there and the blue cross over here.  
[00:05:02] We repeat. Let's look at all of the points again and  
[00:05:05] recolor them either red or blue  
[00:05:07] depending on which cluster centroid it is closer to.  
[00:05:11] So you end up with this.  
[00:05:13] Then again, look at all of the red dots and take  
[00:05:16] the average location and look at all the blue dots and take  
[00:05:18] the average location and move the clusters to the new locations.  
[00:05:24] It turns out that if you were to keep on repeating these two steps,  
[00:05:28] that is, look at each point and  
[00:05:30] assign it to the nearest cluster centroid,  
[00:05:33] and then also move each cluster centroid to  
[00:05:35] the mean of all the points with the same color.  
[00:05:39] If you keep on doing those two steps,  
[00:05:41] you find that there are no more changes to  
[00:05:44] the colors of the points or to the locations of the cluster centroids.  
[00:05:48] So this means that at this point,  
[00:05:51] the k-means clustering algorithm has converged because applying  
[00:05:54] those two steps over and over results in no further changes  
[00:05:59] to either the assignment of points to  
[00:06:01] the cluster centroids or to the location of the cluster centroids.  
[00:06:05] In this example, it looks like k-means has done a pretty good job.  
[00:06:09] It has found that these points up here correspond to  
[00:06:13] one cluster and these points down here correspond to a second cluster.  
[00:06:19] So now you've seen an illustration of how k-means works.  
[00:06:24] The two key steps are,  
[00:06:25] assign every point to the cluster centroid depending on  
[00:06:28] what cluster centroid is nearest to,  
[00:06:31] and second, move each cluster centroid to  
[00:06:35] the average or the mean of all the points that were assigned to it.  
[00:06:39] In the next video,  
[00:06:40] we'll look at how to formalize this and write  
[00:06:43] out the algorithm that does what you just saw in this video.  
[00:06:46] Let's go on to the next video.
