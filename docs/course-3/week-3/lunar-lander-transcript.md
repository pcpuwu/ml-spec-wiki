# Lunar Lander — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](lunar-lander.md)

---

[00:00:02] The Lunar Lander lets you land a simulated vehicle on the moon.  
[00:00:06] It's like a fun little video game that's been used by a lot of reinforcement learning researchers.  
[00:00:12] Let's take a look at what it is.  
[00:00:14] In this application, you're in command of a lunar lander that is rapidly approaching the surface of the moon,  
[00:00:21] and your job is to fire thrusters at the appropriate times to land it safely on a landing pad.  
[00:00:28] To give you a sense of what it looks like, this is the lunar lander landing successfully,  
[00:00:33] and it's firing thrusters downward and to the left and right to position itself to land between these two yellow flags.  
[00:00:41] Or if the reinforcement learning algorithms policy does not do well,  
[00:00:45] then this is what it might look like where the lander unfortunately has crashed on the surface of the moon.  
[00:00:51] In this application, you have four possible actions.  
[00:00:56] On every time step, you could either do nothing,  
[00:01:00] in which case the forces of inertia and gravity pull you toward the surface of the moon,  
[00:01:05] or you can fire a left thruster.  
[00:01:09] When you see a little red dot come out on the left, that's firing the left thruster,  
[00:01:13] they'll tend to push the lunar lander to the right,  
[00:01:16] or you can fire the main engine that's thrusting down the bottom here,  
[00:01:22] or you can fire the right thruster,  
[00:01:25] and that's firing the right thruster which will push you to the left.  
[00:01:30] And your job is to keep on picking actions over time  
[00:01:34] so as to land the lunar lander safely between these two flags here on the landing pad.  
[00:01:41] In order to give the actions a shorter name,  
[00:01:43] I'm sometimes going to call the actions nothing, meaning do nothing,  
[00:01:47] or left, meaning fire the left thruster,  
[00:01:50] or main, meaning fire the main engine downward or right.  
[00:01:54] So I'm going to call the actions nothing, left, main, and right for short later in this video.  
[00:01:59] How about the state space of this MTP?  
[00:02:02] The states are its position, x and y,  
[00:02:06] so how far to the left or right and how high up is it,  
[00:02:09] as well as velocity, x dot, y dot.  
[00:02:13] How fast is it moving in the horizontal and vertical directions?  
[00:02:16] And then also its angle, so how far is the lunar lander tilted to the left or tilted to the right?  
[00:02:23] Its angular velocity, theta dot.  
[00:02:25] And then finally, because a small difference in positioning makes a big difference in whether or not it's landed,  
[00:02:32] we're going to have two other variables in the state vector, which we'll call L and R,  
[00:02:39] which corresponds to whether the left leg is grounded,  
[00:02:42] meaning whether or not the left leg is sitting on the ground,  
[00:02:45] as well as R, which corresponds to whether or not the right leg is sitting on the ground.  
[00:02:51] So whereas x, y, x dot, y dot, theta, theta dot are numbers,  
[00:02:56] L and R will be binary valued and can take on only values 0 or 1,  
[00:03:02] depending on whether the left and right legs are touching the ground.  
[00:03:06] Finally, here's the reward function for the lunar lander.  
[00:03:09] If it manages to get to the landing pad, then it receives a reward between 100 and 140,  
[00:03:15] depending on how well it's flown and gotten to the center of the landing pad.  
[00:03:20] We also give it an additional reward for moving toward or away from the pad.  
[00:03:25] So if it moves closer to the pad, it receives a positive reward.  
[00:03:29] If it moves away and drifts away, it receives a negative reward.  
[00:03:33] If it crashes, it gets a large negative 100 reward.  
[00:03:38] If it achieves a soft landing, that is a landing that's not a crash, it gets a plus 100 reward.  
[00:03:44] For each leg, the left leg or the right leg that it gets grounded, it receives a plus 10 reward.  
[00:03:50] And finally, to encourage it not to waste too much fuel and fire thrusters unnecessarily,  
[00:03:56] every time it fires the main engine, we give it a negative 0.3 reward.  
[00:04:01] And every time it fires the left or the right side thrusters, we give it a negative 0.03 reward.  
[00:04:08] Notice that this is a moderately complex reward function.  
[00:04:12] The designers of the lunar lander application actually put some thought into exactly what behavior you want  
[00:04:19] and codified it in the reward function to incentivize more of the behaviors you want  
[00:04:25] and fewer of the behaviors, like crashing, that you don't want.  
[00:04:30] You find when you're building your own reinforcement learning application,  
[00:04:34] it usually takes some thought to specify exactly what you want or don't want  
[00:04:39] and to codify that in the reward function.  
[00:04:41] But specifying the reward function should still turn out to be much easier  
[00:04:46] than specifying the exact right action to take from every single state,  
[00:04:50] which is much harder for this and many other reinforcement learning applications.  
[00:04:54] So, the lunar lander problem is as follows.  
[00:04:59] Our goal is to learn a policy pi that, when given a state s, as written here,  
[00:05:07] takes an action a equals pi of s so as to maximize the return, the sum of discounted rewards.  
[00:05:18] And usually for the lunar lander, we'll use a fairly large value for gamma.  
[00:05:23] We'll use a value of gamma that's equal to 0.985, so pretty close to 1.  
[00:05:29] And if you can learn a policy pi that does this, then you successfully land this lunar lander.  
[00:05:36] Exciting application, and we're now finally ready to develop a learning algorithm  
[00:05:41] which will turn out to use deep learning on neural networks to come up with a policy to land the lunar lander.  
[00:05:48] Let's go on to the next video where we'll start to learn about deep reinforcement learning.
