# Job Portal — Frontend


## Objective

The main goal of this project is to build a **Job Portal Web Application** that connects **students seeking job opportunities** with **recruiters offering employment**.  
The frontend focuses on providing an **intuitive, responsive, and role-based user experience** using modern web technologies.

---

## Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | React.js (with Vite) |
| **State Management** | Redux |
| **Styling** | Tailwind CSS, Shadcn UI |
| **Build Tool** | Vite |
| **File Storage** | AWS S3 |
| **Version Control** | Git, GitHub |
| **Deployment** | Vercel |

---
## Key Features

- **Authentication & Authorization**
  - Separate login and signup for **Students** and **Recruiters**
  - JWT token-based access control (handled via backend)
  
- **Recruiter Features**
  - Register and login  
  - Register and get company  
  - Create, edit, and delete job posts  
  - View applicants with resume access  
  - Update application status (Pending, Under Review,Interview Scheduled, Hired, Rejected)
  - Pagination to comapny list and job list for better performance
  - loading/spinner component when data fetched

- **Student Features**
  - Register and login  
  - Browse all available job listings
  - Search functionality for job listings  
  - View detailed job descriptions  
  - Apply for jobs by uploading resumes  
  - View applied jobs and track status  
  - Edit profile (update skills, resume, photo)
  - Pagination to job list for better performance
  - loading/spinner component when data fetched

- **UI/UX**
  - Responsive layout using Tailwind CSS  
  - Interactive components via Shadcn UI  

---

## Installation & Setup

### Clone the repository
```bash
git clone https://github.com/your-username/job-portal-frontend.git
```
### Navigate into the project directory
```bash
cd job-portal-frontend
```

### Install dependencies
```bash
npm install
```
### Run the development server
```bash
npm run dev
```

## Developed By

**[Kamlesh Chandel](https://github.com/kamlesh-chandel)**  
> MERN Stack Developer | Passionate about building scalable and secure web applications
