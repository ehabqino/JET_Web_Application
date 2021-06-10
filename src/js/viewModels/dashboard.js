
/*
 * Your dashboard ViewModel code goes here
 */
define(['accUtils','knockout','jquery','ojs/ojarraydataprovider',
        'ojs/ojhtmlutils','ojs/ojresponsiveutils','ojs/ojresponsiveknockoututils',
        'ojs/ojlabel','ojs/ojselectsingle','ojs/ojchart','ojs/ojlistview','ojs/ojmodule-element'],
 function(accUtils,ko,$,ArrayDataProvider, HtmlUtils, ResponsiveUtils, ResponsiveKnockoutUtils) {
    function DashboardViewModel() {
     var self = this;
     // chart type values array and ArrayDataProvider observable
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

  self.chartDataProvider = new ArrayDataProvider(chartData, { keyAttributes: 'id' });  

  /** 
* Define the oj-module inline template for Activity Items list
*/
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
/** 
* End of oj-module code
By using the HTML utility function, you can get the framework media query string in the self.large variable. 
The HTML code in the lg_xl_view variable is loaded if the media query string value in the self.large() is equal to LG_UP, 
large or above.
 The HTML code in the sm_md_view variable is loaded if the media query string value in the self.large() is not equal to LG_UP.
*/

  var url ="js/store_data.json"; //defines link to local data file
  self.activityDataProvider = ko.observable(); //gets data for Activities list

  // Get Activities objects from file using jQuery method and a method to return a Promise
  $.getJSON(url).then(function(data){
    // Create variable for Activities list and populate using key attribute fetch
    var activitiesArray = data;
    self.activityDataProvider(new ArrayDataProvider(activitiesArray, { keyAttributes: 'id' }));
    //console.log(data)
  });
  
    

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
