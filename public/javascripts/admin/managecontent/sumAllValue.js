$(() => {
    $('.m-grade1').on('keyup', () => {
        let sum = 0;
        $('.m-grade1').each((index, element) => {
            sum += parseInt($(element).val());
        });
        if (!isNaN(sum)) {
            $('#sum-m-1').text(sum);
        } else {
            $('#sum-m-1').text('');
        }
    });
    $('input').on('keydown', (e) => {
        let keycode = e.keyCode;
        if (!((keycode >= 48 && keycode <= 57) || (keycode >= 96 && keycode <= 105) || keycode == 32 || keycode == 8 || keycode == 46 || keycode == 39 || keycode == 37 || keycode == 9)) {
            return false;
        }
    });
});