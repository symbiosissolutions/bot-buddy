# Bot Buddy

## Overview

Bot Buddy is an interactive web application that lets users create and chat with customized AI characters. It provides a platform for educational and entertaining role-play interactions with AI personas. 

Users can design their own characters by defining traits, backstories, and personalities, then engage in dynamic conversations with their created buddies.

### Core Dependencies
- React 
- TypeScript 
- Vite 
- React Router DOM
- React Hook Form

### Data And Validation
- Zod (Schema validation)
- UUID (Unique ID generation)
- Hookform/resolvers (Form validation resolvers)

### Styling And Animation
- Framer Motion (Animations)
- React Icons
- React Markdown
- TailwindCSS
- PostCSS
- Autoprefixer

## Setup

To get this project up and running on your local machine, follow these steps:

### Prerequisites

- Node.js (>=21.4.0)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/symbiosissolutions/bot-buddy.git
cd bot-buddy
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Configure the Environment Variables**

Create a `.env` file in the root of the project and add the following variables:

```plaintext
VITE_SECRET_KEY=your_secret_key_here
VITE_BASE_URL=your_base_url_here
```

### Running the Application

To start the application in development mode, run:

```bash
npm run dev
# or
yarn dev
```

This will start the Vite server, and you can access the app at `http://localhost:5173`.

### Building for Production

To build the app for production, run:

```bash
npm run build
# or
yarn build
```
