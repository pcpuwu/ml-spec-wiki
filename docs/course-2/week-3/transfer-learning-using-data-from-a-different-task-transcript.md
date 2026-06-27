# Transfer Learning — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](transfer-learning-using-data-from-a-different-task.md)

---

[00:00:02] For an application where you don't have that much data, transfer learning is a wonderful  
[00:00:07] technique that lets you use data from a different task to help on your application.  
[00:00:13] This is one of those techniques that I use very frequently.  
[00:00:16] Let's take a look at how transfer learning works.  
[00:00:19] So here's how transfer learning works.  
[00:00:22] Let's say you want to recognize the handwritten digits from 0 through 9, but you don't have  
[00:00:29] that much label data of these handwritten digits.  
[00:00:33] Here's what you can do.  
[00:00:34] Say you find a very large data set of 1 million images of pictures of cats, dogs, cars, people,  
[00:00:43] and so on, 1,000 classes.  
[00:00:45] You can then start by training a neural network on this large data set of a million images  
[00:00:51] with 1,000 different classes and train the algorithm to take as input an image X and  
[00:00:56] learn to recognize any of these 1,000 different classes.  
[00:01:01] In this process, you end up learning parameters for the first layer of the neural network,  
[00:01:06] W1B1, for the second layer, W2B2, and so on, W3B3, W4B4, and W5B5 for the upper layer.  
[00:01:15] To apply transfer learning, what you do is then make a copy of this neural network where  
[00:01:22] you would keep the parameters W1B1, W2B2, W3B3, and W4B4, but for the last layer, you  
[00:01:32] would eliminate the upper layer and replace it with a much smaller upper layer with just  
[00:01:38] 10 rather than 1,000 output units.  
[00:01:44] These 10 output units will correspond to the classes 0, 1, through 9 that you want your  
[00:01:49] neural network to recognize.  
[00:01:52] The problem is that the parameters W5B5 can't be copied over because the dimension of this  
[00:01:57] layer has changed.  
[00:01:58] You need to come up with new parameters, W5B5, that you need to train from scratch rather  
[00:02:06] than just copy it from the previous neural network.  
[00:02:11] In transfer learning, what you can do is use the parameters from the first 4 layers, really  
[00:02:19] all the layers except the final upper layer as a starting point for the parameters, and  
[00:02:24] then run an optimization algorithm such as gradient descent or the Adam optimization  
[00:02:28] algorithm with the parameters initialized using the values from this neural network  
[00:02:33] up on top.  
[00:02:34] In detail, there are two options for how you can train this neural network's parameters.  
[00:02:41] Option 1 is you only train the upper layer's parameters.  
[00:02:45] You would take the parameters W1B1, W2B2, through W4B4 as the values from on top and  
[00:02:52] just hold them fixed and don't even bother to change them.  
[00:02:55] Use an algorithm like stochastic gradient descent or the Adam optimization algorithm  
[00:02:59] to only update W5B5 to lower the cost function, the usual cost function that you use for learning  
[00:03:07] to recognize these digits 0 to 9 from a small training set of these digits 0 to 9.  
[00:03:13] So that's option 1.  
[00:03:15] Option 2 would be to train all the parameters in the network, including W1B1, W2B2, all  
[00:03:20] the way through W5B5, but the first 4 layers' parameters would be initialized using the  
[00:03:26] values that you had trained on top.  
[00:03:30] If you have a very, very small training set, then option 1 might work a little bit better.  
[00:03:36] But if you have a training set that's a little bit larger, then option 2 might work a little  
[00:03:41] bit better.  
[00:03:43] This algorithm is called transfer learning because the intuition is by learning to recognize  
[00:03:49] cats, dogs, cars, people, and so on, it will hopefully have learned some plausible sets  
[00:03:54] of parameters for the earlier layers for processing image inputs.  
[00:04:00] And then by transferring these parameters to the new neural network, the new neural  
[00:04:04] network starts off with the parameters in a much better place.  
[00:04:09] So that with just a little bit of further learning, hopefully it can end up at a pretty  
[00:04:13] good model.  
[00:04:14] These two steps of first training on a large data set and then tuning the parameters further  
[00:04:21] on a smaller data set go by the name of supervised pre-training for the step on top.  
[00:04:27] That's when you train the neural network on a very large data set of, say, a million images  
[00:04:31] of not quite related tasks.  
[00:04:34] And then the second step is called fine-tuning, where you take the parameters that you had  
[00:04:40] initialized or gotten from supervised pre-training and then run gradient descent further to fine-tune  
[00:04:46] the weights to suit the specific application of handwritten digit recognition that you  
[00:04:52] may have.  
[00:04:53] And so if you have a small data set, even tens or hundreds or thousands or just tens  
[00:04:58] of thousands of images of the handwritten digits, able to learn from this million images  
[00:05:04] of a not quite related task can actually help your learning algorithms performance a lot.  
[00:05:09] One nice thing about transfer learning as well is maybe you don't need to be the one  
[00:05:15] to carry out supervised pre-training.  
[00:05:18] For a lot of neural networks, there will already be researchers that have already trained a  
[00:05:22] neural network on a large image and will have posted their trained neural networks on the  
[00:05:30] internet, freely licensed for anyone to download and use.  
[00:05:34] And what that means is rather than carrying out the first step yourself, you can just  
[00:05:38] download the neural network that someone else may have spent weeks training and then replace  
[00:05:43] the output layer with your own output layer and carry out either option one or option  
[00:05:48] two to fine-tune a neural network that someone else has already carried out supervised pre-training  
[00:05:54] on and just do a little bit of fine-tuning to quickly be able to get to neural network  
[00:05:59] that performs well on your task.  
[00:06:02] Downloading a pre-trained model that someone else has trained and provided for free is  
[00:06:07] one of those techniques where by building on each other's work in the machine learning  
[00:06:11] community, we can all get much better results by the generosity of other researchers that  
[00:06:16] have pre-trained and posted their neural networks online.  
[00:06:20] But why does transfer learning even work?  
[00:06:23] How can you possibly take parameters obtained by recognizing cats, dogs, cars, and people  
[00:06:28] and use that to help you recognize something as different as handwritten digits?  
[00:06:34] Here's some intuition behind it.  
[00:06:37] If you are training a neural network to detect, say, different objects from images, then the  
[00:06:45] first layer of a neural network may learn to detect edges in the image.  
[00:06:50] We think of these as somewhat low-level features in the image, which is to detect edges.  
[00:06:56] Each of these squares is a visualization of what a single neuron has learned to detect,  
[00:07:01] has learned to group together pixels to find edges in an image.  
[00:07:06] The next layer of the neural network then learns to group together edges to detect corners.  
[00:07:12] And so each of these is a visualization of what one neuron may have learned to detect,  
[00:07:17] has learned to detect little simple shapes like corner-like shapes like this.  
[00:07:23] And the next layer of the neural network may have learned to detect somewhat more complex  
[00:07:27] but still generic shapes like basic curves or small little shapes like these.  
[00:07:33] And that's why by learning on detecting lots of different images, you're teaching the neural  
[00:07:39] network to detect edges, corners, and basic shapes.  
[00:07:43] And that's why by training a neural network to detect things as diverse as cats and dogs  
[00:07:47] and cats and people, you're helping it to learn to detect these pretty generic features  
[00:07:53] of images and finding edges, corners, curves, basic shapes.  
[00:07:59] This is useful for many other computer vision tasks such as recognizing handwritten digits.  
[00:08:06] One restriction of pre-training though is that the image type X has to be the same for  
[00:08:12] the pre-training and the fine-tuning steps.  
[00:08:15] So if the final task you want to solve is a computer vision task, then the pre-training  
[00:08:20] step also has to be a neural network trained on the same type of input, namely an image  
[00:08:26] of the desired dimensions.  
[00:08:28] Conversely, if your goal is to build a speaker recognition system to process audio, then  
[00:08:34] a neural network pre-trained on images probably won't do much good on audio.  
[00:08:38] Instead, you want a neural network pre-trained on audio data that you then fine-tune on your  
[00:08:43] own audio dataset, and the same for other types of applications.  
[00:08:47] You can pre-train a neural network on text data, and if your application has the same  
[00:08:53] feature input X of text data, then you can fine-tune that neural network on your own  
[00:08:58] data.  
[00:08:59] To summarize, these are the two steps for transfer learning.  
[00:09:03] Step one is download a neural network with parameters that have been pre-trained on a  
[00:09:08] large dataset with the same input type as your application, and that input type could  
[00:09:14] be images, audio, text, or something else.  
[00:09:17] Or if you don't want to download a neural network, maybe you can train your own.  
[00:09:21] But in practice, if you're using images, say, it's much more common to download someone  
[00:09:26] else's pre-trained neural network.  
[00:09:28] Then further train or fine-tune the network on your own data, and I found that if you  
[00:09:35] can get a neural network pre-trained on a large dataset, say a million images, then  
[00:09:40] sometimes you can use a much smaller dataset, maybe a thousand images, maybe even smaller,  
[00:09:47] to fine-tune the neural network on your own data and get pretty good results.  
[00:09:52] And I've sometimes trained neural networks on as few as 50 images that work quite well  
[00:09:57] using this technique when it has already been pre-trained on a much larger dataset.  
[00:10:03] This technique isn't panacea.  
[00:10:04] You can't get every application to work just on 50 images, but it does help a lot when  
[00:10:10] the dataset you have for your application isn't that large.  
[00:10:14] And by the way, if you've heard of advanced techniques in the news like GPT-3 or BERT  
[00:10:20] or neural networks pre-trained on image nets, those are actually examples of neural networks  
[00:10:26] that someone else has pre-trained on a very large image dataset or text dataset that can  
[00:10:32] then be fine-tuned on other applications.  
[00:10:34] If you haven't heard of GPT-3 or BERT or image nets, don't worry about it, but if you have,  
[00:10:39] those have been successful applications of transfer learning in the machine learning  
[00:10:43] literature.  
[00:10:44] One of the things I like about transfer learning is it's been one of the ways that the machine  
[00:10:48] learning community has shared ideas and code and even parameters with each other, because  
[00:10:54] thanks to the researchers that have pre-trained large neural networks and posted the parameters  
[00:10:59] on the internet freely for anyone else to download and use, this empowers anyone to  
[00:11:04] take models they have pre-trained to fine-tune on potentially a much smaller dataset.  
[00:11:10] In machine learning, all of us end up often building on the work of each other, and that  
[00:11:15] open sharing of ideas, of code, of trained parameters is one of the ways that the machine  
[00:11:22] learning community, all of us collectively, manage to do much better work than any single  
[00:11:27] person by themselves can.  
[00:11:29] And so I hope that you joining the machine learning community will someday maybe find  
[00:11:33] a way to contribute back to this community as well.  
[00:11:36] So that's it for pre-training.  
[00:11:39] I hope you find this technique useful, and in the next video, I'd like to share with  
[00:11:44] you some thoughts on the full cycle of a machine learning project.  
[00:11:50] So when building a machine learning system, what are all the steps that are worth thinking  
[00:11:54] about?  
[00:11:55] We'll take a look at that in the next video.
