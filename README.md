# Uploader
A simple multi file hosting uploader like pomf, quax, etc.<br><br>
<br><br>
![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/zanixongroup/uploader?logo=github&cacheSeconds=12000&style=for-the-badge) ![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/zanixongroup/uploader?style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/zanixongroup/uploader?logo=github&style=for-the-badge&link=https%3A%2F%2Fgithub.com%2Fzanixongroup%2Fuploader) ![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/zanixongroup/uploader/main?style=for-the-badge&logo=github)

# Features
- Simple library
- Easy to use
- Almost all free file hosting is here!

# Table of contents
- [Getting Started](#getting-started)
  - [Install](#install)
  - [Uploader](#uploader)
  - [Example](#example-usage)
- [Issue](#issue)

# Getting Started

### Install
Install the library using npm
```bash
npm i @zanixongroup/uploader
```

### Uploader
This library has several file hostings:
- PomfUploader - Image, Video, Audio, etc
- QuaxUploader - Image, Video, Audio
- VideyUploader - Video
- RyzenUploader - Image, Video, Audio
- FastUrlUploader - Any
- ShojibUploader - Image
- ErhaImgUploader - Image

### Example Usage
How to usage this simple library
```js
import { VideyUploader } from "@zanixongroup/uploader";

const media = //buffer
VideyUploader(media)
  .then(console.log)
  .catch(console.log)

/*
  Result:
    https://cdn.videy.co/NyBFfECf1.mp4
*/
```

# Issue
Feel free to open the issue, I hope this documentation can help you maximally and make it easier for you to use this package.

*~ Regards ZTRdiamond ~*
