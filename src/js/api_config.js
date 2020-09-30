// export const domain= process.env.API_ROOT; //silke矿池接口线上环境
export default {
    getValidateCode: `/login/getValidateCode`,
    login: `/login/login`,
    logout: `/login/logout`,
    checkLoginValidateCode: `/login/checkLoginValidateCode`,
    menusystemlist:`/initialization/systems/list`,//2.2.1.子系统列表接口
    maintenanceagent   :`initialization/maintenance/agent`,//2.2.3.设置代维客户接口
    menulist   :`initialization/menu/list`,//2.2.4.加载子系统菜单接口
    maintenancelist: `/initialization/maintenance/list`,//2.2.2.代维客户列表接口
}