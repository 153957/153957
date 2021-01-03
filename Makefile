.PHONY: serve build install

build: install
	pelican

serve: install
	pelican --listen --autoreload

install:
	pip install -r requirements.txt
