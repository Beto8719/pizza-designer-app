# **Pizza Designer App**

This is a **Pizza Designer App** built using **Angular 17** with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.0. The app allows users to manage pizzas and toppings, including adding, updating, and displaying pizzas and their associated toppings. The application is designed for simplicity, scalability, and performance.

---

## **Table of Contents**

1. [Overview](#overview)
2. [Technical Choices](#technical-choices)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Running the Application](#running-the-application)
6. [Building the Application](#building-the-application)
7. [Testing the Application](#testing-the-application)
8. [Code Coverage](#code-coverage)
9. [Troubleshooting](#troubleshooting)
10. [License](#license)

---

## **Overview**

The **Pizza Designer App** enables users to:

- Add new toppings or delete toppings.
- Add new pizzas with specific toppings or delete pizzas created.
- Update and manage pizzas and toppings.
- View the list of pizzas and toppings.

This project is designed to demonstrate clean architecture, maintainable code practices, and the use of Angular's features such as **components, services, and testing tools**.

---

## **Technical Choices**

### **1. Framework**

- **Angular 17**: Chosen for its robust structure, ease of component-based architecture, and TypeScript integration.

### **2. Styling**

- **SCSS**: Used for styling with reusable classes, enhancing modularity and readability.

### **3. Testing**

- **Jasmine** & **Karma**: Used for unit testing the components and services.

### **4. State Management**

- Simple state management via **services** to avoid unnecessary complexity.

### **5. Cloud Hosting**

- Recommended free hosting platforms like **Firebase Hosting** or **Vercel** for deployment.

---

## **Prerequisites**

Before you start, ensure that you have the following tools installed on your machine:

- **Node.js** (v18+ recommended): [Install Node.js](https://nodejs.org/)
- **Angular CLI** (v17+): Install globally via `npm` or `yarn`:
  ```bash
  npm install -g @angular/cli
  ```
- **Git**: [Install Git](https://git-scm.com/)

---

## **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/Beto8719/pizza-designer-app.git
   cd pizza-manager
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

---

## **Running the Application**

To run the development server locally:

```bash
ng serve
```

- The app will be available at **[http://localhost:4200](http://localhost:4200)**.
- The app will reload automatically if you make changes to the source code.

---

## **Building the Application**

To build the application for production:

```bash
ng build
```

- The output will be placed in the `dist/` folder.
- Use the `--configuration production` flag to optimize the build for production.

---

## **Testing the Application**

Run unit tests using the following command:

```bash
ng test
```

- This command uses **Karma** to execute unit tests and provides test results in the browser and terminal.

To run tests in a CI/CD-friendly environment:

```bash
ng test --watch=false --browsers ChromeHeadless
```

---

## **Code Coverage**

To generate a code coverage report:

```bash
ng test --code-coverage
```

- The report will be generated in the `coverage/` directory.
- Open `index.html` in a browser to view the detailed coverage.

---

## **Troubleshooting**

### **Common Issues**

1. **Port Already in Use**: If `http://localhost:4200` is busy, run the app on a different port:

   ```bash
   ng serve --port 4300
   ```

2. **Dependency Errors**: If dependencies fail, try:

   ```bash
   npm ci
   ```

3. **Browser Issues**: Ensure Chrome or a similar browser is installed for Karma tests.

4. **Outdated CLI**: Update Angular CLI to the latest version:

   ```bash
   npm uninstall -g @angular/cli
   npm install -g @angular/cli
   ```

---

## **Thought Process**

The development process for this app focused on the following:

1. **Maintainable Architecture**:

   - Dividing the app into **components** (e.g., `PizzasComponent`, `ToppingsComponent`) and **services** (e.g., `PizzasService`, `ToppingsService`).
   - Keeping services responsible for managing data and business logic.

2. **Scalability**:

   - Using Angular modules for future scalability.
   - Keeping styles modular with **SCSS**.

3. **Testing**:

   - Writing unit tests for components and services using **Jasmine**.
   - Ensuring clean and predictable code with a high level of coverage.

4. **User Experience**:

   - Simple and responsive UI.
   - Well-structured code for performance.

5. **Ease of Deployment**:

   - Ready to deploy on platforms like **Firebase** or **Vercel** with a production build.

---

## **License**

This project is licensed under the MIT License.

