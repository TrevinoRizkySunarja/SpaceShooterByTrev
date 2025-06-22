// Importeert CSS en benodigde modules voor het spel
import '../css/style.css';
import { Engine, Vector, Color, Label, Font, DisplayMode, SolverStrategy } from 'excalibur';
import { ResourceLoader, Resources } from './resources.js';
import { Player } from './player.js';
import { Alien } from './alien.js';
import { Planet } from './planet.js';
import { PowerUp } from './powerup.js';
import { Background } from './background.js';
import { RepairKit } from './repairkit.js';
import { Bomb } from './bomb.js';
import { Star } from './star.js';
import { Battery } from './battery.js';

// De Game class beheert het spel en de logica
class Game extends Engine {
    // Privévariabelen voor spelstatus
    #laserCount = 100;
    #bombCount = 3;
    #lives = 3;
    #score = 0;
    #isGameOver = false;

    // Labels voor het tonen van score, levens, etc.
    #scoreLabel;
    #laserLabel;
    #bombLabel;
    #lifeLabel;

    // Constructor stelt het spelvenster in en start het spel
    constructor() {
    super({
        canvasElementId: 'game-surface',
        displayMode: DisplayMode.FillScreen,
        backgroundColor: Color.Black
    });

    // Zet physics solver handmatig
    this.physics.acc = new Vector(0, 0); // Geen zwaartekracht
    this.physics.collisionResolutionStrategy = SolverStrategy.Arcade;



    this.start(ResourceLoader).then(() => this.startGame());
    }


    // Publieke getters om spelstatus te bekijken (encapsulation)
    get laserCount() { return this.#laserCount; }
    get bombCount() { return this.#bombCount; }
    get isGameOver() { return this.#isGameOver; }

    // Interne methodes om de UI bij te werken
    #updateLaserCount(count) {
        this.#laserLabel.text = `Lasers: ${count}`;
    }

    #updateBombCount(count) {
        this.#bombLabel.text = `Bombs: ${count}`;
    }

    // Levens verminderen, en game over starten als levens op zijn
    reduceLife(amount = 1) {
        if (this.#isGameOver) return;
        this.#lives -= amount;
        this.#lifeLabel.text = `Lives: ${this.#lives}`;
        if (this.#lives <= 0) {
            this.gameOver();
        }
    }

    // Levens verhogen tot maximum van 3
    increaseLife() {
        if (this.#lives < 3) {
            this.#lives++;
            this.#lifeLabel.text = `Lives: ${this.#lives}`;
        }
    }

    // Bommen verminderen of verhogen via veilige methodes
    decreaseBomb() {
        if (this.#bombCount > 0) {
            this.#bombCount--;
            this.#updateBombCount(this.#bombCount);
        }
    }

    increaseBomb() {
        if (this.#bombCount < 3) {
            this.#bombCount++;
            this.#updateBombCount(this.#bombCount);
        }
    }

    // Lasers herladen of afvuren
    increaseLasers() {
        this.#laserCount = 100;
        this.#updateLaserCount(this.#laserCount);
    }

    decreaseLaser() {
        if (this.#laserCount > 0) {
            this.#laserCount--;
            this.#updateLaserCount(this.#laserCount);
        }
    }

    resetLaser() {
        this.#laserCount = 100;
        this.#updateLaserCount(this.#laserCount);
    }

    // Score verhogen bij acties zoals vijand verslaan
    increaseScore() {
        this.#score++;
        this.#scoreLabel.text = `Score: ${this.#score}`;
    }

    // Verwijdert alle vijanden uit het spel (bijv. bij gebruik van een bom)
    clearEnemies() {
        this.currentScene.actors.forEach(actor => {
            if (actor instanceof Alien) {
                actor.kill();
            }
        });
    }

    // Deze methode wordt automatisch uitgevoerd bij opstarten van het spel
    onInitialize(engine) {
        console.log("Game initialized");

        // Achtergrond toevoegen
        this.background = new Background(this.drawWidth, this.drawHeight);
        this.background.z = -10;
        this.add(this.background);

        // Speler aanmaken en toevoegen
        this.player = new Player(this);
        this.player.z = 10;
        this.add(this.player);

        // Start alle spawners voor objecten
        this.spawnAliens();
        this.spawnPlanets();
        this.spawnPowerUps();
        this.spawnRepairKits();
        this.spawnBombs();
        this.spawnStars();
        this.spawnBatteries();

        // Labels instellen voor UI
        const labelColor = Color.White;

        this.#scoreLabel = new Label({
            text: 'Score: 0',
            pos: new Vector(50, 50),
            font: new Font({ size: 24, color: labelColor }),
            z: 10
        });
        this.add(this.#scoreLabel);

        this.#laserLabel = new Label({
            text: 'Lasers: 100',
            pos: new Vector(50, 80),
            font: new Font({ size: 24, color: labelColor }),
            z: 10
        });
        this.add(this.#laserLabel);

        this.#bombLabel = new Label({
            text: 'Bombs: 3',
            pos: new Vector(50, 110),
            font: new Font({ size: 24, color: labelColor }),
            z: 10
        });
        this.add(this.#bombLabel);

        this.#lifeLabel = new Label({
            text: 'Lives: 3',
            pos: new Vector(50, 140),
            font: new Font({ size: 24, color: labelColor }),
            z: 10
        });
        this.add(this.#lifeLabel);
    }

    // Start een nieuwe ronde van het spel
    startGame() {
        console.log("Game started");
        this.#isGameOver = false;
    }

    // Elke spawnX functie voegt een soort object periodiek toe aan het spel
    spawnAliens() {
        this.alienSpawner = setInterval(() => {
            if (!this.#isGameOver) {
                for (let i = 0; i < 1.5; i++) {
                    const alien = new Alien(new Vector(Math.random() * this.drawWidth, 0), this);
                    alien.z = 10;
                    this.add(alien);
                }
            }
        }, 1000);
    }

    spawnPlanets() {
        this.planetSpawner = setInterval(() => {
            if (!this.#isGameOver) {
                const planet = new Planet(new Vector(Math.random() * this.drawWidth, 0));
                planet.z = -1;
                this.add(planet);
            }
        }, 4000);
    }

    spawnPowerUps() {
        this.powerUpSpawner = setInterval(() => {
            if (!this.#isGameOver) {
                const powerUp = new PowerUp(new Vector(Math.random() * this.drawWidth, 0), this);
                powerUp.z = 10;
                this.add(powerUp);
            }
        }, 15000);
    }

    spawnRepairKits() {
        this.repairKitSpawner = setInterval(() => {
            if (!this.#isGameOver) {
                const repairKit = new RepairKit(new Vector(Math.random() * this.drawWidth, 0), this);
                repairKit.z = 10;
                this.add(repairKit);
            }
        }, 20000);
    }

    spawnBombs() {
        this.bombSpawner = setInterval(() => {
            if (!this.#isGameOver) {
                const bomb = new Bomb(new Vector(Math.random() * this.drawWidth, 0), this);
                bomb.z = 10;
                this.add(bomb);
            }
        }, 20000);
    }

    spawnStars() {
        this.starSpawner = setInterval(() => {
            if (!this.#isGameOver) {
                for (let i = 0; i < 10; i++) {
                    const star = new Star(new Vector(Math.random() * this.drawWidth, 0));
                    star.z = 10;
                    this.add(star);
                }
            }
        }, 600);
    }

    spawnBatteries() {
        this.batterySpawner = setInterval(() => {
            if (!this.#isGameOver) {
                for (let i = 0; i < 3; i++) {
                    const battery = new Battery(new Vector(Math.random() * this.drawWidth, 0), this);
                    battery.z = 10;
                    this.add(battery);
                }
            }
        }, 15000);
    }

    // Roept game over aan: stopt alle spawners en toont overlay
    gameOver() {
        console.log("Game Over");
        this.#isGameOver = true;
        this.player.kill();
        clearInterval(this.alienSpawner);
        clearInterval(this.planetSpawner);
        clearInterval(this.powerUpSpawner);
        clearInterval(this.repairKitSpawner);
        clearInterval(this.bombSpawner);
        clearInterval(this.starSpawner);
        clearInterval(this.batterySpawner);
        document.getElementById('game-over-overlay').style.display = 'block';
    }

    // Herstart het spel: reset score, levens en spawnt alles opnieuw
    restartGame() {
        this.#laserCount = 100;
        this.#bombCount = 3;
        this.#lives = 3;
        this.#score = 0;
        this.#updateLaserCount(this.#laserCount);
        this.#updateBombCount(this.#bombCount);
        this.#lifeLabel.text = `Lives: ${this.#lives}`;
        this.#scoreLabel.text = `Score: ${this.#score}`;
        document.getElementById('game-over-overlay').style.display = 'none';

        // Verwijder alles behalve achtergrond en UI
        this.currentScene.actors.forEach(actor => {
            if (!(actor instanceof Background) && !(actor instanceof Label)) {
                actor.kill();
            }
        });

        // Maak een nieuwe speler aan en begin opnieuw
        this.player = new Player(this);
        this.player.z = 10;
        this.add(this.player);

        this.spawnAliens();
        this.spawnPlanets();
        this.spawnPowerUps();
        this.spawnRepairKits();
        this.spawnBombs();
        this.spawnStars();
        this.spawnBatteries();

        this.startGame();
    }
}

// Maakt een nieuwe Game instantie aan
const game = new Game();

// Start het spel opnieuw bij klik op de "restart" knop
document.getElementById('restart-button').addEventListener('click', () => {
    game.restartGame();
});
