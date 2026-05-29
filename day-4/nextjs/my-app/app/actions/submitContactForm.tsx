"use server"
import path from "path";
import process from "process";
import fs from "fs/promises";

async function submitContactForm(formData: FormData){
     
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const message = formData.get("message");
    const obj = {
        fullName: fullName,
        email: email,
        message: message
    }

    console.log(obj);
    // define the file path
    // cwd : current working directory
    const filePath = path.join(process.cwd(), "app", "data", "users.json");

    //read the file
    const fileData = await fs.readFile(filePath, "utf-8");

    console.log("file data: ", fileData);

    // convert the file data to JS object
    const data = await JSON.parse(fileData);
    data.push(obj);

    console.log("parsed data: ", data);

    fs.writeFile(filePath, JSON.stringify(data));


}

export default submitContactForm;


// server action: users post feedback with instant UI updates
// take user feedback using server action and display them in the UI
// 1. create a feedback form
// 2. details should be immediately displayed on te ui
// 3. save the feedback data to some file using server action
