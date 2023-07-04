import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ImagesPage.css';

function ImagesPage() {
  const [images, setImages] = useState([]);
  

  useEffect(() => {
    fetch("https://image-annotation-measurement-website-divyakulkarni.vercel.app/images/view")
      .then((res) => res.json())
      .then((data) => {
        setImages(data.data);
      })
      .catch((error) => {
        console.log("Error fetching images:", error);
      });
  }, []);


  return (
    <div >
      <h2>Click on any specific image to annotate</h2>
      <div className="images-grid">
      {images.map((image,index) => (
        
        <Link
          key={index}
          to={"/images/edit/${image._id}"} 
        >
          <img
            alt="All Images"
            width={300}
            height={300}
            src={image.image}
          />
        </Link>
      
      ))}
      </div>
    </div>
  );
}

export default ImagesPage;
