.PHONY: serve build install

build: install
	pelican --delete-output-directory

serve: install
	pelican --listen --autoreload

install:
	pip install -r requirements.txt
