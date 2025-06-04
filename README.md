# Nota Grade

[🇧🇷 Versão em português](./README.pt.md)
![Nota Certa Banner](https://github.com/mafortthiago/right-grade/blob/main/public/fundo.png?raw=true)

## Description

Right Grade is a web app created to help teachers organize and centralize the management of grades and classes in a simple, intuitive, and efficient way. The goal is to make it easier to monitor student performance and optimize the teacher's time.

## Features

- Register and manage classes.
- Enter and edit grades.
- Manage assessments and recovery exams.
- Support for Portuguese and English.

## Technologies Used

- **React**:

  JavaScript library used to build interactive and reusable user interfaces.

- **TypeScript**:

  Used for better data typing, adding safety and clarity to JavaScript code.

- **Vite**:

  Tool used to build the project.

- **Tailwind CSS**:

  Utility-first CSS framework used to quickly create styles.

- **Context API**:

  Used for global state management of theme and snackbar display.

- **Zustand**:

  State management library that stores data fetched from the API to avoid too many requests and perform API queries.

- **i18next**:

  Used for application internationalization, providing texts in portuguese and english.

- **react-router-dom**:

  Library for route management and navigation.

- **react-icons**:

  Library that provides a collection of icons.

- **framer-motion**:

  Library for component animations.

- **@tanstack/react-table**:

  Library for creating and managing tables in the application.

## Installation

- Make sure the back-end (API) is running. API repository:
  https://github.com/mafortthiago/right-grade-api

1. Clone the repository:
   ```bash
   git clone https://github.com/mafortthiago/right-grade.git
   ```
2. Go to the project folder:
   ```bash
   cd nota-certa
   ```
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Add a `.env` file at the root of the project indicating where the back-end is:
   ```bash
      Example content:
      VITE_API_URL=http://localhost:8080
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## How to Use

- Access `http://localhost:5173` in your browser after starting the server.
- Create your account or log in.
- Register your classes and start entering student grades.

## Contribution

Contributions are welcome! To contribute:

1. Fork the project
2. Create a branch for your feature or fix (`git checkout -b my-feature`)
3. Commit your changes (`git commit -m 'My new feature'`)
4. Push to the branch (`git push origin my-feature`)
5. Open a Pull Request

## License

This project is licensed under the CC BY-NC 4.0 license. See the [LICENSE](LICENSE) file for more details.

## Contact

Developed by Thiago Mafort. Contact via [LinkedIn](https://www.linkedin.com/in/thiago-mafort/) or open an issue in this repository.
