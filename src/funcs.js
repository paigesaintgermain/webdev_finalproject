import fs from "fs";

export function ensureFilesFolderExists() {
  if (!fs.existsSync("./src/files")) {
    fs.mkdirSync("./src/files");
  }
};

export function ensureJsonFileExists() {
  if (!fs.existsSync("./src/files/saves.json")) {
    fs.writeFileSync("./src/files/saves.json", JSON.stringify([], null, 2));
  }
};

export function getAllSaves() {
  return JSON.parse(fs.readFileSync("./src/files/saves.json", 'utf8'));
}

export function saveToJson(saveData) {
  let fileContent = getAllSaves();
  fileContent.push(saveData);
  fs.writeFileSync("./src/files/saves.json", JSON.stringify(fileContent, null, 2));
}

export function saveToJsonById(saveData) {
  let fileContent = getAllSaves();

  fileContent = fileContent.map((character) => {
    if (character.characterId === saveData.characterId) {      
      character.storyId = saveData.storyId;
      character.complete = saveData.complete;
    }

    return character;
  });

  fs.writeFileSync("./src/files/saves.json", JSON.stringify(fileContent, null, 2));
}
