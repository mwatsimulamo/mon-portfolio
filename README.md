# Portfolio – Olivier Mwatsimulamo

Portfolio professionnel responsive (HTML, CSS, JavaScript vanilla), orienté UI/UX, Web3 et écosystème Cardano. Prêt pour déploiement sur **GitHub** et **Vercel**.

---

## 🛠 Technologies utilisées

| Catégorie | Technologie | Usage |
|-----------|-------------|--------|
| **Frontend** | HTML5 | Structure sémantique, accessibilité |
| | CSS3 | Variables CSS, Grid, Flexbox, animations, responsive |
| | JavaScript (ES6+) | Logique métier, chargement dynamique, i18n |
| **Polices & icônes** | [Google Fonts – Inter](https://fonts.google.com/specimen/Inter) | Typographie principale |
| | [Font Awesome 6.4](https://fontawesome.com/) | Icônes (réseaux, UI) |
| **Données** | JSON | `projects.json`, `articles.json`, `experiences.json`, `skills.json`, `translations.json` |
| **Formulaire contact** | [Formspree](https://formspree.io/) | Envoi des messages par email (sans backend) |
| **Hébergement** | Vercel | Déploiement et CDN (recommandé) |
| **Contrôle de version** | Git / GitHub | Code source et déploiement continu |

---

## ✨ Fonctionnalités

- **Design** : Mise en page responsive, thème clair, couleurs Cardano.
- **Sections** : Accueil, À propos, Expériences, Compétences, Projets, Articles, CV, Contact.
- **Contenu dynamique** : Projets, articles et expériences chargés depuis des JSON (+ ajout local en mode admin).
- **Multilingue** : Français / English via `translations.json`.
- **Mode admin** (protégé par mot de passe) : Ajout / édition / suppression d’articles, projets et expériences ; export JSON.
- **Descriptions enrichies** : Paragraphes, **gras**, *italique*, souligné, listes à puces.
- **Contact** : Formulaire relié à Formspree ; liens Email, WhatsApp, Telegram, LinkedIn, X, GitHub.
- **UX** : Toasts, “Voir plus” / “Voir moins” (3 premiers articles/expériences), scroll fluide, animations au scroll.

---

## 📁 Structure du projet

```
mwatsimuamo-portfolio/
├── index.html              # Page principale
├── style.css                # Styles globaux
├── script.js                 # Logique (navigation, chargement, admin, i18n, contact)
├── translations.json         # Textes FR / EN
├── projects.json            # Données projets
├── articles.json            # Données articles
├── experiences.json         # Données expériences
├── skills.json              # Données compétences
├── package.json             # Scripts npm (serveur local)
├── server.js                # Serveur HTTP local (optionnel)
├── vercel.json              # Config Vercel (headers, static)
├── .gitignore
├── README.md
├── LICENSE
└── assets/
    ├── images/              # profile.jpg, projets, etc.
    └── cv/                  # CV au format PDF
```

---

## 🚀 Lancer en local

```bash
# Cloner le dépôt
git clone https://github.com/votre-username/mwatsimuamo-portfolio.git
cd mwatsimuamo-portfolio

# Optionnel : serveur local (évite les soucis CORS avec les JSON)
npm install   # si besoin
npm run dev
# Puis ouvrir http://localhost:3000
```

Sans Node : ouvrir `index.html` directement (certains navigateurs peuvent bloquer le chargement des JSON en `file://`).

---

## ⚙️ Configuration avant déploiement

1. **Mot de passe admin**  
   Dans `script.js`, modifier :
   ```js
   const ADMIN_PASSWORD = 'VOTRE_MOT_DE_PASSE';
   ```

2. **Formulaire de contact**  
   - Soit garder `FORMSPREE_FORM_ID` avec votre ID Formspree (déjà configuré si vous avez créé un formulaire).
   - Soit mettre `FORMSPREE_FORM_ID = ''` pour utiliser le fallback `mailto:`.

3. **Contenu**  
   - Remplacer les liens et textes dans `index.html` et `translations.json` par vos infos.
   - Renseigner `projects.json`, `articles.json`, `experiences.json`, `skills.json`.
   - Mettre votre photo dans `assets/images/profile.jpg` et le CV dans `assets/cv/`.  
     Le nom du fichier CV est défini dans `script.js` (`cvFileName`, ex. `CV Olivier.pdf`) : utilisez le même nom ou adaptez le code.

---

## 📤 Déploiement sur GitHub

```bash
git init
git add .
git commit -m "Portfolio initial"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/mwatsimuamo-portfolio.git
git push -u origin main
```

---

## 🌐 Déploiement sur Vercel

1. **Connexion**  
   Allez sur [vercel.com](https://vercel.com) et connectez-vous avec GitHub.

2. **Nouveau projet**  
   - “Add New” → “Project”.
   - Importez le dépôt `mwatsimuamo-portfolio`.
   - **Framework Preset** : laisser “Other” ou “No framework”.
   - **Build Command** : vide ou `echo 'static'`.
   - **Output Directory** : `.` (racine).
   - Déployer.

3. **Résultat**  
   Vercel sert les fichiers statiques (HTML, CSS, JS, JSON, assets). Chaque push sur `main` déclenche un nouveau déploiement.

Le fichier `vercel.json` est déjà en place (headers de sécurité et cache pour `/assets/`).

---

## ✅ Checklist avant de pousser sur GitHub et déployer sur Vercel

- [ ] `ADMIN_PASSWORD` dans `script.js` changé (pas la valeur par défaut en prod).
- [ ] `FORMSPREE_FORM_ID` correct si vous utilisez Formspree.
- [ ] Liens sociaux et email à jour dans `index.html` et éventuellement dans `script.js` (`CONTACT_EMAIL`).
- [ ] Contenu des JSON (projets, articles, expériences, compétences) et des textes (FR/EN) à jour.
- [ ] Fichiers sensibles (`.env`, clés, mots de passe) non commités (voir `.gitignore`).
- [ ] `npm run dev` ou ouverture de `index.html` testée en local.

---

## 📝 Licence

MIT. Voir le fichier `LICENSE`.

---

## 📧 Contact

- **Email** : mwatsimulamoolivier@gmail.com  
- **LinkedIn** : [Olivier Mwatsimulamo](https://www.linkedin.com/in/olivier-mwatsimulamo-389b51233)  
- **GitHub** : [@mwatsimulamo](https://github.com/mwatsimulamo)

---

*Développé avec ❤️ pour le Web, l’UX et l’écosystème Cardano.*
