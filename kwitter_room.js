var firebaseConfig = {
    apiKey: "AIzaSyAu0wOWZ9APx735GDGDoHf_ZiYkk2WW76A",
    authDomain: "kwitter-20585.firebaseapp.com",
    databaseURL: "https://kwitter-20585-default-rtdb.firebaseio.com",
    projectId: "kwitter-20585",
    storageBucket: "kwitter-20585.appspot.com",
    messagingSenderId: "139596723505",
    appId: "1:139596723505:web:05123120aad583f7402c10"
};

firebase.initializeApp(firebaseConfig);
var username = localStorage.getItem("userId");
document.getElementById("username").innerHTML = "Welcome " + username + "!";

function getData(){
    firebase.database().ref("/").on('value', function(snapshot){
        document.getElementById("outputIsAwesome").innerHTML = "";
        snapshot.forEach(function(childSnapshot){
            var childKey  = childSnapshot.key;
            var Room_names = childKey;
            console.log(Room_names);
            var row = "<div style='cursor:crosshair;' class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>" + Room_names + "</div><hr>";
            document.getElementById("outputIsAwesome").innerHTML += row;
        });
    });
}

getData();

function addNewRoomInLocalStorageWithAButtonThatHasABigName(){
    var roomName = document.getElementById("roomName").value;
    localStorage.setItem("roomName", roomName)

    firebase.database().ref("/").child(roomName).update({
        purpose: "addRoom"
    });
    window.location = "kwitter_page.html";
}

function redirectToRoomName(name){
    console.log(name);
    localStorage.setItem("roomName", name)
    window.location = "kwitter_page.html"
}

function logOut(){
    localStorage.removeItem("roomName");
    localStorage.removeItem("userId");
    window.location = "index.html";
}