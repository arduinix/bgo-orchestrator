DIST_DIR = ./dist
OUT_DIR = ./out/src
SERVICES_DIR = ${OUT_DIR}/services

# list of the functions to be packaged by the @package recipe (space separated)
PACKAGE_FUNCTIONS = exampleService/getMessage


all: clean install build package

all-ci: clean install build install-ci package

clean:
	@echo "Cleaning up..."
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
	mkdir -p $(DIST_DIR)/deps
	cp -R ${OUT_DIR}/lib $(DIST_DIR)/deps/
	mkdir -p $(DIST_DIR)/deps/nodejs
	cp package.json $(DIST_DIR)/deps/nodejs/
	cp package-lock.json $(DIST_DIR)/deps/nodejs/
	cd $(DIST_DIR)/deps/nodejs && npm install --omit=dev
# zip -r $(DIST_DIR)/deps.zip $(DIST_DIR)/deps



package@functions:
	@for FUNCTION_PATH in $(PACKAGE_FUNCTIONS); do \
		DIST_FUNCTION_DIR=$(DIST_DIR)/$$FUNCTION_PATH && \
		mkdir -p $$DIST_FUNCTION_DIR && \
		cp -R $(SERVICES_DIR)/$$FUNCTION_PATH/* $$DIST_FUNCTION_DIR; \
	done

# zip -r $$DIST_FUNCTION_DIR.zip $$DIST_FUNCTION_DIR; \