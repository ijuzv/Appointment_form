document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/api/appointmenthistory')
    .then(response => {
        if (!response.ok) throw new Error('Failed to fetch data');
        return response.json()
    })
    .then(allData  => {
        const tableBody = document.getElementById('formDataTable');

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        const submissions = JSON.parse(localStorage.getItem("submissions"))
    
    function loadTable() {
        tableBody.innerHTML = '';
        allData.forEach((data, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.user_id}</td>
                <td>${data.fname}</td>
                <td>${data.lname}</td>
                <td>${data.password}</td>
                <td>${data.gender}</td>
                <td>${data.contact}</td>
                <td>
                <a href="summary.html?id=${data.user_id}">Email</a>
                </td>
                <td>${data.address1}</td>
                <td>${data.address2}</td>
                <td>${data.city}</td>
                <td>${data.state}</td>
                <td>${data.pincode}</td>
                <td>${data.nationality || 'N/A'}</td>
                <td>${data.history || 'N/A'}</td>
                <td>${data.department}</td>
                <td>${data.date}</td>
                <td>${data.time}</td>
                <td>${data.interest || 'N/A'}</td>
                <td>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                </td>
                <td>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                sessionStorage.setItem('editIndex', index);
                window.location.href = 'form.html';
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                if (confirm('Are you sure you want to delete this record?')) {
                    allData.splice(index, 1);
                    sessionStorage.setItem('allForms', JSON.stringify(allData));
                    loadTable();
                }
            });
        });
    }

    loadTable();
});

function goBack() {
    window.location.href = 'form.html';
}
});