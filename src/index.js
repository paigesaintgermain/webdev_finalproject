import {
  ensureFilesFolderExists,
  ensureJsonFileExists,
  saveToJson,
  getAllSaves,
  saveToJsonById
} from "./funcs.js";
import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

// Send all files in the root folder via localhost:3000/main
app.use("/main", express.static("./src/root"));

app.get("/save", (req, res) => {
    ensureFilesFolderExists();
    ensureJsonFileExists();
    
    res.status(200).json(getAllSaves());
});

app.post("/save", (req, res) => {
    ensureFilesFolderExists();
    ensureJsonFileExists();
    
    const saveData = req.body;
    saveToJsonById(saveData);
    res.status(200);
})

app.post("/save_new", (req, res) => {
  ensureFilesFolderExists();
  ensureJsonFileExists();

  const characterId = uuidv4();

  const save = {
    characterId: characterId,
    storyId: 1,
    complete: false,
    name: req.body.name,
    gender: req.body.gender,
    pronouns: req.body.pronouns,
  };

  saveToJson(save);

  res.status(200).json({ characterId: characterId });
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
