# Shop Project

A small React storefront made with separate HTML, CSS, and React files. It is intended to be published directly with GitHub Pages using **Deploy from a branch**. It does not require a `deploy.yml` workflow, npm, or a build step.

## Files

- `index.html` — the HTML page and the CDN links for React and Babel.
- `styles.css` — all page styling, layout, responsive rules, and simple effects.
- `app.jsx` — the React application, five sample products, cart, and checkout behavior.

Both `styles.css` and `app.jsx` are kept under 400 lines to make the project easier to read and edit.

## Run locally

Because the JSX file is compiled in the browser by Babel, use a local web server rather than opening `index.html` directly as a file. One simple option is the **Live Server** extension in Visual Studio Code:

1. Open this folder in Visual Studio Code.
2. Install the Live Server extension if it is not already installed.
3. Right-click `index.html` and choose **Open with Live Server**.

An internet connection is needed because React, ReactDOM, and Babel are loaded from a public CDN.

## Publish with GitHub Pages

1. Put `index.html`, `styles.css`, and `app.jsx` in the root of your GitHub repository.
2. Open the repository's **Settings → Pages** page.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the `main` branch and the `/(root)` folder, then save.
5. Wait for GitHub Pages to publish the site.

Do not put these files inside an extra nested project folder unless you configure GitHub Pages to publish that folder.

## Customize products

Open `app.jsx` and edit the `PRODUCTS` array near the top. Each product has an `id`, `name`, `category`, `price`, and `description`.

Product images are not included. To add your own later, use a relative path in an `<img>` element inside the product card, such as `./images/lamp.jpg`. Add the image file to an `images` folder in the repository.

## Checkout note

The checkout performs local format checks only. It does not contact a payment processor, verify a card with a bank, charge money, or send or save entered payment information. Use fictional details only. This project is a front-end practice storefront, not a real payment system.
