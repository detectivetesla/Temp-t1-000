document.addEventListener('DOMContentLoaded', () => {
    // Merchant Data
    const merchants = [
        {
            name: "DSTV",
            category: "entertainment",
            logo: '<img src="Assets/images/dstv-logo.png" alt="DSTV" style="width: 32px; height: 32px; object-fit: contain;">'
        },
        {
            name: "GOTV",
            category: "entertainment",
            logo: '<img src="Assets/images/gotv-logo.png" alt="GOTV" style="width: 32px; height: 32px; object-fit: contain;">'
        },
        {
            name: "Ghana Ports & Harbor Authority",
            category: "government",
            logo: '<img src="Assets/images/ghana-ports-harbor-authority-logo.png" alt="GPHA" style="width: 32px; height: 32px; object-fit: contain;">'
        },
        {
            name: "ECG Ghana",
            category: "utilities",
            logo: '<img src="Assets/images/ecg-ghana-logo.png" alt="ECG Ghana" style="width: 32px; height: 32px; object-fit: contain;">'
        },
        {
            name: "Kwame Nkrumah University of Science and Technology",
            category: "education",
            logo: '<img src="Assets/images/knust-logo.png" alt="KNUT" style="width: 32px; height: 32px; object-fit: contain;">'
        },
        {
            name: "Korle Bu Teaching Hospital",
            category: "healthcare",
            logo: '<img src="Assets/images/korle-bu-teaching-hospital-logo.png" alt="Korle Bu Teaching Hospital" style="width: 32px; height: 32px; object-fit: contain;">'
        },
        {
            name: "Ghana Water Company",
            category: "utilities",
            logo: '<img src="Assets/images/ghana-water-company-logo.png" alt="Ghana Water Company" style="width: 32px; height: 32px; object-fit: contain;">'
        },
        {
            name: "Brainy Bairn School",
            category: "education",
            logo: '<img src="Assets/images/brainy-bairn-school-logo.png" alt="Brainy Bairn School" style="width: 32px; height: 32px; object-fit: contain;">'
        },
        {
            name: "Enterprise Life Insurance",
            category: "insurance",
            logo: '<img src="Assets/images/enterprise-life-insurance-logo.png" alt="Enterprise Life Insurance" style="width: 32px; height: 32px; object-fit: contain;">'
        }
    ];

    const merchantGrid = document.getElementById('merchantGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const toggleMerchants = document.getElementById('toggleMerchants');
    const toggleVirtual = document.getElementById('toggleVirtual');

    // Render Function
    function renderMerchants(filterText = '', filterCategory = 'all') {
        merchantGrid.innerHTML = '';
        
        const filtered = merchants.filter(m => {
            const matchesText = m.name.toLowerCase().includes(filterText.toLowerCase());
            const matchesCategory = filterCategory === 'all' || m.category === filterCategory;
            return matchesText && matchesCategory;
        });

        if(filtered.length === 0) {
            merchantGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #64748b; font-size: 14px;">No merchants found matching your criteria.</div>';
            return;
        }

        filtered.forEach(merchant => {
            const card = document.createElement('div');
            card.className = 'merchant-card';
            card.innerHTML = `
                <div class="card-logo">
                    ${merchant.logo}
                </div>
                <div class="card-title" title="${merchant.name}">
                    ${merchant.name}
                </div>
            `;
            
            // Add click interaction
            card.addEventListener('click', () => {
                const modalOverlay = document.getElementById('paymentModalOverlay');
                const modalLogo = document.getElementById('modalLogo');
                const modalMerchantName = document.getElementById('modalMerchantName');
                
                if (modalOverlay) {
                    modalLogo.innerHTML = merchant.logo;
                    // For the modal display, ensure image paths scale perfectly
                    const imgInLogo = modalLogo.querySelector('img');
                    if(imgInLogo) {
                        imgInLogo.style.width = '48px';
                        imgInLogo.style.height = '48px';
                        imgInLogo.style.objectFit = 'contain';
                    }
                    modalMerchantName.textContent = merchant.name;
                    modalOverlay.classList.add('show');
                } else {
                    alert(`Proceed to payment for: ${merchant.name}`);
                }
            });
            
            merchantGrid.appendChild(card);
        });
    }

    // Initial Render
    renderMerchants();

    // Event Listeners for Filters
    searchInput.addEventListener('input', (e) => {
        renderMerchants(e.target.value, categoryFilter.value);
    });

    categoryFilter.addEventListener('change', (e) => {
        renderMerchants(searchInput.value, e.target.value);
    });

    // Toggle Buttons
    toggleMerchants.addEventListener('click', () => {
        toggleMerchants.classList.add('active');
        toggleVirtual.classList.remove('active');
        renderMerchants(searchInput.value, categoryFilter.value);
    });

    toggleVirtual.addEventListener('click', () => {
        toggleVirtual.classList.add('active');
        toggleMerchants.classList.remove('active');
        merchantGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #64748b; font-size: 14px;"><i class="fa-solid fa-shop" style="font-size: 32px; color: #cbd5e1; margin-bottom: 16px; display: block;"></i>No virtual shops available at the moment.</div>';
    });

    // Mobile Sidebar Drawer Logic
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (menuToggle && sidebarOverlay) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
            sidebarOverlay.classList.toggle('show');
        });

        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('show');
            sidebarOverlay.classList.remove('show');
        });
    }

    // Sidebar Navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active from all
            navItems.forEach(n => n.classList.remove('active'));
            // Add to clicked
            item.classList.add('active');
            
            const view = item.getAttribute('data-view');
            console.log(`Navigated to ${view}`);
            
            // Reset to merchants view when home or merchants is clicked
            if(view === 'home' || view === 'merchants') {
                toggleMerchants.click();
            } else {
                merchantGrid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #64748b; font-size: 14px;">This section is under construction.</div>`;
                toggleMerchants.classList.remove('active');
                toggleVirtual.classList.remove('active');
            }
            
            // Close sidebar on mobile after navigating
            if (window.innerWidth <= 768 && sidebar && sidebarOverlay) {
                sidebar.classList.remove('show');
                sidebarOverlay.classList.remove('show');
            }
        });
    });

    // Header Buttons
    document.getElementById('signinBtn').addEventListener('click', () => {
        alert('Redirecting to Sign In page...');
    });
    
    document.getElementById('registerBtn').addEventListener('click', () => {
        window.location.href = 'register.html';
    });

    // Modal Close Logic
    const paymentModalOverlay = document.getElementById('paymentModalOverlay');
    const modalClose = document.getElementById('modalClose');
    
    if (modalClose && paymentModalOverlay) {
        modalClose.addEventListener('click', () => {
            paymentModalOverlay.classList.remove('show');
        });
        
        // Close when clicking outside the modal container
        paymentModalOverlay.addEventListener('click', (e) => {
            if (e.target === paymentModalOverlay) {
                paymentModalOverlay.classList.remove('show');
            }
        });
    }
});
