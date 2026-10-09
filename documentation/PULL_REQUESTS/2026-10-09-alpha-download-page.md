## Problem

Alpha testers need a direct place to download Sibryl and follow the installation steps without adding an alpha release to the public site navigation.

## Solution

Add an unlisted alpha download page with a button for the latest macOS DMG and short installation instructions. The download supports macOS 12 or later on both Intel and Apple silicon Macs.

## How It Works

Testers open the shared page link, download the latest DMG, and follow the installation steps. The page is excluded from navigation, sitemap, and RSS discovery and asks search engines not to index it. There is no authentication: unlisted means less discoverable, not access-protected.

This pull request is the intended integration workflow. No local deployment is performed.

# Credits

- Nabs (Architect)
- Autobelay (Lead Developer)
