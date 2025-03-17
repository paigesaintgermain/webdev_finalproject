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
            text: "I accept the Challenge.",
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
        text: "You begin your investigation at the Rusty Spur Saloon, where rumors fly faster than a tumbleweed in a dust storm. As you step inside, the chatter dies down, and all eyes turn to you. A nervous bartender polishes a glass and says: Sheriff, I heard One-Eyed-Bill was seen near the old Gold Mine. But Dusty the Dillo over there swears he spotted him sneaking into the General Store. Where do you go?",
        options: [
            {
                text: "Head to the Mine.",
                //requiredState: (currentState) => currentState.sheriffBadge, 
                //setState:  { sheriffBadge: false, wantedPoster: true },
                nextText: 4
            },
            {
                text: "Investigate the General Store.",
                //requiredState: (currentState) => currentState.sheriffBadge,//
                //setState: { sheriffBadge: false, horse: true },// 
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

    //you are here//

    {
        id: 4,
        text: "The sun beats down as you ride out to the abandoned Gold Mine. As you approach, you hear the sound of rocks tumbling—someone is inside! You dismount and creep closer when suddenly a shadow darts deeper into the mine. What do you do?",
        options: [
            {
                text: "Follow the shadow into the mine.",
                //requiredState: (currentState) => currentState.sheriffBadge, 
                //setState:  { sheriffBadge: false, wantedPoster: true },
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
        text: "You reach the General Store just as the sun begins to set. The old door creaks open, and inside you see a pair of boots sticking out from behind a dusty rack. But wait! There’s also a horse saddled up outside, as if someone’s planning a quick getaway. What do you do?",
        options: [
            {
                text: "Sneak up on the boots.",
                //requiredState: (currentState) => currentState.sheriffBadge, 
                //setState:  { sheriffBadge: false, wantedPoster: true },
                nextText: 8
            },
            {
                text: "Check the horse for clues.", 
                nextText: 9
            },
        ]
    },  
]


startGame()