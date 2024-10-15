const rollBtn = document.getElementById('rollBtn');
const dice = document.getElementById('dice');
const faces = document.querySelectorAll('.face');

// Prizes corresponding to the dice faces
let prizes = [
    'Plain Gel Polish',                         // Front
    '500 Voucher',                              // Back
    'Wash & Blast',                             // Right
    '1 Sitting Laser (Underarm / Upper Lip)',   // Left
    'Basic Manicure',                           // Top
    'Hair Cut'                                  // Bottom
];

// To track which prizes have been used in the current cycle
let availablePrizes = shuffle([...prizes]);

// Function to shuffle an array (Fisher-Yates shuffle)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to get a random prize without repetition until all prizes have been shown
function getPrize() {
    if (availablePrizes.length === 0) {
        // Reshuffle the prizes when all have been used
        availablePrizes = shuffle([...prizes]);
    }
    // Get and remove the next prize from the availablePrizes array
    return availablePrizes.pop();
}

// Function to generate a random hex color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to determine if the color is dark or light for text contrast
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

            // Get a random prize that hasn't been repeated in the current cycle
            const prize = getPrize();

            // Ensure every face has a prize
            const shuffledPrizes = shuffle([...prizes]); // Shuffle prizes for the faces
            faces.forEach((face, index) => {
                face.textContent = shuffledPrizes[index]; // Assign each prize to a face
            });

            // Rotate the dice to show a random face
            const faceIndex = Math.floor(Math.random() * 6);
            dice.style.transform = `rotateX(0deg) rotateY(${faceIndex * 90}deg)`;
        }
    }, 166); // Approx. 30 frames over 5 seconds
});
