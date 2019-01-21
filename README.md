153957
======

[![GPLv3](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://github.com/153957/153957/blob/master/LICENSE)
[![Travis Status](http://img.shields.io/travis/153957/153957/master.svg)](https://travis-ci.org/153957/153957)

My personal website: [153957 Photography](https://arne.delaat.net)


Installation
------------

Python
------

Create a new virtual env with Python 3.6 and install the requirements:

    conda create -n website python=3.6 --yes
    pip install cactus
    pip install glue


Node
----

Install nvm and yarn:

    brew install nvm yarn

Follow the instructions to update your `.bash_profile`, adding:

    export NVM_DIR="$HOME/.nvm"
    . "/usr/local/opt/nvm/nvm.sh"

Then install the correct node version, activate the installed node
version and install the requirements:

    nvm install
    nvm use
    yarn


Make website
------------

Open a terminal in this directory and activate the virtual env and node version then run:

    source activate website
    nvm use
    cactus build

The built website should then be in the `.build` directory.


Developing
----------

Use the following command to locally test the site, with automatic
builds and browser refresh.

    source activate website
    nvm use
    cactus serve

**Note**: This requires a more recent version of Cactus than v3.3.3.
