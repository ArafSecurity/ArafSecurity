const adminRouter = require("./routes/admin");

const express = require("express");
const path = require("path");
const session = require("express-session");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(__dirname));


app.use(session({
    secret:"araf-security-secret",
    resave:false,
    saveUninitialized:false
}));

app.set("view engine","ejs");

app.use(adminRouter);

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});


app.get("/hakkimizda",(req,res)=>{
    res.sendFile(path.join(__dirname,"pages/about.html"));
});


app.get("/hizmetlerimiz",(req,res)=>{
    res.sendFile(path.join(__dirname,"pages/services.html"));
});


app.get("/ekibimiz",(req,res)=>{
    res.sendFile(path.join(__dirname,"pages/team.html"));
});


app.get("/teklif",(req,res)=>{
    res.sendFile(path.join(__dirname,"pages/quote.html"));
});


app.get("/sss",(req,res)=>{

    res.sendFile(path.join(__dirname,"pages/contact.html"));
});

app.get("/iletisim",(req,res)=>{
    res.sendFile(path.join(__dirname,"pages/contact.html"));
});
app.post("/iletisim-gonder",(req,res)=>{

    const {name,email,subject,message} = req.body;

    let messages = [];

    if(fs.existsSync("messages.json")){
        messages = JSON.parse(fs.readFileSync("messages.json"));
    }

    messages.push({
        name,
        email,
        subject,
        message,
        date:new Date().toLocaleString()
    });

    fs.writeFileSync(
        "messages.json",
        JSON.stringify(messages,null,2)
    );

    res.send("Mesajınız alındı. Teşekkürler.");

});

app.listen(PORT,()=>{

    console.log(`Araf Security çalışıyor: http://localhost:${PORT}`);

});
