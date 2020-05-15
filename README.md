# Stock Proof 

### Author
Patrick Eaton

### About
Do you play the stock market? Do you want to let people know about your successful stocks or warn others of stocks to avoid? Well then stockproof is for you! Stockproof allows you to track certain stocks and add them to a portfolio for further study!


### Technology Used
CORS, Postgress SQL, Python-Flask, React & Sqlite

### User Story
User can register

User can log in

User registers, then is taken back to home page (or user logs in and is taken to their user page?)

User created stock now displays on portfolio (and stock show page, or can add it to stock show page from user stock show page)

User can edit(then update), delete or upload stock to porfolio via buttons

User can search a stock, graph with most recent live data populates below search bar

User can add a stock to their portfolio

User can edit(then update) or delete their profile (user can also create a bio)

User can logout of their account (still view the stock just created, but also cannot edit it since they are not the user that created it)

# Models 
### User
	email = CharField(unique=True)
	username = CharField(unique=True)
	password = CharField()
	bio = TextField()

### Stock
	symbol = CharField()
	name = CharField()	
	user = ForeignKeyField(User, backref='stocks', on_delete="CASCADE") 
	date_added = DateTimeField(default=datetime.datetime.now)





# Wireframes
![alt text](https://i.imgur.com/mMxSYgl.jpg)
![alt text](https://i.imgur.com/CXB1nBc.jpg)
![alt text](https://i.imgur.com/XVIPytG.jpg)


# Stretch Goals
Piotroski F-Score Screens stocks for value

Users can upload a profile picture

Users can like other stocks

Stocks update using live data

# How to start app:
1) This app uses two different repositories for the front-end and the back-end, make sure to run flask api first

2) With flask api running, clone this repo in the terminal, in the cloned repo in the terminal run npm install, once installed run npm start 


