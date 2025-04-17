// script.js

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn-yellow');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Lorem ipsum dolor sit amet.');
    });
  });
});
