var ControleScore = {

	score : 0,
	dataInicial : new Date().getTime() / 1000,

// realiza o POST em uma pagina , gerando um form e submetendo este form por POST para a url especificada
// usaremos isto para realizar o post do score do jogo
	fazPost : function(params) {
		var method = "post";
		var form = document.createElement("form");
		form.setAttribute("method", method);
		form.setAttribute("action", "submeterScore.asp");
		for(var key in params) {
			if(params.hasOwnProperty(key)) {
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", key);
				hiddenField.setAttribute("value", params[key]);
				form.appendChild(hiddenField);
			}
		}
		document.body.appendChild(form);
		$(function(){
			form.submit(function(){
				$.post($(this).attr("action"), $(this).serialize(), function(jsonData){
					alert(jsonData);
				}, "jsonp");
			});
		});
	},
	
	submeteScore : function() {
		var secsJogados = Math.round(new Date().getTime()/1000 - this.dataInicial);
		var pontos = ControleScore.score;
		
		this.fazPost({
			scoreParm : pontos,
			segundosDeJogo : secsJogados
		});
	}
	
};

var Moeda = me.CollectableEntity.extend(
{
    init: function (x, y, settings)
    {
        // call the parent constructor
        this.parent(x, y , settings);
    },

    onCollision : function ()
    {
		
        // do something when collide
        me.audio.play("cling");
        // give some score
        me.game.HUD.updateItemValue("score", 10);
        // make sure it cannot be collected "again"
        this.collidable = false;
		//ControleScore.submeteScore();
        // remove it
        me.game.remove(this);
    }
});

var primeiroLivro = true;
var numeroLivro = 0;

var Livro = me.CollectableEntity.extend(
    {
        init: function (x, y, settings)
        {
            // call the parent constructor
            this.parent(x, y , settings);
        },

        onCollision : function ()
        {
            //alert("colidede");
            if(primeiroLivro==true) {
                numeroLivro = 1;
               // alert("peguei");
                jsApp.parteHistoria = 2;
                jsApp.mostraHistoria = true;

                primeiroLivro = false;
            } else {
                numeroLivro++;
                jsApp.parteHistoria = numeroLivro+1;
                jsApp.mostraHistoria = true;
            }
            me.audio.play("cling");
            me.game.HUD.updateItemValue("score", 30);
            this.collidable = false;
            me.game.remove(this);

        }
    });