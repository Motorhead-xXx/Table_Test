export const renderTable = (dataArray) => {
    const tableWrapper = document.querySelector('.tableWrapper');
    let filterStatus = 0;


    const listOpen = () => {
            document.querySelectorAll('.row-table').forEach(item => item.addEventListener('click', () => {
                    document.querySelectorAll('.childElements').forEach(f => {
                        if (f.id === item.id) {
                            item.classList.toggle('change-color')
                            f.classList.toggle('open')
                        }
                    })
                })
            )
    }

    document.querySelectorAll('.statusBtn').forEach((item, index) => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.row-table').forEach(m => m.remove())
            document.querySelectorAll('.childElements').forEach(m => m.remove())
            filterStatus = index
            changeFilterStatus()
        })
    })


    function changeFilterStatus() {
        addTable()
        listOpen()
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
                <tr id=${rowTable.id} class="row-table">
                    <td>${rowTable.id}</td>
                    <td> ${rowTable.parentId}</td>
                    <td class=${changeClass(rowTable)}>${changeStatusName(rowTable)}</th>
                    <td>${rowTable.balance}</td>
                    <td>${rowTable.name}</td>
                    <td>${rowTable.email}</td>
                </tr>

                     ${dataArray.filter(parentFilter => parentFilter.parentId === rowTable.parentId)
            .filter(f => f.id !== rowTable.id)
            .map(rowChild => `
                <tr id="${rowTable.id}" class="childElements">
                    <th>${rowChild.id}</th>
                    <th> ${rowChild.parentId}</th>
                    <th class = ${changeClass(rowChild)}>${changeStatusName(rowChild)}</th>
                    <th>${rowChild.balance}</th>
                    <th>${rowChild.name}</th>
                    <th>${rowChild.email}</th>
                </tr> `).join(' ')} `
        ).join(' ')}  `))
    }

    changeFilterStatus()
}
