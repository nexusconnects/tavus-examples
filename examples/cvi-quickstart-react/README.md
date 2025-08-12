# Debt.com Advocate Interface

A professional video calling interface for debt advocacy services, built with React and enhanced with modern UI/UX design.

![Debt.com Advocate Interface](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.6-purple)

## ✨ Features

- 🎥 **Secure Video Calling** - Integrated with Daily.co for reliable video sessions
- 🎨 **Professional UI** - Modern design tailored for debt advocacy services
- 🔒 **Privacy-First** - Secure camera/microphone permission handling
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Performance Optimized** - Fast loading and smooth interactions
- 🛡️ **Security Enhanced** - HTTPS required, secure headers configured
- 🎭 **AI-Powered** - Integrated with Tavus conversational AI

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/debt-advocate-interface.git
cd debt-advocate-interface

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Tavus API key

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Tavus API Configuration
VITE_APP_TAVUS_API_KEY=your_tavus_api_key_here
```

### API Configuration

Update your persona ID in `src/api/createConversation.ts`:

```typescript
body: JSON.stringify({
  persona_id: 'your_persona_id_here',
}),
```

## 🎨 UI/UX Features

### Welcome Screen
- Gradient background with floating animations
- Professional branding with debt advocacy focus
- Feature highlights and trust indicators
- Iframe detection with optimized experience suggestions

### Video Interface
- Modern video call layout with status indicators
- Minimize/maximize functionality
- Professional waiting states with loading animations
- Secure session indicators and participant count

### Camera Settings
- Intuitive device selection interface
- Visual status indicators for camera/microphone
- Permission error handling with clear instructions
- Professional card-based layout

## 🌐 Deployment

The project includes deployment configurations for multiple platforms:

### Netlify (Recommended)
- Drag & drop the `dist` folder to netlify.com
- Configure custom domain: `debt.agent.chappy.ai`
- Automatic SSL certificate provisioning

### Vercel
```bash
cd dist
npx vercel --prod
```

### Traditional Hosting
- Upload `dist/` contents to web root
- Ensure `.htaccess` is uploaded for proper routing

See `deployment-guide.md` for detailed instructions.

## 📁 Project Structure

```
src/
├── api/                 # API integration
│   ├── createConversation.ts
│   └── endConversation.ts
├── components/          # React components
│   ├── Call/           # Video call interface
│   ├── CameraSettings/ # Device configuration
│   ├── HairCheckScreen/# Pre-call setup
│   ├── Video/          # Video component
│   ├── WelcomeScreen/  # Landing page
│   └── ui/             # Reusable UI components
├── config/             # Configuration files
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── types/              # TypeScript definitions
```

## 🏗️ Built With

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Daily.co React SDK** - Video calling infrastructure
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful icon library

## 🔒 Security Features

- HTTPS enforcement for camera/microphone permissions
- Secure headers configuration
- CORS policies for video calling
- Privacy-first permission handling
- No data storage without explicit consent

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

*Note: Video calling requires modern browser support for WebRTC*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🆘 Support

For technical support or questions:

1. Check the browser console for errors
2. Verify camera/microphone permissions are granted
3. Ensure HTTPS is properly configured
4. Review the deployment guide for common issues

## 🎯 Production Deployment

Your application is configured for deployment to `debt.agent.chappy.ai` with:

- ✅ Professional debt advocacy branding
- ✅ Secure video calling infrastructure
- ✅ Modern UI/UX optimized for trust and usability
- ✅ Production-ready build configuration
- ✅ Multiple deployment platform support

---

**Built with ❤️ for professional debt advocacy services**
