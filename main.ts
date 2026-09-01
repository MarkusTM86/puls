basic.forever(function () {
    if (puls.mellan(520, 650)) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.clearScreen()
    }
})
