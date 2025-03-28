const dialogTextChange = document.getElementById("dialog-text-change");
const nameInput = document.getElementById("character-name");
const formDialog = document.getElementById("form-container");
const savesDialog = document.getElementById("previous-saves");

const headers = new Headers();
headers.append("Content-Type", "application/json");

const randomNames = [
  "Dusty McBoots",
  "Slim Pickens",
  "Lasso Larry",
  "Buckaroo Bill",
  "Two-Guns Turner",
  "Pistol Peg",
  "Sally Six-Shooter",
  "Saloon Sal",
  "Blaze",
  "Rattlesnake Rita",
  "Twisted Annie",
  "Pinto Pete",
  "Silver Sage",
];

const characterNameMaxLength = 22;

// Vars that are set by the various functions
let selectedGender = undefined;
let characterName = undefined;
let characterId = undefined;
let allSaves = [];

let pronouns = {
  subject: undefined,
  object: undefined,
  possessive: undefined,
  slang: undefined,
};

function randomName() {
  const selectedName =
    randomNames[Math.floor(Math.random() * randomNames.length)];
  nameInput.value = selectedName;

  dialogTextChange.innerText = "";
}

function showNameCharLength() {
  const nameLength = nameInput.value.length;

  if (nameLength >= characterNameMaxLength) {
    dialogTextChange.innerText = "MAX LENGTH!";
  } else if (nameLength > characterNameMaxLength / 2) {
    dialogTextChange.innerText = nameLength;
  } else {
    dialogTextChange.innerText = "";
  }
}

function pickGender(element, selected) {
  const collection = document.getElementsByClassName("gender-select");

  for (let i = 0; i < collection.length; i++) {
    collection[i].style.border = "solid transparent 1px";
  }

  element.style.border = "solid green 1px";
  selectedGender = selected;
}

async function finalizeCharacter() {
  let valid = false;

  if (nameInput.value === "" && selectedGender == undefined) {
    dialogTextChange.innerText = "Please set a character name and gender.";
    return;
  } else if (nameInput.value === "") {
    dialogTextChange.innerText = "Please set a character name.";
    return;
  } else if (selectedGender === undefined) {
    dialogTextChange.innerText = "Please set a character gender.";
    return;
  } else {
    valid = true;
  }

  characterName = nameInput.value;

  if (selectedGender == "male") {
    pronouns = {
      subject: "he",
      object: "him",
      possessive: "his",
      slang: "partner",
    };
  } else if (selectedGender == "female") {
    pronouns = {
      subject: "she",
      object: "her",
      possessive: "hers",
      slang: "missy",
    };
  } else {
    pronouns = {
      subject: "they",
      object: "them",
      possessive: "theirs",
      slang: "partner",
    };
  }

  if (valid) formDialog.close();

  document.getElementById("buttons").style.display = "none";
  document.getElementById("start").style.display = "block";
  document.getElementById("character-name-verify").innerText = characterName;
  document.getElementById("character-gender-verify").innerText =
    selectedGender.replace("-", " ");

  let returnedId = await saveCharacter(characterName, selectedGender, pronouns);

  document.getElementById(
    "go-button"
  ).href = `game.html?characterId=${returnedId}`;
}

async function saveCharacter(name, gender, pronouns) {
  await fetch(`http://localhost:3000/save_new`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name: name,
      gender: gender,
      pronouns: pronouns,
    }),
  })
    .then(async (r) => await r.json())
    .then((json) => {
      characterId = json.characterId;
    })
    .catch((error) => {
      console.error(error);
    });

  return characterId;
}

async function getAllSaves() {
  await fetch(`http://localhost:3000/save`, {
    method: "GET",
    headers: headers,
  })
    .then(async (r) => await r.json())
    .then((json) => {
      allSaves = json;
    })
    .catch((error) => {
      console.error(error);
    });
}

function viewPreviousSaves() {
  savesDialog.showModal();

  const saves = document.createElement("div");

  allSaves.forEach((savedState) => {
    const previousSave = document.createElement("div");
    previousSave.className = "previous-save";

    // Create character name
    const characterNameText = document.createElement("p");
    characterNameText.innerText = `${savedState.name}`;
    previousSave.appendChild(characterNameText);

    // Create gender image
    const genderImg = document.createElement("img");
    if (savedState.gender == "male") {
      genderImg.src = `./images/mars-solid.svg`;
    } else if (savedState.gender == "female") {
      genderImg.src = `./images/venus-solid.svg`;
    } else {
      genderImg.src = `./images/transgender-solid.svg`;
    }
    previousSave.appendChild(genderImg);

    // Create continue button or complete text
    let continued = undefined;
    if (savedState.complete === true) {
      continued = document.createElement("p");
      continued.innerText = "Complete!";
    } else {
      continued = document.createElement("a");
      continued.href = `game.html?storyId=${savedState.storyId}&characterId=${savedState.characterId}`;
      continued.className = "btn";
      continued.innerText = "continue";
    }
    previousSave.appendChild(continued);

    saves.appendChild(previousSave);
  });

  document.getElementById("saves-list").appendChild(saves);
}

function closeSavesDialog() {
  savesDialog.close();

  // Overwrite the HTML in the saves dialog to prevent it from appending forver.
  document.getElementById("saves-list").innerHTML = "";
}

// Page load actions
getAllSaves();
showNameCharLength();
nameInput.maxLength = characterNameMaxLength;
