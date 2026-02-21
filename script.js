/**
 * ============================================
 * SCRIPT PRINCIPAL DU PORTFOLIO
 * ============================================
 * Ce fichier gère :
 * - La navigation et le scroll
 * - Le chargement dynamique des projets depuis projects.json
 * - Le chargement dynamique des articles depuis articles.json
 * - Le formulaire de contact
 * - L'affichage du CV
 * ============================================
 */

// ============================================
// VARIABLES GLOBALES
// ============================================
let translations = {};
let currentLang = localStorage.getItem('portfolio-lang') || 'fr';

// ============================================
// INITIALISATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initTranslations();
    initNavigation();
    loadProjects();
    loadArticles();
    initContactForm();
    initCVPreview();
    checkProfileImage();
    initScrollAnimations();
    initLanguageSelector();
});

// ============================================
// NAVIGATION
// ============================================

/**
 * Initialise la navigation (menu hamburger, scroll, active links)
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Menu hamburger pour mobile
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Fermer le menu mobile quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Ajouter la classe 'scrolled' à la navbar au scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mettre à jour le lien actif au scroll
    window.addEventListener('scroll', updateActiveNavLink);

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Met à jour le lien de navigation actif selon la section visible
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// CHARGEMENT DES PROJETS
// ============================================

/**
 * Charge les projets depuis projects.json et les affiche
 */
async function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) {
        console.error('Élément projectsGrid non trouvé');
        return;
    }
    
    try {
        const response = await fetch('projects.json');
        if (!response.ok) {
            throw new Error('Impossible de charger les projets');
        }
        
        const projects = await response.json();
        
        if (projects.length === 0) {
            const noProjectsText = (translations[currentLang] && translations[currentLang].projects && translations[currentLang].projects.noProjects) 
                ? translations[currentLang].projects.noProjects 
                : 'Aucun projet disponible pour le moment.';
            projectsGrid.innerHTML = `<p class="loading">${noProjectsText}</p>`;
            return;
        }
        
        projectsGrid.innerHTML = '';
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
        
    } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
        if (projectsGrid) {
            projectsGrid.innerHTML = `
                <p class="loading" style="color: #ef4444;">
                    Erreur lors du chargement des projets. 
                    Vérifiez que le fichier projects.json existe et est valide.
                </p>
            `;
        }
    }
}

/**
 * Crée une carte de projet à partir des données JSON
 * @param {Object} project - Données du projet
 * @returns {HTMLElement} - Élément HTML de la carte projet
 */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Image du projet
    let imageHTML = '';
    if (project.image) {
        imageHTML = `<img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`;
    }
    imageHTML += `
        <div class="project-image-placeholder" style="display: ${project.image ? 'none' : 'flex'};">
            <i class="fas fa-code"></i>
        </div>
    `;
    
    // Technologies utilisées
    const techTags = project.technologies
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');
    
    // Badge Cardano si applicable
    const cardanoBadge = project.cardano 
        ? '<span class="cardano-badge"><i class="fas fa-coins"></i> Cardano</span>' 
        : '';
    
    // Liens (GitHub et démo)
    const codeText = (translations[currentLang] && translations[currentLang].projects && translations[currentLang].projects.viewCode) 
        ? translations[currentLang].projects.viewCode 
        : 'Code';
    const demoText = (translations[currentLang] && translations[currentLang].projects && translations[currentLang].projects.viewDemo) 
        ? translations[currentLang].projects.viewDemo 
        : 'Démo';
    let linksHTML = '';
    if (project.github) {
        linksHTML += `
            <a href="${project.github}" target="_blank" rel="noopener" class="project-link">
                <i class="fab fa-github"></i> ${codeText}
            </a>
        `;
    }
    if (project.demo) {
        linksHTML += `
            <a href="${project.demo}" target="_blank" rel="noopener" class="project-link secondary">
                <i class="fas fa-external-link-alt"></i> ${demoText}
            </a>
        `;
    }
    
    card.innerHTML = `
        ${imageHTML}
        <div class="project-content">
            <h3 class="project-title">
                ${project.title}
                ${cardanoBadge}
            </h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">${techTags}</div>
            <div class="project-links">${linksHTML}</div>
        </div>
    `;
    
    return card;
}

// ============================================
// CHARGEMENT DES ARTICLES
// ============================================

/**
 * Charge les articles depuis articles.json et les affiche
 */
async function loadArticles() {
    const articlesList = document.getElementById('articlesList');
    
    if (!articlesList) {
        console.error('Élément articlesList non trouvé');
        return;
    }
    
    try {
        const response = await fetch('articles.json');
        if (!response.ok) {
            throw new Error('Impossible de charger les articles');
        }
        
        const articles = await response.json();
        
        if (articles.length === 0) {
            const noArticlesText = (translations[currentLang] && translations[currentLang].articles && translations[currentLang].articles.noArticles) 
                ? translations[currentLang].articles.noArticles 
                : 'Aucun article disponible pour le moment.';
            articlesList.innerHTML = `<p class="loading">${noArticlesText}</p>`;
            return;
        }
        
        articlesList.innerHTML = '';
        articles.forEach(article => {
            const articleItem = createArticleItem(article);
            articlesList.appendChild(articleItem);
        });
        
    } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
        if (articlesList) {
            articlesList.innerHTML = `
                <p class="loading" style="color: #ef4444;">
                    Erreur lors du chargement des articles. 
                    Vérifiez que le fichier articles.json existe et est valide.
                </p>
            `;
        }
    }
}

/**
 * Crée un élément d'article à partir des données JSON
 * @param {Object} article - Données de l'article
 * @returns {HTMLElement} - Élément HTML de l'article
 */
function createArticleItem(article) {
    const item = document.createElement('div');
    item.className = 'article-item';
    
    const readArticleText = (translations[currentLang] && translations[currentLang].articles && translations[currentLang].articles.readArticle) 
        ? translations[currentLang].articles.readArticle 
        : 'Lire l\'article';
    item.innerHTML = `
        <h3 class="article-title">
            <a href="${article.link}" target="_blank" rel="noopener">${article.title}</a>
        </h3>
        <p class="article-description">${article.description}</p>
        <a href="${article.link}" target="_blank" rel="noopener" class="article-link">
            ${readArticleText} <i class="fas fa-arrow-right"></i>
        </a>
    `;
    
    return item;
}

// ============================================
// FORMULAIRE DE CONTACT
// ============================================

/**
 * Initialise le formulaire de contact
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmit(this);
        });
    }
}

/**
 * Gère la soumission du formulaire de contact
 * @param {HTMLFormElement} form - Le formulaire
 */
function handleContactFormSubmit(form) {
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Ici, vous pouvez ajouter l'intégration avec un service d'email
    // Par exemple : EmailJS, Formspree, ou votre propre backend
    
    // Pour l'instant, on simule juste l'envoi
    console.log('Données du formulaire:', data);
    
    // Afficher un message de succès
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
    submitButton.disabled = true;
    submitButton.style.backgroundColor = '#10b981';
    
    // Réinitialiser le formulaire
    form.reset();
    
    // Réinitialiser le bouton après 3 secondes
    setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        submitButton.style.backgroundColor = '';
    }, 3000);
    
    // Note : Pour un vrai envoi d'email, vous devrez configurer un service
    // Exemple avec EmailJS (nécessite une clé API) :
    // emailjs.send('service_id', 'template_id', data, 'user_id')
    //     .then(() => { /* succès */ })
    //     .catch(() => { /* erreur */ });
}

// ============================================
// APERÇU DU CV
// ============================================

/**
 * Initialise l'aperçu du CV
 * Charge le CV automatiquement au chargement de la page
 */
function initCVPreview() {
    const cvPreview = document.getElementById('cvPreview');
    const downloadCvBtn = document.getElementById('downloadCvBtn');
    
    // Nom du fichier CV (avec espace)
    const cvFileName = 'CV Olivier.pdf';
    const cvPath = `assets/cv/${cvFileName}`;
    
    // Encoder l'URL pour l'iframe (les espaces doivent être encodés en %20)
    const encodedPath = cvPath.replace(/ /g, '%20');
    
    // Configurer le lien de téléchargement directement
    if (downloadCvBtn) {
        downloadCvBtn.href = encodedPath;
        downloadCvBtn.download = cvFileName;
        
        // Ajouter un gestionnaire de clic pour forcer le téléchargement si nécessaire
        downloadCvBtn.addEventListener('click', function(e) {
            // Si le téléchargement ne fonctionne pas automatiquement, forcer le téléchargement
            fetch(encodedPath)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = cvFileName;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                })
                .catch(error => {
                    console.error('Erreur lors du téléchargement du CV:', error);
                    // Si le fetch échoue, laisser le navigateur gérer le lien normal
                });
        });
    }
    
    // Charger le CV dans l'iframe
    if (cvPreview) {
        cvPreview.src = encodedPath;
        cvPreview.style.display = 'block';
    }
}

// ============================================
// VÉRIFICATION DE L'IMAGE DE PROFIL
// ============================================

/**
 * Vérifie si l'image de profil existe, sinon affiche le placeholder
 */
function checkProfileImage() {
    const profileImage = document.getElementById('profileImage');
    const profilePlaceholder = document.getElementById('profilePlaceholder');
    
    if (profileImage && profilePlaceholder) {
        profileImage.onerror = function() {
            this.style.display = 'none';
            profilePlaceholder.style.display = 'flex';
        };
        
        // Vérifier si l'image existe
        const img = new Image();
        img.onload = function() {
            profileImage.style.display = 'block';
            profilePlaceholder.style.display = 'none';
        };
        img.onerror = function() {
            profileImage.style.display = 'none';
            profilePlaceholder.style.display = 'flex';
        };
        img.src = profileImage.src;
    }
}

// ============================================
// UTILITAIRES
// ============================================

/**
 * Fonction utilitaire pour formater les dates
 * @param {string} dateString - Date au format ISO
 * @returns {string} - Date formatée
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ============================================
// ANIMATIONS AU SCROLL
// ============================================

/**
 * Initialise les animations au scroll pour les éléments
 */
function initScrollAnimations() {
    // Sélectionner tous les éléments à animer
    const animatedElements = document.querySelectorAll('.section, .skill-category, .project-card, .article-item');
    
    // Créer un Intersection Observer pour détecter quand les éléments entrent dans la vue
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Ajouter un délai progressif pour un effet en cascade
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Ajouter une classe pour les animations spécifiques
                    if (entry.target.classList.contains('skill-category')) {
                        entry.target.style.animation = 'fadeInScale 0.6s ease forwards';
                    } else if (entry.target.classList.contains('project-card')) {
                        entry.target.style.animation = `zoomIn 0.6s ease forwards ${index * 0.1}s`;
                    } else if (entry.target.classList.contains('article-item')) {
                        const isEven = Array.from(entry.target.parentElement.children).indexOf(entry.target) % 2 === 0;
                        entry.target.style.animation = isEven 
                            ? 'slideInLeft 0.6s ease forwards' 
                            : 'slideInRight 0.6s ease forwards';
                    }
                }, index * 100);
                
                // Ne plus observer cet élément une fois animé
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observer tous les éléments
    animatedElements.forEach((element, index) => {
        // Initialiser l'état invisible
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(element);
    });
    
    // Animation spéciale pour l'image de profil
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInScale 0.8s ease forwards';
                    imageObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        imageObserver.observe(aboutImage);
    }
}

// ============================================
// SYSTÈME DE TRADUCTION
// ============================================
// Les variables translations et currentLang sont déjà déclarées en haut du fichier

/**
 * Initialise le système de traduction
 */
async function initTranslations() {
    try {
        const response = await fetch('translations.json');
        if (!response.ok) {
            throw new Error('Impossible de charger les traductions');
        }
        translations = await response.json();
        
        // Appliquer la langue sauvegardée
        changeLanguage(currentLang);
    } catch (error) {
        console.error('Erreur lors du chargement des traductions:', error);
    }
}

/**
 * Change la langue du portfolio
 * @param {string} lang - Code de la langue ('fr' ou 'en')
 */
function changeLanguage(lang) {
    if (!translations[lang]) {
        console.error(`Langue non supportée: ${lang}`);
        return;
    }
    
    currentLang = lang;
    localStorage.setItem('portfolio-lang', lang);
    
    // Mettre à jour l'attribut lang du HTML
    document.documentElement.lang = lang;
    const htmlLang = document.getElementById('htmlLang');
    if (htmlLang) {
        htmlLang.lang = lang;
    }
    
    // Mettre à jour tous les éléments avec data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations[lang];
        
        // Naviguer dans l'objet de traduction
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                value = null;
                break;
            }
        }
        
        if (value) {
            // Si l'élément contient des icônes, préserver le HTML
            if (element.innerHTML.includes('<i class=') || element.innerHTML.includes('<i class="')) {
                const iconMatch = element.innerHTML.match(/<i[^>]*>.*?<\/i>/);
                if (iconMatch) {
                    element.innerHTML = iconMatch[0] + ' ' + value;
                } else {
                    element.textContent = value;
                }
            } else {
                element.textContent = value;
            }
        }
    });
    
    // Mettre à jour l'indicateur de langue
    const currentLangSpan = document.getElementById('currentLang');
    if (currentLangSpan) {
        currentLangSpan.textContent = lang.toUpperCase();
    }
    
    // Fermer le menu déroulant
    const langDropdown = document.getElementById('langDropdown');
    if (langDropdown) {
        langDropdown.classList.remove('active');
    }
    
    // Recharger les projets et articles pour mettre à jour les textes dynamiques
    loadProjects();
    loadArticles();
}

/**
 * Initialise le sélecteur de langue
 */
function initLanguageSelector() {
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    // Toggle du menu déroulant
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });
        
        // Fermer le menu en cliquant ailleurs
        document.addEventListener('click', function() {
            langDropdown.classList.remove('active');
        });
        
        // Empêcher la fermeture en cliquant dans le menu
        langDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Gérer les clics sur les options de langue
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
}

