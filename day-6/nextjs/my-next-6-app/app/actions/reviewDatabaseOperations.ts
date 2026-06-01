"use server";

import {pool} from '../lib/db'
import { revalidatePath } from "next/cache";

export interface ReviewItem {
    id?: number;
    username: string;
    email: string;
    review: string;
    rating: number
    created_at?: string;
}

export async function addReview(formData: FormData) {
    const username = formData.get("username");
    const email = formData.get("email");
    const review = formData.get("review");
    const rating = formData.get("rating");

    if (!username || !email || !review || !rating) return;

    try {
        const queryText = 'INSERT INTO reviews(username, email, review, rating) VALUES($1, $2, $3, $4)';
        await pool.query(queryText, [username, email, review, rating]);

        revalidatePath("/review");
    } catch (error) {
        console.error("Database insertion error: ", error);
        throw new Error("Failed to save reviews");
    }
}

export async function getReviews(): Promise<ReviewItem[]> {
    try {
        const res = await pool.query('SELECT username, email, review, rating FROM reviews ORDER BY id DESC');
        return res.rows;
    } catch (error) {
        console.error("Database fetch error: ", error);
        return [];
    }
}

export async function getAverageRatings(): Promise<number | null> {
    try {
        const res = await pool.query('SELECT AVG(rating) as avg_ratings FROM reviews');
        return Number(res.rows[0].avg_ratings);
    } catch (error) {
        console.error("Can't get average error", error);
        throw error;
    }
}

