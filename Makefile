.PHONY: devinstall
devinstall:
	pip install --upgrade pip
	pip install --upgrade --upgrade-strategy eager -r requirements-dev.txt

.PHONY: install
install:
	pip install --upgrade pip
	pip install --upgrade --upgrade-strategy eager -r requirements.txt

.PHONY: linttest
linttest:
	ruff .

.PHONY: clean
clean:
	rm -rf .build

.PHONY: build
build: clean install
	pelican

.PHONY: serve
serve: clean install devinstall
	pelican --listen --autoreload
