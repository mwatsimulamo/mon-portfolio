/**
 * Serveur HTTP simple pour tester le portfolio en local
 * Utilisation: node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Types MIME
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Gérer les requêtes CORS (pour les extensions de navigateur)
    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    // Décoder l'URL pour gérer les espaces et caractères spéciaux
    let filePath = decodeURIComponent('.' + req.url);
    if (filePath === './') {
        filePath = './index.html';
    }

    // Normaliser le chemin
    const normalizedPath = path.normalize(filePath);
    
    // Sécurité : empêcher l'accès aux fichiers en dehors du répertoire (protection contre directory traversal)
    const basePath = path.normalize(__dirname);
    const fullPath = path.resolve(normalizedPath);
    
    if (!fullPath.startsWith(basePath)) {
        res.writeHead(403, { 
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*'
        });
        res.end('<h1>403 - Accès interdit</h1>', 'utf-8');
        return;
    }

    // Obtenir l'extension du fichier
    const extname = String(path.extname(normalizedPath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Lire et servir le fichier
    fs.readFile(normalizedPath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                console.error(`Fichier non trouvé: ${normalizedPath}`);
                res.writeHead(404, { 
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(`<h1>404 - Fichier non trouvé</h1><p>Chemin: ${normalizedPath}</p>`, 'utf-8');
            } else {
                res.writeHead(500, { 'Access-Control-Allow-Origin': '*' });
                res.end(`Erreur serveur: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📂 Dossier: ${__dirname}`);
    console.log(`\nAppuyez sur Ctrl+C pour arrêter le serveur\n`);
});

