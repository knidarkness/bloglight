const autoGrow = (e) => {
    "use strict";
    if (e.scrollHeight > 0){
        e.style.height = '5px';
        e.style.height = (e.scrollHeight + 20) + 'px';
    }
};