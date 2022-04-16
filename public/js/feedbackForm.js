let form = document.querySelector('#form'),
    formInputs = document.querySelectorAll('.create-form-input'),
    inputName = document.querySelector('.js-input-name'),
    inputPhoneNumber = document.querySelector('.js-input-phone-number'),
    inputEmail = document.querySelector('.js-input-email');

function validateEmail(email) {
    let re = /^[\w-]+@[\w-]+\.[a-z]{2,4}$/i;
    return re.test(String(email).toLowerCase());
}

function validteName(name) {
    let re = /^[a-zа-яё]+$/i;
    return re.test((name));
}

function validtePhoneNumber(phoneNumber) {
    let re = new RegExp(/^\+7\(\d{3}\)\d{3}-\d{4}$/);
    return re.test(phoneNumber);
}

function messageError(text, element) {
    if (!element.classList.contains('invalid')) {
        element.classList.add('invalid');
        let error = document.createElement('span');
        error.classList.add('msgError');
        error.innerText = text;
        element.insertAdjacentElement('afterend', error);
    }
}

function deleteMessageError(element) {
    {
        element.classList.remove('invalid');
        element.classList.add('valid');
        element.nextElementSibling.remove();
    }
}

form.onsubmit = function (event) {
    event.preventDefault()
    let nameVal = inputName.value,
        phoneNumberVal = inputPhoneNumber.value,
        emailVal = inputEmail.value,
        emptyInputs = Array.from(formInputs).filter(input => input.value === '');

    formInputs.forEach(input => {
        if (input.value === '') {
            messageError('The field cannot be empty', input);
        } else if (input.classList.contains('invalid')) {
            deleteMessageError(input);
        }
    });

    // if (emptyInputs.length !== 0) {
    //     return false;
    // }

    if (!validateEmail(emailVal)) {
        messageError('Email not valid', inputEmail);
    } else if (inputEmail.classList.contains('invalid')) {
        deleteMessageError(input);
    }

    if (!validteName(nameVal)) {
        messageError('The name should be made up of letters only', inputName);
    } else if (inputName.classList.contains('invalid')) {
        deleteMessageError(inputName);
    }

    if (!validtePhoneNumber(phoneNumberVal)) {
        messageError('Specify the phone number in this format +7(000)000-0000', inputPhoneNumber);
    } else if (inputPhoneNumber.classList.contains('invalid')) {
        deleteMessageError(inputPhoneNumber);
    }
}