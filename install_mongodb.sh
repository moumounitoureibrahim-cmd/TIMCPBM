#!/bin/bash

echo "🔄 Mise à jour de Homebrew..."
brew update

echo "🍃 Ajout du dépôt officiel MongoDB..."
brew tap mongodb/brew

echo "⬇️ Installation de MongoDB Community Edition..."
brew install mongodb-community@6.0

echo "🚀 Démarrage du service MongoDB..."
brew services start mongodb/brew/mongodb-community

echo "✅ Vérification du statut de MongoDB..."
brew services list | grep mongodb

echo "🎉 Installation terminée avec succès !"
echo "MongoDB fonctionne maintenant sur le port 27017"