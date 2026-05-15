# Food Delivery Platform - Full Stack MERN Application

A modern food delivery application built with **MERN stack** (MongoDB, Express, React, Node.js) featuring user-facing app, admin dashboard, and backend API. Perfect for learning full-stack development!

## 🌐 Live Deployment

- **Backend API:** deploy separately on a persistent Node host
- **User App:** deploy `userFrontend/` to Vercel
- **Admin Dashboard:** deploy `adminfrontend/` to Vercel

> Note: Vercel is a good fit for the two React frontends. The backend uses file uploads and needs persistent storage, so it should stay on a Node host such as Render, Railway, Fly, or similar unless you redesign uploads for cloud storage.

---

## 📋 Project Structure

```
23BCE2086_FSD/
├── backend/              # Node.js + Express + MongoDB
├── userFrontend/         # User-facing React app
├── adminfrontend/        # Admin dashboard React app
└── README.md
```

### **Backend** - REST API Server
- Node.js with Express.js
- MongoDB database with Mongoose ORM
- JWT authentication
- Stripe payment integration
- Image upload handling with Multer
- RESTful API endpoints for food, users, cart, and orders

### **User Frontend** - Customer Application
- React 19 with Vite bundler
- React Router for navigation
- Context API for state management
- Stripe payment integration
- Responsive design with CSS modules
- Toast notifications with React Hot Toast

### **Admin Frontend** - Management Dashboard
- React 19 with Vite bundler
- Admin controls for food inventory
- Order management and status tracking
- Image upload for food items
- Notifications with React Toastify

---

## 🛠 Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Frontend | React | 19.1.0 |
| Bundler | Vite | 7.0.0 |
| Backend | Node.js | 18+ |
| Framework | Express.js | 5.1.0 |
| Database | MongoDB | Cloud (Atlas) |
| Routing | React Router | 7.6.3 |
| HTTP Client | Axios | Latest |
| Authentication | JWT | 9.0.2 |
| Security | Bcryptjs | 3.0.2 |
| File Upload | Multer | 2.0.1 |
| Payments | Stripe | 18.2.1 |

---

## ✨ Key Features

### User Features
✅ Browse food by categories (Salad, Rolls, Deserts, Sandwich, Cake, etc.)  
✅ User registration and authentication  
✅ Shopping cart with add/remove items  
✅ Stripe payment integration  
✅ Order placement with delivery address  
✅ Order tracking and history  
✅ Responsive mobile-friendly UI  

### Admin Features
✅ Add new food items with images  
✅ View and manage food inventory  
✅ Delete food items  
✅ View all customer orders  
✅ Update order status (Processing → Out for Delivery → Delivered)  
✅ Real-time order tracking  

### Backend Features
✅ RESTful API with proper error handling  
✅ JWT-based authentication  
✅ MongoDB data persistence  
✅ Image upload and storage  
✅ Secure payment processing with Stripe  
✅ CORS enabled for multi-domain support  

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (cloud database)
- Stripe account (payment processing)
- Git

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/VK-SHRIDHARAN/23BCE2086_FSD.git
cd 23BCE2086_FSD
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=4000
DB_URI=mongodb+srv://username:password@cluster.mongodb.net/foodprep
JWT_TOKEN_SECRET=your_jwt_secret_key_min_32_characters
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
FRONTEND_URL=https://your-user-app.vercel.app
NODE_ENV=development
```

Start the backend:
```bash
npm run server
```

Backend will run on `http://localhost:4000`

#### 3. User Frontend Setup
```bash
cd userFrontend
npm install
```

Create a `.env` file:
```env
VITE_API_URL=https://your-backend-domain.com
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

Start development server:
```bash
npm run dev
```

Access at `http://localhost:5173`

#### 4. Admin Frontend Setup
```bash
cd adminfrontend
npm install
```

Create a `.env` file:
```env
VITE_API_URL=https://your-backend-domain.com
```

Start development server:
```bash
npm run dev
```

Access at `http://localhost:5174` (or next available port)

---

## 📚 API Endpoints

### Food Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/food/list` | Get all food items |
| POST | `/api/food/add` | Add new food (multipart/form-data) |
| DELETE | `/api/food/remove?id={id}` | Delete food item |

### User Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/register` | User registration |
| POST | `/api/user/login` | User login |

### Shopping Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cart/add` | Add item to cart |
| GET | `/api/cart/get` | Get user's cart |
| DELETE | `/api/cart/remove?itemId={id}` | Remove item from cart |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/order/place` | Create order and Stripe session |
| POST | `/api/order/verify` | Verify payment |
| GET | `/api/order/userorders` | Get user's orders |
| GET | `/api/order/list` | Get all orders (admin) |
| POST | `/api/order/status` | Update order status |

---

## 🗄 Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed with bcryptjs),
  cartData: Object (default: {})
}
```

### Food Schema
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  image: String (required),
  category: String (required, enum: ['Salad', 'Rolls', 'Deserts', ...])
}
```

### Order Schema
```javascript
{
  userId: String (required),
  items: Array (required),
  amount: Number (required),
  address: Object (required, { firstName, lastName, street, city, state, zipcode, country }),
  status: String (default: "Food Processing", enum: ['Food Processing', 'Out for Delivery', 'Delivered']),
  date: Date (default: current date),
  payment: Boolean (default: false)
}
```

---

## 🔐 Authentication & Security

- **Password Hashing:** Bcryptjs with 10 salt rounds
- **JWT Tokens:** Secure token-based authentication
- **Email Validation:** Input validation using validator.js
- **Protected Routes:** Auth middleware checks JWT in headers
- **CORS:** Configured for multi-domain requests
- **Environment Variables:** Sensitive keys stored in `.env` (not committed)

---

## 📦 Build & Deployment

### Build for Production

**Backend:** No build needed (Node.js runs directly)

**Frontend Apps:**
```bash
# User Frontend
cd userFrontend
npm run build    # Creates dist/ folder

# Admin Frontend
cd adminfrontend
npm run build    # Creates dist/ folder
```

### Deploy to Vercel

1. Create one Vercel project for `userFrontend/` and another for `adminfrontend/`.
2. Set the root directory for each project to the matching folder.
3. Add `VITE_API_URL` in each frontend project to your deployed backend URL.
4. Set `FRONTEND_URL` in the backend environment to the deployed user app URL.
5. Build command: `npm run build`.
6. Output directory: `dist`.

If you want to keep the backend on Vercel too, the upload flow needs a storage redesign first because Vercel does not provide persistent local disk for uploaded images.

---

## 🌍 Environment Variables

### Backend (.env)
```
PORT - Server port (default: 4000)
DB_URI - MongoDB connection string
JWT_TOKEN_SECRET - Secret for JWT signing (min 32 chars)
STRIPE_SECRET_KEY - Stripe API secret key
FRONTEND_URL - Public URL of the user frontend
NODE_ENV - Environment (development/production)
```

### Frontend (.env)
```
VITE_API_URL - Backend API URL
VITE_STRIPE_PUBLIC_KEY - Stripe publishable key (user frontend only)
```

Refer to `.env.example` files in each directory for reference.

---

## 📊 Project Statistics

- **Total Files:** 260+
- **Backend Routes:** 4 (food, user, cart, order)
- **Frontend Components:** 15+
- **API Endpoints:** 13+
- **Database Collections:** 3 (users, foods, orders)
- **Languages:** JavaScript (73.5%), CSS (25.5%), HTML (1%)

---

## 🎓 Learning Outcomes

This project teaches:
- Full-stack MERN development
- RESTful API design with Express.js
- MongoDB and Mongoose ORM
- React component architecture
- State management with Context API
- Payment integration with Stripe
- JWT authentication
- File upload handling
- Deployment on cloud platforms
- Git version control

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open-source and available under the **MIT License**. See LICENSE file for details.

---

## 🆘 Troubleshooting

### Backend Connection Issues
- Verify MongoDB Atlas connection string
- Check if IP address is whitelisted in MongoDB Atlas
- Ensure JWT_TOKEN_SECRET is set and strong

### Frontend API Errors
- Confirm VITE_API_URL points to correct backend URL
- Check backend is running and accessible
- Verify CORS is enabled in Express

### Stripe Payment Issues
- Use Stripe test keys during development
- Verify STRIPE_PUBLIC_KEY and STRIPE_SECRET_KEY are correct
- Test with Stripe test card numbers

### Deployment Issues
- See [DEPLOYMENT.md](./DEPLOYMENT.md)
- Check GitHub Actions workflow logs
- Verify environment variables in Render dashboard

---

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation
- Review API endpoints and examples

---

## 🎯 Roadmap

- [ ] Add user reviews and ratings
- [ ] Implement real-time order notifications (Socket.io)
- [ ] Add multiple payment methods
- [ ] User dashboard with saved addresses
- [ ] Advanced admin analytics
- [ ] Mobile app (React Native)
- [ ] Delivery partner tracking

---

**Happy Coding! 🚀**

Made with ❤️ by VK-SHRIDHARAN
