import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class Background extends Actor {
    constructor(width, height) {
        super({
            pos: new Vector(width / 2, height / 2),
            width: width,
            height: height,
            collisionType: CollisionType.PreventCollision
        });

        const sprite = Resources.Background.toSprite();
        sprite.width = width;
        sprite.height = height;
        this.graphics.use(sprite);
    }
}
