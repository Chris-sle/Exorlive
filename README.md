# ExorLive Player Prototype

En enkel fullstack-prototype av en ExorLive øvelses-avspiller ("Player") med:

- Backend: ASP.NET Core Minimal API (C#) + MySQL
- Frontend: React + TypeScript (Vite)
- Media: Video- og thumbnail-filer servert fra API-prosjektet

## 1. Krav

- .NET SDK 8 (eller nyere)
- Node.js 18+ (for React)
- MySQL Server
- Git

## 2. Database – oppsett

1. Start MySQL-serveren.
2. Opprett database og tabeller. 
   Kjør queries i MySQL-klient fra AddDbAndTables.sql først, Så insertIntoTables.sql
3. Kan bruk userQueries.sql om du vil teste databasen

## 3. Backend – Exorlive.Player.Api

### 3.1 Konfigurasjon

Når du kloner prosjektet, kopier appsettings.Development.template.json til appsettings.Development.json og fyll inn ditt MySQL-passord.

`Exorlive.Player.Api/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Port=3306;Database=ExorliveDb;User=root;Password=YOUR_PASSWORD;SslMode=None;"
  },
  "MediaSettings": {
    "VideoFolder": "Videos",
    "ThumbnailFolder": "Thumbnails"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

Bytt ut `YOUR_PASSWORD` med ditt MySQL-passord.


### 3.2 Kjør API-et

Fra `Exorlive.Player.Api`:

```bash
dotnet restore
dotnet run
```

Standard vil API-et kjøre på noe som `https://localhost:7061`.

Scalar API-dokumentasjon er tilgjengelig på:

- `/openapi/v1.json`
- `/scalar` (eller `/scalar/v1` avhengig av konfig)

## 4. Frontend – Exorlive.Player.Web (React + TypeScript)

### 4.1 Opprette prosjekt (første gang)

Fra løsningens rot (samme mappe som `.sln`):

```bash
npm create vite@latest Exorlive.Player.Web -- --template react-ts
cd Exorlive.Player.Web
npm install
```

Hvis prosjektet allerede ligger i repoet, holder det å kjøre `npm install`.

### 4.2 Konfigurasjon

I utvikling kan frontend proxye API-kall til backend.

`Exorlive.Player.Web/vite.config.ts` (eksempel):

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://localhost:7061',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
```

Da kan React kalle `/api/...` uten å hardkode port/host.

### 4.3 API-endepunkter brukt i frontend

Backend eksponerer blant annet:

- `GET /api/workouts` – liste over treningsøkter
- `GET /api/workouts/{id}` – én økt + tilhørende øvelser
- `GET /api/exercises/{id}` – øvelse-detaljer + sett
- `GET /api/exercises/{id}/video` – videostrøm
- `GET /api/exercises/{id}/thumbnail` – thumbnail-bilde

### 4.4 Starte frontend

Fra `Exorlive.Player.Web`:

```bash
npm install   # første gang på ny PC
npm run dev
```

Åpne nettleser på `http://localhost:5173`.

Backend må kjøre samtidig for at data og video skal lastes.
