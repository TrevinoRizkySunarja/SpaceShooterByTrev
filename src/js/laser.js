import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';
import { Alien } from './alien.js';

export class Laser extends Actor {
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

    onPreUpdate(engine, delta) {
        this.pos.y -= 10;

        if (this.pos.y < 0) {
            this.kill();
        }
    }

    onInitialize(engine) {
        this.on('collisionstart', (evt) => {
            if (evt.other instanceof Alien) {
                evt.other.kill(); 
                this.kill(); 
                this.game.increaseScore(); 
            }
        });
    }
}
