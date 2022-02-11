class Ship {
    constructor(hull, firepower, accuracy) {
        this.hull = hull
        this.firepower = firepower
        this.accuracy = accuracy
    }
}

class USSSchwarzenegger extends Ship {
    constructor (hull, firepower, accuracy) {
        super(hull, firepower, accuracy)
    }
    attack (target) {
        if (this.accuracy >= Math.random()) {
            target.hull -= this.firepower
            alert('Your attack hit!')
        }
        else {
            alert('Your attack missed!')
        }
    }
}

class AlienShip extends Ship {
    constructor (hull, firepower, accuracy) {
        super(hull, firepower, accuracy)
    }
    createEnemies() {
        this.enemies = []
        let num = Math.floor(Math.random() * 6) + 5
        for (let i = 0; i < num; i++) {
            let hull = Math.floor(Math.random() * 4) + 3
            let firepower = Math.floor(Math.random() * 3) + 2
            let accuracy = (Math.floor(Math.random() * 3) + 6) / 10
            this.enemies.push(new AlienShip(hull, firepower, accuracy))
        }
    }
    attack (target) {
        if (this.accuracy >= Math.random()) {
            target.hull -= this.firepower
            alert('The enemy attack hit!')
        }
        else {
            alert('The enemy attack missed!')
        }
    }
}

class Game {
    constructor () {
        this.playerInfo = document.querySelector('#playerInfo')
        this.enemyInfo = document.querySelector('#enemyInfo')
    }
    attackLoop(opp, pl) {
        while(opp.hull > 0 && pl.hull > 0) {
            pl.attack(opp)
            if (opp.hull <= 0) {
                alert('You defeated the enemy ship!')
            }
            else {
                opp.attack(pl)
                if (pl.hull <= 0) {
                    alert('You were defeated! All hope is lost.')
                    this.proceed = 'no'
                }
            }
        }
    }
    
    startGame () {
        this.proceed = 'yes'
        let player = new USSSchwarzenegger(20, 5, 0.7)
        let aliens = new AlienShip
        aliens.createEnemies()
        let enemiesDefeated = 0
        let alienIndex = aliens.enemies.length - 1
        this.playerInfo.innerHTML = `Hull : ${player.hull} <br> FirePower : ${player.firepower} <br> Accuracy : ${player.accuracy}`
        this.enemyInfo.innerHTML = `Hull : ${aliens.enemies[alienIndex].hull} <br> FirePower : ${aliens.enemies[alienIndex].firepower} <br> Accuracy : ${aliens.enemies[alienIndex].accuracy}`

        alert('Welcome to Space Battle! You will be facing off against aliens and have to save our planet!')
        this.proceed = prompt('Would you like to start the battle?', 'Please type "yes" or "no"' )
        this.proceed ? this.proceed : this.proceed = 'no'

        if (this.proceed.toLowerCase() === 'yes') {
            for (let i = aliens.enemies.length - 1; i >= 0; i--) {
                if (this.proceed.toLowerCase() === 'yes') {
                    this.attackLoop(aliens.enemies[i], player)
                    this.playerInfo.innerHTML = `Hull : ${player.hull} <br> FirePower : ${player.firepower} <br> Accuracy : ${player.accuracy}`
                    this.enemyInfo.innerHTML = `Hull : ${aliens.enemies[i].hull} <br> FirePower : ${aliens.enemies[i].firepower} <br> Accuracy : ${aliens.enemies[i].accuracy}`
                    if (aliens.enemies[i].hull <= 0) {
                        aliens.enemies.pop()
                        enemiesDefeated++
                        if (aliens.enemies.length > 0) {
                            alert(`You have ${player.hull} health left.`)
                            aliens.enemies.length > 1 ? alert(`There are ${aliens.enemies.length} enemies left.`) : alert(`There is 1 enemy left.`)
                            this.proceed = prompt('Would you like to continue?', 'Please type "yes", "no", or "retreat"')
                            this.proceed ? this.proceed : this.proceed = 'no'
                        }
                    }
                    else {
                        alert(`Nice try Captain. You defeated ${enemiesDefeated} enemy ships.`)
                        break
                    }
                }
                else if (this.proceed.toLowerCase() === 'no' || this.proceed.toLowerCase() === 'retreat') {
                    enemiesDefeated == 1 ? alert(`You defeated ${enemiesDefeated} enemy ship!`) : alert(`You defeated ${enemiesDefeated} enemy ships!`)
                    alert('Sorry to see you go! Come visit again Captain!')
                    break
                }
                else {
                    alert('Error: Unknown entry\nPlease refresh the browser and enter yes, no, or press cancel.')
                    break
                }
            }
            if (aliens.enemies.length <= 0) {
                enemiesDefeated == 1 ? alert(`You defeated ${enemiesDefeated} enemy ship!`) : alert(`You defeated ${enemiesDefeated} enemy ships!`)
                alert('Congratulations Captain! You defeated them all and saved our planet!')
            } 
        }
        else if (this.proceed.toLowerCase() === 'no') {
            alert('Sorry to see you go! Come visit again Captain!')
        }
        else {
            alert('Error: Unknown entry\nPlease refresh the browser and enter yes, no, or press cancel.')
        }
    } // This is the end of the start game function
}

let x = new Game
x.startGame()