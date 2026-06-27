# Matrix Multiplication Rules — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](matrix-multiplication-rules.md)

---

[00:00:02] So, let's take a look at the general form of how you multiply two matrices together.  
[00:00:08] And then, in the last video after this one, we'll take this and apply it to the vectorized  
[00:00:13] implementation of a neural network.  
[00:00:16] Let's dive in.  
[00:00:17] Here's a matrix A, which is a 2 by 3 matrix, because it has two rows and three columns.  
[00:00:26] As before, I'd encourage you to think of the columns of this matrix as three vectors.  
[00:00:33] Vectors A1, A2, and A3.  
[00:00:37] And what we're going to do is take A transpose and multiply that with a matrix W.  
[00:00:44] The first, what is A transpose?  
[00:00:46] Well, A transpose is obtained by taking the first column of A and laying it on its side  
[00:00:52] like this, and then taking the second column of A and laying it on its side like this,  
[00:00:57] and then the third column of A and laying it on its side like that.  
[00:01:00] And so these rows are now A1 transpose, A2 transpose, and A3 transpose.  
[00:01:08] Next, here's a matrix W. I encourage you to think of W as vectors, W1, W2, W3, and W4  
[00:01:20] stacked together.  
[00:01:22] Let's look at how you then compute A transpose times W.  
[00:01:26] Now, notice that I've also used slightly different shades of orange to denote the different columns  
[00:01:33] of A, where the same shade corresponds to numbers that we think of as grouped together  
[00:01:39] into a vector, and that same shade is used to indicate different rows of A transpose,  
[00:01:46] because the different rows of A transpose are A1 transpose, A2 transpose, and A3 transpose.  
[00:01:52] And in a similar way, I've used different shades to denote the different columns of  
[00:01:57] W, because the numbers of the same shade of blue are the ones that are grouped together  
[00:02:03] to form the vectors W1, or W2, or W3, or W4.  
[00:02:08] Now let's look at how you can compute A transpose times W.  
[00:02:15] I'm going to draw vertical bars with the different shades of blue, and horizontal bars with the  
[00:02:19] different shades of orange to indicate which elements of Z, that is A transpose W, are  
[00:02:29] influenced or affected by the different rows of A transpose, and which are influenced or  
[00:02:36] affected by the different columns of W.  
[00:02:40] So for example, let's look at the first column of W, so that's W1, as indicated by the lightest  
[00:02:46] shade of blue here.  
[00:02:49] So W1 will influence or correspond to this first column of Z, shown here by this lightest  
[00:02:59] shade of blue, and the values of this second column of W, that is W2, as indicated by this  
[00:03:07] second lightest shade of blue, will affect the values computed in the second column of  
[00:03:12] Z, and so on for the third and fourth columns.  
[00:03:18] Correspondingly, let's look at A transpose.  
[00:03:21] A1 transpose is the first row of A transpose, as indicated by the lightest shade of orange,  
[00:03:27] and A1 transpose will affect, or influence, or correspond to the values in the first row  
[00:03:34] of Z, and A2 transpose will influence the second row of Z, and A3 transpose will influence  
[00:03:42] or correspond to this third row of Z.  
[00:03:46] So let's figure out how to compute the matrix Z, which is going to be a 3 by 4 matrix, so  
[00:03:53] with 12 numbers all together.  
[00:03:55] Let's start off and figure out how to compute the number in the first row and the first  
[00:04:01] column of Z, so this upper left most element here.  
[00:04:05] Because this is the first row and the first column corresponding to the lightest shade  
[00:04:09] of orange and the lightest shade of blue, the way you compute that is to grab the first  
[00:04:14] row of A transpose and the first column of W, and take their inner product, or the dot  
[00:04:20] product.  
[00:04:22] And so this number is going to be 1 2 dot product with 3 4, which is 1 times 3 plus  
[00:04:30] 2 times 4, which is equal to 11.  
[00:04:35] Let's look at a second example.  
[00:04:36] How would you compute this number, this element of Z?  
[00:04:42] So this is in the third row, row 1, row 2, row 3, so this is in row 3, and the second  
[00:04:48] column, column 1, column 2.  
[00:04:50] So to compute the number in row 3, column 2 of Z, you would now grab row 3 of A transpose  
[00:05:01] and column 2 of W, and dot product those together.  
[00:05:05] Notice that this corresponds to the darkest shade of orange and the second lightest shade  
[00:05:10] of blue.  
[00:05:12] And to compute this, this is 0.1 times 5 plus 0.2 times 6, which is 0.5 plus 1.2, which  
[00:05:22] is equal to 1.7.  
[00:05:25] So to compute the number in row 3, column 2 of Z, you grab the third row, row 3 of A  
[00:05:31] transpose and column 2 of W.  
[00:05:34] Let's look at one more example, and let's see if you can figure this one out.  
[00:05:40] So this is row 2, column 3 of the matrix Z.  
[00:05:47] Why don't you take a look and see if you can figure out which row and which column to grab  
[00:05:52] to dot product together, and therefore, what is the number that will go in this element  
[00:05:58] of this matrix.  
[00:05:59] Hopefully, you got that you should be grabbing row 2 of A transpose and column 3 of W, and  
[00:06:08] when you dot product that together, you have A2 transpose W3 is negative 1 times 7 plus  
[00:06:15] negative 2 times 8, which is negative 7 plus negative 16, which is equal to negative 23.  
[00:06:22] And so that's how you compute this element of the matrix Z.  
[00:06:26] And it turns out if you do this for every element of the matrix Z, then you can compute  
[00:06:31] all of the numbers in this matrix, which turns out to look like that.  
[00:06:37] Feel free to pause the video if you want, and pick any element, and double check that  
[00:06:40] the formula we've been going through gives you the right value for Z.  
[00:06:46] I just want to point out one last interesting requirement for multiplying matrices together,  
[00:06:54] which is that X transpose here is a 3 by 2 matrix, because it has 3 rows and 2 columns,  
[00:07:01] and W here is a 2 by 4 matrix, because it has 2 rows and 4 columns.  
[00:07:08] One requirement in order to multiply two matrices together is that this number must match that  
[00:07:15] number, and that's because you can only take dot products between vectors that are the  
[00:07:21] same length.  
[00:07:22] So you can take the dot product between a vector with two numbers, and that's because  
[00:07:28] you can take the inner product between a vector of length 2 only with another vector of length  
[00:07:34] 2.  
[00:07:35] You can't take the inner product between a vector of length 2 with a vector of length  
[00:07:39] 3, for example.  
[00:07:41] And that's why matrix multiplication is valid only if the number of columns of the first  
[00:07:47] matrix, that is A transpose here, is equal to the number of rows of the second matrix,  
[00:07:54] which is the number of rows of W here.  
[00:07:57] So that when you take dot products during this process, you're taking dot products of  
[00:08:02] vectors of the same size.  
[00:08:05] And then the other observation is that the output Z equals A transpose W, the dimensions  
[00:08:13] of Z is 3 by 4.  
[00:08:15] And so the output of this multiplication will have the same number of rows as X transpose,  
[00:08:23] and the same number of columns as W. And so that too is another property of matrix  
[00:08:29] multiplication.  
[00:08:31] So that's matrix multiplication.  
[00:08:34] All of these videos are optional, so thank you for sticking with me through these.  
[00:08:38] And if you're interested, later in this week there are also some purely optional quizzes  
[00:08:44] to let you practice some more of these calculations yourself as well.  
[00:08:47] So with that, let's take what we've learned about matrix multiplication and apply it back  
[00:08:53] to the vectorized implementation of a neural network.  
[00:08:55] I have to say, the first time I understood the vectorized implementation, I thought it  
[00:09:00] was actually really cool.  
[00:09:02] I've been implementing neural networks for a while myself without the vectorized implementation,  
[00:09:08] and when I finally understood the vectorized implementation and implemented it that way  
[00:09:13] for the first time, it ran blazingly much faster than anything I've ever done before.  
[00:09:18] And I thought, wow, I wish I had figured this out earlier.  
[00:09:21] The vectorized implementation, it is a little bit complicated, but it makes neural networks  
[00:09:26] run much faster.  
[00:09:28] So let's take a look at that in the next video.
