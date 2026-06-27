# What is a Derivative? (Optional) — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](what-is-a-derivative.md)

---

[00:00:02] You've seen how, in TensorFlow, you can specify a neural network architecture, so compute  
[00:00:08] the output y as a function of the input x, and also specify a cost function, and TensorFlow  
[00:00:14] will then automatically use backpropagation to compute derivatives and use gradient descents  
[00:00:21] or Adam to train the parameters of your neural network.  
[00:00:24] So the backpropagation algorithm, which computes derivatives of your cost function with respect  
[00:00:30] to the parameters, is a key algorithm in neural network learning.  
[00:00:35] But how does it actually work?  
[00:00:37] In this and in the next few optional videos, we'll try to take a look at how backpropagation  
[00:00:43] computes derivatives.  
[00:00:44] These videos are completely optional, and they do go just a little bit into calculus.  
[00:00:50] If you're already familiar with calculus, I hope you enjoy these videos, but if not,  
[00:00:54] it's totally fine.  
[00:00:55] We'll build up from the very basics of calculus to try to make sure you have all the intuition  
[00:01:00] you need to understand how backpropagation works.  
[00:01:03] Let's take a look.  
[00:01:04] I'm going to use a simplified cost function, J of W equals W squared.  
[00:01:14] The cost function is a function of the parameters W and say B, and for the simplified cost function,  
[00:01:21] let's just pretend J of W equals W squared, and I'm going to ignore B for this example.  
[00:01:28] Let's say the value of the parameter W is equal to 3.  
[00:01:33] So J of W will be equal to 9, W squared, or 3 squared.  
[00:01:40] Now, if we were to increase W by a tiny amount, say epsilon, which I'm going to set to 0.001,  
[00:01:52] how does the value of J of W change?  
[00:01:57] If we increase W by 0.001, then W becomes 3 plus 0.001, so it's 3.001, and so J of W,  
[00:02:08] which is W squared, which we defined above, is now this 3.001 squared, which is 9.0601.  
[00:02:17] So what we see is that if W goes up by 0.001, I'm going to use this up arrow here to denote W goes up by 0.001,  
[00:02:29] where 0.001 is this small value epsilon, then J of W roughly goes up by 6 times as much, 6 times 0.001.  
[00:02:44] This isn't quite exact, it actually goes up not to 9.006, but 9.0601,  
[00:02:50] but it turns out that if epsilon were infinitesimally small,  
[00:02:56] and by infinitesimally small, I mean very, very, very, very small.  
[00:02:59] You know, epsilon is pretty small, but it's not infinitesimally small.  
[00:03:03] If epsilon was 0.00000, lots of 0's followed by 1, then this becomes more and more accurate.  
[00:03:09] In this example, what we see is that if W goes up by epsilon, then J goes up roughly by 6 times epsilon.  
[00:03:20] And in calculus, what we would say is that the derivative of J of W with respect to W is equal to 6.  
[00:03:30] And all this means is if W goes up by a tiny little amount, J of W goes up 6 times as much.  
[00:03:39] What if epsilon were to take on a different value? What if epsilon were 0.002?  
[00:03:45] So in this case, W would be 3 plus 0.002, and W squared becomes 3.002 squared, which is 9.012004.  
[00:04:00] And in this case, what we conclude is that if W goes up by 0.002, then J of W goes up by roughly 6 times 0.002.  
[00:04:13] It goes up roughly to 9.012, and this 0.012 is roughly 6 times 0.002.  
[00:04:25] Again, it's a little bit off, this extra 0.00004 here, because epsilon is not quite infinitesimally small.  
[00:04:36] And once again, we see this 6 to 1 ratio between how much W goes up versus how much J of W goes up.  
[00:04:45] And that's why the derivative of J of W with respect to W is equal to 6.  
[00:04:51] And the smaller epsilon is, the more accurate this becomes.  
[00:04:54] And by the way, feel free to pause the video and try this calculation out yourself with other values of epsilon.  
[00:05:02] The key is that so long as epsilon is pretty small, the ratio by which J of W goes up versus the amount by which W goes up should be 6 to 1.  
[00:05:12] So feel free to try it out yourself with other values of epsilon and check if this really holds true.  
[00:05:17] And so, this leads us to an informal definition of a derivative, which is that if whenever W goes up by a tiny amount of epsilon,  
[00:05:25] that causes J of W to go up by K times epsilon.  
[00:05:31] And in our example just now, K was equal to 6.  
[00:05:35] Then we say that the derivative of J of W with respect to W is equal to K, which was equal to 6 in the example just now.  
[00:05:46] So you might remember when implementing gradient descent, you would repeatedly use this rule to update the parameter WJ, where as usual alpha is the learning rate.  
[00:05:59] And so, what does gradient descent do?  
[00:06:02] Notice that if the derivative is small, then this update step will make a small update to the parameter WJ.  
[00:06:11] Where as if this derivative term is large, this will result in a big change to the parameter WJ.  
[00:06:18] And this makes sense because this is essentially saying that if the derivative is small,  
[00:06:25] this means that changing W doesn't make a big difference to the value of J.  
[00:06:31] And so, let's not bother to make a huge change to WJ.  
[00:06:36] But if the derivative is large, that means that even a tiny change to WJ can make a big difference in how much you can change or decrease the cost function J of W.  
[00:06:48] So in that case, let's make a bigger change to WJ because doing so will actually make a big difference to how much we can reduce the cost function J.  
[00:06:58] Let's take a look at a few more examples of derivatives.  
[00:07:04] What you saw in the example just now was that if W equals 3 and J of W equals W squared equals 9,  
[00:07:12] then if W goes up by epsilon, by 0.001, then J of W becomes J of 3.001 is now 9.006.001.  
[00:07:25] Or in other words, J has gone up by about 0.006, which is 6 times 0.001 or 6 times epsilon,  
[00:07:36] which is why the derivative of J of W with respect to W is equal to 6.  
[00:07:44] Let's look at what the derivative will be for other values of W.  
[00:07:48] Take W equals 2.  
[00:07:50] In this case, J of W is W squared is now equal to 4.  
[00:07:56] And if W goes up by 0.001, then J of W becomes J of 2.001, which is equal to this, 4.004.001.  
[00:08:08] And so J of W has gone up from 4 to this value over here, which is roughly 4 times epsilon bigger than 4,  
[00:08:19] which is why now the derivative is 4 because W going up by epsilon has caused J of W to go up 4 times as much.  
[00:08:30] And again, this extra 0.001 is because it's not quite accurate because epsilon is an infinitesimally small.  
[00:08:36] Well, let's look at another example.  
[00:08:39] What if W were equal to negative 3?  
[00:08:42] J of W, which is W squared, is still equal to 9 because negative 3 squared is 9.  
[00:08:48] And if W were to go up by epsilon again, then you now have W equals negative 2.999.  
[00:08:57] So that's J of negative 2.999.  
[00:09:00] And the square of negative 2.999 is equal to this, 8.994.001, because W is negative 3 plus 0.001.  
[00:09:10] And notice here, J of W has gone down by about 0.006, which is 6 times epsilon.  
[00:09:21] And so, what we have in this example is that J starts off as 9, but it has now gone down,  
[00:09:30] notice this down arrow here instead of up arrow, by 6 times epsilon.  
[00:09:36] Or equivalently, it has gone up by negative 6 times epsilon.  
[00:09:42] And that's why the derivative in this case is equal to negative 6,  
[00:09:47] because W going up by epsilon causes J of W to go up by negative 6 times epsilon when epsilon is small.  
[00:09:58] Another way to visualize this is to plot the function J of W.  
[00:10:06] So if the horizontal axis is W and this is J of W, then when W is equal to 3, J of W is equal to 9.  
[00:10:15] When it's negative 3, it's also equal to 9.  
[00:10:17] And when it is 2, J of W is equal to 4.  
[00:10:22] Let me make an observation that may be relevant if you've taken a calculus class before.  
[00:10:28] But if you haven't, what I say in the next 60 seconds may not make sense, but don't worry about it.  
[00:10:34] You will need to understand it to fully follow the rest of these videos.  
[00:10:37] If you've taken a class in calculus at some point,  
[00:10:40] you may recognize that the derivatives corresponds to the slope of a line that just touches the function J of W at this point,  
[00:10:51] say, where W equals 3.  
[00:10:53] And so the slope of this line at this point, and the slope is this height over this width,  
[00:11:00] turns out to be equal to 6 when W equals 3.  
[00:11:03] Slope of this line turns out to be 4 when W equals 2.  
[00:11:07] And the slope of this line turns out to be negative 6 when W equals negative 3.  
[00:11:13] And it turns out in calculus, the slope of these lines correspond to the derivative of the function.  
[00:11:19] But if you haven't taken a calculus class before and haven't seen this slope concept before, don't worry about it.  
[00:11:25] Now, there's one last observation I want to make before moving on,  
[00:11:30] which is that you see in all three of these examples, J of W is the same function.  
[00:11:37] J of W is equal to W squared.  
[00:11:39] But the derivative of J of W depends on W.  
[00:11:44] When W is 3, the derivative is 6.  
[00:11:46] When W is 2, the derivative is 4.  
[00:11:49] And when W is negative 3, the derivative is negative 6.  
[00:11:54] It turns out that if you're familiar with calculus, and again, it's totally fine if you're not,  
[00:11:59] calculus can allow us to calculate the derivative of J of W with respect to W as 2 times W.  
[00:12:09] In a little bit, I'll show you how you could use Python to compute these derivatives yourself  
[00:12:16] using a nifty Python package called SymPy.  
[00:12:21] But because calculus tells us that the derivative of W squared, J of W, is 2W,  
[00:12:28] that's why the derivative when W is 3 is 2 times 3.  
[00:12:33] Or when it's 2, it's 2 times 2.  
[00:12:37] Or when it's negative 3, it's 2 times negative 3.  
[00:12:45] Because this value of W times 2 turns out to give you the derivative.  
[00:12:51] Let's go through just a few more examples before we wrap up.  
[00:12:55] For these examples, I'm going to set W equals 2.  
[00:12:59] So you saw in the last slide, if J of W is W squared,  
[00:13:04] then the derivative I set would be 2 times W, which is 4.  
[00:13:10] And so if W goes up by 0.01, this being epsilon,  
[00:13:15] J of W becomes this, so roughly J of W goes up by 4 times epsilon.  
[00:13:21] Let's look at a few other functions.  
[00:13:24] What if J of W is equal to W cubed?  
[00:13:29] So in this case, W cubed, 2 cubed, would be equal to 8.  
[00:13:33] Or what if J of W is just equal to W?  
[00:13:36] So here, W is equal to 2.  
[00:13:39] Or what if J of W was 1 over W?  
[00:13:42] In this case, 1 over W, 1 over 2 would be 1 half or 0.5.  
[00:13:48] What is the derivative of J of W with respect to W  
[00:13:53] when the cost function J of W is either W cubed or W or 1 over W?  
[00:14:00] Let me show you how you can compute these derivatives yourself  
[00:14:04] using a library and package called SymPy.  
[00:14:08] So let me first import SymPy.  
[00:14:12] And what I'm going to do is tell SymPy  
[00:14:16] that I'm going to use J and W as symbols for computing derivatives.  
[00:14:23] So for our first example, we had the cost function J was equal to W squared.  
[00:14:32] Notice how SymPy actually renders it in this nifty font here as well.  
[00:14:38] Now, if we were to use SymPy to take the derivative of J with respect to W,  
[00:14:42] we should do as follows.  
[00:14:44] You see that SymPy tells you this derivative is 2W.  
[00:14:48] Let me actually choose a variable DJDW  
[00:14:52] and set that to be equal to this.  
[00:14:54] I'll just type it again here.  
[00:14:56] So I'll print it out.  
[00:14:58] So that's 2W.  
[00:15:00] And if you want to plug in the value of W into this expression to evaluate it,  
[00:15:05] you can do the derivative dot subs W2.  
[00:15:09] This means plug in the value of W to be equal to 2 into this expression  
[00:15:14] and evaluate it.  
[00:15:16] And that gives you the value of 4,  
[00:15:18] which is why when W goes to 2,  
[00:15:20] we saw that the derivative of J was equal to 4.  
[00:15:25] Let's look at some other examples.  
[00:15:28] What if J was W cubed?  
[00:15:32] Then the derivative becomes 3 times W squared.  
[00:15:37] So it turns out from calculus,  
[00:15:39] and this is what SymPy is calculating for us,  
[00:15:42] if J is W cubed,  
[00:15:44] then the derivative of J with respect to W is 3W squared.  
[00:15:48] And depending on what W is,  
[00:15:51] the value of the derivative changes as well.  
[00:15:54] And we can plug in if W equals 2,  
[00:15:57] you get 12 in this case.  
[00:15:59] Or what if it was J equals W?  
[00:16:04] In this case, the derivative is just equal to 1.  
[00:16:07] Or the final example we had was what if J equals 1 over W?  
[00:16:13] In this case, the derivative turns out to be negative 1 over W squared.  
[00:16:19] And so this is negative one-fourth.  
[00:16:22] So what I'm going to do is take the derivatives we had worked out.  
[00:16:26] Remember for W squared, it was 2W.  
[00:16:31] For W cubed, it was 3W squared.  
[00:16:35] For W, it's just 1.  
[00:16:37] And for 1 over W, it is negative 1 over W squared.  
[00:16:41] And let's copy this back to our other slide.  
[00:16:44] So what SymPy, or really calculus,  
[00:16:47] showed us is if J of W is W cubed,  
[00:16:50] the derivative is 3W squared,  
[00:16:52] which is equal to 12 when W equals 2.  
[00:16:56] When J of W equals W, the derivative is just equal to 1.  
[00:16:59] And when J of W is 1 over W,  
[00:17:01] it's negative 1 over W squared,  
[00:17:03] which is negative one-quarter when W equals 2.  
[00:17:07] Let's double check this,  
[00:17:09] if these expressions that we got from SymPy are correct.  
[00:17:12] So let's try increasing W by epsilon.  
[00:17:16] In this case, J of W,  
[00:17:18] and again, feel free to pause the video  
[00:17:20] and check this map on your own calculator if you want.  
[00:17:24] But in this case, J of W, 2.001 cubed,  
[00:17:29] becomes this.  
[00:17:31] And so J has gone up from 8 to 8.012, roughly.  
[00:17:38] And so it's gone up by roughly 12 times epsilon.  
[00:17:42] And thus the derivative is indeed 12.  
[00:17:45] Or if J of W equals W,  
[00:17:49] then if W increased by epsilon,  
[00:17:51] then J of W, which is just W,  
[00:17:54] is now 2.001.  
[00:17:57] And so it's gone up by 0.001,  
[00:18:00] which is exactly the value of epsilon.  
[00:18:02] So J of W has gone up by 1 times epsilon.  
[00:18:05] So the derivative is indeed equal to 1.  
[00:18:08] Notice that here, this is actually  
[00:18:10] exactly epsilon, even though epsilon is infinitesimally small.  
[00:18:15] For our last example,  
[00:18:17] if J of W equals 1 over W,  
[00:18:20] if W goes up by epsilon,  
[00:18:22] then W is 1 over 2.001.  
[00:18:28] Then it turns out J of W is approximately 4.9975,  
[00:18:33] with some extra digits that I've truncated.  
[00:18:36] But this turns out to be 0.5 minus 0.00025.  
[00:18:43] So J of W has started off at 0.5  
[00:18:47] and it's gone down by 0.00025.  
[00:18:51] And this 0.00025, it is 0.25 times epsilon.  
[00:18:59] And it's gone down by this amount,  
[00:19:01] or it's gone up by negative 0.25 times epsilon.  
[00:19:06] Because negative 0.25 times epsilon is equal to this term over here.  
[00:19:10] So we see that if W goes up by epsilon,  
[00:19:14] J of W goes up by negative one-fourth,  
[00:19:17] or negative 0.25 times epsilon,  
[00:19:20] which is why the derivative in this case is negative one-quarter.  
[00:19:25] So I hope that with these examples,  
[00:19:27] you have a sense of what the derivative  
[00:19:30] with respect to W of J of W means.  
[00:19:35] It just asks if W goes up by epsilon,  
[00:19:39] how much does J of W go up?  
[00:19:42] By some constant K times epsilon,  
[00:19:45] and this constant K is the derivative.  
[00:19:47] And the value of K will depend both on  
[00:19:51] what is the function J of W,  
[00:19:53] as well as what is the value of W.  
[00:19:56] Before we wrap up this video,  
[00:19:57] I want to briefly touch on the notation used to write derivatives  
[00:20:02] that you may see in other texts.  
[00:20:05] Which is that if J of W is a function of a single variable, say W,  
[00:20:11] then mathematicians will sometimes write the derivative as DDW of J of W.  
[00:20:17] And notice here, this notation is using the lower case letter D.  
[00:20:24] Whereas in contrast, if J is a function of more than one variable,  
[00:20:30] then mathematicians will sometimes use this strictly alternative D  
[00:20:36] to denote the derivative of J with respect to one of the parameters WI.  
[00:20:42] To my mind, this notation distinguishing between this regular letter D  
[00:20:48] and this stylized calculus derivative symbol D  
[00:20:52] it makes little sense to me to make this distinction.  
[00:20:55] And this notation, to my mind, overcomplicates calculus  
[00:20:59] and the derivative notation.  
[00:21:01] But for historical reasons,  
[00:21:05] calculus texts will use these two different notations  
[00:21:08] depending on whether J is a function of a single variable  
[00:21:12] or a function of multiple variables.  
[00:21:15] But I think for practical purposes,  
[00:21:17] this notational convention,  
[00:21:20] it tends to just overcomplicate things, I think,  
[00:21:22] in a way that I don't think is actually necessary.  
[00:21:26] And so for this class, I'm just going to use this notation everywhere,  
[00:21:32] even when there's just a single variable.  
[00:21:36] And in fact, for most of our applications,  
[00:21:38] the function J, it is a function of more than one variable.  
[00:21:43] And so this other notation,  
[00:21:46] which is sometimes called the partial derivative notation,  
[00:21:49] this is actually the correct notation almost all the time  
[00:21:52] because J usually has more than one variable.  
[00:21:55] But I hope that using this notation throughout these lectures  
[00:21:58] that simplifies the presentation  
[00:22:00] and makes derivatives a little bit easier to understand.  
[00:22:03] And in fact, this notation is the one you've been seeing  
[00:22:06] in the videos leading up to now.  
[00:22:09] And for conciseness, instead of writing out this full expression here,  
[00:22:14] sometimes you also see this shortened as derivative  
[00:22:17] or partial derivative of J with respect to WI  
[00:22:20] or written like this.  
[00:22:23] And these are just simplified,  
[00:22:26] abbreviated forms of this expression over here.  
[00:22:31] So I hope that gives you a sense of what are derivatives.  
[00:22:35] It's just if W goes up by a little bit, by epsilon,  
[00:22:38] how much does J of W change as a consequence?  
[00:22:43] Next, let's take a look at how you can compute derivatives in a neural network.  
[00:22:48] To do so, we need to take a look at something called a computation graph.  
[00:22:53] Let's go take a look at that in the next video.
