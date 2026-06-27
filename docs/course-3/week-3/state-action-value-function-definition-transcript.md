# State-Action Value Function (Definition) — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](state-action-value-function-definition.md)

---

[00:00:02] When we start to develop reinforcement learning arrows later this week, you see that there's  
[00:00:06] a key quantity that reinforcement learning arrows will try to compute, and that's called  
[00:00:11] the state action value function.  
[00:00:13] Let's take a look at what this function is.  
[00:00:16] The state action value function is a function typically denoted by the letter uppercase  
[00:00:22] Q, and it's a function of a state you might be in, as well as the action you might choose  
[00:00:30] to take in that state.  
[00:00:32] And Q of S A will give a number that equals the return if you start in that state S and  
[00:00:42] take the action A just once, and after taking action A once, you then behave optimally after  
[00:00:50] that.  
[00:00:51] And after that, you take whatever actions will result in the highest possible return.  
[00:00:56] Now you might be thinking, there's something a little bit strange about this definition,  
[00:01:00] because how do we know what is the optimal behavior?  
[00:01:03] And if we knew what's the optimal behavior, if we already knew what's the best action  
[00:01:07] to take in every state, why do we still need to compute Q of S A?  
[00:01:11] Because we already have the optimal policy.  
[00:01:13] So I do want to acknowledge that there's something a little bit strange about this definition.  
[00:01:18] There's almost something a little bit circular about this definition, but rest assured when  
[00:01:22] we look at specific reinforcement learning algorithms later, we'll resolve this slightly  
[00:01:27] circular definition, and we'll come up with a way to compute the Q function even before  
[00:01:33] we've come up with the optimal policy, but you see that in a later video, so don't worry  
[00:01:38] about this for now.  
[00:01:39] Let's look at an example.  
[00:01:41] We saw previously that this is a pretty good policy.  
[00:01:46] Go left from states 2, 3, and 4, and go right from state 5.  
[00:01:51] It turns out that this is actually the optimal policy for the Mars Rover application when  
[00:01:56] the discount factor gamma is 0.5.  
[00:02:00] So Q of S A will be equal to the total return if you start from state S, take the action  
[00:02:08] A, and then behave optimally after that, meaning take actions according to this policy shown  
[00:02:15] over here.  
[00:02:17] Let's figure out what Q of S A is for a few different states.  
[00:02:21] Let's look at, say, Q of state 2, and what if we take the action to go right?  
[00:02:30] Well if you're in state 2 and you go right, then you end up at state 3, and then after  
[00:02:37] that you behave optimally.  
[00:02:39] You're going to go left from state 3, and then go left from state 2, and then eventually  
[00:02:43] get the reward of 100.  
[00:02:46] In this case, the rewards you get would be 0 from state 2, 0 when you get to state 3,  
[00:02:52] 0 when you get back to state 2, and then 100 when you finally get to the terminal state  
[00:02:59] 1.  
[00:03:00] And so the return will be 0 plus 0.5 times that plus 0.5 squared times that plus 0.5  
[00:03:09] cubed times 100, and this turns out to be 12.5.  
[00:03:14] And so Q of state 2 of going right is equal to 12.5.  
[00:03:20] Note that this passes no judgment on whether going right is a good idea or not.  
[00:03:24] It's actually not that good an idea from state 2 to go right, but it just faithfully reports  
[00:03:29] out the return if you take action A and then behave optimally afterward.  
[00:03:35] Here's another example.  
[00:03:36] If you're in state 2 and you were to go left, then the sequence of rewards you get will  
[00:03:44] be 0 when you're in state 2, followed by 100, and so the return is 0 plus 0.5 times 100,  
[00:03:52] and that's equal to 50.  
[00:03:54] In order to write down the values of QSA in this diagram, I'm going to write 12.5 here  
[00:04:04] on the right to denote that this is Q of state 2 going to the right, and I'm going  
[00:04:10] to write a little 50 here on the left to denote that this is Q of state 2 going to the left.  
[00:04:18] Just to take one more example, what if we're in state 4 and we decide to go left?  
[00:04:24] Well if you're in state 4 and you go left, you get reward 0, and then you take action  
[00:04:30] left here, so 0 again, take action left here, 0, and then 100, so Q of 4 left results in  
[00:04:40] rewards 0 because the first action is left, and then because we follow the optimal policy  
[00:04:47] afterward, you get rewards 0, 0, 100, and so the return is 0 plus 0.5 times that plus  
[00:04:55] 0.5 squared times that plus 0.5 cubed times that, which is therefore equal to 12.5.  
[00:05:03] So Q4 left is 12.5, I'm going to write this here as 12.5.  
[00:05:11] And it turns out if you were to carry out this exercise for all of the other states  
[00:05:15] and all of the other actions, you end up with this being the Q of SA for different states  
[00:05:23] and different actions.  
[00:05:25] And then finally at the terminal state, well it doesn't matter what you do, you just get  
[00:05:29] that terminal reward 100 or 40, so I'll just write down those terminal rewards over here.  
[00:05:36] So this is Q of SA for every state, state 1 through 6, and for the two actions, action  
[00:05:42] left and action right.  
[00:05:45] Because the state action value function is almost always denoted by the letter Q, this  
[00:05:52] is also often called the Q function.  
[00:05:56] So the terms Q function and state action value function are used interchangeably, and it  
[00:06:01] tells you what are your returns, or really what is the value, how good is it to take  
[00:06:07] action A in state S, and then behave optimally after that.  
[00:06:11] Now it turns out that once you can compute the Q function, this would give you a way  
[00:06:17] to pick actions as well.  
[00:06:19] Here's the policy and return, and here are the values Q of SA from the previous slide.  
[00:06:26] You notice one interesting thing when you look at the different states, which is that  
[00:06:31] if you take state 2, taking the action left results in a Q value or state action value  
[00:06:39] of 50, which is actually the best possible return you can get from that state.  
[00:06:43] In state 3, Q of SA for the action left also gives you that higher return.  
[00:06:50] In state 4, the action left gives you the return you want, and in state 5, it's actually  
[00:06:57] the action going to the right that gives you that higher return of 20.  
[00:07:03] So it turns out that the best possible return from any state S is the largest value of Q  
[00:07:11] of SA, maximizing over A.  
[00:07:13] Just to make sure this is clear, what I'm saying is that in state 4, there is Q of state  
[00:07:20] 4 left, which is 12.5, and Q of state 4 right, which turns out to be 10, and the larger of  
[00:07:31] these two values, which is 12.5, is the best possible return from that state 4.  
[00:07:38] In other words, the highest return you can hope to get from state 4 is 12.5, and it's  
[00:07:42] actually the larger of these two numbers, 12.5 and 10.  
[00:07:46] And moreover, if you want your Mars rover to enjoy a return of 12.5 rather than state  
[00:07:53] 10, then the action you should take is the action A that gives you the larger value of  
[00:08:00] Q of SA.  
[00:08:02] So the best possible action in state S is the action A that actually maximizes Q of  
[00:08:08] SA.  
[00:08:10] So this might give you a hint for why computing Q of SA is an important part of the reinforcement  
[00:08:19] learning algorithm that we'll build later.  
[00:08:22] Namely, if you have a way of computing Q of SA for every state and for every action, then  
[00:08:29] when you're in some state S, all you have to do is look at the different actions A and  
[00:08:35] pick the action A that maximizes Q of SA.  
[00:08:39] And some pi of S can just pick the action A that gives the largest value of Q of SA,  
[00:08:45] and that will turn out to be a good action.  
[00:08:47] In fact, it'll turn out to be the optimal action.  
[00:08:51] Another intuition about why this makes sense is Q of SA is returned if you start in state  
[00:08:56] S and take the action A and then behave optimally after that.  
[00:09:01] So in order to earn the biggest possible return, what you really want is to take the action  
[00:09:07] A that results in the biggest total return.  
[00:09:13] That's why if only we have a way of computing Q of SA for every state, taking the action  
[00:09:18] A that maximizes the return under these circumstances seems like it's the best action to take in  
[00:09:24] that state.  
[00:09:25] Although this isn't something you need to know for this course, I want to mention also  
[00:09:29] that if you look online or look at the reinforcement learning literature, sometimes you also see  
[00:09:36] this Q function written as Q star instead of Q, and this Q function is sometimes also  
[00:09:42] called the optimal Q function.  
[00:09:46] These terms just refer to the Q function exactly as we've defined it.  
[00:09:50] So if you look at the reinforcement learning literature and read about Q star or the optimal  
[00:09:54] Q function, that just means the state action value function that we've been talking about.  
[00:09:59] But for the purposes of this course, you don't need to worry about this.  
[00:10:02] So to summarize, if you can compute Q of SA for every state and every action, then that  
[00:10:10] gives us a good way to compute the optimal policy pi of S.  
[00:10:15] So that's the state action value function or the Q function.  
[00:10:20] We'll talk later about how to come up with an algorithm to compute them, despite the  
[00:10:25] slightly circular aspect of the definition of the Q function.  
[00:10:29] But first, let's take a look in the next video at some specific examples of what these values  
[00:10:33] QSA actually look like.
