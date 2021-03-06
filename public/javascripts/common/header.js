$(function () {
    $('.nav-menu').hover(function () {
        $(this).find('label').css('color', '#000000');
        $(this).find('span').css('border-color', '#000000 transparent transparent transparent');
    }, function () {
        $(this).find('label').css('color', '#878787');
        $(this).find('span').css('border-color', '#878787 transparent transparent transparent');
    });
    $('.nav-menu-drop-button').click(function () {
        $(this).next('.nav-inner').slideToggle();
        $('.nav-menu-drop-button').not($(this)).next('.nav-inner').slideUp();
    });
    $(document).on('click', function (e) {
        if (!$(e.target).closest('ul.nav-menu-list').length) {
            $('.nav-inner').slideUp();
        }
    });
});