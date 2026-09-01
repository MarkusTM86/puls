basic.forever(function () {
    // Lägg in vilka värden som ska ge utslag här. 
    // 
    // Om dina hjärtslag ger ca 540-550 i inputvärde, sätt då 520 som undre gräns, och 600-650 som övre gräns. 
    if (puls.mellan(520, 650)) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.clearScreen()
    }
})
