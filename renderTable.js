export const renderTable = (dataArray) => {
    const tableWrapper = document.querySelector('.tableWrapper');
    let filterStatus = 0;

    const changeFilterStatus = () => {
        document.querySelectorAll('.statusBtn').forEach((item, index) => {
            item.onclick = function () {
                filterStatus = index
                filterTable()
            }
        })
    }

    const checkChildElement = () => {
        document.querySelectorAll('.row-table').forEach(item => {
            document.querySelectorAll('.d-trg.containerChildRows').forEach(f => {
                if (item.id === f.id && f.children.length > 0) {
                    item.children[1].innerHTML = `<img src="./img/yesChild.png" alt="yes child element">`
                    item.classList.add('colorRow')
                }
                if (item.id === f.id && f.children.length === 0) {
                    item.children[1].innerHTML = `<img src="./img/no.png" alt="no child element">`
                }
            })
        })
    }

    const filterTable = () => {
        if (filterStatus === 0) {
            document.getElementById('b0').classList.add('active')
            document.querySelectorAll('.row-table').forEach(m => {
                m.classList.remove('change-color')
            })
            document.querySelectorAll('.d-trg.containerChildRows').forEach(f => {
                f.classList.remove('open')
            })
        } else {
            document.getElementById('b0').classList.remove('active')

        }
        if (filterStatus === 1) {
            document.getElementById('b1').classList.add('active');
            document.querySelectorAll('.row-table').forEach(m => {
                m.classList.remove('change-color')
                if (m.children[2].textContent === "not active") {
                    m.classList.add('none')
                }
            })
            document.querySelectorAll('.d-trg.containerChildRows').forEach(f => {
                    f.classList.remove('open')
            })
        } else {
            document.getElementById('b1').classList.remove('active')
            document.querySelectorAll('.row-table').forEach(m => {
                if (m.children[2].textContent === "not active") {
                    m.classList.remove('none')
                }
            })
        }
        if (filterStatus === 2) {
            document.getElementById('b2').classList.add('active');
            document.querySelectorAll('.row-table').forEach(m => {
                m.classList.remove('change-color')
                if (m.children[2].textContent === "active") {
                    m.classList.add('none')
                }
            })
            document.querySelectorAll('.d-trg.containerChildRows').forEach(f => {
                f.classList.remove('open')
            })
        } else {
            document.getElementById('b2').classList.remove('active')
            document.querySelectorAll('.row-table').forEach(m => {
                if (m.children[2].textContent === "active") {
                    m.classList.remove('none')
                }
            })
        }
    }

    const openRow = () => {
        document.querySelectorAll('.row-table').forEach(item =>
            item.onclick = function () {
                document.querySelectorAll('.d-trg.containerChildRows').forEach(f => {
                    if (item.id === f.id && f.children.length > 0) {
                        f.classList.toggle('open')
                        item.classList.toggle('change-color')
                    }
                })
            })
    }

    function addTable() {
        const changeClass = (nameItem) => nameItem.isActive ? "colorActiveStatus" : "colorNotActiveStatus";
        const changeStatusName = (nameItem) => nameItem.isActive ? "active" : "not active";

        tableWrapper.insertAdjacentHTML('beforeend', (`
         ${dataArray.map(rowTable => `
                <div id=${rowTable.id} class="d-tr row-table">
                    <div class="d-td">${rowTable.id}</div>
                    <div class="d-td"></div>
                    <div class='d-td ${changeClass(rowTable)}'>${changeStatusName(rowTable)}</div>
                    <div class="d-td">${rowTable.balance}</div>
                    <div class="d-td">${rowTable.name}</div>
                    <div class="d-td">${rowTable.email}</div>
                </div>
                <div id=${rowTable.id} class="d-trg containerChildRows">
                ${dataArray.filter(parentFilter => parentFilter.parentId === rowTable.id).map(rowChild => `
                <div class="d-tr childElements">
                    <div class="d-th">${rowChild.id}</div>
                    <div class="d-th"> parent id: ${rowChild.parentId}</div>
                    <div class='d-th ${changeClass(rowChild)}'> ${changeStatusName(rowChild)}</div>
                    <div class="d-th">${rowChild.balance}</div>
                    <div class="d-th">${rowChild.name}</div>
                    <div class="d-th">${rowChild.email}</div>
                </div> `).join(' ')}
                </div>
                `).join(' ')}  `))
    }


    addTable()
    checkChildElement()
    filterTable()
    changeFilterStatus()
    openRow()
}