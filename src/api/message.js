import request from '@/utils/request'

export function getLvMsgAdmin(data) {
    return request({
        url: '/getLvMsgAdmin',
        method: 'post',
        data
    })
}

export function upLeaveMsg(data) {
    return request({
        url: '/upLeaveMsg',
        method: 'post',
        data
    })
}

export function getUnCheckMsg(data) {
    return request({
        url: '/getUnCheckMsg',
        method: 'post',
        data
    })
}

