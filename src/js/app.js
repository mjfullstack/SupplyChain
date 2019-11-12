App = {
    web3Provider: "https://rinkeby.infura.io/v3/5ea59fd3309b4d61b4ac56d6da00838a",
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    currItemOwnerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productState: null,
    productID: null,
    productNotes: null,
    productPrice: 0,
    processorID: "0x0000000000000000000000000000000000000000",
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",
    localItemState: "Unplanted", // MWJ Temporary
    // Unplanted, Planted, Grown, Harvested, Collected, Processed
    // Packed, ForSale, Sold, Shipped, Received, ShelvesStocked,
    // PurchaseInstore, PurchaseOnline, ConsumerReceived
    retailerOrdered: 0,

    init: async function () {
        App.readFormN(11);
        App.updateActiveButton("Unplanted");
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    // Write Only Section 6, fetch1 button fields
    writeFetch1Fields: function (_fetch1Res) {
        $("#sku6").val(_fetch1Res[0].c[0]);
        $("#upc6").val(_fetch1Res[1].c[0]);
        $("#ownerID6").val(_fetch1Res[2]); // App.currItemOwnerID
        $("#originFarmerID6").val(_fetch1Res[3]);
        $("#originFarmName6").val(_fetch1Res[4]);
        $("#originFarmInformation6").val(_fetch1Res[5]);
        $("#originFarmLatitude6").val(_fetch1Res[6]);
        $("#originFarmLongitude6").val(_fetch1Res[7]);
        $("#processorID6").val(_fetch1Res[8]);
    },

    // Write Only Section 7, fetch2 button fields
    writeFetch2Fields: function (_fetch2Res) {
        $("#sku7").val(_fetch2Res[0].c[0]);
        $("#upc7").val(_fetch2Res[1].c[0]);
        $("#productID7").val(_fetch2Res[2].c[0]);
        $("#productNotes7").val(_fetch2Res[3]);
        $("#productPrice7").val(_fetch2Res[4].c[0]);
        // $("#productState7").val(_fetch2Res[5].c[0]);
        $("#productState7").val(App.localItemState);
        $("#distributorID7").val(_fetch2Res[6]);
        $("#retailerID7").val(_fetch2Res[7]);
        $("#consumerID7").val(_fetch2Res[8]);
    },
    
    // Write Sections 1 through 5 fields
    writePageFields: function () {
        $("#sku1").val(App.sku); // This gets assigned in SupplyChain.sol
        $("#sku2").val(App.sku);
        $("#sku3").val(App.sku);
        $("#sku4").val(App.sku);
        $("#sku5").val(App.sku);

        $("#upc1").val(App.upc);
        $("#upc2").val(App.upc);
        $("#upc3").val(App.upc);
        $("#upc4").val(App.upc);
        $("#upc5").val(App.upc);

        $("#ownerID1").val(App.currItemOwnerID);

        $("#originFarmerID1").val(App.originFarmerID);
        $("#originFarmerID2").val(App.originFarmerID);
        $("#originFarmerID3").val(App.originFarmerID);

        $("#originFarmName1").val(App.originFarmName);

        $("#originFarmInformation1").val(App.originFarmInformation);
        $("#originFarmLatitude1").val(App.originFarmLatitude);
        $("#originFarmLongitude1").val(App.originFarmLongitude);

        $("#productNotes1").val(App.productNotes);
        $("#productNotes2").val(App.productNotes);
        $("#productNotes3").val(App.productNotes);
        $("#productNotes4").val(App.productNotes);
        $("#productNotes5").val(App.productNotes);

        $("#productPrice1").val(App.productPrice);
        $("#productPrice2").val(App.productPrice);
        $("#productPrice3").val(App.productPrice);
        $("#productPrice4").val(App.productPrice);
        $("#productPrice5").val(App.productPrice);

        $("#processorID1").val(App.processorID);
        $("#processorID2").val(App.processorID);

        $("#distributorID1").val(App.distributorID);
        $("#distributorID3").val(App.distributorID);

        $("#retailerID1").val(App.retailerID);
        $("#retailerID4").val(App.retailerID);

        $("#consumerID1").val(App.consumerID);
        $("#consumerID5").val(App.consumerID);

        $("#productID1").val(App.productID); // This gets assigned in SupplyChain.sol
        $("#productID2").val(App.productID);
        $("#productID3").val(App.productID);
        $("#productID4").val(App.productID);
        $("#productID5").val(App.productID);

        $("#productState1").val(App.localItemState);
        $("#productState2").val(App.localItemState);
        $("#productState3").val(App.localItemState);
        $("#productState4").val(App.localItemState);
        $("#productState5").val(App.localItemState);
        // $("#productState1").val(App.productState);
        // $("#productState2").val(App.productState);
        // $("#productState3").val(App.productState);
        // $("#productState4").val(App.productState);
        // $("#productState5").val(App.productState);

        console.log(
            App.sku,
            App.upc,
            App.currItemOwnerID, 
            App.originFarmerID, 
            App.originFarmName, 
            App.originFarmInformation, 
            App.originFarmLatitude, 
            App.originFarmLongitude, 
            App.productNotes, 
            App.productPrice, 
            App.distributorID, 
            App.retailerID, 
            App.consumerID,
            App.localItemState,
            App.productID,
            App.retailerOrdered
        );
    },

    readFormN: function (_procId) {
        let _n;
        switch(_procId) {
            case 11: // grower PLANT
            case 12: // grower GROW
            case 1:  // grower HARVEST
                _n = 1;
                console.log(`readFormN _procId = ${_procId}, _n = ${_n}`)
                break;
            case 13: // processor COLLECT
            case 2:  // processor PROCESS
            case 3:  // processor PACK
            case 4:  // processor SELL
            case 6:  // processor SHIP
                _n = 2;
                console.log(`readFormN _procId = ${_procId}, _n = ${_n}`)
                break;
            case 5:  // distributor BUY
                _n = 3;
                console.log(`readFormN _procId = ${_procId}, _n = ${_n}`)
                break;
            case 14: // retailer ORDER
            case 7:  // retailer RECEIVE
            case 15: // retailer STOCK SHELVES
                _n = 4;
                console.log(`readFormN _procId = ${_procId}, _n = ${_n}`)
                break;
            case 8:  // consumer PURCHASE INSTORE
            case 16: // consumer PURCHASE ONLINE
            case 17: // consumer MARK RECEIVED
                _n = 5;
                console.log(`readFormN _procId = ${_procId}, _n = ${_n}`)
                break;
            case 9:  // fetch 1
                _n = 6;
                console.log(`readFormN _procId = ${_procId}, _n = ${_n}`)
                break;
            case 10:  // fetch 2
                _n = 7;
                console.log(`readFormN _procId = ${_procId}, _n = ${_n}`)
                break;
        }

        if (_n == 1) {
            App.upc = $("#upc"+_n).val();
            App.sku = App.upc; // This gets assigned in SupplyChain.sol
            App.productID = 10000000000*App.upc + 100*App.sku; // This gets assigned in SupplyChain.sol
            App.currItemOwnerID = $("#originFarmerID"+_n).val();
            App.originFarmerID = $("#originFarmerID"+_n).val();
            App.originFarmName = $("#originFarmName"+_n).val();
            App.originFarmInformation = $("#originFarmInformation"+_n).val();
            App.originFarmLatitude = $("#originFarmLatitude"+_n).val();
            App.originFarmLongitude = $("#originFarmLongitude"+_n).val();
            App.productNotes = $("#productNotes"+_n).val();
        }
        if (_n == 2) {
            App.processorID = $("#processorID"+_n).val();
            App.productPrice = $("#productPrice"+_n).val();
            App.currItemOwnerID = $("#processorID"+_n).val();
        }
        if (_n == 3) {
            App.distributorID = $("#distributorID"+_n).val();
            if (_procId == 5) {
                App.currItemOwnerID = $("#retailerID"+_n).val();
            }
        }
        if (_n == 4) {
            App.retailerID = $("#retailerID"+_n).val();
            App.currItemOwnerID = $("#retailerID"+_n).val();
        }
        if (_n=5) {
            App.consumerID = $("#consumerID"+_n).val();
        }

        console.log(
            App.sku,
            App.upc,
            App.currItemOwnerID, 
            App.originFarmerID, 
            App.originFarmName, 
            App.originFarmInformation, 
            App.originFarmLatitude, 
            App.originFarmLongitude, 
            App.productNotes, 
            App.productPrice, 
            App.processorID, 
            App.distributorID, 
            App.retailerID, 
            App.consumerID,
            App.localItemState,
            App.retailerOrdered,
            App.productID,
        );

        /************** SAVE FOR TESTING *****************/
        // Testing DOM Manipulation
        const testStringDOM = 
        App.sku+
        App.upc+
        App.currItemOwnerID+ 
        App.originFarmerID+ 
        App.originFarmName+ 
        App.originFarmInformation+ 
        App.originFarmLatitude+ 
        App.originFarmLongitude+ 
        App.productNotes+ 
        App.productPrice+ 
        App.processorID+
        App.distributorID+ 
        App.retailerID+ 
        App.consumerID+
        App.localItemState+
        App.productID;

        console.log(`testStringDOM = ${testStringDOM}`)
        // $("#ftc-item2p2").text(`readFormN ftc-item2p2 TEXT are here! ${testStringDOM}`); // MWJ
        // $("#ftc-item2").val(`readFormN ftc-item2 VAL are here! ${testStringDOM}`); // MWJ - Should work
        // $("#ftc-item2p").html(`<h5>readFormN ftc-item2p HTML are here! ${testStringDOM}</h5>`); // MWJ
        /************** SAVE FOR TESTING *****************/

    },

    // Converts blockchain itemState to text string
    updateLocalItemState: (_chainState) => {
        switch(_chainState) {
            case 0: App.localItemState = "Unplanted"; // grower
            break;
            case 1: App.localItemState = "Planted"; // grower
            break;
            case 2: App.localItemState = "Grown"; // grower
            break;
            case 3: App.localItemState = "Harvested"; // grower
            break;
            case 4: App.localItemState = "Collected"; // processor
            break;
            case 5: App.localItemState = "Processed"; // processor
            break;
            case 6: App.localItemState = "Packed"; // processor
            break;
            case 7: App.localItemState = "ForSale"; // processor
            break;
            case 8: App.localItemState = "Sold"; // distributor
            break;
            case 9: App.localItemState = "Shipped"; // processor
            break;
            case 10: App.localItemState = "Received"; // retailer
            break;
            case 11: App.localItemState = "ShelvesStocked"; // retailer
            break;
            case 12: App.localItemState = "PurchaseInstore"; // consumer
            break;
            case 13: App.localItemState = "PurchaseOnline"; // consumer
            break;
            case 14: App.localItemState = "ConsumerReceived"; // consumer
            break;
        }
    },

    updateOrderedStatusButton: () => {
        // PLACE the values and adjust buttons accordingly...
        if (App.retailerOrdered) {
            $('#button-retailer-ordered-display').prop('disabled', false); // enabled
            $('#button-retailer-ordered-display').addClass('btn-success').removeClass('btn-warning');
            $('#button-retailer-ordered-display').text('ORDERED');
            $('#button-order').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
            // $('#button-order').prop('disabled', true); // We removed all disables for all buttons
            // DON'T call updateActiveButton since not a App.localItemState change
            if (App.localItemState == "ForSale") {
                $('#button-buy-wholesale').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
                $('#button-buy-wholesale').prop('disabled', false); // enables
            }
        } else {
            $('#button-retailer-ordered-display').prop('disabled', true); // disabled
            $('#button-retailer-ordered-display').addClass('btn-warning').removeClass('btn-success');
            $('#button-retailer-ordered-display').text('NOT Ordered');
            $('#button-order').removeClass('btn-default').addClass('btn-success'); // PREVIOUS Button???
            // if (App.localItemState == "ForSale") {
            //     $('#button-buy-wholesale').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
            //     $('#button-buy-wholesale').prop('disabled', false); // enables
            // }
        }
    },


    updateActiveButton: function (_currState) {
        App.unsetActiveAllButtons();
        // Possible States:
        // Unplanted, Planted, Grown, Harvested, Collected, Processed
        // Packed, ForSale, Sold, Shipped, Received, ShelvesStocked,
        // PurchaseInstore, PurchaseOnline, ConsumerReceived
        // retailerOrdered: 0, // SEPARATE ELEMENT, See ProductID mod(2) = ordered
        App.updateOrderedStatusButton();
        switch(_currState) {
            case "Unplanted": // grower
                $('#button-plant').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
                $('#button-plant').prop('disabled', false); // enables
                $('#button-order').prop('disabled', false); // enables
                break;
            case "Planted": // grower
                $('#button-plant').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
                $('#button-grow').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
                $('#button-grow').prop('disabled', false); // enables
                // Handle Order Wholesale Button
                $('#button-order').prop('disabled', false); // enables
                $('#button-order').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
                break;
            case "Grown": // grower
                $('#button-grow').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
                $('#button-harvest').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
                $('#button-harvest').prop('disabled', false); // enables
                break;
            case "Harvested": // grower
                $('#button-harvest').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
                $('#button-collect').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
                $('#button-collect').prop('disabled', false); // enables
                break;
            case "Collected": // processor
                $('#button-collect').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
                $('#button-process').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
                $('#button-process').prop('disabled', false); // enables
                break;
            case "Processed": // processor
                $('#button-process').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
                $('#button-pack').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
                $('#button-pack').prop('disabled', false); // enables
                break;
            case "Packed": // processor
                $('#button-pack').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
                $('#button-forsale').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
                $('#button-forsale').prop('disabled', false); // enables
                break;
            case "ForSale": // processor
                $('#button-forsale').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
                if (App.retailerOrdered) {
                    $('#button-buy-wholesale').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
                    $('#button-buy-wholesale').prop('disabled', false); // enables
                }
                break;
            case "Sold": // disributor
                $('#button-buy-wholesale').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
                $('#button-ship').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
                $('#button-ship').prop('disabled', false); // enables
                break;
            case "Shipped": // processor
                $('#button-ship').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
                $('#button-receive-wholesale').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
                $('#button-receive-wholesale').prop('disabled', false); // enables
                break;
            case "Received": // retailer
                $('#button-receive-wholesale').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
                $('#button-stock-shelf').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
                $('#button-stock-shelf').prop('disabled', false); // enables
                break;
            case "ShelvesStocked": // retailer, TWO ways to order
                $('#button-stock-shelf').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
                $('#button-buy-instore').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
                $('#button-buy-instore').prop('disabled', false); // enables
                // Second button enabled, two possuble paths forward
                $('#button-buy-online').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
                $('#button-buy-online').prop('disabled', false); // enables
                break;
            case "PurchaseInstore": // consumer
                $('#button-buy-instore').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
                $('#button-buy-online').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
                // none to enable, VALID ending state
                // Display final purchase type
                $('#purchase-complete').text("IN-STORE Purchase Complete!");
                break;
            case "PurchaseOnline": // consumer
                $('#button-buy-instore').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
                $('#button-buy-online').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
                $('#button-receive-retail').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
                $('#button-receive-retail').prop('disabled', false); // enables
                break;
            case "ConsumerReceived": // consumer
            $('#button-receive-retail').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
                // none to enable, VALID ending state
                // Display final purchase type
                $('#purchase-complete').text("ONLINE Purchase Complete!");
                break;
        }
    },

    unsetActiveAllButtons: function() {
        $('#button-plant').removeClass('btn-success').addClass('btn-default');
        $('#button-grow').removeClass('btn-success').addClass('btn-default');
        $('#button-harvest').removeClass('btn-success').addClass('btn-default');
        $('#button-collect').removeClass('btn-success').addClass('btn-default');
        $('#button-process').removeClass('btn-success').addClass('btn-default');
        $('#button-pack').removeClass('btn-success').addClass('btn-default');
        $('#button-forsale').removeClass('btn-success').addClass('btn-default');
        $('#button-ship').removeClass('btn-success').addClass('btn-default');
        // $('#button-buy-wholesale').removeClass('btn-success').addClass('btn-default');
        // $('#button-retailer-ordered-display').removeClass('btn-success').addClass('btn-default');
        // $('#button-order').removeClass('btn-success').addClass('btn-default');
        $('#button-receive-wholesale').removeClass('btn-success').addClass('btn-default');
        $('#button-stock-shelf').removeClass('btn-success').addClass('btn-default');
        $('#button-buy-instore').removeClass('btn-success').addClass('btn-default');
        $('#button-buy-online').removeClass('btn-success').addClass('btn-default');
        $('#button-receive-retail').removeClass('btn-success').addClass('btn-default');
    },

    consoleLogFetch1Results: function(_result) {
        console.log("res0-SKU", _result[0].c[0]);
        console.log("res1-UPC", _result[1].c[0]);
        console.log("res2-CurrOwnID", _result[2]);
        console.log("res3-OrigFID", _result[3]);
        console.log("res4-FName", _result[4]);
        console.log("res5-FInof", _result[5]);
        console.log("res6-Flat", _result[6]);
        console.log("res7-FLong", _result[7]);
        console.log("res8-ProcID", _result[8]);
    },

    consoleLogFetch2Results: function(_result) {
        console.log("res0-SKU", _result[0].c[0]);
        console.log("res1-UPC", _result[1].c[0]);
        console.log("res2-ProdID", _result[2].c[0]);
        console.log("res3-Notes", _result[3]);
        console.log("res4-Price", _result[4].c[0]);
        console.log("res5-State", _result[5].c[0]);
        console.log("res6-distID", _result[6]);
        console.log("res7-retlID", _result[7]);
        console.log("res8-ConsID", _result[8]);
    },

    consoleLogFetch3Results: function(_result) {
        console.log("res0-ProdID", _result[0].c[0]);
        console.log("res1-retailerOrd", _result[1].c[0]);
    },

    updateAppVarsFetch1: (_result) => {
        App.sku                     = _result[0].c[0];  // This gets assigned in SupplyChain.sol
        App.upc                     = _result[1].c[0];
        App.currItemOwnerID         = _result[2];       // CURRENT ITEM Owner
        App.originFarmerID          = _result[3];
        App.originFarmName          = _result[4];
        App.originFarmInformation   = _result[5];
        App.originFarmLatitude      = _result[6];
        App.originFarmLongitude     = _result[7];
        App.processorID             = _result[8];
    },

    updateAppVarsFetch2: (_result) => {
        App.sku                     = _result[0].c[0];  // This gets assigned in SupplyChain.sol
        App.upc                     = _result[1].c[0];
        App.productID               = _result[2].c[0]; // This gets assigned in SupplyChain.sol
        App.productNotes            = _result[3];
        App.productPrice            = _result[4].c[0];
        App.productState            = _result[5].c[0];
        App.distributorID           = _result[6];
        App.retailerID              = _result[7];
        App.consumerID              = _result[8];
    },

    updateAppVarsFetch3: (_result) => {
        // App.productID               = _result[0].c[0]; // This gets assigned in SupplyChain.sol
        App.retailerOrdered         = _result[1].c[0];
    },

    // Get ALL fields from the blockchain and reflect in DAPP page
    reflectBlockchainInApp: async (_dispUPC) => {
        // return await App.fetchItemBufferOne(App.upc); // ORIG
        let case18bufOne = await App.fetchItemBufferOne(_dispUPC);
        console.log("case18bufOne:");
        console.log(case18bufOne); // UNDEFINED, so next line NOT done correctly here
        await App.consoleLogFetch1Results(case18bufOne); // Done correctly in fetchItemBufferOne
        await App.updateAppVarsFetch1(case18bufOne); // Update App.x VARS

        // return await App.fetchItemBufferTwo(App.upc); // ORIG
        let case18bufTwo = await App.fetchItemBufferTwo(_dispUPC);
        console.log("case18bufTwo:");
        console.log(case18bufTwo);
        await App.consoleLogFetch2Results(case18bufTwo);
        await App.updateAppVarsFetch2(case18bufTwo);
        
        // NEW: Adding retailerOrdered
        let case18bufThree = await App.fetchItemBufferThree(_dispUPC);
        console.log("case18bufThree:");
        console.log(case18bufThree);
        await App.consoleLogFetch3Results(case18bufThree);
        await App.updateAppVarsFetch3(case18bufThree);

        await App.updateLocalItemState(App.productState); // Get numeric to string
        await App.updateActiveButton(App.localItemState); // Present string on page
        await App.writePageFields();
        return await ( [case18bufOne, case18bufTwo, case18bufThree] );
},

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../../build/contracts/SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, async function(data) {
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            
            await App.fetchItemBufferOne(App.upc); // MWJ - Changed function to take UPC as input parameter
            await App.fetchItemBufferTwo(App.upc); // MWJ - Provide UPC as input argument
            await App.fetchItemBufferThree(App.upc); // MWJ - Provide UPC as input argument
            App.fetchEvents();

        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId', processId);

        switch(processId) {
            case 1:
                console.log(`processId = ${processId}`);
                return await App.harvestItem(event);
                break;
            case 2:
                console.log(`processId = ${processId}`);
                return await App.processItem(event);
                break;
            case 3:
                console.log(`processId = ${processId}`);
                return await App.packItem(event);
                break;
            case 4:
                console.log(`processId = ${processId}`);
                return  await App.sellItem(event);
                break;
            case 5:
                console.log(`processId = ${processId}`);
                return  await App.buyItem(event);
                break;
            case 6:
                console.log(`processId = ${processId}`);
                return  await App.shipItem(event);
                break;
            case 7:
                console.log(`processId = ${processId}`);
                return  await App.receiveItem(event);
                break;
            case 8: // purchaseInstoreItem() INSTORE
                console.log(`processId = ${processId}`);
                return  await App.purchaseInstoreItem(event);
                break;
            case 9: // fetch 1
                console.log(`processId = ${processId}`);
                let _upc6 = $('#upc6').val(); // MWJ
                console.log('upc6', _upc6); // MWJ
                // return await App.fetchItemBufferOne(App.upc); // ORIG
                let case9result = await App.fetchItemBufferOne(_upc6);
                await App.writeFetch1Fields(case9result);
                return case9result;
                break;
            case 10: // fetch 2
                console.log(`processId = ${processId}`);
                let _upc7 = $('#upc7').val(); // MWJ
                console.log('upc7', _upc7); // MWJ
                // App.upc = $('#upc7').val(); // MWJ
                console.log('App.upc', App.upc); // MWJ
                // return await App.fetchItemBufferTwo(App.upc); // ORIG
                let case10result = await App.fetchItemBufferTwo(_upc7);
                // await App.updateLocalItemState(case10result[5].c[0]); // Numeric state value from blockchain
                await App.writeFetch2Fields(case10result);
                return case10result;
                break;
            case 11: // plantItem()
                console.log(`processId = ${processId}`);
                return await App.plantItem(event);
                break;
            case 12: // growItem()
                console.log(`processId = ${processId}`);
                return await App.growItem(event);
                break;
            case 13: // collectItem()
                console.log(`processId = ${processId}`);
                return await App.collectItem(event);
                break;
            case 14: // retailerOrder()
                console.log(`processId = ${processId}`);
                return await App.retailerOrder(event);
                break;
            case 15: // shelfStockItem()
                console.log(`processId = ${processId}`);
                return await App.shelfStockItem(event);
                break;
            case 16: // purchaseOnlineItem() ONLINE
                console.log(`processId = ${processId}`);
                return await App.purchaseOnlineItem(event);
                break;
            case 17: // consumerReceivedItem()
                console.log(`processId = ${processId}`);
                return await App.consumerReceivedItem(event);
                break;
            case 18: // fetch UPC 
                console.log(`Fetch UPC: processId = ${processId}`);
                App.upc = $('#upc1').val(); // MWJ
                console.log('upc1', App.upc); // MWJ

                let case18DisplayBuf = [];
                // Call to reflect Blockchain State in App fields/page
                case18DisplayBuf = await App.reflectBlockchainInApp(App.upc);
                return case18DisplayBuf;
                break;
        }
    },

    plantItem: async function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        await App.readFormN(processId);

        await App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.plantItem(
                App.upc, 
                App.metamaskAccountID, 
                App.originFarmName, 
                App.originFarmInformation, 
                App.originFarmLatitude, 
                App.originFarmLongitude, 
                App.productNotes
                // {from: App.metamaskAccountID} // Invalid # of args to Solidity function
            );
        }).then(function(result) {
            $("#ftc-item").text(`plantItem, ${result}`);
            console.log(`plantItem:`);
            console.log(result);
            App.reflectBlockchainInApp(App.upc);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    growItem: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.growItem(App.upc, {from: App.metamaskAccountID} );
        }).then(function(result) {
            $("#ftc-item").text(`growItem, ${result}`);
            console.log(`growItem:`);
            console.log(result);
            App.reflectBlockchainInApp(App.upc);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    harvestItem: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.harvestItem(App.upc, {from: App.metamaskAccountID} );
        }).then(function(result) {
            $("#ftc-item").text(`harvestItem, ${result}`);
            console.log(`harvestItem:`);
            console.log(result);
            App.reflectBlockchainInApp(App.upc);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    collectItem: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        console.log(`App.processorID: ${App.processorID}`);
        console.log(`App.currItemOwnerID: ${App.currItemOwnerID}`);

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.collectItem(App.upc, App.processorID, {from: App.metamaskAccountID} );
        }).then(function(result) {
            $("#ftc-item").text(`collectItem, ${result}`);
            console.log(`collectItem:`);
            console.log(result);
            App.reflectBlockchainInApp(App.upc);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    processItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.processItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`processItem, ${result}`);
            console.log(`processItem:`);
            console.log(result);
            App.reflectBlockchainInApp(App.upc);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    packItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.packItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`packItem, ${result}`);
            console.log(`packItem:`);
            console.log(result);
            App.reflectBlockchainInApp(App.upc);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    sellItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            const productPrice = web3.toWei(1, "ether");
            console.log(`productPrice, ${productPrice}`);
            return instance.sellItem(App.upc, App.productPrice, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`sellItem, ${result}. productPrice, ${productPrice}`);
            console.log(`sellItem:`);
            console.log(result);
            App.reflectBlockchainInApp(App.upc);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    retailerOrder: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        // SET the values... 
        // NOTE: This is NOT a App.localItemState change
        // App.retailerOrdered = 1;

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.retailerOrder(App.upc, App.retailerID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`retailerOrder, ${result}`);
            console.log(`retailerOrder:`);
            console.log(result);
            App.reflectBlockchainInApp(App.upc);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    buyItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.toWei(1, "ether");
            return instance.buyItem(App.upc, App.distributorID, {from: App.metamaskAccountID, value: walletValue});
        }).then(function(result) {
            $("#ftc-item").text(`buyItem, ${result}`);
            console.log(`buyItem:`);
            console.log(result);
            App.reflectBlockchainInApp(App.upc);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    shipItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.shipItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`shipItem, ${result}`);
            console.log(`shipItem:`);
            console.log(result);
            App.reflectBlockchainInApp(App.upc);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    receiveItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.receiveItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`receiveItem, ${result}`);
            console.log(`receiveItem:`);
            console.log(result);
            App.reflectBlockchainInApp(App.upc);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    shelfStockItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.shelfStockItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`shelfStockItem, ${result}`);
            console.log(`shelfStockItem:`);
            console.log(result);
            App.reflectBlockchainInApp(App.upc);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    purchaseInstoreItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.purchaseInstoreItem(App.upc, App.consumerID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`purchaseInstoreItem, ${result}`);
            console.log('purchaseInstoreItem:');
            console.log(result);
            App.reflectBlockchainInApp(App.upc);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    purchaseOnlineItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.purchaseOnlineItem(App.upc, App.consumerID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`purchaseOnlineItem, ${result}`);
            console.log('purchaseOnlineItem:');
            console.log(result);
            App.reflectBlockchainInApp(App.upc);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    consumerReceivedItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.consumerReceivedItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`consumerReceivedItem, ${result}`);
            console.log('consumerReceivedItem:');
            console.log(result);
            App.reflectBlockchainInApp(App.upc);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    // fetchItemBufferOne: async function (_upc) {
    //     // event.preventDefault();
    //     // var processId = parseInt($(event.target).data('id'));
    //     App.upc = _upc;
    //     // let bufOne;

    //     await App.contracts.SupplyChain.deployed().then(async function(instance) {
    //       console.log(`In returned instance... about to fetch Buf1`);
    //       return instance.fetchItemBufferOne.call(App.upc);
    //     }).then(async function(result) {
    //         console.log('fetchItemBufferOne:');
    //         // bufOne = result;
    //         App.consoleLogFetch1Results(result);
    //         App.writeFetch1Fields(result); // Write WEB Page fields
    //         return await result;
    //     }).catch(function(err) {
    //         console.log(err.message);
    //     });
    // },

    // Above is a mix of promise and async functions... not a good practice
    // Below is a refactor of above to be able to return results correctly based
    // on: https://flaviocopes.com/how-to-return-result-asynchronous-function/
    /* 
    // Change FROM:
    const asynchronousFunction = () => {
        return fetch('./file.json').then(response => {
        return response
    })
}
    // Change TO:    
    const asynchronousFunction = async () => {
        const response = await fetch('./file.json')
        return response
        }    
    */

    // Refactored to use async/await and try/catch
    fetchItemBufferOne: async function (_upc) {
        App.upc = _upc;

        try {
            const instance = await App.contracts.SupplyChain.deployed()
            console.log(`In returned instance... about to fetch Buf1`);
            const result = await instance.fetchItemBufferOne.call(App.upc);
            console.log('fetchItemBufferOne:');
            App.consoleLogFetch1Results(result);
            // App.writeFetch1Fields(result); // Write WEB Page fields
            return result;
        }
        catch (err) {
            console.log(err.message);
        };
    },

    // Refactor for async/await construct to provide return value
    fetchItemBufferTwo: async function (_upc) {
        App.upc = _upc; // TBD

        try {
            const instance = await App.contracts.SupplyChain.deployed()
            console.log(`In returned instance... about to fetch Buf2`);
            const result = await instance.fetchItemBufferTwo.call(App.upc);
            console.log('fetchItemBufferTwo:');
            App.consoleLogFetch2Results(result);
            App.updateLocalItemState(result[5].c[0]); // Numeric state value from blockchain
            // App.writeFetch2Fields(result); // Write WEB Page fields
            return result;
        }
        catch (err) {
            console.log(err.message);
        };
    },

    // Refactor for async/await construct to provide return value
    fetchItemBufferThree: async function (_upc) {
        App.upc = _upc; // TBD

        try {
            const instance = await App.contracts.SupplyChain.deployed()
            console.log(`In returned instance... about to fetch Buf3`);
            const result = await instance.fetchItemBufferThree.call(App.upc);
            console.log('fetchItemBufferThree:');
            App.consoleLogFetch3Results(result);
            return result;
        }
        catch (err) {
            console.log(err.message);
        };
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
          console.log("Event var = log:");
          console.log(log);
            // $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
            $("#ftc-events").append('<li>UPC: ' + log.args.upc + ' - '+ log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        });
        
    }
};

$(function () {
    // $(window).load(function () {
    $(window).on('load', function () {
        App.init();
    });
});
