(() => {
    // let currentProduct = "";
    let amazon_buy_now;
    let product_info;
    product_website = window.location.href;
    product_info = document.getElementsByTagName('title');
    for (element of product_info) {
        // element.style['background-color'] = '#FF00FF';
        console.log(element.innerText);
    }
    console.log(product_website);
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, productId } = obj;
        if (type === "NEW") {
        //currentProduct = productId;
          newProductLoaded();
        }

      });
    
    const newProductLoaded = async() => {
        const evaluate_button_exist = document.getElementsByClassName("evaluate_button")[0];
        if (!evaluate_button_exist) {
            //Better to replace with a button element?
            const evaluate_btn = document.createElement("img");
            evaluate_btn.src = chrome.runtime.getURL("assets/icon.png");
            evaluate_btn.className = "evaluate_button";
            evaluate_btn.title = "Click to compare your product!";
            amazon_buy_now = document.getElementById("title_feature_div");
            amazon_buy_now.appendChild(evaluate_btn);
            evaluate_btn.addEventListener("click", showInfo);
        }
    }

    const showInfo = async() => {
        var iframe = document.createElement('iframe'); 
        iframe.style.background = "green";
        iframe.style.height = "100%";
        iframe.style.width = "400px";
        iframe.style.position = "fixed";
        iframe.style.top = "0px";
        iframe.style.right = "0px";
        iframe.style.zIndex = "9000000000000000000";
        iframe.style.border = "0px"; 
        iframe.src = chrome.runtime.getURL("popup.html")
        document.body.appendChild(iframe);
    }

    newProductLoaded();

})();
