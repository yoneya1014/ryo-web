function initMap() {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': '北海道函館市戸倉町14-1 函館高専 春潮寮'
    }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            const map = new google.maps.Map(document.getElementById('map'), {
                'center': {
                    'lat': lat,
                    'lng': lng
                },
                'zoom': 16,
                'mapTypeid': google.maps.MapTypeId.ROADMAP
            });
            const marker = new google.maps.Marker({
                'position': {
                    'lat': lat,
                    'lng': lng
                },
                'map': map
            });
            const infoWindow = new google.maps.InfoWindow({
                content: '<div class="map-modal">' +
                    '<p class="map-modal-title">函館高専 春潮寮</p>' +
                    '<p class="map-modal-postal-code">〒042-8501</p>' +
                    '<p class="map-modal-address">北海道函館市戸倉町14-1<br/>函館高専 春潮寮</p>' +
                    '<a class="map-modal-link" href="https://www.google.com/maps/place/%E5%87%BD%E9%A4%A8%E9%AB%98%E5%B0%82+%E6%98%A5%E6%BD%AE%E5%AF%AE/@41.7824967,140.7997116,15z/data=!4m5!3m4!1s0x0:0x13cdac35e5bc8a90!8m2!3d41.7824967!4d140.7997116">Googleマップで表示</a>' +
                    '</div>'
            });
            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
        } else {
            $('#map-status').text('現在利用できません');
        }
    });
}

$(function () {
    $('#access-list1').on('click', function () {
        $('.js-modal1').fadeIn(300, null);
    });
    $('#access-list2').on('click', function () {
        $('.js-modal2').fadeIn(300, null);
    });
    $('.js-modal-close').on('click', function () {
        $('.modal').fadeOut(300, null);
    });
    $('.close-button').on('click', function () {
        $('.modal').fadeOut(300, null);
    });
    $('.close-button').on({
        'mouseenter': function () {
            $('.button-line').css('width', '30px');
        },
        'mouseleave': function () {
            $('.button-line').css('width', '20px');
        }
    });
});