const dropDownBox = document.querySelector('.dropDownBox');
const main = document.querySelector('main');
const children = main.children;
const answerBox = document.querySelector('.answer');
const btns = document.querySelectorAll('.btn-q');

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
