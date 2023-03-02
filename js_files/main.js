let generateBtn = document.getElementById("generate");
generateBtn.addEventListener("click", () => {
    let numFloors = parseInt(document.getElementById("nfloors").value);
    let numLifts = parseInt(document.getElementById("nlifts").value);
    if (!Number.isInteger(numFloors) || !Number.isInteger(numLifts)) {
        alert("Please enter an integer value for both the number of floors and lifts");
    } else {
        const floorContainer = document.getElementById("floor-container");
        const btnContainer = document.getElementById("btn-container");
        for (let f = 1; f <= numFloors; f++) {
            const btnsDiv = document.createElement("div");
            btnsDiv.classList.add("d-flex", "flex-column", "justify-content-evenly");

            const upBtn = document.createElement("button");
            upBtn.innerHTML = "UP";
            upBtn.type = "button";
            upBtn.classList.add("btn", "btn-success", "btn-sm");
            upBtn.setAttribute("id", `upBtn${numFloors - f + 1}`);

            const downBtn = document.createElement("button");
            downBtn.innerHTML = "DOWN";
            downBtn.type = "button";
            downBtn.classList.add("btn", "btn-danger", "btn-sm");
            downBtn.setAttribute("id", `downBtn${numFloors - f + 1}`);

            btnsDiv.setAttribute("id", "floorBtnDiv");
            if (f !== 1) {
                btnsDiv.appendChild(upBtn);
            }
            if (f !== numFloors) {
                btnsDiv.appendChild(downBtn);
            }
            btnContainer.appendChild(btnsDiv);
        }
        for (let f = 1; f <= numFloors; f++) {
            const floorElemnet = document.createElement("div");
            floorElemnet.setAttribute("id", `floor${numFloors - f + 1}`);
            floorElemnet.classList.add("floor");
            floorContainer.appendChild(floorElemnet);
        }

        for (let l = 1; l <= numLifts; l++) {
            console.log("Hello");
            const liftElement = document.createElement("div");
            liftElement.setAttribute("id", `lift${l}`);
            liftElement.classList.add("lift");
            liftElement.style.left = `${(l - 1) * 120 + 20}px`;

            const leftDoor = document.createElement("div");
            const rightDoor = document.createElement("div");
            leftDoor.setAttribute("id", `leftDoor${l}`);
            rightDoor.setAttribute("id", `rightDoor${l}`);
            leftDoor.classList.add("leftDoor");
            rightDoor.classList.add("rightDoor");

            liftElement.appendChild(leftDoor);
            liftElement.appendChild(rightDoor);

            const floor1 = document.getElementById("floor1");
            floor1.appendChild(liftElement);
        }
    }
    const lift1 = document.getElementById("lift1");
    console.log(lift1.parentElement.previousSibling);

    const upBtn1 = document.getElementById("upBtn1");
    console.log(upBtn1);
    upBtn1.addEventListener("click", () => {
        console.log("Hi");
        lift1.parentElement = lift1.parentElement.previousSibling;
        console.log(lift1.parentElement);
        lift1.style.transform = "translate3d(0,-110px, 0)";
    })
});


