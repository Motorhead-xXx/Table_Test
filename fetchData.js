import {renderTable} from './renderTable.js'

(async function () {
    let response = await fetch('./default.json')
    let data = await response.json()
    renderTable(data)
})()