// Simple google appscript to export the data I want to show in the visualizer
function generateJson() {

  var locations = new Map();
  var geoCoder = Maps.newGeocoder();

  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  for (var i = 0; i < data.length; i++) {

    if(data[i][9]) {
      // If city exist, use it
      var city = data[i][9];
      var state = data[i][10];
      var firstName = data[i][0];

      var geoData = geoCoder.geocode(city + " " + state);

      // Logger.log("geocode tst: " + geoData.results[0].geometry.location.lat + " " + geoData.results[0].geometry.location.lng);
      
      if(locations.has(city)) {
        // someone already in this city, just increment the count
        var currentEntry = locations.get(city);
        currentEntry.hologrammers += 1;
        currentEntry.names += (", " + firstName);
        locations.set(city, currentEntry);
      } else {
        locations.set(city, {"city": city, "state": state, "hologrammers": 1, "names": firstName, "latitude": geoData.results[0].geometry.location.lat, "longitude": geoData.results[0].geometry.location.lng});
      }
    }
  }

  var jsonString = "";
  locations.forEach((loc) => {
    jsonString += JSON.stringify(loc) + ",";
  })
  Logger.log("JSON: " + jsonString);
}
