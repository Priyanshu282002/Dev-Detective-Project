const modeText=document.querySelector("[data-modeText]");
const modeIcon=document.querySelector("[data-modeIcon]");
const wrapper=document.querySelector(".wrapper");
const headingContainer=document.querySelector(".heading-container");
const UserInfoContainer=document.querySelector(".user-info-container");
const parameterContainer=document.querySelector(".parameter-container");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const joininigDate=document.querySelector("[data-joiningDate]");

const searchForm=document.querySelector(".searchForm");


modeText.addEventListener("click",()=>{
    if(modeText.innerText=="LIGHT")
    {
        modeText.innerText="dark";
        modeIcon.src="assets/images/moon-icon.svg";
        wrapper.classList.remove("dark");
        headingContainer.classList.remove("dark");
        searchForm.classList.remove("dark");
        UserInfoContainer.classList.remove("dark");
        parameterContainer.classList.remove("dark");

    }
    else{
        modeText.innerText="Light";
        modeIcon.src="assets/images/sun-icon.svg";
        wrapper.classList.add("dark");
        headingContainer.classList.add("dark");
        searchForm.classList.add("dark");
        UserInfoContainer.classList.add("dark");
        parameterContainer.classList.add("dark");
    }
    
});

modeIcon.addEventListener("click",()=>{
    if(modeText.innerText=="LIGHT")
    {
        modeText.innerText="Dark";
        modeIcon.src="assets/images/moon-icon.svg";
        wrapper.classList.remove("dark");
        headingContainer.classList.remove("dark");
        searchForm.classList.remove("dark");
        UserInfoContainer.classList.remove("dark");
        parameterContainer.classList.remove("dark");
    }
    else
    {
        modeText.innerText="Light";
        modeIcon.src="assets/images/sun-icon.svg";
        wrapper.classList.add("dark");
        headingContainer.classList.add("dark");
        searchForm.classList.add("dark");
        UserInfoContainer.classList.add("dark");
        parameterContainer.classList.add("dark");
    }
})

const searchButton=document.querySelector("[data-searchButton]");
const userInput=document.querySelector("[data-userInput]");
searchButton.addEventListener("click",(e)=>{
    e.preventDefault();
    
    if(userInput.value === "") 
        return;
    else
        fetchUser(userInput.value);

});

const searchError=document.querySelector("[data-searchError]"); 


async function fetchUser(user){
    
    try{
        
        const response=await fetch(`https://api.github.com/users/${user}`);

        const data=await response.json();

        searchError.classList.remove("active"); 
        if(data?.message=="Not Found")
        {
            throw data;
        }
        renderUserInfo(data);

        
    }
    
    catch(e){
        searchError.classList.add("active");
        
    }
    
    
}



function renderUserInfo(userData){
    const userImage=document.querySelector("[data-userImage]");
    const name=document.querySelector("[data-name]");

    userImage.src=userData?.avatar_url;
    if(userData?.name==null)
    {
        name.innerText=userData?.login;
    }
    else{
        name.innerText=userData?.name;
    }

    datesegments = userData.created_at.split("T").shift().split("-");
    joininigDate.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;

    const id=document.querySelector("[data-id]");

    id.innerText=`@${userData?.login}`;
    id.href=userData?.html_url;

    const bio=document.querySelector("[data-bio]");
    if(userData?.bio==null)
    {
        bio.innerText="This profile has no bio";
    }
    else{
        bio.innerText=userData?.bio;
    }

    const repos=document.querySelector("[data-repos]");
    const followers=document.querySelector("[data-followers]");
    const following=document.querySelector("[data-following]");

    repos.innerText=userData?.public_repos;
    followers.innerText=userData?.followers;
    following.innerText=userData?.following;

    const location=document.querySelector("[data-location]");
    const link=document.querySelector("[data-link]");
    const twitter=document.querySelector("[data-twitter]");
    const industry=document.querySelector("[data-industry]");

    if(userData?.location==null)
    {
        location.innerText="Not Available";
    }
    else{
        location.innerText=userData?.location;
    }

    if(userData?.blog=="")
    {
        link.innerText="Not Available";
        link.href="#";
    }
    else{
        link.innerText=userData?.blog;
        link.href=userData?.blog;
    }

    if(userData?.twitter_username==null)
    {
        twitter.innerText="Not Available";
        twitter.href="#";
    }
    else{
        twitter.innerText=userData?.twitter_username;
        twitter.href=`https://twitter.com/${userData?.twitter_username}`;
    }

    if(userData?.company==null)
    {
        industry.innerText="Not Available"
    }
    else{
        industry.innerText=userData?.company;
    }

}

fetchUser("priyanshu282002");

