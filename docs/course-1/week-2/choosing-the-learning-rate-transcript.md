# Choosing the Learning Rate — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](choosing-the-learning-rate.md)

---

[00:00:01] Your learning algorithm will run much better with an appropriate choice of learning rate.  
[00:00:06] If it's too small, it would run very slowly, and if it's too large, it may not even converge.  
[00:00:12] Let's take a look at how you can choose a good learning rate for your model.  
[00:00:16] Concretely, if you plot the cost for a number of iterations,  
[00:00:21] and notice that the cost sometimes goes up and sometimes goes down,  
[00:00:26] you should take that as a clear sign that gradient descent is not working properly.  
[00:00:30] This could mean that there's a bugner code,  
[00:00:33] or sometimes it could mean that your learning rate is too large.  
[00:00:37] So here's an illustration of what might be happening.  
[00:00:41] Here, the vertical axis is a cost function J,  
[00:00:45] and the horizontal axis represents a parameter like maybe W1,  
[00:00:51] and if the learning rate is too big,  
[00:00:55] then if you start off here, your update step may overshoot the minimum and end up here,  
[00:01:00] and end up here, and in the next update step here,  
[00:01:03] you're again overshooting, so you end up here, and so on.  
[00:01:08] And that's why the cost can sometimes go up instead of decreasing.  
[00:01:12] To fix this, you can use a smaller learning rate.  
[00:01:15] So then your updates may start here and go down a little bit and down a bit,  
[00:01:21] and will hopefully consistently decrease until it reaches the global minimum.  
[00:01:26] Sometimes you may see that the cost consistently increases  
[00:01:30] after each iteration, like this curve here.  
[00:01:33] This is also likely due to a learning rate that is too large,  
[00:01:37] and it could be addressed by choosing a smaller learning rate.  
[00:01:41] But learning rates like this could also be a sign of a possible bug in the code.  
[00:01:47] For example, if I wrote my code so that W1 gets updated as W1 plus alpha  
[00:01:54] times its derivative term, this could result in the cost consistently increasing at each  
[00:02:00] And this is because adding the derivative term moves your cost J further from the global minimum instead of closer.  
[00:02:09] So remember, you want to use a minus sign, so the code should be updated, W1, updated by W1 minus alpha times the derivative term.  
[00:02:20] One debugging tip for a correct implementation of gradient descent is that with a small enough learning rate,  
[00:02:28] the cost function should decrease on every  
[00:02:31] single iteration. So if gradient descent isn't working, one thing I will often do,  
[00:02:37] and I hope you find this tip useful to, one thing I'll often do is just set alpha to be a very, very small  
[00:02:44] number and see if that causes the cost to decrease on every iteration. If, even with alpha  
[00:02:53] set to a very small number, J doesn't decrease on every single iteration, but instead sometimes  
[00:02:59] increases, then that usually means there's a bug somewhere in the code.  
[00:03:04] Note that setting alpha to be really, really small is meant here as a debugging step,  
[00:03:10] and a very, very small value of alpha is not going to be the most efficient choice for actually  
[00:03:15] training your learning algorithm. One important trade-off is that if your learning rate is too small,  
[00:03:21] then gradient descent can take a lot of iterations to converge. So when I am running gradient descent, I will  
[00:03:29] usually try a range of values for the learning rate alpha. So I might start by trying a learning  
[00:03:34] rate of 0.001, and I might also try a learning rate that's 10 times as large, say 0.01, and 0.01, and so on.  
[00:03:45] And for each choice of alpha, you might run gradient descent just for a handful of iterations,  
[00:03:51] and plot the cost function J as a function of the number of iterations. And after trying a few  
[00:03:58] different values, you might then pick the value of alpha that seems to decrease the learning  
[00:04:03] rate rapidly, but also consistently. In fact, what I actually do is try a range of values like  
[00:04:11] this. After trying 0.001, I'll then increase the learning rate 3fold to 0.003, and after that,  
[00:04:20] I'll try 0.01, which is again, about three times as large as 0.003. So these  
[00:04:27] So these are roughly trying out gradient descent with each value of alpha being  
[00:04:32] roughly three times bigger than the previous value. So what I'll do is try a range of values  
[00:04:39] until I found the value that's too small. And then also make sure I found the value that's too  
[00:04:44] large. And I'll slowly try to pick the largest possible learning rate or just something  
[00:04:51] slightly smaller than the largest reasonable value that I found. And when I do that, it usually  
[00:04:57] gives me a good learning rate for my model. So I hope this technique too will be useful  
[00:05:03] for you to choose a good learning rate for your implementation of grade and descent. In the upcoming  
[00:05:10] optional lab, you can also take a look at how feature scaling is done in code and also see how  
[00:05:16] different choices of the learning rate alpha can lead to either better or worse training of your model.  
[00:05:24] I hope you have fun playing with the value of alpha and seeing the outcomes.  
[00:05:28] of different choices of alpha. So please take a look and run the code in the optional lab  
[00:05:33] to gain a deeper intuition about feature scaling as well as the learning rate alpha. Choosing  
[00:05:39] learning rates is an important part of training many learning algorithms and I hope that this  
[00:05:44] video gives you intuition about different choices and how to pick a good value for alpha.  
[00:05:50] Now, there are a couple more ideas they can use to make multiple linear regression much more powerful,  
[00:05:56] and that is choosing custom features, which will also allow you to fit curves,  
[00:06:01] not just a straight line, to your data. Let's take a look at that in the next video.
