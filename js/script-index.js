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

//   営業状態が変わるまでの時間を表示する
function timeUntilchange(now, openHour, closeHour){
    let targetTime;

    if (isOpen(now, openHour, closeHour)) {
        // 閉店の時間
        targetTime = new Date(now);
        targetTime.setHours(closeHour, 0, 0, 0);
      } else {
        targetTime = new Date(now);

        while (true) {
          targetTime.setDate(targetTime.getDate() + 1); // 翌日にする
    
          // 水曜でなければ翌日開店の時間
          if (targetTime.getDay() !== 3) {
            targetTime.setHours(openHour, 0, 0, 0);
            break;
          }
        }
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
    const { hours, minutes } = timeUntilchange(now,openHour, closeHour);

    //　営業時間内の表示 
    if(isOpen(now, openHour, closeHour)){
        statusElem.textContent="ただいま営業中です";
        tooltipElem.textContent=`あと ${hours}時間 ${minutes}分で閉店`;
        statusElem.style.color = '#599594';
    // 営業時間外の表示
    }else{
        statusElem.textContent="ただいま営業時間外です";
        tooltipElem.textContent=`あと ${hours}時間 ${minutes}分で開店`;
        statusElem.style.color = '#cb452a';
  }
}
// 1分ごとに更新
updateStatus();
setInterval(updateStatus, 60000);


