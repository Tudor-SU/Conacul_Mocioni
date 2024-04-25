function getPath(index){
    const img_start_path = './Media/Gallery/IMG-20240408-WA00', img_end_path = '.jpg';

    if (index < 10) {
        index = `0${index}`;
    }

    return `${img_start_path}${index}${img_end_path}`;
}

window.onload = () => {
    const min_index = 2, max_index = 42;
    let gallery_index = min_index;

    let gallery_img = document.querySelector('.content img');
    let index_info = document.querySelector('#index-info');

    // Add Right arrow event
    document.querySelector('#right-arrow').onclick = () => {
        if (++gallery_index > max_index) {
            gallery_index = min_index;
        }
        gallery_img.src = getPath(gallery_index)
        index_info.innerText = `${gallery_index - 1} / ${max_index - 1}`;
    }

    // Add left arrow event
    document.querySelector('#left-arrow').onclick = () => {
        if (--gallery_index < min_index) {
            gallery_index = max_index;
        }
        gallery_img.src = getPath(gallery_index)
        index_info.innerText = `${gallery_index - 1} / ${max_index - 1}`;
    }
}