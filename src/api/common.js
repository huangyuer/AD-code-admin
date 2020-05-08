import request from '@/utils/request'

export function uploadFile(data) {
    return request({
        url: '/uploadFile',
        method: 'post',
        data
    })
}

export function getMenus(data) {
    return request({
        url: '/getMenus',
        method: 'post',
    })
}

export function getMenuTypes(data) {
    return request({
        url: '/getMenuTypes',
        method: 'post',
        data
    })
}

export function getMenuTags(data) {
    return request({
        url: '/getMenuTags',
        method: 'post',
        data
    })
}

export function createHttpFile(data) {
    return request({
        url: '/createHttpFile',
        method: 'post',
        data
    })
}

export function getLvMsgSelect(data) {
    return request({
        url: '/getLvMsgSelect',
        method: 'post',
        // data
    })
}

