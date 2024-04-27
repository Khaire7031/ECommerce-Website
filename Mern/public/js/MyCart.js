
const myCartLink = document.querySelector('.mycart');
myCartLink.href = `/mycart?userId=${localStorage.getItem("userIdForUse")}`;


