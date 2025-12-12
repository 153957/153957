.PHONY: test
test: rufftest typingtest

.PHONY: rufftest
rufftest:
	uv run ruff check .
	uv run ruff format --check .

.PHONY: typingtest
typingtest:
	uv run ty check

.PHONY: clean
clean:
	rm -rf .build

.PHONY: build
build: clean
	uv run pelican

.PHONY: serve
serve: clean
	uv run pelican --listen --autoreload
