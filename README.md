

# 🌟 Devfolio — Dynamic Portfolio Builder

**Devfolio** empowers developers to create and manage their own portfolio websites dynamically through a sleek, user-friendly interface.

## 📋 Key Skills / Tech Stack

* **Next.js** – Server-side rendering & optimized routing
* **MongoDB Atlas** – Cloud database for user profiles & portfolio data
* **Tailwind CSS** – Responsive UI styling
* **Image Upload API** – Allows users to upload project/work images
* **Advanced UI Features** – Intuitive forms, modals, data validation

---

## 🚀 Core Features

* **User Authentication**
  Secure login/signup to safely manage portfolio content.

* **CRUD Operations**
  Full create/edit/delete support for projects, work experience, and personal sections.

* **Image Uploading**
  Seamless uploads via API, stored and served in your portfolio.

* **Dark Mode Toggle**
  Users can switch between light and dark themes.

* **Dynamic Data Fetching**
  Real-time preview and rendering of portfolio changes on the frontend.

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/tochi2055/devfolio.git
cd devfolio
```

### 2. Install Dependencies

Install via npm or yarn:

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` in the project root with:

```bash
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your_jwt_secret_key
IMAGE_UPLOAD_URL=https://your-image-upload-api.com/upload
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Configure MongoDB Atlas

* Log into [MongoDB Atlas](https://cloud.mongodb.com/).
* Create a new cluster & database.
* Add a collection for user portfolios.
* Get the connection string and paste into `MONGODB_URI`.

### 5. Image Upload API (Optional)

* If using third-party image hosting (like Cloudinary or AWS S3), configure the API endpoint and credentials.
* Replace `IMAGE_UPLOAD_URL` in `.env.local` with your upload endpoint.
* Ensure FormData and upload route match your backend implementation.

### 6. Run Locally

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to access Devfolio.

### 7. Build for Production

```bash
npm run build
npm start
```

Ensure production env variables are correctly set before deploying.

---

## 🧪 Testing (if applicable)

If you have test scripts set up:

```bash
npm test
# or
yarn test
```

Ensure functionality like auth, CRUD ops, and uploads are covered.

---

## 🚀 Deployment Tips

Deploy to platforms like **Vercel** or **Netlify**:

1. Connect the GitHub repo.
2. Add environment variables via the platform’s dashboard.
3. Set build command: `npm run build && npm start`.
4. Deploy and monitor for any build/runtime issues.
---
# screenshot 
![Screenshot (259)](https://github.com/user-attachments/assets/4c229226-b41d-465f-85c0-5adc640a4606)
![Screenshot (260)](https://github.com/user-attachments/assets/01a20985-d19d-4484-81d9-644e0624a5e9)
![Screenshot (264)](https://github.com/user-attachments/assets/a58a3eee-4997-4e85-a0e4-93bdc40a3a2d)
![Screenshot (261)](https://github.com/user-attachments/assets/d2ff8087-f429-41a8-8a18-64d8ba594cdd)
![Screenshot (265)](https://github.com/user-attachments/assets/6ecf4b02-1e68-48d3-80a8-19a1df5175cc)
![Screenshot (266)](https://github.com/user-attachments/assets/44757da6-0913-4595-bbda-8a3900bd12f4)
![Screenshot (267)](https://github.com/user-attachments/assets/0b73a86f-d4e9-4c97-85f7-880f7afff81d)
![Screenshot (268)](https://github.com/user-attachments/assets/9063bace-3987-43b3-84d3-7a4567ab91aa)
![Screenshot (270)](https://github.com/user-attachments/assets/18a83412-d24e-4141-95d2-25196bdf3cdb)

---

## 🗂️ Usage Preview

* **Sign up/log in** to access your dashboard.
* **Add new items** in Projects or Work Experience with title, description, image upload.
* **Edit or delete** items easily via intuitive UI controls.
* **Toggle Dark Mode** using the theme switch (theme preference saved automatically).
* **Live preview** updates in real time.

---

## 🤝 Contributing

Contributions are always welcome! To contribute:

1. Fork the repo
2. Create a new branch: `git checkout -b feat/my-feature`
3. Make your changes and commit with clear messages
4. Push and open a Pull Request

Please ensure code style consistency (ESLint/Prettier) and add tests where applicable.

---

## 📄 License

Distributed under the **MIT License** — see `LICENSE` for full terms.

---

## 🧠 FAQ

**Q:** Can I connect my own image storage?
**A:** Yes! Swap out the upload route in `.env.local`. Just ensure your API returns a hosted image URL.

**Q:** How can I customize layout or theme?
**A:** Modify global CSS (Tailwind config) and update the theme provider to match your brand colors.

**Q:** Is there support for social media links?
**A:** Not yet—but it's easy to add a section in the user dashboard and adjust frontend render logic.




