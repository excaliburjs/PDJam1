var Config = (function () {
    function Config() {
    }
    Config.gravity = 800;
    Config.cameraOffset = 150;

    Config.moonSpeed = -3;
    Config.mountainSpeed = -30;

    Config.obstacleWidth = 50;
    Config.obstacleHeight = 30;
    Config.obstableOffsetHeight = 5;
    Config.obstacleColor = ex.Color.Orange;
    Config.obstacleYPosition = 600 - 55;

    Config.playerWidth = 150;
    Config.playerHeight = 150;
    Config.playerMovementSpeed = 350;
    Config.playerJumpSpeed = 330;
    Config.playerXPos = 960 / 2;
    Config.gallopDelay = 600;
    Config.playerYPos = Config.obstacleYPosition - Config.playerHeight / 2;

    Config.horsemanWidth = 150;
    Config.horsemanHeight = 150;
    Config.horsemanXPos = 0;
    Config.horsemanYPos = Config.obstacleYPosition - Config.horsemanHeight / 2;
    Config.horsemanSpeedIncrease = 0.005;
    Config.horsemanInitialSpeed = 1;
    return Config;
})();
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DefeatScene = (function (_super) {
    __extends(DefeatScene, _super);
    function DefeatScene(distance) {
        _super.call(this);
        this.distanceTravelled = distance;
    }
    DefeatScene.prototype.onInitialize = function (engine) {
        _super.prototype.onInitialize.call(this, engine);

        var defeatScreen = new ex.Actor(game.width / 2, game.height / 2, game.width, game.height);
        defeatScreen.addDrawing("background", new ex.Sprite(Resources.TextureBackground, 0, 0, game.width, game.height));
        defeatScreen.collisionType = 0 /* PreventCollision */;
        game.camera.setActorToFollow(defeatScreen);
        game.addChild(defeatScreen);

        game.camera = new ex.BaseCamera(engine);

        var w = game.getWidth() / 2;

        var labelDefeat = new ex.Label("Defeat", w, 100, '50px Architects Daughter');
        labelDefeat.color = ex.Color.Red;
        labelDefeat.textAlign = 2 /* Center */;
        this.addChild(labelDefeat);

        var labelDefeatStory1 = new ex.Label("A rock rose up from the path, and Ichabod was thrown", 50, 200, '25px Architects Daughter');
        labelDefeatStory1.color = ex.Color.White;
        this.addChild(labelDefeatStory1);

        var labelDefeatStory2 = new ex.Label("from the back of old Gunpowder. As he lay there on", 50, 240, '25px Architects Daughter');
        labelDefeatStory2.color = ex.Color.White;
        this.addChild(labelDefeatStory2);

        var labelDefeatStory3 = new ex.Label("the ground, he felt darkness overtake his senses.", 50, 280, '25px Architects Daughter');
        labelDefeatStory3.color = ex.Color.White;
        this.addChild(labelDefeatStory3);

        var restartInstructions = new ex.Label("Press UP to try again", w, 500, '35px Architects Daughter');
        restartInstructions.color = ex.Color.White;
        restartInstructions.textAlign = 2 /* Center */;
        this.addChild(restartInstructions);

        //var distance = new ex.Label("distance: " + this.distanceTravelled, game.getWidth() / 2, 300 + game.getHeight() / 2, '50px Segoe UI');
        //distance.color = ex.Color.White;
        //this.addChild(distance);
        game.on("keyup", function (ev) {
            window.location = window.location;
            window.location.reload();
        });
    };
    return DefeatScene;
})(ex.Scene);
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(x, y, color) {
        _super.call(this, x, y, Config.horsemanWidth, Config.horsemanHeight, color);
        this.isColliding = false;
    }
    Enemy.prototype.onInitialize = function (game) {
        var _this = this;
        this.dx = Config.horsemanInitialSpeed;
        this.collisionType = 1 /* Passive */;
        this._dustEmitter1 = this.createDustEmitter(-this.getWidth() / 2, this.getHeight() / 2);
        this._dustEmitter2 = this.createDustEmitter(this.getWidth() / 2, this.getHeight() / 2);
        this.addChild(this._dustEmitter1);
        this.addChild(this._dustEmitter2);

        this.on('update', function (ev) {
            _this.dx += Config.horsemanSpeedIncrease;
        });
    };

    Enemy.prototype.createDustEmitter = function (x, y) {
        var emitter = new ex.ParticleEmitter(x, y, 9, 0);
        emitter.emitterType = 1 /* Rectangle */;
        emitter.radius = 5;
        emitter.minVel = 3;
        emitter.maxVel = 56;
        emitter.minAngle = 5.1;
        emitter.maxAngle = 3.9;
        emitter.emitRate = 9;
        emitter.opacity = 0.09;
        emitter.fadeFlag = true;
        emitter.isEmitting = true;
        emitter.particleLife = 334;
        emitter.maxSize = 1;
        emitter.minSize = 1;
        emitter.startSize = 1;
        emitter.endSize = 9;
        emitter.acceleration = new ex.Vector(-450, 0);
        emitter.beginColor = ex.Color.Transparent;
        emitter.endColor = ex.Color.Transparent;

        return emitter;
    };
    return Enemy;
})(ex.Actor);
var Level = (function (_super) {
    __extends(Level, _super);
    function Level(obstacleLocations) {
        _super.call(this);
        this.obstacles = [];
        this.obstacleLocations = obstacleLocations;
    }
    Level.prototype.onInitialize = function (engine) {
        // bg
        var startScreen = new ex.Actor(game.width / 2, game.height / 2, game.width, game.height);
        startScreen.addDrawing("background", new ex.Sprite(Resources.TextureBackground, 0, 0, game.width, game.height));
        startScreen.collisionType = 0 /* PreventCollision */;
        this.addChild(startScreen);

        // moon
        moon.dx = Config.moonSpeed;
        this.add(moon);

        // mountains
        Parallax.create(this, 0, 0, game.width, game.height, Resources.TextureMountains, Config.mountainSpeed);

        // fence
        Parallax.create(this, 0, 0, game.width, game.height, Resources.TextureFence, -Config.playerMovementSpeed);

        // ground
        var floor = new ex.Actor(0, Config.obstacleYPosition, game.width, 60, ex.Color.fromHex("#0f1722"));
        floor.anchor.x = floor.anchor.y = 0;
        floor.collisionType = 4 /* Fixed */;
        this.addChild(floor);

        for (var i = 0; i < obstacleLocations.length; i++) {
            var obstacle = new Obstacle(obstacleLocations[i], Config.obstacleYPosition);
            this.obstacles.push(obstacle);
            this.addChild(obstacle);
        }

        var riderSpriteSheet = new ex.SpriteSheet(Resources.TextureRider, 4, 1, 150, 223);
        var riderAnim = riderSpriteSheet.getAnimationForAll(game, 35 * 4);
        riderAnim.loop = true;
        riderAnim.setScaleX(.5);
        riderAnim.setScaleY(.5);
        var rider = new ex.Actor(20, -30, 100, 100);
        rider.addDrawing("default", riderAnim);
        rider.setCenterDrawing(true);

        var headlessSpriteSheet = new ex.SpriteSheet(Resources.TextureHeadless, 4, 1, 150, 223);
        var headlessAnim = headlessSpriteSheet.getAnimationForAll(game, 35 * 4);
        headlessAnim.loop = true;
        headlessAnim.setScaleX(.5);
        headlessAnim.setScaleY(.5);
        headlessAnim.skip(3);
        var headless = new ex.Actor(20, -30, 100, 100);
        headless.addDrawing("default", headlessAnim);
        headless.setCenterDrawing(true);

        var horseSpriteSheet = new ex.SpriteSheet(Resources.TextureHorse, 14, 1, 400, 281);
        var horseAnimRed = horseSpriteSheet.getAnimationForAll(game, 35);
        var horseAnimGray = horseSpriteSheet.getAnimationForAll(game, 35);

        horseAnimRed.skip(6);
        horseAnimRed.loop = true;
        horseAnimRed.setScaleX(.5);
        horseAnimRed.setScaleY(.5);

        horseAnimGray.loop = true;
        horseAnimGray.setScaleX(.5);
        horseAnimGray.setScaleY(.5);

        horseAnimRed.addEffect(new ex.Effects.Colorize(ex.Color.fromHex("#151515")));
        horseAnimGray.addEffect(new ex.Effects.Colorize(ex.Color.fromHex("#39465a")));

        // headless horseman
        var horseman = new Enemy(Config.horsemanXPos, Config.horsemanYPos, ex.Color.Red);
        horseman.setCenterDrawing(true);
        horseman.setWidth(100);
        horseman.addDrawing("default", horseAnimRed);
        horseman.addChild(headless);
        this.addChild(horseman);

        // player
        var ichabod = new Player(Config.playerXPos, Config.playerYPos, ex.Color.Blue);
        ichabod.setCenterDrawing(true);
        ichabod.setWidth(100);
        ichabod.collisionType = 0 /* PreventCollision */;
        ichabod.addDrawing("default", horseAnimGray);
        ichabod.addChild(rider);
        this.addChild(ichabod);

        // bridge
        var bridgeSprite = new ex.Sprite(Resources.TextureBridge, 0, 0, 315, 111);
        var bridge = new ex.Actor(15000, Config.obstacleYPosition, 315, 111);

        bridge.collisionType = 0 /* PreventCollision */;
        bridge.dx = -Config.playerMovementSpeed;
        bridge.addDrawing("default", bridgeSprite);
        this.add(bridge);

        var victoryTrigger = new ParallaxTrigger(15000, Config.obstacleYPosition, 50, 200, function () {
            game.goToScene("victory");
        }, -Config.playerMovementSpeed);

        victoryTrigger.repeats = -1;
        victoryTrigger.target = ichabod;
        game.addChild(victoryTrigger);
        //var camera = new ex.SideCamera(game);
        //var camera = new ModifiedCamera(game);
        //camera.setActorToFollow(ichabod);
        //game.camera = camera;
    };
    return Level;
})(ex.Scene);
var Obstacle = (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle(x, y) {
        _super.call(this, x, y, Config.obstacleWidth, Config.obstacleHeight - Config.obstableOffsetHeight);
        this.anchor.x = 0;
        this.anchor.y = 1;
        this.addDrawing("rock", new ex.Sprite(Resources.TextureRock1, 0, 0, Config.obstacleWidth, Config.obstacleHeight));
    }
    Obstacle.prototype.onInitialize = function (game) {
        this.collisionType = 4 /* Fixed */;
        this.dx = -Config.playerMovementSpeed;
    };
    return Obstacle;
})(ex.Actor);
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y, color) {
        _super.call(this, x, y, Config.playerWidth, Config.playerHeight, color);
        this.isColliding = false;
        this.inAir = false;
        this._gallopTimer = Config.gallopDelay;
    }
    Player.prototype.onInitialize = function (game) {
        var _this = this;
        this.collisionType = 2 /* Active */;

        // dust
        this._dustEmitter1 = this.createDustEmitter(-this.getWidth() / 2, this.getHeight() / 2);
        this._dustEmitter2 = this.createDustEmitter(this.getWidth() / 2, this.getHeight() / 2);
        this.addChild(this._dustEmitter1);
        this.addChild(this._dustEmitter2);

        this.addEventListener('up', function () {
            if (!_this.inAir) {
                _this.dy -= Config.playerJumpSpeed;
                _this.inAir = true;
                _this._dustEmitter1.isEmitting = false;
                _this._dustEmitter2.isEmitting = false;
            }
        });

        this.on('collision', function (ev) {
            if (ev.other instanceof Obstacle) {
                game.addScene("defeat", new DefeatScene(statsProgress));
                game.goToScene("defeat");
                //this.color = ex.Color.Magenta;
            }
            if (ev.side === 2 /* Bottom */) {
                _this.isColliding = true;

                if (_this.inAir) {
                    // leaping animation
                    _this._gallopTimer = 0;
                }
                _this.inAir = false;

                if (ev.other) {
                    _this.dy = ev.other.dy;
                } else {
                    _this.dy = 0;
                }
            }
            if (ev.side === 1 /* Top */) {
                if (ev.other) {
                    _this.dy = ev.other.dy - _this.dy;
                } else {
                    _this.dy = 0;
                }
            }
        });
    };

    Player.prototype.update = function (engine, delta) {
        _super.prototype.update.call(this, engine, delta);

        if (!this.inAir) {
            this._dustEmitter1.isEmitting = true;
            this._dustEmitter2.isEmitting = true;
        }

        if (this._gallopTimer <= 0 && !this.inAir) {
            Resources.SoundGallop.play();
            this._gallopTimer = Config.gallopDelay;
        }
        this._gallopTimer -= delta;

        if (!this.isColliding) {
            this.ay = Config.gravity;
        } else {
            this.ay = 0;
        }
        this.isColliding = false;
    };

    Player.prototype.createDustEmitter = function (x, y) {
        var emitter = new ex.ParticleEmitter(x, y, 9, 0);
        emitter.emitterType = 1 /* Rectangle */;
        emitter.radius = 5;
        emitter.minVel = 3;
        emitter.maxVel = 56;
        emitter.minAngle = 5.1;
        emitter.maxAngle = 3.9;
        emitter.emitRate = 9;
        emitter.opacity = 0.09;
        emitter.fadeFlag = true;
        emitter.particleLife = 600;
        emitter.maxSize = 1;
        emitter.minSize = 1;
        emitter.startSize = 1;
        emitter.endSize = 9;
        emitter.acceleration = new ex.Vector(-450, 0);
        emitter.beginColor = ex.Color.Transparent;
        emitter.endColor = ex.Color.Transparent;

        return emitter;
    };
    return Player;
})(ex.Actor);
var VictoryScene = (function (_super) {
    __extends(VictoryScene, _super);
    function VictoryScene() {
        _super.call(this);
    }
    VictoryScene.prototype.onInitialize = function (engine) {
        _super.prototype.onInitialize.call(this, engine);

        game.camera = new ex.BaseCamera(engine);

        var victoryScreen = new ex.Actor(game.width / 2, game.height / 2, game.width, game.height);
        victoryScreen.addDrawing("background", new ex.Sprite(Resources.TextureBackground, 0, 0, game.width, game.height));
        victoryScreen.collisionType = 0 /* PreventCollision */;
        game.camera.setActorToFollow(victoryScreen);
        game.addChild(victoryScreen);

        var labelVictory = new ex.Label("Victory", game.getWidth() / 2, 100, '50px Architects Daughter');
        labelVictory.color = ex.Color.White;
        labelVictory.textAlign = 2 /* Center */;
        this.addChild(labelVictory);

        var labelVictoryStory1 = new ex.Label("Ichabod spurred old Gunpowder onward a final time.", 50, 200, '25px Architects Daughter');
        labelVictoryStory1.color = ex.Color.White;
        this.addChild(labelVictoryStory1);

        var labelVictoryStory2 = new ex.Label("All at once, horse and rider clattered across the old bridge.", 50, 240, '25px Architects Daughter');
        labelVictoryStory2.color = ex.Color.White;
        this.addChild(labelVictoryStory2);

        var labelVictoryStory3 = new ex.Label("For a moment, he imagined himself safe.", 50, 280, '25px Architects Daughter');
        labelVictoryStory3.color = ex.Color.White;
        this.addChild(labelVictoryStory3);
    };
    return VictoryScene;
})(ex.Scene);
var Resources = {
    //
    // Textures
    //
    TextureBackground: new ex.Texture("images/background.gif"),
    TextureMountains: new ex.Texture("images/mountains.png"),
    TextureMoon: new ex.Texture("images/moon.png"),
    TextureTree1: new ex.Texture("images/tree-1.gif"),
    TextureLogo: new ex.Texture("images/logo.png"),
    TextureFence: new ex.Texture("images/fence.png"),
    TextureRock1: new ex.Texture("images/rock1.gif"),
    TextureBridge: new ex.Texture("images/Bridge.png"),
    TextureHorse: new ex.Texture("images/horse.png"),
    TextureRider: new ex.Texture("images/rider.png"),
    TextureHeadless: new ex.Texture("images/headless.png"),
    //
    // Sounds
    //
    SoundIntro: new ex.Sound("sounds/intro.mp3", "sounds/intro.wav"),
    SoundWind: new ex.Sound("sounds/wind.mp3", "sounds/wind.wav"),
    SoundGallop: new ex.Sound("sounds/gallop.mp3", "sounds/gallop.wav")
};
/**
* Whether or not an element has a CSS class present
* @param element The DOM element to check
* @param cls The CSS class to check for
* @returns True if the class exists and false if not
*/
function hasClass(element, cls) {
    return element.classList.contains(cls);
}

/**
* Replaces a CSS class on an element
* @param element The DOM element to manipulate
* @param search The CSS class to find
* @param replace The CSS class to replace with
*/
function replaceClass(element, search, replace) {
    if (hasClass(element, search)) {
        this.removeClass(element, search);
        this.addClass(element, replace);
    }
}

/**
* Adds a CSS class to a DOM element
* @param element The DOM element to manipulate
* @param cls The CSS class to add
*/
function addClass(element, cls) {
    element.classList.add(cls);
}

/**
* Removes a CSS class to a DOM element
* @param element The DOM element to manipulate
* @param cls The CSS class to remove
*/
function removeClass(element, cls) {
    element.classList.remove(cls);
}

function setVolume(val) {
    for (var resource in Resources) {
        if (Resources.hasOwnProperty(resource)) {
            if (Resources[resource] instanceof ex.Sound) {
                Resources[resource].setVolume(val);
            }
        }
    }
}
/// <reference path="../scripts/Excalibur.d.ts" />
/// <reference path="Config.ts" />
/// <reference path="Level.ts" />
/// <reference path="Obstacle.ts" />
/// <reference path="Player.ts" />
/// <reference path="VictoryScene.ts" />
/// <reference path="DefeatScene.ts" />
/// <reference path="Resources.ts"/>
/// <reference path="Util.ts"/>
document.getElementById("sound").addEventListener('click', function () {
    if (hasClass(this, 'fa-volume-up')) {
        replaceClass(this, 'fa-volume-up', 'fa-volume-off');
        setVolume(0);
    } else {
        replaceClass(this, 'fa-volume-off', 'fa-volume-up');
        setVolume(1);
    }
});

var logger = ex.Logger.getInstance();

var statsProgress;

var game = new ex.Engine(960, 600, "game");
game.setAntialiasing(false);
game.backgroundColor = ex.Color.Black;

game.addEventListener('keydown', function (keyDown) {
    if (keyDown.key === 68 /* D */) {
        game.isDebug = !game.isDebug;
    }
});

var loader = new ex.Loader();

for (var key in Resources) {
    if (Resources.hasOwnProperty(key)) {
        loader.addResource(Resources[key]);
    }
}

var obstacleLocations = [2000, 3000, 3400, 3800, 4600, 4950, 5900, 6200, 6600, 8400, 9400, 9900, 10300, 10800, 11100, 11900, 12400, 12800, 13200, 13600, 14000];
var mainLevel = new Level(obstacleLocations);
var moon = new ex.Actor(500, 0, 471, 152);
moon.collisionType = 0 /* PreventCollision */;
moon.addDrawing("default", new ex.Sprite(Resources.TextureMoon, 0, 0, 471, 152));
moon.anchor.x = moon.anchor.y = 0;
moon.dx = -1;

var logo;
var tree;

var startGame = function () {
    if (game.currentScene !== mainLevel) {
        game.off("keyup", startGame);

        game.goToScene("level");
    }
};

game.start(loader).then(function () {
    Resources.SoundWind.setLoop(true);
    Resources.SoundWind.play();
    Resources.SoundIntro.play();

    var startScreen = new ex.Actor(game.width / 2, game.height / 2, game.width, game.height);
    startScreen.addDrawing("background", new ex.Sprite(Resources.TextureBackground, 0, 0, game.width, game.height));
    startScreen.collisionType = 0 /* PreventCollision */;
    game.addChild(startScreen);

    // moon
    game.add(moon);

    // mountains
    Parallax.create(game.currentScene, 0, 0, game.width, game.height, Resources.TextureMountains, 0);

    // tree
    tree = new ex.Actor(300, Config.obstacleYPosition + 15, 385, 519);
    tree.anchor.y = 1;
    tree.collisionType = 0 /* PreventCollision */;
    tree.addDrawing("default", new ex.Sprite(Resources.TextureTree1, 0, 0, 385, 519));
    game.add(tree);

    // fence
    Parallax.create(game.currentScene, 0, 0, game.width, game.height, Resources.TextureFence, 0);

    // ground
    var ground = new ex.Actor(0, Config.obstacleYPosition, game.width, 60, ex.Color.fromHex("#0f1722"));
    ground.anchor.x = ground.anchor.y = 0;
    ground.collisionType = 4 /* Fixed */;
    game.add(ground);

    // logo
    logo = new ex.Actor(600, 350, game.width, game.height);
    logo.setCenterDrawing(true);
    logo.addDrawing("logo", new ex.Sprite(Resources.TextureLogo, 0, 0, 406, 115));
    logo.collisionType = 0 /* PreventCollision */;
    game.addChild(logo);

    // start instructions
    var startInstructions = new ex.Label("Press UP to start running", game.getWidth() / 2, 580, '30px Architects Daughter');
    startInstructions.color = ex.Color.White;
    startInstructions.textAlign = 2 /* Center */;
    game.addChild(startInstructions);

    var emitter = new ex.ParticleEmitter(0, Config.obstacleYPosition, 960, 0);
    emitter.emitterType = 1 /* Rectangle */;
    emitter.radius = 5;
    emitter.minVel = 3;
    emitter.maxVel = 56;
    emitter.minAngle = 0;
    emitter.maxAngle = 6.2;
    emitter.isEmitting = true;
    emitter.emitRate = 10;
    emitter.opacity = 0.005;
    emitter.fadeFlag = true;
    emitter.particleLife = 4000;
    emitter.maxSize = 200;
    emitter.minSize = 133;

    //emitter.startSize = 11;
    //emitter.endSize = 200;
    emitter.acceleration = new ex.Vector(0, 0);
    emitter.beginColor = new ex.Color(255, 255, 255, 0.005);
    emitter.endColor = new ex.Color(255, 255, 255, 0);
    game.add(emitter);

    game.addScene("level", mainLevel);
    game.addScene("victory", new VictoryScene());

    game.on("keyup", startGame);
});
var ModifiedCamera = (function (_super) {
    __extends(ModifiedCamera, _super);
    function ModifiedCamera() {
        _super.apply(this, arguments);
    }
    ModifiedCamera.prototype.getFocus = function () {
        if (this.follow) {
            return new ex.Point(((-this.follow.x) * this.getZoom()) + (this.engine.getWidth() * this.getZoom()) / 2.0, 0 + Config.cameraOffset);
        } else {
            return this.focus;
        }
    };
    return ModifiedCamera;
})(ex.SideCamera);
var Parallax = (function () {
    function Parallax() {
    }
    Parallax.create = function (scene, x, y, width, height, texture, speed) {
        scene.add(new ParallaxActor(x, y, width, height, texture, speed));

        var x2 = speed > 0 ? -width : width;
        scene.add(new ParallaxActor(x2, y, width, height, texture, speed));
    };
    return Parallax;
})();

var ParallaxActor = (function (_super) {
    __extends(ParallaxActor, _super);
    function ParallaxActor(x, y, width, height, texture, speed) {
        _super.call(this, x, y, width, height);
        this.speed = speed;
        this.anchor.x = this.anchor.y = 0;

        this.dx = speed;
        this.addDrawing("default", new ex.Sprite(texture, 0, 0, width, height));
        this.collisionType = 0 /* PreventCollision */;
    }
    ParallaxActor.prototype.update = function (engine, delta) {
        if (this.isOffScreen) {
            this.x = this.speed > 0 ? this.x - (this.getWidth() * 2) : this.x + (this.getWidth() * 2);
        }

        _super.prototype.update.call(this, engine, delta);
    };
    return ParallaxActor;
})(ex.Actor);

var ParallaxTrigger = (function (_super) {
    __extends(ParallaxTrigger, _super);
    function ParallaxTrigger(x, y, width, height, action, speed) {
        _super.call(this, x, y, width, height, action);
        this.speed = speed;
        this.distanceTravelled = 0;
        this.repeats = -1;

        this.dx = speed;
        this._startingXPos = this.x;
    }
    ParallaxTrigger.prototype.update = function (engine, delta) {
        this.distanceTravelled = Math.abs(this.x - this._startingXPos);
        statsProgress = this.distanceTravelled;
        _super.prototype.update.call(this, engine, delta);
    };
    return ParallaxTrigger;
})(ex.Trigger);
//# sourceMappingURL=app.js.map
