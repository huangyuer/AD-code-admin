import request from '@/utils/request'

export function getVideos(data) {
    return request({
        url: '/getVideos',
        method: 'post',
        data
    })
}

export function addVideo(data) {
    return request({
        url: '/addVideo',
        method: 'post',
        data
    })
}

export function delVideo(data) {
    return request({
        url: '/delVideo',
        method: 'post',
        data
    })
}
export function upVideo(data) {
    return request({
        url: '/upVideo',
        method: 'post',
        data
    })
}
export function getLive(data) {
    return request({
        url: '/getLive',
        method: 'post',
    })
}
export function upLive(data) {
    return request({
        url: '/upLive',
        method: 'post',
        data
    })
}