# 📧 MailSwift

MailSwift is an **AI Copilot for Email** — available as a Chrome Extension and Web App — that helps you **draft smarter emails, generate instant responses, and summarize long threads** to save time and boost productivity.  

Built with **ASP.NET Core (C#)**, **React**, and **Azure OpenAI GPT-4**, MailSwift integrates seamlessly into your workflow to make daily communication faster, clearer, and more effective.

---

## ✨ Key Features

- ✍️ **AI Drafting** – Generate professional, creative, or concise emails with a single click.  
- 🔁 **Response Generation** – Automatically compose replies tailored to the tone and context of ongoing conversations.  
- 📑 **Summarization** – Turn lengthy email chains into clear, actionable summaries.  
- 📂 **Template System** – Start from blank, thank-you, application, or follow-up templates.  
- 🖥️ **Chrome Extension** – Access AI features directly inside Gmail and other webmail clients.  
- 🌐 **Web Dashboard** – Manage drafts, view recent documents, and edit saved templates.  

---

## 🏗️ Tech Stack

- **Frontend:** React + Tailwind + Chrome Extension API  
- **Backend:** ASP.NET Core (C#) Web API  
- **Database:** SQLite (`store.db`)  
- **AI Integration:** Azure OpenAI GPT-4 (`gpt-4.0`, `gpt-35-turbo`)  
- **Other:** Entity Framework Core, Swagger UI for API testing  

---

## 📸 Screenshots

- **Landing Page** – Modern, minimal UI for onboarding users
<img width="700" height="300" alt="Screenshot 2025-09-01 at 11 20 25 AM" src="https://github.com/user-attachments/assets/9f53386a-61f9-4e16-ab81-9bc227b99e52" />
 
- **Smart Email Editor** – Draft, edit, and auto-enhance with AI Copilot
<img width="700" height="300" alt="Screenshot 2025-09-01 at 11 20 46 AM" src="https://github.com/user-attachments/assets/9c78cfb6-2cc9-4c17-8f9b-75cb97f19453" />

- **Template Gallery** – Quickly start new documents from preset templates
<img width="700" height="300" alt="Screenshot 2025-09-01 at 11 20 25 AM" src="https://github.com/user-attachments/assets/0e065c14-03a9-44b7-a9ee-f69af5401472" />

- **Chrome Extension** – Draft, summarize, or respond to emails without leaving Gmail  
<img width="700" height="300" alt="Screenshot 2025-09-01 at 11 21 35 AM" src="https://github.com/user-attachments/assets/211ecf1d-5248-4461-9d13-5ad35e52e506" />

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/phananhnguyen1204/MailSwift.git
```

### 2. Backend Setup
```bash
cd backend/API
dotnet restore
dotnet watch run
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4. Chrome Extension
- Navigate to chrome://extensions/ in your browser.
- Enable Developer Mode → Click Load Unpacked.
- Select the extension/ folder.
- You’ll see the MailSwift icon appear in your toolbar 🎉.
