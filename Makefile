.PHONY: mypyinstall
mypyinstall:
	pip install --upgrade pip
	pip install --upgrade --upgrade-strategy eager -r requirements-mypy.txt

.PHONY: ruffinstall
ruffinstall:
	pip install --upgrade pip
	pip install --upgrade --upgrade-strategy eager -r requirements-ruff.txt

.PHONY: install
install:
	pip install --upgrade pip
	pip install --upgrade --upgrade-strategy eager -r requirements.txt

.PHONY: mypytest
mypytest:
	mypy .

.PHONY: rufftest
rufftest:
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
