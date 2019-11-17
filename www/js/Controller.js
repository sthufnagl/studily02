var set = null;
var Controller = function () {
    var controller = {
        self: null,
        initialize: function () {
            self = this;
            this.bindEvents();
            self.renderFolderView();
            var btnw = $("#cog").height();
            $('#cog').css({'width':btnw+'px'});
            var tabImg = $(".tabPng").height();
            $('.tabPng').css({'width':tabImg+'px'});
            var midOfTab = $(".tab").width() / 2;
            $('.tabPng').css({'left': midOfTab - (tabImg / 2) +'px'});
        },

        bindEvents: function () {
            $('.tab').on('click', this.onTabClick);
            $('#cog').on('click', this.onTabClick);
        },


        onTabClick: function (e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                return;
            }
            
            var tab = $(this).context.id;
            if (tab === 'folder') {
                self.renderFolderView();
            }
            if (tab === 'sanduhr'){
                self.renderSanduhrView();
            }
            if (tab === 'group'){
                self.renderGroupView();
            }
            if (tab === 'stat'){
                self.renderStatView();
            }
            if (tab === 'cog') {
                self.renderSettingsView();
            }   
        },

        renderSettingsView: function () {

            $("#folder .tabPng").removeClass('active');
            $("#sanduhr .tabPng").removeClass('active');
            $("#group .tabPng").removeClass('active');
            $("#stat .tabPng").removeClass('active');
            $("#cog #cogPng").addClass('active');

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
            $("#cog #cogPng").removeClass('active');
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
        },
        renderFolderView: function(){

            $("#folder .tabPng").addClass('active');
            $("#sanduhr .tabPng").removeClass('active');
            $("#group .tabPng").removeClass('active');
            $("#stat .tabPng").removeClass('active');
            $("#cog #cogPng").removeClass('active');

            var $tab = $('#pageContent div');
            $tab.empty();
            $("#pageContent").load("./views/folder.html", function (data) {});
        },

        renderSanduhrView: function(){

            $("#sanduhr .tabPng").addClass('active');
            $("#folder .tabPng").removeClass('active');
            $("#group .tabPng").removeClass('active');
            $("#stat .tabPng").removeClass('active');
            $("#cog #cogPng").removeClass('active');

            var $tab = $('#pageContent div');
            $tab.empty();
            $("#pageContent").load("./views/sanduhr.html", function (data) {});
        },

        renderGroupView: function(){

            $("#group .tabPng").addClass('active');
            $("#sanduhr .tabPng").removeClass('active');
            $("#folder .tabPng").removeClass('active');
            $("#stat .tabPng").removeClass('active');
            $("#cog #cogPng").removeClass('active');

            var $tab = $('#pageContent div');
            $tab.empty();
            $("#pageContent").load("./views/group.html", function (data) {});
        },

        renderStatView: function(){

            $("#stat .tabPng").addClass('active');
            $("#sanduhr .tabPng").removeClass('active');
            $("#group .tabPng").removeClass('active');
            $("#folder .tabPng").removeClass('active');
            $("#cog #cogPng").removeClass('active');

            var $tab = $('#pageContent div');
            $tab.empty();
            $("#pageContent").load("./views/stat.html", function (data) {});
        },

    }
    controller.initialize();
    return controller;
}