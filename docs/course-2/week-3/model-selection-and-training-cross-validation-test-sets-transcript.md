# Model Selection: Train / Cross-Validation / Test Sets — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](model-selection-and-training-cross-validation-test-sets.md)

---

[00:00:01] In the last video, you saw how to use a test set to evaluate the performance of a model.  
[00:00:07] Let's make one further refinement to that idea in this video, which allows you to use  
[00:00:12] the technique to automatically choose a good model for your machine learning algorithm.  
[00:00:17] One thing we've seen is that once the model's parameters W and B have been fit to the training  
[00:00:23] set, the training error may not be a good indicator of how well the algorithm will do  
[00:00:29] or how well it will generalize to new examples that were not in the training set.  
[00:00:34] And in particular, for this example, the training error will be pretty much zero, and that's  
[00:00:40] likely much lower than the actual generalization error.  
[00:00:44] And by that, I mean the average error on new examples that were not in the training set.  
[00:00:51] And what you saw in the last video is that JTest, the performance of the algorithm on  
[00:00:56] examples it's not trained on, that that would be a better indicator of how well the model  
[00:01:01] will likely do on new data.  
[00:01:03] And by that, I mean other data that's not in the training set.  
[00:01:08] Let's take a look at how this affects how we might use a test set to choose a model  
[00:01:14] for a given machine learning application.  
[00:01:17] So if we're fitting a function to predict housing prices or some other regression problem,  
[00:01:22] one model you might consider is to fit a linear model like this.  
[00:01:26] And this is a first-order polynomial, and I'm going to use d equals 1 on this slide  
[00:01:31] to denote fitting a 1 or first-order polynomial.  
[00:01:36] If you were to fit a model like this to your training set, you'd get some parameters w  
[00:01:40] and b, and you can then compute JTest to estimate how well this will generalize to new data.  
[00:01:48] And on this slide, I'm going to use w1, b1, superscript there, to denote that these are  
[00:01:54] the parameters you get if you were to fit a first-order polynomial or degree 1, d equals  
[00:02:00] 1 polynomial.  
[00:02:02] Now, you might also consider fitting a second-order polynomial or quadratic model.  
[00:02:08] So this is the model, and if you were to fit this to your training set, you would get some  
[00:02:15] parameters w2, b2, and you can then similarly evaluate those parameters on your test set  
[00:02:24] and get JTest w2, b2, and this would give you a sense of how well the second-order polynomial  
[00:02:30] does.  
[00:02:31] And you can go on to try d equals 3.  
[00:02:33] That's a third-order or a degree 3 polynomial that looks like this, and fit parameters and  
[00:02:40] similarly get JTest, and you might keep doing this until, say, you try up to a 10th-order  
[00:02:47] polynomial, and you end up with JTest of w10, b10.  
[00:02:52] That gives you a sense of how well the 10th-order polynomial is doing.  
[00:02:57] So one procedure you could try, this turns out not to be the best procedure, but one  
[00:03:03] thing you could try is look at all of these JTests and see which one gives you the lowest  
[00:03:10] value.  
[00:03:11] And say you find that JTest for the fifth-order polynomial, for w5, b5, turns out to be the  
[00:03:20] lowest.  
[00:03:21] If that's the case, then you might decide that the fifth-order polynomial, d equals  
[00:03:26] 5, does best and choose that model for your application.  
[00:03:31] And if you want to estimate how well this model performs, one thing you could do, but  
[00:03:35] this turns out to be a slightly flawed procedure, is to report the tested error, JTest w5, b5.  
[00:03:44] The reason this procedure is flawed is JTest of w5, b5 is likely to be an optimistic estimate  
[00:03:52] of the generalization error.  
[00:03:54] In other words, it is likely to be lower than the actual generalization error.  
[00:04:00] And the reason is, in the procedure we talked about on this slide, we basically fit one  
[00:04:06] extra parameter, which is d, the degree of polynomial, and we chose this parameter using  
[00:04:13] the test set.  
[00:04:15] So on the previous slide, we saw that if you were to fit wb to the training data, then  
[00:04:22] the training data would be an overly optimistic estimate of generalization error.  
[00:04:28] And it turns out, too, that if you were to choose the parameter d using the test set,  
[00:04:33] then the test set, JTest, is now an overly optimistic, that is lower than the actual  
[00:04:38] estimate of the generalization error.  
[00:04:41] So the procedure on this particular slide is flawed, and I don't recommend using this.  
[00:04:46] Instead, if you want to automatically choose a model, such as decide what degree of polynomial  
[00:04:52] to use, here's how you modify the training and testing procedure in order to carry out  
[00:04:58] model selection, where by model selection, I mean choosing amongst different models,  
[00:05:04] such as these 10 different models that you might contemplate using for your machine learning  
[00:05:09] application.  
[00:05:11] The way we'll modify the procedure is, instead of splitting your data into just two subsets,  
[00:05:16] the training set and the test set, we're going to split your data into three different subsets,  
[00:05:21] which we're going to call the training set, the cross-validation set, and then also the  
[00:05:26] test set.  
[00:05:28] So using our example from before of these 10 training examples, we might split it into  
[00:05:36] putting 60% of the data into the training set, and so the notation we'll use for the  
[00:05:44] training set portion will be the same as before, except that now mtrain, the number of training  
[00:05:50] examples, will be 6.  
[00:05:52] And we might put 20% of the data into the cross-validation set, and the notation I'm  
[00:06:00] going to use is xcv of 1 comma ycv of 1 for the first cross-validation example.  
[00:06:07] So cv stands for cross-validation, all the way down to xcv of mcv and ycv of mcv, where  
[00:06:16] here mcv equals 2 in this example is the number of cross-validation examples.  
[00:06:22] And then finally, we have the test set, same as before.  
[00:06:26] So x1 through xmtest and y1 through ymtest, where mtest here is equal to 2.  
[00:06:36] This is the number of test examples.  
[00:06:38] We'll see on the next slide how to use the cross-validation set.  
[00:06:42] So the way we'll modify the procedure is you've already seen the training set and the test  
[00:06:49] set, and we're going to introduce a new subset of the data called the cross-validation set.  
[00:06:56] The name cross-validation refers to that this is an extra data set that we're going to use  
[00:07:02] to check or cross-check the validity or really the accuracy of different models.  
[00:07:08] I don't think it's a great name, but that is what people in machine learning have gotten  
[00:07:13] to call this extra data set.  
[00:07:15] You may also hear people call this the validation set for short.  
[00:07:19] It's just fewer syllables than cross-validation.  
[00:07:22] Or in some applications, people also call this the development set.  
[00:07:26] It means basically the same thing.  
[00:07:28] Or for short, sometimes you hear people call this the dev set.  
[00:07:32] But all of these terms mean the same thing as cross-validation set.  
[00:07:36] I personally use the term dev set the most often because it's the shortest, fastest way  
[00:07:42] to say it, but cross-validation is probably used a little bit more often by machine learning practitioners.  
[00:07:48] So onto these three subsets of the data, training set, cross-validation set, and test set,  
[00:07:54] you can then compute the training error, the cross-validation error, and the test error  
[00:07:59] using these three formulas.  
[00:08:02] Whereas usual, none of these terms include the regularization term that is included in  
[00:08:06] the training objective.  
[00:08:08] And this new term in the middle, the cross-validation error, is just the average over your MCV cross-validation  
[00:08:14] examples of the average, say, squared error.  
[00:08:18] And this term, in addition to being called cross-validation error, is also commonly called  
[00:08:25] the validation error for short or even the development set error or the dev error.  
[00:08:30] Armed with these three measures of learning algorithm performance, this is how you can  
[00:08:36] then go about carrying out model selection.  
[00:08:40] You can, with the 10 models, same as earlier on this slide, with D equals 1, D equals 2,  
[00:08:47] all the way up to a 10th degree or the 10th order polynomial, you can then fit the parameters  
[00:08:54] W1, B1, but instead of evaluating this on your test set, you would instead evaluate  
[00:09:01] these parameters on your cross-validation set and compute JCV of W1, B1, and similarly  
[00:09:08] for the second model, you get JCV of W2, B2, and all the way down to JCV of W10, B10.  
[00:09:18] Then, in order to choose a model, you would look at which model has the lowest cross-validation  
[00:09:27] error. And concretely, let's say that JCV of W4, B4 is lowest, then what that means  
[00:09:36] is you would pick this fourth order polynomial as the model you will use for this application.  
[00:09:42] Finally, if you want to report out an estimate of the generalization error of how well this  
[00:09:48] model will do on new data, you would do so using that third subset of your data, the  
[00:09:55] test set, and you report out JTest of W4, B4. And you notice that throughout this entire  
[00:10:02] procedure, you had fit these parameters using the training set, you then chose the parameter  
[00:10:09] D or chose the degree of polynomial using the cross-validation set, and so up until  
[00:10:15] this point, you have not fit any parameters, either W or B or D, to the test set. And that's  
[00:10:21] why JTest in this example will be a fair estimate of the generalization error of this  
[00:10:28] model that has parameters W4, B4. So this gives a better procedure for model selection  
[00:10:37] and it lets you automatically make a decision like what order polynomial to choose for your  
[00:10:43] linear regression model. This model selection procedure also works for choosing among other  
[00:10:49] types of models. For example, choosing a neural network architecture. If you are fitting a  
[00:10:55] model for handwritten digit recognition, you might consider three models like these, maybe  
[00:11:01] even a larger set of models than just three, but here are a few different neural networks,  
[00:11:06] small, somewhat larger, and then even larger. To help you decide how many layers should  
[00:11:13] your neural network have and how many hidden units per layer should you have, you can then  
[00:11:18] train all three of these models and end up with parameters W1, B1 for the first model,  
[00:11:27] W2, B2 for the second model, and W3, B3 for the third model. And you can then evaluate  
[00:11:35] the neural network's performance using JCV, using your cross-validation set. And since  
[00:11:42] this is a classification problem, JCV, the most common choice, would be to compute this  
[00:11:48] as a fraction of cross-validation examples that the algorithm has misclassified. And  
[00:11:54] you would compute this using all three models and then pick the model with the lowest cross-validation  
[00:12:02] error. So if, in this example, this has the lowest cross-validation error, you would then  
[00:12:09] pick the second neural network and use parameters trained on this model. And finally, if you  
[00:12:17] want to report out an estimate of the generalization error, you would then use the test set to  
[00:12:23] estimate how well the neural network that you just chose will do. So it's considered  
[00:12:28] best practice in machine learning that if you have to make decisions about your model,  
[00:12:34] such as fitting parameters or choosing the model architecture, such as neural network  
[00:12:38] architecture or degree of polynomial, if you're fitting linear regression, to make  
[00:12:43] all those decisions only using your training set and your cross-validation set, and to  
[00:12:49] not look at the test set at all while you're still making decisions regarding your learning  
[00:12:54] algorithm. And it's only after you've come up with one model, that's your final model,  
[00:12:59] to only then evaluate it on the test set. And because you haven't made any decisions  
[00:13:05] using the test set, that ensures that your test set is a fair and not overly optimistic  
[00:13:11] estimate of how well your model will generalize to new data. So that's model selection. And  
[00:13:17] this is actually a very widely used procedure. I use this all the time to automatically choose  
[00:13:24] what model to use for a given machine learning application. Now, earlier this week, I mentioned  
[00:13:30] running diagnostics to decide how to improve the performance of a learning algorithm. Now  
[00:13:36] that you have a way to evaluate learning algorithms and even automatically choose a model, let's  
[00:13:41] dive more deeply into examples of some diagnostics. The most powerful diagnostic that I know of  
[00:13:48] and that I use for a lot of machine learning applications is one called bias and variance.  
[00:13:53] Let's take a look at what that means in the next video.
