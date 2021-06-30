radio.onReceivedNumber(function (receivedNumber) {
    onoff = receivedNumber
    AnzahlPixel = receivedNumber
    // Licht wird an der Spitze empfangen
    Position = striplaenge
})
input.onButtonPressed(Button.A, function () {
    AnzahlPixel += -1
})
input.onButtonPressed(Button.AB, function () {
    if (onoff != 0) {
        radio.sendNumber(AnzahlPixel)
        radio.sendValue("rot", rot)
        radio.sendValue("gruen", gruen)
        radio.sendValue("blau", blau)
        onoff = 0
    } else {
        radio.sendNumber(0)
        onoff = 1
    }
})
input.onButtonPressed(Button.B, function () {
    AnzahlPixel += 1
})
radio.onReceivedValue(function (name, value) {
    if (name == "rot") {
        rot = value
    } else if (name == "gruen") {
        gruen = value
    } else {
        blau = value
    }
})
let blau = 0
let gruen = 0
let rot = 0
let Position = 0
let onoff = 0
let AnzahlPixel = 0
let striplaenge = 0
striplaenge = 75
let strip = neopixel.create(DigitalPin.P0, striplaenge, NeoPixelMode.RGB)
let range = strip.range(0, 60)
AnzahlPixel = 6
onoff = 1
Position = strip.length() / 2
rot = 200
radio.setGroup(1)
basic.forever(function () {
    basic.clearScreen()
    strip.clear()
    Position += pins.map(
    input.acceleration(Dimension.X),
    0,
    1023,
    0,
    3
    )
    Position = Math.constrain(Position, 0, striplaenge - AnzahlPixel)
    if (input.isGesture(Gesture.Shake)) {
        rot = randint(2, 255)
        gruen = randint(2, 255)
        blau = randint(2, 255)
    }
    AnzahlPixel = Math.constrain(AnzahlPixel, 1, striplaenge)
    for (let Index = 0; Index <= AnzahlPixel - 1; Index++) {
        strip.setPixelColor(Index + Position, neopixel.rgb(rot, gruen, blau))
    }
    if (onoff == 0) {
        strip.clear()
    }
    strip.show()
})
