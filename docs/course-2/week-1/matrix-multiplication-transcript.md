# Matrix Multiplication — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](matrix-multiplication.md)

---

[00:00:02] So you know that a matrix is just a block or 2D array of numbers.  
[00:00:08] What does it mean to multiply two matrices?  
[00:00:10] Let's take a look.  
[00:00:12] In order to build up to multiplying matrices, let's start by looking at how we tick dot  
[00:00:19] products between vectors.  
[00:00:22] Let's use the example of ticking the dot product between this vector, 1, 2, and this  
[00:00:27] vector, 3, 4.  
[00:00:30] If z is the dot product between these two vectors, then you compute z by multiplying  
[00:00:35] the first element by this first element here, so it's 1 times 3, plus the second element  
[00:00:42] times the second element, plus 2 times 4, and so that's just 3 plus 8, which is equal  
[00:00:47] to 11.  
[00:00:50] In the more general case, if z is the dot product between a vector a and a vector w,  
[00:00:58] then you compute z by multiplying the first element together, and then the second element  
[00:01:03] together, and the third, and so on, and then adding up all of these products.  
[00:01:07] So that's the vector-vector dot product.  
[00:01:10] It turns out there's another equivalent way of writing a dot product, which is given a  
[00:01:16] vector a, that is, 1, 2, written as a column, you can turn this into a row, that is, you  
[00:01:25] can turn it from what's called a column vector to a row vector by taking the transpose of  
[00:01:32] a.  
[00:01:33] So the transpose of a vector a means you take this vector and lay its elements on the side  
[00:01:41] like this.  
[00:01:43] And it turns out that if you multiply a transpose, this is a row vector, or you can think of  
[00:01:50] this as a 1 by 2 matrix, with w, which you can now think of as a 2 by 1 matrix, then  
[00:02:00] z equals a transpose times w, and this is the same as taking the dot product between  
[00:02:07] a and w.  
[00:02:11] So to recap, z equals the dot product between a and w is the same as z equals a transpose,  
[00:02:19] this is a, laid on the side, multiplied by w.  
[00:02:25] And this will be useful for understanding matrix multiplication, that these are just  
[00:02:30] two ways of writing the exact same computation to arrive at z.  
[00:02:36] Now let's look at vector matrix multiplication, which is when you take a vector and you multiply  
[00:02:42] a vector by a matrix.  
[00:02:45] Here again is the vector a, 1, 2, and a transpose is a laid on the side, so rather than just  
[00:02:53] kind of think of this as a 2 by 1 matrix, it becomes a 1 by 2 matrix.  
[00:03:00] And let me now create a 2 by 2 matrix w with these four elements, 3, 4, 5, 6.  
[00:03:07] If you want to compute capital Z as a transpose times w, so let's see how you would go about  
[00:03:18] doing so.  
[00:03:19] It turns out that z is going to be a 1 by 2 matrix, and to compute the first value of  
[00:03:29] z, we're going to take a transpose, 1, 2 here, and multiply that by the first column  
[00:03:36] of w, so that's 3, 4.  
[00:03:40] And so to compute the first element of z, you end up with 1 times 3 plus 2 times 4,  
[00:03:48] which we saw earlier is equal to 11, and so the first element of z is 11.  
[00:03:55] Let's figure out what's the second element of z.  
[00:03:58] Turns out you just repeat this process, but now I'm multiplying a transpose by the second  
[00:04:05] column of w, and so to do that computation, you have 1 times 5 plus 2 times 6, which is  
[00:04:15] equal to 5 plus 12, which is 17, so that's equal to 17.  
[00:04:22] The z is equal to this 1 by 2 matrix, 11 and 17.  
[00:04:28] Now just one last thing, and then that'll take us to the end of this video, which is  
[00:04:34] how to take vector matrix multiplication and generalize it to matrix matrix multiplication.  
[00:04:41] I have a matrix A with these four elements.  
[00:04:45] The first column is 1, 2, and the second column is negative 1, negative 2, and I want to know  
[00:04:52] how to compute A transpose times w.  
[00:04:57] Unlike the previous slide, A now is a matrix rather than just a vector, but the matrix  
[00:05:03] is just a set of different vectors stacked together in columns.  
[00:05:08] So first, let's figure out what is A transpose.  
[00:05:12] In order to compute A transpose, we're going to take the columns of A, and similar to what  
[00:05:17] happened when you transpose a vector, we're going to take the columns and lay them on  
[00:05:22] the side, one column at a time.  
[00:05:25] So the first column, 1, 2, becomes the first row, 1, 2, because it's just laid on the side,  
[00:05:31] and this second column, negative 1, negative 2, becomes laid on the side, negative 1, negative  
[00:05:37] 2, like this.  
[00:05:39] So the way you transpose a matrix is you take the columns and you just lay the columns on  
[00:05:43] the side, one column at a time.  
[00:05:45] So you end up with this being A transpose.  
[00:05:48] Next, we have this matrix, w, which we're going to write as 3, 4, 5, 6.  
[00:05:55] So there's a column 3, 4, and a column 5, 6.  
[00:06:00] One way I encourage you to think of matrices that's useful for neural network implementations  
[00:06:06] is if you see a matrix, think of the columns of the matrix, and if you see the transpose  
[00:06:13] of a matrix, think of the rows of that matrix as being grouped together, as illustrated  
[00:06:18] here with A and A transpose, as well as w.  
[00:06:22] And now, let me show you how to multiply A transpose and w.  
[00:06:29] In order to carry out this computation, let me call the columns of A, A1 and A2, and that  
[00:06:38] means that A1 transpose is the first row of A transpose, and A2 transpose is the second  
[00:06:47] row of A transpose.  
[00:06:49] And then, same as before, let me call the columns of w to be w1 and w2.  
[00:06:57] So it turns out that to compute A transpose w, the first thing we need to do is, let's  
[00:07:04] just ignore the second row of A, and let's just pay attention to the first row of A,  
[00:07:11] and let's take this row 1, 2, that is A1 transpose, and multiply that with w.  
[00:07:18] So you already know how to do that from the previous slide.  
[00:07:22] The first element is 1, 2, inner product or dot product with 3, 4, so that ends up with  
[00:07:28] 3 times 1 plus 2 times 4, which is 11.  
[00:07:32] And then the second element is 1, 2, A transpose, inner product with 5, 6, so that's 5 times  
[00:07:40] 1 plus 6 times 2, which is 5 plus 12, which is 17.  
[00:07:46] So that gives you the first row of z equals A transpose w.  
[00:07:51] So all we've done is take A1 transpose and multiply that by w.  
[00:07:56] That's exactly what we did on the previous slide.  
[00:08:00] Next, let's forget A1 for now, and let's just look at A2, and take A2 transpose and  
[00:08:07] multiply that by w.  
[00:08:10] So now we have A2 transpose times w, and to compute that, first we take negative 1 and  
[00:08:17] negative 2, and dot product that with 3, 4.  
[00:08:21] So that's negative 1 times 3 plus negative 2 times 4, and that turns out to be negative  
[00:08:27] 11.  
[00:08:29] And then we have to compute A2 transpose times the second column, and that's negative  
[00:08:36] 1 times 5 plus negative 2 times 6, and that turns out to be negative 17.  
[00:08:43] So you end up with A transpose times w is equal to this 2 by 2 matrix over here.  
[00:08:51] Let's talk about the general form of matrix multiplication next.  
[00:08:54] So let's go see that in the next video.  
[00:08:58] So this was an example of how you multiply a vector with a matrix, or a matrix with a  
[00:09:04] matrix.  
[00:09:05] There's a lot of dot products between vectors, but all did in a certain way to construct  
[00:09:09] the elements of the output z one element at a time.  
[00:09:14] I know this was a lot, but in the next video, let's look at the general form of how a matrix  
[00:09:20] matrix multiplication is defined, and I hope that that will make all this clear as well.  
[00:09:25] Let's go on to the next video.
