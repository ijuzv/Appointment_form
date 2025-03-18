document.addEventListener('DOMContentLoaded', () => {

    const allData = JSON.parse(sessionStorage.getItem('allForms')) || [];
    const summaryDiv = document.getElementById('summary');
    const formData = allData[allData.length -1];

    if (formData) {
        summaryDiv.innerHTML = `
            <p><strong>First Name:</strong> ${formData.fname}</p>
            <p><strong>Last Name:</strong> ${formData.lname}</p>
            <p><strong>Gender:</strong> ${formData.gender}</p>
            <p><strong>Contact:</strong> ${formData.contact}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Address 1:</strong> ${formData.address1}</p>
            <p><strong>Address 2:</strong> ${formData.address2}</p>
            <p><strong>City:</strong> ${formData.city}</p>
            <p><strong>State:</strong> ${formData.state}</p>
            <p><strong>Pincode:</strong> ${formData.pincode}</p>
            <p><strong>Nationality:</strong> ${formData.nationality}</p>
            <p><strong>History:</strong> ${formData.history}</p>
            <p><strong>Procedure:</strong> ${formData.department}</p>
            <p><strong>Date:</strong> ${formData.date}</p>
            <p><strong>Time:</strong> ${formData.time}</p>
            <p><strong>Interests:</strong> ${formData.interest}</p>
        `;
    } else {
        summaryDiv.innerHTML = `<p>No data submitted.</p>`;
    }
});