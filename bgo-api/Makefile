DIST_DIR = ./dist
OUT_DIR = ./out

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

package: package@deps package@getMessage

package@deps:
	mkdir -p $(DIST_DIR)/deps
	cp -R ${OUT_DIR}/src/lib $(DIST_DIR)/deps/
	mkdir -p $(DIST_DIR)/deps/nodejs
	cp package.json $(DIST_DIR)/deps/nodejs/
	cp package-lock.json $(DIST_DIR)/deps/nodejs/
	cd $(DIST_DIR)/deps/nodejs && npm install --omit=dev
	zip -r $(DIST_DIR)/deps.zip $(DIST_DIR)/deps
# mkdir -p dist/layer/nodejs
# cp -R node_modules dist/layer/nodejs/
# cp -R out/src/lib dist/layer/
# cp package.json dist/layer/lib

package@getMessage:
	mkdir -p ${DIST_DIR}/getMessage
	cp -R ${OUT_DIR}/src/services/exampleService/getMessage/* ${DIST_DIR}/getMessage
	zip -r ${DIST_DIR}/getMessage.zip ${DIST_DIR}/getMessage