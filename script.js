// Tab functionality
const tabLabels = [
  'Product Designer',
  'Portfolio',
  'CV',
  'Contacts'
];

const tabs = document.querySelectorAll('.tab');
const siteDynamic = document.querySelector('.site-dynamic');
const sections = document.querySelectorAll('.content-section');

tabs.forEach((tab, idx) => {
  tab.addEventListener('click', () => {
    // Update dynamic site name
    siteDynamic.textContent = tabLabels[idx];

    // Tab selection styling
    tabs.forEach(t => t.classList.remove('selected'));
    tab.classList.add('selected');

    // Show corresponding section
    sections.forEach((section, sidx) => {
      section.classList.toggle('active', sidx === idx);
    });
  });
});

// Set initial selected tab
tabs[0].classList.add('selected');

// Modal functionality
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const closeBtn = document.querySelector('.close-btn');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    modal.style.display = 'block';
    modalTitle.textContent = card.dataset.title;
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal if clicking outside content
window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

document.getElementById('see-all-link').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelectorAll('.tab')[1].click();
});