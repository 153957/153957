/* "use strict"; */

$(document).ready(function() {
    var target = $("#target");
    target.prop("src", target.data("album") + window.location.hash.slice(1));
    target.iFrameResize({
        minHeight: 250,
        maxHeight: 2000,
    });
});
