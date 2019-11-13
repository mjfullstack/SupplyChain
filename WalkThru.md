# WALMART Food Supplychain

## DAPP Walk Through
1. #### General Information ####
    1. DAPP Page is *Demonstration* oriented
        1. All ACTORS are on a single page - easy to follow actions
        2. When a UPC is fetched, ALL actors sections are updated
        3. Allows for working on various UPCs which are at various stages of the process
        4. Starter code configured all DAPP interaction with contract to be from user's MetaMask account[0]. This configuration was maintained for reviewer's convenience
    2. Grayed fields are READ-ONLY
    3. White fields are required inputs
    4. The next action for a UPC is highlighted in **GREEN**
2. #### Fetch UPC or Confirm UPC is Available #### 
    1. Under Product Details, enter a UPC number
    2. Find "Check UPC Status" and click **Fetch**
    3. If in ledger, ALL actor sections are updated
    4. If UPC shows 0, number is available for next entry
3. #### Enter Grower Data Input & Processes #### 
    1. Enter Grower fields 
    2. Enter the UPC previously determined to be available
    3. Click **Plant**
    4. **Confirm** the transaction on MetaMask
        1. The **Product State** field shows **Planted**
        2. The Current Owner ID field is updated
        3. **GREEN** highlight moves to the **Grow** button
    4. Click **Grow**
        1. The **Product State** field shows **Grown**
        2. **GREEN** highlight moves to the **Grow** button
    5. Click **Harvest**
        1. The **Product State** field shows **Harvested**
        2. **GREEN** highlight moves to the **Collect** button in the **Processor Function** section
4. #### Processor Functions ####