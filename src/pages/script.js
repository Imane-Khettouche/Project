function scrollChallenges(direction) {
  const container = document.querySelector('.challenge-bar');
  const scrollAmount = 300;
  container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

// Toggle القائمة في الموبايل
function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}

// ScrollReveal
ScrollReveal().reveal('.section-title', {
  delay: 200,
  origin: 'bottom',
  distance: '50px',
  duration: 800,
  reset: true,
});

// إضافة مهارة جديدة
function addSkill() {
  const skillContainer = document.getElementById('skills-container');

  const newCard = document.createElement('div');
  newCard.classList.add('skill-card');

  const skillName = prompt("Enter the name of the skill:");
  const skillLevel = prompt("Enter the level (e.g., Beginner, Intermediate, Expert):");

  if (skillName && skillLevel) {
    newCard.innerHTML = `<h3>${skillName}</h3><p>${skillLevel}</p>`;
    skillContainer.appendChild(newCard);
  }
}