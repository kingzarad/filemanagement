const testEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

let UpperCase = /[A-Z]/;
let Lowercase = /[a-z]/;
let Symbol = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
let number = /[0-9]/;

export const ResetValidation = (password, cpassword) => {
    if (password !== cpassword) {
        alert("Two passwords don't match.", "bottom-right", "error");
        return false;
    }
    else if (password == '' || cpassword == '') {
        alert("Password required!", "bottom-right", "error");

        return false;
    } else if (password.length < 8 || cpassword.length < 8) {
        alert("Password must be at least 8 characters long!", "bottom-right", "error");

        return false;
    } else if (password.length > 15 || cpassword.length > 15) {
        alert("Password must not exceed to 15 characters.!", "bottom-right", "error")

        return false;
    } else if (!UpperCase.test(password) || !UpperCase.test(cpassword)) {
        alert("Password must have at least one Uppercase Character.", "bottom-right", "error");

        return false;
    } else if (!Lowercase.test(password) || !Lowercase.test(cpassword)) {
        alert("Password must have at least one Lowercase Character.", "bottom-right", "error");

        return false;
    } else if (!Symbol.test(password) || !Symbol.test(cpassword)) {
        alert("Password must contain at least one Special Characters!", "bottom-right", "error");

        return false;
    } else if (!number.test(password) || !number.test(cpassword)) {
        alert("Password must contain at least one number (0-9)!", "bottom-right", "error");

        return false;
    } else {
        return true;
    }
}

export function Resend(expired = 59) {
    let divParent = document.getElementById("rresend-timer");
    var timeInSecs = Date.now() / (1000 * 60);
    var untilTimeInSecs = timeInSecs + expired;
    if (divParent) {
        var divChild = divParent.querySelector("p");

        if (!divChild) {
            divChild = document.createElement("p");
            divParent.appendChild(divChild);
        }

        var button = document.createElement("button");
        button.innerHTML = "Resend";
        button.setAttribute("type", "button");
        button.setAttribute("id", "resend-button");
        button.classList.add('resend-btn');
        button.addEventListener("click", rresendProc);

        var countDownInterval = setInterval(function () {
            var timeLeft = untilTimeInSecs - timeInSecs;
            divChild.innerHTML = `Didn't get the OTP? &nbsp;Resend in ${timeLeft}s`;

            createCookie('resetcountdown', timeLeft, 1);
            untilTimeInSecs--;

            if (timeLeft < 0) {
                divChild.innerHTML = `Didn't get the OTP? `;
                divChild.appendChild(button);
                clearInterval(countDownInterval);
            }

        }, 1000);
    }

}

export const rresendProc = async () => {
    let email = getCookie('email');
    let resendbutton = document.getElementById('resend-button');
    if (email != '') {
        resendbutton.disabled = true;
        resendbutton.innerHTML = `Resend...`;
        let code = generateCodeString();
        createCookie("code", code, 15);

        const path = "./ajax/user.php";
        await fetch(path, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `resend=item&email=${email}&code=${code}`,
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                console.log(data)
                if (data === "send") {
                    alert("Email resend successfully");
                    Resend(59);
                    createCookie("resetcountdown", 59, 1);

                } else {
                    resendbutton.disabled = false;
                }
            })
            .catch(console.error);
    }
}


export const generateCodeString = () => {
    const chars = '0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * chars.length);
        result += chars[randomIndex];
    }
    return result;

};

export const LoginValidation = (email, password, login) => {
    if (email.trim() === '') {
        alert("Email required!", "bottom-right", "error");
        document.getElementById('email').focus();
        setTimeout(() => {
            login['btn_login'].disabled = false;
            login['btn_login'].innerHTML = 'Login';
        }, 1000);
        return false;
    } else if (!email.match(testEmail)) {
        alert("Invalid email address!", "bottom-right", "error");
        document.getElementById('email').focus();
        setTimeout(() => {
            login['btn_login'].disabled = false;
            login['btn_login'].innerHTML = 'Login';
        }, 1000);
        return false;
    } else if (password.trim() === '') {
        alert("Password is required!", "bottom-right", "error");
        document.getElementById('pasword').focus();
        setTimeout(() => {
            login['btn_login'].disabled = false;
            login['btn_login'].innerHTML = 'Login';
        }, 1000);
        return false;
    } else if (password.length < 8) {
        alert("Password must be at least 8 characters long!", "bottom-right", "error");
        document.getElementById('pasword').focus();
        setTimeout(() => {
            login['btn_login'].disabled = false;
            login['btn_login'].innerHTML = 'Login';
        }, 1000);
        return false;
    } else {
        return true;
    }
}

export const LoginAdminValidation = (email, password, loginAdmin) => {
    if (email.trim() === '') {
        alert("Email required!", "bottom-right", "error");

        setTimeout(() => {
            loginAdmin['login_btn'].disabled = false;
            loginAdmin['login_btn'].innerHTML = 'Login';
        }, 1000);
        return false;
    } else if (!email.match(testEmail)) {
        alert("Invalid email address!", "bottom-right", "error");

        setTimeout(() => {
            loginAdmin['login_btn'].disabled = false;
            loginAdmin['login_btn'].innerHTML = 'Login';
        }, 1000);
        return false;
    } else if (password.trim() === '') {
        alert("Password is required!", "bottom-right", "error");

        setTimeout(() => {
            loginAdmin['login_btn'].disabled = false;
            loginAdmin['login_btn'].innerHTML = 'Login';
        }, 1000);
        return false;
    } else if (password.length < 8) {
        alert("Password must be at least 8 characters long!", "bottom-right", "error");

        setTimeout(() => {
            loginAdmin['login_btn'].disabled = false;
            loginAdmin['login_btn'].innerHTML = 'Login';
        }, 1000);
        return false;
    } else {
        return true;
    }
}

export const changeNameValidation = (name) => {
    if (name.trim() === '') {
        alert("Name required!", "bottom-right", "error");
        return false;
    } else if (name.length < 2) {
        alert("Name must be at least 2 characters long.", "bottom-right", "error");
        return false;
    } else if (name.length > 50) {
        alert("Name must be less than or equal to 50 characters long.", "bottom-right", "error");
        return false;
    } else {
        return true;
    }
}

export const changeEmailValidation = (email) => {
    if (email.trim() === '') {
        alert("Email required!", "bottom-right", "error");
        return false;
    } else if (!email.match(testEmail)) {
        alert("Invalid email address!", "bottom-right", "error");
        return false;
    } else {
        return true;
    }
}

export const EmailValidation = (email) => {
    if (email.trim() === '') {
        alert("Email required!", "bottom-right", "error");
        return false;
    } else if (!email.match(testEmail)) {
        alert("Invalid email address!", "bottom-right", "error");
        return false;
    } else {
        return true;
    }
}
export const RegisterValidation = (name, email, password, usertype) => {
    if (name.trim() === '') {
        alert("Name required!", "bottom-right", "error");
        return false;
    } else if (name.length < 2) {
        alert("Name must be at least 2 characters long.", "bottom-right", "error");
        return false;
    } else if (name.length > 50) {
        alert("Name must be less than or equal to 50 characters long.", "bottom-right", "error");
        return false;
    } else if (email.trim() === '') {
        alert("Email required!", "bottom-right", "error");
        return false;
    } else if (!email.match(testEmail)) {
        alert("Invalid email address!", "bottom-right", "error");
        return false;
    } else if (password.trim() === '') {
        alert("Password is required!", "bottom-right", "error");
        return false;
    } else if (password.length < 8) {
        alert("Password must be at least 8 characters long!", "bottom-right", "error");
        return false;
    } else if (password.length > 15) {
        alert("Password must not exceed to 15 characters.!", "bottom-right", "error")
        return false;
    } else if (!UpperCase.test(password)) {
        alert("Password must have at least one Uppercase Character.", "bottom-right", "error");
        return false;
    } else if (!Lowercase.test(password)) {
        alert("Password must have at least one Lowercase Character.", "bottom-right", "error");
        return false;
    } else if (!Symbol.test(password)) {
        alert("Password must contain at least one Special Characters!", "bottom-right", "error");
        return false;
    } else if (!number.test(password)) {
        alert("Password must contain at least one number (0-9)!", "bottom-right", "error");
        return false;
    } else if (usertype.trim() === '') {
        alert("UserType required!", "bottom-right", "error");
        return false;
    } else {
        return true;
    }
}

export const UserUpdateValidation = (name, email, password, usertype) => {
    if (password.trim() != '') {
        if (name.trim() === '') {
            alert("Name required!", "bottom-right", "error");

            return false;
        } else if (email.trim() === '') {
            alert("Email required!", "bottom-right", "error");

            return false;
        } else if (!email.match(testEmail)) {
            alert("Invalid email address!", "bottom-right", "error");

            return false;
        } else if (password.length < 8) {
            alert("Password must be at least 8 characters long!", "bottom-right", "error");

            return false;
        } else if (password.length > 15) {
            alert("Password must not exceed to 15 characters.!", "bottom-right", "error")

            return false;
        } else if (!UpperCase.test(password)) {
            alert("Password must have at least one Uppercase Character.", "bottom-right", "error");

            return false;
        } else if (!Lowercase.test(password)) {
            alert("Password must have at least one Lowercase Character.", "bottom-right", "error");

            return false;
        } else if (!Symbol.test(password)) {
            alert("Password must contain at least one Special Characters!", "bottom-right", "error");

            return false;
        } else if (!number.test(password)) {
            alert("Password must contain at least one number (0-9)!", "bottom-right", "error");

            return false;
        } else if (usertype.trim() === '') {
            alert("UserType required!", "bottom-right", "error");

            return false;
        } else {
            return true;
        }
    } else {
        if (name.trim() === '') {
            alert("Name required!", "bottom-right", "error");

            return false;
        } else if (email.trim() === '') {
            alert("Email required!", "bottom-right", "error");

            return false;
        } else if (!email.match(testEmail)) {
            alert("Invalid email address!", "bottom-right", "error");

            return false;
        } else if (usertype.trim() === '') {
            alert("UserType required!", "bottom-right", "error");

            return false;
        } else {
            return true;
        }
    }

}

export const Penalty = (expired = 30) => {
    var timeInSecs = Date.now() / (1000 * 60);
    var untilTimeInSecs = timeInSecs + expired;
    let error = document.getElementById("error_status");
    var countDownInterval = setInterval(function () {
        var timeLeft = untilTimeInSecs - timeInSecs;
        let login_btn = document.getElementById("btn_login");

        if (login_btn) {
            login_btn.disabled = true;
            login_btn.classList.add('disabled-btn');
        }

        if (error) {
            error.innerHTML = `There have been too many login failures from your network in a short time period. Please wait and try again later. ${timeLeft}s`;
            error.classList.add('error');
        }

        createCookie('penalty', timeLeft, 1);

        untilTimeInSecs--;
        if (timeLeft <= 0) {
            clearInterval(countDownInterval);
            if (error) {
                error.classList.remove('error');
            }
            let err = document.getElementById("error_status")
            if (err) {
                err.innerHTML = '';
            }
            //  document.getElementById("counter").innerText = 0;
            if (login_btn) {
                login_btn.classList.remove('disabled-btn');
                login_btn.disabled = false;
            }

        }
    }, 1000);
}

export const AdPenalty = (expired = 30) => {
    var timeInSecs = Date.now() / (1000 * 60);
    var untilTimeInSecs = timeInSecs + expired;
    let error = document.getElementById("aderror_status");
    var countDownInterval = setInterval(function () {
        var timeLeft = untilTimeInSecs - timeInSecs;
        let login_btn = document.getElementById("login_btn");

        if (login_btn) {
            login_btn.disabled = true;
            login_btn.classList.add('disabled-btn');
        }

        if (error) {
            error.innerHTML = `There have been too many login failures from your network in a short time period. Please wait and try again later. ${timeLeft}s`;
            error.classList.add('error');
        }

        createCookie('adpenalty', timeLeft, 1);
        untilTimeInSecs--;
        if (timeLeft <= 0) {
            clearInterval(countDownInterval);
            if (error) {
                error.classList.remove('error');
            }
            let err = document.getElementById("aderror_status")
            if (err) {
                err.innerHTML = '';
            }
            //  document.getElementById("counter").innerText = 0;
            if (login_btn) {
                login_btn.classList.remove('disabled-btn');
                login_btn.disabled = false;
            }

        }
    }, 1000);
}
export const createCookie = (name, value, minutes) => {
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

export const getCookie = (name) => {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export const eraseCookie = (name) => {
    document.cookie = name + '=; Max-Age=-99999999;';
}

export const alert = (message, position, type = '') => {
    alertify.set("notifier", "position", position);
    switch (type) {
        case 'success':
            return alertify.success(message).dismissOthers();;
            break;
        case 'error':
            return alertify.error(message).dismissOthers();;
            break;
        case 'warning':
            return alertify.warning(message).dismissOthers();;
            break;
        default:
            return alertify.notify(message).dismissOthers();;
            break;
    }
}
