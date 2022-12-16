/*
        Travel Calculator
    This program calculates the cost of a trip.
    It asks the user for the distance, the type of vehicle they are using, and the cost of fuel.
    It then calculates the cost of the trip.
    here is how:
    1. Ask the user for the distance of the trip, the type of vehicle they are using, and the cost of fuel, and store the values in variables.
    2. Calculate the cost of the trip by using the formula: cost = distance / fuel efficiency * cost of fuel
    3. Display the cost of the trip.
    P.S I was planning on using API to get the fuel price, distance and fuel economy but I couldn't  get it to work. (maybe a good project for the break!)
*/
window.onload = function () {

    var formHandle = document.forms.input_form;

    var unitType = true; // km


    document.getElementById('change_units').onclick = function () {
        unitChanger()
    };

    function unitChanger() {
        //function to change units
        unitType = document.getElementById("km").checked;
        console.log(unitType);
        // alert("hi");
        if (unitType == true) {
            document.getElementById("unit").innerHTML = "Km"
            document.getElementById("fUnit").innerHTML = "/Litre"
        } else {
            document.getElementById("unit").innerHTML = "Miles"
            document.getElementById("fUnit").innerHTML = "/Gallon"
        };
    };

    document.getElementById("calculate").onclick = processForm;

    function processForm() { validation.validate() }
    //object to validate form
    let validation = {
        riders: 0,
        distance: 0,
        type: 0,
        fuel: 0,
        validate: function () {
            //form validation
            var riders = document.getElementById("riders");
            var riders_err = document.getElementById("riders_err");

            if (riders.value == "" || riders < 1) {
                riders.style.backgroundColor = "red";
                riders.focus();
                // alert("hi");
                riders_err.innerHTML = "Please select a number of riders";
                this.riders = false

            } else {
                this.riders = true
                riders.style.backgroundColor = "white";
                riders_err.innerHTML = "";

            }

            var distance = document.getElementById("distance");
            var distance_err = document.getElementById("distance_err");

            if (distance.value == "" || riders < 1) {
                distance.style.backgroundColor = "red";
                distance.focus();
                // alert("hi");
                distance_err.innerHTML = "Please enter a distance";
                this.distance = false

                type
            } else {
                this.distance = true
                distance.style.backgroundColor = "white";
                distance_err.innerHTML = "";

            }

            var type = document.getElementById("type");
            var type_err = document.getElementById("type_err");

            if (type.value == "Nan") {
                type.style.backgroundColor = "red";
                type.focus();
                // alert("hi");
                type_err.innerHTML = "Please select a vehicle type";
                this.type = false
                fuel
            } else {
                this.type = true
                type.style.backgroundColor = "white";
                type_err.innerHTML = "";

            }

            var fuel = document.getElementById("fuel");
            var fuel_err = document.getElementById("fuel_err");

            if (fuel.value == "") {
                fuel.style.backgroundColor = "red";
                fuel.focus();
                // alert("hi");
                fuel_err.innerHTML = "Please enter a fuel price";
                this.fuel = false

            } else {
                this.fuel = true
                fuel.style.backgroundColor = "white";
                fuel_err.innerHTML = "";
            }
            var valid = false;
            if (validation.distance == true && validation.fuel == true && validation.riders && validation.type == true) {
                valid = true
            }
            if (valid == true) {
                travelCalculator.calculate();
            };
            console.log(validation);
            console.log(valid);
            // alert(validation.distance.value);
        }
    };

    let travelCalculator = {
        //object to calculate cost
        distance: 0,
        fEcon: 0,
        fuel: 0,
        riders: 1,
        calculate:
            function () {
                this.distance = formHandle.distance.value;
                this.fuel = formHandle.fuel.value;
                this.fEcon = formHandle.type.value;
                this.riders = formHandle.riders.value;
                if (unitType == true) {
                    //fuel economy in km/litre
                    switch (this.fEcon) {
                        case ("truck"):
                            this.fEcon = 8.75796;
                            break;
                        case ("sedan"):
                            this.fEcon = 13.498313;
                            break;
                        case ("van"):
                            this.fEcon = 7.4400149;
                            break;
                        case ("motorcycle"):
                            this.fEcon = 18.7063;
                            break;
                    };
                } else {
                    //fuel economy in miles/gallon
                    switch (this.fEcon) {
                        case ("truck"):
                            this.fEcon = 20.59999914;
                            break;
                        case ("sedan"):
                            this.fEcon = 31.7500007121;
                            break;
                        case ("van"):
                            this.fEcon = 17.5000000647;
                            break;
                        case ("motorcycle"):
                            this.fEcon = 43.99994565;
                            break;
                    };

                }
                // output to html
                if (unitType == true) {
                    //output in km
                    let cost = (this.distance / this.fEcon) * this.fuel;
                    let fuel = this.distance / this.fEcon;
                    let costPer = cost / this.riders;
                    document.getElementById("output").innerHTML = "Your " + this.distance + "km trip will use " +
                        fuel.toFixed(2) + "L of fuel and cost a total of $" + cost.toFixed(2) + " or only $" + costPer.toFixed(2) + " if you split it";
                } else {
                    //output in miles
                    let cost = (this.distance / this.fEcon) * this.fuel;
                    let fuel = this.distance / this.fEcon;
                    let costPer = cost / this.riders;
                    document.getElementById("output").innerHTML = "Your " + this.distance + "mile trip will use " +
                        fuel.toFixed(2) + " gallons of fuel and cost a total of $" + cost.toFixed(2) + " or only $" + costPer.toFixed(2) + " if you split it";
                }

            }
    };

    console.log(travelCalculator);
};