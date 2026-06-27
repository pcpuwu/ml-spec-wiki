# Reducing the Number of Features (PCA) — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](reducing-the-number-of-features.md)

---

[00:00:01] I hope you enjoyed the videos on how you can build your own recommender system.  
[00:00:06] Before we wrap up this week, in this and a few other optional videos,  
[00:00:10] I'd like to share with you an unsupervised learning algorithm called Principal Components Analysis.  
[00:00:17] This is an algorithm that is commonly used for visualization,  
[00:00:21] specifically if you have a dataset with a lot of features,  
[00:00:25] say 10 features, or 50 features, or even thousands of features.  
[00:00:29] Well, you can't plot a thousand-dimensional data,  
[00:00:32] so PCA, or Principal Components Analysis,  
[00:00:35] is an algorithm that lets you take data with a lot of features,  
[00:00:39] 50, a thousand, even more,  
[00:00:41] and reduce the number of features to two features, maybe three features,  
[00:00:45] so that you can plot it and visualize it.  
[00:00:48] It's commonly used by data scientists to visualize their data,  
[00:00:52] to figure out what might be going on.  
[00:00:54] Let's take a look at how PCA, Principal Components Analysis, works.  
[00:00:59] To describe PCA, I'm going to use as a running example,  
[00:01:03] if you have data from a collection of passenger cars,  
[00:01:08] and passenger cars can have a lot of features.  
[00:01:11] You may know the length of the car, or the width of the car,  
[00:01:17] maybe the diameter of the wheel,  
[00:01:20] or maybe the height of the car.  
[00:01:24] And many other features of cars.  
[00:01:27] And if you want to reduce the number of features so you can visualize it,  
[00:01:32] how can you use PCA to do so?  
[00:01:35] So, for the first example,  
[00:01:38] let's say you're given a data set with two features.  
[00:01:41] The feature X1 is the length of the car, like so.  
[00:01:48] And the second feature, X2, is the width of the car,  
[00:01:52] which is measured like so.  
[00:01:55] It turns out that in most countries,  
[00:01:58] because of constraints about the width of the road that cars drive on,  
[00:02:03] the width of the car, which has got to fit within the width of the road,  
[00:02:07] of a single lane, tends not to vary that much.  
[00:02:10] For example, in the United States,  
[00:02:13] most cars are, let's call it about 1.8 meters wide.  
[00:02:18] That's just under 6 feet.  
[00:02:21] So, if you were to have a collection of cars  
[00:02:24] and a data set of the length and width of the cars,  
[00:02:28] you would find that the data set might look like this,  
[00:02:32] where X1 varies quite a bit, because some cars are really long,  
[00:02:37] and X2 varies relatively little.  
[00:02:41] So, if you want to reduce the number of features,  
[00:02:45] well, one thing you could do is, let's just take X1,  
[00:02:48] because X2 varies relatively little from car to car.  
[00:02:52] So, it turns out that PCA is an algorithm that,  
[00:02:55] when applied to this data set,  
[00:02:57] will more or less automatically decide to just take X1.  
[00:03:03] But it can do much more than that.  
[00:03:05] Let's look at a second example,  
[00:03:08] where here X1 is again the length of the car,  
[00:03:12] and let's say that in this data set,  
[00:03:15] X2 is the diameter of the wheel.  
[00:03:19] The diameter of the wheel does vary a little bit.  
[00:03:22] So, if you were to plot the data, it might look like this.  
[00:03:26] But, again, if you were to want to simplify this data set to just one feature,  
[00:03:33] you might decide, let's just take X1 and forget X2.  
[00:03:36] And PCA, when applied to this data set,  
[00:03:39] will again more or less cause you to just take the feature X1.  
[00:03:44] In both examples we saw,  
[00:03:46] only one of the two features seemed to have a meaningful degree of variation.  
[00:03:52] Here's a more complex example.  
[00:03:55] Say the feature X1 is the length of the car,  
[00:03:58] so that varies quite a bit.  
[00:04:00] And the feature X2 here is the height of the car,  
[00:04:04] which also varies quite a bit.  
[00:04:06] Some cars are much taller than other cars.  
[00:04:08] If you were to plot the data,  
[00:04:10] you might get a data set that looks like this,  
[00:04:13] where some cars are bigger and they tend to be longer and taller,  
[00:04:17] and some cars are a little bit smaller.  
[00:04:19] They tend to be not as long and not as tall.  
[00:04:23] So, if you wanted to reduce the number of features,  
[00:04:27] what should you pick?  
[00:04:29] You don't want to pick just X1, the length, and ignore X2, the height.  
[00:04:33] And you also don't want to pick just X2, the height, and ignore X1, the length.  
[00:04:37] So, it seems as if both X1 and X2 have useful information.  
[00:04:42] In this graph, X1 and X2 are the two axes of this plot.  
[00:04:48] What if, instead of being limited to taking either the X1 axis or the X2 axis,  
[00:04:55] what if we had a third axis,  
[00:04:57] and I'm going to call this new axis the Z axis.  
[00:05:01] And to be clear, this is not sticking out of this diagram.  
[00:05:05] This is a combination of X1 and X2.  
[00:05:08] This is not a Z axis that's sticking out in the third dimension.  
[00:05:13] This Z axis lies flat within this plot.  
[00:05:18] But what if we had the Z axis,  
[00:05:20] which corresponds to something about the size of the car.  
[00:05:25] So, given a car like this one over here,  
[00:05:27] its coordinate, meaning the value on the X axis,  
[00:05:31] tells us the length of the car,  
[00:05:33] and the coordinate is just, you know, what is this distance.  
[00:05:36] Similarly, its coordinate, meaning what is this distance,  
[00:05:41] on the X2 axis tells us what is the height of the car.  
[00:05:45] If we're not going to use the Z axis instead,  
[00:05:48] as the one feature to capture what we know about this car,  
[00:05:53] then its coordinate on the Z axis, meaning this distance,  
[00:05:57] that tells us roughly what is the size of the car.  
[00:06:03] So, we'll formalize this in the next few videos,  
[00:06:07] but the idea of PCA is to find one or more new axes, such as Z,  
[00:06:15] so that when you measure your data's coordinates on the new axes,  
[00:06:20] you end up still with very useful information about the car,  
[00:06:25] but maybe now, instead of needing two numbers  
[00:06:29] corresponding to the coordinates on the X1 and X2 axes,  
[00:06:33] the length and height, you now need a few numbers.  
[00:06:36] In this case, only one number instead of two  
[00:06:39] to capture roughly the size of the car.  
[00:06:42] In the example we've used so far,  
[00:06:45] we were trying to reduce the data from two numbers, X1 and X2,  
[00:06:50] down to one number, the coordinate on the Z axis.  
[00:06:55] In practice, PCA is usually used to reduce a very large number of features,  
[00:07:01] say 10, 20, 50, even thousands of features,  
[00:07:05] down to maybe two or three features,  
[00:07:09] so that you can visualize the data in a two-dimensional or in a three-dimensional plot.  
[00:07:16] But for this video, because I can only draw on a two-dimensional screen,  
[00:07:22] I'm going to use mainly two or three-dimensional data sets as my examples.  
[00:07:28] Let's look at one more example.  
[00:07:31] In this visualization, we have a three-dimensional data set,  
[00:07:35] and notice that I can rotate the data set here so you can see it in 3D.  
[00:07:40] But notice if I rotate the data set like this,  
[00:07:44] well, most of this data, even though it's in 3D,  
[00:07:48] it actually lives on a very thin surface.  
[00:07:53] It's almost as if all the data lies on a pancake, on a two-dimensional pancake,  
[00:07:57] even though the pancake lives in this three-dimensional space.  
[00:08:01] So with PCA, what you can do is, instead of having three features,  
[00:08:06] X1, X2, X3, reduce it to two numbers,  
[00:08:12] which we're going to call Z1 and Z2.  
[00:08:16] And when you do that, you can then visualize the data on this Z1, Z2 axes.  
[00:08:23] And this becomes a convenient way to visualize this data  
[00:08:28] if you had to, say, print it on a piece of paper  
[00:08:31] and couldn't dynamically rotate it like you are seeing me do on the screen.  
[00:08:35] Here's one more example.  
[00:08:37] If you have data about the development status of many different countries,  
[00:08:43] you might have, for example, data about different countries' GDP,  
[00:08:48] and that's feature X1.  
[00:08:50] In addition, let's say we also have the per capita GDP  
[00:08:55] and also a measure of their Human Development Index.  
[00:09:00] The Human Development Index was developed to measure the overall progress  
[00:09:06] of how well people in a country might be doing  
[00:09:10] based on things like their lifespan and education and so on.  
[00:09:14] Or you might separately have a feature  
[00:09:17] corresponding to the life expectancy in different countries,  
[00:09:22] and so on and so forth.  
[00:09:24] If for each country you have 50 features,  
[00:09:28] how can you visualize this data?  
[00:09:30] Because you can't plot 50-dimensional data on a two-dimensional computer monitor.  
[00:09:36] What PCA lets you do is take these 50 features,  
[00:09:39] X1, X2, X3, X4, and so on,  
[00:09:43] and compress it down to two features,  
[00:09:47] which I'm going to call Z1 and Z2,  
[00:09:50] and you can then plot these different countries' values of Z1 and Z2.  
[00:09:56] And you might find, for example,  
[00:09:58] that Z1 loosely corresponds to how big is the country  
[00:10:03] and what is its total GDP.  
[00:10:05] Because larger countries tend to have a higher GDP,  
[00:10:09] because large countries with many people tend to have a larger economy.  
[00:10:14] And perhaps you find that Z2 corresponds roughly to the per person GDP,  
[00:10:23] or the amount of economic activity per person.  
[00:10:26] And so, for example, the United States,  
[00:10:29] which is a relatively large country,  
[00:10:32] and has relatively high per person economic activity,  
[00:10:36] may be somewhere up here, to the up and right of this plot.  
[00:10:40] And a country like Singapore, where I live many years as well,  
[00:10:44] is a smaller country, but has relatively high per person economic activity.  
[00:10:50] So take on a lower value on the Z1 axis,  
[00:10:54] but still a relatively high value on the Z2 axis.  
[00:10:58] Whereas a country like this would be maybe a smaller country  
[00:11:02] with lower per person economic activity.  
[00:11:04] Whereas a country like this may be a large country  
[00:11:07] with lower per person economic activity.  
[00:11:10] And a figure like this lets you take a large number of features, 50 features.  
[00:11:15] Sometimes we also say that's 50 dimensional data,  
[00:11:18] it just means we have 50 features, and reduce that to 2 features.  
[00:11:23] Or sometimes we say it's 2 dimensional data,  
[00:11:25] because you can then plot it on this 2 dimensional plot,  
[00:11:28] like you're seeing here.  
[00:11:30] Whenever I get a new data set,  
[00:11:32] one of the things I'll often want to do is to visualize the data,  
[00:11:36] since that helps me understand what the data looks like,  
[00:11:39] what do the countries look like,  
[00:11:41] or what do the cars seem like in this data set,  
[00:11:43] or whatever data you may be examining.  
[00:11:46] And you'll find also that visualizing a data set  
[00:11:49] will sometimes help you figure out something funny is going on in this data,  
[00:11:54] something unexpected is happening.  
[00:11:56] So PCA is a powerful algorithm for taking data with a lot of features,  
[00:12:00] with a lot of dimensions, or high dimensional data,  
[00:12:03] and reducing it to 2 or 3 features, to 2 or 3 dimensional data,  
[00:12:09] so you can plot it, and visualize it,  
[00:12:11] and better understand what's in your data.  
[00:12:14] So that's what the PCA algorithm can do for you.  
[00:12:17] In the next video, let's start to take a look  
[00:12:19] at how exactly the PCA algorithm works.
