## 🧩 Overview

- [HyperExecute](https://www.lambdatest.com/hyperexecute) is a smart test orchestration platform that helps you run Cypress tests faster and more reliably.
- [Smart UI](https://www.lambdatest.com/smart-ui) is LambdaTest’s visual regression testing tool that captures snapshots and detects UI changes in your web app.

By combining both, you can run fast, parallel Cypress tests **with automatic visual diffing** — all from the CLI.

> **Note**: SmartUI SDK only supports Cypress versions >= 10.0.0

---

## ⚙️ Prerequisites

Before you begin, ensure you have:

- A **Cypress test suite**
- **Node.js v16+**
- A **LambdaTest account** – [Sign up](https://accounts.lambdatest.com/register)
- Your:
  - `LT_USERNAME`
  - `LT_ACCESS_KEY`
  - `PROJECT_TOKEN` (from Smart UI dashboard)

---

## 📦 Project Setup

### 1. Clone or Create Cypress Project

```bash
git clone <your-cypress-repo-url>
cd <project-folder>
npm install
```
# ⚡️ HyperExecute Setup

## 2. Generate a Sample HyperExecute YAML

Use the LambdaTest wizard to generate a `.hyperexecute.yaml` file:

🔗 [Generate YAML](https://hyperexecute.lambdatest.com/quickstart/generateYAML)

Copy the generated YAML file into the **root** of your project.

## 3. Download HyperExecute CLI

Download the CLI for your OS:

- Mac: https://downloads.lambdatest.com/hyperexecute/darwin/hyperexecute
- Linux: https://downloads.lambdatest.com/hyperexecute/linux/hyperexecute
- Windows: https://downloads.lambdatest.com/hyperexecute/windows/hyperexecute.exe

Place the binary in your **project root**. Then:

```bash
# macOS/Linux only - incase you encounter `hyperexecute: command not found`
# ensure that the system has permission to execute the CLI
chmod u+x ./hyperexecute
```

## 4. Set LambdaTest Credentials

You can either:

### A. Set Environment Variables

For macOS:

```bash
export LT_USERNAME=<your-lambdatest-username>
export LT_ACCESS_KEY=<your-lambdatest-access-key>
```

For Linux:

```bash
export LT_USERNAME=<your-lambdatest-username>
export LT_ACCESS_KEY=<your-lambdatest-access-key>
```

For Windows:

```bash
set LT_USERNAME=<your-lambdatest-username>
set LT_ACCESS_KEY=<your-lambdatest-access-key>
```

### B. OR Pass Them as Flags (command line args)

```bash
./hyperexecute -u <LT_USERNAME> -k <LT_ACCESS_KEY> ...
```

# 🔍 Smart UI Integration

## 5. Create a Smart UI Project

1. Go to [SmartUI Projects page](https://smartui.lambdatest.com/)
2. Click on the `New Project` button
3. Select the platform as **CLI** for executing your `SDK` tests.
4. Add name of the project, approvers for the changes found, tags for any filter or easy navigation.
5. Click on the **Submit**.
6. Copy `PROJECT_TOKEN` from Project Settings

## 6. Set Smart UI Project Token

For macOS/Linux:

```bash
export PROJECT_TOKEN=<your-smart-ui-project-token>
```

For Windows:
```bash
set PROJECT_TOKEN=<your-smart-ui-project-token>
```

## 7. Install Smart UI Modules

```bash
npm install --save-dev @lambdatest/smartui-cli @lambdatest/cypress-drive
```
---

# 🛠 Cypress Code Changes

## 8. Import Smart UI Driver

In `cypress/support/e2e.js`:

```javascript
import '@lambdatest/cypress-driver';
```
## 9. Add Logging in Cypress Plugin

In `cypress/plugins/index.js`:

```javascript
module.exports = (on, config) => {
  on('task', {
    log(message) {
      console.log(message);
      return null;
    }
  });
};
```

## 10. Adding SmartUI function to take screenshot

You can incorporate SmartUI into your custom Cypress test script, as shown below:

```javascript
/// <reference types="cypress" />

describe('Test Case name', () => {
  beforeEach(() => {

    cy.visit('Required URL')
  })

  it('SmartUI Snapshot', () => {
    cy.smartuiSnapshot('Screenshot Name');
  })
})
```
---

# 🧾 Update Hyperexecute YAML
Here’s how to modify your YAML file to work with Smart UI:

```bash
env:
  PROJECT_TOKEN: ${PROJECT_TOKEN}  # You can use LambdaTest Secrets UI too

pre:
  - npm install @lambdatest/smartui-cli @lambdatest/cypress-driver cypress@13
  - npx smartui config:create smartui-web.json

testRunnerCommand: npx smartui config smartui-web.json exec -- {existingCypressRunCmd}
```

**Note**: This wraps your Cypress tests with Smart UI CLI to enable snapshot capture and visual testing.

# 📂 `.gitignore` Recommendations

Make sure your `.gitignore` file includes:

```bash
node_modules/
package-lock.json
.DS_Store
smartui-web.json
```

# ▶️ Running the Tests

Once setup is done, run the below command in your terminal at the root folder of the project:
```bash
./hyperexecute --config <path_to_yaml_file>
```

In case you would like to pass the username and access key via command line, you can use the below command:

```bash
./hyperexecute --user <your-lambdatest-username> --key <your_lambdatest_access_key> --config <path_to_yaml_file>
```

# ✅ Your tests will now:

- Run on [HyperExecute](https://hyperexecute.lambdatest.com/) infrastructure
- Capture Smart UI snapshots
- Automatically detect and highlight UI diffs

# 🧪 View Visual Testing Results

Visit your project dashboard:
- 🔗 [Smart UI Dashboard](https://smartui.lambdatest.com/)
- ✅ Passed tests show no visual changes
- 🛑 Failing tests show visual diffs

📸 All screenshots are stored and baseline versions can be updated

# 📚 Resources

- [HyperExecute Docs](https://www.lambdatest.com/support/docs/getting-started-with-hyperexecute/)
- [Smart UI Docs](https://www.lambdatest.com/support/docs/smart-visual-regression-testing/)
- [LambdaTest Learning Hub](https://www.lambdatest.com/learning-hub/)

# 🙋 Need Help?
- [Contact Us](mailto:support@lambdatest.com)
- [LambdaTest Community](https://community.lambdatest.com/)

