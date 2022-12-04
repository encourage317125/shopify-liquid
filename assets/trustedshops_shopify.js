
  (function () {
    // console.log('Script Start');
    var oldSnippetPresent = true;
    try {
      var snip = document.getElementById("trustedShopsCheckout");
      if (snip) {
        snip.remove();
      } else {
        oldSnippetPresent = false;
      }
    } catch(e) {
      oldSnippetPresent = false;
    }
    
  function addCheckoutData(oldSnippetPresent, callback) {
    function addTsElements(cdata, reqdata) {
      var items = "";
      var lis = reqdata.line_items;
      for (var idx in lis) {
        var i = lis[idx];
        var iStr = 
        '        <div class="tsCheckoutProductItem">            <div class="tsCheckoutProductUrl">'+ i.productUrl +'</div>            <div class="tsCheckoutProductImageUrl">'+ i.imageUrl +'</div>            <div class="tsCheckoutProductName">'+ i.title +'</div>            <div class="tsCheckoutProductSKU">'+ i.sku +'</div>            <div class="tsCheckoutProductGTIN">'+ i.barcode +'</div>             <div class="tsCheckoutProductBrand">'+ i.vendor +'</div>        </div>        ';
        items += iStr;
      }
      var div = document.createElement('div');
      div.innerHTML =
      '      <!-- Trusted Shops v3.4 -->      <div id="trustedShopsCheckout" style="display:none;">        <!-- <div id="tsCheckoutOrderNr">'+ cdata.order_id + '</div> -->        <div id="tsCheckoutOrderNr">'+ reqdata.orderName + '</div>        <div id="tsCheckoutBuyerId">'+ cdata.customer_id + '</div>        <div id="tsCheckoutBuyerEmail">'+ cdata.email + '</div>        <div id="tsCheckoutOrderAmount">'+ cdata.total_price +'</div>        <div id="tsCheckoutOrderPaymentType">'+ reqdata.paymentGateway +'</div>        <div id="tsCheckoutOrderCurrency">'+ cdata.currency +'</div>        <!-- for each product in the basket full set of data is required -->        '+ items + '        <!-- product reviews end -->      </div>      <!-- Trusted Shops v3.4 - END -->      ';
      // Append Element
      document.body.appendChild(div);
    }

    if ( Shopify && Shopify.Checkout && Shopify.Checkout.OrderStatus) {
      // check if we are on the thankyou page to display the code only once Shopify.Checkout.page != "thank_you"!!!
      
      if (Shopify && Shopify.checkout && Shopify.Checkout && (Shopify.Checkout.page == "thank_you" || Shopify.Checkout.step == "thank_you")) {
      // if (true) {
        var c = Shopify.checkout;
        console.log('checkoutScript 3.4 | first load - show trustbadge ...');
        // var url = 'https://trustedshops.vilango.com/orderstatus/'+ Shopify.Checkout.apiHost +'/'+ c.order_id +'/'+ c.created_at+'?oldSnippetPresent='+oldSnippetPresent;
        var url = 'https://trustedshops.vilango.com/orderstatus/'+ Shopify.shop +'/'+ c.order_id +'/'+ c.created_at+'?oldSnippetPresent='+oldSnippetPresent;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function() {
          if ( xhr.readyState === XMLHttpRequest.DONE ) {
            if (xhr.status === 200){
              // console.log('fetchData', url, xhr.response);
              // console.log('fetchData--', JSON.parse(xhr.response));
              var data = JSON.parse(xhr.response);
              addTsElements(c, data);
              callback(null);
            } else {
              callback(xhr.status);
              console.log("checkoutScript 3.4 | error happened", JSON.stringify(Shopify));
              throw Error('Could not get order status: '+ xhr.status +'|'+ xhr.response);
            }
          }
        };
        xhr.send();
      } else {
        console.log("checkoutScript 3.4 | consecutive load - don't show trustbadge");
        // console.log('No object Shopify.checkout found');
      }
    } else {
      callback();
    }
  };

    
    if (typeof addProductData === "function") {
      addProductData();
    }
    addCheckoutData(oldSnippetPresent, function(error){
      if (!error) {
        (function () { 
    var _tsid = 'XC8554F80FB97580A3AC4A9356BD59086'; 
    _tsConfig = { 
      'yOffset': '0', /* offset from page bottom */
      'variant': 'reviews', /* default, reviews, custom, custom_reviews */
      'customElementId': '', /* required for variants custom and custom_reviews */
      'trustcardDirection': '', /* for custom variants: topRight, topLeft, bottomRight, bottomLeft */
      'customBadgeWidth': '', /* for custom variants: 40 - 90 (in pixels) */
      'customBadgeHeight': '', /* for custom variants: 40 - 90 (in pixels) */
      'disableResponsive': 'false', /* deactivate responsive behaviour */
      'disableTrustbadge': 'false' /* deactivate trustbadge */
    };
    var _ts = document.createElement('script');
    _ts.type = 'text/javascript'; 
    _ts.charset = 'utf-8'; 
    _ts.async = true; 
    _ts.src = '//widgets.trustedshops.com/js/' + _tsid + '.js'; 
    var __ts = document.getElementsByTagName('script')[0];
    __ts.parentNode.insertBefore(_ts, __ts);
  })();
      } else {
        console.error("Error - Not adding a tsScript", error);
      }
    });

    // add default styling to the productReviews
    var style = document.createElement('style');
    style.innerHTML =
      '#trustedshops-productreviews-sticker-wrapper {' +
        'margin: 20px 20px 0 20px;' +
      '}';
    // Get the first script tag
    var ref = document.querySelector('script');
    // Insert our new styles before the first script tag
    ref.parentNode.insertBefore(style, ref);
  })();
  