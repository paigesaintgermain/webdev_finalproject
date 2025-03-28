const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);

  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });

  saveStoryProgress(textNodeIndex, textNode.complete);
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    complete: false,
    text: "Welcome to Rusty Spur, partner. You're the new sheriff in town and you've got a big job ahead of you. Word around the watering hole is the notorious outlaw, One-Eyed-Bill is now wanted for MURDER! Posters with his face - well half his face - are plastered all over town and townsfolk are counting on you to bring him to justice. Are you up for the challenge?",
    options: [
      {
        text: "I accept the challenge.",
        //setState: { sheriffBadge: true },//
        nextText: 2,
      },
      {
        text: "Decline.",
        nextText: 3,
      },
    ],
  },
  {
    id: 2,
    complete: false,
    text: "You begin your investigation at the Rusty Spur Saloon, where rumors fly faster than a tumbleweed in a dust storm. As you step inside, the chatter dies down, and all eyes turn to you. A nervous bartender polishes a glass and says, \"Sheriff, I heard One-Eyed-Bill was seen near the old Gold Mine. But Dusty the Dillo over there swears he spotted him sneaking into the General Store.\" Where do you go?",
    options: [
      {
        text: "Head to the Mine.",
        //requiredState: (currentState) => currentState.sheriffBadge,
        //setState:  { sheriffBadge: false, wantedPoster: true },
        nextText: 4,
      },
      {
        text: "Investigate the General Store.",
        nextText: 5,
      },
    ],
  },
  {
    id: 3,
    complete: true,
    text: "There's no room for cowards in these parts.",
    options: [
      {
        text: "You just yee'd your last haw buddy.",
        nextText: -1,
      },
    ],
  },
  {
    id: 4,
    complete: false,
    text: "The sun beats down as you ride out to the abandoned Gold Mine. As you approach, you hear the sound of rocks tumbling—someone is inside! You dismount and creep closer when suddenly you see a shadow dart deeper into the mine. What do you do?",
    options: [
      {
        text: "Follow the shadow into the mine.",
        nextText: 6,
      },
      {
        text: "Wait outside and set a trap.",
        nextText: 7,
      },
    ],
  },
  {
    id: 5,
    complete: false,
    text: "You reach the general store just as the sun begins to set. The old door creaks open, and inside you see a pair of boots sticking out from behind a dusty rack. But wait! There is also a horse saddled up outside, as if someone is planning a quick getaway. What do you do next?",
    options: [
      {
        text: "Sneak up on the boots.",
        nextText: 8,
      },
      {
        text: "Check the horse for clues.",
        nextText: 9,
      },
    ],
  },
  {
    id: 6,
    complete: false,
    text: "You step carefully into the mine, your lantern casting flickering shadows. Suddenly, you hear a gun cock behind you. \n \n \"Well, well, Sheriff, drawls a rough voice. Looks like you walked right into my trap.\" One-Eyed-Bill steps out from the shadows, grinning. What do you do?",

    options: [
      {
        text: "Try to talk him into surrendering.",
        nextText: 10,
      },
      {
        text: "Make a daring escape.",
        nextText: 11,
      },
    ],
  },
  {
    id: 7,
    complete: false,
    text: "Your trap is set and you hide behind a rock and wait. After a while, a figure emerges cautiously from the mine. It’s One-Eyed-Bill! You leap out, but he’s always one step ahead—he jumps on a horse and takes off! What do you do?",

    options: [
      {
        text: "Jump on your horse, he’s getting away!",
        nextText: 12,
      },
      {
        text: "Jump on your horse and take a shortcut through the canyon.",
        nextText: 13,
      },
    ],
  },
  {
    id: 8,
    complete: false,
    text: "You quietly sneak up and grab the boots—only to find they belong to the town drunk, Old Gus. He’s fast asleep! \"What’s the big idea, Sheriff?\" he mumbles. Suddenly, you hear a horse galloping away outside. Could that be One-Eyed-Bill? What do you do next?",

    options: [
      {
        text: "Race outside to stop the rider.",
        nextText: 14,
      },
      {
        text: "Ask Old Gus what he knows.",
        nextText: 15,
      },
    ],
  },
  {
    id: 9,
    complete: false,
    text: "You check the horse’s saddlebag and find an eye patch—it must belong to One-Eyed-Bill! Suddenly, someone behind you growls, \"Looking for me, Sheriff?\" You turn to see One-Eyed Bill, grinning. What do you do?",

    options: [
      {
        text: "Draw your gun and demand he surrender.",
        nextText: 16,
      },
      {
        text: "Try to outsmart him with words.",
        nextText: 17,
      },
    ],
  },
  {
    id: 10,
    complete: false,
    text: "You keep your hands where he can see them, keeping your voice steady. \"Look, you got a choice here,\" you say, putting on your most understanding face. \"Go out in a blaze of glory, or—\" You dramatically wave your hand, \"—live to see another day and maybe find a nice hobby. Ever thought about pottery? It’s very therapeutic.\" \n Bill hesitates, his finger twitching on the trigger. The weight of his crimes—and possibly the overwhelming thought of pottery—seem to be getting to him. \n \"Think about it, Bill,\" you say, giving him your best comforting smile. \"Just imagine—no more running, no more wanted posters. Just... you, a cozy cell, and maybe a nice set of mugs you made yourself. It could be your new life.\" \n At this point, Bill seems torn between his pride and the idea of making his own pottery set. The moment hangs in the air.",

    options: [
      {
        text: "Convince him further by appealing to his past.",
        nextText: 20,
      },
      {
        text: "Your patience is running thin and you go for your gun",
        nextText: 21,
      },
    ],
  },
  {
    id: 11,
    complete: false,
    text: "Your heart pounds as you dive to the ground, kicking up a cloud of dust. One-Eyed-Bill fires, but his shot goes wide in the dim light of the mine. Rolling to your feet, you grab a nearby rock and hurl it at his lantern. It shatters, plunging the mine into darkness. \n \n Cursing, Bill fires blindly, but you use the cover of night to slip behind a stack of wooden crates. You hear his boots scuff against the rocky ground as he fumbles for another shot. This is your chance! What do you do?",

    options: [
      {
        text: "Make a run for the entrance.",
        nextText: 22,
      },
      {
        text: "Try to ambush him in the dark.",
        nextText: 23,
      },
    ],
  },
  {
    id: 12,
    complete: true,
    text: "After an intense chase through the town and a final showdown near the town’s edge, you finally catch up to One-Eyed Bill. With nowhere left to run, he raises his hands in surrender. \"Alright, Sheriff, you got me, he mutters.\" \n As you take him into custody, the townsfolk gather around, eager to hear what terrible crime he’s committed. That’s when Widow Jenkins steps forward, holding up something limp in her hands. \"Sheriff,\" she says, \"I reckon One-Eyed-Bill ain’t as bad as folks think. He’s just been braggin’ about shooting a varmint.\" \n You look closer and realize the varmint is just a possum—one that was only playing dead! The little critter suddenly twitches, opens its eyes, and scurries away, leaving One-Eyed-Bill looking mighty foolish. \n The town erupts in laughter. \"Guess I ain’t such an outlaw after all,\" Bill grumbles as you march him toward the jailhouse. Justice is served, and Rusty Spur can rest easy once more!",
    options: [
      {
        text: "Time to saddle up again!",
        nextText: -1,
      },
    ],
  },
  {
    id: 13,
    complete: false,
    text: "You veer off the main trail and race through the winding canyon, dust kicking up behind you. The towering red rock walls echo the sound of your horse’s hooves as you push forward, hoping to outmaneuver One-Eyed-Bill. As you round a bend, you spot a narrow pass that could cut him off—but it's risky. The ground looks unstable, and one wrong move could send you tumbling down into the ravine below. What do you do?",

    options: [
      {
        text: "Take the risky shortcut.",
        nextText: 18,
      },
      {
        text: "Stick to the main trail and try to outrun him.",
        nextText: 19,
      },
    ],
  },
  {
    id: 14,
    complete: false,
    text: "You burst out of the general store just in time to see a rider kicking up dust, speeding toward the outskirts of town. The fading light makes it hard to tell if it’s One-Eyed-Bill, but your gut tells you it is. What do you do?",

    options: [
      {
        text: "Jump onto your horse and chase after him.",
        nextText: 25,
      },
      {
        text: "Fire a warning shot to make him stop.",
        nextText: 26,
      },
    ],
  },
  {
    id: 15,
    complete: false,
    text: "You nudge Old Gus, who groggily lifts his head. \"Wha—what's goin' on, Sheriff?\" he mumbles, rubbing his eyes. \"You ain't here for a drink, are ya?\" You cut to the chase, asking him what he knows about One-Eyed-Bill. \n Old Gus squints, his mind clearly foggy from too much whiskey. \"Bill? Oh, I seen him, alright. Not long ago ... rode in on a fast horse, real quiet-like. Took somethin' from the safe behind the counter, but I was too drunk to make out what it was. All I know is he was real mad about someone named Tumbleweed Tim...\" He slurs a bit, his eyes darting nervously. \"He mentioned somethin' about a hideout in the hills. Might be worth checkin' out, Sheriff. But don't take my word for it. I ain't no expert.\" \n Suddenly, you hear the sound of galloping hooves fading into the distance. You realize Old Gus' information might just be the lead you need to catch Bill before he disappears forever. What do you do?",
    img: "./images/image1.png",
    options: [
      {
        text: "Head for the hills to find Bill's hideout.",
        nextText: 27,
      },
      {
        text: "Head back to town to investigate Tumbleweed Tim.",
        nextText: 28,
      },
    ],
  },
  {
    id: 16,
    complete: true,
    text: "You draw your gun with the precision of a rattlesnake striking, ready to end this once and for all. But before you can even yell something cool, One-Eyed-Bill lets out a cackle and then, in a blur of movement, he takes off faster than a greased weasel shot out of a cannon. \n You don’t even have time to react. One second, he’s there. The next, he’s a distant dust cloud, cackling all the way. \n You stand there, gun still drawn, feeling about as useful as a screen door on a submarine. A tumbleweed rolls past, slowing slightly—almost as if it’s pausing to judge you—before continuing on its way. \n As you trot back into Rusty Spur, the townsfolk gather around expectantly. Did you get him? someone asks. \n You clear your throat. Well, uh… define \"get.\" Silence. \n Somewhere out there, One-Eyed Bill is still running—and you? You just got outpaced by a one-eyed man with no indoor plumbing.",
    options: [
      {
        text: "That was a rootin-tootin’ disaster!",
        nextText: -1,
      },
    ],
  },
  {
    id: 17,
    complete: true,
    text: "You stand tall trying to charm the pants off One-Eyed-Bill—metaphorically, of course. \"Now, Bill, think about it. You’ve already got the fame, the fortune, the thrill of the outlaw life. But what if I told you there’s an easier way? A life of luxury! No bounty hunters breathing down your neck. No more running. Just you, a big ol’ rocking chair, and all the biscuits you can eat!\" \n Bill squints, rubbing his chin like a man seriously considering a lifetime supply of free biscuits. He taps his gun against his leg, deep in thought. \"That does sound mighty temptin’... But see, I’m more of a 'run fast, never look back, occasionally trip over a rock' kinda guy.\" \n Before you can respond, he flashes a grin wider than a canyon and, in a blur of movement, vaults onto his horse like a man who’s practiced dramatic escapes in the mirror. With a kick, his horse bolts like it just remembered it left the stove on, and Bill disappears into the horizon. You stand there, hands on your hips, watching the dust settle. Guess you’ll have to work on your sales pitch—maybe throw in some gravy next time.",
    options: [
      {
        text: "Reload, partner!",
        nextText: -1,
      },
    ],
  },
  {
    id: 18,
    complete: true,
    text: "You grip the reins tightly, urging your horse up the steep, rocky path like a man who definitely didn't skip leg day. The ground shifts beneath you, but you push forward—because if this horse can carry your bad decisions, it can handle a few loose rocks. \n As you crest the ridge, you spot One-Eyed Bill galloping below, blissfully unaware of your dramatic entrance. Perfect. \n With impeccable (and probably reckless) timing, you slide down the rocky slope, drawing your gun in one smooth motion. Rocks tumble behind you. It’s very cinematic. You feel cool as hell. \n \"End of the line, Bill!\" you shout, hoping you sound intimidating and not just out of breath. \n One-Eyed-Bill yanks the reins, his horse skidding to a stop. His one good eye widens. He looks left. He looks right. Nowhere to run. He scowls and throws up his hands. \"Fine, Sheriff. You got me.\" \n You smirk, slapping the cuffs on him. \"Glad we could do this the easy way.\"  \n \"You slid down a mountain and nearly broke your neck,\" Bill mutters. \n \"Yeah, but it looked cool.\" \n By the time you ride back into Rusty Spur, the whole town is cheering. The mayor shakes your hand, the saloon pianist plays your theme song (probably), and Mrs. Jenkins faints—either from excitement or because she does that a lot. \n Justice is served, Rusty Spur is safe again, and you? You’ve got the best entrance story in frontier history.",
    options: [
      {
        text: "Yeehaw!",
        nextText: -1,
      },
    ],
  },
  {
    id: 19,
    complete: true,
    text: "You push your horse to its absolute limits, galloping through the canyon so fast it probably deserves a raise. The walls widen, and up ahead, you spot One-Eyed-Bill, kicking up dust as he nears the canyon’s exit. If he gets through, he’ll vanish into the desert like your uncle after borrowing five dollars—never to be seen again. \n Gritting your teeth, you pull your lasso from your saddle and take careful aim. With a flick of the wrist, the rope sails through the air, looping perfectly around One-Eyed Bill’s torso like a hug he definitely didn’t ask for. \n He yelps as you yank, and in a glorious, flailing spectacle, he tumbles from his horse and face-plants into the dirt. You leap from your saddle, gun drawn, as he groans and spits out a mouthful of sand. \n \"Looks like the chase is over, Bill,\" you say, trying not to sound too smug. \n Bill glares up at you, dust clinging to his mustache. \"Dang it, Sheriff. You got me fair and square. And right when I was startin’ to like that horse, too.\" \n You haul him back to Rusty Spur, where the whole town erupts in cheers—probably the most exciting thing that’s happened since Old Gus tried to wrestle a tumbleweed. The notorious outlaw is finally behind bars, and you? You’ve just secured your place as the town’s greatest sheriff. \n And, more importantly, you’ve got an absolutely legendary story to tell at the saloon tonight.  ",
    options: [
      {
        text: "Yippee Ki-Yay!",
        nextText: -1,
      },
    ],
  },
  {
    id: 20,
    complete: true,
    text: "You take a careful step forward, lowering your voice like you’re about to reveal the secret recipe for grandma’s famous cherry pie. \"I know you weren’t always an outlaw, Bill. Folks say you used to be an honest man before things went south. You don’t have to go down this road forever.\" \n Bill’s expression flickers—just for a second. He lets out a long sigh, lowering his gun. \"Reckon I’ve been runnin’ long enough,\" he mutters, turning himself in. \n As you lead him back to town, the sun rises over Rusty Spur, bathing everything in golden light. The townsfolk erupt in cheers—you’ve brought justice back to the frontier! \n Widow Jenkins even faints from excitement (or possibly from the heat—it’s a toss-up). The mayor offers you a free drink, and the saloon pianist starts playing a dramatic victory tune. \n Bill sighs. \n \"Y’know, Sheriff, for being the star of the show, I feel real underappreciated here.\" \n You grin. \"Well, Bill, maybe if you’d taken up baking instead of banditry, folks would be throwin’ you a parade.\" \n He squints. \"...You think it’s too late to start?\"",
    options: [
      {
        text: "In the name of justice!",
        nextText: -1,
      },
    ],
  },
  {
    id: 21,
    complete: true,
    text: "You move like lightning, drawing your revolver and firing before Bill can even think about pulling the trigger. The shot echoes through the cavern like a dinner bell at a hungry cowboy convention. \n One-Eyed-Bill staggers back, blinking in surprise. He glances down at the growing red stain on his shirt and lets out a wheezy chuckle. \"Well, dang, he mutters. Guess you were faster Sheriff\" \n Then, with all the grace of a drunk possum, he slumps against the mine wall and slides down like a sack of expired potatoes. He lifts a shaky finger, as if he’s about to say something profound—then promptly keels over. \n By the time you ride back into Rusty Spur, the news has already spread. One-Eyed Bill is no more, and the town is safe once again. \n Tumbleweed Tim nods approvingly. The mayor pats you on the back. \n \"Well,\" you mutter, tipping your hat, \"justice ain’t always pretty.\" \n Widow Jenkins faints dramatically. \n And somewhere, somehow, Bill’s ghost is probably rolling its one good eye.",
    options: [
      {
        text: "That was wilder than a rodeo clown on a pogo stick!",
        nextText: -1,
      },
    ],
  },
  {
    id: 22,
    complete: false,
    text: "You take a deep breath and sprint toward the mine entrance, dodging blindly through the darkness. Behind you, Bill fires off another shot—it grazes your hat, but you don’t slow down. Just as you see the sunlight ahead, your boot catches on a loose rock, and you tumble forward, landing hard. \n \n Bill’s laughter echoes behind you. \"Not so fast, Sheriff!\" he growls. \n \n Thinking quickly, you grab a handful of dirt and hurl it back. It smacks Bill in his one good eye, making him yelp in pain. Taking advantage of the moment, you leap onto your horse and spin around, your gun drawn.",

    options: [
      {
        text: "Continue.",
        nextText: 24,
      },
    ],
  },
  {
    id: 23,
    complete: false,
    text: "Holding your breath, you press yourself against the cold mine wall. Bill mutters curses as he stumbles in the dark, his boots crunching against the gravel. You hear him reload—this is your chance. \n \n With a swift motion, you lunge forward, grabbing his gun hand. The two of you struggle, tumbling over crates and knocking over old mining tools. Finally, with a solid punch, you send Bill sprawling. His gun skitters across the floor. \n \n Panting, you pin him down and slap on the cuffs. \"Looks like your luck’s run out, Bill.\"",

    options: [
      {
        text: "Continue.",
        nextText: 24,
      },
    ],
  },
  {
    id: 24,
    complete: true,
    text: "As the dust settles, One-Eyed Bill groans, sprawled out like a man who’s just realized that crime really doesn’t pay. You, on the other hand, are standing victorious—looking like the kind of Sheriff that legends are made of. Or at least, that’s what you tell yourself. \n With a grunt, you haul him to his feet and drag him back to Rusty Spur. The moment you roll into town, the people cheer—except for Old Gus, who is currently using a saloon chair as a bed. He lifts his head, squinting at the commotion. \n The mayor claps you on the back. \"Sheriff! How’d you finally take down One-Eyed Bill?\" \n You glance at Bill, who’s still trying to blink dirt out of his eye and grumbling under his breath. Then you tip your hat. \n \"Let’s just say… he didn’t see it coming.\" \n Silence. \n Then Old Gus lets out a wheezy cackle that sounds like a rusty wagon wheel, and Mrs. Jenkins faints so hard she takes out a barrel of bacon grease. \n With a defeated sigh, Bill groans \"Can you just lock me up already?\"",
    options: [
      {
        text: "Served with a side of justice!",
        nextText: -1,
      },
    ],
  },
  {
    id: 25,
    complete: true,
    text: "The rider jerks the reins, and his horse skids to a dramatic halt, like it’s auditioning for a Western film. Just as you start to approach, a massive dust storm blows in out of nowhere, as if the universe just decided it was a bad day for justice. \n You squint through the storm, but it's so thick, you could swear the tumbleweeds are having a rave with a bunch of coyotes. You stand there, half-blinded, feeling like the universe just handed you a \"Find Bill\" puzzle and forgot to include the picture. When the dust finally clears, you look around... One-Eyed-Bill is gone. \n His horse is gone. He’s gone. The only thing left is a tumbleweed, which rolls by slowly as if it’s giving you the side-eye. \n \"Dang it…\" you mutter, shaking your head like a man who just realized he forgot his own birthday. \n \n Well, Sheriff, looks like the outlaw got the better of you this time. The universe just swiped left on your heroic moment. \n Back in Rusty Spur, the townsfolk will have to wait a little longer for justice. You’ll tell them the storm did it, because it sounds more believable than saying you got outsmarted by a guy with one eye and questionable life choices. But hey, next time? Next time, you’ll make sure the storm doesn’t mess up your chance to look cool. Probably.",
    options: [
      {
        text: "Better luck next time, partner",
        nextText: -1,
      },
    ],
  },
  {
    id: 26,
    complete: true,
    text: "You spur your horse forward, kicking up a cloud of dust as you tear after One-Eyed Bill. The outlaw glances back, eyes widening when he sees you gaining on him. \"You ain’t takin’ me alive, Sheriff!\" he yells—right before his hat flies off and smacks him in the face. \n \n Blinded for a split second, Bill swerves wildly, loses control, and crashes straight into a massive tumbleweed. The dry, spiky ball engulfs him like a giant burrito, rolling a few feet before finally coming to a stop. A muffled groan comes from inside. \n \n You slow your horse to a stop, hop off, and stroll up as he struggles to free himself from the tangled mess. \n \n \"Well, partner, looks like you’ve tumbled into trouble,\" you say, yanking him free and slapping the cuffs on. \n \n Back in town, the townsfolk cheer as you haul the dazed, twig-covered outlaw into the jail. Justice has been served, and you didn’t even break a sweat.",
    options: [
      {
        text: "Meowdy, partner.",
        nextText: -1,
      },
    ],
  },
  {
    id: 27,
    complete: true,
    text: "You ride out to the hills, following Old Gus’ shockingly unreliable directions, which mostly involved him waving vaguely and saying, \"Just go that-a-way until you hit somethin’...\" hopefully not a cactus. \n After what feels like an eternity of wandering and questioning your life choices, you finally spot a shack squatting between some rocks. It looks less like a hideout and more like something an ambitious raccoon might throw together. \n You dismount, tiptoe toward the door, and— \n BAM! The whole shack crumbles like it was made of stale crackers. \n You cough through the dust, squinting as you untangle yourself from a pile of splinters. From the wreckage, you hear a pained groan. \n \"Dang it, Sheriff...\" One-Eyed Bill wheezes. \"I just finished buildin’ that!\" \n You stare at the pile of splintered wood and who-knows-what-else. Turns out, Bill’s idea of hiding out involved the world’s least secure shack, constructed out of hopes and the flimsiest materials available, like broken fence posts and the dreams of a man who clearly watched too much DIY TV. \n As you drag him back to town, he grumbles the whole way. You glance at the pile of rubble behind you. \"Bill, that wasn’t a roof, that was a suggestion.\"",
    options: [
      {
        text: "Next time just pay for a hotel.",
        nextText: -1,
      },
    ],
  },
  {
    id: 28,
    complete: true,
    text: "Turns out, the so-called murder victim was just Tumbleweed Tim—or at least, that’s what folks thought. \n One-Eyed Bill throws up his hands. \"Sheriff, I didn't kill nobody!\" \n When you ask him about One-Eyed-Bill, Tim groans sounding annoyed. \"Now hold on there, Sheriff! If this is about the murder, I ain’t dead!\" \n Bill groans. \"Sheriff, Tumbleweed Tim is the clumsiest man in the West! The man once tripped his own shadow!\" \n A few nights ago, One-Eyed Bill and Tim got into a heated argument over a misplaced chicken (Tim swore it was his, Bill swore otherwise). In the scuffle, Bill shoved Tim, who promptly tripped over a bucket, tumbled down a hill, and landed face-first in a pig trough. \n  When the townsfolk found Tim the next morning—motionless, covered in mud, and smelling real unfortunate—they assumed the worst. Bill, realizing it looked bad, panicked and hightailed it outta town before anyone could ask questions. \n  Now, standing here very much alive, Tim shrugs. \"Honestly, I was just takin’ a nap.\" \n You sigh, realizing you’ve been chasing an outlaw who ain't actually an outlaw. Looks like Bill ain't a murderer—just a fella with bad luck and worse decision-makin’. \n You lower your gun. Looks like Rusty Spur had it wrong. The real culprit? Gravity. \n Back in town, the folks apologize to Bill… but you still lock him up for horse thievin'.",
    options: [
      {
        text: "Case Closed: Tim vs. Physics",
        nextText: -1,
      },
    ],
  },
];

let urlParameters = new URLSearchParams(document.location.search);
let storyId = urlParameters.get("storyId");
let characterUuid = urlParameters.get("characterId");

if (storyId === null || storyId === "null") {
  startGame();
} else {
  storyId = parseInt(storyId);
  showTextNode(storyId);
}

async function saveStoryProgress(textNodeIndex, complete) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  await fetch(`http://localhost:3000/save`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      characterId: characterUuid,
      storyId: textNodeIndex,
      complete: complete
    }),
  }).catch((error) => {
    console.error(error);
  });
}
