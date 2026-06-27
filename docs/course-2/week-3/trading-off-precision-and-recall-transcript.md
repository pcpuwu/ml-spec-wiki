# Trading Off Precision and Recall (Optional) — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](trading-off-precision-and-recall.md)

---

[00:00:01] In the ideal case, we'd like for our learning algorithms to have high precision and high recall.  
[00:00:06] High precision would mean that if it diagnoses a patient of that rare disease,  
[00:00:11] probably the patient does have it and it's an accurate diagnosis.  
[00:00:15] And high recall means that if there's a patient with that rare disease,  
[00:00:19] probably the algorithm will correctly identify that they do have that disease.  
[00:00:24] But it turns out that in practice, there's often a trade-off between precision and recall.  
[00:00:29] In this video, we'll take a look at that trade-off and how you can pick a good point along that trade-off.  
[00:00:35] So here are the definitions from the last video on precision and recall. I'll just write them here.  
[00:00:41] What you recall, precision is the number of true positives divided by the total number that was predicted positive.  
[00:00:48] And recall is the number of true positives divided by the total actual number of positives.  
[00:00:55] If you're using logistic regression to make predictions,  
[00:00:59] then the logistic regression model will output numbers between 0 and 1.  
[00:01:05] We would typically threshold the output of logistic regression at 0.5 and predict 1  
[00:01:13] if f of x is greater than or equal to 0.5 and predict 0 if it's less than 0.5.  
[00:01:20] But suppose we want to predict that y is equal to 1, that is, the rare disease is present, only if we're very confident.  
[00:01:28] So if our philosophy is, whenever we predict that a patient has a disease,  
[00:01:33] we may have to send them for a possibly invasive and expensive treatment.  
[00:01:39] So if the consequences of the disease aren't that bad, even if left not treated aggressively,  
[00:01:46] then we may want to predict y equals 1 only if we're very confident.  
[00:01:50] In that case, we may choose to set a higher threshold where we will predict y is 1 only if f of x is greater than or equal to 0.7.  
[00:02:01] So this is saying we'll predict y equals 1 only if we're at least 70% sure rather than just 50% sure.  
[00:02:09] And so this number also becomes 0.7.  
[00:02:12] Notice that these two numbers have to be the same because it's just depending on whether it's greater than or equal to or less than this number that you predict 1 or 0.  
[00:02:22] And by raising this threshold, you predict y equals 1 only if you're pretty confident.  
[00:02:29] And what that means is that precision will increase because whenever you predict 1, you're more likely to be right.  
[00:02:38] So raising the threshold will result in higher precision, but it also results in lower recall because we're now predicting 1 less often.  
[00:02:50] And so of the total number of patients with the disease, we're going to correctly diagnose fewer of them.  
[00:02:59] So by raising this threshold to 0.7, you end up with higher precision but lower recall.  
[00:03:08] And in fact, if you want to predict y equals 1 only if you're very, very confident, you can even raise this higher to 0.9.  
[00:03:17] And that results in an even higher precision.  
[00:03:20] And so whenever you predict a patient has the disease, you're probably right.  
[00:03:24] And this will give you a very high precision, but recall will go even further down.  
[00:03:29] On the flip side, suppose we want to avoid missing too many cases of the rare disease.  
[00:03:36] So if what we want is when in doubt, predict y equals 1.  
[00:03:42] This might be the case where if treatment is not too invasive or painful or expensive, but leaving a disease untreated has much worse consequences for the patient.  
[00:03:54] So in that case, you might say, when in doubt, in the interest of safety, let's just predict that they have it and consider them for treatment because untreated cases could be quite bad.  
[00:04:05] If for your application, that is the better way to make decisions, then you would take this threshold and instead lower it, say set it to 0.3.  
[00:04:16] In that case, you predict 1 so long as you think there's maybe a 30 percent chance or better of the disease being present.  
[00:04:24] And you predict 0 only if you're pretty sure that the disease is absent.  
[00:04:29] And as you can imagine, the impact on precision and recall will be opposite.  
[00:04:34] So what you saw up here and lowering this threshold will result in lower precision because we're now looser.  
[00:04:46] We're more willing to predict 1 even if we aren't sure, but to result in higher recall.  
[00:04:53] Because of all the patients that do have that disease, we're probably going to correctly identify more of them.  
[00:05:00] More generally, we have the flexibility to predict 1 only if F is above some threshold.  
[00:05:07] And by choosing this threshold, we can make different tradeoffs between precision and recall.  
[00:05:14] And it turns out that for most learning algorithms, there is a tradeoff between precision and recall.  
[00:05:20] Precision and recall both go between 0 and 1.  
[00:05:24] And if you were to set a very high threshold, say a threshold of 0.99, then you end up with very high precision but lower recall.  
[00:05:35] And as you reduce the value of this threshold, you then end up with a curve that trades off precision and recall  
[00:05:44] until eventually, if you have a very low threshold, say the threshold equals 0.01, then you end up with very low precision but relatively high recall.  
[00:05:55] And sometimes by plotting this curve, you can then try to pick a threshold which corresponds to picking a point on this curve  
[00:06:02] that balances the cost of false positives and false negatives or that balances the benefits of high precision and high recall.  
[00:06:11] So plotting precision and recall for different values of the threshold allows you to pick a point that you want.  
[00:06:20] Notice that picking the threshold is not something you can really do with cross-validation because it's up to you to specify the best point.  
[00:06:33] For many applications, manually picking the threshold to trade off precision and recall will be what you end up doing.  
[00:06:41] It turns out that if you want to automatically trade off precision and recall rather than have to do so yourself,  
[00:06:48] there is another metric called the F1 score that is sometimes used to automatically combine precision and recall  
[00:06:56] to help you pick the best value or the best tradeoff between the two.  
[00:07:00] One challenge with precision and recall is you're now evaluating your algorithms using two different metrics.  
[00:07:07] So if you've trained three different algorithms and the precision and recall numbers look like this,  
[00:07:13] it's not that obvious how to pick which algorithm to use.  
[00:07:18] If there was an algorithm that's better on precision and better on recall, then you probably want to go with that one.  
[00:07:24] But in this example, algorithm 2 has the highest precision, but algorithm 3 has the highest recall,  
[00:07:31] and algorithm 1 kind of trades off the two in between.  
[00:07:34] So no one algorithm is obviously the best choice.  
[00:07:39] So in order to help you decide which algorithm to pick, it may be useful to find a way to combine precision and recall into a single score.  
[00:07:50] So you can just look at which algorithm has the highest score and maybe go with that one.  
[00:07:57] One way you could combine precision and recall is to take the average.  
[00:08:01] This turns out not to be a good way, so I don't really recommend this.  
[00:08:05] But if you were to take the average, you'd get 0.45, 0.4, and 0.5.  
[00:08:11] But it turns out that computing the average and picking the algorithm with the highest average between precision and recall  
[00:08:17] doesn't work that well, because this algorithm has very, very low precision.  
[00:08:22] And in fact, this corresponds maybe to an algorithm that actually does print y equals 1 and diagnoses all patients as having the disease.  
[00:08:33] That's why its recall is perfect, but the precision is really low.  
[00:08:37] So algorithm 3 is actually not a particularly useful algorithm, even though the average between precision and recall is quite high.  
[00:08:46] So let's not use the average between precision and recall.  
[00:08:51] Instead, the most common way of combining precision and recall is to compute something called the F1 score.  
[00:08:59] And the F1 score is a way of combining T and R, precision and recall, but that gives more emphasis to whichever of these values is lower.  
[00:09:08] Because it turns out, if an algorithm has very low precision or very low recall, it's probably not that useful.  
[00:09:14] So the F1 score is a way of computing an average of sorts that pays more attention to whichever is lower.  
[00:09:23] And the formula for computing the F1 score is this.  
[00:09:28] You're going to compute 1 over P and 1 over R and average them, and then take the inverse of that.  
[00:09:37] So rather than averaging P and R, precision and recall, we're going to average 1 over P and 1 over R, and then take 1 over that.  
[00:09:46] And if you simplify this equation, it can also be computed as follows.  
[00:09:50] But by averaging 1 over P and 1 over R, this gives a much greater emphasis to if either P or R turns out to be very small.  
[00:09:59] If you were to compute the F1 score for these three algorithms, you'd find that the F1 score for algorithm 1 is 0.444.  
[00:10:08] And for the second algorithm, it's 0.175.  
[00:10:11] And you notice that 0.175 is much closer to the lower value than the higher value.  
[00:10:17] And for the third algorithm, it's 0.0392.  
[00:10:22] And so F1 score gives a way to trade off precision and recall.  
[00:10:27] And in this case, it'll tell us that maybe the first algorithm is better than the second or the third algorithms.  
[00:10:34] And by the way, in math, this equation is also called the harmonic mean of P and R.  
[00:10:42] And the harmonic mean is a way of taking an average that emphasizes the smaller values more.  
[00:10:48] But for the purposes of this class, you don't need to worry about that terminology of the harmonic mean.  
[00:10:53] So congratulations on getting to the last video of this week.  
[00:10:56] And thank you also for sticking with me through these two optional videos.  
[00:11:00] In this week, you've learned a lot of practical tips, practical advice for how to build a machine learning system.  
[00:11:07] And by applying these ideas, I think you'd be very effective at building machine learning algorithms.  
[00:11:15] Next week, we'll come back to talk about another very powerful machine learning algorithm.  
[00:11:21] In fact, of the advanced techniques that are widely used in many commercial production settings,  
[00:11:27] I think at the top of the list would be neural networks and decision trees.  
[00:11:31] So next week, we'll talk about decision trees, which I think will be another very powerful technique that you could use to build many successful applications as well.  
[00:11:41] So I look forward to seeing you next week.
