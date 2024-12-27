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
from itertools import pairwise

from jinja2 import Template

from pelican import Pelican, signals

SETTINGS_NAME = 'SHORTCODES'


def replace_shortcode(group: re.Match[str], shortcodes: dict[str, str]) -> str:
    """Replace shortcodes with evaluated templates"""
    match = group.groups()[0]
    code, _, kwargs = match.partition(' ')
    kwargs = re.split(r'(\w+)=', kwargs)
    kwargs = [kwarg.strip('\'" ') for kwarg in kwargs if kwarg]
    kwargs = dict(pairwise(kwargs))

    if code == 'thumbnail':
        tooltip = kwargs['id']
        tooltip = re.sub(r'(_\d\d?)+$', '', tooltip)
        tooltip = tooltip.replace('_', ' ')
        tooltip = tooltip.replace('Events', 'The following events do not occur in real-time')
        tooltip = re.sub(r'^(( ?[0-2]\d{5})+)', r'Date: \1&#10;', tooltip)
        tooltip = re.sub(r'(( ADL| APL| ARN| WEN| DSC| S60| MIK)+)$', r'Camera:\1', tooltip)
        if 'Camera:' not in tooltip:
            tooltip = re.sub(r'(( ADL| APL| ARN| WEN| DSC| S60| MIK)+)', r'Camera:\1&#10;Title:', tooltip)
        kwargs['tooltip'] = tooltip
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
