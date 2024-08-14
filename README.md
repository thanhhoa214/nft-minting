# Phenon | NFT Minting Website

A go-to NFT minting application built with React and `shadcn-ui` UI library. It uses the Thirdweb APIs to integrate contract features. This project is a web application developed using modern web technologies, including React, TypeScript, TailwindCSS, and Vite. The project structure is set up for optimal development and build processes, with linting and type-checking integrated for code quality assurance.

## Demonstration & Snapshots

### Video
Click the link to watch the minting step progress demo:
https://github.com/thanhhoa214/nft-minting/blob/b8f820539e44f08f9f405d9b3e5ba786c91f83d0/minting/demo/demo.mov

### Snapshots
<p align="middle">
  
<img src="https://github.com/thanhhoa214/nft-minting/blob/b8f820539e44f08f9f405d9b3e5ba786c91f83d0/minting/demo/home.jpeg" alt="Home"/>
<img width="1337" alt="Screenshot 2024-06-01 at 14 44 39" src="https://github.com/thanhhoa214/nft-minting/assets/32329202/4b8f02c9-2451-4314-9b3e-a49be451b941">
<img width="1337" alt="Screenshot 2024-06-01 at 14 45 07" src="https://github.com/thanhhoa214/nft-minting/assets/32329202/cdd22d8c-719a-4bdd-be8c-cb229b7c4383">
<img src="https://github.com/thanhhoa214/nft-minting/assets/32329202/0365dab9-a58a-4986-862f-46a8d3e6a89d" alt="NFT Listing"/>
<img src="https://github.com/thanhhoa214/nft-minting/assets/32329202/3f3d39c1-1e12-4bdd-b324-bd913b4e1ed1" alt="Transfer"/>
<img src="https://github.com/thanhhoa214/nft-minting/blob/b8f820539e44f08f9f405d9b3e5ba786c91f83d0/minting/demo/mint.jpeg" alt="Mint"/>


</p>
<p align="middle">
<img src="https://github.com/thanhhoa214/nft-minting/assets/32329202/a531c5a4-2239-4243-a3bd-b24aea63379f" width="200" alt="NFTs Listing Mobile"/>
<img src="https://github.com/thanhhoa214/nft-minting/assets/32329202/26a185c1-f045-4583-9cdf-60bfa9410440" width="200" alt="mint"/>
<img src="https://github.com/thanhhoa214/nft-minting/assets/32329202/300d5876-c7a5-4324-949f-019bdaf2fba6" width="200" alt="NFT Detail"/>

</p>

## Features

- List all NFTs of the contract
- Filter NFTs by selecting an owner
- Upload file to IPFS
- Mint NFTs with comprehensive progress tracking and validations by `react-form-hook` and `zod`
- Expand an NFT detail at the Home Page
- Support dark-mode

## Project Structure

```
📦  root
 ┣ 📂 demo - Demo folder
   ┣ 📃 demo.mov - Demo file
   ┣ 📃 home.jpeg - Demo file
   ┣ 📃 mint.jpeg - Demo file
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 sections - sections of pages
 ┃ ┃ ┣ 📂 ui - shared components across the pages, initialized by `shadcn-ui`
 ┃ ┣ 📂 hooks - reused data-related hooks
 ┃ ┣ 📂 lib - library integration, util, ...
```

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/thanhhoa214/nft-minting.git
```

2. Install the dependencies:

```bash
cd minting && npm install
```

3. Start the development server:

```bash
cd minting && npm run dev
```

The application will be available at `http://localhost:5173`.

## Deployment

To build the application for production, use the following command to build it at `dist` destination:

```bash
npm run build
```

## Built With
- [React](https://react.dev/)
- [shadcn-ui](https://ui.shadcn.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Thirdweb](https://thirdweb.com)
- [react-confetti](https://alampros.github.io/react-confetti/?path=/story/props-demos--knobs)
- [usehooks-ts](https://usehooks-ts.com/)


## Thank you!

Thank you so much for the interviews and valuable chats. Being a crypto holder, I would love to be a part of your team to accelerate Web3 adoption to the community!
