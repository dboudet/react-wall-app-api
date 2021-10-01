# React wall app API
*This API was built in conjunction with a React front end which you can find [here](https://github.com/dboudet/react-wall-app).

 *The app allows that all users can view messages posted to the wall. Create an account and sign in to post your own. Email verification is required upon creating an account, passwords are hashed, and JWT used for authorization to post messages.*

## Get this running...

#### *Prerequisites*
* A MongoDB database which will contain **users** and **messages** collections (see /src/models)
* A SendGrid account for the email verification.

1. Fork/clone this repo
2. Run `yarn` or `yarn install` to install all dependencies
3. Create a **.env** file in your project's main folder. *This will contain both your **MongoDB connection string** AND your **SendGrid API key***, as follows:
```javascript
DB_CONNECTION=mongodb+srv://username:password@cluster-name.suemc.mongodb.net/database-name

SENDGRID_API_KEY=SG.WHATEVERYOURAPIKEYISHERE
```
4. Create a **tokenString.js** file in your project's main folder. This is contain the secret key used in the JWT signature verification process:
```javascript
exports.tokenString = "secretKEYusedforJWTtokensignatureverification"
```
5. Run `nodemon .` in your terminal to get your backend up and running. You should see a confirmation logged that the app is listening on port 5000.
6. Get your [React frontend](https://github.com/dboudet/react-wall-app) up and running and you're good to go!