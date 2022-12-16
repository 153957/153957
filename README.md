# 153957

[![License](https://img.shields.io/github/license/153957/153957)](https://github.com/153957/153957/blob/main/LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/153957/153957/tests.yml?branch=main)](https://github.com/153957/153957/actions)

This is the source code for my personal website:
[153957 Photography](https://arne.delaat.net)

This showcases my photography and time-lapse.


## Setup

Create a new virtual env with Python 3.11 and install the requirements:

    conda create -n website python=3.11 --yes
    pip install -r requirements.txt


## Make website

Activate the virtual env and run:

    make build

The built website should then be in the `.build` directory.


## Developing

Use the following command to locally test the site (http://localhost:8000),
with automatic rebuilds when making changes:

    make serve
