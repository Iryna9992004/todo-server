const Router=require('express');
const router=new Router();
const authController=require('../controllers/AuthController');
const {check}=require('express-validator');
const authMiddleware=require('../middleware/AuthMiddleware');
const TaskController=require('../controllers/TaskController')

router.post('/registration',
    check("login","Not valid login").notEmpty(),
    check("password","At least 7 symbols").isLength({min:7}),
authController.registration);
router.post('/login',authController.login);
router.get('/users', authMiddleware, authController.getUsers);

router.post('/addTask',authMiddleware,TaskController.addTask);
router.post('/deleteTask',authMiddleware, TaskController.deleteTask);
router.post('/editTask',authMiddleware, TaskController.editTask);
router.post('/taskList',authMiddleware,TaskController.taskList);
router.post('/markAsImportant',authMiddleware,TaskController.markAsImportant);
router.post('/getTask',authMiddleware,TaskController.getElement)

router.post('/addSubtask',authMiddleware,TaskController.addSubTask)
router.post('/subtaskList',authMiddleware, TaskController.subtaskList);

module.exports=router;