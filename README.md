<p align="center"><h1 align="center">TanStack Start Demo</h1></p>
<p align="center">
	<em>A basic expense tracker app to get off the ground with TanStack libraries.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/hobbescodes/tanstack-start-demo?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/hobbescodes/tanstack-start-demo?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/hobbescodes/tanstack-start-demo?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/hobbescodes/tanstack-start-demo?style=default&color=0080ff" alt="repo-language-count">
</p>
<br>

## 🔗 Table of Contents

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [📁 Project Structure](#-project-structure)
  - [📂 Project Index](#-project-index)
- [🚀 Getting Started](#-getting-started)
  - [☑️ Prerequisites](#-prerequisites)
  - [⚙️ Installation](#-installation)
  - [🤖 Usage](#🤖-usage)
  - [🧪 Testing](#🧪-testing)
- [📌 Project Roadmap](#-project-roadmap)
- [🔰 Contributing](#-contributing)
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
| 🔌 | **Integrations**  | <ul><li>Integrates **React Query** for data fetching and management</li><li>Utilizes **React Table** for rendering dynamic tables</li><li>Uses TanStack Start API routes for expenses connecting to a PostgreSQL Database with **Drizzle ORM**, and **Drizzle Seed** for seeding data in development</li></ul> |
| 🧩 | **Modularity**    | <ul><li>Exports core components like Button, Input, Label, and Table for easy access (using `shadcn` components)</li><li>Generates route tree structure in `app/routeTree.gen.ts` for type-safe routing logic</li></ul> |
| 🧪 | **Testing**       | <ul><li>Coming Soon!</li></ul> |
| ⚡️  | **Performance**   | <ul><li>Implements query caching and preloading strategy in the router for efficient client-side routing</li><li>Optimizes database queries for fetching and deleting expenses</li></ul> |
| 📦 | **Dependencies**  | <ul><li>Includes various dependencies for React, TailwindCSS, database management, and development tools</li><li>Configures database connection and ORM using **Drizzle** with PostgreSQL</li><li>Utilizes **Zod** for form validation and schema definition</li></ul> |

---

## 📁 Project Structure

```sh
└── tanstack-start-demo/
    ├── app
    │   ├── api.ts
    │   ├── client.tsx
    │   ├── components
    │   ├── db
    │   ├── lib
    │   ├── routeTree.gen.ts
    │   ├── router.tsx
    │   ├── routes
    │   └── ssr.tsx
    ├── app.config.ts
    ├── biome.json
    ├── bun.lockb
    ├── drizzle
    │   └── migrations
    ├── drizzle.config.ts
    ├── knip.config.ts
    ├── package.json
    ├── renovate.json
    └── tsconfig.json
```


### 📂 Project Index
<details open>
	<summary><b><code>tanstack-start-demo/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/knip.config.ts'>knip.config.ts</a></b></td>
				<td>- Define the project's configuration settings by specifying entry points and exclusions for routes, API, and server components<br>- Knip finds and fixes unused files, exports and dependencies. Use it for enhanced code and dependency management.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/tsconfig.json'>tsconfig.json</a></b></td>
				<td>- Configures TypeScript compiler options for the project, enabling ESNext and DOM features, enforcing strict best practices, and setting up bundler mode<br>- The file defines settings like target version, module resolution, JSX handling, and base URL for the application.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/renovate.json'>renovate.json</a></b></td>
				<td>Configures automated dependency updates using Renovate to adhere to recommended configuration settings.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/drizzle.config.ts'>drizzle.config.ts</a></b></td>
				<td>- Define project configuration for Drizzle migrations using PostgreSQL, with schema defined in app/db/schema.ts<br>- Utilize environment variable DATABASE_URL for database connection<br>- Set output directory to drizzle/migrations and configure database credentials accordingly.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/biome.json'>biome.json</a></b></td>
				<td>- Defines code formatting and linting rules for the project, including VCS settings, file organization, and JavaScript formatting<br>- Ensures consistent code style, enforces best practices, and enhances code readability<br>- The biome.json file serves as a configuration blueprint for maintaining code quality and consistency across the codebase.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/package.json'>package.json</a></b></td>
				<td>- Define project scripts and dependencies in package.json for development, building, and database management<br>- Scripts include dev, build, start, format, lint, and database operations<br>- Dependencies encompass various packages for React, TailwindCSS, database management, and development tools.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app.config.ts'>app.config.ts</a></b></td>
				<td>Enables Vite configuration for TypeScript path aliases and Tailwind CSS integration within the project architecture among other things.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- drizzle Submodule -->
		<summary><b>drizzle</b></summary>
		<blockquote>
			<details>
				<summary><b>migrations</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/drizzle/migrations/0000_early_meggan.sql'>0000_early_meggan.sql</a></b></td>
						<td>- Defines a database table for storing expenses with fields for id, title, amount, and created timestamp<br>- This file sets up the initial structure for managing expense data within the project's database architecture.</td>
					</tr>
					</table>
					<details>
						<summary><b>meta</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/drizzle/migrations/meta/0000_snapshot.json'>0000_snapshot.json</a></b></td>
								<td>- Defines database schema for expenses table with columns for id, title, amount, and created_at<br>- Specifies data types, constraints, and default values<br>- Captures metadata for version control and database management.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/drizzle/migrations/meta/_journal.json'>_journal.json</a></b></td>
								<td>- Manages migration metadata for the project, tracking version history and database dialect<br>- Contains entries with version details, timestamps, and tags for reference.</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- app Submodule -->
		<summary><b>app</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/client.tsx'>client.tsx</a></b></td>
				<td>Facilitates client-side rendering by hydrating the root element with a StartClient component, utilizing a created router for navigation.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/routeTree.gen.ts'>routeTree.gen.ts</a></b></td>
				<td>- Generates and exports the route tree structure for the project, defining routes and their relationships<br>- The file establishes the hierarchy of routes, their paths, and parent routes, facilitating navigation within the application<br>- It automates the creation and organization of routes, ensuring consistency and efficiency in managing the project's routing system.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/router.tsx'>router.tsx</a></b></td>
				<td>- Creates a router using TanStack's libraries for routing and state management<br>- Integrates query caching and provides methods for serializing and deserializing state<br>- The router is configured with default options and a preloading strategy, enhancing the project's architecture with efficient client-side routing and data management.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/api.ts'>api.ts</a></b></td>
				<td>Generates the default API file route handler for the project architecture.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/ssr.tsx'>ssr.tsx</a></b></td>
				<td>- Enables server-side rendering by creating a start handler with a router and manifest<br>- The code integrates with the project's architecture to handle incoming requests and route them accordingly.</td>
			</tr>
			</table>
			<details>
				<summary><b>lib</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/lib/utils.ts'>utils.ts</a></b></td>
						<td>Combines CSS classes using Tailwind CSS and clsx to generate a single class string.</td>
					</tr>
					</table>
					<details>
						<summary><b>styles</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/lib/styles/main.css'>main.css</a></b></td>
								<td>- Define global styles and color variables for the project, facilitating consistent theming and styling across components<br>- The file establishes base styles, color palettes, and animation keyframes, ensuring a cohesive visual identity throughout the application.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>config</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/lib/config/env.ts'>env.ts</a></b></td>
								<td>Define environment variables for API base URL and database URL in the project configuration.</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>components</b></summary>
				<blockquote>
					<details>
						<summary><b>core</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/components/core/Button.tsx'>Button.tsx</a></b></td>
								<td>- Defines a reusable Button component with various visual styles and sizes, handling disabled states and click actions<br>- Integrates with external libraries for styling and utility functions.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/components/core/Label.tsx'>Label.tsx</a></b></td>
								<td>- Defines label styling and behavior using Radix UI and custom utilities<br>- Integrates with CVAs for variant management.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/components/core/Table.tsx'>Table.tsx</a></b></td>
								<td>- Defines reusable components for rendering a dynamic table structure with customizable styling and behavior<br>- The components include Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, and TableCaption, enhancing the project's UI flexibility and maintainability.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/components/core/index.ts'>index.ts</a></b></td>
								<td>- Exports core components like Button, Input, Label, and Table for easy access across the codebase<br>- Simplifies component usage and promotes consistency in UI elements.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/components/core/Card.tsx'>Card.tsx</a></b></td>
								<td>- Define core components for cards with structured layout and styling, enhancing readability and consistency across the project<br>- The components include Card, CardHeader, CardFooter, CardTitle, CardDescription, and CardContent, each serving a specific purpose in displaying content within a card element.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/components/core/Input.tsx'>Input.tsx</a></b></td>
								<td>- Defines a reusable Input component for handling user input in the core section of the project<br>- It leverages utility functions for styling and props management, enhancing the user interface with consistent design and functionality across the application.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>layout</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/components/layout/Footer.tsx'>Footer.tsx</a></b></td>
								<td>- Generates a footer displaying the current year and author's name<br>- The footer component enhances the project's user interface by providing a consistent layout element across all pages.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/components/layout/Header.tsx'>Header.tsx</a></b></td>
								<td>- The Header component renders a navigation bar with links to different sections of the Expense Tracker app<br>- It provides easy access to key features like About, Expenses, and Create Expense<br>- The component enhances user experience by enabling seamless navigation within the application.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/components/layout/index.ts'>index.ts</a></b></td>
								<td>Exports Footer and Header components for the project layout, facilitating consistent design and functionality across the codebase.</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>routes</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/routes/__root.tsx'>__root.tsx</a></b></td>
						<td>- Defines the root route for the project, setting up the main layout structure and components<br>- Integrates essential tools like TanStack Router Devtools and ReactQuery Devtools<br>- Manages document structure and meta tags for the application.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/routes/expenses.tsx'>expenses.tsx</a></b></td>
						<td>- Generates a route to display a list of expenses fetched from the server<br>- Utilizes React Query for data fetching and React Table for rendering<br>- Implements column definitions for the table display, including title, amount, and creation date<br>- Handles data loading states and renders the expense list in a structured table format.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/routes/about.tsx'>about.tsx</a></b></td>
						<td>Enables creation of a route for the "/about" page using a custom component.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/routes/create-expense.tsx'>create-expense.tsx</a></b></td>
						<td>- Enables creating new expenses with form validation and submission handling<br>- Utilizes `@tanstack/react-form` for form management, validation, and `@tanstack/react-qyery` for API interaction<br>- Integrates with the project's routing and state management systems to seamlessly add expenses to the database.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/routes/index.tsx'>index.tsx</a></b></td>
						<td>- Enables fetching and displaying total expenses data on the home page using React Query and TanStack libraries<br>- Integrates with the backend API to retrieve total expenses, presenting the information in a visually appealing card component<br>- This file defines the route and data fetching logic for the home page, enhancing the user experience with real-time expense updates.</td>
					</tr>
					</table>
					<details>
						<summary><b>api</b></summary>
						<blockquote>
							<details>
								<summary><b>expense</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/routes/api/expense/$id.ts'>$id.ts</a></b></td>
										<td>- Handles API routes for retrieving and deleting expenses based on the provided ID<br>- Utilizes database queries to fetch and delete expense records, returning appropriate responses if the expense is not found<br>- This file contributes to the project's API functionality by enabling users to interact with expense data through specified endpoints.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>expenses</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/routes/api/expenses/total.ts'>total.ts</a></b></td>
										<td>- Calculates total expenses amount from the database and returns it as JSON response<br>- The code file defines a route that fetches the sum of expenses from the database using a specific ORM function<br>- It then formats the result and sends it back as a JSON response.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/routes/api/expenses/index.ts'>index.ts</a></b></td>
										<td>- Handles API routes for managing expenses, including fetching and creating new expenses<br>- Utilizes a database connection to retrieve and insert expense data<br>- Implements validation to ensure correct data format before insertion<br>- Delays response for POST requests by 3 seconds.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>db</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/db/seed.ts'>seed.ts</a></b></td>
						<td>- Seed the database with sample expenses data using Drizzle ORM and Drizzle Seed<br>- The code resets the database, seeds it with mock expenses data, and logs completion<br>- The main function configures the database connection, defines the expenses table schema, and populates it with sample data.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/db/schema.ts'>schema.ts</a></b></td>
						<td>- Defines database schema for expenses including fields like id, title, amount, and createdAt<br>- Generates schemas for inserting and selecting expenses, ensuring data integrity and validation for API requests and responses<br>- Types InputExpense and OutputExpense are inferred from the respective schemas for consistent data handling.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/hobbescodes/tanstack-start-demo/blob/master/app/db/index.ts'>index.ts</a></b></td>
						<td>Initialize database connection and ORM using Drizzle with PostgreSQL for the project, leveraging a predefined schema and environment configurations.</td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

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