const Teacher = require('../models/teacher');

const getTeacherName = async (req, res) => {
    try {
        const teacherId = req.params.teacherId;
        const teacher = await Teacher.findOne({ user: teacherId }).populate('user');
        console.log(teacherId)
        console.log( teacher)
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const { firstName, lastName } = teacher.user;
        const fullName = `${firstName} ${lastName}`;

        res.json({ fullName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const getTeacherProfile = async (req, res) => {
    try {
        const teacherId = req.params.teacherId;
        const teacher = await Teacher.find({ user: teacherId }).populate('user');

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        res.json(teacher);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
module.exports = {
    getTeacherName,
    getTeacherProfile,
};
