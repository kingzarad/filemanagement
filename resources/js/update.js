function updateEmployee(id) {
    let modal = document.querySelector("#editUsertModal");
    let mo = new bootstrap.Modal(modal);
    let form = document.querySelector("#userEditModalForm");
    const path = "./ajax/ajax-get.php";
    fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "get_users=item&users_id=" + id,
    })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            let datas = JSON.parse(data);
            form["ename"].value = datas["name"];
            form["eemail"].value = datas["email"];
            form["eusertype"].value = datas["user_type"];
            form["pass_id"].value = datas["users_id"];
        })
        .catch(console.error);
    mo.show();
}

function blockEmployee(id, insession) {
    alertify.prompt(
        'Are you certain you want to block this users?', 'Enter admin password:', '',
        function (e, str) {
            const evt = this;
            if (str != "") {
                let cancel = false;
                const path = "./ajax/ajax-update.php";
                fetch(path, {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `block=item&insession=${insession}&users_id=${id}&password=${str}`,
                })
                    .then((response) => {
                        return response.text();
                    })
                    .then((data) => {
                        data = data.trim();
                      
                        if (data == "ok") {
                            alertify.success('successfully blocked. ');
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
function unblockEmployee(id, insession) {
    alertify.prompt(
        'Are you certain you want to unblock this users?', 'Enter admin password:', '',
        function (e, str) {
            const evt = this;
            if (str != "") {
                let cancel = false;
                const path = "./ajax/ajax-update.php";
                fetch(path, {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `unblock=item&insession=${insession}&users_id=${id}&password=${str}`,
                })
                    .then((response) => {
                        return response.text();
                    })
                    .then((data) => {
                        data = data.trim();
                        if (data == "ok") {
                            alertify.success('successfully unblocked. ');
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
    ).set("labels", { ok: "Yes", cancel: "No" })
}
