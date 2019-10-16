# Online Blog application
using MongoDB, Express, Angular,and Node 

link to the deployed application http://naz-blog.s3-website.ap-south-1.amazonaws.com


The Aim of the project is to create an online blog management application 
which user can use to create a blog, update, delete and read blog. 

this project is a single page application

Technologies used are ​ - HTML5, CSS , Javascript, Angular, Bootstrap, Express, Node.js, MongoDB

Features of the platform -
1) Authentication - Login and Sign Up
2) Autherization - Autherized user can edit and delete particular blog
3) CRUD Operations - Create, Read, Update and Delete operation

Blog Management - 

a) A view to create a blog - In this view first user should be logged in then he will be able to create a blog.
		Give it a tile, description, blog body and author(user name).
    
b) A view to view all blogs - In this view everyone should be able to view a list of all
		blogs.
    
c) A view to see details of a particular blog. You have to display the blog when user clicks on Read button.

d) Edit a particular blog - This view should allow autherized user to edit details like title, description
     and blog body for a particular blog.
     
e) Delete a particular blog - Autherized user should be able to delete a particular blog.


A few important points which I made use of-
1) Run the APIs in POSTMAN to see the response format. That will enable you to
		easily use that in your Angular code.
2) The whole application should be single page with well defined View, controllers,
		directives, services and middlewares.
3) Use jsonwebtoken for authentication and bcryptjs for password encryption.
