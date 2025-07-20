# Debt.com Advocate Interface - Deployment Guide

## 🚀 Deploying to debt.agent.chappy.ai

The application has been built and is ready for deployment to your subdomain `debt.agent.chappy.ai`.

### 📁 Built Files Location
The production-ready files are in: `examples/cvi-quickstart-react/dist/`

### 🗂️ Files to Deploy
```
dist/
├── index.html          # Main HTML file
├── vite.svg           # Vite logo
├── assets/            # CSS and JS bundles
│   ├── index-B6MGdeBw.css
│   └── index-Dv898L-Z.js
├── _redirects         # Netlify routing config
└── .htaccess         # Apache routing config
```

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)
1. **Drag & Drop Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Drag the entire `dist` folder to deploy
   - Configure custom domain: `debt.agent.chappy.ai`

2. **Custom Domain Setup:**
   - In Netlify dashboard → Domain settings
   - Add custom domain: `debt.agent.chappy.ai`
   - Follow DNS configuration instructions

### Option 2: Vercel
1. **CLI Deploy:**
   ```bash
   cd examples/cvi-quickstart-react/dist
   npx vercel --prod
   ```
   
2. **Custom Domain:**
   - Add domain in Vercel dashboard
   - Configure DNS to point to Vercel

### Option 3: Traditional Web Hosting (cPanel/Apache)
1. **Upload Files:**
   - Upload all contents of `dist/` to your web root
   - Ensure `.htaccess` file is uploaded for routing

2. **DNS Configuration:**
   - Point `debt.agent.chappy.ai` to your server IP
   - Ensure SSL certificate is configured

### Option 4: GitHub Pages + Custom Domain
1. **Setup:**
   ```bash
   # Create gh-pages branch with dist content
   cd examples/cvi-quickstart-react
   git subtree push --prefix dist origin gh-pages
   ```

2. **GitHub Settings:**
   - Enable GitHub Pages
   - Set custom domain: `debt.agent.chappy.ai`
   - Ensure HTTPS is enforced

## 🔧 DNS Configuration

### For debt.agent.chappy.ai:
```
Type: CNAME
Name: debt.agent
Value: [your-hosting-provider-domain]
TTL: 300 (or Auto)
```

**Or if using A record:**
```
Type: A
Name: debt.agent
Value: [your-server-ip]
TTL: 300
```

## 🔐 SSL/HTTPS Requirements

The application **requires HTTPS** for:
- Camera and microphone permissions
- Secure video calling with Daily.co
- Modern browser security requirements

Most hosting providers (Netlify, Vercel, etc.) provide free SSL certificates automatically.

## 🎛️ Environment Configuration

The app is configured with:
- **API Key:** Already configured in build
- **Persona ID:** Set to your custom persona
- **Domain:** Ready for debt.agent.chappy.ai

## 🧪 Testing Your Deployment

After deployment, test:
1. ✅ Page loads at `https://debt.agent.chappy.ai`
2. ✅ "Start Conversation" button works
3. ✅ Camera/microphone permissions prompt appears
4. ✅ Video preview works in hair check screen
5. ✅ Video call connects successfully

## 🛟 Troubleshooting

### Common Issues:

**404 on page refresh:**
- Ensure routing configuration is deployed (`.htaccess` or `_redirects`)

**Camera/microphone not working:**
- Verify HTTPS is working
- Check browser permissions
- Ensure iframe policies are correct

**API errors:**
- Verify environment variables are set
- Check network connectivity
- Confirm Tavus API key is valid

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify all files uploaded correctly
3. Ensure DNS propagation is complete (can take up to 24 hours)
4. Test on different browsers/devices

---

**🎉 Ready to Deploy!**

All files are prepared and the application is production-ready for `debt.agent.chappy.ai`.
