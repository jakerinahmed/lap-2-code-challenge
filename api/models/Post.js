const db = require('../dbConfig/init');

module.exports = class Post {
    constructor(data){
        this.id = data.id;
        this.title = data.title;
        this.name = data.name;
        this.story = data.story;
    };

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                const postData = await db.query('SELECT * FROM posts;')
                const posts = postData.rows.map(a => new Post(a))
                resolve(posts);
            } catch (err) {
                reject("Error retrieving posts")
            }
        })
    };

    static async create(postData){
        return new Promise (async (resolve, reject) => {
            try {
                let { title, name, story } = postData;
              
                let result = await db.query(`INSERT INTO posts (title, name, story) VALUES ($1, $2, $3) RETURNING *;`, [ title, name, story ]); 

                resolve (result.rows[0]);
            } catch (err) {
                reject('Post could not be created');
            }
        });
    };

};
