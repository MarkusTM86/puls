input.onButtonPressed(Button.A, function () {
    BPM()
})
function BPM () {
    let lista: number[] = []
    puls = 0
    puls_medel = 0
    låg_summa = 0
    hög_summa = 0
    låg_medel = 0
    hög_medel = 0
    delta = 0
    // Samla 500 mätvärden = ca 5 sekunder
    for (let index = 0; index < 500; index++) {
        värde = pins.analogReadPin(AnalogReadWritePin.P0)
        lista.push(värde)
        serial.writeValue("x", värde)
        basic.pause(10)
    }
    // Först: räkna vanligt medelvärde
    divider = lista.length
    for (let index2 = 0; index2 <= divider - 1; index2++) {
        puls += lista[index2]
    }
    puls_medel = puls / divider
    // Dela sedan upp värdena:
    // under medel = mellan hjärtslag
    // över medel = hjärtslag
    låg_antal = 0
    hög_antal = 0
    for (let index3 = 0; index3 <= lista.length - 1; index3++) {
        if (lista[index3] < puls_medel) {
            låg_summa += lista[index3]
            låg_antal += 1
        } else {
            hög_summa += lista[index3]
            hög_antal += 1
        }
    }
    låg_medel = låg_summa / låg_antal
    hög_medel = hög_summa / hög_antal
    delta = hög_medel - låg_medel
    basic.showNumber(delta)
    serial.writeValue("medel", puls_medel)
    serial.writeValue("lag", låg_medel)
    serial.writeValue("hog", hög_medel)
    serial.writeValue("delta", delta)
}
let hög_antal = 0
let låg_antal = 0
let divider = 0
let värde = 0
let delta = 0
let hög_medel = 0
let låg_medel = 0
let hög_summa = 0
let låg_summa = 0
let puls_medel = 0
let puls = 0
servos.P1.setAngle(90)
