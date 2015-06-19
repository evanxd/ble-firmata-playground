var LED_PIN = 7;
var BLEFirmata = require('ble-firmata');
var arduinos = [];

['BLEShield1', 'BLEShield2'].forEach(function(name) {
  var arduino = new BLEFirmata();
  arduinos.push(arduino);
  // Workaround to connect BLE device after it is powered on.
  // After we have a event to know it is already powered on,
  // we can remove this workaround.
  setTimeout(function() {
    arduino.connect(name);
  }, 500);
});

arduinos.forEach(function(arduino) {
  arduino.once('connect', function(){
    console.log(arduino.peripheral_name + ' is connected.');
    if (arduinos.every(checkConection)) {
      var state = true;
      setInterval(function() {
        arduinos.forEach(function(arduino) {
          arduino.digitalWrite(LED_PIN, state);
        });
        state = !state; 
      }, 300); 
    }
  });
});

function checkConection(arduino) {
  return arduino.ble.state === 'connected';
}
