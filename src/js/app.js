App = {
    // web3Provider: null,
    // web3Provider: `https://rinkeby.infura.io/v3/433751ea363f4bc0b73d7e32b7a805e6`,
    // web3Provider: `https://rinkeby.infura.io/433751ea363f4bc0b73d7e32b7a805e6`,
    web3Provider: "https://rinkeby.infura.io/v3/5ea59fd3309b4d61b4ac56d6da00838a",
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
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
    localRetailerOrdered: 0,

    init: async function () {
        App.readFormN(11);
        App.updateActiveButton("Unplanted");
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val(); // This gets assigned in SupplyChain.sol
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.processorID = $("#processorID").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();
        App.productID = $("#productID").val(); // This gets assigned in SupplyChain.sol

        console.log(
            App.sku,
            App.upc,
            App.ownerID, 
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
            App.productID
        );
    },

    readFormN: function (_procId) {
        let _n;
        switch(_procId) {
            case 11: // grower
            case 12: // grower
            case 1: // grower
                _n = 1;
                console.log(`readFormN _procId = ${_procId}, _n = ${_n}`)
                break;
            case 13: // processor
            case 2: // processor
            case 3: // processor
            case 4: // processor
            case 6: // processor
                _n = 2;
                console.log(`readFormN _procId = ${_procId}, _n = ${_n}`)
                break;
            case 5: // distributor
                _n = 3;
                console.log(`readFormN _procId = ${_procId}, _n = ${_n}`)
                break;
            case 14: // retailer
            case 7: // retailer
            case 15: // retailer
                _n = 4;
                console.log(`readFormN _procId = ${_procId}, _n = ${_n}`)
                break;
            case 8: // consumer
            case 16: // consumer
            case 17: // consumer
                _n = 5;
                console.log(`readFormN _procId = ${_procId}, _n = ${_n}`)
                break;
            case 9: // fetch 1
                _n = 6;
                console.log(`readFormN _procId = ${_procId}, _n = ${_n}`)
                break;
            case 10: // fetch 2
                _n = 7;
                console.log(`readFormN _procId = ${_procId}, _n = ${_n}`)
                break;
        }

        App.sku = $("#sku"+_n).val(); // This gets assigned in SupplyChain.sol
        App.upc = $("#upc"+_n).val();
        // App.ownerID = $("#ownerID"+_n).val();
        App.ownerID = $("#originFarmerID"+_n).val();
        App.originFarmerID = $("#originFarmerID"+_n).val();
        App.originFarmName = $("#originFarmName"+_n).val();
        App.originFarmInformation = $("#originFarmInformation"+_n).val();
        App.originFarmLatitude = $("#originFarmLatitude"+_n).val();
        App.originFarmLongitude = $("#originFarmLongitude"+_n).val();
        App.productNotes = $("#productNotes"+_n).val();
        App.productPrice = $("#productPrice"+_n).val();
        App.processorID = $("#processorID"+_n).val();
        App.distributorID = $("#distributorID"+_n).val();
        App.retailerID = $("#retailerID"+_n).val();
        App.consumerID = $("#consumerID"+_n).val();
        App.productID = $("#productID").val(); // This gets assigned in SupplyChain.sol

        console.log(
            App.sku,
            App.upc,
            App.ownerID, 
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
            App.localRetailerOrdered,
            App.productID,
        );

        /************** SAVE FOR TESTING *****************/
        // Testing DOM Manipulation
        const testStringDOM = 
        App.sku+
        App.upc+
        App.ownerID+ 
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

    updateActiveButton: function (_currState) {
        App.disableAllButtons();
        // Possible States:
        // Unplanted, Planted, Grown, Harvested, Collected, Processed
        // Packed, ForSale, Sold, Shipped, Received, ShelvesStocked,
        // PurchaseInstore, PurchaseOnline, ConsumerReceived
        // localRetailerOrdered: 0, // SEPARATE ELEMENT, See ProductID mod(2) = ordered
       
        switch(_currState) {
            case "Unplanted": // grower
                $('#button-plant').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
                $('#button-plant').prop('disabled', false); // enables
                $('#button-order').prop('disabled', true); // enables
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
                if (App.localRetailerOrdered) {
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

    disableAllButtons: function() {
        $('#button-plant').prop('disabled', true);
        $('#button-grow').prop('disabled', true);
        $('#button-harvest').prop('disabled', true);
        $('#button-collect').prop('disabled', true);
        $('#button-process').prop('disabled', true);
        $('#button-pack').prop('disabled', true);
        $('#button-forsale').prop('disabled', true);
        $('#button-ship').prop('disabled', true);
        $('#button-buy-wholesale').prop('disabled', true);
        // $('#button-retailer-ordered-display').prop('disabled', true);
        // $('#button-order').prop('disabled', true);
        $('#button-receive-wholesale').prop('disabled', true);
        $('#button-stock-shelf').prop('disabled', true);
        $('#button-buy-instore').prop('disabled', true);
        $('#button-buy-online').prop('disabled', true);
        $('#button-receive-retail').prop('disabled', true);
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
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            
            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
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
        console.log('processId',processId);

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
                return await App.sellItem(event);
                break;
            case 5:
                console.log(`processId = ${processId}`);
                return await App.buyItem(event);
                break;
            case 6:
                console.log(`processId = ${processId}`);
                return await App.shipItem(event);
                break;
            case 7:
                console.log(`processId = ${processId}`);
                return await App.receiveItem(event);
                break;
            case 8: // purchaseInstoreItem() INSTORE
            console.log(`processId = ${processId}`);
            return await App.purchaseInstoreItem(event);
                break;
            case 9: // fetch 1
            console.log(`processId = ${processId}`);
            return await App.fetchItemBufferOne(event);
                break;
            case 10: // fetch 2
            console.log(`processId = ${processId}`);
            return await App.fetchItemBufferTwo(event);
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
                break;
            }
    },

    plantItem: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        /************** SAVE FOR TESTING *****************/
        // TEMP: Set values that will eventually be returned in 'result'
        // When they are, we'll place the values received into the form on the page.
        // SET the values temporarily...
        App.localItemState = "Planted";
        // App.processorID = "Smiley Face";
        // PLACE the values on the page...
        $("#productState1").val(`${App.localItemState}`); // MWJ
        // $("#processorID1").val(`${App.processorID}`); // MWJ
        // Update Active Buttons per State
        App.updateActiveButton(App.localItemState);
        // $('#button-plant').prop('disabled', true);
        // $('#button-grow').addClass('btn-success'); // .removeClass('btn-success');

        console.log(`App.upc: ${App.upc}`); 
        console.log(`App.ownerID: ${App.ownerID}`);
        console.log(`App.originFarmName: ${App.originFarmName}`);
        console.log(`App.originFarmInformation: ${App.originFarmInformation}`);
        console.log(`App.originFarmLatitude: ${App.originFarmLatitude}`);
        console.log(`App.originFarmLongitude: ${App.originFarmLongitude}`);
        console.log(`App.productNotes: ${App.productNotes}`);
        console.log(`App.processorID: ${App.processorID}`);
        console.log(`App.localItemState: ${App.localItemState}`);

/************** SAVE FOR TESTING *****************/
        App.contracts.SupplyChain.deployed().then(function(instance) {
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
            console.log(`plantItem, ${result}`);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    growItem: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);

        // SET the values...
        App.localItemState = "Grown";
        // PLACE the values on the page...
        $("#productState1").val(`${App.localItemState}`); // MWJ
        // Update Active Buttons per State
        App.updateActiveButton(App.localItemState);

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.growItem(App.upc, {from: App.metamaskAccountID} );
        }).then(function(result) {
            $("#ftc-item").text(`growItem, ${result}`);
            console.log(`growItem, ${result}`);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    harvestItem: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        // SET the values...
        App.localItemState = "Harvested";
        // PLACE the values on the page...
        $("#productState1").val(`${App.localItemState}`); // MWJ
        // Update Active Buttons per State
        App.updateActiveButton(App.localItemState);

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.harvestItem(App.upc, {from: App.metamaskAccountID} );
        }).then(function(result) {
            $("#ftc-item").text(`harvestItem, ${result}`);
            console.log(`harvestItem, ${result}`);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    collectItem: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        
        // SET the values...
        App.localItemState = "Collected";
        // PLACE the values on the page...
        $("#productState1").val(`${App.localItemState}`); // MWJ
        // Update Active Buttons per State
        App.updateActiveButton(App.localItemState);

        App.readFormN(processId);
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.collectItem(App.upc, {from: App.metamaskAccountID} );
        }).then(function(result) {
            $("#ftc-item").text(`collectItem, ${result}`);
            console.log(`collectItem, ${result}`);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    processItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        // SET the values...
        App.localItemState = "Processed";
        // PLACE the values on the page...
        $("#productState1").val(`${App.localItemState}`); // MWJ
        // Update Active Buttons per State
        App.updateActiveButton(App.localItemState);

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.processItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`processItem, ${result}`);
            console.log(`processItem, ${result}`);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    packItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        // SET the values...
        App.localItemState = "Packed";
        // PLACE the values on the page...
        $("#productState1").val(`${App.localItemState}`); // MWJ
        // Update Active Buttons per State
        App.updateActiveButton(App.localItemState);

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.packItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`packItem, ${result}`);
            console.log(`packItem, ${result}`);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    sellItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        // SET the values...
        App.localItemState = "ForSale";
        // PLACE the values on the page...
        $("#productState1").val(`${App.localItemState}`); // MWJ
        // Update Active Buttons per State
        App.updateActiveButton(App.localItemState);

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const productPrice = web3.toWei(1, "ether");
            console.log(`productPrice, ${productPrice}`);
            return instance.sellItem(App.upc, App.productPrice, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`sellItem, ${result}. productPrice, ${productPrice}`);
            console.log(`sellItem, ${result}`);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    retailerOrder: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        // SET the values... 
        // NOTE: This is NOT a App.localItemState change so handle locally
        App.localRetailerOrdered = 1;
        // PLACE the values and adjust buttons accordingly...
        $('#button-retailer-ordered-display').prop('disabled', false); // enabled
        $('#button-retailer-ordered-display').addClass('btn-success').removeClass('btn-warning');
        $('#button-retailer-ordered-display').text('ORDERED')
        $('#button-order').removeClass('btn-success').addClass('btn-default'); // PREVIOUS Button
        $('#button-order').prop('disabled', true);
        // DON'T call updateActiveButton since not a App.localItemState change
        if (App.localItemState == "ForSale") {
            $('#button-buy-wholesale').removeClass('btn-default').addClass('btn-success'); // Makes it GREEN!
            $('#button-buy-wholesale').prop('disabled', false); // enables
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.retailerOrder(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`retailerOrder, ${result}`);
            console.log(`retailerOrder, ${result}`);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    buyItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        // SET the values...
        App.localItemState = "Sold";
        // PLACE the values on the page...
        $("#productState1").val(`${App.localItemState}`); // MWJ
        // Update Active Buttons per State
        App.updateActiveButton(App.localItemState);

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.toWei(3, "ether");
            return instance.buyItem(App.upc, {from: App.metamaskAccountID, value: walletValue});
        }).then(function(result) {
            $("#ftc-item").text(`buyItem, ${result}`);
            console.log(`buyItem, ${result}`);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    shipItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        // SET the values...
        App.localItemState = "Shipped";
        // PLACE the values on the page...
        $("#productState1").val(`${App.localItemState}`); // MWJ
        // Update Active Buttons per State
        App.updateActiveButton(App.localItemState);

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.shipItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`shipItem, ${result}`);
            console.log(`shipItem, ${result}`);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    receiveItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        // SET the values...
        App.localItemState = "Received";
        // PLACE the values on the page...
        $("#productState1").val(`${App.localItemState}`); // MWJ
        // Update Active Buttons per State
        App.updateActiveButton(App.localItemState);

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.receiveItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`receiveItem, ${result}`);
            console.log(`receiveItem, ${result}`);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    shelfStockItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        // SET the values...
        App.localItemState = "ShelvesStocked";
        // PLACE the values on the page...
        $("#productState1").val(`${App.localItemState}`); // MWJ
        // Update Active Buttons per State
        App.updateActiveButton(App.localItemState);

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.shelfStockItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`shelfStockItem, ${result}`);
            console.log(`shelfStockItem, ${result}`);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    purchaseInstoreItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        // SET the values...
        App.localItemState = "PurchaseInstore";
        // PLACE the values on the page...
        $("#productState1").val(`${App.localItemState}`); // MWJ
        // Update Active Buttons per State
        App.updateActiveButton(App.localItemState);

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.purchaseInstoreItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`purchaseInstoreItem, ${result}`);
            console.log('purchaseInstoreItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    purchaseOnlineItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        // SET the values...
        App.localItemState = "PurchaseOnline";
        // PLACE the values on the page...
        $("#productState1").val(`${App.localItemState}`); // MWJ
        // Update Active Buttons per State
        App.updateActiveButton(App.localItemState);

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.purchaseOnlineItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`purchaseOnlineItem, ${result}`);
            console.log('purchaseOnlineItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    consumerReceivedItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        
        // SET the values...
        App.localItemState = "ConsumerReceived";
        // PLACE the values on the page...
        $("#productState1").val(`${App.localItemState}`); // MWJ
        // Update Active Buttons per State
        App.updateActiveButton(App.localItemState);

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.consumerReceivedItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(`consumerReceivedItem, ${result}`);
            console.log('consumerReceivedItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchItemBufferOne: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        // App.upc = $('#upc').val();
        App.upc = $('#upc6').val(); // MWJ
        console.log('upc6',App.upc); // MWJ

        App.contracts.SupplyChain.deployed().then(function(instance) {
          console.log(`In returned instance... about to fetch Buf1`);
          return instance.fetchItemBufferOne(App.upc);
        }).then(function(result) {
            console.log(`fetchItemBufferOne, ${result}`);
        //   $("#ftc-item1p1").text(`Results ftc-item1 TEXT are here! ", ${result}`); // MWJ
        //   $("#ftc-item1").val(`Results ftc-item1 VAL are here! ", ${result}`); // MWJ - Should work
        //   $("#ftc-item1p").html(`Results ftc-item1p TEXT are here! ", ${result}`); // MWJ
        }).catch(function(err) {
            console.log(`fetchItemBufferOne in err.message, ${result}`);
            console.log(err.message);
        });
    },

    fetchItemBufferTwo: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
                        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            console.log(`In returned instance... about to fetch Buf2`);
            return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function(result) {
            console.log('fetchItemBufferTwo', result);
        //   $("#ftc-item2p2").text("Results ftc-item2 TEXT are here! ", result); // MWJ
        //   $("#ftc-item2").val("Results ftc-item2 VAL are here! ", result); // MWJ - Should work
        //   $("#ftc-item2p").html("Results ftc-item2p TEXT are here! ", result); // MWJ
        }).catch(function(err) {
          console.log(err.message);
        });
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
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
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
