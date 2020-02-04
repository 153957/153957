from pathlib import Path

PROJECT_DIR = Path(__file__).parent

AUTHOR = 'Arne de Laat'
SITENAME = '153957 Photography'
SITEURL = ''

OUTPUT_PATH = PROJECT_DIR / '.build'

THEME = PROJECT_DIR / 'theme'
THEME_STATIC_DIR = 'static/base'

PATH = 'content'
PAGE_PATHS = ['']
STATIC_PATHS = []

TIMEZONE = 'UTC'
DEFAULT_LANG = 'en'

SLUGIFY_SOURCE = 'basename'
PAGE_SAVE_AS = '{slug}.html'
PAGE_URL = '{slug}.html'

OUTPUT_CSS = OUTPUT_PATH / THEME_STATIC_DIR / 'css'

PLUGINS = [
    'plugins.libsass',
    'plugins.shortcodes',
    'plugins.thumbnails',
]

LIBSASS_PATHS = [
    (OUTPUT_CSS, OUTPUT_CSS),
]

THUMBNAIL_PATHS = {
    'CHECKSUM': PROJECT_DIR / '.previous_checksum',
    'TEMPLATE': PROJECT_DIR / 'plugins' / 'thumbnails_template.css',
    'SRC': THEME / 'static' / 'images_timelapse_src',
    'IMG': THEME / 'static' / 'images_timelapse' / 'thumbs',
    'CSS': THEME / 'static' / 'css' / 'thumbs',
}

SHORTCODES = {
    # Link to image via a thumbnail with a caption
    'captioned_image': f"""
        <a href="{SITEURL}/{THEME_STATIC_DIR}/images_guide/{{{{ section }}}}/{{{{ image }}}}.jpg" target="_blank">
            <img
                alt=""
                src="{SITEURL}/{THEME_STATIC_DIR}/images_guide/{{{{ section }}}}/thumbs/{{{{ image }}}}.jpg"
                srcset="{SITEURL}/{THEME_STATIC_DIR}/images_guide/{{{{ section }}}}/thumbs/{{{{ image }}}}@2x.jpg 2x"
            >
            <span class="caption">{{{{ caption }}}}</span>
        </a>
    """,
}


# No blog, just pages!
ARTICLE_PATHS = []
ARTICLE_URL = False
ARTICLE_SAVE_AS = False
ARCHIVES_SAVE_AS = False
AUTHORS_SAVE_AS = False
CATEGORIES_SAVE_AS = False
TAGS_SAVE_AS = False
INDEX_SAVE_AS = False

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True

# No feeds, no blog!
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None
DEFAULT_PAGINATION = False
