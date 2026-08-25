# Assets you need to add

The app runs and gracefully falls back without these, but add them for the
real experience:

## 1. Social icons — `public/icons/`
Download each PNG from Streamline (the link you had open) and save with
**exactly** these filenames — they're matched 1:1 to `id` in `data/links.js`:

```
portfolio.png   instagram.png   twitter.png   youtube.png   discord.png
steam.png       xbox.png        spotify.png   github.png    linkedin.png
email.png
```

If a file is missing or fails to load, that one card automatically falls
back to a Remix Icon glyph — nothing breaks, and every other icon is
unaffected. Add new fallback mappings in `lib/iconFallbacks.js` if you add
new link ids later.

## 2. Your photo — `public/images/mypic.jpeg`
Any square-ish image works; it's cropped to a circle with `object-cover`.

## 3. Background video — `public/video/bg.mp4`
Keep it short and loop-friendly (10–20s), ideally under 5MB, H.264 MP4.
It's preloaded in `app/layout.jsx` and set to autoplay/muted/loop. If it's
missing or fails, the app silently falls back to the gradient background —
no broken video icon, ever.

## 4. Video poster (optional) — `public/images/bg-poster.jpg`
Shown for the split second before the video is decoded. A single frame
export from your video works well.
