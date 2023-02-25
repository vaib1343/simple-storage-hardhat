const { task } = require("hardhat/config")

task("block-number", "print the block number of block chain").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`block number is ${blockNumber}`)
    }
)

module.exports = {}