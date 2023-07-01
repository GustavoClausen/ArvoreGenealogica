function selectorOfCardSelected(card) {
    try {
        const gen = card.parentElement.parentElement.classList[1];
        if (gen === 'root') {
            return '.root-gen > .entry-gen-root';
        }
        const genDegree = Number(gen.slice(4,))
        let entry = card.parentElement;
        let geracao = entry.parentElement;
        let classEntry = entry.classList[1];
        let classGeracao = geracao.classList[1];
        let selectorGen = '';
        for(i = genDegree; i >= 1; i--) {
            selectorGen = `> .${classGeracao} > .${classEntry} ` + selectorGen;
            entry = geracao.parentElement;
            geracao = entry.parentElement;
            classEntry = entry.classList[1];
            classGeracao = geracao.classList[1];
        }
        selectorGen = selectorGen.trim().slice(2,);
        return selectorGen;
    } catch {
        return '.root-gen > .entry-gen-root';
    }
}