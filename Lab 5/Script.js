var store=[];
var output=$("#output");

function Add(){
    store.push({value : $("#newinput").val(), element_status : 'unclaimed' });
    document.getElementById("newinput").value = "";
    print_value(store);
}

function print_value(store){


    output.empty();
    for (var i=0; i<store.length; i++) {
        if(store[i].element_status=='unclaimed'){
            output.append(" <div class='input-group m-2 mb-2 rounded'> <span  style='width:415px;' id='"+ i+"' ><input type= 'text' class='form-control' placeholder='"+ store[i].value+"' disabled/> </span><span ><button type='button' class='btn btn-outline-secondary claim'> Claim </button></span>  </div>")
        }
        else if(store[i].element_status=='claimed but unfinished'){
            output.append("<div class='input-group mb-2 rounded'> <span style='width: 40px;'id='"+ i+"' class='input-group-text' input type='checkbox'> <input type='checkbox' class='checkbox'/></span> <input type='text' style= width:300px class='form-control' placeholder=' "+ store[i].value +"' disabled/> <span > <button type='button' class='btn btn-outline-secondary Abandon' > Abandon </button> </span>  </div>")
        }
        else if(store[i].element_status=='finished'){
            output.append("<div class='input-group mb-2 rounded line_through'> <span style='width: 40px; 'id='"+ i+"''class='input-group-text'> <input type='checkbox'class='checkbox'/checked></span><strike> <input  type= 'text' style= width:450px class='form-control ' placeholder='"+ store[i].value+"' disabled/></strike> </div>")
        }
    }   

}


$("#rowAdder").click(Add);         

$(document).on("click",".claim",function(event) {
    var id = $(this).parent().siblings().attr( "id" );
      store[id].element_status='claimed but unfinished';
    print_value(store);
}); 

$(document).on("click",".Abandon",function(event) {
    var id = $(this).parent().siblings().attr( "id" );
     store[id].element_status='unclaimed';
     print_value(store);
});

$(document).on("click",".checkbox",function(event) {
    console.log($(this).parent().attr( "id" ));
    var id_checkbox=$(this).parent().attr( "id" );



        if(this.checked) {
            console.log("if worked")
            store[id_checkbox].element_status='finished';
        }
        else{
            console.log("else worked")
            store[id_checkbox].element_status='claimed but unfinished';
        } print_value(store);
});


$(document).on("click",".checkbox_finished",function(event) {
    console.log($(this));
    var id_checkbox=$(this).parent().attr( "id" );
    print_value(store);
});

$("#remove").click(function(){

    for (var i=0; i<store.length; i++) {
            if(store[i].element_status=='finished')
            {
                delete store[i];
            for (var j=i; j<store.length; j++) {
                store[j] = store[j+1];
            }store.length--;
        }
      
    }
     
    print_value(store);

});