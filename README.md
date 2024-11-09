# 153957

[![License](https://img.shields.io/github/license/153957/153957)](https://github.com/153957/153957/blob/main/LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/153957/153957/tests.yml?branch=main)](https://github.com/153957/153957/actions)

This is the source code for my personal website:
[153957 Photography](https://arne.delaat.net)

This showcases my photography and time-lapse.


## Setup

Create a new virtual environment with Python 3.13:

    conda create -n website python=3.13 --yes

or 

    python3.13 -m venv <venv>
    source <venv>/bin/activate

And install the requirements:

    make install


## Make website

Activate the virtual env and run:

    make build

The built website should then be in the `.build` directory.


## Developing

Use the following command to locally test the site (http://localhost:8000),
with automatic rebuilds when making changes:

    make serve


## Using Docker

To use Docker to build and develop use these commands, to serve the
development server:

    docker compose up -d

And to build the site:

    docker compose -f docker-compose.build.yml up
