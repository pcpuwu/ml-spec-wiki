# Neurons and the Brain — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](neurons-and-the-brain.md)

---

[00:00:00] When neural networks were first invented many decades ago, the original motivation was to  
[00:00:05] write software that could mimic how the human brain or how the biological brain learns and  
[00:00:10] thinks. And even though today neural networks, sometimes also called artificial neural networks,  
[00:00:17] have become very different than how any of us might think about how the brain actually works  
[00:00:22] and learns, some of the biological motivation still remains in the way we think about artificial  
[00:00:28] neural networks or computer neural networks today. So let's start by taking a look at how  
[00:00:33] the brain works and how that relates to neural networks. The human brain, or maybe more generally  
[00:00:39] the biological brain, demonstrates a higher level or more capable level of intelligence than anything  
[00:00:46] else we've built so far. And so neural networks have started with the motivation of trying to  
[00:00:52] build software to mimic the brain. Work in neural networks had started back in the 1950s and then it  
[00:01:00] fell out of favor for a while. Then in the 1980s and early 1990s, they gained in popularity again  
[00:01:08] and showed tremendous traction in some applications like handwritten digit recognition,  
[00:01:13] which were used even back then to read postal codes for routing mail and for reading dollar  
[00:01:19] figures in handwritten checks. But then it fell out of favor again in the late 1990s and it was  
[00:01:27] from about 2005 that it enjoyed a resurgence and also became maybe rebranded a little bit with  
[00:01:35] deep learning. One of the things that surprised me back then was deep learning and neural networks  
[00:01:42] meant very similar things. But I maybe underappreciated at the time that the term  
[00:01:47] deep learning just sounds much better because it's deep and it's learning. And so that turned  
[00:01:52] out to be the brand that took off in the last decade or decade and a half. And since then,  
[00:01:58] neural networks have revolutionized application area after application area. I think the first  
[00:02:04] application area that modern neural networks or deep learning had a huge impact on was probably  
[00:02:09] speech recognition, where we started to see much better speech recognition systems due to modern  
[00:02:15] deep learning. And authors such as Li Deng and Geoff Hinton were instrumental to this.  
[00:02:20] And then it started to make inroads into computer vision. And sometimes people still speak of the  
[00:02:27] ImageNet moment in 2012, and that was maybe a bigger splash where it then caught broader  
[00:02:34] imagination and had a big impact on computer vision. Then in the next few years, it made its  
[00:02:39] inroads into text or into natural language processing, and so on and so forth. And now,  
[00:02:45] neural networks are used in everything from climate change to medical imaging to online  
[00:02:50] advertising to product recommendations, and really lots of application areas of machine learning now  
[00:02:55] use neural networks. Even though today's neural networks have almost nothing to do with how the  
[00:03:02] brain learns, there was the early motivation of trying to build software to mimic the brain.  
[00:03:09] So how does the brain work? Here's a diagram illustrating what neurons in a brain look like.  
[00:03:16] All of human thought is from neurons like these in your brain and mine,  
[00:03:21] sending electrical impulses and sometimes forming new connections with other neurons.  
[00:03:27] Given a neuron like this one, it has a number of inputs where it receives electrical impulses  
[00:03:34] from other neurons, and then this neuron that I've circled carries out some computations  
[00:03:40] and will then send its output to other neurons via these electrical impulses.  
[00:03:47] This upper neuron's output in turn becomes the input to this neuron down below, which again  
[00:03:53] aggregates inputs from multiple other neurons to then maybe send its own output to yet other  
[00:03:59] neurons. And this is the stuff of which human thought is made. Here's a simplified diagram of a  
[00:04:07] biological neuron. A neuron comprises a cell body shown here on the left, and if you have taken a  
[00:04:16] class in biology, you may recognize this to be the nucleus of the neuron. And as we saw on the  
[00:04:23] previous slide, the neuron has different inputs, and in a biological neuron, the input wires are  
[00:04:30] called the dendrites, and it then occasionally sends electrical impulses to other neurons via  
[00:04:37] the output wire, which is called the axon. Don't worry about these biological terms. If you saw  
[00:04:43] them in a biology class, you may remember them, but you don't really need to memorize any of these  
[00:04:48] terms for the purpose of building artificial neural networks. But this biological neuron may  
[00:04:54] then send electrical impulses that becomes the input to another neuron. So the artificial neural  
[00:05:01] network uses a very simplified mathematical model of what a biological neuron does. And I'm going to  
[00:05:11] draw a little circle here to denote a single neuron. And what a neuron does is it takes some  
[00:05:19] inputs, one or more inputs, which are just numbers, and it does some computation and it outputs some  
[00:05:27] other number, which then could be an input to a second neuron shown here on the right. When you're  
[00:05:34] building an artificial neural network or a deep learning algorithm, rather than building one neuron  
[00:05:40] at a time, you often want to simulate many such neurons at the same time. And so when in this  
[00:05:48] diagram I'm drawing three neurons, and what these neurons do collectively is input a few numbers,  
[00:05:57] carry out some computation, and output some other numbers. Now at this point, I'd like to give one  
[00:06:04] big caveat, which is that even though I made a loose analogy between biological neurons and  
[00:06:10] artificial neurons, I think that today we have almost no idea how the human brain works. In fact,  
[00:06:17] every few years, neuroscientists make some fundamental breakthrough about how the brain  
[00:06:21] works, and I think we'll continue to do so for the foreseeable future. And that to me is a sign that  
[00:06:28] there are many breakthroughs that are yet to be discovered about how the brain actually works,  
[00:06:32] and thus attempts to blindly mimic what we know of the human brain today, which is frankly very  
[00:06:38] little, probably won't get us that far toward building real intelligence, certainly not with  
[00:06:44] our current level of knowledge in neuroscience. Having said that, even with these extremely  
[00:06:50] simplified models of a neuron, which we'll talk about, we'll be able to build really powerful  
[00:06:55] deep learning algorithms. And so as we go deeper into neural networks and into deep learning,  
[00:07:01] even though the origins were biologically motivated, don't take the biological motivation  
[00:07:07] too seriously. In fact, those of us that do research in deep learning have shifted away  
[00:07:12] from looking to biological motivation that much, but instead are just using engineering principles  
[00:07:18] to figure out how to build algorithms that are more effective. But I think it might still be  
[00:07:22] fun to speculate and think about how biological neurons work every now and then. The ideas of  
[00:07:29] neural networks have been around for many decades, so a few people have asked me,  
[00:07:33] hey Andrew, why now? Why is it that only in the last handful of years that neural networks have  
[00:07:39] really taken off? This is a picture I draw for them when I'm asked that question, and that maybe  
[00:07:45] you could draw for others as well if they ask you that question. Let me plot on the horizontal axis  
[00:07:51] the amount of data you have for a problem, and on the vertical axis the performance or the accuracy  
[00:07:58] of a learning algorithm applied to that problem. Over the last couple decades, with the rise of  
[00:08:05] the internet, the rise of mobile phones, the digitalization of our society, the amount of  
[00:08:10] data we have for a lot of applications has steadily marched to the right. A lot of records  
[00:08:16] that used to be on paper, such as if you order something, rather than it being on a piece of  
[00:08:21] paper, that's much more likely to be a digital record. Your health record, if you see a doctor,  
[00:08:26] is much more likely to be digital now compared to on pieces of paper.  
[00:08:32] And so in many application areas, the amount of digital data has exploded.  
[00:08:37] And what we saw was with traditional machine learning algorithms, such as logistic regression  
[00:08:43] and linear regression, even as you fed those algorithms more data, it was very difficult to  
[00:08:50] get the performance to keep on going up. So it was as if the traditional learning algorithms,  
[00:08:55] like linear regression and logistic regression, they just weren't able to scale with the amount  
[00:09:00] of data we could now feed it, and they weren't able to take effective advantage of all this data  
[00:09:05] we had for different applications. And what AI researchers started to observe was that if you  
[00:09:12] were to train a small neural network on this data set, then the performance maybe looks like this.  
[00:09:19] And if you were to train a medium-sized neural network, meaning one with more neurons in it,  
[00:09:25] this performance may look like that. And if you were to train a very large neural network,  
[00:09:30] meaning one with a lot of these artificial neurons, then for some applications, the performance would  
[00:09:35] just keep on going up. And so this meant two things. It meant that for a certain class of  
[00:09:41] applications where you do have a lot of data, sometimes you hear the term big data tossed  
[00:09:47] around. If you're able to train a very large neural network to take advantage of that huge  
[00:09:54] amount of data you have, then you could obtain performance on anything ranging from speech  
[00:10:00] recognition, to image recognition, to natural language processing applications, and many more  
[00:10:04] that just were not possible with earlier generations of learning algorithms. And this  
[00:10:10] caused deep learning algorithms to take off. And this too is why faster computer processes,  
[00:10:17] including the rise of GPUs or graphics processor units, this is hardware originally designed  
[00:10:24] to generate nice-looking computer graphics, but turned out to be really powerful for deep learning  
[00:10:31] as well. That was also a major force in allowing deep learning algorithms to become what it is  
[00:10:37] today. That's how neural networks got started, as well as why they took off so quickly in the  
[00:10:43] last several years. Let's now dive more deeply into the details of how a neural network actually  
[00:10:49] works. Please go on to the next video.
