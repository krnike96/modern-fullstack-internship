"use server"
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function login(formdata: FormData){
    const email = String(formdata.get("email"));

    const user = await prisma.users.findUnique({
        where: {email} 
    })

    if(!user)
        throw new Error("User does not exist!");

    const token = createToken(user.id, user.name || "", user.email);

    const cookie = await cookies();
    cookie.set("token",token);

    console.log("token :", token);

    redirect("/")
}

export default login;

