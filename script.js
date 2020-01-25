//start code 
(function () {
    var count = -1;
    var tasks = [];
    // get saved data from local storage
    (function getSaveData() {
        if (localStorage.getItem("tasks") !== null) {
            var ar = JSON.parse(localStorage.getItem("tasks"));
            ar.map(function (elem) {
                AddTask(elem.data, elem.details, elem.state);
            })
        }
    })()

    //listener on add task button
    document.getElementById("addTask").addEventListener("submit", function (event) {
        event.preventDefault();
        var task = document.getElementById("task").value;
        var taskDetails = document.getElementById("details").value;
        if (task !== "" && taskDetails !== "") {
            AddTask(task, taskDetails);
        }
    })

    //listener on clear button
    document.getElementById("edit").addEventListener("click", function () {
        Array.from(document.getElementsByClassName("card")).map(function (elem) {
            //adding close icon for every card
            var b = document.createElement("button");
            b.classList.add("close");
            var i = document.createElement("i");
            i.setAttribute("class", "fas");
            i.classList.add("fa-times-circle");
            b.prepend(i);
            elem.prepend(b)
        })
        del();
    })
    //listener on close button
    function del() {
        Array.from(document.getElementsByClassName("close")).map(function (element) {
            element.addEventListener("click", function () {
                delCard(element);
            })
        })
    }
    //search about card then delete it 
    function delCard(element) {
        var ar = JSON.parse(localStorage.getItem("tasks"));
        ar = ar.filter(function (elem) {
            return elem.id != element.parentElement.id
        })
        localStorage.setItem("tasks", JSON.stringify(ar))
        //to refresh dom
        location.href = "index.html";
    }

    Array.from(document.getElementsByClassName("area")).map(function (elem) {
        elem.addEventListener("drop", drop);
    })

    Array.from(document.getElementsByClassName("area")).map(function (elem) {
        elem.addEventListener("dragover", allowDrop);
    })

    function AddTask(text, det, col = "hold") {
        count++;
        //create card node
        var card = document.createElement('section');
        card.setAttribute("class", "card");
        card.setAttribute("draggable", "true");
        card.setAttribute("id", count)
        var cardText = document.createElement('h3');
        var carddetails = document.createElement('p');
        cardText.appendChild(document.createTextNode(text));
        carddetails.appendChild(document.createTextNode(det));
        card.appendChild(cardText);
        card.appendChild(carddetails);
        //add drag event 
        card.addEventListener("dragstart", drag);
        document.getElementById(col).appendChild(card);
        tasks.push(
            {
                id: count,
                data: text,
                details: det,
                state: col
            });
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    function drag() {
        event.dataTransfer.setData("task", event.target.id);
    }

    function drop() {
        var sec = event.target;
        var classes = Array.from(sec.classList);
        while (classes[1] !== "area") {
            sec = sec.parentElement;
            classes = Array.from(sec.classList);
        }
        var ID = event.dataTransfer.getData("task");
        sec.appendChild(document.getElementById(ID));
        var ar = JSON.parse(localStorage.getItem("tasks"));
        ar.map(function (elem) {
            if (elem.id == ID) {
                elem.state = sec.id;
            }
        })
        localStorage.setItem("tasks", JSON.stringify(ar))
    }
    function allowDrop() {
        event.preventDefault();
        console.log("drop allow");
    }
})();
