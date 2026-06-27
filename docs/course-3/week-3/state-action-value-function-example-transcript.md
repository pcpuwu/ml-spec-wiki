# State-Action Value Function (Example) — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](state-action-value-function-example.md)

---

[00:00:02] Using the Mars Rover example, you've seen what the values of QSA are like.  
[00:00:07] In order to keep honing our intuition about reinforcement learning problems and how the values of QSA change depending on the problem,  
[00:00:17] we've provided an optional lab that lets you play around, modify the Mars Rover example, and see for yourself how Q of SA will change.  
[00:00:26] Let's take a look.  
[00:00:27] Here's a Jupyter notebook that I hope you play with after watching this video.  
[00:00:32] I'm going to run these helper functions.  
[00:00:35] Now, notice here that this specifies the number of states.  
[00:00:39] There are two actions, so I wouldn't change these.  
[00:00:43] And this specifies the terminal left and the terminal right rewards, which has been 140.  
[00:00:48] And then 0 was the reward of the intermediate states.  
[00:00:53] The discount factor gamma was 0.5, and let's ignore the misstep probability for now.  
[00:00:58] We'll talk about that in a later video.  
[00:01:00] And with these values, if you run this code, this will compute and visualize the optimal policy as well as the Q function, Q of SA.  
[00:01:13] You'll learn later about how to develop a learning algorithm to estimate or compute Q of SA yourself.  
[00:01:20] So for now, don't worry about what code we have written to compute Q of SA.  
[00:01:25] But you see that the values here, Q of SA, are the values we saw in the lecture.  
[00:01:31] Now, here's where the fun starts.  
[00:01:33] Let's change around some of the values and see how these things change.  
[00:01:37] I'm going to update the terminal right reward to a much smaller value, say it's only 10.  
[00:01:45] If I now rerun the code, look at how Q of SA changes.  
[00:01:50] It now thinks that if you're in state 5, then if you go left and behave optimally, you get 6.25.  
[00:01:59] Whereas if you go right and behave optimally after that, you get a return of only 5.  
[00:02:04] So now, when the reward at the right is so small, it's only 10, even when you're so close to it, you'd rather go left all the way.  
[00:02:12] And in fact, the optimal policy is now to go left from every single state.  
[00:02:17] Let's make some other changes.  
[00:02:19] I'm going to change the terminal right reward back to 40.  
[00:02:22] But let me change the discount factor to 0.9.  
[00:02:28] With a discount factor that's closer to 1, this makes the Mars rover less impatient.  
[00:02:35] It's willing to take longer to hold out for a higher reward because rewards in the future are not multiplied by 0.5 to some high power.  
[00:02:45] It's multiplied by 0.9 to some high power.  
[00:02:48] And so it's willing to be more patient because rewards in the future are not discounted or multiplied by as small a number as when the discount was 0.5.  
[00:03:00] So let's rerun the code.  
[00:03:02] And now you see this is Q of SA for the different states.  
[00:03:07] And now for state 5, going left actually gives you a higher reward of 65.61 compared to 36.  
[00:03:18] Notice, by the way, that 36 is 0.9 times this terminal reward of 40.  
[00:03:23] So these numbers make sense.  
[00:03:24] But when it's more patient, it's willing to go to the left, even when you're in state 5.  
[00:03:29] Now, let's change gamma to a much smaller number, like 0.3.  
[00:03:34] So this very heavily discounts rewards in the future.  
[00:03:38] This makes it incredibly impatient.  
[00:03:40] So let me rerun this code.  
[00:03:42] And now the behavior has changed.  
[00:03:45] Notice that now in state 4, it's not going to have the patience to go for the larger 100 reward because the discount factor gamma is now so small, it's 0.3.  
[00:03:58] It would rather go for the reward of 40, even though it's a much smaller reward, it's closer.  
[00:04:04] And that's what it would choose to do.  
[00:04:06] So I hope that you can get a sense by playing around with these numbers yourself and running this code, how the values of Q of SA change, as well as how the optimal return, which you notice is the larger of these two numbers, QSA, how that changes, as well as how the optimal policy also changes.  
[00:04:29] So I hope you go and play with the optional lab and change the reward function and change the discount factor gamma and try different values and see for yourself how the values of Q of SA change, how the optimal return from different states change, and how the optimal policy changes depending on these different values.  
[00:04:51] And by doing so, I hope that will sharpen your intuition about how these different quantities are affected depending on the rewards and so on in reinforcement learning application.  
[00:05:02] After you play the lab, we then be ready to come back and talk about what's probably the single most important equation in reinforcement learning, which is something called the Bellman equation.  
[00:05:14] So I hope you have fun playing with the optional lab, and after that, let's come back to talk about Bellman equations.
