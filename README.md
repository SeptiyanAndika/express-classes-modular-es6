A simple boilerplate application for building Web or Restfull (monolith or microserices archietcture) in Node.js using express and in ES6 using classes and modular


# Getting Started
Clone the repo:

	git clone https://github.com/SeptiyanAndika/express-classes-modular-es6.git
	cd express-classes-modular-es6

Install dependencies:

	npm install

Start server:
	
	# start all module/services
	npm start
	npm run start

	# start single module/services
	# config module load in package.jso `-m sample`
	npm run start-single

	# start multiple module/services
	# config module load in package.jso `-m sample,sample2`
	npm run start-single

API docs:

	http://localhost:3000/api-docs/

config file:

	config/config.js