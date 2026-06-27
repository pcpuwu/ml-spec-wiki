# PCA Algorithm — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](pca-algorithm.md)

---

[00:00:02] So, how does PCA work? If you have a dataset with two features, X1 and X2, so initially  
[00:00:10] your data is plotted or represented using axes X1 and X2, but you want to replace these  
[00:00:18] two features with just one feature. How can you choose a new axis, let's call it the  
[00:00:23] Z-axis, that is somehow a good way, a good feature for capturing or for representing  
[00:00:29] the data. Let's take a look at how PCA does this. Here's a dataset with five training  
[00:00:37] examples. Remember, this is an unsupervised learning algorithm, so we just have X1 and  
[00:00:44] X2, there is no Y, there's no label Y. An example here like this may have coordinates  
[00:00:52] X1 equals 10 and X2 equals 8. So, if we don't want to use the X1, X2 axes, how can we pick  
[00:01:08] some different axes with which to capture what's in the data or with which to represent  
[00:01:14] the data. One note on pre-processing, before applying the next few steps of PCA,  
[00:01:21] the features should be first normalized to have zero mean. I've already done that here.  
[00:01:31] And if the features X1 and X2 take on very different scales, for example, if you remember  
[00:01:37] our housing example, if X1 was the size of a house in square feet and X2 was the number  
[00:01:45] of bedrooms, then X1 could be a thousand or a couple thousand, whereas X2 is a small number.  
[00:01:53] If the features take on very different scales, then you would first perform feature scaling  
[00:02:00] before applying the next few steps of PCA. But so, assuming the features have been normalized  
[00:02:07] to have zero mean, so subtract the mean from each feature, and then maybe apply feature scaling as  
[00:02:13] well so the ranges are not too far apart, what does PCA do next? To examine what PCA does,  
[00:02:21] let me remove the X1 and X2 axes so that we're just left with the five training examples.  
[00:02:28] And this dot here represents the origin, the position of zero on this plot still.  
[00:02:35] What we have to do now with PCA is pick one axis instead of the two axes that we had previously  
[00:02:43] with which to capture what's important about these five examples. If we were to choose  
[00:02:50] this axis to be our new Z axis, this is actually the same as the X1 axis just for this example.  
[00:02:58] Then what we're saying is that for this example, we're going to just capture this value,  
[00:03:04] this coordinate on the Z axis. And for the second example, we're going to capture this value,  
[00:03:11] and for this, we'll capture this value, and so on for all five examples.  
[00:03:18] So another way of saying this is that we're going to take each of these examples and project it  
[00:03:24] down to a point on the Z axis. And the word project refers to that you're taking this example  
[00:03:32] and bringing it to the Z axis using this line segment that's at a 90 degree angle to the Z  
[00:03:38] axis. And this little box here is used to denote that this line segment is at 90 degrees to the Z  
[00:03:45] axis. And the term project just means you're taking a point and finding this corresponding  
[00:03:52] point on the Z axis using this line segment that's at 90 degrees. So picking this direction as a Z  
[00:03:59] axis is not a bad choice, but there's some even better choices. This choice isn't too bad because  
[00:04:07] when you project your examples onto the Z axis, you still capture quite a lot of the spread of  
[00:04:13] the data. These five points here, they're pretty spread apart, so you're still capturing a lot of  
[00:04:19] the variation or a lot of the variance in the original dataset. And by that, I mean these five  
[00:04:26] points are quite spread apart, and so the variance or variation among these five points, the projections  
[00:04:35] of the data onto the Z axis is decently large. And what that means is we're still capturing quite a  
[00:04:43] lot of the information in the original five examples. Let's look at some other possible choices for the  
[00:04:51] axis Z. Here's another choice, and this is actually not a great choice. But if I were to choose this  
[00:04:56] as my Z axis, then if I take those same five examples and project them down to the Z axis,  
[00:05:06] I end up with these five points. And you notice that compared to the previous choice, these five  
[00:05:12] points are quite squished together. The amount they are different from each other, or their  
[00:05:17] variance or the variation is much less. And what this means is with this choice of Z,  
[00:05:24] you're capturing much less of the information in the original dataset because you've partially  
[00:05:31] squished all five examples together. Let's look at one last choice, which is if I choose this  
[00:05:39] to be the Z axis. This is actually a better choice than the previous two that we saw,  
[00:05:45] because if we take the data's projections onto the Z axis, we find that these dots over here,  
[00:05:53] they're actually quite far apart. And so we're capturing a lot of the variation, a lot of the  
[00:05:59] information in the original dataset, even though we're now using just one coordinate or one number  
[00:06:07] to represent or to capture each of the training examples instead of two numbers or two coordinates,  
[00:06:13] X1 and X2. In the PCA algorithm, this axis is called the principal component. It is the axis  
[00:06:23] that when you project the data onto it, you end up with the largest possible amount of variance.  
[00:06:30] And so if you were to reduce the data to one axis or the one feature, this principal component  
[00:06:37] is actually a good choice. And this is what PCA will do. If you want to reduce the data to one  
[00:06:44] number, to one dimension or to one feature, then we'll choose this principal component.  
[00:06:51] Let me show you a visualization of how different choices of the axes affect the projection.  
[00:06:58] Here we have 10 training examples. And as we slide this slider here, and you can play with  
[00:07:06] this in one of the optional labs yourself. As you slide the slider here, the angle of the Z axis  
[00:07:13] changes. And what you're seeing on the left is each of the examples projected by that short  
[00:07:20] line segment at 90 degrees to the Z axis. And here on the right is that projection of the data,  
[00:07:30] meaning the value of these 10 examples Z coordinate. And you notice that when I set  
[00:07:37] the axis to about here, the points are quite squished together. And so this possesses less  
[00:07:43] of the information of the original data. Whereas if I set the Z axis, say to this,  
[00:07:49] then these points vary much more. And so this is capturing much more of the information in  
[00:07:56] the original data set. And so that's why the principal component corresponds to setting the  
[00:08:02] Z axis to about here. And this is the choice that PCA would make if you asked it to reduce the data  
[00:08:09] to one number, to one dimension. So machine learning library like Scikit-learn, which you  
[00:08:15] hear more about in the next video, can help you automatically find the principal component.  
[00:08:21] But let's dig a little bit deeper into how that works. Here are my X1 and X2 axes. And here is  
[00:08:29] one training example with coordinates 2 on the X1 axis and 3 on the X2 axis.  
[00:08:38] And let's say that PCA has found this direction for the Z axis. What I'm drawing here,  
[00:08:47] this little arrow, is a length 1 vector pointing in the direction of this Z axis that PCA will  
[00:08:57] choose or that we have chosen. It turns out this length 1 vector is the vector 0.71, 0.71,  
[00:09:07] rounded off a bit. It's actually 0.707 and then a bunch of other digits.  
[00:09:12] So, given this example with coordinates 2, 3 on the X1, X2 axes, how do we project this example  
[00:09:22] onto the Z axis? It turns out the formula for doing so is to take a dot product between the vector  
[00:09:32] 2, 3 and this vector 0.71, 0.71. And if you do that, 2, 3 dot product with 0.71, 0.71 turns out  
[00:09:43] to be 2 times 0.71 plus 3 times 0.71, which is equal to 3.55. And what that means is the distance  
[00:09:55] from the origin of this point over here is 3.55, which means that if we were to represent or to  
[00:10:05] use one number to try to capture this example, that one number is 3.55. So far, we have talked  
[00:10:13] about how to use PCA to reduce data down to one dimension or down to one number. And we did so  
[00:10:22] by finding the principal components, also called sometimes the first principal component. And so,  
[00:10:29] in this example, we had found this as the first axis. It turns out that if you were to pick a  
[00:10:37] second axis, the second axis will always be at 90 degrees to the first axis. And if you were to  
[00:10:45] choose even the third axis, then the third axis will be at 90 degrees to the first and the second  
[00:10:51] axes. By the way, in mathematics, 90 degrees is sometimes called perpendicular. The term  
[00:10:58] perpendicular just means at 90 degrees. So mathematicians will sometimes say the second axis,  
[00:11:05] Z2, is at 90 degrees or is perpendicular to the first axis, Z1. And if you choose additional  
[00:11:12] axes, they're also at 90 degrees or perpendicular to Z1 and Z2 and to any other axes that PCA  
[00:11:19] will choose. And so, if you had 50 features and wanted to find three principal components, then  
[00:11:30] if that's the first axis, the second axis will be at 90 degrees to it. Then the third axis  
[00:11:37] will also be at 90 degrees to the first and the second axes. Now, one question I'm often asked is  
[00:11:45] how is PCA different from linear regression?  
[00:11:49] It turns out PCA is not linear regression. It's a totally different algorithm. Let me explain why.  
[00:11:56] With linear regression, which is a supervised learning algorithm, you have data X and Y.  
[00:12:03] So here's the data set where the horizontal axis is the feature X and the vertical axis here is the label Y.  
[00:12:12] And with linear regression, you're trying to fit a straight line so that the predicted value is as  
[00:12:20] close as possible to the ground-truth label Y. So in other words, you're trying to minimize the length  
[00:12:26] of these little line segments, which are in the vertical direction. They just align with the Y axis.  
[00:12:33] In contrast, in PCA, there is no ground-truth label Y, so you just have unlabeled data, X1 and X2.  
[00:12:41] And furthermore, you're not trying to fit a line to use X1 to predict X2. Instead, the algorithm  
[00:12:47] treats X1 and X2 equally, and we're trying to find this axis Z that it turns out will end up making  
[00:12:55] these little line segments small when you project the data onto Z. And so in linear regression,  
[00:13:05] there is one number, Y, which is given very special treatment, and we're always trying to  
[00:13:13] measure distance between the fitted line and Y, which is why these distances are measured  
[00:13:19] just in the direction of the Y axis. Whereas in PCA, you can have a lot of features, X1, X2,  
[00:13:28] maybe all the way up to X50, if you have 50 features. And all 50 features are treated equally,  
[00:13:34] and we're just trying to find an axis Z so that when the data is projected onto the axis Z,  
[00:13:40] using these line segments, that you still retain as much of the variance of the original data  
[00:13:47] as possible. I know that when I plot these things in two dimensions with just two features,  
[00:13:54] which is all I can draw on a flat computer monitor, these arrows look like maybe they're  
[00:14:00] a little bit similar, but when you have more than two features, which is most of the case,  
[00:14:06] the difference between linear regression and PCA and what the algorithms do is very large.  
[00:14:11] So these algorithms are used for totally different purposes and give you very different answers.  
[00:14:16] When linear regression is used to predict a target output Y, and PCA is trying to take a lot  
[00:14:23] of features and treat them all equally and reduce the number of axes needed to represent the data  
[00:14:29] well. And it turns out that maximizing the spread of these projections will correspond to minimizing  
[00:14:37] the distances of these line segments, the distances that the points have to move to be  
[00:14:42] projected down to Z. To illustrate the difference between linear regression and PCA in another way,  
[00:14:49] if you have a data set that looks like this, linear regression, all it can do is fit a line  
[00:14:54] that looks like that, whereas if your data set looks like this, PCA will choose this to be the  
[00:15:01] principal component. And so you should use linear regression if you're trying to predict the value  
[00:15:06] of Y, and you should use PCA if you're trying to reduce the number of features in your data set,  
[00:15:13] say to visualize it. Finally, before we wrap up this video, there's one more thing you could do  
[00:15:19] with PCA, which is recall this example, which was at coordinates 2, 3. We found that if you project  
[00:15:28] it to the Z axis, you end up with 3.55. One thing you could do is, if you have an example where Z  
[00:15:37] equals 3.55, given just this one number Z, 3.55, can we try to figure out what was the original  
[00:15:47] example? It turns out that there's a step in PCA called reconstruction, which is to try to go from  
[00:15:54] this one number, Z equals 3.55, back to the original two numbers, X1 and X2. And it turns  
[00:16:03] out you don't have enough information to get back X1 and X2 exactly, but you can try to approximate  
[00:16:10] it. And in particular, the formula is you would take this number, 3.55, which is Z,  
[00:16:18] and multiply it by that length one vector that we had just now, which is 0.71, 0.71.  
[00:16:24] And this ends up to be 2.52, 2.52, which is this point over here. So we can approximate the  
[00:16:35] original training example, which was at coordinates 2, 3, with this new point here, which is at 2.52,  
[00:16:42] 2.52. And the difference between the original point and the projected point is this little  
[00:16:48] line segment here. And in this case, it's not a bad approximation. 2.52, 2.52, it's not that far  
[00:16:56] from 2, 3. So with just one number, we could get a reasonable approximation to the coordinates of  
[00:17:04] the original training example. And this is called the reconstruction step of PCA.  
[00:17:11] To summarize, the PCA algorithm looks at your original data and chooses one or more new axes,  
[00:17:19] Z, or maybe Z1 and Z2, to represent your data. And by taking your original data set and projecting  
[00:17:27] it onto your new axis or axes, this gives you a smaller set of numbers that you can plot.  
[00:17:34] With which to visualize your data. You've seen the math. Let's now take a look at how you can  
[00:17:40] implement this in code. In the next video, we'll look at how you can use PCA yourself  
[00:17:46] using the Scikit-learn library. Let's go on to the next video.
