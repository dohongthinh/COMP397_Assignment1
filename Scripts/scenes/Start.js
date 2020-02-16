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
            // PRIVATE INSTANCE MEMBERS
            //images string
            _this.cm_img = './Assets/images/cm.png';
            _this.pugna_img = './Assets/images/pugna.png';
            _this.np_img = './Assets/images/np.png';
            _this.sb_img = './Assets/images/sb.png';
            _this.slark_img = './Assets/images/slark.png';
            _this.ww_img = './Assets/images/ww.png';
            _this.sk_img = './Assets/images/sk.png';
            _this.invoker_img = './Assets/images/invoker.png';
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
            _this.sk = 0;
            _this.invoker = 0;
            _this.reels = [
                ['cm', 'pugna', 'np', 'sb', 'slark', 'ww', 'sk', 'invoker'],
                ['pugna', 'sb', 'sk', 'cm', 'ww', 'np', 'invoker', 'slark'],
                ['invoker', 'slark', 'sk', 'ww', 'pugna', 'cm', 'sb', 'np']
            ];
            _this._reel_images = [];
            _this.outCome = ['', '', ''];
            _this._y_offset = 110;
            _this._reel_start_y = 100;
            _this._x_offset = 115;
            _this._reel_start_x = 170;
            // initialization                      
            _this.spinButton = new objects.Button();
            _this.bet100Button = new objects.Button();
            _this.bet50Button = new objects.Button();
            _this.bet10Button = new objects.Button();
            _this.reel1 = new objects.Button();
            _this.reel2 = new objects.Button();
            _this.reel3 = new objects.Button();
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
            this.moneyLabel = new objects.Label("Money: " + this.player_money, "20px", "Consolas", "#000000", 100, 450, true);
            this.betLabel = new objects.Label("Bet: " + this.bet, "20px", "Consolas", "#000000", 250, 450, true);
            this.winNumberLabel = new objects.Label("Win Number: " + this.wins, "20px", "Consolas", "#000000", 100, 480, true);
            this.lossNumberLabel = new objects.Label("Loss Number: " + this.losses, "20px", "Consolas", "#000000", 300, 480, true);
            this.turnLabel = new objects.Label("Turn: " + this.turn, "20px", "Consolas", "#000000", 100, 510, true);
            this.ratioLabel = new objects.Label("Ratio: " + Math.round(this.ratio) + "%", "20px", "Consolas", "#000000", 250, 515, true);
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
            this.sk = 0;
            this.invoker = 0;
            this.outCome = ['', '', ''];
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
                //this.resetAll();
                this.resetReels();
                this.player_money -= this.bet;
                this.turn++;
                this.ratio = this.wins / this.turn * 100;
                var spins = [];
                var result = [];
                for (var i = 0; i < 3; i++) {
                    //generate the random reel spin
                    spins[i] = Math.floor((Math.random() * 8));
                    result[i] = this.reels[i][spins[i]];
                    //check to see what are the outcomes of the reel spins
                    if (result[i] == "cm") {
                        this.cm++;
                        this.outCome[i] = this.cm_img;
                    }
                    else if (result[i] == "pugna") {
                        this.pugna++;
                        this.outCome[i] = this.pugna_img;
                    }
                    else if (result[i] == "np") {
                        this.np++;
                        this.outCome[i] = this.np_img;
                    }
                    else if (result[i] == "sb") {
                        this.sb++;
                        this.outCome[i] = this.sb_img;
                    }
                    else if (result[i] == "slark") {
                        this.slark++;
                        this.outCome[i] = this.slark_img;
                    }
                    else if (result[i] == "sk") {
                        this.sk++;
                        this.outCome[i] = this.sk_img;
                    }
                    else if (result[i] == "invoker") {
                        this.invoker++;
                        this.outCome[i] = this.invoker_img;
                    }
                    else {
                        this.ww++;
                        this.outCome[i] = this.ww_img;
                    }
                }
                console.log("cm" + this.cm);
                console.log("pugna" + this.pugna);
                console.log("np" + this.np);
                console.log("sb" + this.sb);
                console.log("slark" + this.slark);
                console.log("ww" + this.ww);
                console.log("sk" + this.sk);
                console.log("invoker" + this.invoker);
                console.log(this.outCome[0] + "  " + this.outCome[1] + "  " + this.outCome[2]);
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
            if (this.sb == 0 && this.sk == 0 && this.invoker == 0) {
                this.wins++;
                this.winnings += this.bet;
                //based on the rarity and the frequency of the symbols in the roll,
                //the player's winnings are increased
                if (this.slark == 2)
                    this.winnings += this.bet * 1, 2;
                else if (this.slark == 3)
                    this.winnings += this.bet * 1, 5;
                else if (this.pugna == 2 || this.ww == 2)
                    this.winnings += this.bet * 2;
                else if (this.pugna == 3 || this.ww == 3)
                    this.winnings += this.bet * 2, 5;
                else if (this.np == 2)
                    this.winnings += this.bet * 3;
                else if (this.np == 3)
                    this.winnings += this.bet * 5;
                else if (this.cm == 2)
                    this.winnings += this.bet * 7.5;
                else if (this.cm == 3)
                    this.winnings += this.bet * 10;
                this.player_money += this.winnings;
                this.checkJackpot();
            }
            else {
                this.losses++;
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
            this.removeChild(this.reel1);
            this.removeChild(this.reel2);
            this.removeChild(this.reel3);
            this.reel1 = new objects.Button(this.outCome[0], 160, 200, true);
            this.reel2 = new objects.Button(this.outCome[1], 290, 200, true);
            this.reel3 = new objects.Button(this.outCome[2], 410, 200, true);
            this.addChild(this.reel1);
            this.addChild(this.reel2);
            this.addChild(this.reel3);
            console.log("reels added");
        };
        Start.prototype.Start = function () {
            //instantiate a new Text object
            //this.welcomeLabel = new objects.Label("The Game", "80px", "Consolas", "#000000", 320, 180, true);
            // buttons
            this.spinButton = new objects.Button('./Assets/images/spinButton.png', 180, 300, true);
            this.bet10Button = new objects.Button('./Assets/images/bet10.png', 180, 400, true);
            this.bet50Button = new objects.Button('./Assets/images/bet50.png', 300, 400, true);
            this.bet100Button = new objects.Button('./Assets/images/bet100.png', 420, 400, true);
            this.DisplayStats();
            this.Main();
        };
        Start.prototype.Update = function () {
        };
        Start.prototype.Main = function () {
            var _this = this;
            this.addChild(this.spinButton);
            this.addChild(this.bet10Button);
            this.addChild(this.bet50Button);
            this.addChild(this.bet100Button);
            this.addChild(this.reel1);
            this.addChild(this.reel2);
            this.addChild(this.reel3);
            this.spinButton.on("click", function () { _this.spin(); });
            this.bet10Button.on("click", function () { _this.betAmount(10); });
            this.bet50Button.on("click", function () { _this.betAmount(50); });
            this.bet100Button.on("click", function () { _this.betAmount(100); });
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map