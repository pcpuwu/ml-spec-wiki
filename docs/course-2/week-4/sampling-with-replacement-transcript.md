# Sampling with Replacement — Transcript

> Official DeepLearning.AI lecture captions. Timestamps mark the start of each caption line.

[← Back to the notes](sampling-with-replacement.md)

---

[00:00:02] In order to build a tree ensemble, we're going to need a technique called sampling with replacement.  
[00:00:08] Let's take a look at what that means.  
[00:00:10] In order to illustrate how sampling with replacement works,  
[00:00:14] I'm going to show you a demonstration of sampling with replacement using four tokens that are colored red, yellow, green, and blue.  
[00:00:23] So I actually have here with me four tokens of colors red, yellow, green, and blue.  
[00:00:29] And I'm going to demonstrate what sampling with replacement using them looks like.  
[00:00:34] Here is a black velvet bag, empty.  
[00:00:37] And I'm going to take this example of four tokens and drop them in.  
[00:00:43] And I'm going to sample four times with replacement out of this bag.  
[00:00:47] And what that means, I'm going to shake it up.  
[00:00:49] And can't see what I'm picking.  
[00:00:51] Pick out one token.  
[00:00:52] Turns out to be green.  
[00:00:54] And the term with replacement means that before I take out the next token, I'm going to take this and put it back in.  
[00:01:01] And shake it up again.  
[00:01:02] And then take out another one.  
[00:01:04] Yellow.  
[00:01:05] Replace it.  
[00:01:06] That's the with replacement part.  
[00:01:08] And then go again.  
[00:01:10] Blue.  
[00:01:11] Replace it again.  
[00:01:12] And then pick out one more, which is blue again.  
[00:01:16] So that sequence of tokens I got was green, yellow, blue, blue.  
[00:01:21] Notice that I got blue twice and didn't get red even a single time.  
[00:01:25] If you were to repeat this sampling with replacement procedure multiple times, if you were to do it again, you might get red, yellow, red, green.  
[00:01:35] Or green, green, blue, red.  
[00:01:38] Or you might also get red, blue, yellow, green.  
[00:01:44] Notice that the with replacement part of this is critical.  
[00:01:48] Because if I were not replacing a token every time I sample, then if I were to pull out four tokens from my bag of four, I would always just get the same four tokens.  
[00:01:58] That's why replacing a token after I pull it out each time is important to make sure I don't just get the same four tokens every single time.  
[00:02:07] The way that sampling with replacement applies to building an ensemble of trees is as follows.  
[00:02:14] We are going to construct multiple random training sets that are all slightly different from our original training set.  
[00:02:22] In particular, we're going to take our ten examples of cats and dogs, and we're going to put the ten training examples in a theoretical bag.  
[00:02:33] Please don't actually put a real cat or dog in a bag. That sounds inhumane.  
[00:02:38] But you can take a training example and put it in a theoretical bag if you want.  
[00:02:42] And using this theoretical bag, we're going to create a new random training set of ten examples of the exact same size as the original data set.  
[00:02:53] And the way we'll do so is we'll reach in and pick out one random training example.  
[00:02:58] And let's say we get this training example.  
[00:03:01] Then we put it back into the bag and then again randomly pick out one training example.  
[00:03:08] And so you get that. And you pick again and again and again.  
[00:03:14] And notice now this fifth training example is identical to the second one that we had up there.  
[00:03:19] But that's fine. And you keep going and keep going.  
[00:03:22] And we get another repeated example and so on and so forth.  
[00:03:26] Until eventually you end up with ten training examples, some of which are repeats.  
[00:03:31] And you notice also that this training set does not contain all ten of the original training examples.  
[00:03:37] But that's okay. That is part of the sampling with replacement procedure.  
[00:03:41] The process of sampling with replacement lets you construct a new training set that's a little bit similar to but also pretty different from your original training set.  
[00:03:51] It turns out that this would be the key building block for building an ensemble of trees.  
[00:03:56] Let's take a look in the next video at how you could do that.
