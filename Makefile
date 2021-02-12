.PHONY: serve build install

build: install
	rm -rf .build
	pelican

serve: install
	pelican --listen --autoreload

install:
	pip install --upgrade --upgrade-strategy=eager -r requirements.txt
