import dotenv from 'dotenv';
dotenv.config();

import mongoose, { Mongoose } from 'mongoose';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import express, { Request, Response } from 'express';
import { JWT_SECRET, MONGO_URL } from './config';
import { contentModel, linkModel, userModel } from './db';
import { userMiddleware } from './middleware';
import { random } from './utils';
const app = express();

app.use(express.json());

app.post("/api/v1/signup", async(req: Request, res: Response)=>{
    const username = req.body.username;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        await userModel.create({
            username,
            password: hashedPassword,
        });
        res.json({
            message: "you are successfully signed up"
        });
    } catch(e){
        res.status(403).json({
            message: "username is already exists"
        });
    }
});

app.post("/api/v1/signin", async(req: Request, res: Response)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = await userModel.findOne({
        username,
    });
    if(!user || !user.password){
        res.status(403).json({
            message: "wrong username"
        });
    } else {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            res.status(403).json({
                message: "wrong password"
            });
        } else {
            const token = jwt.sign({
                userId: user._id.toString(),
            }, JWT_SECRET);
            res.json({
                message: "you are signed in",
                token, 
            });
        }
    }
});

app.post("/api/v1/content", userMiddleware, async(req: Request, res: Response)=>{
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    const tags = req.body.tags;
    //@ts-ignore
    const userId = req.userId;
    const content = await contentModel.create({
        link,
        title,
        type,
        tags,
        userId,
    });
    res.json({
        message: "content created successfully",
        contentId: content._id.toString(),
    });
});

app.get("/api/v1/content", userMiddleware, async(req: Request, res: Response)=>{
    //@ts-ignore
    const userId = req.userId;
    const contents = await contentModel.find({
        userId: userId
    });
    res.json({
        message: "your all contents are: ",
        contents,
    });
});

app.delete("/api/v1/content", userMiddleware, async(req: Request, res: Response)=>{
    const contentId = req.body.contentId;
    //@ts-ignore
    const userId = req.userId;
    const deleteContent = await contentModel.deleteOne({
        _id: contentId,
        userId,
    });
    if(deleteContent.deletedCount){
        res.json({
            message: `content id ${contentId} is deleted successfully`
        });
    } else {
        res.json({
            message: "wrong content id"
        });
    }
});

app.post("/api/v1/brain/share", userMiddleware, async(req: Request, res: Response)=>{
    const status = req.body.status;
    //@ts-ignore
    const userId = req.userId;
    if(status){
        const existingUser = await linkModel.findOne({
            userId,
        });

        if(existingUser){
            res.json({
                message: "here is your share link",
                sharelink: "/api/v1/brain/" + existingUser.hash,
            });
            return;
        }

        const hash = random(15);
        const createLink = await linkModel.create({
            hash,
            userId,
        });
        res.json({
            message: "link created successfully",
            hash: "/api/v1/brain/" + hash,
        });

    } else {
        const deleteLink = await linkModel.deleteOne({
            userId,
        });
        if(deleteLink.deletedCount){
            res.json({
                message: "your brain share is stop"
            });  
        }
    }
});

app.get("/api/v1/brain/:sharelink", async(req: Request, res: Response)=>{
    const hash = req.params.sharelink;
    const link = await linkModel.findOne({
        hash: hash as string,
    })
    if(!link){
        res.status(411).json({
            message: "wrong link"
        });
        return ;
    }
    const content = await contentModel.find({
        userId: link.userId as mongoose.Types.ObjectId,
    });
    if(!content){
        res.status(411).json({
            message: "some error while fetching contents"
        });
        return;
    }

    const user = await userModel.findOne({
        _id: link.userId,
    });
    if(!user){
        res.status(411).json({
            message: "error while fetching username from user db"
        });
        return;
    }
    res.json({
        username: user.username,
        contents: content,
    });

});

async function main(){
    await mongoose.connect(MONGO_URL);
    app.listen(3000);
}

main();