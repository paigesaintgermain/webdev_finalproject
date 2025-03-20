const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text 
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement("button")
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
      return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
  }

const textNodes = [
    { 
    id: 1,
    text: "Welcome to Rusty Spur, partner. You're the new sheriff in town and you've got a big job ahead of you. Word around the watering hole is the notorious outlaw, One-Eyed-Bill is now wanted for MURDER! Posters with his face - well half his face - are plastered all over town and townsfolk are counting on you to bring him to justice. Are you up for the challenge?",
    options: [
        {
            text: "I accept the challenge.",
            //setState: { sheriffBadge: true },// 
            nextText: 2
        },
        {
            text: "Decline.",
            nextText: 3
        }
        ]
    },
    {
        id: 2,
        text: "You begin your investigation at the Rusty Spur Saloon, where rumors fly faster than a tumbleweed in a dust storm. As you step inside, the chatter dies down, and all eyes turn to you. A nervous bartender polishes a glass and says, Sheriff, I heard One-Eyed-Bill was seen near the old Gold Mine. But Dusty the Dillo over there swears he spotted him sneaking into the General Store. Where do you go?",
        options: [
            {
                text: "Head to the Mine.",
                //requiredState: (currentState) => currentState.sheriffBadge, 
                //setState:  { sheriffBadge: false, wantedPoster: true },
                nextText: 4
            },
            {
                text: "Investigate the General Store.", 
                nextText: 5
            },
        ]
    },
    {
        id: 3,
        text: "There's no room for cowards in these parts.",
        options: [
            {
              text: "You just yee'd your last haw buddy.",
              nextText: -1
            }
        ]
    },
//add in a weather API here?//
    {
        id: 4,
        text: "The sun beats down as you ride out to the abandoned Gold Mine. As you approach, you hear the sound of rocks tumbling—someone is inside! You dismount and creep closer when suddenly you see a shadow dart deeper into the mine. What do you do?",
        options: [
            {
                text: "Follow the shadow into the mine.",
                nextText: 6
            },
            {
                text: "Wait outside and set a trap.", 
                nextText: 7
            },
        ]
    },
    {
        id: 5,
        text: "You reach the general store just as the sun begins to set. The old door creaks open, and inside you see a pair of boots sticking out from behind a dusty rack. But wait! There is also a horse saddled up outside, as if someone is planning a quick getaway. What do you do next?",
        options: [
            {
                text: "Sneak up on the boots.",
                nextText: 8
            },
            {
                text: "Check the horse for clues.", 
                nextText: 9
            },
        ]
    }, 
    {
        id: 6,
        text: "You step carefully into the mine, your lantern casting flickering shadows. Suddenly, you hear a gun cock behind you. \n \n Well, well, Sheriff, drawls a rough voice. Looks like you walked right into my trap. One-Eyed-Bill steps out from the shadows, grinning. What do you do?",

        options: [
            {
                text: "Try to talk him into surrendering.",
                nextText: 10
            },
            {
                text: "Make a daring escape.", 
                nextText: 11
            },
        ]
    }, 
    {
        id: 7,
        text: "Your trap is set and you hide behind a rock and wait. After a while, a figure emerges cautiously from the mine. It’s One-Eyed-Bill! You leap out, but he’s always one step ahead—he jumps on a horse and takes off! What do you do?",

        options: [
            {
                text: "Jump on your horse, he’s getting away!",
                nextText: 12
            },
            {
                text: "Take a shortcut through the canyon.", 
                nextText: 13
            },
        ]
    }, 
    {
        id: 8,
        text: "You quietly sneak up and grab the boots—only to find they belong to the town drunk, Old Gus. He’s fast asleep! What’s the big idea, Sheriff? he mumbles. Suddenly, you hear a horse galloping away outside. Could that be One-Eyed-Bill? What do you do next?",

        options: [
            {
                text: "Race outside to stop the rider.",
                nextText: 14
            },
            {
                text: "Ask Old Gus what he knows.", 
                nextText: 15
            },
        ]
    },
    {
        id: 9,
        text: "You check the horse’s saddlebag and find a sharp spike—One-Eyed-Bill’s! Suddenly, someone behind you growls, Looking for me, Sheriff? You turn to see One-Eyed Bill, grinning. What do you do?",

        options: [
            {
                text: "Draw your gun and demand he surrender.",
                nextText: 16
            },
            {
                text: "Try to outsmart him with words.", 
                nextText: 17
            },
        ]
    },
    {
        id: 10,
        text: "You keep your hands where he can see them, keeping your voice steady. Look, you got a choice here, you say, putting on your most understanding face. Go out in a blaze of glory, or— You dramatically wave your hand, —live to see another day and maybe find a nice hobby. Ever thought about pottery? It’s very therapeutic. \n \n Bill hesitates, his finger twitching on the trigger. The weight of his crimes—and possibly the overwhelming thought of pottery—seem to be getting to him. \n \n Think about it, Bill, you say, giving him your best comforting smile. Just imagine—no more running, no more wanted posters. Just... you, a cozy cell, and maybe a nice set of mugs you made yourself. It could be your new life. \n \n At this point, Bill seems torn between his pride and the idea of making his own pottery set. The moment hangs in the air.",

        options: [
            {
                text: "Convince him further by appealing to his past.",
                nextText: 20
            },
            {
                text: "Call his bluff and go for your gun", 
                nextText: 21
            },
        ]
    },
    {
        id: 11,
        text: "Your heart pounds as you dive to the ground, kicking up a cloud of dust. One-Eyed-Bill fires, but his shot goes wide in the dim light of the mine. Rolling to your feet, you grab a nearby rock and hurl it at his lantern. It shatters, plunging the mine into darkness. \n \n Cursing, Bill fires blindly, but you use the cover of night to slip behind a stack of wooden crates. You hear his boots scuff against the rocky ground as he fumbles for another shot. This is your chance! What do you do?",

        options: [
            {
                text: "Make a run for the entrance.",
                nextText: 22
            },
            {
                text: "Try to ambush him in the dark.", 
                nextText: 23
            },
        ]
    },
    {
        id: 12,
        text: "After an intense chase through the town and a final showdown near the town’s edge, you finally catch up to One-Eyed Bill. With nowhere left to run, he raises his hands in surrender. Alright, Sheriff, you got me, he mutters. \n \n As you take him into custody, the townsfolk gather around, eager to hear what terrible crime he’s committed. That’s when Widow Jenkins steps forward, holding up something limp in her hands. Sheriff, she says, I reckon One-Eyed-Bill ain’t as bad as folks think. He’s just been braggin’ about shooting a varmint. \n \n You look closer and realize the varmint is just a possum—one that was only playing dead! The little critter suddenly twitches, opens its eyes, and scurries away, leaving One-Eyed-Bill looking mighty foolish. \n \n The town erupts in laughter. Guess I ain’t such an outlaw after all, Bill grumbles as you march him toward the jailhouse. Justice is served, and Rusty Spur can rest easy once more!",
        options: [
            {
              text: "Time to saddle up again!",
              nextText: -1
            }
        ]
    },
    {
        id: 13,
        text: "You veer off the main trail and race through the winding canyon, dust kicking up behind you. The towering red rock walls echo the sound of your horse’s hooves as you push forward, hoping to outmaneuver One-Eyed-Bill. As you round a bend, you spot a narrow pass that could cut him off—but it's risky. The ground looks unstable, and one wrong move could send you tumbling down into the ravine below. What do you do?",

        options: [
            {
                text: "Take the risky shortcut.",
                nextText: 18
            },
            {
                text: "Stick to the main trail and try to outrun him.", 
                nextText: 19
            },
        ]
    },
    {
        id: 14,
        text: "You burst out of the general store just in time to see a rider kicking up dust, speeding toward the outskirts of town. The fading light makes it hard to tell if it’s One-Eyed-Bill, but your gut tells you it is. What do you do?",

        options: [
            {
                text: "Jump onto your horse and chase after him.",
                nextText: 25
            },
            {
                text: "Fire a warning shot to make him stop.", 
                nextText: 26
            },
        ]
    },
    {
        id: 15,
        text: "You nudge Old Gus, who groggily lifts his head. Wha—what's goin' on, Sheriff? he mumbles, rubbing his eyes. You ain't here for a drink, are ya? You cut to the chase, asking him what he knows about One-Eyed-Bill. \n \n Old Gus squints, his mind clearly foggy from too much whiskey. Bill? Oh, I seen him, alright. Not long ago ... rode in on a fast horse, real quiet-like. Took somethin' from the safe behind the counter, but I was too drunk to make out what it was. All I know is he was real mad about someone named Tumbleweed Tim... He slurs a bit, his eyes darting nervously. He mentioned somethin' about a hideout in the hills. Might be worth checkin' out, Sheriff. But don't take my word for it. I ain't no expert. \n \n Suddenly, you hear the sound of galloping hooves fading into the distance. You realize Old Gus' information might just be the lead you need to catch Bill before he disappears forever. What do you do?",

        options: [
            {
                text: "Head for the hills to find Bill's hideout.",
                nextText: 27
            },
            {
                text: "Head back to town to investigate Tumbleweed Tim.", 
                nextText: 28
            },
        ]
    },
    {
        id: 16,
        text: "You draw your gun with the precision of a rattlesnake striking, but One-Eyed Bill just chuckles. Before you can blink, he takes off faster than a greased weasel on roller skates. You stand there, gun still drawn, as a tumbleweed rolls past like it’s trying to get away from you, too. \n \n And now, you’ve got to head back to town, tail between your legs. Guess this hero thing isn't as glamorous as it looks.",

        options: [
            {
                text: "That was a rootin-tootin’ disaster!",
                nextText: -1
              }
        ]
    },
    {
        id: 17,
        text: "You stand tall trying to charm the pants off One-Eyed-Bill—metaphorically, of course. Now, Bill, think about it. You’ve already got the fame, the fortune, the thrill of the outlaw life. But what if I told you there’s an easier way? A life of luxury! No bounty hunters breathing down your neck. No more running. Just you, a big ol’ rocking chair, and all the biscuits you can eat! \n \n Bill squints, rubbing his chin like a man seriously considering a lifetime supply of free biscuits. He taps his gun against his leg, deep in thought. That does sound mighty temptin’... But see, I’m more of a 'run fast, never look back, occasionally trip over a rock' kinda guy. \n \n Before you can respond, he flashes a grin wider than a canyon and, in a blur of movement, vaults onto his horse like a man who’s practiced dramatic escapes in the mirror. With a kick, his horse bolts like it just remembered it left the stove on, and Bill disappears into the horizon.. You stand there, hands on your hips, watching the dust settle. Guess you’ll have to work on your sales pitch—maybe throw in some gravy next time.",

        options: [
            {
                text: "Reload, partner!",
                nextText: -1
              }
        ]
    },
    {
        id: 18,
        text: "You grip the reins tightly and urge your horse up the steep, rocky path. The ground shifts beneath you, but you push forward, knowing this is your best shot at cutting off One-Eyed-Bill. As you crest the ridge, you spot him galloping below, completely unaware of your position \n \n Timing it just right, you slide down the rocky slope, drawing your gun. \n \n End of the line, Bill! you shout. \n \n One-Eyed-Bill pulls up his horse, eyes wide with shock. Seeing no way out, he raises his hands and scowls. Fine, Sheriff. You got me. \n \n You cuff him and lead him back to town, where the townsfolk cheer your name. Justice is served, and Rusty Spur is safe once again!",
        options: [
            {
              text: "Yeehaw!",
              nextText: -1
            }
        ]
    },
    {
        id: 19,
        text: "You push your horse to its absolute limits, galloping through the canyon so fast it probably deserves a raise. The walls widen, and up ahead, you spot One-Eyed-Bill, kicking up dust as he nears the canyon’s exit. If he gets through, he’ll vanish into the desert like your uncle after borrowing five dollars—never to be seen again. \n \n Gritting your teeth, you pull your lasso from your saddle and take careful aim. With a flick of the wrist, the rope sails through the air, looping perfectly around One-Eyed Bill’s torso like a hug he definitely didn’t ask for. \n \n He yelps as you yank, and in a glorious, flailing spectacle, he tumbles from his horse and face-plants into the dirt. You leap from your saddle, gun drawn, as he groans and spits out a mouthful of sand. \n \n Looks like the chase is over, Bill, you say, trying not to sound too smug. \n \n Bill glares up at you, dust clinging to his mustache. Dang it, Sheriff. You got me fair and square. And right when I was startin’ to like that horse, too. \n \n You haul him back to Rusty Spur, where the whole town erupts in cheers—probably the most exciting thing that’s happened since Old Gus tried to wrestle a tumbleweed. The notorious outlaw is finally behind bars, and you? You’ve just secured your place as the town’s greatest sheriff. \n \n And, more importantly, you’ve got an absolutely legendary story to tell at the saloon tonight.",
        options: [
            {
              text: "Yippee Ki-Yay!",
              nextText: -1
            }
        ]
    },
    {
        id: 20,
        text: "You take a careful step forward, lowering your voice like you’re about to reveal the secret recipe for grandma’s chili. I know you weren’t always an outlaw, Bill. Folks say you used to work an honest job before things went south. You don’t have to go down this road forever. \n \n Bill’s expression flickers—just for a second. He lets out a long sigh, lowering his gun. Reckon I’ve been runnin’ long enough, he mutters. \n \n As you lead him back to town, the sun rises over Rusty Spur, bathing everything in golden light. The townsfolk erupt in cheers—you’ve brought justice back to the frontier! \n \n Widow Jenkins even faints from excitement (or possibly from the heat—it’s a toss-up). The mayor offers you a free drink, and the saloon pianist starts playing a dramatic victory tune. \n \n Bill sighs. \n \n Y’know, Sheriff, for a guy who just got arrested, I feel real underappreciated here. \n \n You grin. Well, Bill, maybe if you’d taken up baking instead of banditry, folks would be throwin’ you a parade. \n \n He squints. ...You think it’s too late to start?",
        options: [
            {
              text: "In the name of justice!",
              nextText: -1
            }
        ]
    },
    {
        id: 21,
        text: "You move like lightning, drawing your revolver and firing before Bill can even think about pulling the trigger. The shot echoes through the cavern like a dinner bell at a hungry cowboy convention. \n \n One-Eyed-Bill staggers back, blinking in surprise. He glances down at the growing red stain on his shirt and lets out a wheezy chuckle. Well, dang, he mutters. Guess you were faster Sheriff \n \n Then, with all the grace of a drunk possum, he slumps against the mine wall and slides down like a sack of expired potatoes. He lifts a shaky finger, as if he’s about to say something profound—then promptly keels over. \n \n By the time you ride back into Rusty Spur, the news has already spread. One-Eyed Bill is no more, and the town is safe once again. \n \n Tumbleweed Tim nods approvingly. The mayor pats you on the back. \n \n Well, you mutter, tipping your hat, justice ain’t always pretty. \n \n Widow Jenkins faints dramatically. \n \n And somewhere, somehow, Bill’s ghost is probably rolling its one good eye.",
        options: [
            {
              text: "That was wilder than a rodeo clown on a pogo stick!",
              nextText: -1
            }
        ]
    },


]


startGame()



/* {
        id: //number//,
        text: "",
        options: [
            {
                text: "",
                nextText: //number//
            },
            {
                text: "", 
                nextText: //number//
            },
        ]
    }, */