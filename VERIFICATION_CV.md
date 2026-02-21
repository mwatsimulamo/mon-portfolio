# ✅ Vérification du CV

## Problème résolu

Le code a été mis à jour pour :
1. **Détecter automatiquement** votre fichier CV "CV WEB3 OLIVIER.pdf"
2. **Afficher automatiquement** le CV au chargement de la page
3. **Gérer correctement** les espaces dans le nom de fichier

## Comment tester

1. **Démarrez le serveur :**
   ```bash
   npm run dev
   ```

2. **Ouvrez votre navigateur :**
   ```
   http://localhost:3000
   ```

3. **Allez à la section CV :**
   - Le CV devrait s'afficher automatiquement dans l'aperçu
   - Le bouton "Télécharger le CV" devrait fonctionner
   - Le bouton "Masquer l'aperçu" permet de cacher/afficher le CV

## Si le CV ne s'affiche toujours pas

### Vérifications à faire :

1. **Vérifiez que le fichier existe :**
   - Chemin : `assets/cv/CV WEB3 OLIVIER.pdf`
   - Le fichier doit être un PDF valide

2. **Ouvrez la console du navigateur (F12) :**
   - Regardez s'il y a des erreurs
   - Vérifiez l'onglet "Network" pour voir si le fichier est chargé

3. **Testez le lien direct :**
   - Essayez d'ouvrir directement : `http://localhost:3000/assets/cv/CV%20WEB3%20OLIVIER.pdf`
   - Si ça fonctionne, le problème vient de l'iframe

4. **Alternative - Renommez le fichier :**
   - Si vous préférez, vous pouvez renommer le fichier en `cv.pdf` (tout en minuscules)
   - Le code détectera automatiquement ce nom aussi

## Note importante

Les iframes PDF peuvent parfois avoir des problèmes selon le navigateur. Si le CV ne s'affiche pas dans l'iframe mais que le téléchargement fonctionne, c'est normal - certains navigateurs préfèrent télécharger les PDF plutôt que de les afficher dans une iframe.

## Solution alternative

Si l'iframe ne fonctionne pas, vous pouvez :
- Utiliser un service comme Google Docs Viewer
- Convertir le PDF en images
- Utiliser un lecteur PDF JavaScript comme PDF.js

Pour l'instant, le téléchargement direct devrait fonctionner parfaitement !

