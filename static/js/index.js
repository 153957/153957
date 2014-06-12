/* "use strict"; */
var tips, idx1, idx2, idx3;

/* Initiate Tips */
$(document).ready(function() {
    tips = $('.collage');
    tips.tipTip({attribute: "alt", delay: "25", defaultPosition: "top", edgeOffset: -7});
    idx1 = $('#idx1');
    idx2 = $('#idx2');
    idx3 = $('#idx3');
    /* setInterval('swapCollage()', 2000); */
});

function swapCollage() {
    if (idx1.hasClass('idx_1_6')) {idx1.addClass('idx_1_1').removeClass('idx_1_6');}
    if (idx1.hasClass('idx_1_5')) {idx1.addClass('idx_1_6').removeClass('idx_1_5');}
    if (idx1.hasClass('idx_1_4')) {idx1.addClass('idx_1_5').removeClass('idx_1_4');}
    if (idx1.hasClass('idx_1_3')) {idx1.addClass('idx_1_4').removeClass('idx_1_3');}
    if (idx1.hasClass('idx_1_2')) {idx1.addClass('idx_1_3').removeClass('idx_1_2');}
    if (idx1.hasClass('idx_1_1')) {idx1.addClass('idx_1_2').removeClass('idx_1_1');}

    if (idx2.hasClass('idx_2_4')) {idx2.addClass('idx_2_1').removeClass('idx_2_4');}
    if (idx2.hasClass('idx_2_3')) {idx2.addClass('idx_2_4').removeClass('idx_2_3');}
    if (idx2.hasClass('idx_2_2')) {idx2.addClass('idx_2_3').removeClass('idx_2_2');}
    if (idx2.hasClass('idx_2_1')) {idx2.addClass('idx_2_2').removeClass('idx_2_1');}

    if (idx3.hasClass('idx_3_3')) {idx3.addClass('idx_3_1').removeClass('idx_3_3');}
    if (idx3.hasClass('idx_3_2')) {idx3.addClass('idx_3_3').removeClass('idx_3_2');}
    if (idx3.hasClass('idx_3_1')) {idx3.addClass('idx_3_2').removeClass('idx_3_1');}
}
