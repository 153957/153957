.PHONY: serve build install

build: install
	rm -rf .build
	pelican

serve: install
	pelican --listen --autoreload

install:
	pip install -r requirements.txt
