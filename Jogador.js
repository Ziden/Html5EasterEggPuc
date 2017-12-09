var Jogador = me.ObjectEntity.extend(
    {

        init:function (x, y, settings)
        {
            // constructor (= super() no c# / Java)
            this.parent(x, y , settings);

            // variaveis de velocidade

			this.dataTiraPonto = new Date().getTime() / 1000;
			
            this.aceleracaoXMax = 5;
            this.aceleracao = 0;

            // controle velocidade
            this.brequeDerrapada = 0.2;
            this.velocidadeAceleracao = 0.2;
            this.velocidadeDesaceleracao = 0.2;

            // this.setFriction(1.0, 0.02);

            // setando a velocidade X e Y, pela segunda vez trololo
            this.setVelocity(12, 15);

            // ajustar o retangulo de colisão
            this.updateColRect(16,49, 26,30);

            this.animationspeed = me.sys.fps / (4*this.aceleracao) ;

            // setando o display pra camera seguir o jogador
            me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

            // adicionando os frames das animações o numero é a posição na folha de desenhos
            this.addAnimation("parado", [0]);
            this.addAnimation("andando", [1,2,3]);
            this.addAnimation("derrapando", [1]);
            this.addAnimation("pulando", [1]);
            this.addAnimation("caindo", [3]);

        },
        update : function ()
        {
            me.game.HUD.updateItemValue("score", 0);
            if (me.input.isKeyPressed('left'))
            {
                if(this.aceleracao > -this.aceleracaoXMax)
                    if(this.aceleracao > 0) {
                        this.aceleracao -=  this.brequeDerrapada;
                        this.setCurrentAnimation('derrapando');
                    }
                    else {
                        this.aceleracao -= this.velocidadeAceleracao;
                        if(!this.isCurrentAnimation("pulando"))
                            this.setCurrentAnimation('andando');
                    }
                this.flipX(true);
            }
            else if (me.input.isKeyPressed('right'))
            {
                if(this.aceleracao < this.aceleracaoXMax)
                    if(this.aceleracao < 0) {
                        this.aceleracao +=  this.brequeDerrapada;
                        this.setCurrentAnimation('derrapando');
                    } else {
                        this.aceleracao +=  this.velocidadeAceleracao;
                        if(!this.isCurrentAnimation("pulando"))
                            this.setCurrentAnimation("andando");
                    }

                this.flipX(false);

            }
            // se nao to apertando nada, descacelera o Rato Rena !!
            else if (!me.input.isKeyPressed('left') && !me.input.isKeyPressed('right')) {
                if(this.aceleracao > 0)
                    this.aceleracao -= 0.1;
                else if(this.aceleracao < 0)
                    this.aceleracao += 0.1;

                if(this.aceleracao > -1 && this.aceleracao < 1)
                    this.aceleracao = 0;
            }
            else
            {
                this.vel.x = 0;
            }

            if(!this.isCurrentAnimation("pulando") && !this.isCurrentAnimation("derrapando") && this.aceleracao != 0) {
                this.setCurrentAnimation('andando');
            }


            if (me.input.isKeyPressed('jump'))
            {
                if (this.doJump())
                {
                    this.setCurrentAnimation('pulando');
                    me.audio.play("jump");
                }
            }

            this.vel.x = this.aceleracao;
            this.animationspeed = me.sys.fps / (4*Math.abs(this.aceleracao)) ;

            if(this.vel.y > 0) {
                this.setCurrentAnimation('caindo');
            }
            if(this.vel.y == 0 && this.vel.x == 0) {
                this.setCurrentAnimation('parado');
            }

            if(this.pos.y > 800) {
				var pontos = me.game.HUD.getItemValue("score");
				if(pontos > 0)
					me.game.HUD.setItemValue("score", pontos-1);
                this.pos.x = PosicaoCheckpoint.salvoX;
                this.pos.y = PosicaoCheckpoint.salvoY;
                this.vel.x = 0;
                this.vel.y = 0;
            }
			
			if(this.dataTiraPonto + 5 < new Date().getTime()/1000) {
				this.dataTiraPonto = new Date().getTime() / 1000;
				var pontos = me.game.HUD.getItemValue("score");
				if(pontos > 0)
					me.game.HUD.setItemValue("score", pontos-1);
			}

            // atualiza onde o jogador ta na tela (ele somao this.vel.x e o this.vel.y ao this.pos.x e y, q eh oq controla
            // a coordenada em pixels do jogador
            var collisaoTiles = this.updateMovement();

			// check for collision result with the environment
			if (collisaoTiles.x != 0)
			{
			  this.vel.x = 0;
			  this.aceleracao = 0;
			}
			else if(collisaoTiles.y != 0)
			{
				// ainda não faz nada
			}

            // pegando o resultado da colisão de hitboxes
            var res = me.game.collide(this);

            if (res)
            {
                // se colidiu com um inimigo
                if (res.obj.type == me.game.ENEMY_OBJECT)
                {
                    // se y>0 (caindo) e eu nao to pulando
                    if ((res.y>0) && !this.jumping)
                    {
                        // Pisei na cabeça do bixo, então eu Kiko ! Vai q vai q vai kikando !
                        me.audio.play("stomp");
                        this.forceJump();
                    }
                    else
                    {
                        // Flicker eh o tempo que o carinha fica 'piscando'
                        //this.flicker(45);
                    }
                } 
            }


            // atualiza a animação
            if (this.vel.x!=0 || this.vel.y!=0)
            {
                // atualiza objetos de animação
                this.parent();
                return true;
            }
            return false;
        }

    });