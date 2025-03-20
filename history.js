document.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        fetch(`http://localhost:5000/api/appointment/${id}`)
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch data');
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }

    fetch('http://localhost:5000/api/appointmenthistory')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch data');
            return response.json();
        })
        .then(allData => {
            const tableBody = document.getElementById('formDataTable');

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
                            <a href="summary.html?id=${data.email}">${data.email}</a>
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
                            <button class="edit-btn" data-id="${data.email}">Edit</button>
                        </td>
                        <td>
                            <button class="delete-btn" data-id="${data.email}">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });

                document.querySelectorAll('.edit-btn').forEach(button => {
                    button.addEventListener('click', function () {
                        const id = this.getAttribute('data-id');
                        window.location.href = `form.html?id=${id}`;
                    });
                });

                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', function () {
                        const id = this.getAttribute('data-id')
                        if (confirm('Are you sure you want to delete this record?')) {
                            fetch(`http://localhost:5000/api/appointment/${id}`, {
                                method: 'DELETE'
                            })
                            .then(response => {
                                if (!response.ok) throw new Error('Failed to delete');
                                return response.json();
                            })
                            .then(() => loadTable())
                            .catch(error => console.error('Error:', error));
                        }
                    });
                });
            }

            loadTable();
        })
        .catch(error => console.error('Error:', error));
});

function goBack() {
    window.location.href = 'form.html';
}
