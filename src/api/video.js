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
export function updateVideo(data) {
    return request({
        url: '/updateVideo',
        method: 'post',
        data
    })
}
