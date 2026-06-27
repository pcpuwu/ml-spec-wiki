# Vectorization, Part 2 — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](vectorization-part-2.md)

---

[00:00:02] I remember when I first learned about vectorization,  
[00:00:05] I spent many hours on my computer taking an unvectorized version of an algorithm running it,  
[00:00:10] see how long I ran, and then running a vectorized version of the code and seeing how much faster that ran.  
[00:00:16] And I just spent hours playing with that, and it frankly blew my mind that the same algorithm,  
[00:00:21] vectorized, would run so much faster.  
[00:00:24] It felt almost like a magic trick to me.  
[00:00:26] In this video, let's figure out how this magic trick really works.  
[00:00:31] Let's take a deeper look at how a vectorized implementation may work on your computer behind the scenes.  
[00:00:37] Let's look at this four loop.  
[00:00:39] A four loop like this runs without vectorization.  
[00:00:43] So if j ranges from 0 to, say, 15, this piece of codes performs operations one after another.  
[00:00:52] On the first time step, which I'm going to write as time 0 or t0,  
[00:00:57] it first operates on the values at index 0.  
[00:01:01] At the next time step, it calculates values corresponding to index 1 and so on until the 15th step,  
[00:01:09] where it computes that.  
[00:01:11] In other words, it calculates these computations one step at the time, one step after another.  
[00:01:20] In contrast, this function in NUMPI is implemented in the computer hardware with vectorization.  
[00:01:27] So the computer can get all values of the vectors W and X,  
[00:01:32] And in a single step, it multiplies each pair of W and X with each other all at the same time in parallel.  
[00:01:42] Then after that, the computer takes these 16 numbers and uses specialized hardware to add them altogether very efficiently,  
[00:01:50] rather than needing to carry out distinct additions one after another to add up these 16 numbers.  
[00:01:58] This means that code with vectorization can perform calculations in much less time.  
[00:02:03] than code without vectorization.  
[00:02:06] And this matters more when you're running learning algorithms on large datasets,  
[00:02:10] or trying to train large models, which is often the case with machine learning.  
[00:02:15] So that's why being able to write vectorized implementations of learning algorithms  
[00:02:20] has been a key step to getting learning algorithms to run efficiently and therefore scale well  
[00:02:26] to the large datasets that many modern machine learning algorithms now have to operate on.  
[00:02:31] Now, let's take a look.  
[00:02:33] Let's take a look at a concrete example of how this helps with implementing multiple linear regression.  
[00:02:39] That is linear regression with multiple input features.  
[00:02:43] Say you have a problem with 16 features and 16 parameters, W1 through W16, in addition  
[00:02:52] to the parameter B.  
[00:02:55] You calculated 16 derivative terms for these 16 weights, and in code, maybe you stored the values  
[00:03:02] of W and D in two non-py arrays,  
[00:03:06] with D storing the values of the derivatives.  
[00:03:10] For this example, I'm just going to ignore the parameter B.  
[00:03:14] Now, you want to compute and update for each of these 16 parameters.  
[00:03:20] So WJ is updated to WJ minus the learning rate, say 0.1 times DJ for J from 1 through 16.  
[00:03:32] In code, without vectorization, you would be doing something like this.  
[00:03:40] Update W1 to be W1 minus the learning rate 0.1 times D1,  
[00:03:45] next update W2, similarly, and so on through W16, updated as W16 minus 0.1 times D16.  
[00:03:57] In codes without vectorization, you could use a full loop like this,  
[00:04:03] for J in range 016, that again goes from 0 to 15,  
[00:04:08] set WJ equals WJ minus 0.1 times DJ.  
[00:04:14] In contrast, with vectorization,  
[00:04:17] you can imagine the computer's parallel processing hardware like this.  
[00:04:21] It takes all 16 values in the vector W and subtracts in parallel  
[00:04:28] 0.1 times all 16 values in the vector D,  
[00:04:33] and assign all 16 calculations back to W,  
[00:04:37] all at the same time and all in one step.  
[00:04:40] In code, you can implement this as follows.  
[00:04:44] W is assigned to W minus 0.0.0 times D.  
[00:04:50] Behind the scenes, the computer takes these numpy arrays,  
[00:04:53] W and D, and uses parallel processing hardware  
[00:04:57] to carry out all 16 computations efficiently.  
[00:05:00] So using a vectorized implementation, you should get  
[00:05:03] get a much more efficient implementation of linear regression.  
[00:05:07] Maybe the speed difference won't be huge if you have 16 features,  
[00:05:12] but if you have thousands of features and perhaps very large training sets,  
[00:05:16] this type of vectorized implementation will make a huge difference in the running time  
[00:05:20] of your learning algorithm. It could be the difference between code finishing in one or two minutes  
[00:05:25] versus taking many, many hours to do the same thing. In the optional lab that follows  
[00:05:31] this video, you see an introduction to one of the most used  
[00:05:35] Python libraries in machine learning, which we've already touched on in this video called  
[00:05:39] NumPi. You see how to create vectors in code, and these vectors, or lists of numbers,  
[00:05:45] are called NumPi arrays, and you also see how to take the dot product of two vectors  
[00:05:52] using a NumPi function called dot. And you also get to see how vectorize code, such as using the dot function,  
[00:06:01] can run much faster than a full loop. In fact, you get to time this code yourself  
[00:06:06] and hopefully see it run much faster. This Optional Lab introduces a fair amount of new NumPy syntax,  
[00:06:14] so when you read through the Optional Lab, please don't feel like you have to understand all the code  
[00:06:19] right away, but you can save this notebook and use it as a reference to look at when you're  
[00:06:24] working with data stored in NumPy arrays. So, congrats on finishing this video on vectorization.  
[00:06:31] You've learned one of the most important and useful techniques in implementing  
[00:06:35] machine learning algorithms. In the next video, we'll put the math of multiple linear regression  
[00:06:41] together with vectorization, so that you're going to implement gradient descent for multiple  
[00:06:46] linear regression with vectorization. Let's go on to the next video.
