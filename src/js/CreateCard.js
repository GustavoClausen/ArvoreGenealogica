class CreateCard{
    constructor(name, birthDate, birthPlace, sex, otherLocal) {
        this.name = name;
        this.birthDate = birthDate;
        this.birthPlace = birthPlace;
        this.sex = sex;
        this.otherLocal = otherLocal;
    }
    createConatinerCard() {
        const container = createDiv(['container', 'card-container']);
        return container;
    }
    createImageCard() {
        const div = createDiv(['card-img']);
        const img = createImgTag(this.sex);
        div.appendChild(img);
        return div;
    }
    createNameCard() {
        const div1 = createDiv(['card-name']);
        const div2 = createDiv(['name']);
        div2.innerText = this.name;
        div1.appendChild(div2);
        return div1;
    }
    createFlagAndDateBirth() {
        const container = createDiv(['card-flag-birth-container']);
        const divContainerFlag = createDiv(['container-flag']);
        const img = document.createElement('img');
        const birthDate = createDiv(['birth-date']);
        const spanLocal = document.createElement('span');
        birthDate.innerText = this.birthDate;
        img.classList.add('flag');
        spanLocal.innerText = this.birthPlace;
        spanLocal.style.display = 'none';
        divContainerFlag.appendChild(img);
        divContainerFlag.appendChild(spanLocal);
        container.appendChild(divContainerFlag);
        container.appendChild(birthDate);
        if(this.birthPlace === 'br') {
            img.src = './icons/brazil-flag.svg';
            img.alt = 'Bandeira do Brasil';
        } else if(this.birthPlace === 'it'){
            img.src = './icons/italy-flag.svg';
            img.alt = 'Bandeira da Itália';
        } else {
            img.src = './icons/world-flag.svg';
            img.alt = 'Ícone Globo Terrestre';
            const spanLocalTxt = document.createElement('span');
            spanLocalTxt.innerText = this.otherLocal;
            spanLocalTxt.style.display = 'none';
            divContainerFlag.appendChild(spanLocalTxt);
        }
        return container;
    }
    createSpanSex() {
        const span = document.createElement('span');
        span.style.display = 'none';
        span.innerText = this.sex;
        return span;
    }
    createCardLine() {
        const div1 = createDiv(['container-card-end-line']);
        const div2 = createDiv(['card-end-line']);
        this.sex === 'masculino' ? div2.classList.add('man') : div2.classList.add('woman');
        div1.appendChild(div2);
        return div1;
    }
    create() {
        const container = this.createConatinerCard();
        const spanSex = this.createSpanSex();
        const cardEndLine = this.createCardLine();
        const cardImg = this.createImageCard();
        const cardName = this.createNameCard();
        const cardFlagDateBirth = this.createFlagAndDateBirth();
        container.appendChild(spanSex);
        container.appendChild(cardImg);
        container.appendChild(cardName);
        container.appendChild(cardFlagDateBirth);
        container.appendChild(cardEndLine);
        return container;
    }
}