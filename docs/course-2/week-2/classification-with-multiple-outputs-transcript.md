# Classification with Multiple Outputs (Multi-label) — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](classification-with-multiple-outputs.md)

---

[00:00:02] You've learned about multi-class classification, where the output label Y can be any one of  
[00:00:09] two or potentially many more than two possible categories.  
[00:00:13] There's a different type of classification problem called a multi-label classification  
[00:00:19] problem, which is where, associated with each image, there could be multiple labels.  
[00:00:25] Let me show you what I mean by that.  
[00:00:27] If you're building a self-driving car or maybe a driver assistance system, then given a picture  
[00:00:34] of what's in front of your car, you may want to ask a question like, is there a car or at least  
[00:00:40] one car, or is there a bus, or is there a pedestrian, or are there any pedestrians?  
[00:00:46] So in this case, there is a car, there is no bus, and there is at least one pedestrian,  
[00:00:54] or in this second image, no cars, no buses, and yes to pedestrians, and yes car, yes bus,  
[00:01:02] and no pedestrians.  
[00:01:05] So these are examples of multi-label classification problems, because associated with a single  
[00:01:12] input image X are three different labels, corresponding to whether or not there are  
[00:01:20] any cars, buses, or pedestrians in the image.  
[00:01:23] So in this case, the target output Y is actually a vector of three numbers.  
[00:01:31] And this is as distinct from multi-class classification, where for, say, handwritten  
[00:01:37] digit classification, Y was just a single number, even if that number could take on  
[00:01:42] 10 different possible values.  
[00:01:44] So how do you build a neural network for multi-label classification?  
[00:01:49] One way to go about it is to just treat this as three completely separate machine learning  
[00:01:54] problems.  
[00:01:55] You could build one neural network to decide, are there any cars, a second one to detect  
[00:02:00] buses, and a third one to detect pedestrians.  
[00:02:03] And that's actually not an unreasonable approach.  
[00:02:07] Here's the first neural network to detect cars, second one to detect buses, third one  
[00:02:12] to detect pedestrians.  
[00:02:15] But there's another way to do this, which is to train a single neural network to  
[00:02:19] simultaneously detect all three of cars, buses, and pedestrians, which is if your neural  
[00:02:26] network architecture looks like this.  
[00:02:29] That's your input X.  
[00:02:30] First hidden layer outputs A1, second hidden layer outputs A2, and then the final output  
[00:02:36] layer, in this case, will have three output neurons and will output A3, which is going  
[00:02:43] to be a vector of three numbers.  
[00:02:47] And because we're solving three binary classification problems, so is there a car, is  
[00:02:52] there a bus, is there a pedestrian, you can use a sigmoid activation function for each  
[00:02:56] of these three nodes in the output layer.  
[00:02:59] And so A3 in this case will be A31, A32, and A33, corresponding to whether or not the  
[00:03:07] learning algorithm thinks it's a car, and or a bus, and or pedestrians in the image.  
[00:03:12] So multi-cost classification and multi-label classification are sometimes confused with  
[00:03:17] each other, and that's why in this video, I want to share with you just a definition  
[00:03:21] of multi-label classification problems as well, so that depending on your application,  
[00:03:26] you could choose the right one for the job you want to do.  
[00:03:30] So that's it for multi-label classification.  
[00:03:34] I find that sometimes multi-cost classification and multi-label classification are confused  
[00:03:40] with each other, which is why I wanted to explicitly in this video share with you what  
[00:03:45] is multi-label classification, so that depending on your application, you can choose the right  
[00:03:51] two for the job that you want to do.  
[00:03:54] And that wraps up this section on multi-cost and multi-label classification.  
[00:04:00] In the next video, we'll start to look at some more advanced neural network concepts,  
[00:04:05] including an optimization algorithm that is even better than gradient descent.  
[00:04:10] So let's take a look at that algorithm in the next video, because it'll help you to  
[00:04:14] get your learning algorithms to learn much faster.  
[00:04:17] So let's go on to the next video.
