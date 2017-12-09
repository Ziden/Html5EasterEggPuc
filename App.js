var jsApp	=
{

	// controla em que parte a história está
    parteHistoria : 1,
	// a ultima parte passada
    ultimaParteHistoria : 0,
    mostraHistoria : true,
    mostrouTexto : 0,

    onload: function()
    {

        //me.debug.renderHitBox = true;

        // init the video
        if (!me.video.init('jsapp', 640, 480, false, 1.0))
        {
            alert("Ops ! Seu browser não suporta HTML 5 ! Tente usar o Google Chrome ou FireFox atualizados !");
            return;
        }

        this.gravity = 0;


        // initialize the "audio"
        me.audio.init("ogg");

        // set all ressources to be loaded
        me.loader.onload = this.loaded.bind(this);

        // set all ressources to be loaded
        me.loader.preload(g_ressources);

        // load everything & display a loading screen
        me.state.change(me.state.LOADING);
    },

    janelaHistoria : new Historia(),
    telaFinal : new TelaFinal(),

    loaded: function ()
    {
        // me.audio.disable();
        // setando os estados (telas) do jogo
        me.state.set(me.state.MENU, new Titulo());
        me.state.set(me.state.READY, new TelaInicial());
        me.state.set(me.state.PLAY, new PlayScreen());
        me.state.set(me.state.USER+1, this.janelaHistoria);
		me.state.set(me.state.USER+2, this.telaFinal);

        // add our player entity in the entity pool
        me.entityPool.add("mainPlayer", Jogador);
        me.entityPool.add("CoinEntity", Moeda);
        me.entityPool.add("LivroEntity", Livro);
        me.entityPool.add("EnemyEntity", SrMola);
        me.entityPool.add("morcego", Morcego);
        me.entityPool.add("hadouken", Hadouken);
        me.entityPool.add("evHadouken", EventoHadouken);
        me.entityPool.add("checkpoint", Checkpoint);

        // teclado
        me.input.bindKey(me.input.KEY.LEFT,		"left");
        me.input.bindKey(me.input.KEY.RIGHT,	"right");
        me.input.bindKey(me.input.KEY.UP,		"jump", true);

        // mudando pro estado principal do jogo
        me.state.change(me.state.READY);
        //me.state.change(me.state.PLAY);
    }

}; // jsApp



//bootstrap :)
window.onReady(function()
{
    jsApp.onload();
});
