document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let isValid = true;
        let errorMessage = {};

        document.querySelectorAll('.error-border').forEach(el => el.classList.remove('error-border'));
        document.querySelectorAll('.error-message').forEach(el => el.innerText = '');

        const formData = {
            user_id: 'OSI'+ Math.floor(Math.random()*1000000),
            fname: document.getElementById('fname').value.trim(),
            lname: document.getElementById('lname').value.trim(),
            password: document.getElementById('password').value.trim(),
            conf_pass: document.getElementById('conf-pass').value.trim(),
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

        if (!/^[A-Za-z\s]+$/.test(formData.fname) || formData.fname == '') {
            isValid = false;
            errorMessage['fname'] = "Provide Valid Name";
            document.getElementById('fname').classList.add('error-border');
            document.getElementById('nameError').innerText = errorMessage['fname']
        }

        const validMail = email => {
            fetch('')
            let submissions = JSON.parse(sessionStorage.getItem('submissions')) || [];
            let emailExists = submissions.some(submission => submission.email === email);
            if (emailExists) {
                isValid = false;
                errorMessage['email'] = "Email is already taken";
                document.getElementById('email').classList.add('error-border');
                document.getElementById('emailError').innerText = errorMessage['email'];
            }
        };
        validMail(formData.email);

        const passMatch = (password, conf_pass) => {
            if ((password !== conf_pass)) {
                isValid = false;
                errorMessage['password'] = "Password mismatch";

                document.getElementById('password').classList.add('error-border');
                document.getElementById('passError').innerText = errorMessage['password'];
                
                document.getElementById('conf-pass').classList.add('error-border');
                document.getElementById('conPassError').innerText = errorMessage['password'];
            }
        };
        passMatch(formData.password, formData.conf_pass);

        const passValidation = (password, conf_pass) => {
            if ((password === '')||(conf_pass==='')) {
                isValid = false;
                errorMessage['password'] = "Password needed";

                document.getElementById('password').classList.add('error-border');
                document.getElementById('passError').innerText = errorMessage['password'];
                
                document.getElementById('conf-pass').classList.add('error-border');
                document.getElementById('conPassError').innerText = errorMessage['password'];
            }
        }
        passValidation(formData.password, formData.conf_pass)

        if (!/^\d{10}$/.test(formData.contact)) {
            isValid = false;
            errorMessage['contact'] = "Provide Valid Contact";
            document.getElementById('contact').classList.add('error-border');
            document.getElementById('contactError').innerText = errorMessage['contact']
        }

        const today = new Date().toISOString().split('T')[0];
        if (formData.date < today) {
            isValid = false;
            errorMessage['date'] = "Date cannot be in the past";
            document.getElementById('app-date').classList.add('error-border');
            document.getElementById('dateError').innerText = errorMessage['date']
        }

        const validateTime = (time) => {
            const startTime = new Date('1970-01-01T09:00:00');
            const endTime = new Date('1970-01-01T18:00:00');
        
            if (time) {
                const selectedTime = new Date(`1970-01-01T${time}`);
        
                if (selectedTime < startTime || selectedTime > endTime) {
                    return "Time should be between 09:00 AM and 06:00 PM";
                }
            }
            return null;
        };

        const timeError = validateTime(formData.time);
        if (timeError || formData.time === '') {
            isValid = false;
            errorMessage['time'] = timeError || "Time is required";
            document.getElementById('app-time').classList.add('error-border');
            document.getElementById('timeError').innerText = errorMessage['time'];
        }

        Object.keys(errorMessage).forEach(key => {
            document.getElementById(`${key}Error`).innerText = errorMessage[key];
        });

        if (isValid) {
            fetch('http://localhost:5000/api/createappointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = 'summary.html';
                    alert('Form submitted successfully');
                } else {
                    return response.json().then(err => {
                        alert(`Error: ${err.message}`);
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(`Error: ${error.message}`);
            });
        }
        
    });
});
