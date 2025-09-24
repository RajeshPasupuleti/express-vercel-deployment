import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://pasupuletivasavirajesh143_db_user:<db_password>@cluster0.ya8og9f.mongodb.net/NewRegistration?retryWrites=true&w=majority&appName=Cluster0");
const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDb connected successfully")
});

const FormSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    age: Number,
    gender: String,
    address: String,
});

const FormModel = mongoose.model('Form', FormSchema)
app.post('/submit', async (req, res) => {
    try{
        const newData = new FormModel(req.body);
        
        await newData.save();
        res.status(200).json({message: "Form submitted successfully",
            receivedData: req.body,
            savedData: newData 
    });
    }catch (error){
        res.status(500).json({error: "Failed to submit the form"});
    }
});

app.get('/', (req, res) => {
    res.send('Running backend')
});

app.listen(PORT, () => {
    console.log(`Server is running on localhost ${PORT}`);
});
