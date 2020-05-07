# Stock Proof 

### Author
Patrick Eaton

### About
Do you play the stock market? Do you want to let people know about your successful stocks or warn others of stocks to avoid? Well then stockproof is for you! stockproof allows you to create and test stocks using the piotroski f-score to determine if the stock is worth pursuing, if the stock runs well on the f-score then upload it to the stock show page for other users to see!


### Technology Used
Cloudinary, CORS, Postgress SQL, Python-Flask, React & Sqlite

### User Story
User can register

User can log in

User registers, then is taken back to home page (or user logs in and is taken to their user page?)

User clicks add stock (this now appears in the nav bar, it didn’t before b/c you weren’t registered/logged in)

User taken to add stock page/add stock module

User can add info for stock (stock model fields)

User created stock now displays on user page (and stock show page, or can add it to stock show page from user stock show page)

User can edit(then update), delete or upload to stock show page via buttons

User clicks on piotroski tab to test stock

User can then enter the stock info and run it in the piotroski f-score stock screen to see how their stock will fair

User can edit(the update), delete the stocks that they screen

User can edit(then update) or delete their profile (user can also create a profile photo & bio)

User can logout of their account (still view the stock just created, but also cannot edit it since they are not the user that created it)

# Models 
### User
	email = CharField(unique=True)
	username = CharField(unique=True)
	password = CharField()
	bio = TextField()

### Stock
	company_name = CharField() - name of company
	bad_management = CharField() – stable management,  low turnover mid/high positions
	balance_sheet = CharField() – assets, liabilities, net worth calculation	
	enterprise_life_cycle = TextField() – development, reinvestment for success		
	economic_moat = TextField() – competitive advantages	
	dividend_paying_stock = CharField() – business compounds wealth over time	
	earnings_stability = CharField() –  yes/no -- lowers chance of forecasting errors and risk	
	operating_efficiency = IntegerField() – Return on Assets = net income/assets
	creator = ForeignKeyField(User, backref=’stocks’) – cites the author of the stock
	date_posted = date(default=date.time.datetime.now) – time stock posted

## Piotroski F-Score Screen:  
Used to determines value of stock

Uses a binary pass/fail system 

Scored on a scale of 0 - 9

### Profitability: (4 points)
	return_on_asset =: IntegerField() 
	cash_flow_from_operations = IntegerField() 
	direction_of_return_on_assets = IntegerField() 
	accrual_accounting_check = IntegerField() 

### CapitalStructure: (3 points)
	direction_of_leverage = IntegerField() 
	direction_of_liquidity = IntegerField()  
	issue_stock = IntegerField()  	
	
### OperatingEfficiency: (2 points)
	direction_of_margin = IntegerField()  
	direction_of_asset_turnover = IntegerField()

# Stretch Goals
Users can upload a profile picture

Users can rate other stocks

Users can like other stocks

Stocks update using live data

# How to start app:
st enter python3 app.py in the new folder to run the app


