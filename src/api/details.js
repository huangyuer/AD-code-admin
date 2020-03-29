import request from '@/utils/request'

export function getFileGroups(data) {
    return request({
        url: '/getFileGroups',
        method: 'post',
        data
    })
}
export function addFileGroup(data) {
    return request({
        url: '/addFileGroup',
        method: 'post',
        data
    })
}
export function getFileImageVideo(data) {
    return request({
        url: '/getFiles',
        method: 'post',
        data
    })
}
export function delFiles(data) {
    return request({
        url: '/delFiles',
        method: 'post',
        data
    })
}
export function delFileGroup(data) {
    return request({
        url: '/delFileGroup',
        method: 'post',
        data
    })
}

export function getMembers(data) {
    return request({
        url: "/getMembers",
        method: "post",
        data
    });
}

export function delMember(data) {
    return request({
        url: "/delMember",
        method: "post",
        data
    });
}

export function addMembers(data) {
    return request({
        url: "/addMembers",
        method: "post",
        data
    });
}

export function uploadFile(data) {
    return request({
        url: "/uploadFile",
        method: "post",
        data,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export function updateMember(data) {
    return request({
        url: "/updateMember",
        method: "post",
        data
    });
}

export function getArticles(data) {
    return request({
        url: "/getArticles",
        method: "post",
        data
    });
}

export function getArticleLink(data) {
    return request({
        url: "/getArticleLink",
        method: "post",
        data
    });
}

export function getArticle(data) {
    return request({
        url: "/getArticle",
        method: "post",
        data
    });
}

export function getMenuSelect(data) {
    return request({
        url: "/getMenuSelect",
        method: "post",
        data
    });
}

export function delArticle(data) {
    return request({
        url: "/delArticle",
        method: "post",
        data
    });
}


export function updateArticle(data) {
    return request({
        url: "/updateArticle",
        method: "post",
        data
    });
}

export function addArticle(data) {
    return request({
        url: "/addArticle",
        method: "post",
        data
    });
}

export function setHomeVideo(data) {
    return request({
        url: "/setHomeVideo",
        method: "post",
        data
    });
}
export function getMenus(data) {
    return request({
        url: "/getMenus",
        method: "post",
        data
    });
}
export function addMenu(data) {
    return request({
        url: "/addMenu",
        method: "post",
        data
    });
}
export function updateMenu(data) {
    return request({
        url: "/updateMenu",
        method: "post",
        data
    });
}
export function delMenu(data) {
    return request({
        url: "/delMenu",
        method: "post",
        data
    });
}
export function getHomeImage() {
    return request({
        url: "/getHomeImage",
        method: "post",
    });
}

export function getInfoBars() {
    return request({
        url: "/getInfoBars",
        method: "post",
    });
}

export function addGroup(data) {
    return request({
        url: "/addGroup",
        method: "post",
        data
    });
}

export function delGroup(data) {
    return request({
        url: "/delGroup",
        method: "post",
        data
    });
}
export function getLive() {
    return request({
        url: "/getLive",
        method: "post",
    });
}
export function updateLive(data) {
    return request({
        url: "/updateLive",
        method: "post",
        data
    });
}

export function getRecord() {
    return request({
        url: "/getRecord",
        method: "post",
    });
}

export function updateRecord(data) {
    return request({
        url: "/updateRecord",
        method: "post",
        data
    });
}

export function updateImage(data) {
    return request({
        url: "/updateImage",
        method: "post",
        data
    });
}

export function uploadHomeImage(data) {
    return request({
        url: "/uploadHomeImage",
        method: "post",
        data
    });
}

export function updateInfoBar(data) {
    return request({
        url: "/updateInfoBar",
        method: "post",
        data
    });
}



