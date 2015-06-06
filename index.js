var LED_PIN = 7;
var BLEFirmata = require('ble-firmata');
var arduino = new BLEFirmata();

// Workaround to connect BLE device after it is powered on.
// After we have a event to know it is already powered on,
// we can remove this workaround.
setTimeout(function() {
  arduino.connect('BLE Shield');
}, 500);

arduino.once('connect', function(){
  console.log('connect');
  var state = true;
  setInterval(function() {
    arduino.digitalWrite(LED_PIN, state);
    state = !state; 
  }, 300);
});
