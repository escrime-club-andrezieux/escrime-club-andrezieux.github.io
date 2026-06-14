# ecab_site

Site web une page pour un club d'escrime. Construit avec **Vite + React** ;
tout le texte est dans des fichiers Markdown et les médias dans des dossiers
dédiés, afin qu'une personne non développeuse puisse les modifier facilement.

## Démarrer

```bash
npm install      # installe les dépendances (une seule fois)
npm run dev      # lance le site en local (rechargement automatique)
npm run build    # génère la version de production dans dist/
npm run preview  # prévisualise la version de production
```

## Modifier le contenu (texte, photos, vidéos)

👉 Voir le guide : [`content/README.md`](content/README.md)

- **Textes** : dossier `content/` (fichiers `.md`)
- **Photos** : dossier `public/media/photos/`
- **Vidéos** : dossier `public/media/videos/`

## Structure du projet

```
content/            Textes du site (Markdown) — modifiable par tous
public/media/       Photos et vidéos — modifiable par tous
src/                Code React, mise en page et styles — développeur
  App.jsx           Ordre des sections de la page
  components/       Composants (Section, Markdown)
  styles.css        Tous les styles (CSS simple)
CLAUDE.md           Consignes de développement
```
