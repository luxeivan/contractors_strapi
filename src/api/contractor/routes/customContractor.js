module.exports = {
    routes: [      
      { // Path defined with a regular expression
        method: 'GET',
        path: '/mycontractors', // Only match when the URL parameter is composed of lowercase letters
        handler: 'contractor.myFind',
      },
      { // Path defined with a regular expression
        method: 'GET',
        path: '/mycontractors/:id', // Only match when the URL parameter is composed of lowercase letters
        handler: 'contractor.myFindOne',
      }
    ]
  }