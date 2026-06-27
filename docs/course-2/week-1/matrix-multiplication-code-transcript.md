# Matrix Multiplication Code — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](matrix-multiplication-code.md)

---

[00:00:01] So, without further ado, let's jump into the vectorized implementation of a neural network.  
[00:00:07] We'll look at the code that you have seen in an earlier video,  
[00:00:10] and hopefully matmul, that is, that matrix multiplication calculation, will make more sense.  
[00:00:16] Let's jump in.  
[00:00:17] So you saw previously how you can take the matrix A  
[00:00:20] and compute A transpose times W, resulting in this matrix here, Z.  
[00:00:27] In code, if this is the matrix A, this is a NumPy array with the elements corresponding to what I wrote on top,  
[00:00:37] then A transpose, which I'm going to write as AT, is going to be this matrix here,  
[00:00:42] with, again, the columns of A now laid out in rows instead.  
[00:00:49] And, by the way, instead of setting up AT this way, another way to compute AT in NumPy would be to write AT equals A dot T.  
[00:01:01] That's the transpose function that takes the columns of the matrix and lays them on the side.  
[00:01:07] In code, here's how you would initialize the matrix W as another 2D NumPy array,  
[00:01:15] and then to compute Z equals A transpose times W, you would write Z equals NP dot matmul AT comma W.  
[00:01:27] And that will compute this matrix Z over here, giving you this result down here.  
[00:01:35] And, by the way, if you read others' code, sometimes you see Z equals AT and then the at symbol W.  
[00:01:43] This is an alternative way of calling the matmul function, although I find using NP dot matmul to be clearer,  
[00:01:52] and so the code you see in this class will just use the matmul function like this, rather than this at symbol.  
[00:01:58] So, let's look at what a vectorized implementation of forward prop looks like.  
[00:02:03] I'm going to set A transpose to be equal to the input feature values 217.  
[00:02:11] So these are just the usual input feature values, 200 degrees, roasting coffee for 17 minutes.  
[00:02:17] So this is a 1 by 2 matrix, and I'm going to take the parameters W1, W2, and W3,  
[00:02:27] and stack them in columns like this to form this matrix capital W.  
[00:02:33] And the values B1, B2, B3, I'm going to put into a 1 by 3 matrix that is this matrix B as follows.  
[00:02:42] Then it turns out that if you were to compute Z equals A transpose W plus B,  
[00:02:50] that will result in these three numbers, and that's computed by taking the input feature values  
[00:02:59] and multiplying that by the first column and then adding B to get 165.  
[00:03:06] Taking these feature values, dot producting with the second column, that is the weights W2,  
[00:03:12] and adding B2 to get negative 531, and these feature values dot product with the weights W3 plus B3 to get 900.  
[00:03:24] Feel free to pause the video if you wish to double check these calculations,  
[00:03:28] but this gives you the values of Z11, Z12, and Z13.  
[00:03:37] And then finally, if the function G applies the sigmoid function to these three numbers element-wise,  
[00:03:44] that is applies the sigmoid function to 165, to negative 531, and to 900,  
[00:03:49] then you end up with A equals G of this matrix Z ends up being 101.  
[00:03:57] And it's 101 because sigmoid of 165 is so close to 1 that up to numerical round off, it's basically 1,  
[00:04:04] and these are basically 0 and 1.  
[00:04:07] Let's look at how you implement this in code.  
[00:04:10] A transpose is equal to this, is this 1 by 2 array of 217.  
[00:04:16] The matrix W is this 2 by 3 matrix, and B is this 1 by 3 matrix.  
[00:04:25] And so the way you can implement forward prop in the layer is dense input A transpose WB is equal to Z equals matmul A transpose times W plus B.  
[00:04:38] So that just implements this line of code.  
[00:04:41] And then A out, that is the output of this layer, is equal to G, the activation function applied element-wise to this matrix Z.  
[00:04:54] And you return A out, and that gives you this value.  
[00:04:59] In case you're comparing this slide with the slide a few videos back, there was just one little difference,  
[00:05:05] which was by convention, the way this is implemented in TensorFlow, and rather than calling this variable AT,  
[00:05:12] we were calling it AIN, which is why this too is a correct implementation of the code.  
[00:05:19] And there is a convention in TensorFlow that individual examples are actually laid out in rows in the matrix X,  
[00:05:28] rather than in the matrix X transpose, which is why the code implementation actually looks like this in TensorFlow.  
[00:05:35] But this explains why, with just a few lines of code, you can implement forward prop in the neural network,  
[00:05:41] and moreover, get a huge bonus because modern computers are very good at implementing matrix multiplication such as matmul efficiently.  
[00:05:50] That's the last video of this week.  
[00:05:52] Thanks for sticking with me all the way through the end of these optional videos.  
[00:05:57] For the rest of this week, I hope you also take a look at the quizzes and the practice labs,  
[00:06:02] and also the optional labs to exercise this material even more deeply.  
[00:06:06] You now know how to do inference and forward prop in the neural network, which I think is really cool, so congratulations.  
[00:06:13] After you have gone through the quizzes and the labs, please also come back,  
[00:06:17] and in the next week, we'll look at how to actually train the neural network.  
[00:06:22] So I look forward to seeing you next week.
