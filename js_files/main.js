let generateBtn = document.getElementById("generate");
generateBtn.addEventListener("click", () => {
    let numFloors = document.getElementById("nfloors").value;
    let numLifts = document.getElementById("nlifts").value;
    if (!Number.isInteger(numFloors) || !Number.isInteger(numLifts)) {
        alert("Please enter an integer value for both the number of floors and lifts");
    } else {

    }
})