document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PROJECT FILTERING ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 2. MODAL LOGIC ---
    const modalOverlay = document.getElementById('project-modal');
    const modalBody = document.querySelector('.modal-body');
    const closeModalBtn = document.querySelector('.close-modal');

    // Open Modal
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Extract the hidden details inside the clicked card
            const title = card.querySelector('.project-title').innerText;
            const category = card.querySelector('.project-category').innerText;
            const hiddenDetails = card.querySelector('.hidden-details').innerHTML;

            // Inject into modal body dynamically
            modalBody.innerHTML = `
                <span class="mono-label" style="color: var(--accent-orange);">${category}</span>
                <h2 style="margin-bottom: 1rem; font-size: 1.8rem;">${title}</h2>
                ${hiddenDetails}
            `;

            // Show modal
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close Modal
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    closeModalBtn.addEventListener('click', closeModal);
    
    // Close when clicking outside the modal content
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // --- 3. COPY EMAIL TO CLIPBOARD ---
    const copyBtn = document.getElementById('copy-email-btn');
    const emailAddress = document.getElementById('email-address').innerText;
    const toast = document.getElementById('copy-toast');

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(emailAddress).then(() => {
            // Show toast notification
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });

    // --- 4. MOBILE MENU TOGGLE (Simple alert for template) ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    mobileBtn.addEventListener('click', () => {
        // You can expand this to toggle a CSS class that shows the .nav-links vertically
        alert("Mobile menu clicked! You can bind this to toggle a vertical navigation class.");
    });
});
