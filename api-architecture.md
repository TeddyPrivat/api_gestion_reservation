/workease-api
├── prisma/
│ └── schema.prisma
├── src/
│ ├── controllers/ # Gère les requêtes HTTP (App layer)
│ │ ├── auth.controller.js
│ │ ├── booking.controller.js
│ │ └── room.controller.js
│ ├── routes/ # Définit les routes Express
│ │ ├── auth.routes.js
│ │ ├── booking.routes.js
│ │ └── room.routes.js
│ ├── middlewares/ # Auth, rôles, règles dynamiques, etc.
│ │ ├── auth.middleware.js
│ │ ├── role.middleware.js
│ │ └── booking-rules.middleware.js
│ ├── services/ # Logique métier (Use Cases)
│ │ ├── auth.service.js
│ │ ├── booking.service.js
│ │ └── room.service.js
│ ├── utils/ # Fonctions génériques (validation, date, erreur)
│ │ ├── jwt.js
│ │ ├── dateUtils.js
│ │ └── zodValidation.js
│ ├── config/ # Config globale (JWT secret, .env, etc.)
│ │ └── env.js
│ ├── index.js # Point d’entrée Express
│ └── app.js # App Express (routes + middlewares centralisés)
├── .env
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
