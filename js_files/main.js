let generateBtn = document.getElementById("generate");
generateBtn.addEventListener("click", () => {
    let numFloors = parseInt(document.getElementById("nfloors").value);
    let numLifts = parseInt(document.getElementById("nlifts").value);
    if (!Number.isInteger(numFloors) || !Number.isInteger(numLifts)) {
        alert("Please enter an integer value for both the number of floors and lifts");
    } else {
        console.log("Hello");
        const floorContainer = document.getElementById("floor-container");
        const btnContainer = document.getElementById("btn-container");
        for (let f = 1; f <= numFloors; f++) {
            const btnsDiv = document.createElement("div");
            btnsDiv.classList.add("d-flex", "flex-column", "justify-content-evenly");

            const upBtn = document.createElement("button");
            upBtn.innerHTML = "UP";
            upBtn.type = "button";
            upBtn.classList.add("btn", "btn-success", "btn-sm");

            const downBtn = document.createElement("button");
            downBtn.innerHTML = "DOWN";
            downBtn.type = "button";
            downBtn.classList.add("btn", "btn-danger", "btn-sm");

            btnsDiv.setAttribute("id", "floorBtnDiv");
            btnsDiv.appendChild(upBtn);
            btnsDiv.appendChild(downBtn);
            btnContainer.appendChild(btnsDiv);
        }
        for (let f = 1; f <= numFloors; f++) {
            const floorElemnet = document.createElement("div");
            floorElemnet.setAttribute("id", "floor");
            floorContainer.appendChild(floorElemnet);
        }
    }
})