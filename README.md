Overview:

I have developed an Image annotation and measurement website which contains the following functionalities:
1. Provides an option to upload an image. 
2. Provides an option to view all the images that have been uploaded to the website.
3. Provides an option to Annotate an uploaded image 
This feature allows users to select an image of their choice and annotate it by selecting specific keypoints and measuring the distance between them in pixels. 

Following is the functionality offered by each page 

Page #1 : Upload page
On the upload page, there is an option to choose an image from a local computer and upload it to the website.
This page also consists of instructions on how to annotate an uploaded image.

Page #2 : View All Images
On the view-all-images page, users can see all the images that are already uploaded.
This page provides an option to click on any image. When a user clicks on any specific image,  they will be re-directed to the Image Annotation page.

Page #3 : Image Annotation:
On this page, the image selected from the View-All-Images page will be displayed.
Using the cursor on the canvas/image, users can select any number of keypoints and save them.
Users can select any two keypoints from the list of keypoints to measure the distance between them.


Tech stack used for developing the Web Application

Frontend 
The website's frontend is designed using the ReactJS framework.

Backend
The website's backend is developed using NodeJS, and ExpressJS.

Database
Mongoose from MongoDB is used for storing the image information and keypoints.


Installation/Steps to Run this web application  

Step 1: Open a terminal and clone the GitHub repository by entering the command:  git clone ImageAnnotationMeasurementWebsite

Step 2: Get inside the project folder by entering the command: 
cd  image-annotation-measurement-backend

Step 3: Install MongoDB using the command: npm install mongodb
MongoDB setup
3.1 Create a MongoDB account in https://www.mongodb.com/
3.2 Select the option called ‘Create a Project’ to create a project.
3.3 Create a database by selecting the option ‘Build a database’ and choosing the following configurations:
Free version, provider -> AWS, Name: cluster0
Create a username and password and save the password as it will be required in later stages.
For IP whitelisting, choose Add My Current IP Address option.
3.4 Connect to the backend application,  click on connect -> driver
3.5 Copy the mongourl from the field ‘Add your connection string into your application code’ 
3.6 Go back to the terminal and traverse to the folder by using the following command: cd ImageAnnotationMeasurementWebsite ->
image-annotation-measurement-backend->app.js 
3.7 Open the file app.js and replace the mongourl with the one that you copied in the step above.
In the mongourl replace the <password> with the one that you copied while creating the project. 
  
Step 4. Install and Setup Postman 
4.1 Install Postman 
4.2 Create a new request by clicking on +
4.3 Add the method as POST and enter the following URL http://localhost:5000/images/upload in the URL tab.
4.4 Create another new request and add the URL http://localhost:5000/images/edit/{id}, select the method as POST 
Set the Body: raw, Header -> key: Content-type, and value: application/JSON for both the above requests.

Step 5: Come back to the terminal and come out of the folder image-annotation-measurement-backend by entering the command cd .. and traverse to the folder image-annotation-measurement by typing the command 
cd image-annotation-measurement. 
To start the web application type npm start, this should open the web application in your default browser

Step 6: Open another terminal and go to image-annotation-measurement-backend by entering the command cd image-annotation-measurement-backend and type nodemon app which will connect the server to mongodb instance. 

The web application is live on https://image-annotation-measurement-website.vercel.app
