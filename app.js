document.getElementById('start-btn').addEventListener('click', startNetworkTest);

async function startNetworkTest() {
    const startBtn = document.getElementById('start-btn');
    const speedDisplay = document.getElementById('speed-value');
    const pingDisplay = document.getElementById('ping-value');
    const jitterDisplay = document.getElementById('jitter-value');
    
    startBtn.disabled = true;
    startBtn.innerText = "正在診斷中...";
    
    // 1. 測算 Ping 值與抖動 (Jitter)
    pingDisplay.innerText = "測算中...";
    jitterDisplay.innerText = "測算中...";
    
    let latencies = [];
    const pingUrl = 'https://www.cloudflare.com';
    
    for (let i = 0; i < 4; i++) {
        const p = await measurePing(pingUrl);
        if (typeof p === 'number') latencies.add ? latencies.push(p) : latencies.push(p);
        // 每次檢測稍微間隔
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    if (latencies.length > 0) {
        const avgPing = Math.round(latencies.reduce((a, b) => a + b) / latencies.length);
        pingDisplay.innerText = `${avgPing} ms`;
        
        // 計算簡單抖動 (相鄰延遲差值的平均值)
        let totalJitter = 0;
        for (let i = 1; i < latencies.length; i++) {
            totalJitter += Math.abs(latencies[i] - latencies[i-1]);
        }
        const avgJitter = latencies.length > 1 ? Math.round(totalJitter / (latencies.length - 1)) : 0;
        jitterDisplay.innerText = `${avgJitter} ms`;
    } else {
        pingDisplay.innerText = "超時";
        jitterDisplay.innerText = "超時";
    }

    // 2. 測速邏輯
    const testImageUrl = 'https://speed.cloudflare.com/__down?bytes=10000000'; // Cloudflare 10MB 測試數據
    const startTime = new Date().getTime();
    
    try {
        const response = await fetch(testImageUrl, { cache: "no-store" });
        const reader = response.body.getReader();
        let receivedLength = 0;

        while(true) {
            const {done, value} = await reader.read();
            if (done) break;
            
            receivedLength += value.length;
            const currentTime = new Date().getTime();
            const durationInSeconds = (currentTime - startTime) / 1000;
            
            if (durationInSeconds > 0) {
                // 計算 Mbps: (位元組數 * 8 位元) / 秒 / 1024 / 1024
                const bitsLoaded = receivedLength * 8;
                const speedMbps = (bitsLoaded / durationInSeconds) / (1024 * 1024);
                
                // 即時更新介面
                speedDisplay.innerText = speedMbps.toFixed(1);
            }
        }
    } catch (error) {
        console.error("測速發生錯誤:", error);
        speedDisplay.innerText = "錯誤";
    } finally {
        startBtn.disabled = false;
        startBtn.innerText = "重新一鍵測速";
    }
}

// 簡易網頁端 Ping 估算函數
async function measurePing(url) {
    const startTime = new Date().getTime();
    try {
        await fetch(url, { mode: 'no-cors', cache: 'no-store' });
        return new Date().getTime() - startTime;
    } catch (e) {
        return null;
    }
}
