$(() => {
    $('#imgfiles').change((event1) => {
        if (!event1.target.files.length) {
            $('#next_image_space').html('<label>画像が選択されていません</label>');
            return;
        }
        $('#next_image_space').html('<img id="next_image" class="greeting_image"/>');
        const reader = new FileReader();
        $('#next_image').attr('src', '');
        reader.onload = (event2) => {
            $('#next_image').attr('src', event2.target.result);
        };
        reader.readAsDataURL(event1.target.files[0]);
        $('#next_image').css('opacity', 1);
    });
});