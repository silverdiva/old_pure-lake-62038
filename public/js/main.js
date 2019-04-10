function getPerson() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("person").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/services/getPerson?id=" + document.getElementById('id').value, true);
  xhttp.send();
}
