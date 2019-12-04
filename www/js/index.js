var controller  = null;


var app = {
    // Application Constructor
    initialize: function() {
       if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
            document.addEventListener("deviceready", this.onDeviceReady, false);
        } else {
            this.onDeviceReady();
        }
    },

    onDeviceReady: function() {
        cordova.plugins.backgroundMode.enable();
        controller = new Controller();
        
    },
};
app.initialize();