const { assert } = require("chai")
const { ethers } = require("hardhat")

describe("Simple storage", () => {
    let SimpleStorage
    let SimpleStorageFactory
    beforeEach(async () => {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        SimpleStorage = await SimpleStorageFactory.deploy()
    })

    it("should start with favourite number zero", async () => {
        const currentValue = await SimpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("should update the value when we call store", async () => {
        const expectedValue = 7
        const transactionResponse = await SimpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        const currentValue = await SimpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
})
