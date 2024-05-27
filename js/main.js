// 随机显示背景图片
function setRandomBackground() {
    var images = [
        'url("pic/pic1.jpg")',
        'url("pic/pic2.jpg")',
        'url("pic/pic3.jpg")',
        'url("pic/pic4.jpg")',
        'url("pic/pic5.jpg")',
        'url("pic/pic6.jpg")',
    ];

    var randomIndex = Math.floor(Math.random() * images.length);
    var randomImage = images[randomIndex];

    document.body.style.backgroundImage = randomImage;
}

// 当页面加载时设置随机背景图像
window.onload = setRandomBackground;

// 增减分数
function addScore(group, points) {
    var scoreElement = document.getElementById(group + 'Score');
    var currentScore = parseFloat(scoreElement.textContent);
    var newScore = currentScore + points;
    scoreElement.textContent = newScore;
    saveScore(group, newScore); // 保存新分数到localStorage
};

// 增减自定义分数
function addCustomScore(group) {
    var customScoreInput = document.getElementById('customScore' + group.substr(-1));
    var customScore = parseFloat(customScoreInput.value);
    if (!isNaN(customScore)) {
        var scoreElement = document.getElementById(group + 'Score');
        var currentScore = parseFloat(scoreElement.textContent);
        var newScore = currentScore + customScore;
        scoreElement.textContent = newScore;
        customScoreInput.value = '';
        saveScore(group, newScore); // 保存新分数到localStorage
    };
};

// 按回车建应用自定义分数的修改
document,addEventListener("DOMContentLoaded", function() {
    loadScores();

    var inputElements = document.querySelectorAll('input[type="number"]');
    inputElements.forEach(function(input) {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // 阻止默认的回车键行为
                addCustomScore('group' + this.id.substr(-1));
            }
        });
    });
});

// 将数据保存在本地
function saveScore(group, score) {
    localStorage.setItem(group + 'Score', score); // 使用localStorage保存分数
};

// 加载本地数据
function loadScores() {
    for (let i = 1; i <= 5; i++) {
        let group = 'group' + i;
        let score = localStorage.getItem(group + 'Score'); // 从localStorage获取分数
        if (score !== null) {
            document.getElementById(group + 'Score').textContent = score;
        };
    };
};

// 二次确认清除数据
function clearAllScores() {
    var confirmClear = confirm("确定要清空所有小组的分数吗？");
    if (confirmClear) {
        for (let i = 1; i <= 5; i++) {
            let group = 'group' + i;
            document.getElementById(group + 'Score').textContent = '0'; // 将显示的分数设置为0
            localStorage.removeItem(group + 'Score'); // 从localStorage中移除保存的分数
        };
    };
};

// 随机抽数
var intervalId;
var isGenerating = false; // 用于控制生成状态的标志变量

// 切换随机数字生成状态
function toggleRandomNumber() {
    isGenerating = !isGenerating; // 切换状态
    var toggleButton = document.getElementById('toggleButton');
    if (isGenerating) {
        // 如果当前状态是开始生成，则设置按钮文本为“停止”
        toggleButton.classList.remove('start');
        toggleButton.classList.add('stop');
        toggleButton.textContent = '停止';
        startGenerating();
    } else {
        // 如果当前状态是停止生成，则设置按钮文本为“开始”
        toggleButton.classList.remove('stop');
        toggleButton.classList.add('start');
        toggleButton.textContent = '开始';
        stopGenerating();
    }
}

// 开始生成随机数字
function startGenerating() {
    generateRandomNumber();
    intervalId = setInterval(generateRandomNumber, 25);
}

// 停止生成随机数字
function stopGenerating() {
    clearInterval(intervalId);
}

// 保存前两次生成的随机数
var lastTwoNumbers = [];

// 生成新的随机数字
function generateRandomNumber() {
    var minValue = document.getElementById('minValue').value;
    var maxValue = document.getElementById('maxValue').value;
    
    var newRandomNumber;
    do {
        newRandomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + parseInt(minValue);
    } while (lastTwoNumbers.includes(newRandomNumber));

    // 更新显示的随机数
    document.getElementById('randomNumberDisplay').innerText = newRandomNumber;
    
    // 将新数字添加到历史记录中，并移除最早的数字
    lastTwoNumbers.push(newRandomNumber);
    if (lastTwoNumbers.length > 2) {
        lastTwoNumbers.shift();
    }
}

// 显示或隐藏随机抽数
function toggleRandomNumberDiv() {
    var div = document.getElementById('randomNumberDiv');
    if (div.style.display === 'none') {
        div.style.display = 'block';
    } else {
        div.style.display = 'none';
    };
};

// 关闭随机抽数
function closeDiv() {
    document.getElementById('randomNumberDiv').style.display = 'none';
}

// 拖拽窗口
$(document).ready(function(){
    $('#randomNumberDiv').draggable({
        containment: 'window' // 限制拖动范围为浏览器窗口
    });
});