

# 🌟 Devfolio – Dynamic Portfolio Builder

**License:** MIT
**Stack:** Next.js · MongoDB Atlas · Tailwind CSS · JWT · Image Upload API

---

## 🧠 The Problem

Developers and freelancers need **personal portfolios** that are easy to maintain, customizable, and up-to-date—**without editing code every time** they gain experience or build something new.

Yet, most portfolio solutions are:

* 🔒 Static (hardcoded content)
* 😫 Inflexible (require code changes)
* ❌ Non-collaborative (no real-time data handling or UI updates)

---

## ✅ Our Solution

**Devfolio** is a dynamic, self-hosted portfolio builder that empowers developers to:

* ⚡ **Log in** securely
* 🛠️ **Add/update/delete** their work with ease
* 🖼️ **Upload images** of their projects and contributions
* 💡 **Preview changes live** with a beautiful interface
* 🌘 **Toggle dark/light themes** intuitively

> Perfect for showcasing technical experience, side projects, and employment history—**without touching the codebase.**

---

## 🎯 Who It’s For

| User Type          | Use Case                                         |
| ------------------ | ------------------------------------------------ |
| Developers         | Maintain a living portfolio that grows with them |
| Bootcamp Graduates | Easily document new skills and projects          |
| Freelancers        | Showcase completed work dynamically              |
| Agencies           | Enable dev clients to manage their own content   |

---

## 🧰 Tech Stack

| Layer        | Tech Stack               | Purpose                         |
| ------------ | ------------------------ | ------------------------------- |
| **Frontend** | Next.js + Tailwind CSS   | SEO-ready, responsive UI        |
| **Database** | MongoDB Atlas            | Store user, project, experience |
| **Auth**     | JWT (custom or NextAuth) | Secure login and user sessions  |
| **Uploads**  | Image Upload API         | Project/work image support      |
| **Hosting**  | Vercel / Netlify         | CI/CD for production deployment |

---

## ⚙️ Core Features

| Feature              | Description                                              |
| -------------------- | -------------------------------------------------------- |
| 👤 **User Auth**     | Sign up/log in with JWT & secure session management      |
| 📦 **CRUD System**   | Create, update, and delete Projects & Experience entries |
| 🖼️ **Image Upload** | Upload and display project images in real time           |
| 🌗 **Dark Mode**     | Theme toggle saved to user preference                    |
| 🔁 **Live Preview**  | Edits are rendered instantly on portfolio pages          |

---

## 🖼️ Screenshots

| Auth & Dashboard                                                                         | Project Editor                                                                           | Responsive UI                                                                            |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| ![img1](https://github.com/user-attachments/assets/4c229226-b41d-465f-85c0-5adc640a4606) | ![img2](https://github.com/user-attachments/assets/01a20985-d19d-4484-81d9-644e0624a5e9) | ![img3](https://github.com/user-attachments/assets/a58a3eee-4997-4e85-a0e4-93bdc40a3a2d) |
| ![img4](https://github.com/user-attachments/assets/6ecf4b02-1e68-48d3-80a8-19a1df5175cc) | ![img5](https://github.com/user-attachments/assets/44757da6-0913-4595-bbda-8a3900bd12f4) | ![img6](https://github.com/user-attachments/assets/0b73a86f-d4e9-4c97-85f7-880f7afff81d) |
| ![img7](https://github.com/user-attachments/assets/9063bace-3987-43b3-84d3-7a4567ab91aa) | ![img8](https://github.com/user-attachments/assets/18a83412-d24e-4141-95d2-25196bdf3cdb) |                                                                                          |

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/tochi2055/devfolio.git
cd devfolio
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure `.env.local`

Create the following file:

```env
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your_jwt_secret_key
IMAGE_UPLOAD_URL=https://your-image-upload-api.com/upload
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Set Up MongoDB Atlas

* Create a new cluster and database
* Add a "portfolios" collection (or dynamic per user)
* Get the connection string and plug it into `MONGODB_URI`

### 5. Image Upload Setup

If you're using:

* **Cloudinary / S3 / Uploadthing** — update `IMAGE_UPLOAD_URL` to your handler
* Ensure your frontend uses `FormData` and the API returns a URL string

### 6. Start the Dev Server

```bash
npm run dev
# or
yarn dev
```

Browse to: [http://localhost:3000](http://localhost:3000)

### 7. Build for Production

```bash
npm run build
npm start
```

---

## 📦 Deployment Guide

Recommended platforms:

* **Vercel**:

  1. Connect GitHub repo
  2. Add `.env.local` variables
  3. Deploy → Done ✅

* **Netlify**:

  1. Set `npm run build && npm start` as build command
  2. Add environment variables
  3. Deploy and monitor

---

## 🧪 Testing (Optional)

If you’ve added tests:

```bash
npm test
# or
yarn test
```

Test auth logic, dashboard CRUD, and form validation.

---

## 🗂️ Usage Preview

| Action             | Behavior                            |
| ------------------ | ----------------------------------- |
| 📝 Add Project     | Form with title, desc, image upload |
| 🧠 Edit Experience | Auto-fills existing data            |
| ❌ Delete Entry     | One-click removal with confirmation |
| 🎨 Dark Mode       | Toggle & saved in user preference   |
| ⚡ Live Preview     | Updates reflect instantly           |

---

## 🙌 Contributing

Want to improve Devfolio?

1. Fork the repository
2. Create a branch: `git checkout -b feat/my-feature`
3. Commit changes with clear messages
4. Push: `git push origin feat/my-feature`
5. Open a pull request

💡 Don’t forget to:

* Format with ESLint/Prettier
* Add test coverage where relevant
* Keep commit messages descriptive

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 💬 FAQ

**Q:** Can I use another image service?
**A:** Yes — replace `IMAGE_UPLOAD_URL` and update your upload logic accordingly.

**Q:** How can I add social links?
**A:** Extend the user schema in the database and update dashboard + frontend.

**Q:** Can I make it multi-user?
**A:** Yes — current setup is per-user. You can scale it for multi-tenant support with role-based access.
