import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';

export class Star extends Actor {
    constructor(pos) {
        super({
            pos: pos,
            width: 10,
            height: 10,
            collisionType: CollisionType.PreventCollision
        });

        const starSprite = Resources.Star.toSprite();
        starSprite.width = 10;
        starSprite.height = 10;
        this.graphics.use(starSprite);
    }

    onPreUpdate(engine, delta) {
        this.pos.y += delta / 1000 * 50;
        if (this.pos.y > engine.drawHeight) {
            this.kill();
        }
    }
}
