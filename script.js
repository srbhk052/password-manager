 // Enhanced particle system
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 25 + 's';
        particle.style.animationDuration = (20 + Math.random() * 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Enhanced copy password function
function copyPassword(password) {
    navigator.clipboard.writeText(password).then(() => {
        const alert = document.getElementById('alert');
        alert.classList.add('show');
        
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            width: 100px;
            height: 100px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        alert.style.position = 'relative';
        alert.appendChild(ripple);
        
        setTimeout(() => {
            alert.classList.remove('show');
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 2500);
    }).catch(err => {
        console.error('Failed to copy password: ', err);
    });
}

// Enhanced delete function with confirmation
function deletePassword(button) {
    const row = button.closest('tr');
    const website = row.children[0].textContent.trim();
    
    if (confirm(`Are you sure you want to delete the password for ${website}?`)) {
        row.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        row.style.opacity = '0';
        row.style.transform = 'translateX(-50px) scale(0.8)';
        row.style.background = 'linear-gradient(90deg, rgba(255, 107, 107, 0.1), rgba(255, 82, 82, 0.1))';
        
        setTimeout(() => {
            row.remove();
        }, 500);
    }
}

// Enhanced add password function
function addPassword(event) {
    event.preventDefault();
    
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Get appropriate icon for website
    const getWebsiteIcon = (site) => {
        const domain = site.toLowerCase();
        if (domain.includes('github')) return '<i class="fab fa-github" style="color: #333;"></i>';
        if (domain.includes('gmail') || domain.includes('google')) return '<i class="fab fa-google" style="color: #ea4335;"></i>';
        if (domain.includes('facebook')) return '<i class="fab fa-facebook" style="color: #1877f2;"></i>';
        if (domain.includes('twitter')) return '<i class="fab fa-twitter" style="color: #1da1f2;"></i>';
        if (domain.includes('linkedin')) return '<i class="fab fa-linkedin" style="color: #0077b5;"></i>';
        if (domain.includes('instagram')) return '<i class="fab fa-instagram" style="color: #e4405f;"></i>';
        return '<i class="fas fa-globe" style="color: #667eea;"></i>';
    };
    
    const tableBody = document.querySelector('#passwordTable tbody');
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td>
            ${getWebsiteIcon(website)}
            ${website}
        </td>
        <td>${username}</td>
        <td>
            <span class="password-field">••••••••••••</span>
            <button class="copy-btn" onclick="copyPassword('${password.replace(/'/g, "\\'")}')">
                <i class="fas fa-copy"></i> Copy
            </button>
        </td>
        <td>
            <button class="delete-btn" onclick="deletePassword(this)">
                <i class="fas fa-trash"></i> Delete
            </button>
        </td>
    `;
    
    // Enhanced add animation
    newRow.style.opacity = '0';
    newRow.style.transform = 'translateY(30px) scale(0.9)';
    newRow.style.background = 'linear-gradient(90deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))';
    tableBody.appendChild(newRow);
    
    setTimeout(() => {
        newRow.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        newRow.style.opacity = '1';
        newRow.style.transform = 'translateY(0) scale(1)';
        newRow.style.background = 'transparent';
    }, 100);
    
    // Clear form with animation
    const form = document.getElementById('passwordForm');
    form.style.transform = 'scale(0.98)';
    setTimeout(() => {
        form.reset();
        form.style.transition = 'transform 0.3s ease';
        form.style.transform = 'scale(1)';
    }, 200);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

// Ripple animation for buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced form validation
function validateForm() {
    const website = document.getElementById('website');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    
    const inputs = [website, username, password];
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff6b6b';
            input.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.1)';
            isValid = false;
        } else {
            input.style.borderColor = '#667eea';
            input.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
        }
    });
    
    return isValid;
}

// Password strength indicator
function checkPasswordStrength(password) {
    let strength = 0;
    const checks = [
        password.length >= 8,
        /[a-z]/.test(password),
        /[A-Z]/.test(password),
        /[0-9]/.test(password),
        /[^a-zA-Z0-9]/.test(password)
    ];
    
    strength = checks.filter(check => check).length;
    
    const colors = ['#ff6b6b', '#ff9f43', '#feca57', '#48dbfb', '#0abde3'];
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    
    return {
        score: strength,
        color: colors[strength - 1] || colors[0],
        label: labels[strength - 1] || labels[0]
    };
}

// Password generator function
function generatePassword(length = 16) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let password = "";
    
    // Ensure at least one character from each category
    const categories = [
        "abcdefghijklmnopqrstuvwxyz",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
        "0123456789",
        "!@#$%^&*()_+-=[]{}|;:,.<>?"
    ];
    
    categories.forEach(category => {
        password += category.charAt(Math.floor(Math.random() * category.length));
    });
    
    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    // Shuffle the password
    return password.split('').sort(() => 0.5 - Math.random()).join('');
}

// Search functionality
function searchPasswords(query) {
    const rows = document.querySelectorAll('#passwordTable tbody tr');
    const searchTerm = query.toLowerCase().trim();
    
    rows.forEach(row => {
        const website = row.children[0].textContent.toLowerCase();
        const username = row.children[1].textContent.toLowerCase();
        
        if (website.includes(searchTerm) || username.includes(searchTerm) || searchTerm === '') {
            row.style.display = '';
            row.style.animation = 'fadeIn 0.3s ease';
        } else {
            row.style.display = 'none';
        }
    });
}

// Export passwords to JSON
function exportPasswords() {
    const rows = document.querySelectorAll('#passwordTable tbody tr');
    const passwords = [];
    
    rows.forEach(row => {
        if (row.style.display !== 'none') {
            passwords.push({
                website: row.children[0].textContent.trim(),
                username: row.children[1].textContent.trim(),
                // Note: In real app, you'd need to store actual passwords securely
                password: "••••••••••••" // Placeholder for security
            });
        }
    });
    
    const dataStr = JSON.stringify(passwords, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `passwords_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Local storage for persistent data (simulation)
const PasswordManager = {
    // Save passwords to localStorage (in real app, this would be encrypted)
    saveToStorage: function() {
        const rows = document.querySelectorAll('#passwordTable tbody tr');
        const passwords = Array.from(rows).map(row => ({
            website: row.children[0].textContent.trim(),
            username: row.children[1].textContent.trim(),
            // In real app, store encrypted password
            id: Date.now() + Math.random()
        }));
        
        console.log('Passwords would be saved (encrypted):', passwords);
        // localStorage.setItem('passwords', JSON.stringify(passwords));
    },
    
    // Load passwords from localStorage
    loadFromStorage: function() {
        // const saved = localStorage.getItem('passwords');
        // if (saved) {
        //     const passwords = JSON.parse(saved);
        //     // Populate table with saved passwords
        // }
        console.log('Passwords would be loaded from secure storage');
    },
    
    // Clear all data
    clearAll: function() {
        if (confirm('Are you sure you want to delete ALL passwords? This action cannot be undone.')) {
            document.querySelector('#passwordTable tbody').innerHTML = '';
            localStorage.removeItem('passwords');
            console.log('All passwords cleared');
        }
    }
};

// Security features
const SecurityManager = {
    // Check for password reuse
    checkPasswordReuse: function(newPassword) {
        const existingPasswords = Array.from(document.querySelectorAll('.copy-btn')).map(btn => {
            // In real app, you'd compare with actual stored passwords
            return btn.onclick.toString().match(/'([^']+)'/)?.[1] || '';
        });
        
        return existingPasswords.includes(newPassword);
    },
    
    // Check for weak passwords in the vault
    auditPasswords: function() {
        const weakPasswords = [];
        const copyButtons = document.querySelectorAll('.copy-btn');
        
        copyButtons.forEach((btn, index) => {
            const password = btn.onclick.toString().match(/'([^']+)'/)?.[1] || '';
            const strength = checkPasswordStrength(password);
            
            if (strength.score < 3) {
                const row = btn.closest('tr');
                const website = row.children[0].textContent.trim();
                weakPasswords.push({ website, strength: strength.label });
            }
        });
        
        return weakPasswords;
    },
    
    // Session timeout (auto-lock)
    initSessionTimeout: function(timeoutMinutes = 30) {
        let timeout;
        
        const resetTimeout = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                alert('Session expired for security. Please refresh to continue.');
                // In real app, this would lock the vault
            }, timeoutMinutes * 60 * 1000);
        };
        
        // Reset timeout on any user activity
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetTimeout, true);
        });
        
        resetTimeout();
    }
};

// Initialize everything when page loads
window.addEventListener('load', () => {
    createParticles();
    initScrollAnimations();
    PasswordManager.loadFromStorage();
    SecurityManager.initSessionTimeout();
    
    // Add ripple effects to buttons
    document.addEventListener('click', (e) => {
        if (e.target.matches('.btn, .copy-btn, .delete-btn')) {
            createRipple(e);
        }
    });
    
    // Add real-time password strength checking
    const passwordInput = document.getElementById('password');
    let strengthIndicator = null;
    
    passwordInput.addEventListener('input', (e) => {
        const password = e.target.value;
        
        if (!strengthIndicator) {
            strengthIndicator = document.createElement('div');
            strengthIndicator.style.cssText = `
                margin-top: 0.5rem;
                padding: 0.5rem;
                border-radius: 8px;
                font-size: 0.8rem;
                font-weight: 600;
                text-align: center;
                transition: all 0.3s ease;
            `;
            passwordInput.parentNode.appendChild(strengthIndicator);
        }
        
        if (password) {
            const strength = checkPasswordStrength(password);
            const isReused = SecurityManager.checkPasswordReuse(password);
            
            strengthIndicator.style.background = strength.color + '20';
            strengthIndicator.style.color = strength.color;
            strengthIndicator.style.border = `1px solid ${strength.color}40`;
            
            let message = `Password Strength: ${strength.label}`;
            if (isReused) {
                message += ' ⚠️ Already used!';
                strengthIndicator.style.borderColor = '#ff6b6b';
            }
            
            strengthIndicator.textContent = message;
            strengthIndicator.style.opacity = '1';
        } else {
            strengthIndicator.style.opacity = '0';
        }
    });
    
    // Add password generator button
    const passwordField = document.getElementById('password');
    const generateBtn = document.createElement('button');
    generateBtn.type = 'button';
    generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate';
    generateBtn.className = 'copy-btn';
    generateBtn.style.marginLeft = '0.5rem';
    generateBtn.onclick = () => {
        const newPassword = generatePassword();
        passwordField.value = newPassword;
        passwordField.dispatchEvent(new Event('input')); // Trigger strength check
    };
    passwordField.parentNode.appendChild(generateBtn);
    
    // Smooth loading animation
    setTimeout(() => {
        document.querySelectorAll('.loading').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 100);
});

// Enhanced keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus website field
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('website').focus();
    }
    
    // Ctrl/Cmd + G to generate password
    if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
        e.preventDefault();
        const passwordField = document.getElementById('password');
        passwordField.value = generatePassword();
        passwordField.dispatchEvent(new Event('input'));
    }
    
    // Ctrl/Cmd + S to save (simulate)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        PasswordManager.saveToStorage();
    }
    
    // Escape to clear form
    if (e.key === 'Escape') {
        document.getElementById('passwordForm').reset();
        document.activeElement.blur();
    }
    
    // F1 for help
    if (e.key === 'F1') {
        e.preventDefault();
        alert(`Keyboard Shortcuts:
        
Ctrl/Cmd + K: Focus website field
Ctrl/Cmd + G: Generate password
Ctrl/Cmd + S: Save passwords
Escape: Clear form
F1: Show this help`);
    }
});

// Auto-save draft functionality
let draftTimer;
document.getElementById('passwordForm').addEventListener('input', () => {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(() => {
        const formData = new FormData(document.getElementById('passwordForm'));
        const draft = Object.fromEntries(formData);
        console.log('Draft saved:', draft);
        // In real app: localStorage.setItem('draft', JSON.stringify(draft));
    }, 1000);
});

// Form submission enhancement
document.getElementById('passwordForm').addEventListener('submit', (e) => {
    if (!validateForm()) {
        e.preventDefault();
        alert('Please fill in all fields correctly.');
        return;
    }
    
    // Save to storage after successful addition
    setTimeout(() => {
        PasswordManager.saveToStorage();
    }, 1000);
});

// Add context menu for table rows
document.addEventListener('contextmenu', (e) => {
    const row = e.target.closest('tr');
    if (row && row.parentNode.tagName === 'TBODY') {
        e.preventDefault();
        
        // Create context menu
        const contextMenu = document.createElement('div');
        contextMenu.style.cssText = `
            position: fixed;
            top: ${e.clientY}px;
            left: ${e.clientX}px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            padding: 0.5rem 0;
            min-width: 150px;
        `;
        
        const menuItems = [
            { text: 'Copy Password', icon: 'fa-copy', action: () => {
                const copyBtn = row.querySelector('.copy-btn');
                copyBtn.click();
            }},
            { text: 'Edit Entry', icon: 'fa-edit', action: () => {
                alert('Edit functionality would open here');
            }},
            { text: 'Delete Entry', icon: 'fa-trash', action: () => {
                const deleteBtn = row.querySelector('.delete-btn');
                deleteBtn.click();
            }}
        ];
        
        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.innerHTML = `<i class="fas ${item.icon}"></i> ${item.text}`;
            menuItem.style.cssText = `
                padding: 0.5rem 1rem;
                cursor: pointer;
                transition: background 0.2s;
            `;
            menuItem.addEventListener('mouseenter', () => {
                menuItem.style.background = '#f5f5f5';
            });
            menuItem.addEventListener('mouseleave', () => {
                menuItem.style.background = 'transparent';
            });
            menuItem.addEventListener('click', () => {
                item.action();
                document.body.removeChild(contextMenu);
            });
            contextMenu.appendChild(menuItem);
        });
        
        document.body.appendChild(contextMenu);
        
        // Remove context menu when clicking elsewhere
        const removeMenu = (event) => {
            if (!contextMenu.contains(event.target)) {
                document.body.removeChild(contextMenu);
                document.removeEventListener('click', removeMenu);
            }
        };
        
        setTimeout(() => {
            document.addEventListener('click', removeMenu);
        }, 100);
    }
});

// Performance monitoring
const PerformanceMonitor = {
    start: performance.now(),
    
    logMetric: function(name, startTime) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`${name}: ${duration.toFixed(2)}ms`);
    },
    
    init: function() {
        window.addEventListener('load', () => {
            this.logMetric('Page Load', this.start);
        });
    }
};

PerformanceMonitor.init();