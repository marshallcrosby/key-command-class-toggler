function keyCommandClassToggler(options) {  
    let settings = extend({
        toggleClass: 'example-class',
        keyOne: 'control',
        keyTwo: '7',
        activeMessage: 'Class is activated',
        deactiveMessage: 'Class is deactivated'
    }, options);

    let keys = {
        keyPressOne: false,
        keyPressTwo: false
    };

    document.addEventListener('keydown', function (event) {
        if (event.key.toLowerCase() === settings.keyOne.toLowerCase()) {
            keys.keyPressOne = true;
        }

        if (event.key.toLowerCase() === settings.keyTwo.toLowerCase()) {
            keys.keyPressTwo = true;
        }
    });

    document.addEventListener('keyup', function (event) {
        if (event.key.toLowerCase() === settings.keyOne.toLowerCase()) {
            keys.keyPressOne = false;
        }
        
        if (event.key.toLowerCase() === settings.keyTwo.toLowerCase()) {
            keys.keyPressTwo = false;
        }
    });

    const root = document.getElementsByTagName('html')[0];

    document.addEventListener('keydown', function (event) {
        if (keys.keyPressOne && keys.keyPressTwo) {
            root.classList.toggle(settings.toggleClass);
            
            setTimeout(function () {
                if (root.classList.contains(settings.toggleClass)) {
                    localStorage.setItem('is' + settings.toggleClass, 'true');
                    alert(settings.activeMessage);
                } else {
                    localStorage.setItem('is' + settings.toggleClass, 'false');
                    alert(settings.deactiveMessage);
                }
                
                keys.keyPressOne = false;
                keys.keyPressTwo = false;
            }, 100);

        }
    });

    let isClassApplied = localStorage.getItem('is' + capitalize(settings.toggleClass) + 'Active');
    
    if (isClassApplied === 'true') {
        root.classList.add(settings.toggleClass);
    }

    function extend() {
        for (let i = 1; i < arguments.length; i++) {
            for (let key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    arguments[0][key] = arguments[i][key];
                }
            }
        }
        return arguments[0];
    }

    function capitalize(string) {
        return string[0].toUpperCase() + string.slice(1);
    }
}