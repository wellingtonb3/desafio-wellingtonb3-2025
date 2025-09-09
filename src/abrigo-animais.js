// abrigo-animais.js

class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // Dados fixos dos animais
    const animais = {
      Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] },
    };

    const brinquedosValidos = ['RATO','BOLA','LASER','CAIXA','NOVELO','SKATE'];

    // --- Funções auxiliares ---
    const parseLista = str => str.split(',').map(x => x.trim().toUpperCase()).filter(Boolean);
    const parseAnimais = str => str.split(',').map(x => x.trim()).filter(Boolean);
    const temDuplicados = arr => new Set(arr).size !== arr.length;

    const contemEmOrdem = (brinquedosPessoa, favoritos) => {
      let idx = 0;
      for (const b of brinquedosPessoa) {
        if (idx < favoritos.length && b === favoritos[idx]) idx++;
      }
      return idx === favoritos.length;
    }

    // --- Preparar entradas ---
    const p1 = parseLista(brinquedosPessoa1);
    const p2 = parseLista(brinquedosPessoa2);
    const ordem = parseAnimais(ordemAnimais);

    // --- Validações ---
    if (temDuplicados(p1) || temDuplicados(p2)) return { erro: "Brinquedo inválido" };
    if (!p1.every(b => brinquedosValidos.includes(b)) || !p2.every(b => brinquedosValidos.includes(b))) return { erro: "Brinquedo inválido" };
    if (temDuplicados(ordem) || !ordem.every(a => animais[a])) return { erro: "Animal inválido" };

    let resultado = {};
    let adotadosP1 = 0;
    let adotadosP2 = 0;

    // --- Processar cada animal ---
    for (const animal of ordem) {
      const favoritos = animais[animal].brinquedos;
      const tipo = animais[animal].tipo;
      let dono;

      if (animal === "Loco") {
        const p1Ok = adotadosP1 < 3;
        const p2Ok = adotadosP2 < 3;

        if (p1Ok && p2Ok) dono = "abrigo";
        else if (p1Ok) { dono = "pessoa 1"; adotadosP1++; }
        else if (p2Ok) { dono = "pessoa 2"; adotadosP2++; }
        else dono = "abrigo";

      } else if (tipo === 'gato') {
        const p1Ok = contemEmOrdem(p1, favoritos) && adotadosP1 < 3;
        const p2Ok = contemEmOrdem(p2, favoritos) && adotadosP2 < 3;

        if (p1Ok && p2Ok) dono = "abrigo";
        else if (p1Ok) { dono = "pessoa 1"; adotadosP1++; }
        else if (p2Ok) { dono = "pessoa 2"; adotadosP2++; }
        else dono = "abrigo";

      } else {
        const p1Ok = contemEmOrdem(p1, favoritos) && adotadosP1 < 3;
        const p2Ok = contemEmOrdem(p2, favoritos) && adotadosP2 < 3;

        if (p1Ok && p2Ok) dono = "abrigo";
        else if (p1Ok) { dono = "pessoa 1"; adotadosP1++; }
        else if (p2Ok) { dono = "pessoa 2"; adotadosP2++; }
        else dono = "abrigo";
      }

      resultado[animal] = dono;
    }

    // Montar lista final ordenada alfabeticamente
    const listaFinal = Object.keys(resultado).sort().map(a => `${a} - ${resultado[a]}`);
    return { lista: listaFinal };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
