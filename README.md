# Stock Proof 

### Author
Patrick Eaton

### About
Do you play the stock market? Do you want to let people know about your successful stocks or warn others of stocks to avoid? Well then stockproof is for you! Stockproof allows you to create and test stocks using the piotroski f-score to determine if the stock is worth pursuing, if the stock runs well on the f-score then track your stock to see if the screening valued it correctly!


### Technology Used
Cloudinary, CORS, Postgress SQL, Python-Flask, React & Sqlite

### User Story
User can register

User can log in

User registers, then is taken back to home page (or user logs in and is taken to their user page?)

User clicks add stock (this now appears in the nav bar, it didn’t before b/c you weren’t registered/logged in)

User taken to add stock page/add stock module

User can add info for stock (stock model fields)

User created stock now displays on portfolio (and stock show page, or can add it to stock show page from user stock show page)

User can edit(then update), delete or upload to porfolio via buttons

User clicks on piotroski tab to test stock

User can then enter the stock info and run it in the piotroski f-score stock screen to see how their stock will fair

User can edit(the update), delete the stocks that they screen

User can click on Track a stock tab, taken to tracking page

User can search a stock, graph with most recent live data populates below search bar

User can add a stock to their portfolio

User can edit(then update) or delete their profile (user can also create a profile photo & bio)

User can logout of their account (still view the stock just created, but also cannot edit it since they are not the user that created it)

# Models 
### User
	email = CharField(unique=True)
	username = CharField(unique=True)
	password = CharField()
	bio = TextField()

### Stock
	company_name = CharField()
	stock_open = IntegerField()
	stock_high = IntegerField()
	stock_low = IntegerField()
	previous_close = IntegerField()
	volume = IntegerField()	
	poster = ForeignKeyField(User, backref='stocks') 
	date_posted = DateTimeField(default=datetime.datetime.now)

## Piotroski F-Score Screen:  
	return_on_assets = IntegerField() 
	cash_flow_from_operations = IntegerField() 
	direction_of_return_of_assets = IntegerField() 
	accrual_accounting_check = IntegerField() 
	direction_of_leverage = IntegerField() 
	direction_of_liquidity = IntegerField()  
	issue_stock = IntegerField()  	
	direction_of_margin = IntegerField()  
	direction_of_asset_turnover = IntegerField()
	poster = ForeignKeyField(User, backref='screens') 
	date_posted = DateTimeField(default=datetime.datetime.now)



# Wireframes
![alt text](https://i.imgur.com/mMxSYgl.jpg)
![alt text](https://i.imgur.com/CXB1nBc.jpg)
![alt text](https://i.imgur.com/XVIPytG.jpg)


# Stretch Goals
Users can upload a profile picture

Users can rate other stocks

Users can like other stocks

Stocks update using live data

# How to start app:
1) This app uses two different repositories for the front-end and the back-end, make sure to run flask api first

2) With flask api running, clone this repo in the terminal, in the cloned repo in the terminal run npm install, once installed run npm start 


