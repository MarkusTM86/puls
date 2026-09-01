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
    let sensorAktiv = false
    let nollStart = 0
    let ignoreraTill = 0
    let slagAktivt = false

    //% color="#e91e63" icon="\uf21e" block="Puls"
    namespace puls {

        //% block="puls mellan %nedreGrans och %ovreGrans"
        export function mellan(nedreGrans: number, ovreGrans: number): boolean {
            let sensor = pins.analogReadPin(AnalogPin.P0)

            // Kontrollera om sensorn verkar vara ansluten och användbar
            if (input.runningTime() > ignoreraTill) {
                if (sensor < 5) {
                    if (nollStart == 0) {
                        nollStart = input.runningTime()
                    }

                    if (input.runningTime() - nollStart >= 1000) {
                        sensorAktiv = true
                        ignoreraTill = input.runningTime() + 200
                    }
                } else {
                    nollStart = 0

                    if (sensor > 850 || sensor < 300) {
                        sensorAktiv = false
                        ignoreraTill = input.runningTime() + 200
                    }
                }
            }

            if (!sensorAktiv) {
                slagAktivt = false
                return false
            }

            // Ett nytt pulsslag börjar när signalen går in i intervallet
            if (
                sensor > nedreGrans &&
                sensor < ovreGrans &&
                slagAktivt == false
            ) {
                slagAktivt = true
                return true
            }

            // Gör blocket redo för nästa slag
            if (sensor < nedreGrans && slagAktivt == true) {
                slagAktivt = false
            }

            return false
        }
    }
}