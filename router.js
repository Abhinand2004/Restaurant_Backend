import { Router } from "express";
import * as rh from './reqhandler.js'
const router=Router();

router.route('/createmenu').post(rh.createmenu)
router.route('/getmenu').get(rh.getAllMenus)
router.route('/createitem').post(rh.createMenuItem)
router.route('/getmenuitem/:id').get(rh.getmenuitem)
router.route('/deletemenu/:id').delete(rh.deletemenu)
router.route('/deletemenuitem/:id').delete(rh.deletemenuitem)
router.route('/editmenu/:id').put(rh.edititems)

export default router;