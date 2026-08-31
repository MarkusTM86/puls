/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace Puls {
    /**
Skriv vad här
 * @param n describe parameter here, eg: 5
 * @param s describe parameter here, eg: "Hello"
 * @param e describe parameter here
 */
    //% block
export function Puls_highlow() {
    serial.writeLine("" + (pins.map(
        pins.analogReadPin(AnalogPin.P0),
        Min,
        Max,
        Lag,
        Hog
    )))
}
let Hog = 0
let Lag = 1023
let Max = 0
let Min = 200

Min = 0
Max = 1023
Lag = 0
Hog = 200
    /**
 * Läs data från pin och använd parameter
 * @param Min lägsta värde
 * @param Max högsta värde
 * @param Low Från
 * @param High Till
 */
    //% block="min $value max $value2 low $value3 high $value4"
    export function SetValues(value: number, value2: number, value3: number, value4: number):void{
        Min = value
        Max = value2
        Lag = value3
        Hog = value4
    }
    //% block="low high graph"
    export function Hjärtslag() {
        led.plotBarGraph(
            pins.analogReadPin(AnalogPin.P0),
            1023
    )
    }
}