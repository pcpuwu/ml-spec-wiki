# PCA in Code — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](pca-in-code.md)

---

[00:00:02] In this video, we'll take a look at how you can use the Scikit-learn library to implement PCA.  
[00:00:09] These are the main steps.  
[00:00:11] First, if your features take on very different ranges of values, you can perform preprocessing to scale the features to take on comparable ranges of values.  
[00:00:23] So if you were looking at the features of different countries, those features take on very different ranges of values.  
[00:00:32] GDP could be in trillions of dollars, whereas other features are less than 100.  
[00:00:38] So feature scaling in applications like that would be important to help PCA find a good choice of axes for you.  
[00:00:45] The next step, then, is to run the PCA algorithm to, quote, fit the data to obtain two or three new axes, Z1, Z2, and maybe Z3.  
[00:00:58] And here, I'm assuming you want two or three axes.  
[00:01:02] If you want to visualize the data in 2D or 3D, if you have an application where you want more than two or three axes,  
[00:01:10] the PCA implementation can also give you more than two or three axes.  
[00:01:15] It's just that it then be harder to visualize.  
[00:01:18] And in Scikit-learn, you would use the fit function or the fit method in order to do this.  
[00:01:24] The fit function in PCA automatically carries out mean normalization.  
[00:01:29] It subtracts out the mean of each feature.  
[00:01:32] And so you don't need to separately perform mean normalization.  
[00:01:37] And so after running the fit function, you would get the new axes, Z1, Z2, maybe Z3.  
[00:01:45] And in PCA, we also call these the principal components,  
[00:01:49] where Z1 is the first principal component, Z2 the second principal component, and Z3 the third principal component.  
[00:01:56] After that, I would recommend taking a look at how much each of these new axes  
[00:02:02] or each of these new principal components explains the variance in your data.  
[00:02:07] I'll show a concrete example of what this means on the next slide.  
[00:02:10] But this lets you get a sense of whether or not projecting the data onto these axes  
[00:02:17] help you to retain most of the variability or most of the information in the original data set.  
[00:02:24] And this is done using the explained variance ratio function.  
[00:02:28] And finally, you can transform, meaning just project the data onto the new axes,  
[00:02:33] onto the new principal components, which you would do with the transform method.  
[00:02:38] And then for each training example, you would just have two or three numbers.  
[00:02:42] You can then plot those two or three numbers to visualize your data.  
[00:02:47] In detail, this is what PCA in code looks like.  
[00:02:51] Here's a data set X with six examples.  
[00:02:56] So X equals numpy array, these six examples over here.  
[00:03:01] And to run PCA to reduce this data from two numbers, X1, X2, to just one number, Z,  
[00:03:10] you would run PCA and ask it to fit one principal component.  
[00:03:16] So N components here is equal to one.  
[00:03:19] And fit PCA to X.  
[00:03:22] PCA1 here is my notation for PCA with a single principal component, with a single axis.  
[00:03:31] And it turns out if you were to print out PCA1 dot explained variance ratio, this is 0.992.  
[00:03:40] And this tells you that in this example, when you choose one axis,  
[00:03:45] this captures 99.2% of the variability of the information in the original data set.  
[00:03:53] Finally, if you want to take each of these training examples and project it to a single number,  
[00:04:01] you would then call this, and this will output this array with six numbers corresponding to your six training examples.  
[00:04:10] So for example, the first training example, 1, 1, projected to the Z axis gives you this number, 1.383 and so on.  
[00:04:20] And so if you were to visualize this data set using just one dimension,  
[00:04:26] this would be the number used to represent the first example.  
[00:04:30] And the second example is projected to be this number and so on.  
[00:04:35] And I hope you take a look at the optional lab,  
[00:04:38] where you see that these six examples have been projected down onto this axis, onto this line,  
[00:04:44] which is now why all six examples now lie on this line that looks like this.  
[00:04:50] And the first training example, which was 1, 1, has been mapped to this example,  
[00:04:57] which has a distance of 1.38 from the origin.  
[00:05:01] So that's why this is 1.38.  
[00:05:05] Just one more quick example.  
[00:05:07] This data is two-dimensional data, and we reduced it to one dimension.  
[00:05:13] What if you were to compute two principal components,  
[00:05:18] so it starts with two dimensions and then also ends up with two dimensions.  
[00:05:22] This isn't that useful for visualization,  
[00:05:24] but it might help us understand better how PCA and how the code for PCA works.  
[00:05:30] So here's the same code, except that I've changed n components to 2.  
[00:05:35] So I'm going to ask the algorithm to find two principal components.  
[00:05:39] And if you do that, the PCA2 explained ratio becomes 0.992, 0.0008.  
[00:05:47] And what that means is that Z1, the first principal component,  
[00:05:51] still continues to explain 99.2% of the variance,  
[00:05:54] and Z2, the second principal component, or the second axis,  
[00:05:59] explains 0.8% of the variance.  
[00:06:02] And these two numbers together add up to 1,  
[00:06:05] because, well, this data is two-dimensional.  
[00:06:08] So the two axes, Z1 and Z2, together,  
[00:06:11] they explain 100% of the variance of the data.  
[00:06:14] And if you were to transform or project the data onto the Z1 and Z2 axes,  
[00:06:20] this is what you get.  
[00:06:21] Now, the first training example is mapped to these two numbers  
[00:06:27] corresponding to this projection onto Z1 and Z2.  
[00:06:32] And the second example, which is this,  
[00:06:35] projected onto Z1 and Z2, becomes these two numbers.  
[00:06:40] If you were to reconstruct the original data,  
[00:06:44] roughly this is Z1 and this is Z2.  
[00:06:48] Then the first training example, which was at 1, 1,  
[00:06:52] has a distance of 1.38 on the Z1 axis, hence this number,  
[00:06:58] and a distance here of 0.29, hence this distance on the Z2 axis.  
[00:07:05] And the reconstruction actually looks exactly the same as the original data,  
[00:07:10] because if you reduce, or not really reduce,  
[00:07:13] two-dimensional data to two-dimensional data,  
[00:07:15] there is no approximation,  
[00:07:18] and you can get back the original data set  
[00:07:20] with the projections onto Z1 and Z2.  
[00:07:24] So this is what the code to run PCA looks like.  
[00:07:28] I hope you take a look at the optional lab  
[00:07:30] where you can play with this more yourself.  
[00:07:32] And also try varying the parameters  
[00:07:34] and look at a specific example  
[00:07:37] to deepen your intuition about how PCA works.  
[00:07:40] Before wrapping up,  
[00:07:41] I'd like to share a little bit of advice for applying PCA.  
[00:07:45] PCA is frequently used for visualization  
[00:07:48] where you reduce data to two or three numbers  
[00:07:51] so you can plot it,  
[00:07:53] like you saw in an earlier video  
[00:07:55] with the data on different countries,  
[00:07:57] so you can visualize different countries.  
[00:07:59] There are some other applications of PCA  
[00:08:01] that you may occasionally hear about  
[00:08:04] that used to be more popular  
[00:08:06] maybe 10, 15, 20 years ago, but much less so now.  
[00:08:10] Another possible use of PCA is data compression.  
[00:08:13] For example, if you have a database  
[00:08:16] of lots of different cars  
[00:08:18] and you have 50 features per car,  
[00:08:21] but it's just taking up too much space on your database  
[00:08:24] or maybe transmitting 50 numbers over the internet,  
[00:08:27] you know, just takes too long,  
[00:08:30] then one thing you could do  
[00:08:32] is reduce these 50 features  
[00:08:34] to a smaller number of features,  
[00:08:36] and it could be 10 features,  
[00:08:39] with 10 axes or 10 principal components.  
[00:08:43] You can't visualize 10-dimensional data that easily,  
[00:08:46] but this is one-fifth of the storage space  
[00:08:49] or maybe one-fifth of the network transmission costs needed.  
[00:08:53] And so many years ago,  
[00:08:55] I saw PCA used for this application more often,  
[00:08:58] but today with modern storage  
[00:09:01] being able to store pretty large data sets  
[00:09:03] and modern networking,  
[00:09:05] able to transmit faster and more data than ever before,  
[00:09:09] I see this use much less often as an application of PCA.  
[00:09:13] One other application of PCA  
[00:09:15] that again used to be more common maybe 10 years ago,  
[00:09:18] 20 years ago, but much less so now,  
[00:09:20] is using it to speed up training of a supervised learning model,  
[00:09:24] where the idea is if you had 1,000 features  
[00:09:27] and having 1,000 features  
[00:09:30] made the supervised learning algorithm run too slowly,  
[00:09:32] maybe you can reduce it to 100 features  
[00:09:36] using PCA,  
[00:09:37] and then your data set is basically smaller  
[00:09:40] and your supervised learning algorithm may run faster.  
[00:09:43] This used to make a difference in the running time  
[00:09:46] of some of the older generations of learning algorithms,  
[00:09:49] such as if you've heard of a support vector machine,  
[00:09:52] this will speed up a support vector machine.  
[00:09:54] But it turns out with modern machine learning algorithms,  
[00:09:57] algorithms like deep learning,  
[00:09:59] this doesn't actually help that much.  
[00:10:02] And it's much more common  
[00:10:04] to just take the high-dimensional data set  
[00:10:07] and feed it into, say, your neural network,  
[00:10:10] rather than run PCA,  
[00:10:12] because PCA has some computational costs as well.  
[00:10:14] So you may hear about this  
[00:10:16] in some of the older research papers,  
[00:10:19] but I don't really see this done much anymore.  
[00:10:22] But the most common thing that I use PCA for today  
[00:10:25] is visualization, and I find it very useful  
[00:10:27] to reduce the dimension of data to visualize it.  
[00:10:30] So thanks for sticking with me  
[00:10:33] through the end of the optional videos for this week.  
[00:10:35] I hope you enjoyed learning about PCA  
[00:10:38] and that you find it useful  
[00:10:40] when you get a new data set  
[00:10:42] for reducing the dimension of your data set  
[00:10:44] to two or three dimensions  
[00:10:46] so you can visualize it  
[00:10:48] and hopefully gain new insights into your data sets.  
[00:10:51] It's helped me many times understand my own data sets,  
[00:10:54] and I hope that you find it equally useful as well.  
[00:10:58] Thanks for watching these videos,  
[00:11:00] and I look forward to seeing you next week.
