import { LoginInfo } from 'interfaces';
import {diskStorage} from 'multer';
import { extname } from 'path';

// you can use this code for diskstorage 
const storageInfo = diskStorage({
    destination: './uploads',
    filename: (req,file,cb)=> {
        const extension = extname(file.originalname);
        const user = req.user as LoginInfo;
        const randomName = user.id;
        cb(null, `${randomName}${extension}`);
    }
})

export default storageInfo;