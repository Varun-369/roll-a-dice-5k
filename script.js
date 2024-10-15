const rollBtn = document.getElementById('rollBtn');
const dice = document.getElementById('dice');
const faces = document.querySelectorAll('.face');

// Prizes corresponding to the dice faces
const prizes = [
    'Plain Gel Polish',                         // Front
    '500 Voucher',                              // Back
    'Wash & Blast',                             // Right
    '1 Sitting Laser (Underarm / Upper Lip)',   // Left
    'Basic Manicure',                           // Top
    'Hair Cut'                                  // Bottom
];

// Function to generate a random hex color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to determine if the color is dark or light
function getContrastYIQ(hexcolor) {
    const r = parseInt(hexcolor.substr(1, 2), 16);
    const g = parseInt(hexcolor.substr(3, 2), 16);
    const b = parseInt(hexcolor.substr(5, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return (yiq >= 128) ? 'black' : 'white'; // Return 'black' or 'white' based on brightness
}

// Function to rotate and change dice color
rollBtn.addEventListener('click', () => {
    // Change the dice color randomly at the start of each roll
    const diceColor = getRandomColor();
    dice.style.backgroundColor = diceColor;

    // Change text color based on background color brightness
    const textColor = getContrastYIQ(diceColor);
    faces.forEach(face => {
        face.style.color = textColor; // Apply the calculated text color to each face
    });

    // Rotate the dice for 5 seconds
    let totalRotation = 0;
    const interval = setInterval(() => {
        const rotationX = Math.random() * 720 + 360; // Rotate between 360 and 1080 degrees
        const rotationY = Math.random() * 720 + 360;

        totalRotation += 1; // Increment for total rotations
        dice.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

        // Stop after 5 seconds (30 frames)
        if (totalRotation >= 30) {
            clearInterval(interval);

            // Determine which face is on top after stopping
            const prizeIndex = Math.floor(Math.random() * 6); // Random face selection
            dice.style.transform = `rotateX(0deg) rotateY(${prizeIndex * 90}deg)`;
        }
    }, 166); // Approx. 30 frames over 5 seconds
});
