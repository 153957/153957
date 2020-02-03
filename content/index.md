---
title: Index
save_as: index.html
banner: DSC_000166
head: 
    <style>
        #pageHeader h1 {
            color: #111111;
            top: 34px;
            left: 345px;
        }
        .photography {background-image: url(/static/base/images_index/photography.jpg);}
        .timelapse {background-image: url(/static/base/images_index/timelapse.jpg);}
        .timelapse_guide {background-image: url(/static/base/images_index/timelapse_guide.jpg);}
        @media screen and (-webkit-min-device-pixel-ratio: 2),
               screen and (min-resolution: 192dpi),
               screen and (min-resolution: 2dppx) {
            .photography {background-image: url(/static/base/images_index/photography@2x.jpg);}
            .timelapse {background-image: url(/static/base/images_index/timelapse@2x.jpg);}
            .timelapse_guide {background-image: url(/static/base/images_index/timelapse_guide@2x.jpg);}
        }
    </style>
footer: 
    <script src="/static/base/js/vendor/jquery.tipTip.js"></script>
    <script src="/static/base/js/index.js"></script>
---

<a href="{filename}/photography.md" class="collage photography" data-tip="Photography"></a>
<a href="{filename}/timelapse.md" class="collage timelapse" data-tip="Time-Lapse Movies"></a>
<a href="{filename}/timelapse_guide.md" class="collage timelapse_guide" data-tip="Time-Lapse Guide"></a>
