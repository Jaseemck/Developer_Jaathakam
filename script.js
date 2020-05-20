//Global Variables
var follow_1,follow_2; 
var star_1,star_2;
var repo_1,repo_2;
var fork_1,fork_2;
var fan_1,fan_2;
//-----------------------------------------------------------------------
class finder
{
    async fetchUsers(user,c,load)
        {
            let loader = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
            document.getElementById(load).innerHTML = loader;
            const profile = await fetch(`https://api.github.com/users/${user}`)
            const data = await profile.json() ;
            document.getElementById(load).innerHTML = "";
            if(data.message)
                {
                    document.getElementById(load).innerHTML = `<br/><b style="color: red;">User Not Found</b>`;
                }
            else
                {
                    const repositories = await fetch(data.repos_url);
                    const repos = await repositories.json();
                    
                    if (data) 
                        {
                            this.deletedata(c)
                            this.addUserToList(data,repos,c)
                        }
                }
        }

    addUserToList(data,repos,c)
        {
            const list = document.querySelector(c);
            const table = document.createElement('table');
            table.className="table border table-striped mt-5";
            let stars = 0, fork = 0
            for( var i = 0;i<repos.length;i+=1)
                {
                    stars += repos[i].watchers_count
                    fork += repos[i].forks
                }
            star_1 = stars
            follow_1 = data.followers
            repo_1 = repos.length
            fork_1 = fork 
            fan_1 = data.following
            table.innerHTML = `
                <div id="class">
                <tr>
                    <td style="color:black";><b>Name :</b> ${data.name}</td>
                </tr>

                <tr>
                    <td style="color:black";><b>Location :</b> ${data.location} </td>
                </tr>

                <tr>
                    <td style="color:black";><b>Created at :</b> ${data.created_at}</td>
                </tr>

                <tr>
                    <td style="color:black";><b>Github Url :</b> <a href="${data.html_url}">${data.html_url}</a></td>
                </tr>
                </div>
            `;

            list.appendChild(table);
        }

    deletedata(c)
        {
            var e = document.querySelector(c); 
            var child = e.lastElementChild;  
            e.removeChild(child)
        }
}
//---------------------------------------------------------------------------------------------------

class finder2
{
    async fetchUsers(user,c,load)
        {
            let loader = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
            document.getElementById(load).innerHTML = loader;
            const profile = await fetch(`https://api.github.com/users/${user}`)
            const data = await profile.json() ;
            document.getElementById(load).innerHTML = "";
            if(data.message)
                {
                    document.getElementById(load).innerHTML = `<br/><b style="color: red;">User Not Found</b>`;
                }
            else
                {
                    const repositories = await fetch(data.repos_url);
                    const repos = await repositories.json();
                    
                    if (data) 
                        {
                            this.deletedata(c)
                            this.addUserToList(data,repos,c)
                        }
                }
        }

    addUserToList(data,repos,c)
        {
            const list = document.querySelector(c);
            const table = document.createElement('table');
            table.className="table border table-striped mt-5";
            let stars = 0, fork = 0
            for( var i = 0;i<repos.length;i+=1)
                {
                    stars += repos[i].watchers_count
                    fork += repos[i].forks
                }
                star_2 = stars
                follow_2 = data.followers
                repo_2 = repos.length
                fork_2 = fork 
                fan_2 = data.following
            table.innerHTML = `
                <div id="class">
                <tr>
                    <td style="color:black";><b>Name :</b> ${data.name}</td>
                </tr>

                <tr>
                    <td style="color:black";><b>Location :</b> ${data.location} </td>
                </tr>
                <tr>
                    <td style="color:black";><b>Created at :</b> ${data.created_at}</td>
                </tr>

                <tr>
                    <td style="color:black";><b>Github Url :</b> <a href="${data.html_url}">${data.html_url}</a></td>
                </tr>
                </div>
            `;

            list.appendChild(table);
        }

    deletedata(c)
        {
            var e = document.querySelector(c); 
            var child = e.lastElementChild;  
            e.removeChild(child)
        }
}


//---------------------------------------------------------------------------------------------------

const debounce = (func,delay) => {
    let timer;
    return function(...args){
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout( () => {
        func(...args)
      },delay)
} }


const search = document.getElementById('username');
const search1 = document.getElementById('username1');
let users;

// FIlter states
async function searchUser(searchText,id,search,clear){
    const matchList = document.getElementById(id);
    if(searchText !== "")
    {
        const res =  await fetch(`https://api.github.com/search/users?q=${searchText}`);
        users = await res.json();
        if(users.total_count === 0)
        {
            matchList.innerHTML = ""
        }
        else
        {
            let matches;
            matches = users.items.filter(user => {
            const regex = new RegExp(`^${searchText}`, 'gi');
            return user.login.match(regex);
            });

            const html = matches.slice(0,6).map(match => `<div class="autocomplete">
            <p style="padding-top: 15px;color:black;font-weight:600"><img class="img" src=${match.avatar_url} alt=${match.avatar_url}/> ${match.login}</p>
            </div>`).join('');
            matchList.innerHTML = html;
            matchList.addEventListener('click', (e) => {
            search.value = e.target.textContent.trim();
            matchList.style.display = "none";
            matchList.innerHTML = ""
            })
            matchList.style.display = "block";
        }
    }
    else
    {
        matchList.innerHTML = ""   
    }
    document.getElementById(clear).addEventListener('click', () => {
        matchList.innerHTML = ""
        }) 
}
//--------------------------------------------------------------------------------------------------

function sub(c){
    var g = document.querySelector(c); 
    var child = g.lastElementChild;  
    g.removeChild(child)
    const heading = document.createElement('h2')
    final_star = Math.abs(star_1-star_2)
    final_follow = Math.abs(follow_1-follow_2)
    final_repo = Math.abs(repo_1-repo_2)
    final_fork = Math.abs(fork_1-fork_2) 
    final_fan = Math.abs(fan_1-fan_2)
    final = 0
    console.log(final_star,final_follow,final_repo,final_fork)
    if(final_star<=10){final+=2;}
    else if(final_star<=20){final+=1;}
    if(final_follow<=10){final+=2;}
    else if(final_follow<=20){final+=1;}
    if(final_fork<=10){final+=2;}
    else if(final_fork<=20){final+=1;}
    if(final_repo<=20){final+=2;}
    else if(final_repo<=50){final+=1};
    if(final_fan<=10){final+=2;}
    else if(final_repo<=20){final+=1};
    const ull = document.createElement('div');
    ull.innerHTML = `
                </br>
                <i class="fa fa-handshake-o" style="font-size:28px;"></i></br></br>
                <h2 class="chilanka">പത്തിൽ ${final} പൊരുത്തം</h2>
            `;
               
    document.querySelector(c).appendChild(ull)
}


//--------------------------------------------------------------------------------------------------

search.addEventListener('input', debounce( () => searchUser(search.value,"match-list",search,"clear"),600));
search1.addEventListener('input', debounce( () => searchUser(search1.value,"match-list1",search1,"clear1"),600));

const git = new finder();
const git2 = new finder2()

document.querySelector('#user-form').addEventListener('submit', (e) =>
{
    e.preventDefault();
    const c = '#user-form'
    const username = document.querySelector('#username').value
    git.fetchUsers(username,c,"loading")
});


document.querySelector('#user-form1').addEventListener('submit', (e) =>
{
    e.preventDefault();
    const c = '#user-form1'
    const username = document.querySelector('#username1').value
    git2.fetchUsers(username,c,"loading1")
});

  
document.querySelector('#see').addEventListener('submit', (e) =>
{
    e.preventDefault();
    const c = '#see'
    sub(c);
});

