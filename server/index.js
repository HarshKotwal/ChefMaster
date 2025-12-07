import express from "express";
import cors from "cors";
import { getRecipeFromMistral } from "./ai.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/recipe", async (req, res) => {
  const { ingredients } = req.body;
  const recipe = await getRecipeFromMistral(ingredients);
  res.json({ recipe });
});

app.listen(3001, () => console.log("Server running on port 3001"));
