# Softmax Regression — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](softmax.md)

---

[00:00:02] The softmax regression algorithm is a generalization of logistic regression,  
[00:00:07] which is a binary classification algorithm, to the multicost classification context.  
[00:00:13] Let's take a look at how it works.  
[00:00:15] Recall that logistic regression applies when Y can take on two possible output values, either 0 or 1.  
[00:00:26] The way it computes its output is,  
[00:00:29] you would first calculate Z equals W dot product with X plus B,  
[00:00:34] and then you would compute what I'm going to call here A equals G of Z,  
[00:00:39] which is a sigmoid function applied to Z.  
[00:00:43] We interpreted this as logistic regression's estimate of the probability of Y being equal to 1,  
[00:00:50] given those input features X.  
[00:00:53] Now, quick quiz question.  
[00:00:57] If the probability of Y equals 1 is 0.71,  
[00:01:02] then what is the probability that Y is equal to 0?  
[00:01:08] Well, the chance of Y being equal to 1 and the chance of Y being equal to 0,  
[00:01:12] they've got to add up to 1, right?  
[00:01:14] So if there's a 71% chance of it being 1,  
[00:01:17] there has to be a 29% or 0.29 chance of it being equal to 0.  
[00:01:24] So to embellish logistic regression a little bit,  
[00:01:27] in order to set us up for the generalization to softmax regression,  
[00:01:31] I'm going to think of logistic regression as actually computing two numbers.  
[00:01:36] First, A1, which is this quantity that we had previously,  
[00:01:41] of the chance of Y being equal to 1 given X.  
[00:01:45] And second, I'm going to think of logistic regression as also computing A2,  
[00:01:50] which is 1 minus this,  
[00:01:54] which is just the chance of Y being equal to 0,  
[00:01:59] given the input features X.  
[00:02:01] And so A1 and A2, of course, have to add up to 1.  
[00:02:06] Let's now generalize this to softmax regression.  
[00:02:10] And I'm going to do this with a concrete example  
[00:02:13] of when Y can take on four possible outputs.  
[00:02:17] So Y can take on the values 1, 2, 3, or 4.  
[00:02:22] Here's what softmax regression will do.  
[00:02:25] It will compute Z1 as W1 dot product of X plus B1,  
[00:02:32] and then Z2 equals W2 dot product of X plus B2,  
[00:02:36] and so on for Z3 and Z4.  
[00:02:40] Here, W1, W2, W3, W4, as well as B1, B2, B3, B4.  
[00:02:46] These are the parameters of softmax regression.  
[00:02:51] Next, here's the formula for softmax regression.  
[00:02:55] We'll compute A1 equals E to the Z1  
[00:03:00] divided by E to the Z1 plus E to the Z2 plus E to the Z3 plus E to the Z4.  
[00:03:06] And A1 will be interpreted as the algorithm's estimate  
[00:03:11] of the chance of Y being equal to 1, given the input features X.  
[00:03:16] Then the formula for softmax regression will compute  
[00:03:21] A2 equals E to the Z2 divided by the same denominator,  
[00:03:26] E to the Z1 plus E to the Z2 plus E to the Z3 plus E to the Z4,  
[00:03:30] and will interpret A2 as the algorithm's estimate  
[00:03:34] of the chance that Y is equal to 2, given the input features X.  
[00:03:38] And similarly for A3, where here the numerator is now  
[00:03:42] E to the Z3 divided by the same denominator.  
[00:03:45] That's the estimated chance of Y being equal to 3.  
[00:03:48] And similarly, A4 takes on this expression.  
[00:03:52] Whereas on the left, we wrote down the specification  
[00:03:57] for the logistic regression model,  
[00:03:59] these equations on the right are our specification  
[00:04:03] for the softmax regression model.  
[00:04:06] It has parameters W1 through W4 and B1 through B4.  
[00:04:12] And if you can learn appropriate choices  
[00:04:14] for all these parameters, then this gives you a way  
[00:04:17] of predicting what's the chance of Y being 1, 2, 3, or 4,  
[00:04:21] given a set of input features X.  
[00:04:25] Quick quiz. Let's say you run softmax regression  
[00:04:28] on a new input X, and you find that A1 is 0.30,  
[00:04:33] A2 is 0.20, A3 is 0.15.  
[00:04:40] What do you think A4 will be?  
[00:04:43] Why don't you take a look at this quiz  
[00:04:45] and see if you can figure out the right answer.  
[00:04:49] So you might have realized that because the chance of Y  
[00:04:53] taking on the values of 1, 2, 3, or 4,  
[00:04:56] they have to add up to 1.  
[00:04:58] A4, the chance of Y being equal to 4, has to be 0.35,  
[00:05:03] which is 1 minus 0.3 minus 0.2 minus 0.15.  
[00:05:07] So here I wrote down the formulas for softmax regression  
[00:05:12] in the case of 4 possible outputs,  
[00:05:14] and let's now write down the formula for the general case  
[00:05:19] for softmax regression.  
[00:05:21] In the general case, Y can take on N possible values,  
[00:05:25] so Y can be 1, 2, 3, and so on, up to N.  
[00:05:29] In that case, softmax regression will compute Zj  
[00:05:34] equals Wj dot product with X plus Bj,  
[00:05:38] where now the parameters of softmax regression  
[00:05:41] are W1, W2, through Wn, as well as B1, B2, through Bn.  
[00:05:49] And then finally, it will compute Aj equals e to the Zj  
[00:05:55] divided by sum from k equals 1 to N of e to the Z sub k.  
[00:06:02] Well, here I'm using another variable k to index the summation  
[00:06:07] because here j refers to a specific fixed number like j equals 1.  
[00:06:12] Aj is interpreted as the model's estimate that Y is equal to j  
[00:06:18] given the input feature is X.  
[00:06:20] And notice that by construction of this formula,  
[00:06:24] if you add up A1, A2, all the way through An,  
[00:06:27] these numbers always will end up adding up to 1.  
[00:06:30] So we'll specify how you would compute the softmax regression model.  
[00:06:36] And I won't prove it in this video,  
[00:06:38] but it turns out that if you apply softmax regression with N equals 2,  
[00:06:43] so there are only two possible output clauses,  
[00:06:46] then softmax regression ends up computing basically the same thing  
[00:06:51] as logistic regression.  
[00:06:53] The parameters end up being a little bit different,  
[00:06:55] but it ends up reducing to a logistic regression model.  
[00:06:58] But that's why the softmax regression model is a generalization of logistic regression.  
[00:07:03] Having defined how softmax regression computes its outputs,  
[00:07:08] let's now take a look at how to specify the cost function for softmax regression.  
[00:07:13] Recall for logistic regression, this is what we had.  
[00:07:17] We said Z is equal to this, and then I wrote earlier that A1 is G of Z,  
[00:07:24] it was interpreted as the probability that Y is equal to 1.  
[00:07:27] And we also wrote A2 is the probability that Y is equal to clause 0.  
[00:07:34] So previously we had written the loss of logistic regression as  
[00:07:39] negative Y log A1 minus 1 minus Y log 1 minus A1.  
[00:07:46] But 1 minus A1 is also equal to just A2,  
[00:07:52] because A2 is 1 minus A1 according to this expression over here.  
[00:07:58] So I can rewrite or simplify the loss for logistic regression a little bit  
[00:08:03] to be negative Y log A1 minus 1 minus Y log of A2.  
[00:08:11] And in other words, the loss if Y is equal to 1 is negative log A1.  
[00:08:19] And if Y is equal to 0, then the loss is negative log A2.  
[00:08:25] And then same as before, the cost function for all the parameters in the model  
[00:08:29] is the average loss, average over the entire training set.  
[00:08:33] So that was the cost function for logistic regression.  
[00:08:37] Let's write down the cost function that is conventionally used for softmax regression.  
[00:08:44] Recall that these are the equations we use for softmax regression.  
[00:08:49] The loss we're going to use for softmax regression is just this.  
[00:08:54] The loss for if the algorithm outputs A1 through AN,  
[00:09:01] and the ground truth label is Y,  
[00:09:05] is if Y equals 1, the loss is negative log A1.  
[00:09:10] So it's negative log of the probability that it thought Y was equal to 1.  
[00:09:16] Or if Y is equal to 2, then the loss I'm going to define as negative log A2.  
[00:09:23] So if Y is equal to 2, the loss of the algorithm on this example is  
[00:09:28] negative log of the probability it thought Y was equal to 2.  
[00:09:32] And so on all the way down to if Y is equal to N,  
[00:09:36] then the loss is negative log of AN.  
[00:09:40] And to illustrate what this is doing,  
[00:09:43] if Y is equal to J, then the loss is negative log of AJ.  
[00:09:51] And that's what this function looks like.  
[00:09:54] Negative log of AJ is a curve that looks like this.  
[00:09:59] And so if AJ was very close to 1,  
[00:10:03] then you'd be on this part of the curve and the loss would be very small.  
[00:10:07] But if it thought, say, AJ had only a 50% chance,  
[00:10:11] then the loss gets a little bit bigger.  
[00:10:13] And the smaller AJ is, the bigger the loss.  
[00:10:18] And so this incentivizes the algorithm to make AJ as large as possible,  
[00:10:24] as close to 1 as possible.  
[00:10:26] Because whatever the actual value Y was,  
[00:10:29] you want the algorithm to say, hopefully,  
[00:10:31] that the chance of Y being that value was pretty large.  
[00:10:34] Notice that in this loss function,  
[00:10:37] Y in each training example can take on only one value.  
[00:10:42] And so you end up computing this negative log of AJ  
[00:10:46] only for one value of AJ,  
[00:10:49] which is whatever was the actual value of Y equals J  
[00:10:52] in that particular training example.  
[00:10:54] For example, if Y was equal to 2,  
[00:10:56] you end up computing negative log of A2,  
[00:10:59] but not any of the other negative log of A1 or the other terms here.  
[00:11:03] So that's the form of the model,  
[00:11:05] as well as the cost function for softmax regression.  
[00:11:08] And if you were to train this model,  
[00:11:11] you can start to build multicost classification algorithms.  
[00:11:16] And what we'd like to do next is take this softmax regression model  
[00:11:20] and fit it into a neural network  
[00:11:22] so that you're able to do something even better,  
[00:11:25] which is to train a neural network for multicost classification.  
[00:11:29] Let's go do that in the next video.
