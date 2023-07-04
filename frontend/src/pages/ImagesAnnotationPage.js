import React, { useLayoutEffect, useRef, useState, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import './ImagesAnnotationPage.css';

function ImagesAnnotationPage() {
  const { id } = useParams();

  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);
  const [keypoints, setKeypoints] = useState([]);
  const [selectedKeypoints, setSelectedKeypoints] = useState([]);
  const [lineDistance, setLineDistance] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeKeypoint, setActiveKeypoint] = useState(null);

  const drawImage = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    if (image) {
      const img = new Image();
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        context.fillStyle = 'red';
        keypoints.forEach((keypoint) => {
          context.beginPath();
          context.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
          context.fill();
        });

        context.fillStyle = 'green';
        selectedKeypoints.forEach((keypoint) => {
          context.beginPath();
          context.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
          context.fill();
        });

        context.strokeStyle = 'blue';
        if (selectedKeypoints.length === 2) {
          const [kp1, kp2] = selectedKeypoints;
          context.beginPath();
          context.moveTo(kp1.x, kp1.y);
          context.lineTo(kp2.x, kp2.y);
          context.stroke();
        }
      };
      img.src = image.image;
    } else {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'red';
      context.font = '24px sans-serif';
      context.fillText('Image not selected. Go back to the image page and select an image.', 50, 50);
    }
  }, [image, keypoints, selectedKeypoints]);

 const handleCanvasClick = (event) => {
   const canvas = canvasRef.current;
   const rect = canvas.getBoundingClientRect();
   const x = event.clientX - rect.left;
   const y = event.clientY - rect.top;

   const clickedKeypoint = keypoints.find((keypoint) => {
     const dx = keypoint.x - x;
     const dy = keypoint.y - y;
     return Math.sqrt(dx * dx + dy * dy) <= 5;
   });

   if (clickedKeypoint) {
     handleKeypointDelete(clickedKeypoint);
   } else {
     const newKeypoint = { x, y };
     setKeypoints((prevKeypoints) => [...prevKeypoints, newKeypoint]);
   }
 };

 const handleKeypointClick = (keypoint) => {
   setSelectedKeypoints((prevSelectedKeypoints) => {
     if (prevSelectedKeypoints.includes(keypoint)) {
       return prevSelectedKeypoints.filter((kp) => kp !== keypoint);
     } else {
       return [...prevSelectedKeypoints, keypoint];
     }
   });
 };

 const handleKeypointDelete = (keypoint) => {
   setKeypoints((prevKeypoints) => prevKeypoints.filter((kp) => kp !== keypoint));
   setSelectedKeypoints((prevSelectedKeypoints) =>
     prevSelectedKeypoints.filter((kp) => kp !== keypoint)
   );
 };

 const handleKeypointDrag = useCallback((event) => {
   const canvas = canvasRef.current;
   const rect = canvas.getBoundingClientRect();
   const x = event.clientX - rect.left;
   const y = event.clientY - rect.top;


   setKeypoints((prevKeypoints) =>
     prevKeypoints.map((keypoint) =>
       keypoint === activeKeypoint ? { ...keypoint, x, y } : keypoint
     )
   );
 }, [activeKeypoint]);


 const handleMouseDown = (event, keypoint) => {
   setIsDragging(true);
   setActiveKeypoint(keypoint);
 };


 const handleMouseUp = () => {
   setIsDragging(false);
   setActiveKeypoint(null);
 };

 const handleSaveKeypoints = () => {
  const url = `https://image-annotation-measurement-website-divyakulkarni.vercel.app/images/edit/${id}`;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(keypoints),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Keypoints saved:', data);
    })
    .catch((error) => {
      console.error('Error saving keypoints:', error);
    });
};

 useLayoutEffect(() => {
   const canvas = canvasRef.current;


   if (isDragging) {
     canvas.addEventListener('mousemove', handleKeypointDrag);
     canvas.addEventListener('mouseup', handleMouseUp);
   } else {
     canvas.removeEventListener('mousemove', handleKeypointDrag);
     canvas.removeEventListener('mouseup', handleMouseUp);
   }

   return () => {
     canvas.removeEventListener('mousemove', handleKeypointDrag);
     canvas.removeEventListener('mouseup', handleMouseUp);
   };
 }, [isDragging, handleKeypointDrag]);

 useLayoutEffect(() => {
   fetch(`https://image-annotation-measurement-website-divyakulkarni.vercel.app/images/edit/${id}`)
     .then((res) => res.json())
     .then((data) => {
       setImage(data.data);
     })
     .catch((error) => {
       console.log("Error fetching image:", error);
     });
 }, [id]);


 useLayoutEffect(() => {
   if (image) {
     drawImage();


     if (selectedKeypoints.length === 2) {
       const [kp1, kp2] = selectedKeypoints;
       const distance = Math.sqrt(
         Math.pow(kp2.x - kp1.x, 2) + Math.pow(kp2.y - kp1.y, 2)
       );
       setLineDistance(distance);
     } else {
       setLineDistance(0);
     }
   }
 }, [image, keypoints, selectedKeypoints, drawImage]);


 return (
   <div className="annotate-div">

    <h2>Instructions to select and measure distance between two keypoints</h2>
    <p>
      1. If the canvas below is empty, ensure to select an image to annotate by visiting and clicking on the image in View All Images tab.
    </p>
    <p>
      2. Use cursor on the canvas below to select specific key points (red-dots).
    </p>
    <p>
      3. Click on save button to save the selected keypoints.
    </p>
    <p>
      4. To measure the distance between any two keypoints, select any two keypoints from the list below by clicking on them.
    </p>
   
    <canvas
      ref={canvasRef}
      className="canvas"
      width={600}
      height={600}
      onMouseDown={handleCanvasClick}
    />


     <div className="keypoints">
       <h3>Keypoints on the image (x,y)</h3>
       {keypoints.map((keypoint, index) => (
         <div
           key={index}
           className={`keypoint ${selectedKeypoints.includes(keypoint) ? 'selected' : ''}`}
           onClick={() => handleKeypointClick(keypoint)}
           onMouseDown={(event) => handleMouseDown(event, keypoint)}
         >
           {`Keypoint ${index + 1}: (${keypoint.x}, ${keypoint.y})`}
         </div>
       ))}
     </div>


     {selectedKeypoints.length === 2 && (
       <div className="distance">
         <h4>Distance between the two selected points</h4>
         {`Distance between keypoints is ${lineDistance.toFixed(2)} pixels`}
       </div>
     )}
     <button className="button-savekeypoints" onClick={handleSaveKeypoints}>Save Keypoints</button>
   </div>
 );
}


export default ImagesAnnotationPage;
