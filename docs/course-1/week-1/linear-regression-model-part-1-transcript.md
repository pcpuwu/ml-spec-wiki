# Linear Regression Model, Part 1 — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](linear-regression-model-part-1.md)

---

[00:00:01] In this video, we'll look at what the overall process of supervised learning is like.  
[00:00:07] Specifically, you see the first model of this course, a linear regression model.  
[00:00:13] That just means fitting a straight line to your data.  
[00:00:16] It's probably the most widely used learning algorithm in the world today.  
[00:00:21] And as you get familiar with linear regression,  
[00:00:24] many of the concepts you see here will also apply to other machine learning models,  
[00:00:29] models that you'll see later in this specialization.  
[00:00:33] Let's start with a problem that you can address using linear regression.  
[00:00:37] Say you want to predict the price of a house based on the size of a house.  
[00:00:41] This is the example we see in earlier this week.  
[00:00:45] We're going to use the data set on hull's sizes and prices from Portland,  
[00:00:50] a city in the United States.  
[00:00:52] Here with a graph where the horizontal axis is the size of the hulls in square feet,  
[00:00:57] and the vertical axis is the price.  
[00:00:59] is the price of the house in thousands of dollars.  
[00:01:03] Let's go ahead and plot the data points for various houses in the dataset.  
[00:01:07] Here at each data point, each of these little crosses,  
[00:01:11] is a hulls with a size and the price that it most recently was sold for.  
[00:01:17] Now, let's say you're real estate agent in Portland,  
[00:01:20] and you're helping a client sell her house.  
[00:01:23] And she's asking you, how much do you think you can get for this house?  
[00:01:27] This dataset might help you estimate  
[00:01:29] the price she could get for it.  
[00:01:31] You start by measuring the size of the house,  
[00:01:33] and it turns out that her hulls is 1,250 square feet.  
[00:01:38] How much do you think this house could sell for?  
[00:01:40] One thing you could do is you can build a linear regression model from this dataset.  
[00:01:47] Your model will fit a straight line to the data,  
[00:01:50] which might look like this.  
[00:01:52] And based on this straight line fit to the data,  
[00:01:55] you can kind of see that if a hulls is 1,250 square feet,  
[00:01:59] feet, it will intersect the best fit line over here,  
[00:02:03] and if you trace that to the vertical axis on the left,  
[00:02:06] you can see the prices maybe around here,  
[00:02:09] say about $220,000.  
[00:02:12] So this is an example of what's called a supervised learning model.  
[00:02:17] We call this supervised learning because you are first training your model  
[00:02:20] by giving a data that has the right answers.  
[00:02:23] Because you give the model examples of houses with both the size of the hulls,  
[00:02:27] as well as the price,  
[00:02:28] that the model should predict for each hulls,  
[00:02:31] where here the prices, that is the right answers,  
[00:02:34] are given for every hulls in the dataset.  
[00:02:37] This linear regression model is a particular type  
[00:02:41] of supervised learning model.  
[00:02:43] It's called a regression model because it predicts numbers as the output,  
[00:02:47] like prices in dollars.  
[00:02:49] Any supervised learning model that predicts a number  
[00:02:52] such as 220,000, or 1.5, or negative 33.2,000,000,  
[00:02:58] 33.2 is addressing what's called a regression problem.  
[00:03:03] So, linear regression is one example of a regression model,  
[00:03:07] but there are other models for addressing regression problems too,  
[00:03:12] and we'll see some of those later in course 2 of this specialization.  
[00:03:17] And just remind you, in contrast with the regression model,  
[00:03:21] the other most common type of supervised learning model is called a  
[00:03:26] classification model.  
[00:03:27] model. A classification model predicts categories or discrete categories, such as predicting  
[00:03:34] if a picture is of a cat, or a dog, woof. Or if given the medical record, it has to predict if  
[00:03:42] a patient has a particular disease. You see more about classification models later in  
[00:03:48] this course as well. So as a reminder about the difference between classification and regression,  
[00:03:53] in classification, there are only a small number of  
[00:03:57] possible outputs. If your model is recognizing cats versus dogs, that's two possible outputs.  
[00:04:04] Or maybe you're trying to recognize any of 10 possible medical conditions in a patient.  
[00:04:12] So if there's a discrete, finite set of possible outputs, we call it a classification problem,  
[00:04:18] whereas in regression, there are infinitely many possible numbers that the model could output.  
[00:04:23] In addition to visualizing this data as a plot,  
[00:04:26] as a plot here on the left, there's one other way of looking at the data that would be useful.  
[00:04:33] And that's a data table here on the right.  
[00:04:38] The data comprises a set of inputs. This would be the size of the house, which is this column here.  
[00:04:45] It also has outputs. You're trying to predict the price, which is this column here.  
[00:04:53] Notice that the horizontal  
[00:04:57] and vertical axes correspond to these two columns,  
[00:05:01] the size and the price.  
[00:05:04] And so if you have, say, 47 rows in this data table,  
[00:05:11] then there are 47 of these little crosses on the plot of the left,  
[00:05:17] each cross corresponding to one row of the table.  
[00:05:22] For example, the first row of the table is a house  
[00:05:27] with size, 2,104 square feet, so that's around here.  
[00:05:35] And this holds, so for $400,000, which is around here.  
[00:05:42] So this first row of the table is plotted as this data point over here.  
[00:05:49] Now, let's look at some notation for describing the data.  
[00:05:53] This is notation that you find useful throughout your journey in machine learning.  
[00:05:58] As you increasingly get familiar with machine learning terminology,  
[00:06:02] this would be terminology they can use to talk about machine learning concepts with others as well,  
[00:06:08] since a lot of this is quite standard across AI.  
[00:06:12] You'll be seeing this notation multiple times in this specialization,  
[00:06:16] so it's okay if you don't remember everything the first time through.  
[00:06:20] It will naturally become more familiar over time.  
[00:06:23] The data set that you just saw and that is used to try  
[00:06:29] the model is called a training set.  
[00:06:32] Note that your client's hulls is not in this data set because it's not yet sold,  
[00:06:37] so no one knows what its price is.  
[00:06:40] So to predict the price of your client's health,  
[00:06:43] you first train your model to learn from the training set,  
[00:06:47] and that model can then predict your client's houses price.  
[00:06:51] In machine learning, the standard notation to denote the input here is lowercase x.  
[00:06:59] case x, and we call this the input variable.  
[00:07:03] It's also called a feature or an input feature.  
[00:07:08] For example, for the first hulls in your training set,  
[00:07:12] x is the size of the hulls, so x equals 2,104.  
[00:07:19] The standard notation to denote the output variable,  
[00:07:24] which you're trying to predict,  
[00:07:26] which is also sometimes called the target variable,  
[00:07:29] is lowercase y.  
[00:07:33] And so here, y is the price of the house,  
[00:07:38] and for the first training example, this is equal to 400.  
[00:07:43] So y equals 400.  
[00:07:47] So the dataset has one row for each house,  
[00:07:51] and in this particular training set, there are 47 rows,  
[00:07:57] with each row representing a different  
[00:08:00] training example.  
[00:08:02] We're going to use lowercase m to refer to the total number of training examples,  
[00:08:09] and so here, m is equal to 47.  
[00:08:13] To indicate a single training example,  
[00:08:16] we're going to use the notation, parentheses,  
[00:08:19] x, comma, y.  
[00:08:21] So for the first training example,  
[00:08:24] x,  
[00:08:31] Now, we have a lot of different training examples.  
[00:08:37] We have 47 of them, in fact.  
[00:08:39] So to refer to a specific training example,  
[00:08:42] this will correspond to a specific row  
[00:08:45] in this table on the left.  
[00:08:47] I'm going to use the notation  
[00:08:49] X superscript in parentheses i, comma,  
[00:08:53] y, superscript in parentheses i.  
[00:08:57] This superscript tells us that this is the iF training example,  
[00:09:02] such as  
[00:09:04] the first, second, or third up to the 47th training example.  
[00:09:09] I here refers to a specific row in the table.  
[00:09:15] So, for instance, here is the first example  
[00:09:21] when i equals 1 in the training set.  
[00:09:25] And so x superscript 1 is equal to 2,104,  
[00:09:31] and y superscript 1 is equal to 400  
[00:09:35] And let's add the superscript 1 here as well.  
[00:09:42] Just a note,  
[00:09:43] this superscript i in parentheses is not exponentiation.  
[00:09:48] So when I write this,  
[00:09:50] this is not x squared,  
[00:09:53] this is not x the power of 2.  
[00:09:55] It just refers to the second training example.  
[00:09:59] So this i is just an index in the training set  
[00:10:02] and refers to row i in the table.  
[00:10:06] In this video,  
[00:10:07] you saw what a training set is like,  
[00:10:09] as well as the standard notation for describing this training set.  
[00:10:13] In the next video, let's look at what it'll take to take this training set you just saw  
[00:10:18] and feed it to learning algorithm so that the album can learn from this data.  
[00:10:23] Let's see that in the next video.
