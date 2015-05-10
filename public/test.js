function myFunction() {
    var x = parseInt(document.getElementById("mygroup").value);
    var y = parseInt(document.getElementById("mygroup2").value);
    var z = x+y;
    document.getElementById("demo").innerHTML =z;
}