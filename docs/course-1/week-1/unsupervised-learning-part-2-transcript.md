# Unsupervised Learning, Part 2 — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](unsupervised-learning-part-2.md)

---

[00:00:01] In the last video, you saw what is unsupervised learning and one type of unsupervised learning called clustering.  
[00:00:08] Let's give a slightly more formal definition of unsupervised learning and take a quick look at some other types of unsupervised learning other than clustering.  
[00:00:17] Whereas in supervised learning, the data comes with both inputs x and output labels y.  
[00:00:23] In unsupervised learning, the data comes only with inputs x but not output labels y.  
[00:00:30] And the algorithm has to find some structure or some pattern or something interesting in the data.  
[00:00:37] We've seen just one example of unsupervised learning called a clustering algorithm,  
[00:00:43] which groups similar data points together.  
[00:00:46] In this specialization, you learn about clustering as well as two other types of unsupervised learning.  
[00:00:53] One is called anomaly detection, which is used to detect unusual events.  
[00:00:59] This turns out to be really important for fraud detection in the financial system,  
[00:01:05] where unusual events, unusual transactions could be a science of fraud, and for many other applications.  
[00:01:13] And you also learn about dimensionality reduction.  
[00:01:17] This lets you take a big dataset and almost magically compress it to a much smaller data set  
[00:01:23] while losing as little information as possible.  
[00:01:27] In case anomaly detection and dimensioning  
[00:01:29] and dimensionality reduction don't seem to make too much sense to you yet.  
[00:01:33] Don't worry about it.  
[00:01:34] We'll get to this later into specialization.  
[00:01:37] Now, I'd like to ask you another question to help you check your understanding.  
[00:01:43] And no pressure.  
[00:01:44] If you don't get it right on the first try, it's totally fine.  
[00:01:47] Please select any of the following that you think are examples of unsupervised learning.  
[00:01:54] Two are unsupervised examples, and two are supervised examples.  
[00:01:59] So please take a look.  
[00:02:03] Maybe you remember the spam filtering problem.  
[00:02:06] If you have labeled data, you know, labeled as spam or non-spam email,  
[00:02:11] you can treat this as a supervised learning problem.  
[00:02:15] The second example, the news story example.  
[00:02:18] That's exactly the Google News and Tandum example that you saw in the last video.  
[00:02:23] And so you can approach that using a clustering algorithm to group news articles together.  
[00:02:29] So that would use unsupervised learning.  
[00:02:31] The market segmentation example that I talked about a little bit earlier, you can do that  
[00:02:37] as an unsupervised learning problem as well, because you can give your algorithm some data  
[00:02:43] and ask it to discover market segments automatically.  
[00:02:47] And the final example on diagnosing diabetes.  
[00:02:51] Well, actually, that's a lot like our breast cancer example from the supervised learning videos.  
[00:02:58] Only instead of benign or malignant tumors, we instead have diabetes.  
[00:03:02] or not diabetes, and so you can approach this as a supervised learning problem,  
[00:03:07] just like we did for the breast tumor classification problem.  
[00:03:11] Even though in this and the last video, we've talked mainly about clustering,  
[00:03:16] in later videos in this specialization, we'll dive much more deeply into an anomaly detection  
[00:03:21] and dimensionality reduction as well.  
[00:03:25] So that's unsupervised learning.  
[00:03:28] Before we wrap up this section, I want to share of you something that I find really  
[00:03:31] exciting and useful, which is the use of Jupyton notebooks in machine learning.  
[00:03:36] Let's take a look at that in the next video.
