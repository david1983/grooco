app.controller('homeCtrl', function(){  
    var cols = (window.innerWidth>768) ? 4 : 3;
    this.max=6, this.grid=[];
    var total = 0;
    for(var i=0; i<this.max;i++){             
        this.grid[i] =(total>cols-2) ? 1 :  Math.floor(Math.random() * 2) + 1;
        total+=this.grid[i];         
        if(total==cols)total=0;   
    }
    
    for(var i = this.max-1;i>this.max-3;i--){
        if(total>0){
          total-=this.grid[i];
          this.max--
        }          
    }
    
})
