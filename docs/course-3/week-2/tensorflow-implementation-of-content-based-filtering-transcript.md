# TensorFlow Implementation of Content-Based Filtering — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](tensorflow-implementation-of-content-based-filtering.md)

---

[00:00:01] In the practice lab, you'll see how to implement content-based filtering in TensorFlow.  
[00:00:07] What I'd like to do in this video is just step through a few of the key concepts in the code that you get to play with.  
[00:00:14] Let's take a look.  
[00:00:15] Recall that our code has started with a user network, as well as a movie network.  
[00:00:22] And the way you can implement this in TensorFlow is very similar to how we have previously implemented a neural network with a set of dense layers.  
[00:00:34] We're going to use a sequential model.  
[00:00:36] We then, in this example, have two dense layers with the number of hidden units specified here.  
[00:00:41] And then the final layer has 32 units and outputs 32 numbers.  
[00:00:47] Then for the movie network, I'm going to call it the item network, because the movies are the items here.  
[00:00:53] This is what the code looks like.  
[00:00:55] Once again, we have a couple of dense hidden layers, followed by this layer, which outputs 32 numbers.  
[00:01:04] And for the hidden layers, we'll use our default choice of activation function, which is the ReLU activation function.  
[00:01:12] Next, we need to tell TensorFlow Keras how to feed the user features or the item features, that is, the movie features, to the two neural networks.  
[00:01:24] This is the syntax for doing so.  
[00:01:26] That extracts out the input features for the user and then feeds it to the user NN that we had to find up here to compute VU, the vector for the user.  
[00:01:39] And then one additional step that turns out to make this algorithm work a bit better is to add this line here, which normalizes the vector VU to have length 1.  
[00:01:49] So this normalizes the length, also called the L2 norm, but basically the length of the vector VU to be equal to 1.  
[00:01:57] And then we do the same thing for the item network, for the movie network.  
[00:02:02] This extracts out the item features and feeds it to the item neural network that we defined up there.  
[00:02:10] And this computes the movie vector VM.  
[00:02:15] And then finally, this step also normalizes that vector to have length 1.  
[00:02:21] After having computed VU and VM, we then have to take the dot product between these two vectors.  
[00:02:30] And this is the syntax for doing so.  
[00:02:32] Keras has a special layer type.  
[00:02:36] Notice we had here tf.keras.layers.dense.  
[00:02:40] Here, this is tf.keras.layers.dot.  
[00:02:43] It turns out that there's a special Keras layer that just takes a dot product between two numbers.  
[00:02:49] And so we're going to use that to take the dot product between the vectors VU and VM.  
[00:02:56] And this is the output of the neural network.  
[00:03:00] This gives the final prediction.  
[00:03:03] Finally, to tell Keras what are the inputs and outputs of the model,  
[00:03:08] This line tells it that the overall model is a model with inputs being the user features and the movie or the item features.  
[00:03:17] And the output is this output that we just defined up above.  
[00:03:21] And the cost function that we use to train this model is going to be the mean squared error cost function.  
[00:03:28] So these are the key code snippets for implementing content-based filtering as a neural network.  
[00:03:35] And you see the rest of the code in the practice lab, but hopefully you'll be able to play with that  
[00:03:43] and see how all these code snippets fit together into a working TensorFlow implementation of a content-based filtering algorithm.  
[00:03:51] It turns out that there's one other step that I didn't talk about previously.  
[00:03:54] But if you do this, which is normalize the length of the vector VU, that makes the algorithm work a bit better.  
[00:04:02] And so TensorFlow has this L2 normalized function that normalizes the vector.  
[00:04:09] It's also called normalizing the L2 norm of the vector, hence the name of the function.  
[00:04:14] And so that's it. Thanks for sticking with me through all this material on recommender systems.  
[00:04:20] It's an exciting technology, and I hope you enjoy playing with these ideas in code in the practice labs for this week.  
[00:04:27] And so that takes us to the last of these videos on recommender systems and to the end of the next to final week for this specialization.  
[00:04:37] I look forward to seeing you next week as well. We'll talk about the exciting technology of reinforcement learning.  
[00:04:43] Hope you have fun with the quizzes and with the practice labs, and I look forward to seeing you next week.
