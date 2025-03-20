document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    fetch('http://localhost:5000/api/appointment/'+id)
    .then(response => {
        if (!response.ok) throw new Error('Failed to fetch data');
        console.log(response.Error)
        return response.json()
    })
    .then(data  => {
        const summaryDiv = document.getElementById('summary');
        summaryDiv.innerHTML = `
            <p><strong>First Name:</strong> ${data.fname}</p>
            <p><strong>Last Name:</strong> ${data.lname}</p>
            <p><strong>Gender:</strong> ${data.gender}</p>
            <p><strong>Contact:</strong> ${data.contact}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Address 1:</strong> ${data.address1}</p>
            <p><strong>Address 2:</strong> ${data.address2}</p>
            <p><strong>City:</strong> ${data.city}</p>
            <p><strong>State:</strong> ${data.state}</p>
            <p><strong>Pincode:</strong> ${data.pincode}</p>
            <p><strong>Nationality:</strong> ${data.nationality}</p>
            <p><strong>History:</strong> ${data.history}</p>
            <p><strong>Procedure:</strong> ${data.department}</p>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Time:</strong> ${data.time}</p>
            <p><strong>Interests:</strong> ${data.interest}</p>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
    });
});