/* "use strict"; */

$(document).ready(function() {

    $('#topics').on('click', ".category", function() {
        var numm = $(this).attr("id")+'-content';
        if ($(this).get(0) != $('#topics').find('div.currentcat').get(0)) {
            $('#tips_content').find('div.currentslide').animate({height: "hide", opacity: "hide"}, "slow").removeClass("currentslide").addClass("slidehide");
            $('#'+numm).animate({height: "show", opacity: "show"}, "slow").removeClass("slidehide").addClass("currentslide");
            $('#topics').find('div.currentcat').removeClass("currentcat")
            $(this).addClass("currentcat")
        }
    });

    $('#topics').on('click', "#all", function() {
        $('#tips_content').find('div.slidehide').animate({height: "show", opacity: "show"}, "slow").removeClass("slidehide").addClass("currentslide");
        $('#topics').find('div.currentcat').removeClass("currentcat")
        $(this).addClass("currentcat")
    });

});
