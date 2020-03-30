import request from '@/utils/request'

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
