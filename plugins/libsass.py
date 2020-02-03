"""
libsass

This plugin compiles sass/scss files to plain css.
"""
import sass

from pelican import signals

SETTINGS_NAME = 'LIBSASS_PATHS'


def compile_sass(instance):
    """
    Compile SASS/SCSS with libsass to CSS
    """
    paths = instance.settings.get(SETTINGS_NAME)

    for input_output_paths in paths:
        sass.compile(dirname=input_output_paths)


def register():
    signals.finalized.connect(compile_sass)
