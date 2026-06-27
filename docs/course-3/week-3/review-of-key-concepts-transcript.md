# Review of Key Concepts — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](review-of-key-concepts.md)

---

[00:00:02] We've developed a reinforcement learning formalism using the six-state Mars rover example.  
[00:00:08] Let's do a quick review of the key concepts and also see how this set of concepts can be used for other applications as well.  
[00:00:16] Some of the concepts we've discussed are states of a reinforcement learning problem, the set of actions, the rewards,  
[00:00:26] a discount factor, then how rewards and the discount factor are together used to compute the return,  
[00:00:32] and then finally, a policy whose job it is to help you pick actions so as to maximize the return.  
[00:00:39] For the Mars rover example, we had six states that we numbered 1 to 6, and the actions were to go left or to go right.  
[00:00:48] The rewards were 100 for the leftmost state, 40 for the rightmost state, and 0 in between, and I was using a discount factor of 0.5.  
[00:00:59] The return was given by this formula, and we could have different policies pi that pick actions depending on what state you're in.  
[00:01:07] This same formalism of states, actions, rewards, and so on can be used for many other applications as well.  
[00:01:15] Take the problem of flying an autonomous helicopter.  
[00:01:18] The set of states would be the set of possible positions and orientations and speeds and so on of the helicopter.  
[00:01:26] The possible actions would be the set of possible ways to move the control stick of the helicopter,  
[00:01:33] and the rewards may be a plus 1 if it's flying well and a negative 1,000 if it doesn't feel really bad or crashes.  
[00:01:41] So a reward function that tells you how well the helicopter is flying, the discount factor, a number slightly less than 1, maybe say 0.99,  
[00:01:50] and then based on the rewards and the discount factor, you compute the return using the same formula,  
[00:01:57] and the job of reinforcement learning algorithm would be to find some policy pi of s so that given as input the position of the helicopter s,  
[00:02:07] it tells you what action to take, that is, tells you how to move the control sticks.  
[00:02:12] Here's one more example. Here's a game-playing one.  
[00:02:15] Say you want to use reinforcement learning to learn to play chess.  
[00:02:18] The state of this problem would be the position of all the pieces on the board.  
[00:02:24] By the way, if you play chess and know the rules well, I know that there's a little bit more information than just the position of the pieces that's important for chess.  
[00:02:33] I'll simplify it a little bit for this video.  
[00:02:36] The actions are the possible legal moves in the game, and then a common choice of reward would be if you give your system a reward of plus 1 if it wins a game,  
[00:02:47] minus 1 if it loses a game, and a reward of 0 if it ties a game.  
[00:02:53] For chess, usually a discount factor very close to 1 would be used, so maybe 0.99 or even 0.995 or 0.999,  
[00:03:04] and the return uses the same formula as the other applications.  
[00:03:08] Once again, the goal is, given a board position, to pick a good action using a policy pie.  
[00:03:17] This formalism of a reinforcement learning application actually has a name.  
[00:03:23] It's called a Markov decision process.  
[00:03:26] I know that sounds like a big, technical, complicated term, but if you ever hear this term Markov decision process, or MDP for short,  
[00:03:36] that's just the formalism that we've been talking about in the last few videos.  
[00:03:40] The term Markov in the MDP or Markov decision process refers to that the future only depends on the current state,  
[00:03:49] and not on anything that might have occurred prior to your getting to the current state.  
[00:03:54] In other words, in a Markov decision process, the future depends only on where you are now, not on how you got here.  
[00:04:02] One other way to think of the Markov decision process formalism is that we have a robot or some other agent that we wish to control,  
[00:04:15] and what we get to do is choose actions A, and based on those actions, something will happen in the world or in the environment,  
[00:04:28] such as opposition in the world changes, or we get to sample a piece of rock and execute a science mission.  
[00:04:34] The way we choose the actions A is with a policy pie, and based on what happens in the world, we then get to see, or we observe back,  
[00:04:44] what state we're in, as well as what rewards are that we get.  
[00:04:50] And so you sometimes see different authors use a diagram like this to represent the Markov decision process or the MDP formalism,  
[00:05:00] but this is just another way of illustrating the set of concepts that you learned about in the last few videos.  
[00:05:06] So, you now know how a reinforcement learning problem works.  
[00:05:11] In the next video, we'll start to develop an algorithm for picking good actions.  
[00:05:16] The first step toward that would be to define, and then eventually learn to compute, the state action value function.  
[00:05:23] This turns out to be one of the key quantities for when we want to develop a learning algorithm.  
[00:05:29] Let's go on to the next video to see what is this state action value function.
