class Ship {
    constructor(hull, firepower, accuracy) {
        this.hull = hull
        this.firepower = firepower
        this.accuracy = accuracy
    }
    attack (target) {
        if (this.accuracy < Math.random()) {
            return target.hull - this.firepower
        }
        return 'It is a miss!'
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

let player = new USSSchwarzenegger(20, 5, 0.7)
let aliens = new AlienShip
aliens.createEnemies(6)

console.log(aliens.enemies)