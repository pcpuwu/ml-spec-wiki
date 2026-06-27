# The Problem of Overfitting — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](the-problem-of-overfitting.md)

---

[00:00:02] Now you've seen a couple of different learning algorithms,  
[00:00:05] linear regression and logistic regression.  
[00:00:08] They work well for many tasks,  
[00:00:10] but sometimes in an application,  
[00:00:12] the algorithm could run into a problem called overfitting,  
[00:00:16] which can cause it to perform poorly.  
[00:00:19] What I'd like to do in this video is to show you what is overfitting,  
[00:00:23] as well as a closely related, almost opposite problem called underfitting.  
[00:00:28] And in the next videos after this,  
[00:00:30] I'll share of you some techniques.  
[00:00:32] for addressing overfitting.  
[00:00:34] In particular, there's a method called regularization.  
[00:00:37] Very useful technique, I use it all the time,  
[00:00:40] but regularization will help you minimize this overfitting problem  
[00:00:44] and get your learning algorithms to work much better.  
[00:00:47] So, let's take a look at what is overfitting.  
[00:00:51] To help us understand what is overfitting,  
[00:00:54] let's take a look at a few examples.  
[00:00:58] Let's go back to our original example of predicting housing  
[00:01:02] prices with linear regression, where you want to predict the price as a function of the size of a  
[00:01:08] house. To help us understand what is overfitting, let's take a look at a linear regression example.  
[00:01:17] And I'm going to go back to our original running example of predicting  
[00:01:21] housing prices with linear regression. Suppose your dataset looks like this,  
[00:01:28] with the input feature X being the size of the hulls and the value,  
[00:01:32] value why they're trying to predict the price of the hulls.  
[00:01:36] One thing you could do is fit a linear function to this data.  
[00:01:41] And if you do that, you get a straight line fit to the data that maybe looks like this.  
[00:01:47] But this isn't a very good model. Looking at the data, it seems pretty clear that as the size  
[00:01:53] of the hulls increases, the housing prices kind of flattened out.  
[00:01:58] So this algorithm does not fit the training data very well.  
[00:02:03] well. The technical term for this is the model is underfitting the training data.  
[00:02:10] Another term is the algorithm has high bias. You may have read in the news about some learning  
[00:02:18] algorithms, really unfortunately, demonstrating bias against certain ethnicities or certain  
[00:02:24] genders. In machine learning, the term bias has multiple meanings. Checking learning algorithms for  
[00:02:33] bias based on characteristics such as gender or ethnicity is absolutely critical.  
[00:02:41] But the term bias has a second technical meaning as well, which is the one I'm using here,  
[00:02:47] which is if the algorithm has underfit the data, meaning that it's just not even able to fit  
[00:02:52] the training set that well, that there's a clear pattern in the training data that the algorithm  
[00:02:58] is just unable to capture. Another way to think of this form of bias,  
[00:03:04] is as if the learning algorithm has a very strong preconception, or we say a very strong  
[00:03:09] bias, that the housing prices are going to be a completely linear function of the size,  
[00:03:17] despite data to the contrary. So this preconception that the data is linear causes it to fit a straight  
[00:03:24] line that fits the data poorly, leading it to underfit the data. Now, let's look at a second  
[00:03:32] variation of a model, which is, if you instead fit a quadratic function to the data  
[00:03:40] with two features, x and x squared, then when you fit the parameters W1 and w2, you can get a  
[00:03:48] curve that fits the data somewhat better. Maybe it looks like this. Also, if you were to  
[00:03:56] get a new hulls, there's not in this set of five training examples, this model would probably  
[00:04:03] do quite well on that new hulls. So if you're a real estate agent, the idea that you want  
[00:04:10] your learning album to do well, even on examples that are not on the training set, that's called  
[00:04:16] generalization. Technically, we say that you want your learning album to generalize well,  
[00:04:22] which means to make good predictions, even on brand new examples that it has never seen before.  
[00:04:28] So this quadratic model seems to fit the training set not perfectly, but pretty well.  
[00:04:34] and I think it'll generalize well to new examples. Now, let's look at the other extreme.  
[00:04:41] What if you were to fit a fourth order polynomial to the data? So you have x, x squared,  
[00:04:47] x cubed, and x the fourth all as features. With this fourth order polynomial, you can actually  
[00:04:54] fit the curve that passes through all five with the training examples exactly, and you might get  
[00:05:00] a curve that looks like this. This, on one hand, seems to do an  
[00:05:05] extremely good job fitting the training data because it passes through all of the training  
[00:05:10] data perfectly. In fact, you'll be able to choose parameters that will result in the cost  
[00:05:16] function being exactly equal to zero, because the errors are zero on all five training examples.  
[00:05:24] But this is a very, you know, wiggly curve. It's going up and down all over the place.  
[00:05:29] And if you have this hull size right here, the model would predict that this house is cheaper,  
[00:05:35] than houses that are smaller than it. So we don't think that this is a particularly good  
[00:05:43] model for predicting housing prices. The technical term is that we'll say this model has  
[00:05:49] overfit the data or this model has an overfitting problem. Because even though it fits the training  
[00:05:56] set very well, it has fit the data almost too well, hence it's overfit. And it does not  
[00:06:02] look like this model will generalize to new examples that has never seen before.  
[00:06:08] Another term for this is that the algorithm has high variance. In machine learning, many people  
[00:06:16] will use the terms overfit in high variance almost interchangeably, and will use the terms  
[00:06:21] underfit and high bias almost interchangeably. The intuition behind overfitting or high  
[00:06:28] variance is that the album is trying very, very hard to fit every single training example.  
[00:06:34] And it turns out that if your training set were just even a little bit different,  
[00:06:39] say one hulls was priced just a little bit more, a little bit less,  
[00:06:43] then the function that the algorithm fits could end up being totally different.  
[00:06:48] So if two different machine learning engineers were to fit this fourth other  
[00:06:53] polynomial model, to just slightly different data sets,  
[00:06:57] they could end up with totally different predictions or highly variable predictions,  
[00:07:02] and that's why we say the algorithm  
[00:07:04] has high variance. Contrasting this rightmost model with the one in the middle,  
[00:07:12] for the same house, it seems the middle model gives the much more reasonable prediction for price.  
[00:07:18] There isn't really a name for this case in the middle, but I'm just going to call this just right,  
[00:07:23] because it is neither underfit nor overfit. So we can say that the goal of machine learning  
[00:07:30] is to find a model that hopefully is neither underfitting nor overfitting. In other  
[00:07:36] hopefully a model that has neither high bias nor high variance.  
[00:07:42] When I think about underfitting and overfitting high bias and high variance,  
[00:07:47] I'm sometimes reminded of the children's story of Goldilocks and the three bears.  
[00:07:54] In this children's tale, a girl called Goldilocks visits the whole of a bear family.  
[00:08:00] There's a bowl of porridge that's too cold to a taste, and so that's no good.  
[00:08:05] There's also a bowl of porridge that's too hot to eat.  
[00:08:10] So that's no good either. But there's a bowl of porridge that is neither too cold nor too hot.  
[00:08:15] The temperature is in the middle, which is just right to eat.  
[00:08:20] So to recap, if you have too many features, like the full-fother polynomial on the right,  
[00:08:26] then the model may fit the trading set well, but almost too well or overfit in the high variance.  
[00:08:32] On the flip side, if you have too few features, then in this example,  
[00:08:36] like the one on the left, it underfits and has high bias.  
[00:08:40] And in this example, using quadratic features, x and x squared,  
[00:08:44] that seems to be just right.  
[00:08:47] So far, we've looked at underfitting and overfitting for linear regression model.  
[00:08:52] Similarly, overfitting applies to classification as well.  
[00:08:56] Here's a classification example with two features x1 and x2,  
[00:09:00] where x1 is maybe the tumor size and x2 is the age of patient,  
[00:09:05] and we're trying to classify if a two  
[00:09:07] a tumor is malignant or benign, as denoted by these crosses and circles.  
[00:09:14] One thing you can do is fit a logistic regression model, just a simple model, like this,  
[00:09:20] where as usual, G is the sigmoid function, and this term here inside is Z.  
[00:09:29] So if you do that, you end up with a straight line as the decision boundary.  
[00:09:36] This is the line where z is equal to zero that separates the positive and negative examples.  
[00:09:42] This straight line doesn't look terrible. It looks kind of okay, but it doesn't look like a very  
[00:09:46] good fit to the data either. So this is an example of underfitting or of high bias.  
[00:09:54] Let's look at another example. If you were to add to your features these quadratic terms,  
[00:10:00] then z becomes this new term in the middle, and the decision boundary, that is, where z equals  
[00:10:06] z equals zero can look more like this, more like an ellipse or part of an ellipse.  
[00:10:13] And this is a pretty good fit to the data, even though it does not perfectly classify every  
[00:10:18] single training sample in the training set. Notice how some of these crosses get classified  
[00:10:23] among the circles. But this model looks pretty good. I'm going to call it just right,  
[00:10:29] and it looks like this will generalize pretty well to new patients. And finally, at the other extreme,  
[00:10:36] if you were to fit a very high-order polynomial with many, many features like these,  
[00:10:42] then the model may try really hard and contort or twist itself to find a decision boundary that fits  
[00:10:50] your training data perfectly. Having all these higher-order polynomial features allows the algorithm  
[00:10:57] to choose this really overly complex decision boundary. If the features are tumor size and age, and you're  
[00:11:06] trying to classify tumors as malignant or benign, then this doesn't really look like a very  
[00:11:12] good model for making predictions. So once again, this is an instance of overfitting and high  
[00:11:19] variance, because this model, despite doing very well in the training set, doesn't look like  
[00:11:24] or generalized well to new examples. So now you've seen how an algorithm can underfit or have high  
[00:11:31] bias or overfit and have high variance. You may want to know how you can get a model that  
[00:11:37] just right. In the next video, we'll look at some ways you can address the issue of  
[00:11:42] overfitting. And we'll also touch on some ideas relevant for addressing underfitting. Let's go on  
[00:11:49] on to the next video.
