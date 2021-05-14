const key = '4180292dbfa56cbd1a0870c8daf196a2';
if(key=='') document.getElementById('temp').innerHTML = ('Remember to add your api key!');

function weatherNode( cityID ) {
	fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)  
	.then(function(resp) { return resp.json() }) 
	.then(function(data) {
		drawWeather(data);
        safeLanding(data);  
	})
	.catch(function() {
	});
}
function drawWeather( d ) {
  var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
  var description = d.weather[0].description;
  var wind = d.speed; 
	
	document.getElementById('description').innerHTML = description;
	document.getElementById('temp').innerHTML = celcius + '&deg; C';
	document.getElementById('location').innerHTML = d.name;
    document.getElementById('wind').innerHTML = `Wind: ${d.wind.speed} m/s`;
  
}
window.onload = function() {
	weatherNode( 4149959 );
    loadImg();
}

function loadImg(d){
    img = 'https://api.nasa.gov/planetary/earth/imagery?lon=-80.831495&lat=28.408313&dim=0.06&api_key=fEy5DSsNxgNeaaTA92BXtRf6xbB5mGuAI9qhRjDP'
    document.getElementById('bg').src = img;
}

function safeLanding( d ) {
    var landing = true;
    let inst = ""
    
    if (d.wind.speed > 10){var landing = false;};
    if (d.clouds.all > 60){var landing = false;};
    if (d.weather.main == 'Thunderstorm' || d.weather.main == 'Rain' ||  d.weather.main == 'Snow'){var landing = false;};
    
    if (landing == true) {
        inst = "Proceed With Landing!";
        document.getElementById('landText').style.color = 'lime';
    }
    if (landing == false) {
        inst = "Delay Landing!";
        document.getElementById('landText').style.color = 'red';
    }
    document.getElementById('landText').innerHTML = inst;
}
