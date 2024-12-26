# Crypto Dashboard

Projekt zur Visualisierung von Kryptowährungsdaten mit Python-Backend und Next.js Frontend.

![plot](./directory_1/directory_2/.../directory_n/plot.png)

## Projektübersicht

Das Projekt bietet eine moderne Webanwendung zur Analyse und Visualisierung von Kryptowährungsdaten. Es kombiniert eine Python-basierte ETL-Pipeline für die Datenverarbeitung mit einem reaktiven Next.js Frontend für die Darstellung.

## Struktur
```
crypto-dashboard/
├── backend/
│   ├── etl_crypto.ipynb  # ETL Pipeline
│   └── requirements.txt
├── crypto-viz/           # Next.js Frontend
│   └── src/             
└── data/                # Daten
    ├── raw/            
    └── processed/      
```

## Tech Stack
- Backend: Python, Pandas
- Frontend: Next.js, Tailwind CSS
- Datenquelle: CoinMarketCap API

## Installation & Setup

### Backend Setup

1. Python-Umgebung erstellen:
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
cd backend
pip install -r requirements.txt
```

2. Umgebungsvariablen konfigurieren:
- Kopiere die Beispiel-.env-Datei:
```bash
cp .env.example .env
```
- Trage deine API-Keys in die .env-Datei ein

### Frontend Setup

1. Node.js Dependencies installieren:
```bash
cd crypto-viz
npm install
```

2. Entwicklungsserver starten:
```bash
npm run dev
```

## Nutzung

1. **ETL-Pipeline ausführen:**
   - Öffne `backend/etl_crypto.ipynb` in Jupyter
   - Führe alle Zellen aus, um aktuelle Daten zu laden

2. **Frontend starten:**
   - Entwicklungsserver starten: `npm run dev`
   - Browser öffnen: [http://localhost:3000](http://localhost:3000)

## Entwicklung

### Datenaktualisierung

Die ETL-Pipeline im `etl_crypto.ipynb` Notebook kann manuell oder automatisiert ausgeführt werden, um neue Daten zu laden. Die Daten werden im `data/` Verzeichnis gespeichert. Jederzeit anpassbar!

### Frontend-Entwicklung

Das Frontend verwendet Next.js mit:
- Automatisches Hot Reloading
- Optimierte Build-Prozesse
- Integriertes API-Routing
