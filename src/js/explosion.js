import { Actor, Vector, Animation, SpriteSheet, range } from 'excalibur';
import { Resources } from './resources.js';

export class Explosion extends Actor {
    constructor(pos) {
        super({
            pos: pos,
            width: 40,
            height: 40
        });

        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.Explosion,
            grid: {
                rows: 1,
                columns: 5,
                spriteWidth: 40,
                spriteHeight: 40
            }
        });

        const explosionAnimation = Animation.fromSpriteSheet(spriteSheet, range(0, 4), 100);
        explosionAnimation.loop = false;

        this.graphics.add(explosionAnimation);
        this.on('animationend', () => this.kill());
    }
}
