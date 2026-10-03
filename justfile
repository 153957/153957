[parallel]
test: lint typingtest

lint:
    uv run ruff check .
    uv run ruff format --check .

lintfix:
    uv run ruff check --fix-only .
    uv run ruff format .
    uv run ruff check --fix-only .
    uv run ruff format .

typingtest:
    uv run ty check --no-progress .

clean:
    rm -rf .build

build: clean
    uv run pelican

serve: clean
    uv run pelican --listen --autoreload --bind 0.0.0.0
