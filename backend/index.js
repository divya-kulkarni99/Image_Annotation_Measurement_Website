const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors= require("cors");
require("dotenv").config();


const bodyParser = require('body-parser');
app.use(cors());
app.set("view engine","ejs");
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json());


const mongoUrl = process.env.ImageInformation;
mongoose
.connect(mongoUrl,{
   useNewUrlParser:true,
})
.then(() => {console.log("Connected to Database");
})
.catch(e =>console.log("Failed to connect to Database:", error));

app.listen(5000, () =>{
    console.log("Sever Started");
}
);


require("./Imagesdatabase"); 
const Images = mongoose.model("ImagesDetails");


app.post("/images/upload", async (req, res) => {
  const { base64 } = req.body;
  try {
    const image = await Images.create({
      image: base64
      
    });
    res.json({ status: "Successful", data: image });
  } catch (error) {
    res.json({ status: "Error!", data: error });
  }
});


app.get("/images/view", async (req, res) => {
  try {
    const images = await Images.find({});
    res.send({ status: "ok", data: images });
  } catch (error) {
    res.status(500).json({ status: "Error!", data: error });
  }
});

 app.get("/images/edit/:id", async (req, res) => {
   const { id } = req.params;
   try {
     const image = await Images.findById(id);
     if (!image) {
       return res.status(404).json({ status: "Image not found" });
     }
     res.send({ status: "ok", data: image });
   } catch (error) {
     res.status(500).json({ status: "Error!", data: error });
   }
 });

 app.post("/images/edit/:id", express.json(), (req, res) => {
  const imageId = req.params.id;
  const keypoints = req.body;
  Images.findByIdAndUpdate(
    imageId,
    { keypoints },
    { new: true }
  )
    .then(function (updatedImage) {
      console.log(updatedImage);
      res.json(updatedImage);
    })
    .catch(function (err) {
      console.error('Error storing keypoints:', err);
      res.status(500).send('Error storing keypoints');
    });
  });  
  
app.get("/images/edit/:id", (req, res) => {
  const imageId = req.params.id;
  Images.findById(imageId, 'keypoints', (err, image) => {
    if (err) {
      console.error('Error fetching keypoints:', err);
      return res.status(500).send('Error fetching keypoints');
    }
    res.json(image);
  });
});

 





