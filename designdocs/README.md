# Shopping Interface Design Decisions

This shopping interface will be designed for US users only.  This will limit the possibilities we need to validate in the schema for address and phone number, as well as reduce the frontend design needs.

# Shopping DB Collections

## Schemas

The core of the schema describes the documents User, Product,ReviewList, CartList, ProductInCart, and Review.  The user's shopping cart references the id of the CartList schema, which has a subdocument array with all the Products in Cart. Both the User and Product have a reviews field that references the id of the ReviewList schema, which has an array of all the reviews being retrieved in its reviews field.  Thus reviews are copied into two arrays, the one for the user and the one for the product.  Products are also copied into multiple ProductInCart entries. The reason to have multiple copies is to ensure fast retrieval times.

If the purpose is to only retrieve user information, then returning all the review information as well may take extra time, so we will look for the user ID in the schema with only one id, the id of the entire list of reviews.  If we wish to look at the user's reviews, then we want to retrieve a full description of all the reviews at once, not an id list of the reviews.  The reason is if we retrieve an ID list, we will have to individually query the DB server for each ID from the Express server, whereas retrieving a single ID with a list of actual reviews (not review ids) takes constant time and should still be reasonably fast.  Sending multiple queries to the database over the network as would be necessary to retrieve many ids separately is time-intensive, which is what a NoSQL database like MongoDB tries to avoid with this kind of data duplication.  So the purpose of the CartList and ReviewList is to avoid this issue.

Here is a diagram of the Schema:

![The documents User, Product, and Review with associated fields](basicDBPlan.png "The Basic Schema Plan")


```
ProductInCart{ 
	product: {
		type: Product
	}
	amt: {
		type: Number		
	}						
}

CartList {
	cart_list_id: {
		type: Number,
		required: [true, 'review_list_id field is required'],
		unique: true
	}
	products_in_cart: {
		type: [ProductInCart]
	}
}

ReviewList {
	review_list_id: {
		type: Number,
		required: [true, 'review_list_id field is required'],
		unique: true
	}
	reviews: {
		type: [Review]
	}
}

User
{
	email: {
		type: String,
		required: [true, 'email field is required'],
		unique: [true, 'that email address already exists]',
		pattern: ^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$
	}
	username: {
		type: String,
		required: [true, 'username is required'],
		unique: [true,'that username already exists']
		minLength: 5,
		maxLength: 35,
	}
	firstname: {
		type: String,
		required: [true, 'firstname field is required'],
		minLength: 2,
		maxLength: 40
	}
	lastname: {
		type: String,
		required: [true, 'lastname field is required'],
		minLength: 2,
		maxLength: 40
	}
	address: {
		properties: {
			company: {
				type: String,
				maxLength: 100
			}
			street_address {
				type: String,
				minLength: 5,
				maxLength: 150
			}
			apt_number {
				type: String
			}
			city {
				type: String,
				maxLength: 50
			}
			state: {
				type: String
			}
		}
	}
	phone: {
		type: String,
		pattern: ^\d{3}-\d{3}-\d{4}$
	}
	password: {
		type: String,
		required: [true, 'password field is required']
	}
	shopping_cart: {
		type: Number	
		unique: [true,'another user's cart was already assigned this id']	
	}
	createdDate: {
        type: Date,
        default: Date.now,
    },
	reviews: {
		type: Number,
		unique: [true,'another user's review list was already assigned this id']	
	}
	createdDate: {
		type: Date,
		default: Date.now
	}
}


Product
{
	product_id: {
		type: Number,
		required: [true, 'product_id field is required'],
		unique: [true, 'another product was already assigned this id']
	}
	name: {
		type: String,
		required: [true, 'name field is required'],
	}
	description: {
		type: String,
		required: [true, 'description field is required'],
	}
	price: {
		type: Decimal128,
		required: [true, 'price field is required'],
	}
	tax: {
		type: Decimal128,
		required: [true, 'price field is required'],
	}
	reviews: {
		type: Number,
	}
	imagePath: {
		type: String,
		required: [true, 'image field is required']
	}
	thumbnailPath: {
		type: String,
		required: [true, 'image field is required']
	}
}

Review
{
	review_id: {
		type: Number,
		required: [true, 'email field is required'],
		unique: [true, 'another review was already assigned this id'],
	}
	username {
		type: String,
		required: [true, 'username is required'],
		minLength: 5,
		maxLength: 35,
	}
	product_id {
		type: Number,
		required: [true, 'product_id field is required'],
	}
	title: {
		type: String,
		required: [true, 'title field is required'],
	}
	body: {
		type: String,
		required: [true, 'body field is required'],
	}
	stars: {
		type: String,
		required: [true, 'stars field is required'],
		pattern: ^/[1-5]/
	}
}


```

### Document ID's

In the diagram and schema above, any id for a document is listed as unique in any document set that it is a key for.  If it is a foreign key it may not necessarily need to be unique, however.  For example, the username in User must be unique, but the username in the Review documents would not expected to be unique, as a given user should be able to write more than one review.  However, each ReviewList number in the User documents (the reviews field) must be unique since that particular list of reviews belongs to that user and that user alone.  

In general, to determine whether a field is unique in a given document type, consideration was given to whether it has a one-to-one relationship to the document type in question.

### Justification for Data Validation

Data validation takes time and thus should be justified in any NoSQL Database.  There are a number of reasons to validate fields in an application like a shopping interface that will require storing large amounts of data.  We
wish to prevent data from being accidentally entered with missing fields that will prevent it from being found or displayed correctly.  We want to prevent accidental data entry of obviously invalid data (eg. forgetting an '@'
symbol in an email).  From this standpoint, the necessity of data integrity for a commercial application far outweighs the convenience and speed of keeping all fields unspecified. For this reason, this shopping example will
use a schema designed to validate all necessary fields.  

### Balancing Avoiding Unnecessary Duplication of Data with Speed

The justification of using a NoSQL Database is its ability for its more flexible features to increase speed of data input and retrieval over SQL Databases.  However, unnecessary data duplication can negatively impact speed 
by increasing document size, which increases the time taken to retrieve the corresponding document.  It can also increase the possibility of introducing errors.  To this end, this schema balances these two needs by using a 
reviews number nested inside each User and Product document. This number is an id that leads to a separate list that contains the full reviews.  This speeds the retrieval of the review data while preventing unnecessary data in the Review Collection, such as the body of the review, from being duplicated 
in the User and Product collections.

### ID Retrieval Patterns

Since we will be retrieving the reviews only after looking at a customer or product id, we technically do not need to store those in the review itself.  However, when retrieving a Review document, we will need to retrieve 
both the review information and the information of the other document type.  For example, if we retrieve a review for a customer, we will also need to retrieve its corresponding product, and if we retrieve a review for a product, 
we will also need to retrieve information about its corresponding customer.  To resolve this without needing the review items themselves to have the extra ids, we could store the corresponding review\_id's and product\_id's together 
in the User document, and the corresponding review\_id's and usernames in the Product document.  However, since doing this could nearly double the size of Users and Product documents with many associated reviews with little to 
no increase in retrieval speed, I do not believe this to be a good design choice.  Therefore I have instead placed both the associated product_id and username in the Review schema itself to avoid the space costs of the 
alternative design choice.

### User Schema Notes

The phone number should be a string so that we can specify a reqex.  We will store it with the dashes, unlike how we would if an SQL database were being used, as this saves a few formatting operations at retrieval time 
at the expense of increasing space requirements, which is keeping in the philosophy of using a NoSQL database. The frontend should automatically insert the dashes for the user in the interface and when submitting to the 
backend so they don't have to enter them.

The image path stores the path to the image on the server, which will be added to the img tags in the JSX (html-like language) coded in the React frontend.

**security considerations**\
The username is a field added entirely for display convenience and security reasons for the end-user.  Some reasons users may want a username:
* provides a unique identifier of each user to anyone reading reviews, to allow them to uniquely identify users over multiple reviews to judge their individual credibility.
This also prevents confusion by a user from seeing a review from someone with the same first and last name as them.  If a user wants their full name to be visible, they may 
incorporate it into their username.
* protects the user's privacy by not requiring the listing of sensitive information like their email or potentially sensitive information like their full name (to encourage 
people to review products even if they don't want their real name associated with the review for whatever reason, such as not wanting others to be able to track their 
purchasing habits)

The following information is considered sensitive for the user and we should avoid exposing it publicly:
* password
* email
* firstname
* lastname
* address
* phone

The most sensitive information here is the password, as obtaining it allows a malicious party to access their account and impersonate the user, as well as obtain sensitive information regarding the user.
However, the other information is still sensitive and should not be displayed publicly.  We should do tests to check whether malicious attacks can expose any of this information.

The shopping cart inside the User uses an array of the subdocument declared earlier called ProductInCart.  Product in cart has a product_id corresponding to the name of a product, and an amt corresponding to the
number of items bought of that type. 

### Data Type References

https://docs.mongodb.com/realm/mongodb/document-schemas/ 

https://www.mongodb.com/developer/quickstart/bson-data-types-decimal128/

https://mongoosejs.com/docs/schematypes.html#arrays

### Matching Using Regex

RegEx is short for regular expression.  Regular expressions are available in many languages to match on a pattern, and have consistent rules across those languages regarding their use.
I have used the pattern specifier should be used to specify the schema as shown in the documentation, but I have also seen regex and match used:

**with pattern specifier:**\
https://docs.mongodb.com/manual/reference/operator/query/jsonSchema/

https://docs.mongodb.com/realm/mongodb/enforce-a-document-schema/

**with regex specifier:**\
https://docs.mongodb.com/manual/core/schema-validation/

**with match specifier:**\
https://stackoverflow.com/questions/66383516/add-mongoose-validation-for-phone-numbers

The email regex pattern used comes from:\
https://regexlib.com/Search.aspx?k=email&AspxAutoDetectCookieSupport=1

# Backend JS Design

The backend needs to send the information obtained from the react frontend to the database.  The Mongoose library is used to communicate with the database, while the Express library is used by the backend for the HTTP protocol commands such as GET, POST, and DELETE in order to communicate between the backend server and the frontend client.  The Express library is used to listen for and respond to these commands on the server. 

## Express API

The server listens for HTTP commands such as POST, GET, and DELETE to specific routes.  These commands are received with request data sent by the client Once these commands are received, it can perform a database action, log error messages, and populate a resource to be returned to the client.

The primary difference between GET and POST is that GET sends form values via the URL whereas POST sends them without displaying them in the URL.

```
api/auth/signup POST: adds a new User to the database

api/auth/login POST: retrieves one User from the database

api/product GET: retrieves one Product to be displayed by axios on its
respective product page. This includes the Review item list associated with
that Product. 

api/landingProducts POST: On the landing page, retrieves the list of 6 items
from the Product collection to display on the landing page based on number of
five star reviews

api/similarProducts POST: On a product page, retrieves a list of 3 items from the Product collection based on a category field

api/review POST: Clicking on the Add a Review on the Product page link opens a
dialog that the user can write a review in and adds a submit button so the
user can submit a review to the database.

api/editReview POST: Allows editing the review by clicking the edit button
added to a signed in user's review on the Product page.

api/review DELETE: Clicking on the delete button added to a signed in user's
review on a Product page allows them to delete it from the database.

api/cart POST: Adds a product and product amount to the ProductInCart when
clicking the Add to Cart button on the Product page (note: product page needs
an amount text box added to it to specify the quantity of items being bought).

api/editCart POST: Allows editing the product amount to the ProductInCart when
changing it on the Cart page.

api/cart DELETE: Removes an item from the cart (note: need to add a delete
button to each item on the shopping cart page).
 
```

## Editing vs Adding
I have chosen to make editing a review or product in cart separate from creating them even though I could make them use the same api because then when adding a review or product in a cart it should not be necessary to check for the existence of that review or product in cart beforehand, so this saves time by avoiding that check before adding a new product.  The product already existing is assumed to be an error.  The edit api's, on the other hand, will always check for the product and edit it rather than creating it.  The product not already existing is assumed to be an error, as you shouldn't have the option to edit a nonexistent review or a product that is not already in your cart. 

## Adding the Products to the Database
In a production environment, there would also be an interface for employees to add products and perhaps to assist with user accounts.  Creating an interface that does this is outside the scope for this project, but we should devise an automated way to populate the products database with a sufficient number of products to thoroughly test the shopping database.

One way we can do this be setting up an array of products on the server side that is added to the database as soon as it starts listening.  A comment should mark this as test code which will eventually be moved out to a test that autopopulates the server with a list of products.  

### Security Considerations 

GET should not be used to pass security sensitive values like passwords as it sends the information via the browser URL.  Use POST instead, as shown in the Express API info for api/auth/login above.

## Files
The server/routes folder will contain the files for the Express HTTP protocol commands.  These files should be imported into server/server.js with a require.  The setup of the database tables helps to guide the file organization.

```
in server/routes:

user.js - includes user as well as shopping cart collection GET and POST commands (since shopping cart is part of user)
review.js - includes  review GET, POST, and DELETE commands
product.js - includes product GET command

```

## Security

### Password Hashing 

Password hashing should be performed on the server side to prevent the server from storing plaintext passwords.  This way, if the passwords file on the server is stolen, it cannot be used to authenticate since the hash cannot be entered on the client side to authenticate.  The server side will hash it again and compare it to the hash, which will fail.  This is a standard security system that is very robust.  The security of this system depends on: attacker not being able to change server software, https, and a secure hash algorithm using an off-the-shelf security library.  

The server requirement is why this is done on the server side and not the client side.  The client side is very easy for an attacker to change the code for since it is run on their own computer, but the attacker typically does not have the ability to change the code executing on the server computer systems. 

### Displaying Password

Displaying the password in a url is acceptable in the early stages of development for testing purposes, but this should not be removed once the signin implementation is completed. 

# Frontend Design

The frontend will use the React library to render the webpages.  It will use the Axios library to send HTTP requests such as GET, POST, and DELETE to the corresponding routes and commands set up on the backend.

## Mockups

The following page mockups were designed on Moqups.com:

### The Landing Page
![Landing Page](LandingPage.png "The Landing Page")

After the user signs in, they will be directed back to the landing page, and their username will appear in the menu beside the user icon instead of 'Sign In/Track Order'.  The username should stay be the icon regardless of what page the user navigates to until they sign out.

### The Product Page
![Product Page](ProductPage.png "The Product Page")

### The Cart Page
![Cart Page](CartPage.png "The Cart Page")

The frontend needs to perform the following functions at minimum:
* allow a user to sign up
* allow a user to sign in
* allow a user to see a product description
* allow a user to write a review of a product
* allow a user to add a product to the shopping cart

The frontend needs the following pages:
* landing page
* product page
* shopping cart page
* sign up page
* sign up success page
* login page

## Code Design

The frontend will be designed using React, a popular Node.js library for frontends.

There are many possible approaches in code design in Node.js, as it uses the JavaScript language.  We can stick to a more procedural approach or make it look a little more object oriented.  Either way, the important thing is that the design be consistent throughout. 


# Testing

Testing should use easily produced datasets (small or acquired from a public dataset).  This is in case testing uncovers a need to change the Database schema.  If the database schema is changed, it may invalidate the test set
and require the production of another test set. 

**Automated Testing**\
Automated tests will make testing code faster in the long run, so automated tests will be designed for both the frontend and backend.  For the frontend (client) side, the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) 
and [Selenium](https://www.selenium.dev/) will be used.  The React Testing library is added with the default install of a React application.   Selenium is not added by default but must be installed via npm,
and any browser drivers for browsers to be tested must be added as well.  To install selenium and the browser drivers for chrome and firefox, use the following command:

```
npm install --save selenium-webdriver chromedriver geckodriver
```
The frontend will be tested by the automated tests by reading the contents of the page, entering in test data into text boxes, pressing buttons, and reading the page output to make sure it gives the 
expected information.

For backend tests, the [Mocha](https://github.com/mochajs/mocha) test framework will be used.

**React Testing Library Automated Tests**\
1. Check for page logo on landing page
2. Click the Sign In/Track Order link and check for correct page title
3. Click the Favorites link and check for the correct page title
4. Click the cart link and check for correct page title

**Selenium Automated Tests**\
1. Try to login with an invalid username and password - check for 'that username/password combination does not exist'
2. Try to login with an invalid email (with @ symbol) and password - check for 'that username/password combination does not exist'
3. Try to sign up with invalid email (no @ symbol) - check for @ error message
4. Try to sign up with valid email-check for confirmation
5. Try to login with a valid username and password - check for the username in menu
6. At the sign-up page, sign a user up with valid info.  Check details of user page to make sure that all details match with details entered in at signup.
7. Create a valid user with all valid required information only
8. Create a valid user including all valid optional information
9. Create an invalid user missing a username
10. Create an invalid missing an email
11. Create an invalid user missing a first name
12. Create an invalid user missing a last name
13. Create an invalid user missing a password
14. Create a user with various invalid emails that use incorrect format
15. Create a user with an invalid username less than 5 characters
16. Create a user with an invalid username greater than 35 characters
17. Create a user with an invalid first name less than 2 characters
18. Create a user with an invalid first name greater than 40 characters
19. Create a user with an invalid last name less than 2 characters
20. Create a user with an invalid first name greater than 40 characters
21. Create a user with an invalid company name greater than 100 characters
22. Create a user with an invalid street address of less than 5 characters
23. Create a user with an invalid street address of greater than 150 characters
24. Create a user with an invalid city name of greater than 50 characters
25. Create a user with an invalid phone number 


**Manual Testing**\
Manual testing will be used in the initial phases before automated tests are set up, and to supplement the automated tests for situations that are difficult to test in an automated way.  Testing the backend manually 
can be done with [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).  The tests will check not only that the test returns the expected pass or fail state, but that it returns a useful and unique message. This is intended to help make the frontend easier to debug and to use the messages from the database when appropriate to give the user useful feedback on what the error is, and to make database errors easier to debug.  

Messages should also be tested for security concerns to check that they do not leak sensitive information, either from users or about the website or company as a whole.

**Insomnia/Postman and/or React Interface Tests**
1. At the sign-up page, sign a user up with valid info.  Check details of user page to make sure that all details match with details entered in at signup.
2. Sign up a user with incorrect info.  Make sure useful error message returned.
3. Login with correct username and password
4. Login with incorrect username
5. Login with correct username or incorrect password 



