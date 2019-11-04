pragma solidity ^0.4.24;

// Import the Access Control Contracts for inheritance...
import "../coffeeaccesscontrol/GrowerRole.sol";
import "../coffeeaccesscontrol/ProcessorRole.sol";
import "../coffeeaccesscontrol/DistributorRole.sol";
import "../coffeeaccesscontrol/RetailerRole.sol";
import "../coffeeaccesscontrol/ConsumerRole.sol";
import "../coffeecore/Ownable.sol";

// Define a contract 'Supplychain'
contract SupplyChain is Ownable, GrowerRole, ProcessorRole, DistributorRole, RetailerRole, ConsumerRole {

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
    Unplanted,          // 0, Default State, NO EVENT REQUIRED
    Planted,            // 1, by GROWER
    Grown,              // 2, by GROWER
    Harvested,          // 3, by GROWER
    Collected,          // 4, by PROCESSOR
    Processed,          // 5, by PROCESSOR
    Packed,             // 6, by PROCESSOR
    ForSale,            // 7, by PROCESSOR to DISTRIBUTOR
    Sold,               // 8, to DISTRIBUTOR i.e. WHOLESALER, Requires Retailer ORDERED = true
    Shipped,            // 9, by PROCESSOR
    Received,           // 10, by RETAILER
    ShelvesStocked,     // 11, by RETAILER, makes it purchaseable by CONSUMER
    PurchasedInstore,   // 12, by CONSUMER, Valid END by definition, consumer receives item at time of instore purchase
    PurchasedOnline,    // 13, by CONSUMER, only need next state IF purchased online
    ConsumerReceived    // 14, by CONSUMER, 2nd Valid END state, i.e. signing for the reception of a package
  }

  // Define a default state identifying that produce has not yet entered the processing chain.
  // Default should NOT be the same as any action to which a function sets the state variable.
  State constant defaultState = State.Unplanted;

  // Define a struct 'Item' with the following fields:
  struct Item {
    uint    sku;  // Stock Keeping Unit (SKU)
    uint    upc; // Universal Product Code (UPC), generated by the Grower, goes on the package, can be verified by the Consumer
    address ownerID;  // Metamask-Ethereum address of the current owner as the product moves through 8 stages
    address originGrowerID; // Metamask-Ethereum address of the Grower
    string  originFarmName; // Grower Name
    string  originFarmInformation;  // Farm Information
    string  originFarmLatitude; // Farm Latitude
    string  originFarmLongitude;  // Farm Longitude
    uint    productID;  // Product ID potentially a combination of upc + sku
    string  productNotes; // Product Notes
    uint    productPrice; // Product Price
    State   itemState;  // Product State as represented in the enum above
    address processorID;  // Metamask-Ethereum address of the Distributor
    address distributorID;  // Metamask-Ethereum address of the Distributor
    address retailerID; // Metamask-Ethereum address of the Retailer
    address consumerID; // Metamask-Ethereum address of the Consumer
    bool    retailerOrdered; // Distributor can't buy if Retailer has not ordered - Inventory Control Concept
  }

  // Define 14 events with the same 14 state values and accept 'upc' as input argument
  event Planted(uint upc);
  event Grown(uint upc);
  event Harvested(uint upc);
  event Collected(uint upc);
  event Processed(uint upc);
  event Packed(uint upc);
  event ForSale(uint upc);
  event Sold(uint upc);
  event Shipped(uint upc);
  event Received(uint upc);
  event ShelvesStocked(uint upc);
  event PurchasedInstore(uint upc);
  event PurchasedOnline(uint upc);
  event ConsumerReceived(uint upc);
  // Define ONE event for marking a item as ordered by a retailer
  event RetailerOrdered(uint upc);

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

  // The concept of planting, when quantities concept is introduced, allows
  // for forward planning for the rest of the downline participants. 
  // Quantities tracking is, however, beyond the scope of this project.
  // Define a modifier that checks if an item.state of a upc is Planted
  modifier planted(uint _upc) {
    require(items[_upc].itemState == State.Planted);
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Grown
  modifier grown(uint _upc) {
    require(items[_upc].itemState == State.Grown);
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Harvested
  modifier harvested(uint _upc) {
    require(items[_upc].itemState == State.Harvested);
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Collected
  modifier collected(uint _upc) {
    require(items[_upc].itemState == State.Collected);
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

  // Define a modifier that checks if an item.state is ANYWHERE in the supplychain
  // after being planted and before being sold 
  modifier orderable(uint _upc) {
    require(uint(items[_upc].itemState) >= 0 && // Must have been planted up to...
      uint(items[_upc].itemState) <= 7 &&       // Must NOT have yet been sold...
      items[_upc].retailerOrdered == false);  // Must not have already been ordered
    _;
  }


  // NOTE: This is NOT part of itemState because retailer can order independent
  // of the producing process. Inventory control concept is introduced by
  // preventing distributor from buying more stock if there is not a retailer
  // who has ordered more. This facilitates tracking quantities, but that concept
  // is beyond the scope of this project.
  // Define a modifier that checks if an items[_upc].retailerOrdered == true
  modifier ordered(uint _upc) {
    require(items[_upc].retailerOrdered == true);
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

  // Define a modifier that checks if an item.state of a upc is ShelvesStocked
  modifier shelvesStocked(uint _upc) {
    require(items[_upc].itemState == State.ShelvesStocked);
    _;
  }
  
  // Define a modifier that checks if an item.state of a upc is Purchased - IN STORE
  modifier purchasedInstore(uint _upc) {
    require(items[_upc].itemState == State.PurchasedInstore);
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Purchased - ON LINE
  modifier purchasedOnline(uint _upc) {
    require(items[_upc].itemState == State.PurchasedOnline);
    _;
  }

  // Define a modifier that checks if an item.state of a upc has been ConsumerReceived by a consumer
  modifier consumerReceived(uint _upc) {
    require(items[_upc].itemState == State.ConsumerReceived);
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

  // Define a function 'plantItem' that allows a GROWER to mark an item 'Planted'
  function plantItem(
    uint _upc, 
    address _originGrowerID, 
    string _originFarmName, 
    string _originFarmInformation, 
    string  _originFarmLatitude, 
    string  _originFarmLongitude, 
    string  _productNotes
  ) onlyGrower public 
  {
    // Add the new item as part of Harvest
    items[_upc] = Item( 
      { sku: sku, 
        upc: _upc, 
        ownerID: owner(), // MWJ: Adding OWNABLE, inheritance by this contract // owner, 
        originGrowerID: _originGrowerID,
        originFarmName: _originFarmName,
        originFarmInformation: _originFarmInformation,
        originFarmLatitude: _originFarmLatitude,
        originFarmLongitude: _originFarmLongitude,
        productID: 1000000*sku + 100*_upc, // sku000upc00 format
        productNotes: _productNotes,
        productPrice: 0, 
        itemState: State.Planted, 
        processorID: address(0),
        distributorID: address(0), 
        retailerID: address(0),
        consumerID: address(0),
        retailerOrdered: false
      } );        
    // Increment sku
    sku = sku + 1;
    // Emit the appropriate event
    emit Planted(_upc);
  }

  // Define a function 'growItem' that allows a GROWER to mark an item 'Harvested'
  function growItem(uint _upc) 
  // Call modifier to check if upc has passed previous supply chain stage
  planted(_upc) 
  // Call modifier to verify caller of this function
  onlyGrower 
  public 
  {
    // Update the appropriate fields
    items[_upc].itemState = State.Grown;

    // Emit the appropriate event
    emit Grown(_upc);
  }

  // Define a function 'harvestItem' that allows a GROWER to mark an item 'Harvested'
  function harvestItem(uint _upc) 
  // Call modifier to check if upc has passed previous supply chain stage
  grown(_upc) 
  // Call modifier to verify caller of this function
  onlyGrower 
  public 
  {
    // Update the appropriate fields
    items[_upc].itemState = State.Harvested;

    // Emit the appropriate event
    emit Harvested(_upc);
  }

  // Define a function 'collectItem' that allows a PROCESSOR to mark an item 'Collected'
  function collectItem(uint _upc) 
  // Call modifier to check if upc has passed previous supply chain stage
  harvested(_upc) 
  // Call modifier to verify caller of this function
  onlyProcessor 
  public 
  {
    // Update the appropriate fields - ownerID, processorID, itemState
    address processor = msg.sender;
    items[_upc].itemState = State.Collected;
    items[_upc].ownerID = processor;
    items[_upc].processorID = processor;

    // Emit the appropriate event
    emit Collected(_upc);
  }

  // Define a function 'processItem' that allows a PROCESSOR to mark an item 'Processed'
  function processItem(uint _upc) 
  // Call modifier to check if upc has passed previous supply chain stage
  collected(_upc) 
  // Call modifier to verify caller of this function
  onlyProcessor 
  public 
  {
    // Update the appropriate fields
    // items[_upc] = Item( {  itemState: State.Processed } );
    items[_upc].itemState = State.Processed;

    // Emit the appropriate event
    emit Processed(_upc);
  }

  // Define a function 'packItem' that allows a PROCESSOR to mark an item 'Packed'
  function packItem(uint _upc) 
  // Call modifier to check if upc has passed previous supply chain stage
  processed(_upc) 
  // Call modifier to verify caller of this function
  onlyProcessor 
  public 
  {
    // Update the appropriate fields
    items[_upc].itemState = State.Packed;
   
    // Emit the appropriate event
    emit Packed(_upc);
  }

  // Define a function 'sellItem' that allows a PROCESSOR to mark an item 'ForSale'
  function sellItem(uint _upc, uint _price) 
  // Call modifier to check if upc has passed previous supply chain stage
  packed(_upc) 
  // Call modifier to verify caller of this function
  onlyProcessor 
  public 
  {
    // Update the appropriate fields
    items[_upc].itemState = State.ForSale;
    items[_upc].productPrice = _price;
    
    // Emit the appropriate event
    emit ForSale(_upc);
  }

  // Define a function 'retailerOrder' that allows a RETAILER to mark a item as ORDERED
  function retailerOrder(uint _upc)
    // Call a modifier that indicates this UPC has at least been planted but not yet sold 
    // It can be anywhere in the supply chain after planted as well PRIOR to being sold
    // It must also not have been ordered already - see the modifier
    orderable(_upc)
    // Call a modifier that only the Retailer can order from the distributor
    onlyRetailer
    public
    {
    // Update the items field - NOTE: This is NOT in itemState
    items[_upc].retailerOrdered = true;
    // Emit the proper event
    emit RetailerOrdered(_upc);
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
    
    // Transfer money to Grower
    uint price = items[_upc].productPrice;
    items[_upc].originGrowerID.transfer(price);
    // emit the appropriate event
    emit Sold(_upc);
  }

  // Define a function 'shipItem' that allows the distributor to mark an item 'Shipped'
  // Use the above modifers to check if the item is sold
  function shipItem(uint _upc) public 
    // Call modifier to check if upc has passed previous supply chain stage
    sold(_upc)
    // Call modifier to verify caller of this function
    onlyProcessor
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

  // Define a function 'shelfStockItem' that allows the RETAILER to mark an item 'ShelvesStocked'
  // Use the above modifiers to check if the item is received
  function shelfStockItem(uint _upc) public 
    // Call modifier to check if upc has passed previous supply chain stage
    received(_upc)
    // Access Control List enforced by calling Smart Contract / DApp
    // MWJ: Check for onlyRetailer
    onlyRetailer
    {
    // Update the appropriate fields - ownerID, consumerID, itemState
    items[_upc].itemState = State.ShelvesStocked;
    // Emit the appropriate event
    emit ShelvesStocked(_upc);
  }

  // Define a function 'purchaseInstoreItem' that allows the consumer to mark an item 'purchaseInstoreItem'
  // Use the above modifiers to check if the item is ShelvesStocked
  function purchaseInstoreItem(uint _upc) public 
    // Call modifier to check if upc has passed previous supply chain stage
    shelvesStocked(_upc)
    // Access Control List enforced by calling Smart Contract / DApp
    {
    // Update the appropriate fields - ownerID, consumerID, itemState
    address consumer = msg.sender;
    items[_upc].itemState = State.PurchasedInstore;
    items[_upc].ownerID = consumer;
    items[_upc].consumerID = consumer;
    // Emit the appropriate event
    emit PurchasedInstore(_upc);
  }

  // Define a function 'purchaseOnlineItem' that allows the consumer to mark an item 'PurchaseOnlineItem'
  // Use the above modifiers to check if the item is received
  function purchaseOnlineItem(uint _upc) public 
    // Call modifier to check if upc has passed previous supply chain stage
    shelvesStocked(_upc)
    // Access Control List enforced by calling Smart Contract / DApp
    {
    // Update the appropriate fields - ownerID, consumerID, itemState
    address consumer = msg.sender;
    items[_upc].itemState = State.PurchasedOnline;
    items[_upc].ownerID = consumer;
    items[_upc].consumerID = consumer;
    // Emit the appropriate event
    emit PurchasedOnline(_upc);
  }

  // Define a function 'ConsumerReceived' that allows the consumer to mark an item 'ConsumerReceived'
  // Use the above modifiers to check if the item is purchasedOnline
  function consumerReceivedItem(uint _upc) public 
    // Call modifier to check if upc has passed previous supply chain stage
    purchasedOnline(_upc)
    // Access Control List enforced by calling Smart Contract / DApp
    onlyConsumer
    {
    // Update the appropriate fields - ownerID, consumerID, itemState
    address consumer = msg.sender;
    items[_upc].itemState = State.ConsumerReceived;
    items[_upc].ownerID = consumer;
    items[_upc].consumerID = consumer;
    // Emit the appropriate event
    emit ConsumerReceived(_upc);
  }

  // Define a function 'fetchItemBufferOne' that fetches the data
  function fetchItemBufferOne(uint _upc) public view returns 
    (
      uint    itemSKU,
      uint    itemUPC,
      address ownerID,
      address originGrowerID,
      string  originFarmName,
      string  originFarmInformation,
      string  originFarmLatitude,
      string  originFarmLongitude,
      address processorID
    ) 
  {
    // Assign values to the 8 parameters
    itemSKU = items[_upc].sku;
    itemUPC = items[_upc].upc;
    ownerID = items[_upc].ownerID;
    originGrowerID = items[_upc].originGrowerID;
    originFarmName = items[_upc].originFarmName;
    originFarmInformation = items[_upc].originFarmInformation;
    originFarmLatitude = items[_upc].originFarmLatitude;
    originFarmLongitude = items[_upc].originFarmLongitude;  
    processorID = items[_upc].processorID;
  
    return (
      itemSKU,
      itemUPC,
      ownerID,
      originGrowerID,
      originFarmName,
      originFarmInformation,
      originFarmLatitude,
      originFarmLongitude,
      processorID
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
