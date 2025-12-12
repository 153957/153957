# 153957

[![License](https://img.shields.io/github/license/153957/153957)](https://github.com/153957/153957/blob/main/LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/153957/153957/tests.yml?branch=main)](https://github.com/153957/153957/actions)

This is the source code for my personal website:
[153957 Photography](https://arne.delaat.net)

This showcases my photography and time-lapse.


## Setup

Clone this repository and ensure `uv` is installed.

## Make website

To build the website use:

    make build

The built website should then be in the `.build` directory.


## Developing

Use the following target to locally test the site (http://localhost:8000),
with automatic rebuilds when making changes:

    make serve


## Using Docker

To use Docker to build and develop use these commands, to serve the
development server:

    docker compose up -d

And to build the site:

    docker compose -f compose.build.yaml up
