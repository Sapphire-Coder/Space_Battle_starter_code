class Ship {
    constructor(hull, firepower, accuracy) {
        this.hull = hull
        this.firepower = firepower
        this.accuracy = accuracy
    }
    attack (target) {
        if (this.accuracy < Math.random()) {
            return target.hull -= this.firepower
        }
        alert ('It missed!')
    }
}

class USSSchwarzenegger extends Ship {
    constructor (hull, firepower, accuracy) {
        super(hull, firepower, accuracy)
    }
}

class AlienShip extends Ship {
    constructor (hull, firepower, accuracy) {
        super(hull, firepower, accuracy)
    }
    createEnemies(num) {
        this.enemies = []
        for (let i = 0; i < num; i++) {
            let hull = Math.floor(Math.random() * 4) + 3
            let firepower = Math.floor(Math.random() * 3) + 2
            let accuracy = (Math.floor(Math.random() * 3) + 6) / 10
            this.enemies.push(new AlienShip(hull, firepower, accuracy))
        }
    }
}

// let player = new USSSchwarzenegger(20, 5, 0.7)
// let aliens = new AlienShip
// aliens.createEnemies(6)
// console.log(aliens.enemies.length)
// console.log(player.attack(aliens.enemies[0]))


// attempted test prompt to see if it would populate in html window
// let varA = prompt('This is a test to see if this works', 'The default version of the test')
// // console.log(varA) this returns whatever was typed in the prompt box
// let testAtk = prompt('Test attack, type yes', 'Please type "yes" or "no"')
// if (testAtk == 'yes') {
//     player.attack(aliens.enemies[0])
// }

// document.querySelector('#playerInfo').innerHTML = `Hull : ${player.hull} <br> FirePower : ${player.firepower} <br> Accuracy : ${player.accuracy}`
// document.querySelector('#enemyInfo').innerHTML = `Hull : ${aliens.enemies[0].hull} <br> FirePower : ${aliens.enemies[0].firepower} <br> Accuracy : ${aliens.enemies[0].accuracy}`

console.log(aliens.enemies[0])
console.log(player)

class Game {
    constructor () {
        this.playerInfo = document.querySelector('#playerInfo')
        this.enemyInfo = document.querySelector('#enemyInfo')
    }
    startGame () {
        this.proceed = 'yes'
        let player = new USSSchwarzenegger(20, 5, 0.7)
        let aliens = new AlienShip
        aliens.createEnemies(6)
        this.playerInfo.innerHTML = `Hull : ${player.hull} <br> FirePower : ${player.firepower} <br> Accuracy : ${player.accuracy}`
        this.enemyInfo.innerHTML = `Hull : ${aliens.enemies[0].hull} <br> FirePower : ${aliens.enemies[0].firepower} <br> Accuracy : ${aliens.enemies[0].accuracy}`

        alert('Welcome to Space Battle! You will be facing off against aliens and have to save our planet!')
        this.proceed = prompt('Would you like to start the battle?', 'Please type "yes" or "no"' )

        if (this.proceed.toLowerCase() === 'yes') {
            aliens.enemies.forEach(enemyShip => {
                if (this.proceed.toLowerCase() === 'yes') {
                        
                }
            })
        }
        else if (this.proceed.toLowerCase() === 'no') {
            alert('We are sorry to see you go! Come visit us again!')
        }
        else {
            alert('Please')
        }
    } // This is the end of the start game function
}

let x = new Game
x.startGame()