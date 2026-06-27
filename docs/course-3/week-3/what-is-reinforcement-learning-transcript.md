# What is Reinforcement Learning? — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](what-is-reinforcement-learning.md)

---

[00:00:02] Welcome to this final week of the machine learning specialization.  
[00:00:05] It's a little bit bittersweet for me that we're approaching the end of this specialization,  
[00:00:09] but I am looking forward to this week sharing with you some exciting ideas about reinforcement learning.  
[00:00:15] In machine learning, reinforcement learning is one of those ideas that,  
[00:00:19] while not very widely applied in commercial applications yet today,  
[00:00:23] is one of the pillars of machine learning and has lots of exciting research backing it up  
[00:00:29] and improving it every single day.  
[00:00:31] So let's start by taking a look at what is reinforcement learning.  
[00:00:36] Let's start with an example.  
[00:00:38] Here's a picture of an autonomous helicopter.  
[00:00:41] This is actually the Stanford autonomous helicopter, weighs 32 pounds,  
[00:00:44] and is actually sitting in my office right now.  
[00:00:47] Like many other autonomous helicopters, it's instrumented with an onboard computer,  
[00:00:52] GPS, accelerometers, and gyroscopes, and a magnetic compass,  
[00:00:56] so it knows where it is at all times quite accurately.  
[00:00:59] And if I were to give you the keys to this helicopter and ask you to write a program to fly it,  
[00:01:05] how would you do so?  
[00:01:07] Radio-controlled helicopters are controlled with joysticks like these,  
[00:01:10] and so the task is, ten times per second, you're given the position and orientation and speed  
[00:01:16] and so on of the helicopter, and you have to decide how to move these two control sticks  
[00:01:21] in order to keep the helicopter balanced in the air.  
[00:01:25] By the way, I've flown radio-controlled helicopters as well as quad-rotor drones myself,  
[00:01:30] and radio-controlled helicopters are actually quite a bit harder to fly,  
[00:01:33] quite a bit harder to keep balance in the air.  
[00:01:36] So how would you write a program to do this automatically?  
[00:01:39] Let me show you a fun video of something we got the Stanford autonomous helicopter to do.  
[00:01:44] Here's a video of it flying under the control of a reinforcement learning algorithm,  
[00:01:49] and let me play the video.  
[00:01:52] I was actually the cameraman that day, and this is the helicopter flying under computer control,  
[00:01:56] and if I zoom out the video, you see the trees under the sky.  
[00:02:01] So using reinforcement learning, we actually got this helicopter to learn to fly upside down.  
[00:02:06] We told it to fly upside down.  
[00:02:08] And so reinforcement learning has been used to get helicopters to fly a wide range of stunts,  
[00:02:14] or we call them aerobatic maneuvers.  
[00:02:17] By the way, if you're interested in seeing other videos, you can also check them out at this URL.  
[00:02:22] So how do you get a helicopter to fly itself using reinforcement learning?  
[00:02:28] The task is, given the position of the helicopter, to decide how to move the control sticks.  
[00:02:35] In reinforcement learning, we call the position and orientation and speed and so on of the helicopter the state S,  
[00:02:43] and so the task is to find a function that maps from the state of the helicopter to an action A,  
[00:02:51] meaning how far to push the two control sticks in order to keep the helicopter balanced in the air and flying without crashing.  
[00:02:59] One way you could attempt this problem is to use supervised learning.  
[00:03:05] It turns out this is not a great approach for autonomous helicopter flying,  
[00:03:09] but you could say, well, if we could get a bunch of observations of states  
[00:03:15] and maybe have an expert human pilot tell us what's the best action Y to take,  
[00:03:21] you could then train a neural network using supervised learning to directly learn the mapping from the states S,  
[00:03:28] which I'm calling X here, to an action A, which I'm calling the label Y here.  
[00:03:34] But it turns out that when the helicopter is moving through the air, it's actually very ambiguous what is the exact one right action to take.  
[00:03:43] Do you tilt a bit to the left or a lot more to the left or increase the helicopter's thrust a little bit or a lot?  
[00:03:50] It's actually very difficult to get a data set of X and the ideal action Y,  
[00:03:56] so that's why for a lot of tasks of controlling a robot like a helicopter and other robots,  
[00:04:02] the supervised learning approach doesn't work well and we instead use reinforcement learning.  
[00:04:08] Now, a key input to a reinforcement learning is something called the reward or the reward function,  
[00:04:16] which tells the helicopter when it's doing well and when it's doing poorly.  
[00:04:21] So the way I like to think of a reward function is a bit like training a dog.  
[00:04:27] When I was growing up, my family had a dog and it was my job to train the dog or the puppy to behave.  
[00:04:34] So how do you get a puppy to behave well?  
[00:04:36] Well, you can't demonstrate that much to the puppy.  
[00:04:39] Instead, you let it do a thing and whenever it does something good, you go, oh, good dog.  
[00:04:45] And whenever it did something bad, you go, bad dog.  
[00:04:48] And then hopefully it learns by itself how to do more of the good dog and fewer of the bad dog things.  
[00:04:54] So training for reinforcement learning algorithm is like that.  
[00:04:57] When the helicopter is flying well, you go, oh, good helicopter.  
[00:05:00] And if it does something bad like crash, you go, bad helicopter.  
[00:05:04] And then it's a reinforcement learning algorithm's job to figure out how to get more of the good helicopter and fewer of the bad helicopter outcomes.  
[00:05:12] One way to think of why reinforcement learning is so powerful is you have to tell it what to do rather than how to do it  
[00:05:20] and specifying the reward function rather than the optimal action gives you a lot more flexibility in how you design the system.  
[00:05:28] Concretely, for flying the helicopter, whenever it is flying well, you may give it a reward of plus one every second that it's flying well.  
[00:05:38] And maybe whenever it's flying poorly, you may give it a negative reward.  
[00:05:44] Or if it ever crashes, you may give it a very large negative reward like negative one thousand.  
[00:05:50] And so this would incentivize the helicopter to spend a lot more time flying well and hopefully to never crash.  
[00:05:57] But here's another fun video. I was using the good dog, bad dog analogy for reinforcement learning for many years.  
[00:06:06] And then one day I actually managed to get my hands on a robotic dog and could actually use this reinforcement learning good dog, bad dog methodology to train a robot dog to get over obstacles.  
[00:06:18] So this is a video of a robot dog that using reinforcement learning, which rewards it moving toward the left of the screen, has learned how to place his feet carefully or climb over a variety of obstacles.  
[00:06:33] And if you think about what it takes to program a dog like this, I have no idea. I really don't know how to tell it what's the best way to place his legs to get over a given obstacle.  
[00:06:45] All of these things were figured out automatically by the robot just by giving it rewards that incentivizes it making progress toward the goal on the left of the screen.  
[00:06:57] Today, reinforcement learning has been successfully applied to a variety of applications ranging from controlling robots.  
[00:07:04] And in fact, later this week in the practice lab, you implement for yourself a reinforcement learning algorithm to land a lunar lander in simulation.  
[00:07:15] It's also been used for factory optimization. How do you rearrange things in the factory to maximize throughput and efficiency as well as financial stock trading?  
[00:07:26] For example, one of my friends was working on efficient stock execution.  
[00:07:31] So if you've decided to sell a million shares over the next several days, well, you may not want to dump a million shares on the stock market suddenly because that will move prices against you.  
[00:07:41] So what's the best way to sequence out your trades over time so that you can sell the shares you want to sell and hopefully get the best possible price for them?  
[00:07:51] Finally, there have also been many applications of reinforcement learning to playing games, everything from checkers to chess to the card game of bridge to go, as well as for playing many video games.  
[00:08:05] So that's reinforcement learning. Even though reinforcement learning is not used nearly as much as supervised learning, it is still used in a few applications today.  
[00:08:16] And the key idea is rather than you needing to tell the algorithm what is the right output Y for every single input, all you have to do instead is specify a reward function that tells it when it's doing well and when it's doing poorly.  
[00:08:32] And it's the job of the algorithm to automatically figure out how to choose good actions.  
[00:08:37] With that, let's now go on to the next video where we'll formalize the reinforcement learning problem and also start to develop algorithms for automatically picking good actions.
