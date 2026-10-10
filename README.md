# 🛒 DailyBazar — বাজার দর

**Your Daily Guide to Essential Market Prices in Bangladesh 🇧🇩**

DailyBazar is a responsive Bangla web application that helps users explore daily prices of essential commodities across different markets in Bangladesh. It provides product-wise price comparisons, market-level breakdowns, daily price changes, and secure user authentication.

🌐 **Live Demo:** [DailyBazar](https://market-prices-ochre.vercel.app)

---

## ✨ Features

### 🧭 Navbar & Price Ticker

- Displays the logo and today's date in Bangla.
- Category navigation with active-link highlighting.
- Authentication controls for sign-in and sign-up.
- Displays the user's profile and sign-out option when logged in.
- Responsive navigation with mobile-friendly authentication icons.
- Infinite scrolling price ticker with product emojis, names, prices, units, and percentage changes.
- Each ticker item links to the corresponding product details page.

### 🏠 Home Page

- Attractive hero section with today's date, heading, subtitle, and banner image.
- Smooth-scroll CTA to the all-products section.
- **আজ দাম বেড়েছে ▲** — Highlights the top 6 products with rising prices.
- **আজ দাম কমেছে ▼** — Highlights the top 6 products with falling prices.
- **সব পণ্য** — Displays all available products in a responsive grid.
- Product cards include:
  - Product emoji and Bangla name.
  - Category and measurement unit.
  - Today's price using Bengali numerals.
  - Price-change badge with directional indicators.
- Responsive layouts for mobile, tablet, and desktop.

### 📂 Category Pages

- Dynamic category routes using `/category/[slug]`.
- Category title and icon.
- Sorting options:
  - Default order.
  - Price: Low to High.
  - Price: High to Low.
- Skeleton loaders while data is loading.
- User-friendly messages for invalid or empty categories.

### 📊 Product Details

- Dynamic product routes using `/product/[id]`.
- Protected access for authenticated users.
- Product name, emoji, category, and unit.
- Price change compared with the previous day.
- Price summary showing minimum, maximum, and average prices.
- Market-wise price comparison table containing:
  - Market name.
  - Division.
  - Minimum price.
  - Maximum price.
  - Average price.

### 🔐 Authentication & User Profile

- Email and password sign-up and sign-in.
- Google OAuth authentication.
- GitHub OAuth authentication.
- Account linking for supported providers using the same email.
- Redirects to the sign-in page after successful registration.
- Redirects to the home page after successful sign-in.
- Protected routes for `/product/*` and `/profile/*`.
- Profile page with user name update functionality.
- Toast notifications for authentication events, validation, and loading errors.

### 🎨 UI & User Experience

- Fully responsive design.
- Bangla interface with Bengali numeral formatting.
- Price increase: Red ▲ indicator.
- Price decrease: Green ▼ indicator.
- No price change: Gray indicator.
- Skeleton loading states.
- Custom 404 page with a **হোম পেজে ফিরে যান** button.
- Reusable components and consistent styling.
- Footer section.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js (App Router) | React framework and routing |
| TypeScript | Type-safe development |
| Tailwind CSS | Responsive UI styling |
| Better Auth | Authentication and session management |
| MongoDB | Authentication data storage |
| `@better-auth/mongo-adapter` | Better Auth database integration |
| `react-hot-toast` | Toast notifications |
| `react-marquee-text` | Scrolling price ticker |
| `lucide-react` | Icons |
| `react-icons` | Additional icons |
| Vercel | Deployment |

### 📡 Data Source

DailyBazar fetches market and product information from the following API:

**Base URL:** `https://api.abcz.workers.dev/api/bazardor`

| Endpoint | Description |
|---|---|
| `/products` | Fetch all products |
| `/products/:id` | Fetch a specific product |
| `/products?category=:slug` | Fetch products by category |
| `/categories` | Fetch available categories |

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── signin/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   │           └── route.ts
│   ├── category/
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   ├── product/
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   ├── profile/
│   │   └── page.tsx
│   ├── not-found.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── header.tsx
│   ├── NavLinks.tsx
│   ├── Marquie.tsx
│   ├── SignInSignUp.tsx
│   ├── hero.tsx
│   ├── PriceIncrease.tsx
│   ├── PriceDecrease.tsx
│   ├── AllProducts.tsx
│   ├── ProductList.tsx
│   ├── ProductSkeleton.tsx
│   ├── ChangedBadge.tsx
│   ├── SummaryCard.tsx
│   ├── ToastError.tsx
│   └── Footer.tsx
├── lib/
│   ├── auth.ts
│   ├── auth-client.ts
│   └── utlis.ts
└── proxy.ts
```

---

## 🚀 Getting Started

Follow these steps to run DailyBazar locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)
- A MongoDB database
- Google and GitHub OAuth credentials (if you want to enable social login)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd market-prices
```

Replace `<your-repository-url>` with your GitHub repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
MONGODB_URL=your_mongodb_connection_string

BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Replace the placeholder values with your actual credentials.

**Important:** Never commit your `.env` file or expose database credentials, OAuth secrets, or other sensitive environment variables in a public repository.

### 4. Configure OAuth Callback URLs

To enable Google and GitHub authentication, configure the callback URLs in the respective developer consoles.

**Google OAuth**

```text
http://localhost:3000/api/auth/callback/google
```

**GitHub OAuth**

```text
http://localhost:3000/api/auth/callback/github
```

For production, configure the corresponding URLs using your deployed domain:

```text
https://market-prices-ochre.vercel.app/api/auth/callback/google
https://market-prices-ochre.vercel.app/api/auth/callback/github
```

Make sure your OAuth provider settings and Better Auth configuration use the correct URLs.

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

To create a production build:

```bash
npm run build
```

To start the production server locally:

```bash
npm start
```

---

## ☁️ Deployment on Vercel

Follow these steps to deploy DailyBazar.

1. Push your project to GitHub.
2. Sign in to [Vercel](https://vercel.com/).
3. Import your GitHub repository and configure the project.
4. Add the required environment variables under **Project Settings → Environment Variables**.
5. Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` to use your production domain.
6. Configure the production callback URLs in Google Cloud Console and GitHub OAuth settings.
7. Configure MongoDB Atlas network access to allow connections from your deployment environment.
8. Deploy the project.
9. Redeploy whenever you change environment variables.

**Production environment variables**

```env
MONGODB_URL=your_production_mongodb_connection_string

BETTER_AUTH_URL=https://market-prices-ochre.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://market-prices-ochre.vercel.app

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Use the correct domain if you deploy to a different URL.

**MongoDB security:** Configure network access according to your deployment's requirements. If you use `0.0.0.0/0` for connectivity, understand that it permits connection attempts from any IP address; protect your database with strong credentials and appropriate database permissions.

---

## 🔒 Authentication Notes

- Email verification is not implemented.
- Forgot-password functionality is not implemented.
- Successful email/password registration redirects users to the sign-in page rather than automatically signing them in.
- Product details and profile routes are intended for authenticated users.
- Google and GitHub authentication require valid OAuth credentials and callback URLs.

---

## 📱 Responsive Design

DailyBazar is designed to work across different screen sizes.

| Device | Product Grid |
|---|---|
| Mobile | 1 column |
| Tablet | 2 columns |
| Desktop | 3 columns |

Navigation, product cards, price tables, and authentication controls are designed to adapt to smaller screens.

---

## 🎯 Project Goals

DailyBazar aims to make essential commodity prices easier to explore and compare through a simple, accessible Bangla interface.

The project brings together:

- Daily price tracking.
- Product and category discovery.
- Market-wise price comparison.
- Price-change visualization.
- User authentication and profile management.
- Responsive web design.

---

## 📌 Future Improvements

Potential enhancements for future versions include:

- Historical price charts.
- Search and advanced filtering.
- Market location selection.
- Price alerts and notifications.
- Favorite products and watchlists.
- Improved price trend analysis.

---

## 👨‍💻 Author

**Ismail Hasan Takid**

- GitHub: [@IsmailHasanTakid](https://github.com/IsmailHasanTakid)
- Live Project: [DailyBazar](https://market-prices-ochre.vercel.app/)
