# Week 3 — Test Yourself

Answer, then hit **Validate** for instant feedback. (Questions shuffle on retry.)

{{ multi_qcm(
    [
        "What is the defining idea of reinforcement learning vs. supervised learning?",
        [
            "You give it labeled (x, y) pairs for every state",
            "You specify a REWARD function (what you want), not the right action (how to do it); the algorithm figures out which actions earn the most reward",
            "It only works on images",
            "It needs no data at all",
        ],
        [2],
        "RL avoids needing the ideal action y for every state (often ambiguous). You instead say when behavior is good/bad via rewards — 'good dog, bad dog' — and the algorithm learns to maximize reward.",
    ],
    [
        "In an MDP, what are the four things an RL algorithm looks at each step, and what is R(s)?",
        [
            "Only the state and action; R(s) is the next state",
            "(state s, action a, reward R(s), next state s′); R(s) is the reward of the CURRENT state you're leaving, not the next one",
            "Just the reward; R(s) is the policy",
            "The weights, biases, gradient, and loss",
        ],
        [2],
        "The core tuple is (s, a, R(s), s′). The reward R(s) is associated with the current state — e.g. leaving state 4 gives R(4)=0; the 100 only arrives when you're in state 1.",
    ],
    [
        "What is the RETURN, and what does the discount factor γ do?",
        [
            "The sum of states visited; γ counts them",
            "Return = R₁ + γR₂ + γ²R₃ + … ; γ (<1) discounts later rewards, making the agent prefer rewards SOONER (and pushing negative rewards into the future)",
            "The number of actions; γ is the learning rate",
            "The average reward; γ has no effect",
        ],
        [2],
        "The return weights each reward by γ raised to its time step, so earlier rewards count more. Common γ values are 0.9–0.999; in finance γ is the time-value-of-money interest rate.",
    ],
    [
        "What is a policy π, and what is the goal of RL?",
        [
            "π is the reward; the goal is to minimize it",
            "π(s) = a maps each state to an action; the goal is to find the π that MAXIMIZES the (expected) return",
            "π is the discount factor; the goal is to set it to 1",
            "π is the neural network's loss function",
        ],
        [2],
        "A policy is a function from states to actions. RL searches for the policy that maximizes return — Ng notes 'controller' might describe π better, but 'policy' is the standard term.",
    ],
    [
        "What does 'Markov' mean in Markov Decision Process?",
        [
            "The rewards must be positive",
            "The future depends only on the CURRENT state, not on how you got there",
            "There are exactly six states",
            "The actions are chosen randomly",
        ],
        [2],
        "The Markov property: given the present state, the future is independent of the past. The whole states/actions/rewards/policy formalism is called an MDP.",
    ],
    [
        "How is the state-action value function Q(s, a) defined?",
        [
            "The reward of state s",
            "The return if you start in s, take action a ONCE, then behave OPTIMALLY afterward",
            "The number of times you visit s",
            "The probability of action a",
        ],
        [2],
        "Q(s,a) is the return from taking a in s and then acting optimally. It's faithfully reported even for bad actions — and the definition is slightly circular, resolved later by the Bellman-based algorithm.",
    ],
    [
        "Once you can compute Q(s, a), how do you get the optimal policy and best return?",
        [
            "best return = min over a of Q(s,a); π(s) = that action",
            "best return = max over a of Q(s,a); the optimal action is π(s) = argmax over a of Q(s,a)",
            "Average Q over all actions",
            "Pick a random action",
        ],
        [2],
        "The highest achievable return from s is max_a Q(s,a), and the best action is the one achieving it. So computing Q hands you the optimal policy directly.",
    ],
    [
        "State the Bellman equation and the meaning of its two parts.",
        [
            "Q(s,a) = R(s) × γ × Q(s′,a′)",
            "Q(s,a) = R(s) + γ·max over a′ of Q(s′,a′): the immediate reward now, plus γ times the best return from the next state s′",
            "Q(s,a) = max over a of R(s)",
            "Q(s,a) = R(s) − γ·Q(s′,a′)",
        ],
        [2],
        "Bellman splits the total return into the immediate reward R(s) and the discounted optimal future value from s′. In a terminal state the second term vanishes, so Q(s,a)=R(s).",
    ],
    [
        "In a STOCHASTIC environment, what does RL maximize and how does Bellman change?",
        [
            "It maximizes the single return; Bellman is unchanged",
            "It maximizes the EXPECTED (average) return; Bellman gains an expectation: Q(s,a) = R(s) + γ·E[max over a′ of Q(s′,a′)]",
            "It minimizes the variance only",
            "It ignores rewards entirely",
        ],
        [2],
        "Since the next state s′ is now random, the return is random — so you maximize its average (expected return), and Bellman averages over the random s′. More randomness lowers the Q values.",
    ],
    [
        "What is a continuous state space, with the lunar lander as example?",
        [
            "A state that is one of a few discrete labels",
            "The state is a VECTOR of real numbers — for the lander: x, y, ẋ, ẏ, θ, θ̇, and two binary leg-contact flags l, r (8 numbers)",
            "Only the x-position",
            "The set of possible rewards",
        ],
        [2],
        "Unlike the 6-state Mars rover, continuous-state problems use a real-valued vector. The lander's 8-number state includes position, velocities, tilt + tilt rate, and left/right leg-grounded flags.",
    ],
    [
        "In the DQN algorithm, how is the supervised training set (x, y) built from experience?",
        [
            "x = reward, y = state",
            "From tuples (s, a, R(s), s′): x = (s, a) and the target y = R(s) + γ·max over a′ of Q(s′,a′), where Q is the current (initially random) network",
            "x and y are both random noise",
            "y is the action that was taken",
        ],
        [2],
        "Each stored tuple yields one example: the first two entries form x=(s,a); the Bellman right-hand side gives the target y. The network is trained with MSE to predict y, and Q←Q_new each round.",
    ],
    [
        "What is the replay buffer, and why use the IMPROVED network architecture?",
        [
            "The buffer stores the weights; the architecture removes hidden layers",
            "The replay buffer stores the ~10,000 most recent tuples (caps memory); the improved net inputs only the state and outputs all 4 Q values at once, so one inference picks the best action",
            "The buffer holds the rewards only; the architecture adds more outputs for no reason",
            "Both are purely cosmetic",
        ],
        [2],
        "Storing recent tuples bounds memory. The old net needed 4 inferences per state (one per action); outputting Q for all 4 actions from the state needs just one forward pass — also speeding the Bellman max.",
    ],
    [
        "What is an ε-greedy policy and why explore?",
        [
            "Always take the greedy action argmax Q",
            "With probability 1−ε take the greedy action argmax Q, but with probability ε take a RANDOM action — so the agent can discover good actions its current (maybe wrong) Q estimate would never try",
            "Always take a random action",
            "Pick the action with the smallest Q",
        ],
        [2],
        "Pure greedy can get stuck if a good action was wrongly initialized as low-value. Occasional random exploration fixes this. Often ε starts high (even 1.0) and decays toward ~0.01.",
    ],
    [
        "What problem does mini-batch gradient descent solve?",
        [
            "It makes the model more accurate per step",
            "With a huge training set, averaging over ALL examples per step is slow; using a small subset (e.g. 1000) per step is noisier but far cheaper, trending toward the minimum on average",
            "It removes the need for a learning rate",
            "It only applies to reinforcement learning",
        ],
        [2],
        "Each full-batch step scans the entire dataset (e.g. 100M examples). Mini-batch uses a rotating subset, so each step is much cheaper — noisier path, much faster overall. It helps supervised learning too.",
    ],
    [
        "What is a SOFT UPDATE and why use it?",
        [
            "Set Q = Q_new exactly each step",
            "Blend the parameters: W ← 0.01·W_new + 0.99·W (and likewise B), accepting only a little of the new network each time — this prevents one unlucky Q_new from wiping out a good Q and makes RL converge more reliably",
            "Multiply all weights by 0.5",
            "Delete the replay buffer each step",
        ],
        [2],
        "Overwriting Q with a possibly-worse Q_new can destabilize learning. A soft (Polyak) update moves the parameters only slightly toward Q_new, reducing oscillation/divergence.",
    ],
    [
        "What is Ng's honest assessment of the state of reinforcement learning?",
        [
            "It has replaced supervised learning in most applications",
            "It's over-hyped: much easier in simulation than on real robots, has far fewer practical applications than supervised/unsupervised learning today — but remains a major pillar with large future potential",
            "It never works at all",
            "It requires no tuning and always converges",
        ],
        [2],
        "RL results are mostly in simulation and transfer poorly to real hardware; for most projects supervised/unsupervised learning is the right tool. Still, RL is a core ML pillar with active, promising research.",
    ],
    multi = False,
    qcm_title = "Course 3 · Week 3 check — reinforcement learning (MDPs, Q-learning, DQN)",
    shuffle = True,
) }}
