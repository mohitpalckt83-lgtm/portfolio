# DevNova

This workspace contains two linked static websites: the DevNova product engineering studio site and a separate developer portfolio at `portfolio.html`. Both use plain HTML, CSS, and JavaScript with no framework, build step, backend, or package installation.

## Run locally

Open `index.html` for the DevNova site or `portfolio.html` for the portfolio. For local testing, serve the folder over HTTP:

```powershell
python -m http.server 8000
```

Then visit <http://localhost:8000> or <http://localhost:8000/portfolio.html>. If the Python launcher is unavailable, use any static file server. No environment variables are required.

## Configure

- Edit the welcome modal content and contact recipient in `siteConfig` at the top of `script.js`. The modal title, message, illustration, primary action, and close-button label are configurable there.
- Update the visible contact email links in `index.html` and `404.html` to match `siteConfig.contactEmail`.
- Replace the clearly labeled `[Your name]` and `[Add ...]` starter text in `portfolio.html` only with accurate personal information. Add only confirmed skills and real project details and links.
- Update the portfolio contact recipient in `portfolio.js` and its visible email links in `portfolio.html` if the address changes.
- Replace `assets/devnova-welcome.svg` and `favicon.svg` to change the site artwork and favicon.
- Google Fonts are loaded as progressive enhancement; system font fallbacks are included for offline or restricted environments.

Both contact forms validate fields in the browser and prepare a message in the visitor’s email application using `mailto:`. The visitor must review and send the draft. Neither site stores form data or sends email itself; no backend or email provider is configured.

The portfolio is the first public-only stage. Its identity, bio, skills, projects, and experience have not been supplied, so editable notes are used instead of invented personal claims. Login, registration, database persistence, password recovery, and a protected admin area are intentionally deferred; no nonfunctional login UI is shown. Add those features only with a real backend, database, secure deployment configuration, and the required email service for account recovery.

## Deploy

These are static sites. Publish the contents of this folder, including `assets/`, to any static host. For GitHub Pages, push the files to a repository and enable Pages for the branch and folder containing `index.html`. Both `index.html` and `portfolio.html` are then available, and the included `404.html` is used by common static hosts for missing-page requests. Configure your custom domain with the host if desired.

The social metadata includes titles and descriptions. Update those values in `index.html` and `portfolio.html` to suit the published sites; add production canonical URLs and share-image URLs after choosing a domain and social images.

## Project notes

The supplied workspace contained only empty `index.html`, `script.js`, and `style.css` files; it did not include Git metadata, a remote repository, project documentation, dependencies, or a license. No existing project license could be verified. No GitHub repository was available to inspect, and no existing tests or test runner were present.
