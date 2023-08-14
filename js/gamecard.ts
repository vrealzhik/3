export const createGameCard = (backface: string, frontface: string) => {
    const cards = document.createElement('div')
    cards.classList.add('game__card', `frontface-${frontface}`)

    const flippedCard = document.createElement('i')
    const notFlippedCard = document.createElement('i')

    notFlippedCard.classList.add('backface', `backface-${backface}`)
    flippedCard.classList.add('frontface', `frontface-${frontface}`) //?

    cards.append(flippedCard, notFlippedCard)

    return cards
}
