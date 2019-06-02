import glob
import hashlib
import os
import shlex
import shutil
import subprocess
import sys

import glue.bin

"""
This plugin uses glue to sprite images:
http://glue.readthedocs.org/en/latest/quickstart.html

Install glue::

    pip install glue

"""

BASE_DIR = os.path.join(os.path.dirname(__file__), '..')
TEMPLATE_PATH = os.path.join(BASE_DIR, 'plugins/thumbnails_template.css')
SRC_PATH = os.path.join(BASE_DIR, 'static/images_timelapse_src')
IMG_PATH = os.path.join(BASE_DIR, 'static/images_timelapse/thumbs')
CSS_PATH = os.path.join(BASE_DIR, 'static/css/thumbs')
CHECKSUM_PATH = os.path.join(SRC_PATH, '.previous_checksum')


def checksum():
    hash = hashlib.sha512(open(TEMPLATE_PATH, 'rb').read())
    src_files = glob.glob(os.path.join(SRC_PATH, '*', '*.png'))
    for src_file in src_files:
        hash.update(src_file.encode('utf-8') + open(src_file, 'rb').read())
    return hash.hexdigest()


def preBuild(site):
    """Build thumbnail sprites and css

    First check if they need to be updated.
    If so, use glue to create the new sprites and css.

    """
    try:
        previous_checksum = open(CHECKSUM_PATH).read()
    except FileNotFoundError:
        previous_checksum = None
    current_checksum = checksum()

    # Don't run if none of the images nor the template has changed
    if current_checksum == previous_checksum:
        print('No changes detected to thumbnails')
        return
    else:
        print('(Re)building thumbnails')

    # Clean old output
    if os.path.isdir(CSS_PATH):
        shutil.rmtree(CSS_PATH)

    # Ensure that this directory exist
    os.mkdir(CSS_PATH)

    glue.bin.main((
        '',
        '--cachebuster',
        '--namespace', '',
        '--sprite-namespace', '',
        '--retina',
        '--css-template', TEMPLATE_PATH,
        '--project', SRC_PATH,
        '--img', IMG_PATH,
        '--css', CSS_PATH,
    ))

    with open(CHECKSUM_PATH, 'w') as checksum_file:
        checksum_file.write(current_checksum)
