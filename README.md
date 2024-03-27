# EFOV - Eminence Form Validation Library

EFOV (Eminence Form Validation) is a lightweight, accessible, and easy-to-use JavaScript library designed to enhance form validation feedback in web applications. It seamlessly integrates with native HTML form validation, providing a more visually appealing and accessible error message display, while also offering an easy interface for adding custom validations.

## Key Features

- **Accessible Error Display**: Uses `aria` attributes to enhance accessibility (customizable but we provide a recommended), ensuring error messages are easily perceivable by users with assistive technologies.
- **Native Browser Validation Fallback**: Leverages the browser's built-in validation messages as fallbacks, ensuring reliability and native feel.
- **Custom Validations**: Offers an easy-to-use interface for adding custom validation functions, providing flexibility for complex form validation scenarios.
- **Delay and Trigger Options**: Allows setting validation to trigger on form submission, live as user types, or with a custom delay, providing control over the user experience.
- **Visual Customization**: Easy to style error messages and validation states using predefined classes, allowing for seamless integration with your design system.

## Installation

### Method 1: Including `efov.min.js`

1. Download the `efov.min.js` file from the repository and place it in your project directory.
2. Include the script in your HTML file anywhere, it waits for DOMContentLoaded:

   ```html
   <script src="path/to/your/directory/efov.min.js"></script>



# EFOV - Eminence Form Validator

Welcome to EFOV (Eminence Form Validator), a robust and efficient front-end library crafted to enhance form validation within web applications. Developed by Xeffen25, EFOV aims to streamline the client-side validation process, offering a user-friendly approach to ensuring data integrity and user input validation.

## Important Notice
EFOV provides an excellent layer of client-side validation, contributing to a more interactive and responsive user experience. However, it is crucial to pair EFOV with server-side validation to ensure the utmost security and integrity of your application's data processing. Always validate user input on the server to protect against malicious activities.

## Features
The EFOV library comes packed with features designed to make form validation straightforward and effective. (Feature details will be added here.)

## Getting Started
Integrating EFOV into your project is simple. Follow the setup instructions and examples provided to get EFOV up and running with your forms. (Integration steps will be detailed here.)

## Documentation
For more information on EFOV's features, installation guide, and comprehensive usage documentation, please visit [Xeffen25's EFOV documentation](https://xeffen25.com/efov/docs).

## Contributing
Contributions to EFOV are highly appreciated. If you're interested in improving EFOV or have found a bug, please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get involved.

## License
EFOV is licensed under the Eminence Form Validator License (EFOV License) Version 1.0. For more information, please see [LICENSE.md](LICENSE.md).

Thank you for considering EFOV for your project. Together, we can make form validation better and more intuitive for developers and users alike.

# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
