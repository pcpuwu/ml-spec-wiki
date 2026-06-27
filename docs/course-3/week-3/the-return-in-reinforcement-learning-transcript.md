# The Return in Reinforcement Learning — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](the-return-in-reinforcement-learning.md)

---

[00:00:02] You saw in the last video what are the states of a reinforcement learning application, as  
[00:00:06] well as how depending on the actions you take, you go through different states and also get  
[00:00:12] to enjoy different rewards.  
[00:00:14] But how do you know if a particular set of rewards is better or worse than a different  
[00:00:19] set of rewards?  
[00:00:21] The return in reinforcement learning, which we'll define in this video, allows us to  
[00:00:25] capture that.  
[00:00:26] As we go through this, one analogy that you might find helpful is if you imagine you  
[00:00:31] have a $5 bill at your feet, you can reach down and pick up, or half an hour across town,  
[00:00:37] you can walk half an hour and pick up a $10 bill.  
[00:00:41] Which one would you rather go after?  
[00:00:43] $10 is much better than $5, but if you need to walk for half an hour to go and get that  
[00:00:49] $10 bill, then maybe it'd be more convenient to just pick up the $5 bill instead.  
[00:00:55] The concept of a return captures that rewards you can get quicker are maybe more attractive  
[00:01:00] than rewards that take you a long time to get to.  
[00:01:03] Let's take a look at exactly how that works.  
[00:01:06] Here's a Mars rover example.  
[00:01:08] If starting from state 4, you go to the left, we saw that the rewards you get would be zero  
[00:01:15] on the first step from state 4, zero from state 3, zero from state 2, and then 100 at  
[00:01:21] state 1, the terminal state.  
[00:01:24] The return is defined as the sum of these rewards, but weighted by one additional factor,  
[00:01:32] which is called the discount factor.  
[00:01:35] So the discount factor is a number a little bit less than one.  
[00:01:39] So let me pick 0.9 as the discount factor.  
[00:01:42] I'm going to weight the reward on the first step, which is zero.  
[00:01:45] The reward on the second step is a discount factor, 0.9 times that reward, and then plus  
[00:01:52] the discount factor squared times that reward, and then plus the discount factor cubed times  
[00:01:58] that reward.  
[00:01:59] And if you calculate this out, this turns out to be 0.729 times 100, which is 72.9.  
[00:02:09] The more general formula for the return is that if your robot goes through some sequence  
[00:02:15] of states and gets reward R1 on the first step, and R2 on the second step, and R3 on  
[00:02:22] the third step, and so on, then the return is R1 plus the discount factor gamma, that's  
[00:02:32] Greek alphabet gamma, which I've set to 0.9 in this example, but gamma times R2 plus gamma  
[00:02:39] squared times R3 plus gamma cubed times R4, and so on, until you get to the terminal state.  
[00:02:48] What the discount factor gamma does is it has the effect of making the reinforcement  
[00:02:56] learning algorithm a little bit impatient, because the return gives full credit to the  
[00:03:01] first reward, it's 100%, it's 1 times R1, but then it gives a little bit less credit  
[00:03:08] to the reward you get at the second step, that's multiplied by 0.9, and then even less  
[00:03:12] credit to the reward you get at the next time step, R3, and so on.  
[00:03:17] And so getting rewards sooner results in a higher value for the total return.  
[00:03:23] In many reinforcement learning algorithms, a common choice for the discount factor would  
[00:03:27] be a number pretty close to 1, like 0.9 or 0.99 or even 0.999, but for illustrative purposes,  
[00:03:37] in the running example I'm going to use, I'm actually going to use a discount factor  
[00:03:41] of 0.5, so this very heavily downweights, or very heavily, we say, discounts rewards  
[00:03:49] in the future, because with every additional passing time step, you get only half as much  
[00:03:54] credit as rewards that you would have gotten one step earlier, and so if gamma were equal  
[00:04:00] to 0.5, the return under the example above would have been 0 plus 0.5 times 0, replacing  
[00:04:09] this equation on top, plus 0.5 squared, 0 plus 0.5 cubed, times 100, that's the last  
[00:04:18] reward because state 1 is a terminal state, and this turns out to be a return of 12.5.  
[00:04:26] In financial applications, the discount factor also has a very natural interpretation as  
[00:04:32] the interest rate, or the time value of money. So if you can have a dollar today, that may  
[00:04:39] be worth a little bit more than if you could only get a dollar in the future, because if  
[00:04:43] you get a dollar today, you can put it in the bank, earn some interest, and end up with  
[00:04:48] a little bit more money a year from now. So for financial applications, often that discount  
[00:04:53] factor represents how much less is a dollar in the future worth compared to a dollar today.  
[00:04:59] Let's look at some concrete examples of returns. The return you get depends on the rewards,  
[00:05:06] and the rewards depend on the actions you take, and so the return depends on the actions  
[00:05:12] you take. Let's use our usual example, and say for this example, I'm going to always  
[00:05:19] go to the left. And so, we already saw previously that if the robot were to start off in state  
[00:05:27] 4, the return is 12.5, as we worked out on the previous slide. It turns out that if it  
[00:05:34] were to start off in state 3, the return would be 25, because it gets to the 100 reward one  
[00:05:43] step sooner, and so it's discounted less. If it were to start off in state 2, the return  
[00:05:50] would be 50, and if it were to just start off in state 1, well it gets the reward of  
[00:05:55] 100 right away, so it's not discounted at all. And so the return, if it were to start  
[00:05:59] off in state 1, would be 100, and then the return in these two states are 6.25. It turns  
[00:06:06] out if you start off in state 6, which is terminal state, you just get the reward, and  
[00:06:11] thus the return of 40. Now, if you were to take a different set of actions, the returns  
[00:06:18] would actually be different. For example, if we were to always go to the right, if those  
[00:06:25] were our actions, then if you were to start in state 4, get a reward of 0, then you get  
[00:06:32] to state 5, get a reward of 0, and you get to state 6, and get a reward of 40. In this  
[00:06:38] case, the return would be 0 plus 0.5, the discount factor, times 0 plus 0.5 squared  
[00:06:47] times 40, and that turns out to be equal to 0.5 squared is one quarter, so one quarter  
[00:06:54] of 40 is 10. And so the return from this state, from state 4, is 10. If you were to take actions,  
[00:07:01] always go to the right. And through similar reasoning, the return from this state is 20,  
[00:07:07] the return from this state is 5, the return from this state is 2.5, and then the return  
[00:07:13] at the terminal state is 140. By the way, if these numbers don't fully make sense, feel  
[00:07:20] free to pause the video and double check the math and see if you can convince yourself  
[00:07:24] that these are the appropriate values for the return for if you start from different  
[00:07:29] states and if you were to always go to the right. And so we see that if we were to always  
[00:07:36] go to the right, the return you expect to get is lower for most states. So maybe always  
[00:07:43] going to the right isn't as good an idea as always going to the left. But it turns out  
[00:07:49] that we don't have to always go to the left or always go to the right. We could also decide  
[00:07:55] if you're in state 2, go left. If you're in state 3, go left. If you're in state 4, go  
[00:08:01] left. But if you're in state 5, then you're so close to this reward, let's go right. So  
[00:08:08] this would be a different way of choosing actions to take based on what state you're  
[00:08:13] in. And it turns out that the return you get from the different states will be 100, 50,  
[00:08:22] 25, 12.5, 20, and 40. Just to illustrate one case, if you were to start off in state 5,  
[00:08:34] here you would go to the right and so the rewards you get would be 0 first in state  
[00:08:39] 5 and then 40. And so the return is 0, the first reward, plus the discount factor 0.5  
[00:08:47] times 40, which is 20, which is why the return from this state is 20 if you take actions  
[00:08:53] shown here. So to summarize, the return in reinforcement learning is the sum of the rewards  
[00:09:00] that the system gets but weighted by the discount factor, where rewards in the far future are  
[00:09:06] weighted by the discount factor raised to a higher power. Now, this actually has an  
[00:09:12] interesting effect when you have systems with negative rewards. In the example we went through,  
[00:09:17] all the rewards were 0 or positive. But if there are any rewards that are negative,  
[00:09:23] then the discount factor actually incentivizes the system to push out the negative rewards as  
[00:09:29] far into the future as possible. Taking a financial example, if you had to pay someone $10,  
[00:09:36] that's a negative reward of minus 10. But if you could postpone payment by a few years,  
[00:09:43] then you're actually better off because $10 a few years from now, because of the interest  
[00:09:49] rate, is actually worth less than $10 that you had to pay today. So for systems with negative  
[00:09:56] rewards, it causes the algorithm to try to push out the negative rewards as far into the future  
[00:10:02] as possible. And for financial applications and for other applications, that actually turns out  
[00:10:07] to be the right thing for the system to do. You now know what is the return in reinforcement  
[00:10:13] learning. Let's go on to the next video to formalize the goal of a reinforcement learning algorithm.
