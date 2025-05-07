// メニューを配列で表示する
const item=document.querySelector('#item');

const lists=[
    {
        name:'オリジナルハンバーガー',
        com:'有機野菜たっぷりのこだわりバーガー',
        img:'burger.jpg',
        price:650
    },
    {
        name:'ダブルバーガー',
        com:'ボリューム満点',
        img:'d_burger.jpg',
        price:800
    },
    {
        name:'BLTサンド',
        com:'有機野菜とベーコンがベストマッチ',
        img:'BLT.jpg',
        price:700
    },
    {
        name:'ホットドック',
        com:'朝食や軽食にどうぞ',
        img:'hotdog.jpg',
        price:550,
    },
    {
        name:'ポテトフライ',
        com:'セットでお得、おやつにも',
        img:'french.jpg',
        price:450,
    },
    {
        name:'パンケーキ',
        com:'大人気！映えスイーツ',
        img:'pancake.jpg',
        price:750,
    },
    {
        name:'ハンドドリップコーヒー',
        com:'こだわりブレンド',
        img:'coffee.jpg',
        price:500,
    },
    {
        name:'ラテ',
        com:'ふんわりクリーム',
        img:'rate.jpg',
        price:650,
    },
    {
        name:'クリームソーダ',
        com:'アメリカ式クリームソーダ',
        img:'soda.jpg',
        price:500,
    },
    {
        name:'コーラ',
        com:'懐かしい瓶のコーラ',
        img:'cola.jpg',
        price:400,
    }
];

// 画面に表示
for(let i=0 ; i < lists.length ; i++){
    const {name,com,img,price}=lists[i];
    const content=`<div><img src="images/${img}" alt=""><h2>${name}</h2><p>${com}</p><p>${price}円</p></div>`;
    item.insertAdjacentHTML('beforeend',content); 
}


