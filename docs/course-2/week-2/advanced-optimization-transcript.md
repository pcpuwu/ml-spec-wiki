# Advanced Optimization — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](advanced-optimization.md)

---

[00:00:02] Gradient descent is an optimization algorithm that is widely used in machine learning and  
[00:00:08] was the foundation of many algorithms, like linear regression and logistic regression  
[00:00:14] and early implementations of neural networks.  
[00:00:18] But it turns out that there are now some other optimization algorithms for minimizing the  
[00:00:23] cost function that are even better than gradient descent.  
[00:00:27] In this video, we'll take a look at an algorithm that can help you train your neural network  
[00:00:32] much faster than gradient descent.  
[00:00:34] Recall that this is the expression for one step of gradient descent.  
[00:00:40] The parameter wj is updated as wj minus the learning rate alpha times this partial derivative  
[00:00:47] term.  
[00:00:48] How can we make this work even better?  
[00:00:51] In this example, I've plotted the cost function j using a contour plot comprising these ellipses.  
[00:00:59] The minimum of this cost function is at the center of these ellipses down here.  
[00:01:05] If you were to start gradient descent down here, one step of gradient descent, if alpha  
[00:01:12] is small, may take you a little bit in that direction, then another step, then another  
[00:01:16] step, then another step, then another step.  
[00:01:19] You notice that every single step of gradient descent is pretty much going in the same direction.  
[00:01:25] If you see this to be the case, you might wonder, why don't we make alpha bigger?  
[00:01:31] Can we have an algorithm to automatically increase alpha to just make it take bigger  
[00:01:35] steps and get to the minimum faster?  
[00:01:39] There's an algorithm called the Adam algorithm that can do that.  
[00:01:44] If it sees that the learning rate is too small and we are just taking tiny little steps in  
[00:01:50] a similar direction over and over, we should just make the learning rate alpha bigger.  
[00:01:56] In contrast, here again, there's the same cost function.  
[00:02:00] If we were starting here and had a relatively big learning rate alpha, then maybe one step  
[00:02:06] of gradient descent takes us here, and a second step takes us here, third step, and a fourth  
[00:02:10] step, and a fifth step, and a sixth step.  
[00:02:14] If you see gradient descent doing this, it's oscillating back and forth, you'd be tempted  
[00:02:19] to say, well, why don't we make the learning rate smaller?  
[00:02:22] The Adam algorithm can also do that automatically, and with a smaller learning rate, you can  
[00:02:27] then take a more smooth path toward the minimum of the cost function.  
[00:02:33] Depending on how gradient descent is proceeding, sometimes you wish you had a bigger learning  
[00:02:38] rate alpha, and sometimes you wish you had a smaller learning rate alpha.  
[00:02:44] So the Adam algorithm can adjust the learning rate automatically.  
[00:02:48] Adam stands for Adaptive Moment Estimation, or ADAM, and don't worry too much about what  
[00:02:55] this name means, it's just what the authors had called this algorithm.  
[00:03:00] But interestingly, the Adam algorithm doesn't use a single global learning rate alpha, it  
[00:03:06] uses a different learning rate for every single parameter of your model.  
[00:03:10] So if you have parameters w1 through w10 as well as b, then it actually has 11 learning  
[00:03:17] rate parameters, alpha 1, alpha 2, all the way through alpha 10, for w1 through w10,  
[00:03:23] as well as, I'll call it alpha 11, for the parameter b.  
[00:03:29] And the intuition behind the Adam algorithm is, if a parameter, wj or b, seems to keep  
[00:03:36] on moving in roughly the same direction, this is what we saw on the first example on the  
[00:03:41] previous slide.  
[00:03:42] But if it seems to keep on moving in roughly the same direction, let's increase the learning  
[00:03:47] rate for that parameter, let's go faster in that direction.  
[00:03:50] Conversely, if a parameter keeps oscillating back and forth, this is what you saw in the  
[00:03:56] second example on the previous slide, then let's not have it keep on oscillating or  
[00:04:01] bouncing back and forth, let's reduce alpha j for that parameter a little bit.  
[00:04:08] The details of how Adam does this are a bit complicated and beyond the scope of this course,  
[00:04:14] but if you take some more advanced deep learning courses later, you may learn more about the  
[00:04:18] details of this Adam algorithm.  
[00:04:20] But in code, this is how you would implement it.  
[00:04:24] The model is exactly the same as before, and the way you compile the model is very  
[00:04:30] similar to what we had before, except that we now add one extra argument to the compile  
[00:04:36] function, which is that we specify that the optimizer you want to use is tf.keras.optimizers.theAdamOptimizer.  
[00:04:46] So the Adam optimization algorithm does need some default initial learning rate alpha,  
[00:04:53] and in this example, I've set that initial learning rate to be 10 to the negative 3.  
[00:05:00] But when you're using the Adam algorithm in practice, it's worth trying a few values for  
[00:05:04] this initial, this default global learning rate.  
[00:05:08] Try some larger and some smaller values to see what gives you the fastest learning performance.  
[00:05:13] Compared to the original gradient descent algorithm that you had learned in the previous  
[00:05:19] course though, the Adam algorithm, because it can adapt the learning rate a bit automatically,  
[00:05:25] it is more robust to the exact choice of learning rate that you pick, though it is still worth  
[00:05:31] tuning this parameter a little bit to see if you can get somewhat faster learning.  
[00:05:35] So that's it for the Adam optimization algorithm.  
[00:05:39] It typically works much faster than gradient descent, and it's become a de facto standard  
[00:05:45] in how practitioners train their neural networks.  
[00:05:48] So if you're trying to decide what learning algorithm to use, what optimization algorithm  
[00:05:52] to use to train your neural network, a safe choice would be to just use the Adam optimization  
[00:05:58] algorithm.  
[00:05:59] And most practitioners today will use Adam rather than the optional gradient descent  
[00:06:04] algorithm.  
[00:06:05] And with this, I hope that your learning algorithms will be able to learn much more quickly.  
[00:06:11] Now, in the next couple videos, I'd like to touch on some more advanced concepts for neural  
[00:06:18] networks.  
[00:06:19] And in particular, in the next video, let's take a look at some alternative layer types.
