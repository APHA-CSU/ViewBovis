var inactivityTime = function () {
    var time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    function logout() {
        fetch('/timeout').then((response) => {
            return response.text();
        })
        .then((html) => {
            document.body.innerHTML = html     
        });
    }

    function resetTimer() {
        clearTimeout(time);
        // 1000 milliseconds = 1 second
        //time = setTimeout(logout, 3600000)
        time = setTimeout(logout, 1000)
    }
};
window.onload = function() {
    inactivityTime();
}