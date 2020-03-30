const getters = {
    token: state => state.user.token,
    getMenus: state => state.common.getMenus,
    




    // sidebar: state => state.app.sidebar,
    // size: state => state.app.size,
    // device: state => state.app.device,
    // visitedViews: state => state.tagsView.visitedViews,
    // cachedViews: state => state.tagsView.cachedViews,
    userInfo: state => state.user.userInfo,
    userImportUrl:state => state.user.userImportUrl,
    groupInfo: state => state.education.groupInfo,
    questionInfo: state => state.education.questionInfo,
    importFileUrl: state => state.education.importFileUrl,
    filegroups: state => state.details.filegroups,
    addfilegroups: state => state.details.addfilegroups,
    filesimagevideo: state => state.details.filesimagevideo,
    uploadfile: state => state.details.uploadfile,
    memberInfo: state => state.details.memberInfo,
    articlesInfo: state => state.details.articlesInfo,
    articleLink: state => state.details.articleLink,
    article:state => state.details.article,
    menuSelect: state => state.details.menuSelect,
    getmenus: state => state.details.getmenus,
    addmenu: state => state.details.addmenu,
    delmenu: state => state.details.delmenu,
    updatemenu: state => state.details.updatemenu,
    homeImage: state => state.details.homeImage,
    infoBars:state => state.details.infoBars,
    getLive:state => state.details.getLive,
    getRecord:state => state.details.getRecord,
    //
    isExistPlate:state => state.details.isExistPlate
    // avatar: state => state.user.avatar,
    // name: state => state.user.name,
    // introduction: state => state.user.introduction,
    // roles: state => state.user.roles,
    // permission_routes: state => state.permission.routes,
    // errorLogs: state => state.errorLog.logs
}
export default getters