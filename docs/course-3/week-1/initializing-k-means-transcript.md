# Initializing K-means — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](initializing-k-means.md)

---

[00:00:01] The very first step of the k-means clustering algorithm was to choose random locations as the initial guesses for the cluster centroids mu1 through mu k.  
[00:00:12] But how do you actually take that random guess?  
[00:00:15] Let's take a look at that in this video, as well as how you can take multiple attempts at the initial guesses for mu1 through mu k that will result in you finding a better set of clusters.  
[00:00:27] Let's take a look.  
[00:00:28] Here again is the k-means algorithm, and in this video, let's take a look at how you can implement this first step.  
[00:00:38] When running k-means, you should pretty much always choose the number of cluster centroids k to be less than the training examples m.  
[00:00:47] It doesn't really make sense to have k greater than m, because then there won't even be enough training examples to have at least one training example per cluster centroid.  
[00:00:58] So in our earlier example, we had k equals 2 and m equals 30.  
[00:01:04] In order to choose the cluster centroids, the most common way is to randomly pick k training examples.  
[00:01:17] Here is a training set where if I were to randomly pick two training examples, maybe I end up picking this one and this one, and then we would set mu1 through mu k equal to these k training examples.  
[00:01:35] So I might initialize my red cluster centroid here and initialize my blue cluster centroid over here in the example where k was equal to 2.  
[00:01:49] It turns out that if this was your random initialization and you were to run k-means, you probably end up with k-means deciding that these are the two clusters in the data set.  
[00:02:02] Note that this method of initializing the cluster centroids is a little bit different than what I had used in the illustration in the earlier videos,  
[00:02:10] where I was initializing the cluster centroids mu1 and mu2 to be just random points rather than sitting on top of specific training examples.  
[00:02:19] I've done that to make the illustrations clearer in the earlier videos, but what I'm showing in this slide is actually the much more commonly used way of initializing the cluster centroids.  
[00:02:31] Now, with this method, there is a chance that you will end up with an initialization of the cluster centroids where the red crosses here and maybe the blue crosses here.  
[00:02:45] Depending on how you choose the random initial cluster centroids, k-means will end up picking a different set of clusters for your data set.  
[00:02:56] Let's look at a slightly more complex example where we're going to look at this data set and try to find three clusters, so k equals 3 in this data.  
[00:03:07] If you were to run k-means with one random initialization of the cluster centroids, you may get this result up here.  
[00:03:18] This looks like a pretty good choice, pretty good clustering of the data into three different clusters.  
[00:03:24] But with a different initialization, say you had happened to initialize two of the cluster centroids within this group of points and one within this group of points,  
[00:03:35] after running k-means, you might end up with this clustering, which doesn't look as good.  
[00:03:42] This turns out to be a local optima in which k-means is trying to minimize the distortion cost function, that cost function J of C1 through Cm and mu1 through muk that you saw in the last video.  
[00:03:58] But with this less fortunate choice of random initialization, it had just happened to get stuck in a local minima.  
[00:04:09] Here's another example of a local minima where a different random initialization caused k-means to find this clustering of the data into three clusters, which again doesn't seem as good as the one that you saw up here on top.  
[00:04:26] If you want to give k-means multiple shots at finding the best local optima, if you want to try multiple random initializations to give it a better chance of finding this good clustering up on top,  
[00:04:42] one other thing you could do with the k-means algorithm is to run it multiple times and then to try to find the best local optima.  
[00:04:52] It turns out that if you were to run k-means three times and end up with these three distinct clusterings, then one way to choose between these three solutions is to compute the cost function J for all three of these solutions,  
[00:05:10] all three of these choices of clusters found by k-means, and then to pick one of these three according to which one of them gives you the lowest value for the cost function J.  
[00:05:23] And in fact, if you look at this grouping of clusters up here, this green cross has relatively small square distances to all the green dots.  
[00:05:33] The red cross has a relatively small distance to the red dots.  
[00:05:36] And similarly, the blue cross, and so the cost function J would be relatively small for this example on top.  
[00:05:45] But here, the blue cross has larger distances to all of the blue dots.  
[00:05:51] And here, the red cross has larger distances to all of the red dots, which is why the cost function J for these examples down below would be larger,  
[00:06:03] which is why if you pick from these three options, the one with the smallest distortion, the smallest cost function J, you end up selecting this choice of the three cluster centroids.  
[00:06:15] So let me write this out more formally into an algorithm in which you would run k-means multiple times using different random initializations.  
[00:06:26] Here's the algorithm.  
[00:06:28] If you want to use 100 random initializations for k-means, then you would run 100 times randomly initialized k-means using the method that you saw earlier in this video.  
[00:06:44] Pick k training examples and let the cluster centroids initially be the locations of those k training examples.  
[00:06:53] Using that random initialization, run the k-means algorithm to convergence, and that will give you a choice of cluster assignments and cluster centroids.  
[00:07:05] And then finally, you would compute the distortion, compute the cost function as follows.  
[00:07:11] After doing this, say, 100 times, you would finally pick the set of clusters that gave the lowest cost.  
[00:07:21] And it turns out that if you do this, it will often give you a much better set of clusters with a much lower distortion function than if you were to run k-means only a single time.  
[00:07:34] I plugged in the number up here as 100.  
[00:07:38] When I'm using this method, doing this somewhere between, say, 50 to 1,000 times would be pretty common, where if you run this procedure a lot more than 1,000 times, it tends to get computationally expensive and you tend to have diminishing returns when you run it a lot of times.  
[00:07:58] Whereas trying at least maybe 50 or 100 random initializations will often give you a much better result than if you only had one shot at picking a good random initialization.  
[00:08:10] But with this technique, you are much more likely to end up with this good choice of clusters on top than these less superior local minima down at the bottom.  
[00:08:20] So that's it. When I'm using the k-means algorithm myself, I will almost always use more than one random initialization because it just causes k-means to do a much better job minimizing the distortion cost function and finding a much better choice for the cluster centroids.  
[00:08:37] Before we wrap up our discussion of k-means, there's just one more video in which I hope to discuss with you the question of how do you choose the number of cluster centroids? How do you choose the value of k? Let's go on to the next video to take a look at that.
