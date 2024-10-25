// 获取视频信息
function getVideoInfo() {
    const title = document.querySelector('h1.video-title').textContent;
    const description = document.querySelector('div.basic-desc-info').textContent;
    const tags = Array.from(document.querySelectorAll('a.tag-link')).map(tag => tag.textContent);
    return { title, description, tags };
}

// 使用AI判断视频是否为学习类视频
async function isLearningVideo(videoInfo) {
    console.log('isLearningVideo', videoInfo);

    const apiKey = ''; // 替换为您的DeepSeek API密钥
    const apiUrl = 'https://api.deepseek.com/chat/completions';

    const messages = [
        { role: "system", content: "You are an AI assistant that determines if a video is educational based on its title, description, and tags." },
        { role: "user", content: `Please analyze the following video information and determine if it's an educational video. Respond with only 'true' for educational or 'false' for non-educational.\n\nTitle: ${videoInfo.title}\nDescription: ${videoInfo.description}\nTags: ${videoInfo.tags.join(', ')}` }
    ];

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: messages,
                max_tokens: 5
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const isLearning = result.choices[0].message.content.trim().toLowerCase() === 'true';
        console.log('isLearningVideo result', isLearning);
        return isLearning;
    } catch (error) {
        console.error('Error calling DeepSeek API:', error);
        return false; // 发生错误时默认返回false
    }
}

// 显示提示框
function showPrompt(message, yesCallback, noCallback) {
    const videoPlayer = document.querySelector('video');
    const prompt = document.createElement('div');
    prompt.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;
    prompt.innerHTML = `
    <div style="background: white; padding: 20px; border-radius: 5px; text-align: center;">
      <p style="margin-bottom: 20px; font-size: 18px;">${message}</p>
      <button id="yesBtn" style="margin-right: 10px; padding: 10px 20px; font-size: 16px;">是</button>
      <button id="noBtn" style="padding: 10px 20px; font-size: 16px;">否</button>
    </div>
  `;
    document.body.appendChild(prompt);

    document.getElementById('yesBtn').addEventListener('click', () => {
        document.body.removeChild(prompt);
        yesCallback();
    });
    document.getElementById('noBtn').addEventListener('click', () => {
        document.body.removeChild(prompt);
        noCallback();
    });
}

// 主函数
async function main() {
    // 获取视频播放器并立即暂停
    const videoPlayer = document.querySelector('video');
    if (!videoPlayer) {
        console.error('未找到视频播放器元素');
        return;
    }
    
    // 确保视频暂停
    videoPlayer.pause();
    // 添加事件监听器，防止视频自动播放
    videoPlayer.addEventListener('play', function preventAutoPlay() {
        videoPlayer.pause();
        videoPlayer.removeEventListener('play', preventAutoPlay);
    });

    const videoInfo = getVideoInfo();
    const isLearning = await isLearningVideo(videoInfo);

    if (!isLearning) {
        showPrompt(
            '这是学习类视频吗？？？',
            () => {
                // 用户选择"是"（撒谎）
                const videoInfoString = `${videoInfo.title}\n ${videoInfo.description}\n ${videoInfo.tags.join(', ')}`;
                showPrompt(
                    `你撒谎，这明明是：\n\n${videoInfoString}\n\n，你确定真的要继续看？`,
                    () => {
                        // 用户选择继续观看时，允许视频播放
                        videoPlayer.play();
                        
                        const countdownDuration = 30; // 30s
                        let remainingTime = countdownDuration;

                        const countdownElement = document.createElement('div');
                        countdownElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-size: 100px;
        z-index: 9999;
        text-align: center;
        width: 90%;
      `;
                        document.body.appendChild(countdownElement);

                        const updateCountdown = () => {
                            const minutes = Math.floor(remainingTime / 60);
                            const seconds = remainingTime % 60;
                            countdownElement.textContent = `再给你两分钟，`;
                            countdownElement.innerHTML += `<span style="font-size: 64px; text-decoration: line-through;">让你把记忆结成冰。</span>`;
                            countdownElement.innerHTML += `想peach，最多看${seconds.toString().padStart(2, '0')}秒`;

                            if (remainingTime > 0) {
                                remainingTime--;
                                setTimeout(updateCountdown, 1000);
                            } else {
                                document.body.removeChild(countdownElement);
                                window.close(); // 直接关闭页面
                            }
                        };

                        updateCountdown();
                    },
                    () => {
                        // 用户选择不继续观看
                        window.close();
                    }
                );
            },
            () => {
                // 用户选择"否"
                window.close();
            }
        );
    }
}

// 当页面加载完成后执行主函数
window.addEventListener('load', main);
