// ==========================================
// OPEN STORY
// ==========================================

function startBirthday() {

    document.getElementById("countdown").classList.add("hidden");

    document
        .getElementById("birthday")
        .classList.remove("hidden");


    // Start music

    const music =
        document.getElementById("birthdayMusic");

    music.volume = 0.35;

    music.play().catch(function(error) {
        console.log(
            "Music will playback blocked:", error);
    });


    // Start floating hearts

    setInterval(createHeart, 700);

}


// ==========================================
// FLOATING HEARTS
// ==========================================

function createHeart() {

    const heart =
        document.createElement("div");

    heart.className = "heart";

    const symbols = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "✨",
        "🌸"
    ];

    heart.innerHTML =
        symbols[
            Math.floor(
                Math.random() * symbols.length
            )
        ];

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        (Math.random() * 20 + 15) + "px";

    heart.style.animationDuration =
        (Math.random() * 5 + 4) + "s";


    document
        .getElementById("hearts")
        .appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 9000);

}



// ==========================================
// LETTERS
// ==========================================

function openLetter(element) {

    element.classList.toggle("open");

}



// ==========================================
// QUIZ
// ==========================================

const questions = [

    {
        question:
            "Who is your favourite roommate? 😂",

        answers: [
            "Chotu ❤️",
            "Someone else 😭",
            "Nobody 😂",
            "Secret 🤫"
        ],

        correct: 0
    },


    {
        question:
            "What makes our friendship special?",

        answers: [
            "Understanding ❤️",
            "Only food 😂",
            "Only studying",
            "Nothing 😭"
        ],

        correct: 0
    },


    {
        question:
            "How long have we been friends?",

        answers: [
            "One year ❤️",
            "One day",
            "Ten years",
            "I forgot 😂"
        ],

        correct: 0
    },


    {
        question:
            "What are we?",

        answers: [
            "Roommates + Friends + Super Close ❤️",
            "Strangers",
            "Classmates only",
            "Enemies 😂"
        ],

        correct: 0
    }

];


let currentQuestion = 0;

let score = 0;


function loadQuestion() {

    const q =
        questions[currentQuestion];


    document.getElementById(
        "question"
    ).textContent =
        q.question;


    const answers =
        document.getElementById(
            "answers"
        );


    answers.innerHTML = "";


    q.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement(
                    "div"
                );

            button.className =
                "answer";

            button.textContent =
                answer;


            button.onclick =
                () => checkAnswer(index);


            answers.appendChild(button);

        }
    );


    document.getElementById(
        "quizResult"
    ).textContent = "";


    document.getElementById(
        "nextButton"
    ).classList.add("hidden");

}


function checkAnswer(index) {

    const q =
        questions[currentQuestion];


    if (index === q.correct) {

        score++;

        document.getElementById(
            "quizResult"
        ).textContent =
            "Correct! 😂❤️";

    }

    else {

        document.getElementById(
            "quizResult"
        ).textContent =
            "Wrong! But Chotu still loves you 😂❤️";

    }


    document.getElementById(
        "nextButton"
    ).classList.remove("hidden");

}


function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion >=
        questions.length
    ) {

        document.getElementById(
            "question"
        ).textContent =
            "Quiz Complete! 🎉";


        document.getElementById(
            "answers"
        ).innerHTML = "";


        document.getElementById(
            "quizResult"
        ).textContent =
            `Score: ${score}/${questions.length} ❤️`;


        document.getElementById(
            "nextButton"
        ).classList.add("hidden");


        return;

    }


    loadQuestion();

}


loadQuestion();



// ==========================================
// FINAL BIRTHDAY
// ==========================================

// ==========================================
// START BIRTHDAY
// ==========================================

function startBirthday() {

    document
        .getElementById("countdown")
        .classList.add("hidden");


    document
        .getElementById("birthday")
        .classList.remove("hidden");


    startFireworks();


    // Keep fireworks going

    setInterval(() => {

        createFirework();

    }, 1200);

}



// ==========================================
// FIREWORK CANVAS
// ==========================================

/* ================================
   FIREWORKS
================================ */

const fireworksCanvas = document.getElementById("fireworksCanvas");
const fireworksCtx = fireworksCanvas.getContext("2d");

let fireworks = [];
let particles = [];

function resizeFireworksCanvas() {
    const rect = fireworksCanvas.parentElement.getBoundingClientRect();

    const dpr = window.devicePixelRatio || 1;

    fireworksCanvas.width = rect.width * dpr;
    fireworksCanvas.height = rect.height * dpr;

    fireworksCanvas.style.width = rect.width + "px";
    fireworksCanvas.style.height = rect.height + "px";

    fireworksCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeFireworksCanvas);

function createFirework() {
    const rect = fireworksCanvas.parentElement.getBoundingClientRect();

    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height * 0.5;

    const colors = [
        "#ff4ecd",
        "#ff69b4",
        "#ffffff",
        "#ffd166",
        "#7dd3fc",
        "#c084fc"
    ];

    const color = colors[Math.floor(Math.random() * colors.length)];

    fireworks.push({
        x: x,
        y: rect.height,
        targetY: y,
        speed: 7 + Math.random() * 3,
        color: color
    });
}

function explodeFirework(firework) {
    const count = 60;

    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;

        particles.push({
            x: firework.x,
            y: firework.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 100,
            color: firework.color,
            size: Math.random() * 3 + 1
        });
    }
}

function animateFireworks() {
    const rect = fireworksCanvas.parentElement.getBoundingClientRect();

    fireworksCtx.clearRect(0, 0, rect.width, rect.height);

    /* Firework rockets */

    for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i];

        firework.y -= firework.speed;

        fireworksCtx.beginPath();
        fireworksCtx.arc(
            firework.x,
            firework.y,
            3,
            0,
            Math.PI * 2
        );

        fireworksCtx.fillStyle = firework.color;
        fireworksCtx.fill();

        if (firework.y <= firework.targetY) {
            explodeFirework(firework);
            fireworks.splice(i, 1);
        }
    }

    /* Explosion particles */

    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vy += 0.04;
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        particle.life--;

        fireworksCtx.globalAlpha = particle.life / 100;

        fireworksCtx.beginPath();

        fireworksCtx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        fireworksCtx.fillStyle = particle.color;
        fireworksCtx.fill();

        if (particle.life <= 0) {
            particles.splice(i, 1);
        }
    }

    fireworksCtx.globalAlpha = 1;

    requestAnimationFrame(animateFireworks);
}

function startFireworks() {
    resizeFireworksCanvas();

    fireworks = [];
    particles = [];

    if (!window.fireworksStarted) {
        window.fireworksStarted = true;

        setInterval(() => {
            createFirework();
        }, 700);

        animateFireworks();
    }

    /* Create a few immediately */
    createFirework();
    setTimeout(createFirework, 300);
    setTimeout(createFirework, 600);
}
