const rollBtn = document.getElementById('rollBtn');
const dice = document.getElementById('dice');

// Prizes corresponding to the dice faces
const prizes = [
    'Plain Gel Polish',                         // Front
    '500 Voucher',                              // Back
    'Wash & Blast',                             // Right
    '1 Sitting Laser (Underarm / Upper Lip)',  // Left
    'Basic Manicure',                           // Top
    'Hair Cut'                                  // Bottom
];

rollBtn.addEventListener('click', () => {
    // Rotate the dice for 5 seconds
    let totalRotation = 0;
    const interval = setInterval(() => {
        const rotationX = Math.random() * 720 + 360; // Rotate between 360 and 1080 degrees
        const rotationY = Math.random() * 720 + 360;

        totalRotation += 1; // Increment for total rotations
        dice.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

        // Stop after 5 seconds
        if (totalRotation >= 30) {
            clearInterval(interval);
            // Determine which face is on top
            const prizeIndex = Math.round(rotationY / 90) % 6; // Calculate the index based on the rotation
            // Reset dice to face the selected prize
            dice.style.transform = `rotateX(0deg) rotateY(${prizeIndex * 90}deg)`;
        }
    }, 166); // Adjust for 30 frames over 5 seconds
});
