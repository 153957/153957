"""shortcodes

Copyright: AGPLv3 <Bernardas Ališauskas @ bernardas.alisauskas@pm.me>

This plugin allows to define macros called shortcodes in content pages that will be expanded as jinja2 templates.
The purpose of this plugin is to allow explicit and quick jinja2 templating in your content without compromising
markdown/rst.

Example usage:

In `pelicanconf.py` add:

    SHORTCODES = {
        'image': "<img src=/images/{{src}}>{{desc|title}}<img>"
    }

Then in your content:

    [% image src=foo.png desc="this is a test" %]

which will become:

    <img src=/images/foo.png>This Is A Test<img>

"""
import re

from functools import partial

from jinja2 import Template

from pelican import Pelican, signals

SETTINGS_NAME = 'SHORTCODES'


def replace_shortcode(group: re.Match[str], shortcodes: dict[str, str]) -> str:
    """Replace shortcodes with evaluated templates"""
    match = group.groups()[0]
    code, _, args = match.partition(' ')
    args = re.split(r'(\w+)=', args)
    args = [a.strip('\'" ') for a in args if a]
    kwargs = {args[i]: args[i + 1] for i in range(0, len(args), 2)}
    try:
        return Template(shortcodes[code]).render(**kwargs)
    except KeyError:
        raise KeyError(f'shortcode "{code}" not found') from None


def expand_shortcodes(text: str, shortcodes: dict[str, str]) -> str:
    """Find all shortcodes and apply the replacement templates"""
    shortcode_replacer = partial(replace_shortcode, shortcodes=shortcodes)
    return re.sub(r'\[% ([\w\W]+?) %\]', shortcode_replacer, text, flags=re.MULTILINE)


def content_object_init(instance: Pelican) -> None:
    """Apply shortcodes to content, replacing original content"""
    shortcodes = instance.settings.get(SETTINGS_NAME)
    if not shortcodes or not instance._content:
        return
    instance._content = expand_shortcodes(instance._content, shortcodes)


def register() -> None:
    """Register with pelican"""
    signals.content_object_init.connect(content_object_init)
