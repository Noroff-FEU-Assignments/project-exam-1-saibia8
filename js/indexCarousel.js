let count = 0;
let inc = 0;
let margin = 0;
let slider = document.getElementsByClassName('slider-width')[0];
console.log(slider);
let itemDisplay = 0;
// pagal ekrano ploti kiek elementu rodyti
if (screen.width > 990) {
  itemDisplay = document
    .getElementsByClassName('slider-container')[0]
    .getAttribute('item-display-desktop');
  margin = itemDisplay * 4;
}
if (screen.width > 700 && screen.width < 990) {
  itemDisplay = document
    .getElementsByClassName('slider-container')[0]
    .getAttribute('item-display-tablet');
  margin = itemDisplay * 6.8;
}
if (screen.width > 280 && screen.width < 700) {
  itemDisplay = document
    .getElementsByClassName('slider-container')[0]
    .getAttribute('item-display-mobil');
  margin = itemDisplay * 20;
}
//gauni items kolekcija
let item = document.getElementsByClassName('item');
//gauni kiek parodyti paskutiniam parodyme elementu
let itemLeft = item.length % itemDisplay;
//Kiek slaidu rodyti
let itemSlide = Math.floor(item.length / itemDisplay) - 1;
//kiekvienam itemui padalinti ekrano dydi is versijos 4 ar 3 ar 1 ir priskirti itemui
for (let i = 0; i < item.length; i++) {
  item[i].style.width = screen.width / itemDisplay - margin + 'px';
}
// pastumti slaideri per 4 elementus
function next() {
  if (inc != itemSlide + itemLeft) {
    if (inc === itemSlide) {
      inc = inc + itemLeft;
      count = count - (screen.width / itemDisplay) * itemLeft;
    } else {
      inc++;
      count = count - screen.width;
    }
  }
  slider.style.left = count + 'px';
}
//grazinti slaideri per 4 elementus
function prev() {
  if (inc != 0) {
    if (inc === itemLeft) {
      inc = inc - itemLeft;
      count = count + (screen.width / itemDisplay) * itemLeft;
    } else {
      inc--;
      count = count + screen.width;
    }
  }
  slider.style.left = count + 'px';
}