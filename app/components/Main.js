// Include React
var React = require("react");

// Here we include all of the sub-components
var Saved = require("./children/Saved");
var Query = require("./children/Search/Query");
var Results = require("./children/Search/Results")


// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { searchTerm: "", results: [],
    title: "",
    begDate: "",
    endDate: "" };
  },

 componentDidUpdate: function(prevProps, prevState) {
    // If we have a new search term, run a new search
    if (prevState.searchTerm !== this.state.searchTerm) {
      console.log("UPDATED");

      helpers.runQuery(this.state.title, this.state.begDate, this.state.endDate).then(function(data) {
        if (data !== this.state.results) {
          console.log(data);
          this.setState({ results: data });
        }
        // This code is necessary to bind the keyword "this" when we say this.setState
        // to actually mean the component itself and not the runQuery function.
      }.bind(this));
    }
  },

   getArticle: function () {
    axios.get('/api/saved')
      .then(function (response) {
        this.setState({
          savedArticles: response.data
        });
      }.bind(this));
  },
  
  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },

render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">New York Times Search</h2>
            <p className="text-center">
              <em>Enter the fields below to find out some NYT articles over here</em>
            </p>
          </div>

          <div className="col-md-12">

            <Query setTerm={this.setTerm} />

          </div>

          <div className="col-md-12">

            <Results articles={this.state.results} />

          </div>
        </div>
      </div>
    );
  }
});
  

// Export the component back for use in other files
module.exports = Main;
