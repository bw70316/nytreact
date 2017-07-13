// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var nytAPI = "e2479dc46dfe4d20bf603d766fb75430";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to find the NYT article
  runQuery: function(NytTitle) {

    console.log(term);

    
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json=" + term + "&pretty=1&key=" + nytAPI;
    return axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted article property
      if (response.data.results[0]) {
        return response.data.results[0].formatted;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getArticles: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postArticles: function(NytTitle) {
    return axios.post("/api", { term: term});
  }
};

// We export the API helper
module.exports = helper;

