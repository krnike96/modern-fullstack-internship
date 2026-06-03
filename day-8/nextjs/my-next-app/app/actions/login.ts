"use server"

import { pool } from "../lib/db";
import { cookies } from "next/headers";
export async function login(formdata: FormData) {
    const email = formdata.get("email");

    const user = await pool.query(
        `SELECT * FROM usrs
        WHERE email = '${email}'
        `
    );

    console.log("user: ", user.rows[0]);

    const cookie = await cookies();
    cookie.set("user", user.rows[0].id.toString());
}