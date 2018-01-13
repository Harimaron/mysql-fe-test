var form = document.getElementById("field");
var input = document.getElementById("message");
var div = document.getElementById("messages");
form.addEventListener("submit", handleSubmit);

getMessages();

function handleSubmit(event) {
  event.preventDefault();

  sendMessage(input.value);
  setTimeout(getMessages, 500);

  input.value = "";
}

function getMessages() {
  var req = new XMLHttpRequest();
  req.responseType = "json";

  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = req.response;
      displayMessages(json);
    }
  };

  req.open("GET", "http://localhost:3000/messages", true);
  req.send();
}

function displayMessages(messages) {
  var html = "";
  var length = messages.length;
  for (var i = 0; i < length; i++) {
    html += '<div class="msg">' + messages[i].message + "</div>";
  }
  div.innerHTML = html;
}

function sendMessage(message) {
  var body = {
    message: message
  };
  var req = new XMLHttpRequest();
  req.responseType = "json";

  req.open("POST", "http://localhost:3000/message", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify(body));
}
