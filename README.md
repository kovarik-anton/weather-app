## Getting Started

First, install packages:

```bash
npm i
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Set your api key in the .env file to the NEXT_PUBLIC_API_KEY variable.

Open [http://localhost:3000](http://localhost:3000) with your browser.

The application allows users to search for cities using an autocomplete. After selecting a city, it displays a 5-day forecast using https://api.openweathermap.org/data/2.5/forecast.

The application uses Nextjs 15 and React 19, global state is managed by Redux Toolkit.

Supported Browsers: Chrome, Edge, Firefox
