import glob
import hashlib
import os
import shlex
import shutil
import subprocess
import sys

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
CHECKSUM_PATH = os.path.join(SRC_PATH, '.previous_checksum')


def checksum():
    hash = hashlib.sha512(open(TEMPLATE_PATH, 'rb').read())
    src_files = glob.glob(os.path.join(SRC_PATH, '*', '*.png'))
    for src_file in src_files:
        hash.update(open(src_file, 'rb').read())
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
        return

    # Clean old output
    if os.path.isdir(CSS_PATH):
        shutil.rmtree(CSS_PATH)

    # Ensure that this directory exist
    os.mkdir(CSS_PATH)

    glue_command = (
        'glue --cachebuster --namespace= --sprite-namespace= --retina '
        '--css-template {css} --project {img_src} --img {img_dest} --css {css_dest}'
        .format(
            css=shlex.quote(TEMPLATE_PATH), img_src=shlex.quote(SRC_PATH),
            img_dest=shlex.quote(IMG_PATH), css_dest=shlex.quote(CSS_PATH)
        )
    )

    subprocess.check_call(glue_command, shell=True)

    with open(CHECKSUM_PATH, 'w') as checksum_file:
        checksum_file.write(current_checksum)
