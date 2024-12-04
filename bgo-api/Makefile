DIST_DIR = ./dist
OUT_DIR = ./out/src
SERVICES_DIR = ${OUT_DIR}/services

# list of the functions to be packaged by the @package recipe (space separated)
PACKAGE_FUNCTIONS = exampleService/getMessage exampleService/randomWord event/readEvent


all: clean install build package

all-ci: clean install build install-ci package

clean:
	@echo "Cleaning up..."
	rm -rf ./out ${DIST_DIR}

clean-full:
	@echo "Performing full cleanup..."
	rm -rf ./node_modules ${OUT_DIR} ${DIST_DIR}


install:
	@echo "Installing dependencies..."
	npm install

install-ci:
	@echo "Installing dependencies for CI..."
	rm -rf node_modules && \
	npm ci --omit=dev

build:
	@echo "Building the project..."
	npm run build

package: package@deps package@functions

package@deps:
	
	mkdir -p $(DIST_DIR)/deps/nodejs/
	cp package.json $(DIST_DIR)/deps/nodejs/
	cp package-lock.json $(DIST_DIR)/deps/nodejs/
	cp ./src/lib/package.json $(OUT_DIR)/lib/
	cd $(DIST_DIR)/deps/nodejs/ && npm install --omit=dev
	cd $(DIST_DIR)/deps/nodejs/ && npm install $(CURDIR)/$(OUT_DIR)/lib --omit=dev --save lib
	mkdir -p $(DIST_DIR)/deps
	cd $(DIST_DIR)/deps && zip -r -q ../deps.zip *

package@functions:
	@for FUNCTION_PATH in $(PACKAGE_FUNCTIONS); do \
		cd $(CURDIR) && \
		echo "Current Directory" $$PWD; \
		SERVICE_NAME=$$(echo $$FUNCTION_PATH | cut -d'/' -f1); \
		FUNCTION_NAME=$$(echo $$FUNCTION_PATH | cut -d'/' -f2); \
		echo "Packaging function" $$FUNCTION_NAME "from service" $$SERVICE_NAME; \
		DIST_FUNCTION_DIR=$(DIST_DIR)/$$FUNCTION_PATH && \
		DIST_SERVICE_DIR=$(DIST_DIR)/$$SERVICE_NAME && \
		echo "Dist service dir" $$DIST_SERVICE_DIR; \
		mkdir -p $$DIST_FUNCTION_DIR && \
		cp package.json $$DIST_FUNCTION_DIR; \
		echo "Dist function dir" $$DIST_FUNCTION_DIR; \
		cp -R $(SERVICES_DIR)/$$FUNCTION_PATH/* $$DIST_FUNCTION_DIR; \
		cd $$DIST_FUNCTION_DIR && zip -r ../$$FUNCTION_NAME.zip *; \
	done