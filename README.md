# Updates to Markdown

[![GitHub Workflows](https://github.com/vlasscontreras/updates-to-markdown/workflows/Build/badge.svg)](https://github.com/vlasscontreras/updates-to-markdown)
[![Version](https://img.shields.io/badge/version-0.1.0-brightgreen.svg)](https://github.com/vlasscontreras/updates-to-markdown)

Have you ever been in a situation where you want to keep a register of the updates you apply to a WordPress site or a Linux server? 🤔 You know, in case something happens so you know what exact version to revert while applying the fix 🤓

Well, that's what this tool is for! It also served me to practice React 😅 so feel free to submit your PR if you have feedback, suggestons, fixes, or improvements.

## Usage

It's pretty simple, but it depends on your source of updates.

For WordPress, copy the output of the updates table on the Update Core page:

![img](https://raw.githubusercontent.com/vlasscontreras/updates-to-markdown/master/docs/assets/img/wordpress-core-updater.png)

For APT, copy the ouput of the list command `apt update && apt list --upgradable`:

![img](https://raw.githubusercontent.com/vlasscontreras/updates-to-markdown/master/docs/assets/img/apt-list-upgradable.png)

And paste it on the left textbox of this app:

![img](https://raw.githubusercontent.com/vlasscontreras/updates-to-markdown/master/docs/assets/img/updates-to-markdown.png)

And you will have an instant version in Markdown format on the left side, ready to copy 😁:

```markdown
- Upgraded WordPress Packages:
  - Post SMTP to `v2.0.10` from `v2.0.9`
  - Yoast SEO to `v12.9.1` from `v12.8.1`
```

That will make it easier for you to write changelogs in a more readable way 🙂
