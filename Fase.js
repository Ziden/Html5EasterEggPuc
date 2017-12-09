// checkpoint
var PosicaoCheckpoint = {
    salvoX : 0,
    salvoY : 0
}

var PlayScreen = me.ScreenObject.extend(
    {

        //textoHistoria : ,
        onResetEvent: function()
        {
            // play the audio track
            //me.audio.playTrack("Intro");

            // load a level
            me.levelDirector.loadLevel("area01");

            // add a default HUD to the game mngr
            me.game.addHUD(0,0,640,400);

            // add a new HUD item
            me.game.HUD.addItem("score", new ScoreObject(620,10));
            //me.game.addHUD(0,0,640,400);
            me.game.HUD.addItem("textoHistoria", new TextoHistoria(0,0));
            // make sure everyhting is in the right order
            me.game.sort();

        },


        /* ---
         action to perform when game is finished (state change)
         ---	*/
        onDestroyEvent: function()
        {
            // remove the HUD
            me.game.disableHUD();

            // stop the current audio track
            me.audio.stopTrack();
        }

    }
);

var hadoukenGo = false;

var EventoHadouken = me.InvisibleEntity.extend(
    {
        jaFoiHaduken: false,
        init: function (x, y, settings)
        {
           // call the parent constructor
           this.parent(x, y , settings);
           //this.updateColRect(0,20,0,20);

        },

        onCollision : function (res, obj)
        {
            if(!this.jaFoiHaduken) {
                me.audio.play("hadouken");
                this.jaFoiHaduken = true;
                hadoukenGo = true;
            }
        },

        // manage the enemy movement
        update : function ()
        {
            // do nothing if not visible
            if (!this.visible)
                return false;
                this.parent();
                return true;
        }
    });


var Checkpoint = me.InvisibleEntity.extend(
    {
        jaSalvou: false,
        init: function (x, y, settings)
        {
            // call the parent constructor
            this.parent(x, y , settings);
            //this.updateColRect(0,20,0,20);

        },

        onCollision : function (res, obj)
        {
            if(!this.jaSalvou) {
                this.jaSalvou = true;
                PosicaoCheckpoint.salvoX = obj.pos.x;
                PosicaoCheckpoint.salvoY = obj.pos.y;

            }
        },

        // manage the enemy movement
        update : function ()
        {
            // do nothing if not visible
            if (!this.visible)
                return false;
            this.parent();
            return true;
        }
    });
