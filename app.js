// Accessing the elements
const box = document.getElementById("box");
const btn = document.getElementById("generateJoke");
const copyBtn = document.getElementById("copyJoke");
const speakBtn = document.getElementById("speakJoke");
const categorySelect = document.getElementById("jokeCategory");
const themeToggle = document.getElementById("themeToggle");

// Canvas - Particles
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

// Set canvas dimensions to fill the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}

// Generate particles when the mouse moves
function createParticles(e) {
    const xPos = e.x;
    const yPos = e.y;
    for (let i = 0; i < 5; i++) {
        particlesArray.push(new Particle(xPos, yPos));
    }
}

// Update and animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas on each frame

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Remove particles if they get too small
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(animateParticles);  
}

// Event listener for mousemove to generate particles
canvas.addEventListener("mousemove", createParticles);

// Theme toggle for dark/light mode
themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
});

// Joke generation function remains unchanged
const getJokes = async () => {
    box.innerHTML = `<h2>😂 Loading...</h2>`;
    let category = categorySelect.value;
    let apiURL = "https://official-joke-api.appspot.com/jokes/random";

    if (category !== "random") {
        apiURL = `https://official-joke-api.appspot.com/jokes/${category}/random`;
    }

    try {
        let response = await fetch(apiURL);
        let data = await response.json();

        if (Array.isArray(data)) {
            data = data[0];
        }

        box.innerHTML = `<h2>${data.setup}</h2><br>`;
        setTimeout(() => {
            box.innerHTML += `<h2>${data.punchline}</h2>`;
            box.innerHTML += `<img src="https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif" alt="Laughing GIF" class="joke-img">`;
        }, 2000);
    } catch (error) {
        box.innerHTML = `<h2>Oops! Something went wrong. Try again.</h2>`;
    }
};

// Copy joke to clipboard
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(box.innerText);
    alert("Joke copied to clipboard! 📋");
});

// Speak joke aloud
speakBtn.addEventListener("click", () => {
    let text = box.innerText;
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.pitch = 1;
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
});

// Event listener for joke button
btn.addEventListener("click", getJokes);

// Start the particle animation
animateParticles();
