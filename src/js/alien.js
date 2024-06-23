import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';
import { AlienLaser } from './alienlaser.js';
import { Player } from './player.js';

export class Alien extends Actor {
    constructor(pos, game) {
        super({
            pos: pos,
            width: 50, // Gelijke grootte als de speler
            height: 50,
            collisionType: CollisionType.Active
        });
        this.game = game;
        const alienSprites = [
            Resources.Alien1.toSprite(),
            Resources.Alien2.toSprite(),
            Resources.Alien3.toSprite(),
            Resources.Alien4.toSprite(),
            Resources.Alien5.toSprite()
        ];
        alienSprites.forEach(sprite => {
            sprite.width = 50;
            sprite.height = 50;
        });
        this.graphics.use(alienSprites[Math.floor(Math.random() * alienSprites.length)]);
    }

    onPreUpdate(engine, delta) {
        this.pos.y += delta / 1000 * 100;
        if (Math.random() < 0.01) {
            this.shoot();
        }
        if (this.pos.y > engine.drawHeight) {
            this.kill();
        }
    }

    shoot() {
        const laser = new AlienLaser(this.pos.clone().add(new Vector(0, 20)), this.game);
        this.scene.add(laser);
    }

    onInitialize(engine) {
        this.on('collisionstart', (evt) => {
            if (evt.other instanceof Player) {
                this.kill();
                evt.other.kill();
                this.game.reduceLife();
            }
        });
    }
}
