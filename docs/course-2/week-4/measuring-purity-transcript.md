# Measuring Purity — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](measuring-purity.md)

---

[00:00:02] In this video, we'll look at a way of measuring the purity of a set of examples.  
[00:00:07] If the examples are all cats or a single class, then it's very pure.  
[00:00:11] If it's all not cats, that's also very pure.  
[00:00:15] But if it's somewhere in between, how do you quantify how pure is the set of examples?  
[00:00:20] Let's take a look at the definition of entropy, which is a measure of the impurity of a set of data.  
[00:00:27] Given a set of 6 examples like this, we have 3 cats and 3 dogs.  
[00:00:33] Let's define p1 to be the fraction of examples that are cats.  
[00:00:38] That is, the fraction of examples with a label 1. That's what the subscript 1 indicates.  
[00:00:43] And so p1 in this example is equal to 3 out of 6.  
[00:00:49] We're going to measure the impurity of a set of examples using a function called the entropy, which looks like this.  
[00:01:01] The entropy function is conventionally denoted as capital H of this number p1.  
[00:01:10] The function looks like this curve over here, where the horizontal axis is p1, the fraction of cats in the sample,  
[00:01:19] and the vertical axis is the value of the entropy.  
[00:01:22] In this example, where p1 is 3 out of 6, or 0.5, the value of the entropy of p1 would be equal to 1.  
[00:01:32] You notice that this curve is highest when your set of examples is 50-50, so it's most impure.  
[00:01:41] It has an impurity of 1, or really an entropy of 1, when your set of examples is 50-50.  
[00:01:47] Whereas in contrast, if your set of examples was either all cats or all not cats, then the entropy is 0.  
[00:01:56] Let's just go through a few more examples to gain further intuition about entropy and how it works.  
[00:02:02] Here's a different set of examples with 5 cats and 1 dog.  
[00:02:08] So p1, the fraction of positive examples, the fraction of examples labeled 1, is 5-6.  
[00:02:16] So p1 is about 0.83, and if you read off that value at about 0.83, we find that the entropy of p1 is about 0.65,  
[00:02:31] and here I'm writing it only to 2 significant digits.  
[00:02:34] Here's one more example.  
[00:02:36] This sample of 6 images has all cats, so p1 is 6 out of 6 because all 6 are cats,  
[00:02:44] and the entropy of p1 is this point over here, which is 0.  
[00:02:48] And so we see that as you go from 3-6 to 6 out of 6 cats, the impurity decreases from 1 to 0,  
[00:02:58] or in other words, the purity increases as you go from a 50-50 mix of cats and dogs to all cats.  
[00:03:06] Let's look at a few more examples.  
[00:03:09] Here's another sample with 2 cats and 4 dogs.  
[00:03:13] So p1 here is 2-6, which is 1-3, and if you read off the entropy at 0.33, it turns out to be about 0.92.  
[00:03:27] And this is actually quite impure, and in particular, this set is more impure than this set because it's closer to a 50-50 mix,  
[00:03:40] which is why the impurity here is 0.92 as opposed to 0.65.  
[00:03:46] And finally, one last example, if we have a set of all 6 dogs, then p1 is equal to 0,  
[00:03:54] and the entropy of p1 is just this number down here, which is equal to 0.  
[00:03:59] So this is a 0 impurity, or this would be a completely pure set of all non-cats, or all dogs.  
[00:04:07] Now, let's look at the actual equation for the entropy function, h of p1.  
[00:04:14] Recall that p1 is the fraction of examples that are equal to cats.  
[00:04:21] So if you have a sample that is 2-3 cats, then that sample must have 1-3 non-cats.  
[00:04:29] So let me define p0 to be equal to the fraction of examples that are non-cats, to be just equal to 1-p1.  
[00:04:38] The entropy function is then defined as negative p1 log p1,  
[00:04:45] and by convention, when computing entropy, we take logs to base 2 rather than to base e,  
[00:04:54] and then minus p0 log base 2 of p0.  
[00:05:00] Alternatively, this is also equal to negative p1 log p1 minus 1-p1 log 1-p1.  
[00:05:14] And if you were to plot this function on a computer, you find that it would be exactly this function on the left.  
[00:05:21] And we take log base 2 just to make the peak of this curve equal to 1.  
[00:05:27] If you were to take log of base e, or the base of natural logarithms, then that just vertically scales this function.  
[00:05:35] And it will still work, but the number has become a bit hard to interpret  
[00:05:39] because the peak of the function isn't a nice round number like 1 anymore.  
[00:05:44] One note on computing this function, if p1 or p0 is equal to 0,  
[00:05:54] then an expression like this will look like 0 log of 0.  
[00:06:00] And log of 0 is technically undefined. It is actually negative infinity.  
[00:06:06] But by convention, for the purposes of computing entropy, we'll take 0 log 0 to be equal to 0,  
[00:06:13] and that will correctly compute the entropy at 0 or at 1 to be equal to 0.  
[00:06:20] If you're thinking that this definition of entropy looks a little bit like the definition of the logistic loss  
[00:06:27] that we learned about in the last course,  
[00:06:29] there is actually a mathematical rationale for why these two formulas look so similar.  
[00:06:35] But you don't have to worry about it, and we won't get into it in this class.  
[00:06:39] But applying this formula for entropy should work just fine when you're building a decision tree.  
[00:06:44] To summarize, the entropy function is a measure of the impurity of a set of data.  
[00:06:50] It starts from 0, goes up to 1, and then comes back down to 0  
[00:06:54] as a function of the fraction of positive examples in your sample.  
[00:06:59] There are other functions that look like this, that go from 0 up to 1 and then back down.  
[00:07:03] For example, if you look in open source packages, you may also hear about something called the Gini criteria,  
[00:07:09] which is another function that looks a lot like the entropy function,  
[00:07:13] and that will work well as well for building decision trees.  
[00:07:16] But for the sake of simplicity in these videos, I'm going to focus on using the entropy criteria,  
[00:07:23] which will usually work just fine for most applications.  
[00:07:27] Now that we have this definition of entropy, in the next video,  
[00:07:31] let's take a look at how you can actually use it to make decisions  
[00:07:34] as to what feature to split on in the nodes of a decision tree.
