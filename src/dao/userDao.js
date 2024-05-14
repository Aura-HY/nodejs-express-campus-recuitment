const db = require('../utils/dbConnPool/mariadb');

exports.getJobList = async () => {
    const sql = `
        SELECT
            p.job_id AS jobId,
            p.title_job AS titleJob,
            p.job_description AS jobDescription,
            p.requirement_label AS requirementLabel,
            p.requirements_l AS requirementsL,
            p.salary,
            p.salary_unit AS salaryUnit,
            p.location,
            u.user_avatar AS userAvatar,
            u.nickname,
            p.recruiters_id AS recruitersId
        FROM
            position_job p
        INNER JOIN
            user_basic_table u
        ON
            u.user_id=p.recruiters_id
    `;
    return await db.query(sql);
};

exports.getTypeList = async () => {
    const sql = `
        SELECT
            param_meaning AS paramMeaning,
            param_id AS paramId
        FROM
            system_param_dict
        WHERE
            dict_id = 1;
    `;
    return await db.query(sql);
};

exports.getTypeJob = async (typeId) => {
    const sql = `
        SELECT
            p.job_id AS jobId,
            p.title_job AS titleJob,
            p.job_description AS jobDescription,
            p.requirement_label AS requirementLabel,
            p.requirements_l AS requirementsL,
            p.salary,
            p.salary_unit AS salaryUnit,
            p.location,
            u.user_avatar AS userAvatar,
            u.nickname 
        FROM
            position_job p
        INNER JOIN
            user_basic_table u
        ON
            u.user_id=p.recruiters_id
        WHERE
            p.type_job = ?
    `;
    const sqlParams = [typeId];
    return await db.query(sql, sqlParams);
};

exports.addCollect = async (userId, jobId) => {
    const sql = `
        INSERT INTO
            favorites_table (user_id,job_id) 
        VALUES
            (?, ?)
    `;
    const sqlParams = [userId, jobId];
    return await db.query(sql, sqlParams);
};

exports.addReport = async (userId, jobId, reportTime) => {
    const sql = `
        INSERT INTO
            report (user_id,job_id,report_time) 
        VALUES
            (?, ?, ?)
    `;
    const sqlParams = [userId, jobId, reportTime];
    return await db.query(sql, sqlParams);
};

exports.addUser = async (userId, password, identityParam, userAvatar) => {
    const sql = `
        INSERT INTO
            user_basic_table (user_id, password, identity_param, user_avatar) 
        VALUES
            (?, ?, ?, ?)
    `;
    const sqlParams = [userId, password, identityParam, userAvatar];
    return await db.query(sql, sqlParams);
};

exports.getUserPassword = async (userId) => {
    const sql = `
        SELECT
            password,
            nickname
        FROM
            user_basic_table
        WHERE
            user_id = ?
    `;
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};

exports.getResume = async (userId) => {
    const sql = `
        SELECT
            resume_id AS resumeId,
            resume_name AS resumeName,
            phone,
            wechat,
            health_certificate AS healthCertificate,
            curriculum_vitae AS curriculumVitae,
            work_experience AS workExperience,
            honor_certificate AS honorCertificate
        FROM
            Resume
        WHERE
            user_id = ?
    `;
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};

exports.addSendResume = async (resumeId, userId, jobId, recruitersId, time) => {
    const sql = `
        INSERT INTO
            resume_submission_status (resume_id,user_id,job_id,recruiters_id,time,resume_status) 
        VALUES
            (?, ?, ?, ?, ?, 1)
    `;
    const sqlParams = [resumeId, userId, jobId, recruitersId, time];
    return await db.query(sql, sqlParams);
};

exports.uploadAvatar = async (userId, filePath) => {
    const sql = `
        INSERT INTO
            user_basic_table (user_id,user_avatar) 
        VALUES
            (?, ?)
    `;
    const sqlParams = [userId, filePath];
    return await db.query(sql, sqlParams);
};

exports.getJobDetail = async (jobId) => {
    const sql = `
        SELECT
            p.job_id AS jobId,
            p.title_job AS titleJob,
            p.job_description AS jobDescription,
            p.requirement_label AS requirementLabel,
            p.requirements_l AS requirementsL,
            p.salary,
            p.salary_unit AS salaryUnit,
            p.location,
            p.recruiters_id AS recruitersId
        FROM
            position_job p
        WHERE
            p.job_id = ?
    `;
    const sqlParams = [jobId];
    return await db.query(sql, sqlParams);
};

exports.getMessage = async () => {
    const sql = `
        SELECT
            
    `;
    return await db.query(sql);
};

exports.getNotice = async () => {
    const sql = `
        SELECT
            time,
            title,
            content
        FROM
            Notice
        ORDER BY
            time 
        DESC
    `;
    return await db.query(sql);
};

exports.getMessageList = async (recruitersId) => {
    const sql = `
        SELECT
            message_time AS messageTime,
            message_content AS messageContent,
            message_type AS messageType,
            message_id AS messageId
        FROM
            Message
        WHERE
            recruiters_id = ?
        ORDER BY
            message_id
    `;
    const sqlParams = [recruitersId];
    return await db.query(sql, sqlParams);
};

exports.addMessage = async (content, jobSeekerId, recruitersId, messageTime) => {
    const sql = `
        INSERT INTO
            Message (message_content, job_seeker_id, recruiters_id, message_time, message_type) 
        VALUES
            (?, ?, ?, ?, 1)
    `;
    const sqlParams = [content, jobSeekerId, recruitersId, messageTime];
    return await db.query(sql, sqlParams);
};

exports.getMessageMan = async (userId) => {
    const sql = `
    SELECT
        m.message_id AS messageId,
        m.recruiters_id AS recruitersId,
        m.message_time AS messageTime,
        m.message_content AS messageContent,
        u.user_avatar AS userAvatar,
        u.nickname
    FROM
        Message m
    INNER JOIN
        user_basic_table u
    ON
        m.recruiters_id = u.user_id
    WHERE
        m.job_seeker_id = ?
    GROUP BY
        m.recruiters_id
    ORDER BY
        message_time
    DESC
    `;
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};

exports.deleteMessage = async (messageId) => {
    const sql = `
    DELETE FROM 
        Message
    WHERE 
        message_id = ?
    `;
    const sqlParams = [messageId];
    return await db.query(sql, sqlParams);
};

//景清
// 读取用户的简历
exports.getUserResumes = async (userId) => {
    const sql = `
        SELECT
            resume_name AS resumeName,
            user_id AS userId,
            resume_id AS resumeId
        FROM
            Resume
        WHERE
            user_id = ?
        `;
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};
// 读取用户简历的详细信息
exports.getUserResumesInfo = async (resumeId) => {
    const sql = `
        SELECT
            resume_name AS resumeName,
            name,
            gender,
            grade,
            academy,
            class_number AS classNumber,
            student_id AS studentId,
            wechat,
            phone,
            health_certificate AS healthCertificate,
            curriculum_vitae AS curriculumVitae,
            work_experience AS workExperience,
            honor_certificate AS honorCertificate
        FROM
            Resume
        WHERE
            resume_id = ?
    `;
    const sqlParams = [resumeId];
    return await db.query(sql, sqlParams);
};
// 读取用户的昵称和头像
exports.getUserBasic = async (userId) => {
    const sql = `
        SELECT
            nickname,
            user_avatar AS userAvatar
        FROM
            user_basic_table
        WHERE
            user_id = ?
    `;
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};
// 统计用户收藏的简历份数总数
exports.favoritesCollectionsSum = async (userId) => {
    const sql = `
        SELECT
            COUNT(*) AS sum
        FROM
            favorites_table
        WHERE
            user_id = ?
    `;
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};
// 统计用户沟通过的聊天总数
exports.resumeTrueSum = async (userId) => {
    const sql = `
        SELECT
            COUNT(*) AS resumeTrueSum
        FROM
            Message
        JOIN
            user_basic_table
        ON
            Message.job_seeker_id = user_basic_table.user_id
        WHERE
            user_basic_table.user_id = ?
    `;
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};
// 统计用户已投简历总数
exports.sessionSum = async (userId) => {
    const sql = `
        SELECT
            COUNT(*) AS sessionSum
        FROM
            resume_submission_status
        JOIN
            user_basic_table
        ON
            resume_submission_status.user_id = user_basic_table.user_id
        WHERE
            user_basic_table.user_id = ? AND resume_status = 1
        `;
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};
// 统计用户待面试总数
exports.interviewedSum = async (userId) => {
    const sql = `
        SELECT
            COUNT(*) AS interviewedSum
        FROM
            resume_submission_status
        JOIN
            user_basic_table
        ON
            resume_submission_status.user_id = user_basic_table.user_id
        WHERE
            user_basic_table.user_id = ? AND resume_status = 2
        `;
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};
// 添加用户新简历
exports.addNewResumeInfo = async (resumeName, name, gender, grade, academy, classNumber, studentId, wechat, phone, healthCertificate, curriculumVitae, workExperience, honorCertificate, userId) => {
    const sql = `
        INSERT INTO
            Resume(resume_name, name, gender, grade, academy, class_number, student_id, wechat, phone, health_certificate, curriculum_vitae, work_experience, honor_certificate, user_id) 
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const sqlParams = [resumeName, name, gender, grade, academy, classNumber, studentId, wechat, phone, healthCertificate, curriculumVitae, workExperience, honorCertificate, userId];
    return await db.query(sql, sqlParams);
};
//读取用户收藏的职位
exports.getUserFavoritesJob = async (userId) => {
    const sql = `
    SELECT
        favoritesTable.job_id AS jobId,
        positionJob.title_job AS titleJob,
        positionJob.job_description AS jobDescription,
        positionJob.requirement_label AS requirementLabel,
        positionJob.requirements_l AS requirementsL,
        positionJob.salary,
        positionJob.salary_unit AS salaryUnit,
        positionJob.location,
        userBasicTable.user_avatar AS userAvatar,
        userBasicTable.nickname
    FROM
        favorites_table AS favoritesTable
    INNER JOIN
        position_job AS positionJob
    ON
        favoritesTable.job_id = positionJob.job_id
    INNER JOIN
        user_basic_table AS userBasicTable
    ON
        positionJob.recruiters_id = userBasicTable.user_id
    WHERE
        favoritesTable.user_id = 345
    `;
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};
// 修改用户的简历信息
exports.reviseResume = async (resumeName, name, gender, grade, academy, classNumber, studentId, wechat, phone, healthCertificate, curriculumVitae, workExperience, honorCertificate, resumeId) => {
    const sql = `
        UPDATE
            Resume
        SET
            resume_name = ?,
            name = ?,
            gender = ?,
            grade = ?,
            academy = ?,
            class_number = ?,
            student_id = ?,
            wechat = ?,
            phone = ?,
            health_certificate = ?,
            curriculum_vitae = ?,   
            work_experience = ?,
            honor_certificate = ?
        WHERE
            resume_id = ? 
    `;
    const sqlParams = [resumeName, name, gender, grade, academy, classNumber, studentId, wechat, phone, healthCertificate, curriculumVitae, workExperience, honorCertificate, resumeId];
    return await db.query(sql, sqlParams);
};
