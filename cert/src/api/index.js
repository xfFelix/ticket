import fetch from "./fetch";
/**
 * 签约助手---发送短信
 * @param {*} data
 */
export const contractSms = data =>
  fetch({
    url: `${process.env.VUE_APP_CONTRACT_URL}/contract/sms`,
    method: "POST",
    data
  });

/**
 * 签约助手---校验姓名和身份证号码
 * @param {*} data
 */
export const checkId = data =>
  fetch({
    url: `${process.env.VUE_APP_CONTRACT_URL}/contract/checkNameAndIdCard`,
    method: "POST",
    data
  });

/**
 * 签约助手---校验姓名和身份证号码
 * @param {*} data
 */
export const signInfo = data =>
  fetch({
    url: `${process.env.VUE_APP_CONTRACT_URL}/contract/save`,
    method: "POST",
    data
  });

/**
 * 签约助手---校验姓名和身份证号码
 * @param {*} data
 */
export const signInfoByFace = data =>
  fetch({
    url: `${process.env.VUE_APP_CONTRACT_URL}/electronicSignature/bank3Factors`,
    method: "POST",
    data
  });

/**
 * 签约助手---选择地区
 * @param {*} data
 */
export const getGeolocation = data =>
  fetch({
    url: `${process.env.VUE_APP_CONTRACT_URL}/electronicSignature/region`,
    method: "GET",
    data
  });

/**
 * 人脸识别---校验姓名和身份证号码
 * @param {*} data
 */
export const checkInfoByFace = data =>
  fetch({
    url: `${process.env.VUE_APP_CONTRACT_URL}/faceRecognition/createAccount`,
    method: "POST",
    data
  });

/**
 * 人脸识别---选择人脸识别方式 支付宝or微信
 * @param {*} data
 */
export const selectTypeByFace = data =>
  fetch({
    url: `${
      process.env.VUE_APP_CONTRACT_URL
    }/faceRecognition/initiateFaceAuthentication`,
    method: "POST",
    data
  });

/**
 * 人脸识别---签章
 * @param {*} data
 */
export const getSignByFace = data =>
  fetch({
    url: `${process.env.VUE_APP_CONTRACT_URL}/faceRecognition/autograph`,
    method: "POST",
    data
  });

/**
 * 身份验证——所属行业
 * @param {*} data
 */
export const getIndustry = data =>
  fetch({
    url: `${process.env.VUE_APP_CONTRACT_URL}/industrySignature/findList`,
    method: "GET",
    data
  });

/**
 * 签约助手---校验姓名和身份证号码
 * @param {*} data
 */
export const signInfoByCom = data =>
  fetch({
    url: `${process.env.VUE_APP_CONTRACT_URL}/industrySignature/bank3Factors`,
    method: "POST",
    data
  });

/**
 * 签约助手--- 判断是否签约成功
 * @param {*} data
 */
export const getSignStatus = data =>
  fetch({
    url: `${process.env.VUE_APP_CONTRACT_URL}/appletSigning2/getSigningStatus`,
    method: "POST",
    data
  });

/**
 * 签约助手--- 上传照片得到信息
 * @param {*} data
 */
export const getInfo = data =>
  fetch({
    url: `${
      process.env.VUE_APP_PHOTOINFO_URL
    }/appletSigning2/characterRecognition`,
    method: "POST",
    data
  });

/**
 * sign_geo 合同是否成功api
 * @param {*} data
 */
export const getSignSuccess = data =>
  fetch({
    url: `${
      process.env.VUE_APP_CONTRACT_URL
    }/electronicSignature/getSigningStatus`,
    method: "POST",
    data
  });

/**
 * sign_geo 合同是否成功api
 * @param {*} data
 */
export const getSignSuccessByFace = data =>
  fetch({
    url: `${process.env.VUE_APP_CONTRACT_URL}/faceRecognition/getSigningStatus`,
    method: "POST",
    data
  });

/**
 * @description 实名三要素验证 sign_info
 * @param {}
 */
export const signInfoByInfo = data =>
  fetch({
    url: `${process.env.VUE_APP_CONTRACT_URL}/contract/threeLesson`,
    method: "POST",
    data
  });
