'use strict'

const openModal = () => document.getElementById('modal-back')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal-back').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_children')) ?? []
const setLocalStorage = (dbChildren) => localStorage.setItem("db_children", JSON.stringify(dbChildren))


const createChildren = (children) => {
    const dbChildren = getLocalStorage()
    dbChildren.push (children)
    setLocalStorage(dbChildren)
}

const readChildren = () => getLocalStorage()

const updateChildren = (index, children) => {
    const dbChildren = readChildren()
    dbChildren[index] = children
    setLocalStorage(dbChildren)
}

const deleteChildren = (index) => {
    const dbChildren = readChildren()
    dbChildren.splice(index,1)
    setLocalStorage(dbChildren)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

// Interação com layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

const saveChildren = () => {
    if (isValidFields()) {
        const children = {
           nome: document.getElementById('nome').value,
           faixa_et: document.getElementById('faixa').value,
           celular: document.getElementById('celular').value,
           responsavel: document.getElementById('responsavel').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createChildren(children)
            updateTable()
            closeModal()
        } else {
            updateChildren(index, children)
            updateTable()
            closeModal()
        }
            
    } 
}

const createRow = (children, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${children.nome}</td>
        <td>${children.faixa_et}</td>
        <td>${children.celular}</td>
        <td>${children.responsavel}</td>
        <td>
           <button type="button" class="button yellow" id="edit-${index}">Editar</button>
           <button type="button" class="button lemon" id="out-${index}">Saída</button>
        </td>
    `
    document.querySelector('#tableChildren>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableChildren>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbChildren = readChildren()
    clearTable()
    dbChildren.forEach(createRow)
}

const fillFields = (children) => {
    document.getElementById('nome').value = children.nome
    document.getElementById('faixa').value = children.faixa
    document.getElementById('celular').value = children.celular
    document.getElementById('responsavel').value = children.responsavel
    document.getElementById('nome').dataset.index = children.index
} 

const editChildren = (index) => {
    const children = readChildren()[index]
    children.index = index
    fillFields(children)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editChildren(index)
        } else {
            const children = readChildren()[index]
            const response = confirm(`Confirma a saída da criança: ${children.nome}`)
            if (response) {
                deleteChildren(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarCrianca')
        .addEventListener('click', openModal)

document.getElementById('modalClose')
        .addEventListener('click', closeModal)

document.getElementById('salvar')
        .addEventListener('click', saveChildren)

document.getElementById('cancelar')
        .addEventListener('click', closeModal)

document.querySelector('#tableChildren>tbody')
        .addEventListener('click', editDelete)