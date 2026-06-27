# Unsupervised Learning, Part 1 — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](unsupervised-learning-part-1.md)

---

[00:00:02] After supervised learning, the most widely used form of machine learning is unsupervised learning.  
[00:00:08] Let's take a look at what that means.  
[00:00:10] We've talked about supervised learning, and this video is about unsupervised learning.  
[00:00:16] But don't let the name unsupervised fool you.  
[00:00:19] Unsupervised learning is, I think, just as super as supervised learning.  
[00:00:24] When we're looking at supervised learning in the last video,  
[00:00:27] recall that looks something like this.  
[00:00:30] In the case of a classification problem, each example was associated with an output label Y, such as benign or malignant, designated by the O's and crosses.  
[00:00:41] In unsupervised learning, we're given data that isn't associated with any output labels why.  
[00:00:49] Say you're given data on patients and their tumor size and the patient's age,  
[00:00:55] but not whether the tumor was benign or malignant.  
[00:00:59] So the dataset looks like this on the right.  
[00:01:03] We're not asked to diagnose whether the tumor is benign or malignant because we're not given any  
[00:01:11] labels why in the dataset.  
[00:01:13] Instead, our job is to find some structure or some pattern or just find something interesting  
[00:01:19] in the data.  
[00:01:21] This is unsupervised learning.  
[00:01:23] We call it unsupervised because we're not trying to supervise the algorithm to give  
[00:01:28] some quote, right,  
[00:01:29] for every input.  
[00:01:31] Instead, we ask the algorithm to figure out all by itself,  
[00:01:35] what's interesting, or what patterns or structures there might be in this data.  
[00:01:40] With this particular data,  
[00:01:43] an unsupervised learning algorithm might decide that the data can be assigned  
[00:01:47] to two different groups or two different clusters.  
[00:01:51] And so it might decide that there's one cluster or group over here,  
[00:01:58] and there's another cluster  
[00:02:00] or group over here.  
[00:02:02] This is a particular type of unsupervised learning called a clustering algorithm  
[00:02:08] because it places the unlabeled data into different clusters,  
[00:02:13] and this turns out to be used in many applications.  
[00:02:16] For example, clustering is used in Google News.  
[00:02:22] What Google News does is, every day, it goes and looks at hundreds of thousands of news  
[00:02:27] articles on the internet and groups-related stories together.  
[00:02:32] For example, here's a sample from Google News, where the headline of the top article is,  
[00:02:37] Giant Panda gives birth to rare twin cubs at Japan's older zoo.  
[00:02:42] This article had actually caught my eye because my daughter loves pandas, and so there are a lot  
[00:02:47] of stuffed panda toys and watching the panda videos in my house.  
[00:02:52] And looking at this, you might notice that below this are other related  
[00:02:57] articles.  
[00:02:58] Maybe from the headlines alone, you can start to guess what clustering might be doing.  
[00:03:04] Notice that the word panda appears here, here, here, here, and here.  
[00:03:12] And notice that the word twin also appears in all five articles,  
[00:03:19] and the word zoo also appears in all of these articles.  
[00:03:25] So the clustering algorithm is finding articles  
[00:03:28] articles, all of all the hundreds of thousands of news articles on the internet that day,  
[00:03:33] finding the articles that mentioned similar words and grouping them into clusters.  
[00:03:39] Now, what's cool is that this clustering algorithm figures out on his own which words suggest that  
[00:03:45] certain articles are in the same group.  
[00:03:47] What I mean is there isn't an employee at Google News who's telling the algorithm to find  
[00:03:52] articles that the word pander and twins and zoo to put them into the same cluster.  
[00:03:57] The news topics change every day, and there are so many news stories, it just isn't feasible  
[00:04:03] to have people doing this every single day for all the topics the news covers.  
[00:04:08] Instead, the algorithm has to figure out on his own, without supervision,  
[00:04:13] what are the clusters of news articles today.  
[00:04:17] So that's why this clustering algorithm is a type of unsupervised learning algorithm.  
[00:04:23] Let's look at a second example of unsupervised learning,  
[00:04:26] applied to clustering genetic or DNA data.  
[00:04:30] This image shows a picture of DNA microarray data.  
[00:04:35] These look like tiny grids of a spreadsheet,  
[00:04:37] and each tiny column represents the genetic or DNA activity of one person.  
[00:04:44] So, for example, this entire column here is from one person's DNA,  
[00:04:49] and this other column is of another person.  
[00:04:53] Each row represents a person's DNA.  
[00:04:55] Each row represents a person.  
[00:04:56] gene. So just as an example, perhaps this row here might represent a gene that affects eye color,  
[00:05:03] or this row here is a gene that affects how tall someone is.  
[00:05:08] Researchers have even found a genetic link to whether someone dislikes certain vegetables,  
[00:05:15] such as broccoli or Brussels or asparagus.  
[00:05:18] So next time someone asks you, why didn't you finish your salad?  
[00:05:22] You can tell them, oh, maybe it's genetic.  
[00:05:25] For DNA microarrays, the idea is to measure  
[00:05:29] how much certain genes are expressed for each individual person.  
[00:05:33] So these colors, red, green, gray, and so on,  
[00:05:37] show the degree to which different individuals do or do not have a specific gene actor.  
[00:05:43] And what you can do is then run a clustering algorithm  
[00:05:48] to group individuals into different categories or different types of people.  
[00:05:54] Like maybe these individuals are grouped together  
[00:05:56] and let's just call this type 1.  
[00:05:59] And these people are grouped into type 2,  
[00:06:04] and these people are grouped as type 3.  
[00:06:08] This is unsupervised learning because we're not telling the algorithm  
[00:06:12] in advance that there is a type 1 person with certain characteristics  
[00:06:16] or type 2 person with certain characteristics.  
[00:06:19] Instead, what we're saying is, here's a bunch of data.  
[00:06:22] I don't know what the different types of people are,  
[00:06:24] but can you automatically  
[00:06:26] find structure into data and automatically figure out what are the major types of individuals.  
[00:06:32] Since we're not giving the algorithm the right answer for the examples in advance,  
[00:06:36] this is unsupervised learning.  
[00:06:39] Here's a third example.  
[00:06:41] Many companies have huge databases of customer information.  
[00:06:45] Given this data, can you automatically group your customers into different market segments  
[00:06:51] so that you can more efficiently serve your customers.  
[00:06:55] Concretely,  
[00:06:57] The deeplearning.a.ai team did some research to better understand the deep learning.  
[00:07:01] AI community and why different individuals take these classes,  
[00:07:05] subscribe to the batch weekly newsletter, or attend our PI&AI events.  
[00:07:11] Let's visualize the deep learning.aI community as this collection of people.  
[00:07:17] Running clustering, that is market segmentation,  
[00:07:21] found a few distinct groups of individuals.  
[00:07:25] One group's primary motivation,  
[00:07:27] is seeking knowledge to grow their skills.  
[00:07:30] Perhaps this is you. And so, that's great.  
[00:07:33] A second group's primary motivation is looking for a way to develop their career.  
[00:07:38] Maybe you want to get a promotion or a new job or make some career progression.  
[00:07:42] If this describes you, that's great too.  
[00:07:45] And yet another group wants to stay updated on how AI impacts their field of work.  
[00:07:51] Perhaps this is you. That's great too. This is a clustering that our team use to try  
[00:07:57] to better serve our community as we're trying to figure out what are the major categories  
[00:08:03] of learners in the deep learning.E.I community. So if any of these is your top motivation for  
[00:08:09] learning, that's great and I hope I'll be able to help you on your journey. Or in case this is you  
[00:08:15] and you want something totally different than the other three categories, that's fine too. And I want  
[00:08:21] you to know I love you all the same. So to summarize a clustering algorithm, which is a type of  
[00:08:27] unsupervised learning algorithm takes data without labels and tries to automatically group them  
[00:08:33] into clusters. And so maybe the next time you see or think of a panda,  
[00:08:39] maybe you think of clustering as well. And besides clustering, there are other types of unsupervised learning  
[00:08:46] as well. Let's go on to the next video to take a look at some other types of unsupervised learning  
[00:08:51] algorithms.
