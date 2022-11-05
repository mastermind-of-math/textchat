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
var userName = localStorage.getItem("userId")
var roomName = localStorage.getItem("roomName")

function getData(){
    firebase.database().ref("/" + roomName).on('value', function(snapshot){
        document.getElementById("outputIsAwesome").innerHTML = "";
        snapshot.forEach(function(childSnapshot){
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if(childKey != "purpose"){
                var firebase_message_id = childKey;
                var message_data = childData;

                var name = message_data['msgname'];
                var message = message_data['message'];
                var like = message_data['like'];
                var nameTag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
                var msgTag = "<h4 class='message_h4' style='color: black'>" + message + "</h4>"
                var likeButton = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLikes(this.id)'>";
                var spanTag = "<span class='glyphicon glyphicon-thumbs-up'>Likes: " + like + " </span></button>";
                var row = nameTag + msgTag + likeButton + spanTag;
                
                console.log(message_data);
                console.log(firebase_message_id);
                document.getElementById("outputIsAwesome").innerHTML += row
            }
        });
    });
}

getData();

function sendmsg(){
    var msg = document.getElementById("msgbox").value;
    firebase.database().ref(roomName).push({
        msgname:userName,
        message:msg,
        like:0
    });
    document.getElementById("msgbox").value = "";
}

function updateLikes(messageId){
    buttonId = messageId;
    likes = document.getElementById(buttonId).value;
    updatedLikes = Number(likes) + 1;
    firebase.database().ref(roomName).child(messageId).update({
        like:updatedLikes
    });
}

function logOut(){
    localStorage.removeItem("roomName");
    localStorage.removeItem("userId");
    window.location = "index.html";
}