# Modifier le contenu du site

**Tout ce qui est modifiable se trouve dans ce dossier `content/`.** Vous pouvez
changer les textes et les photos sans connaître la programmation, et sans risque
de casser la mise en page.

## Organisation du dossier

```
content/
├── README.md          ← ce guide
├── logo.png           ← le logo du club (aussi l'icône de l'onglet)
├── banniere.png       ← l'image de fond du bandeau du haut
├── textes/            ← les textes (un fichier .md par section)
├── photos/            ← les photos affichées dans les sections
├── diaporama/         ← les photos du diaporama qui défile
├── videos/            ← les vidéos (si besoin)
└── documents/         ← les fichiers à télécharger (flyers PDF, etc.)
```

## 1. Modifier les textes — `textes/`

Chaque fichier `.md` correspond à une section de la page :

| Fichier                       | Section du site          |
| ----------------------------- | ------------------------ |
| `textes/hero.md`              | Bandeau d'accueil (haut) |
| `textes/video.md`             | Vidéo de présentation    |
| `textes/about.md`             | À propos                 |
| `textes/schedule.md`          | Horaires                 |
| `textes/ecole.md`             | École                    |
| `textes/escrime-entreprise.md`| Escrime Entreprise       |
| `textes/contact.md`           | Pied de page (contact)   |

Ouvrez le fichier, modifiez le texte, enregistrez. Le format est le **Markdown**,
très simple :

```markdown
# Grand titre
## Sous-titre

Un paragraphe normal. **En gras**, *en italique*.

- Élément de liste
- Autre élément

[Texte d'un lien](https://exemple.fr)
```

> Ne renommez pas les fichiers `.md` : leurs noms sont reliés à la mise en page.

## 2. Le logo et la bannière

- **Logo** : remplacez le fichier `content/logo.png` par votre image (gardez de
  préférence le même nom). Il sert aussi d'icône d'onglet du navigateur.
- **Bannière** (image de fond du haut) : remplacez `content/banniere.png`.

## 3. Ajouter une photo dans un texte — `photos/`

1. Déposez votre image dans le dossier **`content/photos/`**.
2. Dans le fichier texte, écrivez (il suffit du **nom du fichier**) :

   ```markdown
   ![Description de la photo](ma-photo.jpg)
   ```

### Plusieurs photos côte à côte

```html
<div class="photo-grid">
  <img src="photo1.jpg" alt="Description 1" />
  <img src="photo2.jpg" alt="Description 2" />
</div>
```

Ajoutez ou retirez des lignes `<img ... />` ; la disposition s'ajuste seule.

**Agrandir une photo au clic** : ajoutez `class="zoomable"` à une image pour
qu'elle s'ouvre en grand (overlay) quand on clique dessus :

```html
<img src="ma-photo.jpg" alt="Description" class="zoomable" />
```

(Les visuels de la section Horaires sont déjà agrandissables au clic.)

## 4. Le diaporama — `diaporama/`

Toutes les images du dossier **`content/diaporama/`** défilent automatiquement,
pleine largeur. Ajoutez ou retirez simplement des fichiers. Elles s'affichent
par ordre alphabétique : préfixez-les (`01-...`, `02-...`) pour choisir l'ordre.

## 5. La vidéo de présentation — `textes/video.md`

La vidéo affichée après l'accueil n'est **pas** stockée dans le site (une vidéo
est trop lourde : elle alourdirait la page et serait refusée par certains
hébergeurs comme GitHub Pages). On la met en ligne sur **YouTube** ou **Vimeo**,
et on colle simplement son lien :

1. Mettez votre vidéo en ligne sur YouTube ou Vimeo.
2. Copiez son lien (bouton **« Partager »**), par exemple
   `https://youtu.be/...` ou `https://vimeo.com/...`.
3. Ouvrez **`content/textes/video.md`**, collez le lien sur sa propre ligne,
   enregistrez.

Tant qu'aucun lien n'est présent, la vidéo n'apparaît pas (le reste de la page
reste intact).

> Le dossier `videos/` reste disponible pour de petits fichiers vidéo à insérer
> dans un texte avec `<video controls src="ma-video.mp4"></video>`, mais
> préférez YouTube/Vimeo pour une vidéo de présentation.

## 6. Un fichier à télécharger (flyer PDF…) — `documents/`

1. Déposez le fichier (par ex. un PDF) dans **`content/documents/`**.
2. Dans le texte, créez un **bouton de téléchargement** en écrivant (il suffit
   du **nom du fichier**) :

   ```html
   <p>
     <a class="download-button" href="mon-flyer.pdf">Télécharger le flyer (PDF)</a>
   </p>
   ```

   Le visiteur télécharge le fichier en cliquant. Pour remplacer le document,
   déposez un nouveau fichier portant le **même nom**.

## Bon à savoir

- Pour ajouter une **nouvelle section** ou réorganiser la page, demandez à un
  développeur (cela se règle dans le code, pas ici).
- Après vos modifications, le site doit être reconstruit/publié pour que les
  changements apparaissent en ligne.
