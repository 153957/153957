.PHONY: devinstall
devinstall:
	pip install --upgrade pip
	pip install --upgrade --upgrade-strategy eager -r requirements.txt -r requirements-dev.txt

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
build: clean
	pelican

.PHONY: serve
serve: clean
	pelican --listen --autoreload
