const sections = document.querySelectorAll('section');
const tank = document.getElementById('tank');
for (let section of sections) {
  section.addEventListener('mouseenter', event => {
    const turretDirection = event.target.dataset.turretDirection;
    tank.classList.add(`tank_turret__${turretDirection}`);
  });
  section.addEventListener('mouseleave', event => {
    const turretDirection = event.target.dataset.turretDirection;
    tank.classList.remove(`tank_turret__${turretDirection}`);
  });
}
sections[0].addEventListener('click', () => {
  document.body.classList.add('toggle');
  document.body.classList.remove('toggle1');
});

let lastPos = 0;
const tank_2 = document.getElementById('tank2');
sections[0].addEventListener('scroll', event => {
  tank_2.style.transform = `translateX(${lastPos}px)`;
  let currentTop = event.target.scrollTop;
  lastPos += currentTop / 2 - lastPos;
});
