# One-Hot Encoding of Categorical Features — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](using-one-hot-encoding-of-categorical-features.md)

---

[00:00:02] In the example we've seen so far, each of the features could take on only one of two  
[00:00:07] possible values.  
[00:00:08] The ear shape was either pointy or floppy, the face shape was either round or not round,  
[00:00:14] and whiskers were either present or absent.  
[00:00:17] But what if you have features that can take on more than two discrete values?  
[00:00:22] In this video, we'll look at how you can use one-hot encoding to adjust features like  
[00:00:27] that.  
[00:00:28] Here's a new training set for our Pet Adoption Center application, where all the data is  
[00:00:34] the same except for the ear shape feature.  
[00:00:37] Rather than the ear shape only being pointy and floppy, it can now also take on an oval  
[00:00:44] shape.  
[00:00:46] And so the ear shape feature is still a categorical value feature, but it can take on three possible  
[00:00:53] values instead of just two possible values.  
[00:00:57] And this means that when you split on this feature, you end up creating three subsets  
[00:01:02] of the data and end up building three sub-branches for this tree.  
[00:01:09] But in this video, I'd like to describe a different way of adjusting features that can  
[00:01:16] take on more than two values, which is to use a one-hot encoding.  
[00:01:22] In particular, rather than using an ear shape feature that can take on any of three possible  
[00:01:27] values, we're instead going to create three new features, where one feature is, does this  
[00:01:36] animal have pointy ears, a second is, does it have floppy ears, and a third is, does  
[00:01:41] it have oval ears.  
[00:01:43] And so for the first example, whereas we previously had ear shape as pointy, we will now instead  
[00:01:51] say that this animal has a value for the pointy ear feature of 1 and 0 for floppy and oval.  
[00:02:00] Whereas previously, for the second example, we previously said it had oval ears, now we'll  
[00:02:05] say that it has a value of 0 for pointy ears, because it doesn't have pointy ears.  
[00:02:12] It also doesn't have floppy ears, but it does have oval ears, which is why this value here  
[00:02:16] is 1, and so on for the rest of the examples in the dataset.  
[00:02:21] And so instead of one feature taking on three possible values, we've now constructed three  
[00:02:27] new features, each of which can take on only one of two possible values, either 0 or 1.  
[00:02:35] In a little bit more detail, if a categorical feature can take on k possible values, k was  
[00:02:42] 3 in our example, then we will replace it by creating k binary features that can only  
[00:02:49] take on the values 0 or 1.  
[00:02:52] And you notice that among all of these three features, if you look at any row here, exactly  
[00:02:59] one of the values is equal to 1.  
[00:03:03] And that's what gives this method of feature construction the name one-hot encoding.  
[00:03:08] And because one of these features will always take on the value 1, that's the hot feature,  
[00:03:14] and hence the name one-hot encoding.  
[00:03:17] And with this choice of features, we're now back to the original setting of where each  
[00:03:22] feature only takes on one of two possible values, and so the decision tree learning  
[00:03:26] algorithm that we've seen previously will apply to this data with no further modifications.  
[00:03:33] Just as an aside, even though this week's material has been focused on training decision  
[00:03:39] tree models, the idea of using one-hot encodings to encode categorical features also works  
[00:03:45] for training neural networks.  
[00:03:48] In particular, if you were to take the phase shape feature and replace round and not round  
[00:03:54] with 1 and 0, where round gets mapped to 1, not round gets mapped to 0, and so on, and  
[00:04:02] for whiskers, similarly, replace presence with 1 and absence with 0, then notice that  
[00:04:10] we have taken all the categorical features we had, where we had three possible values  
[00:04:15] for ear shape, two for phase shape, and one for whiskers, and encoded it as a list of  
[00:04:20] these five features, three from the one-hot encoding of ear shape, one from phase shape,  
[00:04:27] one from whiskers, and now this list of five features can also be fed to a neural network  
[00:04:32] or to logistic regression to try to train a cat classifier.  
[00:04:37] So one-hot encoding is a technique that works not just for decision tree learning, but also  
[00:04:43] lets you encode categorical features using 1s and 0s so that it can be fed as inputs  
[00:04:50] to a neural network as well, which expects numbers as inputs.  
[00:04:55] So that's it.  
[00:04:56] With a one-hot encoding, you can get your decision tree to work on features that can  
[00:05:00] take on more than two discrete values, and you can also apply this to neural network  
[00:05:06] or linear regression or logistic regression training.  
[00:05:10] But how about features that are numbers, that can take on any value, not just a small number  
[00:05:16] of discrete values?  
[00:05:17] In the next video, let's look at how you can get the decision tree to handle continuous  
[00:05:22] value features that can be any number.
