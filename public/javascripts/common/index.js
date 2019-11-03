$(function () {
    $('.slider').on('init', function () {
        $('.slide__content').addClass('on');
    });
    $('.slider').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true
    });
    $('.slider').on('beforeChange', function () {
        $('.slide__content').removeClass('on');
    });
    $('.slider').on('afterChange', function () {
        $('.slide__content').addClass('on');
    });
});