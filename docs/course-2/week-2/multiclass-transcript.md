# Multiclass Classification — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](multiclass.md)

---

[00:00:02] Multi-class classification refers to classification problems where you can have more than just two possible output labels, so not just 0 or 1.  
[00:00:13] Let's take a look at what that means.  
[00:00:15] For the handwritten digit classification problems we've looked at so far, we were just trying to distinguish between the handwritten digits 0 and 1.  
[00:00:25] But if you're trying to read postal codes or zip codes on an envelope, well, there are actually 10 possible digits you might want to recognize.  
[00:00:35] Or, alternatively, in the first course, you saw the example if you're trying to classify whether patients may have any of 3 or 5 different possible diseases.  
[00:00:49] That, too, would be a multi-class classification problem.  
[00:00:52] Or, one thing I've worked on a lot is visual defect inspection of parts manufactured in a factory, where you might look at a picture of a pill that a pharmaceutical company has manufactured  
[00:01:07] and try to figure out does it have a scratch defect or discoloration defect or a chip defect.  
[00:01:14] And this would, again, be multiple classes or multiple different types of defects that you could classify this pill as having.  
[00:01:23] So a multi-class classification problem is still a classification problem in that Y can take on only a small number of discrete categories.  
[00:01:33] It's not any number, but now Y can take on more than just two possible values.  
[00:01:39] So, whereas previously, for binary classification, you may have had a dataset like this with features X1 and X2,  
[00:01:48] in which case logistic regression would fit a model to estimate what's the probability of Y being 1 given the features X,  
[00:01:58] because Y was either 0 or 1.  
[00:02:01] With multi-class classification problems, you would instead have a dataset that maybe looks like this,  
[00:02:07] where we have four classes, where the O's represent one class, the X's represent another class, the triangles represent a third class, and the squares represent a fourth class.  
[00:02:20] And instead of just estimating the chance of Y being equal to 1, we'll now want to estimate what's the chance that Y is equal to 1,  
[00:02:27] or what's the chance that Y is equal to 2, or what's the chance that Y is equal to 3, or the chance of Y being equal to 4.  
[00:02:38] And it turns out that the algorithm you learn about in the next video can learn a decision boundary that maybe looks like this,  
[00:02:46] that divides the space X1 and X2 into four categories rather than just two categories.  
[00:02:54] So, that's the definition of the multi-class classification problem.  
[00:02:59] In the next video, we'll look at the softmax regression algorithm, which is a generalization of the logistic regression algorithm.  
[00:03:07] And using that, you'll be able to carry out multi-class classification problems.  
[00:03:13] And after that, we'll take softmax regression and fit it into a new neural network,  
[00:03:19] so that you'll also be able to train a neural network to carry out multi-class classification problems.  
[00:03:25] Let's go on to the next video.
