"use server";

import fs from "fs/promises";
import path from "path";

export type Feedback = {
  name: string;
  message: string;
};

const filePath = path.join(process.cwd(), "app", "data", "users.json");

async function saveFeedback(name: string, message: string) {
  if (!name || !message) return;

  const newFeedback: Feedback = { name, message };

  try {
    let currentData: Feedback[] = [];
    
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      currentData = JSON.parse(fileContent);
    } catch (e) {
      console.log(e);
    }

    currentData.push(newFeedback);
    await fs.writeFile(filePath, JSON.stringify(currentData, null, 2));
  } catch (error) {
    console.error(error);
  }
}

export default saveFeedback;
