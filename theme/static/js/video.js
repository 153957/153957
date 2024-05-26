/* "use strict"; */

/* Global variables */
const base = 'https://arne.delaat.net/TimeLapse/'
const extension = '.mp4'
var quality = '960'

var volume = 50
var controlsCreated = false
var progressId

/* Global Selectors */
window.$global = {}

/* Category Slider */
document
    .getElementById('categories')
    .querySelectorAll('.category')
    .forEach(function (category) {
        category.addEventListener('click', function() {
            const thumbs = `${category.id}-content`
            if (!document.getElementById(thumbs).classList.contains('currentslide')) {
                document.getElementById('thumbnails').querySelector('.currentslide').classList.remove('currentslide', 'currentreveal')
                document.getElementById('categories').querySelector('.currentcat').classList.remove('currentcat')
                // First make the item displayed, then add the class to transition the opacity.
                document.getElementById(thumbs).classList.add('currentslide')
                setTimeout(function() {document.getElementById(thumbs).classList.add('currentreveal')}, 0)
                category.classList.add('currentcat')
            }
        })
    })

/* Thumbnail Links */
document
    .getElementById('thumbnails')
    .querySelectorAll('.thumbnail')
    .forEach(function (thumbnail) {
        thumbnail.addEventListener('click', function() {swapVideo(thumbnail.id)})
    })

/* Poster Link */
document.getElementById('poster')?.addEventListener('click', function() {swapVideo(document.getElementById('poster').dataset.id)})

/* Fullscreen Button */
/* Check Full screen support */
function fullscreen() {
    if (document.getElementById('player').requestFullscreen) {
        return function() {document.getElementById('player').requestFullscreen()}
    } else if (document.getElementById('player').mozRequestFullScreen) {
        return function() {document.getElementById('player').mozRequestFullScreen()}
    } else if (document.getElementById('player').webkitRequestFullscreen) {
        return function() {document.getElementById('player').webkitRequestFullscreen()}
    }
    return false
}

/* Load linked video */
if (window.location.hash) {
    const hash_value = window.location.hash.replace('#', '')
    if (document.getElementById(hash_value)) {
        swapVideo(hash_value)
    }
}

/* Set Button */
function playingPaused() {
    document.getElementById('play_pause_button')?.classList.toggle('icon-play', document.getElementById('player').paused)
    document.getElementById('play_pause_button')?.classList.toggle('icon-pause', !document.getElementById('player').paused)
}

/* Ended: Pause */
function pause() {
    document.getElementById('player').pause()
}

/* Play movie and track progress */
function play() {
    document.getElementById('player').play()
        .then(function() {
            if (progressId) {
                clearInterval(progressId)
            }
            progressId = setInterval(progress, 20)
        })
        .catch(function() {
        })
}

/* Play/Pause button action */
function playPause() {
    if (document.getElementById('player').paused) {
        play()
    } else {
        document.getElementById('player').pause()
    }
}

/* Show Progress */
function progress() {
    const currentTime = document.getElementById('player').currentTime
    const percentDone = (currentTime / document.getElementById('player').duration) * 100
    document.getElementById('progress_elapsed')?.style.setProperty('width', `${percentDone}%`)
    document.getElementById('progress_indicator').value = currentTime

    const seconds = Math.max(Math.floor(currentTime % 60), 0).toString().padStart(2, '0')
    const minutes = Math.max(Math.floor(currentTime / 60), 0)
    document.getElementById('time_display').innerHTML = `${minutes}:${seconds}`
    if ($global.current.hasAttribute('data-fps')) {
        // Only set frame number if fps is known
        const frames = Math.max(Math.floor((currentTime % 1) * $global.current.dataset.fps), 0).toString().padStart(2, '0')
        document.getElementById('frame_display').innerHTML = frames
    }

    if (progressId && document.getElementById('player').paused) {
        clearInterval(progressId)
    }
}

/* Step one frame */
function stepFrameFoward() {
    document.getElementById('player').pause()
    document.getElementById('player').currentTime += 1 / $global.current.dataset.fps
}

function stepFrameBackward() {
    document.getElementById('player').pause()
    document.getElementById('player').currentTime -= 1 / $global.current.dataset.fps
}

/* Show Buffering */
function buffering() {
    let maxBuffered = 0.0
    if (document.getElementById('player').buffered.length > 0) {
        maxBuffered = document.getElementById('player').buffered.end(0)
    }
    const percentBuffered = (maxBuffered / document.getElementById('player').duration) * 100
    document.getElementById('progress_buffered')?.style.setProperty('width', `${percentBuffered}%`)
}

/* Select Time */
function setTime() {
    document.getElementById('player').currentTime = document.getElementById('progress_indicator').value
}

/* Mute */
function mute() {
    if (document.getElementById('player').muted || document.getElementById('player').volume === 0 || volume === 0) {
        document.getElementById('volume_indicator').value = 50
    } else {
        document.getElementById('volume_indicator').value = 0
    }
}

/* Change Volume */
function setVolume() {
    document.getElementById('player').volume = document.getElementById('volume_indicator')?.value / 100
}

/* Video volume changed, store value and update UI */
function volumeUsed() {
    volume = parseInt(document.getElementById('player').volume * 100, 10)
    volumeUI()
}

function volumeUI() {
    document.getElementById('volume_indicator').value = volume
    document.getElementById('volume_speaker_button').classList.toggle('icon-volume-off', volume === 0)
    document.getElementById('volume_speaker_button').classList.toggle('icon-volume-down', 0 < volume && volume < 50)
    document.getElementById('volume_speaker_button').classList.toggle('icon-volume-up', volume >= 50)
}

/* Toggle quality*/
function toggleQuality() {
    quality = quality === '960' ? '1920' : '960'
    swapVideo($global.current.id)
}

/* Metadata Loaded -> Set Width/Height/Margins */
function addControls() {
    /* Attach Webkit Controls */
    if (!controlsCreated) {
        let fowardStepButton = ''
        let backwardStepButton = ''
        let frameDisplay = ''
        let audioControls = ''
        let qualityToggleButton = ''
        let fullscreenButton = ''
        controlsCreated = true

        if ($global.current.hasAttribute('data-fps')) {
            // Video framerate is known
            fowardStepButton =
                '<div id="step_frame_forward" class="icon icon-step-forward" title="Step frame forward"></div>'
            backwardStepButton =
                '<div id="step_frame_backward" class="icon icon-step-backward" title="Step frame backward"></div>'
            frameDisplay =
                '<div id="frame_display" title="Subsecond frame">00</div>'
        }
        if ($global.current.hasAttribute('data-audio')) {
            // Video has an audio track
            audioControls = `
                <div id="volume_speaker_button" class="icon icon-volume-up" title="(Un)mute audio"></div>
                <div id="volume_bar">
                    <div id="volume_back">
                        <input id="volume_indicator" type="range" value="50" min="0" max="100">
                    </div>
                </div>
            `
        }
        if ($global.current.hasAttribute('data-1920')) {
            // HQ version available
            qualityToggleButton =
                `<div id="quality_toggle" class="quality_${quality}" title="Toggle high quality">HQ</div>`
        }
        if (fullscreen()) {
            fullscreenButton =
                '<div id="fullscreen_button" class="icon icon-resize-full" title="Fullscreen"></div>'
        }

        const controls = `
            <div id="controls">
                ${backwardStepButton}
                <div id="play_pause_button" class="icon icon-play" title="Toggle play/pause"></div>
                ${fowardStepButton}
                <div id="progress_bar">
                    <div id="time_display" title="Elapsed time">0:00</div>
                    ${frameDisplay}
                    <div id="progress_back">
                        <div id="progress_buffered" style="width: 0;"></div>
                        <div id="progress_elapsed" style="width: 0;"></div>
                        <input id="progress_indicator" type="range" step="any" value="0"
                               min="0" max="${document.getElementById('player').duration}">
                    </div>
                </div>
                ${audioControls}
                ${qualityToggleButton}
                ${fullscreenButton}
            </div>
        `
        document.getElementById('movie').insertAdjacentHTML('beforeend', controls)

        document.getElementById('player').addEventListener('pause', playingPaused)
        document.getElementById('player').addEventListener('play', playingPaused)
        document.getElementById('player').addEventListener('progress', buffering)
        document.getElementById('player').addEventListener('volumechange', volumeUsed)
        document.getElementById('player').addEventListener('timeupdate', progress)
        document.getElementById('player').addEventListener('ended', pause)
        document.getElementById('player').addEventListener('click', playPause)

        document.getElementById('progress_indicator').addEventListener('input', setTime)
        document.getElementById('progress_indicator').addEventListener('change', setTime)

        document.getElementById('play_pause_button')?.addEventListener('click', playPause)
        document.getElementById('step_frame_forward')?.addEventListener('click', stepFrameFoward)
        document.getElementById('step_frame_backward')?.addEventListener('click', stepFrameBackward)

        document.getElementById('volume_speaker_button')?.addEventListener('click', mute)
        document.getElementById('volume_indicator')?.setAttribute('value', volume)
        document.getElementById('volume_indicator')?.addEventListener('input', setVolume)
        document.getElementById('volume_indicator')?.addEventListener('change', setVolume)

        document.getElementById('quality_toggle')?.addEventListener('click', toggleQuality)
        document.getElementById('fullscreen_button')?.addEventListener('click', fullscreen())
    }
}

/* CanPlay -> Hide Status, Show Controls and Play*/
function hideLoad() {
    document.getElementById('status').classList.remove('showing')
    document.getElementById('status').classList.add('hidden')
    if (!controlsCreated) {
        document.getElementById('player').attr('controls', 'true')
    }
    play()
}

/* Change Status to Error Image */
function errorStatus() {
    document.getElementById('status').classList.remove('icon-circle-notch icon-spin hidden')
    document.getElementById('status').classList.add('icon-cancel-circled showing error')
}

/* Exchange Video Player HTML With New Source */
function swapVideo(movieid) {
    controlsCreated = false
    document.getElementById('poster')?.classList.add('hidden')

    document
        .getElementById('thumbnails')
        .querySelectorAll('.thumbnail')
        .forEach(thumbnail => thumbnail.classList.remove('currentmovie'))
    $global.current = document.getElementById(movieid)
    $global.current.classList.add('currentmovie')

    let currentQuality = quality
    if (!$global.current.hasAttribute(`data-${quality}`)) {
        // Requested quality not available for the chosen movie, use default fallback
        currentQuality = '960'
    }
    const videolink = `${base}${currentQuality}/${movieid}${extension}`

    /* Example video */
    // videolink = '../static/sample_video/150317_NorthernLights.mp4'

    /* HTML5 Video */
    const coarse = window.matchMedia('(pointer: coarse)')

    if (coarse.matches) {
        document.getElementById('movie').innerHTML = `
            <video src="${videolink}" id="player" preload="auto" controls></video>
            <span id="status" class="icon icon-circle-notch icon-spin hidden"></span>
        `
    } else {
        document.getElementById('movie').innerHTML = `
            <span id="status" class="icon icon-circle-notch icon-spin showing"></span>
            <video src="${videolink}" id="player" preload="auto"></video>
        `
        document.getElementById('player').addEventListener('loadedmetadata', addControls, {'once': true})
        document.getElementById('player').addEventListener('canplay', hideLoad, {'once': true})
    }

    document.getElementById('player').addEventListener('error', errorStatus, true)
    window.location.hash = movieid
}
