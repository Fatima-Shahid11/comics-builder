# Comics Builder

**Comics Builder** is a web application built with **Next.js** that allows users to create comic scripts effortlessly. Users can write any text prompt and select the number of pages (1–5). Using the **Groq API** and **LLaMA AI models**, the app generates creative comic scripts, making storytelling fast, fun, and interactive.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Project Description](#project-description)

---

## Features

- Generate comic scripts based on any text prompt  
- Choose comic length from 1 to 5 pages  
- AI-powered generation using Groq API and LLaMA  
- Clean and responsive UI with interactive form inputs  
- Easy to extend for additional AI models or features  

---

## Demo

Once the app is running:

1. Enter your text prompt in the input field  
2. Select the number of pages (1–5)  
3. Click **Generate**  
4. The AI will produce comic scripts page by page  

---

## Installation

1. **Clone the repository**
**🔗 [https://github.com/Fatima-Shahid11/comics-builder](https://github.com/Fatima-shahid11/comics-builder)**

2. **Environment Variables**
  Create a `.env` file at the root of the project with the following variables:
  COMIC_BUILDER_API_KEY=your_groq_api_key_here

---

## Project Description

- **`pages/`**: Contains all Next.js pages. Each file represents a route in the app.  
- **`components/`**: Reusable React components used throughout the app.  
- **`public/`**: Static files such as images, icons, or fonts. Accessible publicly.  
- **`styles/`**: CSS files or Tailwind configurations for styling components.  
- **`.env`**: Environment variables for API keys or configurations (not committed to Git).  
- **`package.json`**: Lists dependencies, scripts, and project metadata.  
- **`README.md`**: This documentation file.
