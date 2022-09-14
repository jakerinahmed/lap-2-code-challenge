function getAllEntries() {
    fetch('http://localhost:3000/posts')
        .then(r => r.json())
        .then(appendEntries)
        .catch(console.warn)
};

function appendEntries(entries) {
    entries.forEach(appendEntry)
}

function appendEntry(entryData) {
    const newDiv = document.createElement('div')
    newDiv.className = 'card'

    const cardBody = document.createElement('div')
    cardBody.className = 'card-body'

    const title = document.createElement('h5')
    title.className = 'card-title'
    title.textContent = entryData.title

    const authorName = document.createElement('h6')
    authorName.className = "card-subtitle mb-2 text-muted"
    authorName.textContent = entryData.author

    const story = document.createElement('p')
    story.className = 'card-text'
    story.textContent = entryData.story

    newDiv.appendChild(cardBody)
    cardBody.appendChild(title)
    cardBody.appendChild(authorName)
    cardBody.appendChild(story)

    const previousPosts = document.querySelector('.previous-posts')
    previousPosts.append(newDiv)
}

function submitEntry(e) {

    e.preventDefault();

    if (!e.target.postTitle.value || !e.target.postAuthor.value || !e.target.postStory.value) {
        document.querySelector('#postTitle').placeholder = "Enter a title!"
        document.querySelector('#postAuthor').placeholder = "Enter your name!"
        document.querySelector('#postStory').placeholder = "Write something!"
    }
    else {
        const entryData = {
            title: e.target.postTitle.value,
            name: e.target.postAuthor.value,
            story: e.target.postStory.value
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(entryData),
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch('http://localhost:3000/posts', options)
            .then(r => r.json())
            .catch(console.warn)
    }

};

const publishBtn = document.querySelector('#new-post-form')
publishBtn.addEventListener('submit', submitEntry)

getAllEntries()
