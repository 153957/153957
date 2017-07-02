/* "use strict"; */

/* Global variables */
var base = "http://arne.delaat.net/"; /* "http://delaat.me/"; */
var quality = "SD";
var extension = ".mp4";

var controlsCreated = false;
var fullscreen = false;

/* Initiate */
$(document).ready(function() {
    /* Global Selectors */
    window.$global = {
        thumbnails: $("#thumbnails").find("li"),
        movie: $("#movie"),
        poster: $("#poster"),
        status: $("#status"),
        video: $("#player").get(0)
    };

    /* Category Slider */
    $("#categories").on("click", ".category", function() {
        var thumbs = $(this).attr("id") + "-content";
        if (
            $("#" + thumbs).get(0) !==
            $("#thumbnails").find(".currentslide").get(0)
        ) {
            $("#thumbnails .currentslide").hide().removeClass("currentslide");
            $("#categories .currentcat").removeClass("currentcat");
            // First show to set display to block, then add the class to transition the opacity.
            $("#" + thumbs).show(0, function() {$(this).addClass("currentslide")});
            $(this).addClass("currentcat");
        }
    });

    /* Thumbnail Tips */
    $global.thumbnails.tipTip({
        attribute: "id",
        delay: "25",
        defaultPosition: "top"
    });

    /* Thumbnail Links */
    $("#thumbnails").on("click", "li", function() {
        $global.thumbnails.removeClass("currentmovie");
        $(this).addClass("currentmovie");
        swapVideo(this.id);
        return false;
    });

    /* Poster Link */
    $global.poster.click(function() {
        swapVideo(this.dataset.id);
        return false;
    });

    /* Fullscreen Button */
    /* Check Full screen support */
    if ($global.video.requestFullscreen) {
        fullscreen = function() {
            $global.video.requestFullscreen();
            return false;
        };
    } else if ($global.video.msRequestFullscreen) {
        fullscreen = function() {
            $global.video.msRequestFullscreen();
            return false;
        };
    } else if ($global.video.mozRequestFullScreen) {
        fullscreen = function() {
            $global.video.mozRequestFullScreen();
            return false;
        };
    } else if ($global.video.webkitRequestFullscreen) {
        fullscreen = function() {
            $global.video.webkitRequestFullscreen();
            return false;
        };
    }

    /* Load linked video */
    if (window.location.hash) {
        if ($global.thumbnails.filter(window.location.hash).length) {
            var hash_value = window.location.hash.replace("#", "");
            swapVideo(hash_value);
        }
    }
});
/* /Initiate */

/* Set Button */
function playingpaused() {
    if ($global.video.paused) {
        $controls.playButton.addClass("fa-play").removeClass("fa-pause");
    } else {
        $controls.playButton.removeClass("fa-play").addClass("fa-pause");
    }
}

/* Ended: Pause */
function pause() {
    $global.video.pause();
}

/* Play/Pause button action */
function playpause() {
    if ($global.video.paused) {
        $global.video.play();
    } else {
        $global.video.pause();
    }
    return false;
}

/* Show Progress */
function progress(e) {
    var percentDone = $global.video.currentTime / $global.video.duration * 100;
    $controls.progressElapsed.style.width = percentDone + "%";
    $controls.progressIndicator.val($global.video.currentTime);
    var seconds = Math.max(Math.floor($global.video.currentTime % 60), 0);
    var minutes = Math.max(Math.floor($global.video.currentTime / 60), 0);
    if (seconds < 10) {
        $controls.timeDisplay.html(minutes + ":0" + seconds);
    } else {
        $controls.timeDisplay.html(minutes + ":" + seconds);
    }
}

/* Show Buffering */
function buffering(e) {
    var maxBuffered = 0.0;
    if ($global.video.buffered.length > 0) {
        maxBuffered = $global.video.buffered.end(0);
    }
    var percentBuffered = maxBuffered / $global.video.duration * 100;
    $controls.progressBuffered.style.width = percentBuffered + "%";
}

/* Select Time */
function setTime() {
    $global.video.currentTime = $controls.progressIndicator.val();
}

/* Mute */
function mute() {
    if ($global.video.muted || $global.video.volume === 0) {
        $global.video.volume = 0.5;
        $controls.volumeIndicator.val(20);
    } else {
        $global.video.volume = 0;
        $controls.volumeIndicator.val(0);
    }
}

/* Change Volume */
var setVolume = function() {
    $global.video.volume = $controls.volumeIndicator.val() / 40;
};

function volumeused() {
    var percentUsed = $global.video.volume * 100;
    $controls.volumeUsed.style.width = percentUsed + "%";
    if (percentUsed === 0) {
        $controls.volumeButton
            .removeClass("fa-volume-up fa-volume-down")
            .addClass("fa-volume-off");
    } else if (percentUsed <= 40) {
        $controls.volumeButton
            .removeClass("fa-volume-up fa-volume-off")
            .addClass("fa-volume-down");
    } else {
        $controls.volumeButton
            .removeClass("fa-volume-down fa-volume-off")
            .addClass("fa-volume-up");
    }
}

/* Metadata Loaded -> Set Width/Height/Margins */
function addControls() {
    /* Attach Webkit Controls */
    if (!controlsCreated) {
        var fullscreenButton;
        controlsCreated = true;
        if (fullscreen) {
            fullscreenButton =
                '<div id="fullscreen_button" class="fa fa-expand" onclick="fullscreen()"></div>';
        } else {
            fullscreenButton = "";
        }
        $global.movie.append(
            '<div id="controls">' +
            '    <div id="play_pause_button" class="fa fa-play" onclick="playpause()"></div>' +
            '    <div id="progress_bar">' +
            '        <div id="time_display">0:00</div>' +
            '        <div id="progress_back">' +
            '            <div id="progress_buffered" style="width:0%;"></div>' +
            '            <div id="progress_elapsed" style="width:0%;"></div>' +
            '        <input id="progress_indicator" type="range" step="any" value="0" min="0" max="' +
            $global.video.duration +
            '" oninput="setTime()" onchange="setTime()"></div></div>' +
            '    <div id="volume_speaker_button" class="fa fa-volume-up" onclick="mute()"></div>' +
            '    <div id="volume_bar">' +
            '        <div id="volume_back" style="width:47px; ">' +
            '            <div id="volume_used" style="width:75%; "></div>' +
            '        <input id="volume_indicator" type="range" value="30" min="0" max="40"' +
            '               style="width:50px;" oninput="setVolume()" onchange="setVolume()"></div></div>' +
            fullscreenButton +
            '</div>'
        );
        window.$controls = {
            controls: $("#controls"),
            playButton: $("#play_pause_button"),
            progressIndicator: $("#progress_indicator"),
            progressElapsed: $("#progress_elapsed").get(0),
            progressBuffered: $("#progress_buffered").get(0),
            timeDisplay: $("#time_display"),
            volumeButton: $("#volume_speaker_button"),
            volumeIndicator: $("#volume_indicator"),
            volumeUsed: $("#volume_used").get(0)
        };
        $("#player").attr({
            onclick: "playpause()",
            onpause: "playingpaused()",
            onplay: "playingpaused()",
            onprogress: "buffering()",
            onvolumechange: "volumeused()",
            ontimeupdate: "progress()",
            onended: "pause()"
        });
    }
}

/* CanPlay -> Hide Status, Show Controls and Play*/
function hideLoad() {
    $global.status.removeClass("showing").addClass("hidden");
    if (!controlsCreated) {
        $("#player").attr("controls", "true");
    }
    $global.video.play();
}

/* Change Status to Error Image */
function errorStatus() {
    $global.status
        .removeClass("fa-spinner fa-spin hidden")
        .addClass("fa-times-circle-o showing error");
}

/* Exchange Video Player HTML With New Source */
function swapVideo(movieid) {
    var videolink;
    controlsCreated = false;
    $global.poster.hide();
    var camera = movieid.substring(0, 3);
    var movie_path = quality + "/" + movieid + extension;
    if (camera === "D70") {
        videolink = base + "TimeLapse_D700/" + movie_path;
    } else if (camera === "D90") {
        videolink = base + "TimeLapse_D90/" + movie_path;
    } else if (camera === "D80") {
        videolink = base + "TimeLapse_D80/" + movie_path;
    } else if (camera === "S60") {
        videolink = base + "TimeLapse_S60/" + movie_path;
    } else {
        videolink = base + "Movies/" + movie_path;
    }

    /* Example video */
    // videolink = '../static/sample_video/150317_NorthernLights.mp4'

    /* HTML5 Video */
    var coarse = window.matchMedia("(pointer: coarse)");

    if (coarse.matches) {
        $global.movie.html(
            '<video src="' + videolink + '" id="player" preload="auto" controls></video>' +
            '<span id="status" class="fa fa-circle-o-notch fa-spin hidden"></span>'
        );
    } else {
        $global.movie.html(
            '<span id="status" class="fa fa-circle-o-notch fa-spin showing"></span>' +
            '<video src="' + videolink + '" id="player" preload="auto" onloadedmetadata="addControls()" oncanplay="hideLoad()"></video>'
        );
    }

    $global.movie.height('auto');
    $global.video = $("#player").get(0);
    $global.status = $("#status");
    $global.video.addEventListener("error", errorStatus, true);
    window.location.hash = movieid;
    return false;
}
