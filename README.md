# SupplyChain
Udacity Blockchain Supply Chain Project 6

## Project 6 - Part A
See UML Directory for the four diagrams

## Deployment Details - Coffee Fair Trade
### First Deployment:
From Etherscan:

Contract:
0x874721d38d634d6A12605DE7604A8367B5ab97A2

TxnHash:
0xb3c1726598e1f9f2308ba4e87d60f9188268ff2357f3f3eac01a5b4ff674d7dc

### Second Deployment:
From Etherscan:

Address:
0x0d85295e9b0f87a506d3ce71b69f996e55746352

Contract:
0x64c32cde7c144092df543b5a7dd19ac35293fbd5

TxnHash:
0x65d7830ca9c4c34a2b1986b01ff2e4a0178ec3d437a66ab22fa8b38533d1d5c5


### Third Deployment:
From Etherscan:

Address:
0x0d85295e9b0f87a506d3ce71b69f996e55746352

Contract:
0x5f7e039ae95e2ba5cf5d4c24e66a1bfe4ff7ad11

TxnHash:
0x4c347729783678aae37780bf31a1f1dcc94c57e5c54b3a8e1adf39a85b8ec471



## Deployment Details - WALMART Food Supplychain
### Fourth Deployment: 
From Etherscan:

Address:
0x0d85295e9b0f87a506d3ce71b69f996e55746352

Contract:
0x728f2d63c3107540dfc6da5ec0aa97178ee7c21b

TxnHash:
0x9bbd44ecd8ddf343e7191d08d9e6dfe7c361344ea89cffc814d001440e3716cb


### Fifth Deployment: 
From Etherscan:

Address:
0x0d85295e9b0f87a506d3ce71b69f996e55746352

Contract:
0x5400e399fdefd57cab1bb26c8087d9c5d55255af

TxnHash:
0x95311d664b09cf9daf15f8c38119d4d190cca4c6306569f26b00e09b1eae8c49


### Sixth Deployment: (ganache-cli mnemonic matches truffle-config.js deploy mnemonic) (but ganache GUI was running in the background with a different mnemonic) 
From Etherscan:

Address:
0x0d85295e9b0f87a506d3ce71b69f996e55746352

Contract:
0x179e4b127a60d939003515af91ffaaaba056a68a

TxnHash:
0xdac5d0f7cb4f9f594c831fc6faa459b7956d77929e7bed1cc326030e0022f29a

### Seventh Deployment: (ganache GUI mnemonic matches truffle-config.js deploy mnemonic) 
From Etherscan:

Address:
0x0d85295e9b0f87a506d3ce71b69f996e55746352

Contract:
0xd5b7c39b1cf75e2b85689a1c42e17a7af6f5faf1

TxnHash:
0x92e58f69130b914242fbf60149dae09273021653ae3ac2cdac8cb9c08439f083

# ONLY ON LOCAL NETWORK
### EIGHTH Deployment: (ganache GUI mnemonic matches truffle-config.js deploy mnemonic) 
From Ganache GUI:

Address:
0x0d85295e9b0f87a506d3ce71b69f996e55746352

Contract:
0x8d33b6f1c78a025b558b81e4df408bec0b94703c

TxnHash:
0x131f04e1b00c66b6686a0f22c106248c5e89f1cd4cff5277a2827d581b115fb2

# ONLY ON LOCAL NETWORK
### NINTH Deployment: (ganache GUI mnemonic matches truffle-config.js deploy mnemonic) 
From Ganache GUI:

Address:
0x0d85295e9b0f87a506d3ce71b69f996e55746352

Contract:
0xc302A94C3a9b10610C4E164CfEd97977979B8e2c

TxnHash:
0x4FeaE7C7BA78AEA81163A6dFA46998EFBD24478540fFD2D6d9332444451B07f3


# ONLY ON LOCAL NETWORK
### TENTH Deployment: (ganache GUI mnemonic matches truffle-config.js deploy mnemonic) 
From Ganache GUI:

Address:
0x0d85295e9b0f87a506d3ce71b69f996e55746352

Contract:
0xaf5f775ec2989e9544d82293b4c0a07d593939ce

TxnHash:
0x1fa770a4b37edf6b6714e3aab426800cca22ef809a5dd24c845187fe2313237b





## Testing Notes
### Discrepancy between TestSupplychain.js and Sequence Diagram:
Code shows: // 6th Test
    it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async() => { ...

Diagram shows: Line for function shipItem from FARMER to Retailer, NOT Distributor to Retailer.

I changed the code to match the drawing.
