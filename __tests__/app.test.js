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

    describe("GET /api/topics/", ()=>{
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

    describe("GET /api/articles/:article_id", ()=>{
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
                comment_count: 11
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
                comment_count: 0
            })
        })
    })
    it("should return status 400 when input article_id is invalid", ()=>{
        return request(app).get(`/api/articles/invalid`).expect(400).then(({body})=>{
            expect(body.msg).toEqual(`Invalid Input!`)
        })
    })
    it("should return status 404 when input article_id is valid but doesn't exist", ()=>{
        return request(app).get(`/api/articles/100`).expect(404).then(({body})=>{
            expect(body.msg).toEqual('No article found!')
        })
     })
    });

    describe("PATCH /api/articles/:article_id", () => {
    const increaseVotes = { inc_votes : 1 }
    it("should return status 200 and increase votes by 1", ()=>{
        return request(app).patch("/api/articles/1").send(increaseVotes).expect(200).then(({body})=>{
            expect(body.article).toEqual({
                article_id: 1,
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: expect.any(String),
                votes: 101
            })
        })
    });

    it("should return status 400 when input article_id is invalid", ()=>{
        return request(app).patch(`/api/articles/invalid`).send(increaseVotes).expect(400).then(({body})=>{
            expect(body.msg).toEqual(`Invalid Input!`)
        })
    });

    it("should return status 404 when input article_id is valid but doesn't exist", ()=>{
        return request(app).patch(`/api/articles/100`).send(increaseVotes).expect(404).then(({body})=>{
            expect(body.msg).toEqual('No article found!')
        })
     });
     
     it("should return status 400 with invalid inc_votes input e.g.{ inc_votes: 'cat'}", ()=>{
         const badPatchRequest = { inc_votes: 'cat'}
        return request(app).patch(`/api/articles/1`).send(badPatchRequest).expect(400).then(({body})=>{
            expect(body.msg).toEqual('Invalid Input!')
        })
     }); 

     it("should return status 400 when there is more than one property on the request body e.g.{ inc_votes: 'cat', name: 'mitch' }", ()=>{
        const badPatchRequest = { inc_votes: 'cat', name: 'mitch' }
       return request(app).patch(`/api/articles/1`).send(badPatchRequest).expect(400).then(({body})=>{
           expect(body.msg).toEqual('Invalid Input!')
       })
    }); 

    it("should return status 400 with invalid inc_votes input e.g.{ incVotes: 1 }", ()=>{
        const badPatchRequest = { not_inVotes: 1 }
       return request(app).patch(`/api/articles/1`).send(badPatchRequest).expect(400).then(({body})=>{
           expect(body.msg).toEqual('Invalid Input!')
       })
    });    

    });

    describe("GET /api/articles", ()=>{

    it("should return status 200 and an articles array of article objects ", ()=>{
        return request(app).get("/api/articles").expect(200).then(({body})=>{
            expect(body.articles).toBeInstanceOf(Array);
            expect(body.articles).toHaveLength(12);
            body.articles.forEach((article) =>{
                expect(article).toMatchObject({
                    article_id: expect.any(Number),
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(Number)
                })
         })
     })
    });
    
    it("should return status 200 and the articles array sort_by defaulted to date", ()=>{
        return request(app).get("/api/articles").expect(200).then(({body})=>{
            expect(body.articles).toBeInstanceOf(Array);
            expect(body.articles).toHaveLength(12);
            expect(body.articles).toBeSortedBy('created_at', {
                descending: true })

        })
    });

    it("should return status 200 and the articles array sort_by votes", ()=>{
        return request(app).get("/api/articles?sort_by=votes").expect(200).then(({body})=>{
            expect(body.articles).toBeInstanceOf(Array);
            expect(body.articles).toHaveLength(12);
            expect(body.articles).toBeSortedBy('votes', { descending: true })
        })
    });

    it("should return status 200 and the articles array order by default to descending", ()=>{
        return request(app).get("/api/articles?sort_by=article_id").expect(200).then(({body})=>{
            expect(body.articles).toBeInstanceOf(Array);
            expect(body.articles).toHaveLength(12);
            expect(body.articles).toBeSorted({ descending: true })
        })
    });

    it("should return status 200 and the articles array order should be ascending", ()=>{
        return request(app).get("/api/articles?order=asc").expect(200).then(({body})=>{
            expect(body.articles).toBeInstanceOf(Array);
            expect(body.articles).toHaveLength(12);
            expect(body.articles).toBeSorted()
        })
    });

    it("should return status 200 and the articles filtered by topic value specified in the query", ()=>{
        return request(app).get("/api/articles?topic=cats").expect(200).then(({body})=>{
            // expect(body.articles).toBeInstanceOf(Array);
            expect(body.articles).toHaveLength(1);
            expect(body.articles[0].topic).toEqual('cats')
        })
    })

    it("should return status 200 and the articles filtered by author value specified in the query", ()=>{
        return request(app).get("/api/articles?author=butter_bridge").expect(200).then(({body})=>{
            expect(body.articles).toBeInstanceOf(Array);
            expect(body.articles).toHaveLength(3);
            expect(body.articles[0].author).toEqual('butter_bridge')
        })
    })

    it("should return status 400 when sort_by column does not exist", ()=>{
        return request(app).get("/api/articles?sort_by=does_not_exist").expect(400).then(({body})=>{
            expect(body.msg).toEqual("Invalid sort_by query!")
            });
        });
    
    it("should return status 400 when order query !== asc || desc", ()=>{
        return request(app).get("/api/articles?order=orange").expect(400).then(({body})=>{
            expect(body.msg).toEqual("Invalid order query!")
            });
        });

    it("should return status 404 when topic exists but does not have any articles associated with it", ()=>{
        return request(app).get("/api/articles?topic=paper").expect(404).then(({body})=>{
            expect(body.msg).toEqual("No articles found!")
            });
        });

    it("should return status 404 when author exists but does not have any articles associated with it", ()=>{
        return request(app).get("/api/articles?author=lurker").expect(404).then(({body})=>{
            expect(body.msg).toEqual("No articles found!")
            });
        });    

    it("should return status 400 when input topic is invalid", ()=>{
        return request(app).get(`/api/articles?topic=apples`).expect(400).then(({body})=>{
            expect(body.msg).toEqual(`Invalid query!`)
            });
        });
         
    it("should return status 400 when input author is invalid", ()=>{
        return request(app).get(`/api/articles?author=kiwi`).expect(400).then(({body})=>{
            expect(body.msg).toEqual(`Invalid query!`)
            });
        });
        
    
    
    

    });

});

// GET /api/articles
// Bad queries:
// author / topic that is not in the database



// - 200 OK
// - 201 Created
// - 204 No Content
// - 400 Bad Request
// - 404 Not Found
// - 405 Method Not Allowed
// - 418 I'm a teapot

