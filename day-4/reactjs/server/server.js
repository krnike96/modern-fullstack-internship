const express = require("express");
const cors = require("cors");
const path = require("path");
const fsModule = require("fs");

const app = express();
const PORT = 9989;

app.use(cors());
app.use(express.json());

// home route
app.get("/", (req, res) => {
    res.send("This is Home Route");
});

// contact route
app.post("/contact", (req, res) => {
    const contactData = req.body;

    const filePath = path.join(__dirname, "users.json");
    console.log("dirName: ", __dirname);
    console.log("filePath: ",filePath);

    let data = [];
    if (fsModule.existsSync(filePath)) {
        const fileData = fsModule.readFileSync(filePath, "utf-8");
        data = JSON.parse(fileData);
    }

    data.push(contactData);

    fsModule.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.json({
        status: "success",
        message: "Data saved successfully",
        data: contactData
    });

    return res;
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}...`);
});