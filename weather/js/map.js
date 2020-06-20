function initMap() {

  // マップの初期化
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4.7,
    center: {lat: 37.38992, lng: 139.06065}
  });

  // クリックイベントを追加
  map.addListener('click', function(e) {
    lat_lng(e.latLng, map);
  });
}

function lat_lng(lat_lng, map) {

  // 座標を表示
  document.getElementById('lat').textContent = lat_lng.lat();
  document.getElementById('lng').textContent = lat_lng.lng();

  // マーカーを設置
  var marker = new google.maps.Marker({
    position: lat_lng,
    map: map
  });

  // 座標の中心をずらす
  // http://syncer.jp/google-maps-javascript-api-matome/map/method/panTo/
  map.panTo(lat_lng);

  const APIKEY = "804adf5ceb10473a601691135fb3fcbe";

  //翌日9時のデータの場所を割り出す
  const date = new Date();
  const nowHour = date.getHours();
  const Tomorrow = Math.floor((24 - nowHour + 9) / 3);
  const DayAfterTomorrow = Math.floor((24 - nowHour + 33) / 3);

  const lat = lat_lng.lat()
  const lon = lat_lng.lng();

  //現在の天気データを呼び出し

              $.ajax({
                  url: "http://api.openweathermap.org/data/2.5/weather",
                  dataType: "jsonp",
                  data: "lat=" + lat + "&lon=" + lon + "&appid=" + APIKEY,
                  //天気データ呼び出し成功時の挙動
                  success: function (data) {
                      if (data.weather[0].main === "Clear") {
                          $('.dayWeather').text("晴れ");
                      } else if (data.weather[0].main === "Rain") {
                          $('.dayWeather').text("雨");
                      } else if (data.weather[0].main === "Clouds") {
                          $('.dayWeather').text("くもり");
                      } else if (data.weather[0].main === "Snow") {
                          $('.dayWeather').text("雪");
                      }

                      //各データの表示
                      $('.nowTemp').text(Math.floor((data.main.temp - 273.15) * 10) / 10);
                      $('.dayWeatherIcon').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png ');
                  }
              });

    //明日の天気データを呼び出し

              $.ajax({
                url: "http://api.openweathermap.org/data/2.5/forecast",
                dataType: "jsonp",
                data: "lat=" + lat + "&lon=" + lon + "&appid=" + APIKEY,
                //天気データ呼び出し成功時の挙動
                success: function (data) {

                    //翌日9時の天気データ
                    const targetData1 = data.list[Tomorrow];
                    const targetData2 = data.list[DayAfterTomorrow];

                    if (targetData1.weather[0].main === "Clear") {
                        $('.tomorrowWeather').text("晴れ");
                    } else if (targetData1.weather[0].main === "Rain") {
                        $('.tomorrowWeather').text("雨");
                    } else if (targetData1.weather[0].main === "Clouds") {
                        $('.tomorrowWeather').text("くもり");
                    } else if (targetData1.weather[0].main === "Snow") {
                        $('.tomorrowWeather').text("雪");
                    }

                    if (targetData2.weather[0].main === "Clear") {
                        $('.dayAfterTomorrowWeather').text("晴れ");
                    } else if (targetData2.weather[0].main === "Rain") {
                        $('.dayAfterTomorrowWeather').text("雨");
                    } else if (targetData2.weather[0].main === "Clouds") {
                        $('.dayAfterTomorrowWeather').text("くもり");
                    } else if (targetData2.weather[0].main === "Snow") {
                        $('.dayAfterTomorrowWeather').text("雪");
                    }

                    ///各データの表示
                   $('.tomorrowTemp').text(Math.floor((targetData1.main.temp - 273.15) * 10) / 10);
                   $('.tomorrowWeatherIcon').attr('src', 'http://openweathermap.org/img/w/' + targetData1.weather[0].icon + '.png ');
                   $('.dayAfterTomorrowTemp').text(Math.floor((targetData2.main.temp - 273.15) * 10) / 10);
                   $('.dayAfterTomorrowWeatherIcon').attr('src', 'http://openweathermap.org/img/w/' + targetData2.weather[0].icon + '.png ');
               }
           });
       }
