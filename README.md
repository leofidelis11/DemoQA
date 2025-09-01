# DemoQA

**API Test automation** using Mocha, Supertest, Chai, and **Web Test Automation** using Cypress—with test reporting via Mochawesome and CI integration via GitHub Actions.

---

## 🚀 Technologies Used

- **API Testing:** Mocha, Chai, Supertest  
- **UI Testing:** Cypress  
- **Reporting:** Mochawesome  
- **CI/CD:** GitHub Actions  

---

## 📂 Project Structure

```
DemoQA/
│
├── .github/
│   └── workflows/           # CI configuration for GitHub Actions
│
├── cypress/                 # Cypress UI test suite
│   ├── e2e/                 # End-to-end test specs
│   ├── fixtures/            # Sample data files
│   ├── reports/             # UI html report
│   └── support/			 # Custom commands & overrides
│
├── test/
│   └── API/                 # API test suite (Mocha/Supertest)
│
├── cypress.config.js        # Cypress configuration file
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Dependency lockfile
└── sampleFileToUpload.txt   # Example test asset
```

---

## ✅ Prerequisites

Before getting started, ensure you have:

- [Node.js](https://nodejs.org/) (14.x or higher)  
- [npm](https://www.npmjs.com/) (comes with Node.js)  

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/leofidelis11/DemoQA.git
cd DemoQA
```

### 2. Install dependencies

```bash
npm install
```

This installs all dependencies, including Mocha, Chai, Supertest, Cypress, and Mochawesome.

---

## 🔎 Running API Tests & Generating a Report

To execute your API test suite using Mocha with Supertest and Chai:

```bash
npm run test:api
```

This produces a html report in the `mochawesome-report/` directory.

---

## 🎯 Running UI (Cypress) Tests & Viewing the Report

#### Run Cypress in headless mode:
To run your Cypress tests and generate test reports:

```bash
npm run test:ui
```

Cypress will run headlessly, and Mochawesome will generate a report under `cypress/reports/html`.

#### Run Cypress in headed mode:
Open Cypress app and see tests running in Cypress runner

```bash
npx cypress open
```

---

## 🔄 CI Integration via GitHub Actions

This project includes a CI pipeline configured in `.github/workflows/`, which automatically:
 
- Compile and build project
- Installs dependencies 
- Runs both API and UI tests  

When  changes are pushed or merges, GitHub Actions will trigger the tests—keeping the project continuously validated.

---

