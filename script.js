document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Spy & Fade In (Top to Bottom Layout)
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-link');
    const trackerLinks = document.querySelectorAll('.tracker-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fade in animation trigger
                entry.target.classList.add('is-visible');

                // Nav update
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });

                // Tracker update
                trackerLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(sec => {
        sectionObserver.observe(sec);
    });

    // Handle manual clicks to prevent abrupt jumps during smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetSec = document.getElementById(targetId);
            if (targetSec) {
                targetSec.classList.add('is-visible');
            }
        });
    });

    trackerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetSec = document.getElementById(targetId);
            if (targetSec) {
                targetSec.classList.add('is-visible');
            }
        });
    });

    // 2. Interactive Background Blob
    const blob = document.getElementById("blob");
    if (blob) {
        document.body.onpointermove = event => {
            const { clientX, clientY } = event;
            blob.animate({
                left: `${clientX}px`,
                top: `${clientY}px`
            }, { duration: 3000, fill: "forwards" });
        }
    }

    // 3. Card Hover Glow Effect
    const cards = document.querySelectorAll(".bento-card");
    const container = document.getElementById("bento");
    if (container) {
        container.onmousemove = e => {
            for (const card of cards) {
                const rect = card.getBoundingClientRect(),
                    x = e.clientX - rect.left,
                    y = e.clientY - rect.top;

                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            }
        };
    }

    // 4. Custom 3D Tilt Effect
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -2;
            const rotateY = ((x - centerX) / centerX) * 2;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // 5. Interactive Milestone Dropdown
    const dropdown = document.getElementById('milestonesDropdown');
    const detailBox = document.getElementById('milestoneDetail');

    const milestoneData = {
        'proposal': `>> PHASE_1_PROPOSAL <br/><br/>
            <strong>Assessment:</strong> Project Proposal<br/>
            <strong>Date:</strong> October 2025<br/><br/>
            The project was initiated by identifying a significant knowledge gap and performing a thorough topic assessment to ensure the feasibility of a creative solution. This phase was successfully concluded through the delivery of a <em>Proposal Presentation</em> and a detailed <em>Proposal Report</em>, which established the formal foundation for the research.`,
        'progress1': `>> PHASE_2_PROGRESS_1 — 50% Completion <br/><br/>
            <strong>Assessment:</strong> Progress Review 1<br/>
            <strong>Date:</strong> January 2026<br/><br/>
            A 50% implementation mark was reached during the first semester of the final year. The initial findings and technical architecture were presented to an expert panel, where the practical application of core computing principles to the specific research problem was demonstrated.`,
        'progress2': `>> PHASE_3_PROGRESS_2 — 90% Completion <br/><br/>
            <strong>Assessment:</strong> Progress Review 2<br/>
            <strong>Date:</strong> March 2026<br/><br/>
            The project was advanced to 90% completion by the second semester. During this milestone, a nearly finalized system was demonstrated, and a critical evaluation of the selected technologies was performed to ensure alignment with industry standards.`,
        'final': `>> PHASE_4_FINAL_VIVA <br/><br/>
            <strong>Assessment:</strong> Final Presentation & Viva<br/>
            <strong>Date:</strong> April 2026<br/><br/>
            The project was concluded with a comprehensive final defense. This involved a technical presentation and a Viva session where the research methodology was justified, the final solution was demonstrated, and in-depth inquiries from the evaluation panel were addressed.`,
        'website': `>> PHASE_5_PROJECT_WEBSITE <br/><br/>
            <strong>Assessment:</strong> Project Website<br/>
            <strong>Date:</strong> April 2026<br/><br/>
            A dedicated Project Website was developed and launched to showcase the project to a wider audience. This platform highlights the features and commercial viability of the project, serving as a digital hub for all related documentation and demonstrations.`,
        'research': `>> PHASE_6_RESEARCH_PAPER <br/><br/>
            <strong>Assessment:</strong> Research Paper<br/>
            <strong>Date:</strong> May 2026<br/><br/>
            A formal Research Paper will be authored to summarize the methodology, results, and novel contributions of the work. This document serves as a professional record of the findings and reflects the ability to communicate complex technical data to the academic community.`,
    };

    const trackerNodes = document.querySelectorAll('.m-node');
    const trackerFill = document.getElementById('trackerFill');
    const order = ['proposal', 'progress1', 'progress2', 'final', 'website', 'research'];

    if (dropdown) {
        dropdown.addEventListener('change', (e) => {
            const val = e.target.value;
            if (milestoneData[val]) {
                detailBox.innerHTML = `<p>${milestoneData[val]}</p>`;
                detailBox.classList.remove('hidden');

                detailBox.animate([
                    { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
                    { opacity: 1, clipPath: 'inset(0 0 0 0)' }
                ], { duration: 600, easing: 'steps(30, end)' });

                // Update horizontal tracker
                const currentIndex = order.indexOf(val);
                if (currentIndex !== -1) {
                    trackerNodes.forEach((node, idx) => {
                        node.classList.remove('active', 'completed');
                        if (idx < currentIndex) node.classList.add('completed');
                        if (idx === currentIndex) node.classList.add('active');
                    });
                    if (trackerFill) {
                        const percentage = (currentIndex / (order.length - 1)) * 100;
                        trackerFill.style.width = `${percentage}%`;
                    }
                }
            }
        });

        // Allow clicking tracker nodes
        trackerNodes.forEach(node => {
            node.addEventListener('click', () => {
                const val = node.getAttribute('data-val');
                dropdown.value = val;
                dropdown.dispatchEvent(new Event('change'));
            });
        });
    }
    // 6. Hide Side Tracker on Footer
    const footer = document.querySelector('.stealth-footer');
    const sideTracker = document.querySelector('.side-tracker');
    if (footer && sideTracker) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    sideTracker.classList.add('hidden-tracker');
                } else {
                    sideTracker.classList.remove('hidden-tracker');
                }
            });
        }, { threshold: 0.1 });
        footerObserver.observe(footer);
    }

    // 7. Search Feature Live Filtering
    const searchInput = document.getElementById('searchInput');
    const sectionsToSearch = document.querySelectorAll('.page-section');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            sectionsToSearch.forEach(section => {
                if (query === '') {
                    // Reset everything if search is empty
                    section.style.display = '';
                    const subItems = section.querySelectorAll('.domain-box, .timeline-item, .glass-id-card');
                    subItems.forEach(item => item.style.display = '');
                    return;
                }

                // Check if the section as a whole contains the query
                const sectionText = section.innerText.toLowerCase();
                const sectionMatches = sectionText.includes(query);

                if (sectionMatches) {
                    section.style.display = '';

                    // Further filter specific sub-items within this section if they exist
                    const subItems = section.querySelectorAll('.domain-box, .timeline-item, .glass-id-card');

                    // Only filter sub-items if the section actually has them, 
                    // and we don't want to hide all sub-items if the section title matched but none of the items did.
                    // Actually, to keep it simple, if the sub-item doesn't match, hide it.
                    let anySubItemVisible = false;

                    subItems.forEach(item => {
                        const itemText = item.innerText.toLowerCase();
                        if (itemText.includes(query)) {
                            item.style.display = '';
                            anySubItemVisible = true;
                        } else {
                            item.style.display = 'none';
                        }
                    });

                    // If it has sub-items but none matched (e.g. query matched section title), show all sub-items
                    if (subItems.length > 0 && !anySubItemVisible) {
                        subItems.forEach(item => item.style.display = '');
                    }

                } else {
                    section.style.display = 'none';
                }
            });
        });
    }
});
