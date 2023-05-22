# item-pickups

A full-stack social media web application that allows users to upload and share images.

**Link to project:** https://itempickups.fly.dev/

![alt text](https://i.imgur.com/8OZTtOX.png)

## How It's Made:

**Tech used:** EJS, CSS, JavaScript, Bootstrap, Node.js, Express, MongoDB, Passport

This full-stack social media web application was made using Node.js and Express. This application was organized using the MVC (Model-View-Controller) design pattern. EJS was used to dynamically render HTML on the page. MongoDB was used as the database which stores all the users and their posts. Passport was used for authentication and passwords were hashed using bcrypt and user sessions were stored in MongoDB. Multer was used as a middleware to ensure that only images get uploaded and those very images then get stored on Cloudinary.

## Optimizations:

While using Bootstrap made styling the application easier there are still some styling issues I would like to fix such as the sizing of the image cards. Users are able to like posts of other users and add those posts to their favorites but I would like to add a comment system that is tied to each individual post. EJS was really helpful with how it is able to render dynamic HTML pages I would like to switch it up and use something like React.

## Lessons Learned:

I learned more about using middleware, I was already using an authentication middleware that I created in a previous application for checking if the user is authenticated. I created an error handler middleware that is used to render an error page that displays the error message and I also created a Multer middleware that made it easy to upload files and ensure that only image files were uploaded to Cloudinary. I also had my first experience using a CSS framework by using Bootstrap which made it a lot easier to style the application and allowed me to focus more on the backend logic of this application.

## More Projects:

Take a look at these other projects that I have in my portfolio:

**Employee CRM API:** https://github.com/vzMars/employee-crm-api

**MyBookList API:** https://github.com/vzMars/mybooklist-api

**Discord YouTube Bot:** https://github.com/vzMars/discord-youtube-bot
