# Anomaly Detection Algorithm — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](anomaly-detection-algorithm.md)

---

[00:00:01] Now that you've seen how the Gaussian or the normal distribution works for a single number,  
[00:00:07] we're ready to build our anomaly detection algorithm. Let's dive in.  
[00:00:12] You have a training set, X1 through Xm, where here each example X has n features.  
[00:00:20] So each example X is a vector with n numbers.  
[00:00:24] In the case of the airplane engine example, we had two features corresponding to the heat and the vibrations,  
[00:00:32] and so each of these Xi's would be a two-dimensional vector, and n would be equal to 2.  
[00:00:38] But for many practical applications, n can be much larger, and you might do this with dozens or even hundreds of features.  
[00:00:46] Given this training set, what we would like to do is to carry out density estimation,  
[00:00:52] and all that means is we will build a model or estimate the probability for P of X.  
[00:01:00] What's the probability of any given feature vector?  
[00:01:05] And our model for P of X is going to be as follows.  
[00:01:10] X is a feature vector with values X1, X2, and so on, down to Xm.  
[00:01:19] I'm going to model P of X as the probability of X1 times the probability of X2 times the probability of X3  
[00:01:29] times the probability of Xn for the n features in the feature vectors.  
[00:01:38] If you've taken an advanced class in probability and statistics before,  
[00:01:42] you may recognize that this equation corresponds to assuming that the features X1, X2, and so on up to Xm are statistically independent,  
[00:01:53] but it turns out this algorithm often works fine even if the features are not actually statistically independent.  
[00:02:00] But if you don't understand what I just said, don't worry about it.  
[00:02:03] Understanding statistical independence is not needed to fully complete this class  
[00:02:09] and also be able to very effectively use the normal detection algorithm.  
[00:02:14] Now, to fill in this equation a little bit more,  
[00:02:18] we are saying that the probability of all the features of this vector features X is the product of P of X1 and P of X2 and so on up through P of Xn.  
[00:02:28] And in order to model the probability of X1, say the heat feature in this example,  
[00:02:36] we're going to have two parameters, mu1 and sigma1, or sigma squared 1.  
[00:02:43] And what that means is we're going to estimate the mean of the feature X1 and also the variance of feature X1, and that will be mu1 and sigma1.  
[00:02:56] To model P of X2, X2 is a totally different feature.  
[00:03:01] Measuring the vibrations of the airplane engine, we're going to have two different parameters,  
[00:03:08] which I'm going to write as mu2, sigma2 squared.  
[00:03:13] And it turns out this will correspond to the mean or the average of the vibration feature and the variance of the vibration feature and so on.  
[00:03:23] If you have additional features, mu3, sigma3 squared up through mun and sigma n squared.  
[00:03:33] In case you're wondering why we multiply probabilities, maybe here's one example that could build intuition.  
[00:03:42] Suppose for an aircraft engine, there's a one-tenth chance that it is really, really hot, unusually hot.  
[00:03:50] And maybe there is a 1 in 20 chance that it vibrates really, really hot.  
[00:03:57] Then what is the chance that it runs really, really hot and vibrates really, really hot?  
[00:04:02] We're saying that the chance of that is one-tenth times 1 over 20, which is 1 over 200.  
[00:04:10] So it's really, really unlikely to get an engine that both runs really hot and vibrates really hot.  
[00:04:16] It's the product of these two probabilities.  
[00:04:19] The chance of both of these things happening, we're saying, is the product of both of these probabilities.  
[00:04:26] A somewhat more compact way to write this equation up here is to say that this is equal to the product from j equals 1 through n of p of xj,  
[00:04:41] with parameters mu j and sigma squared j.  
[00:04:49] And this symbol here is a lot like the summation symbol, except that whereas the summation symbol corresponds to addition,  
[00:04:58] this symbol here corresponds to multiplying these terms over here for j equals 1 through n.  
[00:05:06] So let's put it all together to see how you can build an anomaly detection system.  
[00:05:13] The first step is to choose features xi that you think might be indicative of anomalous examples.  
[00:05:22] Having come up with the features you want to use, you would then fit the parameters mu 1 through mu n  
[00:05:29] and sigma squared 1 through sigma squared n for the n features in your data set.  
[00:05:37] As you might guess, the parameter mu j will be just the average of xj of the feature j of all the examples in your training set,  
[00:05:48] and sigma squared j will be the average of the squared difference between the j-th feature and the value mu j that you just computed up here on top.  
[00:06:01] And by the way, if you have a vectorized implementation, you can also compute mu as the average of the training examples as follows,  
[00:06:12] where here x and mu are both vectors, and so this would be the vectorized way of computing mu 1 through mu n all at the same time.  
[00:06:22] And by estimating these parameters on your unlabeled training set, you've now computed all the parameters of your model.  
[00:06:31] Finally, when you are given a new example, x test, or I'm just going to write the new example as x here,  
[00:06:40] what you would do is compute p of x and see if it's large or small.  
[00:06:45] So p of x, as you saw on the last slide, is the product from j equals 1 through n of the probability of the individual features,  
[00:06:53] so p of xj with parameters mu j and sigma squared j.  
[00:06:59] And if you substitute in the formula for this probability, you end up with this expression, 1 over root 2 pi sigma j of e to this expression over here.  
[00:07:12] And so xj are the features, this is the j feature of your new example, mu j and sigma j are numbers or parameters you have computed in the previous step.  
[00:07:25] And if you compute out this formula, you get some number for p of x.  
[00:07:32] And the final step is to see if p of x is less than epsilon, and if it is, then you flag that it is an anomaly.  
[00:07:43] One intuition behind what this algorithm is doing is that it will tend to flag an example as anomalous if one or more of the features are either very large or very small relative to what it has seen in the training set.  
[00:07:59] So for each of the features xj, you're fitting a Gaussian distribution like this, and so if even one of the features of the new example was way out here, say,  
[00:08:12] then p of xj would be very small, and if just one of the terms in this product is very small,  
[00:08:19] then this overall product, when you multiply it together, will tend to be very small, and thus p of x will be small.  
[00:08:28] And what anomaly detection is doing in this algorithm is a systematic way of quantifying whether or not this new example x has any features that are unusually large or unusually small.  
[00:08:43] Now, let's take a look at what all this actually means on one example.  
[00:08:49] Here's a dataset with features x1 and x2, and you notice that the features x1 take on a much larger range of values than the features x2.  
[00:09:02] If you were to compute the mean of the features x1, you end up with 5, which is why mu1 is equal to 1,  
[00:09:10] and it turns out that for this dataset, if you compute sigma1, it will be equal to about 2,  
[00:09:17] and if you were to compute mu2, the average of the features on x2, the average is 3,  
[00:09:24] and similarly, its variance, or standard deviation, is much smaller, which is why sigma2 is equal to 1.  
[00:09:33] So that corresponds to this Gaussian distribution for x1 and this Gaussian distribution for x2.  
[00:09:43] If you were to actually multiply p of x1 and p of x2, then you end up with this 3D surface plot for p of x,  
[00:09:52] where at any point, the height of this is the product of p of x1 times p of x2 for the corresponding values of x1 and x2,  
[00:10:03] and this signifies that values where p of x is higher are more likely, so values near the middle, kind of here, are more likely,  
[00:10:14] whereas values far out here, like values out here, are much less likely, are much lower chance.  
[00:10:21] Now, let me pick two test examples. The first one here, I'm going to write as xtest1, and the second one down here as xtest2,  
[00:10:34] and let's see which of these two examples the algorithm will flag as anomalous.  
[00:10:40] I'm going to pick the parameter epsilon to be equal to 0.02, and if you were to compute p of xtest1, it turns out to be about 0.04,  
[00:10:55] and this is much bigger than epsilon, and so the algorithm will say, this looks okay, doesn't look like an anomaly,  
[00:11:02] whereas in contrast, if you were to compute p of x for this point down here, corresponding to x1 equals about 8 and x2 equals about 0.5,  
[00:11:14] kind of down here, then p of xtest2 is 0.0021, so this is much smaller than epsilon, and so the algorithm will flag this as a likely anomaly.  
[00:11:29] So, pretty much as you might hope, it decides that xtest1 looks pretty normal, whereas xtest2, which is much further away than anything you've seen in the training set,  
[00:11:41] looks like it could be an anomaly.  
[00:11:43] So, you've seen the process of how to build an anomaly detection system, but how do you choose the parameter epsilon,  
[00:11:51] and how do you know if your anomaly detection system is working well?  
[00:11:56] In the next video, let's dive a little bit more deeply into the process of developing and evaluating the performance of an anomaly detection system.  
[00:12:05] Let's go on to the next video.
