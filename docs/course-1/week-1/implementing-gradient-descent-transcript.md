# Implementing Gradient Descent — Transcript

> Machine-generated (Whisper `distil-large-v3`). Timestamps are approximate and it may contain errors — trust the audio.

[← Back to the notes](implementing-gradient-descent.md)

---

[00:00:04] Let's take a look at how you can actually implement the gradient descent algorithm.  
[00:00:09] Let me write down the gradient descent algorithm.  
[00:00:13] Here is.  
[00:00:15] On each step, W, the parameter, is updated to the old value of W minus alpha times this term  
[00:00:25] D over DW of the cost function J of WB.  
[00:00:30] So what this expression is saying is update your parameter  
[00:00:34] by taking the current value of W and adjusting it a small amount,  
[00:00:40] which is this expression on the right, minus alpha times this term over here.  
[00:00:46] Okay?  
[00:00:47] So if you feel like there's a lot going on in this equation, it's okay,  
[00:00:53] don't worry about it.  
[00:00:55] We'll unpack it together.  
[00:00:57] First, this equal notation here.  
[00:01:00] Notice I said we're assigning W a value using this equal sign.  
[00:01:05] So in this context, this equal sign is the assignment operator.  
[00:01:10] Specifically, in this context, if you write code that says A equals C,  
[00:01:17] it means take the value of C and store it in your computer in the variable A.  
[00:01:23] Or if you write A equals A plus 1, it means set the value of A to be equal to A plus 1,  
[00:01:29] or increment the value of A by 1.  
[00:01:33] So the assignment operator in coding,  
[00:01:36] is different than truth assertions in mathematics,  
[00:01:41] where if I write A equals C, I'm asserting, that is, I am claiming,  
[00:01:46] that the values of A and C are equal to each other.  
[00:01:50] And hopefully, I will never write a truth assertion A equals A plus 1,  
[00:01:54] because, you know, that just can't possibly be true.  
[00:01:57] So in Python and in other programming languages,  
[00:02:00] truth assertions are sometimes written as equals equals,  
[00:02:05] so you may see code.  
[00:02:06] that says A equals equals C if you're testing whether A is equal to C.  
[00:02:12] But in math notation, as we conventionally use it,  
[00:02:15] like in these videos, the equal sign can be used for either assignment  
[00:02:20] or for truth assertion.  
[00:02:22] And so I try to make sure it's clear when I write an equal sign,  
[00:02:26] whether we're assigning a value to a variable,  
[00:02:28] or whether we're asserting the truth of the equality of two values.  
[00:02:35] Now, let's dive more deeply in different.  
[00:02:37] to what the symbols in this equation means.  
[00:02:39] The symbol here is the Greek alphabet alpha,  
[00:02:44] and in this equation, alpha is also called the learning rate.  
[00:02:50] The learning rate is usually a small positive number between 0 and 1,  
[00:02:55] and it might be, say, 0.01.  
[00:02:58] What alpha does is, it basically controls how big of a step you take downhill.  
[00:03:05] So if alpha is very large,  
[00:03:07] large, then that corresponds to a very aggressive grade and descent procedure where you're trying to take huge steps downhill.  
[00:03:15] And if alpha is very small, then you'll be taking small baby steps downhill.  
[00:03:20] We'll come back later to delve more deeply into how to choose a good learning rate alpha.  
[00:03:26] And finally, this term here, that's the derivative term of the cost function J.  
[00:03:32] Let's not worry about the details of this derivative right now, but later on.  
[00:03:36] but later on, you get to see more about the derivative term.  
[00:03:40] But for now, you can think of this derivative term that I drew a magenta box around,  
[00:03:45] as telling you in which direction you want to take your baby step,  
[00:03:49] and in combination with the learning rate alpha,  
[00:03:52] it also determines the size of the steps you want to take downhill.  
[00:03:56] Now, I do want to mention that derivatives come from calculus,  
[00:04:02] and even if you aren't familiar with calculus, don't worry about it.  
[00:04:06] Even without knowing any calculus, you'll be able to figure out all you need to know about this  
[00:04:11] different term in this video and the next.  
[00:04:14] One more thing.  
[00:04:16] Remember your model has two parameters, not just W, but also B.  
[00:04:21] So you also have an assignment operation to update the parameter B that looks very similar.  
[00:04:28] B is assigned the O value of B minus the learning rate alpha times this  
[00:04:36] slightly different derivative term D over D of J of WB.  
[00:04:42] So remember in the graph of the surface plot,  
[00:04:46] where you're taking baby steps until you get to the bottom of the valley?  
[00:04:50] Well, for the gradient descent algorithm,  
[00:04:52] you're going to repeat these two update steps until the algorithm converges.  
[00:04:57] And by converges, I mean that you reach the point at a local minimum  
[00:05:02] where the parameters W and B no longer change much.  
[00:05:06] with each additional step that you take.  
[00:05:10] Now, there's one more subtle detail about how to correctly implement gradient descent.  
[00:05:16] You're going to update two parameters, W and B, right?  
[00:05:20] So this update takes place for both parameters, W and B.  
[00:05:25] One important detail is that for gradient descent,  
[00:05:30] you want to simultaneously update W and B, meaning you want to update both parameters  
[00:05:37] at the same time.  
[00:05:39] What I mean by that is that in this expression,  
[00:05:42] you're going to update W from the old W to a new W,  
[00:05:46] and you're also updating B from his old value to a new value of B.  
[00:05:53] And the way to implement this is to compute the right side,  
[00:05:58] computing this thing for W and B,  
[00:06:02] and simultaneously at the same time, update W and B,  
[00:06:07] and B to the new values.  
[00:06:10] So let's take a look at what this means.  
[00:06:14] Here's the correct way to implement gradient descent,  
[00:06:17] which does a simultaneous update.  
[00:06:20] This sets a variable temp W equal to that expression,  
[00:06:24] which is w minus that term here.  
[00:06:28] Let's also set another variable, temp B to that,  
[00:06:31] which is B minus that term.  
[00:06:33] So you compute both right-hand size, both updates,  
[00:06:36] and store them in that.  
[00:06:37] into variables temp W and temp B.  
[00:06:41] Then you copy the value of temp W into W,  
[00:06:46] and you also copy the value of temp B into B.  
[00:06:50] Now, one thing you may notice is that this value of  
[00:06:55] of W is from before W gets updated.  
[00:06:59] Here, notice that the pre-update W is what goes  
[00:07:03] into the derivative term over here, okay?  
[00:07:08] In contrast,  
[00:07:09] here's an incorrect implementation of gradient descent that does not do a simultaneous update.  
[00:07:15] In this incorrect implementation, we compute temp W, same as before.  
[00:07:21] So far that's okay.  
[00:07:23] And now, here's where things start to differ.  
[00:07:26] We then update W with the value in temp W  
[00:07:30] before calculating the new value for the other parameter B.  
[00:07:34] Next, we calculate temp B as B minus that term here.  
[00:07:40] and finally, we update B with the value in Temp B.  
[00:07:45] The difference between the right-hand side and the left-hand side implementations  
[00:07:49] is that if you look over here,  
[00:07:51] this W has already been updated to this new value,  
[00:07:55] and it's this updated W that actually goes into the cost function J of WB.  
[00:08:02] It means that this term here on the right is not the same  
[00:08:06] as this term over here that you see on the left.  
[00:08:09] on the left. And that also means this temp B term on the right is not quite the same  
[00:08:17] as the temp B term on the left, and thus this updated value for B on the right is not the same  
[00:08:24] as this updated value for variable B on the left.  
[00:08:29] The way that gradient descent is implemented in code, it actually turns out to be more natural  
[00:08:34] to implemented the correct way with simultaneous updates.  
[00:08:38] updates. When you hear someone talk about gradient descent,  
[00:08:42] they always mean the gradient descent where you perform a simultaneous update of the parameters.  
[00:08:47] If, however, you were to implement non-simultaneous update,  
[00:08:52] it turns out it will probably work more or less anyway,  
[00:08:56] but doing it this way isn't really the correct way to implement it.  
[00:09:00] It's actually some other algorithm with different properties.  
[00:09:03] So I would advise you to just stick to the correct simultaneous update,  
[00:09:07] update and not use this incorrect version on the right.  
[00:09:13] So that's gradient descent.  
[00:09:15] In the next video, we'll go into details of the derivative term, which you saw in this video,  
[00:09:20] but that we didn't really talk about in detail.  
[00:09:23] Derivatives are a part of calculus.  
[00:09:25] And again, if you're not familiar with calculus, don't worry about it.  
[00:09:29] You won't need to know calculus at all in order to complete this course or this specialization,  
[00:09:34] and you'll have all the information you need in order to implement  
[00:09:38] gradient descent.  
[00:09:39] Coming up in the next video, we'll go over derivatives together,  
[00:09:43] and you come away with the intuition and knowledge you need  
[00:09:47] to be able to implement and apply gradient descent yourself.  
[00:09:51] I think that would be an exciting thing for you to know how to implement.  
[00:09:55] So let's go on to the next video to see how to do that.
