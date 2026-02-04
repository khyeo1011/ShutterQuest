# ShutterQuest
## Lore
The Oracle is an ancient spirit trapped within the digital realm, possessing infinite knowledge but no eyes to see the physical world. It craves a connection to reality.

To see the world, the Oracle has chosen a group of adventurers (you and your friends) and gifted them with The Shutter, an enchanted interface that connects your camera directly to the Oracle’s mind.

The Oracle is fickle and demanding. It will command you to find specific artifacts. You must use your camera to capture these tributes. The Oracle then gazes upon your photos, using its divine judgment to decide whose offering is the most worthy.

## What is Shutter Quest?
Shutter Quest is a fast-paced, competitive multiplayer scavenger hunt powered by computer vision. Players are dropped into a lobby where the AI Oracle issues a series of cryptic or direct prompts—seeking everything from "a vessel of hydration" to "the glow of ancient electronics."

Adventurers must race against the clock to find these items in the real world. Success is measured by two divine metrics:
- Divine Confidence: How certain is the Oracle that you have found the true artifact?
- Temporal Speed: How quickly did you provide the tribute?

The player who balances speed with the highest AI confidence score ascends the leaderboard to claim victory.

## Inspiration
We wanted to bridge the gap between digital connection and physical action. Our goal was to create a fun, competitive experience that keeps friends connected not just through a screen, but by challenging them to look up, move around, and actively interact with the unique environments they inhabit.

## How we built it
- NextJS for the frontend
- OpenAI CLIP hosted locally in our teammates' homelab server
- Flask API backend
- Supabase for the database

## What We Learned
- How to deploy an app on a homelab server for public use
- Improve bottlenecks in system to improve latency experienced by the user

see our [devpost here!](https://devpost.com/software/shutter-quest)
