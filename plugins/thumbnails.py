"""
This plugin uses glue to sprite images:
http://glue.readthedocs.org/en/latest/quickstart.html

Install glue::

    pip install glue

"""
import hashlib
import logging
import shutil

import glue.bin

from pelican import signals

logger = logging.getLogger(__name__)

SETTINGS_NAME = 'THUMBNAIL_PATHS'


def checksum(settings):
    """Calculate checksum over files involved in the generation of the sprites

    - css template
    - source images
    - source image filenames

    """
    hash = hashlib.sha512(settings['TEMPLATE'].read_bytes())
    src_files = settings['SRC'].glob('*/*.png')
    for src_file in src_files:
        hash.update(str(src_file).encode('utf-8') + src_file.read_bytes())
    return hash.hexdigest()


def generate_sprites(pelican):
    """Build thumbnail sprites and css

    First check if they need to be updated.
    If so, use glue to create the new sprites and css.

    """
    settings = pelican.settings.get(SETTINGS_NAME)
    try:
        previous_checksum = settings['CHECKSUM'].read_text()
    except FileNotFoundError:
        previous_checksum = None
    current_checksum = checksum(settings)

    # Don't run if none of the images nor the template has changed
    if current_checksum == previous_checksum:
        logger.debug('No changes detected to thumbnails')
        return
    else:
        logger.info('(Re)building thumbnails')

    # Clean old output
    if settings['CSS'].is_dir():
        logger.debug('Removing old output at %s', settings['CSS'])
        shutil.rmtree(settings['CSS'])

    # Ensure that this directory exist
    settings['CSS'].mkdir()

    glue.bin.main((
        '',
        '--cachebuster',
        '--namespace', '',
        '--sprite-namespace', '',
        '--retina',
        '--css-template', str(settings['TEMPLATE']),
        '--project', str(settings['SRC']),
        '--img', str(settings['IMG']),
        '--css', str(settings['CSS']),
    ))

    settings['CHECKSUM'].write_text(current_checksum)


def register():
    signals.finalized.connect(generate_sprites)
