document.addEventListener("DOMContentLoaded", function() {
    displayProgress();
});

function displayProgress() {
    const workouts = [
        { id: 'workout1', name: 'Run 5km', week: 1 },
        { id: 'workout2', name: 'Interval Training', week: 1 },
        { id: 'workout3', name: 'Long Run 10km', week: 1 },
        { id: 'workout4', name: 'Hill Repeats', week: 2 },
        { id: 'workout5', name: 'Fartlek Run', week: 2 },
        { id: 'workout6', name: 'Tempo Run', week: 3 },
        { id: 'workout7', name: 'Recovery Run', week: 3 },
        { id: 'workout8', name: 'Long Run 12km', week: 4 },
        { id: 'workout9', name: 'Speed Work', week: 4 }
    ];

    const progressChart = document.getElementById("progressChart");
    const ctx = progressChart.getContext("2d");
    const totalWorkouts = workouts.length;
    let completedWorkouts = 0;
    const weeklyCompletion = [0, 0, 0, 0]; // Initialize array for weekly progress

    workouts.forEach(workout => {
        const isCompleted = localStorage.getItem(workout.id) === 'true';
        if (isCompleted) {
            completedWorkouts++;
            weeklyCompletion[workout.week - 1]++;
        }
    });

    // Calculate overall progress
    const overallProgress = (completedWorkouts / totalWorkouts) * 100;

    // Draw progress bar
    drawProgressBar(ctx, overallProgress);

    // Display weekly progress
    displayWeeklyProgress(weeklyCompletion);
}

function drawProgressBar(ctx, progress) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear previous content

    // Draw the progress bar
    ctx.fillStyle = "#FF4D00"; // Bar color
    ctx.fillRect(0, 0, (progress / 100) * ctx.canvas.width, ctx.canvas.height);

    // Draw the percentage text
    ctx.fillStyle = "#FFFFFF"; // Text color
    ctx.font = "16px Montserrat"; // Adjusted font size
    ctx.fillText(`${Math.round(progress)}%`, ctx.canvas.width / 2 - 20, ctx.canvas.height / 2 + 5);
}

function displayWeeklyProgress(weeklyCompletion) {
    const weeklyProgress = document.getElementById("weeklyProgress");
    weeklyProgress.innerHTML = ""; // Clear previous content

    weeklyCompletion.forEach((completed, index) => {
        const weekContainer = document.createElement('div');
        weekContainer.classList.add('week-container');

        const weekHeader = document.createElement('h2');
        weekHeader.textContent = `Week ${index + 1}`;
        weekHeader.classList.add('collapsible');
        weekHeader.onclick = function() {
            this.classList.toggle("active");
            const details = this.nextElementSibling;
            if (details.style.display === "block") {
                details.style.display = "none";
            } else {
                details.style.display = "block";
            }
        };

        const weekDetails = document.createElement('div');
        weekDetails.classList.add('week-details');
        weekDetails.style.display = 'none'; // Initially hidden

        const progressText = document.createElement('p');
        progressText.textContent = `Completed: ${completed} / 3 workouts`;
        weekDetails.appendChild(progressText);

        weekContainer.appendChild(weekHeader);
        weekContainer.appendChild(weekDetails);
        weeklyProgress.appendChild(weekContainer);
    });
}

function resetProgress() {
    localStorage.clear();
    displayProgress();
}
