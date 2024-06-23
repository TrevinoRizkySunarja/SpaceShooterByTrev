import { Actor, Vector, CollisionType, Input, Engine } from 'excalibur';
import { Resources } from './resources.js';
import { Laser } from './laser.js';
import { Alien } from './alien.js';

export class Player extends Actor {
    constructor(game) {
        super({
            pos: new Vector(512, 700),
            width: 40,
            height: 40,
            collisionType: CollisionType.Active
        });
        this.game = game;
        this.isFullAuto = false;
        const playerSprite = Resources.Ufo.toSprite();
        playerSprite.width = 40;
        playerSprite.height = 40;
        this.graphics.use(playerSprite);
        this.laserTimer = 0;
        this.bombTimer = 0;
        this.fullAutoTimer = 0;
    }

    onPreUpdate(engine, delta) {
        const kb = engine.input.keyboard;
        if (kb.isHeld(Input.Keys.W)) this.vel.y = -300;
        else if (kb.isHeld(Input.Keys.S)) this.vel.y = 300;
        else this.vel.y = 0;

        if (kb.isHeld(Input.Keys.A)) this.vel.x = -300;
        else if (kb.isHeld(Input.Keys.D)) this.vel.x = 300;
        else this.vel.x = 0;

        if (this.isFullAuto) {
            if (kb.isHeld(Input.Keys.Space) && this.laserTimer <= 0 && this.game.laserCount > 0) {
                this.shoot();
                this.laserTimer = 0.1;
                this.game.laserCount--;
                this.game.updateLaserCount(this.game.laserCount);
            }
        } else {
            if (kb.wasPressed(Input.Keys.Space) && this.laserTimer <= 0 && this.game.laserCount > 0) {
                this.shoot();
                this.laserTimer = 0.1; 
                this.game.laserCount--;
                this.game.updateLaserCount(this.game.laserCount);
            }
        }

        if (kb.isHeld(Input.Keys.E) && this.bombTimer <= 0 && this.game.bombCount > 0) {
            this.useBomb();
            this.bombTimer = 1;
            this.game.bombCount--;
            this.game.updateBombCount(this.game.bombCount);
        }

        this.laserTimer -= delta / 1000;
        this.bombTimer -= delta / 1000;

        if (this.isFullAuto) {
            this.fullAutoTimer -= delta / 1000;
            if (this.fullAutoTimer <= 0) {
                this.disableFullAuto();
            }
        }
    }

    shoot() {
        const laser = new Laser(this.pos.clone().add(new Vector(0, -40)), this.game);
        this.scene.add(laser);
    }

    useBomb() {
        this.game.clearEnemies();
    }

    onInitialize(engine) {
        this.on('collisionstart', (evt) => {
            if (evt.other instanceof Alien) {
                this.game.reduceLife(3);
                evt.other.kill();
            }
        });
    }

    enableFullAuto() {
        this.isFullAuto = true;
        this.fullAutoTimer = 4;
    }

    disableFullAuto() {
        this.isFullAuto = false;
    }
}
