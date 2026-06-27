# Multiple Features — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](multiple-features.md)

---

[00:00:02] Welcome back.  
[00:00:03] In this week, we'll learn to make linear regression much faster and much more powerful,  
[00:00:08] and by the end of this week, you'll be two-thirds in the way to finishing this first course.  
[00:00:14] Let's start by looking at a version of linear regression that we'll look at not just one feature,  
[00:00:19] but a lot of different features.  
[00:00:21] Let's take a look.  
[00:00:23] In the original version of linear regression, you had a single feature X, the size of the hulls,  
[00:00:31] and you're able to predict Y, the price of the house.  
[00:00:35] So the model was FWB of X equals WX plus B.  
[00:00:43] But now, what if you did not only have the size of the house  
[00:00:46] as a feature with which to try to predict the price?  
[00:00:50] But if you also knew the number of bedrooms,  
[00:00:53] the number of floors, and the age of the home in years,  
[00:00:57] it seems like this would give you a lot more information  
[00:00:59] with which to predict the price.  
[00:01:02] To introduce you the number of the house,  
[00:01:02] To introduce a little bit of new notation,  
[00:01:04] we're going to use the variables x-subscript 1,  
[00:01:07] X-subscript 2, x-subscript 3, and x-subscript 4 to denote the four features.  
[00:01:14] And for simplicity, let's introduce a little bit more notation.  
[00:01:18] We'll write x-subscript j, or sometimes, I'll just say for short,  
[00:01:23] x subj, to represent the list of features.  
[00:01:27] So here, J will go from 1 through 4, because we have 4 features.  
[00:01:31] I'm going to use lowercase n to denote the total number of features.  
[00:01:37] So in this example, n is equal to 4.  
[00:01:40] As before, we'll use x superscript i to denote the ive training example.  
[00:01:48] So here, x superscript i is actually going to be a list of four numbers.  
[00:01:55] Or sometimes we'll call this a vector that includes all the features of the ive  
[00:02:02] training example.  
[00:02:04] So as a concrete example,  
[00:02:07] x-superstrip in parentheses 2  
[00:02:10] will be a vector of the features for the second training example.  
[00:02:15] So it will equal to this 1416, 3, 2, and 40.  
[00:02:20] And technically, I'm writing these numbers in a row.  
[00:02:23] So sometimes this is called a row vector rather than a column vector.  
[00:02:28] But if you don't know what the difference is, don't worry about it.  
[00:02:31] It's not that in a row.  
[00:02:32] important for this purpose.  
[00:02:34] And to refer to a specific feature in the iF training example,  
[00:02:40] I will write x superscript i.  
[00:02:43] Substrip j.  
[00:02:46] So for example, x superscript 2, subscript 3  
[00:02:50] will be the value of the third feature,  
[00:02:53] that is the number of flaws in the second training example,  
[00:02:57] and so that's going to be equal to 2.  
[00:03:00] Sometimes in order to emphasize that this  
[00:03:03] x2 is not a number, but it's actually a list of numbers that is a vector.  
[00:03:08] We'll draw an arrow on top of that.  
[00:03:12] Just to visually show that is a vector,  
[00:03:16] and over here as well, but you don't have to draw this arrow in your notation.  
[00:03:21] You can think of the arrow as an optional signifier that's sometimes used  
[00:03:27] just to emphasize that this is a vector and not a number.  
[00:03:30] Now that we have multiple features, let's take a look at what our model would look  
[00:03:35] like. Previously, this is how we defined the model, where X was a single feature, so a single number,  
[00:03:42] but now with multiple features, we're going to define it differently.  
[00:03:47] Instead, the model will be FWB of X equals W1X1 plus W2x2 plus W3 plus W3 plus W4 plus B.  
[00:04:01] Concretely, for housing price prediction,  
[00:04:05] one possible model may be that we estimate the price of the house as 0.1 times X1, the size of the house,  
[00:04:15] plus 4 times X2, the number of bedrooms, plus 10 times X3, the number of floors,  
[00:04:22] minus 2 times X4, the age of the house in years, plus 80.  
[00:04:27] Let's think a bit about how you might interpret these parameters.  
[00:04:31] If the model is trying to predict the price of the house in thousands of dollars,  
[00:04:35] You can think of this B equals 80 as saying that the base price of a house starts off at maybe $80,000,  
[00:04:44] assuming it has no size, no bedrooms, no floor, and no age.  
[00:04:48] And you can think of this 0.1 as saying that maybe for every additional square foot,  
[00:04:55] the price will increase by $0.1,000 or by $100,  
[00:05:01] because we're saying that for each square foot, the price increase  
[00:05:06] by 0.1, you know, times $1,000, which is $100.  
[00:05:11] And maybe for each additional bathroom, the price increases by $4,000.  
[00:05:17] And for each additional four, the price may increase by $10,000.  
[00:05:22] And for each additional year of the houses age, the price may decrease by $2,000  
[00:05:28] because the parameter is negative 2.  
[00:05:31] And in general, if you have n features, then the  
[00:05:36] model will look like this. Here again is the definition of the model with N features.  
[00:05:44] What we're going to do next is introduce a little bit of notation to rewrite this expression in a simpler but equivalent way.  
[00:05:51] Let's define W as a list of numbers that list the parameters W1, W2, W3, all the way through WN.  
[00:06:01] In mathematics, this is called a vector, and sometimes to designate that this is a vector, which just  
[00:06:08] means a list of numbers, I'm going to draw a little arrow on top.  
[00:06:12] You don't always have to draw this arrow, and you can do so or not in your own notation.  
[00:06:18] So you can think of this little arrow as just an optional signifier to remind us that this is a vector.  
[00:06:25] If you take in a linear algebra class before, you might recognize that this is a row vector,  
[00:06:32] as opposed to a column vector, but if you don't know what those terms means, you don't need to worry about it.  
[00:06:38] Next, same as before, B is a single number, not a vector.  
[00:06:43] And so this vector W together with this number B are the parameters of the model.  
[00:06:51] Let me also write x as a list or a vector, again a row vector, that lists all of the features x1, x2, x3, up through xN.  
[00:07:04] This is again a vector, so I'm going to add a little  
[00:07:08] arrow up on top to signify.  
[00:07:12] So in the notation up on top, we can also add little arrows here and here to signify that that that W and that X are actually these lists of numbers.  
[00:07:26] They're actually these vectors.  
[00:07:28] So with this notation, the model can now be rewritten more succinctly as f of x equals the vector  
[00:07:39] W, dot, and this dot refers to a dot product from linear algebra of x the vector plus the number B.  
[00:07:51] So what is this dot product thing? Well, the dot product of two vectors of two list of numbers,  
[00:07:58] W and x, is computed by taking the corresponding pairs of numbers, W1 and x1, multiplying that,  
[00:08:09] W2x2 multiplying that, W3x3 multiplying that, all the way up to WNxn, multiplying that,  
[00:08:19] and then summing up all of these products.  
[00:08:22] Writing that out, this means that the dot products is equal to  
[00:08:28] W1x1 plus W2x2 plus  
[00:08:34] W3x3 plus all the way up to WNxn  
[00:08:40] and then finally we add back in the B on top.  
[00:08:45] And you notice that this gives us exactly the same expression as we had on top.  
[00:08:52] So the dot product notation lets you write the model in a more compact form with fewer characters.  
[00:09:01] The name for this type of linear regression model with multiple input features is multiple linear regression.  
[00:09:08] This is in contrast to univariate regression, which had just one feature.  
[00:09:12] feature. And by the way, you might think this algorithm is called multivariate regression,  
[00:09:18] but that term actually refers to something else that we won't be using here.  
[00:09:23] So I'm going to refer to this model as multiple linear regression.  
[00:09:27] And so that's it for linear regression with multiple features, which is also called multiple  
[00:09:33] linear regression.  
[00:09:34] In order to implement this, there's a really neat trick called vectorization, which will make it much simpler  
[00:09:41] to implement this and many other learning algorithms.  
[00:09:45] Let's go on to the next video to take a look at what is vectorization.
