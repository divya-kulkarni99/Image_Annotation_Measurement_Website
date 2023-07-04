import React, {useState } from 'react';
import './UploadPage.css';


function UploadPage(props) {
  const [image,setImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function convertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        console.log(reader.result); //base64encoded string  
        setImage(reader.result);
    };
    reader.onerror = error => {
        console.log("Error: ", error);
        console.log("This is Base64 error: ", error);
    };
}


function uploadImage() {
  fetch("http://localhost:5000/images/upload", {
      method: "POST",
      crossDomain: true,
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
          base64: image
      })
  }).then((res) => res.json()).then((data) =>{
    console.log(data);
    setIsModalOpen(true);
    
  }
  
    
  
    )
  .catch((error) => {
    console.error(error);

    
  });
}
function closeModal() {
  setIsModalOpen(false);
}


  return (
   
        <div className='upload'>
            
            <h3>Upload the Image you want to anonotate and measure</h3>
            <h4>Steps to annotate you images</h4>
            <p>
              1. Upload an image by choosing a file by clicking on upload button.
            </p>
            <p>
              2. Go to the View All Images to see the uploaded images, and select one image which you want to annotate.
            </p>
            <p>
              3. Place the keypoints on the image and save them. 
            </p>
            <p>
              4. Click on any two key points and find the distance between them (in pixels).
            </p>
            <input
                accept="image/*"
                type="file"
                id="file"
                onChange={convertToBase64}
            />
            <label htmlFor="file" className="label-file"><i className='material-icons'>add_photo_alternate</i>Choose an Image</label>
            {image === "" || image == null ? "" : <img alt="UploadedImage" width={300} height={300} src={image} className="imageUploded" />}
          <div>
            <button className="button-upload" disabled={image === "" || image === null} onClick={() => {uploadImage(); }}>Upload Image</button>
          
            
          </div>
          {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Image Uploaded!</h2>
            <p>To see images, click on the View All Images tab</p>
            <button className="modal-close" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
            
            
        </div>
    
  );
}

export default UploadPage;

