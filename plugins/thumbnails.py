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

Install glue::

    pip install glue

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

    glue_command = (
        'glue --cachebuster --namespace= --sprite-namespace= --retina '
        '--css-template {css} --project {img_src} --img {img_dest} --css {css_dest}'
        .format(css=TEMPLATE_PATH, img_src=SRC_PATH, img_dest=IMG_PATH, css_dest=CSS_PATH)
    )

    subprocess.check_call(glue_command, shell=True)

    setattr(site, KEY, currChecksum)
