const photoCards = document.querySelectorAll('.photo-card');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

photoCards.forEach((card) => {
  card.addEventListener('click', (event) => {
    card.classList.toggle('active');
    makeConfetti(event.clientX, event.clientY);
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      card.classList.toggle('active');
      const rect = card.getBoundingClientRect();
      makeConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  });

  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

function makeConfetti(x, y) {
  const colors = ['#ff1493', '#ff7a00', '#ffd6e8', '#111111', '#ffffff'];

  for (let i = 0; i < 18; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.transform = `translate(${Math.random() * 120 - 60}px, ${Math.random() * -60}px)`;
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 950);
  }
}
