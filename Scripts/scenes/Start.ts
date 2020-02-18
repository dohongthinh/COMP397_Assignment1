module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        //images string
        cm_img: string = './Assets/images/cm.png';
        pugna_img: string = './Assets/images/pugna.png';
        np_img: string = './Assets/images/np.png';
        sb_img: string = './Assets/images/sb.png';
        slark_img: string = './Assets/images/slark.png';
        ww_img: string = './Assets/images/ww.png';
        sk_img: string = './Assets/images/sk.png';
        invoker_img: string = './Assets/images/invoker.png';
        
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
        sk:number =0;
        invoker:number =0;
        reels = [
            ['cm','pugna','np','sb','slark','ww','sk','invoker'],
            ['pugna','sb','sk','cm','ww','np','invoker','slark'],
            ['invoker','slark','sk','ww','pugna','cm','sb','np']
        ];

        _reel_images:any = [];      

        //labels
        moneyLabel: objects.Label;
        winNumberLabel: objects.Label;
        lossNumberLabel: objects.Label;
        betLabel: objects.Label;
        turnLabel: objects.Label;
        ratioLabel: objects.Label;


        outCome=['','',''];
        //buttons  
        
        spinButton: objects.Button;
        bet100Button: objects.Button;
        bet50Button: objects.Button;
        bet10Button: objects.Button;
        reel1: objects.Button;
        reel2: objects.Button;
        reel3: objects.Button;
        resetButton: objects.Button;
        quitButton: objects.Button;
        

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
            this.reel1=new objects.Button();
            this.reel2=new objects.Button();
            this.reel3=new objects.Button();
            this.resetButton=new objects.Button();
            this.quitButton=new objects.Button();

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
            this.ratioLabel = new objects.Label("Ratio: " + Math.round(this.ratio)+"%", "20px", "Consolas", "#000000", 250, 515, true);
            
            this.addChild(this.moneyLabel);
            this.addChild(this.winNumberLabel);
            this.addChild(this.lossNumberLabel);
            this.addChild(this.betLabel);
            this.addChild(this.turnLabel);
            this.addChild(this.ratioLabel);
                       
        }

        public resetReels():void
        {
            this.cm = 0;
            this.pugna = 0;
            this.np = 0;
            this.sb= 0;
            this.slark = 0;
            this.ww = 0;
            this.sk = 0;
            this.invoker = 0;
            this.outCome=['','',''];
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
                //this.resetAll();
                this.resetReels(); 
                this.player_money -= this.bet;
                this.turn++;
                this.ratio=this.wins/this.turn * 100;
                var spins = [];
                var result = [];
                for(var i = 0; i < 3; i++)
                {
                    //generate the random reel spin
                    spins[i] = Math.floor((Math.random() * 8));                        
                    result[i] = this.reels[i][spins[i]];   
            
                    //check to see what are the outcomes of the reel spins
                    if(result[i] == "cm")
                    {
                        this.cm++;
                        this.outCome[i]=this.cm_img;
                    }
                    else if(result [i] == "pugna")
                    {
                        this.pugna++;
                        this.outCome[i]=this.pugna_img;
                    }
                    else if(result [i] == "np")
                    {
                        this.np++;
                        this.outCome[i]=this.np_img;
                    }
                    else if(result [i] == "sb")
                    {
                        this.sb++;
                        this.outCome[i]=this.sb_img;
                    }
                    else if(result[i] == "slark")
                    {
                        this.slark++; 
                        this.outCome[i]=this.slark_img;
                    }
                    else if(result[i] == "sk")
                    {
                        this.sk++; 
                        this.outCome[i]=this.sk_img;
                    }
                    else if(result[i] == "invoker")
                    {
                        this.invoker++;
                        this.outCome[i]=this.invoker_img; 
                    }
                    else
                    {
                        this.ww++;
                        this.outCome[i]=this.ww_img;
                }
            }
            console.log("cm"+this.cm);
            console.log("pugna"+this.pugna);
            console.log("np"+this.np);
            console.log("sb"+this.sb);
            console.log("slark"+this.slark);            
            console.log("ww"+this.ww);         
            console.log("sk"+this.sk);
            console.log("invoker"+this.invoker);           
            console.log(this.outCome[0] +"  "+this.outCome[1]+"  "+this.outCome[2]);
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
            if(this.sb == 0 && this.sk == 0 && this.invoker==0)
            {       
                this.wins++;
                this.winnings += this.bet;
        
            //based on the rarity and the frequency of the symbols in the roll,
            //the player's winnings are increased
            if(this.slark == 2)
                this.winnings += this.bet * 1,2;
            else if(this.slark == 3)
                this.winnings += this.bet * 1,5;
            else if(this.pugna == 2 || this.ww == 2)
                this.winnings += this.bet * 2;
            else if(this.pugna == 3 || this.ww == 3)
                this.winnings += this.bet * 2,5;      
            else if(this.np == 2)
                this.winnings += this.bet * 3;
            else if(this.np == 3)
                this.winnings += this.bet * 5;                      
            else if(this.cm == 2)
                this.winnings += this.bet * 7.5;
            else if(this.cm == 3)
                this.winnings += this.bet * 10;

                this.player_money += this.winnings;
                this.checkJackpot();
            }
            else
            {
                this.losses++;
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
        }   
        
        public reset():void
        {
            this.resetAll();
            this.resetReels();
            this.DisplayStats();
        }

        public Start(): void 
        {
             //instantiate a new Text object
            //this.welcomeLabel = new objects.Label("The Game", "80px", "Consolas", "#000000", 320, 180, true);
            // buttons
                     
            this.spinButton = new objects.Button('./Assets/images/spinbutton.png', 180, 300, true);   
            this.bet10Button = new objects.Button('./Assets/images/bet10.png', 180, 400, true);   
            this.bet50Button = new objects.Button('./Assets/images/bet50.png', 300, 400, true);   
            this.bet100Button = new objects.Button('./Assets/images/bet100.png', 420, 400, true);   
            this.resetButton = new objects.Button('./Assets/images/reset.png', 470, 60, true);    
            this.quitButton = new objects.Button('./Assets/images/quit.png', 510, 60, true);  
            this.DisplayStats(); 
            this.Main();
        }        
        
        public Update(): void 
        {
           
        }
        
        public Main(): void 
        {                   
            
            this.addChild(this.spinButton);
            this.addChild(this.bet10Button);
            this.addChild(this.bet50Button);
            this.addChild(this.bet100Button);
            this.addChild(this.reel1);
            this.addChild(this.reel2);
            this.addChild(this.reel3);
            this.addChild(this.resetButton);
            this.addChild(this.quitButton);


            this.spinButton.on("click", ()=>{this.spin()});
            this.bet10Button.on("click", ()=>{this.betAmount(10)});
            this.bet50Button.on("click", ()=>{this.betAmount(50)});
            this.bet100Button.on("click", ()=>{this.betAmount(100)});   
            this.resetButton.on("click", ()=>{this.reset()});
            this.quitButton.on("click", ()=>{ window.location.assign("https://www.addictinggames.com/");});
        }
    }

        
}
