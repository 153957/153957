---
title: Time-Lapse
save_as: timelapse.html
banner: DSC_085677
order: 2
head: 
    <style>
        #pageHeader h1 {
            left: 650px;
            top: 25px;
        }
        /* Temporary fix */
        #content {
            padding-left: 0;
            padding-right: 0;
        }
        #slider {
            padding: 0 9px;
        }
    </style>
    <link rel="stylesheet" href="/static/css/tipTip.css" />
    <link rel="stylesheet" href="/static/css/video.css" />
    <link rel="stylesheet" href="/static/css/controls.css" />
footer: 
    <script src="/static/js/vendor/jquery.tipTip.js"></script>
    <script src="/static/js/video.js"></script>
---

<div id="slider">
    <div id="categories">
        <ul>
            <li class="category currentcat" id="Reels">Reels
            <li class="category" id="Archery">Archery
            <li class="category" id="Astronomy">Astronomy
            <li class="category" id="Balfolk">Balfolk
            <li class="category" id="Clouds">Clouds
            <li class="category" id="Fire">Fire
            <li class="category" id="Flowers">Flowers
            <li class="category" id="Frost">Frost
            <li class="category" id="Other">Other
            <li class="category" id="Sun">Sun
            <li class="category" id="Traffic">Traffic
        </ul>
    </div>

    <div id="thumbnails">
        <div class="slide" id="Flowers-content">
            [% thumbnail id=D700_181014_1_2 fps=24 data='960 1920' %]
            [% thumbnail id=D90_130217_1_4 fps=24 data='960 1920' %]
            [% thumbnail id=D80_080816_1 fps=24 data='960 1920' %]
            [% thumbnail id=D80_080806_1 fps=48 data='960 1920' %]
            [% thumbnail id=D80_080714_1 fps=30 data='960' %]
            [% thumbnail id=S60_080614_1 fps=25 data='960 audio' %]
            [% thumbnail id=S60_080608_1 fps=25 data='960' %]
            [% thumbnail id=S60_080607_1 fps=25 data='960' %]
            [% thumbnail id=S60_080515_1 fps=25 data='960' %]
            [% thumbnail id=S60_070728_1 fps=25 data='960 1920' %]
            [% thumbnail id=S60_070428_1 fps=30 data='960' %]
            [% thumbnail id=S60_060921_1 fps=15 data='960 audio' %]
            [% thumbnail id=S60_060716_1 fps=15 data='960 audio' %]
        </div>
        <div class="slide" id="Clouds-content">
            [% thumbnail id=D500_180430_1_2 fps=24 data='960 1920' %]
            [% thumbnail id=D90_121004_1 fps=48 data='960 1920' %]
            [% thumbnail id=D700_110413_1 fps=24 data='960 1920' %]
            [% thumbnail id=D700_110209_1 fps=25 data='960 1920' %]
            [% thumbnail id=D80_100924_1_2 fps=24 data='960' %]
            [% thumbnail id=D80_100722_3 fps=25 data='960' %]
            [% thumbnail id=D80_091012_2 fps=25 data='960' %]
            [% thumbnail id=D80_091009_1 fps=30 data='960 audio' %]
            [% thumbnail id=D80_090721_2 fps=30 data='960' %]
            [% thumbnail id=D80_090710_1 fps=25 data='960' %]
            [% thumbnail id=D80_090624_5 fps=25 data='960' %]
            [% thumbnail id=D80_090624_3 fps=25 data='960' %]
            [% thumbnail id=D80_090624_1 fps=30 data='960' %]
            [% thumbnail id=D80_090327_3 fps=25 data='960' %]
            [% thumbnail id=D80_090325_2 fps=24 data='960 1920' %]
            [% thumbnail id=D80_090325_1 fps=25 data='960' %]
            [% thumbnail id=D80_090313_2 fps=24 data='960 1920' %]
            [% thumbnail id=D80_090313_1 fps=25 data='960' %]
            [% thumbnail id=D80_081111_1 fps=30 data='960' %]
            [% thumbnail id=D80_080716_2 fps=30 data='960' %]
            [% thumbnail id=D80_080716_1 fps=30 data='960' %]
            [% thumbnail id=D80_080711_1 fps=25 data='960' %]
            [% thumbnail id=D80_080708_2 fps=25 data='960' %]
            [% thumbnail id=D80_080707_1 fps=30 data='960' %]
            [% thumbnail id=S60_060228_1 fps=15 data='960 audio' %]
            [% thumbnail id=S60_060530_1 fps=25 data='960' %]
            [% thumbnail id=S60_050621_2 fps=25 data='960' %]
        </div>
        <div class="slide" id="Traffic-content">
            [% thumbnail id=D700_181019_1 fps=24 data='960 1920' %]
            [% thumbnail id=D700_181012_1 fps=30 data='960 1920' %]
            [% thumbnail id=D700_170218_1_2_3 fps=24 data='960 1920' %]
            [% thumbnail id=D90_130424_1 fps=24 data='960 1920' %]
            [% thumbnail id=D90_121103_2 fps=30 data='960 1920' %]
            [% thumbnail id=D700_120826_1 fps=25 data='960 1920' %]
            [% thumbnail id=D90_120506_1_2 fps=48 data='960' %]
            [% thumbnail id=D80_101129_1 fps=24 data='960 1920' %]
            [% thumbnail id=D80_101121_2 fps=25 data='960' %]
            [% thumbnail id=D80_101118_101126_1 fps=25 data='960' %]
            [% thumbnail id=D700_101109_2 fps=24 data='960 1920' %]
            [% thumbnail id=D80_100914_1 fps=25 data='960' %]
            [% thumbnail id=D80_100913_2 fps=25 data='960' %]
            [% thumbnail id=D700_100722_4_5 fps=25 data='960' %]
            [% thumbnail id=D80_091019_1 fps=15 data='960' %]
            [% thumbnail id=D80_091019_3 fps=25 data='960' %]
            [% thumbnail id=D80_090727_3 fps=25 data='960' %]
            [% thumbnail id=D80_090727_2 fps=25 data='960' %]
            [% thumbnail id=D80_090721_1 fps=25 data='960' %]
            [% thumbnail id=D80_090712_1 fps=15 data='960' %]
            [% thumbnail id=D80_080716_4 fps=24 data='960 1920' %]
        </div>
        <div class="slide" id="Frost-content">
            [% thumbnail id=D80_100201_3 fps=25 data='960' %]
            [% thumbnail id=D80_100201_1 fps=15 data='960' %]
            [% thumbnail id=D80_090109_1 fps=30 data='960' %]
            [% thumbnail id=D80_080708_1 fps=30 data='960' %]
            [% thumbnail id=S60_060812_1 fps=15 data='960' %]
            [% thumbnail id=S60_060504_1 fps=15 data='960 1920' %]
            [% thumbnail id=S60_050504_1 fps=15 data='960 1920' %]
        </div>
        <div class="slide" id="Sun-content">
            [% thumbnail id=D90_130305_1_2 fps=48 data='960 1920' %]
            [% thumbnail id=D80_100816_1_2 fps=25 data='960' %]
            [% thumbnail id=D80_100722_1 fps=25 data='960' %]
            [% thumbnail id=D80_100531_1 fps=25 data='960' %]
            [% thumbnail id=D80_091012_3 fps=25 data='960' %]
            [% thumbnail id=D80_091012_1 fps=25 data='960' %]
            [% thumbnail id=D80_090403_1 fps=25 data='960' %]
            [% thumbnail id=D80_090401_1 fps=24 data='960 1920' %]
            [% thumbnail id=D80_081218_1 fps=25 data='960' %]
            [% thumbnail id=S60_080110_1 fps=15 data='960' %]
            [% thumbnail id=S60_070601_1 fps=25 data='960' %]
        </div>
        <div class="slide" id="Balfolk-content">
            [% thumbnail id=D90_CaDansa2014 fps=24 data='960 1920 audio' %]
            [% thumbnail id=D90_120602_1 fps=25 data='960 audio' %]
            [% thumbnail id=D80_100405_1 fps=25 data='960 audio' %]
            [% thumbnail id=D80_091009_2 fps=30 data='960 audio' %]
            [% thumbnail id=D80_090906_3 fps=25 data='960 audio' %]
            [% thumbnail id=D80_090617_1 fps=15 data='960 1920 audio' %]
        </div>
        <div class="slide" id="Archery-content">
            [% thumbnail id=D700_D90_120524_1_2_3_4 fps=48 data='960 1920' %]
            [% thumbnail id=D80_100816_3 fps=25 data='960' %]
            [% thumbnail id=D80_090906_2 fps=15 data='960' %]
            [% thumbnail id=D80_090906_1 fps=25 data='960' %]
            [% thumbnail id=S60_051218_1 fps=15 data='960' %]
        </div>
        <div class="slide" id="Other-content">
            [% thumbnail id=D500_190429_1_2_3_4_5 fps=30 data='960 1920' %]
            [% thumbnail id=D500_190430_1 fps=24 data='960 1920' %]
            [% thumbnail id=D500_190430_2_3_4 fps=30 data='960 1920' %]
            [% thumbnail id=D700_180921_1 fps=24 data='960 1920' %]
            [% thumbnail id=D500_180628_1 fps=25 data='960 1920' %]
            [% thumbnail id=D700_160813_1_2 fps=30 data='960 1920' %]
            [% thumbnail id=D700_151203_1_3_4 fps=24 data='960 1920' %]
            [% thumbnail id=D700_140608_2 fps=24 data='960 1920' %]
            [% thumbnail id=D700_110413_2-111202_1-120219_1 fps=25 data='960 1920' %]
            [% thumbnail id=D700_111127_1-110122_2_D90_130426_1-130428_4 fps=25 data='960 1920' %]
            [% thumbnail id=D700_D80_101014_2_4_1 fps=25 data='960' %]
            [% thumbnail id=D700_D80_100722_2_4 fps=25 data='960' %]
            [% thumbnail id=D80_100427_1 fps=25 data='960' %]
            [% thumbnail id=D80_100208_1 fps=25 data='960' %]
            [% thumbnail id=D80_090918_1 fps=25 data='960' %]
            [% thumbnail id=D80_090715_1 fps=25 data='960' %]
            [% thumbnail id=D80_090712_2 fps=25 data='960' %]
            [% thumbnail id=D80_090710_2 fps=25 data='960' %]
            [% thumbnail id=D80_080721_1 fps=30 data='960' %]
            [% thumbnail id=S60_060404_1 fps=10 data='960 audio' %]
        </div>
        <div class="slide" id="Fire-content">
            [% thumbnail id=D90_160813_1 fps=60 data='960 1920' %]
            [% thumbnail id=D80_111111_1 fps=25 data='960' %]
            [% thumbnail id=D80_110311_1 fps=25 data='960 audio' %]
            [% thumbnail id=D80_101231_1 fps=24 data='960 1920' %]
            [% thumbnail id=D700_091228_1 fps=25 data='960' %]
            [% thumbnail id=D80_090829_1 fps=25 data='960' %]
            [% thumbnail id=D80_090718_2 fps=12 data='960' %]
            [% thumbnail id=D80_090718_1 fps=25 data='960 audio' %]
            [% thumbnail id=D80_090603_2 fps=25 data='960 audio' %]
            [% thumbnail id=D80_090403_2 fps=12 data='960 1920' %]
            [% thumbnail id=D80_081214_1 fps=30 data='960 audio' %]
        </div>
        <div class="slide" id="Astronomy-content">
            [% thumbnail id=D700_D500_180727_1_2_4_5 fps=25 data='960 1920' %]
            [% thumbnail id=D90_150322_1 fps=24 data='960 1920' %]
            [% thumbnail id=D90_150316_1 fps=24 data='960 1920' %]
            [% thumbnail id=D90_140416_140417_1 fps=48 data='960' %]
            [% thumbnail id=D700_110928_1 fps=25 data='960 1920' %]
            [% thumbnail id=D700_110927_1 fps=15 data='960' %]
            [% thumbnail id=D80_110515_110521_110522 fps=48 data='960 1920' %]
            [% thumbnail id=D80_110521_1 fps=25 data='960' %]
            [% thumbnail id=D80_110516_5 fps=50 data='960' %]
            [% thumbnail id=D80_110516_3 fps=25 data='960' %]
            [% thumbnail id=D80_110515_2 fps=25 data='960' %]
            [% thumbnail id=D80_110514_2 fps=25 data='960' %]
            [% thumbnail id=D80_100131_2 fps=25 data='960' %]
            [% thumbnail id=D80_091207_1 fps=25 data='960' %]
            [% thumbnail id=D80_091102_2 fps=25 data='960' %]
            [% thumbnail id=D80_090903_4 fps=25 data='960' %]
            [% thumbnail id=D80_090901_2 fps=30 data='960' %]
            [% thumbnail id=D80_080716_3 fps=30 data='960' %]
        </div>
        <div class="slide currentslide currentreveal" id="Reels-content">
            [% thumbnail id=D700_D90_150317_NorthernLights fps=24 data='960 1920' %]
            [% thumbnail id=D700_D80_Virtual_Eyes fps=24 data='960 1920 audio' %]
            [% thumbnail id=D80_Events fps=30 data='960 1920 audio' %]
            [% thumbnail id=D80_110514_110520_1_2_4 fps=25 data='960 audio' %]
        </div>
        <div class="slide" id="Description-content">
            <p>
                This is my time-lapse showcase. This page contains a collection of my
                time-lapse movies. Most movies were created with my Nikon DSLRs and some
                with my Canon Powershot. The Nikon D80 and D90 required an external
                intervalometer or a computer to control the camera, the Canon S60, Nikon
                D500 and D700 have built-in intervalometers.

                The movies are ordered by shooting date,
                the newest are at the top of the categories. Most movies are made in the
                Netherlands, but some were shot in Chile, Iceland, Japan, or China. The categories
                include movies about archery shooting, balfolk dancing, blooming flowers,
                traffic, fireshows, clouds, sunset, sunrise, night skies, stars, waterfalls,
                ice cubes melting, and some other miscellaneous subjects.
            </p>
        </div>
    </div>
</div>

<div id="movie">
    <img
        id="poster"
        class="showing"
        data-id="D700_D90_150317_NorthernLights"
        alt="Northern Lights"
        src="/static/images_timelapse/D700_D90_150317_NorthernLights_poster.jpg"
    />
    <video id="player"></video>
</div>
