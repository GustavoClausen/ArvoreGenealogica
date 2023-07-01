const body = document.querySelector('body');
const modal = document.querySelector('.container-modal');
const modalDialog = document.querySelector('.modal-dialog');
const btnCloseModal = document.querySelector('.close');
const rootCardInitial = document.querySelector('.container.card-container.add-root-infos');
rootCardInitial.addEventListener('click', () => {
    const form = createFormModal('addRootEntry');
    modalDialog.appendChild(form);
    showModal();
});