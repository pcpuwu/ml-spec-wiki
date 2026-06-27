# What is Clustering? — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](what-is-clustering.md)

---

[00:00:01] What is clustering?  
[00:00:03] A clustering algorithm looks at a number of data points and automatically finds data points that are related or similar to each other.  
[00:00:12] Let's take a look at what that means.  
[00:00:14] Let me contrast clustering, which is an unsupervised learning algorithm, with what you had previously seen with supervised learning for binary classification.  
[00:00:26] Given a data set like this, with features x1 and x2, with supervised learning, we had a training set with both the input features x as well as the labels y,  
[00:00:41] and we could plot a data set like this and fit, say, a logistic regression algorithm or a neural network to learn a decision boundary like that.  
[00:00:50] And in supervised learning, the data set included both the input x as well as the target output y.  
[00:00:58] In contrast, in unsupervised learning, you're given a data set like this, with just x, but not the labels or the target labels y.  
[00:01:09] And that's why when I plot the data set, it looks like this, with just dots rather than two clauses denoted by the x's and the o's.  
[00:01:19] Because we don't have target labels y, we're not able to tell the algorithm what is the, quote, right answer y that we wanted to predict.  
[00:01:30] Instead, we're going to ask the algorithm to find something interesting about the data, that is, to find some interesting structure about this data.  
[00:01:39] But the first unsupervised learning algorithm that you learn about is called a clustering algorithm, which looks for one particular type of structure in the data.  
[00:01:50] Namely, it will look at the data set like this and try to see if it can be grouped into clusters, meaning groups of points that are similar to each other.  
[00:02:01] So a clustering algorithm, in this case, might find that this data set comprises of data from two clusters, shown here.  
[00:02:10] Here are some applications of clustering.  
[00:02:12] In the first week of the first course, you heard me talk about grouping similar news articles together, like the story about pandas, or market segmentation,  
[00:02:24] where at deeplearning.ai, we discovered that there are many learners that come here because you may want to grow your skills, or develop your careers, or stay updated with AI and understand how it affects your field of work.  
[00:02:41] And we want to help everyone with any of these goals to learn about machine learning, or if you don't fall into one of these clusters, that's totally fine too.  
[00:02:53] And I hope deeplearning.ai and Stanford Online's materials will be useful to you as well.  
[00:02:59] Clustering has also been used to analyze DNA data, where you would look at the genetic expression data from different individuals and try to group them into people that exhibit similar traits.  
[00:03:15] I find astronomy and space and space exploration fascinating.  
[00:03:21] And so one application that I thought was very exciting was astronomers using clustering for astronomical data analysis to group bodies in space together for their own analysis of what's going on in space.  
[00:03:37] And so one of the applications I found fascinating was astronomers using clustering to group bodies together to figure out which ones form one galaxy or which one form coherent structures in space.  
[00:03:55] So clustering today is used for all of these applications and many, many more.  
[00:04:02] In the next video, let's take a look at the most commonly used clustering algorithm called the Key Means Algorithm, and let's take a look at how it works.
