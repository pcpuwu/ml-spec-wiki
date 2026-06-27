# Supervised Learning, Part 1 — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](supervised-learning-part-1.md)

---

[00:00:01] Machine learning is creating tremendous economic value today.  
[00:00:05] I think 99% of the economic value created by machine learning today  
[00:00:09] is through one type of machine learning, which is called supervised learning.  
[00:00:14] Let's take a look at what that means.  
[00:00:17] Supervised machine learning, or more commonly supervised learning,  
[00:00:20] refers to algorithms that learn X to Y or input to output mappings.  
[00:00:28] The key characteristic of supervised learning is that  
[00:00:32] you give your learning algorithm examples to learn from that include the right answers,  
[00:00:39] where by right answer, I mean the correct label Y for a given input X.  
[00:00:45] And is by seeing correct pairs of input X and desired output label Y  
[00:00:52] that the learning algorithm eventually learns to take just the input alone  
[00:00:56] without the output label and gives a reasonably accurate prediction or guess of the  
[00:01:02] output. Let's look at some examples. If the input X is an email and the output Y is this email  
[00:01:11] spam or not spam. This gives you your spam filter. Or if the input is an audio clip and the  
[00:01:21] algorithm's job is to output the text transcript, then this is speech recognition. Or if you want  
[00:01:31] to input English and have it output the corresponding spam  
[00:01:35] Spanish, Arabic, Hindi, Chinese, Japanese, or something else translation.  
[00:01:39] Then that's machine translation.  
[00:01:43] Or the most lucrative form of supervised learning today is probably used in online advertising.  
[00:01:50] Nearly all the large online ad platforms have a learning algorithm that inputs some information about an ad and some information about you  
[00:01:59] and then tries to figure out if you will click on that ad or not, because by showing you ads that you're  
[00:02:06] slightly more likely to click on. For these large online ad platforms, every click  
[00:02:10] is revenue. This actually drives a lot of revenue for these companies. This is something I once done a lot of  
[00:02:17] work on, maybe not the most inspiring application, but it certainly has a significant economic  
[00:02:22] impact in some companies today. Or if you want to build a self-driving car, the learning algorithm would  
[00:02:30] take as input to an image and some information from other sensors, such as a radar or other things,  
[00:02:36] and then try to output the position of, say, other cars so that your self-driving car can safely  
[00:02:43] drive around the other cars. Or take manufacturing. I've actually done a lot of work in this sector at  
[00:02:50] landing AI. You can have a learning algorithm, takes its input, a picture of a manufactured product. Say a  
[00:02:58] cell phone that just rode off the production line and have the learning algorithm output whether or not  
[00:03:04] there is a scratch, dent, or other defects in the product.  
[00:03:08] This is called visual inspection and is helping manufacturers reduce or prevent defects  
[00:03:13] in their products. In all of these applications, you would first train your model with examples  
[00:03:20] of inputs X and the right answers, that is, the labels Y. After the model has learned from these  
[00:03:27] input outputs or X and Y pairs, they can then take a brand new input X, something has never seen before,  
[00:03:34] and try to produce the appropriate corresponding output Y.  
[00:03:40] Let's dive more deeply into one specific example.  
[00:03:45] Say you want to predict housing prices based on the size of the hulls.  
[00:03:50] You've collected some data and say you plot the data, and it looks like this.  
[00:03:55] Here on the horizontal axis is the size of the house in square feet,  
[00:03:59] and yes, I live in the United States where we still use square feet. I know most of the world  
[00:04:04] uses square meters.  
[00:04:07] And here on the vertical axis is the price of the hulls in, say, thousands of dollars.  
[00:04:13] So with this data, let's say a friend wants to know what's the price for their 750 square foot  
[00:04:20] hulls.  
[00:04:21] How can the learning algorithm help you?  
[00:04:24] One thing a learning algorithm might be able to do is, say, fit a straight line to the  
[00:04:28] data.  
[00:04:30] And reading off the straight line, it looks like your friend's house could be sold for maybe  
[00:04:34] about, I don't know, 150,000 dollars.  
[00:04:37] But fitting a straight line isn't the only learning item you can use.  
[00:04:43] There are others that could work better for this application.  
[00:04:46] For example, rather than fitting a straight line, you might decide that it's better to fit a curve,  
[00:04:52] a function that's slightly more complicated or more complex than a straight line.  
[00:04:58] If you do that and make a prediction here, then it looks like, well, your friend's hulls  
[00:05:03] could be sold for closer to $200,000.  
[00:05:08] One of the things you see later in this class is how you can decide whether to fit a straight line,  
[00:05:14] a curve, or another function that is even more complex to the data.  
[00:05:20] Now, it doesn't seem appropriate to pick the one that gives your friend the best price,  
[00:05:25] but one thing you see is how to get an algorithm to systematically choose the most appropriate  
[00:05:31] line or curve or other thing to fit to this data. What you've seen in this slide is an example,  
[00:05:38] example of supervised learning.  
[00:05:40] Because we gave the algorithm a data set in which the so-called right answer,  
[00:05:45] that is, the label or the correct price Y, is given for every house on the plot,  
[00:05:51] and the task of the learning algorithm is to produce more of these right answers,  
[00:05:56] specifically predicting what is the likely price for other houses like your friend's house.  
[00:06:02] That's why this is supervised learning.  
[00:06:06] To define a little bit more terminology, this  
[00:06:09] housing price prediction is a particular type of supervised learning called regression.  
[00:06:14] And by regression, I mean we're trying to predict a number from infinitely many possible numbers,  
[00:06:21] such as the house prices in our example, which could be 150,000, or 70,000, or 183,000, or any other number in between.  
[00:06:33] So that's supervised learning, learning input, output, or X to Y mappings.  
[00:06:39] And you saw in this video an example of regression where the task is to predict a number.  
[00:06:45] But there's also a second major type of supervised learning problem called classification.  
[00:06:52] Let's take a look at what that means in the next video.
