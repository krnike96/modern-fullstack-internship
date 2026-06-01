"use server";

import { pool } from "../lib/db";
import { revalidatePath } from "next/cache";

export interface FeedbackItem {
  id?: number;
  username: string;
  email: string;
  feedback: string;
  created_at?: string;
}

export async function addFeedback(formData: FormData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const feedback = formData.get("feedback");

  if (!username || !email || !feedback) return;

  try {
    const queryText = 'INSERT INTO feedbacks(username, email, feedback) VALUES($1, $2, $3)';
    await pool.query(queryText, [username, email, feedback]);
    
    revalidatePath("/feedbackForm"); 
  } catch (error) {
    console.error("Database insertion error: ", error);
    throw new Error("Failed to save feedback");
  }
}

export async function getFeedbacks(): Promise<FeedbackItem[]> {
  try {
    const res = await pool.query('SELECT username, email, feedback FROM feedbacks ORDER BY id DESC');
    return res.rows;
  } catch (error) {
    console.error("Database fetch error: ", error);
    return [];
  }
}