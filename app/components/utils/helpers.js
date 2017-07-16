// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var nytAPI = "e2479dc46dfe4d20bf603d766fb75430";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to find the NYT article
  runQuery: function(nytSearch) {
var date = "0101";
    parseInt(date);
    begDate = date + begDate;
    endDate = date + endDate;

    console.log(term);

    
    var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=9189e6ca2509411491bbcfd0a29c3ee9&q=" + title + "&begin_date=" + begDate + "&end_date=" + endDate;
    return axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted article property
      var newResults = [];
      var fullResults = response.data.response.docs;
      // If we don't get any results, return an empty string
       for (var i = 0; i < fullResults.length; i++) {
        newResults.push(fullResults[i])
      }
      return newResults
    })
  },

  // This function hits our own server to retrieve the record of query results
  getArticles: function() {
    return axios.get("/api/saved");
  },

  // This function posts new searches to our database.
    postArticle: function (nytSearch) {
    
    return axios.post('/api/saved',
      {
        title: title,
        date: pub_date,
        url: url
      })
  }
}

// We export the API helper
module.exports = helper;

