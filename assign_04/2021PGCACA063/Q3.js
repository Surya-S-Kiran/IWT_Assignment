const express =  require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let userIds = []
let userInfos = []

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/login.html')
})

app.post('/login', (req, res) => { 
    const { psw, uid } = req.body;
    const userIndex = userIds.indexOf(uid) //getting index of uid
    if (userIndex > -1) {
        if (userInfos[userIndex].psw === psw) {
            res.send('Welcome back ' + userInfos[userIndex].uname + '!')
        } else {
            res.send('Invalid Login!')
        }
    } else {
        res.send('Wrong user id!')
    }
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/html/register.html')
})

app.post('/register', (req, res) => { 
    const { uname } = req.body;
    const firstName = uname.split(' ')[0];
    const existingIds = userIds.filter((id) => id.startsWith(firstName.toLowerCase()+'.'));
    let highestNumber = 0;
    existingIds.forEach(id => {
        const idNumber = parseInt(id.split('.')[1])
        if (idNumber > highestNumber) {
            highestNumber = idNumber
        }
    });
    let userId = `${firstName.toLowerCase()}.${highestNumber + 1}`;
    userIds.push(userId)
    userInfos.push(req.body)
    res.send('Welcome to the club! ' + uname + ' your user id is ' + userId);
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})
