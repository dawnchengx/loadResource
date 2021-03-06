/*! loadResource.js */
(function(root, factory){
    root.load_res = factory(root);
})(typeof global !== "undefined" ? global : this.window || this.global,  function (root) {
    load_res = {
        styleOnload : function (node, callback) {
            var t = this;
            if (node.attachEvent) {
                node.attachEvent('onload', callback);
            }
            else {
                setTimeout(function() {
                    t.poll(node, callback);
                }, 0);
            }
        },

        poll : function (node, callback) {
            var t = this;
            if (callback.isCalled) {
                return;
            }

            var isLoaded = false;

            if (/webkit/i.test(navigator.userAgent)) {//webkit
                if (node['sheet']) {
                    isLoaded = true;
                }
            }else if (node['sheet']) {
                try {
                    if (node['sheet'].cssRules) {
                        isLoaded = true;
                    }
                } catch (ex) {
                    if (ex.code === 1000) {
                        isLoaded = true;
                    }
                }
            }

            if (isLoaded) {
                setTimeout(function() {
                    callback();
                }, 1);
            }
            else {
                setTimeout(function() {
                    t.poll(node, callback);
                }, 1);
            }
        },

        loadcss : function (href, callback, attr_obj){
            var t = this;
            var node = document.createElement("link");
            node.setAttribute("rel","stylesheet");
            node.setAttribute("type","text/css");
            node.setAttribute("href",href);
            if('undefined' != typeof attr_obj){
                for(k in attr_obj){
                    v = attr_obj[k];
                    node.setAttribute(k, v);
                }
            }
            document.head.appendChild(node);
            t.styleOnload(node,function(){
                if('undefined' != typeof callback){
                    callback();
                }
            });
        },

        loadimg : function (callback) {
            var t = this;
            var ifFinish = true;
            var imgs = document.getElementsByTagName("img");
            for(k in imgs){
                v = imgs[k];
                if('object' == typeof v && !v.complete){
                    console.log(v);
                    ifFinish = false;
                }
            }
            if(!ifFinish){
                setTimeout(function() {
                    t.loadimg(callback)
                }, 1000);
            }else{
                if('undefined' != typeof callback){
                    callback();
                }
                console.log('loaded');
            }
        }
    }
    return load_res;
})