import os
import sys
import pipes
import shutil
import subprocess

import glue

"""
This plugin uses glue to sprite images:
http://glue.readthedocs.org/en/latest/quickstart.html

Install:

(Only if you want to sprite jpg too)
brew install libjpeg

(Only if you want to optimize pngs with optipng)
brew install optipng

sudo easy_install pip
sudo pip uninstall pil
sudo pip install pil
sudo pip install glue
"""

TEMPLATE_PATH = '/Users/arne/Dropbox/Code/153957/plugins/thumbnails_template.css'
SRC_PATH = 'static/images_timelapse_src'
IMG_PATH = 'static/images_timelapse'
CSS_PATH = 'static/css/thumbs'

KEY = '_PREV_CHECKSUM'


def checksum(path):
    command = 'md5 `find %s -type f`' % pipes.quote(IMG_PATH)
    return subprocess.check_output(command, shell=True)


def preBuild(site):
    """Build thumbnail sprites and css

    First check if they need to be updated.
    If so, use glue to create the new sprites and css.

    """
    currChecksum = checksum(IMG_PATH)
    prevChecksum = getattr(site, KEY, None)

    # Don't run if none of the images has changed
    if currChecksum == prevChecksum:
        return

    if os.path.isdir(CSS_PATH):
        shutil.rmtree(CSS_PATH)

    os.mkdir(CSS_PATH)
    os.system('glue --cachebuster --namespace= --sprite-namespace= --retina '
              '--css-template %s --project %s --img %s --css %s' %
              (TEMPLATE_PATH, SRC_PATH, IMG_PATH, CSS_PATH))

    setattr(site, KEY, currChecksum)
