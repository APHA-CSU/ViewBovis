var inactivityTime = function () {
    var time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    function logout() {
        const url = window.location.protocol + "//" + window.location.hostname;
        document.write(
            `<html lang="en">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>ViewBovis</title>
                    <!-- CSS -->
                    <style>
                        html {
                            font-family: Arial;
                            font-size:30px;
                            color: black;
                        }
                        #bold {
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>
                    <!-- ViewBovis Logo and Description -->
                    <div style="width: 100%; overflow: hidden;">
                        <div style="width: 10%; float: left;">
                            <img src="/static/img/VBIcon16_APHAGreen.svg" width=80px>
                        </div>
                        <div style="width: 80%; padding-top: 20px;">
                            <span id="bold">Session timeout:</span> your ViewBovis session has expired, please <a class="text-hyperlink" href="https://hosting.int.sce.network/global-protect/login.esp" target="_blank">login again</a>.
                        </div>
                    </div>
                </body>
            </html>`)
        document.getElementsByTagName("BODY")[0].style.pointerEvents = "auto";
        }

    function resetTimer() {
        clearTimeout(time);
        // 1000 milliseconds = 1 second
        time = setTimeout(logout, 3600000)
    }
};
window.onload = function() {
    inactivityTime();
}
