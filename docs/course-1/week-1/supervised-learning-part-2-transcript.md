# Supervised Learning, Part 2 — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](supervised-learning-part-2.md)

---

[00:00:02] So supervised learning algorithms learn to predict input to output or x-to-y mappings.  
[00:00:08] And in the last video, you saw that regression algorithms, which is a type of supervised learning algorithm,  
[00:00:15] learns to predict numbers out of infinitely many possible numbers.  
[00:00:19] There's a second major type of supervised learning algorithm called a classification algorithm.  
[00:00:25] Let's take a look at what this means.  
[00:00:27] Take breast cancer detection as an example of a  
[00:00:32] classification problem.  
[00:00:34] Say you're building a machine learning system so that doctors can have a diagnostic tool to detect breast cancer.  
[00:00:40] This is important because early detection could potentially save a patient's life.  
[00:00:45] Using a patient's medical records, your machine learning system tries to figure out if a tumor,  
[00:00:52] that is a lump, is malignant, meaning cancerous or dangerous,  
[00:00:57] or if that tumor, that lump, is benign, meaning that, you know, it's just a lung, is malignant,  
[00:01:02] that, you know, it's just a lump that isn't cancerous and isn't that dangerous.  
[00:01:06] Some of my friends have actually been working on this specific problem.  
[00:01:11] So maybe your dataset has tumors of various sizes, and these tumors are labeled as either  
[00:01:18] a nine, which I will designate in this example, with a zero, or malignant, which I'll designate  
[00:01:25] in this example, with a 1. You can then plot your data on a graph like this,  
[00:01:32] where the horizontal axis represents the size of the tumor,  
[00:01:37] and the vertical axis takes on only two values, 0 or 1,  
[00:01:41] depending on whether the tumor is benign, 0, or malignant, 1.  
[00:01:47] One reason that this is different from regression is that we're trying to predict  
[00:01:55] only a small number of possible outputs or calories.  
[00:01:59] In this case, two possible outputs, 0 or 1, benign,  
[00:02:02] benign or malignant. This is different from regression, which tries to predict any number  
[00:02:09] or the infinitely many number of possible numbers. And so the fact that there are only two possible outputs  
[00:02:18] is what makes this classification. Because there are only two possible outputs or two possible  
[00:02:25] categories in this example, you can also plot this dataset on a line like this, where now I'm  
[00:02:33] going to use two different symbols to denote the category using a circle or an O to  
[00:02:41] denote the benign examples and across to denote the malignant examples. And if a new patient  
[00:02:49] walks in for a diagnosis and they have a lump that is this size, then the question is, will your system  
[00:02:57] classify this tumor as benign or malignant? It turns out that in  
[00:03:04] In classification problems, you can also have more than two possible output categories.  
[00:03:10] Maybe your learning algorithm can output multiple types of cancer diagnoses if it turned out to  
[00:03:15] be malignant. So let's call two different types of cancer type 1 and type 2. In this case,  
[00:03:23] the algorithm would have three possible output categories it could predict. And by the way,  
[00:03:30] in classification, the terms output classes and output  
[00:03:35] categories are often used interchangeably. So when I say class or category, when referring  
[00:03:41] to the output, it means the same thing. So to summarize, classification algorithms predict  
[00:03:48] categories. Categories don't have to be numbers. It could be non-numeric. For example,  
[00:03:55] it can predict whether a picture is that of a cat or a dog, and it can predict if a tumor is benign or  
[00:04:05] malignant. Categories can also be numbers like 0 or 1 or 0 or 2. But what makes classification  
[00:04:14] different from regression when you're interpreting the numbers is that classification  
[00:04:19] predicts a small, finite, limited set of possible output categories, such as 01 and 2, but not all  
[00:04:28] possible numbers in between, like 0.5 or 1.7. In the example of supervised learning that we've  
[00:04:37] we've been looking at, we had only one input value, the size of the tumor. But you can also use  
[00:04:46] more than one input value to predict an output. Here's an example. Instead of just knowing  
[00:04:53] the tumor size, say you also have each patient's age in years. Your new data set now has two inputs,  
[00:05:02] age and tumor size. While in this new dataset, we're going to use circles to show patients  
[00:05:08] whose tumors are benign and crosses to show the patients with a tumor that was malignant.  
[00:05:17] So when a new patient comes in, the doctor can measure the patient's tumor size and also record  
[00:05:23] the patient's age. And so given this, how can we predict if this patient's tumor is benign or malignant?  
[00:05:32] Well, given the data said like this, what the learning algorithm might do is find some boundary that separates out  
[00:05:39] the malignant tumors from the benign ones. So the learning algorithm has to decide how to fit a  
[00:05:47] boundary line to this data. The boundary line found by the learning algorithm would help the doctor  
[00:05:54] with the diagnosis. In this case, the tumor is more likely to be benign. From this example,  
[00:06:02] we've seen how two inputs, the patient's age and tumor size, can be used. In other machine learning  
[00:06:08] problems, often many more input values are required. My friends who worked on breast cancer  
[00:06:14] detection use many additional inputs, like the thickness of the tuber clump, uniformity of the  
[00:06:20] cell size, uniformity of the cell shape, and so on. So to recap, supervised learning maps  
[00:06:28] input X to output Y, where the learning algorithm learns from the quote, right answers. The two major  
[00:06:36] types of supervised learning are regression and classification. In a regression application,  
[00:06:42] like predicting prices of houses, the learning algorithm has to predict numbers from infinitely many  
[00:06:48] possible output numbers, whereas in classification, the learning algorithm has to make a prediction  
[00:06:54] of a category, or of a small set of possible outputs. So you now know what is supervised  
[00:07:01] learning, including both regression and classification. I hope you're having fun.  
[00:07:06] Next, there's a second major type of machine learning called unsupervised learning.  
[00:07:12] Let's go on to the next video to see what that is.
