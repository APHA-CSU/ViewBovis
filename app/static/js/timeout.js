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
                    <link rel="stylesheet" href="/static/css/main.css">
                </head>
                <body>
                    <div class="container-fluid content content-1">
                        <!-- ViewBovis Logo and Description -->
                        <div class="row align-items-center">
                            <!-- Column: logo -->
                            <div class="col-1">
                                <img src="/static/img/VBIcon16_APHAGreen.svg" class="home-logo">
                            </div>
                            <!-- Column: description -->
                            <div class="col-8">
                                <div class="home-description-container">
                                    <p class="home-description fs-5">
                                        <span class="fw-bold">Session timeout:</span> your ViewBovis session has expired, please <a class="text-hyperlink" href="https://hosting.int.sce.network/global-protect/login.esp" target="_blank">login again</a>.
                                    </p>
                                </div>
                            </div>
                        </div>
                </body>
            </html>`)
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