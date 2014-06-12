/* "use strict"; */

$(document).ready(function() {

    $('#topics').on('click', ".cata", function() {
        var numm = $(this).attr("id")+'-content';
        if ($(this).get(0) != $('#topics .catacur').get(0)) {
            $('#tips_content .currentslide').animate({height: "hide", opacity: "hide"}, "slow", 'swing').removeClass("currentslide").addClass("slidehide");
            $('#'+numm).animate({height: "show", opacity: "show"}, "slow", 'swing').removeClass("slidehide").addClass("currentslide");
            $('#topics .catacur').removeClass("catacur")
            $(this).addClass("catacur")
        }
    });

    $('#topics').on('click', "#all", function() {
        $('#tips_content .slidehide').animate({height: "show", opacity: "show"}, "slow", 'swing').removeClass("slidehide").addClass("currentslide");
        $('#topics .catacur').removeClass("catacur")
        $(this).addClass("catacur")
    });

});
