import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { collection, addDoc, orderBy, query } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { getDocs } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDeWVLLm0qIs9oDDEAazIFUh1u12F9Q23E',
    authDomain: 'sparta-30756.firebaseapp.com',
    projectId: 'sparta-30756',
    storageBucket: 'sparta-30756.appspot.com',
    messagingSenderId: '508837450821',
    appId: '1:508837450821:web:8e1a98d008a69f46723f2c',
    measurementId: 'G-JQG43JKLES',
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//
const dropDownBox = document.querySelector('.dropDownBox');
const main = document.querySelector('.chat__main');
const children = main.children;
const answerBox = document.querySelector('.answer');
const btns = document.querySelectorAll('.btn-q');
const toggleHistory = document.querySelector('.toggleHistory');
const history = document.querySelector('#history');
const historyForm = document.querySelector('.history__form');
const historyInput = document.querySelector('.history__input');
const historyChat = document.querySelector('.history__chat');
let userName = undefined;
let counte = 0;

function removeClickMain() {
    main.removeEventListener('click', onClickMain);
}

function onClickMain() {
    if (children.length === counte + 2) {
        removeClickMain();
    }
    children[counte].classList.remove('hide');
    counte++;
}
main.addEventListener('click', onClickMain);

dropDownBox.addEventListener('click', () => {
    dropDownBox.classList.toggle('active');
});

function onClickBtn(e) {
    const value = e.target.value;
    Array.from(answerBox.children).forEach((children) => {
        children.classList.add('hide');
        if (Array.from(children.classList).includes(value)) {
            children.classList.remove('hide');
        }
    });
}
btns.forEach((btn) => btn.addEventListener('click', onClickBtn));

//

toggleHistory.addEventListener('click', () => {
    if (main.style.overflowY === 'hidden') {
        main.style.overflowY = 'auto';
        main.style.height = '100%';
    } else {
        main.style.overflowY = 'hidden';
        main.style.height = '500px';
    }
    history.classList.toggle('active');
});

historyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    userName = prompt('닉네임을 입력해주세요');
    if (userName === undefined || userName === null || userName.trim() === '') {
        alert('닉네임을 입력해주세요!!!');
        return;
    }
    const value = historyInput.value;
    let doc = {
        userName,
        value,
        timestamp: new Date(),
    };
    await addDoc(collection(db, 'history'), doc);

    historyInput.value = '';
    window.location.reload();
});

let historydoc = await getDocs(collection(db, 'history'), orderBy('timestamp', 'asc'));
let historydocIndex = 1;

historydoc.forEach((doc) => {
    let data = doc.data();
    let ownClass = historydocIndex % 2 === 0 ? 'own' : '';
    const { userName, value } = data;
    historydocIndex++;

    let temp_html = `
    <div class="massage ${ownClass}">
    <div class="massageContent">
        <span class="massageAuthor">${userName}</span>
        <div class="messageInfo">
            <span class="massageBubble">${value}</span>
        </div>
    </div>
    
`;

    historyChat.insertAdjacentHTML('beforeend', temp_html);
});
