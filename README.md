# Site Vitrine — Département Informatique EFREI Paris

Projet réalisé dans le cadre du module **TI402 — Programmation Web** à l'EFREI Paris.  
Site vitrine du département Informatique : formations, équipe pédagogique, contact et admissions.

---

## Auteurs

| Rôle | Nom |
|------|-----|
| Design lead · Front-end | **Deschamps Malo** |
| Dev lead · Back-of-front | **Toussaint Mathis** |

Encadrant : **M. HAMIDI** — EFREI Paris, 2025–2026

---

## Stack technique

- **HTML5** — 5 pages sémantiques, validées W3C
- **CSS3** — Grid, Flexbox, custom properties, `clamp()`, animations `@keyframes`
- **JavaScript Vanilla** — Aucun framework, aucune dépendance externe

---

## Pages

| Fichier | Contenu |
|---------|---------|
| `index.html` | Accueil — hero terminal, stats, formations, équipe, actualités |
| `formations.html` | Catalogue des formations — table filtrable, programmes |
| `equipe.html` | Équipe pédagogique — grille, recherche live, filtres domaine |
| `contact.html` | Formulaire de contact, coordonnées, JPO, FAQ accordéon |
| `a-propos.html` | Documentation du projet — stack, démarche, crédits |

---

## Fonctionnalités JavaScript

- Effet de typing dans le hero terminal
- Carrousel automatique avec navigation prev / next / dots
- Compteurs animés au scroll (IntersectionObserver)
- Filtres dynamiques de la table des formations
- Recherche live + filtres domaine sur la page Équipe
- Validation complète du formulaire (regex email, longueur, RGPD)
- Accordéon FAQ accessible (ARIA)
- Menu mobile burger responsive
- Reveal animations au scroll
- Dark / Light toggle persistant (`localStorage`)
- Terminal interactif (`help`, `ls`, `cd`, `cat`, `sudo`…)
- Easter egg console DevTools (`efrei()`, `efrei.team()`, `efrei.stack()`)

---

## Lancer le projet

Ouvrir `index.html` directement dans un navigateur — aucune installation requise.

```
open index.html
```

---

## Structure du projet

```
ProjetSiteEFREI/
├── index.html
├── formations.html
├── equipe.html
├── contact.html
├── a-propos.html
├── styles.css
├── app.js
├── ImageEfrei/
│   ├── Logo-Efrei-Noir-1.png
│   └── Logo-Efrei-Blanc.png
└── team-avatars/
    └── *.svg
```

---

*EFREI Paris — Département Informatique · Projet TI402 · 2025–2026*
