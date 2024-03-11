# Social Media API
[Walkthrough Video](https://drive.google.com/file/d/1hNU60udZz2GNflbh2oDo8-mNZNTMUfcp/view?usp=sharing)

## Description 
This program is built in Node.js with MongoDB and Mongoose. It allows the user to create users for a social media platform, as well as author posts, or thoughts, by said users. 

## Installation
Before running the program, the user must run ```npm install``` to install the dependencies from package.json. After doing that, the program can be run with the command ```node server```.

## Usage
By following the routes in the ./routes.api folder, the user can use Postman or Insomnia to create, read, update, or delete data containing users, thoughts, and reactions. The routes are: 
- /api/users for users   
- /api/thoughts for thoughts   

## License
Please refer to the LICENSE in the repo.

## Credits
Regex for email validation: https://masteringjs.io/tutorials/mongoose/mongoose-validate-unique-emai