const userDao = require('../dao/userDao');
const axios = require('axios');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

exports.getJobList = async () => {
    const JobList = await userDao.getJobList();
    return JobList;
};

exports.getTypeList = async () => {
    const TypeList = await userDao.getTypeList();
    return TypeList;
};

exports.getTypeJob = async (typeId) => {
    const typeJob = await userDao.getTypeJob(typeId);
    return typeJob;
};

exports.addCollect = async (userId, jobId) => {
    const collect = await userDao.addCollect(userId, jobId);
    return collect;
};

exports.addReport = async (userId, jobId, reportTime) => {
    const report = await userDao.addReport(userId, jobId, reportTime);
    return report;
};

exports.addUser = async (userId, password, identityParam) => {
    const passwordEnd = bcrypt.hashSync(password, 10); // 同步方法生成哈希密码,10为使用的盐长度，默认为10
    const user = await userDao.addUser(userId, passwordEnd, identityParam, userAvatar);
    return user;
};

exports.getUserPassword = async (userId) => {
    const password = await userDao.getUserPassword(userId);
    return password;
};

exports.getResume = async (userId) => {
    const Resume = await userDao.getResume(userId);
    return Resume;
};

exports.addSendResume = async (resumeId, userId, jobId, recruitersId, time) => {
    const sendResume = await userDao.addSendResume(resumeId, userId, jobId, recruitersId, time);
    return sendResume;
};
//头像上传
exports.uploadAvatar = async (file) => {
    const file_name = file.name;
    const file_size = file.size;
    const response = await axios.post(
        'https://picx.gdmuna.com/api/auth/login',
        {
            username: 'sideline',
            password: 'WhG2A1XRGJOWkHcX'
        },
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
    );

    const token = response.data.data.token;
    const target_path = '/sideline/img/' + file_name;
    const headers = {
        'Authorization': token,
        'Content-Type': 'multipart/form-data',
        'Content-Length': file_size.toString(),
        'File-Path': encodeURIComponent(target_path)
    };

    const result = await axios.put('https://picx.gdmuna.com/api/fs/put', file, { headers }).then((response) => {
        console.log(JSON.stringify(response.data));
    });
};

exports.getJobDetail = async (jobId) => {
    const JobDetail = await userDao.getJobDetail(jobId);
    return JobDetail;
};

exports.getMessage = async () => {
    const message = await userDao.getMessage();
    return message;
};

exports.getNotice = async () => {
    const Notice = await userDao.getNotice();
    return Notice;
};

exports.getMessageList = async (recruitersId) => {
    const MessageList = await userDao.getMessageList(recruitersId);
    return MessageList;
};

exports.addMessage = async (content, jobSeekerId, recruitersId, messageTime) => {
    const Message = await userDao.addMessage(content, jobSeekerId, recruitersId, messageTime);
    return Message;
};

exports.getMessageMan = async (userId) => {
    const MessageMan = await userDao.getMessageMan(userId);
    return MessageMan;
};

exports.deleteMessage = async (messageId) => {
    const deleteMessage = await userDao.deleteMessage(messageId);
    return deleteMessage;
};
// 景清
// 读取用户的简历
exports.getUserResumes = async (userId) => {
    const userResumes = await userDao.getUserResumes(userId);
    return userResumes;
};
// 读取用户简历的详细信息
exports.getUserResumesInfo = async (resumeId) => {
    const userResumesInfo = await userDao.getUserResumesInfo(resumeId);
    return userResumesInfo;
};
// 读取用户的昵称和头像
exports.getUserBasic = async (userId) => {
    const getUserBasic = await userDao.getUserBasic(userId);
    return getUserBasic;
};
// 统计用户收藏的简历份数总数
exports.favoritesCollectionsSum = async (userId) => {
    const userResumesInfo = await userDao.favoritesCollectionsSum(userId);
    return Number(userResumesInfo[0].sum);
};
// 统计用户沟通过的聊天总数
exports.sessionSum = async (userId) => {
    const sessionSum = await userDao.sessionSum(userId);
    return Number(sessionSum[0].sessionSum);
};
// 统计用户已投简历总数
exports.resumeTrueSum = async (userId) => {
    const resumeTrueSum = await userDao.resumeTrueSum(userId);
    return Number(resumeTrueSum[0].resumeTrueSum);
};
// 统计用户待面试总数
exports.interviewedSum = async (userId) => {
    const interviewedSum = await userDao.interviewedSum(userId);
    return Number(interviewedSum[0].interviewedSum);
};
// 添加用户新简历
exports.addNewResumeInfo = async (resumeName, name, gender, grade, academy, classNumber, studentId, wechat, phone, healthCertificate, curriculumVitae, workExperience, honorCertificate, userId) => {
    const addNewResumeInfo = await userDao.addNewResumeInfo(resumeName, name, gender, grade, academy, classNumber, studentId, wechat, phone, healthCertificate, curriculumVitae, workExperience, honorCertificate, userId);
    return addNewResumeInfo;
};
//读取用户收藏的职位
exports.getUserFavoritesJob = async (userId) => {
    const getUserFavoritesJob = await userDao.getUserFavoritesJob(userId);
    return getUserFavoritesJob;
};
// 修改用户的简历信息
exports.reviseResume = async (resumeName, name, gender, grade, academy, classNumber, studentId, wechat, phone, healthCertificate, curriculumVitae, workExperience, honorCertificate, resumeId) => {
    const reviseResume = await userDao.reviseResume(resumeName, name, gender, grade, academy, classNumber, studentId, wechat, phone, healthCertificate, curriculumVitae, workExperience, honorCertificate, resumeId);
    return reviseResume;
};
