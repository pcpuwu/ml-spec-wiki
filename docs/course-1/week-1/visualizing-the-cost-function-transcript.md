# Visualizing the Cost Function — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](visualizing-the-cost-function.md)

---

[00:00:01] In the last video, you saw one visualization of the cost function J of W or J of WB.  
[00:00:07] Let's look at some further, richer visualizations so that you can get an even better intuition  
[00:00:13] about what the cost function is doing. Here is what we've seen so far. There's the model,  
[00:00:20] the models parameters W and B, the cost function J of W and B, as well as the goal of linear regression,  
[00:00:28] which is to minimize the cost function J of W&B over parameters W&B.  
[00:00:35] In the last video, we had temporarily set B to zero in order to simplify the visualizations.  
[00:00:42] But now, let's go back to the original model with both parameters,  
[00:00:46] W and B, without setting B to be equal to 0.  
[00:00:50] Same as last time, we want to get a visual understanding of the model function,  
[00:00:55] f of x, shown here on the left,  
[00:00:58] and how it relates to the cost function J of WB, shown here on the right.  
[00:01:06] Here's the training set of house sizes and prices.  
[00:01:10] Let's say you pick one possible function of x, like this one.  
[00:01:15] Here, I've set W to 0.06 and B to 50.  
[00:01:20] So f of x is 0.06 times x plus 50.  
[00:01:25] Note that this is not a particularly good model for this training set.  
[00:01:28] is actually a pretty bad model that seems to consistently underestimate housing prices.  
[00:01:35] Given these values for W and B, let's look at what the cost function J of W and B may look like.  
[00:01:42] Recall what we saw last time was when you had only W because we temporarily set B to zero  
[00:01:50] to simplify things. Back then, we had come up with a plot of the cost function that looked like this  
[00:01:56] as a function of W only. So when we had only one parameter W, the cost function had this  
[00:02:05] U-shaped curve, shaped a bit like a soup bowl. That sounds delicious. Now, in this housing price  
[00:02:13] example that we have on this slide, we have two parameters, W and B, and so the plot becomes  
[00:02:21] a little more complex. It turns out that the cost function  
[00:02:27] also has a similar shape, like a soup bowl, except in three dimensions instead of two.  
[00:02:34] In fact, depending on your training set, the cost function will look something like this.  
[00:02:40] To me, this looks like a soup bowl, maybe because I'm a little bit hungry.  
[00:02:45] Or maybe to you, it looks like a curved dinner plate or a hammock. Actually, that sounds relaxing too,  
[00:02:52] and there's your coconut drink. Maybe when you're done with this course, you should treat  
[00:02:58] yourself to vacation and relax in the hammock like this. What you see here is a 3D surface plot  
[00:03:04] where the axes are labeled W and B. So as you vary W and B, which are the two parameters of the  
[00:03:12] model, you get different values for the cost function J of W and B. This is a lot like the  
[00:03:20] U-shaped curve you saw in the last video, except instead of having one parameter, W as input into J,  
[00:03:27] you now have two parameters, W and B, as inputs into this super bowl or this hammock-shaped  
[00:03:34] function J. And I just want to point out that any single point on this surface represents a particular  
[00:03:40] choice of W and B. For example, if W was minus 10 and B was minus 15, then the height of the  
[00:03:51] surface above this point is the value of J when W is minus 10 and  
[00:03:57] and B is minus 15. Now, in order to look even more closely at specific points,  
[00:04:04] there's another way of plotting the cost function J that would be useful for visualization,  
[00:04:09] which is, rather than using these LiD surface plots, I'd like to take this exact same function  
[00:04:16] J, so I'm not changing the function J at all, and plot it using something called a contour  
[00:04:22] plot. And if you've ever seen a top of graphical map showing how high different mounted,  
[00:04:27] are. The contours in the topographical map are basically horizontal slices of the landscape  
[00:04:34] of, say, a mountain. This image is of Mount Fuji in Japan. I still remember my family visiting  
[00:04:42] Mount Fuji when I was a teenager. It was a beautiful site. And if you fly directly above the  
[00:04:49] mountain, that's what this contour map looks like. It shows all the points that are at the same height for different  
[00:04:57] heights. At the bottom of this slide is a 3D surface plot of the cost function J.  
[00:05:05] I know it doesn't look very bow-shaped, but it is actually a bow just very stretched out, which is  
[00:05:11] why it looks like that. In an optional lab that is shortly to follow, you'll be able to see this in  
[00:05:17] 3D and spin around the surface yourself, and it'll look more obviously bow-shaped there.  
[00:05:24] Next, here on the upper right is a contour plot of this exact same  
[00:05:28] cost function as that shown at the bottom. The two axes on this contour plot are B on the vertical  
[00:05:37] axis and w on the horizontal axis. What each of these ovals also called ellipsis shows is the  
[00:05:47] center points on the 3D surface which are at the exact same height. In other words, the set  
[00:05:53] points which have the same value for the cost function J. So to get the  
[00:05:58] the contour plot, you take the 3D surface at the bottom and you use a knife to slice it horizontally.  
[00:06:08] You take horizontal slices of that 3D surface and get all the points they're at the same height.  
[00:06:15] Therefore, each horizontal slice ends up being shown as one of these ellipses or one of these  
[00:06:23] ovals. So concretely, if you take that point and that point, and that point,  
[00:06:29] and that point, all of these three points have the same value for the cost function  
[00:06:37] j, even though they have different values for w and b. And in the figure on the upper left,  
[00:06:46] you see also that these three points correspond to different functions f, all three of  
[00:06:53] which are actually pretty bad for predicting housing prices in this case. Now, the bottom of the  
[00:07:00] where the cost function J is at a minimum is this point right here at the center of this  
[00:07:09] concentric ovals. If you haven't seen contour plots much before, I'd like you to imagine, if  
[00:07:16] you will, that you are flying high up above the bow in an airplane or in a rocket ship,  
[00:07:24] and you're looking straight down at it. So that is as if you set your computer monitor  
[00:07:30] flat on your desk facing up, and the bow shape is coming directly out of your screen  
[00:07:35] rising above your desk. Imagine that the bow shape grows out of your computer screen line flat,  
[00:07:42] like that, so that each of these ovals have the same height above your screen, and the minimum  
[00:07:50] of the bow is right down there in the center of the smallest oval. So it turns out that the  
[00:07:57] control plots are a convenient way to visualize the 3D cost function J, but in a way that's plotted  
[00:08:05] in just 2D. In this video, you saw how the 3D bow-shaped surface plot can also be visualized as a  
[00:08:14] contour plot. Using this visualization too, in the next video, let's visualize some specific  
[00:08:21] choices of W&B in a linear regression model, so you can see how these different choices affect the  
[00:08:28] the straight line you're fitting to the data. Let's go on to the next video.
