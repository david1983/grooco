app.filter('removeUnderscore', function() {
  return function(input) {
    input = input || '';
    return input.replace(/_/g, ' ')
  };
})