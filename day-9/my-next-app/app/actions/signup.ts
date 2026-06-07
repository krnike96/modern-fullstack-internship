"use server"
import {prisma} from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

async function signup(formdata: FormData){
    console.log("formdata: ", formdata);
    const name = String(formdata.get("username"));
    const email = String(formdata.get("email"));
    const password = String(formdata.get("password"));

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // store this data in db
    await prisma.users.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    const output = await prisma.users.findMany();
    console.log("output: ", output);

    redirect("/login")
}

export default signup;