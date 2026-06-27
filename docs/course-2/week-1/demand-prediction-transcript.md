# Demand Prediction — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](demand-prediction.md)

---

[00:00:01] To illustrate how neural networks work, let's start with an example.  
[00:00:05] We'll use an example from demand prediction,  
[00:00:08] in which you look at a product and try to predict,  
[00:00:10] will this product be a top seller or not?  
[00:00:13] Let's take a look.  
[00:00:14] In this example, you're selling T-shirts,  
[00:00:17] and you would like to know if a particular T-shirt will be a top seller,  
[00:00:22] you know, yes or no.  
[00:00:23] And you have collected data of different T-shirts that were sold at different prices,  
[00:00:28] as well as which ones became a top seller.  
[00:00:31] This type of application is used by retailers today  
[00:00:34] in order to plan better inventory levels, as well as marketing campaigns.  
[00:00:40] If you know what's likely to be a top seller,  
[00:00:42] you would plan, for example, to just purchase more of that stock in advance.  
[00:00:47] So in this example, the input feature X is the price of the T-shirt,  
[00:00:53] and so that's the input to the learning algorithm.  
[00:00:56] And if you apply logistic regression to fit a sigmoid function to the data  
[00:01:02] that might look like that, then the output of your prediction might look like this,  
[00:01:07] 1 over 1 plus e to the negative WX plus B.  
[00:01:11] Previously, we had written this as F of X as the output of the learning algorithm.  
[00:01:17] In order to set us up to build a neural network,  
[00:01:20] I'm going to switch the terminology a little bit  
[00:01:22] and use the alphabet A to denote the output of this logistic regression algorithm.  
[00:01:28] The term A stands for activation, and it's actually a term from neuroscience,  
[00:01:33] and it refers to how much a neuron is sending the high output  
[00:01:38] to other neurons downstream from it.  
[00:01:42] It turns out that this logistic regression unit,  
[00:01:45] or this little logistic regression algorithm,  
[00:01:48] can be thought of as a very simplified model of a single neuron in the brain,  
[00:01:54] where what the neuron does is it takes as input the price X,  
[00:02:00] and then it computes this formula on top,  
[00:02:03] and it outputs the number A, which is computed via this formula,  
[00:02:08] and it outputs the probability of this T-shirt being a top seller.  
[00:02:13] Another way to think of a neuron is as a tiny little computer  
[00:02:18] whose only job is to input one number or a few numbers, such as a price,  
[00:02:24] and then to output one number or maybe a few other numbers,  
[00:02:29] which in this case is the probability of the T-shirt being a top seller.  
[00:02:34] As I alluded in the previous video,  
[00:02:37] a logistic regression algorithm is much simpler  
[00:02:40] than what any biological neuron in your brain or mind does,  
[00:02:44] which is why the artificial neural network  
[00:02:46] is such a vastly oversimplified model of the human brain,  
[00:02:50] even though in practice, as you know, deep learning algorithms do work very well.  
[00:02:55] Given this description of a single neuron,  
[00:02:58] building a neural network now just requires taking a bunch of these neurons  
[00:03:03] and wiring them together or putting them together.  
[00:03:06] Let's now look at a more complex example of demand prediction.  
[00:03:10] In this example, we're going to have four features  
[00:03:13] to predict whether or not a T-shirt is a top seller.  
[00:03:17] The features are the price of the T-shirt, the shipping cost,  
[00:03:21] the amount of marketing of that particular T-shirt,  
[00:03:24] as well as the material quality.  
[00:03:26] Is this a high-quality thick cotton or is this maybe a lower-quality material?  
[00:03:32] Now, you might suspect that whether or not a T-shirt becomes a top seller  
[00:03:37] actually depends on a few factors.  
[00:03:40] First, what is the affordability of this T-shirt?  
[00:03:43] Second is, what's the degree of awareness of this T-shirt  
[00:03:47] that potential buyers have?  
[00:03:49] And third is perceived quality.  
[00:03:51] Do buyers or potential buyers think this is a high-quality T-shirt?  
[00:03:56] And so what I'm going to do is create one artificial neuron  
[00:04:01] to try to estimate the probability that this T-shirt is perceived as highly affordable.  
[00:04:07] And affordability is mainly a function of price and shipping cost  
[00:04:12] because the total amount you have to pay is the sum of the price plus the shipping cost.  
[00:04:15] And so we're going to use a little neuron here, a logistic regression unit,  
[00:04:19] to input price and shipping cost and predict, do people think this is affordable?  
[00:04:25] Second, I'm going to create another artificial neuron here  
[00:04:29] to estimate, is there high awareness of this?  
[00:04:32] And awareness in this case is mainly a function of the marketing of the T-shirt.  
[00:04:37] And finally, I'm going to create another neuron to estimate,  
[00:04:42] do people perceive this to be of high quality?  
[00:04:45] And that may mainly be a function of the price of the T-shirt and of the material quality.  
[00:04:51] Price is a factor here because fortunately or unfortunately,  
[00:04:56] if there's a very high-priced T-shirt, people will sometimes perceive that to be of high quality  
[00:05:02] because if it's very expensive, then maybe people think it's got to be of high quality.  
[00:05:07] Given these estimates of affordability, awareness, and perceived quality,  
[00:05:11] we then wire the outputs of these three neurons to another neuron here on the right  
[00:05:17] that then is another logistic regression unit that finally inputs those three numbers  
[00:05:23] and outputs the probability of this T-shirt being a top seller.  
[00:05:27] So in the terminology of neural networks, we're going to group these three neurons together  
[00:05:34] into what's called a layer.  
[00:05:37] And a layer is a grouping of neurons which take as input the same or similar features  
[00:05:43] and that in turn outputs a few numbers together.  
[00:05:47] So these three neurons on the left form one layer, which is why I drew them on top of each other.  
[00:05:53] And the single neuron on the right is also one layer.  
[00:05:57] The layer on the left has three neurons, so a layer can have multiple neurons  
[00:06:02] or it can also have a single neuron, as in the case of this layer on the right.  
[00:06:07] This layer on the right is also called the output layer  
[00:06:11] because the output of this final neuron is the output probability predicted by the neural network.  
[00:06:18] In the terminology of neural networks, we're also going to call affordability, awareness,  
[00:06:24] and perceived quality to be activations.  
[00:06:28] The term activations comes from biological neurons,  
[00:06:31] and it refers to the degree that a biological neuron is sending a high output value  
[00:06:36] or sending many electrical impulses to other neurons, to the downstream from it.  
[00:06:41] And so these numbers on affordability, awareness, and perceived quality  
[00:06:45] are the activations of these three neurons in this layer.  
[00:06:49] And also, this output probability is the activation of this neuron shown here on the right.  
[00:06:58] So this particular neural network, therefore, carries out computations as follows.  
[00:07:03] It inputs four numbers, then this layer of the neural network uses those four numbers  
[00:07:08] to compute three new numbers, also called activation values.  
[00:07:13] And then the final layer, the output layer of the neural network,  
[00:07:17] uses those three numbers to compute one number.  
[00:07:21] And in a neural network, this list of four numbers is also called the input layer,  
[00:07:30] and that's just a list of four numbers.  
[00:07:33] Now, there's one simplification I'd like to make to this neural network,  
[00:07:38] which is the way I've described it so far, we had to go through the neurons one at a time  
[00:07:43] and decide what inputs it would take from the previous layer.  
[00:07:48] So, for example, we said affordability is a function of just price and shipping costs,  
[00:07:53] and awareness is a function of just marketing, and so on.  
[00:07:57] But if you're building a large neural network, it'd be a lot of work to go through  
[00:08:00] and manually decide which neurons should take which features as inputs.  
[00:08:05] The way a neural network is implemented in practice, each neuron in a certain layer,  
[00:08:11] say this layer in the middle, will have access to every feature,  
[00:08:16] to every value from the previous layer, from the input layer.  
[00:08:20] Which is why I'm now drawing arrows from every input feature  
[00:08:25] to every one of these neurons shown here in the middle.  
[00:08:29] And you can imagine that if you're trying to predict affordability  
[00:08:33] and it knows what's the price, shipping cost, marketing, and material,  
[00:08:37] maybe it'll learn to ignore marketing and material  
[00:08:40] and just figure out through setting the parameters appropriately  
[00:08:44] to only focus on the subset of features that are most relevant to affordability.  
[00:08:50] To further simplify the notation and the description of this neural network,  
[00:08:55] I'm going to take these four input features and write them as a vector x,  
[00:09:02] and we're going to view the neural network as having four features  
[00:09:06] that comprise this feature vector x,  
[00:09:10] and this feature vector is fed to this layer in the middle,  
[00:09:15] which then computes three activation values, that is these three numbers,  
[00:09:21] and these three activation values in turn becomes another vector  
[00:09:27] which is fed to this final output layer  
[00:09:31] that finally outputs the probability of this t-shirt being a top seller.  
[00:09:37] So that's all a neural network is.  
[00:09:40] It has a few layers where each layer inputs a vector  
[00:09:44] and outputs another vector of numbers,  
[00:09:48] where, for example, this layer in the middle inputs four numbers, x,  
[00:09:53] and outputs three numbers corresponding to affordability, awareness, and perceived quality.  
[00:09:58] To add a little bit more terminology,  
[00:10:02] you've seen that this layer is called the output layer  
[00:10:06] and this layer is called the input layer.  
[00:10:09] To give the layer in the middle a name as well,  
[00:10:12] this layer in the middle is called a hidden layer.  
[00:10:16] I know that this is maybe not the best or the most intuitive name,  
[00:10:20] but that terminology comes from that when you have a training set.  
[00:10:25] In a training set, you get to observe both x and y.  
[00:10:29] Your data set tells you what is x and what is y,  
[00:10:32] and so you get data that tells you what are the correct inputs and the correct outputs,  
[00:10:37] but your data set doesn't tell you what are the correct values  
[00:10:41] for affordability, awareness, and perceived quality.  
[00:10:44] And so the correct values for those are hidden.  
[00:10:47] You don't see them in the training set,  
[00:10:49] which is why this layer in the middle is called a hidden layer.  
[00:10:52] I'd like to share with you another way of thinking about neural networks  
[00:10:57] that I found useful for building my intuition about it.  
[00:11:00] Just let me cover up the left half of this diagram and see what we're left with.  
[00:11:05] What you see here is that there is a logistic regression algorithm  
[00:11:10] or logistic regression unit that is taking as input affordability,  
[00:11:14] awareness, and perceived quality of a T-shirt  
[00:11:17] and using these three features to estimate the probability of the T-shirt being a top seller.  
[00:11:23] So this is just logistic regression.  
[00:11:28] But the cool thing about this is rather than using the original features,  
[00:11:33] price, shipping cost, marketing, and so on,  
[00:11:35] it's using a new, maybe better set of features, affordability, awareness, and perceived quality  
[00:11:40] that are hopefully more predictive of whether or not this T-shirt will be a top seller.  
[00:11:46] So one way to think of this neural network is just logistic regression,  
[00:11:51] but it is a version of logistic regression that can learn its own features  
[00:11:56] that makes it easier to make accurate predictions.  
[00:12:00] In fact, you might remember from the previous course,  
[00:12:04] this housing example where we said that if you want to predict the price of a house,  
[00:12:09] you might take the frontage or the width of a lot and multiply that by the depth of a lot  
[00:12:14] to construct a more complex feature, x1 times x2, which was the size of the lot.  
[00:12:20] So there we were doing manual feature engineering where we had to look at the features x1 and x2  
[00:12:26] and decide by hand how to combine them together to come up with better features.  
[00:12:30] What a neural network does is instead of you needing to manually engineer the features,  
[00:12:36] it can learn, as you see later, its own features to make the learning problem easier for itself.  
[00:12:44] So this is what makes neural networks one of the most powerful learning algorithms in the world today.  
[00:12:50] So to summarize, a neural network does this.  
[00:12:54] The input layer has a vector of features, four numbers in this example.  
[00:12:58] It is input to the hidden layer, which outputs three numbers,  
[00:13:03] and I'm going to use a vector to denote this vector of activations that this hidden layer outputs.  
[00:13:12] And then the output layer takes as input those three numbers and outputs one number,  
[00:13:18] which would be the final activation or the final prediction of the neural network.  
[00:13:24] One note, even though I previously described this neural network  
[00:13:28] as computing affordability, awareness, and perceived quality,  
[00:13:31] one of the really nice properties of a neural network is when you train it from data,  
[00:13:37] you don't need to go in to explicitly decide what are the features,  
[00:13:40] such as affordability and so on, that a neural network should compute.  
[00:13:44] Instead, it will figure out all by itself what are the features it wants to use in this hidden layer.  
[00:13:51] And that's what makes it such a powerful learning algorithm.  
[00:13:54] So you've seen here one example of a neural network,  
[00:13:58] and this neural network has a single layer that is a hidden layer.  
[00:14:02] Let's take a look at some other examples of neural networks,  
[00:14:05] specifically examples with more than one hidden layer.  
[00:14:10] Here's an example.  
[00:14:11] This neural network has an input feature vector x that is fed to one hidden layer,  
[00:14:19] and I'm going to call this the first hidden layer.  
[00:14:22] And so if this hidden layer has three neurons,  
[00:14:25] it will then output a vector of three activation values.  
[00:14:30] These three numbers can then be input to the second hidden layer,  
[00:14:35] and if this second hidden layer has two neurons, two logistic units,  
[00:14:40] then this second hidden layer will output another vector of now two activation values  
[00:14:46] that maybe goes to the output layer that then outputs the neural network's final prediction.  
[00:14:52] Or here's another example.  
[00:14:54] Here's a neural network that has its input go to the first hidden layer,  
[00:14:58] that the output of the first hidden layer goes to the second hidden layer,  
[00:15:02] goes to the third hidden layer, and then finally to the output layer.  
[00:15:06] When you're building your own neural network,  
[00:15:08] one of the decisions you need to make is how many hidden layers do you want  
[00:15:12] and how many neurons do you want each hidden layer to have.  
[00:15:17] And this question of how many hidden layers and how many neurons per hidden layer  
[00:15:22] is a question of the architecture of the neural network.  
[00:15:26] You'll learn later in this course some tips for choosing an appropriate architecture  
[00:15:31] for a neural network, but choosing the right number of hidden layers  
[00:15:35] and number of hidden units per layer can have an impact  
[00:15:39] on the performance of your learning algorithm as well.  
[00:15:41] So later in this course, you'll learn how to choose a good architecture  
[00:15:45] for your neural network as well.  
[00:15:47] By the way, in some of the literature, you see this type of neural network  
[00:15:51] with multiple layers like this called a multi-layer perceptron.  
[00:15:55] So if you see that, that just refers to a neural network  
[00:15:57] that looks like what you see here on the slide.  
[00:16:01] So that's a neural network.  
[00:16:04] I know we went through a lot in this video, so thank you for sticking with me.  
[00:16:08] But you now know how a neural network works.  
[00:16:11] In the next video, let's take a look at how these ideas can be applied  
[00:16:14] to other applications as well.  
[00:16:16] In particular, we'll take a look at the computer vision application of face recognition.  
[00:16:21] Let's go on to the next video.
