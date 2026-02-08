# Ionic Angular - User Generator & Grammar Checker AI

This project is a mobile application built with **Ionic 7** and **Angular**, demonstrating the implementation of asynchronous programming patterns (**Promises** vs **Observables**) in real-world scenarios.

The app features a modern UI with a **Random User Generator** (using Async/Await) and a **Real-time Grammar Checker** (using RxJS & Google Gemini AI).

## 🚀 Features

### 1. Random User Generator (Studi Kasus 1)
- **Technology**: Uses JavaScript **Promises** (`async/await`) to handle HTTP requests.
- **Functionality**: Fetches random user data from [randomuser.me](https://randomuser.me/).
- **UI**: Displays user profile in a modern ID-card style layout with "pop-out" avatar effect.

### 2. Live Grammar Checker AI (Studi Kasus 2)
- **Technology**: Uses **RxJS Observables** (`Subject`, `debounceTime`, `switchMap`) for reactive programming.
- **Functionality**:
  - Real-time grammar checking as you type.
  - Integration with **Google Gemini API** for intelligent corrections.
  - Chat-like interface (WhatsApp style) for a natural user experience.
- **Key RxJS Operators**:
  - `debounceTime(1000)`: Waits for the user to stop typing for 1 second before sending a request.
  - `distinctUntilChanged()`: Prevents duplicate requests if the text hasn't changed.
  - `switchMap()`: Cancels previous pending requests if a new one is made (efficient resource usage).

## 🛠️ Tech Stack

- **Framework**: [Ionic Framework 7](https://ionicframework.com/)
- **Core**: [Angular](https://angular.io/) (Standalone Components)
- **State/Async**: RxJS, Promises
- **API**:
  - RandomUser.me API
  - Google Gemini AI API
- **Styling**: SCSS, Ionic CSS Utilities

## 📦 Installation & Setup

Follow these steps to run the project locally:

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/marsilodanang20/p8-pemrograman-bergerak.git
    cd p8-pemrograman-bergerak
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure API Key**
    - Open `src/app/services/gemini.service.ts`.
    - Replace `YOUR_API_KEY` with your actual Google Gemini API Key.
    ```typescript
    private apiKey = 'YOUR_ACTUAL_GEMINI_API_KEY';
    ```
    > **Note**: You can get a free API key from [Google AI Studio](https://aistudio.google.com/).

4.  **Run the Application**
    ```bash
    ionic serve
    ```
    The app will open in your browser at `http://localhost:8100/`.

## 📱 Build for Android (Optional)

If you want to build the APK:

```bash
ionic build
npx cap add android
npx cap copy
npx cap open android
```

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---
