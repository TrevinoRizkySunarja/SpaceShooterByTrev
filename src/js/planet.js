import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';

export class Planet extends Actor {
    constructor(pos) {
        super({
            pos: pos,
            width: 240,
            height: 240,
            collisionType: CollisionType.Passive,
            z: -1
        });

        const planetSprites = [
            Resources.Planet1.toSprite(),
            Resources.Planet2.toSprite(),
            Resources.Planet3.toSprite(),
            Resources.Planet4.toSprite(),
            Resources.Planet5.toSprite(),
            Resources.Planet6.toSprite(),
            Resources.Planet7.toSprite(),
            Resources.Planet8.toSprite(),
            Resources.Planet9.toSprite(),
            Resources.Planet10.toSprite(),
            Resources.Planet11.toSprite(),
            Resources.Planet12.toSprite(),
            Resources.Planet13.toSprite(),
            Resources.Planet14.toSprite(),
            Resources.Planet15.toSprite()
        ];
        this.graphics.use(planetSprites[Math.floor(Math.random() * planetSprites.length)]);
    }

    onPreUpdate(engine, delta) {
        this.pos.y += delta / 1000 * 50;
        if (this.pos.y > engine.drawHeight) {
            this.kill();
        }
    }
}
