# Evaluating a Model — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](evaluating-a-model.md)

---

[00:00:01] Let's say you've trained a machine learning model.  
[00:00:04] How do you evaluate that model's performance?  
[00:00:06] You'll find that having a systematic way to evaluate performance will also help paint a clearer path for how to then improve its performance.  
[00:00:14] So let's take a look at how to evaluate a model.  
[00:00:17] Let's take the example of learning to predict housing prices as a function of the size.  
[00:00:24] Let's say you've trained a model to predict housing prices as a function of the size x.  
[00:00:31] And for the model, that is a fourth-order polynomial, so it features x, x-squared, x-cubed, and x to the fourth.  
[00:00:40] Because we'll fit a fourth-order polynomial to a training set with five data points, this fits the training data really well.  
[00:00:50] But we don't like this model very much, because even though the model fits the training data well,  
[00:00:57] we think it will fail to generalize to new examples that aren't in the training set.  
[00:01:03] So when you are predicting prices just a single feature of the size of the house,  
[00:01:09] you could plot the model like this, and we could see that the curve is very wiggly, so we know this probably isn't a good model.  
[00:01:17] But if you were fitting this model with even more features, say we had x1 the size of the house,  
[00:01:23] number of bedrooms, the number of floors of the house, also the age of the home in years,  
[00:01:28] then it becomes much harder to plot f, because f is now a function of x1 through x4.  
[00:01:36] And how do you plot a four-dimensional function?  
[00:01:43] So in order to tell if your model is doing well, especially for applications where you have more than one or two features,  
[00:01:50] which makes it difficult to plot f of x, we need some more systematic way to evaluate how well your model is doing.  
[00:01:58] Here's a technique that you can use.  
[00:02:01] If you have a training set, and this is a small training set with just ten examples listed here,  
[00:02:07] rather than taking all your data to train the parameters w and b of the model,  
[00:02:12] you can instead split the training set into two subsets.  
[00:02:16] I'm going to draw a line here, and let's put 70% of the data into the first part,  
[00:02:24] and I'm going to call that the training set.  
[00:02:27] And the second part of the data, let's say 30% of the data, I'm going to put into a test set.  
[00:02:35] And what we're going to do is train the model's parameters on the training set on this first 70% or so of the data,  
[00:02:42] and then we'll test its performance on this test set.  
[00:02:47] In notation, I'm going to use x1, y1, same as before, to denote the training examples through xm, ym,  
[00:03:02] except that now to make explicit.  
[00:03:06] So in this little example, we would have seven training examples,  
[00:03:10] and to introduce one new piece of notation, I'm going to use m subscript train.  
[00:03:17] m train is the number of training examples, which in this small data set is seven.  
[00:03:23] So the subscript train just emphasizes if we're looking at the training set portion of the data.  
[00:03:29] And for the test set, I'm going to use the notation x1, subscript test, comma, y1, subscript test,  
[00:03:38] to denote the first test example, and this goes all the way to xm test, subscript test, ym test, subscript test,  
[00:03:50] and m test is the number of test examples, which in this case is three.  
[00:03:56] And it's not uncommon to split your data set according to maybe a 70-30 split or 80-20 split,  
[00:04:04] with most of your data going into the training set and then a smaller fraction going into the test set.  
[00:04:10] So in order to train a model and evaluate it,  
[00:04:15] this is what it would look like if you're using linear regression with a squared error cost.  
[00:04:21] Start off by fitting the parameters by minimizing the cost function J of WB.  
[00:04:26] So this is a usual cost function, minimize over WB of this squared error cost plus regularization term,  
[00:04:36] lambda over 2m times sum of the WJ squared.  
[00:04:41] And then to tell how well this model is doing, you would compute J test of WB,  
[00:04:49] which is equal to the average error on the test set, and that's just equal to 1 over 2 times m test,  
[00:04:57] that's the number of test examples, and then of sum over all the examples from i equals 1  
[00:05:04] to the number of test examples of the squared error on each of the test examples, like so.  
[00:05:10] So it's a prediction on the i-th test example input minus the actual price of the house on the i-th test example squared.  
[00:05:22] And notice that the test error formula J test, it does not include that regularization term.  
[00:05:29] And this will give you a sense of how well your learning algorithm is doing.  
[00:05:35] One other quantity that's often useful to compute as well is the training error,  
[00:05:40] which is a measure of how well your learning algorithm is doing on the training set.  
[00:05:45] So let me define J train of WB to be equal to the average over the training set, 1 over 2m,  
[00:05:53] or 1 over 2m subscript train of sum over your training set of this squared error term.  
[00:06:00] And once again, this does not include the regularization term,  
[00:06:03] unlike the cost function that you were minimizing to fit the parameters.  
[00:06:08] So in a model like what we saw earlier in this video, J train of WB will be low,  
[00:06:16] because the average error on your training examples will be 0 or very close to 0.  
[00:06:23] So J train will be very close to 0.  
[00:06:26] But if you had a few additional examples in your test set that the algorithm had not trained on,  
[00:06:31] then those test examples might look like these.  
[00:06:36] And there's a large gap between what the algorithm is predicting as the estimated housing price  
[00:06:41] and the actual value of those housing prices.  
[00:06:44] And so J test will be high.  
[00:06:47] So seeing that J test is high on this model gives you a way to realize that  
[00:06:54] even though it does great on the training set,  
[00:06:56] it's actually not so good at generalizing to new examples,  
[00:07:00] to new data points that were not in the training set.  
[00:07:04] So that was regression with squared error cost.  
[00:07:08] Now let's take a look at how you'd apply this procedure to a classification problem.  
[00:07:12] For example, if you were classifying between handwritten digits that are either 0 or 1.  
[00:07:19] So same as before, you fit the parameters by minimizing the cost function to find the parameters WB.  
[00:07:25] For example, if you were training logistic regression,  
[00:07:28] then this would be the cost function J of WB,  
[00:07:32] where this is the usual logistic loss function,  
[00:07:37] and then plus also the regularization term.  
[00:07:41] And to compute the test error, J test is then the average over your test examples.  
[00:07:50] That's that 30% of your data that wasn't in the training set of the logistic loss on your test set.  
[00:07:58] And the training error, you can also compute using this formula.  
[00:08:03] It's the average logistic loss on your training data that the algorithm was using to minimize the cost function J of WB.  
[00:08:11] Well, what I describe here will work okay for figuring out if your learning algorithm is doing well,  
[00:08:18] by seeing how well it's doing in terms of test error.  
[00:08:21] When applying machine learning to classification problems,  
[00:08:24] there's actually one other definition of J test and J train that is maybe even more commonly used,  
[00:08:31] which is instead of using the logistic loss to compute the test error and the training error,  
[00:08:36] to instead measure what's the fraction of the test set and the fraction of the training set that the algorithm has misclassified.  
[00:08:45] So specifically, on the test set, you can have the algorithm make a prediction 1 or 0 on every test example.  
[00:08:56] So recall y hat, we would predict as 1 if f of x is greater than or equal to 0.5 and 0 if it's less than 0.5.  
[00:09:05] And you can then count up in the test set the fraction of examples where y hat is not equal to the actual ground truth label y in the test set.  
[00:09:17] So concretely, if you were classifying handwritten digits, 0 or 1, binary classification tasks,  
[00:09:24] then J test would be the fraction of that test set where 0 was classified as 1 and 1 classified as 0.  
[00:09:31] And similarly, J train is the fraction of the training set that has been misclassified.  
[00:09:37] Taking a data set and splitting it into a training set and a separate test set  
[00:09:42] gives you a way to systematically evaluate how well your learning algorithm is doing.  
[00:09:46] By computing both J test and J train, you can now measure how well it's doing on the test set and on the training set.  
[00:09:53] This procedure is one step to what you've been able to automatically choose one model to use for a given machine learning application.  
[00:10:02] For example, if you're trying to predict housing prices,  
[00:10:05] should you fit a straight line to your data or fit a second order polynomial or third order or fourth order polynomial?  
[00:10:11] It turns out that with one further refinement to the idea you saw in this video,  
[00:10:15] you'll be able to have an algorithm help you to automatically make that type of decision well.  
[00:10:20] Let's take a look at how to do that in the next video.
