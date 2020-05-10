/* eslint-disable import/prefer-default-export */
import { getBrowser } from './browser';
import { checkOpen, evokeByLocation, evokeByIFrame  } from './evoke';

/**
 * 打开App
 * @param {string} uri app地址
 * @param {function} cb 失败回调
 * @param {number} timeout 检查是否唤起的时间间隔
 */
export const callApp = (uri, cb, timeout = 3000) => {
  const browser = getBrowser();
  if (browser.isIos) {
    evokeByLocation(uri);
  } else {
    evokeByIFrame(uri);
  }
  checkOpen(() => {
    cb()
  }, timeout);
}