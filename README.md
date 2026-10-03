# HilfeNetz

Plateforme de mise en relation entre donateurs et personnes ou projets recherchant un soutien.
V1 : site public + offres + formulaires + administration.

> Spécification complète : `project-info.md`

## Stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS v4 (design tokens dans `src/app/globals.css`)
- PostgreSQL + Prisma 6
- Zod + React Hook Form
- Auth admin : session cookie HMAC (scrypt) — `src/lib/auth.ts`

## Démarrage

```bash
# Base de données (Docker)
docker run -d --name hilfenetz-db \
  -e POSTGRES_USER=hilfenetz -e POSTGRES_PASSWORD=hilfenetz_dev_pw \
  -e POSTGRES_DB=hilfenetz -p 5434:5432 postgres:17-alpine

cp .env.example .env   # adapter DATABASE_URL et les secrets

npm install
npm run db:migrate     # applique les migrations
npm run db:seed        # admin + offres de démonstration
npm run dev            # http://localhost:3000
```

## Administration

- URL : `/admin` (redirige vers `/admin/connexion` si non connecté)
- Identifiants : `ADMIN_EMAIL` / `ADMIN_PASSWORD` du `.env` (utilisateur créé par le seed)

## Structure

```text
src/
├── app/
│   ├── (public)/          # site public (header/footer)
│   │   ├── offres/        # liste + détail
│   │   ├── demande/       # formulaire multi-step + confirmation
│   │   ├── don/ signaler/ contact/
│   │   └── faq/ a-propos/ comment-ca-marche/ + pages légales
│   └── admin/
│       ├── connexion/     # login (hors garde)
│       └── (protected)/   # dashboard, offres, demandes, propositions, signalements, messages
├── components/            # ui/ layout/ offers/ forms/ faq/ admin/
├── features/              # server actions (requests, donations, reports, contact, admin)
└── lib/                   # db, auth, validation (zod), rate-limit, utils
```

## À faire avant production

- [ ] Changer `ADMIN_PASSWORD` et `SESSION_SECRET`
- [ ] Brancher Cloudflare Turnstile sur les formulaires publics (le honeypot + rate-limit mémoire sont best-effort)
- [x] ~~Configurer un provider e-mail~~ → **Resend intégré** : ajouter RESEND_API_KEY, ADMIN_NOTIFY_EMAIL, EMAIL_FROM dans les env vars
- [ ] Faire valider les contenus légaux (`/conditions`, `/confidentialite`, `/mentions-legales`)
- [ ] Remplacer le rate-limit en mémoire par un store partagé si multi-instance
