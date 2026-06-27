# Error Metrics for Skewed Datasets (Optional) — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](error-metrics-for-skewed-datasets.md)

---

[00:00:01] If you're working on a machine learning application where the ratio of positive to negative examples is very skewed, very far from 50-50,  
[00:00:10] then it turns out that the usual error metrics, like accuracy, don't work that well.  
[00:00:16] Let's start with an example.  
[00:00:18] Let's say you're training a binary classifier to detect a rare disease in patients based on lab tests or based on other data from the patients.  
[00:00:29] So y is equal to 1 if the disease is present, and y is equal to 0 otherwise.  
[00:00:37] And suppose you find that you've achieved 1% error on the test set, so you have a 99% correct diagnosis.  
[00:00:45] This seems like a great outcome, right?  
[00:00:48] But it turns out that if this is a rare disease, so y is equal to 1 very rarely, then this may not be as impressive as it sounds.  
[00:00:58] Specifically, if it is a rare disease, and if only 0.5% of the patients in your population have the disease,  
[00:01:07] then if instead you wrote a program that just said print y equals 0, it predicts y equals 0 all the time,  
[00:01:15] this very simple, even non-learning algorithm, because it just says y equals 0 all the time,  
[00:01:20] this will actually have 99.5% accuracy or 0.5% error.  
[00:01:28] So this really dumb algorithm outperforms your learning algorithm, which had 1% error, much worse than 0.5% error.  
[00:01:37] But I think a piece of software that just prints y equals 0 is not a very useful diagnostic tool.  
[00:01:44] What this really means is that you can't tell if getting 1% error is actually a good result or a bad result.  
[00:01:52] And in particular, if you have one algorithm that achieves 99.5% accuracy,  
[00:01:59] a different one that achieves 99.2% accuracy, a different one that achieves 99.6% accuracy,  
[00:02:08] it's difficult to know which of these is actually the best algorithm.  
[00:02:12] Because if you have an algorithm that achieves 0.5% error and a different one that achieves 1% error  
[00:02:21] and a different one that achieves 1.2% error, it's difficult to know which of these is the best algorithm.  
[00:02:28] Because the one with the lowest error may be a not particularly useful prediction like this  
[00:02:34] that always predicts y equals 0 and never ever diagnoses any patient as having this disease.  
[00:02:40] And quite possibly, an algorithm that has 1% error but that at least diagnoses some patients as having the disease  
[00:02:48] could be more useful than just printing y equals 0 all the time.  
[00:02:52] When working on problems with skewed datasets, we usually use a different error metric  
[00:02:59] rather than just classification error to figure out how well your learning algorithm is doing.  
[00:03:05] In particular, a common pair of error metrics are precision and recall, which we'll define on the slide.  
[00:03:13] In this example, y equals 1 will be the rare class, such as a rare disease that we may want to detect.  
[00:03:21] And in particular, to evaluate a learning algorithm's performance with one rare class,  
[00:03:28] it will be useful to construct what's called a confusion matrix, which is a 2x2 table that looks like this.  
[00:03:38] On the axis on top, I'm going to write the actual class, which could be 1 or 0.  
[00:03:44] And on the vertical axis, I'm going to write the predicted class,  
[00:03:48] which is what did your learning algorithm predict on a given example, 1 or 0.  
[00:03:54] To evaluate your algorithm's performance on the cross-validation set or the test set,  
[00:03:59] we would then count up how many examples was the actual class 1 and the predicted class 1.  
[00:04:06] Maybe you have 100 cross-validation examples and on 15 of them,  
[00:04:11] the learning algorithm had predicted 1 and the actual label was also 1.  
[00:04:17] And over here, you would count up the number of examples in, say, your cross-validation set  
[00:04:23] where the actual class was 0 and your algorithm predicted 1, so maybe you have 5 examples there.  
[00:04:30] And here, predicted class 0, actual class 1, so you have 10 examples.  
[00:04:35] And let's say 70 examples with predicted class 0 and actual class 0.  
[00:04:41] In this example, the skew isn't as extreme as what I had on the previous slide  
[00:04:48] because in these 100 examples in your cross-validation set,  
[00:04:53] we have a total of 25 examples where the actual class was 1  
[00:04:59] and 75 where the actual class was 0 by adding up these numbers vertically.  
[00:05:06] And you notice also that I'm using different colors to indicate these four cells in the table.  
[00:05:13] I'm actually going to give names to these four cells.  
[00:05:16] When the actual class is 1 and the predicted class is 1,  
[00:05:19] we're going to call that a true positive because you predicted positive and it was true.  
[00:05:25] There's a positive example.  
[00:05:27] In this cell on the lower right where the actual class is 0 and the predicted class is 0,  
[00:05:32] we're going to call that a true negative because you predicted negative and it was true.  
[00:05:37] It really was a negative example.  
[00:05:40] This cell on the upper right is called a false positive  
[00:05:47] because the algorithm predicted positive but it was false.  
[00:05:51] It's not actually positive, so this is called a false positive.  
[00:05:55] And this cell is called the number of false negatives  
[00:05:59] because the algorithm predicted 0 but it was false.  
[00:06:02] It wasn't actually negative. The actual label, the actual class was 1.  
[00:06:08] Having divided the classifications into these four cells,  
[00:06:13] two common metrics you might compute are then the precision and recall.  
[00:06:18] Here's what they mean.  
[00:06:20] The precision of learning algorithm computes,  
[00:06:23] of all the patients where we predicted y is equal to 1,  
[00:06:26] what fraction actually has the rare disease?  
[00:06:30] In other words, precision is defined as the number of true positives  
[00:06:36] divided by the number classified as positive.  
[00:06:42] In other words, of all the examples you predicted as positive,  
[00:06:45] what fraction do we actually get right?  
[00:06:48] Another way to write this formula would be  
[00:06:51] true positives divided by true positives plus false positives  
[00:07:01] because it is by summing this cell and this cell  
[00:07:07] that you end up with the total number that was predicted as positive.  
[00:07:12] In this example, the numerator true positives would be 15  
[00:07:16] and divided by 15 plus 5 and so that's 15 over 20 or 3 quarters or 0.75.  
[00:07:26] We say that this algorithm has a precision of 75 percent  
[00:07:30] because of all the things that predicted as positive,  
[00:07:34] of all the patients that it thought has this rare disease,  
[00:07:37] it was right 75 percent of the time.  
[00:07:40] The second metric that is useful to compute is recall.  
[00:07:45] Recall asks, of all the patients that actually have the rare disease,  
[00:07:49] what fraction do we correctly detect as having it?  
[00:07:53] Recall is defined as the number of true positives  
[00:07:57] divided by the number of actual positives.  
[00:08:02] Alternatively, we can write that as number of true positives  
[00:08:07] divided by the number of actual positives is this cell plus this cell.  
[00:08:14] It's actually the number of true positives plus the number of false negatives  
[00:08:20] because it's by summing up this upper left cell and this lower left cell  
[00:08:23] that you get the number of actual positive examples.  
[00:08:27] In our example, this would be 15 divided by 15 plus 10,  
[00:08:32] which is 15 over 25, which is 0.6 or 60 percent.  
[00:08:41] This learning algorithm would have 0.75 precision and 0.60 recall.  
[00:08:47] You notice that this will help you detect  
[00:08:50] if the learning algorithm is just printing y equals 0 all the time  
[00:08:56] because if it predicts 0 all the time,  
[00:09:00] then the numerator of both of these quantities will be 0.  
[00:09:05] It has no true positives,  
[00:09:08] and the recall metric in particular helps you detect  
[00:09:11] if the learning algorithm is predicting 0 all the time  
[00:09:16] because if your learning algorithm just prints y equals 0,  
[00:09:22] then the number of true positives will be 0  
[00:09:27] because it never predicts positive,  
[00:09:29] and so the recall will be equal to 0  
[00:09:32] divided by the number of actual positives, which is equal to 0.  
[00:09:37] In general, a learning algorithm with either 0 precision or 0 recall  
[00:09:42] is not a useful algorithm.  
[00:09:44] But just as a side note,  
[00:09:46] if an algorithm actually predicts 0 all the time,  
[00:09:49] precision actually becomes undefined because it's actually 0 over 0.  
[00:09:54] But in practice, if an algorithm doesn't predict even a single positive,  
[00:09:58] we'll just say that precision is also equal to 0.  
[00:10:01] But computing precision and recall makes it easier for you to spot  
[00:10:07] if a learning algorithm,  
[00:10:09] but we'll find that computing both precision and recall  
[00:10:12] makes it easier to spot if an algorithm is both reasonably accurate  
[00:10:16] in that when it says a patient has a disease,  
[00:10:20] there's a good chance the patient has a disease,  
[00:10:22] such as 0.75 chance in this example.  
[00:10:24] And also making sure that of all the patients that have the disease,  
[00:10:28] it's hoping to diagnose a reasonable fraction of them,  
[00:10:31] such as here it's finding 60% of them.  
[00:10:34] So when you have a rare cause,  
[00:10:37] looking at precision and recall,  
[00:10:39] and making sure that both numbers are decently high,  
[00:10:42] that hopefully helps reassure you that your learning algorithm is actually useful.  
[00:10:48] And the term recall was motivated by this observation that  
[00:10:53] if you have a group of patients or a population of patients,  
[00:10:57] then recall measures of all the patients that have the disease,  
[00:11:01] how many would you have accurately diagnosed as having it.  
[00:11:06] So when you have skewed causes or a rare cause that you want to detect,  
[00:11:11] precision and recall helps you tell if your learning algorithm  
[00:11:15] is making good predictions or useful predictions.  
[00:11:19] Now that we have these metrics for telling how well your learning algorithm is doing,  
[00:11:23] in the next video, let's take a look at how to trade off between  
[00:11:27] precision and recall to try to optimize the performance of your learning algorithm.
