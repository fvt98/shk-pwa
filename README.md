# Wie ausführen?

## XAMPP Control Panel installieren

Dort Apache und MySQL starten und mit http://localhost auf die Seite in den phpMyAdmin gehen:
-> Dann eine Datenbank erstellen "signup"
-> In der erstellten Datenbank "signup" die Tabelle "login" erstellen mit den Parametern: id (setzen als PK und haken bei A_I setzten), name, username, password 
!!!Wichtig: password muss VARCHAR groß genug wegen Hash sein, einfach 100 machen !!!

## Backend installieren
 In einer Konsole mit "cd backend" in die backend-folder gehen, dort dann "npm install"

## Frontend installieren
 In einer neuen Konsole mit "cd frontend" in die frondend-folder gehen, dort dann "npm install"

## Backend starten
 
 In einer Konsole mit "cd backend" in die backend-folder gehen, dort dann "npm start"

 ## Frontend starten

 In einer neuen Konsole mit "cd frontend" in die frondend-folder gehen, dort dann "npm start"