/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  //soultion is going to be an array of arrays 
  //Input is always the board size
  var solution, newBoard;
  solution = [];
  newBoard = new Board({'n': n});
  // i = 0;
  
  // while (i < n) {
  //   var newRow = new Array(n).fill(0);
  //   newRow[i] = 1;
  //   solution.push(newRow);
  //   i++;
  
  //will implement row by row
  //iterate through n rows
    //check for column conflicts
    //if no conflict, toggle rook and move to next row
  for (var i = 0; i < n; i++) {
    for ( var j = 0; j < n; j++) {
      newBoard.togglePiece(i, j); 
      if ( newBoard.hasColConflictAt(j) ) { 
        newBoard.togglePiece(i, j); 
      } else {
        break;
      }
    }
  }
  
  // }
  //The solution will be a visual representation of the board that finds a valid solution that represent 8 x 8
  
  for ( var i = 0; i < n; i++ ) {
    solution.push(newBoard.get(i));
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution, newBoard;
  solution = [];
  newBoard = new Board({'n': n});
  // i = 0;
  
  // while (i < n) {
  //   var newRow = new Array(n).fill(0);
  //   newRow[i] = 1;
  //   solution.push(newRow);
  //   i++;
  
  //will implement row by row
  //iterate through n rows
    //check for column conflicts
    //if no conflict, toggle rook and move to next row
  for (var i = 0; i < n; i++) {
    for ( var j = 0; j < n; j++) {
      newBoard.togglePiece(i, j); 
      if ( newBoard.hasColConflictAt(j) || newBoard.hasAnyMajorDiagonalConflicts() || newBoard.hasAnyMinorDiagonalConflicts() ) { 
        newBoard.togglePiece(i, j); 
      } else {
        break;
      }
    }
  }
  
  // }
  //The solution will be a visual representation of the board that finds a valid solution that represent 8 x 8
  
  for ( var i = 0; i < n; i++ ) {
    solution.push(newBoard.get(i));
  }


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
