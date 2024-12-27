# E-commerce-website-
Using CRUD application approach this e-commerce website is created

📁 Folder Structure:

major- e-commerce website/ # major- e-commerce website is the main application folder

models/ Product.js: Product model for the database. Database Used: MongoDB.

public/ (Frontend assets and resources): 

detail.html: Detailed page for for adding, updating, viewing and deleting of the product details and can also handle users, and orders. 

index.html: Login HTML page (only accessible to admin with fixed credentials).

index1.html: Login HTML page for customers or users.

script.js: JavaScript file for index.html. 

script2.js: Additional JavaScript for detail.html. 

style.css: Stylesheet for index.html. 

style1.css: Stylesheet for detail.html.

style3.css: Stylesheet for index1.html.

uploads/ Folder where uploaded images are stored.

Functionality: When the user clicks 'Add Product', the product details and image files are saved. Images are not stored directly in MongoDB; instead, only their URLs pointing to this folder are stored. package.json

Project metadata, dependencies, and npm scripts. package-lock.json

Lock file to ensure consistent package installation. server.js

Main backend server file that handles logic and routes. node_modules/

**Screenshots:**


