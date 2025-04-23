module.exports = {
    routes: [      
      { // Path defined with a regular expression
        method: 'GET',
        path: '/mycontracts', // Only match when the URL parameter is composed of lowercase letters
        handler: 'contract.myFind',
      },
      { // Path defined with a regular expression
        method: 'GET',
        path: '/mycontracts/:id', // Only match when the URL parameter is composed of lowercase letters
        handler: 'contract.myFindOne',
      }
    ]
  }