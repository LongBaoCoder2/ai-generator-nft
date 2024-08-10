# AI NFT Generator

Generate images using AI and mint them as NFTs on the blockchain using Thirdweb.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Setting Environment Variables](#setting-environment-variables)
  - [Deploy Smart Contracts](#deploy-smart-contracts)
  - [Run the Application](#run-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

AI NFT Generator is a web application that allows users to generate images using AI, specifically through an API, and then mint these images as NFTs on the Ethereum blockchain using Thirdweb's powerful SDK. This project utilizes Next.js for the frontend and integrates seamlessly with Thirdweb for blockchain interactions.

## Features

- **AI Image Generation**: Generate images using an AI API.
- **NFT Minting**: Mint generated images as NFTs on the blockchain.
- **Thirdweb Integration**: Easily connect to the blockchain using Thirdweb's SDK.
- **Responsive Design**: User-friendly interface, optimized for all devices.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm/yarn installed
- A Thirdweb account and access to the Thirdweb dashboard
- An API key from OpenAI (or other AI service) for image generation

## Getting Started

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/ai-nft-generator.git
cd ai-nft-generator
```

### Install Dependencies

Install the necessary dependencies using npm or yarn:

```bash
npm install
```

or

```bash
yarn install
```

### Setting Environment Variables

Create a .env.local file in the root directory and set up the following environment variables:

### Setting Environment Variables

Create a .env.local file in the root directory and set up the following environment variables:

```
NEXT_PUBLIC_CLIENT_ID=your_thirdweb_client_id
NFT_COLLECTION_CONTRACT_ADDRESS=your_nft_collection_contract_address
LIMEWIRE_API_KEY=your_limewire_api_key
```

### Deploy Smart Contracts

Deploy your ERC-721 NFT Collection smart contract using Thirdweb:

1. Go to the Thirdweb dashboard.
2. Deploy a new ERC-721 NFT Collection contract.
3. Copy the contract address and update it in your project's configuration file.

### Run the Application

After setting up the environment and deploying the contracts, you can run the application locally:

```bash
npm run dev
```

or

```bash
yarn dev
```

The application will be accessible at `http://localhost:3000`.

## Usage

1. **Connect Wallet**: Connect your Ethereum wallet using the Thirdweb Connect button.
2. **Generate Image**: Enter a prompt and generate an image using the AI Generator.
3. **Mint as NFT**: Once the image is generated, mint it as an NFT directly from the app.
4. **View Collection**: View your minted NFTs in the NFT Collection section.
