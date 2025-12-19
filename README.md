<div align="center">

# 🚀 Uploader
**A lightweight, multi-service file hosting uploader for Node.js**

[![NPM Version](https://img.shields.io/npm/v/@zanixongroup/uploader?style=for-the-badge&logo=npm&color=CB3837)](https://www.npmjs.com/package/@zanixongroup/uploader)
[![Repo Size](https://img.shields.io/github/repo-size/zanixongroup/uploader?style=for-the-badge&logo=github&color=2ea44f)](https://github.com/zanixongroup/uploader)
[![Last Commit](https://img.shields.io/github/last-commit/zanixongroup/uploader?style=for-the-badge&logo=github)](https://github.com/zanixongroup/uploader)
[![License](https://img.shields.io/github/license/zanixongroup/uploader?style=for-the-badge&color=informational)](https://github.com/zanixongroup/uploader/blob/main/LICENSE)

[Features](#-features) • [Installation](#-installation) • [Supported Hosts](#-supported-hosts) • [Quick Start](#-quick-start) • [Contributing](#-contributing)

</div>

---

## ✨ Features

- 📦 **Lightweight**: Zero unnecessary dependencies.
- ⚡ **Simple API**: Easy to integrate with just a few lines of code.
- 🌐 **Multi-Host**: Supports various free file hosting services.
- 🛡️ **Reliable**: Built-in error handling for seamless uploads.

---

## 📥 Installation

Install the package via **npm**:

```bash
npm install @zanixongroup/uploader
```

Or using **yarn**:

```bash
yarn add @zanixongroup/uploader
```

---

## ☁️ Supported Hosts

Here is a list of currently supported hosting services:

| Provider | File Type | Expiry | Best For |
| :--- | :--- | :--- | :--- |
| **Pomf** | All | Permanent | General usage |
| **Quax** | Image, Video, Audio | Permanent | Media hosting |
| **Videy** | Video | Permanent | Video sharing |
| **Catbox** | All | Permanent | General usage |
| **Litterbox** | All | 1h, 12h, 24h, 72h | Temporary files |
| **Ryzumi** | Image, Video, Audio | 24 Hours | Short-term media |
| **Uguu** | All | 3 Hours | Fast temporary sharing |
| **Cloudku** | All | Permanent | General usage |
| **Picsur** | Image | Unknown | Simple images |

---

## 🚀 Quick Start

### 1. Basic Usage (ES Modules)

```javascript
import { Pomf } from "@zanixongroup/uploader";
import fs from "fs";

// Using Buffer
const buffer = fs.readFileSync("./my-image.jpg");

Pomf(buffer)
  .then((url) => console.log("Uploaded successfully:", url))
  .catch((err) => console.error("Upload failed:", err));
```

### 2. Using Specific Providers

Some providers such as **Litterbox** allow expiration time settings:

```javascript
import { Litterbox } from "@zanixongroup/uploader";

const media = fs.readFileSync("./document.pdf");

// Optional: '1h', '12h', '24h', '72h'
Litterbox(media, "24h")
  .then(console.log)
  .catch(console.log);
```

### 3. CommonJS Usage

If your project still uses CommonJS:

```javascript
const { Catbox } = require("@zanixongroup/uploader");

(async () => {
  try {
    const res = await Catbox(myBuffer);
    console.log("Result:", res);
  } catch (e) {
    console.error(e);
  }
})();
```

---

## 🛠 Contributing

We greatly appreciate your contributions! If you want to add a new provider or fix a bug, please follow these steps:

1. Fork this repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to that branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

---

## 🐞 Issues

Found a bug or have a feature suggestion? Feel free to open an [Issue](https://github.com/zanixongroup/uploader/issues). We'll try to respond as soon as possible.

---

<div align="center">

Made with ❤️ by [ZanixonGroup](https://github.com/zanixongroup)

</div>