const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const app = require("../app")
const request = require('supertest')

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("app", ()=>{
    it("api/not-an-endpoint", ()=>{
        return request(app).get("/api/not-an-endpoint").expect(404).then(({body}) => {
            expect(body.msg).toBe("Path not found!")
        })
    })

describe("GET /api/topics", ()=>{
    it("should return status 200 and an object with key name : array of objects", ()=>{
        return request(app).get("/api/topics").expect(200).then(({body})=>{
            expect(body.topics.length).toBe(3)
            body.topics.forEach((topic)=>{
                expect(topic).toEqual(
                    expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String)
                        })
                    )
                })
            })
        })
    });

describe("GET /api/articles/", ()=>{
    it("should return status 200 and article matching the input article_id param", ()=>{
        return request(app).get(`/api/articles/1`).expect(200).then(({body})=>{
            expect(body.article).toEqual({
                article_id: 1,
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: expect.any(String),
                votes: 100,
                comment_count: '11'
            })
        })
    })

    it("should return status 200 and article matching the input article_id param", ()=>{
        return request(app).get(`/api/articles/2`).expect(200).then(({body})=>{
            expect(body.article).toEqual({
                article_id: 2,
                title: 'Sony Vaio; or, The Laptop',
                topic: 'mitch',
                author: 'icellusedkars',
                body: 'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
                created_at: expect.any(String),
                votes: 0,
                comment_count: '0'
            })
        })
    })
    it("should return status 400 when input article_id in invalid", ()=>{
        return request(app).get(`/api/articles/dogs`).expect(400).then(({body})=>{
            expect(body.msg).toEqual(`Invalid Input!`)
        })
    })
})

});


// 400 bad request api/articles/dogs //
// 404 not found api/articles/21 - valid but doesn't exist 
// 200 ok api/article/2 - valid but no comments - how to do this //

// - 200 OK
// - 201 Created
// - 204 No Content
// - 400 Bad Request
// - 404 Not Found
// - 405 Method Not Allowed
// - 418 I'm a teapot
// - 422 Unprocessable Entity
// - 500 Internal Server Error

