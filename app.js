document.addEventListener("DOMContentLoaded", async () => {
    await runIpSbEngine();
    await runFastEngine();
    renderAndStartMatrixTest();
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
    const targetUrl = "https://speed.cloudflare.com/__down?bytes=20000000&cb=" + Date.now();
    const startTime = performance.now();
    let downloadedBytes = 0;

    try {
        const response = await fetch(targetUrl);
        if (!response.body) throw new Error();
        const reader = response.body.getReader();

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
        statusText.innerText = "下載流被阻斷，請檢查網絡環境。";
    }
}

// ==========================================
// 核心三：全球 50 大站（精準大板塊分類數據庫）
// ==========================================
const categorizedSites = [
    // 1. 搜尋與門戶
    { id: 1, url: "https://www.google.com", name: "Google", desc: "全球核心搜尋引擎", cat: "🔍 搜尋與核心門戶" },
    { id: 2, url: "https://www.bing.com", name: "Bing", desc: "微軟必應搜尋", cat: "🔍 搜尋與核心門戶" },
    { id: 3, url: "https://www.yahoo.com", name: "Yahoo", desc: "雅虎門戶網路", cat: "🔍 搜尋與核心門戶" },
    { id: 4, url: "https://www.baidu.com", name: "Baidu", desc: "百度搜尋", cat: "🔍 搜尋與核心門戶" },
    { id: 5, url: "https://www.yandex.ru", name: "Yandex", desc: "俄羅斯最大搜尋引擎", cat: "🔍 搜尋與核心門戶" },

    // 2. 影音流媒體
    { id: 6, url: "https://www.youtube.com", name: "YouTube", desc: "全球最大視訊流媒體", cat: "🎬 影音流媒體" },
    { id: 7, url: "https://www.netflix.com", name: "Netflix", desc: "網飛高清影視影集", cat: "🎬 影音流媒體" },
    { id: 8, url: "https://www.tiktok.com", name: "TikTok", desc: "國際版抖音短影音", cat: "🎬 影音流媒體" },
    { id: 9, url: "https://www.spotify.com", name: "Spotify", desc: "全球最大音樂流媒體", cat: "🎬 影音流媒體" },
    { id: 10, url: "https://www.vimeo.com", name: "Vimeo", desc: "高畫質創意視訊平台", cat: "🎬 影音流媒體" },
    { id: 11, url: "https://www.bilibili.com", name: "Bilibili", desc: "嗶哩嗶哩彈幕網", cat: "🎬 影音流媒體" },

    // 3. 社交網路
    { id: 12, url: "https://www.facebook.com", name: "Facebook", desc: "臉書大型社交網路", cat: "💬 社交與社群網路" },
    { id: 13, url: "https://www.instagram.com", name: "Instagram", desc: "照片牆視覺社交", cat: "💬 社交與社群網路" },
    { id: 14, url: "https://www.twitter.com", name: "X (Twitter)", desc: "全球即時公共輿情", cat: "💬 社交與社群網路" },
    { id: 15, url: "https://www.reddit.com", name: "Reddit", desc: "美版貼吧大型論壇", cat: "💬 社交與社群網路" },
    { id: 16, url: "https://www.linkedin.com", name: "LinkedIn", desc: "領英全球職場社交", cat: "💬 社交與社群網路" },
    { id: 17, url: "https://www.discord.com", name: "Discord", desc: "玩家語音與主題社區", cat: "💬 社交與社群網路" },
    { id: 18, url: "https://www.quora.com", name: "Quora", desc: "海外知乎知識問答", cat: "💬 社交與社群網路" },
    { id: 19, url: "https://www.pinterest.com", name: "Pinterest", desc: "視覺創意設計分享", cat: "💬 社交與社群網路" },

    // 4. 遊戲與直播
    { id: 20, url: "https://www.twitch.tv", name: "Twitch", desc: "亞馬遜遊戲實況直播", cat: "🎮 遊戲與網絡直播" },
    { id: 21, url: "https://www.steampowered.com", name: "Steam", desc: "全球最大遊戲發行平台", cat: "🎮 遊戲與網絡直播" },
    { id: 22, url: "https://www.roblox.com", name: "Roblox", desc: "羅布樂思元宇宙遊戲", cat: "🎮 遊戲與網絡直播" },
    { id: 23, url: "https://www.epicgames.com", name: "Epic Games", desc: "Epic遊戲商城與引擎", cat: "🎮 遊戲與網絡直播" },

    // 5. 電子商務與購物
    { id: 24, url: "https://www.amazon.com", name: "Amazon", desc: "亞馬遜跨境電商巨頭", cat: "🛍️ 電子商務與購物" },
    { id: 25, url: "https://www.ebay.com", name: "eBay", desc: "全球線上拍賣與購物", cat: "🛍️ 電子商務與購物" },
    { id: 26, url: "https://www.aliexpress.com", name: "AliExpress", type: "阿里速賣通海外版", cat: "🛍️ 電子商務與購物" },
    { id: 27, url: "https://www.taobao.com", name: "Taobao", desc: "淘寶網線上購物", cat: "🛍️ 電子商務與購物" },
    { id: 28, url: "https://www.booking.com", name: "Booking", desc: "繽客全球線上訂房", cat: "🛍️ 電子商務與購物" },

    // 6. 技術、AI與生產力
    { id: 29, url: "https://www.github.com", name: "GitHub", desc: "微軟代碼托管平台", cat: "💻 技術、AI與生產力" },
    { id: 30, url: "https://www.openai.com", name: "OpenAI", desc: "ChatGPT 人工智慧", cat: "💻 技術、AI與生產力" },
    { id: 31, url: "https://www.microsoft.com", name: "Microsoft", desc: "微軟官方雲端服務", cat: "💻 技術、AI與生產力" },
    { id: 32, url: "https://www.apple.com", name: "Apple", desc: "蘋果生態雲端網路", cat: "💻 技術、AI與生產力" },
    { id: 33, url: "https://www.office.com", name: "Office", desc: "微軟365辦公雲", cat: "💻 技術、AI與生產力" },
    { id: 34, url: "https://www.cloudflare.com", name: "Cloudflare", desc: "全球高防CDN網絡", cat: "💻 技術、AI與生產力" },
    { id: 35, url: "https://www.stackoverflow.com", name: "StackOverflow", desc: "全球程式設計師代碼問答", cat: "💻 技術、AI與生產力" },
    { id: 36, url: "https://www.zoom.us", name: "Zoom", desc: "遠端高清視訊會議", cat: "💻 技術、AI與生產力" },

    // 7. 新聞與大眾媒體
    { id: 37, url: "https://www.bbc.com", name: "BBC", desc: "英國廣播公司全球新聞", cat: "📰 新聞與大眾媒體" },
    { id: 38, url: "https://www.cnn.com", name: "CNN", desc: "美國有線電視新聞網", cat: "📰 新聞與大眾媒體" },
    { id: 39, url: "https://www.nytimes.com", name: "紐約時報", desc: "美式深度調查媒體", cat: "📰 新聞與大眾媒體" },
    { id: 40, url: "https://www.dailymail.co.uk", name: "Daily Mail", desc: "每日郵報流行資訊", cat: "📰 新聞與大眾媒體" },

    // 8. 百科、文學與知識庫
    { id: 41, url: "https://www.wikipedia.org", name: "Wikipedia", desc: "維基百科自由百科全書", cat: "📚 百科、文學與知識庫" },
    { id: 42, url: "https://www.medium.com", name: "Medium", desc: "深度技術與社論寫作平台", cat: "📚 百科、文學與知識庫" },
    { id: 43, url: "https://www.archive.org", name: "網路檔案館", desc: "時光機數字圖書館", cat: "📚 百科、文學與知識庫" },
    { id: 44, url: "https://www.fandom.com", name: "Fandom", desc: "ACG與影視主題娛樂Wiki", cat: "📚 百科、文學與知識庫" },

    // 9. 成人娛樂（特殊審計線路）
    { id: 45, url: "https://www.pornhub.com", name: "Pornhub", desc: "P站最大成人流媒體", cat: "🔞 成人娛樂線路審計" },
    { id: 46, url: "https://www.xvideos.com", name: "XVideos", desc: "高流量成人影片平台", cat: "🔞 成人娛樂線路審計" },
    { id: 47, url: "https://www.xnxx.com", name: "XNXX", desc: "全球熱門成人影音快取", cat: "🔞 成人娛樂線路審計" },
    { id: 48, url: "https://www.xhamster.com", name: "xHamster", desc: "老牌成人內容託管商", cat: "🔞 成人娛樂線路審計" },
    { id: 49, url: "https://www.stripchat.com", name: "Stripchat", desc: "實時互動成人直播節點", cat: "🔞 成人娛樂線路審計" },
    { id: 50, url: "https://www.chaturbate.com", name: "Chaturbate", desc: "高併發交互直播線路", cat: "🔞 成人娛樂線路審計" }
];

function renderAndStartMatrixTest() {
    const container = document.getElementById("matrix-container");
    container.innerHTML = "";

    // 1. 利用 Map 對數據進行高效率的分組排序
    const groups = {};
    categorizedSites.forEach(site => {
        if (!groups[site.cat]) groups[site.cat] = [];
        groups[site.cat].push(site);
    });

    // 2. 動態生成分類表格卡片
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
                    <td style="width: 35%; color:#9ca3af; font-size:0.8rem;">${site.desc}</td>
                    <td style="width: 15%;"><span class="status-badge pending" id="status-${globalIndex}">隊列中...</span></td>
                    <td style="width: 10%; font-variant-numeric: tabular-nums;" id="time-${globalIndex}">--</td>
                    <td style="width: 10%; font-variant-numeric: tabular-nums;" id="loss-${globalIndex}">--</td>
                </tr>
            `;
            // 閉包綁定探針
            triggerProbe(site.url, globalIndex);
            globalIndex++;
        });

        catCard.innerHTML = `
            <div class="category-title">${catName}</div>
            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>序號</th><th>站點</th><th>業務屬性说明</th><th>狀態</th><th>時延</th><th>丟包</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRowsHtml}
                    </tbody>
                </table>
            </div>
        `;
        container.appendChild(catCard);
    }
}

async function triggerProbe(url, index) {
    const totalProbes = 5;
    let successfulResponses = 0;
    let totalLatency = 0;
    const timeoutLimit = 2000;

    for (let i = 0; i < totalProbes; i++) {
        const singleProbe = new Promise((resolve) => {
            const img = new Image();
            const start = performance.now();
            let timer = setTimeout(() => { img.src = ""; resolve({ success: false }); }, timeoutLimit);
            img.onload = () => { clearTimeout(timer); resolve({ success: true, latency: performance.now() - start }); };
            img.onerror = () => { clearTimeout(timer); resolve({ success: true, latency: performance.now() - start }); };
            img.src = `${url}/favicon.ico?cb=${Math.random()}_p_${index}_${i}`;
        });

        const result = await singleProbe;
        if (result.success) { successfulResponses++; totalLatency += result.latency; }
    }

    const lossRate = ((totalProbes - successfulResponses) / totalProbes) * 100;
    const avgLatency = successfulResponses > 0 ? Math.round(totalLatency / successfulResponses) : 0;

    const statusBadge = document.getElementById(`status-${index}`);
    const timeTd = document.getElementById(`time-${index}`);
    const lossTd = document.getElementById(`loss-${index}`);

    if(!statusBadge || !timeTd || !lossTd) return; // 防禦性檢查

    lossTd.innerText = `${lossRate}%`;

    if (lossRate === 100) {
        statusBadge.className = "status-badge danger"; statusBadge.innerText = "徹底阻斷";
        timeTd.innerText = "Timeout"; timeTd.style.color = "#f87171"; lossTd.style.color = "#f87171";
    } else {
        if (lossRate > 0) { statusBadge.className = "status-badge warning"; statusBadge.innerText = "線路抖動"; lossTd.style.color = "#fbbf24"; }
        else { statusBadge.className = "status-badge success"; statusBadge.innerText = "完美連通"; lossTd.style.color = "#4ade80"; }
        timeTd.innerText = `${avgLatency} ms`;
        if (avgLatency < 80) timeTd.style.color = "#4ade80";
        else if (avgLatency < 220) timeTd.style.color = "#fbbf24";
        else timeTd.style.color = "#9ca3af";
    }
}
