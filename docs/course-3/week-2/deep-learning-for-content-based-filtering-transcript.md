# Deep Learning for Content-Based Filtering — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](deep-learning-for-content-based-filtering.md)

---

[00:00:01] A good way to develop a content-based filtering algorithm is to use deep learning.  
[00:00:06] The approach you see in this video is the way that many important commercial city-of-the-art content-based filtering algorithms are built today.  
[00:00:15] Let's take a look.  
[00:00:16] Recall that in our approach, given a feature vector describing a user, such as age, gender, country, and so on, we have to compute a vector vu.  
[00:00:31] And similarly, given a vector describing a movie, such as its year of release, the stars in the movie, and so on, we have to compute a vector vm.  
[00:00:42] In order to do the former, we're going to use a neural network.  
[00:00:47] And the first neural network will be what we'll call the user network.  
[00:00:53] Here's an example of a user network.  
[00:00:56] It takes as input the list of features of the user, xu, so the age, the gender, the country of the user, and so on.  
[00:01:06] And then using a few layers, say dense neural network layers, it will output this vector vu that describes the user.  
[00:01:17] Notice that in this neural network, the output layer has 32 units, and so vu is actually a list of 32 numbers.  
[00:01:29] Unlike most of the neural networks that we're using earlier, the final layer is not a layer with one unit.  
[00:01:36] It's a layer with 32 units.  
[00:01:39] Similarly, to compute vm for a movie, we can have a movie network as follows.  
[00:01:48] That takes as input features of the movie, and through a few layers of a neural network, ends up outputting vm, that vector that describes the movie.  
[00:02:00] Finally, we'll predict the rating of this user on that movie as vu dot product with vm.  
[00:02:11] Notice that the user network and the movie network can hypothetically have different numbers of hidden layers and different numbers of units per hidden layer.  
[00:02:20] Only the output layer needs to have the same size or the same dimension.  
[00:02:25] In the description you've seen so far, we were predicting the 1 to 5 or 0 to 5 star movie rating.  
[00:02:33] If you had binary labels, if y was to the user like or favorite an item, then you can also modify this algorithm to output instead of vu dot vm,  
[00:02:46] you can apply the sigmoid function to that and use this to predict the probability that yij is 1.  
[00:02:57] To flesh out this notation, we can also add superscripts i and j here, if we want to emphasize that this is the prediction by user j on movie i.  
[00:03:08] I've drawn here the user network and the movie network as two separate neural networks,  
[00:03:13] but it turns out that we can actually draw them together in a single diagram, as if it was a single neural network.  
[00:03:21] This is what it looks like.  
[00:03:23] On the upper portion of this diagram, we have the user network which inputs xu and ends up computing vu.  
[00:03:32] On the lower portion of this diagram, we have what was the movie network that inputs xm and ends up computing vm.  
[00:03:40] These two vectors are then dot producted together.  
[00:03:45] This dot here represents dot product and this gives us our prediction.  
[00:03:52] Now, this model has a lot of parameters.  
[00:03:56] Each of these layers of a neural network has a usual set of parameters of the neural network.  
[00:04:01] So, how do you train all the parameters of both the user network and the movie network?  
[00:04:09] What we're going to do is construct a cost function, j, which is going to be very similar to the cost function that you saw in collaborative filtering,  
[00:04:18] which is, assuming that you do have some data of some users having rated some movies,  
[00:04:24] we're going to sum over all pairs i and j of where you have labels, where iij equals 1,  
[00:04:32] of the difference between the predictions.  
[00:04:36] That would be vuj dot product with vmi minus yij squared.  
[00:04:47] The way we would train this model is, depending on the parameters of the neural network,  
[00:04:53] you end up with different vectors here for the users and for the movies.  
[00:04:59] What we'd like to do is train the parameters of the neural network so that you end up with vectors for the users and for the movies  
[00:05:07] that results in small squared error in the predictions you get out here.  
[00:05:13] To be clear, there's no separate training procedure for the user and the movie networks.  
[00:05:20] This expression down here, this is the cost function used to train all the parameters of the user and the movie networks.  
[00:05:29] We're going to judge the two networks according to how well vu and vm predict yij.  
[00:05:36] With this cost function, we're going to use gradient descent or some other optimization algorithm  
[00:05:42] to tune the parameters of the neural network to cause the cost function j to be as small as possible.  
[00:05:48] If you want to regularize this model, we can also add the usual neural network regularization term  
[00:05:56] to encourage the neural networks to keep the values of their parameters small.  
[00:06:01] It turns out after you've trained this model, you can also use this to find similar items.  
[00:06:07] This is akin to what we have seen with collateral filtering features helping you find similar items as well.  
[00:06:14] Let's take a look.  
[00:06:16] vuj is a vector of length 32 that describes a user j that has features xuj.  
[00:06:25] Similarly, vim is a vector of length 32 that describes a movie with these features over here.  
[00:06:34] Given a specific movie, what if you want to find other movies similar to it?  
[00:06:42] Well, this vector vim describes the movie i.  
[00:06:48] If you want to find other movies similar to it, you can then look for other movies k  
[00:06:55] so that the distance between the vector describing movie k and the vector describing movie i,  
[00:07:02] that distance, the square distance, is small.  
[00:07:06] This expression plays a role similar to what we had previously with collaborative filtering  
[00:07:13] where we talked about finding a movie with features xk that was similar to the features xi.  
[00:07:21] Thus, with this approach, you can also find items similar to a given item.  
[00:07:27] One final note, this can be pre-computed ahead of time.  
[00:07:31] By that, I mean you can run a compute server overnight to go through the list of all your movies  
[00:07:39] and for every movie, find the similar movies to it so that tomorrow,  
[00:07:44] if a user comes to the website and they're browsing a specific movie,  
[00:07:48] you can already have pre-computed the 10 or 20 most similar movies to show to the user at that time.  
[00:07:54] The fact that you can pre-compute ahead of time what's similar to a given movie will turn out to be important later  
[00:08:01] when we talk about scaling up this approach to a very large catalog of movies.  
[00:08:07] So that's how you can use deep learning to build a content-based filtering algorithm.  
[00:08:13] You might remember when we were talking about decision trees  
[00:08:17] and the pros and cons of decision trees versus neural networks.  
[00:08:21] I mentioned that one of the benefits of neural networks is that it's easier to take multiple neural networks  
[00:08:27] and put them together to make them work in concert to build a larger system.  
[00:08:32] What you just saw was actually an example of that,  
[00:08:35] where we could take a user network and a movie network and put them together  
[00:08:40] and then take the inner product of the output.  
[00:08:43] This ability to put two neural networks together is how we've managed to come up  
[00:08:49] with a more complex architecture that turns out to be quite powerful.  
[00:08:54] One note, if you're implementing these algorithms in practice,  
[00:08:57] I find that developers often end up spending a lot of time carefully designing the features needed  
[00:09:03] to feed into these content-based filtering algorithms.  
[00:09:06] So if you end up building one of these systems commercially,  
[00:09:09] it may be worth spending some time engineering good features for this application as well.  
[00:09:16] In terms of these applications, one limitation of the algorithm, as we've described it,  
[00:09:21] is it can be computational, very expensive to run  
[00:09:24] if you have a large catalog of a lot of different movies you may want to recommend.  
[00:09:29] So in the next video, let's take a look at some of the practical issues  
[00:09:33] and how you can modify this algorithm to make a scale to working on even very large item catalogs.  
[00:09:40] Let's go see that in the next video.
