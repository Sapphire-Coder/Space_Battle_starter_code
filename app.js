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
        // Created a variable for the game to have access to to know if it should continue looping or not.
        this.proceed = 'yes'
        let player = new USSSchwarzenegger(20, 5, 0.7)
        let aliens = new AlienShip
        aliens.createEnemies()
        // Created a counter to display the number of enemies defeated by the end of loops/sessions
        let enemiesDefeated = 0
        // Since looping in reverse order, created an index measure to display the properties of the ship at the end of the array first
        let alienIndex = aliens.enemies.length - 1
        this.playerInfo.innerHTML = `Hull : ${player.hull} <br> FirePower : ${player.firepower} <br> Accuracy : ${player.accuracy}`
        this.enemyInfo.innerHTML = `Hull : ${aliens.enemies[alienIndex].hull} <br> FirePower : ${aliens.enemies[alienIndex].firepower} <br> Accuracy : ${aliens.enemies[alienIndex].accuracy}`

        alert('Welcome to Space Battle! You will be facing off against aliens and have to save our planet!')
        this.proceed = prompt('Would you like to start the battle?', 'Please type "yes" or "no"' )
        // Check in place to ensure that if something is unexpectedly entered, or cancel is pressed, the code will react accordingly.
        this.proceed ? this.proceed : this.proceed = 'no'

        if (this.proceed.toLowerCase() === 'yes') {
            for (let i = aliens.enemies.length - 1; i >= 0; i--) {
                if (this.proceed.toLowerCase() === 'yes') {
                    this.attackLoop(aliens.enemies[i], player)
                    
                    this.playerInfo.innerHTML = `Hull : ${player.hull} <br> FirePower : ${player.firepower} <br> Accuracy : ${player.accuracy}`
                    this.enemyInfo.innerHTML = `Hull : ${aliens.enemies[i].hull} <br> FirePower : ${aliens.enemies[i].firepower} <br> Accuracy : ${aliens.enemies[i].accuracy}`
                    // Check to see if the enemy can be removed from the array and increase the defeat count
                    if (aliens.enemies[i].hull <= 0) {
                        aliens.enemies.pop()
                        enemiesDefeated++
                        // Check to see if there are more enemies to display relevant information to player
                        if (aliens.enemies.length > 0) {
                            alert(`You have ${player.hull} health left.`)
                            aliens.enemies.length > 1 ? alert(`There are ${aliens.enemies.length} enemies left.`) : alert(`There is 1 enemy left.`)
                            this.proceed = prompt('Would you like to continue?', 'Please type "yes", "no", or "retreat"')
                            this.proceed ? this.proceed : this.proceed = 'no'
                        }
                    }
                    // Break the loop in the instance the player loses and did not defeat all ships
                    else {
                        alert(`Nice try Captain. You defeated ${enemiesDefeated} enemy ships.`)
                        break
                    }
                }
                // Display the information related to choosing to retreat the battle and break the loop
                else if (this.proceed.toLowerCase() === 'no' || this.proceed.toLowerCase() === 'retreat') {
                    enemiesDefeated == 1 ? alert(`You defeated ${enemiesDefeated} enemy ship!`) : alert(`You defeated ${enemiesDefeated} enemy ships!`)
                    alert('Sorry to see you go! Come visit again Captain!')
                    break
                }
                // Catch any unexpected inputs in the middle of playing the game.
                else {
                    alert('Error: Unknown entry\nPlease refresh the browser and enter yes, no, or press cancel.')
                    break
                }
            }
            // Check the win condition and to display the winning information
            if (aliens.enemies.length <= 0) {
                enemiesDefeated == 1 ? alert(`You defeated ${enemiesDefeated} enemy ship!`) : alert(`You defeated ${enemiesDefeated} enemy ships!`)
                alert('Congratulations Captain! You defeated them all and saved our planet!')
            } 
        }
        // Check to see if they player chooses not to play the game at the very beginning 
        else if (this.proceed.toLowerCase() === 'no') {
            alert('Sorry to see you go! Come visit again Captain!')
        }
        // Check to see if unexpect information was entered into the prompt at the very beginning
        else {
            alert('Error: Unknown entry\nPlease refresh the browser and enter yes, no, or press cancel.')
        }
    }
}

let x = new Game
x.startGame()