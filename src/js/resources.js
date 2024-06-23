import { ImageSource, Loader } from 'excalibur';

const Resources = {
    Ufo: new ImageSource('images/ufo.png'),
    Background: new ImageSource('images/background.png'),
    LargeBackground: new ImageSource('images/large-background.png'),
    Laser: new ImageSource('images/laser.png'),
    Alien1: new ImageSource('images/alien1.png'),
    Alien2: new ImageSource('images/alien2.png'),
    Alien3: new ImageSource('images/alien3.png'),
    Alien4: new ImageSource('images/alien4.png'),
    Alien5: new ImageSource('images/alien5.png'),
    Star: new ImageSource('images/star.png'),
    Planet: new ImageSource('images/planet.png'),
    Planet1: new ImageSource('images/planet1.png'),
    Planet2: new ImageSource('images/planet2.png'),
    Planet3: new ImageSource('images/planet3.png'),
    Planet4: new ImageSource('images/planet4.png'),
    Planet5: new ImageSource('images/planet5.png'),
    Planet6: new ImageSource('images/planet6.png'),
    Planet7: new ImageSource('images/planet7.png'),
    Planet8: new ImageSource('images/planet8.png'),
    Planet9: new ImageSource('images/planet9.png'),
    Planet10: new ImageSource('images/planet10.png'),
    Planet11: new ImageSource('images/planet11.png'),
    Planet12: new ImageSource('images/planet12.png'),
    Planet13: new ImageSource('images/planet13.png'),
    Planet14: new ImageSource('images/planet14.png'),
    Planet15: new ImageSource('images/planet15.png'),
    Bomb: new ImageSource('images/bomb.png'),
    RepairKit: new ImageSource('images/repairkit.png'),
    PowerUp: new ImageSource('images/powerup.png'),
    Battery: new ImageSource('images/battery.png'),
    Explosion: new ImageSource('images/explosion.png')
};

const ResourceLoader = new Loader(Object.values(Resources));

export { Resources, ResourceLoader };
