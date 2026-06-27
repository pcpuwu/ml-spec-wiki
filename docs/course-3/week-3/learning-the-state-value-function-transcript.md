# Learning the State-Value Function — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](learning-the-state-value-function.md)

---

[00:00:02] Let's see how we can use reinforcement learning to control the lunar lander or for other reinforcement learning problems.  
[00:00:09] The key idea is that we're going to train a neural network to compute or to approximate the state action value function, Q of SA, and that in turn will let us pick good actions.  
[00:00:23] Let's see how this works.  
[00:00:24] The heart of the learning algorithm is we're going to train a neural network that inputs the current state and the current action and computes or approximates Q of SA.  
[00:00:38] In particular, for the lunar lander, we're going to take the state S and any action A and put them together.  
[00:00:47] Briefly, the state was that list of eight numbers that we saw previously.  
[00:00:53] So you have X, Y, X dot, Y dot, theta, theta dot, and then L, R for whether the lakes are grounded.  
[00:01:02] So that's a list of eight numbers to describe the state.  
[00:01:06] Then finally, we have four possible actions, nothing left, main or main engine, and right.  
[00:01:12] And we can encode any of those four actions using a one-hot feature vector.  
[00:01:18] So if action were the first action, we may encode it using 1, 0, 0, 0.  
[00:01:26] Or if it was the second action to fire the left thruster, we may encode it as 0, 1, 0, 0.  
[00:01:33] So this list of 12 numbers, eight numbers for the state, and then four numbers, a one-hot encoding of the action is the input we'll have to the neural network.  
[00:01:44] And I'm going to call this X.  
[00:01:47] We'll then take these 12 numbers and feed them to a neural network with, say, 64 units in the first hidden layer, 64 units in the second hidden layer, and then a single output in the output layer.  
[00:02:00] And the job of the neural network is to output Q of S, A, the state action value function for the lunar lander, given the input S and A.  
[00:02:11] And because we'll be using neural network training algorithms in a little bit, I'm also going to refer to this value, Q of S, A, as the target value, Y, that we'll train the neural network to approximate.  
[00:02:25] Notice that I did say reinforcement learning is different from supervised learning.  
[00:02:30] But what we're going to do is not input a state and have it output an action.  
[00:02:35] What we're going to do is input a state-action pair and have it try to output Q of S, A.  
[00:02:42] And using a neural network inside the reinforcement learning algorithm this way will turn out to work pretty well.  
[00:02:48] We'll see the details in a little bit.  
[00:02:51] So don't worry about it if it doesn't make sense yet.  
[00:02:54] But if you can train a neural network with appropriate choices of parameters in the hidden layers and in the output layer to give you good estimates of Q of S, A,  
[00:03:05] then whenever your lunar lander is in some state, S, you can then use the neural network to compute Q of S, A for all four actions.  
[00:03:17] You can compute Q of S, nothing, Q of S, left, Q of S, main, Q of S, right.  
[00:03:22] And then finally, whichever of these has the highest value, you would pick the corresponding action, A.  
[00:03:30] So for example, if out of these four values, Q of S, main is largest, then you would decide to go and fire the main engine of the lunar lander.  
[00:03:41] So the question becomes, how do you train a neural network to output Q of S, A?  
[00:03:48] It turns out the approach will be to use Bellman's equations to create a training set with lots of examples, X and Y,  
[00:03:57] and then we'll use supervised learning, exactly as you learned in the second course when we talked about neural networks,  
[00:04:04] to learn, using supervised learning, a mapping from X to Y.  
[00:04:09] That is a mapping from the state action pair to this target value, Q of S, A.  
[00:04:15] But how do you get a training set with values for X and Y that you can then train a neural network on?  
[00:04:23] Let's take a look.  
[00:04:24] So here's the Bellman equation, Q of S, A equals R of S plus gamma, max of A prime, Q of S prime, A prime.  
[00:04:32] So the right-hand side is what you want Q of S, A to be equal to.  
[00:04:38] So I'm going to call this value on the right-hand side, Y.  
[00:04:42] And the input to the neural network is a state and an action, so I'm going to call that X.  
[00:04:49] And the job of a neural network is to input X, that is, input a state-action pair,  
[00:04:55] and try to accurately predict what will be the value on the right.  
[00:05:01] So in supervised learning, we were training a neural network to learn a function, F,  
[00:05:07] which depends on a bunch of parameters, W and B, the parameters of the various layers of the neural network.  
[00:05:13] And it was the job of the neural network to input X and hopefully output something close to the target value, Y.  
[00:05:25] So the question is, how can we come up with a training set with values X and Y for a neural network to learn from?  
[00:05:36] Here's what we're going to do.  
[00:05:37] We're going to use the lunar lander and just try taking different actions in it.  
[00:05:43] If we don't have a good policy yet, we'll take actions randomly,  
[00:05:47] fire the left thruster, fire the right thruster, fire the main engine, do nothing.  
[00:05:52] And by just trying out different things in the lunar lander simulator,  
[00:05:58] we'll observe a lot of examples of when we're in some state and we took some action,  
[00:06:04] maybe a good action, maybe a terrible action, either way.  
[00:06:07] And then we got some rewards, R of S, for being in that state.  
[00:06:12] And as a result of our action, we got to some new state, S prime.  
[00:06:18] As you take different actions in the lunar lander, you see these S, A, R of S, S prime,  
[00:06:24] and we call them tuples in Python code, many times.  
[00:06:28] For example, maybe one time you're in some state, S, and just to give this an index,  
[00:06:33] I'm going to call this S1.  
[00:06:35] And you happen to take some action, A1.  
[00:06:38] This could be nothing, left, main thruster, or right.  
[00:06:41] As a result of which, you got some reward, and you wound up at some state, S prime 1.  
[00:06:48] And maybe a different time, you're in some other state, S2.  
[00:06:51] You took some other action, could be a good action, could be a bad action,  
[00:06:55] could be any of the four actions, and you got the reward,  
[00:06:59] and then you wound up with S prime 2, and so on, multiple times.  
[00:07:04] And maybe you've done this 10,000 times, or even more than 10,000 times.  
[00:07:08] So you would have to save the way with not just S1, A1, and so on, but up to S10,000, A10,000.  
[00:07:16] It turns out that each of these lists of four elements, each of these tuples,  
[00:07:22] will be enough to create a single training example, X1, Y1.  
[00:07:29] In particular, here's how you do it.  
[00:07:31] There are four elements in this first tuple.  
[00:07:34] The first two will be used to compute X1, and the second two will be used to compute Y1.  
[00:07:42] In particular, X1 is just going to be S1, A1 put together.  
[00:07:51] S1 would be eight numbers, the state of the lunar lander.  
[00:07:55] A1 would be four numbers, the one-hot encoding of whatever action this was.  
[00:08:00] And Y1 would be computed using the right-hand side of the Bellman equation.  
[00:08:05] In particular, the Bellman equation says when you input S1, A1,  
[00:08:11] you want Q of S1, A1 to be this right-hand side,  
[00:08:16] to be equal to R of S1 plus gamma max over A prime of Q of S1 prime A prime.  
[00:08:28] And notice that these two elements of the tuple on the right give you enough information to compute this.  
[00:08:35] You know what is R of S1, that's the reward you've saved away here,  
[00:08:40] plus the discount factor gamma times max over all actions A prime of Q of S prime 1.  
[00:08:47] That's the state you got to in this example.  
[00:08:50] And then take the max over all possible actions A prime.  
[00:08:53] And so I'm going to call this Y1.  
[00:08:57] And when you compute this, this will be some number like 12.5 or 17 or 0.5 or some other number.  
[00:09:06] And we'll save that number here as Y1 so that this pair, X1, Y1,  
[00:09:13] becomes the first trading example in this little data set we're computing.  
[00:09:18] Now, you may be wondering, wait, where does Q of S prime A prime or Q of S prime 1 A prime come from?  
[00:09:27] Well, initially we don't know what is the Q function.  
[00:09:31] But it turns out that when you don't know what is the Q function,  
[00:09:34] you can start off with taking a totally random guess of what is the Q function.  
[00:09:38] And we'll see on the next slide that the algorithm will work nonetheless.  
[00:09:43] But in every step, Q here is just going to be some guess.  
[00:09:48] They'll get better over time, it turns out, of what is the actual Q function.  
[00:09:52] Let's look at a second example.  
[00:09:54] If you had a second experience where you're in state S2, took action A2, got that reward, and then got to that state,  
[00:10:01] then we would create a second trading example in this data set, X2, where the input is now S2, A2.  
[00:10:10] So the first two elements go to computing the input X.  
[00:10:14] And then Y2 will be equal to R of S2 plus gamma max over A prime Q of S prime 2 A prime.  
[00:10:28] And whatever this number is, Y2, we put this over here in our small but growing training set.  
[00:10:35] And so on and so forth, until maybe you end up with 10,000 training examples with these X, Y pairs.  
[00:10:46] And what we'll see later is that we'll actually take this training set where the Xs are inputs with 12 features,  
[00:10:55] and the Ys are just numbers, and we'll train a neural network with, say,  
[00:11:01] the mean squared error loss to try to predict Y as a function of the input X.  
[00:11:08] So what I describe here is just one piece of the learning algorithm we'll use.  
[00:11:14] Let's put it all together on the next slide and see how it all comes together into a single algorithm.  
[00:11:19] So let's take a look at what the full algorithm for learning the Q function is like.  
[00:11:25] First, we're going to take our neural network and initialize all the parameters of the neural network randomly.  
[00:11:32] Initially, we have no idea what is the Q function, so let's just pick totally random values of the weights,  
[00:11:38] and we'll pretend that this neural network is our initial random guess for the Q function.  
[00:11:44] This is a little bit like when you are training linear regression,  
[00:11:48] and you initialize all the parameters randomly and then use gradient descent to improve the parameters.  
[00:11:54] Initializing randomly for now is fine.  
[00:11:57] What's important is whether the algorithm can slowly improve the parameters to get to a better estimate.  
[00:12:03] Next, we will repeatedly do the following.  
[00:12:06] We will take actions in the lunar lander.  
[00:12:09] So fly it around randomly, take some good actions, take some bad actions, it's okay either way.  
[00:12:14] But you get lots of these tuples of when it was in some state, you took some action A, got a reward R of S, and you got to some state S'.  
[00:12:23] And what we will do is score the 10,000 most recent examples of these tuples.  
[00:12:30] As you run this algorithm, you will see many, many steps in the lunar lander, maybe hundreds of thousands of steps.  
[00:12:39] But to make sure we don't end up using excessive computer memory,  
[00:12:43] common practice is to just remember the 10,000 most recent such tuples that we saw taking actions in the NTP.  
[00:12:52] This technique of storing the most recent examples only is sometimes called the replay buffer in a reinforcement learning algorithm.  
[00:13:02] So for now, we're just flying the lunar lander randomly, sometimes crashing, sometimes not.  
[00:13:08] And getting these tuples as experience for our learning algorithm.  
[00:13:13] Occasionally then, we will train the neural network.  
[00:13:17] In order to train the neural network, here's what we'll do.  
[00:13:21] We'll look at these 10,000 most recent tuples we have saved and create a training set of 10,000 examples.  
[00:13:30] So the training set needs lots of pairs of X and Y.  
[00:13:33] And for our training examples, X will be the SA from this part of the tuple.  
[00:13:41] So it will be a list of 12 numbers.  
[00:13:43] The 8 numbers for the state and the 4 numbers for the one-hot encoding of the action.  
[00:13:47] And the target value that we want the neural network to try to predict will be Y equals R of S plus gamma max of A' Q of S' A'.  
[00:14:00] How do we get this value of Q?  
[00:14:02] Well, initially, it is this neural network that we have randomly initialized.  
[00:14:06] So it may not be a very good guess, but it's a guess.  
[00:14:09] After creating these 10,000 training examples, we'll have training examples X1, Y1 through X 10,000, Y 10,000.  
[00:14:21] And so we'll train a neural network, and I'm going to call the new neural network Q new, such that Q new of S A learns to approximate Y.  
[00:14:33] So this is exactly training that neural network to output F with parameters W and B to input X to try to approximate the target value Y.  
[00:14:45] Now, this neural network should be a slightly better estimate of what the Q function or the state action value function should be.  
[00:14:54] And so what we'll do is we're going to take Q and set it to this new neural network that we had just learned.  
[00:15:02] Many of the ideas in this algorithm are due to Min et al.  
[00:15:07] And it turns out that if you run this algorithm where you start with a really random guess of the Q function,  
[00:15:14] then use Bellman's equations to repeatedly try to improve the estimates of the Q function,  
[00:15:20] then by doing this over and over, taking lots of actions, training a model, that will improve your guess for the Q function.  
[00:15:28] And so for the next model you train, you now have a slightly better estimate of what is the Q function.  
[00:15:34] And then the next model you train will be even better.  
[00:15:37] And when you update Q equals Q new, then for the next time you train a model, Q of S prime A prime will be an even better estimate.  
[00:15:45] And so as you run this algorithm on every iteration, Q of S prime A prime hopefully becomes an even better estimate of the Q function.  
[00:15:55] So that when you run the algorithm long enough, this will actually become a pretty good estimate of the true value of Q of S A,  
[00:16:04] so that you can then use this to pick hopefully good actions for the MTP.  
[00:16:09] The algorithm you just saw is sometimes called the DQN algorithm, which stands for Deep Q Network,  
[00:16:16] because you're using deep learning, a neural network, to train a model to learn the Q function.  
[00:16:23] So hence DQN or Deep Q Network, DQ using a neural network.  
[00:16:28] And if you use the algorithm as I described it, it will kind of work okay on the lunar lander.  
[00:16:35] Maybe it will take a long time to converge, maybe it won't land perfectly, but it will sort of work.  
[00:16:40] But it turns out that with a couple of refinements to the algorithm, it can work much better.  
[00:16:45] So in the next few videos, let's take a look at some refinements to the algorithm that you just saw.
