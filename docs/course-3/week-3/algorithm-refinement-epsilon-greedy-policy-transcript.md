# Algorithm Refinement: ε-Greedy Policy — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](algorithm-refinement-epsilon-greedy-policy.md)

---

[00:00:02] In the learning algorithm that we developed, even while you're still learning how to approximate  
[00:00:08] QFSA, you need to take some actions in the lunar lander.  
[00:00:13] So how do you pick those actions while you're still learning?  
[00:00:17] The most common way to do so is to use something called an epsilon greedy policy.  
[00:00:22] Let's take a look at how that works.  
[00:00:24] Here's the algorithm that you saw earlier.  
[00:00:27] One of the steps in the algorithm is to take actions in the lunar lander.  
[00:00:33] So when the learning algorithm is still running, we don't really know what's the best action  
[00:00:38] to take in every state.  
[00:00:39] If we did, we'd already be done learning.  
[00:00:42] But even while we're still learning and don't have a very good estimate of QFSA yet, how  
[00:00:48] do we take actions in this step of the learning algorithm?  
[00:00:52] Let's look at some options.  
[00:00:54] When you're in some state S, we might not want to take actions totally at random because  
[00:01:00] that will often be a bad action.  
[00:01:04] So one natural option would be to pick, whenever in state S, pick an action A that maximizes  
[00:01:12] QFSA.  
[00:01:14] So we may say, even if QFSA is not a great estimate of the Q function, let's just do  
[00:01:20] our best and use our current guess of QFSA and pick the action A that maximizes it.  
[00:01:27] It turns out this may work okay, but isn't the best option.  
[00:01:32] Instead, here's what is commonly done.  
[00:01:36] Here's option two, which is most of the time, let's say with probability 0.95, pick the  
[00:01:42] action that maximizes QFSA.  
[00:01:47] So most of the time, we'll try to pick a good action using our current guess of QFSA.  
[00:01:52] But a small fraction of the time, let's say 5% of the time, we'll pick an action A randomly.  
[00:01:59] Why do we want to occasionally pick an action randomly?  
[00:02:02] Well, here's why.  
[00:02:04] Suppose for some strange reason that QFSA was initialized randomly so that the learning  
[00:02:11] algorithm thinks that firing the main thruster is never a good idea.  
[00:02:15] Maybe the neural network parameters were initialized so that Q of S main is always  
[00:02:24] very low.  
[00:02:25] If that's the case, then the neural network, because it's trying to pick the action A that  
[00:02:30] maximizes QFSA, it will never, ever try firing the main thruster.  
[00:02:35] And because it never, ever tries firing the main thruster, it will never learn that firing  
[00:02:41] the main thruster is actually sometimes a good idea.  
[00:02:44] So because of the random initialization, if the neural network somehow initially gets  
[00:02:50] stuck in its mind that something's a bad idea, just by chance, then option one means that  
[00:02:57] it will never try out those actions and discover that maybe it's actually a good idea to take  
[00:03:03] that action, like fire the main thruster sometimes.  
[00:03:06] So under option two, on every step, we have some small probability of trying out different  
[00:03:12] actions so that the neural network can learn to overcome its own possible preconceptions  
[00:03:20] about what might be a bad idea that turns out not to be the case.  
[00:03:24] This idea of picking actions randomly is sometimes called an exploration step because we're going  
[00:03:32] to try out something that may not be the best idea, but we're going to just try out some  
[00:03:37] action in some circumstance to explore and learn more about an action in a circumstance  
[00:03:42] where we may not have had as much experience before.  
[00:03:46] Taking an action that maximizes QFSA, sometimes this is called a greedy action because we're  
[00:03:54] trying to actually maximize our return by picking this.  
[00:04:00] Or in the reinforcement learning literature, sometimes you also hear this as an exploitation  
[00:04:06] step.  
[00:04:07] I know that exploitation is not a good thing.  
[00:04:10] Nobody should ever exploit anyone else.  
[00:04:13] But historically, this was the term used in reinforcement learning to say, let's exploit  
[00:04:18] everything we've learned to do the best we can.  
[00:04:20] So in the reinforcement learning literature, sometimes you hear people talk about the exploration  
[00:04:26] versus exploitation trade-off, which refers to how often do you take actions randomly  
[00:04:31] or take actions that may not be the best in order to learn more versus trying to maximize  
[00:04:38] your return by, say, taking the action that maximizes QFSA.  
[00:04:43] This approach, that is option two, has a name, is called an epsilon greedy policy, where  
[00:04:51] here epsilon is 0.05, is the probability of picking an action randomly.  
[00:04:59] This is the most common way to make your reinforcement learning algorithm explore a little bit, even  
[00:05:07] while it's occasionally or maybe most of the time taking greedy actions.  
[00:05:12] By the way, a lot of people have commented that the name epsilon greedy policy is confusing  
[00:05:17] because you're actually being greedy 95% of the time, not 5% of the time.  
[00:05:23] So maybe 1 minus epsilon greedy policy, because it's 95% greedy, 5% exploring, that's actually  
[00:05:30] a more accurate description of the algorithm.  
[00:05:33] But for historical reasons, the name epsilon greedy policy is what has stuck.  
[00:05:38] And so this is the name that people use to refer to the policy that explores actually  
[00:05:44] epsilon fraction of the time rather than is greedy epsilon fraction of the time.  
[00:05:50] Lastly, one of the tricks that's sometimes used in reinforcement learning is to start  
[00:05:54] off epsilon high.  
[00:05:56] So initially, you are taking random actions a lot of the time and then gradually decrease  
[00:06:04] it so that over time, you are less likely to take actions randomly and more likely to  
[00:06:11] use your improving estimates of the Q function to pick good actions.  
[00:06:17] For example, in the lunar lander exercise, you might start off with epsilon very, very  
[00:06:23] high, maybe even epsilon equals 1.0.  
[00:06:26] So you're just picking actions completely at random initially and then gradually decrease  
[00:06:30] it all the way down to say 0.01 so that eventually you're taking greedy actions 99% of the time  
[00:06:39] and acting randomly only a very small 1% of the time.  
[00:06:44] If this seems complicated, don't worry about it.  
[00:06:46] We'll provide the code in the practice lab, in the juvenile lab that shows you how to  
[00:06:51] do this.  
[00:06:53] If you were to implement the algorithm as we've described it with the more efficient  
[00:06:57] neural network architecture and with an epsilon greedy exploration policy, you'll find that  
[00:07:03] it'll work pretty well on the lunar lander.  
[00:07:07] One of the things that I've noticed for reinforcement learning algorithm is that compared to supervised  
[00:07:12] learning, they're more finicky in terms of the choice of hyperparameters.  
[00:07:16] So for example, in supervised learning, if you set the learning rate a little bit too  
[00:07:22] small, then maybe the algorithm will take longer to learn.  
[00:07:25] Maybe it takes three times as long to train, which is annoying, but maybe not that bad.  
[00:07:31] Whereas in reinforcement learning, find that if you set the value of epsilon not quite  
[00:07:36] as well or set other parameters not quite as well, it doesn't take three times as long  
[00:07:41] to learn.  
[00:07:42] It may take 10 times or a hundred times as long to learn.  
[00:07:45] And so reinforcement learning algorithms, I think because they're less mature than supervised  
[00:07:51] learning algorithms, are much more finicky to lower choices of parameters like that.  
[00:07:56] And it actually sometimes is frankly more frustrating to tune these parameters for reinforcement  
[00:08:02] learning algorithm compared to a supervised learning algorithm.  
[00:08:07] But again, if you're worried about the practice lab, the program exercise, we'll give you  
[00:08:12] a sense of good parameters to use in the program exercise so that you should be able to do  
[00:08:16] that and successfully land the lunar lander, hopefully without too many problems.  
[00:08:22] In the next optional video, I want to describe a couple more algorithm refinements, mini  
[00:08:28] batching, and also using soft updates.  
[00:08:32] If you're new about these additional refinements, the algorithm will work okay, but these are  
[00:08:36] additional refinements that make the algorithm run much faster.  
[00:08:41] And it's okay if you skip this video, we've provided everything you need in the practice  
[00:08:45] lab to hopefully successfully complete it.  
[00:08:48] But if you're interested in learning about more of these details of tuning reinforcement  
[00:08:52] learning algorithms, then come with me and let's see in the next video, mini batching  
[00:08:57] and soft updates.
