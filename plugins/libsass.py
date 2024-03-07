"""libsass

This plugin compiles sass/scss files to plain css.
"""

import sass

from pelican import Pelican, signals

SETTINGS_NAME = 'LIBSASS_PATHS'


def compile_sass(instance: Pelican) -> None:
    """Compile SASS/SCSS with libsass to CSS"""
    paths = instance.settings.get(SETTINGS_NAME, [])

    for input_output_paths in paths:
        sass.compile(dirname=input_output_paths)


def register() -> None:
    """Register with pelican"""
    signals.finalized.connect(compile_sass)
