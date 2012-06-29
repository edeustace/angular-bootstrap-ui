JS_SRC_FILES = $(shell find modules -type f -path '*/src/*.js')
JS_TEST_FILES = $(shell find modules -type f -path '*/test/*.js')
COFFEE_FILES = $(shell find . -type f -name '*.coffee')

all: build

coffee:
	coffee -c ${COFFEE_FILES}

js: coffee
	cat common/**/*.js ${JS_SRC_FILES} > build/angular-bootstrap-ui.js
	uglifyjs -o build/angular-bootstrap-ui.min.js --no-mangle --no-squeeze build/angular-bootstrap-ui.js
	
css:
	lessc common/stylesheets/angular-bootstrap-ui.less build/angular-bootstrap-ui.css
	lessc common/stylesheets/angular-bootstrap-ui.less build/angular-bootstrap-ui.min.css -compress
		
build: js css

test: build
	testacular-run

.PHONY: all coffee js css build