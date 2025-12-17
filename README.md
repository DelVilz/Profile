# Profile Page

Files added:

- `index.html` — main profile page
- `styles.css` — styling including dark/light theme
- `script.js` — theme toggle and persistence

Usage:

1. Put your profile image in the same folder and name it `profile.jpg` (or edit the `src` in `index.html`).
2. Open `index.html` in your browser (double-click or right-click -> Open with -> browser).
3. Click the sun/moon toggle in the header to switch between Light and Dark mode. Your preference is saved.

Edit the text in `index.html` to personalize your name, description, location, and capabilities.

Using the attached photo:

- Save the image you uploaded to this folder and name it `profile.jpg` (that is `C:\Users\Dale Jasper\Desktop\Html\profile.jpg`).
- If you prefer a different name or location, edit the `src` attribute on the `<img id="profile-img">` element in `index.html`.

After saving the photo as `profile.jpg`, reload the page in your browser. If the image does not appear, try a hard refresh (press `Ctrl+F5`) to clear the cache. If the file is still missing, the page will show a placeholder avatar until `profile.jpg` is placed in the folder.

Quick way to add the attached image from the browser:
Quick instructions to make the attached image permanent:

1. Save the attached image to your computer (for example it's often saved to your `Downloads` folder).
2. Rename the file to `profile.jpg`.
3. Move the file into the project folder `C:\Users\Dale Jasper\Desktop\Html`.

PowerShell command (run in PowerShell) to move a file named `profile.jpg` from `Downloads` into the project folder:

```powershell
Move-Item -Path "$Env:USERPROFILE\Downloads\profile.jpg" -Destination "C:\Users\Dale Jasper\Desktop\Html\profile.jpg" -Force
```

If your downloaded file has a different name (for example `IMG_1234.jpg`), either rename it or use that filename in the `-Path` argument above.

Preview tips:

- The page includes a subtle animated particle background; if your machine is very old you can remove the canvas block (`<canvas id="bg-canvas">`) and the related script in `script.js`.
- To tweak skill levels, change the `data-level` values on elements with class `cap-value` in `index.html`.

Note: All page links (`Contact`, `Portfolio`, social links, and the footer GitHub link) now point to your repository at `https://github.com/DelVilz/Profile` and open in a new tab.
