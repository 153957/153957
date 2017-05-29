/* "use strict"; */

$(document).ready(function() {
    var target = $('#target');
    target.prop('src', target.data("album") + window.location.hash.slice(1));
});
