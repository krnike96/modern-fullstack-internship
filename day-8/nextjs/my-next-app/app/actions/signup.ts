"use server"

import { redirect } from "next/navigation";
import { pool } from "../lib/db";
export async function signup(formdata: FormData) {
  const username = formdata.get("username");
  const email = formdata.get("email");
  const password = formdata.get("password");

  if(!username || !email || !password) return;

  await pool.query(
		`INSERT INTO users(username, email, password)
		VALUES
		(${username}, ${email}, ${password})`
	);

	console.log("saved user :", username);

	redirect("/login");
}

