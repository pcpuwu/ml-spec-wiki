# Vectorization, Part 1 — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](vectorization-part-1.md)

---

[00:00:02] In this video, you see a very useful idea called vectorization.  
[00:00:06] When you're implementing a learning algorithm,  
[00:00:09] using vectorization will both make your code shorter  
[00:00:12] and also make it run much more efficiently.  
[00:00:15] Learning how to write vectorized code will allow you to also take advantage  
[00:00:20] of modern numerical linear algebra libraries,  
[00:00:23] as well as maybe even GPU hardware, that stands for a graphics processor unit.  
[00:00:28] This is hardware, obviously designed to speed up computer graphics,  
[00:00:31] graphics on your computer, but turns out it can be used when you write vectorized code  
[00:00:35] to also help you execute your code much more quickly.  
[00:00:39] Let's look at a concrete example of what vectorization means.  
[00:00:43] Here's an example with parameters W and B, where W is a vector with three numbers,  
[00:00:50] and you also have a vector of features X with also three numbers.  
[00:00:56] So here, n is equal to three.  
[00:00:59] So notice that in linear algebra,  
[00:01:01] the index or the counting starts from 1,  
[00:01:05] and so the first value is substripped w1 and x1.  
[00:01:10] In Python code, you can define these variables,  
[00:01:14] WB and X, using arrays like this.  
[00:01:18] Here, I'm actually using a numerical linear algebra library in  
[00:01:22] Python called NumPy, which is by far the most widely used  
[00:01:26] numerical linear algebra library in Python and in machine learning.  
[00:01:31] Because in Python,  
[00:01:32] the indexing of arrays while counting in arrays starts from 0.  
[00:01:39] You would access the first value of W using w square bracket 0,  
[00:01:45] the second value using w square bracket 1, and the third using  
[00:01:50] w square bracket 2.  
[00:01:52] So the indexing here goes from 0, 1 to 2, rather than 1, 2 to 3.  
[00:02:00] Similarly, to access individual.  
[00:02:03] features of x, you would use x0, x1, and x2.  
[00:02:08] Many programming languages, including Python, start counting from 0 rather than 1.  
[00:02:14] Now, let's look at an implementation without vectorization for computing the model's prediction.  
[00:02:20] In code, it would look like this.  
[00:02:23] You take each parameter W and multiply it by its associated feature.  
[00:02:29] Now, you could write your code like this, but what if n is an is in?  
[00:02:34] in 3, but instead n is 100 or 100,000,  
[00:02:38] is both inefficient for you to code and inefficient for your computer to compute.  
[00:02:43] So here's another way, still without using vectorization, but using a full loop.  
[00:02:49] In math, you can use a summation operator to add all the products of  
[00:02:55] WJ and xJ for j equals 1 through n. Then outside the summation, you add B at the end.  
[00:03:05] So the summation goes from j equals 1, up 2, and including n,  
[00:03:10] for n equals 3, j therefore goes from 1, 2, to 3.  
[00:03:16] In code, you can initialize f to 0,  
[00:03:19] then for j in range from 0 to n,  
[00:03:23] this actually makes j go from 0 to n minus 1.  
[00:03:28] So from 0, 1 to 2, you can then add to f, the product of wj,  
[00:03:34] times xJ. Finally, outside the 4 loop, you add b. Notice that in Python, the range 0 to n means  
[00:03:43] means that j goes from 0 all the way to n minus 1 and does not include n itself. And more commonly,  
[00:03:50] this is written range n in Python, but in this video, I added the 0 here just to emphasize  
[00:03:57] that it starts from 0. While this implementation is a bit better than the first one, it's still  
[00:04:04] doesn't use vectorization and isn't that efficient. Now, let's look at how you can do this  
[00:04:11] using vectorization. This is the math expression of the function f, which is the dot product of  
[00:04:19] w and x plus b. And now you can implement this with a single line of code. By computing fp equals np.  
[00:04:29] I said dot dot dot, because the first dot is the p rate and the second dot is the function or the method  
[00:04:36] called d o t, but is fp equals np.p dot dot dot, w comma x. And this implements  
[00:04:46] the mathematical dot product between the vectors w and x. And then finally you can add b to it  
[00:04:53] at the end. This numpi dot function is a vectorized implementation of the dot product operation  
[00:05:00] between two vectors, and especially when in is large, this will run much faster than the two  
[00:05:06] two previous code examples. I want to emphasize that vectorization actually has two distinct  
[00:05:12] benefits. First, it makes the code shorter. It's now just one line of code. Isn't that cool? And second,  
[00:05:19] it also results in your code running much faster than either of the two previous implementations that  
[00:05:25] did not use vectorization. And the reason that the vectorized implementation is much faster is behind  
[00:05:34] the scenes, the numpy dot function is able to use parallel hardware in your computer.  
[00:05:40] And this is true, whether you're running this on a normal computer, that is on a normal computer  
[00:05:45] CPU, or if you are using a GPU, a graphics processor unit that's often used to accelerate  
[00:05:52] machine learning jobs. And the ability of the numpi dot function to use parallel hardware  
[00:05:58] makes it much more efficient than the for loop or the sequential calculation that  
[00:06:04] we saw previously. Now, this version is much more practical when N is large  
[00:06:11] because you are not typing W0 times X0 plus W1 times X1 plus lots of additional terms like  
[00:06:19] you would have had for the previous version. But while this saves a lot on the typing,  
[00:06:25] it's still not that computationally efficient because it still doesn't use vectorization.  
[00:06:30] So to recap, vectorization makes you code shorter, so hopefully,  
[00:06:36] easier to write and easier for you or others to read, and it also makes it run much faster.  
[00:06:42] But what is this magic behind vectorization that makes this run so much faster? Let's take a look  
[00:06:48] at what your computer is actually doing behind the scenes to make vectorize code run so much faster.
