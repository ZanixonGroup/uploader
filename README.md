# Uploader
A simple multi file hosting uploader for pomf, quax, etc.
<br><br>
![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/zanixongroup/uploader?logo=github&cacheSeconds=12000&style=for-the-badge) ![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/zanixongroup/uploader?style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/zanixongroup/uploader?logo=github&style=for-the-badge&link=https%3A%2F%2Fgithub.com%2Fzanixongroup%2Fuploader) ![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/zanixongroup/uploader/main?style=for-the-badge&logo=github)

# Features
- Simple library
- Easy to use
- Almost all free file hosting is here!

# Table of contents
- [Getting Started](#getting-started)
  - [Install](#install)
  - [Uploaders](#uploaders)
  - [Example](#example-usage)
- [Contributing](#contributing)
- [Issue](#issue)

# Getting Started

### Install
Install the library using npm
```bash
npm i @zanixongroup/uploader
```

### Uploader
This library has several file hostings:
- Pomf - Image, Video, Audio, etc (Exp: never)
- Quax - Image, Video, Audio (Exp: never)
- Videy - Video (Exp: never)
- Ryzen - Image, Video, Audio (Exp: 24h)
- FastUrl - Any (Exp: never)
- Shojib - Image (Exp: ??)
- Erhabot - Image (Exp: never)
- Litterbox - Any (Exp: 1h, 12h, 24h, 72h)
- Catbox - Any (Exp: never)
- TmpErhabot - Image, Video, Audio (Exp: 24h)
- Uguu - Any (Exp: 3h)
- IDNet - Image, Video, Document (Exp: never)
- Cloudku - Any (Exp: never)
- Nyxs - Any (Exp: 1h)

### Example Usage
How to usage this simple library
```js
/**
import Upload from "@zanixongroup/uploader";
*/

import { FastUrl } from "@zanixongroup/uploader";

const media = //buffer
FastUrl(media)
  .then(console.log)
  .catch(console.log)

/**
  Result:
    https://fastrestapis.fasturl.cloud/file/v2/ZVNM9W2.jpg
*/
```

# Contributing
If you would like to contribute to this package, I would really appreciate it. You can see the [contribution guidelines here](https://github.com/ZanixonGroup/uploader/blob/main/CONTRIBUTING.md) to contribute in the best way possible.

# Issue
Feel free to open the issue, I hope this documentation can help you maximally and make it easier for you to use this package.