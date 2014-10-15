/* "use strict"; */

$(document).ready(function() {
    var target = $('#target')
    target.prop('src', target.attr("name") + '/' + window.location.hash);

});
