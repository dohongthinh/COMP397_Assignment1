"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Start() {
            var _this = _super.call(this) || this;
            // initial value
            _this.jackpot = 5000;
            _this.player_money = 1000;
            _this.winnings = 0;
            _this.wins = 0;
            _this.losses = 0;
            _this.bet = 0;
            _this.turn = 0;
            _this.ratio = 0;
            _this.cm = 0;
            _this.pugna = 0;
            _this.np = 0;
            _this.sb = 0;
            _this.slark = 0;
            _this.ww = 0;
            _this.reels = [
                ['cm', 'pugna', 'np', 'sb', 'slark', 'ww'],
                ['pugna', 'sb', 'cm', 'ww', 'np', 'slark'],
                ['slark', 'ww', 'pugna', 'cm', 'sb', 'np']
            ];
            _this._reel_images = [];
            _this._y_offset = 110;
            _this._reel_start_y = 100;
            _this._x_offset = 115;
            _this._reel_start_x = 170;
            // initialization
            _this.spinButton = new objects.Button();
            _this.bet100Button = new objects.Button();
            _this.bet50Button = new objects.Button();
            _this.bet10Button = new objects.Button();
            _this.moneyLabel = new objects.Label();
            _this.winNumberLabel = new objects.Label();
            _this.lossNumberLabel = new objects.Label();
            _this.betLabel = new objects.Label();
            _this.turnLabel = new objects.Label();
            _this.ratioLabel = new objects.Label();
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Start.prototype.DisplayStats = function () {
            this.removeChild(this.moneyLabel);
            this.removeChild(this.winNumberLabel);
            this.removeChild(this.lossNumberLabel);
            this.removeChild(this.betLabel);
            this.removeChild(this.turnLabel);
            this.removeChild(this.ratioLabel);
            this.moneyLabel = new objects.Label("Money" + this.player_money, "80px", "Consolas", "#000000", 30, 30, true);
            this.betLabel = new objects.Label("Bet" + this.bet, "80px", "Consolas", "#000000", 255, 30, true);
            this.winNumberLabel = new objects.Label("Win Number" + this.wins, "80px", "Consolas", "#000000", 445, 30, true);
            this.lossNumberLabel = new objects.Label("Loss Number" + this.losses, "80px", "Consolas", "#000000", 620, 30, true);
            this.addChild(this.moneyLabel);
            this.addChild(this.winNumberLabel);
            this.addChild(this.lossNumberLabel);
            this.addChild(this.betLabel);
            this.addChild(this.turnLabel);
            this.addChild(this.ratioLabel);
        };
        Start.prototype.resetReels = function () {
            this.cm = 0;
            this.pugna = 0;
            this.np = 0;
            this.sb = 0;
            this.slark = 0;
            this.ww = 0;
        };
        Start.prototype.resetAll = function () {
            this.jackpot = 5000;
            this.player_money = 1000;
            this.wins = 0;
            this.losses = 0;
            this.bet = 0;
            this.turn = 0;
            this.ratio = 0;
        };
        Start.prototype.clearReelsPicture = function () {
            for (var i = 0; i < this._reel_images.length; i++)
                this.removeChild(this._reel_images[i]);
        };
        Start.prototype.spin = function () {
            if (this.bet > this.player_money)
                alert("You are broke!");
            else if (!(this.bet > 0))
                alert("Please select your bet value");
            else {
                this.clearReelsPicture();
                this.resetAll();
                this.resetReels();
                this.wins = 0;
                this.losses = 0;
                this.ratio = 0;
                this.player_money -= this.bet;
                this.turn++;
                var spins = [];
                var result = [];
                for (var i = 0; i < 3; i++) {
                    //generate the random reel spin
                    spins[i] = Math.floor((Math.random() * 6));
                    result[i] = this.reels[i][spins[i]];
                    //check to see what are the outcomes of the reel spins
                    if (result[i] == "cm") {
                        this.cm++;
                    }
                    else if (result[i] === "pugna") {
                        this.pugna++;
                    }
                    else if (result[i] === "np") {
                        this.np++;
                    }
                    else if (result[i] === "sb") {
                        this.sb++;
                    }
                    else if (result[i] === "slark") {
                        this.slark++;
                    }
                    else {
                        this.ww++;
                    }
                }
                this.determineWinning();
                this.displayResult(spins);
                this.DisplayStats();
            }
        };
        Start.prototype.betAmount = function (betAmount) {
            if (betAmount <= this.player_money) {
                this.bet = betAmount;
            }
            else
                alert("You are broke!");
            this.DisplayStats();
        };
        Start.prototype.determineWinning = function () {
            if (this.sb == 0) {
                this.wins++;
                this.winnings += this.bet;
                //based on the rarity and the frequency of the symbols in the roll,
                //the player's winnings are increased
                if (this.slark == 2)
                    this.winnings += this.bet * 10;
                else if (this.slark == 4)
                    this.winnings += this.bet * 15;
                else if (this.pugna == 2 || this.ww == 2)
                    this.winnings += this.bet * 20;
                else if (this.pugna == 3 || this.ww == 3)
                    this.winnings += this.bet * 30;
                else if (this.np == 2)
                    this.winnings += this.bet * 40;
                else if (this.np == 3)
                    this.winnings += this.bet * 60;
                else if (this.cm == 2)
                    this.winnings += this.bet * 80;
                else if (this.cm == 3)
                    this.winnings += this.bet * 100;
                this.player_money += this.winnings;
                this.checkJackpot();
            }
        };
        Start.prototype.checkJackpot = function () {
            var _jackpotTry = Math.floor(Math.random() * 51 + 1);
            var _jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (_jackpotTry === _jackPotWin) {
                alert("You Won the $" + this.jackpot + " Jackpot!!");
                this.player_money += this.jackpot;
                this.jackpot = 1000;
                this.DisplayStats();
            }
        };
        Start.prototype.displayResult = function (spins) {
            var index = 0;
            for (var i = 0; i < this.reels.length; i++) {
                for (var x = spins[i] - 1, count = 0; count < 3; x++, count++) {
                    if (x < 0)
                        x = this.reels[i].length - 1;
                    else if (x > this.reels[i].length - 1)
                        x = 0;
                    this._reel_images[index] = new createjs.Bitmap(this.getResult(reels[i][x]));
                    reel_images[index].regX = reel_images[index].image.width / 2;
                    reel_images[index].regY = reel_images[index].image.height / 2;
                    reel_images[index].x = reel_start_x + (i * x_offset);
                    reel_images[index].y = reel_start_y + (count * y_offset);
                    this.addChild(reel_images[index]);
                    index++;
                }
            }
        };
        Start.prototype.Start = function () {
            //instantiate a new Text object
            //this.welcomeLabel = new objects.Label("The Game", "80px", "Consolas", "#000000", 320, 180, true);
            // buttons
            //this.spinButton = new objects.Button('./Assets/images/spinbutton.png', 320, 430, true);
            this.Main();
        };
        Start.prototype.Update = function () {
        };
        Start.prototype.Main = function () {
            this.addChild(this.spinButton);
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map