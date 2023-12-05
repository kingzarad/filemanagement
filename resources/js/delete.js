function deleteEmployee(id, insession) {
    alertify.prompt(
        'Are you sure you want to delete this user? It can`t\n\n restored again.', 'Enter admin password:', '',
        function (e, str) {
            const evt = this;
            if (str != "") {
                let cancel = false;
                const path = "./ajax/ajax-delete.php";
                fetch(path, {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `delete_users=item&insession=${insession}&users_id=${id}&password=${str}`,
                })
                    .then((response) => {
                        return response.text();
                    })
                    .then((data) => {
                        data = data.trim();
                        console.log(data)
                        if (data == "delete") {
                            alertify.success('successfully deleted. ');
                            setTimeout(() => {
                                location.reload();
                            }, 1000);
                        } else if (data == "wrong") {
                            cancel = true;
                            alertify.error('Password does not match');
                        } else {
                            alert(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                        }
                    })
                    .catch(console.error)
                    .finally(() => {

                        e.cancel = cancel;
                    });

            } else {
                e.cancel = true;
                alertify.error('Please enter a password');
            }
        }, "Default Value"
    ).set("labels", { ok: "Yes", cancel: "No" });
}

function deleteFile(id, insession) {
    alertify.prompt(
        'Are you sure you want to delete this file? It can`t  \n restored again.', 'Enter admin password:', '',
        function (e, str) {
            const evt = this;
            if (str != "") {
                let cancel = false;
                const path = "./ajax/ajax-delete.php";
                fetch(path, {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `delete_file=item&insession=${insession}&id=${id}&password=${str}`,
                })
                    .then((response) => {
                        return response.text();
                    })
                    .then((data) => {
                        data = data.trim();
                        console.log(data)
                        if (data == "delete") {
                            alertify.success('successfully deleted. ');
                            setTimeout(() => {
                                location.reload();
                            }, 1000);
                        } else if (data == "wrong") {
                            cancel = true;
                            alertify.error('Password does not match');
                        } else {
                            alert(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                        }
                    })
                    .catch(console.error)
                    .finally(() => {

                        e.cancel = cancel;
                    });

            } else {
                e.cancel = true;
                alertify.error('Please enter a password');
            }
        }, "Default Value"
    ).set("labels", { ok: "Yes", cancel: "No" });
}

// admin delete
function deleteAdmin(id) {
    let modal = document.querySelector("#adminProfileDelete");;
    let data = document.querySelector("#changepassAdminformDelete");
    // document.getElementById("stud_name").textContent = name;
    data["pass_id"].value = id;
    // hide prev modal
    $('#profileModal').modal('hide');

    // show modal 
    let mo = new bootstrap.Modal(modal);
    mo.show();
}


function deleteOut(id, insession) {
    alertify.prompt(
        'Are you sure you want to delete this memos? It can`t  \n restored again.', 'Enter admin password:', '',
        function (e, str) {
            const evt = this;
            if (str != "") {
                let cancel = false;
                const path = "./ajax/ajax-delete.php";
                fetch(path, {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `delete_out=item&insession=${insession}&id=${id}&password=${str}`,
                })
                    .then((response) => {
                        return response.text();
                    })
                    .then((data) => {
                        data = data.trim();
                        console.log(data)
                        if (data == "delete") {
                            alertify.success('successfully deleted. ');
                            setTimeout(() => {
                                location.reload();
                            }, 1000);
                        } else if (data == "wrong") {
                            cancel = true;
                            alertify.error('Password does not match');
                        } else {
                            alert(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                        }
                    })
                    .catch(console.error)
                    .finally(() => {

                        e.cancel = cancel;
                    });

            } else {
                e.cancel = true;
                alertify.error('Please enter a password');
            }
        }, "Default Value"
    ).set("labels", { ok: "Yes", cancel: "No" });
}

function deleteIn(id, insession) {
    alertify.prompt(
        'Are you sure you want to delete this memos? It can`t  \n restored again.', 'Enter admin password:', '',
        function (e, str) {
            const evt = this;
            if (str != "") {
                let cancel = false;
                const path = "./ajax/ajax-delete.php";
                fetch(path, {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `delete_in=item&insession=${insession}&id=${id}&password=${str}`,
                })
                    .then((response) => {
                        return response.text();
                    })
                    .then((data) => {
                        data = data.trim();
                        console.log(data)
                        if (data == "delete") {
                            alertify.success('successfully deleted. ');
                            setTimeout(() => {
                                location.reload();
                            }, 1000);
                        } else if (data == "wrong") {
                            cancel = true;
                            alertify.error('Password does not match');
                        } else {
                            alert(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                        }
                    })
                    .catch(console.error)
                    .finally(() => {

                        e.cancel = cancel;
                    });

            } else {
                e.cancel = true;
                alertify.error('Please enter a password');
            }
        }, "Default Value"
    ).set("labels", { ok: "Yes", cancel: "No" });
}