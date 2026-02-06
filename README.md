# AI-Powered Dynamic Portfolio

A data-driven personal portfolio website built with React, TypeScript, and Tailwind CSS. It features a built-in AI assistant (powered by Google Gemini) that can answer questions about your experience, and a live JSON editor to customize the content instantly.

## 🚀 Features

- **Dynamic Content**: Fully configurable via a JSON schema.
- **AI Assistant**: Integrated Chat Widget powered by Google Gemini API.
- **Live Editor**: "Edit JSON" mode to modify content directly in the browser.
- **Multi-Language**: Built-in support for English, German, and Japanese.
- **Responsive**: Mobile-first design using Tailwind CSS.
- **Downloadable Resume**: Auto-generated links based on configuration.

## 🛠 Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or yarn

## 💻 Local Installation Guide

The easiest way to run this project locally is by scaffolding a standard React + TypeScript environment (e.g., using Vite).

### 1. Initialize Project
Open your terminal and create a new Vite project:

```bash
npm create vite@latest my-portfolio -- --template react-ts
cd my-portfolio
```

### 2. Install Dependencies
Install the specific libraries used in this project:

```bash
npm install lucide-react @google/genai
```

### 3. File Setup
Organize the files provided into the `src` directory structure:

```text
my-portfolio/
├── index.html              # Copy the provided HTML here (update script src to point to /src/index.tsx)
├── src/
│   ├── index.tsx           # Entry point (Main React render)
│   ├── App.tsx             # Main App Component
│   ├── types.ts            # TypeScript Interfaces
│   ├── constants.ts        # Default Data (JSON)
│   ├── components/         # UI Components (Hero, Skills, ChatWidget, etc.)
│   ├── contexts/           # React Contexts (LanguageContext)
│   └── services/           # API Services (geminiService)
```

**Note on Tailwind CSS**: The provided `index.html` uses the Tailwind CDN for portability. For a production-grade local setup, it is recommended to install Tailwind via npm (`npm install -D tailwindcss postcss autoprefixer`), but the CDN method will work immediately for testing.

### 4. API Key Configuration

To enable the AI Chat Assistant, you need a Google Gemini API Key.

1. Get a key from [Google AI Studio](https://aistudio.google.com/).
2. Create a `.env` file in the root of your project:

```env
VITE_API_KEY=your_actual_api_key_here
```

3. **Important Code Adjustment**:
   If using Vite, open `src/services/geminiService.ts` and replace `process.env.API_KEY` with:
   
   ```ts
   import.meta.env.VITE_API_KEY
   ```

### 5. Run Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:5173`.

## ⚙️ Customization

### Modifying Data
You have two options to change the portfolio content:

1. **Permanent**: Edit `src/constants.ts` and modify `PORTFOLIO_DATA_EN`.
2. **Temporary/Live**: Click the **"Edit JSON"** button in the navbar of the running app to paste your own JSON data.

### Freezing Schema
To reset the data structure, you can use the built-in "Template" button in the JSON Builder to load the version 1.0 schema.

## 📦 Build for Production

```bash
npm run build
```

This will generate a `dist` folder ready for deployment to Vercel, Netlify, or GitHub Pages.
