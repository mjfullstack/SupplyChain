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
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    init: async function () {
        App.readFormN(1);
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();

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
            App.consumerID
        );
    },

    readFormN: function (_procId) {
        let _n;
        switch(_procId) {
            case 11, 12, 1: // grower
                _n = 1;
                break;
            case 13, 2, 3, 4, 6: // processor
                _n = 2;
                break;
            case 5: // distributor
                _n = 3;
                break;
            case 14, 7, 15: // retailer
                _n = 4;
                break;
            case 8, 16, 17: // consumer
                _n = 5;
                break;
            case 9: // fetch 1
                _n = 6;
                break;
            case 10: // fetch 2
                _n = 7;
                break;
        }

        App.sku = $("#sku"+_n).val();
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
        App.distributorID = $("#distributorID"+_n).val();
        App.retailerID = $("#retailerID"+_n).val();
        App.consumerID = $("#consumerID"+_n).val();

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
            App.consumerID
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
        App.distributorID+ 
        App.retailerID+ 
        App.consumerID;

        console.log(`testStringDOM = ${testStringDOM}`)
        $("#ftc-item2p2").text(`readFormN ftc-item2p2 TEXT are here! ${testStringDOM}`); // MWJ
        $("#ftc-item2").val(`readFormN ftc-item2 VAL are here! ${testStringDOM}`); // MWJ - Should work
        $("#ftc-item2p").html(`<h5>readFormN ftc-item2p HTML are here! ${testStringDOM}</h5>`); // MWJ
        /************** SAVE FOR TESTING *****************/

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
                return await App.harvestItem(event);
                break;
            case 2:
                return await App.processItem(event);
                break;
            case 3:
                return await App.packItem(event);
                break;
            case 4:
                return await App.sellItem(event);
                break;
            case 5:
                return await App.buyItem(event);
                break;
            case 6:
                return await App.shipItem(event);
                break;
            case 7:
                return await App.receiveItem(event);
                break;
            case 8: // purchaseInstoreItem() INSTORE
                return await App.purchaseInstoreItem(event);
                break;
            case 9: // fetch 1
                return await App.fetchItemBufferOne(event);
                break;
            case 10: // fetch 2
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
            case 18:
                console.log(`UNUSED: processId = ${processId}`);
                break;
            }
    },

    plantItem: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readFormN(processId);
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.plantItem(
                App.upc, 
                App.metamaskAccountID, 
                App.originFarmName, 
                App.originFarmInformation, 
                App.originFarmLatitude, 
                App.originFarmLongitude, 
                App.productNotes
                // {from: App.metamaskAccountID}
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
          $("#ftc-item1p1").text(`Results ftc-item1 TEXT are here! ", ${result}`); // MWJ
          $("#ftc-item1").val(`Results ftc-item1 VAL are here! ", ${result}`); // MWJ - Should work
          $("#ftc-item1p").html(`Results ftc-item1p TEXT are here! ", ${result}`); // MWJ
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
          $("#ftc-item2p2").text("Results ftc-item2 TEXT are here! ", result); // MWJ
          $("#ftc-item2").val("Results ftc-item2 VAL are here! ", result); // MWJ - Should work
          $("#ftc-item2p").html("Results ftc-item2p TEXT are here! ", result); // MWJ
          console.log('fetchItemBufferTwo', result);
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
