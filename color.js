document.getElementById("applyButton").addEventListener("click", function() {
    var colorValue = document.getElementById("colorPicker").value;
    axios.post('http://localhost:5000/saveColor', { colorValue: colorValue })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.error(error);
    });
});