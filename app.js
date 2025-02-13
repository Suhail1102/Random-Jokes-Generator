const box = document.getElementById("box");
const btn = document.getElementById("generateJoke");
const copyBtn = document.getElementById("copyJoke");
const speakBtn = document.getElementById("speakJoke");
const categorySelect = document.getElementById("jokeCategory");
const themeToggle = document.getElementById("themeToggle");

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
            data = data[0]; // For category-based API, data comes as an array
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

// Toggle dark/light mode
themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
});

// Event listener for joke button
btn.addEventListener("click", getJokes);
