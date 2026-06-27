# Forward Prop in a Single Layer — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](forward-prop-in-a-single-layer.md)

---

[00:00:02] If you had to implement forward propagation yourself from scratch in Python, how would  
[00:00:07] you go about doing so?  
[00:00:09] In addition to gaining intuition about what's really going on in libraries like TensorFlow  
[00:00:14] and PyTorch, if ever someday you decide you want to build something even better than TensorFlow  
[00:00:20] and PyTorch, maybe now you'd have a better idea how.  
[00:00:24] I don't really recommend doing this for most people, but maybe someday someone will  
[00:00:28] come up with an even better framework than TensorFlow and PyTorch, and whoever does that  
[00:00:33] may end up having to implement these things from scratch themselves.  
[00:00:37] So let's take a look.  
[00:00:39] On this slide, I'm going to go through quite a bit of code, and you'll see all this code  
[00:00:44] again later in the optional lab as well as in the practice lab.  
[00:00:48] So don't worry about having to take notes on every line of code or memorize every line  
[00:00:52] of code.  
[00:00:53] You see this code written down in the Jupyter Notebook in the lab, and the goal of this  
[00:00:59] video is to just show you the code to make sure you can understand what it's doing so  
[00:01:04] that when you go to the optional lab and the practice lab and see the code there, you know  
[00:01:08] what to do.  
[00:01:09] So don't worry about taking detailed notes on every line.  
[00:01:13] If you can read through the code on this slide and understand what it's doing, that's all  
[00:01:17] you need.  
[00:01:18] So let's take a look at how you implement forward prop in a single layer.  
[00:01:23] We're going to continue using the coffee roasting model shown here, and let's look at how you  
[00:01:30] would take an input feature vector x and implement forward prop to get this output a2.  
[00:01:40] In this Python implementation, I'm going to use 1D arrays to represent all of these vectors  
[00:01:47] and parameters, which is why there's only a single square bracket here.  
[00:01:51] This is a 1D array in Python rather than a 2D matrix, which is what we had when we had  
[00:01:57] double square brackets.  
[00:01:59] So the first value you need to compute is a superscript square bracket 1 subscript 1,  
[00:02:06] which is the first activation value of a1, and that's g of this expression over here.  
[00:02:13] So I'm going to use the convention on this slide that a term like w21, I'm going to represent  
[00:02:22] as a variable w2 and then subscript 1.  
[00:02:26] This underscore 1 denotes subscript 1, so w2 means w superscript 2 in square brackets  
[00:02:33] and then subscript 1.  
[00:02:36] So to compute a11, we have parameters w11 and b11, which are say 1, 2 and negative 1.  
[00:02:50] You would then compute z11 as the dot product between that parameter w11 and the input x  
[00:03:00] and add it to b11.  
[00:03:03] And then finally, a11 is equal to g, the safe point function, applied to z11.  
[00:03:12] Next let's go on to compute a12, which again by the convention I described here is going  
[00:03:18] to be a12 written like that.  
[00:03:23] So similar as what we did on the left, w12 is your two parameters, minus v for b12 is  
[00:03:31] the term b12 over there, so you compute z as this term in the middle and then apply  
[00:03:37] the safe point function and then you end up with a12.  
[00:03:42] And finally, you do the same thing to compute a13.  
[00:03:48] Now you've computed these three values a11, a12, and a13 and we'd like to take these three  
[00:03:57] numbers and group them together into an array to give you a1 up here, which is the output  
[00:04:04] of the first layer, and so you do that by grouping them together using a numpy array  
[00:04:10] as follows.  
[00:04:11] So now you've computed a1, let's implement the second layer as well to compute the output  
[00:04:18] a2.  
[00:04:20] So a2 is computed using this expression and so we would have parameters w21 and b21 corresponding  
[00:04:29] to these parameters and then you would compute z as the dot product between w21 and a1 and  
[00:04:37] add b21 and then apply the safe point function to get a21 and that's it.  
[00:04:44] That's how you implement FOILPROP using just Python and numpy.  
[00:04:49] Now there are a lot of expressions in this page of code that you just saw.  
[00:04:54] Let's in the next video look at how you can simplify this to implement FOILPROP for a  
[00:04:58] more general neural network rather than hard coding it for every single neuron like we  
[00:05:03] just did.  
[00:05:04] So let's go see that in the next video.
