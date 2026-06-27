# Algorithm Refinement: Mini-Batch and Soft Updates — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](algorithm-refinement-mini-batch-and-soft-updates.md)

---

[00:00:02] In this video, we'll look at two further refinements  
[00:00:04] to the reinforcement learning algorithm you've seen.  
[00:00:07] The first idea is called using mini-batches.  
[00:00:11] This turns out to be an idea that can  
[00:00:13] both speed up your reinforcement learning algorithm,  
[00:00:16] and is also applicable to supervised learning,  
[00:00:19] and can help you speed up  
[00:00:20] your supervised learning algorithm as well,  
[00:00:22] like training a neural network or training  
[00:00:24] a linear regression or logistic regression model.  
[00:00:27] The second idea we'll look at is soft updates,  
[00:00:31] which it turns out will help  
[00:00:32] your reinforcement learning algorithm do  
[00:00:34] a better job to converge to a good solution.  
[00:00:37] Let's take a look at mini-batches and soft updates.  
[00:00:40] To understand mini-batches,  
[00:00:43] let's just look at supervised learning to start.  
[00:00:47] Here's a dataset of housing sizes and prices that you had  
[00:00:52] seen way back in the first course of  
[00:00:55] the specialization on using  
[00:00:56] linear regression to predict housing prices.  
[00:00:59] There, we had come up with  
[00:01:02] this cost function for the parameters w and b.  
[00:01:06] It was 1 over 2m sum of  
[00:01:09] the prediction minus the actual value y squared.  
[00:01:13] The gradient descent algorithm was to repeatedly update  
[00:01:17] w as w minus the learning rate alpha times  
[00:01:20] the partial derivative with respect to w of  
[00:01:23] the cost j of wb and similarly to update b as follows.  
[00:01:30] Let me just take this definition of j of wb and substitute it in here.  
[00:01:38] Now, when we looked at this example way back when  
[00:01:42] we're starting to talk about  
[00:01:44] linear regression and supervised learning,  
[00:01:46] the training set size m was pretty small.  
[00:01:49] I think we had 47 training examples.  
[00:01:51] But what if you have a very,  
[00:01:53] very large training set,  
[00:01:54] say m equals 100 million.  
[00:01:58] There are many countries,  
[00:02:00] including the United States with over 100 million housing units,  
[00:02:04] and so a national census will give  
[00:02:07] you a dataset that is this order of magnitude of size.  
[00:02:11] The problem with this algorithm when your dataset is this big is  
[00:02:15] that every single step of gradient descent  
[00:02:18] requires computing this average over 100 million examples,  
[00:02:25] and this turns out to be very slow.  
[00:02:28] Every step of gradient descent means you would  
[00:02:31] compute this sum or this average over 100 million examples.  
[00:02:35] Then you take one tiny gradient descent step and you go back and have to  
[00:02:40] scan over your entire 100 million example dataset  
[00:02:44] again to compute the derivative on the next step.  
[00:02:46] Then you take another tiny gradient descent step and so on and so on.  
[00:02:51] When the training set size is very large,  
[00:02:54] this gradient descent algorithm turns out to be quite slow.  
[00:02:59] The idea of mini-batch gradient descent is to  
[00:03:03] not use all 100 million training examples  
[00:03:06] on every single iteration through this one.  
[00:03:08] Instead, we may pick a smaller number.  
[00:03:10] Let me call it m prime equals,  
[00:03:13] say, 1,000 and on every step,  
[00:03:17] instead of using all 100 million examples,  
[00:03:21] we will pick some subset of 1,000 or m prime examples.  
[00:03:27] This inner term becomes 1 over 2 m prime sum over some m prime examples.  
[00:03:34] Now, each iteration through gradient descent  
[00:03:38] requires looking only at 1,000 rather than  
[00:03:41] 100 million examples and every step  
[00:03:44] takes much less time and just leads to a more efficient algorithm.  
[00:03:48] What mini-batch gradient descent does is on the first iteration through the algorithm,  
[00:03:53] maybe it looks at that subset of the data.  
[00:03:57] On the next iteration,  
[00:03:58] maybe it looks at that subset of the data and so on,  
[00:04:02] for the third iteration and so on,  
[00:04:05] so that every iteration is looking at just a subset of the data,  
[00:04:10] so each iteration runs much more quickly.  
[00:04:13] To see why this might be a reasonable algorithm,  
[00:04:16] here's the housing dataset.  
[00:04:19] If on the first iteration,  
[00:04:22] we were to look at just,  
[00:04:23] say, five examples, this is not the whole dataset,  
[00:04:27] but it's slightly representative of  
[00:04:29] the straight line you might want to fit in the end and so taking  
[00:04:32] one gradient descent step to make  
[00:04:34] the algorithm better fit these five examples is okay.  
[00:04:37] But then on the next iteration,  
[00:04:38] you take a different five examples like that shown here.  
[00:04:43] You take one gradient descent step using these five examples,  
[00:04:46] and on the next iteration,  
[00:04:47] you use a different five examples,  
[00:04:49] and so on and so forth.  
[00:04:51] You can scan through this list of examples from top to bottom.  
[00:04:56] That would be one way.  
[00:04:57] Another way would be if on every single iteration,  
[00:05:00] you just pick a totally different five examples to use.  
[00:05:05] You might remember with batch gradient descent,  
[00:05:08] if these are the contours of the cost function J,  
[00:05:12] then batch gradient descent would say,  
[00:05:14] start here and take a step,  
[00:05:17] take a step, take a step,  
[00:05:18] take a step, take a step.  
[00:05:20] Every step of gradient descent causes the parameters to reliably  
[00:05:25] get closer to the global minimum  
[00:05:27] of the cost function here in the middle.  
[00:05:29] In contrast, mini-batch gradient descent or  
[00:05:32] mini-batch learning algorithm will do something like this.  
[00:05:36] If you start here,  
[00:05:37] then the first iteration uses just five examples.  
[00:05:40] So it'll kind of head in the right direction,  
[00:05:42] but maybe not the best gradient descent direction.  
[00:05:46] Then the next iteration, it may do that,  
[00:05:48] the next iteration, that, and that,  
[00:05:51] that, and sometimes just by chance.  
[00:05:53] The five examples you chose may be an unlucky choice,  
[00:05:56] and even head in the wrong direction,  
[00:05:58] away from the global minimum,  
[00:06:00] and so on and so forth.  
[00:06:02] But on average, mini-batch gradient descent will tend towards the global minimum,  
[00:06:08] not reliably and somewhat noisily,  
[00:06:10] but every iteration is much more computationally inexpensive.  
[00:06:15] So mini-batch learning or mini-batch gradient descent turns out to be  
[00:06:20] a much faster algorithm when you have a very large training set.  
[00:06:24] So in fact, for supervised learning,  
[00:06:26] when you have a very large training set,  
[00:06:29] mini-batch learning or mini-batch gradient descent or  
[00:06:32] mini-batch version with other optimization algorithms like Adam,  
[00:06:37] is used more common than batch gradient descent.  
[00:06:40] Going back to our reinforcement learning algorithm,  
[00:06:44] this is the algorithm that we had seen previously.  
[00:06:48] So the mini-batch version of this would be,  
[00:06:52] even if you have stored the 10,000 most  
[00:06:55] recent tuples in the replay buffer,  
[00:07:00] what you might choose to do is not to use  
[00:07:02] all 10,000 every time you train a model.  
[00:07:06] Instead, what you might do is just take a subset.  
[00:07:09] So you might choose just 1,000 examples of  
[00:07:13] these S, A, R of S, S prime tuples,  
[00:07:18] and use it to create just 1,000 training examples to train the neural network.  
[00:07:24] It turns out that this will make each iteration of  
[00:07:28] training a model a little bit more noisy, but much faster.  
[00:07:31] This will overall tend to speed up this reinforcement learning algorithm.  
[00:07:36] So that's how mini-batching can speed up  
[00:07:39] both a supervised learning algorithm like linear regression,  
[00:07:43] as well as this reinforcement learning algorithm,  
[00:07:46] where you may use a mini-batch size of,  
[00:07:49] say, 1,000 examples,  
[00:07:51] even if you stored away 10,000 of these tuples in your replay buffer.  
[00:07:56] Finally, there's one other refinement to the algorithm that  
[00:07:59] can make it converge more reliably,  
[00:08:02] which is I have written out this step here of set Q equals Q new.  
[00:08:07] But it turns out that this can make a very abrupt change to Q.  
[00:08:13] If you train a new neural network, Q new,  
[00:08:16] maybe just by chance is not a very good neural network.  
[00:08:20] Maybe it's even a little bit worse than the old one.  
[00:08:22] Then you just overwrote your Q function with a potentially worse noisy neural network.  
[00:08:30] So the self-update method helps to prevent  
[00:08:34] Q new through just one unlucky step, getting worse.  
[00:08:39] In particular, the neural network Q will have some parameters W and B,  
[00:08:45] all the parameters for all the layers of the neural network.  
[00:08:48] When you train the new neural network,  
[00:08:52] you get some parameters W new and B new.  
[00:08:56] So in the original algorithm as described on that slide,  
[00:09:00] you would set W to be equal to W new and B equals B new.  
[00:09:08] That's what set Q equals Q new means.  
[00:09:10] With the self-update, what we do is instead set W equals  
[00:09:16] 0.01 times W new plus 0.99 times W.  
[00:09:23] In other words, we're going to make W to be 99 percent,  
[00:09:27] the old version of W plus one percent of the new version W new.  
[00:09:33] So this is called a self-update because whenever we train a new neural network,  
[00:09:38] W new, we're only going to accept a little bit of the new value.  
[00:09:42] Similarly, B equals 0.01 times B new plus 0.99 times B.  
[00:09:49] These numbers 0.01 and 0.99,  
[00:09:52] these are hyperparameters that you could set.  
[00:09:55] But it controls how aggressively you move W to what W new,  
[00:10:00] and these two numbers are expected to add up to one.  
[00:10:04] One extreme would be if you were to set W equals one times W new plus zero times W,  
[00:10:10] in which case, you're back to the original algorithm up here,  
[00:10:14] where you're just copying W new onto W.  
[00:10:17] But the self-update allows you to make a more gradual change to Q or to  
[00:10:23] the neural network parameters W and B that affect  
[00:10:26] your current guess for the Q function, Q of S A.  
[00:10:31] It turns out that using the self-update method  
[00:10:34] causes the reinforcement learning algorithm to converge more reliably.  
[00:10:39] It makes it less likely that the reinforcement learning algorithm will  
[00:10:42] oscillate or diverge or have other undesirable properties.  
[00:10:46] With these two final refinements to the algorithm,  
[00:10:49] mini-batching, which actually applies very well to supervise learning as well,  
[00:10:53] not just reinforcement learning,  
[00:10:55] as well as the idea of self-updates,  
[00:10:57] you should be able to get your learning algorithm to  
[00:10:59] work really well on the Lunar Lander.  
[00:11:02] The Lunar Lander is actually a decently complex,  
[00:11:05] decently challenging application,  
[00:11:07] and so that you can get it to work and land safely on the moon.  
[00:11:11] I think that's actually really cool,  
[00:11:13] and I hope you enjoy playing with the practice lab.  
[00:11:17] Now, we've talked a lot about reinforcement learning.  
[00:11:20] Before we wrap up, I'd like to share with you  
[00:11:23] my thoughts on the state of reinforcement learning,  
[00:11:25] so that as you go out and build applications  
[00:11:28] using different machine learning techniques,  
[00:11:30] be it supervised, unsupervised, reinforcement learning techniques,  
[00:11:33] that you have a framework for understanding where  
[00:11:36] reinforcement learning fits in to the world of machine learning today.  
[00:11:40] So let's go take a look at that in the next video.
