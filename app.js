document.addEventListener("DOMContentLoaded", async () => {
    // 1. 運行 IP.sb 審計
    await runIpSbEngine();
    // 2. 運行 Fast.com 下載測速
    await runFastEngine();
    // 3. 運行全球 Top 20 站點速度監測
    runGlobalSitesTest();
});

// ==========================================
// 核心一：IP.sb 引擎 (公網身份深度解析)
// ==========================================
async function runIpSbEngine() {
    try {
        const startTime = performance.now();
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const endTime = performance.now();

        document.getElementById("ip-value").innerText = data.ip || "未知";
        document.getElementById("isp-value").innerText = data.org || "未知";
        document.getElementById("asn-value").innerText = data.asn || "未知";
        document.getElementById("location-value").innerText = `${data.country_name} · ${data.region}`;
        document.getElementById("ping-value").innerText = `${Math.round(endTime - startTime)} ms`;
    } catch (e) {
        document.getElementById("ip-value").innerText = "獲取失敗/請檢查線路";
    }
}

// ==========================================
// 核心二：Fast.com 引擎 (真實分塊下載測速)
// ==========================================
async function runFastEngine() {
    const speedNum = document.getElementById("speed-number");
    const progBar = document.getElementById("progress-bar");
    const statusText = document.getElementById("test-status");

    statusText.innerText = "正在拉取 Cloudflare 邊緣大數據塊...";
    
    // 使用 Cloudflare 允許跨域的 20MB 數據測試流
    const targetUrl = "https://speed.cloudflare.com/__down?bytes=20000000&cb=" + Date.now();
    const startTime = performance.now();
    let downloadedBytes = 0;

    try {
        const response = await fetch(targetUrl);
        if (!response.body) throw new Error();
        const reader = response.body.getReader();

        // 模擬 Fast.com 實時数字劇烈抖動滾動的效果
        const visualTimer = setInterval(() => {
            const now = performance.now();
            const duration = (now - startTime) / 1000;
            if (duration > 0 && downloadedBytes > 0) {
                const mbps = ((downloadedBytes * 8) / duration / (1024 * 1024)).toFixed(1);
                speedNum.innerText = mbps;
                progBar.style.width = `${Math.min((duration / 4) * 100, 90)}%`;
            }
        }, 100);

        while(true) {
            const { done, value } = await reader.read();
            if (done) break;
            downloadedBytes += value.length;
        }

        clearInterval(visualTimer);
        const endTime = performance.now();
        const totalDuration = (endTime - startTime) / 1000;
        const finalMbps = ((downloadedBytes * 8) / totalDuration / (1024 * 1024)).toFixed(1);

        speedNum.innerText = finalMbps;
        progBar.style.width = "100%";
        statusText.innerText = `測速完成！總計下載了 ${(downloadedBytes/1024/1024).toFixed(1)} MB 數據`;
    } catch (e) {
        speedNum.innerText = "Error";
        statusText.innerText = "下載流被阻斷，請檢查代理或防火牆設置。";
    }
}

// ==========================================
// 核心三：全球 Top 20 頂級網站速度監測
// ==========================================
const topSites = [
    { url: "https://www.google.com", name: "Google", type: "搜尋引擎 / 全球核心" },
    { url: "https://www.youtube.com", name: "YouTube", type: "影音流媒體" },
    { url: "https://www.facebook.com", name: "Facebook", type: "社交網路" },
    { url: "https://www.wikipedia.org", name: "Wikipedia", type: "百科知識庫" },
    { url: "https://www.instagram.com", name: "Instagram", type: "圖片社交" },
    { url: "https://www.reddit.com", name: "Reddit", type: "歐美網路社區" },
    { url: "https://www.amazon.com", name: "Amazon", type: "跨境電子商務" },
    { url: "https://www.yahoo.com", name: "Yahoo", type: "綜合門戶網路" },
    { url: "https://www.twitter.com", name: "X (Twitter)", type: "即時公共輿情" },
    { url: "https://www.github.com", name: "GitHub", type: "開源代碼托管" },
    { url: "https://www.netflix.com", name: "Netflix", type: "高清影視流媒體" },
    { url: "https://www.microsoft.com", name: "Microsoft", type: "雲服務與系統" },
    { url: "https://www.linkedin.com", name: "LinkedIn", type: "職場社交網路" },
    { url: "https://www.twitch.tv", name: "Twitch", type: "遊戲實況直播" },
    { url: "https://www.apple.com", name: "Apple", type: "生態雲端服務" },
    { url: "https://www.zoom.us", name: "Zoom", type: "遠程視訊會議" },
    { url: "https://www.imdb.com", name: "IMDb", type: "全球影視資料庫" },
    { url: "https://www.pinterest.com", name: "Pinterest", type: "視覺創意分享" },
    { url: "https://www.ebay.com", name: "eBay", type: "線上拍賣購物" },
    { url: "https://www.cloudflare.com", name: "Cloudflare", type: "全球 CDN / 安全邊緣" }
];

function runGlobalSitesTest() {
    const tableBody = document.getElementById("global-sites-table");
    tableBody.innerHTML = "";

    topSites.forEach((site, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>#${index + 1}</strong> ${site.name}</td>
            <td><span style="color:#9ca3af; font-size:0.85rem;">${site.type}</span></td>
            <td><span class="status-badge pending" id="status-${index}">正在探針...</span></td>
            <td id="time-${index}" style="font-variant-numeric: tabular-nums; font-weight:600;">--</td>
        `;
        tableBody.appendChild(row);

        // 利用 Image Object 發起空緩存圖片握手請求，精確計算 RTT 時延（避免跨域阻斷）
        const img = new Image();
        const start = performance.now();
        
        img.onload = () => { updateRow(index, performance.now() - start); };
        img.onerror = () => { updateRow(index, performance.now() - start); };
        
        // 加上隨機數防止瀏覽器快取緩存影響真實結果
        img.src = `${site.url}/favicon.ico?hash=${Math.random()}`;
    });
}

function updateRow(index, duration) {
    const statusBadge = document.getElementById(`status-${index}`);
    const timeTd = document.getElementById(`time-${index}`);
    
    if (duration > 3500) {
        statusBadge.className = "status-badge";
        statusBadge.style.background = "#ef444420";
        statusBadge.style.color = "#f87171";
        statusBadge.innerText = "超時/阻斷";
        timeTd.innerText = "Timeout";
        timeTd.style.color = "#f87171";
    } else {
        statusBadge.className = "status-badge success";
        statusBadge.innerText = "正常連通";
        timeTd.innerText = `${Math.round(duration)} ms`;
        if(duration < 80) timeTd.style.color = "#4ade80"; // 極速線路
        else if(duration < 200) timeTd.style.color = "#fbbf24"; // 普通海外線路
        else timeTd.style.color = "#9ca3af"; // 高延遲線路
    }
}
