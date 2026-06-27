# Deciding What to Try Next — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](deciding-what-to-try-next.md)

---

[00:00:02] Hi and welcome back. By now, you've seen a lot of different learning algorithms, including  
[00:00:07] linear regression, logistic regression, even deep learning or neural networks. And next  
[00:00:12] week you'll see decision trees as well. So you now have a lot of powerful tools of machine  
[00:00:18] learning, but how do you use these tools effectively? I've seen teams sometimes take six months  
[00:00:24] to build a machine learning system that I think a more skilled team could have taken  
[00:00:29] or done in just a couple of weeks. And the efficiency of how quickly you can get a machine  
[00:00:34] learning system to work well will depend a large part on how well you can repeatedly  
[00:00:39] make good decisions about what to do next in the course of a machine learning project.  
[00:00:44] So in this week, I hope to share with you a number of tips on how to make decisions  
[00:00:48] about what to do next in a machine learning project that I hope will end up saving you  
[00:00:52] a lot of time. So let's take a look at some advice on how to build machine learning systems.  
[00:00:59] Let's start with an example. Say you've implemented regularized linear regression to predict  
[00:01:04] housing prices. So you have the usual cost function for your learning algorithm, squared  
[00:01:11] error plus regularization term. But if you've trained the model and find that it makes unacceptably  
[00:01:17] large errors in its predictions, what do you try next? When you're building a machine learning  
[00:01:22] algorithm, there are usually a lot of different things you could try. For example, you could  
[00:01:26] decide to get more training examples since it seems like having more data should help.  
[00:01:32] Or maybe you think maybe you have too many features. You could try a smaller set of features.  
[00:01:37] Or maybe you want to get additional features, such as find additional properties of the  
[00:01:42] houses to toss into your data. And maybe that will help you to do better. Or you might take  
[00:01:48] the existing features, x1, x2, and so on, and try adding polynomial features like x1  
[00:01:53] squared, x2 squared, x1, x2, and so on. Or you might wonder if the value of lambda is  
[00:01:59] chosen well, and you might say, hmm, maybe it's too big. I want to decrease it. Or you  
[00:02:02] may say, oh, maybe it's too small. I want to try increasing it. So on any given machine  
[00:02:08] learning application, it will often turn out that some of these things could be fruitful,  
[00:02:14] and some of these things not fruitful. And a key to being effective at how you build  
[00:02:19] a machine learning algorithm will be if you can find a way to make good choices about  
[00:02:24] where to invest your time. For example, I have seen teams spend literally many, many  
[00:02:29] months collecting more training examples, thinking that more training data has got to  
[00:02:35] help. But it turns out sometimes it helps a lot, and sometimes it doesn't. So in this  
[00:02:40] week, you learn about how to carry out a set of diagnostics. And by diagnostic, I mean  
[00:02:47] a test that you can run to gain insight into what is or isn't working with a learning  
[00:02:52] algorithm, to gain guidance into improving its performance. And some of these diagnostics  
[00:02:57] will tell you things like, is it worth weeks or even months collecting more training data?  
[00:03:02] Because if it is, then you can then go ahead and make the investment to get more data,  
[00:03:06] which will hopefully lead to improved performance. Or if it isn't, then running that diagnostic  
[00:03:12] could have saved you months of time. And one thing you see this week as well is that diagnostics  
[00:03:19] can take time to implement, but running them can be a very good use of your time. So this  
[00:03:26] week, we'll spend a lot of time talking about different diagnostics you can use to give  
[00:03:30] you guidance on how to improve your learning algorithm's performance. But first, let's  
[00:03:35] take a look at how to evaluate the performance of your learning algorithm. Let's go do that  
[00:03:39] in the next video.
