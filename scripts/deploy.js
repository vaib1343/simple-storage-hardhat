//imports

const { ethers, run, network } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const SimpleStorage = await SimpleStorageFactory.deploy()
    await SimpleStorage.deployed()
    console.log(`deployed contract at: ${SimpleStorage.address}`)
    if (network.config.chainId !== 31337 && process.env.ETHERSCAN) {
        console.log('verifying contract after 6 block')
        await SimpleStorage.deployTransaction.wait(6)
        await verify(SimpleStorage.address, [])
    }
    const currentValue = await SimpleStorage.retrieve()
    console.log(`current value is ${currentValue}`)

    const transactionResponse = await SimpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await SimpleStorage.retrieve()
    console.log(`updated value is ${updatedValue}`)
}

async function verify(contractAddress, args) {
    try {
        console.log("verifying contract...")
        await run("verify:verify", {
            address: contractAddress,
            constructorArguements: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("contract already verified")
        } else {
            console.log(error)
        }
    }
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
