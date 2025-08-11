// 血钱游戏网站 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initFAQ();
    initMobileNav();
    initSmoothScrolling();
    initScrollEffects();
    initButtonHandlers();
});

// FAQ 功能 - 现在默认展开，无需折叠功能
function initFAQ() {
    // FAQ内容现在默认展开，不需要JavaScript交互
    console.log('FAQ section loaded with expanded content');
}

// 移动端导航
function initMobileNav() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navCta = document.querySelector('.nav__cta');
    
    if (!navToggle) return;
    
    navToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        this.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
            // Show mobile menu
            navMenu.style.display = 'flex';
            navCta.style.display = 'block';
            
            // Animate toggle button
            this.classList.add('nav__toggle--active');
        } else {
            // Hide mobile menu
            navMenu.style.display = 'none';
            navCta.style.display = 'none';
            
            // Reset toggle button
            this.classList.remove('nav__toggle--active');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.style.display = 'none';
            navCta.style.display = 'none';
            navToggle.classList.remove('nav__toggle--active');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.style.display = 'flex';
            navCta.style.display = 'block';
            navToggle.classList.remove('nav__toggle--active');
            navToggle.setAttribute('aria-expanded', 'false');
        } else {
            navMenu.style.display = 'none';
            navCta.style.display = 'none';
        }
    });
}

// 导航链接平滑滚动
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navToggle = document.querySelector('.nav__toggle');
                if (navToggle && navToggle.getAttribute('aria-expanded') === 'true') {
                    navToggle.click();
                }
            }
        });
    });
}

// 滚动效果
function initScrollEffects() {
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature__card, .step__card, .reason__card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 按钮处理
function initButtonHandlers() {
    // Button handlers removed - no hero buttons present
    
    // Navigation CTA button
    const navCta = document.querySelector('.nav__cta');
    if (navCta) {
        navCta.addEventListener('click', function() {
            // Scroll to the game iframe in hero section
            const heroGameFrame = document.querySelector('.hero__game-frame');
            if (heroGameFrame) {
                heroGameFrame.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Add a subtle highlight effect
                navCta.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    navCta.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }
}

// 实用函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 滚动事件性能优化
const optimizedScrollHandler = debounce(function() {
    // 在这里添加任何基于滚动的优化
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// 添加加载动画
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 添加简单的加载动画
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    
    // 页面加载后移除加载器
    setTimeout(() => {
        if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
        }
    }, 500);
});

// 为加载器添加 CSS（如果你想要样式化它）
const loaderStyles = `
.page-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.3s ease;
}

.loader-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

// 注入加载器样式
const styleSheet = document.createElement('style');
styleSheet.textContent = loaderStyles;
document.head.appendChild(styleSheet);

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 控制台欢迎消息
console.log(`
🎮 欢迎来到血钱游戏！🎮

准备好体验终极策略游戏了吗？
这个网站使用现代网络技术构建，完全响应式。

特色：
✅ 所有设备的响应式设计
✅ 使用 CSS 变量的现代 CSS
✅ 流畅的动画和过渡
✅ 无障碍功能
✅ SEO 优化结构

游戏愉快！🚀
`);

// 视频模态框功能
function initVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const closeVideoModal = document.getElementById('closeVideoModal');
    const trailerVideo = document.getElementById('trailerVideo');
    
    // Video modal functionality removed - no trailer button present
    
    if (closeVideoModal && videoModal) {
        closeVideoModal.addEventListener('click', function() {
            videoModal.classList.remove('active');
            trailerVideo.src = ''; // Clear video source
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    // Close modal when clicking outside
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                trailerVideo.src = '';
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            videoModal.classList.remove('active');
            trailerVideo.src = '';
            document.body.style.overflow = '';
        }
    });
}
