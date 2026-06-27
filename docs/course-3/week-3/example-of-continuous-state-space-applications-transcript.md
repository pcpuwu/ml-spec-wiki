# Example of Continuous State-Space Applications — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](example-of-continuous-state-space-applications.md)

---

[00:00:02] Many robotic control applications, including the Lunar Lander application that you work on in the practice lab, have continuous state spaces.  
[00:00:11] Let's take a look at what that means and how to generalize the concepts we've talked about to these continuous state spaces.  
[00:00:18] The Simplified Mars Rover example we used had used a discrete set of states.  
[00:00:24] And what that means is that Simplified Mars Rover could only be in one of six possible positions.  
[00:00:32] But most robots can be in more than one of six or any discrete number of positions.  
[00:00:39] Instead, they can be in any of a very large number of continuous value positions.  
[00:00:46] For example, if the Mars Rover could be anywhere on a line, so its position was indicated by a number ranging from 0 to 6 kilometers,  
[00:00:59] where any number in between is valid, that would be an example of a continuous state space.  
[00:01:06] Because the position would be represented by a number, such as that is 2.7 kilometers along or 4.8 kilometers or any other number between 0 and 6.  
[00:01:18] Let's look at another example. I'm going to use for this example the application of controlling a car or a truck.  
[00:01:25] Here's a toy car, or actually a toy truck. This one belongs to my daughter.  
[00:01:29] If you're building a self-driving car or a self-driving truck and you want to control this to drive smoothly,  
[00:01:35] then the state of this truck might include a few numbers, such as its X position, its Y position, maybe its orientation, what way is it facing.  
[00:01:46] Assuming the truck stays on the ground, you probably don't need to worry about how tall it is, how high up it is.  
[00:01:53] The state would include X, Y, and its angle, theta, as well as maybe its speed in the X direction, its speed in the Y direction, and how quickly it is turning.  
[00:02:06] Is it turning at 1 degree per second, or is it turning at 30 degrees per second, or is it turning really quickly at 90 degrees per second?  
[00:02:14] For a truck or a car, the state might include not just one number, like how many kilometers it is along this line, but it might include six numbers.  
[00:02:26] Its X position, its Y position, its orientation, which I'm going to denote using Greek alphabet theta, as well as its velocity in the X direction, which I'm going to denote using X dot.  
[00:02:40] So that means how quickly is this X coordinate changing, Y dot, how quickly is the Y coordinate changing, and then finally theta dot, which is how quickly is the angle of the car changing.  
[00:02:55] Whereas for the six-speed Mazda Rover, for example, the state was just one of six possible numbers.  
[00:03:01] It could be 1, 2, 3, 4, 5, or 6.  
[00:03:05] For the car, the state would comprise this vector of six numbers, and any of these numbers can take on any value within its valid range.  
[00:03:17] For example, theta should range between 0 and 360 degrees.  
[00:03:23] Let's look at another example.  
[00:03:25] What if you're building a reinforcement learning algorithm to control an autonomous helicopter?  
[00:03:31] How would you characterize the position of the helicopter?  
[00:03:34] To illustrate, I have with me here a small toy helicopter.  
[00:03:38] The position of the helicopter would include its X position, such as how far north or south is the helicopter, its Y position, maybe how far on the east-west axis is the helicopter, and then also Z, the height of the helicopter above ground.  
[00:03:55] But other than the position, the helicopter also has an orientation.  
[00:04:00] Conventionally, one way to capture its orientation is with three additional numbers, one of which captures the roll of the helicopter.  
[00:04:09] Is it rolling to the left or the right?  
[00:04:11] The pitch, is it pitching forward or pitching up, pitching back?  
[00:04:14] And then finally, the yaw, which is what's the compass orientation is it facing.  
[00:04:20] Is it facing north or east or south or west?  
[00:04:22] So to summarize, the state of the helicopter includes its position in the, say, north-south direction, its position in the east-west direction, Y, its height above ground, and also the roll, the pitch, and also the yaw of the helicopter.  
[00:04:42] To write this down, the state therefore includes the position, X, Y, Z, and then the roll, pitch, and yaw, denoted with Greek alphabets, Phi, Theta, and Omega.  
[00:04:59] But to control the helicopter, we also need to know its speed in the X direction, in the Y direction, and in the Z direction, as well as its rate of turning, also called the angular velocity.  
[00:05:13] So how fast is this roll changing, and how fast is this pitch changing, and how fast is this yaw changing?  
[00:05:21] So this is actually the state used to control autonomous helicopters.  
[00:05:25] It's this list of 12 numbers that is input to a policy, and the job of a policy is to look at these 12 numbers and decide what's an appropriate action to take in a helicopter.  
[00:05:38] So, in a continuous state reinforcement learning problem, or a continuous state Markov decision process, continuous state MDP, the state of the problem isn't just one of a small number of possible discrete values, like a number from 1 to 6.  
[00:05:54] Instead, it's a vector of numbers, any of which could take any of a large number of values.  
[00:06:03] In the practice lab for this week, you get to implement for yourself a reinforcement learning algorithm applied to a simulated lunar lander application, landing something on the moon in simulation.  
[00:06:16] Let's take a look in the next video at what that application entails, since that would be another continuous state application.
