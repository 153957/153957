.PHONY: mypyinstall
mypyinstall:
	pip install --upgrade -r requirements-mypy.txt

.PHONY: ruffinstall
ruffinstall:
	pip install --upgrade -r requirements-ruff.txt

.PHONY: install
install:
	uv pip install --upgrade -r requirements.txt

.PHONY: test
test: rufftest typingtest

.PHONY: rufftest
rufftest:
	ruff check .
	ruff format --check .

.PHONY: typingtest
typingtest:
	mypy .

.PHONY: clean
clean:
	rm -rf .build

.PHONY: build
build: clean install
	pelican

.PHONY: serve
serve: clean install ruffinstall mypyinstall
	pelican --listen --autoreload

# The following is to be used in GitHub Actions

.PHONY: setupvenv
setupvenv:
	uv venv --python 3.13
	. .venv/bin/activate
	echo PATH=$PATH >> $GITHUB_ENV
