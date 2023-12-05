function restoreEmployee(id) {
    alertify.confirm('Are you sure you want to restore this account?', 'After restoring the account, the user will be able to login, upload, and share documents.', function () {
        const path = "./ajax/ajax-restore.php";

        fetch(path, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `restore_employee=item&id=${id}`,
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                data = data.trim();
                console.log(data)
                if (data == "ok") {
                    alertify.success('Restored successfully. ');
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                } else {
                    alertify.error(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                }
            })
            .catch(console.error)
    }, function () { }).set("labels", { ok: "Yes", cancel: "No" });;

}

function restoreFile(id) {
    alertify.confirm('Are you sure you want to restore this documents?', 'After restoring the documents, they can be accessed by both administrators, staff, and employees.', function () {
        const path = "./ajax/ajax-restore.php";

        fetch(path, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `restore_file=item&id=${id}`,
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                data = data.trim();
                console.log(data)
                if (data == "ok") {
                    alertify.success('Restored successfully. ');
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                } else {
                    alertify.error(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                }
            })
            .catch(console.error)
    }, function () { }).set("labels", { ok: "Yes", cancel: "No" });;

}


function restoreOut(id) {
    alertify.confirm('Are you sure you want to restore this documents?', 'After restoring the documents, they can be accessed by both administrators, staff, and employees.', function () {
        const path = "./ajax/ajax-restore.php";

        fetch(path, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `restore_out=item&id=${id}`,
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                data = data.trim();
                console.log(data)
                if (data == "ok") {
                    alertify.success('Restored successfully. ');
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                } else {
                    alertify.error(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                }
            })
            .catch(console.error)
    }, function () { }).set("labels", { ok: "Yes", cancel: "No" });;

}


function restoreIn(id) {
    alertify.confirm('Are you sure you want to restore this documents?', 'After restoring the documents, they can be accessed by both administrators, staff, and employees.', function () {
        const path = "./ajax/ajax-restore.php";

        fetch(path, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `restore_in=item&id=${id}`,
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                data = data.trim();
                console.log(data)
                if (data == "ok") {
                    alertify.success('Restored successfully. ');
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                } else {
                    alertify.error(`Something went wrong on our end. Please try again or contact the developer.`, "bottom-right", "error");
                }
            })
            .catch(console.error)
    }, function () { }).set("labels", { ok: "Yes", cancel: "No" });;

}