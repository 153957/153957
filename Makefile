.PHONY: devinstall
devinstall:
	pip install --upgrade pip
	pip install --upgrade --upgrade-strategy eager -r requirements.txt -r requirements-dev.txt

.PHONY: install
install:
	pip install --upgrade pip
	pip install --upgrade --upgrade-strategy eager -r requirements.txt

.PHONY: flaketest
flaketest:
	flake8

.PHONY: build
build:
	rm -rf .build
	pelican

.PHONY: serve
serve:
	pelican --listen --autoreload
