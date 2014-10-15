import os
import sys
import pipes
import shutil
import subprocess
import hashlib

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

TEMPLATE_PATH = 'plugins/thumbnails_template.css'
SRC_PATH = 'static/images_timelapse_src'
IMG_PATH = 'static/images_timelapse/thumbs'
CSS_PATH = 'static/css/thumbs'

KEY = '_PREV_CHECKSUM'


def checksum(path):
    command = 'tar -cf - %s' % pipes.quote(path)
    file_data = subprocess.check_output(command, shell=True)
    return hashlib.sha512(file_data).hexdigest()


def preBuild(site):
    """Build thumbnail sprites and css

    First check if they need to be updated.
    If so, use glue to create the new sprites and css.

    """
    currChecksum = checksum(SRC_PATH)
    prevChecksum = getattr(site, KEY, None)

    # Don't run if none of the images has changed
    if currChecksum == prevChecksum:
        return

    if os.path.isdir(CSS_PATH):
        shutil.rmtree(CSS_PATH)

    # Ensure that this directory exist
    os.mkdir(CSS_PATH)

    os.system('glue --cachebuster --namespace= --sprite-namespace= --retina '
              '--css-template %s --project %s --img %s --css %s' %
              (TEMPLATE_PATH, SRC_PATH, IMG_PATH, CSS_PATH))

    setattr(site, KEY, currChecksum)
