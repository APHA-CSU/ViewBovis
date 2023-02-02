# ViewBovis Development Repository
This repo contains the source code for the ViewBovis application. The README.md contains instructions on how to launch this app from an instance in the SCE.

### 1. Setup

Clone the GitHub repository  
```
git clone https://github.com/aphascience/ViewBovisDev.git
cd ViewBovisDev
```

Install NVM (Node Version Manager)
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

Verify `nvm` was properly installed
```
nvm --version
```

Install Node.js (v18.13.0) and npm (v8.19.3)
```
nvm install 18.13.0
```

Verify `node` and `npm` installs and versions
```
node --version
npm --version
```

### 2. Install Libraries

Install bootstrap v5.2.3
```
npm install bootstrap@5.2.3
```

Install leaflet v1.9.3
```
npm install leaflet@1.9.3
```




