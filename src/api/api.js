import axios from "axios";
//api.js 就是存放服务端的接口的

const getPostConfig = function() {
    return {
        headers: {
            contentType: 'application/json',
            authorization: sessionStorage.getItem('token'),
        },
    }
}


/** 
 * @description 获取用户信息
 **/
export const getUserInfoApi = function(payloaad = {}) {
        return axios.post('/api/user/info', payloaad, getPostConfig())
    }
    /**
     * @description  修改个人信息
     * @param avatarName 昵称
     * @param name 真实姓名
     * @param provinceNo 省编号
     * @param cityNo 市编号 
     * @param areaNo 区编号
     * @param desc 简介
     */

export const getuserupdateApi = function(payloaad = {}) {
        return axios.post('/api/user/update', payloaad)
    }
    /** 
     * @description 获取验证码
     **/

export const getCaptchaApi = function() {
    return '/api/captcha?' + Math.random();
}


/** 
 * @description 登录接口
 * @params payloaad<object> <username,password，captcha>
 * @param payloaad.username  用户名
 * @param payloaad.password  密码 
 * @param payloaad.captcha  验证码 
 * @param bigC  作者
 **/

export const loginApi = function(payloaad = {}) {
        return axios.post('/api/user/login', payloaad)
    }
    /**
     * @description 获取题目列表
     * @param payloaad<object>
     * @param payloaad.type 必填项  题目类型 1.单选 2.多选 3.判断
     * @param payloaad.pagination  非必填  表示是否需要分页 传false：不分页
     * @param payloaad.pagesSize  每页获取几条数据
     * @param payloaad.pageNum   想获取第几页的数据
     **/
export const jsApi = function(payloaad = {}) {
        return axios.post('/api/question/list', payloaad)
    }
    /**
     * @description 新增题
     * @param payloaad<object>
     * @param payloaad.type 必填项  题目类型 1.单选 2.多选 3.判断
     * @param payloaad.title  标题
     * @param payloaad.questionA 选项A
     * @param payloaad.questionB 选项B
     * @param payloaad.questionC 选项C
     * @param payloaad.questionD 选项D
     *  @param payloaad.answer 答案
     *  @param payloaad.level  难度系数
     **/

export const createApi = function(payloaad = {}) {
    return axios.post('/api/question/create', payloaad)
}

/**
 * @description 修改题
 * @param payloaad<object>
 * @param payloaad.id  标识符
 * @param payloaad.type 必填项  题目类型 1.单选 2.多选 3.判断
 * @param payloaad.title  标题
 * @param payloaad.questionA 选项A
 * @param payloaad.questionB 选项B
 * @param payloaad.questionC 选项C
 * @param payloaad.questionD 选项D
 *  @param payloaad.answer 答案
 *  @param payloaad.level  难度系数
 **/
export const updateApi = function(payloaad = {}) {
    return axios.post('/api/question/update', payloaad)
}

/**
  * @description 删除题
  * @param payloaad<object>
  * @param payloaad.type 必填项  题目类型 1.单选 2.多选 3.判断
  * @param payloaad.id  题目id
 
  **/
export const deleteJsApi = function(payloaad = {}) {
    return axios.post('/api/question/delete', payloaad)
}

/**
 * @description 增加我的记事簿
 * @param payloaad<object>
 * @param payloaad.status 
 * @param payloaad.msg
 *  @param payloaad.data
 **/
export const diaryCreateApi = function(payloaad = {}) {
    return axios.post('/api/diary/create', payloaad)
}


//创建任务
export const createTask = function(payloaad = {}) {
        return axios.post('/api/task/create', payloaad)
    }
    //查询任务列表
export const listTask = function(payloaad = {}) {
        return axios.post('/api/task/list', payloaad)
    }
    //查询用户信息列表
export const listuser = function(payloaad = {}) {
        return axios.post('/api/user/list', payloaad)
    }
    //查询任务详情
export const detailTaskApi = function(payloaad = {}) {
        return axios.post('/api/task/detail', payloaad)
    }
    //发布任务
export const taskReleaase = function(payloaad = {}) {
        return axios.post('/api/task/release', payloaad)
    }
    //创建角色
export const createRoleApi = function(payloaad = {}) {
        return axios.post('/api/role/create', payloaad)
    }
    //角色列表
export const listRoleApi = function(payloaad = {}) {
        return axios.post('/api/role/list', payloaad)
    }
    //创建角色组
export const createRoleRoleApi = function(payloaad = {}) {
        return axios.post('/api/roleGroup/create', payloaad)
    }
    //角色分组列表
export const listRoleGroupApi = function(payloaad = {}) {
    return axios.post('/api/roleGroup/list', payloaad)
}