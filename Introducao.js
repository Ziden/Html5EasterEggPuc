var TelaInicial = me.ScreenObject.extend(
    {
        init: function()
        {
            this.parent(true);
            this.gordo = null;
            this.logopuc = null;
            this.font = null;
            this.scrollerfont = null;
            this.scrollertween = null;
            this.scrollerpos = 1;

        },

        onResetEvent: function()
        {

            if (this.gordo == null)
            {
                me.audio.play("Apresentacao");
                this.logopuc = me.loader.getImage("logopuc");
                this.gordo = me.loader.getImage("gordo");
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
            if(this.avancar) {
                me.state.change(me.state.MENU);
                //alert("mudei");
            }
           // if (me.input.isKeyPressed('enter'))
           // {
           //     me.state.change(me.state.PLAY);
           // }
           // return true;
        },

        logoX : -400,
        logoY : 20,
        nticX : 230,
        avancar : false,

        tocouHadouken : false,
        // tempo em segundos des de 1 jan 1970
        tempoInicial : new Date().getTime() / 1000,

        // santa gambiarra !!!!!!
        draw: function(context)
        {
            if(this.avancar) return;
            me.video.clearSurface(context,"white");
            context.drawImage(this.logopuc, this.logoX, this.logoY);
            // andando o logoda puc
            if(this.logoX < 100)
                this.logoX += 60;
            // se ta no segundo bumbo
            if(this.tempoInicial + 5 < new Date().getTime() / 1000) {
                // andando nucleo de tecnologia
                this.font.draw(context, "NUCLEO DE", this.nticX+15, 280);
                this.font.draw(context, "TECNOLOGIA", this.nticX, 330);
                if(this.nticX > 190) {
                    this.nticX -= 60;
                }

            // se ta no terceiro bumbo, vai pra tela do titulo do jogo
            } if(this.tempoInicial + 9 < new Date().getTime() / 1000) {
                me.video.clearSurface(context,"white");
                this.avancar = true;

                //this.font.draw(context, "Aperte Enter", 200, 280);
            }

            this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
        },

        onDestroyEvent: function()
        {
           // me.input.unbindKey(me.input.KEY.ENTER);
            this.scrollertween.stop();
        }
    });































var Titulo = me.ScreenObject.extend(
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
                me.audio.playTrack("MusicaNatalina");
                this.fundo = me.loader.getImage("Titulo");
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

                me.state.change(me.state.USER+1);

            }
            return true;
        },

        // tempo em segundos des de 1 jan 1970
        TI : new Date().getTime() / 1000,


        draw: function(context)
        {
            context.drawImage(this.fundo, 0, 0);
            if(this.TI + 3 < new Date().getTime() / 1000) {
                this.font.draw(context, "APERTE ENTER", 100+15, 300);
            }

        },

        onDestroyEvent: function()
        {
            me.input.unbindKey(me.input.KEY.ENTER);
            this.scrollertween.stop();
        }
    }); //end Title Screen
















var Historia = me.ScreenObject.extend(
    {
        init: function()
        {
            this.renasRindo = null;
            this.gordo = null;
            this.parent(true);
            this.font = null;
            this.scrollerfont = null;
            this.scrollertween = null;
            this.scrollerpos = 1;
        },

        onResetEvent: function()
        {
            if (this.gordo == null)
            {
                this.tempoInicial = new Date().getTime() / 1000;
                this.gordo = me.loader.getImage("gordo");
                this.renasRindo = me.loader.getImage("renasRindo");
                this.font = new me.BitmapFont("16x16_font", 16);
                this.font.set("left");
                this.scrollerfont = new me.BitmapFont("16x16_font", 16);
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
                introducao = true;
                me.state.change(me.state.PLAY);
            }
            return true;
        },

        // tempo em segundos des de 1 jan 1970
        tempoInicial : new Date().getTime() / 1000,

        gordoX : 600,
        renasX : 900,
        jaRiu : false,

        draw: function(context)
        {
            me.video.clearSurface(context,"white");
            context.drawImage(this.gordo, this.gordoX, 0);
            context.drawImage(this.renasRindo, this.renasX, 300);
            if(this.gordoX > 170) {
                this.gordoX-= 1;
                this.renasX -= 2;
            }

            if(this.tempoInicial + 12 < new Date().getTime() / 1000) {
                this.font.draw(context, "APERTE ENTER", 230, 230);
                this.font.draw(context, "E USE AS SETINHAS PARA SE MOVIMENTAR", 30, 260);
            }
            else if(this.tempoInicial + 6 < new Date().getTime() / 1000) {

                this.font.draw(context, "SUAS RENAS FICARAM RINDO DELE SEM AJUDAR", 0, 200);
                this.font.draw(context, "AGORA QUEM PODERIA ENTREGAR OS LIVROS DE", 00, 230);
                this.font.draw(context, "NATAL PARA AS CRIANCAS ESTUDAREM ?", 0, 260);
            }
            else if(this.tempoInicial + 1 < new Date().getTime() / 1000) {
                if(!this.jaRiu) {
                    me.audio.play("risadaNoel");
                    this.jaRiu = true;
                }
                this.font.draw(context, "PAPAI NOEL ACABOU COMENDO DOCES DEMAIS", 20, 200);
                this.font.draw(context, "E FICOU ENTALADO EM UMA CHAMINE", 60, 230);
            }

        },

        onDestroyEvent: function()
        {
            me.input.unbindKey(me.input.KEY.ENTER);
            this.scrollertween.stop();
        }
    }); //end Title Screen



var introducao = false;
























