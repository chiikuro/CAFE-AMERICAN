const openHour = 10;
const closeHour = 20;
const now = new Date();
const currentTime = now.getTime();
const currentHour = now.getHours();
const currentMinute = now.getMinutes();

const statusElem = document.querySelector("#status");
const tooltipElem = document.querySelector("#tooltip");

//  営業状態
function isOpen(now, openHour, closeHour) {
    // 水曜定休日の設定
    if (now.getDay() === 3) {
        return false; 
      }

    const open = new Date(now);
    open.setHours(openHour, 0, 0, 0);
  
    const close = new Date(now);
    close.setHours(closeHour, 0, 0, 0);

    //　営業の判定
    return now >= open && now < close; 
  }

function timeUntilchange(now, openHour, closeHour) {
    const today = new Date(now);
    const openTime = new Date(today);
    const closeTime = new Date(today);
    openTime.setHours(openHour, 0, 0, 0);
    closeTime.setHours(closeHour, 0, 0, 0);

    let targetTime;

    // 火曜の閉店後〜水曜終日は、木曜10:00までカウントダウン
    if (
        (now.getDay() === 2 && now >= closeTime) || // 火曜20時以降
        now.getDay() === 3 // 水曜
    ) {
        targetTime = new Date(now);
        // 木曜まで日付を進める
        do {
            targetTime.setDate(targetTime.getDate() + 1);
        } while (targetTime.getDay() !== 4); // 木曜までループ

        targetTime.setHours(openHour, 0, 0, 0);
    } else if (now < openTime) {
        // 営業開始前 → 今日の開店時間まで
        targetTime = openTime;
    } else if (now >= openTime && now < closeTime) {
        // 営業中 → 今日の閉店時間まで
        targetTime = closeTime;
    } else {
        // 通常の営業終了後（定休日ではない）→ 次の営業日10:00
        targetTime = new Date(now);
        do {
            targetTime.setDate(targetTime.getDate() + 1);
        } while (targetTime.getDay() === 3); // 水曜はスキップ

        targetTime.setHours(openHour, 0, 0, 0);
    }

    //  営業状態変更までの時間を計算
    const diffMs = targetTime - now;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
}

// 表示
  function updateStatus() {
    const now = new Date();
    const { hours, minutes } = timeUntilchange(now, openHour, closeHour);

    if (now.getDay() === 3) {
        // 水曜は定休日表示
        statusElem.textContent = "本日は定休日です";
        tooltipElem.textContent = `木曜10:00までお待ちください`;
        statusElem.style.color = '#7e6a9f';
        //　営業時間内の表示 
    } else if (isOpen(now, openHour, closeHour)) {
        statusElem.textContent = "ただいま営業中です";
        tooltipElem.textContent = `あと ${hours}時間 ${minutes}分で閉店`;
        statusElem.style.color = '#599594';
        // 営業時間外の表示
    } else {
        statusElem.textContent = "ただいま営業時間外です";
        tooltipElem.textContent = `あと ${hours}時間 ${minutes}分で開店`;
        statusElem.style.color = '#cb452a';
    }
}

// 1分ごとに更新
updateStatus();
setInterval(updateStatus, 60000);


