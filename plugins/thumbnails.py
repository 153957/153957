"""thumbnails

This plugin creates half size versions of images in specified path.

The setting THUMBNAIL_PATHS can be a list of pathlib.Paths, each will be
recursively searched for images with names ending in `@2x`. Each of those
images will be resized by 50% and stored next to the original in the
same format, but without the `@2x` suffix.

"""

from multiprocessing import Pool
from pathlib import Path

from PIL import Image

from pelican import Pelican, signals

SETTINGS_NAME = 'THUMBNAIL_PATHS'


def create_thumbnail(image_path: Path) -> None:
    """Create half size (halved width and height) thumbnail"""
    extension = image_path.suffix
    image = Image.open(image_path)
    image.thumbnail(
        (
            image.size[0] / 2,
            image.size[1] / 2,
        ),
    )
    image.save(str(image_path).replace(f'@2x{extension}', extension), optimize=True)


def create_thumbnails(instance: Pelican) -> None:
    """Create half size versions of '@2x' images in given paths"""
    extensions = ['.png', '.jpg', '.jpeg']
    thumbnail_paths = instance.settings.get(SETTINGS_NAME, [])

    image_paths = [
        image_path
        for extension in extensions
        for thumbnail_path in thumbnail_paths
        for image_path in thumbnail_path.rglob(f'*@2x{extension}')
    ]

    with Pool() as pool:
        pool.map(create_thumbnail, image_paths)


def register() -> None:
    """Register with pelican"""
    signals.finalized.connect(create_thumbnails)
