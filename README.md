153957
======

[![GPLv3](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://github.com/153957/153957/blob/master/LICENSE)
[![Travis Status](http://img.shields.io/travis/153957/153957/master.svg)](https://travis-ci.org/153957/153957)

My personal website: [153957 Photography](http://arne.delaat.net)


Installation
------------


Node
----

Install nvm and yarn:

    brew install nvm yarn

Follow the instructions to update your `.bash_profile`, adding:

    export NVM_DIR="$HOME/.nvm"
    . "/usr/local/opt/nvm/nvm.sh"

Then install the correct node version:

    nvm install

It can now be activated using:

    nvm use


Make website
------------

Open a terminal in this directory and run 

    cactus build

The built website should then be in the `.build` directory.
