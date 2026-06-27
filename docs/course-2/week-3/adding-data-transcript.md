# Adding Data — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](adding-data.md)

---

[00:00:03] In this video, I'd like to share with you some tips for adding data, or collecting more data, or sometimes even creating more data for your machine learning application.  
[00:00:12] Just a heads up that this and the next few videos will seem a little bit like a grab bag of different techniques, and I apologize if it seems a little bit grab baggy.  
[00:00:22] And that's because machine learning applications are different. Machine learning is applied to so many different problems, and for some, humans are great at creating labels.  
[00:00:31] And for some, you can get more data, and for some, you can't. And that's why different applications actually sometimes call for slightly different techniques.  
[00:00:40] But I hope in this and the next few videos to share with you some of the techniques that I've found to be most useful for different applications.  
[00:00:47] Although not every one of them will apply for every single application, but I hope many of them will be useful for many of the applications that you'll be working on as well.  
[00:00:56] But let's take a look at some tips for how to add data for your application.  
[00:01:01] When training machine learning algorithms, it feels like always we wish we had even more data almost all the time.  
[00:01:08] And so sometimes it's tempting to let's just get more data of everything.  
[00:01:14] But trying to get more data of all types can be slow and expensive.  
[00:01:20] Instead, an alternative way of adding data might be to focus on adding more data of the types where error analysis has indicated it might help.  
[00:01:31] In the previous slide, we saw if error analysis revealed that farmer spam was a large problem, then you may decide to have a more targeted effort not to get more data of everything under the sun, but to instead focus on getting more examples of farmer spam.  
[00:01:50] And with a more modest cost, this could let you add just the emails you need to help your learning algorithm get smarter on recognizing farmer spam.  
[00:02:01] And so one example of how you might do this is if you have a lot of unlabeled email data, say email sitting around and no one has bothered to label yet spam or non-spam.  
[00:02:14] You may be able to ask the labelers to quickly skim through the unlabeled data and find more examples specifically of farmer related spam.  
[00:02:24] And this could boost your learning algorithm's performance much more than just trying to add more data of all sorts of emails.  
[00:02:33] But the more general pattern I hope you take away from this is if you have some ways to add more data of everything, that's okay.  
[00:02:42] Nothing wrong with that. But if error analysis has indicated that there are certain subsets of the data that the algorithm is doing particularly poorly on and that you want to improve performance on,  
[00:02:55] then getting more data of just the types where you want it to do better, be it more examples of pharmaceutical spam or more examples of phishing spam or something else,  
[00:03:05] that could be a more efficient way to add just a little bit of data but boost your algorithm's performance by quite a lot.  
[00:03:11] Beyond getting your hands on brand new training examples XY, there's another technique that's widely used especially for images and audio data that can increase your training set size significantly.  
[00:03:27] This technique is called data augmentation, and what we're going to do is take an existing training example to create a new training example.  
[00:03:35] For example, if you're trying to recognize the letters from A to Z for an OCR, optical character recognition problem, so not just the digits 0 to 9 but also the letters from A to Z.  
[00:03:48] Given an image like this, you might decide to create a new training example by rotating the image a bit or by enlarging the image a bit or by shrinking a little bit or by changing the contrast of the image.  
[00:04:07] These are examples of distortions to the image that don't change the fact that this is still the letter A.  
[00:04:16] For some letters but not others, you can also take the mirror image of the letter and it still looks like the letter A, but this only applies to some letters.  
[00:04:27] These would be ways of taking a training example XY and applying a distortion or transformation to the input X in order to come up with another example that has the same label.  
[00:04:44] By doing this, you're telling the algorithm that the letter A rotated a bit or enlarged a bit or shrunk a little bit, it is still the letter A.  
[00:04:53] Creating additional examples like this helps the learning algorithm do a better job learning how to recognize the letter A.  
[00:05:01] For a more advanced example of data augmentation, you can also take the letter A and place a grid on top of it.  
[00:05:10] By introducing random warping of this grid, you can take the letter A and introduce warping of the letter A to create a much richer library of examples of the letter A.  
[00:05:23] This process of distorting these examples then has turned one image or one example into here training examples that you can feed to the learning algorithm to help it learn more robustly what is the letter A.  
[00:05:38] This idea of data augmentation also works for speech recognition.  
[00:05:43] Let's say for a voice search application, you have an original audio clip that sounds like this.  
[00:05:50] What is today's weather?  
[00:05:52] One way you can apply data augmentation to speech data would be to take noisy background audio like this.  
[00:06:00] For example, this is what the sound of a crowd sounds like.  
[00:06:09] And it turns out that if you take these two audio clips, the first one and the crowd noise, and you add them together, then you end up with an audio clip that sounds like this.  
[00:06:21] What is today's weather?  
[00:06:23] And you just created an audio clip that sounds like someone saying, what's the weather today, but they're saying it around a noisy crowd in the background.  
[00:06:33] Or in fact, if you were to take a different background noise, say someone in a car, this is what background noise of a car sounds like.  
[00:06:44] And you were to add the original audio clip to the car noise, then you get this.  
[00:06:50] What is today's weather?  
[00:06:52] And it sounds like the original audio clip, but as if the speaker was saying it from a car.  
[00:06:59] And a more advanced data augmentation step would be if you make the original audio sound like you're recording it on a bad cell phone connection like this.  
[00:07:08] What is today's weather?  
[00:07:11] And so we've seen how you can take one audio clip and turn it into three training examples here.  
[00:07:16] One with crowd background noise, one with car background noise, and one as if it was recorded on a bad cell phone connection.  
[00:07:24] And the times I've worked on speech recognition systems, this was actually a really critical technique for increasing, artificially, the size of the training data I had to build a more accurate speech recognizer.  
[00:07:36] One tip for data augmentation is that the changes or the distortions you make to the data should be representative of the types of noise or distortions in the test set.  
[00:07:48] So, for example, if you take the letter A and warp it like this, this still looks like examples of letters you might see up there that you would like to recognize.  
[00:07:58] Or for audio, adding background noise or bad cell phone connection, if that's representative of what you expect to hear in the test set, then these would be helpful ways to carry out data augmentation on your audio data.  
[00:08:14] In contrast, it's usually not that helpful to add purely random, meaningless noise to your data.  
[00:08:21] For example, here I've taken the letter A and I've added per pixel noise, where if xi is the intensity or the brightness of pixel i, if I were to just add noise to each pixel, then you end up with images that look like this.  
[00:08:37] But to the extent that this isn't that representative of what you see in the test set, because you don't often get images like this in the test set, this is actually going to be less helpful.  
[00:08:48] So one way to think about data augmentation is how can you modify or warp or distort or make more noisy your data, but in a way so that what you get is still quite similar to what you have in your test set.  
[00:09:02] Because that's what the learning algorithm will ultimately end up doing well on.  
[00:09:07] Now, whereas data augmentation takes an existing training example and modifies it to create another training example, there's one other technique, which is data synthesis, in which you make up brand new examples from scratch, not by modifying an existing example, but by creating brand new examples.  
[00:09:27] So take the example of photo OCR. Photo OCR, or photo optical character recognition, refers to the problem of looking at an image like this and automatically having a computer read the text that appears in this image.  
[00:09:43] So there's a lot of text in this image.  
[00:09:45] How can you train an OCR algorithm to read text from an image like this?  
[00:09:53] Well, when you look closely at what the letters in this image look like, they actually look like this.  
[00:09:59] So this is real data from a photo OCR task.  
[00:10:02] And one key step of the photo OCR task is to be able to look at a little image like this and recognize the letter at the middle.  
[00:10:10] So this has T in the middle, this has the letter L in the middle, this has the letter C in the middle, and so on.  
[00:10:20] So one way to create artificial data for this task is if you go to your computer's text editor, you find that it has a lot of different fonts.  
[00:10:31] And what you can do is take these fonts and basically type out random text in your text editor and screenshot it using different colors and different contrasts and very different fonts.  
[00:10:45] And you get synthetic data like that on the right.  
[00:10:49] The images on the left were real data from real pictures taken out in the world.  
[00:10:55] The images on the right are synthetically generated using fonts on the computer, and it actually looks pretty realistic.  
[00:11:03] So with synthetic data generation like this, you can generate a very large number of images or examples for your photo OCR task.  
[00:11:13] It can be a lot of work to write the code to generate realistic-looking synthetic data for a given application.  
[00:11:21] But when you spend the time to do so, it can sometimes help you generate a very large amount of data for your application and give you a huge boost to your album's performance.  
[00:11:33] Synthetic data generation has been used most probably for computer vision tasks and less for other applications, not that much for audio tasks as well.  
[00:11:44] All the techniques you've seen in this video relate to finding ways to engineer the data used by your system.  
[00:11:52] In the way that machine learning has developed over the last several decades, many decades, most machine learning researchers' attention was on the conventional model-centric approach.  
[00:12:03] And here's what I mean.  
[00:12:06] A machine learning system, or an AI system, includes both code to implement your algorithm or your model, as well as the data that you train the algorithm on.  
[00:12:15] And over the last few decades, most researchers doing machine learning research would download the data set and hold the data fixed while they focus on improving the code of the algorithm or the model.  
[00:12:29] Thanks to that paradigm of machine learning research, I find that today, the algorithms we have access to, such as linear regression, logistic regression, neural networks, also decision trees which you'll see next week,  
[00:12:43] there are algorithms that are already very good and will work well for many applications.  
[00:12:49] And so sometimes it can be more fruitful to spend more of your time taking a data-centric approach in which you focus on engineering the data used by your algorithm.  
[00:13:02] And this can be anything from collecting more data to collecting more data just on pharmaceutical spam, if that's what error analysis tells you to do,  
[00:13:11] to using data augmentation to generate more images or more audio, or using data synthesis to just create more training examples.  
[00:13:19] And sometimes that focus on the data can be an efficient way to help your learning algorithm improve its performance.  
[00:13:27] So I hope that this video gives you a set of tools to be efficient and effective in how you add more data to get your learning algorithm to work better.  
[00:13:38] Now, there are also some applications where you just don't have that much data and it's really hard to get more data.  
[00:13:44] It turns out that there's a technique called transfer learning, which could apply in that setting to give your learning algorithm's performance a huge boost.  
[00:13:53] And the key idea is to take data from a totally different, fairly related task.  
[00:13:58] But using a neural network, there's sometimes ways to use that data from a very different task to get your algorithm to do better on your application.  
[00:14:08] It doesn't apply to everything, but when it does, it can be very powerful.  
[00:14:12] Let's take a look in the next video at how transfer learning works.
