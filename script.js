let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

let clickCount = 0;

const noTexts = [
    "？你认真的吗…",
    "要不再想想？",
    "不许选这个！ ",
    "我会很伤心…",
    "不行:("
];

function createHeart(x, y) {
    const hearts = document.createElement('div');
    hearts.className = 'hearts';
    hearts.style.position = 'fixed';
    hearts.style.pointerEvents = 'none';
    document.body.appendChild(hearts);

    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.innerHTML = '♥';
    hearts.appendChild(heart);
    setTimeout(() => {
        hearts.remove();
    }, 3000);
}

noButton.addEventListener("click", function (event) {
    clickCount++;

    let yesSize = 1 + (clickCount * 1.2);
    yesButton.style.transform = `scale(${yesSize})`;

    const tilt = (clickCount % 2 === 0)? 10 : -10;
    noButton.style.transform = `rotate(${tilt}deg)`;

    const imageTilt = (clickCount % 2 === 0)? 10 : -10;
    mainImage.style.transform = `rotate(${imageTilt}deg)`;

    let moveUp = clickCount * 25;
    questionText.style.transform = `translateY(-${moveUp}px)`;

    if (clickCount <= 5) {
        noButton.innerText = noTexts[clickCount - 1];
    }

    if (clickCount === 1) mainImage.src = "images/shocked.png";
    if (clickCount === 2) mainImage.src = "images/think.png";
    if (clickCount === 3) mainImage.src = "images/angry.png";
    if (clickCount === 4) mainImage.src = "images/crying.png";
    if (clickCount >= 5) mainImage.src = "images/crying.png";

    createHeart(event.clientX, event.clientY);
});

yesButton.addEventListener("click", function () {
    document.body.innerHTML = `
        <div class="yes-screen">
            <h1 class="yes-text">!!!喜欢你!! ( >᎑<)♡︎ᐝ</h1>
            <img src="images/hug.png" alt="拥抱" class="yes-image">
        </div>
    `;

    document.body.style.overflow = "hidden";

    // 增加爱心数量并减慢飘落速度
    const numHearts = 80; // 增加爱心数量
    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-fall');
        heart.style.left = Math.random() * 100 + 'vw';
        // 减慢飘落速度，动画持续时间调整为 5 到 10 秒之间
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's'; 
        heart.innerHTML = '♥';
        document.body.appendChild(heart);

        // 动画结束后移除爱心
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
});
