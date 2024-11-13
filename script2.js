// ---------------------------------------Toggle day night view--------------------------------------------
function toggleDayNight() {
    const body = document.body;
    const toggleButton = document.getElementById('toggle-button');
    body.classList.toggle('night');
    if (body.classList.contains('night')) {
        toggleButton.innerHTML = 'Switch to &nbsp; <i class="fa-regular fa-sun"></i>';
    } else {
        toggleButton.innerHTML = 'Switch to &nbsp; <i class="fa-solid fa-moon"></i>';
    }
}

// ------------------------------------------progress bar ------------------------------------------
// Initially set all variables as 100 
let hunger = 100;
let happiness = 100;
let energy = 100;
const interval = 1000;

// Object to store image paths for each pet type and mood
const petImages = {
    dog: {
        happy: 'images/happy-dog3.png',
        sad: 'images/sad-dog.png',
        sleep: 'images/sleep-dog.png',
        food:'images/dog-food2.png'
    },
    monkey: {
        happy: 'images/happy-monkey2.webp',
        sad: 'https://static.vecteezy.com/system/resources/previews/036/004/789/non_2x/little-boy-monkey-posing-gesture-png.png',
        sleep: 'images/sleep-monkey2.webp', // Corrected the typo from 'pnh' to 'png'
        food:'https://e7.pngegg.com/pngimages/525/267/png-clipart-banana-banana-cartoon-food-fruit.png'
    }
};

// Variable to keep track of the current pet type
let currentPetType = 'dog';

// Function to select the preferred pet and update images
function selectPet() {
    currentPetType = document.getElementById('pet-type').value; // Get the selected pet type
    updatePetImage();  // Change pet image immediately after selection
    updatePetMood();   // Update mood display after selecting a pet
}

// Auto-decrement function
function autoDecrease() {
    if (hunger > 0) hunger -= 3;
    if (happiness > 0) happiness -= 2;
    if (energy > 0) energy -= 1;

    updateBars();
    updatePetImage();
    updatePetMood();
}

// Update progress bars
function updateBars() {
    document.getElementById('hunger-bar').style.width = hunger + '%';
    document.getElementById('happiness-bar').style.width = happiness + '%';
    document.getElementById('energy-bar').style.width = energy + '%';
}

// Update pet image based on the current pet type and state
function updatePetImage() {
    const petImg = document.getElementById('pet-img');
    const images = petImages[currentPetType];

    if (hunger <= 65 || happiness <= 55 || energy <= 45) {
        petImg.src = images.sad; // Set to sad if any value is below threshold
    } else {
        petImg.src = images.happy; // Default happy state
    }
}

// Update the pet’s mood text based on current status
function updatePetMood() {
    const petMood = document.getElementById('pet-mood');
    
    if (hunger <= 65) {
        petMood.innerHTML = 'Your pet is hungry! <i class="fa-regular fa-face-frown"></i>';
    } else if (happiness <= 55) {
        petMood.innerHTML = 'Your pet is feeling sad! <i class="fa-regular fa-face-sad-tear"></i>';
    } else if (energy <= 45) {
        petMood.innerHTML = 'Your pet is sleepy! <i class="fa-solid fa-face-tired"></i>';
    } else {
        petMood.innerHTML = 'Your pet is happy! <i class="fa-regular fa-face-smile"></i>';
    }
}

// Feed the pet
function feedPet() {
    hunger = Math.min(hunger + 20, 100);
    updateBars();
    updatePetImage();
    showFeedAnimation();
    jumpForFood();
    updatePetMood();
}

// Play with the pet
function playWithPet() {
    happiness = Math.min(happiness + 20, 100);
    updateBars();
    updatePetImage();
    showBallAnimation();
    showHappyEffect();
    updatePetMood();
}

// Rest the pet
function restPet() {
    energy = Math.min(energy + 20, 100);
    updateBars();
    updatePetImage();
    showSleepAnimation();
    updatePetMood();
}

// Function to show sleeping animation
function showSleepAnimation() {
    const petImg = document.getElementById('pet-img');
    petImg.src = petImages[currentPetType].sleep; // Switch to sleep image
    petImg.classList.add('fade-in-out'); // Add fade animation

    setTimeout(() => {
        petImg.classList.remove('fade-in-out');
        updatePetImage(); // Reset to default image after "waking up"
    }, 6000); // Duration of the sleep effect
}

// Show feeding animation
// function showFeedAnimation() {
//     const foodImg = document.createElement('img');
//     foodImg.src = 'https://png.pngtree.com/png-clipart/20230110/original/pngtree-dogfood-png-image_8900950.png';
//     foodImg.classList.add('feed-animation');
//     const petContainer = document.querySelector('.pet-container');
//     petContainer.appendChild(foodImg);

//     setTimeout(() => {
//         petContainer.removeChild(foodImg);
//     }, 1000);
// }

function showFeedAnimation() {
    const foodImg = document.createElement('img');
    foodImg.src = petImages[currentPetType].food; // Use food image from the selected pet type
    foodImg.classList.add('feed-animation');
    const petContainer = document.querySelector('.pet-container');
    petContainer.appendChild(foodImg);

    setTimeout(() => {
        petContainer.removeChild(foodImg);
    }, 1000);
}

// Jump animation
function jumpForFood() {
    const petImg = document.getElementById('pet-img');
    petImg.classList.add('jump-animation');
    setTimeout(() => {
        petImg.classList.remove('jump-animation');
    }, 1000);
}

// Happy effect animation
function showHappyEffect() {
    const petImg = document.getElementById('pet-img');
    petImg.classList.add('happy-animation');
    setTimeout(() => {
        petImg.classList.remove('happy-animation');
    }, 1000);
}

// Show ball animation when playing
function showBallAnimation() {
    const ballImg = document.createElement('img');
    ballImg.src = 'https://clipart-library.com/img/765927.png';
    ballImg.classList.add('ball-animation');
    const petContainer = document.querySelector('.pet-container');
    petContainer.appendChild(ballImg);

    setTimeout(() => {
        petContainer.removeChild(ballImg);
    }, 1500);
}

// Auto-decrement and initialize progress bars
setInterval(autoDecrease, interval);
updateBars();
updatePetImage();
