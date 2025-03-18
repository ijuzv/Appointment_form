document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let isValid = true;
        let errorMessage = {};

        document.querySelectorAll('.error-border').forEach(el => el.classList.remove('error-border'));
        document.querySelectorAll('.error-message').forEach(el => el.innerText = '');

        const formData = {
            user_id: 'OSI' + Math.floor(Math.random() * 1000000),
            fname: document.getElementById('fname').value.trim(),
            lname: document.getElementById('lname').value.trim(),
            password: document.getElementById('password').value.trim(),
            gender: document.getElementById('gender').value,
            contact: document.getElementById('contact').value.trim(),
            email: document.getElementById('email').value.trim(),
            address1: document.getElementById('address1').value.trim(),
            address2: document.getElementById('address2').value.trim(),
            city: document.getElementById('city').value.trim(),
            state: document.getElementById('state').value.trim(),
            pincode: document.getElementById('pincode').value.trim(),
            nationality: document.getElementById('nationality').value,
            history: document.querySelector('input[name="history"]:checked')?.value,
            department: document.getElementById('department').value,
            date: document.getElementById('app-date').value,
            time: document.getElementById('app-time').value,
            interest: document.getElementById('interest').value.trim()
        };

        // First name validation
        if (!/^[A-Za-z\s]+$/.test(formData.fname) || formData.fname == '') {
            isValid = false;
            errorMessage['fname'] = "Provide Valid Name";
            document.getElementById('fname').classList.add('error-border');
            document.getElementById('fnameError').innerText = errorMessage['fname'];
        }

        // Email validation (check if already exists)
        const validMail = email => {
            let submissions = JSON.parse(sessionStorage.getItem('submissions')) || [];
            let emailExists = submissions.some(submission => submission.email === email);
            if (emailExists) {
                isValid = false;
                errorMessage['email'] = "Email is already taken";
                document.getElementById('email').classList.add('error-border');
                document.getElementById('emailError').innerText = errorMessage['email'];
            }
        };
        validMail(formData.email); // Call the email validation function

        // Contact validation (10 digits)
        if (!/^\d{10}$/.test(formData.contact)) {
            isValid = false;
            errorMessage['contact'] = "Provide Valid Contact";
            document.getElementById('contact').classList.add('error-border');
            document.getElementById('contactError').innerText = errorMessage['contact'];
        }

        // Date validation (not in the past)
        const today = new Date().toISOString().split('T')[0];
        if (new Date(formData.date) < new Date(today)) {
            isValid = false;
            errorMessage['date'] = "Date cannot be in the past";
            document.getElementById('app-date').classList.add('error-border');
            document.getElementById('dateError').innerText = errorMessage['date'];
        }

        // Time validation (within business hours)
        if (formData.time) {
            const selectedTime = new Date(`1970-01-01T${formData.time}`);
            const startTime = new Date(`1970-01-01T09:00:00`);
            const endTime = new Date(`1970-01-01T18:00:00`);

            if (selectedTime < startTime || selectedTime > endTime) {
                isValid = false;
                errorMessage['time'] = "Time should be between 09:00 AM and 06:00 PM";
                document.getElementById('app-time').classList.add('error-border');
                document.getElementById('timeError').innerText = errorMessage['time'];
            }
        }

        Object.keys(errorMessage).forEach(key => {
            document.getElementById(`${key}Error`).innerText = errorMessage[key];
        });

        if (isValid) {
            let allData = JSON.parse(sessionStorage.getItem('allForms')) || [];
            allData.push(formData);
            sessionStorage.setItem('allForms', JSON.stringify(allData));

            sessionStorage.setItem('formData', JSON.stringify(formData));
        
            window.location.href = 'summary.html';
        }
    });
});
