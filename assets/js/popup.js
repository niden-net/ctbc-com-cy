function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function show_popup() {
    var target = jQuery(window.location.hash);
    target = target.length ? target : jQuery('[name=' + window.location.hash.slice(1) + ']');

    if (target.length) {

        jQuery('html,body').animate({
            scrollTop: (target.offset().top - 130)
        }, 1000);

        return false;
    }
};

//jQuery(document).ready(function(){
jQuery(window).load(function () {


    jQuery('#menu-item-en-visual-tour > a').click(
        function () {
            var port = '';
            if (window.location.port !== 80 || window.location.port !== 443) {
                port = ':' + window.location.port;
            }
            window.location.href = window.location.protocol + '//' + window.location.hostname + port +  "/en/visual-tour/";
        }
    );

    jQuery('#menu-item-ru-visual-tour > a').click(
        function () {
            var port = '';
            if (window.location.port !== 80 || window.location.port !== 443) {
                port = ':' + window.location.port;
            }
            window.location.href = window.location.protocol + '//' + window.location.hostname + port +  "/ru/visual-tour/";
        }
    );

    //var section =  getUrlParameter('section');

    jQuery('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = jQuery(this.hash);
            target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');

            if (target.length) {

                jQuery('html,body').animate({
                    scrollTop: (target.offset().top - 130)
                }, 1000);

                return false;
            }
        }
    });

//var elem = jQuery('#_' + window.location.hash.replace('#', ''));

    if (window.location.hash != '') {
        /*
var scrollTop     = jQuery(window).scrollTop();
var elementOffset = jQuery(window.location.hash).offset().top;
var elementheight = jQuery(window.location.hash).height();

var distance      = elementOffset - jQuery(window).height();

jQuery('html,body').animate({ scrollTop: (distance) }, 1000);

var locationid = window.location.hash;

jQuery(window.location.hash)[0].scrollIntoView();

jQuery('html,body').animate({
scrollTop: (elementOffset-130)
}, 1000);
*/

        var target = jQuery(window.location.hash);
        target = target.length ? target : jQuery('[name=' + window.location.hash.slice(1) + ']');

        //window.setTimeout( show_popup, 500 );
        show_popup();
    }

});
