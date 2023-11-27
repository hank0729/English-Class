var audio = document.getElementById("mp3");
var playButton = document.getElementById("playButton");
var restartButton = document.getElementById("restartButton");
document.body.style.background =
            'url("./static/4.png") no-repeat center center fixed';
        document.body.style.backgroundSize = "cover";
const lyric = [
    ["Don't go tonight" , "今晚別離開我"],
    ["Stay here one more time","再次留在我身邊"],
    ["Remind me what it's like, oh", "提醒著我什麼是愛"],
    ["And let's fall in love one more time","讓我們再度墜入愛河"],
    ["I need you now by my side","我需要你停駐我身旁"],
    ["It tears me up when you turn me down", "當你離開時，我的眼淚跟著潰堤"],
    ["I'm begging please, just stick around" ,"我苦苦哀求，只願你能陪伴著我"],
    ["I'm sorry, don't leave me", "很抱歉，別離開我"],
    ["I want you here with me", "我希望你能在我身邊"],
    ["I know that your love is gone", "我明白你的愛已消失殆盡"],
    ["I can't breathe, I'm so weak", "我無法呼吸，感到虛弱"],
    ["I know this isn't easy", "我明白這並不容易"],
    ["Don't tell me that your love is gone", "別告訴我你已不再愛我"],
    ["That your love is gone", "你的愛已消失殆盡"],
    ["Don't tell me that your love is gone", "別說妳的愛已消失"],
    ["That your love is gone ", "轉眼已煙消雲散"],
    ["I'm sorry, don't leave me", "對不起，不要走"],
    ["I want you here with me", "我想要你留在我身旁"],
    ["I know that your love is gone", "我明白你已不再愛我"],
    ["I can't breathe, I'm so weak", "我感到呼吸困難、虛弱使我難受"],
    ["I know this isn't easy", "我了解這非常困難"],
    ["Don't tell me that your love is gone", "別告訴我你不再愛我"],
    ["That your love is gone", "你的愛已消失殆盡"],
    ["That your love is gone, hmm ", "你的愛已消失殆盡"],
    ["I can't breathe, I'm so weak", "我不能呼吸、感到虛弱 "],
    ["I know this isn't easy", "我知道這並不容易"],
    ["Don't tell me that your love is gone ", "別說你已不再愛我"],
    ["That your love is gone", "你的愛早已不存在"]
];
const lyricsContainers = [
    document.getElementById("lyricsContainer"),
    document.getElementById("lyricsContainer2"),
];
let currentLyricIndex = 0;
let currentContainerIndex = 0;

playButton.addEventListener("click", function () {
    if (audio.paused) {
        // 播放音樂時的處理
        audio.play();
        playButton.innerHTML = "停止";
        document.getElementById("img").style.opacity = "0.5";
        document.body.style.background = "white";  // 這一行將背景設置為白色
        fadeInNextLyric();
    } else {
        // 暫停音樂時的處理
        audio.pause();
        playButton.innerHTML = "播放";
        document.getElementById("img").style.opacity = "0";
        document.body.style.background =
            'url("./static/error.png") no-repeat center center fixed';
        document.body.style.backgroundSize = "cover";
        resetLyrics();
    }
    
});

restartButton.addEventListener("click", function () {
    currentLyricIndex = 0;
    currentContainerIndex = 0;
    resetLyrics();
    fadeInNextLyric();
});

function resetLyrics() {
    lyricsContainers.forEach((container) => {
        container.style.display = "none";
    });
}

function fadeInNextLyric() {
    const currentLyrics = lyricsContainers[currentContainerIndex].querySelectorAll(
        "h1"
    );

    if (currentLyricIndex < lyric.length) {
        setTimeout(fadeInLyric, 23000, currentLyrics); 
    } else {
        lyricsContainers[currentContainerIndex].style.display = "none";

        currentLyricIndex = 0;

        currentContainerIndex = (currentContainerIndex + 1) % lyricsContainers.length;

        lyricsContainers[currentContainerIndex].style.display = "block";

        fadeInLyric(lyricsContainers[currentContainerIndex].querySelectorAll("h1"));
    }
}
function fadeInLyric(currentLyrics) {
    const englishLine = lyric[currentLyricIndex][0];
    const chineseLine = lyric[currentLyricIndex][1];

    gsap.fromTo(currentLyrics[0], { opacity: 1 }, { opacity: 0, duration: 0.2 });
    gsap.fromTo(currentLyrics[1], { opacity: 1 }, { opacity: 0, duration: 0.2, onComplete: () => {
        // Set new lyrics
        currentLyrics[0].textContent = englishLine;
        currentLyrics[1].textContent = chineseLine;

        // Fade in new lyrics
        gsap.fromTo(currentLyrics[0], { opacity: 0 }, { opacity: 1, duration: 0.2 });
        gsap.fromTo(currentLyrics[1], { opacity: 0 }, { opacity: 1, duration: 0.2, onComplete: () => {
            currentLyricIndex++;

            // Check if there are more lyrics
            if (currentLyricIndex < lyric.length) {
                // If yes, wait for custom duration and fade out
                setTimeout(() => {
                    gsap.fromTo(currentLyrics[0], { opacity: 1 }, { opacity: 0, duration: 0.2 });
                    gsap.fromTo(currentLyrics[1], { opacity: 1 }, { opacity: 0, duration: 0.2, onComplete: () => {
                        fadeInLyric(currentLyrics); // Recursively call for the next lyric
                    }});
                }, getWaitDuration(currentLyricIndex) * 1000);
            } else {
                // If no more lyrics, wait for custom duration and fade out
                setTimeout(() => {
                    gsap.fromTo(currentLyrics[0], { opacity: 1 }, { opacity: 0, duration: 0.2 });
                    gsap.fromTo(currentLyrics[1], { opacity: 1 }, { opacity: 0, duration: 0.2, onComplete: fadeInNextLyric });
                }, getWaitDuration(currentLyricIndex) * 1000);
            }
        }});
    }});
}

// Function to get custom wait duration based on lyric index
function getWaitDuration(index) {
    const customDurations = {
        1: 5,
        2: 3 ,
        3: 3,
        4: 8,
        5: 6,
        6: 6.5,
        7: 6,
        8: 3,
        9: 2 ,
        10: 5,
        11: 5,
        12: 3, 
        13: 4,
        14:3,
        15:11,
        16:12,
        17:5,
        18:2.5,
        19:4,
        20:4,
        21:5.5,
        22:5,
        23:5,
        24:10,
        25:4,
        26:4,
        27:5,
        28:4
    };

    // Check if there is a custom duration for the current index
    return customDurations[index] || 4; // Default wait duration is 4 seconds
}

// Start the animation
fadeInLyric([document.getElementById('english-line'), document.getElementById('chinese-line')]);

