"use server"
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";

export default async function submitFeedbackForm(formData: FormData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const feedback = formData.get("feedback");

  // define filepath
  const filePath = path.join(process.cwd(), "app", "data", "feedbacks.json");

  // read file
  const fileData = await fs.readFile(filePath, "utf-8");

  // convert data to json []
  const existingData = fileData ? JSON.parse(fileData) : [];

  // push to file
  existingData.push({username, email, feedback});

  // write to file
	await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));
	revalidatePath("/feedbackForm")

	// success message
	console.log("Data saved successfully.");
	
}

export async function getAllFeedbacks() {
  const filepath = path.join(process.cwd(), "app", "data", "feedbacks.json");

  const rawData = await fs.readFile(filepath, "utf-8");

	const data = await JSON.parse(rawData);
	
	return data;
}
