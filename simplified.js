// Function to load HTML content into a specified div
function loadHTML(myDivId, options) {
    fetch('https://65cc5a54dd519126b83e4e51.mockapi.io/popup')
        .then(response => response.json())
        .then(data => {
            const htmlText = replaceHtmlDynamicProps(options.htmlText, options, data);
            document.getElementById(myDivId).innerHTML = htmlText;
            document.querySelectorAll(`#${myDivId} script`).forEach(script => eval(script.innerHTML));
        })
        .catch(error => {
            console.error('Failed to load data:', error);
        });
}

// Function to replace dynamic properties in HTML text with data received from the server
function replaceHtmlDynamicProps(t, options, data) {
    t = t.replace("{{iframeSrc}}", options.fobiBaseLocation + options.fobiId + "?chatPrimary=" + encodeURI(options.chatPrimary).replace('#', '') + "&chatSecondary=" + encodeURI(options.chatSecondary).replace('#', '') + "&chatBotImg=" + encodeURI(options.chatBotImg).replace('#', ''));
    t = t.replace("{{headerBackground}}", data[3].headerBackground);
    t = t.replace("{{headerTitleColor}}", data[2].headerTitleColor);
    t = t.replace("{{headerIconColor}}", data[0].headerIconColor);
    t = t.replace("{{buttonOffset}}", options.buttonOffset);
    t = t.replace("{{chatboxOffset}}", options.chatboxOffset);
    t = t.replace("{{chatboxHeight}}", data[0].chatboxHeight || '400px');
    t = t.replace("{{chatboxWidth}}", data[0].chatboxWidth);
    t = t.replace("{{buttonImg}}", options.buttonImg);
    t = t.replace("{{buttonBackground}}", data[2].buttonBg);
    t = t.replace("{{botTitle}}", options.botTitle);
    t = t.replace("{{heightMinus100}}", (parseInt(data.chatboxHeight ? data.chatboxHeight.slice(0, -2) : 400) - 100) + 'px');
    return t;
}

// Function to change the header and button color dynamically based on the provided color value
function changeColor(colorValue) {
    // Select the header element by its ID
    const headerElement = document.querySelector("#fo-conversation-popup-header");
    // Select the toggle button element by its ID
    const toggleButtonElement = document.querySelector("#fo-toggle-button");

    // Check if the header element exists
    if (headerElement) {
        // Set the background color of the header element to the provided color value
        headerElement.style.backgroundColor = colorValue;
    } else {
        // Log an error message if the header element is not found
        console.error("Element with ID 'fo-conversation-popup-header' not found.");
    }

    // Check if the toggle button element exists
    if (toggleButtonElement) {
        // Set the background color of the toggle button element to the provided color value
        toggleButtonElement.style.backgroundColor = colorValue;
    } else {
        // Log an error message if the toggle button element is not found
        console.error("Element with ID 'fo-toggle-button' not found.");
    }
}

// Function to fetch color data from the backend using Axios
function fetchColor() {
    // Make a GET request to the backend endpoint to fetch color data
    axios.get('http://localhost:5000/getColor')
        .then(response => {
            // Extract the color value from the response data
            const colorValue = response.data.data.colorValue;
            
            // Nested function to ensure that required elements are present before updating colors
            function ensureElementsPresent() {
                // Get references to the required DOM elements by their IDs
                const foConversationPopupHeader = document.getElementById('fo-conversation-popup-header');
                const foToggleButton = document.getElementById('fo-toggle-button');

                // Check if any required element is missing
                if (!foConversationPopupHeader || !foToggleButton) {
                    // Log a message indicating that elements are not found and schedule a retry after 500ms
                    console.log("Elements not found, retrying in 500ms...");
                    setTimeout(ensureElementsPresent, 500);
                    return;
                }

                // If all required elements are present, call the changeColor function to update colors
                changeColor(colorValue);
            }

            // Call the ensureElementsPresent function to ensure required elements are available
            ensureElementsPresent();
        })
        .catch(error => {
            // Log an error message if there's an issue fetching color data
            console.error('Error fetching color:', error);
        });
}

// Fetch color data from the backend when the page loads
window.onload = function () {
    fetchColor();
};

// Function to replace all occurrences of a substring in a string
function replaceAll(t, e, n) {
    return t.replace(new RegExp(e, "g"), n);
}

// Function to set initial popup status
function setInitPopupStatus() {
    if (popUpOpen.toLowerCase() === "true") {
        openPopup();
    }
}

// Function to close the popup
function closePopup() {
    var t = document.getElementById(conversationDiv);
    var e = document.getElementById("fo-toggle-button-icon");
    removeClass(e, "animate");
    addClass(e, "no-animate");
    removeClass(t, "open");
    isPopupOpen = !1;
    localStorage.setItem("fobi-pop-up-open", "false");
}

// Function to open the popup
function openPopup() {
    var t = document.getElementById(conversationDiv);
    var e = document.getElementById("fo-toggle-button-icon");
    addClass(e, "animate");
    removeClass(e, "no-animate");
    addClass(t, "open");
    isPopupOpen = !0;
    localStorage.setItem("fobi-pop-up-open", "true");
}

// Function to alter the popup status
function alterPopupStatus() {
    isPopupOpen ? closePopup() : openPopup();
}

// Function to check if an element has a specified class
function hasClass(t, e) {
    return t.classList ? t.classList.contains(e) : !!t.className.match(new RegExp("(\\s|^)" + e + "(\\s|$)"));
}

// Function to add a class to an element
function addClass(t, e) {
    t.classList ? t.classList.add(e) : hasClass(t, e) || (t.className += " " + e);
}

// Function to remove a class from an element
function removeClass(t, e) {
    if (t.classList) {
        t.classList.remove(e);
    } else if (hasClass(t, e)) {
        var n = new RegExp("(\\s|^)" + e + "(\\s|$)");
        t.className = t.className.replace(n, " ");
    }
}

let isPopupdefaultOpen = !0,//------------0
    isPopupOpen = !1
conversationDiv = "fo-conversation-popup-wrapper",


    // Event listener for DOMContentLoaded event
    document.addEventListener("DOMContentLoaded", function () {
        const options = {
            fobiBaseLocation: "https://app.fobi.io/#/embedded/",
            injectDiv: "popup",
            fobiId: "data-fobi-id",
            botTitle: "Example Bot Title",
            headerBackground: "#ffffff",
            headerTitleColor: "#000000",
            headerIconColor: "#000000",
            chatboxHeight: "400px",
            chatboxWidth: "330px",
            buttonImg: "https://app.fobi.io/icon.png",
            chatBotImg: "https://app.fobi.io/head.png",
            chatboxOffset: "right: 30px;",
            buttonOffset: "right: 30px;",

            htmlText: '<div id="fo-inner-wrap">\r\n    <style>\r\n        @import url(\'https://fonts.googleapis.com/css?family=Roboto\');\r\n       \r\n        #fo-conversation-popup-wrapper {\r\n            position: fixed;\r\n            bottom: 135px;\r\n            width: 365px;\r\n            height: {{heightMinus100}};\r\n            font-family: \'Roboto\', sans-serif;\r\n            border-radius: 8px;\r\n            opacity: 0;\r\n            transition: 0.5s;\r\n            z-index: -1;\r\n            display: block;\r\n        }\r\n    \r\n        #fo-conversation-popup-wrapper.open {\r\n            opacity: 1;\r\n            height: {{chatboxHeight}};\r\n            -webkit-box-shadow: 0 5px 40px rgba(0,0,0,.16)!important;\r\n            box-shadow: 0 5px 40px rgba(0,0,0,.16)!important;\r\n            z-index: 1000000 !important;\r\n        }\r\n    \r\n        #fo-iframe-wrapper {\r\n            height: 100%;\r\n        }\r\n    \r\n        #fo-iframe {\r\n            width: 100%;\r\n            height: calc(100% - 40px);\r\n            margin-bottom: 0;\r\n        }\r\n    \r\n        #fo-conversation-popup-header {\r\n            display: flex;\r\n            align-items: center;\r\n            font-size: 16px;\r\n            padding: 18px 15px;\r\n     box-sizing: border-box;\r\n       border-top-right-radius: 8px;\r\n            border-top-left-radius: 8px;\r\n            float: left;\r\n            width: 100%;\r\n        }\r\n    \r\n        #fo-conversation-popup-title {\r\n            flex: 1;\r\n            padding-left: 10px;\r\n        }\r\n    \r\n        #fo-conversation-popup-close {\r\n            width: 40px;\r\n            height: 40px;\r\n            display: flex;\r\n            justify-content: center;\r\n            align-items: center;\r\n            color: white;\r\n            cursor: pointer;\r\n            /*border-left: 1px solid rgba(255,255,255,0.1);*/\r\n        }\r\n    \r\n        .hidden {\r\n            visibility: hidden !important;\r\n        }\r\n    \r\n        #fo-toggle-button {\r\n            position: fixed;\r\n            bottom: 30px;\r\n            border-radius: 50%;\r\n            height: 63px;\r\n            width: 63px;\r\n            cursor: pointer;\r\n            -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);\r\n            box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);\r\n            z-index: 1000000 !important;\r\n            transition: 0.3s;\r\n        }\r\n    \r\n        #fo-toggle-button:hover {\r\n            z-index: 1000000 !important;\r\n            -webkit-box-shadow: 0 2px 8px rgba(0,0,0,.09),0 4px 40px rgba(0,0,0,.24)!important;\r\n            box-shadow: 0 2px 8px rgba(0,0,0,.09),0 4px 40px rgba(0,0,0,.24)!important;\r\n            opacity: 1;\r\n        }\r\n    \r\n        #fo-toggle-button .fo-icon {\r\n            height: 63px;\r\n            width: 63px;\r\n            background-size: 50% 50%;\r\n            background-position: 50% 50%;\r\n            background-repeat: no-repeat;\r\n        }\r\n    \r\n        #fo-toggle-button .fo-icon.animate {\r\n            animation: iconTurnIn 0.3s;\r\n            animation-fill-mode: forwards;\r\n        }\r\n    \r\n        #fo-toggle-button .fo-icon.no-animate {\r\n            animation: iconTurnOut 0.3s;\r\n            animation-fill-mode: forwards;\r\n        }\r\n    \r\n        @keyframes iconTurnIn {\r\n            0%   { background-image: url(\'{{buttonImg}}\'); transform: rotate(0) scale(1); opacity: 1  }\r\n            15%  { background-image: url(\'{{buttonImg}}\'); transform: rotate(15deg) scale(0.8); opacity: 0.9 }\r\n            50%  { background-image: url(\'{{buttonImg}}\'); transform: rotate(45deg) scale(0.3); opacity: 0.7  }\r\n            51%  { background-image: url(\'http://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Close.png&r=255&g=255&b=255\'); transform: rotate(45deg) scale(0.1); opacity: 0.7  }\r\n            70%  { background-image: url(\'http://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Close.png&r=255&g=255&b=255\'); transform: rotate(75deg) scale(0.2), ; opacity: 0.9 }\r\n            100% { background-image: url(\'http://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Close.png&r=255&g=255&b=255\'); transform: rotate(90deg) scale(0.5); opacity: 1  }\r\n        }\r\n    \r\n        @keyframes iconTurnOut {\r\n            0%   { background-image: url(\'http://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Close.png&r=255&g=255&b=255\'); transform: rotate(90deg) scale(0.5); opacity: 1  }\r\n            15%  { background-image: url(\'http://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Close.png&r=255&g=255&b=255\'); transform: rotate(75deg) scale(0.2), ; opacity: 0.9 }\r\n            50%  { background-image: url(\'http://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Close.png&r=255&g=255&b=255\'); transform: rotate(45deg) scale(0.1); opacity: 0.7  }\r\n            51%  { background-image: url(\'{{buttonImg}}\'); transform: rotate(45deg) scale(0.3); opacity: 0.7  }\r\n            70%  { background-image: url(\'{{buttonImg}}\'); transform: rotate(15deg) scale(0.8); opacity: 0.9 }\r\n            100% { background-image: url(\'{{buttonImg}}\'); transform: rotate(0) scale(1); opacity: 1  }\r\n        }\r\n    </style>\r\n    \r\n    <div id="fo-toggle-button" style="background-color: {{buttonBackground}} ; {{buttonOffset}}" onclick="alterPopupStatus()">\r\n        <div id="fo-toggle-button-icon" class="fo-icon" style="background-image: url(\'{{buttonImg}}\');"></div>\r\n    </div>\r\n    \r\n    <div id="fo-conversation-popup-wrapper" class="{{isPopupDefaultOpen}}" style="{{chatboxOffset}};  width: {{chatboxWidth}}">\r\n        <div id="fo-conversation-popup-header" style="background-color: {{headerBackground}};">\r\n            <div id="fo-conversation-popup-title" style="color: {{headerTitleColor}}">\r\n                {{botTitle}}\r\n            </div>\r\n        </div>\r\n        <div id="fo-iframe-wrapper">\r\n            <iframe id=\'fo-iframe\' frameBorder="0" src="{{iframeSrc}}"></iframe>\r\n        </div>\r\n    \r\n    </div>\r\n    \r\n    </div>'

        };

        // Call loadHTML function with options
        loadHTML('popup', options);

    });