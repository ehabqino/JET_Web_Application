
/*
 * Your dashboard ViewModel code goes here
 */
define(['accUtils',
        'knockout',
        'ojs/ojmodel',
        'ojs/ojcollectiondataprovider',
        'ojs/ojlabel',
        'ojs/ojchart',
        'ojs/ojlistview',
        'ojs/ojavatar'],
 function(accUtils,ko, Model, CollectionDataProvider) {
    function DashboardViewModel() {
     var self = this;
    /*  // chart type values array and ArrayDataProvider observable
     var types = [
       {value:'pie', label:'Pie'},
       {value:'bar', label:'Bar'}
     ];

     self.chartTypes = new ArrayDataProvider(types,{keyAttributes:'value'});

     //chart selection observable and default value
     self.val = ko.observable("pie")
 
      
     	  
  // chart data array and  ArrayDataProvider observable
  var chartData = [
    { "id": 0, "series": "Baseball", "group": "Group A", "value": 42 },
    { "id": 1, "series": "Baseball", "group": "Group B", "value": 34 },
    { "id": 2, "series": "Bicycling", "group": "Group A", "value": 55 },
    { "id": 3, "series": "Bicycling", "group": "Group B", "value": 30 },
    { "id": 4, "series": "Skiing", "group": "Group A", "value": 36 },
    { "id": 5, "series": "Skiing", "group": "Group B", "value": 50 },
    { "id": 6, "series": "Soccer", "group": "Group A", "value": 22 },
    { "id": 7, "series": "Soccer", "group": "Group B", "value": 46 }
  ];

  self.chartDataProvider = new ArrayDataProvider(chartData, { keyAttributes: 'id' });   */

  /** 
* Define the oj-module inline template for Activity Items list
*/
/*
var lg_xl_view = '<h1><oj-label for="itemsList">Activity Items</oj-label></h1>' +
'<oj-list-view style="font-size: 18px">' +
'<ul>' +
'<li>' +
'<div class="oj-flex-item">' +
'<p>SureCatch Baseball Glove</p>' +
'<p>Western R16 Helmet</p>' +
'<p>Western C1 Helmet</p>' +
'<p>Western Bat</p>' +
'</div>' +
'</li>' +
'<li>' +
'<div class="oj-flex-item">' +
'<p>Air-Lift Tire Pump</p>' +
'<p>Intact Bike Helmet</p>' +
'<p>Nimbus Bike Tire</p>' +
'<p>Refill Water Bottle</p>' +
'<p>Swift Boys 21 Speed</p>' +
'</div>' +
'</li>' +
'</ul>' +
'</oj-list-view>';

//Display this content for small and medium screen sizes
var sm_md_view = '<div id="sm_md" style="background-color:lightcyan; padding: 10px; font-size: 10px">' +
'<h1><oj-label for="itemsList">Activity Details</oj-label></h1>' +
  '<oj-list-view style="font-size: 18px">' +
  '<ul>' +
  '<li>' +
  '<div class="oj-flex-item">' +
  '<p>SureCatch Baseball Glove</p>' +
  '<p>Western R16 Helmet</p>' +
  '<p>Western C1 Helmet</p>' +
  '<p>Western Bat</p>' +
  '</div>' +  
  '</li>' +
  '</ul>' +
  '</oj-list-view>'
  '</div>';
  
  // Identify the screen size and display the content for that screen size
var lgQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP);

self.large = ResponsiveKnockoutUtils.createMediaQueryObservable(lgQuery);
self.moduleConfig = ko.pureComputed(function () {
  var viewNodes = HtmlUtils.stringToNodeArray(self.large() ? lg_xl_view : sm_md_view);
  return { view: viewNodes };
  });
  */
/** 
* End of oj-module code
By using the HTML utility function, you can get the framework media query string in the self.large variable. 
The HTML code in the lg_xl_view variable is loaded if the media query string value in the self.large() is equal to LG_UP, 
large or above.
 The HTML code in the sm_md_view variable is loaded if the media query string value in the self.large() is not equal to LG_UP.
*/

  // var url ="js/store_data.json"; //defines link to local data file
  self.activityDataProvider = ko.observable(); //gets data for Activities list
  self.itemsDataProvider = ko.observable();     //gets data for Items list
  self.itemData = ko.observable('');            //holds data for Item details

self.pieSeriesValue = ko.observableArray([]); //holds data for pie chart

// Activity selection observables
  self.activitySelected = ko.observable(false);
  self.selectedActivity = ko.observable();
  self.firstSelectedActivity = ko.observable();
        
// Item selection observables
  self.itemSelected = ko.observable(false);
  self.selectedItem = ko.observable();
  self.firstSelectedItem = ko.observable();


  // Get Activities objects from file using jQuery method and a method to return a Promise
  // $.getJSON(url).then(function(data){
  //   // Create variable for Activities list and populate using key attribute fetch
  //   var activitiesArray = data;
  //   self.activityDataProvider(new ArrayDataProvider(activitiesArray, { keyAttributes: 'id' }));
  //   //console.log(data)
     
    // Create variable for Items list and populate list using key attribute fetch
    /* var itemsArray = data[0].items;
    self.itemsDataProvider(new ArrayDataProvider(itemsArray, { keyAttributes: 'id' })); */
    //console.log(itemsArray);

     // Populate Items details using the first child item
     //self.itemData(data[0].items[0]);

      // Create variable for Pie Chart series and populate observable
    /* var pieSeries = [
      { name: "Quantity in Stock", items: [self.itemData().quantity_instock] },
      { name: "Quantity Shipped", items: [self.itemData().quantity_shipped] }
    ];
    self.pieSeriesValue(pieSeries); */

    
  // });

  //REST endpoint
  var RESTurl = "https://apex.oracle.com/pls/apex/oraclejet/lp/activities/";

  //Single Line of data
  var activityModel = Model.Model.extend({
    urlRoot : RESTurl,
    idAttribute : 'id'
  });

  // Multiple models i.e. multiple lines of data
  self.myActivity = new activityModel();
  var activityCollection = new Model.Collection.extend({
    url : RESTurl,
    model : self.myActivity,
    comparator : 'id'
  });

  self.myActivityCol = new activityCollection();
  self.activityDataProvider(new CollectionDataProvider(self.myActivityCol));

      /**
 * Handle selection from Activities list
 */
self.selectedActivityChanged = function (event) {
  // Check whether click is an Activity selection or a deselection
  if (event.detail.value.length != 0) {
      // If selection, populate and display list
      // Create variable for items list using firstSelectedXxx API from List View
     // var itemsArray = self.firstSelectedActivity().data.items;
      // Populate items list using DataProvider fetch on key attribute
     // self.itemsDataProvider(new ArrayDataProvider(itemsArray, { keyAttributes: "id" }))
     
     var activityKey = self.firstSelectedActivity().data.id;
     //REST endpoint for the items list
     var url = "https://apex.oracle.com/pls/apex/oraclejet/lp/activities/" + activityKey + '/items/';
     
     function parseItem(response) {
      var img = 'css/images/product_images/jet_logo_256.png'
      if (response) {
        //if the response contains items, pick the first one
        if (response.items && response.items.length !== 0){response = response.items[0];}
        //if the response contains an image, retain it
        if (response.image !== null){img = response['image']; }
        return {
          id: response['id'],
          name: response['name'],
          price: response['price'],
          short_desc: response['short_desc'],
          quantity: response['quantity'],
          quantity_instock: response['quantity_instock'],
          quantity_shipped: response['quantity_shipped'],
          activity_id: response['activity_id'],
          image: img
        };
      }
    }
    var itemModel = Model.Model.extend({
      urlRoot: url,
      parse: parseItem,
      idAttribute: 'id'
    });

  self.myItem = new itemModel();
  self.itemCollection = new Model.Collection.extend({
  url: url,
  model: self.myItem,
  comparator: 'id'
});

/*
 *An observable called itemsDataProvider is already bound in the View file
 *from the JSON example, so you don't need to update dashboard.html
 */
 self.myItemCol = new self.itemCollection();
 self.itemsDataProvider(new CollectionDataProvider(self.myItemCol));
     
     // Set List View properties
      self.activitySelected(true);
      self.itemSelected(false);
      // Clear item selection
      self.selectedItem([]);
      self.itemData();
  } else {
    // If deselection, hide list
      self.activitySelected(false);
      self.itemSelected(false);
  }
};

/**
  * Handle selection from Activity Items list
  */
 self.selectedItemChanged = function (event) {
  // Check whether click is an Activity Item selection or deselection
  if (event.detail.value.length != 0) {
    // If selection, populate and display list
      // Populate items list observable using firstSelectedXxx API
      self.itemData(self.firstSelectedItem().data);
      // Create variable and get attributes of the items list to set pie chart values
      var pieSeries = [
        { name: "Quantity in Stock", items: [self.itemData().quantity_instock] },
        { name: "Quantity Shipped", items: [self.itemData().quantity_shipped] }
      ];
      // Update the pie chart with the data
      self.pieSeriesValue(pieSeries);
      self.itemSelected(true);
  } else {
     // If deselection, hide list
     self.itemSelected(false);
  }
};
  
    

      this.connected = () => {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "Dashboard";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return DashboardViewModel;
  }
);
