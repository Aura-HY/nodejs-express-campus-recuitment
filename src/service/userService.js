const userDao = require('../dao/userDao');
const axios = require('axios');

exports.getJobList = async () => {
    const JobList = await userDao.getJobList();
    return JobList;
};

//以下为模版
// exports.getUserInfo = async (userId) => {
//     const userInfo = await userDao.getUserInfo(userId);
//     return userInfo;
// };

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

exports.addReport = async (userId, jobId) => {
    const report = await userDao.addReport(userId, jobId);
    return report;
};

exports.addUser = async (userId, phoneNumber, password, identityParam, nickname) => {
    const user = await userDao.addUser(userId, phoneNumber, password, identityParam, nickname);
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

exports.addSendResume = async (resumeId, userId, recruitersId) => {
    const sendResume = await userDao.addSendResume(resumeId, userId, recruitersId);
    return sendResume;
};
//头像上传
exports.uploadAvatar = async (userAvatar) => {
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

    const upload = await axios.put(
        'https://picx.gdmuna.com/api/fs/put',
        {
            file: userAvatar.file
        },
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': token,
                'Content-Length': userAvatar.size,
                'File-Path': '/sideline/img/' + userAvatar.name
            }
        }
    );
    if (upload.data.message === 'success') {
        const filePath = '/sideline/img/' + userAvatar.name;
        const file = await userDao.uploadAvatar(userAvatar.userId, filePath);
        return file;
    } else {
        return false;
    }
};
