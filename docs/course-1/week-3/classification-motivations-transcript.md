# Motivations — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](classification-motivations.md)

---

[00:00:00] Welcome to the third week of this course.  
[00:00:03] By the end of this week,  
[00:00:04] you have completed the first course of this specialization.  
[00:00:07] So let's jump in.  
[00:00:09] Last week, you learned about linear regression,  
[00:00:12] which predicts a number.  
[00:00:14] This week, you learned about classification,  
[00:00:17] where your output variable Y can take on  
[00:00:19] only one of a small handful of possible values  
[00:00:22] instead of any number in an infinite range of numbers.  
[00:00:26] It turns out that linear regression is not a good algorithm  
[00:00:30] for classification problems.  
[00:00:32] Let's take a look at why,  
[00:00:34] and this will lead us into a different algorithm  
[00:00:37] called Logistic Regression,  
[00:00:39] which is one of the most popular  
[00:00:40] and most widely used learning algorithms today.  
[00:00:43] Here are some examples of classification problems.  
[00:00:46] Recall the example of trying to figure out  
[00:00:49] whether an email is spam.  
[00:00:52] So the answer you want to output is going to be either a no or a yes.  
[00:00:57] Another example would be figuring out if an online  
[00:01:00] financial transaction is fraudulent.  
[00:01:03] Fighting online financial fraud is something I once worked on,  
[00:01:08] and it was strangely exhilarating  
[00:01:10] because I knew there were forces out there trying to steal money,  
[00:01:14] and my team's job was to stop them.  
[00:01:16] So the problem is, given a financial transaction,  
[00:01:20] can your learning algorithm figure out,  
[00:01:22] is this transaction fraudulent?  
[00:01:25] Such as was this credit card stolen?  
[00:01:27] Another example we've touched on before was trying to  
[00:01:31] was trying to classify a tumor as malignant versus not.  
[00:01:36] In each of these problems, the variable that you want to predict  
[00:01:42] can only be one of two possible values no or yes.  
[00:01:46] This type of classification problem,  
[00:01:48] where there are only two possible outputs, is called binary classification,  
[00:01:53] where the word binary refers to there being only two possible classes,  
[00:01:58] or two possible categories.  
[00:02:01] In these principles,  
[00:02:02] I will use the terms class and category,  
[00:02:07] relatively interchangeably.  
[00:02:09] They mean basically the same thing.  
[00:02:11] By convention, we can refer it to these two  
[00:02:14] classes or categories in a few common ways.  
[00:02:17] We often designate classes as no or yes,  
[00:02:21] or sometimes equivalently,  
[00:02:24] false or true,  
[00:02:26] or very commonly using the numbers 0 or 1,  
[00:02:31] following the common  
[00:02:32] convention in computer science with zero denoting false and one denoting true.  
[00:02:37] I'm usually going to use the numbers 0 and 1 to represent the answer why,  
[00:02:44] because that will fit in most easily with the types of learning algorithms we want to implement.  
[00:02:50] But when we talk about it, we'll often say no or yes, or false or true, as well.  
[00:02:57] One of the terminology is commonly used is to call the false or 0 class, the negative class,  
[00:03:02] the negative class, and the true or the one class, the positive class.  
[00:03:09] For example, for spam classification, an email that is not spam may be referred to as a negative  
[00:03:15] example because the output to the question of is a spam.  
[00:03:20] The output is no or zero.  
[00:03:23] In contrast, an email that is spam might be referred to as a positive training example because  
[00:03:31] the answer to is it spam is a spam is.  
[00:03:33] is yes or true or one.  
[00:03:36] To be clear, negative and positive do not necessarily mean bad versus good or evil versus good.  
[00:03:43] It's just that negative and positive examples are used to convey the concepts of absence  
[00:03:47] or zero or false versus the presence or true or one of something you might be looking for,  
[00:03:54] such as the absence or presence of the spaminess or the spaminess or the spam property of an email,  
[00:04:00] or the absence of presence of fraudulent activity  
[00:04:03] or absence of presence of malignancy in a tumor.  
[00:04:07] Between non-spam and spam emails, which one you call false or zero and which one you call true or one is a little bit arbitrary.  
[00:04:17] Often, either choice could work.  
[00:04:20] So a different engineer might actually swap it around and have the positive class be the presence of a good email,  
[00:04:27] or the positive class be the presence of a real financial transaction or a healthy patient.  
[00:04:34] So how do you build a classification algorithm?  
[00:04:38] Here's the example of a training set for classifying if a tumor is malignant.  
[00:04:43] A class 1 positive class, yes class, or benign, class 0 or negative class.  
[00:04:51] I plotted both the tumor size on the horizontal axis as well as the label Y on the vertical axis.  
[00:04:58] By the way, in week one, when we first talked about classification, this is how we previous  
[00:05:04] visualized it on the number line, except that now we're calling the classes 0 and 1 and  
[00:05:10] and plotting them on the vertical axis.  
[00:05:14] Now, one thing you could try on this training set is to apply the algorithm you already know,  
[00:05:20] linear regression, and try to fit a straight line to the data.  
[00:05:24] If you do that, maybe the straight line looks like this, right?  
[00:05:28] And that's your f of x.  
[00:05:31] Line predicts not just the values 0 and 1,  
[00:05:34] 0 and 1, but all numbers between 0 and 1, or even less than 0 or greater than 1.  
[00:05:41] But here, we want to predict categories.  
[00:05:45] One thing you could try is to pick a threshold of, say, 0.5,  
[00:05:51] so that if the model outputs the value below 0.5,  
[00:05:55] then you predict y equals 0 or not malignant,  
[00:06:00] and if the model outputs the number equal to or greater than 0,  
[00:06:03] 2 or greater than 0.5, then predict y equals 1 or malignant.  
[00:06:09] Notice that this threshold value 0.5 intersects the best fit straight line at this point.  
[00:06:18] So if you draw this vertical line here, everything to the left ends up with a prediction of y equals 0,  
[00:06:25] and everything on the right ends up with a prediction of y equals 1.  
[00:06:30] Now, for this particular data set, it looks like linear  
[00:06:35] could do something reasonable.  
[00:06:37] But now, let's see what happens if your data set has one more trading example.  
[00:06:42] This one, way over here on the right.  
[00:06:45] Let's also extend the horizontal axis.  
[00:06:48] Notice that this trading example shouldn't really change how you classify the data points.  
[00:06:54] This vertical dividing line that we drew just now still makes sense as the cutoff  
[00:06:59] where tumor smaller than this should be classified as 0,  
[00:07:03] and 2 is greater than this should be classified as 0,  
[00:07:04] greater than this should be classified as 1.  
[00:07:07] But once you've added this extra training example on the right,  
[00:07:10] the best fit line for linear regression will shift over like this,  
[00:07:15] and if you continue using the threshold of 0.5,  
[00:07:19] you now notice that everything to the left of this point  
[00:07:23] is predicted as 0, non-malignant,  
[00:07:26] and everything to the right of this point is predicted to be 1 or malignant.  
[00:07:31] This isn't what we want.  
[00:07:34] we want, because adding that example way to the right shouldn't change any of our conclusions  
[00:07:40] about how to classify malignant versus benign tumors.  
[00:07:44] But if you try to do this with linear aggression, adding this one example, which feels like  
[00:07:50] it shouldn't be changing anything, it ends up with us learning a much worse function for this  
[00:07:55] classification problem.  
[00:07:57] Clearly, when a tumor is large, we want the algorithm to classify it as malignant.  
[00:08:02] So what we just saw,  
[00:08:05] was linear regression causes the best fit line when we added one more example to the right  
[00:08:11] to shift over, and thus the dividing line also called the decision boundary to shift over to the right.  
[00:08:21] You learn more about the decision boundary in the next video.  
[00:08:25] You also learn about an algorithm called logistic regression,  
[00:08:29] where the output value of the outcome will always be between 0 and 1, and  
[00:08:35] and the algorithm will avoid these problems that we're seeing on the slide.  
[00:08:39] By the way, one thing confusing about the name, Logistic Regression,  
[00:08:43] is that even though it has the word regression in it, it's actually used for classification.  
[00:08:49] Don't be confused by the name, which was given for historical reasons.  
[00:08:53] It's actually used to solve binary classification problems where the output label Y is either  
[00:08:58] 0 or 1. In the upcoming optional lab, you also get to take a look at what happens when  
[00:09:05] you try to use linear regression for classification.  
[00:09:10] Sometimes you get lucky and it may work, but often it will not work well,  
[00:09:16] which is why I don't use linear regression myself for classification.  
[00:09:21] In the optional lab, you see an interactive plot that attempts to classify between two  
[00:09:26] categories and you hopefully notice how this often doesn't work very well,  
[00:09:32] which is okay because that motivates the need for a different model to do classification.  
[00:09:36] toss. So please check out this optional lab, and after that, we're going to the next video  
[00:09:43] to look at logistic regression for classification.
