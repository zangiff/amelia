ymaps.ready(function () {
    var map = new ymaps.Map('map', {
        center: [55.80511504758118, 37.56822820800397],
        zoom: 16,
        controls: []
    });
    
    var squarePlacemark = new ymaps.Placemark(
        [55.80511504758118, 37.56822820800397],
          {
          baloonContent: "<div class='ya_map'>г. Москва, ул. 2-я Хуторская, д. 38А</div>",
          hintContent: 'AMELIA',
          // preset: 'twirl#theaterIcon',
        },
          {
            iconLayout: "default#image",
            iconImageHref: "./img/map-tooltip.png",
            iconImageSize: [388, 150],
            iconImageOffset: [-3, -42]

        });
    map.geoObjects.add(squarePlacemark);
    squarePlacemark.baloon.open();
});
