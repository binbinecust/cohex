import { getWindowVar } from './getWindowVar';
/**
 * 判断版本进行版本功能控制。依赖window.setting
 * 
 * 1  免费版
 * 2  基础版
 * 3  标准版
 * 4  旗舰版---旗舰版（旧）
 *    //标准18888套餐 新创建的企业是这个
 * 5  新标准版---标准版（旧）
 * 
 * 6  体验套餐 ROBOT_0
 * 7  基础版   ROBOT_1
 * 8  精华版   ROBOT_2
 * 9  高级版   ...
 * 10 财富版   ...
 * 11 金钻版   ...
 * 12 至尊版   ROBOT_6
 * 
 * 13 工单
 * 
 * 14 新新标准版---标准版
 * 15 新专业版
 * 16 新旗舰版
 * 17 营销专业版
 * 18 营销旗舰版
 * 
 */
export const edition = {};
// 免费
edition.LEGACY_FREE_EDITION = 1;
// 标准(旧)
edition.LEGACY_STANDARD_EDITION = 5;
// 旗舰(旧)
edition.LEGACY_PREMIUM_EDITION = 4;
// 标准版
edition.STANDARD_EDITION = 14;
// 专业版
edition.PROFESSIONAL_EDITION = 15;
// 旗舰版
edition.PREMIUM_EDITION = 16;

/**
 * 判断当前版本是否高于指定版本
 * @param  {[type]} target  [description] 指定的目标版本
 * @param  {[type]} legacy  [description] 是否兼容旧的版本分类
 * @return {Boolean}        若legacy=true,兼容旧版本分类，免费版功能等同于标准版，其他情况返回true;
 *                          若legacy=false,则当前版本为旧版本时返回false;
 */
edition.beyondEdition = (target, legacy) => {

  let current = getWindowVar('setting.corpService.onlineService.type');
  if (current == undefined) current = getWindowVar('setting.base.corpService.onlineService.type');

  if (current < edition.STANDARD_EDITION) { //判断指定版本是否为遗留版本分类
    if (legacy) {
      return current == edition.LEGACY_FREE_EDITION && target == edition.STANDARD_EDITION
        ? false
        : true;
    } else
      return false;
  }

  return current > target
    ? true
    : false;
};
