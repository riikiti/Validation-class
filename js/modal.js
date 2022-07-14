let modalBtns = [...document.querySelectorAll(".modalTest")];
const body = document.querySelector("body");
modalBtns.forEach(function(btn){
  btn.onclick = function() {
    let modal = btn.getAttribute('data-model');
    document.getElementById(modal).classList.add('modal-open');
    body.classList.add('body-fixed');
  }
});
let closeBtns = [...document.querySelectorAll(".modal-close")];
closeBtns.forEach(function(btn){
  btn.onclick = function() {
    let modal = btn.closest('.modal');
    modal.classList.remove('modal-open');
    body.classList.remove('body-fixed');
  }
});


window.onclick = function(event) {

  if (event.target.classList.contains('modal-open')) {
    console.log('modalTwo');
    event.target.classList.remove('modal-open');
    body.classList.remove('body-fixed');
  }
  if(event.target.classList.contains("send-contact-btn")&&event.target.closest('.modal')){

    let modal=event.target.getAttribute('data-model');
    let height;
      let obj1=event.target.closest('.modal');
      height=getComputedStyle(obj1.querySelector('.modal-content'));
      console.log(height);

    let obj=event.target.closest('.modal');

    obj.classList.remove('modal-open');
    body.classList.remove('body-fixed');
    document.getElementById(modal).classList.add('modal-open');
    //document.getElementById(modal).querySelector('.modal-content').style.height=height.height;
    body.classList.add('body-fixed');
  }
}
