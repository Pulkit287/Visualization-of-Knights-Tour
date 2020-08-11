var cx = [1,1,2,2,-1,-1,-2,-2]; 
var cy = [2,-2,1,-1,2,-2,1,-1];
var N=8; 
var tx;  var ty;
var arr = [];
var btn = document.querySelector("#btn");

function limits(x, y) 
{ 
	return ((x >= 0 && y >= 0) && (x < N && y < N)); 
}

function isempty(a, x, y) 
{ 
	return (limits(x, y)) && (a[y*N+x] < 0); 
} 
function getDegree(a, x, y) 
{ 
	var count = 0; 
	for (var i = 0; i < N; ++i) 
		if (isempty(a, (x + cx[i]), (y + cy[i]))) 
			count++; 

	return count; 
}  
function nextMove(a,x,y) 
{ 
    var min_deg_idx = -1, c, min_deg = (N+1), nx, ny; 
    
    var start = Math.floor((Math.random()*100)%N); 
  
	for (var count = 0; count < N; ++count) 
	{ 
		var i = (start + count)%N; 
		
		nx = parseInt(x) + parseInt(cx[i]); 
		ny = parseInt(y) + parseInt(cy[i]);
		
        c = getDegree(a, nx, ny);
       
		if ((isempty(a, nx, ny)) && (c < min_deg) )
		{ 
			min_deg_idx = i; 
			min_deg = c; 
		} 
    } 
     
	if (min_deg_idx == -1) 
		return false; 

	nx = parseInt(x) + parseInt(cx[min_deg_idx]); 
	ny = parseInt(y) + parseInt(cy[min_deg_idx]); 
	a[ny*N + nx] = a[(y)*N + (x)]+1; 

	tx = nx; 
	ty = ny; 

	return true; 
} 

function neighbour(x, y, xx, yy) 
{ 
	for (var i = 0; i < N; ++i) 
		if (((x+cx[i]) == xx)&&((y + cy[i]) == yy)) 
			return true; 

	return false; 
}

function findClosedTour() 
{ 
	var a = []; 
	for (var i = 0; i<N*N; ++i) 
	{
		a.push(-1); arr.push(-1);
	} 
	var sx = Math.floor((Math.random()*100)%N);
	var sy = Math.floor((Math.random()*100)%N); 
    tx = sx;
    ty = sy; 
    
    a[ty*N+tx] = 1; 
    
    for (var i = 0; i < N*N-1; ++i) 
    {
        if (nextMove(a,tx,ty) == 0) 
        {
            return false; 
        }
    }
	if (!neighbour(tx, ty, sx, sy)) 
		return false; 
    
    for (var i = 0; i<N*N; ++i) 
	{
		arr[i]=a[i];
	}
	return true; 
} 

function add()
{  
	while (!findClosedTour()) 
	{
	    ;
    }
    
    var box = document.querySelector(".chessboard");
    for(var i=0;i<N*N;i++)
    {
        var div = box.getElementsByTagName("div")[i];
        div.innerHTML = arr[i];
    }

}