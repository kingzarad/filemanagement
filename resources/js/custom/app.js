import { eraseCookie, ResetValidation, Resend, generateCodeString, EmailValidation, AdPenalty, UserUpdateValidation, createCookie, getCookie, alert, LoginAdminValidation, LoginValidation, RegisterValidation, Penalty, changeNameValidation, changeEmailValidation } from './module.js';
var host = window.location.pathname;
var url = window.location.host;

let login = document.querySelector('#login');
let loginAdmin = document.querySelector('#loginAdmin');
let uploadModalForm = document.querySelector('#uploadModalForm');
let userModalForm = document.querySelector('#userModalForm');
let shareModalForm = document.querySelector('#shareModalForm');
let userEditModalForm = document.querySelector('#userEditModalForm');
let inshareModalForm = document.querySelector('#inshareModalForm');
let IncomingViewForm = document.querySelector('#IncomingViewForm');
let outgoingViewForm = document.querySelector('#outgoingViewForm');
let changeName = document.getElementById('changeName');
let changeEmail = document.getElementById('changeEmail');

let forgot = document.getElementById('forgot');
if (forgot) {
    forgot.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fpassword = forgot['fpassword'].value;
        const cpassword = forgot['cpassword'].value;

        forgot['btn_reset'].disabled = true;
        forgot['btn_reset'].innerHTML = '<span class="spinner-grow spinner-grow-sm text-capitalize" role="status" aria-hidden="true"></span> Reset..';

        let result = ResetValidation(fpassword, cpassword);
        if (result) {
            let data = new FormData();
            for (const i of new FormData(forgot)) {
                data.append(i[0], i[1]);
            }
            const path = "./ajax/user.php";
            await fetch(path, {
                method: "POST",
                body: data,
            })
                .then((response) => {
                    return response.text();
                })
                .then((data) => {
                    data = data.trim();
                    if (data == 'ok') {
                        alert("Password update.  Login page directing in 3s", "bottom-right", "success");
                        eraseCookie('remail');
                        setTimeout(() => {
                            location.href = "login";
                        }, 1000);
                    } else if (data == 'err') {
                        alert("Unable to update the password. If problems still occur, please contact the administrator.", "bottom-right", "error");
                        setTimeout(() => {
                            forgot['btn_reset'].disabled = false;
                            forgot['btn_reset'].innerHTML = 'Reset'
                        }, 1000);
                    } else if (data == 'no') {
                        alert("Seemingly expired session for forgetting password. Request a new OTP code to create a new session.", "bottom-right", "error");
                        setTimeout(() => {
                            forgot['btn_reset'].disabled = false;
                            forgot['btn_reset'].innerHTML = 'Reset'
                        }, 1000);
                    } else {
                        alert("Something wrong, please try again later..", "bottom-right", "error");
                        setTimeout(() => {
                            forgot['btn_reset'].disabled = false;
                            forgot['btn_reset'].innerHTML = 'Reset'
                        }, 1000);
                    }

                })
                .catch(console.error);
        } else {
            setTimeout(() => {
                forgot['btn_reset'].disabled = false;
                forgot['btn_reset'].innerHTML = 'Reset'
            }, 1000);
        }
    });
}

let reset_verify = document.getElementById('reset_verify');
if (reset_verify) {
    reset_verify.addEventListener('submit', async (e) => {
        e.preventDefault();

        const otp = reset_verify['forgotverifyotp'].value;

        reset_verify['btn_verify'].disabled = true;
        reset_verify['btn_verify'].innerHTML = '<span class="spinner-grow spinner-grow-sm text-capitalize" role="status" aria-hidden="true"></span> Verify..';

        if (otp.length > 6 || otp.length < 6) {
            alert('OTP code needs to be 6 digits.', "bottom-right", "error");
            setTimeout(() => {
                reset_verify['btn_verify'].disabled = false;
                reset_verify['btn_verify'].innerHTML = 'Verify';
            }, 1000);
            return;
        } else {
            let data = new FormData();
            for (const i of new FormData(reset_verify)) {
                data.append(i[0], i[1]);
            }
            const path = "./ajax/user.php";
            await fetch(path, {
                method: "POST",
                body: data,
            })
                .then((response) => {
                    return response.text();
                })
                .then((data) => {
                    data = data.trim();
                    console.log(data)
                    if (data == "ok") {
                        alert("OTP Confirm", "bottom-right", "success");
                        setTimeout(() => {
                            location.href = host + "?p=password";
                        }, 1000);
                    } else if (data == "expired") {
                        alert("Your OTP code has already expired.", "bottom-right", "error");
                        setTimeout(() => {
                            reset_verify['btn_verify'].disabled = false;
                            reset_verify['btn_verify'].innerHTML = 'Verify';
                        }, 1000);
                    } else if (data == "wrong") {
                        alert("Your OTP code is wrong.", "bottom-right", "error");
                        setTimeout(() => {
                            reset_verify['btn_verify'].disabled = false;
                            reset_verify['btn_verify'].innerHTML = 'Verify';
                        }, 1000);
                    } else {
                        alert("Something wrong, please try again later..", "bottom-right", "error");
                        setTimeout(() => {
                            reset_verify['btn_verify'].disabled = false;
                            reset_verify['btn_verify'].innerHTML = 'Verify';
                        }, 1000);
                    }
                })
                .catch(console.error);


        }
    })
}

let reset_code = document.getElementById('reset_code');
if (reset_code) {
    reset_code.addEventListener('submit', async (e) => {
        e.preventDefault();
        let email = reset_code['forgotEmail'].value;
        const code = generateCodeString();

        let data = new FormData();
        for (const i of new FormData(reset_code)) {
            data.append(i[0], i[1]);
        }
        data.append('forgotcode', code);

        reset_code['btn_forgot'].disabled = true;
        reset_code['btn_forgot'].innerHTML = '<span class="spinner-grow spinner-grow-sm text-capitalize" role="status" aria-hidden="true"></span> Get OTP..';


        let result = EmailValidation(email);
        if (result) {
            const path = "./ajax/user.php";
            await fetch(path, {
                method: "POST",
                body: data,
            })
                .then((response) => {
                    return response.text();
                })
                .then((data) => {
                    data = data.trim();
                    console.log(data);
                    if (data == 'send') {
                        createCookie("remail", email, 10);
                        createCookie("resetcountdown", 59, 3);
                        Resend(59);
                        alert("Your email will receive an OTP code. Check your spam folder or email. ", "bottom-right", "success");
                        createCookie("rcode", code, 10);
                        setTimeout(() => {
                            location.href = host + "?p=verify";
                        }, 1000);
                    } else if (data == 'no') {
                        alert(`Email not found on our end.`, "bottom-right", "error");
                        setTimeout(() => {
                            reset_code['btn_forgot'].disabled = false;
                            reset_code['btn_forgot'].innerHTML = 'Get OTP';
                        }, 1000);
                    } else {
                        alert(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                        setTimeout(() => {
                            reset_code['btn_forgot'].disabled = false;
                            reset_code['btn_forgot'].innerHTML = 'Get OTP';
                        }, 1000);
                    }

                })
                .catch(console.error);
        } else {
            setTimeout(() => {
                forgot['btn_forgot'].disabled = false;
                forgot['btn_forgot'].innerHTML = 'Get OTP';
            }, 1000);
        }

    });
}


let changepassAdminformDelete = document.getElementById("changepassAdminformDelete");
if (changepassAdminformDelete) {
    changepassAdminformDelete.addEventListener("keyup", (e) => {
        if (
            changepassAdminformDelete["admin_pass"].value != ""
        ) {
            changepassAdminformDelete["change_pass_btn"].disabled = false;
        } else {
            changepassAdminformDelete["change_pass_btn"].disabled = true;
        }
    });
    changepassAdminformDelete.addEventListener("submit", (e) => {
        e.preventDefault();
        let id = changepassAdminformDelete["pass_id"].value;
        let admin_pass = changepassAdminformDelete["admin_pass"].value;

        changepassAdminformDelete['change_pass_btn'].disabled = true;
        changepassAdminformDelete['change_pass_btn'].innerHTML = '<span class="spinner-grow spinner-grow-sm text-capitalize" role="status" aria-hidden="true"></span> Delete..';

        const path = "./ajax/ajax-delete.php";
        fetch(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "deleteAdmin=item&users_id=" +
                id +
                "&admin_pass=" +
                admin_pass,
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                data = data.trim();

                if (data == "delete") {
                    alert("Admin deleted success.!", "bottom-right", "warning");
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                } else if (data == "no") {
                    alert("The administrator password does not match!", "bottom-right", "error");
                    setTimeout(() => {
                        changepassAdminformDelete['change_pass_btn'].disabled = false;
                        changepassAdminformDelete['change_pass_btn'].innerHTML = 'Delete';
                    }, 1000);
                } else {
                    alert(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                    setTimeout(() => {
                        changepassAdminformDelete['change_pass_btn'].disabled = false;
                        changepassAdminformDelete['change_pass_btn'].innerHTML = 'Delete';
                    }, 1000);
                }
            })
            .catch(console.error);

    });
}
// administrator
let changepass = document.getElementById("changepassAdminform");

if (changepass) {
    changepass.addEventListener("keyup", (e) => {
        if (
            changepass["old_admin_pass"].value != "" &&
            changepass["new_admin_pass"].value != ""
        ) {
            changepass["change_pass_btn"].disabled = false;
        } else {
            changepass["change_pass_btn"].disabled = true;
        }
    });
    changepass.addEventListener("submit", (e) => {
        e.preventDefault();
        let id = changepass["pass_id"].value;
        let old_admin_pass = changepass["old_admin_pass"].value;
        let new_admin_pass = changepass["new_admin_pass"].value;

        changepass['change_pass_btn'].disabled = true;
        changepass['change_pass_btn'].innerHTML = '<span class="spinner-grow spinner-grow-sm text-capitalize" role="status" aria-hidden="true"></span> Change Password..';


        if (new_admin_pass.length < 8 || new_admin_pass.length > 20) {
            alert("At least 8 characters or more!", "bottom-right", "error");
            setTimeout(() => {
                changepass['change_pass_btn'].disabled = false;
                changepass['change_pass_btn'].innerHTML = 'Change Password';
            }, 1000);
        } else {
            const path = "./ajax/ajax-update.php";
            fetch(path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "change_pass=item&users_id=" +
                    id +
                    "&old_admin_pass=" +
                    old_admin_pass +
                    "&new_admin_pass=" +
                    new_admin_pass,
            })
                .then((response) => {
                    return response.text();
                })
                .then((data) => {
                    data = data.trim();

                    if (data == "pass_updated") {
                        alert("Password change success!", "bottom-right", "success");
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    } else if (data == "no") {
                        alert("Password does not match!", "bottom-right", "error");
                        setTimeout(() => {
                            changepass['change_pass_btn'].disabled = false;
                            changepass['change_pass_btn'].innerHTML = 'Change Password';
                        }, 1000);
                    } else {
                        alert(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                        setTimeout(() => {
                            changepass['change_pass_btn'].disabled = false;
                            changepass['change_pass_btn'].innerHTML = 'Change Password';
                        }, 1000);
                    }
                })
                .catch(console.error);
        }
    });
}

if (changeName) {
    changeName.addEventListener('submit', async (e) => {
        e.preventDefault();
        let profileName = document.getElementById('profileName').value;
        let data = new FormData();
        for (const i of new FormData(changeName)) {
            data.append(i[0], i[1]);
        }

        let result = changeNameValidation(profileName);
        if (result) {
            const path = "./ajax/ajax-update.php";
            await fetch(path, {
                method: "POST",
                body: data,
            })
                .then((response) => {
                    return response.text();
                })
                .then((data) => {
                    data = data.trim();

                    if (data == 'ok') {
                        alert("Update success.", "bottom-right", "success");
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    } else {
                        alert(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                        setTimeout(() => {
                            document.getElementById("profileNameSave").style = 'display:none';
                            document.getElementById("profileNameEdit").style = 'display:block';
                            document.getElementById("profileNameEdit").disabled = false;
                        }, 1000);
                    }
                    // location.href = "download?id=" + data;

                })
                .catch(console.error);
        }
    });
}

if (changeEmail) {
    changeEmail.addEventListener('submit', async (e) => {
        e.preventDefault();

        let profileEmail = document.getElementById('profileEmail').value;

        let data = new FormData();
        for (const i of new FormData(changeEmail)) {
            data.append(i[0], i[1]);
        }
        let result = changeEmailValidation(profileEmail)
        if (result) {
            const path = "./ajax/ajax-update.php";
            await fetch(path, {
                method: "POST",
                body: data,
            })
                .then((response) => {
                    return response.text();
                })
                .then((data) => {
                    data = data.trim();

                    if (data == 'ok') {
                        alert("Update success.", "bottom-right", "success");
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    } else {
                        alert(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                        setTimeout(() => {
                            document.getElementById("profileEmailSave").style = 'display:none';
                            document.getElementById("profileEmailEdit").style = 'display:block';
                            document.getElementById("profileEmailEdit").disabled = false;
                        }, 1000);
                    }

                })
                .catch(console.error);
        }
    });
}

if (IncomingViewForm) {
    IncomingViewForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let data = new FormData();
        for (const i of new FormData(IncomingViewForm)) {
            data.append(i[0], i[1]);
        }

        const path = "./ajax/ajax-download.php";
        await fetch(path, {
            method: "POST",
            body: data,
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                data = data.trim();
                location.href = "download?id=" + data;

            })
            .catch(console.error);
    });
}
if (outgoingViewForm) {
    outgoingViewForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let data = new FormData();
        for (const i of new FormData(outgoingViewForm)) {
            data.append(i[0], i[1]);
        }

        const path = "./ajax/ajax-download.php";
        await fetch(path, {
            method: "POST",
            body: data,
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                data = data.trim();
                location.href = "download?id=" + data;

            })
            .catch(console.error);
    });
}
if (userEditModalForm) {
    userEditModalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let name = userEditModalForm['ename'].value;
        let email = userEditModalForm['eemail'].value;
        let password = userEditModalForm['epassword'].value;
        let usertype = userEditModalForm['eusertype'].value;

        userEditModalForm['update_users_btn'].disabled = true;
        userEditModalForm['update_users_btn'].innerHTML = '<span class="spinner-grow spinner-grow-sm text-capitalize" role="status" aria-hidden="true"></span> Update..';

        let result = UserUpdateValidation(name, email, password, usertype);
        if (result) {
            let registerData = new FormData();
            for (const i of new FormData(userEditModalForm)) {
                registerData.append(i[0], i[1]);
            }

            const path = "./ajax/ajax-update.php";
            await fetch(path, {
                method: "POST",
                body: registerData,
            })
                .then((response) => {
                    return response.text();
                })
                .then((data) => {
                    data = data.trim();

                    if (data == "ok") {
                        alert("Update success.", "bottom-right", "success");
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    } else if (data == "error") {
                        alert(`Unable to update the data on our end, please try again later.`, "bottom-right", "error");
                        setTimeout(() => {
                            userEditModalForm['update_users_btn'].disabled = false;
                            userEditModalForm['update_users_btn'].innerHTML = 'Update';
                        }, 1000);
                    } else {
                        alert(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                        setTimeout(() => {
                            userEditModalForm['update_users_btn'].disabled = false;
                            userEditModalForm['update_users_btn'].innerHTML = 'Update';
                        }, 1000);
                    }

                })
                .catch(console.error);
        }
    })
}
// incoming
if (inshareModalForm) {
    inshareModalForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        inshareModalForm['share_btn'].disabled = true;
        inshareModalForm['share_btn'].innerHTML = '<span class="spinner-grow spinner-grow-sm text-capitalize" role="status" aria-hidden="true"></span> Share Now..';
        let formData = new FormData();
        for (const i of new FormData(inshareModalForm)) {
            formData.append(i[0], i[1]);
        }

        const path = "ajax/share.php";
        await fetch(path, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                data = data.trim();
                console.log(data)
                if (data == 'ok') {
                    alert("Shared successfully", "bottom-right", "success");
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                } else if (data == 'exist') {
                    alert(`Documents with this control number already exist.`, "bottom-right", "error");
                    setTimeout(() => {
                        inshareModalForm['share_btn'].disabled = false;
                        inshareModalForm['share_btn'].innerHTML = 'Share Now';
                    }, 1000);
                } else if (data == 'error') {
                    alert(`Unable to share the documents, please try again later.`, "bottom-right", "error");
                    setTimeout(() => {
                        inshareModalForm['share_btn'].disabled = false;
                        inshareModalForm['share_btn'].innerHTML = 'Share Now';
                    }, 1000);
                } else {
                    alert(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                    setTimeout(() => {
                        inshareModalForm['share_btn'].disabled = false;
                        inshareModalForm['share_btn'].innerHTML = 'Share Now';
                    }, 1000);
                }


            })
            .catch(console.error);
    })
}
// outgoing
if (shareModalForm) {
    shareModalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        shareModalForm['share_btn'].disabled = true;
        shareModalForm['share_btn'].innerHTML = '<span class="spinner-grow spinner-grow-sm text-capitalize" role="status" aria-hidden="true"></span> Share Now..';
        let formData = new FormData();
        for (const i of new FormData(shareModalForm)) {
            formData.append(i[0], i[1]);
        }

        const path = "ajax/share.php";
        await fetch(path, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                data = data.trim();
                console.log(data)
                if (data == 'ok') {
                    alert("Shared successfully", "bottom-right", "success");
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                } else if (data == 'exist') {
                    alert(`Documents with this control number already exist.`, "bottom-right", "error");
                    setTimeout(() => {
                        shareModalForm['share_btn'].disabled = false;
                        shareModalForm['share_btn'].innerHTML = 'Share Now';
                    }, 1000);
                } else if (data == 'error') {
                    alert(`Unable to share the documents, please try again later.`, "bottom-right", "error");
                    setTimeout(() => {
                        shareModalForm['share_btn'].disabled = false;
                        shareModalForm['share_btn'].innerHTML = 'Share Now';
                    }, 1000);
                } else {
                    alert(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                    setTimeout(() => {
                        shareModalForm['share_btn'].disabled = false;
                        shareModalForm['share_btn'].innerHTML = 'Share Now';
                    }, 1000);
                }


            })
            .catch(console.error);
    })
}
if (uploadModalForm) {
    uploadModalForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        uploadModalForm['upload_btn'].disabled = true;
        uploadModalForm['upload_btn'].innerHTML = '<span class="spinner-grow spinner-grow-sm text-capitalize" role="status" aria-hidden="true"></span> Share Now..';

        var fileInput = document.getElementById('ufile');
        var file = fileInput.files[0];
        var formData = new FormData(uploadModalForm);
        formData.append('file', file);

        await fetch('./ajax/upload.php', {
            method: 'POST',
            body: formData
        }).then(function (response) {
            return response.text();
        }).then(function (data) {
            data = data.trim();

            if (data == 'ok') {
                setTimeout(() => {
                    location.reload();
                }, 1000);
            } else if (data == 'large') {
                alert("File is to large", "bottom-right", "error");
                setTimeout(() => {
                    uploadModalForm['upload_btn'].disabled = false;
                    uploadModalForm['upload_btn'].innerHTML = 'Upload';
                }, 1000);
            } else {
                setTimeout(() => {
                    uploadModalForm['upload_btn'].disabled = false;
                    uploadModalForm['upload_btn'].innerHTML = 'Upload';
                }, 1000);
            }
        }).catch(function (error) {
            console.log(error);
        });

        var xhr = new XMLHttpRequest();
        xhr.open('POST', './ajax/upload.php');
        xhr.upload.addEventListener('progress', function (e) {
            if (e.lengthComputable) {
                var percent = Math.round((e.loaded / e.total) * 100);
                document.querySelector('.progress-bar').setAttribute('aria-valuenow', percent);
                document.querySelector('.progress-bar').style.width = percent + '%';
                document.querySelector('.progress-bar').textContent = percent + '%';
            }
        });
        xhr.send(formData);
    });
}
if (login) {
    login.addEventListener('submit', async (e) => {
        e.preventDefault();
        var counter = document.getElementById("counter");
        var count = counter.textContent;

        let email = login['email'].value;
        let password = login['password'].value;

        login['btn_login'].disabled = true;
        login['btn_login'].innerHTML = '<span class="spinner-grow spinner-grow-sm text-capitalize" role="status" aria-hidden="true"></span> Login..';

        count++;
        counter.textContent = count;

        let result = LoginValidation(email, password, login);
        if (result) {

            if (count >= 3 && count <= 5) {
                const remainingAttempts = 5 - count + 1;
                alert(`${remainingAttempts} attempt${remainingAttempts > 1 ? 's' : ''} remaining.`, "bottom-right", "error");
                setTimeout(() => {
                    login['btn_login'].disabled = false;
                    login['btn_login'].innerHTML = 'Login';
                }, 1000);
            } else if (count > 5 && count <= 6) {
                Penalty(30);
                createCookie("penalty", 30, 1);
                setTimeout(() => {
                    login['btn_login'].disabled = true;
                    login['btn_login'].innerHTML = 'Login';
                }, 1000);
            } else if (count >= 6) {
                Penalty(60);
                createCookie("penalty", 60, 1);
                setTimeout(() => {
                    login['btn_login'].disabled = true;
                    login['btn_login'].innerHTML = 'Login';
                }, 1000);
            } else {
                let loginData = new FormData();
                for (const i of new FormData(login)) {
                    loginData.append(i[0], i[1]);
                }

                const path = "ajax/user.php";
                await fetch(path, {
                    method: "POST",
                    body: loginData,
                })
                    .then((response) => {
                        return response.text();
                    })
                    .then((data) => {
                        data = data.trim();
                        console.log(data)
                        if (data == "Invalid_user_type") {
                            alert("Invalid user type", "bottom-right", "error");
                            setTimeout(() => {
                                login['btn_login'].disabled = false;
                                login['btn_login'].innerHTML = 'Login';
                            }, 1000);
                        } else if (data == "Incorrect_password") {
                            alert("Incorrect password", "bottom-right", "error");
                            setTimeout(() => {
                                login['btn_login'].disabled = false;
                                login['btn_login'].innerHTML = 'Login';
                            }, 1000);

                        } else if (data == "User_not_found") {
                            alert("User not found!", "bottom-right", "error");
                            setTimeout(() => {
                                login['btn_login'].disabled = false;
                                login['btn_login'].innerHTML = 'Login';
                            }, 1000);
                        } else if (data == "contact") {
                            alert("Notice: Account disabled, Please contact the administrator for further information.", "bottom-right", "error");
                            setTimeout(() => {
                                login['btn_login'].disabled = false;
                                login['btn_login'].innerHTML = 'Login';
                            }, 1000);
                        } else if (data == "block") {
                            alert("Notice: Account blocked, Please contact the administrator for further information.", "bottom-right", "error");
                            setTimeout(() => {
                                login['btn_login'].disabled = false;
                                login['btn_login'].innerHTML = 'Login';
                            }, 1000);
                        } else if (data == "Login_successful") {
                            alert(`Login as: ${email} successful!`, "bottom-right", "success");
                            setTimeout(() => {
                                location.reload();
                            }, 2000);
                        } else {
                            alert(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                            setTimeout(() => {
                                login['btn_login'].disabled = false;
                                login['btn_login'].innerHTML = 'Login';
                            }, 1000);

                        }

                    })
                    .catch(console.error);
            }

        }

    });
}
if (loginAdmin) {
    loginAdmin.addEventListener('submit', async (e) => {
        e.preventDefault();
        var counter = document.getElementById("adcounter");
        var count = counter.textContent;

        let email = loginAdmin['email'].value;
        let password = loginAdmin['password'].value;
        let user_type = loginAdmin['user_type'].value;

        count++;
        counter.textContent = count;

        loginAdmin['login_btn'].disabled = true;
        loginAdmin['login_btn'].innerHTML = '<span class="spinner-grow spinner-grow-sm text-capitalize" role="status" aria-hidden="true"></span> Login..';

        let result = LoginAdminValidation(email, password, loginAdmin);
        if (result) {
            if (count >= 3 && count <= 5) {
                const remainingAttempts = 5 - count + 1;
                alert(`${remainingAttempts} attempt${remainingAttempts > 1 ? 's' : ''} remaining.`, "bottom-right", "error");
                setTimeout(() => {
                    loginAdmin['login_btn'].disabled = false;
                    loginAdmin['login_btn'].innerHTML = 'Login';
                }, 1000);
            } else if (count > 5 && count <= 6) {
                AdPenalty(30);
                createCookie("adpenalty", 30, 1);
                setTimeout(() => {
                    loginAdmin['login_btn'].disabled = true;
                    loginAdmin['login_btn'].innerHTML = 'Login';
                }, 1000);
            } else if (count >= 6) {
                AdPenalty(60);
                createCookie("adpenalty", 60, 1);
                setTimeout(() => {
                    loginAdmin['login_btn'].disabled = true;
                    loginAdmin['login_btn'].innerHTML = 'Login';
                }, 1000);
            } else {
                let loginData = new FormData();
                for (const i of new FormData(loginAdmin)) {
                    loginData.append(i[0], i[1]);
                }

                const path = "ajax/user.php";
                await fetch(path, {
                    method: "POST",
                    body: loginData,
                })
                    .then((response) => {
                        return response.text();
                    })
                    .then((data) => {
                        data = data.trim();
                        console.log(data)
                        if (data == "Invalid_user_type") {
                            alert("Invalid user type", "bottom-right", "error");
                            setTimeout(() => {
                                loginAdmin['login_btn'].disabled = false;
                                loginAdmin['login_btn'].innerHTML = 'Login';
                            }, 1000);
                        } else if (data == "Incorrect_password") {
                            alert("Incorrect password", "bottom-right", "error");
                            setTimeout(() => {
                                loginAdmin['login_btn'].disabled = false;
                                loginAdmin['login_btn'].innerHTML = 'Login';
                            }, 1000);
                        } else if (data == "User_not_found") {
                            alert("User not found!", "bottom-right", "error");
                            setTimeout(() => {
                                loginAdmin['login_btn'].disabled = false;
                                loginAdmin['login_btn'].innerHTML = 'Login';
                            }, 1000);
                        } else if (data == "contact") {
                            alert("Notice: Account disabled, Please contact the administrator for further information.", "bottom-right", "error");
                            setTimeout(() => {
                                loginAdmin['login_btn'].disabled = false;
                                loginAdmin['login_btn'].innerHTML = 'Login';
                            }, 1000);
                        } else if (data == "block") {
                            alert("Notice: Account blocked, Please contact the administrator for further information.", "bottom-right", "error");
                            setTimeout(() => {
                                loginAdmin['login_btn'].disabled = false;
                                loginAdmin['login_btn'].innerHTML = 'Login';
                            }, 1000);
                        } else if (data == "Login_successful") {
                            alert(`Login as: ${user_type} successful!`, "bottom-right", "success");
                            setTimeout(() => {
                                location.reload();
                            }, 2000);
                        } else {
                            alert(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                            setTimeout(() => {
                                loginAdmin['login_btn'].disabled = false;
                                loginAdmin['login_btn'].innerHTML = 'Login';
                            }, 1000);
                        }

                    })
                    .catch(console.error);
            }
        }

    });
}
if (userModalForm) {
    userModalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let name = userModalForm['name'].value;
        let email = userModalForm['email'].value;
        let password = userModalForm['password'].value;
        let usertype = userModalForm['usertype'].value;

        userModalForm['reg_btn'].disabled = true;
        userModalForm['reg_btn'].innerHTML = '<span class="spinner-grow spinner-grow-sm text-capitalize" role="status" aria-hidden="true"></span> Register..';

        let result = RegisterValidation(name, email, password, usertype);
        if (result) {
            let registerData = new FormData();
            for (const i of new FormData(userModalForm)) {
                registerData.append(i[0], i[1]);
            }

            const path = "./ajax/user.php";
            await fetch(path, {
                method: "POST",
                body: registerData,
            })
                .then((response) => {
                    return response.text();
                })
                .then((data) => {
                    data = data.trim();

                    if (data == "ok") {
                        alert("Employee saved successfully.", "bottom-right", "success");
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    } else if (data == "exist") {
                        alert("Users already exist.", "bottom-right", "warning");
                        setTimeout(() => {
                            userModalForm['reg_btn'].disabled = true;
                            userModalForm['reg_btn'].innerHTML = 'Register';
                        }, 1000);

                    } else if (data == "error") {
                        alert(`Unable to save the data on our end, please try again later.`, "bottom-right", "errpr");
                        setTimeout(() => {
                            userModalForm['reg_btn'].disabled = true;
                            userModalForm['reg_btn'].innerHTML = 'Register';
                        }, 1000);
                    } else {
                        alert(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                        setTimeout(() => {
                            userModalForm['reg_btn'].disabled = true;
                            userModalForm['reg_btn'].innerHTML = 'Register';
                        }, 1000);
                    }

                })
                .catch(console.error);
        } else {
            setTimeout(() => {
                userModalForm['reg_btn'].disabled = false;
                userModalForm['reg_btn'].innerHTML = 'Register';
            }, 1000);
        }

    });
}

window.onload = () => {
    if (getCookie('penalty') !== undefined) {
        Penalty(parseInt(getCookie('penalty')));
    }

    if (getCookie('adpenalty') !== undefined) {
        AdPenalty(parseInt(getCookie('adpenalty')));
    }

    if (getCookie('resetcountdown') !== undefined) {
        Resend(parseInt(getCookie('resetcountdown')))
    }
}

