"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    try {
        await db_1.userModel.create({
            username,
            password: hashedPassword,
        });
        res.json({
            message: "you are successfully signed up"
        });
    }
    catch (e) {
        res.status(403).json({
            message: "username is already exists"
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await db_1.userModel.findOne({
        username,
    });
    if (!user || !user.password) {
        res.status(403).json({
            message: "wrong username"
        });
    }
    else {
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            res.status(403).json({
                message: "wrong password"
            });
        }
        else {
            const token = jsonwebtoken_1.default.sign({
                userId: user._id.toString(),
            }, config_1.JWT_SECRET);
            res.json({
                message: "you are signed in",
                token,
            });
        }
    }
});
app.post("/api/v1/content", middleware_1.userMiddleware, async (req, res) => {
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    const tags = req.body.tags;
    //@ts-ignore
    const userId = req.userId;
    const content = await db_1.contentModel.create({
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
app.get("/api/v1/content", middleware_1.userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const contents = await db_1.contentModel.find({
        userId: userId
    });
    res.json({
        message: "your all contents are: ",
        contents,
    });
});
app.delete("/api/v1/content", middleware_1.userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    //@ts-ignore
    const userId = req.userId;
    const deleteContent = await db_1.contentModel.deleteOne({
        _id: contentId,
        userId,
    });
    if (deleteContent.deletedCount) {
        res.json({
            message: `content id ${contentId} is deleted successfully`
        });
    }
    else {
        res.json({
            message: "wrong content id"
        });
    }
});
app.post("/api/v1/brain/share", middleware_1.userMiddleware, async (req, res) => {
    const status = req.body.status;
    //@ts-ignore
    const userId = req.userId;
    if (status) {
        const existingUser = await db_1.linkModel.findOne({
            userId,
        });
        if (existingUser) {
            res.json({
                message: "here is your share link",
                sharelink: "/api/v1/brain/" + existingUser.hash,
            });
            return;
        }
        const hash = (0, utils_1.random)(15);
        const createLink = await db_1.linkModel.create({
            hash,
            userId,
        });
        res.json({
            message: "link created successfully",
            hash: "/api/v1/brain/" + hash,
        });
    }
    else {
        const deleteLink = await db_1.linkModel.deleteOne({
            userId,
        });
        if (deleteLink.deletedCount) {
            res.json({
                message: "your brain share is stop"
            });
        }
    }
});
app.get("/api/v1/brain/:sharelink", async (req, res) => {
    const hash = req.params.sharelink;
    const link = await db_1.linkModel.findOne({
        hash: hash,
    });
    if (!link) {
        res.status(411).json({
            message: "wrong link"
        });
        return;
    }
    const content = await db_1.contentModel.find({
        userId: link.userId,
    });
    if (!content) {
        res.status(411).json({
            message: "some error while fetching contents"
        });
        return;
    }
    const user = await db_1.userModel.findOne({
        _id: link.userId,
    });
    if (!user) {
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
async function main() {
    await mongoose_1.default.connect(config_1.MONGO_URL);
    app.listen(3000);
}
main();
