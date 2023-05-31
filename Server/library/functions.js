const Library  = {
    getTimeStamp:function(x){
            
        let date = new Date(x * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        let formatTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            return formatTime;
},
}

module.exports = Library;