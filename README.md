TCC web application built with Next.js.

## Prototype Url
This project is running [here](https://fukugit.github.io/kitties-social-ui-prototype/).

## Prerequisites
Run kitties-social-api-prototype before this project using below command.  
```
brew install pipenv
```

## Getting Started

First, run the development server:

```bash
npm install cross-env --save-dev
npm run local
# npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Stopping the server
```
lsof -i -P | grep 3000
kill -9 PID
```

## shadcn/ui
This project is built with [Shadcn](https://ui.shadcn.com/).  


## Troubleshooting
### If you see the error below when running the command, execute the following nvm command.
```
You are using Node.js 16.13.1. For Next.js, Node.js version >= v18.17.0 is required.
```
#### nvm command
```
source ~/.nvm/nvm.sh
nvm install 18.17.0
nvm alias default 18.17.0
node -v
```

