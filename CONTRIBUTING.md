# 🤝 Contributing to OHANNA

Thank you for choosing to contribute to the **OHANNA** Egyptian Streetwear e-commerce platform! We appreciate your support in building a premium storefront.

Following these guidelines ensures that your contributions are merged swiftly and maintain the high quality of the codebase.

---

## 🧭 Development Workflow

### 1. File an Issue or Pick a Milestone
Before starting work, ensure there is an active issue tracking your task. This aligns design decisions and avoids duplicating work.

### 2. Configure Your Workspace
Refer to the [🛠️ Development Setup Guide](./docs/SETUP.md) to set up your local environment, install dependencies across workspaces (`api-server`, `ohanna`, `ohanna-mobile`), and run the dev server.

### 3. Git Branch Nomenclature
Create a descriptive branch for your work. Use the following prefix conventions:

| Branch Prefix | Purpose | Example |
| :--- | :--- | :--- |
| `feat/` | Adding a new feature | `feat/mobile-cart-blur` |
| `fix/` | Fixing a bug | `fix/api-cors-origin` |
| `docs/` | Documentation changes | `docs/contributing-guidelines` |
| `refactor/` | Non-functional code changes | `refactor/drizzle-connections` |
| `test/` | Adding or updating tests | `test/checkout-validation` |

---

## 📜 Conventional Commits Standard

We enforce the **Conventional Commits** specification for all commit messages. This keeps the git history clean, parseable, and allows for automated changelog generation.

### Format
```
<type>(<scope>): <short summary>

[Optional body detailing rationale and design considerations]

[Optional footer references like Closes #12]
```

### Allowable Types
* `feat`: A new user-facing feature.
* `fix`: A bug fix.
* `docs`: Documentation updates.
* `style`: Styling changes that do not affect code logic (whitespace, formatting).
* `refactor`: Code changes that neither fix a bug nor add a feature.
* `test`: Adding missing tests or correcting existing tests.
* `chore`: Updating build tasks, package manager configs, or dependencies.

### Examples
* `feat(mobile): implement horizontal apparel swipe carousel`
* `fix(api): correct Stripe webhook payload verification`
* `docs(readme): add Expo Metro port configurations`

---

## 📐 Code Quality & Integrity

Before submitting your pull request, verify that:
1. **Type Checks Pass**: Run `npm run typecheck` or `pnpm typecheck` in the respective workspace directory to ensure there are no TypeScript compiler errors.
2. **Formatting**: Ensure your files are clean and follow standard indentation rules.
3. **No Unused Code**: Clean up unused imports, dead logs, and troubleshooting comments.

---

## 🚀 Pull Request Submission Checklist

When you are ready to submit your PR:

- [ ] Rebase your branch onto the latest `main` branch to resolve conflicts.
- [ ] Fill out the PR description template (describe *what* changes were made, *why* they were made, and *how* you tested them).
- [ ] Verify that all automated CI pipelines (if applicable) compile successfully.
- [ ] Request reviews from repository maintainers.

**Thank you for helping us keep OHANNA premium!**
