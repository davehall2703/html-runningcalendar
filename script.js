function toggleWeek(element) {
    const workouts = element.parentElement.nextElementSibling;
    workouts.classList.toggle('active'); // Toggle the active class

    // Save checkbox state
    saveCheckboxState();
}

function toggleDetails(element) {
    const details = element.nextElementSibling;
    details.classList.toggle('active'); // Toggle the active class
}

document.querySelectorAll('.workout input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        localStorage.setItem(this.id, this.checked);
    });
});

function saveCheckboxState() {
    document.querySelectorAll('.workout input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = localStorage.getItem(checkbox.id) === 'true';
    });
}

// Call this function on page load to set the initial checkbox states
document.addEventListener("DOMContentLoaded", saveCheckboxState);
