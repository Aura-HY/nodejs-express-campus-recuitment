const router = require('express').Router();
module.exports = router;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const formidable = require('formidable');
const axios = require('axios');

const userService = require('../service/userService');
const authService = require('../service/authService');

//获取职位列表
router.post('/home/getJobList', async (req, res, next) => {
    const result = await userService.getJobList();
    res.ResultVO(0, '成功', result);
});

//获取可选的职位类型
router.post('/home/getTypeList', async (req, res, next) => {
    const result = await userService.getTypeList();
    res.ResultVO(0, '成功', result);
});
//获取某个职位类型的所有职位
router.post('/home/getTypeJob', async (req, res, next) => {
    const result = await userService.getTypeJob(req.body.paramId);
    res.ResultVO(0, '成功', result);
});
//添加某个用户收藏的职位到收藏表
router.post('/addCollect', async (req, res, next) => {
    const result = await userService.addCollect(req.body.userId, req.body.jobId);
    res.ResultVO(0, '成功', result);
});
//添加举报的职位到举报表
router.post('/addReport', async (req, res, next) => {
    const result = await userService.addReport(req.body.userId, req.body.jobId, req.body.reportTime);
    res.ResultVO(0, '成功', result);
});
//用户注册
router.post('/addUser', async (req, res, next) => {
    const result = await userService.addUser(req.body.userId, req.body.password, req.body.identityParam, req.body.userAvatar);
    res.ResultVO(0, '成功', result);
});
//得用户密码
router.post('/getUserPassword', async (req, res, next) => {
    const result = await userService.getUserPassword(req.body.userId);
    res.ResultVO(0, '成功', result);
});
//获得用户的简历信息
router.post('/getResume', async (req, res, next) => {
    const result = await userService.getResume(req.body.userId);
    res.ResultVO(0, '成功', result);
});
//将简历提交
router.post('/addSendResume', async (req, res, next) => {
    const result = await userService.addSendResume(req.body.resumeId, req.body.userId, req.body.jobId, req.body.recruitersId, req.body.time);
    res.ResultVO(0, '成功', result);
});
//头像上传
router.post('/uploadAvatar', async (req, res, next) => {
    const form = new formidable.IncomingForm();

    const files = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.statusCode = 400;
                res.end('Error uploading file');
                reject(err);
            } else {
                resolve(files);
            }
        });
    });

    const file = files.file; // 根据表单中文件字段的名称获取文件对象
    const result = await userService.uploadAvatar(file);
    res.ResultVO(0, '成功', result);
});
//获取职位详情
router.post('/getJobDetail', async (req, res, next) => {
    const result = await userService.getJobDetail(req.body.jobId);
    res.ResultVO(0, '成功', result);
});
//获取消息
router.post('/getMessage', async (req, res, next) => {
    const result = await userService.getMessage();
    res.ResultVO(0, '成功', result);
});
//获取通知列表
router.post('/getNotice', async (req, res, next) => {
    const result = await userService.getNotice();
    res.ResultVO(0, '成功', result);
});
//获取消息列表
router.post('/getMessageList', async (req, res, next) => {
    const result = await userService.getMessageList(req.body.recruitersId);
    res.ResultVO(0, '成功', result);
});
//发送消息
router.post('/addMessage', async (req, res, next) => {
    const result = await userService.addMessage(req.body.content, req.body.jobSeekerId, req.body.recruitersId, req.body.messageTime);
    res.ResultVO(0, '成功', result);
});
//获取有消息的对象
router.post('/getMessageMan', async (req, res, next) => {
    const result = await userService.getMessageMan(req.body.userId);
    res.ResultVO(0, '成功', result);
});
//撤回信息
router.post('/deleteMessage', async (req, res, next) => {
    const result = await userService.deleteMessage(req.body.messageId);
    res.ResultVO(0, '成功', result);
});
//获取tocken
router.post('/login', async (req, res, next) => {
    const result = await authService.login(req.body.userId, req.body.password);
    res.ResultVO(0, '成功', result);
});

//景清
// 读取用户的简历
router.post('/getUserResumes', async (req, res, next) => {
    const result = await userService.getUserResumes(req.body.userId);
    res.ResultVO(0, '成功', result);
});
// 读取用户简历的详细信息
router.post('/getUserResumesInfo', async (req, res, next) => {
    const result = await userService.getUserResumesInfo(req.body.resumeId);
    res.ResultVO(0, '成功', result);
});
// 读取用户的昵称和头像
router.post('/getUserBasic', async (req, res, next) => {
    const result = await userService.getUserBasic(req.body.userId);
    res.ResultVO(0, '成功', result);
});
// 统计用户收藏的简历份数总数
router.post('/favoritesCollectionsSum', async (req, res, next) => {
    const result = await userService.favoritesCollectionsSum(req.body.userId);
    res.ResultVO(0, '成功', result);
});
//统计用户沟通过的聊天总数
router.post('/sessionSum', async (req, res, next) => {
    const result = await userService.sessionSum(req.body.userId);
    res.ResultVO(0, '成功', result);
});
//统计用户已投简历总数
router.post('/resumeTrueSum', async (req, res, next) => {
    const result = await userService.resumeTrueSum(req.body.userId);
    res.ResultVO(0, '成功', result);
});
// 统计用户待面试总数
router.post('/interviewedSum', async (req, res, next) => {
    const result = await userService.interviewedSum(req.body.userId);
    res.ResultVO(0, '成功', result);
});
// 添加用户新简历
router.post('/addNewResumeInfo', async (req, res, next) => {
    const { resumeName, name, gender, grade, academy, classNumber, studentId, wechat, phone, healthCertificate, curriculumVitae, workExperience, honorCertificate, userId } = req.body;
    const result = await userService.addNewResumeInfo(resumeName, name, gender, grade, academy, classNumber, studentId, wechat, phone, healthCertificate, curriculumVitae, workExperience, honorCertificate, userId);
    res.ResultVO(0, '成功', result);
});
// 读取用户收藏的职位
router.post('/getUserFavoritesJob', async (req, res, next) => {
    const result = await userService.getUserFavoritesJob(req.body.userId);
    res.ResultVO(0, '成功', result);
});
// 修改用户的简历信息
router.post('/reviseResume', async (req, res, next) => {
    const { resumeName, name, gender, grade, academy, classNumber, studentId, wechat, phone, healthCertificate, curriculumVitae, workExperience, honorCertificate, resumeId } = req.body;
    const result = await userService.reviseResume(resumeName, name, gender, grade, academy, classNumber, studentId, wechat, phone, healthCertificate, curriculumVitae, workExperience, honorCertificate, resumeId);
    res.ResultVO(0, '成功', result);
});
