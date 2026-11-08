## Problem

The desktop download page should use a stable address rather than an alpha-specific link.

## Solution

Move the existing page to `/downloads/desktop/`. The old `/alpha-download/` address is removed entirely, with no redirect.

## How It Works

Testers use the new address to reach the same macOS download and installation instructions. The download button, page content, unlisted status, and search-indexing behavior remain unchanged.

The build passed, and review reported zero findings. No local deployment was performed.

# Credits

- Nabs (Architect)
- Autobelay (Lead Developer)
