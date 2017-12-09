var ScoreObject = me.HUD_Item.extend(
    {
        init: function(x, y)
        {

            // call the parent constructor
            this.parent(x, y);
            // create a font
            this.font = new me.BitmapFont("32x32_font", 32);
        },
        draw : function (context, x, y)
        {
            this.font.draw (context, this.value, this.pos.x +x, this.pos.y+y);
        }
 });

// controla que parte da história o personagem ta pra aparecer na tela nas horas tais
var TextoHistoria = me.HUD_Object.extend(
    {
        init: function(x, y)
        {
            this.janela = null;
            // call the parent constructor
            this.parent(x, y);
            // create a font
            this.font = new me.BitmapFont("16x16_font", 16);
        },


        draw : function (context, x, y)
        {
            if(!jsApp.mostraHistoria) {
                return;
            }

            if(this.janela == null) {
                this.janela =   this.gordo = me.loader.getImage("caixaMsg");
            }
            if(jsApp.ultimaParteHistoria!=jsApp.parteHistoria) {
                jsApp.ultimaParteHistoria = jsApp.parteHistoria;
                jsApp.mostrouTexto = new Date().getTime() / 1000;
            }
            if(jsApp.mostrouTexto + 6 < new Date().getTime() / 1000) {
				//alert("close "+jsApp.parteHistoria);
                jsApp.mostraHistoria = false;
                if(jsApp.parteHistoria == 6) {
					ControleScore.score = me.game.HUD.getItemValue("score");
					me.state.change(me.state.USER+2);
                }
            }

            context.drawImage(this.janela, 0,25);
            if(jsApp.parteHistoria == 1) {
                this.font.draw (context, "EXISTE UM RATO , QUE SEMPRE QUIS SER", 600,50);  
                this.font.draw (context, "UM RENA, E ESTA E SUA CHANCE DE AJUDAR", 630,80);
                this.font.draw (context, "O NATAL COMO UM RENA, COMO SEMPRE QUIS", 630,110);
            } else if(jsApp.parteHistoria == 2) { // 1 LIVRO
                this.font.draw (context, "VOCE PODE ENCONTRAR LIVROS PERDIDOS", 600,50);
                this.font.draw (context, "ENCONTRE CINCO LIVROS PARA DAR DE", 630,80);
                this.font.draw (context, "PRESENTE DE NATAL PARA AJUDAR NOEL !!", 630,110);
            } else if(jsApp.parteHistoria == 3) { // 4 LIVRO
                this.font.draw (context, "MUITO BEM !! AS VEZES O DESAFIO PODE", 600,50);
                this.font.draw (context, "PARECER DIFICIL DEMAIS, MAS VOCE PODE", 600,80);
                this.font.draw (context, "SUPERA LO, BASTA TER PERSEVERANCA !!!", 600,110);
            } else if(jsApp.parteHistoria == 4) { // 3 LIVRO
                this.font.draw (context, "VOCE ESTA PROVANDO QUE NAO PRECISA", 600,50);
                this.font.draw (context, "NASCER UM RENA PARA PODER SER UM", 600,80);
                this.font.draw (context, "BASTA ACREDITAR EM VOCE MESMO !!!", 600,110);
			 }  else if(jsApp.parteHistoria == 5) { // 2 LIVRO
                this.font.draw (context, "MUITO BEM PEQUENO RATO RENA !!!", 600,50);
                this.font.draw (context, "VOCE TEM UM BOM ESPIRITO ESPORTIVO !", 600,80);
                this.font.draw (context, "AGORA SO FALTAM 1 LIVRO !!", 600,110);
            } else if(jsApp.parteHistoria == 6) { // 5 LIVRO
                this.font.draw (context, "VOCE E MUITO BOM PEQUENO RATO NUNCA", 600,50);
                this.font.draw (context, "DESISTA DOS SEUS SONHOS POIS QUANDO", 600,80);
                this.font.draw (context, "VOCE MENOS ESPERA ELES ACONTECEM ", 600,110);
            }
        }
});

var TelaFinal = me.ScreenObject.extend(
    {
        init: function()
        {
            this.fundo = null;
            this.parent(true);
            this.font = null;
            this.scrollerfont = null;
            this.scrollertween = null;
            this.scrollerpos = 1;
        },

        onResetEvent: function()
        {
            if (this.fundo == null)
            {
				
                this.TI = new Date().getTime() / 1000;
                this.fundo = me.loader.getImage("final");
                this.font = new me.BitmapFont("32x32_font", 32);
                this.font.set("left");
                this.scrollerfont = new me.BitmapFont("32x32_font", 32);
                this.scrollerfont.set("left");   
            }
            this.scrollerpos = 640;
            this.scrollertween = new me.Tween(this).to({scrollerpos: -2200},10000).onComplete(this.scrollover.bind(this)).start();
			me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        },

        scrollover: function()
        {
            this.scrollerpos = 640;
            this.scrollertween.to({scrollerpos: -2500}, 10000).onComplete(this.scrollover.bind(this)).start();
        },
        update: function()
        {
            if (me.input.isKeyPressed('enter'))
            {
                ControleScore.submeteScore();
            }
            return true;
        },

        // tempo em segundos des de 1 jan 1970
        TI : new Date().getTime() / 1000,

        draw: function(context)
        {
            context.drawImage(this.fundo, 0, 0);
			if(this.TI + 5 < new Date().getTime()/1000) {
				this.font.draw(context, "APERTE ENTER", 215, 280);
			}
			
        },

        onDestroyEvent: function()
        {
            this.scrollertween.stop();
        }
    }); //end Title Screen