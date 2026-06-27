# Full Cycle of a Machine Learning Project — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](full-cycle-of-a-machine-learning-project.md)

---

[00:00:02] So far, we've talked a lot about how to train a model, and also talked a bit about how to get data for your machine learning application.  
[00:00:10] But when I'm building a machine learning system, I find that training a model is just part of the puzzle.  
[00:00:17] In this video, I'd like to share with you what I think of as the full cycle of a machine learning project.  
[00:00:23] That is, when you're building a valuable machine learning system, what are the steps to think about and plan for?  
[00:00:30] Let's take a look.  
[00:00:31] Let me use speech recognition as an example to illustrate the full cycle of a machine learning project.  
[00:00:37] The first step of a machine learning project is to scope the project.  
[00:00:41] In other words, decide what is the project and what you want to work on.  
[00:00:46] For example, I once decided to work on speech recognition for voice search.  
[00:00:51] That is, to do web search using speaking to your mobile phone rather than typing into your mobile phone.  
[00:00:57] So that's project scoping.  
[00:00:59] After deciding what to work on, you have to collect data.  
[00:01:03] So decide what data you need to train your machine learning system and go and do the work to get the audio and get the transcripts or the labels for your dataset.  
[00:01:12] So that's data collection.  
[00:01:14] After you have your initial data collection, you can then start to train the model.  
[00:01:20] And so here you would train the speech recognition system and carry out error analysis and iteratively improve your model.  
[00:01:29] And it's not at all uncommon after you've started training the model for an error analysis or for a bias-variance analysis to tell you that you might want to go back to collect more data.  
[00:01:42] Maybe collect more data of everything or just collect more data of a specific type where your error analysis tells you you want to improve the performance of your learning algorithm.  
[00:01:52] For example, once when working on speech, I realized that my model was doing particularly poorly when there was car noise in the background.  
[00:02:00] So it sounded like someone was speaking in a car.  
[00:02:03] My speech system performed poorly, decided to get more data, actually using data augmentation to get more speech data that sounds like it was a car in order to improve the performance of my learning algorithm.  
[00:02:17] So you go around this loop a few times, train the model, carry out error analysis, go back to collect more data, maybe do this for a while, until eventually you think the model is good enough to then deploy in a production environment.  
[00:02:30] And what that means is you make it available for users to use.  
[00:02:34] And when you deploy a system, you want to also make sure that you continue to monitor the performance of the system and to maintain the system in case the performance gets worse to bring its performance back up.  
[00:02:46] Instead of just hosting your machine learning model on a server, I'll say a little bit more about why you need to maintain these machine learning systems on the next slide.  
[00:02:56] But after this deployment, sometimes you realize that it's not working as well as you hoped, and you go back to train the model to improve it again or even go back and get more data.  
[00:03:07] In fact, if users and if you have permission to use data from your production deployment, sometimes that data from your working speech system can give you access to even more data with which to keep on improving the performance of your system.  
[00:03:24] Now, I think you have a sense of what scoping a project means.  
[00:03:27] And we'll talk a bunch about collecting data and training models in this course.  
[00:03:32] But let me share with you a little bit more detail about what deploying in production might look like.  
[00:03:39] After you've trained a high-performing machine learning model, say a speech recognition model, a common way to deploy the model would be to take your machine learning model and implement it in a server, which I'm going to call an inference server, whose job it is to call your machine learning model, your trained model, in order to make predictions.  
[00:04:06] Then if your team has implemented a mobile app, say a search application, then when a user talks to the mobile app, the mobile app can then make an API call to pass to your inference server the audio clip that was recorded.  
[00:04:23] And the inference server's job is to apply the machine learning model to it and then return to it the prediction of your model, which in this case would be the text transcript of what was said.  
[00:04:36] So this would be a common way of implementing an application that calls via an API an inference server that has your model repeatedly make predictions based on the input X.  
[00:04:49] So this would be a common pattern where depending on the application that's implemented, you have an API call to give your learning algorithm the input X, and your machine learning model would then output the prediction, say Y hat.  
[00:05:04] To implement this, some software engineering may be needed to write all the code that does all of these things.  
[00:05:13] And depending on whether your application needs to serve just a few handful of users or millions of users, the amounts of software engineering needed can be quite different.  
[00:05:23] So I've built software that serves just a handful of users on my laptop, and I've also built software that serves hundreds of millions of users, requiring significant data center resources.  
[00:05:37] So depending on the scale of the application needed, software engineering may be needed to make sure that your inference server is able to make reliable and efficient predictions, hopefully at not too high a computational cost.  
[00:05:50] Software engineering may be needed to manage scaling to a large number of users.  
[00:05:54] You often want to log the data you're getting, both the inputs X as well as the predictions Y hat, assuming that user privacy and consent allows you to store this data.  
[00:06:05] And this data, if you can access to it, is also very useful for system monitoring.  
[00:06:12] For example, I once built a speech recognition system on a certain data set that I had.  
[00:06:17] But when there were new celebrities that suddenly became well-known, or elections caused new politicians to become elected, then people would search for these new names that were not in the training set and that my system did poorly on.  
[00:06:33] And it was because we're monitoring the system, it allowed us to figure out when the data was shifting and the algorithm was becoming less accurate, and this allowed us to retrain the model and then to carry out a model update to replace the old model with a new one.  
[00:06:52] So the deployment process can require some amount of software engineering.  
[00:06:57] For some applications, if you're just running it on a laptop or on a one-on-two service, maybe not that much software engineering is needed.  
[00:07:05] And depending on the team you're working on, it's possible that you build the machine learning model, but there could be a different team responsible for deploying it.  
[00:07:18] But there is a growing field in machine learning called MLOps.  
[00:07:22] This stands for Machine Learning Operations, and this refers to the practice of how to systematically build and deploy and maintain machine learning systems to do all of these things to make sure that your machine learning model is reliable, scales well, has good logs, is monitored, and that you have the opportunity to make updates.  
[00:07:47] to the model as appropriate to keep it running well.  
[00:07:50] For example, if you're deploying your system to millions of people, you may want to make sure you have a highly optimized implementation so that the compute cost of serving millions of people is not too expensive.  
[00:08:03] So in this and the last class, we spent a lot of time talking about how to train a machine learning model, and that is absolutely the critical piece to making sure you have a high-performance system.  
[00:08:15] And if you ever have to deploy a system to millions of people, these are some additional steps that you probably have to address, think about and address at that point as well.  
[00:08:26] Before moving on from the topic of the machine learning development process, there's one more set of ideas that I want to share with you that relates to the ethics of building machine learning systems.  
[00:08:38] This is a crucial topic for many applications, so let's take a look at this in the next video.
