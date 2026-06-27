# Ethical Use of Recommender Systems — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](ethical-use-of-recommender-systems.md)

---

[00:00:02] Even though recommended systems have been very profitable for some businesses,  
[00:00:06] there have been some use cases that have left people and society at large worse off.  
[00:00:13] However you use recommended systems, or for that matter, other learning algorithms,  
[00:00:18] I hope you only do things that make society at large and people better off.  
[00:00:24] Let's take a look at some of the problematic use cases of recommended systems,  
[00:00:29] as well as ameliorations to reduce harm or to increase the amount of good that they can do.  
[00:00:35] As you've seen in the last few videos, there are many ways of configuring a recommended system.  
[00:00:41] When we saw binary labels, the label Y could be, does the user engage, or do they click,  
[00:00:47] or do they explicitly like an item.  
[00:00:50] So when designing a recommended system, choices in setting the goal of the recommended system,  
[00:00:57] and a lot of choices in deciding what to recommend to users.  
[00:01:02] For example, you can decide to recommend to users movies most likely to be rated 5 stars by that user.  
[00:01:10] So that seems fine. That seems like a fine way to show users movies that they will like.  
[00:01:15] Or maybe you can recommend to the user products that they are most likely to purchase.  
[00:01:21] And that seems like a very reasonable use of a recommended system as well.  
[00:01:26] Versions of recommended systems can also be used to decide what ads to show to a user.  
[00:01:34] And one thing you could do is to recommend or really to show to the user ads that are most likely to be clicked on.  
[00:01:42] Actually, what many companies will do is try to show ads that are likely to be clicked on,  
[00:01:48] and where the advertiser had put in a high bid.  
[00:01:53] Because for many ad models, the revenue that the company collects depends on whether the ad was clicked on  
[00:02:01] and what the advertiser had bid per click.  
[00:02:05] And so while this is a profit maximizing strategy, there are also some possible negative implications of this type of advertising.  
[00:02:15] I'll give a specific example on the next slide.  
[00:02:18] One other thing that many companies do is try to recommend products that generate the largest profit.  
[00:02:26] If you go to a website and search for a product today,  
[00:02:30] there are many websites that are not showing you the most relevant product or the product that you are most likely to purchase,  
[00:02:38] but are instead trying to show you the products that will generate the largest profit for the company.  
[00:02:44] And so if a certain product is more profitable for them because they can buy it more cheaply and sell it at a higher price,  
[00:02:52] that gets ranked higher in the recommendations.  
[00:02:56] Now, many companies feel a pressure to maximize profit.  
[00:03:00] So this doesn't seem like an unreasonable thing to do.  
[00:03:04] But on the flip side, from the user perspective, when a website recommends to you a product,  
[00:03:10] sometimes it feels like it would be nice if the website was transparent with you about the criteria by which it is deciding what to show you.  
[00:03:17] Is it trying to maximize their profits or trying to show you things that are most useful to you?  
[00:03:24] On video websites or social media websites, a recommended system can also be modified to try to show you the content that leads to the maximum watch time.  
[00:03:38] So specifically, websites that earn ad revenue tend to have an incentive to keep you on the website for a long time.  
[00:03:47] And so try to maximize the time you spend on the site is one way for the site to try to get more of your time so they can show you more ads.  
[00:03:57] And recommended systems today are used to try to maximize user engagements or to maximize the amount of time that someone spends on a site for a specific app.  
[00:04:07] So whereas the first two of these seem quite innocuous, the third, fourth and fifth, they may be just fine.  
[00:04:15] They may not cause any harm at all, or they could also be problematic use cases for recommended systems.  
[00:04:22] Let's take a deeper look at some of these potentially problematic use cases.  
[00:04:28] Let me start with the advertising example.  
[00:04:32] It turns out that the advertising industry can sometimes be an amplifier of some of the most harmful businesses.  
[00:04:41] It can also be an amplifier of some of the best and the most fruitful businesses.  
[00:04:47] Let me illustrate with a good example and a bad example.  
[00:04:50] Take the travel industry.  
[00:04:52] I think in the travel industry, the way to succeed is to try to give good travel experiences to users, to really try to serve users.  
[00:05:01] Now, it turns out that if there's a really good travel company that can sell your trip to fantastic destinations and make sure you and your friends and family have a lot of fun, then a good travel business, I think, will often end up being more profitable.  
[00:05:17] And if a business is more profitable, it can then bid higher for ads.  
[00:05:23] It can afford to pay more to get users.  
[00:05:27] And because it can afford to bid higher for ads, an online advertising site will show its ads more often and drive more users to this good company.  
[00:05:37] And this is a virtuous cycle where the more users you serve well, the more profitable the business, and the more you can bid more for ads, and the more traffic you get, and so on.  
[00:05:47] And this virtuous circle will maybe even tend to help the good travel companies do even better.  
[00:05:54] So this is a good example.  
[00:05:56] Let's look at a problematic example.  
[00:05:58] The payday loan industry tends to charge extremely high interest rates, often to low-income individuals.  
[00:06:07] And one of the ways to do well in the payday loan business is to be really efficient at squeezing customers for every single dollar you can get out of them.  
[00:06:16] So if there's a payday loan company that is very good at exploiting customers, really squeezing customers for every single dollar, then that company will be more profitable.  
[00:06:27] And thus, they can bid higher for ads.  
[00:06:30] And because they can bid higher for ads, they will get more traffic sent to them, and this allows them to squeeze even more customers and exploit even more people for profit.  
[00:06:41] And this, in turn, also creates a positive feedback loop.  
[00:06:45] Also, a positive feedback loop that can cause the most exploitative, the most harmful payday loan companies to get sent more traffic.  
[00:06:55] And this seems like the opposite effect than what we think would be good for society.  
[00:07:01] I don't know that there's an easy solution to this, and these are very difficult problems that recommended systems face.  
[00:07:10] One amelioration might be to refuse to accept ads from exploitative businesses.  
[00:07:15] Of course, that's easy to say, but how do you define what is an exploitative business and what is not is a very difficult question.  
[00:07:24] But as we build recommended systems for advertising or for other things, I think these are questions that each one of us working on these technologies should ask ourselves so that we can hopefully invite open discussion and debate, get multiple opinions from multiple people, and try to come up with design choices that allows our systems to try to do much more good than potential harm.  
[00:07:50] Let's look at some of the examples.  
[00:07:52] It's been widely reported in news that maximizing user engagement, such as the amount of time that someone watches videos on a website or the amount of time someone spends on social media, this has led to large social media and video sharing sites to amplify conspiracy theories or hate and toxicity.  
[00:08:12] Because conspiracy theories and certain types of hate and toxic content is highly engaging and causes people to spend a lot of time on it, even if the effect of amplifying conspiracy theories or amplifying hate and toxicity turns out to be harmful to individuals and to society at large.  
[00:08:32] One amelioration for this, partial and imperfect, is to try to filter out problematic content, such as hate speech, fraud, scams, maybe certain types of violent content.  
[00:08:43] Again, the definitions of what exactly we should filter out is surprisingly tricky to develop, and this is a set of problems that I think companies and individuals and even governments have to continue to wrestle with.  
[00:08:59] Just one last example.  
[00:09:01] When a user goes to many apps or websites, I think users think the app or website are trying to recommend to the user things that they will like.  
[00:09:12] And I think many users don't realize that many apps and websites are trying to maximize their profit rather than necessarily the user's enjoyment of the media items that are being recommended.  
[00:09:25] I would encourage you and other companies, if at all possible, to be transparent with users about the criteria by which you are deciding what to recommend to them.  
[00:09:34] I know this isn't always easy, but ultimately I hope that being more transparent with users about what we're showing them and why will increase trust and also cause our systems to do more good for society.  
[00:09:50] Recommended systems are a very powerful technology, a very profitable, a very lucrative technology, and there are also some problematic use cases.  
[00:09:59] If you are building one of these systems using recommended technology or really any other machine learning or other technology, I hope you think through not just the benefits you can create, but also the possible harm and invite diverse perspectives and discuss and debate.  
[00:10:16] And please only build things and do things that you really believe can leave society better off.  
[00:10:24] I hope that collectively, all of us in AI can only do work that makes people better off.  
[00:10:31] Thanks for listening, and we have just one more video to go in recommended systems in which we'll take a look at some practical tips for how to implement a content-based filtering algorithm in TensorFlow.  
[00:10:44] So let's go on to that last video on recommended systems.
