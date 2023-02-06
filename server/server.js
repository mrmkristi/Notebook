const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", true);
mongoose.connect(PATH TO DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.once("open", () => console.log("Successfully connected to database"));

const noteSchema = {title: String, content: String, time: String};
const note = mongoose.model("note",noteSchema);

app.get("/", function (req,res){
    
    note.find((err,result) => {
        if(err){
            console.log(err);
        } else{
            res.json(result);
            
            console.log("Responded to Get request on '/'.");
            
            // console.log(result);
        }
    });
});

app.post("/add", function(req,res){

    const newNote = new note(req.body);
    newNote.save();

    console.log("New note added successfully");
    // console.log(req.body);
});

app.post("/delete", function(req,res){

    const noteTitle = req.body.title;
    const noteContent = req.body.content;
    const noteTime = req.body.time;

    note.findOneAndDelete({title: noteTitle, content: noteContent, time: noteTime}, (err) => {
        if(err){
            console.log(err);
        } else{
            console.log("Note deleted successfully");
            res.status(200).json({ message: "Note deleted successfully" });
            // console.log(req.body);
        }
    });
});

app.listen(5000, function() {
    console.log("Server started on port 5000.");
});