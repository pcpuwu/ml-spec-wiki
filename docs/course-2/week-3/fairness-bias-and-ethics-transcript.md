# Fairness, Bias, and Ethics — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](fairness-bias-and-ethics.md)

---

[00:00:02] Machine learning algorithms today are affecting billions of people.  
[00:00:06] You've heard me mention ethics in other videos before, and I hope that if you're building a machine learning system that affects people,  
[00:00:14] that you give some thought to making sure that your system is reasonably fair, reasonably free from bias,  
[00:00:21] and that you're taking an ethical approach to your application.  
[00:00:26] Let's take a look at some issues related to fairness, bias, and ethics.  
[00:00:32] Unfortunately, in the history of machine learning, there have been a few systems, some widely publicized,  
[00:00:38] that turned out to exhibit a completely unacceptable level of bias.  
[00:00:43] For example, there was a hiring tool that was once shown to discriminate against women.  
[00:00:49] The company that built the system stopped using it, but one wishes that the system had never been rolled out in the first place.  
[00:00:58] Well, there was also a well-documented example of face recognition systems that matched dark-skinned individuals to criminal mugshots  
[00:01:06] much more often than lighter-skinned individuals.  
[00:01:09] Clearly, this is not acceptable, and we should get better at the community at just not building and deploying systems with a problem like this in the first place.  
[00:01:19] There have been systems that gave bank loan approvals in a way that was biased and discriminated against subgroups,  
[00:01:26] and we also really like learning algorithms to not have the toxic effect of reinforcing negative stereotypes.  
[00:01:34] For example, I have a daughter, and if she searches online for certain professions and doesn't see anyone that looks like her,  
[00:01:41] I would hate for that to discourage her from taking on certain professions.  
[00:01:46] In addition to the issues of bias and fair treatment of individuals,  
[00:01:52] there have also been adverse use cases or negative use cases of machine learning algorithms.  
[00:01:59] For example, there was this widely cited and widely viewed video released with full disclosure and full transparency  
[00:02:07] by the company BuzzFeed of a deepfake of former U.S. President Barack Obama.  
[00:02:14] You can actually find and watch the whole video online if you want,  
[00:02:18] but the company that created this video did so with full transparency and full disclosure,  
[00:02:24] but clearly using this technology to generate fake videos without consent and without disclosure would be unethical.  
[00:02:34] We've also seen, unfortunately, social media sometimes spreading toxic or incendiary speech  
[00:02:41] because optimizing for user engagement has led to algorithms doing so.  
[00:02:47] There have been bots that were used to generate fake content for either commercial purposes,  
[00:02:54] such as posting fake comments on products, or for political purposes.  
[00:03:00] And there are users of machine learning to build harmful products, commit fraud, and so on.  
[00:03:07] And in parts of the machine learning world, just as in email,  
[00:03:11] there has been a battle between the spammers and the anti-spam community.  
[00:03:16] I am seeing today in, for example, the financial industry,  
[00:03:22] a battle between people trying to commit fraud and the people fighting fraud.  
[00:03:28] And unfortunately, machine learning is used by some of the fraudsters and some of the spammers.  
[00:03:35] So for goodness sakes, please don't build a machine learning system that has a negative impact on society.  
[00:03:42] And if you are asked to work on an application that you consider unethical, I urge you to walk away.  
[00:03:51] For what it's worth, there have been multiple times that I have looked at a project that seemed to be financially sound.  
[00:03:57] You know, make money for some company, but I have killed the project just on ethical grounds  
[00:04:02] because I think that even though the financial case was sound, I felt that it makes the world worse off.  
[00:04:07] And I just don't ever want to be involved in a project like that.  
[00:04:11] Ethics is a very complicated and very rich subject that humanity has studied for at least a few thousand years.  
[00:04:18] When AI became more widespread, I actually went and read up multiple books on philosophy and multiple books on ethics  
[00:04:27] because I was hoping, naively it turned out, to come up with, if only there's a checklist of five things we could do  
[00:04:34] and so lastly do these five things, then we can be ethical.  
[00:04:37] But I failed and I don't think anyone has ever managed to come up with a simple checklist of things to do  
[00:04:43] to give that level of concrete guidance about how to be ethical.  
[00:04:47] So what I hope to share with you instead is not a checklist because I wasn't able to come up with one,  
[00:04:54] but just some general guidance and some suggestions for how to make sure that our work is less biased, more fair, and more ethical.  
[00:05:02] And I hope that some of these guidance, which would be relatively general, will help you with your work as well.  
[00:05:08] So here are some suggestions for making your work more fair, less biased, and more ethical.  
[00:05:16] Before deploying a system that could create harm, I will usually try to assemble a diverse team  
[00:05:25] to brainstorm possible things that might go wrong with an emphasis on possible harm to vulnerable groups.  
[00:05:32] I found many times in my life that having a more diverse team, and by diverse I mean diversity on multiple dimensions  
[00:05:40] ranging from gender to ethnicity to culture to many other traits.  
[00:05:46] I found that having more diverse teams actually causes the team collectively to be better at coming up with ideas about things that might go wrong.  
[00:05:55] And it increases the odds that we'll recognize a problem and fix it before rolling out the system and having that cause harm to some particular group.  
[00:06:06] In addition to having a diverse team carry out brainstorming, I have also found it useful to carry out a literature search on any standards or guidelines for your industry or particular application area.  
[00:06:19] For example, in the financial industry, there are starting to be established standards for what it means to be a system, say one that decides who to approve loans to,  
[00:06:30] what it means for a system like that to be reasonably fair and free from bias, and those standards that are still emerging in different sectors could inform your work depending on what you're working on.  
[00:06:41] After identifying possible problems, I found it useful to then audit the system against these identified dimensions of possible harm prior to deployment.  
[00:06:55] You saw in the last video the full cycle of a machine learning project.  
[00:07:00] And one key step that's often a crucial line of defense against deploying something problematic is after you've trained the model, but before you deploy it in production,  
[00:07:10] if the team has brainstormed that it may be biased against certain subgroups, such as certain genders or certain ethnicities,  
[00:07:17] you can then audit the system to measure the performance to see if it really is biased against certain genders or ethnicities or other subgroups and to make sure that any problems are identified and fixed prior to deployment.  
[00:07:33] Finally, I found it useful to develop a mitigation plan if applicable, and one simple mitigation plan would be a rollback to the earlier system that we knew was reasonably fair.  
[00:07:46] And then even after deployment, to continue to monitor harm so that you can then trigger a mitigation plan and act quickly in case there is a problem that needs to be addressed.  
[00:07:57] For example, all of the good self-driving car teams prior to rolling out self-driving cars on the road had developed mitigation plans for what to do in case the car ever gets involved in an accident,  
[00:08:10] so that if the car was ever in an accident, there was already a mitigation plan that they could execute immediately rather than have a car get into an accident and then only scramble after the fact to figure out what to do.  
[00:08:22] I've worked on many machine learning systems, and let me tell you, the issues of ethics, fairness, and bias are issues we should take seriously. It's not something to brush off. It's not something to take lightly.  
[00:08:34] Now, of course, there are some projects with more serious ethical implications than others.  
[00:08:40] For example, if I'm building a neural network to decide how long to roast my coffee beans, clearly the ethical implications of that seem significantly less than if, say, you are building a system to decide what bank loans to approve, which, if it's biased, can cause significant harm.  
[00:08:57] But I hope that all of us collectively working in machine learning can keep on getting better, debate these issues, spot problems, fix them before they cause harm so that we collectively can avoid some of the mistakes that the machine learning world had made before, because this stuff matters, and the systems we build can affect a lot of people.  
[00:09:19] And so that's it on the process of developing a machine learning system, and congratulations on getting to the end of this week's required videos.  
[00:09:30] I have just two more optional videos this week for you on addressing skewed datasets, and that means datasets where the ratio of positive to negative examples is very far from 50-50, and it turns out that some special techniques are needed to address machine learning applications like that.  
[00:09:48] So I hope to see you in the next video, optional video, on how to handle skewed datasets.
