# Making Decisions: Policies in Reinforcement Learning — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](making-decisions-policies-in-reinforcement-learning.md)

---

[00:00:02] Let's formalize how a reinforcement learning algorithm takes actions.  
[00:00:06] In this video, you'll learn about what is a policy in a reinforcement learning algorithm.  
[00:00:11] Let's take a look.  
[00:00:12] As we've seen, there are many different ways that you can take actions in a reinforcement learning problem.  
[00:00:19] For example, we could decide to always go for the nearer reward.  
[00:00:25] So you go left if this leftmost reward is nearer, or go right if this rightmost reward is nearer.  
[00:00:33] Another way we could choose actions is to always go for the larger reward.  
[00:00:39] Or we could always go for the smaller reward.  
[00:00:43] It doesn't seem like a good idea, but it is another option.  
[00:00:47] Or you could choose to go left unless you're just one step away from the lesser reward, in which case you go for that one.  
[00:00:55] In reinforcement learning, our goal is to come up with a function, which is called a policy pi,  
[00:01:05] whose job it is to take as input any state, S, and map it to some action, A, that it wants us to take.  
[00:01:15] For example, for this policy here at the bottom, this policy would say that if you're in state 2, then it maps us to the left action.  
[00:01:27] If you're in state 3, the policy says go left.  
[00:01:31] If you're in state 4, also go left.  
[00:01:34] And if you're in state 5, go right.  
[00:01:37] And so pi applied to state S tells us what action it wants us to take in that state.  
[00:01:44] And so the goal of reinforcement learning is to find a policy, pi or pi of S, that tells you what action to take in every state so as to maximize the return.  
[00:01:57] By the way, I don't know if policy is the most descriptive term of what pi is, but it's one of those terms that's become standard in reinforcement learning.  
[00:02:08] Maybe calling pi a controller rather than a policy would be more natural terminology, but policy is what everyone in reinforcement learning now calls this.  
[00:02:19] In the last video, we've gone through quite a few concepts in reinforcement learning, from states to actions to rewards to returns to policies.  
[00:02:28] Let's do a quick review of them in the next video, and then we'll go on to start developing algorithms for finding good policies.  
[00:02:35] Let's go on to the next video.
