function viewIncomingMemo(id) {
    let modal = document.querySelector("#viewInModal");
    let mo = new bootstrap.Modal(modal);
    let form = document.querySelector("#IncomingViewForm");
    const path = "./ajax/ajax-get.php";
    fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "get_incoming=item&id=" + id,
    })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            let datas = JSON.parse(data);
            console.log(datas)
            document.getElementById('viewInLabel').innerHTML = datas['control_no'].toUpperCase();
            form["icnov"].value = datas['control_no'].toUpperCase();
            form["iplv"].value = datas['particulars'].toUpperCase();

            form["idrv"].value = datas['directions'].toUpperCase();
            form["irmv"].value = datas['remarks'].toUpperCase();
            form["idcv"].value = datas['documents'].toUpperCase();

            form["ido_id"].value = datas["do_id"];
        })
        .catch(console.error);
    mo.show();
}

function viewOutgoingMemo(id) {
    let modal = document.querySelector("#viewOutModal");
    let mo = new bootstrap.Modal(modal);
    let form = document.querySelector("#outgoingViewForm");
    const path = "./ajax/ajax-get.php";
    fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "get_outgoing=item&id=" + id,
    })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            let datas = JSON.parse(data);

            document.getElementById('viewOutLabel').innerHTML = datas['control_no'].toUpperCase();
            form["cnov"].value = datas['control_no'].toUpperCase();
            form["plv"].value = datas['particulars'].toUpperCase();
            form["rov"].value = datas['receving_office'].toUpperCase();
            form["rmv"].value = datas['remarks'].toUpperCase();
            form["sov"].value = datas['sending_office'].toUpperCase();
            form["dcv"].value = datas['documents'].toUpperCase();

            form["do_id"].value = datas["do_id"];
        })
        .catch(console.error);
    mo.show();
}