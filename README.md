A simple boilerplate application for building Web or Restfull (monolith or microserices archietcture) in Node.js using express and in ES6 using classes and modular


# Getting Started
Clone the repo:

	git clone https://github.com/SeptiyanAndika/express-classes-modular-es6.git
	cd express-classes-modular-es6

Install dependencies:

	npm install

Start server:
	
	# start all module/services
	node server.js

	# start single module/services
	# config loaded module in package.json `-m sample`
	node server.js -m user

	# start multiple module/services
	# config loaded module in package.json `-m sample,sample2`
	node server.js -m user,sample2`

API docs:

	http://localhost:3000/api-docs/

config file:

	config/config.js