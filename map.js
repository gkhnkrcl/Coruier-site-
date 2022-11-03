//SET MAP OPTİONS

var mylatlng = { lat: 41.00824, lng: 28.978359 };
var mapOptions = {
  center: mylatlng,
  zoom: 7,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};

//CREATE MAP

var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

// CREATE A DİRECTİONS SERViCE OBJECT TO USE THE ROUTE METHOD AND GET A RESULT FOR OUR REQUEST.

var directionsService = new google.maps.DirectionsService();

// CREATE  A DİRECTİONSRENDERER OBJECT WHİCH WE WİLL USE TO DİSPLAY

var directionsDisplay = new google.maps.DirectionsRenderer();

//BİND THE DİRECTİONSRENDERER TO THE MAP

directionsDisplay.setMap(map);

//FUNCTİON

function calcRoute() {
  //create request
  var request = {
    origin: document.getElementById("from").value,
    destination: document.getElementById("to").value,
    travelMode: google.maps.TravelMode.DRIVING, // WALKİNG, BYCYCLİNG AND TRANSİT
    unitSystem: google.maps.UnitSystem.İMPERİAL,
  };
  //pass request to the route method
  directionsService.route(request, (result, status) => {
    if (status == google.maps.DirectionsStatus.OK) {
      //get distance and time
      const output_col = document.querySelector(".output_col");
      const addressSection = document.querySelector(".addressSection");
      let mesafe = parseFloat(
        result.routes[0].legs[0].distance.text.replace(",", ".")
      );
      let fıyat = 15;
      let sonuc = mesafe * fıyat;
      console.log(sonuc);

      output_col.innerHTML =
        "<td class='col1' >" +
        document.getElementById("from").value +
        "</td>" +
        "<td class='col2' >" +
        document.getElementById("to").value +
        "</td>" +
        "<td class='col3' >" +
        result.routes[0].legs[0].distance.text +
        "</td>" +
        "<td class='col4' >" +
        result.routes[0].legs[0].duration.text +
        "</td>" +
        "<td class='col5' >" +
        sonuc +
        "TL" +
        "</td>";

        addressSection.style.width = "100%";
        addressSection.style.marginLeft = "0";
  
        $("  .side_address_section").show();
  
        $(".motor_slogan").hide();
  
        setTimeout(() => {
          $(".motor_slogan").show();
          $(".motor_slogan").css(styles);
        }, 500);
  
        var styles = {
          position: "relative",
          top: "15rem",
        };

      //display route
      directionsDisplay.setDirections(result);
     
    } else {
      //delete route from map
      directionsDisplay.setDirections({ routes: [] });
      //center map in ist
      map.setCenter(mylatlng);

      //show error message
      confirm("Lütfen Çıkış ve Varış Adreslerini Giriniz!");
    }
  });
}

// create auto complete objects for all input

var options = {
  types: ["address"],
};

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

//------------------------------------------------------------

