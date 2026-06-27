# Bellman Equation — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](bellman-equation.md)

---

[00:00:02] Let me summarize where we are.  
[00:00:04] If you can compute the state action value function, Q of S A, then it gives you a way  
[00:00:09] to pick a good action from every state.  
[00:00:12] Just pick the action A that gives you the largest value of Q of S A.  
[00:00:17] So the question is, how do you compute these values, Q of S A?  
[00:00:22] In reinforcement learning, there's a key equation called the Bellman equation that  
[00:00:26] will help us to compute the state action value function.  
[00:00:29] Let's take a look at what is this equation.  
[00:00:33] As a reminder, this is the definition of Q of S A. As a return, if you start at state  
[00:00:39] S, take the action A once, and then behave optimally after that.  
[00:00:43] In order to describe the Bellman equation, I'm going to use the following notation.  
[00:00:48] I'm going to use S to denote the current state.  
[00:00:52] Next, I'm going to use R of S to denote the reward of the current state.  
[00:00:59] So for our low MDP example, we would have that R of 1, state 1, is 100, the reward of  
[00:01:06] state 2 is 0, and so on, and the reward of state 6 is 40.  
[00:01:13] I'm going to use the alphabet A to denote the current action, so the action that you  
[00:01:19] take in the state S. After you take the action A, you get to some new state.  
[00:01:25] For example, if you're in state 4 and you take the action left, then you get to state  
[00:01:31] 3, and so I'm going to use S prime to denote the state you get to after taking that action  
[00:01:38] A from the current state S. I'm also going to use A prime to denote the action that you  
[00:01:44] might take in state S prime, the new state that you got to.  
[00:01:50] The notation convention, by the way, is that S A corresponds to the current state in action,  
[00:01:55] and when we add the prime, that's the next state and the next action.  
[00:02:00] The Bellman equation is the following.  
[00:02:03] It says that Q of S A, that is, the return under this set of assumptions, that's equal  
[00:02:12] to R of S, so the reward you get for being in that state, plus the discount factor gamma  
[00:02:22] times max over all possible actions A prime of Q of S prime, the new state you just got  
[00:02:30] to, and then of A prime.  
[00:02:34] There's a lot going on in this equation, so let's first take a look at some examples that  
[00:02:39] we'll come back to see why this equation might make sense.  
[00:02:43] Let's look at an example.  
[00:02:44] Let's look at Q of state 2 and action right, and apply Bellman equation to this to see  
[00:02:52] what value it gives us.  
[00:02:55] So if the current state is state 2, and if the action is to go right, then the next state  
[00:03:03] you get to after going right, S prime, would be the state 3.  
[00:03:07] So the Bellman equation says Q of 2 right is R of S, so this R of state 2, which is  
[00:03:18] just a reward 0, plus the discount factor gamma, which we've set to 0.5 in this example,  
[00:03:26] times max of the Q values in state S prime, in state 3.  
[00:03:34] So this is going to be the max of 25 and 6.25, since this is max over A prime of Q  
[00:03:43] of S prime, A prime, and this is taking the larger of 25 or 6.25, because those are the  
[00:03:52] two choices for state 3, and this turns out to be equal to 0 plus 0.5 times 25, which  
[00:04:01] is equal to 12.5, which fortunately is Q of 2 and then the action right.  
[00:04:10] Let's look at just one more example.  
[00:04:11] Let me pick state 4 and see what is Q of state 4 if you decide to go left.  
[00:04:19] In this case, the current state is 4, current action is to go left, and so the next state,  
[00:04:25] if you start from 4 and go left, you end up also at state 3.  
[00:04:30] So S prime is 3 again.  
[00:04:32] Development equation will say this is equal to R of S, so R of state 4, which is 0, plus  
[00:04:40] 0.5, the discount factor gamma, of max over A prime of Q of S prime, that is the state  
[00:04:48] 3 again, comma A prime.  
[00:04:52] So once again, the Q values for state 3 are 25 and 6.25, and the larger of these is 25,  
[00:05:00] and so this works out to be R of 4 is 0 plus 0.5 times 25, which is again equal to 12.5.  
[00:05:10] So that's why Q of 4 with the action left is also equal to 12.5.  
[00:05:17] Just one note, if you're in a terminal state, then development equation simplifies to Q  
[00:05:23] of S A equals to R of S, because there's no state S prime, and so that second term  
[00:05:30] would go away, which is why Q of S A in the terminal state is just 100, 100, or 40, 40.  
[00:05:37] If you wish, feel free to pause the video and apply the development equation to any  
[00:05:41] other state action in this MDP and check for yourself if this math works out.  
[00:05:48] Just to recap, this is how we had defined Q of S A, and we saw earlier that the best  
[00:05:56] possible return from any state S is max over A Q of S A. In fact, just to rename S and  
[00:06:04] A, it turns out that the best possible return from a state S prime is max over S prime of  
[00:06:12] A prime.  
[00:06:14] I didn't really do anything other than rename S S prime and A to A prime, but this will  
[00:06:19] make some of the intuitions a little bit easier later.  
[00:06:22] But for any state S prime, like state 3, the best possible return from state 3 is the max  
[00:06:28] over all possible actions of Q of S prime A prime.  
[00:06:32] So here again is development equation, and the intuition that this captures is if you're  
[00:06:40] starting from state S and you're going to take action A and then act optimally after  
[00:06:46] that, then you're going to see some sequence of rewards over time.  
[00:06:51] In particular, the return will be computed from the reward at the first step plus gamma  
[00:06:59] times the reward at the second step plus gamma squared times the reward at the third step  
[00:07:04] and so on, plus dot, dot, dot, until you get to terminal state.  
[00:07:08] So what Bellman equation says is this sequence of rewards with the discount factors can be  
[00:07:16] broken down into two components.  
[00:07:18] First, this R of S, that's the reward you get right away.  
[00:07:25] In the reinforcement learning literature, this is sometimes also called the immediate  
[00:07:30] reward, but that's what R1 is, is the reward you get for starting out in some state S.  
[00:07:37] The second term then is the following.  
[00:07:40] After you start in state S and take action A, you get to some new state S prime.  
[00:07:47] The definition of Q of S A assumes we're going to behave optimally after that.  
[00:07:52] So after we get to S prime, we're going to behave optimally and get the best possible  
[00:07:57] return from the state S prime.  
[00:08:00] And so what this is, max over A prime of Q of S prime A prime, this is the return from  
[00:08:08] behaving optimally starting from the state S prime.  
[00:08:13] That's exactly what we had written up here, is the best possible return for when you start  
[00:08:20] from state S prime.  
[00:08:22] Another way of phrasing this is, this total return down here is also equal to R1 plus,  
[00:08:31] and I'm going to factor out gamma in the math, it's gamma times R2 plus, and instead of gamma  
[00:08:37] squared, it's just gamma times R3 plus gamma squared times R4 plus dot dot dot.  
[00:08:45] Notice that if you were starting from state S prime, the sequence of rewards you get will  
[00:08:51] be R2, then R3, then R4, and so on.  
[00:08:57] And that's why this expression here, that's the total return if you were to start from  
[00:09:05] state S prime.  
[00:09:07] And if you were to behave optimally, then this expression should be the best possible  
[00:09:12] return for starting from state S prime, which is why this sequence of discounted rewards  
[00:09:19] equals that, max over A prime of Q of S prime A prime, and they were also left over with  
[00:09:26] this extra discount factor gamma there, which is why Q of S A is also equal to this expression  
[00:09:34] over here.  
[00:09:36] In case you think this is quite complicated and you aren't following all the details,  
[00:09:40] don't worry about it.  
[00:09:42] So long as you apply this equation, you will manage to get the right results.  
[00:09:46] But the high-level intuition I hope you take away is that the total return you get in a  
[00:09:53] reinforcement learning problem has two parts.  
[00:09:56] The first part is this reward that you get right away, and then the second part is gamma  
[00:10:04] times the return you get starting from the next state S prime, and as these two components  
[00:10:11] together, R of S plus gamma times the return from the next state that is equal to the total  
[00:10:18] return from the current state S. That is the essence of the Bellman equation.  
[00:10:24] So just to relate this back to our earlier example, Q of 4 left, that's the total return  
[00:10:31] for starting in state 4 and going left.  
[00:10:35] So if you were to go left in state 4, the rewards you get are 0 in state 4, 0 in state  
[00:10:42] 3, 0 in state 2, and then 100, which is why the total return is this, 0.5 squared plus  
[00:10:49] 0.5 cubed, which is 12.5.  
[00:10:52] And what Bellman equation is saying is that we can break this up into two pieces.  
[00:10:56] There is this 0, which is R of the state 4, and then plus 0.5 times this other sequence,  
[00:11:07] 0 plus 0.5, 0 plus 0.5 squared times 100.  
[00:11:14] But if you look at what this sequence is, this is really the optimal return from the  
[00:11:19] next state S prime that you got to after taking the action left from state 4.  
[00:11:25] So that's why this is equal to the reward 4 plus 0.5 times the optimal return from state  
[00:11:34] 3, because if you were to start from state 3, the rewards you get would be 0 followed  
[00:11:39] by 0 followed by 100.  
[00:11:42] So this is the optimal return from state 3, and that's why this is just R of 4 plus 0.5  
[00:11:50] max of A prime Q of state 3 A prime.  
[00:11:55] I know the Bellman equation is a somewhat complicated equation, breaking down your total  
[00:12:00] returns into the reward you get right away, the immediate reward, plus gamma times the  
[00:12:06] returns from the next state S prime.  
[00:12:08] If it kind of makes sense to you but not fully, it's okay, don't worry about it.  
[00:12:13] You can still apply Bellman's equations to get a reinforcement learning algorithm to  
[00:12:17] work correctly.  
[00:12:19] But I hope that at least a high level intuition of why breaking down the rewards into what  
[00:12:24] you get right away plus what you get in the future, I hope that makes sense.  
[00:12:30] Before moving on to develop a reinforcement learning algorithm, we have coming up next  
[00:12:34] an optional video on stochastic Markov decision processes or on reinforcement learning applications  
[00:12:41] where the actions that you take can have a slightly random effect.  
[00:12:46] Take a look at the optional video if you wish, and then after that, we'll start to  
[00:12:50] develop a reinforcement learning algorithm.
