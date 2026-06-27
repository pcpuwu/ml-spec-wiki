# Optimization Objective — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](optimization-objective.md)

---

[00:00:01] In the earlier clauses, clauses 1 and 2 of the specialization,  
[00:00:06] you saw a lot of supervised learning algorithms as a technique training set posing a cost function  
[00:00:13] and then using gradient descent or some other algorithm to optimize that cost function.  
[00:00:18] It turns out that the Q-means algorithm that you saw in the last video is also optimizing a specific cost function,  
[00:00:26] although the optimization algorithm that it uses to optimize that is not gradient descent,  
[00:00:31] it's actually the algorithm that you already saw in the last video.  
[00:00:35] Let's take a look at what all this means.  
[00:00:38] Let's take a look at what is the cost function for k-means.  
[00:00:42] To get started, as a reminder, this is the notation we've been using,  
[00:00:47] where c i is the index of the cluster, so c i is some number from 1 through k,  
[00:00:55] of the index of the cluster to which training example x i is currently assigned,  
[00:01:02] and mu k is the location of cluster centroid k.  
[00:01:06] Let me introduce one more piece of notation, which is when lowercase k equals c i,  
[00:01:15] so mu subscript c i is the cluster centroid of the cluster to which example x i has been assigned.  
[00:01:24] For example, if I were to look at some training example, say training example 10,  
[00:01:31] and I were to ask, what's the location of the cluster centroid to which the 10th training example has been assigned?  
[00:01:39] Well, I would then look up c 10.  
[00:01:42] This would give me a number from 1 to k that tells me,  
[00:01:45] was example 10 assigned to the red or the blue or some other cluster centroid?  
[00:01:51] And then mu subscript c 10 is the location of the cluster centroid to which x 10 has been assigned.  
[00:02:01] So, armed with this notation, let me now write out the cost function that k-means turns out to be minimizing.  
[00:02:11] The cost function J, which is a function of c 1 through c m,  
[00:02:19] these are all the assignments of points to cluster centroids, as well as mu 1 through mu K.  
[00:02:27] These are the locations of all the cluster centroids, as defined as this expression on the right.  
[00:02:35] It is the average, so 1 over m, of sum from i equals 1 to m,  
[00:02:41] of the squared distance between every training example x i, as i goes from 1 through m,  
[00:02:49] it is the squared distance between x i and mu subscript c i, so this quantity up here.  
[00:02:58] In other words, the cost function for k-means is the average squared distance between every training example x i  
[00:03:06] and the location of the cluster centroid to which the training example x i has been assigned.  
[00:03:13] For this example up here, we would be measuring the distance between x 10 and mu subscript c 10,  
[00:03:21] the cluster centroid to which x 10 has been assigned, and taking the square of that distance.  
[00:03:26] That would be one of the terms over here that we're averaging over.  
[00:03:30] It turns out that what the k-means algorithm is doing is trying to find assignments of points to cluster centroids,  
[00:03:39] as well as find locations of cluster centroids that minimizes the squared distance.  
[00:03:45] Visually, here's what you saw partway into the run of k-means in an earlier video.  
[00:03:53] At this step, the cost function, if you were to compute it, would be to look at every one of the blue points  
[00:03:59] and measure these distances and compute the square.  
[00:04:03] Then also similarly, look at every one of the red points and compute these distances and compute the square.  
[00:04:11] Then the average of the squares of all of these differences for the red and the blue points  
[00:04:17] is the value of the cost function j at this particular configuration of the parameters for k-means.  
[00:04:30] What it will do on every step is try to update the cluster assignments c 1 through c 30 in this example,  
[00:04:37] or update the positions of the cluster centroids mu 1 and mu 2 in order to keep on reducing this cost function j.  
[00:04:45] By the way, this cost function j also has a name in the literature.  
[00:04:50] It's called the distortion function.  
[00:04:54] I don't know that this is a great name,  
[00:04:56] but if you hear someone talk about the k-means algorithm and the distortion or the distortion cost function,  
[00:05:02] that's just what this formula j is computing.  
[00:05:06] Let's now take a deeper look at the algorithm and why the algorithm is trying to minimize this cost function j,  
[00:05:13] or why it's trying to minimize the distortion.  
[00:05:16] Here on top, I've copied over the cost function from the previous slide.  
[00:05:21] It turns out that the first part of k-means, where you assign points to cluster centroids,  
[00:05:27] that turns out to be trying to update c 1 through c m to try to minimize the cost function j as much as possible,  
[00:05:37] while holding mu 1 through mu k fixed.  
[00:05:40] And the second step, in contrast, where you move the cluster centroid,  
[00:05:45] it turns out that that is trying to leave c 1 through c m fixed,  
[00:05:50] but to update mu 1 through mu k to try to minimize the cost function or the distortion as much as possible.  
[00:05:58] Let's take a look at why this is the case.  
[00:06:00] During the first step, if you want to choose the values of c 1 through c m,  
[00:06:06] or save a particular value of c i to try to minimize this,  
[00:06:11] well, what would make x i minus mu c i as small as possible?  
[00:06:20] This is the distance, or the square distance, between a training example x i  
[00:06:26] and the location of the cluster centroid to which it's been assigned.  
[00:06:31] So if you want to minimize this distance, or this square distance,  
[00:06:35] what you should do is assign x i to the closest cluster centroid.  
[00:06:42] So to take a simplified example, if you have two cluster centroids,  
[00:06:47] say cluster centroids 1 and 2, and just a single training example x i,  
[00:06:53] if you were to assign it to cluster centroid 1,  
[00:06:57] this square distance here would be this large distance, well, squared.  
[00:07:04] And if you were to assign it to cluster centroid 2,  
[00:07:08] then this square distance would be the square of this much smaller distance.  
[00:07:12] So if you want to minimize this term, you would take x i and assign it to the closer cluster centroid,  
[00:07:18] which is exactly what the algorithm is doing up here.  
[00:07:22] So that's why the step where you assign points to cluster centroids is choosing the values for c i  
[00:07:28] to try to minimize j, without changing mu 1 through mu k for now,  
[00:07:33] but just choosing the values of c 1 through c m to try to make these terms as small as possible.  
[00:07:40] How about the second step of the k-means algorithm?  
[00:07:43] That is to move the cluster centroids.  
[00:07:46] It turns out that choosing mu k to be average of the mean of the points assigned  
[00:07:52] is the choice of these terms mu that will minimize this expression.  
[00:08:00] To take a simplified example, say you have a cluster with just two points assigned to it, shown as follows.  
[00:08:10] With the cluster centroid here, the average of the squared distances would be the distance of 1 here, squared,  
[00:08:19] plus this distance here, which is 9, squared, and you take the average of these two numbers.  
[00:08:26] And so that turns out to be 1 half of 1 plus 81, which turns out to be 41.  
[00:08:35] But if you were to take the average of these two points, so 1 plus 11 over 2, that's equal to 6,  
[00:08:43] and if you were to move the cluster centroid over here to the middle,  
[00:08:48] then the average of these two squared distances turns out to be a distance of 5 and 5 here,  
[00:08:57] so you end up with 1 half of 5 squared plus 5 squared, which is equal to 25.  
[00:09:04] And this is a much smaller average squared distance than 41.  
[00:09:08] And in fact, you can play around with the location of this cluster centroid  
[00:09:13] and maybe convince yourself that taking this mean location, this average location,  
[00:09:18] in the middle of these two training examples, that is really the value that minimizes the squared distance.  
[00:09:25] So the fact that the k-means algorithm is optimizing a cost function J  
[00:09:30] means that it is guaranteed to converge.  
[00:09:33] That is, on every single iteration, the distortion cost function should go down or stay the same.  
[00:09:40] But if it ever fails to go down or stay the same in the worst case,  
[00:09:44] if it ever goes up, that means there's a bug in the code.  
[00:09:47] It should never go up because every single step of k-means is setting the values C i and mu k  
[00:09:55] to try to reduce the cost function.  
[00:09:58] Also, if the cost function ever stops going down, that also gives you one way to test if k-means has converged.  
[00:10:06] Once there's a single iteration where it stays the same, that usually means k-means has converged  
[00:10:12] and you should just stop running the algorithm even further.  
[00:10:16] Or in some rare cases, you will run k-means for a long time  
[00:10:20] and the cost function or the distortion is just going down very, very slowly.  
[00:10:24] And that's a bit like gradient descent, where maybe running it even longer might help a bit.  
[00:10:29] But if the rate at which the cost function is going down has become very, very slow,  
[00:10:34] you might also just say, this is good enough.  
[00:10:36] I'm just going to say it's close enough to convergence  
[00:10:39] and not spend even more compute cycles running the algorithm for even longer.  
[00:10:44] So these are some of the ways that computing the cost function is helpful.  
[00:10:49] It helps you figure out if the algorithm has converged.  
[00:10:52] It turns out that there's one other very useful way to take advantage of the cost function,  
[00:10:59] which is to use multiple different random initializations of the cluster centroids.  
[00:11:05] It turns out if you do this, you can often find much better clusters using k-means.  
[00:11:10] Let's take a look at the next video of how to do that.
