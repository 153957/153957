/* "use strict"; */

/* Global variables */
var base = "https://arne.delaat.net/"; /* "https://delaat.me/"; */
var quality = "960";
var extension = ".mp4";

var volume = 50;
var controlsCreated = false;
var fullscreen = false;
var progressId;

/* Initiate */
$(document).ready(function() {
    /* Global Selectors */
    window.$global = {
        thumbnails: $("#thumbnails").find(".thumbnail"),
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
            $("#thumbnails .currentslide").removeClass("currentslide currentreveal");
            $("#categories .currentcat").removeClass("currentcat");
            // First make the item displayed, then add the class to transition the opacity.
            $("#" + thumbs).addClass("currentslide")
            setTimeout(function() {$("#" + thumbs).addClass("currentreveal")}, 0);
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
    $("#thumbnails").on("click", ".thumbnail", function() {
        swapVideo(this.id);
        return false;
    });

    /* Poster Link */
    $global.poster.on("click", function() {
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
function playingPaused() {
    $controls.playButton.toggleClass("icon-play", $global.video.paused);
    $controls.playButton.toggleClass("icon-pause", !$global.video.paused);
}

/* Ended: Pause */
function pause() {
    $global.video.pause();
}

/* Play movie and track progress */
function play() {
    $global.video.play();
    if (progressId) {
        clearInterval(progressId);
    }
    progressId = setInterval(progress, 20);
}

/* Play/Pause button action */
function playPause() {
    if ($global.video.paused) {
        play();
    } else {
        $global.video.pause();
    }
    return false;
}

/* Show Progress */
function progress() {
    var currentTime = $global.video.currentTime;
    var percentDone = currentTime / $global.video.duration * 100;
    $controls.progressElapsed.style.width = percentDone + "%";
    $controls.progressIndicator.val(currentTime);
    // Ensure length of 2 characters (left pad with zero)
    var seconds = ("0" + Math.max(Math.floor(currentTime % 60), 0)).slice(-2);
    var minutes = Math.max(Math.floor(currentTime / 60), 0);
    $controls.timeDisplay.html(minutes + ":" + seconds);
    if ($global.current.hasAttribute('data-fps')) {
        // Only set frame number if fps is known
        var frames = ("0" + Math.max(Math.floor(currentTime % 1 * $global.current.dataset.fps), 0)).slice(-2);
        $controls.frameDisplay.html(frames);
    }
    if (progressId && $global.video.paused) {
        clearInterval(progressId);
    }
}

/* Step one frame */
function stepFrameFoward() {
    $global.video.pause();
    $global.video.currentTime += 1 / $global.current.dataset.fps;
}

function stepFrameBackward() {
    $global.video.pause();
    $global.video.currentTime -= 1 / $global.current.dataset.fps;
}

/* Show Buffering */
function buffering() {
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
    if ($global.video.muted || $global.video.volume === 0 || volume === 0) {
        $controls.volumeIndicator.val(50).trigger("change");
    } else {
        $controls.volumeIndicator.val(0).trigger("trigger");
    }
}

/* Change Volume */
function setVolume() {
    $global.video.volume = $controls.volumeIndicator.val() / 100;
}

/* Video volume changed, store value and update UI */
function volumeUsed() {
    volume = parseInt($global.video.volume * 100, 10);
    volumeUI();
}

function volumeUI() {
    $controls.volumeIndicator.val(volume);
    $controls.volumeButton.toggleClass("icon-volume-off", volume === 0);
    $controls.volumeButton.toggleClass("icon-volume-down", 0 < volume && volume < 50);
    $controls.volumeButton.toggleClass("icon-volume-up", volume >= 50);
}

/* Toggle quality*/
function toggleQuality() {
    quality = quality === '960' ? '1920' : '960';
    swapVideo($global.current.id);
}

/* Metadata Loaded -> Set Width/Height/Margins */
function addControls() {
    /* Attach Webkit Controls */
    if (!controlsCreated) {
        var fowardStepButton = "";
        var backwardStepButton = "";
        var frameDisplay = "";
        var audioControls = "";
        var qualityToggleButton = "";
        var fullscreenButton = "";
        controlsCreated = true;

        if ($global.current.hasAttribute('data-fps')) {
            // Video framerate is known
            fowardStepButton =
                '<div id="step_frame_forward" class="icon icon-step-forward" onclick="stepFrameFoward()" title="Step frame forward"></div>';
            backwardStepButton =
                '<div id="step_frame_backward" class="icon icon-step-backward" onclick="stepFrameBackward()" title="Step frame backward"></div>';
            frameDisplay =
                '<div id="frame_display">00</div>';
        }
        if ($global.current.hasAttribute('data-audio')) {
            // Video has an audio track
            audioControls =
                '<div id="volume_speaker_button" class="icon icon-volume-up" onclick="mute()" title="(Un)mute audio"></div>' +
                '<div id="volume_bar">' +
                '    <div id="volume_back">' +
                '        <input id="volume_indicator" type="range" value="50" min="0" max="100"' +
                '               oninput="setVolume()" onchange="setVolume()">' +
                '    </div>' +
                '</div>';
        }
        if ($global.current.hasAttribute('data-1920')) {
            // HQ version available
            qualityToggleButton =
                '<div id="quality_toggle" class="quality_' + quality + '" onclick="toggleQuality()" title="Toggle high quality">HQ</div>';
        }
        if (fullscreen) {
            fullscreenButton =
                '<div id="fullscreen_button" class="icon icon-resize-full" onclick="fullscreen()" title="Fullscreen"></div>';
        }

        $global.movie.append(
            '<div id="controls">' +
            backwardStepButton +
            '    <div id="play_pause_button" class="icon icon-play" onclick="playPause()" title="Toggle play/pause"></div>' +
            fowardStepButton +
            '    <div id="progress_bar">' +
            '        <div id="time_display">0:00</div>' +
            frameDisplay +
            '        <div id="progress_back">' +
            '            <div id="progress_buffered" style="width: 0;"></div>' +
            '            <div id="progress_elapsed" style="width: 0;"></div>' +
            '            <input id="progress_indicator" type="range" step="any" value="0"' +
            '                   min="0" max="' + $global.video.duration + '" oninput="setTime()" onchange="setTime()">' +
            '        </div>' +
            '    </div>' +
            audioControls +
            qualityToggleButton +
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
            frameDisplay: $("#frame_display"),
            volumeButton: $("#volume_speaker_button"),
            volumeIndicator: $("#volume_indicator"),
        };
        $("#player").attr({
            onclick: "playPause()",
            onpause: "playingPaused()",
            onplay: "playingPaused()",
            onprogress: "buffering()",
            onvolumechange: "volumeUsed()",
            ontimeupdate: "progress()",
            onended: "pause()"
        });
        $controls.volumeIndicator.val(volume).trigger("change");
    }
}

/* CanPlay -> Hide Status, Show Controls and Play*/
function hideLoad() {
    $global.status.removeClass("showing").addClass("hidden");
    if (!controlsCreated) {
        $("#player").attr("controls", "true");
    }
    play();
}

/* Change Status to Error Image */
function errorStatus() {
    $global.status
        .removeClass("icon-circle-notch icon-spin hidden")
        .addClass("icon-times-circle-o showing error");
}

/* Exchange Video Player HTML With New Source */
function swapVideo(movieid) {
    var videolink;

    controlsCreated = false;
    $global.poster.hide();

    $global.thumbnails.removeClass("currentmovie");
    $global.current = $('#' + movieid).get(0);
    $global.current.classList.add("currentmovie");

    var currentQuality = quality;
    if (!$global.current.hasAttribute('data-' + quality)) {
        // Requested quality not available for the chosen movie, use default fallback
        currentQuality = '960';
    }
    var camera = movieid.substring(0, 3);
    var movie_path = currentQuality + "/" + movieid + extension;
    if (camera === "D70") {
        videolink = base + "TimeLapse_D700/" + movie_path;
    } else if (camera === "D50") {
        videolink = base + "TimeLapse_D500/" + movie_path;
    } else if (camera === "D30") {
        videolink = base + "TimeLapse_D300/" + movie_path;
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
            '<span id="status" class="icon icon-circle-notch icon-spin hidden"></span>'
        );
    } else {
        $global.movie.html(
            '<span id="status" class="icon icon-circle-notch icon-spin showing"></span>' +
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
