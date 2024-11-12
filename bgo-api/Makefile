all: all@full

all@full:
	clean install build install package

all@full-ci:
	clean install-ci build install package

clean:
	rm -rf ./node_modules ./out

install:
	npm install

install-ci:
	rm -rf node_modules && \
	npm ci --omit=dev

build:
	npm run build && \
	cp package.json out

package: package@layer

package@layer:
	mkdir -p dist/layer/nodejs
	cp -R node_modules dist/layer/nodejs/
	cp -R out/src/lib dist/layer/
	cp package.json dist/layer/lib

package@example:
	mkdir -p dist/example
	cp -R out/src/services/example/* dist/example