# Data in TensorFlow — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](data-in-tensorflow.md)

---

[00:00:02] In this video, I want to step through with you how data is represented in NumPy and in  
[00:00:08] TensorFlow, so that as you're implementing new neural networks, you can have a consistent  
[00:00:14] framework to think about how to represent your data.  
[00:00:18] One of the unfortunate things about the way things are done in code today is that many  
[00:00:23] many years ago, NumPy was first created and became a standard library for linear algebra  
[00:00:28] in Python.  
[00:00:30] And then much later, the Google Brain team, the team that I had started and once led,  
[00:00:35] created TensorFlow.  
[00:00:36] And so unfortunately, there are some inconsistencies between how data is represented in NumPy and  
[00:00:42] in TensorFlow.  
[00:00:44] So it's good to be aware of these conventions so that you can implement correct code and  
[00:00:49] hopefully get things running in your neural networks.  
[00:00:52] Let's start by taking a look at how TensorFlow represents data.  
[00:00:56] Let's say you have a dataset like this from the coffee example.  
[00:01:01] I mentioned that you would write X as follows.  
[00:01:06] So why do you have this double square bracket here?  
[00:01:11] Let's take a look at how NumPy stores vectors and matrices.  
[00:01:17] In case you think matrices and vectors are complicated mathematical concepts, don't worry  
[00:01:23] about it.  
[00:01:24] We'll go through a few concrete examples and you'll be able to do everything you need to  
[00:01:28] do with matrices and vectors in order to implement your networks.  
[00:01:33] Let's start with an example of a matrix.  
[00:01:37] Here is a matrix with two rows and three columns.  
[00:01:43] Notice that there are one, two rows and one, two, three columns.  
[00:01:51] So we call this a two-by-three matrix.  
[00:01:57] The convention is the dimension of the matrix is written as the number of rows by the number  
[00:02:04] of columns.  
[00:02:05] So in code, to store this matrix, this two-by-three matrix, you just write x equals np.array of  
[00:02:15] these numbers like these, where you notice that the square bracket tells you that one,  
[00:02:22] two, three is the first row of this matrix, and four, five, six is the second row of this  
[00:02:30] matrix, and then this upper square bracket groups the first and the second row together.  
[00:02:38] So this sets x to be this 2D array of numbers.  
[00:02:43] So a matrix is just a 2D array of numbers.  
[00:02:48] Let's look at one more example.  
[00:02:51] Here I've written out another matrix.  
[00:02:54] How many rows and how many columns does this have?  
[00:02:57] Well, we can count.  
[00:02:58] This has one, two, three, four rows, and it has one, two columns.  
[00:03:05] So this is a number of rows by number of columns matrix, so it's a four-by-two matrix.  
[00:03:12] And so to store this in code, you would write x equals np.array, and then this syntax over  
[00:03:19] here to store these four rows of a matrix in the variable x.  
[00:03:25] So this creates a 2D array of these eight numbers.  
[00:03:31] Matrices can have different dimensions.  
[00:03:33] You saw an example of a two-by-three matrix and a four-by-two matrix.  
[00:03:39] A matrix can also be other dimensions like one-by-two or two-by-one, and we'll see examples  
[00:03:46] of these on the next slide.  
[00:03:49] So what we did previously when setting x to be input feature vectors was set x to be equal  
[00:03:56] to np.array with two square brackets, 200 comma 17.  
[00:04:02] And what that does is this creates a one-by-two matrix that is just one row and two columns.  
[00:04:13] Let's look at a different example.  
[00:04:15] If you were to define x to be np.array, but now written like this, this creates a two-by-one  
[00:04:24] matrix that has two rows and one column because the first row is just the number 200, and  
[00:04:34] the second row is just the number 17, and so this has the same numbers but in a two-by-one  
[00:04:42] instead of a one-by-two matrix.  
[00:04:45] In Nav, this example on top is also called a row vector.  
[00:04:49] Here is a vector that is just a single row, and this example is also called a column vector  
[00:04:55] because it's a vector that just has a single column.  
[00:05:00] And the difference between using double square brackets like this versus a single square  
[00:05:06] bracket like this is that whereas the two examples on top are of 2D arrays where one  
[00:05:14] of the dimensions happens to be 1, this example results in a 1D vector.  
[00:05:22] So this is just a 1D array that has no rows or columns, although by convention we may  
[00:05:29] write x as a column like this.  
[00:05:33] So I want to contrast this with what we had previously done in the first course, which  
[00:05:38] was to write x like this with a single square bracket, and that resulted in what's called  
[00:05:46] in Python a 1D vector instead of a 2D matrix.  
[00:05:50] And this technically is not one-by-two or two-by-one, it's just a linear array with  
[00:05:55] no rows or no columns, but it's just a list of numbers.  
[00:06:00] So whereas in course one, when we're working with linear regression and logistic regression,  
[00:06:05] we use these 1D vectors to represent the input features x, with TensorFlow the convention  
[00:06:12] is to use matrices to represent the data.  
[00:06:16] And why is there this switch in conventions?  
[00:06:19] Well it turns out that TensorFlow was designed to handle very large datasets, and by representing  
[00:06:25] the data in matrices instead of 1D arrays, it lets TensorFlow be a bit more computationally  
[00:06:31] efficient internally.  
[00:06:34] So going back to our original example, for the first training example in this dataset  
[00:06:39] which features 200 degrees Celsius in 17 minutes, we would represent it like this, and so this  
[00:06:46] is actually a one-by-two matrix that happens to have one row and two columns to store the  
[00:06:54] numbers 200 and 17.  
[00:06:57] And in case this seems like a lot of details and really complicated conventions, don't  
[00:07:02] worry about it, all of this will become clearer and you get to see the concrete implementations  
[00:07:07] of the code yourself in the optional labs and in the practice labs.  
[00:07:12] Going back to the code for carrying out forward propagation or inference in the neural network,  
[00:07:18] when you compute A1 equals layer one applied to x, what is A1?  
[00:07:26] Well A1 is actually going to be, because there are three numbers, is actually going  
[00:07:31] to be a one-by-three matrix.  
[00:07:35] And if you print out A1, you will get something like this, tf.tensor.2.7.3 is a shape of one-by-three.  
[00:07:46] One-three refers to that this is a one-by-three matrix, and this is TensorFlow's way of saying  
[00:07:53] that this is a floating point number, meaning that it's a number that can have a decibel  
[00:07:58] point represented using 32 bits of memory in your computer.  
[00:08:02] That's what a float 32 is.  
[00:08:04] And what is a tensor?  
[00:08:05] A tensor here is a data type that the TensorFlow team had created in order to store and carry  
[00:08:12] out computations on matrices efficiently.  
[00:08:15] So whenever you see tensor, just think of it as matrix on these few slides.  
[00:08:22] Typically, a tensor is a little bit more general than a matrix, but for the purposes  
[00:08:25] of this course, think of tensor as just a way of representing matrices.  
[00:08:30] So remember I said at the start of this video that there's the TensorFlow way of representing  
[00:08:36] a matrix and the NumPy way of representing a matrix.  
[00:08:40] This is an artifact of the history of how NumPy and TensorFlow were created, and unfortunately  
[00:08:46] there are two ways of representing a matrix that have been baked into these systems.  
[00:08:54] And in fact, if you want to take A1, which is a tensor, and want to convert it back to  
[00:09:00] a NumPy array, you can do so with this function, A1.NumPy, and it will take the same data and  
[00:09:07] return it in the form of a NumPy array rather than in the form of a TensorFlow array or  
[00:09:13] TensorFlow matrix.  
[00:09:14] Now let's take a look at what the activations output by the second layer would look like.  
[00:09:19] Here's the code that we had from before.  
[00:09:21] Layer 2 is a dense layer with one unit and a sequence activation, and A2 is computed  
[00:09:26] by taking layer 2 and applying it to A1.  
[00:09:29] So what is A2?  
[00:09:30] A2 may be a number like 0.8, and technically this is a 1 by 1 matrix.  
[00:09:38] It's a 2D array with one row and one column, and so it's equal to this number, 0.8.  
[00:09:48] And if you print out A2, you see that it is a TensorFlow tensor with just one element,  
[00:09:55] one number, 0.8, and it is a 1 by 1 matrix, and again it is a float 32, decimal point  
[00:10:04] number, taking up 32 bits in computer memory.  
[00:10:08] Once again, you can convert from a TensorFlow tensor to a NumPy matrix using A2.NumPy, and  
[00:10:17] that will turn this back into a NumPy array that looks like this.  
[00:10:22] So that hopefully gives you a sense of how data is represented in TensorFlow and in NumPy.  
[00:10:29] I'm used to loading data and manipulating data in NumPy, but when you pass a NumPy array  
[00:10:35] into TensorFlow, TensorFlow likes to convert it to its own internal format, the tensor,  
[00:10:41] and then operate efficiently using tensors.  
[00:10:44] And when you read the data back out, you can keep it as a tensor or convert it back to  
[00:10:48] a NumPy array.  
[00:10:50] I think it's a bit unfortunate that the history of how these libraries evolved has led us  
[00:10:55] to have to do this extra conversion work when actually the two libraries can work quite  
[00:11:00] well together.  
[00:11:02] But when you convert back and forth, whether you're using a NumPy array or a tensor, it's  
[00:11:07] just something to be aware of when you're writing code.  
[00:11:11] Next, let's take what we've learned and put it together to actually build a neural network.  
[00:11:16] Let's go see that in the next video.
