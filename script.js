function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          if(this.response){
            var products =JSON.parse(this.response);
            for(var id in products) {
                var productcolumn=document.createElement("div");
                var att = document.createAttribute("class");
                att.value = "col-4 product";
                var attOnClick = document.createAttribute("onclick");
    
                attOnClick.value = "productDetails(event)";
                productcolumn.setAttributeNode(att);
    
    
                var slug = document.createAttribute("data-slug");
                slug.value = products[id].slug;
                productcolumn.setAttributeNode(slug);
    
    
    
                productcolumn.setAttributeNode(attOnClick);
                productcolumn.innerHTML='<img src="'+products[id].thumbnail+'" class="img-fluid productimage"><div class="clearfix"><span class="float-left">'+products[id].name+'</span> <span class="float-right">Rs '+products[id].price+'</span></div>';
    
                  var rating =Math.round(products[id].rating);
                  for(var i =0; i<rating; i++ ){
                      var ratingSpan=document.createElement("span");
                        var classAtt = document.createAttribute("class");
                        classAtt.value = "fa fa-star";
                        ratingSpan.setAttributeNode(classAtt);
                        productcolumn.appendChild(ratingSpan);
                  }
                  document.getElementById("products").appendChild(productcolumn);
              }
          } else {
              document.getElementById('products').innerHTML= "There Is No Data";
          }
      } 
    };
    xhttp.open("GET", "http://localhost:8081/listProducts", true);
    xhttp.send();
  }

  loadDoc();

  function productDetails(event){
      document.getElementById('details').innerHTML='';
      // console.log(event.target.parentElement.getAttribute('data-slug'));
      var product_slug= event.target.parentElement.getAttribute('data-slug');
      window.history.pushState("{}", "Title", '/getUser/'+product_slug);
      var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              console.log(JSON.parse(this.response));
              var singleProduct = JSON.parse(this.response)
              var home = document.getElementById('home').style.display='none';

              var productimage=document.createElement("div");
                var att = document.createAttribute("class");
                att.value = "row";
                productimage.setAttributeNode(att);
                var setid = document.createAttribute("id");
                setid.value = "details_of_product";
                productimage.setAttributeNode(setid);

                document.getElementById("details").appendChild(productimage)
                productimage.innerHTML = '<div class="col-6"><img src="'+'../'+singleProduct.thumbnail+'" class="img-fluid"></div><div class="col-6"><h4>'+singleProduct.name+'</h4><p>'+singleProduct.description+'</p><div><span><b>RS.'+singleProduct.price+'</b></span><button class="bg-dark text-white ml-5">Buy now</button><i class="fa fa-shopping-cart ml-5"></i></div></div>';
              
          }
      };
      xhttp.open("GET", "http://localhost:8081/getProduct/"+product_slug, true);
      xhttp.send();
      
  }

  window.addEventListener('popstate', function (event) {
  // The URL changed...
  console.log(window.location);
  if(window.location.pathname=='/'){
      document.getElementById('details_of_product').style.display='none';
      document.getElementById('home').style.display='flex';
  }
  });

  function filtered(){
      document.getElementById('products').innerHTML='';
      var minvalue= document.getElementById('min').value;
      var maxvalue= document.getElementById('max').value;
console.log(minvalue+" "+maxvalue);
      var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var products =JSON.parse(this.response);
        for(var id in products) {
            var productcolumn=document.createElement("div");
            var att = document.createAttribute("class");
            att.value = "col-4 product";
            var attOnClick = document.createAttribute("onclick");

            attOnClick.value = "productDetails(event)";
            productcolumn.setAttributeNode(att);


            var slug = document.createAttribute("data-slug");
            slug.value = products[id].slug;
            productcolumn.setAttributeNode(slug);



            productcolumn.setAttributeNode(attOnClick);
            productcolumn.innerHTML='<img src="'+products[id].thumbnail+'" class="img-fluid productimage"><div class="clearfix"><span class="float-left">'+products[id].name+'</span> <span class="float-right">Rs '+products[id].price+'</span></div>';


              var rating =Math.round(products[id].rating);
              for(var i =0; i<rating; i++ ){
                    var ratingSpan=document.createElement("span");
                    var classAtt = document.createAttribute("class");
                    classAtt.value = "fa fa-star";
                    ratingSpan.setAttributeNode(classAtt);
                    productcolumn.appendChild(ratingSpan);
              }
                    
              document.getElementById("products").appendChild(productcolumn);
          }
      }
    };
    xhttp.open("GET", "http://localhost:8081/filterProducts?minvalue="+minvalue+"&maxvalue="+maxvalue, true);
    xhttp.send();
  }