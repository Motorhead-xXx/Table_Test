export const renderTable = (dataArray) => {
    const tableWrapper = document.querySelector('.tableWrapper');
    let filterStatus = 0;

    function changeFilterStatus() {

        addTable()

        if (filterStatus === 0) {
            document.getElementById('b0').classList.add('active')
        } else {
            document.getElementById('b0').classList.remove('active')
        }
        if (filterStatus === 1) {
            document.getElementById('b1').classList.add('active');
        } else {
            document.getElementById('b1').classList.remove('active')
        }
        if (filterStatus === 2) {
            document.getElementById('b2').classList.add('active');
        } else {
            document.getElementById('b2').classList.remove('active')
        }

        document.querySelectorAll('.row-table').forEach(item =>
            item.onclick = function () {
                document.querySelectorAll('.d-trg.containerChildRows').forEach(f => {
                    if (item.id === f.id && f.children.length > 0) {
                        f.classList.toggle('open')
                        item.classList.toggle('change-color')
                        console.log()

                    }
                })
            })

        document.querySelectorAll('.row-table').forEach(item => {
            document.querySelectorAll('.d-trg.containerChildRows').forEach(f => {
                if (item.id === f.id && f.children.length > 0) {
                    item.children[1].innerHTML = `<img src="./img/yesChild.png">`
                }
                if (item.id === f.id && f.children.length === 0) {
                    item.children[1].innerHTML = `<img src="./img/no.png">`
                    item.children[1].classList.add('childElementNo')
                }
            })
        })

        document.querySelectorAll('.statusBtn').forEach((item, index) => {
            item.onclick = function () {
                document.querySelectorAll('.row-table').forEach(m => m.remove())
                document.querySelectorAll('.d-trg.containerChildRows').forEach(m => m.remove())
                filterStatus = index
                changeFilterStatus()
            }
        })
    }

    function filterArray() {
        switch (filterStatus) {
            case 1:
                return dataArray.filter(m => m.isActive)
            case 2:
                return dataArray.filter(m => !m.isActive)
            default:
                return dataArray
        }
    }

    function addTable() {
        const changeClass = (nameItem) => nameItem.isActive ? "colorActiveStatus" : "colorNotActiveStatus";
        const changeStatusName = (nameItem) => nameItem.isActive ? "active" : "not active";

        tableWrapper.insertAdjacentHTML('beforeend', (`
         ${filterArray().map(rowTable => `
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

    changeFilterStatus()

}