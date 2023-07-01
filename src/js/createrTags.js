function createDiv(classListDiv=[]) {
    const divCreated = document.createElement('div');
    classListDiv.forEach(element => {
        divCreated.classList.add(element);
    });
    return divCreated;
}
function createButton() {
    const btn = document.createElement('button');
    return btn;
}
function createInputText(classListInputText=[]) {
    const inpt = document.createElement('input');
    classListInputText.forEach(element => {
        inpt.classList.add(element);
    });
    inpt.type = 'text';
    return inpt;
}
function createInputRadio() {
    const inptRadio = document.createElement('input');
    inptRadio.type = 'radio';
    return inptRadio;
}
function createInputDate(classListInputDate=[]) {
    const inpt = document.createElement('input');
    classListInputDate.forEach(element => {
        inpt.classList.add(element);
    });
    inpt.type = 'date';
    return inpt;
}
function createSelectInput(option=[{optionValue, optionText}]) {
    const select = document.createElement('select');
    option.forEach(element => {
        let opt = document.createElement('option');
        opt.value = element.optionValue;
        opt.innerText = element.optionText;
        select.appendChild(opt);
    });
    return select;
}
function createLabel(htmlFor) {
    const label = document.createElement('label');
    label.htmlFor = htmlFor;
    return label;
}
function createForm() {
    const form = document.createElement('form');
    return form;
}
function createGenericInput() {
    const inpt = document.createElement('input');
    return inpt;
}