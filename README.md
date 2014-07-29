### NetSense - 
#### Your personal data assistant (for companies and curious minds)

Turn the cacophonous hum of the internet into a symphony of action. NetSense can listen in to online discussionsc for you, transform them into relevant information, and help make the right strategic decisions.  Whether you want real-time data or real-world responses, NetSense has you covered.

The information age has turned into an information flood. Computers started as a way to process information quicker, but with the advent of social media they have become information multipliers. We may personally be able to deal with a Twitter feed, a Facebook page, or an email inbox, but now companies are expected to process and respond to all of these and more 24/7.  Without assistance, having extensive awareness is impossible!

Enter NetSense.

NetSense is an online platform for keeping track of online discussions, allowing you to glean what’s useful for you, understand overall sentiment, and perform actions automatically based on triggers you define. An information dashboard provides you with an overview of a topic you’re interested in, while behind-the-scenes tasks can be triggered off of analysis of this data. You can automate notifications, event scheduling, and answering simple questions, leaving you with more time to act on higher-level information such as how customers feel about your product overall.

“NetSense acts as your informational triage, automating certain tasks to allow you to focus on where you add the most value.”  --Andrew Krause, Co-founder

### About the authors
Netsense was designed and developed by Drew Cuthbertson, Ash Hoover, Andrew Krause, and Nick Wei (all equal contributors)

###Contributors Guide

0. This project follows a strict Git Flow workflow.  Learn more [here](http://nvie.com/posts/a-successful-git-branching-model/).

1. Clone local repo of Panoptico/NetSense to contribute
2. Create a new features branch to make your changes
3. Before pushing to the "dev" branch*:
    ```
    git checkout dev
    git merge --no-ff featuresBranch
    ```

4. Push to dev branch:
    ```
    git push origin
    ```

5. Dev branch is used as a staging area for new features. Master branch will always be the official working release, as it is auto-deployed to NetSense.azurewebsites.net.


###Style Guide

Before pull requesting a new feature:
  * Remove all extraneous comments
  * Refactor to 'clean' code
  * Complete a peer code review

Keep all commits in present tense (e.g. 'implements', 'creates', 'adds').

Do not use a period at the end of commit messages.

Extensive style guide found [here](https://github.com/hackreactor/curriculum/wiki/Style-Guide).
