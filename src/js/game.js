import '../css/style.css';
import { Engine, Vector, Color, Label, Font, DisplayMode } from 'excalibur';
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

class Game extends Engine {
    constructor() {
        super({
            canvasElementId: 'game-surface',
            displayMode: DisplayMode.FillScreen,
            backgroundColor: Color.Black
        });
        this.laserCount = 100;
        this.bombCount = 3;
        this.lives = 3;
        this.score = 0;
        this.isGameOver = false;
        this.start(ResourceLoader).then(() => this.startGame());
    }

    onInitialize(engine) {
        console.log("Game initialized");

        this.background = new Background(this.drawWidth, this.drawHeight);
        this.background.z = -10; 
        this.add(this.background);

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

        const labelColor = Color.White; 

        this.scoreLabel = new Label({
            text: 'Score: 0',
            pos: new Vector(50, 50),
            font: new Font({ size: 24, color: labelColor }),
            z: 10 
        });
        this.add(this.scoreLabel);

        this.laserLabel = new Label({
            text: 'Lasers: 100',
            pos: new Vector(50, 80),
            font: new Font({ size: 24, color: labelColor }),
            z: 10 
        });
        this.add(this.laserLabel);

        this.bombLabel = new Label({
            text: 'Bombs: 3',
            pos: new Vector(50, 110),
            font: new Font({ size: 24, color: labelColor }),
            z: 10 
        });
        this.add(this.bombLabel);

        this.lifeLabel = new Label({
            text: 'Lives: 3',
            pos: new Vector(50, 140),
            font: new Font({ size: 24, color: labelColor }),
            z: 10 
        });
        this.add(this.lifeLabel);
    }

    startGame() {
        console.log("Game started");
        this.isGameOver = false;
    }

    spawnAliens() {
        this.alienSpawner = setInterval(() => {
            if (!this.isGameOver) {
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
            if (!this.isGameOver) {
                const planet = new Planet(new Vector(Math.random() * this.drawWidth, 0));
                planet.z = -1;
                this.add(planet);
            }
        }, 4000);
    }

    spawnPowerUps() {
        this.powerUpSpawner = setInterval(() => {
            if (!this.isGameOver) {
                const powerUp = new PowerUp(new Vector(Math.random() * this.drawWidth, 0), this);
                powerUp.z = 10;
                this.add(powerUp);
            }
        }, 15000);
    }

    spawnRepairKits() {
        this.repairKitSpawner = setInterval(() => {
            if (!this.isGameOver) {
                const repairKit = new RepairKit(new Vector(Math.random() * this.drawWidth, 0), this);
                repairKit.z = 10; 
                this.add(repairKit);
            }
        }, 20000);
    }

    spawnBombs() {
        this.bombSpawner = setInterval(() => {
            if (!this.isGameOver) {
                const bomb = new Bomb(new Vector(Math.random() * this.drawWidth, 0), this);
                bomb.z = 10;
                this.add(bomb);
            }
        }, 20000);
    }

    spawnStars() {
        this.starSpawner = setInterval(() => {
            if (!this.isGameOver) {
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
            if (!this.isGameOver) {
                for (let i = 0; i < 3; i++) {
                    const battery = new Battery(new Vector(Math.random() * this.drawWidth, 0), this);
                    battery.z = 10;
                    this.add(battery);
                }
            }
        }, 15000);
    }

    updateLaserCount(count) {
        this.laserLabel.text = `Lasers: ${count}`;
    }

    updateBombCount(count) {
        this.bombLabel.text = `Bombs: ${count}`;
    }

    reduceLife(amount = 1) {
        if (this.isGameOver) return;
        this.lives -= amount;
        this.lifeLabel.text = `Lives: ${this.lives}`;
        if (this.lives <= 0) {
            this.gameOver();
        }
    }

    increaseLife() {
        if (this.lives < 3) {
            this.lives++;
            this.lifeLabel.text = `Lives: ${this.lives}`;
        }
    }

    increaseBomb() {
        if (this.bombCount < 3) {
            this.bombCount++;
            this.bombLabel.text = `Bombs: ${this.bombCount}`;
        }
    }

    increaseLasers() {
        this.laserCount = 100;
        this.updateLaserCount(this.laserCount);
    }

    increaseScore() {
        this.score++;
        this.scoreLabel.text = `Score: ${this.score}`;
    }

    clearEnemies() {
        this.currentScene.actors.forEach(actor => {
            if (actor instanceof Alien) {
                actor.kill();
            }
        });
    }

    gameOver() {
        console.log("Game Over");
        this.isGameOver = true;
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

    restartGame() {
        this.laserCount = 100;
        this.bombCount = 3;
        this.lives = 3;
        this.score = 0;
        this.updateLaserCount(this.laserCount);
        this.updateBombCount(this.bombCount);
        this.lifeLabel.text = `Lives: ${this.lives}`;
        this.scoreLabel.text = `Score: ${this.score}`;
        document.getElementById('game-over-overlay').style.display = 'none';

        this.currentScene.actors.forEach(actor => {
            if (!(actor instanceof Background) && !(actor instanceof Label)) {
                actor.kill();
            }
        });


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

const game = new Game();

document.getElementById('restart-button').addEventListener('click', () => {
    game.restartGame();
});
