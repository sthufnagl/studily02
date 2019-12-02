var set = null;

//POST URL
const NODEJSURL = "http://192.168.0.29:1337/api/v1";

var Controller = function () {
    var controller = {
        self: null,
        initialize: function () {
            self = this;
            this.bindEvents();
            self.renderFolderView();
            var btnw = $("#cog").height();
            $('#cog').css({ 'width': btnw + 'px' });
        },

        addTopic: function(topicName) {
            var divTopic = document.createElement('div');
            divTopic.id = "filler";
            divTopic.className = "block";
            divTopic.innerHTML = '<div class="name">' + topicName + '</div><div class="removeTopic">x</div>';
            document.getElementById("topics").appendChild(divTopic);
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
            if (tab === 'sanduhr') {
                self.renderSanduhrView();
            }
            if (tab === 'group') {
                self.renderGroupView();
            }
            if (tab === 'stat') {
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
                var username = localStorage.getItem("User");
                var psw = localStorage.getItem("Password");
                document.getElementById("inputUsername").innerHTML = username;
                document.getElementById("inputPasswort").innerHTML = psw;
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
                document.getElementById("loginBtn").addEventListener("click", loginFnct);

                var modal = document.getElementById('id01');
                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function (event) {
                    if (event.target == modal) {
                        self.renderSettingsView();

                    }
                }

                function closeForm() {
                    self.renderSettingsView();
                }

                function loginFnct() {
                    var username = document.getElementById("uname").value;
                    localStorage.setItem("User", username);
                    var psw = document.getElementById("psw").value;
                    localStorage.setItem("Password", psw);
                    self.renderSettingsView();
                    self.saveLoginData();
                }
            });
        },
        renderFolderView: function () {

            $("#folder .tabPng").addClass('active');
            $("#sanduhr .tabPng").removeClass('active');
            $("#group .tabPng").removeClass('active');
            $("#stat .tabPng").removeClass('active');
            $("#cog #cogPng").removeClass('active');

            var $tab = $('#pageContent div');
            $tab.empty();
            $("#pageContent").load("./views/folder.html", function (data) { 
                document.getElementById("addBtn").addEventListener("click", function () {
                    var topic = document.getElementById("topic").value;
                    document.getElementById("topic").value = '';
                    self.addTopic(topic);
                });
            });
        },

        renderSanduhrView: function () {

            $("#sanduhr .tabPng").addClass('active');
            $("#folder .tabPng").removeClass('active');
            $("#group .tabPng").removeClass('active');
            $("#stat .tabPng").removeClass('active');
            $("#cog #cogPng").removeClass('active');

            var $tab = $('#pageContent div');
            $tab.empty();
            $("#pageContent").load("./views/sanduhr.html", function (data) {
                document.getElementById("timerBtn").addEventListener("click", function () {
                    var Mins = 60 * document.getElementById("timerMins").value;
                    document.getElementById("timerMins").value = '';
                    self.startTimer(Mins);
                });
            });
        },

        renderGroupView: function () {

            $("#group .tabPng").addClass('active');
            $("#sanduhr .tabPng").removeClass('active');
            $("#folder .tabPng").removeClass('active');
            $("#stat .tabPng").removeClass('active');
            $("#cog #cogPng").removeClass('active');

            var $tab = $('#pageContent div');
            $tab.empty();
            $("#pageContent").load("./views/group.html", function (data) { });
        },

        renderStatView: function () {

            $("#stat .tabPng").addClass('active');
            $("#sanduhr .tabPng").removeClass('active');
            $("#group .tabPng").removeClass('active');
            $("#folder .tabPng").removeClass('active');
            $("#cog #cogPng").removeClass('active');

            var $tab = $('#pageContent div');
            $tab.empty();
            $("#pageContent").load("./views/stat.html", function (data) { });
        },

        startTimer: function (duration) {
            var timer = duration, minutes, seconds;
            var interval = setInterval(function () {
                if (--timer < 0) {
                    clearInterval(interval);
                } else {
                    minutes = parseInt(timer / 60, 10)
                    seconds = parseInt(timer % 60, 10);

                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;

                    document.getElementById("time").textContent = minutes + ":" + seconds;
                }
                document.getElementById("timerBtn").addEventListener("click", function () {
                    clearInterval(interval);
                });
            }, 1000);

        },

        saveLoginData: function () {
            var username = localStorage.getItem("User");
            var psw = localStorage.getItem("Password");
            var userData = {
                "id": 11,
                "title": username,
                "content": psw,
                "tags": [
                    "tag1",
                    "tag2",
                    "tag3"
                ],
                "createdAt": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
                "updatedAt": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)"
            };
            $.ajax({
                type: "POST",
                url: NODEJSURL,
                // The key needs to match your method's input parameter (case-sensitive).
                data: JSON.stringify(userData),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) { alert("User: " + data.content.title + " is created at: " + data.content.createdAt); },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        }

    }
    controller.initialize();
    return controller;
}