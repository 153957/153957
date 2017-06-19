/* "use strict"; */

$(document).ready(function() {
    $("#topics").on("click", ".category", function() {
        var numm = $(this).attr("id") + "-content";
        if ($(this).get(0) !== $("#topics .currentcat").get(0)) {
            $("#tips_content .currentslide")
                .animate({height: "hide", opacity: "hide"}, "slow")
                .removeClass("currentslide");
            $("#" + numm)
                .animate({height: "show", opacity: "show"}, "slow")
                .addClass("currentslide");
            $("#topics .currentcat").removeClass("currentcat");
            $(this).addClass("currentcat");
        }
    });

    $("#topics").on("click", "#all", function() {
        $("#tips_content .slide")
            .animate({height: "show", opacity: "show"}, "slow")
            .addClass("currentslide");
        $("#topics .currentcat").removeClass("currentcat");
        $(this).addClass("currentcat");
    });
});
