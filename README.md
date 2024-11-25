<p align="center"><h1 align="center">TanStack Start Demo</h1></p>
<p align="center">
	<em>A basic expense tracker app to get off the ground with TanStack libraries.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/hobbescodes/tanstack-start-demo" alt="license">
	<img src="https://img.shields.io/github/last-commit/hobbescodes/tanstack-start-demo" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/hobbescodes/tanstack-start-demo" alt="repo-top-language">
</p>
<br>

## 🔗 Table of Contents

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [☑️ Prerequisites](#-prerequisites)
  - [⚙️ Installation](#-installation)
  - [🤖 Usage](#🤖-usage)
- [🎗 License](#-license)
- [🙌 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

**tanstack-start-demo** is a basic expense tracker app built using the TanStack libraries. It demonstrates how to set up a project with the necessary dependencies and configurations, and showcases the power of these libraries in a practical example.

---

## 👾 Features

|      | Feature         | Summary       |
| :--- | :---:           | :---          |
| ⚙️  | **Architecture**  | <ul><li>Utilizes **TanStack** libraries for routing and state management</li><li>Defines project configuration settings in `app.config.ts` for streamlined development</li><li>Integrates **Vite** configuration for TypeScript path aliases and **Tailwind CSS**</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>Configures TypeScript compiler options in `tsconfig.json` for strict best practices</li><li>Automates dependency updates using **Renovate**</li><li>Defines linting rules in `biome.json` for consistent code style</li></ul> |
| 📄 | **Documentation** | <ul><li>Primary language: **TypeScript**</li><li>Package managers: **bun**</li><li>Install commands and usage commands detailed in documentation</li></ul> |
| 🔌 | **Integrations**  | <ul><li>Integrates **React Query** for data fetching and async state management</li><li>Utilizes **React Table** for rendering dynamic tables</li><li>Integrates **TanStack Form** for handling form state and validation</li><li>Uses TanStack Start server functions for fetching and mutating expenses stored in a PostgreSQL Database.</li><li>**Drizzle ORM** and **Drizzle Seed** used for curating the database schema and seeding data in development</li></ul> |
| ⚡️  | **Performance**   | <ul><li>Implements query caching and preloading strategies in the router for efficient client-side routing</li><li>Optimizes database queries for fetching and deleting expenses</li></ul> |
| 📦 | **Dependencies**  | <ul><li>Includes various dependencies for React, TailwindCSS, database management, and development tools</li><li>Configures database connection and ORM using **Drizzle** with PostgreSQL</li><li>Utilizes **Zod** for form validation and schema definition</li></ul> |

---

## 📁 Project Structure

```sh
└── tanstack-start-demo/
    ├── app
    │   ├── components
    │   ├── db
    │   ├── lib
    │   ├── routes
    │   ├── client.tsx
    │   ├── router.tsx
    │   ├── routeTree.gen.ts
    │   └── ssr.tsx
    ├── drizzle
    │   └── migrations
    ├── app.config.ts
    ├── biome.json
    ├── bun.lockb
    ├── drizzle.config.ts
    ├── knip.config.ts
    ├── package.json
    ├── renovate.json
    └── tsconfig.json
```

---
## 🚀 Getting Started

### ☑️ Prerequisites

Before getting started with tanstack-start-demo, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Package Manager:** bun


### ⚙️ Installation

Install tanstack-start-demo using one of the following methods:

**Build from source:**

1. Clone the tanstack-start-demo repository:
```sh
❯ git clone https://github.com/hobbescodes/tanstack-start-demo
```

2. Navigate to the project directory:
```sh
❯ cd tanstack-start-demo
```

3. Install the project dependencies:


**Using `bun`** &nbsp; [<img align="center" src="https://img.shields.io/badge/bun-CB3837.svg?style={badge_style}&logo=bun&logoColor=white" />](https://www.bunjs.com/)

```sh
❯ bun install
```




### 🤖 Usage
Run tanstack-start-demo in development using the following command:
**Using `bun`** &nbsp; [<img align="center" src="https://img.shields.io/badge/bun-CB3837.svg?style={badge_style}&logo=bun&logoColor=white" />](https://www.bunjs.com/)

```sh
❯ bun dev
```

---

## 🎗 License

This project is protected under the [MIT](https://choosealicense.com/licenses/mit/) License. For more details, refer to the [LICENSE](https://github.com/hobbescodes/tanstack-start-demo/blob/master/LICENSE) file.

---

## 🙌 Acknowledgments

- Shout out to [Sam Meech-Ward](https://github.com/meech-ward) who inspired me to create this project with his own [Expense Tracker App](https://github.com/meech-ward/Bun-Hono-React-Expense-Tracker/tree/main) and [tutorial](https://www.youtube.com/watch?v=jXyTIQOfTTk)

---