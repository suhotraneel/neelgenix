function openCalendly() {
document.getElementById("calendlyModal").style.display = "block";
}

function closeCalendly() {
document.getElementById("calendlyModal").style.display = "none";
}

window.addEventListener("click", function(event) {
const modal = document.getElementById("calendlyModal");
if (event.target === modal) {
    closeCalendly();
}
});