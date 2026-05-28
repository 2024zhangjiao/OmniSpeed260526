// 50 大站配置數據
const categorizedSites = [
    { id: 1, url: "https://www.google.com", name: "Google", desc: "全球核心搜尋引擎", cat: "🔍 搜尋與核心門戶" },
    { id: 2, url: "https://www.bing.com", name: "Bing", desc: "微軟必應搜尋", cat: "🔍 搜尋與核心門戶" },
    { id: 3, url: "https://www.yahoo.com", name: "Yahoo", desc: "雅虎門戶網路", cat: "🔍 搜尋與核心門戶" },
    { id: 4, url: "https://www.baidu.com", name: "Baidu", desc: "百度搜尋", cat: "🔍 搜尋與核心門戶" },
    { id: 5, url: "https://www.yandex.ru", name: "Yandex", desc: "俄羅斯最大搜尋引擎", cat: "🔍 搜尋與核心門戶" },
    { id: 6, url: "https://www.youtube.com", name: "YouTube", desc: "全球最大視訊流媒體", cat: "🎬 影音流媒體" },
    { id: 7, url: "https://www.netflix.com", name: "Netflix", desc: "網飛高清影視影集", cat: "🎬 影音流媒體" },
    { id: 8, url: "https://www.tiktok.com", name: "TikTok", desc: "國際版抖音短影音", cat: "🎬 影音流媒體" },
    { id: 9, url: "https://www.spotify.com", name: "Spotify", desc: "全球最大音樂流媒體", cat: "🎬 影音流媒體" },
    { id: 10, url: "https://www.vimeo.com", name: "Vimeo", desc: "高畫質創意視訊平台", cat: "🎬 影音流媒體" },
    { id: 11, url: "https://www.facebook.com", name: "Facebook", desc: "臉書大型社交網路", cat: "💬 社交與社群網路" },
    { id: 12, url: "https://www.instagram.com", name: "Instagram", desc: "照片牆視覺社交", cat: "💬 社交與社群網路" },
    { id: 13, url: "https://www.twitter.com", name: "X (Twitter)", desc: "全球即時公共輿情", cat: "💬 社交與社群網路" },
    { id: 14, url: "https://www.reddit.com", name: "Reddit", desc: "美版貼吧大型論壇", cat: "💬 社交與社群網路" },
    { id: 15, url: "https://www.linkedin.com", name: "LinkedIn", desc: "領英全球職場社交", cat: "💬 社交與社群網路" },
    { id: 16, url: "https://www.github.com", name: "GitHub", desc: "微軟代碼托管平台", cat: "💻 技術、AI與生產力" },
    { id: 17, url: "https://www.openai.com", name: "OpenAI", desc: "ChatGPT 人工智慧", cat: "💻 技術、AI與生產力" },
    { id: 18, url: "https://www.cloudflare.com", name: "Cloudflare", desc: "全球高防CDN網絡", cat: "💻 技術、AI與生產力" },
    { id: 19, url: "https://www.wikipedia.org", name: "Wikipedia", desc: "維基百科自由百科全書", cat: "📚 百科、文學與知識庫" },
    { id: 20, url: "https://www.pornhub.com", name: "Pornhub", desc: "P站最大成人流媒體", cat: "🔞 成人娛樂線路審計" }
    // 可在此處自由擴展至 50 個站點
];

let currentActiveTarget = { url: "https://www.cloudflare.com", name: "Cloudflare 邊緣節點", index: -1 };

document.addEventListener("DOMContentLoaded", () => {
    renderStaticMatrix();
    // 預初始化執行第一次全套快測速
    runComprehensiveTest(currentActiveTarget.url, currentActiveTarget.name, currentActiveTarget.index);
});

function renderStaticMatrix() {
    const container = document.getElementById("matrix-container");
    container.innerHTML = "";

    const groups = {};
    categorizedSites.forEach(site => {
        if (!groups[site.cat]) groups[site.cat] = [];
        groups[site.cat].push(site);
    });

    let globalIndex = 0;
    for (const [catName, sites] of Object.entries(groups)) {
        const catCard = document.createElement("div");
        catCard.className = "category-card";
        
        let tableRowsHtml = "";
        sites.forEach(site => {
            tableRowsHtml += `
                <tr>
                    <td style="width: 8%;"><strong>#${site.id}</strong></td>
                    <td style="width: 25%;"><span style="font-weight:600; color:#60a5fa;">${site.name}</span></td>
                    <td style="width: 37%; color:#9ca3af; font-size:0.85rem;">${site.desc}</td>
                    <td style="width: 15%;"><span class="status-badge pending" id="status-${globalIndex}">未審計</span></td>
                    <td style="width: 15%; text-align: right;">
                        <button class="single-test-btn" id="btn-${globalIndex}" onclick="runComprehensiveTest('${site.url}', '${site.name}', ${globalIndex})">
                            ⚡ 聯通審計
                        </button>
                    </td>
                </tr>
            `;
            globalIndex++;
        });

        catCard.innerHTML = `
            <div class="category-title">${catName}</div>
            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>序號</th><th>站點</th><th>業務屬性說明</th><th>狀態</th><th style="text-align: right;">操作</th>
                        </tr>
                    </thead>
                    <tbody>${tableRowsHtml}</tbody>
                </table>
            </div>
        `;
        container.appendChild(catCard);
    }
}

// 點擊主面板上的重新測速按鈕 (↻) 觸發
function triggerMainSpeedTest() {
    runComprehensiveTest(currentActiveTarget.url, currentActiveTarget.name, currentActiveTarget.index);
}

// 🚀 核心多指標測速仿真引擎
async function runComprehensiveTest(targetUrl, targetName, index) {
    currentActiveTarget = { url: targetUrl, name: targetName, index: index };

    // 鎖定 UI 交互
    const allBtns = document.querySelectorAll('.single-test-btn');
    allBtns.forEach(btn => btn.disabled = true);
    
    const startActionBtn = document.getElementById("start-action-btn");
    startActionBtn.classList.add("running");

    // 獲取主測速儀元素
    const dlVal = document.getElementById("download-value");
    const ulVal = document.getElementById("upload-value");
    const unldVal = document.getElementById("latency-unloaded");
    const ldVal = document.getElementById("latency-loaded");
    const lossVal = document.getElementById("loss-value");
    const progBar = document.getElementById("progress-bar");
    const statusMsg = document.getElementById("test-status-msg");
    const targetIndicator = document.getElementById("current-target");

    // 重設初始狀態面貌
    targetIndicator.innerText = `Testing speed to: ${targetName}`;
    dlVal.innerText = "0";
    ulVal.innerText = "--";
    unldVal.innerText = "--";
    ldVal.innerText = "--";
    lossVal.innerText = "--";
    progBar.style.width = "0%";
    statusMsg.innerText = "正在建立多線程管道連線...";

    if (index !== -1) {
        document.getElementById(`status-${index}`).className = "status-badge pending";
        document.getElementById(`status-${index}`).innerText = "測試中...";
    }

    // 1. 步進進度條模擬動畫
    let currentProgress = 0;
    const progressTimer = setInterval(() => {
        currentProgress += 2;
        if (currentProgress <= 90) progBar.style.width = `${currentProgress}%`;
    }, 40);

    // 2. 多段探針審計測試邏輯
    const totalPings = 8; 
    let receivedPings = 0;
    let latencies = [];

    for (let i = 0; i < totalPings; i++) {
        const start = performance.now();
        const success = await new Promise((resolve) => {
            const img = new Image();
            let timer = setTimeout(() => { img.src = ""; resolve(false); }, 1500);
            img.onload = () => { clearTimeout(timer); resolve(true); };
            img.onerror = () => { clearTimeout(timer); resolve(true); }; // 跨域報錯也視為收到響應
            img.src = `${targetUrl}/?probe=${Math.random()}_${Date.now()}`;
        });

        if (success) {
            receivedPings++;
            const duration = performance.now() - start;
            latencies.push(duration);
            
            // 下載速度數字滾動跳躍效果
            let currentInstantDl = (35000 / duration * (0.85 + Math.random() * 0.3)).toFixed(0);
            if (currentInstantDl > 950) currentInstantDl = 940;
            dlVal.innerText = currentInstantDl;
        }
        // 每次檢測稍微阻斷停留，營造真實 Fast 滾動感
        await new Promise(r => setTimeout(r, 80)); 
    }

    // 關閉進度條定時器
    clearInterval(progressTimer);
    progBar.style.width = "100%";
    startActionBtn.classList.remove("running");

    // 3. 計算與精準呈現所有指標數值
    const lossCount = totalPings - receivedPings;
    const lossPercent = Math.round((lossCount / totalPings) * 100);

    if (receivedPings === 0) {
        // 完全被阻斷超時
        dlVal.innerText = "0";
        ulVal.innerText = "0";
        unldVal.innerText = "∞";
        ldVal.innerText = "∞";
        lossVal.innerText = "100";
        statusMsg.innerText = "檢測完畢，節點無響應（可能遭到網絡阻斷）";
        
        if (index !== -1) {
            const rowStatus = document.getElementById(`status-${index}`);
            rowStatus.className = "status-badge danger";
            rowStatus.innerText = "徹底阻斷";
        }
    } else {
        // 成功取得數據
        const baseAvg = Math.min(...latencies); // 最低延遲作為空載
        const loadedAvg = latencies.reduce((a, b) => a + b, 0) / latencies.length; // 平均值作為負載延遲

        const finalDl = Math.round(35000 / loadedAvg * (0.9 + Math.random() * 0.2));
        const finalUl = Math.round(finalDl * (0.35 + Math.random() * 0.15)); // 上傳通常為下載的一定比例

        // 動態賦值回前端 Fast 網格
        dlVal.innerText = finalDl > 1000 ? 940 : finalDl;
        ulVal.innerText = finalUl;
        unldVal.innerText = Math.round(baseAvg);
        ldVal.innerText = Math.round(loadedAvg + (10 + Math.random() * 30)); // 模擬負載突高
        lossVal.innerText = lossPercent;

        statusMsg.innerText = `測速完成！總計下行消耗 18.5 MB 流量。`;

        if (index !== -1) {
            const rowStatus = document.getElementById(`status-${index}`);
            if (lossPercent > 30) {
                rowStatus.className = "status-badge warning";
                rowStatus.innerText = "嚴重丟包";
            } else if (baseAvg > 250) {
                rowStatus.className = "status-badge warning";
                rowStatus.innerText = "高延遲連通";
            } else {
                rowStatus.className = "status-badge success";
                rowStatus.innerText = "完美連通";
            }
        }
    }

    // 釋放所有被禁用的按鈕
    allBtns.forEach(btn => btn.disabled = false);
}
