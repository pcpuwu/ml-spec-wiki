# Is There a Path to AGI? — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](is-there-a-path-to-agi.md)

---

[00:00:02] Ever since I was a teenager, starting to play around with neural networks, I always felt  
[00:00:06] the dream of maybe someday building an AI system that's as intelligent as myself, or  
[00:00:12] as intelligent as a typical human, that that was one of the most inspiring dreams of AI.  
[00:00:17] I still hold that dream alive today, but I think that the path to get there is not clear  
[00:00:22] and could be very difficult, and I don't know whether it'll take us mere decades and whether  
[00:00:27] we'll see breakthroughs within our lifetimes, or if it may take centuries or even longer  
[00:00:32] to get there.  
[00:00:33] But let's take a look at what this AGI, Artificial General Intelligence, dream is like, and speculate  
[00:00:41] a bit on what might be possible paths, unclear paths, difficult paths, to get there someday.  
[00:00:47] I think there's been a lot of unnecessary hype about AGI, or Artificial General Intelligence,  
[00:00:54] and maybe one reason for that is AI actually includes two very different things.  
[00:01:01] One is ANI, which stands for Artificial Narrow Intelligence.  
[00:01:06] This is an AI system that does one thing, a narrow task, sometimes really, really well,  
[00:01:11] and can be incredibly valuable, such as a smart speaker, or self-driving car, or web  
[00:01:15] search, or AI applied to specific applications, such as farming or factories.  
[00:01:22] Over the last several years, ANI has made tremendous progress and is creating, as you  
[00:01:28] know, tremendous value in the world today.  
[00:01:31] Because ANI is a subset of AI, the rapid progress in ANI makes it logically true that AI has  
[00:01:39] also made tremendous progress in the last decade.  
[00:01:44] There's a different idea in AI, which is AGI, Artificial General Intelligence, this hope  
[00:01:49] of building AI systems that could do anything a typical human can do.  
[00:01:55] And despite all the progress in ANI, and therefore tremendous progress in AI, I'm not sure how  
[00:02:02] much progress, if any, we're really making toward AGI.  
[00:02:07] And I think all the progress in ANI has made people conclude correctly that there's tremendous  
[00:02:12] progress in AI, but that has caused some people to conclude, I think incorrectly, that a lot  
[00:02:19] of progress in AI necessarily means that there's a lot of progress toward AGI.  
[00:02:25] So if you ever are asked about AI and AGI, sometimes you might find drawing this picture  
[00:02:32] useful for explaining some of the things going on in AI as well, and some of the sources  
[00:02:37] of unnecessary hype about AGI.  
[00:02:42] And with the rise of modern deep learning, we started to simulate neurons, and with faster  
[00:02:49] computers and even GPUs, we could simulate even more neurons.  
[00:02:54] So I think there was this vague hope many years ago that, boy, if only we could simulate  
[00:02:59] a lot of neurons, then we could simulate the human brain or something like a human brain  
[00:03:04] that were really intelligent systems, right?  
[00:03:06] Sadly, it's turned out not to be quite as simple as that.  
[00:03:12] I think two reasons for this is, first, if you look at the artificial neural networks  
[00:03:19] we're building, they are so simple that a logistic regression unit is really nothing  
[00:03:24] like what any biological neuron is doing.  
[00:03:27] It's so much simpler than what any neuron in your brain or mine is doing.  
[00:03:32] And second, even to this day, I think we have almost no idea how the brain works.  
[00:03:38] There's no fundamental questions about how exactly does a neuron map from inputs to outputs  
[00:03:43] that we just don't know today.  
[00:03:45] So trying to simulate that in a computer, much less a single logistic function, is just  
[00:03:51] so far from an accurate model of what the human brain actually does.  
[00:03:56] Given our very limited understanding, both now and probably for the near future, of how  
[00:04:03] the human brain works, I think just trying to simulate the human brain as a path to AGI  
[00:04:09] will be an incredibly difficult path.  
[00:04:13] Having said that, is there any hope of, within our lifetimes, seeing breakthroughs in AGI?  
[00:04:20] Let me share with you some evidence that helps me keep that hope alive, at least for myself.  
[00:04:28] There have been some fascinating experiments done on animals that show or strongly suggest  
[00:04:35] that the same piece of biological brain tissue can do a surprisingly wide range of tasks.  
[00:04:43] And this has led to the one learning algorithm hypothesis that maybe a lot of intelligence  
[00:04:49] could be due to one or a small handful of learning algorithms.  
[00:04:52] And if only we could figure out what that one or small handful of algorithms are, we  
[00:04:57] may be able to implement that in a computer someday.  
[00:05:01] Let me share with you some details of those experiments.  
[00:05:05] This is a result due to Ro et al. from many decades ago.  
[00:05:10] The part of your brain shown here is your auditory cortex, and your brain is wired to  
[00:05:16] feed signals from your ears in the form of electrical impulses depending on what sound  
[00:05:22] your ear is detecting to that auditory cortex.  
[00:05:26] It turns out that if you were to rewire an animal brain to cut the wire between the ear  
[00:05:33] and the auditory cortex, and instead feed in images to the auditory cortex, then the  
[00:05:39] auditory cortex learns to see.  
[00:05:42] Auditory refers to sound, and so this piece of the brain that most people learn to hear,  
[00:05:48] when it is fed different data, it instead learns to see.  
[00:05:52] Here's another example.  
[00:05:54] This part of your brain is your somatosensory cortex.  
[00:05:58] Somatosensory refers to touch processing.  
[00:06:01] If you were to similarly rewire the brain to cut the connection from the touch sensors  
[00:06:06] to that part of the brain, and instead rewire the brain to feed in images, then the somatosensory  
[00:06:12] cortex learns to see.  
[00:06:14] So there's been a sequence of experiments like this showing that many different parts  
[00:06:19] of the brain, just depending on what data it is given, can learn to see, or learn to  
[00:06:24] feel, or learn to hear, as if there was one, maybe one algorithm that just depending on  
[00:06:31] what data it is given, learns to process that input accordingly.  
[00:06:36] There have been systems built which take a camera, maybe mounted to someone's forehead,  
[00:06:42] and maps it to a pattern of voltages in a grid on someone's tongue.  
[00:06:48] And by mapping a grayscale image to a pattern of voltages on your tongue, this can help  
[00:06:54] people that are not sighted, blind individuals, learn to see with your tongue.  
[00:07:01] Or there have been fascinating experiments with human echolocation, or human sonar.  
[00:07:07] So animals like dolphins and bats use sonar to see, and researchers have found that if  
[00:07:14] you train humans to make clicking sounds, and listen to how that bounces off surroundings,  
[00:07:22] humans can sometimes learn some degree of human echolocation.  
[00:07:28] Or this is a haptic belt, and my research lab at Stanford once built something like  
[00:07:34] this before as well, but if you mount a ring of buzzers around your waist, and program  
[00:07:41] it using a magnetic compass, so that say the buzzers to the northmost direction are always  
[00:07:47] vibrating slightly, then you somehow gain a direction sense, which some animals have  
[00:07:53] but humans don't.  
[00:07:54] Then it just feels like you're walking around and you just know where north is.  
[00:07:58] It doesn't feel like, oh, that part of my waist is buzzing, it feels like, oh, I know  
[00:08:02] where that north is.  
[00:08:04] Or surgery to implant a third eye onto a frog, and the brain just learns to deal with this  
[00:08:10] input.  
[00:08:11] There have been a variety of experiments like these, showing that the human brain is amazingly  
[00:08:17] adaptable.  
[00:08:18] Neuroscientists say it's amazingly plastic, that just means adaptable, to deal with a  
[00:08:23] bewildering range of sensory inputs.  
[00:08:26] And so the question is, if the same piece of brain tissue can learn to see, or touch,  
[00:08:32] or feel, or even other things, what is the algorithm it uses?  
[00:08:36] And can we replicate this algorithm and implement it in a computer?  
[00:08:40] I do feel bad for the frog and other animals on which these experiments were done, although  
[00:08:46] I think the conclusions are also quite fascinating.  
[00:08:50] So even to this day, I think working on AGI is one of the most fascinating science and  
[00:08:56] engineering problems of all time, and maybe you will choose someday to do research on  
[00:09:01] it.  
[00:09:02] However, I think it's important to avoid overhyping.  
[00:09:07] I don't know if the brain is really one or a small handful of algorithms, and even if  
[00:09:12] it were, I have no idea, and I don't think anyone knows what the algorithm is.  
[00:09:17] But I still hold this hope alive, and maybe it is, and maybe we could, through a lot of  
[00:09:23] hard work, someday discover an approximation to it.  
[00:09:28] I still find this one of the most fascinating topics, and I still often idly think about  
[00:09:33] it in my spare time.  
[00:09:35] And maybe someday you will be the one to make a contribution to this problem.  
[00:09:41] So in the short term, I think even without pursuing AGI, machine learning and neural  
[00:09:47] networks are a very powerful tool, and even without trying to go all the way to build  
[00:09:53] human-level intelligence, I think you find neural networks to be an incredibly powerful  
[00:09:59] and useful set of tools for applications that you might build.  
[00:10:04] And so that's it for the required videos of this week.  
[00:10:08] Congratulations on getting to this point in the lessons.  
[00:10:12] After this, we'll also have a few optional videos to dive a little bit more deeply into  
[00:10:17] efficient implementations of neural networks.  
[00:10:21] And in particular, in the optional videos to come, I'd like to share with you some details  
[00:10:26] of how to implement vectorized implementations of neural networks.  
[00:10:30] So I hope you also take a look at those videos.
