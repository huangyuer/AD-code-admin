import request from '@/utils/request'

export function getArticles(data) {
    return request({
        url: '/getArticles',
        method: 'post',
        data
    })
}

export function delArticle(data) {
    return request({
        url: '/delArticle',
        method: 'post',
        data
    })
}

export function addArticle(data) {
    return request({
        url: '/addArticle',
        method: 'post',
        data
    })
}

export function updateArticle(data) {
    return request({
        url: '/updateArticle',
        method: 'post',
        data
    })
}
