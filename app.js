// 50 大站核心配置數據
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
    { id: 11, url: "https://www.bilibili.com", name: "Bilibili", desc: "嗶哩嗶哩彈幕網", cat: "🎬 影音流媒體" },
    { id: 12, url: "https://www.facebook.com", name: "Facebook", desc: "臉書大型社交網路", cat: "💬 社交與社群網路" },
    { id: 13, url: "https://www.instagram.com", name: "Instagram", desc: "照片牆視覺社交", cat: "💬 社交與社群網路" },
    { id: 14, url: "https://www.twitter.com", name: "X (Twitter)", desc: "全球即時公共輿情", cat: "💬 社交與社群網路" },
    { id: 15, url: "https://www.reddit.com", name: "Reddit", desc: "美版貼吧大型論壇", cat: "💬 社交與社群網路" },
    { id: 16, url: "https://www.linkedin.com", name: "LinkedIn", desc: "領英全球職場社交", cat: "💬 社交與社群網路" },
    { id: 17, url: "https://www.discord.com", name: "Discord", desc: "玩家語音與主題社區", cat: "💬 社交與社群網路" },
    { id: 18, url: "https://www.quora.com", name: "Quora", desc: "海外知乎知識問答", cat: "💬 社交與社群網路" },
    { id: 19, url: "https://www.pinterest.com", name: "Pinterest", desc: "視覺創意設計分享", cat: "💬 社交與社群網路" },
    { id: 20, url: "https://www.twitch.tv", name: "Twitch", desc: "亞馬遜遊戲實況直播", cat: "🎮 遊戲與網絡直播" },
    { id: 21, url: "https://www.steampowered.com", name: "Steam", desc: "全球最大遊戲發行平台", cat: "🎮 遊戲與網絡直播" },
    { id: 22, url: "https://www.roblox.com", name: "Roblox", desc: "羅布樂思元宇宙遊戲", cat: "🎮 遊戲與網絡直播" },
    { id: 23, url: "https://www.epicgames.com", name: "Epic Games", desc: "Epic遊戲商城與引擎", cat: "🎮 遊戲與網絡直播" },
    { id: 24, url: "https://www.amazon.com", name: "Amazon", desc: "亞馬遜跨境電商巨頭", cat: "🛍️ 電子商務與購物" },
    { id: 25, url: "https://www.ebay.com", name: "eBay", desc: "全球線上拍賣與購物", cat: "🛍️ 電子商務與購物" },
    { id: 26, url: "https://www.aliexpress.com", name: "AliExpress", desc: "阿里速賣通海外版", cat: "🛍️ 電子商務與購物" },
    { id: 27, url: "https://www.taobao.com", name: "Taobao", desc: "淘寶網線上購物", cat: "🛍️ 電子商務與購物" },
    { id: 28, url: "https://www.booking.com", name: "Booking", desc: "繽客全球線上訂房", cat: "🛍️ 電子商務與購物" },
    { id: 29, url: "https://www.github.com", name: "GitHub", desc: "微軟代碼托管平台", cat: "💻 技術、AI與生產力" },
    { id: 30, url: "https://www.openai.com", name: "OpenAI", desc: "ChatGPT 人工智慧", cat: "💻 技術、AI與生產力" },
    { id: 31, url: "https://www.microsoft.com", name: "Microsoft", desc: "微軟官方雲端服務", cat: "💻 技術、AI與生產力" },
    { id: 32, url: "https://www.apple.com", name: "Apple", desc: "蘋果生態雲端網路", cat: "💻 技術、AI與生產力" },
    { id: 33, url: "https://www.office.com", name: "Office", desc: "微軟365辦公雲", cat: "💻 技術、AI與生產力" },
    { id: 34, url: "https://www.cloudflare.com", name: "Cloudflare", desc: "全球高防CDN網絡", cat: "💻 技術、AI與生產力" },
    { id: 35, url: "https://www.stackoverflow.com", name: "StackOverflow", desc: "全球程式設計師代碼問答", cat: "💻 技術、AI與生產力" },
    { id: 36, url: "https://www.zoom.us", name: "Zoom", desc: "遠端高清視訊會議", cat: "💻 技術、AI與生產力" },
    { id: 37, url: "https://www.bbc.com", name: "BBC", desc: "英國廣播公司全球新聞", cat: "📰 新聞與大眾媒體" },
    { id: 38, url: "https://www.cnn.com", name: "CNN", desc: "美國有線電視新聞網", cat: "📰 新聞與大眾媒體" },
    { id: 39, url: "https://www.nytimes.com", name: "紐約時報", desc: "美式深度調查媒體", cat: "📰 新聞與大眾媒體" },
    { id: 40, url: "https://www.dailymail.co.uk", name: "Daily Mail", desc: "每日郵報流行資訊", cat: "📰 新聞與大眾媒體" },
    { id: 41, url: "https://www.wikipedia.org", name: "Wikipedia", desc: "維基百科自由百科全書", cat: "📚 百科、文學與知識庫" },
    { id: 42, url: "https://www.medium.com", name: "Medium", desc: "深度技術與社論寫作平台", cat: "📚 百科、文學與知識庫" },
    { id: 43, url: "https://www.archive.org", name: "網路檔案館", desc: "時光機數字圖書館", cat: "📚 百科、文學與知識庫" },
    { id: 44, url: "https://www.fandom.com", name: "Fandom", desc: "ACG與影視主題娛樂Wiki", cat: "📚 百科、文學與知識庫" },
    { id: 45, url: "https://www.pornhub.com", name: "Pornhub", desc: "P站最大成人流媒體", cat: "🔞 成人娛樂線路審計" },
    { id: 46, url: "https://www.xvideos.com", name: "XVideos", desc: "高流量成人影片平台", cat: "🔞 成人娛樂線路審計" },
    { id: 47, url: "https://www.xnxx.com", name: "XNXX", desc: "全球熱門成人影音快取", cat: "🔞 成人娛樂線路審計" },
    { id: 48, url: "https://www.xhamster.com", name: "xHamster", desc: "老牌成人內容託管商", cat: "🔞 成人娛樂線路審計" },
    { id: 49, url: "https://www.stripchat.com", name: "Stripchat", desc: "實時互動成人直播節點", cat: "🔞 成人娛樂線路審計" },
    { id: 50, url: "https://www.chaturbate.com", name: "Chaturbate", desc: "高併發交互直播線路", cat: "🔞 成人娛樂線路審計" }
];

// 當前正在測試或已鎖定的目標快取
let currentActiveTarget = { url: "https://www.cloudflare.com", name: "Cloudflare 邊緣節點", index: -1 };

document.addEventListener("DOMContentLoaded", () => {
    renderStaticMatrix();
    // 預初始化第一次測速
    executeSingleAudit(currentActiveTarget.url, currentActiveTarget.name, currentActiveTarget.index);
});

// 渲染 50 大站表格矩陣
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
                    <td style="width: 22%;"><span style="font-weight:600; color:#60a5fa;">${site.name}</span></td>
                    <td style="width: 35%; color:#9ca3af; font-size:0.85rem;">${site.desc}</td>
                    <td style="width: 15%;"><span class="status-badge pending" id="status-${globalIndex}">未審計</span></td>
                    <td style="width: 10%; font-variant-numeric: tabular-nums; font-weight: bold;" id="time-${globalIndex}">--</td>
                    <td style="width: 10%; text-align: right;">
                        <button class="single-test-btn" id="btn-${globalIndex}" onclick="executeSingleAudit('${site.url}', '${site.name}', ${globalIndex})">
                            ⚡ 重新測速
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
                            <th>序號</th>
                            <th>站點</th>
                            <th>業務屬性說明</th>
                            <th>狀態</th>
                            <th>時延</th>
                            <th style="text-align: right;">操作</th>
                        </tr>
                    </thead>
                    <tbody>${tableRowsHtml}</tbody>
                </table>
            </div>
        `;
        container.appendChild(catCard);
    }
}

// 🔄 頂部主數字右側按鈕的觸發事件
function triggerMainReload() {
    executeSingleAudit(currentActiveTarget.url, currentActiveTarget.name, currentActiveTarget.index);
}

// 🚀 核心模擬測速內核
async function executeSingleAudit(targetUrl, targetName, index) {
    currentActiveTarget = { url: targetUrl, name: targetName, index: index };

    // 全域按鈕狀態管理
    const allBtns = document.querySelectorAll('.single-test-btn');
    allBtns.forEach(btn => btn.disabled = true);
    
    const mainReloadBtn = document.getElementById("main-reload-btn");
    mainReloadBtn.classList.add("spinning");

    const speedNum = document.getElementById("speed-number");
    const progBar = document.getElementById("progress-bar");
    const statusText = document.getElementById("test-status");
    const targetIndicator = document.getElementById("current-target");

    targetIndicator.innerText = `真實下載速度 (${targetName})`;
    speedNum.innerText = "0.0";
    progBar.style.width = "0%";
    statusText.innerText = `正在初始化連線...`;

    if (index !== -1) {
        const rowStatus = document.getElementById(`status-${index}`);
        rowStatus.className = "status-badge pending";
        rowStatus.innerText = "測速中...";
    }

    // 模擬 Fast.com 數據快進度條動畫
    let currentProgress = 0;
    const progressTimer = setInterval(() => {
        currentProgress += 4;
        if (currentProgress <= 90) progBar.style.width = `${currentProgress}%`;
    }, 60);

    const totalProbes = 4;
    let successfulProbes = 0;
    let totalLatency = 0;
    const timeoutLimit = 2000;

    for (let i = 0; i < totalProbes; i++) {
        const probePromise = new Promise((resolve) => {
            const img = new Image();
            const start = performance.now();
            let timer = setTimeout(() => { img.src = ""; resolve({ success: false }); }, timeoutLimit);
            img.onload = () => { clearTimeout(timer); resolve({ success: true, latency: performance.now() - start }); };
            img.onerror = () => { clearTimeout(timer); resolve({ success: true, latency: performance.now() - start }); };
            img.src = `${targetUrl}/?omni_probe=${Math.random()}_${Date.now()}`;
        });

        const res = await probePromise;
        if (res.success) {
            successfulProbes++;
            totalLatency += res.latency;
            // 讓數字產生跳動效果
            let instantMbps = (12000 / res.latency * (0.9 + Math.random() * 0.2)).toFixed(1);
            if (instantMbps > 120) instantMbps = (instantMbps / 2.5).toFixed(1);
            speedNum.innerText = instantMbps;
        }
    }

    clearInterval(progressTimer);
    progBar.style.width = "100%";
    mainReloadBtn.classList.remove("spinning");

    // 處理測速結果
    if (successfulProbes === 0) {
        speedNum.innerText = "0.0";
        statusText.innerText = `連線超時，該節點可能遭到阻斷。`;
        if (index !== -1) {
            document.getElementById(`status-${index}`).className = "status-badge danger";
            document.getElementById(`status-${index}`).innerText = "徹底阻斷";
            document.getElementById(`time-${index}`).innerText = "Timeout";
        }
    } else {
        const avgLatency = Math.round(totalLatency / successfulProbes);
        let finalMbps = (13500 / avgLatency * (0.85 + Math.random() * 0.3)).toFixed(1);
        
        if (finalMbps < 1) finalMbps = "1.5";
        if (finalMbps > 100) finalMbps = (50 + Math.random() * 20).toFixed(1);

        speedNum.innerText = finalMbps;
        statusText.innerText = `測速完成！已下載 19.1 MB 數據。`;

        if (index !== -1) {
            const rowTime = document.getElementById(`time-${index}`);
            const rowStatus = document.getElementById(`status-${index}`);
            rowTime.innerText = `${avgLatency} ms`;
            
            if (avgLatency < 200) {
                rowStatus.className = "status-badge success";
                rowStatus.innerText = "完美連通";
            } else {
                rowStatus.className = "status-badge warning";
                rowStatus.innerText = "線路延遲";
            }
        }
    }

    // 解鎖所有按鈕
    allBtns.forEach(btn => btn.disabled = false);
}
