# SupplyChain
Udacity Blockchain Supply Chain Project 6

## Project 6 - Part A
See UML Directory for the four diagrams

## Deployment Details 
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




## Testing Notes
### Discrepancy between TestSupplychain.js and Sequence Diagram:
Code shows: // 6th Test
    it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async() => { ...

Diagram shows: Line for function shipItem from FARMER to Retailer, NOT Distributor to Retailer.

I changed the code to match the drawing.
