function fetchDelete(url){
    fetch(url, {
        method: 'DELETE',
        redirect: 'follow',
    })
    .then(res => {
        if(res.redirected){
            window.location.href = res.url;
        }
    });
}