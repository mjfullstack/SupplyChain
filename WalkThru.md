# WALMART Food Supplychain

## DAPP Walk Through
1. #### General Information ####
    1. DAPP Page is *Demonstration* oriented in the following ways:
        1. All ACTORS are on a single page - easy to follow actions
        2. When a UPC is fetched, ALL actors sections are updated
        3. This page layout allows for working on various UPCs which are at various stages in the supplychain and switching between different UPCs
        4. To match the starter code paradigm, **ALL Origin Grower ID** are the user's **MetaMask account[0]** address as the contract owner
        5. The following table shows the wallet address to use for each button-click / function exectuion in the DAPP:

            Button Name  | Actor ID for Wallet Account
            -----------  | --------------------------------------------
            Plant  | Origin Grower ID
            Grow  |  Origin Grower ID
            Harvest  |  Origin Grower ID
            Collect  |  Origin Grower ID
            Process  | Processor ID
            Pack  | Processor ID
            For Sale  | Processor ID
            Order Wholesale  |  Origin Grower ID
            Buy Wholesale  |  Origin Grower ID
            Ship  | Processor ID
            Receive Wholesale  | Retailer ID
            Stock Shelves  | Retailer ID
            Purchase Instore  |  Origin Grower ID
            Purchase Online  |  Origin Grower ID
            Consumer Received  | Consumer ID
        
        6. The **Fetch 1** and **Fetch 2** Sections are maintained from the starter code for the reviewers convenience and shown at the bottom of the page.
        7. The UPC entry and the data recalled in the **Fetch 1** and **Fetch 2** Sections are independent from the other Actor sections on the page.
    2. Grayed fields are READ-ONLY
    3. White fields are required inputs
    4. The next action for a UPC is highlighted in **GREEN**
2. #### Fetch UPC or Confirm UPC is Available #### 
    1. Under **Product Details**, enter a **UPC** number
    2. Find "**Check UPC Status**" and click **Fetch**
    3. If this UPC is on the blockchain, ALL actor sections are updated
    4. If UPC shows 0, number is available for the next entry
3. #### Enter Grower Data Input & Processes #### 
    1. Enter Grower fields using contract owner / MetaMask Account[0] as the **Origin Grower ID**
    2. Enter the UPC previously determined to be available
    3. Use MetaMask Account[0] matching the **Origin Grower ID****
    4. Click **Plant**
        1. **Confirm** the transaction on MetaMask
        2. **Ensure GAS is ENOUGH... MetaMask NOTORIOUSLY resetting to 0 gWei or very small amounts for gas limit and price!!!**
        3. The **Product State** field shows **Planted**
        4. The **Current Owner ID** field is updated
        5. **GREEN** highlight moves to the **Grow** button
    5. Click **Grow**
        1. The **Product State** field shows **Grown**
        2. **GREEN** highlight moves to the **Harvest** button
    6. Click **Harvest**
        1. The **Product State** field shows **Harvested**
        2. **GREEN** highlight moves to the **Collect** button in the **Processor Function** section
4. #### Processor Functions ####
    1. Enter the **Processor ID**
        1. NOTE 1: NO entry for Price is accepted until clicking the **ForSale** button below
        2. NOTE 2: The **Order Wholesale** button in the Retailer Functions Section can be clicked anytime after the UPC has been planted and before the distributor **Buy Wholesale** button is clicked provided a Retailer ID is provided. The distributor will **NOT** be able to click the **Buy Wholesale** button until the retailer has clicked the **Order Wholesale** button. To do this, see the first item under **Distributor Functions** below
    2. Use MetaMask Account[0] matching the **Origin Grower ID**
    3. Click **Collect**
        1. The **Product State** field shows **Collected**
        2. **GREEN** highlight moves to the **Process** button
    4. Use MetaMask Account matching the **Processor ID**
    5. Click **Process**
        1. The **Product State** field shows **Processed**
        2. **GREEN** highlight moves to the **Pack** button
    6. Click **Pack**
        1. The **Product State** field shows **Packed**
        2. **GREEN** highlight moves to the **ForSale** button
    7. Enter a **Price** in the Price (ETH) field in the **Retailer Processes** Section
    8. Click **ForSale**
        1. The **Product State** field shows **For Sale**
        2. **GREEN** highlight moves to the **Buy Wholesale** button in the **Distributor Function** section **IF** the **Order Wholesale** button has been previously clicked and the **Retailer Order Status** light in the Distributor Functions Section shows **ORDERED** and is **GREEN**
5. #### Distributor Functions ####
    1. Ensure the **Retailer Order Status** light in the Distributor Functions Section shows **ORDERED** and is **GREEN**
        1. If not, enter a **Retailer ID** in the Retailer Processes Section
        2. Use MetaMask Account[0] matching the **Origin Grower ID****
        3. Click **Order Wholesale**
        4. **GREEN** highlight moves to the **Buy Wholesale** button in the **Distributor Function** section and the **Retailer Order Status** light in the Distributor Functions Section shows **ORDERED** and is **GREEN**
    2. Enter a **Distributor ID** 
    3. Use MetaMask Account[0] matching the **Origin Grower ID****
    4. Click **Buy Wholesale**
        1. The **Product State** field shows **Sold**
        2. **GREEN** highlight moves to the **Ship** button in the **Processor Function** section
    5. Retrun to **Proccessor Function:** 
    6. Use MetaMask Account matching the **Processor ID**
    7. Click the **Ship** button back in the **Processor Functions** to ship the item
        1. The **Product State** field shows **Shipped**
        2. **GREEN** highlight moves to the **Receive Wholesale** button in the **Retailer Processes** Section
6. #### Retailer Processes ####
    1. Use MetaMask Account matching the **Retailer ID**
    2. Click **Receive Wholesale** to continue the retailer functions
        1. The **Product State** field shows **Received**
        2. **GREEN** highlight moves to the **Stock Shelves** button 
    3. Click **Stock Shelves** 
        1. The **Product State** field shows **In Stock**
        2. **GREEN** highlight moves to BOTH of the **Purchase Instore** and **Purchase Online** buttons in the **Consumer Interface** Section
7. #### Consumer Interface ####
    1. Enter a **Consumer ID**
    2. Use MetaMask Account[0] matching the **Origin Grower ID****
    3. Click **Purchase Online**
        1. NOTE: Alternative Available:
            1. Click **Purchase Instore** 
            2. The **Product State** field shows **Purchased Instore**
            3. The web page shows "Consumer In-Store Purchase Complete"
            4. This **ENDS** the Instore Purchase path
        2. Continuing the Purchase Online path, the **Product State** field shows **Purchased Online**
        3. **GREEN** highlight moves to the **Consumer Received** button
    4. Use MetaMask Account matching the **Consumer ID**
    5. Click **Consumer Received**
        1. The **Product State** field shows **Consumer Received**
        3. The web page shows "Consumer Online Purchase Complete"
        4. This **ENDS** the Online Purchase path

