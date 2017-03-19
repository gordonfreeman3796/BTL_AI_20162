
function Validator()
{
	this.validateMove = function(prevCol,prevRow,clickedCol,clickedRow)
	{
		if(!this.detectCheck(prevCol,prevRow,clickedCol,clickedRow)) return INVALID_MOVE; 
		//first condition the move follow the rule
		var value = recorder.moveMap[prevCol][prevRow];
		if(Math.abs(value) == PAWN_VALUE)//pawn is a little bit different it move straight but attack diagonally
		{	//opponent
			if(prevCol == clickedCol)
			{
				if(value*playerSide < 0)
				{
					if(clickedRow == 7) return CAPTURE_MOVE;
					if(prevRow == 1 && clickedRow == prevRow + 2) return QUIET_MOVE;
					else
					{
						if(clickedRow == prevRow + 1 ) return QUIET_MOVE;
					}
				}
				else
				{
					if(clickedRow == 0) return CAPTURE_MOVE;
					if(prevRow == 6 && clickedRow == prevRow - 2) return QUIET_MOVE;
					else if(clickedRow == prevRow - 1) return QUIET_MOVE;
				}
			}
			else
			{
				if(value < 0)
				{
					if(recorder.blackAttackMap[clickedCol][clickedRow].indexOf(value) != -1) return QUIET_MOVE;
				}
				else
				{
					if(recorder.whiteAttackMap[clickedCol][clickedRow].indexOf(value) != -1) return QUIET_MOVE;
				}
			}
			//else if(clickedRow == prevRow - 1 && recorder.moveMap[clickedCol][clickedRow] == 0) return 0;
		}
		else if(Math.abs(value) == KING_VALUE)
		{
			//what about the computer side ?
			if(prevCol == 4)
			{
				if(clickedRow == prevRow - 2 || clickedRow == prevRow + 2)
				{
					if(this.validateCastling()) return CASTLING_MOVE;
					return INVALID_MOVE;
				}
			}
		}
		else
		{
			if(value < 0)
			{
				if(recorder.blackAttackMap[clickedCol][clickedRow].indexOf(value) != -1) return QUIET_MOVE;
			}
			else
			{
				if(recorder.whiteAttackMap[clickedCol][clickedRow].indexOf(value) != -1) return QUIET_MOVE;
			}
		}
		//second condition the move cannot make the king in danger
		//bishop rook queen
		return INVALID_MOVE;
	}
	//Lâm viết cái này nhé 
	this.detectCheck = function(prevCol,prevRow,clickedCol,clickedRow)
	{
		var pieceValue = recorder.moveMap[prevCol][prevRow];
		var moveMapCopy = recorder.moveMap;
		var kingPostion; 
		//create a temporary attackMap
		var tempAttackMap = [];
		for(var i = 0; i < 8; i++)
		{
			tempAttackMap[i] = new Array(8);
		}
		for(var i = 0; i < 8; i++)
		{
			for(var j = 0; j < 8; j++)
			{
				tempAttackMap[i][j] = [];
			}
		}
		//find the king position
		(pieceValue > 0)? kingPostion = recorder.findThePiece(KING_VALUE): kingPostion = recorder.findThePiece(KING_VALUE*BLACK_SIDE); 
		console.log(kingPostion);
		//delete the previous position
		moveMapCopy[prevCol][prevRow] = 0;
		//update the attack map
		for(var i = 0; i < 8; i++)
		{
			for(var j = 0;j < 8; j++)
			{
				if(moveMapCopy[i][j] == ROOK_VALUE)
					recorder.calculateAttackMapForRook(ROOK_VALUE,i,j,tempAttackMap,1);
				else if(moveMapCopy[i][j] == BISHOP_VALUE)
					recorder.calculateAttackMapForBishop(BISHOP_VALUE,i,j,tempAttackMap,1);
				else if(moveMapCopy[i][j] == QUEEN_VALUE)
					recorder.calculateAttackMapForRook(ROOK_VALUE,i,j,tempAttackMap,1);
			}
		}
		console.log(tempAttackMap[)
		return (tempAttackMap[kingPostion[0]][kingPostion[1]].length == 0);
		
		
		//rook queen bishop
		//check whether the king stayed on attacked grid or not 
		//concentrate on Bishop Rook Queen 
	}
	//Đức viết cái này nhé
	this.validateCastling = function(prevCol,prevRow,clickedCol,clickedRow)
	{
		//if king has moved ?
		//search in the moveRecord for the king's move history
		var value = recorder.moveMap[prevCol][prevRow];
		var attackMap;
		(value > 0) ? attackMap = recorder.blackAttackMap: attackMap = recorder.whiteAttackMap;
		for(var record in recorder.moveRecord)
		{
			if(record[0] == KING_VALUE || record[0] == ROOK_VALUE) return false;
		}
		//the squares between king and rook are attacked by any pieces ?
		if(clickedCol == prevCol - 2)
		{
			//queen-side castling
			for(var i = prevCol; i >= 0; i--)
			{
				if(attackMap[i][prevRow].length != 0) return false;
			}
		}
		else if(clickedCol == prevCol + 2)
		{
			//king-side castling
			for(var i = prevCol; i < 8 ; i++)
			{
				if(attackMap[i][prevRow].length != 0) return false;
			}
		}
		return true;
	}
	//Minh viết cái này nhé
	this.validateCheckmate = function()
	{
		
	}
	//predict the checking condition
}