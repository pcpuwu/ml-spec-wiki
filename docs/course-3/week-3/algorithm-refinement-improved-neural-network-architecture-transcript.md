# Algorithm Refinement: Improved Neural Network Architecture — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](algorithm-refinement-improved-neural-network-architecture.md)

---

[00:00:02] In the last video, we saw a neural network architecture that would input the state and  
[00:00:07] action and attempt to output the Q function, Q of S A. It turns out that there's a change  
[00:00:14] to neural network architecture that makes this algorithm much more efficient. So most  
[00:00:19] implementations of DQN actually use this more efficient architecture that we'll see in  
[00:00:24] this video. Let's take a look.  
[00:00:27] This is the neural network architecture we saw previously, where it would input 12 numbers  
[00:00:33] and output Q of S A. Whenever we are in some state S, we would have to carry out inference  
[00:00:41] in the neural network separately four times to compute these four values so as to pick  
[00:00:47] the action A that gives us the largest Q value. This is inefficient because we have to carry  
[00:00:54] out inference four times from every single state. Instead, it turns out to be more efficient  
[00:01:01] to train a single neural network to output all four of these values simultaneously.  
[00:01:09] This is what it looks like. Here's a modified neural network architecture where the input  
[00:01:14] is eight numbers corresponding to the state of the lunar lander. It then goes through  
[00:01:21] the neural network with 64 units in the first hidden layer, 64 units in the second hidden  
[00:01:26] layer, and now the output unit has four output units. The job of the neural network is to  
[00:01:34] have the four output units output Q of S nothing, Q of S left, Q of S main, and Q of S right.  
[00:01:44] The job of the neural network is to compute simultaneously the Q value for all four possible  
[00:01:50] actions for when we are in the state S. This turns out to be more efficient because given  
[00:01:57] the state S, we can run inference just once and get all four of these values and then  
[00:02:04] very quickly pick the action A that maximizes Q of S A. You notice also in Bellman's equations  
[00:02:12] there's a step in which we have to compute max over A prime Q of S prime A prime. This  
[00:02:19] is multiplied by gamma and then there's plus R of S up here. This neural network also makes  
[00:02:25] it much more efficient to compute this because we're getting Q of S prime A prime for all  
[00:02:31] actions A prime at the same time. So you then just pick the max to compute this value for  
[00:02:37] the right hand side of Bellman's equations. This change to the neural network architecture  
[00:02:41] makes the algorithm much more efficient and so we will be using this architecture in the  
[00:02:46] practice lab. Next, there's one other idea that will help the algorithm a lot which is  
[00:02:52] something called an epsilon greedy policy which affects how you choose actions even  
[00:02:56] when you're still learning. Let's take a look at the next video at what that means.
