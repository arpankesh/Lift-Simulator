let liftReqQueue = [];

let generateBtn = document.getElementById("generate");
generateBtn.addEventListener("click", () => {
    let numFloors = parseInt(document.getElementById("nfloors").value);
    let numLifts = parseInt(document.getElementById("nlifts").value);
    if (!Number.isInteger(numFloors) || !Number.isInteger(numLifts)) {
        alert("Please enter an integer value for both the number of floors and lifts");
    } else {
        const headerElement = document.getElementById("header");
        headerElement.style.visibility = "hidden";

        const floorContainer = document.getElementById("floor-container");
        const btnContainer = document.getElementById("btn-container");

        // creating buttons
        for (let f = 1; f <= numFloors; f++) {
            const btnsDiv = document.createElement("div");
            btnsDiv.classList.add("d-flex", "flex-column", "justify-content-evenly");

            const upBtn = document.createElement("button");
            upBtn.innerHTML = "UP";
            upBtn.type = "button";
            upBtn.classList.add("btn", "btn-success", "btn-sm");
            upBtn.setAttribute("id", `upBtn${numFloors - f + 1}`);
            upBtn.setAttribute("floorNo", `${numFloors - f + 1}`);
            upBtn.addEventListener("click", (e) => {
                const btnEle = e.target;
                liftReqQueue.push(btnEle.getAttribute("floorNo"));
            });

            const downBtn = document.createElement("button");
            downBtn.innerHTML = "DOWN";
            downBtn.type = "button";
            downBtn.classList.add("btn", "btn-danger", "btn-sm");
            downBtn.setAttribute("id", `downBtn${numFloors - f + 1}`);
            downBtn.setAttribute("floorNo", `${numFloors - f + 1}`);
            downBtn.addEventListener("click", (e) => {
                const btnEle = e.target;
                liftReqQueue.push(btnEle.getAttribute("floorNo"));
            });

            btnsDiv.setAttribute("id", "floorBtnDiv");
            if (f !== 1) {
                btnsDiv.appendChild(upBtn);
            }
            if (f !== numFloors) {
                btnsDiv.appendChild(downBtn);
            }
            btnContainer.appendChild(btnsDiv);
        }

        // creating floors
        for (let f = 1; f <= numFloors; f++) {
            const floorElemnet = document.createElement("div");
            floorElemnet.setAttribute("id", `floor${numFloors - f + 1}`);
            floorElemnet.classList.add("floor");
            floorContainer.appendChild(floorElemnet);
        }

        // creating lifts
        for (let l = 1; l <= numLifts; l++) {
            const liftElement = document.createElement("div");
            liftElement.setAttribute("id", `lift${l}`);
            liftElement.classList.add("lift");
            liftElement.setAttribute("floorNo", "1");
            liftElement.setAttribute("status", "free");
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
});

// Lift animation
function animateLift(targetFloor) {
    console.log("TargetFloor", targetFloor);
    const lifts = Array.from(document.querySelectorAll(".lift"));
    console.log(lifts);
    const isLiftOnTarget = lifts.find((lift) => {
        const status = lift.getAttribute("status");
        const floor = lift.getAttribute("floorNo");
        return (status == "free" && floor == targetFloor);
    });
    if (isLiftOnTarget) {
        console.log("Lift already there");
        slidingDoorsAnimation(isLiftOnTarget);
        return;
    }

    const freeLift = getClosestLiftFree(targetFloor);

    // moving any lift if free
    const distBetweenTargetFloorAndLift = targetFloor - freeLift.getAttribute("floorNo");
    console.log(distBetweenTargetFloorAndLift);
    freeLift.setAttribute("status", "occupied");
    freeLift.setAttribute("floorNo", targetFloor);
    freeLift.style.transition = `all ${2 * Math.abs(distBetweenTargetFloorAndLift)}s linear`;
    freeLift.style.transform = `translate3d(0,${-110 * (targetFloor - 1)}px,0)`;

    // Make the doors toggle
    setTimeout(() => {
        slidingDoorsAnimation(freeLift);
    }, Math.abs(distBetweenTargetFloorAndLift) * 2000);

    //Make the status of lift free after certain time
    setTimeout(() => {
        freeLift.setAttribute("status", "free");
        console.log("STO isLiftFree", freeLift);
    }, 2000 * Math.abs(distBetweenTargetFloorAndLift) + 5000);
}

function slidingDoorsAnimation(availableLift) {
    availableLift.children[0].classList.add("leftDoorSlide");
    availableLift.children[1].classList.add("rightDoorSlide");
    setTimeout(() => {
        availableLift.children[0].classList.remove("leftDoorSlide");
        availableLift.children[1].classList.remove("rightDoorSlide");
    }, 2500);
}

function getAnyLiftFree() {
    const lifts = Array.from(document.querySelectorAll(".lift"));
    const freeLift = lifts.find((lift) => {
        const status = lift.getAttribute("status");
        return status == "free";
    });
    console.log("Free Lift", freeLift);
    if (freeLift) {
        return true;
    } else {
        return false;
    }
}

setInterval(checkReqQueue, 100);
function checkReqQueue() {
    if (!liftReqQueue.length) {
        return;
    } else {
        if (getAnyLiftFree()) {
            animateLift(liftReqQueue.shift());
        } else {
            return;
        }
    }
}

function getClosestLiftFree(targetFloor) {

    const lifts = Array.from(document.querySelectorAll(".lift"));
    const freeLifts = lifts.filter((lift) => {
        const status = lift.getAttribute("status");
        return status == "free";
    });

    let min = Number.MAX_VALUE;
    let nearestLiftElement = lifts[0]; //default
    function getDistanceFromTargetFloor(lift) {
        const liftFloor = lift.getAttribute("floorNo");
        console.log(liftFloor);
        const distFromTargetFloor = Math.abs(liftFloor - targetFloor);
        if (distFromTargetFloor < min) {
            min = distFromTargetFloor;
            nearestLiftElement = lift;
        }
    }
    freeLifts.forEach(getDistanceFromTargetFloor);
    console.log("Free Lift", nearestLiftElement);

    return nearestLiftElement;
}