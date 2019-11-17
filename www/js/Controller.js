var set = null;
var Controller = function () {
    var controller = {
        self: null,
        initialize: function () {
            self = this;
            this.bindEvents();
            //self.renderSettingsView();
            var btnw = $("#cog").height();
            $('#cog').css({'width':btnw+'px'});
            var tabImg = $(".tabPng").height();
            $('.tabPng').css({'width':tabImg+'px'});
            var midOfTab = $(".tab").width() / 2;
            $('.tabPng').css({'left': midOfTab - (tabImg / 2) +'px'});
        },

        bindEvents: function () {
            document.getElementById("cog").addEventListener("click", function () {
                self.renderSettingsView();
            });
        },


        onTabClick: function (e) {

        },

        renderSettingsView: function () {

            var $tab = $('#pageContent div');
            $tab.empty();
            $("#pageContent").load("./views/settings.html", function (data) {

                // document.getElementById("pageContent").style.display = "none";
                // document.getElementById("pageContent").style.display = "block";
                document.getElementById("loginBut").addEventListener("click", function () {
                    self.renderLoginView();
                });
            });
        },

        renderLoginView: function () {
            var $tab = $('#pageContent div');
            $tab.empty();
            $("#pageContent").load("./views/login.html", function (data) {
                document.getElementById("closeModal").addEventListener("click", closeForm);
                document.getElementById("closeCancel").addEventListener("click", closeForm);

                var modal = document.getElementById('id01');
                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function (event) {
                    if (event.target == modal) {
                        self.renderSettingsView();
                        
                    }
                }

                function closeForm(){
                    localStorage.setItem("User", "xxxxx");
                    localStorage.setItem("Password", "xxxxx");
                    self.renderSettingsView();
                }
            });
        }

    }
    controller.initialize();
    return controller;
}