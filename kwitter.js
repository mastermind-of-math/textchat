function addUser(){
    localStorage.setItem("userId", document.getElementById("userInput").value);
    window.location = "kwitter_room.html";
}