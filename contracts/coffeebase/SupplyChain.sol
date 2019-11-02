pragma solidity ^0.4.24;

// Import the Access Control Contracts for inheritance...
import "../coffeeaccesscontrol/FarmerRole.sol";
import "../coffeeaccesscontrol/DistributorRole.sol";
import "../coffeeaccesscontrol/RetailerRole.sol";
import "../coffeeaccesscontrol/ConsumerRole.sol";
import "../coffeecore/Ownable.sol";

// Define a contract 'Supplychain'
contract SupplyChain is Ownable, FarmerRole, DistributorRole, RetailerRole, ConsumerRole {

  // Define 'owner'
  // MWJ: Adding OWNABLE // address owner;

  // Define a variable called 'upc' for Universal Product Code (UPC)
  uint  upc;

  // Define a variable called 'sku' for Stock Keeping Unit (SKU)
  uint  sku;

  // Define a public mapping 'items' that maps the UPC to an Item.
  mapping (uint => Item) items;

  // Define a public mapping 'itemsHistory' that maps the UPC to an array of TxHash, 
  // that track its journey through the supply chain -- to be sent from DApp.
  mapping (uint => string[]) itemsHistory;
  
  // Define enum 'State' with the following values:
  enum State 
  { 
    Harvested,  // 0, by FARMER
    Processed,  // 1, by FARMER
    Packed,     // 2, by FARMER
    ForSale,    // 3, by FARMER to DISTRIBUTOR
    Sold,       // 4, to WHOLESALER i.e. DISTRIBUTOR
    Shipped,    // 5, by DISTRIBUTOR
    Received,   // 6, by RETAILER, makes it purchaseable by CONSUMER
    Purchased   // 7, by CONSUMER
  }

  State constant defaultState = State.Harvested;

  // Define a struct 'Item' with the following fields:
  struct Item {
    uint    sku;  // Stock Keeping Unit (SKU)
    uint    upc; // Universal Product Code (UPC), generated by the Farmer, goes on the package, can be verified by the Consumer
    address ownerID;  // Metamask-Ethereum address of the current owner as the product moves through 8 stages
    address originFarmerID; // Metamask-Ethereum address of the Farmer
    string  originFarmName; // Farmer Name
    string  originFarmInformation;  // Farmer Information
    string  originFarmLatitude; // Farm Latitude
    string  originFarmLongitude;  // Farm Longitude
    uint    productID;  // Product ID potentially a combination of upc + sku
    string  productNotes; // Product Notes
    uint    productPrice; // Product Price
    State   itemState;  // Product State as represented in the enum above
    address distributorID;  // Metamask-Ethereum address of the Distributor
    address retailerID; // Metamask-Ethereum address of the Retailer
    address consumerID; // Metamask-Ethereum address of the Consumer
  }

  // Define 8 events with the same 8 state values and accept 'upc' as input argument
  event Harvested(uint upc);
  event Processed(uint upc);
  event Packed(uint upc);
  event ForSale(uint upc);
  event Sold(uint upc);
  event Shipped(uint upc);
  event Received(uint upc);
  event Purchased(uint upc);

  // Define a modifer that checks to see if msg.sender == owner of the contract
  modifier onlyOwner() {
    require(msg.sender == owner()); // MWJ: Adding OWNABLE// owner);
    _;
  }

  // Define a modifer that verifies the Caller
  // MWJ: I believe this modifier / function
  modifier verifyCaller (address _address) {
    require(msg.sender == _address); 
    _;
  }

  // Define a modifier that checks if the paid amount is sufficient to cover the price
  modifier paidEnough(uint _price) { 
    require(msg.value >= _price); 
    _;
  }
  
  // Define a modifier that checks the price and refunds the remaining balance
  // MWJ NOTE: This "_;" line AT THE BEGINNING, returns control to the calling contract.
  // FROM: https://knowledge.udacity.com/questions/32834
  // The logic here is correct because in line 3 ('_;'), you are telling the modifier 
  // to execute the function (in this case, buyItem()) first before you do lines 4 to 6. 
  // The buyer has been set before you reach line 6. 
  // NOTE: **** This won't work if line 3 is moved to the end of this modifier. ****
  modifier checkValue(uint _upc) {
    _; // This structure gets the modifier to execute AFTER the function instead of usually first.
    uint _price = items[_upc].productPrice;
    uint amountToReturn = msg.value - _price;
    items[_upc].consumerID.transfer(amountToReturn);
  }

  // Define a modifier that checks if an item.state of a upc is Harvested
  modifier harvested(uint _upc) {
    require(items[_upc].itemState == State.Harvested);
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Processed
  modifier processed(uint _upc) {
    require(items[_upc].itemState == State.Processed);
    _;
  }
  
  // Define a modifier that checks if an item.state of a upc is Packed
  modifier packed(uint _upc) {
    require(items[_upc].itemState == State.Packed);
    _;
  }

  // Define a modifier that checks if an item.state of a upc is ForSale
  modifier forSale(uint _upc) {
    require(items[_upc].itemState == State.ForSale);
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Sold
  modifier sold(uint _upc) {
    require(items[_upc].itemState == State.Sold);
    _;
  }
  
  // Define a modifier that checks if an item.state of a upc is Shipped
  modifier shipped(uint _upc) {
    require(items[_upc].itemState == State.Shipped);
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Received
  modifier received(uint _upc) {
    require(items[_upc].itemState == State.Received);
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Purchased
  modifier purchased(uint _upc) {
    require(items[_upc].itemState == State.Purchased);
    _;
  }

  // In the constructor set 'owner' to the address that instantiated the contract
  // and set 'sku' to 1
  // and set 'upc' to 1
  constructor() public payable {
    // MWJ: Adding OWNABLE // owner = msg.sender;
    sku = 1;
    upc = 1;
  }

  // Define a function 'kill' if required
  // MWJ: MY Q's: WHY is this not at core/top level?
  function kill() onlyOwner public {
    if (msg.sender == owner() ) { // MWJ: Adding OWNABLE // owner) {
      selfdestruct( owner() ); // MWJ: Adding OWNABLE // owner);
    }
  }

  // Define a function 'harvestItem' that allows a farmer to mark an item 'Harvested'
  function harvestItem(
    uint _upc, 
    address _originFarmerID, 
    string _originFarmName, 
    string _originFarmInformation, 
    string  _originFarmLatitude, 
    string  _originFarmLongitude, 
    string  _productNotes
  ) onlyFarmer public 
  {
    // Add the new item as part of Harvest
    items[_upc] = Item( 
      { sku: sku, 
        upc: _upc, 
        ownerID: owner(), // MWJ: Adding OWNABLE // owner, 
        originFarmerID: _originFarmerID,
        originFarmName: _originFarmName,
        originFarmInformation: _originFarmInformation,
        originFarmLatitude: _originFarmLatitude,
        originFarmLongitude: _originFarmLongitude,
        productID: 1000000*sku + 100*_upc, // sku000upc00 format
        productNotes: _productNotes,
        productPrice: 0, 
        itemState: State.Harvested, 
        distributorID: address(0), 
        retailerID: address(0),
        consumerID: address(0)
      } );        
    // Increment sku
    sku = sku + 1;
    // Emit the appropriate event
    emit Harvested(_upc);
  }

  // Define a function 'processtItem' that allows a farmer to mark an item 'Processed'
  function processItem(uint _upc) 
  // Call modifier to check if upc has passed previous supply chain stage
  harvested(_upc) 
  // Call modifier to verify caller of this function
  onlyFarmer 
  public 
  {
    // Update the appropriate fields
    // items[_upc] = Item( {  itemState: State.Processed } );
    items[_upc].itemState = State.Processed;

    // Emit the appropriate event
    emit Processed(_upc);
  }

  // Define a function 'packItem' that allows a farmer to mark an item 'Packed'
  function packItem(uint _upc) 
  // Call modifier to check if upc has passed previous supply chain stage
  processed(_upc) 
  // Call modifier to verify caller of this function
  onlyFarmer 
  public 
  {
    // Update the appropriate fields
    items[_upc].itemState = State.Packed;
   
    // Emit the appropriate event
    emit Packed(_upc);
  }

  // Define a function 'sellItem' that allows a farmer to mark an item 'ForSale'
  function sellItem(uint _upc, uint _price) 
  // Call modifier to check if upc has passed previous supply chain stage
  packed(_upc) 
  // Call modifier to verify caller of this function
  onlyFarmer 
  public 
  {
    // Update the appropriate fields
    items[_upc].itemState = State.ForSale;
    items[_upc].productPrice = _price;
    
    // Emit the appropriate event
    emit ForSale(_upc);
  }

  // Define a function 'buyItem' that allows the disributor to mark an item 'Sold'
  // Use the above defined modifiers to check if the item is available for sale, if the buyer has paid enough, 
  // and any excess ether sent is refunded back to the buyer
  function buyItem(uint _upc) 
    // Call modifier to check if upc has passed previous supply chain stage
    forSale(_upc) 
    // Call modifer to check if buyer has paid enough
    paidEnough(items[_upc].productPrice) 
    // Call modifer to send any excess ether back to buyer
    checkValue(_upc) 
    // ADDING: Check to see if purchaser is a DISTRIBUTOR
    onlyDistributor
    public payable 
    {
    // Update the appropriate fields - ownerID, distributorID, itemState
    address buyer = msg.sender;
    items[_upc].itemState = State.Sold;
    items[_upc].ownerID = buyer;
    items[_upc].distributorID = buyer;
    
    // Transfer money to farmer
    uint price = items[_upc].productPrice;
    items[_upc].originFarmerID.transfer(price);
    // emit the appropriate event
    emit Sold(_upc);
  }

  // Define a function 'shipItem' that allows the distributor to mark an item 'Shipped'
  // Use the above modifers to check if the item is sold
  function shipItem(uint _upc) public 
    // Call modifier to check if upc has passed previous supply chain stage
    sold(_upc)
    // Call modifier to verify caller of this function
    onlyFarmer
    {
    // Update the appropriate fields
    items[_upc].itemState = State.Shipped;    
    // Emit the appropriate event
    emit Shipped(_upc);
  }

  // Define a function 'receiveItem' that allows the retailer to mark an item 'Received'
  // Use the above modifiers to check if the item is shipped
  function receiveItem(uint _upc) public 
    // Call modifier to check if upc has passed previous supply chain stage
    shipped(_upc)
    // THEIRS (what?) -> Access Control List enforced by calling Smart Contract / DApp
    // MWJ: Check for onlyRetailer
    onlyRetailer
    {
    // Update the appropriate fields - ownerID, retailerID, itemState
    address retailer = msg.sender;
    items[_upc].ownerID = retailer;
    items[_upc].retailerID = retailer;
    items[_upc].itemState = State.Received;    
    // Emit the appropriate event
    emit Received(_upc);
  }

  // Define a function 'purchaseItem' that allows the consumer to mark an item 'Purchased'
  // Use the above modifiers to check if the item is received
  function purchaseItem(uint _upc) public 
    // Call modifier to check if upc has passed previous supply chain stage
    received(_upc)
    // Access Control List enforced by calling Smart Contract / DApp
    {
    // Update the appropriate fields - ownerID, consumerID, itemState
    address consumer = msg.sender;
    items[_upc].itemState = State.Purchased;
    items[_upc].ownerID = consumer;
    items[_upc].consumerID = consumer;
    // Emit the appropriate event
    emit Purchased(_upc);
  }

  // Define a function 'fetchItemBufferOne' that fetches the data
  function fetchItemBufferOne(uint _upc) public view returns 
    (
      uint    itemSKU,
      uint    itemUPC,
      address ownerID,
      address originFarmerID,
      string  originFarmName,
      string  originFarmInformation,
      string  originFarmLatitude,
      string  originFarmLongitude
    ) 
  {
    // Assign values to the 8 parameters
    itemSKU = items[_upc].sku;
    itemUPC = items[_upc].upc;
    ownerID = items[_upc].ownerID;
    originFarmerID = items[_upc].originFarmerID;
    originFarmName = items[_upc].originFarmName;
    originFarmInformation = items[_upc].originFarmInformation;
    originFarmLatitude = items[_upc].originFarmLatitude;
    originFarmLongitude = items[_upc].originFarmLongitude;  
  
    return (
      itemSKU,
      itemUPC,
      ownerID,
      originFarmerID,
      originFarmName,
      originFarmInformation,
      originFarmLatitude,
      originFarmLongitude
    );
  }

  // Define a function 'fetchItemBufferTwo' that fetches the data
  function fetchItemBufferTwo(uint _upc) public view returns 
    (
      uint    itemSKU,
      uint    itemUPC,
      uint    productID,
      string  productNotes,
      uint    productPrice,
      uint    itemState,
      address distributorID,
      address retailerID,
      address consumerID
    ) 
  {
    // Assign values to the 9 parameters
    itemSKU = items[_upc].sku;
    itemUPC = items[_upc].upc;
    productID = items[_upc].productID;
    productNotes = items[_upc].productNotes;
    productPrice = items[_upc].productPrice;
    itemState = uint(items[_upc].itemState); // Can convert to text
    distributorID = items[_upc].distributorID;
    retailerID = items[_upc].retailerID;  
    consumerID = items[_upc].consumerID;  

    return 
    (
      itemSKU,
      itemUPC,
      productID,
      productNotes,
      productPrice,
      itemState,
      distributorID,
      retailerID,
      consumerID
    );
  }
}
