# Random (Stochastic) Environment — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](random-stochastic-environment.md)

---

[00:00:02] In some applications, when you take an action, the outcome is not always completely reliable.  
[00:00:08] For example, if you command your Mars rover to go left, maybe there's a little bit of a rock slide,  
[00:00:14] or maybe the floor's really slippery, and so it slips and goes in the wrong direction.  
[00:00:18] In practice, many robots don't always manage to do exactly what you tell them,  
[00:00:23] because of wind blowing it off course, or the wheels slipping, or something else.  
[00:00:28] So there's a generalization of the reinforcement learning framework we've talked about so far,  
[00:00:33] which models random or stochastic environments.  
[00:00:37] In this optional video, we'll talk about how these reinforcement learning problems work.  
[00:00:42] Continuing with our simplified Mars rover example, let's say you take the action and command it to go left.  
[00:00:51] Most of the time it'll succeed, but what if 10% of the time, or 0.1% of the time,  
[00:00:56] it actually ends up accidentally slipping and going in the opposite direction?  
[00:01:02] So if you command it to go left, it has a 90% chance, or 0.9% chance, of correctly going in the left direction,  
[00:01:10] with a 0.1% chance of actually heading to the right.  
[00:01:14] So that it has a 9% chance of ending up in state 3 in this example, and a 10% chance of ending up in state 5.  
[00:01:22] Conversely, if you were to command it to go right, and take the action right,  
[00:01:27] it has a 0.9% chance of ending up in state 5, and a 0.1% chance of ending up in state 3.  
[00:01:35] This would be an example of a stochastic environment.  
[00:01:41] Let's see what happens in this reinforcement learning problem.  
[00:01:45] Let's say you use this policy shown here, where you go left in states 2, 3, and 4, and go right, or try to go right in state 5.  
[00:01:57] If you were to start in state 4, and you were to follow this policy, then the actual sequence of states you visit may be random.  
[00:02:07] For example, in state 4, you will go left, and maybe you're a little bit lucky, and it actually gets to state 3.  
[00:02:15] And then you try to go left again, and maybe it actually gets there, you try to go left again, and it gets to that state.  
[00:02:23] If this is what happens, you end up with the sequence of rewards 0, 0, 0, 100.  
[00:02:31] But if you were to try this exact same policy a second time, maybe you're a little bit less lucky.  
[00:02:37] The second time, you start here, try to go left, and say it succeeds.  
[00:02:41] So you get 0 from state 4, 0 from state 3.  
[00:02:44] Here you try to go left, but you got unlucky this time, and the robot slips, and ends up heading back to state 4 instead.  
[00:02:51] And then you try to go left, then left, then left, and eventually it gets to that reward of 100.  
[00:02:58] In that case, this will be the sequence of rewards you observe, because it went from 4 to 3, back to 4, 3, 2, then 1.  
[00:03:07] Or, it's even possible, if you tell it from state 4 to go left, following the policy, you may get unlucky even on the first step,  
[00:03:14] and you end up going to state 5, because it slipped.  
[00:03:17] And then state 5, you command it to go right, and it succeeds, and so you end up here.  
[00:03:22] And in this case, the sequence of rewards you see will be 0, 0, 40, because it went from 4 to 5, and then state 6.  
[00:03:30] We had previously written out the return as this sum of discounted rewards.  
[00:03:37] But when the reinforcement learning problem is stochastic, there isn't one sequence of rewards that you see for sure.  
[00:03:46] Instead, you see this sequence of different rewards.  
[00:03:49] So, in a stochastic reinforcement learning problem, what we're interested in is not maximizing the return, because that's a random number.  
[00:03:59] What we're interested in is maximizing the average value of the sum of discounted rewards.  
[00:04:06] And by average value, I mean, if you were to take your policy and try it out a thousand times, or a hundred thousand times, or a million times,  
[00:04:15] you'd get lots of different reward sequences like that.  
[00:04:18] And if you were to take the average over all of these different sequences of the sum of discounted rewards,  
[00:04:24] then that's what we call the expected return.  
[00:04:28] In statistics, the term expected is just another way of saying average.  
[00:04:35] But what this means is we want to maximize what we expect to get on average in terms of the sum of discounted rewards.  
[00:04:45] The mathematical notation for this is to write this as E. E stands for expected value of R1 plus gamma R2 plus and so on.  
[00:04:57] So, the job of reinforcement learning algorithm is to choose a policy pi to maximize the average or the expected sum of discounted rewards.  
[00:05:07] So, to summarize, when you have a stochastic reinforcement learning problem or a stochastic Markov decision process,  
[00:05:15] the goal is to choose a policy that tells what action A to take in state S, so as to maximize the expected return.  
[00:05:22] The last way that this changes what we've talked about is it modifies Bellman equation a little bit.  
[00:05:29] So, here's Bellman equation exactly as we've written down.  
[00:05:32] But the difference now is that when you take the action A in state S, the next state S prime you get to is random.  
[00:05:40] When you're in state 3 and you try to go left, the next state S prime, it could be the state 2 or it could be the state 4.  
[00:05:49] So, S prime is now random, which is why we also put an average operator or an expected operator here.  
[00:05:57] So, we say that the total return from state S taking action A once and behaving optimally is equal to the reward you get right away,  
[00:06:07] also called the immediate reward, plus the discount factor gamma, plus what you expect to get on average of the future returns.  
[00:06:17] If you want to sharpen your intuition about what happens with these stochastic reinforcement learning problems,  
[00:06:25] you go back to the optional lab that I had shown you just now, where this parameter, this step probability,  
[00:06:34] is the probability of your Mars rover going in the opposite direction than you had commanded it to.  
[00:06:40] So, if we set the step prop to be 0.1 and we execute the notebook,  
[00:06:46] and so these numbers up here are the optimal return if you were to take the best possible actions, take this optimal policy,  
[00:06:58] but the robot were to step in the wrong direction 10% of the time, and these are the Q values for the stochastic MDP.  
[00:07:07] Notice that these values are now a little bit lower because you can't control the robot as well as before.  
[00:07:14] The Q values as well as the optimal returns have gone down a bit.  
[00:07:18] And in fact, if you were to increase the misstep probability, say, 40% of the time,  
[00:07:24] the robot doesn't even go in the direction you had commanded it to.  
[00:07:27] Only 60% of the time, it goes where you told it to.  
[00:07:30] Then these values end up even lower because your degree of control over the robot has decreased.  
[00:07:37] So, I encourage you to play with the optional lab and change the value of the misstep probability  
[00:07:43] and see how that affects the optimal return or the optimal expected return as well as the Q values, Q of SA.  
[00:07:52] Now, in everything we've done so far, we've been using this Markov decision process, this Mars rover, with just six states.  
[00:08:01] For many practical applications, the number of states will be much larger.  
[00:08:06] In the next video, we'll take the reinforcement learning or Markov decision process framework we've talked about so far  
[00:08:13] and generalize it to this much richer and maybe even more interesting set of problems with much larger  
[00:08:19] and with continuous state spaces. Let's take a look at that in the next video.
