153957
======

[![GPLv3](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://github.com/153957/153957/blob/master/LICENSE)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/153957/153957/Build%20site%20and%20check%20output?label=workflow%20&logo=github)](https://github.com/153957/153957/actions)

My personal website: [153957 Photography](https://arne.delaat.net)


Installation
------------

Python
------

Create a new virtual env with Python 3.7 and install the requirements:

    conda create -n website python=3.7 --yes
    pip install -r requirements.txt


Make website
------------

Activate the virtual env and run:

    pelican

The built website should then be in the `.build` directory.


Developing
----------

Use the following command to locally test the site (localhost:8000),
with automatic rebuilds when making changes:

    pelican --listen --autoreload
