# Shopping Interface Design Decisions

This shopping interface will be designed for US users only.  This will limit the possibilities we need to validate in the schema for address and phone number, as
well as reduce the frontend design needs.

# Shopping DB Collections

## Schemas

The core of the schema describe the documents User, Product, and Review.  The ProductInCart schema is used in a subdocument array in the shopping cart:

![The documents User, Product, and Review with associated fields](basicDBPlan.png "The Basic Schema Plan")


```
ProductInCart{ 
	
	properties: {
		product_id: {
			type: Number
		}
		amt: {
			type: Number		
		}						
	}
}

User
{
	email: {
		type: String,
		required: [true, 'email field is required'],
		unique: true,
		pattern: ^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$
	}
	username: {
		type: String,
		required: [true, 'username is required'],
		unique: true,
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
				required: [true, 'street address field is required'],
				minLength: 5,
				maxLength: 150
			}
			apt_number {
				type: String,
				required: [true, 'apartment number field is required'],
			}
			city {
				type: String,
				required: [true, 'city field is required'],
				maxLength: 50
			}
			state: {
				type: String,
				required: [true, 'apartment number field is required'],
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
		type: [ProductInCart]		
	}
	review_ids: {
		type: [Number],
	}
}


Product
{
	product_id: {
		type: Number,
		required: [true, 'product_id field is required'],
		unique: true,
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
	review_ids: { 
		type: [Number]
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
		unique: true,
	}
	username {
		type: String,
		required: [true, 'username is required'],
		unique: true,
		minLength: 5,
		maxLength: 35,
	}
	product_id {
		type: Number,
		required: [true, 'product_id field is required'],
		unique: true,
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

### Justification for Data Validation

Data validation takes time and thus should be justified in any NoSQL Database.  There are a number of reasons to validate fields in an application like a shopping interface that will require storing large amounts of data.  We
wish to prevent data from being accidentally entered with missing fields that will prevent it from being found or displayed correctly.  We want to prevent accidental data entry of obviously invalid data (eg. forgetting an '@'
symbol in an email).  From this standpoint, the necessity of data integrity for a commercial application far outweighs the convenience and speed of keeping all fields unspecified. For this reason, this shopping example will
use a schema designed to validate all necessary fields.  

### Balancing Avoiding Unnecessary Duplication of Data with Speed

The justification of using a NoSQL Database is its ability for its more flexible features to increase speed of data input and retrieval over SQL Databases.  However, unnecessary data duplication can negatively impact speed 
by increading document size, which increases the time taken to retrieve the corresponding document.  It can also increase the possibility of introducing errors.  To this end, this schema balances these two needs by using a 
list of review_ids nested inside each User and Product document. The id list speeds the retrieval of the data while preventing unnecessary data in the Review Collection, such as the body of the review, from being duplicated 
in the User and Product collections.

### ID Retrieval Patterns

Since will be retrieving the reviews only after looking at a customer or product id, we technically do not need to store those in the review itself.  However, when retrireving a Review document, we will need to retrieve 
both the review information and the information of the other document type.  For example, if we retrieve a review for a customer, we will also need to retrieve its corresponding product, and if we retrieve a review for a product, 
we will also need to retrieve information about its corresponding customer.  To resolve this without needing the review items themselves to have the extra ids, we could store the corresponding review\_id's and product\_id's together 
in the User document, and the corresponding review\_id's and usernames in the Product document.  However, since doing this could nearly double the size of Users and Product documents with many associated reviews with little to 
no increase in retrieval speed, I do not believe this to be a good design choice.  Therefore I have instead placed both the associated product_id and username in the Review schema itself to avoid the space costs of the 
alternative design choice.

### User Schema Notes

The phone number should be a string so that we can specifiy a reqex.  We will store it with the dashes, unlike how we would if an SQL database were being used, as this saves a few formatting operations at retrieval time 
at the expense of increasing space requirements, which is keeping in the philosophy of using a NoSQL database. The frontend should automatically insert the dashes for the user in the interface and when submitting to the 
backend so they don't have to enter them.

The image path stores the path to the image on the server, which will be added to the img tags in the html coded in the React frontend.

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

The most sensitive information here is the password, as obtaining it allows a malicious party to acces their account and impersonate the user, as well as obtain sensitive information regarding the user.
However, the other information is still sensitive and should not be displayed publicly.  We should do tests to check whether malicious attacks can expose any of this information.

The shopping cart inside the User uses an array of the subdocument declared earlier called ProductInCart.  Product in cart has a product_id corresponding to the name of a product, and an amt corresponding to the
number of items bought of that type. 

### Data Type References

https://docs.mongodb.com/realm/mongodb/document-schemas/\

https://www.mongodb.com/developer/quickstart/bson-data-types-decimal128/\

https://mongoosejs.com/docs/schematypes.html#arrays\

### Matching Using Regex

RegEx is short for regular expression.  Regular expressions are available in many languages to match on a pattern, and have consistent rules across those languages regarding their use.
I have used the pattern specifier should be used to specify the schema as shown in the documentation, but I have also seen regex and match used:

**with pattern specifier:**\
https://docs.mongodb.com/manual/reference/operator/query/jsonSchema/\
https://docs.mongodb.com/realm/mongodb/enforce-a-document-schema/\

**with regex specifier:**\
https://docs.mongodb.com/manual/core/schema-validation/\

**with match specifier:**\
https://stackoverflow.com/questions/66383516/add-mongoose-validation-for-phone-numbers\

The email regex pattern used comes from:\
https://regexlib.com/Search.aspx?k=email&AspxAutoDetectCookieSupport=1\

### Testing

Testing should use easily produced datasets (small or acquired from a public dataset).  This is in case testing uncovers a need to change the Database schema.  If the database schema is changed, it may invalidate the test set
and require the production of another test set. 
