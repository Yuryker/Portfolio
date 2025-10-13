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

const seeAllLink = document.getElementById('see-all-link');
if (seeAllLink) {
  seeAllLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent page reload or jump
    tabs[1].click();    // Simulate click on the 2nd tab (index 1)
  });
}

const reachOut = document.getElementById('reach-out');
if (reachOut) {
  reachOut.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent page reload or jump
    tabs[3].click();    // Simulate click on the 2nd tab (index 1)
  });
}


const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');

document.querySelectorAll('.portfolio-card').forEach(card => {
  card.addEventListener('click', () => {
    const layout = card.dataset.modalLayout || 'product';
    const title = card.dataset.title || '';
    const description = card.querySelector('.bio-paragraph')?.textContent || '';
    const tag = card.dataset.modalTag || '';
    const customerInfoRaw = card.dataset.modalCustomerInfo || '';
    const customerInfoHTML = customerInfoRaw
      .split('<br>')
      .map(line => `<span>${line.trim()}</span>`)
      .join('');
    const goalsInfoRaw = card.dataset.modalGoalsInfo || '';
    const goalsInfoHTML = goalsInfoRaw
      .split('<br>')
      .map(line => `<span>${line.trim()}</span>`)
      .join('');
    const participationInfoRaw = card.dataset.modalParticipationInfo || '';
    const participationInfoHTML = participationInfoRaw
      .split('<br>')
      .map(line => `<span>${line.trim()}</span>`)
      .join('');
    const heroimage = card.dataset.heroImage || '';
    const externalLink = (card.dataset.externalLink || '').trim();
    const heroExternalLinkCta = card.dataset.externalLinkCta || '';

    // Clear previous content
    modalBody.innerHTML = '';

    // Data section (shared)
    console.log(`customerInfoHTML = "${customerInfoRaw}"`);
    console.log(Boolean(customerInfoRaw));
    const dataSection = document.createElement('div');
    dataSection.className = 'modal-data-section';
    dataSection.innerHTML = `
      <div class="modal-hero">
        <div class="modal-about">
          <div class="modal-about-title">
            <div class="modal-title">${title}</div>
            <div class="modal-industry-tag">
              <p class="modal-industry-label">Industry:</p>
              <p class="modal-industry-value">${tag}</p>
            </div>
          </div>
          ${description ? `<div class="bio-paragraph">${description}</div>` : ''}
          ${customerInfoRaw ? 
            `<div class="modal-textblock">
            <p class="modal-textblock-headline">Customer</p>
            <p class="modal-text">${customerInfoHTML}</p></div>` 
            : ''}
          ${externalLink ? `
            <div class="modal-linkblock">
              <a href="${externalLink}" target="_blank" rel="noopener noreferrer" class="modal-link">
                <div class="external-icon-wrapper">
                  <img src="Assets/icons/external.svg" alt="External link icon">
                </div>
                <div class="section1-works-link">
                  ${heroExternalLinkCta}
                </div>
              </a>
            </div>
          ` : ''}
        </div>
        ${heroimage ? `<img class="modal-hero-image" src="${heroimage}" alt="${title} hero image">` : ''}
      </div>
      ${goalsInfoRaw ? `
        <div class="modal-texts">
          <div class="modal-textblock">
            <p class="modal-textblock-headline">Project goals:</p>
            <p class="modal-text">${goalsInfoHTML}</p>
          </div>
          <div class="modal-textblock">
            <p class="modal-textblock-headline">My participation:</p>
            <p class="modal-text">${participationInfoHTML}</p>
          </div>
        </div>
      ` : ''}
    `;

    modalBody.appendChild(dataSection);

    if (layout === 'product') {
      // Carousel layout
      const mockups = (card.dataset.mockups || '').split(',').map(s => s.trim()).filter(Boolean);
      const captions = (card.dataset.mockupCaptions || '').split(',').map(s => s.trim());

      if (mockups.length) {
        // Create wrapper
        const carouselWrapper = document.createElement('div');
        carouselWrapper.className = 'modal-carousel-wrapper';

        // Carousel
        const carousel = document.createElement('div');
        carousel.className = 'modal-carousel';

        // Caption element
        const captionElem = document.createElement('div');
        captionElem.className = 'carousel-caption';
        captionElem.textContent = captions[0] || '';
        
        // Indicator adding
        const indicatorWrapper = document.createElement('div');
        indicatorWrapper.className = 'carousel-indicator-wrapper';

        mockups.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-indicator-segment';
        if (idx === 0) dot.classList.add('active');
          indicatorWrapper.appendChild(dot);
        });

        mockups.forEach((src, idx) => {
          const img = document.createElement('img');
          img.src = src;
          img.className = 'carousel-image';
          img.style.display = idx === 0 ? '' : 'none';
          carousel.appendChild(img);
        });

        let current = 0;

        // Controls
        if (mockups.length > 1) {
          const prev = document.createElement('button');
          prev.className = 'carousel-prev';
          prev.innerHTML = '<img src="Assets/icons/arrow_left.svg" alt="Previous">';
          const next = document.createElement('button');
          next.className = 'carousel-next';
          next.innerHTML = '<img src="Assets/icons/arrow_right.svg" alt="Next">';

          prev.onclick = () => {
            carousel.children[current].style.display = 'none';
            current = (current - 1 + mockups.length) % mockups.length;
            const indicators = indicatorWrapper.querySelectorAll('.carousel-indicator-segment');
            indicators.forEach((dot, i) => {
              dot.classList.toggle('active', i === current);
            });
            carousel.children[current].style.display = '';
            captionElem.textContent = captions[current] || '';
          };
          next.onclick = () => {
            carousel.children[current].style.display = 'none';
            current = (current + 1) % mockups.length;
            const indicators = indicatorWrapper.querySelectorAll('.carousel-indicator-segment');
            indicators.forEach((dot, i) => {
              dot.classList.toggle('active', i === current);
            });
            carousel.children[current].style.display = '';
            captionElem.textContent = captions[current] || '';
          };

          carouselWrapper.appendChild(prev);
          carouselWrapper.appendChild(next);
        }

        const header = document.createElement('div');
        header.className = 'carousel-header';
        header.textContent = 'Highlights:';

        carouselWrapper.appendChild(header);
        carouselWrapper.appendChild(carousel);
        carouselWrapper.appendChild(captionElem); // Caption below carousel
        carouselWrapper.appendChild(indicatorWrapper); // Indicators below caption
        modalBody.appendChild(carouselWrapper);
      }
    } else if (layout === 'gallery') {
      // Single image layout
      const imgSrc = card.dataset.image;
      if (imgSrc) {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = 'modal-gallery-image';
        modalBody.appendChild(img);
      }
    }

    modal.style.display = 'block';
  });
});

document.querySelectorAll('.works-thumb-wrapper').forEach(wrapper => {
  wrapper.addEventListener('click', () => {
    const targetId = wrapper.dataset.modalTarget;
    const targetCard = document.getElementById(targetId);
    if (targetCard) targetCard.click();
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});

// Filtering and sorting click
document.addEventListener('DOMContentLoaded', function() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const sortTabs = document.querySelectorAll('.sort-tab');
  const content = document.querySelector('.section2-content');
  const allCards = Array.from(document.querySelectorAll('.portfolio-card'));
  const menuToggle = document.getElementById('menu-toggle');
  const filterTabsContainer = document.getElementById('filter-tabs');

  let currentFilter = 'all';
  let currentSort = 'relevant';

  function renderCards() {
  content.innerHTML = '';

  if (currentSort === 'recent') {
    // Sort all cards
    const sorted = [...allCards].sort((a, b) =>
      new Date(b.dataset.date) - new Date(a.dataset.date)
    );

    // Separate out the "special" card
    const specialCard = sorted.find(card => card.dataset.id === 'special');
    const normalCards = sorted.filter(card => card !== specialCard);

    // Group the remaining cards by year
    const groups = {};
    normalCards.forEach(card => {
      const year = new Date(card.dataset.date).getFullYear();
      if (!groups[year]) groups[year] = [];
      groups[year].push(card);
    });

    // Render normal groups
    Object.keys(groups)
      .sort((a, b) => b - a)
      .forEach(year => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'year-group';
        groupDiv.setAttribute('data-year', year);

        const sep = document.createElement('div');
        sep.className = 'year-separator';
        sep.textContent = year;
        groupDiv.appendChild(sep);

        groups[year].forEach(card => groupDiv.appendChild(card));
        content.appendChild(groupDiv);
      });

    // Add special card at the bottom (with custom label)
    if (specialCard) {
      const specialGroup = document.createElement('div');
      specialGroup.className = 'year-group special-group';

      const sep = document.createElement('div');
      sep.className = 'year-separator special-separator';
      sep.textContent = 'Continuous'; // ← Your custom label here

      specialGroup.appendChild(sep);
      specialGroup.appendChild(specialCard);
      content.appendChild(specialGroup);
    }

  } else {
    // Filtered (no year separators)
    let filtered = allCards.filter(card =>
      currentFilter === 'all' || card.dataset.category === currentFilter
    );
    filtered.forEach(card => content.appendChild(card));
  }
}

  // Filter tab click
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      filterTabs.forEach(t => t.classList.remove('selected'));
      this.classList.add('selected');
      currentFilter = this.dataset.filter;
      renderCards();

      // close dropdown on mobile
      filterTabsContainer.classList.remove('open');
    });
  });

  // Mobile menu
  menuToggle.addEventListener('click', () => {
    filterTabsContainer.classList.toggle('open');
  });

  // Sort tab click
  sortTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      sortTabs.forEach(t => t.classList.remove('selected'));
      this.classList.add('selected');
      currentSort = this.dataset.sort;
      renderCards();
      
      if (this.dataset.sort === 'recent') {
        filterTabs.forEach(f => f.classList.add('disabled'));
      } else {
        filterTabs.forEach(f => f.classList.remove('disabled'));
      }
    });
  });

  // Initial render
  renderCards();
});

