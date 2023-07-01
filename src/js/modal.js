btnCloseModal.addEventListener('click', () => {
    closeModal();
})
function showModal() {
    modal.style.display = 'block';
    body.style.overflow = 'hidden';
    setTimeout(() => {
        modalDialog.style.opacity = '1';
        modal.style.opacity = '1';
    }, 130);
}
function closeModal() {
    const mdDialog = document.querySelector('.modal-dialog');
    const infosModal = document.querySelector('.infos-modal');
    modal.style.opacity = '0';
    modalDialog.style.opacity = '0';
    body.style.overflow = 'auto';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 130);
    mdDialog.removeChild(infosModal);
}
function createFormModal(mode, selectorCard=null) {
    const divInfosModal = createDiv(['infos-modal']);
    const form = createForm();
    if(selectorCard) {
        const selector = createGenericInput();
        selector.value = selectorCard;
        selector.type = 'hidden';
        selector.id = 'IDselectorOfCard';
        form.appendChild(selector);
    }
    form.id = 'insert-infos';
    const containerName = createDiv(['container-nome']);
    const containerBirthPlaceAndDate = createDiv(['container-date-place-birth']);
    const containerSex = createDiv(['container-sex']);
    const containerBtn = createDiv(['container-btn']);
    const labelName = createLabel('input-name');
    labelName.innerText = 'nome completo'
    const inptName = createInputText(['inptValidate']);
    inptName.maxLength = '80';
    inptName.id = 'input-name';
    inptName.placeholder = 'Ex: Giuseppe Francesco Rossi';
    const containerBirthPlace = createDiv(['container-birth-place']);
    const containerBirthDate = createDiv(['container-birth-date']);
    const labelBirthPlace = createLabel('select-birth-place');
    labelBirthPlace.innerText = 'local de nascimento';
    const locals = [ 
        {optionValue: 'pd', optionText: 'Selecione o país'},
        {optionValue: 'br', optionText: 'Brasil'},
        {optionValue: 'it', optionText: 'Itália'},
        {optionValue: 'ot', optionText: 'Outro'},
    ];
    const selectBirthPlace = createSelectInput(locals);
    selectBirthPlace.id = 'select-birth-place';
    selectBirthPlace.classList.add('inptValidate');
    const optDefatult = selectBirthPlace.options[0];
    optDefatult.defaultSelected = 'true';
    optDefatult.disabled = 'true';
    selectBirthPlace.addEventListener('change', () => {
        selectBirthPlace.style.opacity = '1';
        if(selectBirthPlace.value == 'ot') {
            showInptTxtBirthLocal();
        }
        else {
            hideInptTxtBirthLocal();
        }
    });
    const labelInputBirthDate = createLabel('input-birth-date');
    labelInputBirthDate.innerText = 'data de nascimento';
    const inputBirthDate = createInputDate();
    inputBirthDate.classList.add('inptValidate');
    inputBirthDate.id = 'input-birth-date';
    inputBirthDate.addEventListener('change', () => {
        inputBirthDate.style.opacity = '1';
    });
    inputBirthDate.addEventListener('keydown', () => {
        inputBirthDate.style.opacity = '1';
    });
    const div1ContainerSex = createDiv([]);
    const div2ContainerSex = createDiv([]);
    const inptMaleRadio = createInputRadio();
    const labelMaleRadio = createLabel('maleRadio');
    labelMaleRadio.innerText = 'Masculino';
    inptMaleRadio.id = 'maleRadio';
    inptMaleRadio.value = 'man';
    inptMaleRadio.name = 'sex';
    const inptFemaleRadio = createInputRadio();
    const labelFemaleRadio = createLabel('femaleRadio');
    labelFemaleRadio.innerText = 'Feminino'
    inptFemaleRadio.id = 'femaleRadio';
    inptFemaleRadio.name = 'sex';
    inptFemaleRadio.value = 'woman';
    form.appendChild(containerName);
    form.appendChild(containerBirthPlaceAndDate);
    form.appendChild(containerSex);
    form.appendChild(containerBtn);
    containerName.appendChild(labelName);
    containerName.appendChild(inptName);
    containerBirthPlaceAndDate.appendChild(containerBirthPlace);
    containerBirthPlaceAndDate.appendChild(containerBirthDate);
    containerBirthPlace.appendChild(labelBirthPlace);
    containerBirthPlace.appendChild(selectBirthPlace);
    containerBirthDate.appendChild(labelInputBirthDate);
    containerBirthDate.appendChild(inputBirthDate);
    containerSex.appendChild(div1ContainerSex);
    containerSex.appendChild(div2ContainerSex);
    div1ContainerSex.appendChild(inptMaleRadio);
    div1ContainerSex.appendChild(labelMaleRadio);
    div2ContainerSex.appendChild(inptFemaleRadio);
    div2ContainerSex.appendChild(labelFemaleRadio);
    divInfosModal.appendChild(form);
    if(mode === 'editOrDelete') {
        const btnDelete = createButton();
        btnDelete.id = 'delete';
        btnDelete.innerText = 'deletar membro'
        const btnEdit = createButton();
        btnEdit.id = 'edit';
        btnEdit.innerText = 'editar membro';
        containerBtn.appendChild(btnEdit);
        containerBtn.appendChild(btnDelete);
    } else if (mode === 'addRootEntry') {
        const btnCreate = createButton();
        btnCreate.id = 'addRootEntry';
        btnCreate.innerText = 'criar membro'
        containerBtn.appendChild(btnCreate);
    }
    else if (mode === 'addBrotherEntry') {
        const btnCreate = createButton();
        btnCreate.id = 'addBrotherEntry';
        btnCreate.innerText = 'criar membro'
        containerBtn.appendChild(btnCreate);
    }
    else {
        const btnCreate = createButton();
        btnCreate.id = 'addChildEntry';
        btnCreate.innerText = 'criar membro'
        containerBtn.appendChild(btnCreate);
    }
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitterBtn = e.submitter;
        submitterVerificantion(submitterBtn);
    });
    return divInfosModal;
}
function submitterVerificantion(submitterBtn) {
    const inptName = document.querySelector('#input-name');
    if(submitterBtn.id === 'edit') {
        if(!formValidate()) return;
        const consfirm = confirm('Deseja mesmo EDITAR?')
        if(consfirm) {
            editMember();
            closeModal();
        }
        inptName.focus();
        return;
    }
    if(submitterBtn.id === 'delete') {
        if(!formValidate()) return;
        const consfirm = confirm('Deseja mesmo EXCLUIR?')
        if(consfirm) {
            const invalid = deleteMember();
            if(invalid) {
                inptName.focus();
                alert('Não é possível excluir este membro');
                return;
            }
            closeModal();
        }
        inptName.focus();
        return;
    }
    if(submitterBtn.id === 'addRootEntry') {
        if(!formValidate()) return;
        addRootEntry();
        return;
    }
    if(submitterBtn.id === 'addBrotherEntry') {
        if(!formValidate()) return;
        const selectorParent = document.querySelector('#selectorParentAddChildren').value;
        addBrotherEntry(selectorParent);
        return;
    }
    if(submitterBtn.id === 'addChildEntry') {
        if(!formValidate()) return;
        const selectorParent = document.querySelector('#selectorParentAddChildren').value;
        addChildEntry(selectorParent);
        return;
    }
}
function formValidate() {
    let valid = true;
    const inputs = document.querySelectorAll('.inptValidate');
    const invalids = document.querySelectorAll('.invalidItem');
    const inptBirthPlace = document.querySelector('#select-birth-place');
    const inptSexMale = document.querySelector('#maleRadio');
    const inptSexFemale = document.querySelector('#femaleRadio');
    if(invalids.length > 0)  {
        invalids.forEach(el => {
            el.remove();
        });
    }
    inputs.forEach(element => {
        if(element.value === '' || element.value === 'pd') {
            let div = createDiv(['invalidItem']);
            div.innerText = 'Campo obrigatório';
            element.insertAdjacentElement('afterend', div);
            valid = false;
        }
    });
    if(inptBirthPlace.value === 'ot') {
        const inpt = document.querySelector('#intpTxtBirthLocal');
        if(inpt.value === '') {
            let div = createDiv(['invalidItem']);
            div.innerText = 'Campo obrigatório';
            inpt.insertAdjacentElement('afterend', div);
            valid = false;
        }
    }
    if(inptSexMale.checked === false && inptSexFemale.checked === false) {
        const container = document.querySelector('.container-sex');
        const div = createDiv(['invalidItem']);
        div.innerText = 'Escolha uma opção';
        container.appendChild(div);
        valid = false;
    }
    return valid;
}
function loadMemberInfos() {
    const selector = document.querySelector('#IDselectorOfCard').value;
    const containerCard = document.querySelector(selector).children[0];
    const inptName = document.querySelector('#input-name');
    const inptBirthPlace = document.querySelector('#select-birth-place');
    const inptBirthDate = document.querySelector('#input-birth-date');
    const inptSexMale = document.querySelector('#maleRadio');
    const inptSexFemale = document.querySelector('#femaleRadio');
    const prevName = containerCard.children[2].children[0].innerText;
    const prevBirthPlace = containerCard.children[3].children[0].children[1].innerText;
    const prevBirthDate = containerCard.children[3].children[1].innerText;
    const prevSex = containerCard.children[0].innerText;
    inptName.value = prevName;
    if(prevBirthPlace === 'ot') {
        showInptTxtBirthLocal();
        const local = containerCard.children[3].children[0].children[2].innerText;
        const txtInpt = document.querySelector('#intpTxtBirthLocal');
        txtInpt.value = local;
    }
    inptBirthPlace.value = prevBirthPlace;
    inptBirthPlace.style.opacity = '1';
    inptBirthDate.value = parserBirthDateToInput(String(prevBirthDate));
    inptBirthDate.style.opacity = '1';
    prevSex == 'masculino' ? inptSexMale.checked = true : inptSexFemale.checked = true;
}
function parserBirthDateToInput(date) {
    const day = date.slice(0, 2);
    const month = date.slice(3, 5);
    const year = date.slice(6,);
    const dateBirthFormated = `${year}-${month}-${day}`;
    return dateBirthFormated;
}
function parserBirthDateToCard(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8,);
    const dateBirthFormated = `${day}/${month}/${year}`;
    return dateBirthFormated;
}
function createImgTag(sex) {
    const tagImg = document.createElement('img');
    tagImg.classList.add('img');
    tagImg.alt = 'Avatar'
    if(sex === 'masculino') {
        tagImg.src = './icons/man.svg';
        return tagImg;
    }
    if(sex === 'feminino') {
        tagImg.src = './icons/woman.svg';
        return tagImg;
    }
    tagImg.src = './icons/person.svg';
    return tagImg;
}
function editMember() {
    const selectorCardMember = document.querySelector('#IDselectorOfCard').value;
    const inptName = document.querySelector('#input-name').value;
    const inptBirthPlace = document.querySelector('#select-birth-place').value;
    let local = document.querySelector('#intpTxtBirthLocal');
    if(local) local = local.value;
    const inptBirthDate = document.querySelector('#input-birth-date').value;
    const date = parserBirthDateToCard(inptBirthDate);
    const inptSexMale = document.querySelector('#maleRadio').checked;
    inptSexMale ? sex = 'masculino' : sex = 'feminino';
    const newCard = new CreateCard(inptName, date, inptBirthPlace, sex, local);
    const card = newCard.create();
    const entry = document.querySelector(selectorCardMember);
    const oldCard = entry.children[0];
    oldCard.insertAdjacentElement('afterend', card);
    oldCard.remove();
    card.addEventListener('click', () => {
        const selector = selectorOfCardSelected(card).toString();
        const form = createFormModal('editOrDelete', selector);
        modalDialog.appendChild(form);
        loadMemberInfos();
        showModal();
    });
}
function deleteMember() {
    const selectorCardMember = document.querySelector('#IDselectorOfCard').value;
    if(selectorCardMember === '.root-gen > .entry-gen-root') return true;
    const entryDelet = document.querySelector(selectorCardMember);
    let divLastCardOrAddChild = entryDelet.children[1];
    const genParentEntryDelet = entryDelet.parentElement;
    const totalEntriesGen = genParentEntryDelet.children.length;
    const genSelector = selectorCardMember.slice(0, selectorCardMember.length - 11);

    if(totalEntriesGen === 1) {
        const entryParent = entryDelet.parentElement.parentElement;
        const divNoChildParent = entryParent.children[entryParent.children.length - 2];
        divNoChildParent.classList.remove('hidden');
        entryParent.classList.add('no-child');
        entryDelet.parentElement.remove();
        return
    }
    if(divLastCardOrAddChild.classList.contains('last-card-person')) {
        const newLastEntry = genParentEntryDelet.children[totalEntriesGen - 2];
        const divLastCard = createDiv(['last-card-person']);
        const card = newLastEntry.children[0];
        card.insertAdjacentElement('afterend', divLastCard);
        divLastCard.addEventListener('click', () => {
            const form = createFormModal('addBrotherEntry');
            const inptChildrenSelector = createGenericInput();
            inptChildrenSelector.type = 'hidden';
            inptChildrenSelector.value = genSelector;
            inptChildrenSelector.id = 'selectorParentAddChildren';
            form.children[0].appendChild(inptChildrenSelector);
            modalDialog.appendChild(form);       
            showModal();  
        });
        entryDelet.remove();
        return;
    } else {
        entryDelet.remove()
        for(i = 0; i <= totalEntriesGen - 2; i++) {
            let children = genParentEntryDelet.children[i];
            if(children.classList.contains('no-child')) {
                children.classList = '';
                children.classList.add('entry-gen');
                children.classList.add(`entry-${i + 1}`);
                children.classList.add('no-child');
            } else {
                children.classList = '';
                children.classList.add('entry-gen');
                children.classList.add(`entry-${i + 1}`);
            }
        }
        return;
    }    
}
function addRootEntry() {
    const rootContainerCard = document.querySelector('.container.card-container.add-root-infos');
    const inptName = document.querySelector('#input-name').value;
    const inptBirthPlace = document.querySelector('#select-birth-place').value;
    let local = document.querySelector('#intpTxtBirthLocal');
    if(local) local = local.value;
    const inptBirthDate = document.querySelector('#input-birth-date').value;
    const date = parserBirthDateToCard(inptBirthDate);
    const inptSexMale = document.querySelector('#maleRadio').checked;
    inptSexMale ? sex = 'masculino' : sex = 'feminino';
    const newCard = new CreateCard(inptName, date, inptBirthPlace, sex, local);
    const card = newCard.create();
    const selector = selectorOfCardSelected(card).toString();
    const entryGenRoot = document.querySelector('.entry-gen-root');
    entryGenRoot.classList.add('no-child');
    const divNoChildAdd = createDiv(['no-child-add']);
    rootContainerCard.remove();
    entryGenRoot.appendChild(card);
    entryGenRoot.appendChild(divNoChildAdd);

    divNoChildAdd.addEventListener('click', () => {
        const form = createFormModal('addChildEntry');
        const inptChildrenSelector = createGenericInput();
        inptChildrenSelector.type = 'hidden';
        inptChildrenSelector.value = selector;
        inptChildrenSelector.id = 'selectorParentAddChildren';
        form.children[0].appendChild(inptChildrenSelector);
        modalDialog.appendChild(form);       
        showModal();
    });
    card.addEventListener('click', () => {
        const form = createFormModal('editOrDelete', selector);
        modalDialog.appendChild(form);
        loadMemberInfos();
        showModal();
    });
    closeModal();
    return
}
function addChildEntry(parentSelector) {
    const entry = document.querySelector(parentSelector);
    const gen = entry.parentElement;
    const entryClassList = entry.classList;
    const genClassList = gen.classList;
    const inptName = document.querySelector('#input-name').value;
    const inptBirthPlace = document.querySelector('#select-birth-place').value;
    let local = document.querySelector('#intpTxtBirthLocal');
    if(local) local = local.value;
    const inptBirthDate = document.querySelector('#input-birth-date').value;
    const date = parserBirthDateToCard(inptBirthDate);
    const inptSexMale = document.querySelector('#maleRadio').checked;
    inptSexMale ? sex = 'masculino' : sex = 'feminino';
    const newCard = new CreateCard(inptName, date, inptBirthPlace, sex, local);
    const card = newCard.create();
    const noChildDiv = entry.children[entry.children.length - 1];
    const newNoChildDiv = createDiv(['no-child-add']);
    const newLastCardDiv = createDiv(['last-card-person']);
    const entryDiv = createDiv(['entry-gen', `entry-1`, 'no-child']); 
    let genDiv;
    let calcGen;
    if(genClassList.contains('root-gen')) {
        calcGen = '1';
        genDiv = createDiv(['gen', `gen-${calcGen}`]);
    } else {
        calcGen = Number(gen.classList[1].slice(4,)) + 1;
        genDiv = createDiv(['gen', `gen-${calcGen}`]);
    }
    entryClassList.remove('no-child');
    noChildDiv.classList.add('hidden');
    entryDiv.appendChild(card);
    entryDiv.appendChild(newLastCardDiv);
    entryDiv.appendChild(newNoChildDiv);
    genDiv.appendChild(entryDiv);
    entry.appendChild(genDiv);
    card.addEventListener('click', () => {
        const selector = selectorOfCardSelected(card).toString();
        const form = createFormModal('editOrDelete', selector);
        modalDialog.appendChild(form);
        loadMemberInfos();
        showModal();
    });
    newNoChildDiv.addEventListener('click', () => {
        const form = createFormModal('addChildEntry');
        const inptChildrenSelector = createGenericInput();
        inptChildrenSelector.type = 'hidden';
        inptChildrenSelector.value = parentSelector + ` > .gen-${calcGen} > .entry-1`;
        inptChildrenSelector.id = 'selectorParentAddChildren';
        form.children[0].appendChild(inptChildrenSelector);
        modalDialog.appendChild(form);       
        showModal();
    });
    newLastCardDiv.addEventListener('click', () => {
        const form = createFormModal('addBrotherEntry');
        const inptChildrenSelector = createGenericInput();
        inptChildrenSelector.type = 'hidden';
        inptChildrenSelector.value = parentSelector + ` > .gen-${calcGen}`;
        inptChildrenSelector.id = 'selectorParentAddChildren';
        form.children[0].appendChild(inptChildrenSelector);
        modalDialog.appendChild(form);       
        showModal();
    });
    closeModal();
}
function addBrotherEntry(parentSelector) {
    const selectorGen = parentSelector;
    const gen = document.querySelector(selectorGen);
    const totalEntries = gen.children.length;
    const entryRemoveLastCard = gen.children[totalEntries - 1];
    let divRemoveLastCard = entryRemoveLastCard.children[entryRemoveLastCard.children.length - 2];
    const newNoChildDiv = createDiv(['no-child-add']);
    const newLastCardDiv = createDiv(['last-card-person']);
    const entryDiv = createDiv(['entry-gen', `entry-${totalEntries + 1}`, 'no-child']);

    if(divRemoveLastCard.classList.contains('last-card-person')) {
        divRemoveLastCard.remove();
    } else {
        divRemoveLastCard = entryRemoveLastCard.children[entryRemoveLastCard.children.length - 3];
        divRemoveLastCard.remove();
    }

    const inptName = document.querySelector('#input-name').value;
    const inptBirthPlace = document.querySelector('#select-birth-place').value;
    let local = document.querySelector('#intpTxtBirthLocal');
    if(local) local = local.value;
    const inptBirthDate = document.querySelector('#input-birth-date').value;
    const date = parserBirthDateToCard(inptBirthDate);
    const inptSexMale = document.querySelector('#maleRadio').checked;
    inptSexMale ? sex = 'masculino' : sex = 'feminino';
    const newCard = new CreateCard(inptName, date, inptBirthPlace, sex, local);
    const card = newCard.create();

    entryDiv.appendChild(card);
    entryDiv.appendChild(newLastCardDiv);
    entryDiv.appendChild(newNoChildDiv);

    gen.appendChild(entryDiv);

    card.addEventListener('click', () => {
        const selector = selectorOfCardSelected(card).toString();
        const form = createFormModal('editOrDelete', selector);
        modalDialog.appendChild(form);
        loadMemberInfos();
        showModal();
    });
    newNoChildDiv.addEventListener('click', () => {
        const form = createFormModal('addChildEntry');
        const inptChildrenSelector = createGenericInput();
        inptChildrenSelector.type = 'hidden';
        inptChildrenSelector.value = parentSelector + ` > .entry-${totalEntries + 1}`;
        inptChildrenSelector.id = 'selectorParentAddChildren';
        form.children[0].appendChild(inptChildrenSelector);
        modalDialog.appendChild(form);       
        showModal();
    });
    newLastCardDiv.addEventListener('click', () => {
        const form = createFormModal('addBrotherEntry');
        const inptChildrenSelector = createGenericInput();
        inptChildrenSelector.type = 'hidden';
        inptChildrenSelector.value = parentSelector;
        inptChildrenSelector.id = 'selectorParentAddChildren';
        form.children[0].appendChild(inptChildrenSelector);
        modalDialog.appendChild(form);       
        showModal();
    });
    closeModal();
}
function showInptTxtBirthLocal() {
    const container = document.querySelector('.container-birth-place');
    const lbl = createLabel('intpTxtBirthLocal');
    lbl.classList.add('dsp-none');
    lbl.classList.add('dsp-none-label');
    const intpTxtBirthLocal = createInputText(['dsp-none']);
    intpTxtBirthLocal.id = 'intpTxtBirthLocal';
    lbl.innerText = 'Qual';
    lbl.style.display = 'block';
    intpTxtBirthLocal.style.display = 'block';
    setTimeout(() => {
        lbl.style.opacity = '1';
        intpTxtBirthLocal.style.opacity = '1';
    }, 20);
    container.appendChild(lbl);
    container.appendChild(intpTxtBirthLocal);
}
function hideInptTxtBirthLocal() {
    const inpt = document.querySelector('#intpTxtBirthLocal');
    if(inpt) {
        const container = document.querySelector('.container-birth-place');
        const lbl = document.querySelector('.dsp-none.dsp-none-label');
        lbl.style.opacity = '0';
        inpt.style.opacity = '0';
        setTimeout(() => {
            container.removeChild(inpt);
            container.removeChild(lbl);
        }, 130);
    }
}