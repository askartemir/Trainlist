
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyDOom-7aU9dqklqJcb4Z5sABX-BgRQNzn8",
    authDomain: "trainlist-674ba.firebaseapp.com",
    databaseURL: "https://trainlist-674ba.firebaseio.com",
    projectId: "trainlist-674ba",
    storageBucket: "trainlist-674ba.appspot.com",
    messagingSenderId: "1097716072107"
};

firebase.initializeApp(config);

//reference database in a variable

var database = firebase.database();
//make input to db through function when button is clicked


$("#addTrain").on("click", function(){
	var trainName = $("#trainNameinput").val().trim();
    var destination = $("#destinationinput").val().trim();
    var frequency = $("#frequencyinput").val().trim();
    var firstTrain = moment($("#firstTraininput").val().trim(), "hh:mm").format();
    console.log(frequency);
    console.log(firstTrain);

    //calculate next train time

    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTrainConverted);
    
    var currentTime = moment();
    
    var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
    console.log(difference);
    
    var remainder = difference % frequency;
    console.log(remainder);
    
    var minUntilNext = frequency - remainder;
    console.log(minUntilNext);
    
    var nextTrain = moment().add(minUntilNext, "minutes").format("hh:mm a");
    console.log(nextTrain);

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        min: minUntilNext,
        next: nextTrain
    }


    database.ref().push(newTrain);
    
    //clear form fields

    $("#trainNameinput").val("");
    $("#destinationinput").val("");
    $("#frequencyinput").val("");
    $("#firstTraininput").val("");

    return false;
});


//entered data gets stored on page


database.ref().on("child_added", function(childSnap, snapshot) {

    var name = childSnap.val().name;
    var destination = childSnap.val().destination;
    var frequency = childSnap.val().frequency;
    var firstTrain = childSnap.val().firstTrain;
    var min = childSnap.val().min;
    var next = childSnap.val().next;

    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");

});




    
    
