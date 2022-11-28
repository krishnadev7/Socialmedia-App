import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import bodyparser from 'body-parser'
import { fileURLToPath } from 'url';

// routes & controllers imports
import authRoute from './routes/auth.js'
import userRoute from './routes/users.js'
import PostRoute from './routes/post.js'
import { Register } from './controllers/auth.js';
import { verifyToken } from './middleware/auth.js';
import { createPost } from './controllers/post.js';
import { User } from './models/UserModel.js';
import { Post } from './models/PostModel.js';
import { users,posts } from './data/data.js';

// configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan('common'));
app.use(bodyparser.json({limit: '30mb', extended: true}));
app.use(bodyparser.urlencoded({limit: '30mb', extended: true}))
app.use('/assets', express.static(path.join(__dirname,'public/assets')));

//multer file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({storage})

// Routes with file upload
app.post('/auth/register', upload.single("picture"), Register)
app.post('/posts',verifyToken,upload.single("picture"),createPost)

// Routes
app.use('/auth',authRoute);
app.use('/users',userRoute);
app.use('/posts',PostRoute);

// MongoDb connection
const PORT = process.env.PORT || 8800
const Connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        app.listen(PORT,() => {
            console.log(`SERVER CONNCETED ON PORT http://localhost:${PORT}`);

            // only uncommend this code when to add data.
            // User.insertMany(users);
            // Post.insertMany(posts);
        })
    } catch (error) {
        console.log(error);
    }
}
Connect();
