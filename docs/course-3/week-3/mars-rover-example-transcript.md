# Mars Rover Example — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](mars-rover-example.md)

---

[00:00:02] To flesh out the reinforcement learning formalism, instead of looking at something as complicated  
[00:00:08] as a helicopter or a robot dog, we're going to use a simplified example that's loosely  
[00:00:14] inspired by the Mars rover.  
[00:00:17] This is adapted from an example due to Stanford professor Emma Brunskill and one of my collaborators,  
[00:00:23] Jack Reti-Agarwal, who had actually written code that is actually controlling the Mars  
[00:00:28] rover right now.  
[00:00:29] It also helped me talk through and help develop this example.  
[00:00:33] Let's take a look.  
[00:00:34] We'll develop reinforcement learning using a simplified example inspired by the Mars  
[00:00:42] rover. In this application, the rover can be in any of six positions, as shown by the  
[00:00:49] six boxes here.  
[00:00:51] And the rover might start off, say, in this position, in the fourth box shown here.  
[00:00:58] The position of the Mars rover is called the state in reinforcement learning, and I'm going  
[00:01:04] to call these six states State 1, State 2, State 3, State 4, State 5, and State 6.  
[00:01:12] And so the rover is starting off in State 4.  
[00:01:15] Now, the rover was sent to Mars to try to carry out different science missions.  
[00:01:21] It can go to different places to use its sensors, such as a drill or radar or spectrometer, to  
[00:01:29] analyze the rock at different places on the planet or go to different places to take  
[00:01:34] interesting pictures for scientists on Earth to look at.  
[00:01:37] In this example, State 1, here on the left, has a very interesting surface that scientists  
[00:01:43] would love for the robot to sample.  
[00:01:45] And State 6 also has a pretty interesting surface that scientists would quite like the  
[00:01:50] rover to sample, but not as interesting as State 1.  
[00:01:54] So we would more like to carry out the science mission at State 1 than at State 6, but  
[00:02:02] State 1 is further away.  
[00:02:04] The way we would reflect State 1 being potentially more valuable is through the reward  
[00:02:10] function. So the reward at State 1 is 100, and the reward at State 6 is 40.  
[00:02:19] And the rewards at all of the other states in between, I'm going to write as a reward of  
[00:02:24] zero because there's not as much interesting science to be done at these states 2, 3, 4, and  
[00:02:31] 5. On each step, the rover gets to choose one of two actions.  
[00:02:36] It can either go to the left or it can go to the right.  
[00:02:43] So the question is, what should the rover do?  
[00:02:46] In reinforcement learning, we pay a lot of attention to the rewards because that's how we  
[00:02:50] know if the robot is doing well or poorly.  
[00:02:54] So let's look at some examples of what might happen if the robot were to go left, starting  
[00:03:00] from State 4. Then initially, starting from State 4, it will receive a reward of zero.  
[00:03:07] And after going left, it gets to State 3, where it receives again a reward of zero.  
[00:03:13] Then it gets to State 2, receives a reward of zero, and finally gets to State 1, where it  
[00:03:19] receives a reward of 100.  
[00:03:22] For this application, I'm going to assume that when it gets to either State 1 or State 6,  
[00:03:27] that the day ends.  
[00:03:29] And so in reinforcement learning, we sometimes call this a terminal state.  
[00:03:35] And what that means is that after it gets to one of these terminal states, it gets a reward at  
[00:03:40] that state, but then nothing more happens after that.  
[00:03:43] Maybe the robots run out of fuel or run out of time for the day, which is why it only gets to  
[00:03:49] either enjoy the 100 or the 40 reward.  
[00:03:54] But then that's it for the day.  
[00:03:56] And it doesn't get to earn additional rewards after that.  
[00:03:59] Now, instead of going left, the robot could also choose to go to the right, in which case  
[00:04:05] from State 4, it would first have a reward of zero, and then it will move right and get to  
[00:04:12] State 5, have another reward of zero, and then it will get to this other terminal state on the  
[00:04:18] right, State 6, and get a reward of 40.  
[00:04:22] But going left and going right aren't the only options.  
[00:04:26] One thing the robot could do is it could start from State 4 and decide to move to the right.  
[00:04:32] So it goes from State 4 to 5, gets a reward of zero in State 4, a reward of zero in State 5, and  
[00:04:39] then maybe it changes its mind and decides to start going to the left as follows, in which case  
[00:04:45] it would get a reward of zero at State 4, at State 3, at State 2, and then a reward of 100 when it  
[00:04:51] gets to State 1.  
[00:04:53] In this sequence of actions and states, the robot is wasting a bit of time.  
[00:04:58] So this maybe isn't such a great way to take actions, but it is one choice that the algorithm  
[00:05:04] could pick. But hopefully it won't pick this one.  
[00:05:07] So to summarize, at every time step, the robot is in some state, which I'm going to call S, and it  
[00:05:16] gets to choose an action, and it also enjoys some rewards, R of S, that it gets from that state.  
[00:05:26] And as a result of this action, it gets to some new state, S'.  
[00:05:32] So as a concrete example, when the robot was in State 4 and it took the action, go left, it  
[00:05:39] enjoyed, well, maybe didn't enjoy the reward of zero associated with that State 4, and it wound  
[00:05:46] up in a new state, 3.  
[00:05:49] When you learn about specific reinforcement learning algorithms, you see that these four  
[00:05:54] things, the state, action, the reward, and the next state, which is what happens basically  
[00:05:59] every time you take an action, that this is a core element of what reinforcement learning  
[00:06:04] algorithms will look at when deciding how to take actions.  
[00:06:08] And just for clarity, the reward here, R of S, this is a reward associated with this state.  
[00:06:15] So this reward of zero is associated with the State 4 rather than with the State 3.  
[00:06:21] So that's the formalism of how a reinforcement learning application works.  
[00:06:26] In the next video, let's take a look at how we specify exactly what we want the reinforcement  
[00:06:32] learning algorithm to do.  
[00:06:33] In particular, we'll talk about an important idea in reinforcement learning called the  
[00:06:37] return.  
[00:06:38] Let's go on to the next video to see what that means.
