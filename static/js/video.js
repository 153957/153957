/* "use strict"; */

/* Global variables */
var base = "http://arne.delaat.net/"; /* "http://delaat.me/"; */
var kind = "x264";
var quality = "SD";
var extension = ".mp4";
var html5 = true; /* No HTML5 -> Use QuicktTime Embed */
var navi = navigator.userAgent.toLowerCase();
var op = /opera/.test(navi);
var ch = /chrome/.test(navi);
var sf = /safari/.test(navi) && !ch;
var ie = /msie/.test(navi);
var ip = (/ipad/.test(navi) || /iphone/.test(navi) || /ipod/.test(navi));
var ctrl = (!ip && sf) || ch || op;
var ctrls = 0;

/* Initiate */
$(document).ready(function () {

    /* Global Selectors */
    window.$global = {
        thumbnails: $('#thumbnails').find('.thu'),
        movie: $('#movie'),
        poster: $('#poster'),
        status: $('#status'),
        video: $('#player').get(0)};

    /* Category Slider */
    $('#categories').on('click', ".category", function () {
        var numm = $(this).attr("id") + '-content';
        if ($('#' + numm).get(0) !== $('#thumbnails').find('div.currentslide').get(0)) {
            $('#thumbnails').find('div.currentslide').animate({height: "hide", opacity: "hide"}, "fast")
                            .removeClass("currentslide").addClass("slidehide");
            $('#' + numm).animate({height: "show", opacity: "show"}, "fast")
                         .removeClass("slidehide").addClass("currentslide");
            $('#categories').find('li.currentcat').removeClass("currentcat");
            $(this).addClass("currentcat");}});

    /* Thumbnail Tips */
    $global.thumbnails.tipTip({attribute: "id",
                               delay: "25",
                               defaultPosition: "top"});

    /* Thumbnail Links */
    $('#thumbnails').on('click', ".thu", function () {
        $global.thumbnails.removeClass('currentmovie');
        $(this).addClass('currentmovie');
        swapVideo(this.id);
        return false;});

    /* Poster Link */
    $global.poster.click(function () {
        swapVideo(this.dataset.id);
        return false;});

    /* Select Video Codec */
    if ($global.video.canPlayType) {
        /*codecs=http://wiki.whatwg.org/wiki/Video_type_parameters*/
        var mp4 = $global.video.canPlayType('video/mp4');
        if (ip) {kind = 'ipod';}
        if (mp4 !== "" && mp4 !== "no") {
            kind = 'x264';
            extension = '.mp4';}
        else {
            html5 = false;}}
    else {
        html5 = false;}

    /* Load linked video */
    if (window.location.hash) {
        if ($global.thumbnails.filter(window.location.hash).length) {
            var hash_value = window.location.hash.replace('#', '');
            swapVideo(hash_value);}}

});
/* /Initiate */


/* Set Button */
function playingpaused() {
    if ($global.video.paused) {$controls.ppb.addClass('fa-play').removeClass('fa-pause');}
    else                      {$controls.ppb.removeClass('fa-play').addClass('fa-pause');}}

/* Ended: Pause */
function pause() {
    $global.video.pause();}

/* Play/Pause button action */
function playpause() {
    if ($global.video.paused) {$global.video.play();}
    else                      {$global.video.pause();}
    return false;}

/* Show Progress */
function progress(e) {
    var percentDone = $global.video.currentTime / $global.video.duration * 100;
    if (sf) {$controls.pel.style.width = (percentDone / 100 * ($global.video.width - 153)) + 'px';}
    else    {$controls.pel.style.width = (percentDone / 100 * ($global.video.width - 138)) + 'px';}
    $controls.pin.val($global.video.currentTime);
    var sec = Math.max(Math.floor($global.video.currentTime % 60), 0);
    var min = Math.max(Math.floor($global.video.currentTime / 60), 0);
    if (sec < 10) {$controls.tdi.html(min + ':0' + sec);}
    else          {$controls.tdi.html(min + ':' + sec);}}

/* Show Buffering */
function buffering(e) {
    var maxBuffered = 0.0;
    if ($global.video.buffered.length > 0) {maxBuffered = $global.video.buffered.end(0);}
    var percentBuffered = maxBuffered / $global.video.duration * 100;
    $controls.pbu.style.width = percentBuffered + '%';}

/* Select Time */
function setTime() {
    $global.video.currentTime = $controls.pin.val();}

/* Mute */
function mute() {
    if ($global.video.muted || $global.video.volume === 0) {
        $global.video.volume = 0.5;
        $controls.vin.val(20);}
    else {
        $global.video.volume = 0;
        $controls.vin.val(0);}}

/* Change Volume */
var setVolume = function () {
    $global.video.volume = $controls.vin.val() / 40;};

function volumeused() {
    var percentUsed = $global.video.volume * 100;
    $controls.vus.style.width = percentUsed + '%';
    if (percentUsed === 0) {
        $controls.vsb.removeClass('fa-volume-up fa-volume-down').addClass('fa-volume-off');}
    else if (percentUsed <= 40) {
        $controls.vsb.removeClass('fa-volume-up fa-volume-off').addClass('fa-volume-down');}
    else {
        $controls.vsb.removeClass('fa-volume-down fa-volume-off').addClass('fa-volume-up');}}

/* Fullscreen Button */
var fullscreen = function () {
    $global.video.webkitEnterFullscreen();};

/* Fullwindow Button */
var fullwindow = function () {
    $global.video.width  = window.innerWidth;
    $global.video.height = window.innerHeight - 25;}; /* Set z-index, position.. */

/* Metadata Loaded -> Set Width/Height/Margins */
function setHWM() {
    var hmargin;
    if ($global.video.videoHeight / ($global.movie.height() - 25) <= $global.video.videoWidth / $global.movie.width()) {
        $global.video.width  = $global.movie.width();
        $global.video.height = $global.video.videoHeight * ($global.movie.width() / $global.video.videoWidth);
        hmargin = 0;}
    else {
        $global.video.height = $global.movie.height() - 25;
        $global.video.width  = $global.video.videoWidth * (($global.movie.height() - 25) / $global.video.videoHeight);
        hmargin = ($global.movie.width() - $global.video.width) / 2;}
    $global.video.style.margin = '0 0 0 ' + hmargin + 'px';
    /* Attach Webkit Controls */
    if (ctrl && !ctrls) {
        var pbg_width, pin_width, full;
        ctrls = 1;
        if (sf) {
            pbg_width = $global.video.width - 151;
            pin_width = $global.video.width - 152;
            full = '<div id="fullscreen_button" class="fa fa-expand" onclick="fullscreen()"></div>';}
        else {
            pbg_width = $global.video.width - 136;
            pin_width = $global.video.width - 137;
            full = '';}
        $global.movie.append(
            '<div id="controls" style="margin-left:' + hmargin + 'px; width:' + $global.video.width + 'px;">' +
            '    <div id="play_pause_button" class="fa fa-play" onclick="playpause()"></div>' +
            '    <div id="progress_bar">' +
            '        <div id="time_display">0:00</div>' +
            '        <div id="progress_back" style="width:' + pbg_width + 'px;">' +
            '            <div id="progress_buffered" style="width:0%;"></div>' +
            '            <div id="progress_elapsed" style="width:0%;"></div>' +
            '        <input id="progress_indicator" type="range" step="any" value="0" min="0" max="' + $global.video.duration + '"' +
            '               style="width:' + pin_width + 'px;" onchange="setTime()"></div></div>' +
            '    <div id="volume_speaker_button" class="fa fa-volume-up" onclick="mute()"></div>' +
            '    <div id="volume_bar">' +
            '        <div id="volume_back" style="width:47px; ">' +
            '            <div id="volume_used" style="width:75%; "></div>' +
            '        <input id="volume_indicator" type="range" value="30" min="0" max="40"' +
            '               style="width:50px;" onchange="setVolume()"></div></div>' + full + '</div>');
        window.$controls = {
            con: $('#controls'),
            ppb: $('#play_pause_button'),
            pin: $('#progress_indicator'),
            pel: $('#progress_elapsed').get(0),
            pbu: $('#progress_buffered').get(0),
            tdi: $('#time_display'),
            vsb: $('#volume_speaker_button'),
            vin: $('#volume_indicator'),
            vus: $('#volume_used').get(0)};
        $('#player').attr({
            onclick: "playpause()",
            onpause: "playingpaused()",
            onplay: "playingpaused()",
            onprogress: "buffering()",
            onvolumechange: "volumeused()",
            ontimeupdate: "progress()",
            onended: "pause()"});}}

/* CanPlay -> Hide Status, Show Controls and Play*/
function hideLoad() {
    $global.status.removeClass("showing").addClass("hidden");
    if (!ctrl) {$('#player').attr('controls', 'true');}
    $global.video.play();}

/* Change Status to Error Image */
function errorStatus() {
    $global.status.removeClass('fa-spinner fa-spin hidden')
                  .addClass('fa-times-circle-o showing error');}

/* Exchange Video Player HTML With New Source */
function swapVideo(movieid) {
    var videolink;
    ctrls = 0;
    $global.poster.hide();
    var camera = movieid.substring(0,3);
    if      (camera === "D70") {videolink = base + "TimeLapse_D700/" + quality + '/' + movieid + extension;}
    else if (camera === "D90") {videolink = base + "TimeLapse_D90/" + quality + '/' + movieid + extension;}
    else if (camera === "D80") {videolink = base + "TimeLapse_D80/" + quality + '/' + movieid + extension;}
    else if (camera === "S60") {videolink = base + "TimeLapse_S60/" + quality + '/' + movieid + extension;}
    else                       {videolink = base + "Movies/" + quality + '/' + movieid + extension;}

    /* HTML5 Video */
    if (html5) {
        if (ip) {
            $global.movie.html('<video src=' + videolink + ' id="player" style="margin: 0px 0px;" ' +
                               '       height="100%" width="100%" preload="auto" controls onloadedmetadata="setHWM()"></video>' +
                               '<span id="status" class="fa fa-circle-o-notch fa-spin hidden"></span>');}
        else{
            $global.movie.html('<span id="status" class="fa fa-spinner fa-spin showing"></span>' +
                               '<video src=' + videolink + ' id="player" style="margin: 0px 0px;" ' +
                               '       height="0" width="0" preload="auto" onloadedmetadata="setHWM()" oncanplay="hideLoad()"></video>');}
        $global.video = $('#player').get(0);
        $global.status = $('#status');
        $global.video.addEventListener('error', errorStatus, true);}
    /* Quicktime Embed/Object */
    else {
        $global.movie.html(
            "<object width='" + $global.movie.width() + "' height='" + $global.movie.height() + "'" +
            "        classid='clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B'" +
            "        codebase='http://www.apple.com/qtactivex/qtplugin.cab'>" +
            "<param name='src' value='" + videolink + "' /><param name='bgcolor' value='#ffffff' />" +
            "<param name='controller' value='true' /><param name='autoplay' value='true' /><param name='scale' value='aspect' />" +
            "<embed src='" + videolink + "' bgcolor='ffffff' width='" + $global.movie.width() + "' height='" + $global.movie.height() + "'" +
            "       type='video/quicktime' pluginspage='http://www.apple.com/quicktime/download/'" +
            "       controller='true' autoplay='true' scale='aspect'>" +
            "</object>");}
    window.location.hash = movieid;
    return false;}
