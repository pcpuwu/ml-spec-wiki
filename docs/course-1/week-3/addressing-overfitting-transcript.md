# Addressing Overfitting — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](addressing-overfitting.md)

---

[00:00:02] Later in this specialization, we'll talk about debugging and diagnosing things that can go wrong with learning algorithms.  
[00:00:09] You also learn about specific tools to recognize when overfitting and underfitting may be occurring.  
[00:00:16] But for now, when you think overfitting has occurred, let's talk about what you can do to address it.  
[00:00:22] Let's say you fit a model and it has high variance, it's overfit.  
[00:00:27] Here's our Overfit House Price Prediction Model.  
[00:00:30] One way to address this problem is to collect more training data.  
[00:00:36] So that's one option.  
[00:00:38] If you're able to get more data that is more training examples on sizes and prices of houses,  
[00:00:45] then with the larger trading set, the learning algorithm will learn to fit a function that is less wiggly.  
[00:00:53] So you can continue to fit a high-order polynomial or some of the function with a lot of features.  
[00:00:59] and if you have enough training examples, it will still do okay.  
[00:01:03] So to summarize, the number one tool you can use against overfitting is to get more training data.  
[00:01:11] Now, getting more data isn't always an option.  
[00:01:14] Maybe only so many houses have been sold in this location, so maybe there just isn't more data to be had.  
[00:01:21] But when the data is available, this can work really well.  
[00:01:24] A second option for addressing overfitting is to see if you can use fewer features.  
[00:01:29] fewer features. In the previous video, our model's features included the size x, as was  
[00:01:37] the size squared, that is x squared, and xQ, and x the 4, and so on. These were a lot of  
[00:01:45] polynomial features. So in that case, one way to reduce overfitting is to just not use so many  
[00:01:53] many of these polynomial features. But now let's look at a different example. Maybe you have a lot of different  
[00:01:59] features of a house with which to try to predict its price, ranging from a size, number of  
[00:02:04] bedrooms, number of floors, the age, average income of the neighborhood, and so on and so forth  
[00:02:10] to the distance to the nearest coffee shop. It turns out that if you have a lot of features like  
[00:02:16] these, but don't have enough training data, then your learning algorithm may also overfit to your  
[00:02:22] training set. Now, instead of using all 100 features, if we were to pick just a subset of the most  
[00:02:29] useful ones, maybe size, bedrooms, and the age of the halls. If you think those are the most  
[00:02:37] relevant features, then using just that smaller subset of features, you may find that your model no  
[00:02:43] longer overfits as badly. Choosing the most appropriate set of features to use is sometimes also  
[00:02:50] called feature selection. One way you could do so is to use your intuition to choose what you think  
[00:02:56] is the best set of features. What's most relevant for predicting the price?  
[00:03:00] Now, one disadvantage of feature selection is that by using only a subset of the features,  
[00:03:08] the algorithm is throwing away some of the information that you have about the houses.  
[00:03:13] For example, maybe all of these features are 100 of them, are actually useful for predicting the  
[00:03:18] price of the hulls. So maybe you don't want to throw away some of the information by  
[00:03:23] throwing away some of the features. Later in course 2, you also see some algorithms for automatically  
[00:03:30] choosing the most appropriate set of features you use for a prediction task.  
[00:03:35] Now, this takes us to the third option for reducing overfitting. This technique, which will look at  
[00:03:41] an even greater depth in the next video, is called regularization. If you look at an  
[00:03:48] overfit model, here's a model using polynomial features, xx squared, and so on. You find  
[00:03:56] that the parameters are often relatively large. Now, if you  
[00:04:01] to eliminate some of these features, say if you were to eliminate the feature x4, that corresponds  
[00:04:08] to setting this parameter to zero. So setting a parameter to zero is equivalent to eliminating  
[00:04:16] a feature, which is what we saw on the previous slide. It turns out that regularization is a  
[00:04:23] way to more gently reduce the impacts of some of the features without doing something as  
[00:04:29] harsh as eliminating it outright. What regularization does is encourage the learning  
[00:04:35] algorithm to shrink the values of the parameters without necessarily demanding that the parameter  
[00:04:41] is set to exactly zero. And it turns out that even if you fit a higher order polynomial like this,  
[00:04:48] so long as you can get the algorithm to use smaller parameter values, W1, W2, W3, W4,  
[00:04:55] you end up with a curve that ends up fitting the training data much better.  
[00:04:59] better. So what regularization does is it lets you keep all of your features, but it just  
[00:05:05] prevents the features from having an overly large effect, which is what sometimes can cause  
[00:05:12] overfitting. By the way, by convention, we normally just reduce the size of the WJ parameters,  
[00:05:21] that is W1 through WN. It kind of doesn't make a huge difference whether you regularize the parameter B as well. You  
[00:05:29] You could do so if you want or not if you don't. I usually don't, and it's just fine to  
[00:05:34] regularize W1, W2, all the way to WN, but not really encourage B to become smaller.  
[00:05:41] In practice, it should make very little difference whether you also regularize B or not.  
[00:05:47] So to recap, these are the three ways you saw in this video for addressing overfitting.  
[00:05:54] One, collect more data. If you can get more data, this can really help  
[00:06:00] reduce overfitting. Sometimes that's not possible. In which case, some other options are.  
[00:06:06] Two, try selecting and using only a subset of the features. You learn more about feature  
[00:06:13] selection in course two. Three would be to reduce the size of the parameters using regularization.  
[00:06:23] This will be the subject of the next video as well. Just for myself, I use regularization all the time.  
[00:06:29] So this is a very useful technique for training learning algorithms,  
[00:06:33] including neural networks specifically, which you see later in this specialization as well.  
[00:06:38] I hope you also check out the optional lab on overfitting.  
[00:06:44] In the lab, you'll be able to see different examples of overfitting and adjust those examples  
[00:06:50] by clicking on options in the plots. You also be able to add your own data points by clicking  
[00:06:55] on the plot and see how that changes the curve that is.  
[00:06:59] that is fit. You can also try examples for both regression and classification,  
[00:07:06] and you really change the degree of the polynomial to be x, x squared, x cubed, and so on.  
[00:07:13] The lab also lets you play with two different options for addressing overfitting. You can add additional  
[00:07:20] training data to reduce overfitting, and you can also select which features to include or  
[00:07:26] exclude as another way to try to reduce overfitting.  
[00:07:30] So please take a look at the lab, which I hope will help you build your intuition about  
[00:07:35] overfitting as well as some methods for addressing it.  
[00:07:40] In this video, you also saw the idea of regularization at a relatively high level.  
[00:07:45] I realized that all of these details on regularization may not fully make sense to you yet,  
[00:07:51] but in the next video, we'll start to formulate exactly how to apply regularization  
[00:07:57] and exactly what regularization means. And there's  
[00:08:00] we'll start to figure out how to make this work with our learning algorithms,  
[00:08:04] to make linear regression and logistic regression, and in the future other albums as well.  
[00:08:10] Avoid overfitting. Let's take a look at that in the next video.
