import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';
import { Player } from './player.js';

export class AlienLaser extends Actor {
    constructor(pos, game) {
        super({
            pos: pos,
            width: 5,
            height: 20,
            collisionType: CollisionType.Active
        });
        this.game = game;

        const laserSprite = Resources.Laser.toSprite();
        laserSprite.width = 5;
        laserSprite.height = 20;
        this.graphics.use(laserSprite);
    }

    onInitialize(engine) {
        this.on('collisionstart', (evt) => {
            if (evt.other instanceof Player) {
                this.game.reduceLife();
                this.kill();
            }
        });
    }

    onPreUpdate(engine, delta) {
        this.pos.y += 200 * delta / 1000;

        if (this.pos.y > engine.drawHeight) {
            this.kill();
        }
    }
}
