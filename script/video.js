/* "use strict"; */

/* Global Variables */
var base = "http://arne.delaat.net/"; /* "http://apdl.delaat.net/"; */
var kind = "x264";
var ext = ".mov";
var type = "mp4";
var html5 = 0; /* No HTML5 -> Use QuicktTime Embed */
var navi = navigator.userAgent.toLowerCase();
var op = /opera/.test(navi);
var ch = /chrome/.test(navi);
var sf = /safari/.test(navi) && !ch;
var ie = /msie/.test(navi);
var ip = (/ipad/.test(navi) || /iphone/.test(navi) || /ipod/.test(navi));
var ctrl = sf || ch || op;
var ctrls = 0;

/* Initiate */
$(document).ready(function () {

    /* Global Selectors */
    window.$glo = {
        thu: $('#thumbnails').find('.thu'),
        mov: $('#movie'),
        pos: $('#poster'),
        sta: $('#status'),
        vid: $('#player').get(0)};

    /* Category Slider */
    $('#categories').on('click', ".category", function () {
        var numm = $(this).attr("id") + '-content';
        if ($('#' + numm).get(0) !== $('#thumbnails').find('div.currentslide').get(0)) {
            $('#thumbnails').find('div.currentslide').animate({height: "hide", opacity: "hide"}, "slow").removeClass("currentslide").addClass("slidehide");
            $('#' + numm).animate({height: "show", opacity: "show"}, "slow").removeClass("slidehide").addClass("currentslide");
            $('#categories').find('li.currentcat').removeClass("currentcat");
            $(this).addClass("currentcat");}});

    /* Thumbnail Tips */
    $glo.thu.tipTip({attribute: "id", delay: "25", defaultPosition: "top"});

    /* Thumbnail Links */
    $('#thumbnails').on('click', ".thu", function () {
        swapVideo(this.id);
        return false;});

    /* Poster Link */
    $glo.pos.click(function () {
        swapVideo(this.name);
        return false;});

    /* Select Video Codec */
    if ($glo.vid.canPlayType && !ie) {
        html5 = 1;
        /*codecs=http://wiki.whatwg.org/wiki/Video_type_parameters*/
        var mp4  = $glo.vid.canPlayType('video/mp4');
        var webm = $glo.vid.canPlayType('video/webm; codecs="vp8, vorbis"');
        var ogv  = $glo.vid.canPlayType('video/ogg; codecs="theora, vorbis"');
        if (ip) {kind = 'ipod'; ext = '.mov';  type = 'mp4';}
        else if (mp4 !== "" && mp4 !== "no") {kind = 'x264'; ext = '.mov'; type = 'mp4';}
        else if (webm !== "" && webm !== "no") {kind = 'webm'; ext = '.webm'; type = "webm; codecs='vp8, vorbis'";}
        else if (ogv !== "" && ogv !== "no") {kind = 'ogv';  ext = '.ogv'; type = "ogg; codecs='theora, vorbis'";}}
});
/* /Initiate */


/* Set Button */
function playingpaused() {
    if ($glo.vid.paused) {$con.ppb.addClass('pause');}
    else                 {$con.ppb.removeClass('pause');}}

/* Ended: Pause */
function pause() {
    $glo.vid.pause();}

/* Play/Pause Button */
function playpause() {
    if ($glo.vid.paused) {$glo.vid.play();}
    else                 {$glo.vid.pause();}
    return false;}

/* Show Progress */
function progress(e) {
    var percentDone = $glo.vid.currentTime / $glo.vid.duration * 100;
    if (sf) {$con.pel.style.width = (percentDone / 100 * ($glo.vid.width - 153)) + 'px';}
    else    {$con.pel.style.width = (percentDone / 100 * ($glo.vid.width - 138)) + 'px';}
    $con.pin.val($glo.vid.currentTime);
    var sec = Math.max(Math.floor($glo.vid.currentTime % 60), 0);
    var min = Math.max(Math.floor($glo.vid.currentTime / 60), 0);
    if (sec < 10) {$con.tdi.html(min + ':0' + sec);}
    else          {$con.tdi.html(min + ':' + sec);}}

/* Show Buffering */
function buffering(e) {
    var maxBuffered = 0.0;
    if ($glo.vid.buffered.length > 0) {maxBuffered = $glo.vid.buffered.end(0);}
    var percentBuffered = maxBuffered / $glo.vid.duration * 100;
    $con.pbu.style.width = percentBuffered + '%';}

/* Select Time */
function setTime() {
    $glo.vid.currentTime = $con.pin.val();}

/* Mute */
function mute() {
    if ($glo.vid.muted || $glo.vid.volume === 0) {
        $glo.vid.volume = 0.5;
        $con.vin.val(20);}
    else{
        $glo.vid.volume = 0;
        $con.vin.val(0);}}

/* Change Volume */
var setVolume = function () {
    $glo.vid.volume = $con.vin.val() / 40;};

function volumeused() {
    var percentUsed = $glo.vid.volume * 100;
    $con.vus.style.width = percentUsed + '%';}

/* Fullscreen Button */
var fullscreen = function () {
    $glo.vid.webkitEnterFullscreen();};

/* Fullwindow Button */
var fullwindow = function () {
    $glo.vid.width  = window.innerWidth;
    $glo.vid.height = window.innerHeight - 25;}; /* Set z-index, position.. */

/* Metadata Loaded -> Set Width/Height/Margins */
function setHWM() {
    if ($glo.vid.videoHeight / ($glo.mov.height() - 25) <= $glo.vid.videoWidth / $glo.mov.width()) {
        $glo.vid.width  = $glo.mov.width();
        $glo.vid.height = $glo.vid.videoHeight * ($glo.mov.width() / $glo.vid.videoWidth);
        var hmargin = 0;
        var vmargin = (($glo.mov.height() - 25) - $glo.vid.height) / 3;}
    else {
        $glo.vid.height = $glo.mov.height() - 25;
        $glo.vid.width  = $glo.vid.videoWidth * (($glo.mov.height() - 25) / $glo.vid.videoHeight);
        var vmargin = 0;
        var hmargin = ($glo.mov.width() - $glo.vid.width) / 2;}
    $glo.vid.style.margin = vmargin + 'px 0px 0px ' + hmargin + 'px';
 /* Fix Firefox streaming */
    if (kind === 'ogv') {hideLoad();}
 /* Attatch Webkit Controls */
    if (ctrl && kind !== "ipod" && !ctrls) {
        ctrls = 1;
        if (sf) {
            var pbg_width = $glo.vid.width - 151;
            var pin_width = $glo.vid.width - 152;
            var full = '<div id="fullscreen_button" onclick="fullscreen()"></div>';}
        else {
            var pbg_width = $glo.vid.width - 136;
            var pin_width = $glo.vid.width - 137;
            var full = '';}
        $glo.mov.append(
            '<div id="controls" style="margin-left:' + hmargin + 'px; width:' + $glo.vid.width + 'px;">\
             <div id="play_pause_button" onclick="playpause()"></div>\
             <div id="progress_bar">\
                 <div id="time_display">0:00</div>\
                 <div id="progress_back" style="width:' + pbg_width + 'px;">\
                     <div id="progress_buffered" style="width:0%;"></div>\
                     <div id="progress_elapsed" style="width:0%;"></div>\
                 <input id="progress_indicator" type="range" step="any" value="0" min="0" max="' + $glo.vid.duration + '" style="width:' + pin_width + 'px;" onchange="setTime()"></div></div>\
             <div id="volume_speaker_button" onclick="mute()"></div>\
             <div id="volume_bar">\
                 <div id="volume_back" style="width:47px; ">\
                     <div id="volume_used" style="width:75%; "></div>\
                 <input id="volume_indicator" type="range" value="30" min="0" max="40" style="width:50px;" onchange="setVolume()"></div></div>' + full + '</div>');
        window.$con = {
            con: $('#controls'),
            ppb: $('#play_pause_button'),
            pin: $('#progress_indicator'),
            pel: $('#progress_elapsed').get(0),
            pbu: $('#progress_buffered').get(0),
            tdi: $('#time_display'),
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
    $glo.sta.removeClass("showing").addClass("hidden");
    if (!ctrl) {$('#player').attr('controls', 'true');}
    $glo.vid.play();}

/* Change Status to Error Image */
function errorStatus() {
    $glo.sta.removeClass("hidden").addClass("showing");
    $glo.sta.attr('src', base + 'images_timelapse/error.png');}

/* Exchange Video Player HTML With New Source */
function swapVideo(movieid) {
    ctrls = 0;
    $glo.pos.hide();
    var camera = movieid.substring(0,3);
    if      (camera === "D70") {var videolink = base + "TimeLapse_D700/" + kind + '/' + movieid + ext;}
    else if (camera === "D90") {var videolink = base + "TimeLapse_D90/" + kind + '/' + movieid + ext;}
    else if (camera === "D80") {var videolink = base + "TimeLapse_D80/" + kind + '/' + movieid + ext;}
    else if (camera === "S60") {var videolink = base + "TimeLapse_S60/" + kind + '/' + movieid + ext;}
    else                       {var videolink = base + "Movies/" + kind + '/' + movieid + ext;}

    /* HTML5 Video */
    if (html5) {
        if (kind === 'ipod') {
            $glo.mov.html('<video src=' + videolink + ' id="player" style="margin: 0px 0px;" height="100%" width="100%" preload="auto" controls onloadedmetadata="setHWM()">\
            <img id="status" class="hidden" src="' + base + 'images_timelapse/loading_spin.gif" />');}
        else{
            $glo.mov.html('<img id="status" class="showing" src="' + base + 'images_timelapse/loading_spin.gif" /><video src=' + videolink + ' id="player" style="margin: 0px 0px;" height="0" width="0" preload="auto" onloadedmetadata="setHWM()" oncanplay="hideLoad()"></video>');}
        $glo.vid = $('#player').get(0);
        $glo.sta = $('#status');}
    /* Quicktime Embed/Object */
    else {
        $glo.mov.html("<object width='" + $glo.mov.width() + "' height='" + $glo.mov.height() + "' classid='clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B' codebase='http://www.apple.com/qtactivex/qtplugin.cab'>\
        <param name='src' value='" + videolink + "' /><param name='bgcolor' value='#000000' /><param name='controller' value='true' /><param name='autoplay' value='true' /><param name='scale' value='aspect' />\
        <embed src='" + videolink + "' bgcolor='000000' width='" + $glo.mov.width() + "' height='" + $glo.mov.height() + "' type='video/quicktime' pluginspage='http://www.apple.com/quicktime/download/' controller='true' autoplay='true' scale='aspect'>\
        </object>");}
    return false;}
