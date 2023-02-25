require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number")
require("hardhat-gas-reporter")
require('solidity-coverage')
/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.PRIVATE_KEY
const RPC = process.env.RPC_URL
const ETHERSCAN = process.env.ETHERSCAN
const COIN_MARKET_CAP = process.env.COIN_MARKET_CAP

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: RPC,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            /// accounts hardhat already placed it
            chainId: 31337,
        },
    },
    solidity: "0.8.17",
    etherscan: {
        apiKey: ETHERSCAN,
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-reporter.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COIN_MARKET_CAP,
    },
}
