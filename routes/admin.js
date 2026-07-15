const express = require("express");
const router = express.Router();
const fs = require("fs");

const ADMIN_PASSWORD = "tewasbabaninmekani";

router.get("/admin", (req,res)=>{

    if(!req.session.admin){
        return res.render("login");
    }

    let messages = [];

    if(fs.existsSync("messages.json")){
        messages = JSON.parse(fs.readFileSync("messages.json"));
    }

    res.render("dashboard", {
        messages: messages
    });

});


router.post("/admin/login",(req,res)=>{

    const {password} = req.body;

    if(password === ADMIN_PASSWORD){

        req.session.admin = true;

        return res.redirect("/admin");

    }

    res.send("Yanlış şifre");

});

router.post("/admin/delete/:id",(req,res)=>{

    let messages = [];

    if(fs.existsSync("messages.json")){
        messages = JSON.parse(fs.readFileSync("messages.json"));
    }

    messages.splice(req.params.id,1);

    fs.writeFileSync(
        "messages.json",
        JSON.stringify(messages,null,2)
    );

    res.redirect("/admin");

});

module.exports = router;
