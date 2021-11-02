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

describe("GET /api/articles", ()=>{
    it("should return status 200 and article matching the input article_id param", ()=>{
        return request(app).get(`/api/articles/1`).expect(200).then(({body})=>{
            // expect(body.article_id).toEqual(1)
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
})

});

