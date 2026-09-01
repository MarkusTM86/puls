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
