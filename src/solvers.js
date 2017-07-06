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
  var solutionCount, newBoard, rowIndex; 
  solutionCount = 0;
  newBoard = new Board({'n': n});  

  var checkSol = function (board, rowIndex, disallowed, solutionCount) {
    //check to see if rowIndex + 1 >= n (is this the last row?)
    if ( rowIndex + 1 === n ) {
    //if yes... 
      //go across the last row if we haven't already
      for (var colIndex = 0; colIndex < n; colIndex++) {
        //check for failures/successes
        board.togglePiece(rowIndex, colIndex);
        if (board.hasColConflictAt(colIndex)) {
          board.togglePiece(rowIndex, colIndex);
        } else {
          board.togglePiece(rowIndex, colIndex);
          solutionCount++;
        }
      }
    } else { 
      //if no...
      //iterate across current Row (colIndex)
      for (var colIndex = 0; colIndex < n; colIndex++) {
        //if we are allowed to use this column...
        if (!disallowed.includes(colIndex)) {
          //toggle piece at current rowIndex/colIndex
          board.togglePiece(rowIndex, colIndex);
          //recurse this function to check next row's spots
          var disallowedCopy = disallowed.slice();
          disallowedCopy.push(colIndex);
          solutionCount = checkSol( board, rowIndex + 1, disallowedCopy, solutionCount );
          //toggle piece off
          board.togglePiece(rowIndex, colIndex);
        } 
      }
    }

    return solutionCount;
  };

  if (n === 1) {
    solutionCount = 1;
  } else {
    for (var colIndex = 0; colIndex < n; colIndex++) {
      rowIndex = 0;
      newBoard.togglePiece(0, colIndex);
      solutionCount = checkSol(newBoard, rowIndex + 1, [colIndex], solutionCount);
      newBoard.togglePiece(0, colIndex);
    }
  }
  // create  a new recursive function
  //its inputs will be the board, rowIndex, && array of illegal columns, solution count
  //with all of these inputs we will know what row to start on and what indices not to use
  //will return solution count
  
  //base cases  (i + 1 === n) && there are no conflicts || there is a conflict
  //recursive cases i < n

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution, newBoard, foundSolution;
  solution = [];
  newBoard = new Board({'n': n});
  foundSolution = false;

  var checkSol = function (board, rowIndex, disallowed) {
    //check to see if rowIndex + 1 >= n (is this the last row?)
    if ( rowIndex + 1 === n ) {
    //if yes... 
      //go across the last row if we haven't already
      for (var colIndex = 0; colIndex < n; colIndex++) {
        //check for failures/successes
        board.togglePiece(rowIndex, colIndex);
        if ( board.hasColConflictAt(colIndex) || board.hasMajorDiagonalConflictAt(board._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) || board.hasMinorDiagonalConflictAt(board._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex)) ) {
          board.togglePiece(rowIndex, colIndex);
        } else {
          //stop, we have a valid solution
          return true;
        }
      }
      return false;
    } else { 
      //if no...
      //iterate across current Row (colIndex)
      for (var colIndex = 0; colIndex < n; colIndex++) {
        //if we are allowed to use this column...
        if (!disallowed.includes(colIndex)) {
          board.togglePiece(rowIndex, colIndex);
  
          if (!board.hasMajorDiagonalConflictAt(board._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) && !board.hasMinorDiagonalConflictAt(board._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex)) ) {
            //toggle piece at current rowIndex/colIndex
            //recurse this function to check next row's spots
            var disallowedCopy = disallowed.slice();
            disallowedCopy.push(colIndex);
            foundSolution = checkSol( board, rowIndex + 1, disallowedCopy);
            if (foundSolution) { break; }
            //toggle piece off
            board.togglePiece(rowIndex, colIndex);
          } else {
            board.togglePiece(rowIndex, colIndex);
          }

        } 
      }
    }

    return foundSolution;
  };

  if (n === 0) {
    //do nothing
  } else if (n === 1) {
    newBoard.togglePiece(0, 0); //this is an edge case
    foundSolution = true;
  } else {
    for (var colIndex = 0; colIndex < n; colIndex++) {
      rowIndex = 0;
      newBoard.togglePiece(0, colIndex);
      foundSolution = checkSol(newBoard, rowIndex + 1, [colIndex]);
      if (foundSolution) { break; }
      newBoard.togglePiece(0, colIndex);
    }
  }
  
  for ( var i = 0; i < n; i++ ) {
    solution.push(newBoard.get(i));
  }

  if (foundSolution) {
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  }
  return solution;

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount, newBoard, rowIndex; 
  solutionCount = 0;
  newBoard = new Board({'n': n});  

  var checkSol = function (board, rowIndex, disallowed, solutionCount) {
    //check to see if rowIndex + 1 >= n (is this the last row?)
    if ( rowIndex + 1 === n ) {
    //if yes... 
      //go across the last row if we haven't already
      for (var colIndex = 0; colIndex < n; colIndex++) {
        //check for failures/successes
        board.togglePiece(rowIndex, colIndex);
        if ( board.hasColConflictAt(colIndex) || board.hasMajorDiagonalConflictAt(board._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) || board.hasMinorDiagonalConflictAt(board._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex)) ) {
          board.togglePiece(rowIndex, colIndex);
        } else {
          board.togglePiece(rowIndex, colIndex);
          solutionCount++;
        }
      }
    } else { 
      //if no...
      //iterate across current Row (colIndex)
      for (var colIndex = 0; colIndex < n; colIndex++) {
        //if we are allowed to use this column...
        if (!disallowed.includes(colIndex)) {
          board.togglePiece(rowIndex, colIndex);
  
          if (!board.hasMajorDiagonalConflictAt(board._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) && !board.hasMinorDiagonalConflictAt(board._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex)) ) {
            //toggle piece at current rowIndex/colIndex
            //recurse this function to check next row's spots
            var disallowedCopy = disallowed.slice();
            disallowedCopy.push(colIndex);
            solutionCount = checkSol( board, rowIndex + 1, disallowedCopy, solutionCount );
            //toggle piece off
            board.togglePiece(rowIndex, colIndex);
          } else {
            board.togglePiece(rowIndex, colIndex);
          }

        } 
      }
    }

    return solutionCount;
  };

  if (n === 0 || n === 1) {
    solutionCount = 1;
  } else {
    for (var colIndex = 0; colIndex < n; colIndex++) {
      rowIndex = 0;
      newBoard.togglePiece(0, colIndex);
      solutionCount = checkSol(newBoard, rowIndex + 1, [colIndex], solutionCount);
      newBoard.togglePiece(0, colIndex);
    }
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
