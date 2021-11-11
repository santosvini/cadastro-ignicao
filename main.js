'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
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

const deleteClient = (index) => {
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
        createChildren(children)
        updateTable()
        closeModal()
    } 
}

const createRow = (children) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${children.nome}</td>
        <td>${children.faixa_et}</td>
        <td>${children.celular}</td>
        <td>${children.responsavel}</td>
        <td>
           <button type="button" class="button yellow">Editar</button>
           <button type="button" class="button lemon">Sair</button>
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

const editDelete = (event) => {
    if (event.target.type == 'button') {
        console.log(event.target.type)
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