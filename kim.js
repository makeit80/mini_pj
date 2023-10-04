const dropDownBox = document.querySelector('.dropDownBox');
const main = document.querySelector('main');
const children = main.children;
let counte = 0;
dropDownBox.addEventListener('click', () => {
    dropDownBox.classList.toggle('active');
});

function removeClickMain() {
    main.removeEventListener('click', onClickMain);
}

function onClickMain() {
    if (children.length === counte + 1) {
        removeClickMain();
    }
    children[counte].classList.remove('hide');
    console.log(children[counte]);
    counte++;
}
main.addEventListener('click', onClickMain);
// main.addEventListener('click', () => {
//     if (children.length === counte) {
//     }
//     children[counte].classList.remove('hide');
//     console.log(children[counte]);
//     counte++;
// });
