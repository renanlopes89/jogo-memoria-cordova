
        var tabuleiro = new Array( "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11" ); // O verdadeiro 'tabuleiro' do jogo. Cada nÃºmero representa uma carta.
        var tabuleiroBool = new Array( "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ); // Array para controle de cartas visÃ­veis/invisÃ­veis.
        var tabuleiroBoolAux = new Array( 12 ); // Array auxiliar para funÃ§Ã£o 'trava'.

        var numCliques = 0; // NÃºmero de cliques efetuados pelo jogador.
        var acertos = 0; // Quantidade de acertos do jogador.
        var indiceCartaAnterior = -1; // Ãndice da carta clicada na jogada anterior.
        var cartaAtual = -1; // Ãndice da carta clicada na jogada atual.

        embaralhaTabuleiro();

        // *** Embaralha as 'cartas' no tabuleiro aleatoriamente. ***
        function embaralhaTabuleiro() {
            r = -1;
            for ( i = 0; i < 12; i++ ) {
              r = Math.round( Math.random() * ( tabuleiro.length - 1 ) );
              aux = tabuleiro[ r ];
              tabuleiro[ r ] = tabuleiro[ i ];
              tabuleiro[ i ] = aux;
            }
        }

        // *** Verifica qual o botÃ£o clicado de uma jogada. Se for o segundo, verifica se acertou ou errou. ***
        function verificaJogada( indice ) {
            if ( tabuleiroBool[ indice ] == 0 ) {
              tabuleiroBool[ indice ] = 1;
              numCliques++;

              carta = parseInt( tabuleiro[ parseInt( indice ) ] );
              visualizarCarta( carta, indice );
			  
              if ( numCliques % 2 != 0 ) { // Primeiro botÃ£o da jogada clicado.
                  indiceCartaAnterior = indice;
              } else if ( ( tabuleiro[ indice ] % 6 ) == ( tabuleiro[ indiceCartaAnterior] % 6 ) ) { // Acertou.
                  acertos++;
                  if ( acertos == tabuleiro.length / 2 ) {
                    document.getElementById( "msg" ).value = "*** Fim de Jogo! *** VocÃª errou " + ( ( numCliques / 2 ) - acertos ) + " vez(es).";
                  }
              } else { // Errou.
                  cartaAtual = indice; // Passando o valor para a variÃ¡vel global pode-se usar 'setTimeout'
                  document.getElementById( "msg" ).value = "ERROU!";

                  // Os procedimentos adotados abaixo permitem ao jogador visualizar a segunda
                  // carta clicada sem poder clicar em nenhuma outra enquanto as outras duas ainda
                  // estiverem visÃ­veis.
                  trava( 1 );
                  setTimeout( "trava( 0 );", 1000 );

                  setTimeout( "esconderCarta( indiceCartaAnterior );", 1000 );
                  setTimeout( "esconderCarta( cartaAtual );", 1000 );
                  setTimeout( "document.getElementById( \"msg\" ).value = \"\";", 1000 );
              }
            }
            return;
        }

        // *** Deixa uma determinada carta visÃ­vel ao jogador. ***
        function visualizarCarta( carta, indice ) {
            endereco = "img/carta" + ( carta % 6 ) + ".png";
            document.campo[ indice ].src = endereco;
        }

        // *** Esconde uma determinada carta do jogador. ***
        function esconderCarta( indice ) {
            document.campo[ indice ].src = "img/costas.jpg";
            tabuleiroBool[ indice ] = 0;
        }

        // *** Inicia um novo jogo ***
        function novoJogo() {
            acertos = 0;
            numCliques = 0;
            indiceBotaoClicado = -1;

            for ( i = 0; i < tabuleiro.length; i++ ) { // Vira todas as cartas.
              esconderCarta( i );
            }

            embaralhaTabuleiro();
            document.getElementById( "msg" ).value = "Novo jogo iniciado!";

            return;
        }

		
		
        // *** Permite ou nÃ£o que o jogador possa clicar nas cartas ***
        function trava( flag ) {
            if ( flag == 1 ) { // Bloqueia as cartas para 'clicks'.
              for ( i = 0; i < tabuleiroBool.length; i++ ) {
                  tabuleiroBoolAux[ i ] = tabuleiroBool[ i ];
                  tabuleiroBool[ i ] = 1;
              }
            } else if ( flag == 0 ) { // Libera as cartas para 'clicks'.
              for ( i = 0; i < tabuleiroBool.length; i++ ) {
                  tabuleiroBool[ i ] = tabuleiroBoolAux[ i ];
              }
            }

            return;
        }
     