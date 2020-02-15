module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        _scene: any;
        _queue: any = new createjs.LoadQueue();
        _play: any;
        _result: any;
        // initial value
        jackpot:number = 5000;
        player_money:number = 1000;
        winnings:number=0;
        wins:number = 0;
        losses:number = 0;
        bet:number = 0;
        turn:number = 0;
        ratio:number=0;

        cm:number = 0;
        pugna:number = 0;
        np:number = 0;
        sb:number = 0;
        slark:number = 0;
        ww:number = 0;

        reels = [
            ['cm','pugna','np','sb','slark','ww'],
            ['pugna','sb','cm','ww','np','slark'],
            ['slark','ww','pugna','cm','sb','np']
        ];

        _reel_images:any = [];      

        //labels
        moneyLabel: objects.Label;
        winNumberLabel: objects.Label;
        lossNumberLabel: objects.Label;
        betLabel: objects.Label;
        turnLabel: objects.Label;
        ratioLabel: objects.Label;


        //buttons  
        
        spinButton: objects.Button;
        bet100Button: objects.Button;
        bet50Button: objects.Button;
        bet10Button: objects.Button;

        _y_offset = 110;  
        _reel_start_y = 100;
        
        _x_offset = 115;
        _reel_start_x = 170;
        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();
            // initialization                      
            this.spinButton = new objects.Button();
            this.bet100Button=new objects.Button();
            this.bet50Button=new objects.Button();
            this.bet10Button=new objects.Button();

            this.moneyLabel=new objects.Label();
            this.winNumberLabel=new objects.Label();
            this.lossNumberLabel=new objects.Label();
            this.betLabel=new objects.Label();
            this.turnLabel=new objects.Label();
            this.ratioLabel=new objects.Label();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public DisplayStats():void
        {
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
            this.ratioLabel = new objects.Label("Ratio: " + this.ratio, "20px", "Consolas", "#000000", 250, 515, true);
            
            
        }

        public resetReels():void
        {
            this.cm = 0;
            this.pugna = 0;
            this.np = 0;
            this.sb= 0;
            this.slark = 0;
            this.ww = 0;
        }

        public resetAll():void
        {
            this.jackpot = 5000;
            this.player_money = 1000;
            this.wins = 0;
            this.losses = 0;
            this.bet = 0;
            this.turn = 0;
            this.ratio=0;
        }

        public clearReelsPicture():void
        {
        for(let i = 0; i < this._reel_images.length; i++)
            this.removeChild(this._reel_images[i]);
        }

        public spin():void
        {
            if(this.bet > this.player_money)        
                alert("You are broke!");                                
            else if(!(this.bet > 0))        
                alert("Please select your bet value");        
            else
            {
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

                for(var i = 0; i < 3; i++)
                {
                    //generate the random reel spin
                    spins[i] = Math.floor((Math.random() * 6));                        
                    result[i] = this.reels[i][spins[i]];   
            
                    //check to see what are the outcomes of the reel spins
                    if(result[i] == "cm")
                    {
                        this.cm++;
                    }
                    else if(result [i] === "pugna")
                    {
                        this.pugna++;
                    }
                    else if(result [i] === "np")
                    {
                        this.np++;
                    }
                    else if(result [i] === "sb")
                    {
                        this.sb++;
                    }
                    else if(result[i] === "slark")
                    {
                        this.slark++; 
                    }
                    else
                    {
                        this.ww++;
                }
            }
            this.determineWinning();        
            this.displayResult(spins);
            this.DisplayStats();
            }
        }

        public betAmount(betAmount:number):void
        {
            if(betAmount <= this.player_money)
        {
            this.bet = betAmount;
        }
        else
            alert("You are broke!");
    
        this.DisplayStats();
        }
        
        public determineWinning():void
        {
            if(this.sb == 0)
            {       
                this.wins++;
                this.winnings += this.bet;
        
            //based on the rarity and the frequency of the symbols in the roll,
            //the player's winnings are increased
            if(this.slark == 2)
                this.winnings += this.bet * 10;
            else if(this.slark == 4)
                this.winnings += this.bet * 15;
            else if(this.pugna == 2 || this.ww == 2)
                this.winnings += this.bet * 20;
            else if(this.pugna == 3 || this.ww == 3)
                this.winnings += this.bet * 30;      
            else if(this.np == 2)
                this.winnings += this.bet * 40;
            else if(this.np == 3)
                this.winnings += this.bet * 60;                      
            else if(this.cm == 2)
                this.winnings += this.bet * 80;
            else if(this.cm == 3)
                this.winnings += this.bet * 100;

                this.player_money += this.winnings;
            this.checkJackpot();
            }
        }

        public checkJackpot():void
        {
            let _jackpotTry = Math.floor(Math.random() * 51 + 1);
            let _jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (_jackpotTry === _jackPotWin) {
                alert("You Won the $" + this.jackpot + " Jackpot!!");
                this.player_money += this.jackpot;
                this.jackpot = 1000;
                this.DisplayStats();
            }
        }

        public displayResult(spins:any):void
        {
            let index = 0;
            for(let i = 0; i < this.reels.length; i++) 
            {                          
                this._reel_images[index] = new createjs.Bitmap(this._queue.getResult(this.reels[i]));
                this._reel_images[index].regX = this._reel_images[index].image.width / 2;
                this._reel_images[index].regY = this._reel_images[index].image.height / 2;
                this._reel_images[index].x = this._reel_start_x + (i * this._x_offset);
                this._reel_images[index].y = this._reel_start_y + (this._y_offset);                
                this.addChild(this._reel_images[index]);                          
                index++;
            }
        }   
        

        public Start(): void 
        {
             //instantiate a new Text object
            //this.welcomeLabel = new objects.Label("The Game", "80px", "Consolas", "#000000", 320, 180, true);
            // buttons
                     
            this.DisplayStats();
            
            this.spinButton = new objects.Button('./Assets/images/spinbutton.png', 100, 300, true);   
            this.bet10Button = new objects.Button('./Assets/images/bet10.png', 100, 350, true);   
            this.bet50Button = new objects.Button('./Assets/images/bet50.png', 200, 350, true);   
            this.bet100Button = new objects.Button('./Assets/images/bet100.png', 300, 350, true);  
            this.Main();
        }        
        
        public Update(): void 
        {
           
        }
        
        public Main(): void 
        {                   
            this.addChild(this.moneyLabel);
            this.addChild(this.winNumberLabel);
            this.addChild(this.lossNumberLabel);
            this.addChild(this.betLabel);
            this.addChild(this.turnLabel);
            this.addChild(this.ratioLabel);
            
            this.addChild(this.spinButton);
            this.addChild(this.bet10Button);
            this.addChild(this.bet50Button);
            this.addChild(this.bet100Button);
        }

        
    }
}