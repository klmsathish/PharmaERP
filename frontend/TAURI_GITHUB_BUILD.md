# Building Windows Apps with Tauri via GitHub Actions

## Setup Complete! 🎉

I've created a GitHub Actions workflow that will automatically build your Tauri app for both Windows and macOS whenever you push code to GitHub.

## How to Use

### 1. Push Your Code to GitHub

First, create a GitHub repository and push your code:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit with Tauri build workflow"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

### 2. Trigger a Build

The workflow will automatically trigger when you:
- Push to `main` or `master` branch
- Create a pull request
- Create a version tag (e.g., `v1.0.0`)
- Manually trigger from GitHub Actions tab

### 3. Manual Trigger (Easiest for Testing)

1. Go to your GitHub repository
2. Click on the **Actions** tab
3. Select **Tauri Build** workflow
4. Click **Run workflow** button
5. Select branch and click **Run workflow**

### 4. Download Built Applications

After the build completes (usually 10-15 minutes):

1. Go to the **Actions** tab
2. Click on the completed workflow run
3. Scroll down to **Artifacts** section
4. Download:
   - `windows-build` - Contains Windows `.msi` and `.exe` installers
   - `macos-build` - Contains macOS `.app` and `.dmg` files

## Creating a Release

To automatically create a GitHub release with installers:

```bash
# Create a version tag
git tag v1.0.0

# Push the tag
git push origin v1.0.0
```

This will:
1. Build the app for all platforms
2. Create a GitHub release
3. Attach all installers to the release

## Build Status

You can add a build status badge to your README:

```markdown
![Build Status](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/tauri-build.yml/badge.svg)
```

## Important Notes

- ✅ **Windows builds run on GitHub's Windows servers** - no cross-compilation issues!
- ✅ **Free for public repositories** (2,000 minutes/month for private repos)
- ✅ **Artifacts are kept for 7 days** (can be changed in workflow)
- ✅ **No need for local Windows machine**

## Troubleshooting

If the build fails:
1. Check the Actions tab for error logs
2. Ensure `package-lock.json` is committed
3. Verify Tauri configuration is correct
4. Check that all dependencies are properly listed

## Build Times

Typical build times:
- Windows: ~8-10 minutes
- macOS: ~6-8 minutes

## Cost

- **Public repositories**: Completely FREE
- **Private repositories**: 2,000 free minutes/month, then $0.008/minute

## Summary

Now you can:
1. **Push code to GitHub**
2. **Automatically build for Windows and Mac**
3. **Download installers from Actions tab**
4. **Create releases with version tags**

No Windows machine needed! 🎊
