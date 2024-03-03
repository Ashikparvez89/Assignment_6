const getSearchPost = async () =>{
    const getPost = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=comedy`);
    const convertPost = await getPost.json();
    console.log(convertPost)
}

getSearchPost();


